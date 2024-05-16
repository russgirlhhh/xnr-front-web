import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//引入cookies
import VueCookies from 'vue-cookies';
//引入element plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//图标
import './assets/font.scss';
import './assets/base.scss';
import store from './store/index';
// 引用全局组件
import aDialog from '../src/components/aDialog.vue';
import Avatar from '../src/components/Avatar.vue';
import NoData from '../src/components/NoData.vue';
import ImageViewer from '../src/components/ImageViewer.vue';
import EditorHtml from '../src/components/EditorHtml.vue';
import CoverUpload from "@/components/CoverUpload.vue";


//引用全局方法
import Verify from '../src/views/utils/Verify';
import Message from '../src/views/utils/Message';
import Request from '../src/views/utils/Request';
import Confirm from "../src/views/utils/Confirm";


const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(store);
app.component("aDialog",aDialog);
app.component("Avatar",Avatar);
app.component("NoData",NoData);
app.component("ImageViewer",ImageViewer);
app.component("EditorHtml",EditorHtml);
app.component("CoverUpload",CoverUpload);

app.config.globalProperties.VueCookies = VueCookies;
// 统一高度 可修改（侧边框高度）
app.config.globalProperties.globalInfo = {
    bodyHeight:800,
    avatarUrl:"/api/file/getAvatar/",
    imageUrl:"/api/file/getImage/"
};
app.config.globalProperties.Verify = Verify;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Request = Request;
app.config.globalProperties.Confirm = Confirm;

app.mount('#app');