<template>
<div class="content">
    <div
      v-for="(item, index) in articleList"
      :key="index"
      class="card-item"
    >
      <div class="cardTitle" :style="{'background':item.color}">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
<!-- 添加!loading 在加载时不出现之前现有的数据 -->
  <!-- <div class="content" v-if="!loading">
    <div
      v-for="(item, index) in articleList"
      :key="index"
      class="card-item"
    >
    <router-link class="artInfo" :to="`/post/${item.articleId}`">
      <div class="cardImg" v-if="item.cover">
        <img :src="'/api/file/getImage/'+item.cover" />
      </div>
      <div class="cardTitle">
        <span>{{ item.title }}</span>
      </div>
    </router-link>
      <div class="userInfo">
        <div class="userpan">
          <Avatar :userId="item.userId" :width="30" class="avatar"></Avatar>
        <router-link :to="'/user/'+item.userId" class="nickName">{{item.nickName}}</router-link>

        </div>
       <span class="icon xnr-icon-good">
          {{item.goodCount == 0 ? "点赞":item.goodCount}}
        </span>
      </div>
    </div>
  </div> -->
</template>
<script setup>
import { defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const props = defineProps({
  articleList: {
    type: Array,
  },
});
  
</script>
<style lang='scss' scoped>
.skeleton{
  
}
// 瀑布流
.content{
  width: 100%;
  display: flex;
  overflow: hidden;
}
.card-item{
  width:calc(100% / 4 - 20px / 4);
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
  margin-right: 30px;
  .artInfo{
    text-decoration: none;
    color:black;
  }
  .cardImg{
    height: 50px;
  }
  .cardTitle {
  border-radius: 10px;
  opacity: 0.6; 
    padding: 8px;
    text-align: left;
    font-size: 18px;
  font-weight: bold;
  color: #fff;
  }

}

.item:nth-child(4n) {
  /* 去除第3n个的margin-right */
  margin-right: 0;
}


//弹窗样式
// ::v-deep .el-dialog__header {
//     padding-bottom:0px;
// }
// .detail{
//     width:800px;
//     height:700px;
//     background-color: aqua;
//     padding:0;
//     .dimg{
//         width:50%;
//         display: inline-block;
//         background-color: aqua;
//         img{
//             width:100%
//         }

//     }
//     .word{
//         width:50%;
//         display: inline-block;
//         background-color: bisque;
//         .title{

//         }
//         .paper{

//         }
//     }
// }
</style>
