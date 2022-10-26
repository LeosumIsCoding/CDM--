import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import store from "./store";

console.log("123213");

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
