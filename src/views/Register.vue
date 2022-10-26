<template>
  <div class="container">
    <div class="formBack">
      <h1>注册</h1>
      <ul>
        <li>
          <label for="input">
            <el-input
              :prefix-icon="Avatar"
              v-model="state.username"
              class="username"
              id="input"
              placeholder="请输入账号"
              clearable
            />
          </label>
        </li>
        <li>
          <label for="password">
            <el-input
              :prefix-icon="Lock"
              v-model="state.password"
              type="password"
              class="password"
              placeholder="请输入密码"
              show-password
            />
          </label>
        </li>
        <li>
          <label for="makeSurePassword">
            <el-input
              :prefix-icon="Lock"
              v-model="state.makeSurePassword"
              type="makeSurePassword"
              class="password"
              placeholder="确认密码"
              show-password
            />
          </label>
        </li>
        <li class="emailBox">
          <div class="emailLeft">
            <el-input
              :prefix-icon="Message"
              v-model="state.email"
              type="email"
              class="email"
              placeholder="请输入邮箱"
            />
          </div>
          <div class="emailRight">
            <el-button
              type="primary"
              @click="handleSendEmail"
              :disabled="state.isDisabled"
              >获取验证码</el-button
            >
          </div>
        </li>
        <li>
          <label for="keyCode">
            <el-input
              :prefix-icon="Link"
              v-model="state.keyCode"
              class="username"
              id="keyCode"
              placeholder="请输入验证码"
              clearable
            />
          </label>
        </li>
        <li>
          <el-radio-group v-model="state.radio">
            <el-radio :label="0">开发者</el-radio>
            <el-radio :label="1">使用者</el-radio>
            <el-radio :label="2">管理者</el-radio>
          </el-radio-group>
        </li>

        <li>
          <el-button type="primary" class="loginButton" @click="handleRegister"
            >登录</el-button
          >
        </li>
        <li class="formFooter">
          <span>忘记密码</span>
          <span @click="handleRouterLogin">登录帐号</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { Search, Avatar, Lock, Message, Link } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

import http from "../http/http.js";

// do not use same name with ref
const state = reactive({
  username: "",
  password: "",
  makeSurePassword: "",
  email: "",
  makeSureEmail: "",
  radio: 1,
  keyCode: "",
  emailCode: 0, //后端传过来的验证码
  isDisabled: false,
});

//路由
const router = useRouter();

// method
// 注册
const handleRegister = () => {
  if (state.username == "" || state.password == "" || state.email == "") {
    ElMessage({
      showClose: true,
      message: "输入不能为空",
      type: "warning",
    });
  } else if (state.password != state.makeSurePassword) {
    ElMessage({
      showClose: true,
      message: "两次输入密码有误",
      type: "warning",
    });
  } else {
    http
      .post("/user/register", {
        username: state.username,
        password: state.password,
        email: state.email,
        type: state.type,
      })
      .then((res) => {
        if (res.data.data == 1) {
          ElMessage({
            showClose: true,
            message: "注册成功",
            type: "success",
          });
          router.push({
            name: "Login",
          });
        } else {
          ElMessage({
            showClose: true,
            message: "注册失败",
            type: "error",
          });
        }
      });
  }
};

// 发生验证码
const handleSendEmail = () => {
  if (state.email == "") {
    ElMessage({
      showClose: true,
      message: "邮箱不能为空",
      type: "warning",
    });
  } else {
    http
      .post("/user/sendEamil", {
        username: state.username,
        email: state.email,
      })
      .then((res) => {
        if (res.data.data == -1) {
          ElMessage({
            showClose: true,
            message: "用户名已经存在",
            type: "warning",
          });
        } else if (res.data.data == -2) {
          ElMessage({
            showClose: true,
            message: "邮件发送失败",
            type: "error",
          });
        } else {
          state.emailCode = res.data.data;
          console.log(state.emailCode);
        }
      });
  }
};

// 跳转登录页面
const handleRouterLogin = () => {
  router.push({
    name: "Login",
  });
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  background-image: url(../static/img/login.jpg);
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .formBack {
    width: auto;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 3px 5px rgba(225, 225, 225, 0.4);
    h1 {
      text-align: center;
    }
    ul {
      min-width: 450px;
      li {
        margin: 20px 0;
        width: 100%;
        .username {
          height: 40px;
        }
        .password {
          height: 40px;
        }
        .email {
          height: 40px;
        }
      }
      .emailBox {
        display: flex;
        justify-content: space-between;
        align-content: center;
        .emailLeft {
          width: 70%;
        }
      }

      .loginButton {
        width: 100%;
        height: 40px;
      }
    }
    .formFooter {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #666;
      span {
        &:hover {
          color: #e6a23c;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
