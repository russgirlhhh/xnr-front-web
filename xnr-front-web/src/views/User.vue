<template>
  <div>
    <div class="info">
      <div class="author">
        <div class="pho">
          <Avatar :width="100" :userId="userInfo.userId"></Avatar>
        </div>
        <div class="ntm">
          <div class="name">
            {{userInfo.nickName}}
            <span class="xnr-icon-woman" v-if="userInfo.sex==0"></span>
            <span class="xnr-icon-man" v-if="userInfo.sex==1"></span>
          </div>
          <div class="uid">
            账号：{{userInfo.userId}}</div>  
          <div class="userInfo">
            发帖数：{{userInfo.postCount}}
            获赞：{{userInfo.likeCount}} 
            </div>     
        </div>
      </div>
    </div>
         <div class="menu">
            <div  :class="['mItem',orderType==0?'active':'']" @click="changeTab(0)">发帖</div>
            <div  :class="['mItem',orderType==1?'active':'']" @click="changeTab(1)" v-if="isCurrentUser">评论过</div>
            <div class="mItem" v-else>
            <span class="xnr-icon-suo"></span>
              评论过
            </div>
            <div  :class="['mItem',orderType==2?'active':'']" @click="changeTab(2)" v-if="isCurrentUser">喜爱</div>
            <div class="mItem" v-else>
            <span class="xnr-icon-suo"></span>
              喜爱
            </div>
        </div>
      <div class="s-cards">
      <newCards
        :cardList="cardList"
        :cardList1="cardList1"
        :cardList2="cardList2"
        :cardList3="cardList3"
        :cardList4="cardList4"
        :loading="loading"
      ></newCards>
      </div>
  </div>
</template>
<script setup>
import newCards from "../components/newCards.vue";
import {ref,reactive, getCurrentInstance, watch, onMounted} from 'vue';
import {useRouter,useRoute} from 'vue-router';
import {requestloadUserArticle,requestGetUserInfo} from './utils/api'
import {useStore} from 'vuex';
const store = useStore();
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const userId = ref(null);
const userInfo = ref({});
const cardList = ref([]);
const loadUserInfo = async ()=>{
  let params = {
    userId:userId.value
  }
  let errorcallback = ()=>{
    setTimeout(()=>{
      router.push("/");
    },1500);
  }
  let result = await requestGetUserInfo(params,errorcallback);
  if(!result)return;
  userInfo.value = result.data;
}

// 默认是0 发帖内容
const activeTabName = ref(0);
const orderType = ref(0);
const changeTab = (type)=>{
  orderType.value = type;
  activeTabName.value = type;
  loadArticleList();
};
// cardsList加载样式
const loading = ref(false);
const articleListInfo = ref({});
const loadArticleList = async ()=>{
  //请求前 加载
  loading.value = true;
  let params={
    type:activeTabName.value,
    userId:userId.value
  }
  let result = await requestloadUserArticle(params);
  //请求后 不显示加载样式
  loading.value = false;
  if(!result){
    return;
  }
  cardList.value = result.data.list;
  equallyCard();
}
//cardList 1234
const cardList1 = ref([]) // 各列的数据
const cardList2 = ref([])
const cardList3 = ref([])
const cardList4 = ref([])

function equallyCard(){
  cardList1.value = [];
  cardList2.value = [];
  cardList3.value = [];
  cardList4.value = [];
  // 平分数据，确保页面上遍历卡片dom的真实顺序与平分的一致 document.querySelectorAll('.card-item')) 
  let num = parseInt(cardList.value.length/4);
  cardList.value.forEach((item,index)=>{
    if(num==0){
      cardList1.value.push(item)
      return
    }
    if(index<num){
       cardList1.value.push(item)
       return
    }
    if(index<2*num){
       cardList2.value.push(item)
        return
    }
    if(index<3*num){
       cardList3.value.push(item)
        return
    }
    cardList4.value.push(item)
  })
}
//当前用户是否为登录用户
const isCurrentUser = ref(false);
//重新设置当前用户
const resetCurrentUser = () => {
  const loginUserInfo = store.getters.getLoginUserInfo;
  if (loginUserInfo && loginUserInfo.userId === userId.value) {
    isCurrentUser.value = true;
  } else {
    isCurrentUser.value = false;
  }
  
};
//登录之后 
watch(
  () => store.state.loginUserInfo,
  (newVal, oldVal) => {
    resetCurrentUser();
  },
  { immediate: true, deep: true }
);
//没有登录 查看用户主页，是通过路径中的userId判断
watch(
  () => route.params.userId,
  (newVal, oldVal) => {
    if (newVal) {
      userId.value = newVal;
      resetCurrentUser();
      loadUserInfo();
      loadArticleList();


    }
  },
  { immediate: true, deep: true }
);

</script>
<style lang='scss' scoped>
    .menu{
    //固定顶部
        width: 100%;
        background-color: #fff;
        padding-bottom: 10px;
        display: flex;
    .mItem{
        padding:5px 10px;
        margin-left: 15px;
        font-size:16px ;
        color:rgba(85, 84, 84, 0.568);
        border-radius: 15px;
        font-weight: 600;
        cursor: pointer;
    }
    .mItem:hover{
        background-color: rgb(247, 244, 244);
    }
    .active{
        background-color: rgb(247, 244, 244);
        color: rgb(68, 68, 68);
    }

}
.info {
  margin-top: 100px;
  width: 100%;
  height: 150px;
  .author {
    width: 80%;
    display: flex;
    .pho {
      // position: relative;
      // left:230px;
      img {
        width: 150px;
        height: 150px;
        border-radius: 100px;
      }
    }
    .ntm {
      // display: inline-block;
      margin-left: 20px;
      // position: relative;
      // left:260px;
      // top:-90px;
      .name {
        font-size: 30px;
      }
    }
  }
}
</style>

