<template>
  <div class="art">
    <div class="top">
      <div class="title">
        {{ articleInfo.title }}
        <el-tag type="danger" v-if="articleInfo.status == 0">待审核</el-tag>
      </div>
      <!-- 用户信息 -->
      <div class="author">
        <div class="pho">
          <Avatar :userId="articleInfo.userId" :width="45"></Avatar>
        </div>
        <!-- name和time -->
        <div class="ntm">
          <router-link class="name" :to="`/user/${articleInfo.userId}`">
          {{ articleInfo.nickName }}
          </router-link>
          <div class="time">
            <span >{{ articleInfo.postTime }}</span>
            <el-divider direction="vertical" />
            <i class="xnr-icon-zhengyan"></i>
            {{articleInfo.readCount == 0 ? "阅读":articleInfo.readCount}}
            <router-link
            v-if="articleInfo.userId == currentUserInfo.userId"
            :to="`/rePublish/${articleInfo.articleId}`"
            class="a-link btn-edit"
          >
          <span class="iconfont xnr-icon-edit">编辑</span>
          </router-link>
          </div>

        </div>
      </div>
    </div>
    <div class="art-main">
    <!-- 文章内容 -->
    <div class="detail" id="detail" v-html="articleInfo.content">
    </div>
    <!-- 快截操作 -->
    <div class="quick-panel">
      <!-- 点赞数 -->
      <el-badge :value="articleInfo.goodCount"
      type="info"
      :hidden="!articleInfo.goodCount > 0">
      <div class="quick-item" @click="doLikeHandler">
        <!-- 点赞icon -->
        <span class="iconfont xnr-icon-good"
        :class="haveLike?'have-like':''"></span>
      </div>
      </el-badge>
       <!-- 评论数 -->
      <el-badge :value="articleInfo.commentCount"
      type="info"
      :hidden="!articleInfo.commentCount > 0">
      <div class="quick-item" @click="goToPosition('view-comment')">
        <!-- 评论icon -->
        <span class="iconfont xnr-icon-comment"></span>
      </div>
      </el-badge>
    </div>
    </div>
    <div class="divider"></div>
    <ImageViewer ref="imageViewerRef" :imageList="previewImgList"></ImageViewer>
    <!-- 评论 -->
    <div class="pinglun" id="view-comment">
      <CommentList
      v-if="articleInfo.articleId"
        :articleId="articleInfo.articleId"
        :articleUserId="articleInfo.userId"
        @updateCommentCount="updateCommentCount"
      ></CommentList>
    </div>
  </div> 
</template>
<script setup>
import { imageViewerEmits } from 'element-plus';
import {ref,reactive, getCurrentInstance, onMounted, nextTick,watch} from 'vue';
import {useRouter,useRoute} from 'vue-router';
import path from 'path'
import CommentList from './CommentList.vue'
import {useStore} from 'vuex';
const store = useStore();
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();
//获取当前用户信息
const currentUserInfo = ref({});
//点击跳转到 dom元素位置 评论
const goToPosition = (domId)=>{
  document.querySelector('#'+domId).scrollIntoView();
}
import {getArticleDetail,requestDoLike} from './utils/api'
//文章详情
const articleDetail = ref({})
const attchment = ref({})
const articleInfo = ref({})
const haveLike = ref(false);
//获取文章详情，内容，点赞数，评论
const getDetail = async (articleId)=>{
  let params = {
    articleId:articleId
  }
  let result = await getArticleDetail(params);
  if(!result) return;
  articleInfo.value = result.data.forumArticle;
  attchment.value = result.data.attchment;
  haveLike.value = result.data.haveLike;
  //调用图片预览方法
  imagePreview();
}
// 是否点赞
const doLikeHandler =async ()=>{
  //点赞操作要先判断是否登录
  if(!store.getters.getLoginUserInfo){
    store.commit("showLogin",true);
    return;
  }
    let params = {
    articleId:articleInfo.value.articleId
  }
  let result = await requestDoLike(params);
  if(!result){return;}
  haveLike.value = !haveLike.value;
  // 点赞 文章赞数+1 取消点赞 -1
  let goodCount = 1;
  if(!haveLike.value){
    goodCount = -1;
  }
  articleInfo.value.goodCount = articleInfo.value.goodCount+goodCount;

}
onMounted(()=>{
  getDetail(route.params.articleId);
})
//图片预览
const imageViewerRef = ref(null);
const previewImgList= ref([]);
const imagePreview = ()=>{
  nextTick(()=>{
    //获取到文章中img列表
    const imageNodeList = document.querySelector("#detail").querySelectorAll('img');
    const imageList = [];
    imageNodeList.forEach((item,index)=>{
      const src = item.getAttribute('src');
      //获取到图片路径 src数组
      imageList.push(src);
      //给每个照片节点添加事件
      item.addEventListener("click",()=>{
        imageViewerRef.value.show(index);
      });
    });
  previewImgList.value = imageList;
  });
}
const updateCommentCount = (total)=>{
  articleInfo.value.commentCount = total;
};
//监听登录用户，获取到登录用户信息
watch(
  () => store.state.loginUserInfo,
  (newVal, oldVal) => {
    currentUserInfo.value = newVal || {};
  },
  { immediate: true, deep: true }
);

</script>
<style lang='scss' >
.art {
  // padding-left: 50px;
  width:90%;
  .top {
    width: 100%;
    .title {
      float: left;
      width: 90%;
      font-size: 25px;
      margin-bottom:10px;
    }
  }
  .author {
    width: 80%;
    display: flex;
    align-items: center;
    .pho {
    }
    .ntm {
      margin-left: 10px;
      text-align: left;
      .name {
        font-size: 16px;
        text-decoration: none;
        color:black;
      }
      .time {
        color: rgb(131, 130, 130);
        .btn-edit{
          .iconfont{
            margin-left: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .art-main{
    display: flex;
    .detail {
    letter-spacing: 1px;
    line-height: 22px;
    width: 90%;
    img{
      max-width: 90%;
      cursor: pointer;
      margin:10px 0;
    }
    a{
      text-decoration: none;
      color:var(--link);
    }
  }
  .quick-panel{
    // 根据根节点
    position: fixed;
    width:50px;
    right:75px;
    text-align: center;
    .el-badge__content.is-fixed{
    top:5px;
      right: 10px;
  }
    .quick-item{
      width:50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-bottom:30px;
      border:1px solid rgb(241, 240, 240);
      cursor: pointer;
      .iconfont{
        font-size: 22px;
        color:#aaa;
      }

      .have-like{
        color: rgb(37, 163, 37);
      }
    }
  }
  }


  .divider{
    border-top: 1px solid #ddd;
    margin:10px 50px;
  }
}
</style>
