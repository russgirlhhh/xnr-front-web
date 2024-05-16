<template>
  <div>
    <div class="menu">
      <div
        :class="['mItem', codeType == 'reply' ? 'active' : '']"
        @click="tabChange('reply')"
      >
        <span>回复我的</span>
        <span class="count-tag" v-if="messageCountInfo.reply > 0">
          {{ messageCountInfo.reply > 99 ? "99+" : messageCountInfo.reply }}
        </span>
      </div>
      <div
        :class="['mItem', codeType == 'likePost' ? 'active' : '']"
        @click="tabChange('likePost')"
      >
        <span>点赞我的</span>
        <span class="count-tag" v-if="messageCountInfo.likePost > 0">
          {{
            messageCountInfo.likePost > 99 ? "99+" : messageCountInfo.likePost
          }}
        </span>
      </div>
      <div
        :class="['mItem', codeType == 'sys' ? 'active' : '']"
        @click="tabChange('sys')"
      >
        <span>系统消息</span>
        <span class="count-tag" v-if="messageCountInfo.sys > 0">
          {{ messageCountInfo.sys > 99 ? "99+" : messageCountInfo.sys }}
        </span>
      </div>
    </div>
  <div class="message-panel">
    <div class="message-list" v-for="item in messageListInfo.list">
      <div class="message-item" v-if="item.messageType == 0">
        <div class="message-content">
          <span v-html="item.messageContent"></span>
          <span class="create-time">{{ item.createTime }}</span>
        </div>
      </div>
      <!--回复我的-->
      <div class="message-item" v-if="item.messageType == 1">
        <Avatar :userId="item.sendUserId" :width="50"></Avatar>
        <div class="message-content">
          <div>
            <router-link class="a-link" :to="`/user/${item.sendUserId}`"
              >@{{ item.sendNickName }}</router-link
            >
            对我的文章【<router-link
              class="a-link"
              :to="`/post/${item.articleId}`"
              >{{ item.articleTitle }}</router-link
            >】发表了评论
            <span class="create-time">{{ item.createTime }}</span>
          </div>
          <div class="reply-content" v-html="item.messageContent"></div>
        </div>
      </div>
                  <!--赞了我的文章-->
            <div class="message-item" v-if="item.messageType == 2">
              <Avatar :userId="item.sendUserId" :width="50"></Avatar>
              <div class="message-content">
                <div>
                  <router-link class="a-link" :to="`/user/${item.sendUserId}`"
                    >@{{ item.sendNickName }}</router-link
                  >
                  赞了我的文章【<router-link
                    class="a-link"
                    :to="`/post/${item.articleId}`"
                    >{{ item.articleTitle }}</router-link
                  >】
                  <span class="create-time">{{ item.createTime }}</span>
                </div>
              </div>
            </div>
    </div>
    </div>
    <!-- 无数据提醒 -->
<div v-if="!loading && messageListInfo.list != null && messageListInfo.list.length == 0">
  <NoData></NoData>
</div>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { requestGetMessageCount, requestLoadMessageList } from "./utils/api";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
import { useStore } from "vuex";
const store = useStore();
//获取消息总数
const messageCountInfo = ref({});
watch(
  () => store.state.messageCountInfo,
  (newVal, oldVal) => {
    messageCountInfo.value = newVal || {};
  },
  { immediate: true, deep: true }
);
const codeType = ref("reply");
const loading = ref(false);
const tabChange = (type) => {
  codeType.value = type;
  loadMessageList();
};
onMounted(() => {
  //刚加载 默认时reply，加载一次
  loadMessageList();
});
const messageListInfo = ref({});
const loadMessageList = async () => {
  let params = {
    code: codeType.value,
  };
  let result = await requestLoadMessageList(params);
  if (!result) return;
  messageListInfo.value = result.data;
  store.commit("readMessage", codeType.value);
};
</script>
<style lang='scss' scoped>
.menu {
  //固定顶部
  position: fixed;
  // top:80px;
  // left:550px;
  width: 100%;
  background-color: #fff;
  padding-bottom: 10px;
  z-index: 100;
  .mItem {
    display: inline-block;
    padding: 5px 10px;
    margin-left: 15px;
    text-align: center;
    font-size: 16px;
    color: rgba(85, 84, 84, 0.568);
    border-radius: 15px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    .count-tag {
      position: absolute;
      right: -10px;
      height: 15px;
      line-height: 15px;
      min-width: 20px;
      display: inline-block;
      background: #f56c6c;
      border-radius: 10px;
      font-size: 12px;
      text-align: center;
      color: #fff;
      margin-left: 10px;
    }
  }
  .mItem:hover {
    background-color: rgb(247, 244, 244);
  }
  .active {
    background-color: rgb(247, 244, 244);
    color: rgb(68, 68, 68);
  }
}
.message-panel{
  padding-top: 30px;
.message-list {
  .message-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    .message-content {
      margin-left: 5px;
      .create-time {
        color: #9ba7b9;
        margin-left: 10px;
      }

      .reply-content {
        border-left: 2px solid #11a8f4;
        padding-left: 5px;
        margin-top: 5px;
      }
    }
  }
}
}

.divider {
  border-bottom: 1px solid #ddd;
  margin: 0 50px;
}
</style>
