<template>
    <div
    class="avatar"
    :style="{width:width+'px',height:width+'px','border-radius':width/2+'px'}"> 
    <el-image
    v-if="userId"
        :style="{width:width+'px',height:width+'px','border-radius':width/2+'px'}"
        fit="scale-down"
        :src="proxy.globalInfo.avatarUrl+userId"
        loading="lazy"
        @click="goToUcenter">
    </el-image>
    <div v-else class="no-login">
        未登录
    </div>
    </div>
</template>
<script setup>
import {ref,reactive, getCurrentInstance} from 'vue';
import {useRouter,useRoute} from 'vue-router';
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const props = defineProps({
    userId:{
        type:String,
    },
    width:{
        type:Number,
        default:50,
    },
    addLink:{
        type:Boolean,
        default:true
    }
})

const goToUcenter = ()=>{
    if(props.addLink){
        router.push('/user/'+proxy.userId)
    }
}
</script>
<style lang='scss' scoped> 
.avatar{
    display: flex;
    cursor: pointer;
    background:#f0f0f0;
    align-items: center;
    overflow: hidden;
    .no-login{
        width:100%;
        text-align: center;
        font-size: 13px;
    }
}
</style>
