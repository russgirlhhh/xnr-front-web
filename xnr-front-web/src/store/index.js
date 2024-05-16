import {
    createStore
} from 'vuex'

export default createStore({
    state: {
        //用户信息
        loginUserInfo: null,
        //是否展示登录
        showLogin: false,
        //消息数量
        messageCountInfo: {},
        //系统设置
        sysSetting: {},
    },
    getters: {
        getLoginUserInfo: (state) => {
            return state.loginUserInfo
        },
        getMessageCountInfo: (state) => {
            return state.messageCountInfo;
        },
    },
    mutations: {
        //更新修改 userInfo
        updateLoginUserInfo(state, value) {
            state.loginUserInfo = value
        },
        showLogin(state, value) {
            state.showLogin = value
        },
        //设置消息数
        updateMessageCountInfo: (state, value) => {
            state.messageCountInfo = value;
        },
        readMessage: (state, value) => {
            state.messageCountInfo.total = state.messageCountInfo.total - state.messageCountInfo[value]
            state.messageCountInfo[value] = 0;
        },
        saveSysSetting: (state, value) => {
            state.sysSetting = value;
        }
    },
    actions: {},
    modules: {}
})