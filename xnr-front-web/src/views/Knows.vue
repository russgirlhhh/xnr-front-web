<template>
  <div>
    <div class="a-swiper">
      <xswiper :list="list"></xswiper>
    </div>
    <div class="cards">
      <div class="season">
        <i class="xnr-icon-chun"></i>
        <span>春季产物</span>
        <Cards :articleList="articleList1"></Cards>
      </div>
      <div class="season">
        <i class="xnr-icon-xia"></i>
        <span>夏季产物</span>
        <Cards :articleList="articleList2"></Cards>

      </div>
      <div class="season">
        <i class="xnr-icon-qiu"></i>
        <span>秋季产物</span>
        <Cards :articleList="articleList3"></Cards>

      </div>
      <div class="season">
        <i class="xnr-icon-dong"></i>
        <span>冬季产物</span>
        <Cards :articleList="articleList4"></Cards>

      </div>
    </div>

  </div>
</template>
<script setup>
//swiper
import xswiper from "../components/Swiper.vue";
import Cards from "../components/Cards.vue";
const list = [
  { pic: "src/assets/img/swiper1.jpg" },
  { pic: "src/assets/img/swiper2.png" },
  { pic: "src/assets/img/swiper3.png" },
];
import { ref, onMounted, reactive, nextTick } from "vue";
const articleList1 = [{title:'西红柿',color:'#f06b6b'},{title:'草莓',color:'#ca1414'},{title:'南瓜',color:'#eb9b07'},{title:'茄子',color:'#700370'}]
const articleList2 = [{title:'黄瓜',color:'#0a8314'},{title:'胡萝卜',color:'#e46b09'},{title:'辣椒',color:'#c71b04'},{title:'芹菜',color:'#62b939'}]
const articleList3 = [{title:'香菜',color:'#4a9726'},{title:'香蕉',color:'#f1ee2c'},{title:'苹果',color:'#d42a46'}]
const articleList4 = [{title:'大白菜',color:'#92b367'},{title:'包菜',color:'#c7e79e'},{title:'柑橘',color:'#e96c05'}]


</script>
<style lang='scss' scoped>
.main {
  // height: 1000px;
  // 上 右 下 左
  margin: 80px 10px 10px 260px;

  .a-swiper {
    height: 300px;
    padding: 10px;
  }
  .cards {
    // margin-top: 50px;
    width: 90%;
    margin: 30px 55px 0 55px;
    .season {
      font-size: 28px;
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      span {
        font-weight: 800;
      }
    }
  }
  i {
    margin-right: 8px;
    font-size: 30px;
  }
}
.page-main {
  background: #fff;
  height: 100vh;
  overflow: hidden;
  padding: 0 30px;
  .card {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .card-item {
      visibility: hidden;
      margin-bottom: 20px;
      text-align: center;
      width: 216px;
      border-radius: 16px;
    }
    .visibles {
      visibility: visible;
    }
  }
}
</style>

