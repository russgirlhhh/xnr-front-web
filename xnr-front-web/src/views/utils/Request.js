import { useStore } from "vuex";

import axios from 'axios'
import {ElLoading} from 'element-plus'
import Message from '../utils/Message.js'
const contentTypeForm = 'application/x-www-form-urlencoded;charset=UTF-8';
const contentTypeJson = 'application/json'
const store = useStore();

const instance = axios.create({
    baseURL:"/api",
    timeout:10*1000,
})
//请求拦截器 主要是显示加载框
let loading = null;
instance.interceptors.request.use(
    (config)=>{
        // 判断 显示加载 是否为true
        if(config.showLoading){
            loading = ElLoading.service({
                lock:true,
                text:"加载中......",
                background:'rgba(0,0,0,0.7)'
            })
        }
        return config;
    },(error)=>{
        if(error.config.showLoading && loading){
            loading.close();
        }
        Message.error("请求发送失败");
        return Promise.reject("请求发送失败");
});
//响应拦截器
instance.interceptors.response.use(
    (response)=>{
        const { showLoading,errorCallback,showError} = response.config;
        if(showLoading&&loading){
            loading.close();
        } 
        const responseData = response.data;
        if(responseData.code == 200){
            return responseData;
        }else if (responseData.code == 901){
            //登陆超时需要将用户信息设为null，并且展示登录框
            store.commit("showLogin",true);
            store.commit("updateLoginUserInfo", result.data);
            // 登录超时不显示错误 showError:false
            return Promise.reject({showError:false,msg:"登录超时"})
        }else {
            if(errorCallback){
                errorCallback(responseData)
            }
            return Promise.reject({showError:showError,msg:responseData.info})
        }
    },(error)=>{
        if(config.showLoading && loading){
            loading.close();
        }
        return Promise.reject({showError:true,msg:"网络异常"})
    }
);

const request = (config)=>{
    const {url,params,dataType,showLoading=true,errorCallback,showError=true} = config
    let formData = new FormData();
    //将参数数据保存到 formData中
    for (let key in params){
        formData.append(key,params[key] == undefined ? "" : params[key])
    }
    let contentType = contentTypeForm;
    if( dataType != null && dataType == "json"){
        contentType = contentTypeJson;
    }
    //传送请求头
    let headers= {
        'Content-Type' : contentType,
        'X-Requested-With': 'XMLHttpRequest',
    }
    // 传送参数，不然拦截器拿不到config配置
    return instance.post(url,formData,{
        headers:headers,
        showLoading:showLoading,
        errorCallback :errorCallback,
        showError : showError
    }).catch((error)=>{
        loading.close();
        if(error.showError){
            Message.error(error.msg);
        }
        return null;
    })
}

export default request;