<template>
  <div class="comment-body">
    <div class="comment-title">
      <div class="title">评论 <span class="count">{{commentListInfo.totalCount}}</span></div>
      <div class="tab">
        <span @click="orderChange(0)"
        :class="['tab-item',orderType == 0?'active':'']"
        >热榜</span>
        <el-divider direction="vertical" />
        <span @click="orderChange(1)"
        :class="['tab-item',orderType == 1?'active':'']"
        >最新</span>
      </div>
    </div>
    <div class="comment-form-panel">
      <PostComment
        :articleId="articleId"
        :pCommentId="0"
        :avatarWidth="50"
        :userId="currentUserInfo.userId"
        :showInsertImg="currentUserInfo.userId != null"
        @postCommentFinish="postCommentFinish"
      ></PostComment>
    </div>
    <!-- 无数据提醒 -->
    <div v-if="!loading && commentListInfo.list != null && commentListInfo.list.length == 0">
      <NoData msg="暂无评论，快来抢占沙发吧"></NoData>
    </div>
    <div class="comment-list" v-for="item in commentListInfo.list">
      <CommentListItem 
      :articleId="articleId"
      :commentData="item" 
      :articleUserId="props.articleUserId"
      :currentUserId="currentUserInfo.userId"
      @hiddenAllReply="hiddenAllReplyHandler"
      @reloadData="loadComment">
      </CommentListItem>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import CommentListItem from './CommentListItem.vue'
import PostComment from './PostComment.vue'
import {requestLoadComment} from './utils/api'
const store = useStore();
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const props = defineProps({
  articleId: {
    type: String,
  },
  articleUserId: {
    type: String,
  },
});
//隐藏所有回复框
const hiddenAllReplyHandler = ()=>{
  commentListInfo.value.list.forEach(element => {
    element.showReply = false;
  });
}
const orderType = ref(0); //排序
const orderChange = (type)=>{
  orderType.value = type;
  loadComment();
}
console.log(props);
//获取评论列表
const commentListInfo = ref({});
const loading = ref(null);
const loadComment = async ()=>{
  let params = {
    articleId:props.articleId,
    opderType:orderType.value
  };
  let result = await requestLoadComment(params);
  if(!result) return;
  commentListInfo.value = result.data;
}
loadComment();
const emit = defineEmits(["updateCommentCount"]);
//评论发布完成 将新数据放到评论列表中
const postCommentFinish = (resultData)=>{
  commentListInfo.value.list.unshift(resultData);
  //更新评论总数
  const totalCount = commentListInfo.value.totalCount+1;
  commentListInfo.value.totalCount = totalCount;
  emit("updateCommentCount",totalCount);
}
//当前用户信息
const currentUserInfo = ref({});
watch(
  () => store.state.loginUserInfo,
  (newVal, oldVal) => {
    currentUserInfo.value = newVal || {};
  },
  { immediate: true, deep: true }
);
</script>
<style lang='scss' >
.comment-body {
  .comment-title {
    display: flex;
    align-items: center;
    .title {
      font-size: 20px;
      .count {
        font-size: 14px;
        padding: 0px 10px;
      }
    }
  }
      .tab {
      .tab-item {
        cursor: pointer;
      }
      .active {
        color: var(--gre);
      }
    }

}
  .comment-form-panel {
    margin-top: 20px;
  }
</style>
