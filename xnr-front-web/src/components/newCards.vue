<template>
  <div>
    <!-- 无数据提醒 -->
<div v-if="!loading && cardList != null && cardList.length == 0">
  <NoData></NoData>
</div>

<!-- 动态加载 -->
<div class="skeleton" v-if="loading">
  <el-skeleton style="width: 240px">
    <template #template>
      <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
      <div style="padding: 14px">
        <el-skeleton-item variant="p" style="width: 50%" />
        <div
          style="
            display: flex;
            align-items: center;
            justify-items: space-between;
          "
        >
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </el-skeleton>
</div>
    <div class="page-main" v-if="!loading">
      <div class="card" >
        <div class="coloum1">
          <div
            class="card-item"
            v-for="(item, index) in arr1.length==0?cardList1:arr1"
            :key="index"
            :class="{ visibles: isVisibility }"
          >
            <router-link class="artInfo" :to="`/post/${item.articleId}`">
            <div class="cardImg" v-if="item.cover">
              <img :src="'/api/file/getImage/' + item.cover" />
            </div>
            <div class="cardTitle">
              <span>{{ item.title }}</span>
            </div>
          </router-link>
          <div class="userInfo">
            <div class="userpan">
              <Avatar :userId="item.userId" :width="30" class="avatar"></Avatar>
              <router-link :to="'/user/' + item.userId" class="nickName">{{
                item.nickName
              }}</router-link>
            </div>
            <span class="icon xnr-icon-good">
              {{ item.goodCount == 0 ? "点赞" : item.goodCount }}
            </span>
          </div>
          </div>
        </div>
        <div class="coloum2">
          <div
            v-for="(item, index) in arr2.length==0?cardList2:arr2"
            :key="index"

            :class="['card-item', {visibles: isVisibility}]"
          >
                                  <router-link class="artInfo" :to="`/post/${item.articleId}`">
            <div class="cardImg" v-if="item.cover">
              <img :src="'/api/file/getImage/' + item.cover" />
            </div>
            <div class="cardTitle">
              <span>{{ item.title }}</span>
            </div>
          </router-link>
          <div class="userInfo">
            <div class="userpan">
              <Avatar :userId="item.userId" :width="30" class="avatar"></Avatar>
              <router-link :to="'/user/' + item.userId" class="nickName">{{
                item.nickName
              }}</router-link>
            </div>
            <span class="icon xnr-icon-good">
              {{ item.goodCount == 0 ? "点赞" : item.goodCount }}
            </span>
          </div>
          </div>
        </div>
        <div class="coloum3">
          <div
            class="card-item"
            v-for="(item, index) in arr3.length==0?cardList3:arr3"
            :key="index"
   
            :class="{ visibles: isVisibility }"
          >
                      <router-link class="artInfo" :to="`/post/${item.articleId}`">
            <div class="cardImg" v-if="item.cover">
              <img :src="'/api/file/getImage/' + item.cover" />
            </div>
            <div class="cardTitle">
              <span>{{ item.title }}</span>
            </div>
          </router-link>
          <div class="userInfo">
            <div class="userpan">
              <Avatar :userId="item.userId" :width="30" class="avatar"></Avatar>
              <router-link :to="'/user/' + item.userId" class="nickName">{{
                item.nickName
              }}</router-link>
            </div>
            <span class="icon xnr-icon-good">
              {{ item.goodCount == 0 ? "点赞" : item.goodCount }}
            </span>
          </div>
          </div>
        </div>
                <div class="coloum4">
          <div
            class="card-item"
            v-for="(item, index) in arr4.length==0?cardList4:arr4"
            :key="index"
            :class="{ visibles: isVisibility }"
          >
                      <router-link class="artInfo" :to="`/post/${item.articleId}`">
            <div class="cardImg" v-if="item.cover">
              <img :src="'/api/file/getImage/' + item.cover" />
            </div>
            <div class="cardTitle">
              <span>{{ item.title }}</span>
            </div>
          </router-link>
          <div class="userInfo">
            <div class="userpan"> 
              <Avatar :userId="item.userId" :width="30" class="avatar"></Avatar>
              <router-link :to="'/user/' + item.userId" class="nickName">{{
                item.nickName
              }}</router-link>
            </div>
            <span class="icon xnr-icon-good">
              {{ item.goodCount == 0 ? "点赞" : item.goodCount }}
            </span>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { loadArticle } from "@/views/utils/api";
import { defineProps, watch } from "vue";
const props = defineProps({
  cardList: {
    type: Array,
  },
  cardList1: {
    type: Array,
  },
    cardList2: {
    type: Array,
  },
    cardList3: {
    type: Array,
  },
    cardList4: {
    type: Array,
  },
  loading:{
    type:Boolean
  }
});
import { ref, onMounted, reactive, nextTick } from "vue";
const isVisibility = ref(true); 
// 由于渲染时候对数据的两次赋值，则会出现一次闪现，需要防抖
watch(
  () => props,
  (newVal, oldVal) => {
      if(props.cardList!=undefined && props.cardList.length!=0){
        nextTick(()=>{
        caLFlex();
        isVisibility.value = false;
        }).then(()=>{
            isVisibility.value = true
        }
        )
      }
  },
  { immediate: true, deep: true }
);
  let arr1 = []; // 第一列的值
  let arr2 = []; // 第二列的值
  let arr3 = []; // 第二列的值
  let arr4 = []; // 第二列的值

function caLFlex() {
  arr1=[];arr2=[];arr3=[];arr4=[];
  let heightArry_1 = []; // 第一列的卡片高度
  let heightArry_2 = []; // 第二列的卡片高度
  let heightArry_3 = []; // 第二列的卡片高度
  let heightArry_4 = []; // 第二列的卡片高度
  Array.from(document.querySelectorAll(".card-item")).forEach((item, index) => {
    if (index === 0) {
      // 第一行中的元素无需判断，直接加到新的数组中
      heightArry_1.push(item.offsetHeight);
      arr1.push(props.cardList[index]);
      return;
    }
    if (index === 1) {
      heightArry_2.push(item.offsetHeight);
      arr2.push(props.cardList[index]);
      return;
    }
    if (index === 2) {
      heightArry_3.push(item.offsetHeight);
      arr3.push(props.cardList[index]);
      return;
    }
        if (index === 3) {
      heightArry_4.push(item.offsetHeight);
      arr4.push(props.cardList[index]);
      return;
    }
    const heightTotal_1 = heightArry_1.length
      ? Array.from(heightArry_1).reduce((acc, cur) => acc + cur)
      : 0; // 第一列的总高度
    const heightTotal_2 = heightArry_2.length
      ? Array.from(heightArry_2).reduce((acc, cur) => acc + cur)
      : 0; // 第二列的总高
    const heightTotal_3 = heightArry_3.length
      ? Array.from(heightArry_3).reduce((acc, cur) => acc + cur)
      : 0; // 第三列的总高度
const heightTotal_4 = heightArry_4.length
      ? Array.from(heightArry_4).reduce((acc, cur) => acc + cur)
      : 0; // 第三列的总高度
    // 找到最小值
    let minNumber = Math.min(heightTotal_1, heightTotal_2, heightTotal_3,heightTotal_4);
    switch (minNumber) {
      case heightTotal_1:
        heightArry_1.push(item.offsetHeight);
        arr1.push(props.cardList[index]);
        break;
      case heightTotal_2:
        heightArry_2.push(item.offsetHeight);
        arr2.push(props.cardList[index]);
        break;
      case heightTotal_3:
        heightArry_3.push(item.offsetHeight);
        arr3.push(props.cardList[index]);
        break;
      case heightTotal_4:
        heightArry_4.push(item.offsetHeight);
        arr4.push(props.cardList[index]);
        break;
    }

  });
  // 重新将数据赋值给各列数组
  // props.cardList1.value = arr1;
  // props.cardList2.value = arr2;
  // props.cardList3.value = arr3;
  // props.cardList4.value = arr4;
}
</script>
<style lang='scss' scoped>
.page-main {
  background: #ffffff;
//   height: 100vh;
  overflow: hidden;
  padding: 0 30px;
  .card {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .card-item {
      visibility: hidden;
      margin-bottom: 25px;
      text-align: center;
      width: 233px;
      border-radius: 10px;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
      cursor: pointer;
      .artInfo {
        text-decoration: none;
        color: black;
      }
      .cardImg {
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cardTitle {
        padding: 8px;
        text-align: left;
        font-size: 15px;
        font-weight: bold;
      }
      .userInfo {
        display: flex;
        font-size: 13px;
        .userpan {
          display: flex;
          flex: 1;
          align-items: center;
          .avatar {
            margin: 5px 5px;
          }
          .nickName {
            text-decoration: none;
            color: rgb(153, 151, 151);
          }
        }
        .icon {
          color: rgb(172, 171, 171);
          padding-top: 10px;
          font-size: 14px;
        }
      }
    }
    .visibles {
      visibility: visible;
    }
  }
}
</style>
