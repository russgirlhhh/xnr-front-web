<template>
    <div> 
        <div class="menu">
            <div :class="['mItem',orderType==0?'active':'']" @click="changeOrderType(0)" >推荐</div>
            <div :class="['mItem',orderType==1?'active':'']" @click="changeOrderType(1)" >发布时间</div>
            <div :class="['mItem',orderType==2?'active':'']" @click="changeOrderType(2)">最新</div>
            <el-divider direction="vertical" />
            <!-- 板块（仅一级） -->
            <div 
            class="mItem"
            v-for="board in boardList"
            @click="boardClickHandler(board)"
            >
            {{board.boardName}}
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
import {ref,reactive, getCurrentInstance, watch} from 'vue';
import {useRouter,useRoute} from 'vue-router';
import {loadArticle,getLoadBoard} from './utils/api'
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();

//接口获取cardList数据
import newCards from "../components/newCards.vue";
const orderType = ref(0);
const changeOrderType = (type)=>{
  orderType.value = type;
  if(type == 0){
    router.push(`/search`);
  }
  loadArticleList();
}

//获取板块信息
const boardList = ref([]);
const pBoardId = ref(0);
// const boardId = ref(0);

const loadBoard = async ()=>{
  let result = await getLoadBoard();
  if(!result){return;}
  boardList.value = result.data;
}

// cardsList加载样式
const loading = ref(false);
const cardList = ref([]);

const loadArticleList = async ()=>{
  //请求前 加载
  loading.value = true;
  let params={
    pBoardId:pBoardId.value,
    // boardId:boardId.value,
    orderType:orderType.value,
    showLoading:false
  }
  let result = await loadArticle(params);
  //请求后 不显示加载样式
  loading.value = false;
  if(!result){
    return;
  }
  cardList.value = result.data.list;
  equallyCard();
  
}
const boardClickHandler = (board)=>{
  router.push(`/${board.boardId}`);
}
//监听路由变换
watch(
  ()=>route.params,
  (newVal,oldVal)=>{
    pBoardId.value = newVal.pBoardId;
    loadArticleList();
  },
  {immediate:true,deep:true}
)
loadBoard();

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
  let num = parseInt(cardList.value.length/4)
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

</script>
<style lang='scss' scoped>

    .menu{
    //固定顶部
        position: fixed;
        top:80px;
        left:250px;
        width: 100%;
        background-color: #fff;
        padding-bottom: 10px;
        z-index: 100;
    .mItem{
        display: inline-block;
        padding:5px 10px;
        margin-left: 15px;
        text-align: center;
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
.s-cards{
    padding-top:40px;

}


</style>
