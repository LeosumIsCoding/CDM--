import http from "../http";
import axios from "axios";
// const baseURL = 'http://127.0.0.1:1010';
import BASEURL from "../BASEURL";

const changeUserInfo = async (userInfo) => {
    return await http.post(
        "/user/changeInfo",
        {
            ...userInfo
        }
    );
};

// 上传文件
const uploadImg = async (file) => {
    let param = new FormData();
    // 向 formData 对象中添加文件
    param.append('file', file);


    return axios({
        url: BASEURL + "/user/upload",
        method: "post",
        data: param,
        headers: { 'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime() }
    });
};

export {
    changeUserInfo,
    uploadImg
};