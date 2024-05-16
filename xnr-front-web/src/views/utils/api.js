import request from "./Request"
//搜索板块 文章列表
export const loadArticle = (params)=>{
    return request({
        url:'/forum/loadArticle',
        params:params
    })
}
//获取用户信息
export const getUserInfo = ()=>{
    return request({
        url:'/getUserInfo',
    })
}
// 登录验证api在loginAndRegister文件中

//search 获取分类板块
export const getLoadBoard = ()=>{
    return request({
        url:'/board/loadBoard',
    })
}

//获取文章详情
export const getArticleDetail = (params)=>{
    return request({
        url:'/forum/getArticleDetail',
        params:params
    })
}
// 点赞
export const requestDoLike = (params)=>{
    return request({
        url:'/forum/doLike',
        params:params
    })
}
//评论
// 加载文章评论内容
export const requestLoadComment = (params)=>{
    return request({
        url:'/comment/loadComment',
        showLoading:false,
        params:params
    })
}
// 发布评论
export const requestPostComment = (params)=>{
    return request({
        url:'/comment/postComment',
        params:params
    })
}
// 评论点赞
export const requestCommentDoLike = (params)=>{
    return request({
        url:'/comment/doLike',
        showLoading:false,
        params:params
    })
}
// 置顶替换
export const requestChangeTopType = (params)=>{
    return request({
        url:'/comment/changeTopType',
        params:params
    })
}
// 获取用户信息
export const requestGetUserInfo = (params,errorCallBack)=>{
    return request({
        url:'/ucenter/getUserInfo',
        params:params,
        errorCallBack:errorCallBack
    })
}
//获取用户相关文章
export const requestloadUserArticle = (params)=>{
    return request({
        url:'/ucenter/loadUserArticle',
        params:params,
    })
}
//编辑用户资料
export const requestUpdateUserInfo = (params)=>{
    return request({
        url:'/ucenter/updateUserInfo',
        params:params,
    })
}
//获取用户消息数
export const requestGetMessageCount = (params)=>{
    return request({
        url:'/ucenter/getMessageCount',
        params:params,
    })
}
//获取消息列表
export const requestLoadMessageList = (params)=>{
    return request({
        url:'/ucenter/loadMessageList',
        params:params,
    })
}
//搜索
export const requestArticleSearch = (params)=>{
    return request({
        url:'/forum/search',
        params:params,
        showLoading:false,
    })
}
//退出
export const requestLogOut = (params)=>{
    return request({
        url:'/logout',
        params:params,
    })
}
