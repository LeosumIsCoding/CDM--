import http from "../http";
import axios from "axios";
// const baseURL = 'http://127.0.0.1:1010';
import BASEURL from "../BASEURL";
import getToken from '@/utils/getToken';

// 用户信息修改
const changeUserInfo = async (userInfo) => {
    return await http.post(
        "/user/changeInfo",
        {
            ...userInfo
        }
    );
};

// 通过token 修改用户信息
const getUserInfoByToken = async () => {
    let token = getToken();
    return await http.post("/user/byTokenGetInfo", {
        token
    });
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

// 获取用户登录信息
const getUserLoginManage = (uid) => {
    return http({
        url: "/user/getUserMangeInfo",
        method: "post",
        data: {
            uid
        }
    });
};


/**
 * 用户退出
 */
const userQuit = (token) => {
    return http({
        url: "/user/userQuit",
        method: "post",
        data: {
            token
        }
    });
};


// 用户找回密码邮箱验证
const forgetPasswordEmailCheck = (username, email) => {
    return http({
        url: "/user/forgetPasswordCheck",
        method: "post",
        data: {
            username,
            email
        }
    });
};

//用户通过验证码更新密码
const forgetPasswordUpdate = (username, email, password) => {
    return http({
        url: "/user/forgetPasswordUpdate",
        method: "post",
        data: {
            username,
            email,
            password
        }
    });
};

export {
    changeUserInfo,
    uploadImg,
    getUserInfoByToken,
    getUserLoginManage,
    userQuit,
    forgetPasswordEmailCheck,
    forgetPasswordUpdate
};