<template>
<el-config-provider :locale="locale" :message="config">
  <router-view></router-view>
</el-config-provider>
</template>
<script setup>
// elementUI 全局配置 语言
  import {reactive} from 'vue';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  const locale = zhCn;
  // 消息显示最大数
  const config = reactive({
    max:1,
  })
</script>

<style scoped>

</style>
