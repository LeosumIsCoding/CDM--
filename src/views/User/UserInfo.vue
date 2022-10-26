<template>
  <div class="container">
    <div class="userBox">
      <div class="userInfo">
        <!-- 头像 -->
        <div class="imgBox">
          <el-upload
            class="avatar-uploader"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleOnChange"
          >
            <img
              w-full
              :src="state.userInfo.header"
              :alt="state.userInfo.header"
            />
          </el-upload>
        </div>
        <!-- 信息 -->
        <div class="infoBox">
          <p>{{ state.userInfo.username }}</p>
          <p>{{ state.userInfo.userType }}</p>
        </div>
      </div>
      <!-- 设置 -->
      <div class="setUpBox">
        <el-form :model="state.userInfo" label-width="120px">
          <el-form-item label="用户名">
            <el-input
              v-model="state.userInfo.username"
              :disabled="state.isDisabled"
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              v-model="state.userInfo.email"
              :disabled="state.isDisabled"
            />
          </el-form-item>
          <div class="">
            <el-form-item label="密码" v-if="!state.isChangePassword">
              <el-input
                v-model="state.userInfo.password"
                disabled
                show-password
              />
            </el-form-item>
          </div>
          <div class="" v-if="state.isChangePassword">
            <el-form-item label="密码">
              <el-input
                v-model="state.newPassword"
                :disabled="state.isShowPassword"
                show-password
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="state.makesureNewPassword"
                :disabled="state.isShowPassword"
                show-password
              />
            </el-form-item>
          </div>
          <el-form-item label="类型">
            <el-radio-group v-model="state.userInfo.type">
              <el-radio :label="0" :disabled="state.isDisabled"
                >开发者</el-radio
              >
              <el-radio :label="1" :disabled="state.isDisabled"
                >使用者</el-radio
              >
              <el-radio :label="2" :disabled="state.isDisabled"
                >管理者</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeUserInfo">
              {{ state.isDisabled ? "修改信息" : "确认修改" }}
            </el-button>
            <el-button type="primary" @click="handleChangePassword"
              >修改密码</el-button
            >
            <el-button type="danger" @click="cancleChange">取消修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { changeUserInfo as changeInfo, uploadImg } from "@/http/api/user.js";
import { ElMessage } from "element-plus";

const state = reactive({
  userInfo: {},
  userType: "",
  isDisabled: true,
  isChangePassword: false,
  newPassword: "", //新密码
  makesureNewPassword: "", // 确认新密码
  isShowPassword: false, //点击修改密码后展示
  dialogVisible: false,
});

onMounted(() => {
  let userInfo = JSON.parse(localStorage.getItem("token"));
  state.userInfo = userInfo;
  // console.log(state.userInfo);
  state.userInfo.userType = seeUserType(state.userInfo.type);
});

//查看用户的身份
const seeUserType = (type) => {
  switch (type) {
    case 0:
      return "开发者";
    case 1:
      return "使用者";
    case 2:
      return "管理者";
    default:
      return "未知";
  }
};

// 修改用户信息
const changeUserInfo = () => {
  if (state.isDisabled) {
    state.isDisabled = !state.isDisabled;
  } else {
    console.log(state.userInfo);
    changeInfo(state.userInfo).then((res) => {
      // console.log(res);
      if (res.data.data == 1) {
        state.isDisabled = !state.isDisabled;
        localStorage.setItem("token", JSON.stringify(state.userInfo));
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "修改失败",
          type: "warning",
        });
      }
    });
  }
};

// 修改密码
const handleChangePassword = () => {
  if (!state.isChangePassword) {
    state.isChangePassword = !state.isChangePassword;
  } else {
    if (
      state.newPassword != state.makesureNewPassword ||
      state.newPassword == "" ||
      state.makesureNewPassword == ""
    ) {
      ElMessage({
        message: "两次输入密码不一致或者输入为空",
        type: "warning",
      });
    } else {
      state.userInfo.password = state.newPassword;
      changeInfo(state.userInfo).then((res) => {
        if (res.data.data == 1) {
          state.isShowPassword = !state.isShowPassword;
          state.isDisabled = !state.isDisabled;
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          changeUserInfo();
        } else {
          ElMessage({
            message: "修改失败",
            type: "warning",
          });
        }
      });
    }
  }
};

// 上传文件（头像）
const handleOnChange = (uploadFile, uploadFiles) => {
  uploadImg(uploadFiles[0].raw).then((res) => {
    state.userInfo.header = res.data;
    // console.log(state.userInfo);
    changeInfo(state.userInfo).then((res) => {
      if (res.data.data == 1) {
        state.isDisabled = !state.isDisabled;
        ElMessage({
          message: "修改成功",
          type: "success",
        });
        changeUserInfo();
      } else {
        ElMessage({
          message: "修改失败",
          type: "warning",
        });
      }
    });
  });
};

const cancleChange = () => {
  state.isDisabled = true;
  state.isChangePassword = false;
  state.isShowPassword = false;
};
</script>

<style lang="less" scoped>
.container {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .userBox {
    width: 100%;
    height: 400px;
    background-color: #e3f9fd;
    border-radius: 15px;
    box-shadow: 5px 3px 10px #999;
    display: flex;
    justify-content: left;
    align-items: center;
    .userInfo {
      width: auto;
      height: auto;
      .imgBox {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-left: 50px;
        box-shadow: 2px 3px 5px rgba(225, 225, 225, 0.4);
        // overflow: hidden;
        cursor: pointer;
        img {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 50%;
          overflow: hidden;
          &:hover {
            filter: blur(1px); /*为了模糊更明显，调高模糊度*/
            box-shadow: 2px 3px 5px #fff;
          }
        }
      }
      .infoBox {
        height: 200px;
        width: 150px;
        text-align: center;
        margin-left: 50px;
        padding: 20px 0;
        box-sizing: border-box;
        p {
          &:nth-child(1) {
            font-weight: 600;
            font-size: 25px;
          }
          &:nth-child(2) {
            margin-top: 5px;
            color: #666;
          }
        }
      }
    }
    .setUpBox {
      min-width: 500px;
      height: 400px;
      margin-left: 25px;
      background-color: #fff;
      padding: 30px;
      padding-left: 0;
      box-sizing: border-box;
    }
  }
}
</style>
