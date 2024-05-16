<template>
  <div>
    <aDialog
      :show="dialogConfig.show"
      :buttons="dialogConfig.buttons"
      :title="dialogConfig.title"
      width="400px"
      :showCancel="false"
      @close="closeDialog"
    >
      <el-form
        :rules="rules"
        ref="formDataRef"
        :model="formData"
        class="login-register"
      >
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input
            clearable
            placeholder="请输入邮箱"
            size="large"
            v-model="formData.email"
            maxlength="150"
          >
            <template #prefix>
              <i class="xnr-icon-phone icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item prop="password" v-if="opType==1">
          <el-input
            placeholder="请输入密码"
            size="large"
            v-model="formData.password"
            :type="passwordEyeType.passwordEyeOpen?'text':'password'"
          >
            <template #prefix>
              <i class="xnr-icon-password icon"></i>
            </template>
            <template #suffix>
              <span 
              :class="['iconfont',passwordEyeType.passwordEyeOpen?'xnr-icon-zhengyan':'xnr-icon-biyan']" 
              @click="eyeChange('passwordEyeOpen')">
                  
              </span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 注册 -->
        <div v-if="opType==0 || opType==2">
        <!-- 邮箱验证码 -->
        <el-form-item prop="emailCode">
          <div class="send-email-panel">
            <el-input
              clearable
              placeholder="请输入邮箱验证码"
              size="large"
              v-model="formData.emailCode"
            >
              <template #prefix>
              <i class="xnr-icon-yanzheng icon"></i>
              </template>
            </el-input>
            <el-button 
            type="primary"
             size="large"
              class="send-email-btn"
              @click="getEmailCode">获取验证码</el-button>
          </div>
          <el-popover placement="left" :width="250" trigger="click">
                <div>
                  <p>请稍等一会，再次点击获取</p>
              </div>
          <template #reference>
              <span class="a-link" :style="{'font-size':'12px'}">未收到手机验证码？</span>
          </template>
        </el-popover>
        </el-form-item>
        <!--  输入昵称 -->
        <el-form-item prop="nickName" v-if="opType == 0">
          <el-input
            clearable
            placeholder="请输入昵称"
            size="large"
            v-model="formData.nickName"
            maxlength="20"
          >
            <template #prefix>
              <i class="xnr-icon-name icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <!-- 注册密码 -->
        <el-form-item prop="registerPassword">
          <el-input
            placeholder="请输入密码"
            size="large"
            v-model="formData.registerPassword"
            :type="passwordEyeType.registerPasswordEyeOpen?'text':'password'"

          >
          <!-- 密码 -->
            <template #prefix>
              <i class="xnr-icon-password icon"></i>
            </template>
            <!-- 眼睛 -->
            <template #suffix>
              <span 
              :class="['iconfont',passwordEyeType.registerPasswordEyeOpen?'xnr-icon-zhengyan':'xnr-icon-biyan']" 
              @click="eyeChange('registerPasswordEyeOpen')">
                  
              </span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 请再次输入密码 -->
        <el-form-item prop="reRegisterPassword">
          <el-input
            placeholder="请再次输入密码"
            size="large"
            v-model="formData.reRegisterPassword"
            :type="passwordEyeType.reRegisterPasswordEyeOpen?'text':'password'"
          >
            <template #prefix>
              <i class="xnr-icon-password icon"></i>
            </template>
            <template #suffix>
              <span 
              :class="['iconfont',passwordEyeType.reRegisterPasswordEyeOpen?'xnr-icon-zhengyan':'xnr-icon-biyan']" 
              @click="eyeChange('reRegisterPasswordEyeOpen')">
              </span>
            </template>
          </el-input>
        </el-form-item>
        </div>
        <!-- 验证码  -->
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input
              clearable
              placeholder="请输入验证码"
              size="large"
              v-model="formData.checkCode"
            >
              <template #prefix>
              <i class="xnr-icon-yanzheng icon"></i>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl"
              alt="验证码"
              class="code"
              @click="changeCheckCode(0)"
            />
          </div>
        </el-form-item>
        <el-form-item v-if="opType==1">
          <div class="rem-panel">
            <el-checkbox v-model="formData.remMe">记住我</el-checkbox>
          </div>
          <div class="no-account">
            <a class="a-link" href="javascript:void(0)" @click="showPanel(2)">忘记密码？</a>
            <a class="a-link" href="javascript:void(0)" @click="showPanel(0)">没有账号</a>
          </div>
        </el-form-item>
        <el-form-item v-if="opType==0">
            <a class="a-link" href="javascript:void(0)" @click="showPanel(1)">已有账号？</a>
        </el-form-item>
        <el-form-item v-if="opType==2">
            <a class="a-link" href="javascript:void(0)" @click="showPanel(1)">去登录？</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="op-btn" @click="doSubmit">
            <span v-if="opType==0">注册</span>
            <span v-if="opType==1">登录</span>
            <span v-if="opType==2">重置密码</span>
          </el-button>
        </el-form-item>
      </el-form>
    </aDialog>
    <aDialog
      :show="dialogConfig4SendCode.show"
      :buttons="dialogConfig4SendCode.buttons"
      :title="dialogConfig4SendCode.title"
      width="500px"
      :showCancel="false"
      @close="dialogConfig4SendCode.show = false">
      <el-form 
        :rules="rules"
        ref="formDataRef4SendCode"
        :model="formData4SendCode"
        label-width="80px"
      >
      <el-form-item label="邮箱">
        {{formData.email}}
      </el-form-item>
      <!-- 验证码  -->
        <el-form-item label="验证码" prop="checkCode">
          <div class="check-code-panel">
            <el-input
              clearable
              placeholder="请输入验证码"
              size="large"
              v-model="formData4SendCode.checkCode"
            >
              <template #prefix>
                <span>icon</span>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl4SendCode"
              alt="验证码"
              class="code"
              @click="changeCheckCode(1)"
            />
          </div>
        </el-form-item>
      </el-form>

    </aDialog>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from 'js-md5'
import {useStore} from 'vuex'
const store = useStore();
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const api = {
  checkCode: "/api/checkCode",
  sendEmailCode:"/sendEmailCode",
  register:"/register",
  login:"/login",
  resetPwd:"resetPwd"
};
// 0:注册 1：登录 2：找回密码
const opType = ref();
const showPanel = (type) => {
  opType.value = type;
  resetForm();
};
defineExpose({ showPanel });
//再次输入密码 校验密码是否相同
const checkRepassword = (rule,value,callback)=>{
  if(value !== formData.value.registerPassword){
    callback(new Error(rule.message));
  }else {
    callback();
  }
}
const formData = ref({});
const formDataRef = ref();
const rules = {
    email:[
      {required:true,message:"请输入邮箱"},
      {validator:proxy.Verify.email,message:"请输入正确的邮箱"}
  ],
  //登录密码不需要校验
  password:[{required:true,message:"请输入密码"}],
  emailCode:[{required:true,message:"请输入邮箱验证码"}],
  nickName:[{required:true,message:"请输入昵称"}],
  registerPassword:[
    {required:true,message:"请输入密码"},
    {
      validator:proxy.Verify.password,
      message:"密码只能是数字，字母，特殊字符，长度8-18位"
    }
  ],
  reRegisterPassword:[
    {required:true,message:"请再次输入密码"},
    {
      validator:checkRepassword,
      message:"两次输入的密码不一致"
    }
  ],
  checkCode:[{required:true,message:"请输入图片验证码"}],


};
// 重置表单
const resetForm = ()=>{
    dialogConfig.show = true;
    if(opType.value == 0){
        dialogConfig.title = "注册";
    }else if(opType.value == 1){
        dialogConfig.title = "登录";
    }else if(opType.value == 2){
        dialogConfig.title = "重置密码";
    }
    //刷新 表单数据和验证码
    nextTick(()=>{
        changeCheckCode(0);
        formDataRef.value.resetFields();//表单校验清除
        formData.value={};//表单内容清除

      //登录 
    if(opType.value == 1){
      const cookieLoginInfo = proxy.VueCookies.get('loginInfo');
      //如果cookie中有信息，就直接赋值到表单中
      if(cookieLoginInfo){
        formData.value = cookieLoginInfo;
      }
    }
    })

}
//登录注册弹框
const dialogConfig = reactive({
  show: false,
  title: "标题",
});
//发送验证码弹框
const formData4SendCode = ref({});
const formDataRef4SendCode = ref();
const dialogConfig4SendCode = reactive({
  show:false,
  title:"发送邮箱验证码",
  buttons:[
    {
      type:"primary",
      text:"发送验证码",
      click:()=>{
        sendEmailCode();
      }
    } 
  ]
})
//点击获取验证码 弹出发送验证码弹框
const getEmailCode = ()=>{
  // 校验表单，看是否有email内容，如果每填写 就不会触发 直接return 
  formDataRef.value.validateField("email",(valid)=>{
    if(!valid){
      return;
    }
  dialogConfig4SendCode.show = true;
  //在弹框弹出时要做的
  nextTick(()=>{
    //刷新验证码
    changeCheckCode(1);
    //利用el-form中的方法 resetFields 清空表单
    formDataRef4SendCode.value.resetFields();
    formData4SendCode.value = {
      email:formData.value.email
    }
  })
  })
}
//发送邮箱验证码
const sendEmailCode = ()=>{
  formDataRef4SendCode.value.validate(async (valid)=>{
    if(!valid){
      return;
    }
    const params = Object.assign({},formData4SendCode.value);
    params.type = opType.value==0?0:1;//是注册就为0 不是就为1（找回密码）
    let result = await proxy.Request({
      url:api.sendEmailCode,
      params:params,
      errorCallback:()=>{
        changeCheckCode(1)
      }
    })
    
    if(!result){
      return;
    }
    proxy.Message.success("验证码发送成功")
    dialogConfig4SendCode.show = false;
  })
}
//控制密码 眼睛状态 初始状态都是闭眼
const passwordEyeType = reactive({
    passwordEyeOpen:false,
    registerPasswordEyeOpen:false,
    reRegisterPasswordEyeOpen:false,
})
const eyeChange = (type)=>{
    passwordEyeType[type] = !passwordEyeType[type]
}
//验证码
const checkCodeUrl = ref(api.checkCode);
const checkCodeUrl4SendCode = ref(api.checkCode)
// 点击触发事件 修改验证码的url
const changeCheckCode = (type) => {
  if(type==0){
  checkCodeUrl.value = api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
  }else{
  checkCodeUrl4SendCode.value = api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
  }
};
//登录 注册 重置密码 提交表单
const doSubmit = ()=>{
  //表单校验
  formDataRef.value.validate(async (valid)=>{
    if(!valid){
      return;
    }
    const params =  Object.assign({},formData.value);//合并参数
    //注册 重置密码时 参数中的password 要设置为 registerPassword
    if( opType.value == 0 || opType.value ==2){
      params.password = params.registerPassword;
      delete params.registerPassword;
      delete params.reRegisterPassword;
    }
    //登录
    if(opType.value == 1){
        let cookieLoginInfo = proxy.VueCookies.get("loginInfo");
        let cookiePassword = 
        cookieLoginInfo == null?null:cookieLoginInfo.password;
        //如果cookie密码和 params中的密码不同，说明输入的是原始密码，需要md5加密
        if(params.password !== cookiePassword){
          params.password = md5(params.password);
        }
    }
    let url = null;
    if(opType.value==0){
      url = api.register;
    }else if(opType.value==1){
      url = api.login;
    }else if(opType.value==2){
      url = api.resetPwd;
    }
    let result = await proxy.Request({
      url:url,
      params:params,
      errorCallback:()=>{
        changeCheckCode(0);
      },
    })
    //如果接收数据有误 直接return
    if(!result){
      return;
    }
    //注册 登录 重置密码 成功之后的操作
    if(opType.value==0){
      proxy.Message.success("注册成功，请登录");
      showPanel(1);//跳转到登录页面
    }else if(opType.value==1){
      //记住我
      if(params.remMe){
        const loginInfo = {
          email :params.email,
          password :params.password,
          remMe :params.remMe,
        }
        //如果点了记住我 要将信息保存到cookie中
        proxy.VueCookies.set("loginInfo",loginInfo,"7d");
      }else{
        proxy.VueCookies.remove("loginInfo")
      }
      dialogConfig.show = false;
      proxy.Message.success("登录成功")
      //登陆后更新用户信息
      store.commit("updateLoginUserInfo",result.data)

    }else if(opType.value==2){
      proxy.Message.success("重置密码成功，请登录")
      showPanel(1);
    }
  })
}
//点击弹框 × 时要修改登录状态
const closeDialog = ()=>{
  dialogConfig.show = false;
  store.commit("showLogin",false)
}
</script>
<style lang='scss' scoped>
.login-register {

  .send-email-panel{
      display: flex;
      justify-content: space-between;
      width:100%;
      .send-email-btn{
          margin-left: 5px;
      }
  }
  .rem-panel {
    width: 100%;
  }
  .no-account {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .op-btn {
    width: 100%;
  }
}
  .check-code-panel {
    display: flex;
    .code {
      margin-left: 5px;
      cursor: pointer;
    }
  }
</style>
