<template>
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
</template>
<script setup>
import {ref,reactive, getCurrentInstance} from 'vue';
import {useRouter,useRoute} from 'vue-router';
import {requestArticleSearch} from './utils/api'
import newCards from "../components/newCards.vue";
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const word = route.params.word;

const cardList = ref([]);
const loading = ref(false);
const search = async()=>{
    loading.value = true;
    let params = {
        keyword:word
    }
    let result = await requestArticleSearch(params);
    if(!result) return;
  loading.value = false;
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
search();
</script>
<style lang='scss' scoped> 
</style>
