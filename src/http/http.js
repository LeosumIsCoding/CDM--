import axios from "axios";
import qs from 'qs';
import BASEURL from '@/http/BASEURL';
import { ElLoading } from 'element-plus';
let fullscreenLoading = null;

let http = axios.create({
    baseURL: BASEURL,
    timeout: 8000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});


http.interceptors.request.use(function (config) {
    fullscreenLoading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    config.data = qs.stringify(config.data); // 转为formdata数据格式
    return config;
}, function (error) {

    // 请求错误时弹框提示，或做些其他事
    return Promise.reject(error);
});


// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
http.interceptors.response.use(function (response) {
    fullscreenLoading.close();
    console.log(fullscreenLoading);
    // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
    // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http;