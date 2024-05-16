<template>
  <div>
    <!-- 顶部 -->
    <div class="header">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/img/logo.jpg" alt="">
        </div>
      <div class="search">
        <el-form ref="formDataRef" :model="formData" :rules="rules">
            <el-form-item prop="keyword">
              <el-input
        placeholder="请输入查找的关键词"
          style="width: 400px"
          size="large"
          :prefix-icon="Search"
          v-model="formData.keyword"
          @keyup.enter="forumSearch"
          @change="changeInput"
          clearable
        />
        <el-button type="success" size="large" style="margin-left: 15px"
        @click="forumSearch"
        @blur="formData.keyword=$event.target.value.trim()"
          >搜索</el-button
        >
            </el-form-item>
        </el-form>

      </div>
      <div class="set" v-if="userInfo.userId">
        <el-dropdown>
          <!-- 头像 -->
          <avatar :userId="userInfo.userId"></avatar>
          <template #dropdown>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item>我的主页</el-dropdown-item> -->
              <el-dropdown-item @click="updateUserInfo">修改资料</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 侧边  高度通过 bodyHeight 变量统一了 在main.js中修改 -->
    <div class="aside" :style="{ height: proxy.globalInfo.bodyHeight + 'px' }">
      <div class="nav">
        <div class="ban" @click="goKnows">
          <i class="xnr-icon-shouye icon"></i>
          <span>首页</span>
        </div>
        <div class="ban" @click="goSearch">
          <i class="xnr-icon-wenda icon"></i>
          <span>搜索</span>
        </div>
        <div class="ban" @click="goPublish">
          <i class="xnr-icon-fabu icon"></i>
          <span>发布</span>
        </div>
        <div class="ban" @click="goMessage">
          <el-badge :value="messageCountInfo.total"
            :hidden="messageCountInfo.total == null||messageCountInfo.total == 0"
           class="badge-item">
            <i class="xnr-icon-xiaoxi icon"></i>
            <span>消息</span>
          </el-badge>
        </div>
        <div class="ban avaban" @click="goUser(userInfo.userId)" v-if="userInfo.userId">
          <i class="xnr-icon-my icon"></i>
          <span>我的</span>
        </div>
        <!-- 弹框 -->
        <div v-else>
          <div class="ban login" @click="loginAndRegister(1)">
            <span>  登&nbsp;&nbsp;录</span>
          </div>
          <div class="ban login" @click="loginAndRegister(0)">
            <span>注&nbsp;&nbsp;册</span>
          </div>
        </div>
      </div>
    </div>
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
    <!-- 主体内容 -->
    <div class="main">
      <router-view />
    </div>
    <!-- 修改用户信息弹框 -->
    <UserEditUserInfo 
    ref="userEditInfoRef"
    @resetUserInfo="resetUserInfoHandler"
    ></UserEditUserInfo>
  </div>
</template>
<script setup>
import UserEditUserInfo from './UserEditUserInfo.vue'
import { ref, reactive, getCurrentInstance, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
// icon 图标
import { Search } from "@element-plus/icons-vue";
import LoginAndRegister from "./LoginAndRegister.vue";
import {getUserInfo,requestGetMessageCount,requestLogOut} from './utils/api'
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();
const formData = ref({});
const formDataRef = ref();
const rules = {
  keyword:[
    // {required:true,message:"请输入关键字"},
    {min:3,message:"关键字太少，至少三个字"}
  ]
}
const changeInput = ()=>{
  if(formData.value.keyword == ""){
    cardList.value = []
  }
}
//点击 menu跳转
const goKnows = () => {
  router.push("/");
};
const goSearch = () => {
  router.push("/search");
};
const goPublish = () => {
    if(!store.getters.getLoginUserInfo){
    loginAndRegister(1);
  }else{
      router.push("/publish");
  }
};
const goMessage = () => {
      if(!store.getters.getLoginUserInfo){
    loginAndRegister(1);
  }else{
  router.push("/message");
  }

};
const goUser = (userId) => {
  router.push(`/user/${userId}`);
};
const word = ref("");
const forumSearch = ()=>{
  console.log('search');
  word.value=formData.value.keyword;
  router.push(`/forum/search/${word.value}`);
}
//登录注册
const loginRegisterRef = ref();
const loginAndRegister = (type) => {
  //根据type判断 是登录页面还是注册页面
  loginRegisterRef.value.showPanel(type);
};
onMounted(() => {
  getUser();
});
//获取用户信息
const getUser = async () => {
  let result = await getUserInfo();
  if (!result) {
    return;
  }
  store.commit("updateLoginUserInfo", result.data);
};
//获取消息总数
const messageCountInfo = ref({});
const loadMessageCount =async ()=>{
  let result =await requestGetMessageCount();
  if(!result) return;
  messageCountInfo.value = result.data;
  store.commit("updateMessageCountInfo", result.data);
}
watch(
  () => store.state.messageCountInfo,
  (newVal, oldVal) => {
    messageCountInfo.value = newVal || {};
  },
  { immediate: true, deep: true }
);

const userInfo = ref({});
// 监听 登录用户数据
watch(
  () => store.state.loginUserInfo,
  (newVal, oldVal) => {
    if (newVal != undefined && newVal != null) {
      userInfo.value = newVal;
     loadMessageCount();
    } else {
      userInfo.value = {};
    }
  },
  { immediate: true, deep: true }
);
//监听是否展示登录框
watch(
  () => store.state.showLogin,
  (newVal, oldVal) => {
    if (newVal) {
      loginAndRegister(1);
    }
  },
  { immediate: true, deep: true }
);
const userEditInfoRef = ref(null);
//点击修改用户信息
const updateUserInfo = ()=>{
  userEditInfoRef.value.showEditUserInfoDialog(userInfo.value);
};
const resetUserInfoHandler = (data)=>{
  userInfo.value = data;
}


//退出
const logout =()=>{
  proxy.Confirm("确定退出吗？",async ()=>{
      let result = await requestLogOut();
  if(!result) return;
  store.commit("updateLoginUserInfo",null);
  })

}
</script>
<style lang='scss'>
.header {
  height: 80px;
  width: 100%;
  color: white;
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: #fff;
  .logo {
    display:inline-block;
    height: 100%;
    width: 250px;
    padding: 12px;
    text-align: center;
    img{
      width:80px;
    }
  }
  .search {
    display: inline-block;
    margin-left: 300px;
    width: 500px;
    position: absolute;
    left: 200px;
    top: 20px;
  }
  .set {
    position: absolute;
    width:50px;
    right: 30px;
    top: 20px;
  }
}

.aside {
  width: 250px;
  // box-shadow: 0 2px 6px 0 #ddd;
  position: fixed;
  top: 80px;
  z-index: 1000;
  background-color: #fff;
  .nav {
    height: 55%;
    padding-top: 10px;
    .ban {
      display: inline-block;
      height: 45px;
      width: 90%;
      text-align: center;
      line-height: 45px;
      border-radius: 20px;
      cursor: pointer;
      margin: 10px;
      span {
        font-size: 18px;
        font-weight: 800;
      }
      .el-badge__content.is-fixed{
        top:22px;
         right: -8px;
      }
    }
    .login {
      background-color: rgb(55, 177, 39);
      color: azure;
    }
    .ban:hover {
      background-color: #ddd;
    }
  }
}

.main {
  // 上 右 下 左
  margin: 80px 20px 10px 270px;
}
.icon {
  margin-right: 10px;
}

.avaban{
  align-items: center;
}
.ava{
  display: inline-block;
  align-items: center;
}
</style>
