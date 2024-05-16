<template>
    <div class="no-data">
        <div class="icon-empty">
            <i class="xnr-icon-nothing"></i>
        </div>
        <div class="msg">{{msg}}</div> 
    </div>
</template>
<script setup>
const props = defineProps({
    msg:{
        type:String,
        default:"暂无内容"
    }
})
</script>
<style lang='scss' scoped> 
.no-data{
    text-align: center;
    padding:10px 0;
    margin-right: 100px;
    .icon-empty{
        color:#bbb;
    }
    .msg{
        margin-top: 10px;
        color:rgb(168, 167, 167);
        font-size: 14px;
    }
}
</style>
