<template>
    <div> 
        <el-dialog
            :model-value="show"
            :show-close="showClose"
            :title="title"
            :draggable="true"
            :close-on-click-modal="false"
            class="cust-dialog"
            :width="width"
            :top="top"
            :before-close="handleClose"
            @close="close">
            <div class="dialog-body">
                <slot></slot>
            </div>
            <template v-if="(buttons && buttons.length>0) || showCancel">
                <div class="dialog-footer">
                <el-button link @click="close">取 消</el-button>
                <el-button v-for="btn in buttons" :type="btn.type" @click="btn.click">
                    {{btn.text}}
                </el-button>
            </div>
            </template>
            
        </el-dialog>
    </div>
</template>
<script setup>
//props
const props = defineProps({
    show:{
        type:Boolean,
        default:true
    },
    title:{
        type:String,
        default:""
    },
    showClose:{
        type:Boolean,
        default:true
    },
    width:{
        type:String,
        default:"30%"
    },
    top:{
        type:String,
        default:"50px"
    },
    buttons:{
        type:Array
    },
    showCancel:{
        type:Boolean,
        default:true
    }
})
const emit = defineEmits()
const close = ()=>{
    // 因为控制是否显示的是父组件的属性 所以要修改应该触发父组件 由父组件修改
    emit("close");
}

</script>
<style lang='scss' scoped> 
.cust-dialog{
    margin-bottom:10px;
    // 修改原来样式
    .el-dialog__body{
        padding:0px;
    }
    .dialog-body{
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding:15px;
        min-height:100px;
        max-height: calc(100vh - 250px);
        overflow: auto;
    }
    .dialog-footer{
        text-align: right;
        padding:10px 20px;
    }
}
</style>
