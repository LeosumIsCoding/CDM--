<template>
  <div class="container">
    <div class="formBack">
      <h1>登录</h1>
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
        <li class="codeBox">
          <div class="codeBoxLeft">
            <el-input
              v-model="state.code"
              clearable
              class="code"
              placeholder="请输入验证码"
            ></el-input>
          </div>
          <div class="codeBoxRight">
            <img :src="state.imgUrl" @click="handleChangeImgCode" alt="" />
          </div>
        </li>
        <li>
          <el-radio-group v-model="state.radio">
            <el-radio :label="0">开发者</el-radio>
            <el-radio :label="1">使用者</el-radio>
            <el-radio :label="2">管理者</el-radio>
          </el-radio-group>
        </li>
        <li>
          <el-button type="primary" class="loginButton" @click="handleLogin"
            >登录</el-button
          >
        </li>
        <li class="formFooter">
          <span>忘记密码</span>
          <span @click="handleRouterRegister">注册帐号</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
// import { Search, Avatar, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import http from "../http/http.js";

// do not use same name with ref
const state = reactive({
  username: "",
  password: "",
  code: "",
  radio: 1,
  keyCode: Math.random() * 1000,
  imgUrl: "",
});

//路由
const router = useRouter();

onMounted(() => {
  state.imgUrl = `http://127.0.0.1:1010/user/code?keyCode=` + state.keyCode;
});

// method

// 修改验证码
const handleChangeImgCode = () => {
  state.imgUrl = `http://127.0.0.1:1010/user/code?${new Date().getTime()}&keyCode=${
    state.keyCode
  }`;
};

// 登录
const handleLogin = () => {
  http
    .post("/user/login", {
      username: state.username,
      password: state.password,
      keyCode: state.keyCode,
      type: state.radio,
      code: state.code,
    })
    .then((res) => {
      console.log(res);
      if (res.status == 200 && res.data != "") {
        if (res.data.username != "-1") {
          localStorage.setItem("token", JSON.stringify(res.data));
          localStorage.setItem("shenfen", state.radio)
          ElMessage({
            message: "登录成功",
            type: "success",
          });
          router.push({
            name: "Home",
          });
        } else {
          ElMessage({
            message: "验证码错误",
            type: "warning",
          });
        }
      } else {
        ElMessage.error("账号或者密码错误");
      }
    });
};

// 跳转路由注册页面·
const handleRouterRegister = () => {
  router.push({
    name: "Register",
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
        .codeBox {
          height: 40px;
        }
      }
      .codeBox {
        display: flex;
        align-items: center;
        .codeBoxLeft {
          width: 50%;
          overflow: hidden;
        }
        .codeBoxRight {
          width: 50%;
          padding-left: 20px;
          height: 40px;
          overflow: hidden;
          box-sizing: border-box;
          img {
            width: 100%;
            height: 40px;
            object-fit: cover;
          }
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
