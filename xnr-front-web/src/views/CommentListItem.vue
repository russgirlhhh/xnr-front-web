<template>
  <div class="comment-item">
    <Avatar :userId="commentData.userId" :width="50"></Avatar>
    <div class="comment-info">
      <div class="nick-name">
        <span class="name" @click="goToUcenter(commentData.userId)">{{
          commentData.nickName
        }}</span>
        <span v-if="commentData.userId == articleUserId" class="tag-author"
          >作者</span
        >
      </div>
      <div class="comment-content">
        <div>
          <span class="tag tag-topping" v-if="commentData.topType == 1"
            >置顶</span
          >
          <span class="tag no-audit" v-if="commentData.status == 0"
            >待审核</span
          >
          <span v-html="commentData.content"></span>
        </div>
        <CommentImage
          v-if="commentData.imgPath"
          :src="
            proxy.globalInfo.imageUrl + commentData.imgPath.replace('.', '_.')
          "
        ></CommentImage>
      </div>
      <div class="op-panel">
        <div class="time">
          <span>{{ commentData.postTime }}</span>
        </div>
        <div
          :class="[
            'icon xnr-icon-good',
            commentData.likeType == 1 ? 'active' : '',
          ]"
          @click="doLike(commentData)"
        >
          {{ commentData.goodCount > 0 ? commentData.goodCount : "点赞" }}
        </div>
        <div
          class="icon xnr-icon-comment"
          @click="showReplyPanel(commentData, 0)"
        >
          回复
        </div>
        <!-- 如果当前用户就是文章作者 可以操作置顶 -->
        <el-dropdown v-if="articleUserId == currentUserId">
          <span class="icon xnr-icon-more"></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="opTop(commentData)">
                {{ commentData.topType == 0 ? "设为置顶" : "取消置顶" }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="comment-sub-list" v-if="commentData.children">
        <div class="comment-sub-item" v-for="sub in commentData.children">
          <Avatar :userId="sub.userId" :width="30"></Avatar>
          <div class="comment-sub-info">
            <div class="nick-name">
              <span class="name" @click="goToUcenter(sub.userId)">{{
                sub.nickName
              }}</span>
              <span v-if="sub.userId == articleUserId" class="tag-author"
                >作者</span
              >
              <span class="reply-name">回复</span>
              <span @click="goToUcenter(sub.replyUserId)" class="a-link"
                >@{{ sub.replyNickName }}</span
              >
              <span>：</span>
              <span class="sub-content" v-html="sub.content"></span>
            </div>
            <div class="op-panel">
              <div class="time">
                <span>{{ sub.postTime }}</span>
              </div>
              <div
                :class="[
                  'icon xnr-icon-good',
                  sub.likeType == 1 ? 'active' : '',
                ]"
                @click="doLike(sub)"
              >
                {{ sub.goodCount > 0 ? sub.goodCount : "点赞" }}
              </div>
              <div
                class="icon xnr-icon-comment"
                @click="showReplyPanel(sub, 1)"
              >
                回复
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reply-info" v-if="commentData.showReply">
        <PostComment
          :articleId="articleId"
          :avatarWidth="30"
          :pCommentId="pCommentId"
          :placeholderInfo="placeholderInfo"
          :replyUserId="replyUserId"
          :userId="currentUserId"
          :showInsertImg="false"
          @postCommentFinish="postCommentFinish"
        ></PostComment>
      </div>
    </div>
  </div>
</template>
<script setup>
import CommentImage from "./CommentImage.vue";
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { requestCommentDoLike, requestChangeTopType } from "./utils/api";

const { proxy } = getCurrentInstance();
const router = useRouter();
import PostComment from "./PostComment.vue";
const props = defineProps({
  articleId: {
    type: String,
  },
  commentData: {
    type: Object,
  },
  articleUserId: {
    type: String,
  },
  currentUserId: {
    type: String,
  },
});
const pCommentId = ref(0);
const replyUserId = ref(null);
const placeholderInfo = ref(null);
const emit = defineEmits(["hiddenAllReply", "reloadData"]);
//显示评论框 要通过父级触发 将所有回复框都隐藏 然后将点击的回复框显示
const showReplyPanel = (curData, type) => {
  const haveShow =
    props.commentData.showReply == undefined
      ? false
      : props.commentData.showReply;
  emit("hiddenAllReply");
  //一级回复 点击可显示可隐藏评论框  二级回复 点击就是固定显示评论框一直为true
  if (type == 0) {
    props.commentData.showReply = !haveShow;
  } else {
    props.commentData.showReply = true;
  }
  pCommentId.value = props.commentData.commentId;
  replyUserId.value = curData.userId;
  placeholderInfo.value = "回复 @" + curData.nickName;
};

const postCommentFinish = (resultData) => {
  props.commentData.children = resultData;
};
//点击跳转去主页
const goToUcenter = (userId) => {
  router.push(`/user/${userId}`);
};
//点赞
const doLike = async (data) => {
  let params = {
    commentId: data.commentId,
    showLoading: false,
  };
  let result = await requestCommentDoLike(params);
  if (!result) {
    return;
  }
  data.goodCount = result.data.goodCount;
  data.likeType = result.data.likeType;
};
//置顶
const opTop = async (data) => {
  let params = {
    commentId: data.commentId,
    // 如果当前是置顶状态(0)，点击之后topType应该为取消置顶(1)
    topType: data.topType == 1 ? 0 : 1,
  };
  let result = await requestChangeTopType(params);
  if (!result) return;
  //触发父级方法，重新加载评论列表
  emit("reloadData");
};
</script>
<style lang='scss' scoped>
.comment-item {
  display: flex;
  padding-top: 15px;
  .comment-info {
    flex: 1;
    margin-left: 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
  }
  .nick-name {
    .name {
      font-size: 14px;
      color: rgb(150, 149, 149);
      cursor: pointer;
    }
    .tag-author {
      background-color: var(--gre);
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
      margin-left: 5px;
      padding:0 3px;
    }
  }
  .comment-content {
    margin-top: 5px;
    font-size: 15px;
    line-height: 22px;
    .tag {
      margin-right: 5px;
      font-size: 12px;
      border-radius: 3px;
      padding: 0px 5px;
    }
    .tag-topping {
      color: var(--gre);
      border: 1px solid var(--gre);
    }
    .no-audit {
      color: #ccc;
      border: 1px solid #ccc;
    }
  }
  .op-panel {
    display: flex;
    margin-top: 5px;
    font-size: 13px;
    color: rgb(150, 149, 149);
    align-items: center;
    .time {
      margin-right: 20px;
    }
    .icon {
      margin-right: 15px;
      font-size: 14px;
      color: rgb(150, 149, 149);
      cursor: pointer;
    }
    .icon::before {
      margin-right: 3px;
    }
    .active {
      color: var(--gre);
    }
  }
  .comment-sub-list {
    margin-top: 10px;
    .comment-sub-item {
      display: flex;
      margin: 8px 0px;
      font-size: 14px;
      .comment-sub-info {
        margin-left: 5px;
        .nick-name {
          .reply-name {
            margin: 0px 5px;
          }
          .sub-content {
            font-size: 15px;
          }
        }
      }
    }
  }
  .reply-info {
    margin-top: 15px;
  }
}
</style>
