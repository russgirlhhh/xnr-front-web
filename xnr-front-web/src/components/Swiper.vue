<template>
    <swiper
    :autoplay="swiper_option.autoplay"
    :loop="swiper_option.loop"
    :speed="swiper_option.speed"
    :pagination="swiper_option.pagination"
  >
    <swiper-slide v-for="(item,index) in list" :key="index">
        <img :src="item.pic" style="height:300px;width:100%;">
    </swiper-slide>
    
  </swiper>
</template>
<script>
//swiper
import {reactive} from 'vue'
import {Swiper,SwiperSlide} from 'swiper/vue';
import 'swiper/swiper.min.css';
import SwiperCore,{Autoplay,Pagination} from 'swiper'
SwiperCore.use([Autoplay,Pagination])
export default {
    props:{
        list:{
            type:Array,
            required:true
        }
    },
  components:{
    SwiperSlide,
    Swiper
  },
  setup() {
      const swiper_option=reactive({
          autoplay:{
              delay:3000,
              disableOnInteraction:false
          },
          loop:true,
          speed:1000,
          pagination:{
              clickable:true
          }
      })
      return{
          swiper_option
      }
  }
}
</script>
<style lang='scss' scoped> 
</style>
