<template>
  <div>
    <el-container class="layout-container-demo" style="height: 100vh">
      <el-aside width="200px">
        <el-col :span="24">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1-1"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Place /></el-icon>
                <span>多源病历</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1" @click="handleRoute('fangyao')"  >方药</el-menu-item>
                <el-menu-item index="1-2" @click="handleRoute('lizi')">lizi</el-menu-item>
                <el-menu-item index="1-3" @click="handleRoute('fangjie')">fangjie</el-menu-item>
                <el-menu-item index="1-4" @click="handleRoute('zucheng')">组成</el-menu-item>
                <el-menu-item index="1-5" @click="handleRoute('jiajian')">jiajian</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><CopyDocument /></el-icon>
                <span>CDM管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="handleRoute('Standard')"
                  >标准化词汇表</el-menu-item
                >
                <el-menu-item
                  index="2-2"
                  @click="handleRoute('StandardClassification')"
                  >标准化分类</el-menu-item
                >
                <el-menu-item index="2-3" @click="handleRoute('Terminology')"
                  >中医术语规范</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Document /></el-icon>
                <span>ETL映射工具</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="3-1">item one</el-menu-item>
                <el-menu-item index="3-2">item one</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><location /></el-icon>
                <span>数据分析</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="4-1">item one</el-menu-item>
                <el-menu-item index="4-2">item one</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><IconMenu /></el-icon>
                <span>系统用户管理</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="5-1">item one</el-menu-item>
                <el-menu-item index="5-2">item one</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="6">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>模块设置</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="6-1">item one</el-menu-item>
                <el-menu-item index="6-2">item one</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header class="headerBox">
          <div class="searchBox">
            <el-input
              v-model="state.search"
              placeholder="Search something"
              clearable
              v-show="route.meta.searchShow"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><search /></el-icon>
              </template>
              <template #append>{{ state.routeQuery }}</template>
            </el-input>
            <div
              class="resultList"
              ref="wrapper"
              v-if="state.resultList.length != 0"
            >
              <ul>
                <li v-for="(item, index) in state.resultList" :key="index">
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="toolbar">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px; color: #fff"
                ><setting
              /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleChangeUserInfo"
                    >用户信息</el-dropdown-item
                  >
                  <el-dropdown-item @click="handleExit"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>{{ state.user.username }}</span>
          </div>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";
import debounce from "../utils/debounce";
import { handleSearchClassficiation } from "../http/api/Search.js";
import BScroll from "better-scroll";
import {
  Document,
  CopyDocument,
  Menu as IconMenu,
  Location,
  Setting,
  Place,
  Search,
} from "@element-plus/icons-vue";

const state = reactive({
  user: {},
  search: "",
  routeQuery: "",
  resultList: [],
});

// betterScroll
const wrapper = ref(null);

const router = useRouter();
const route = useRoute();

// console.log();

const handleSearch = () => {
  handleSearchClassficiation(state.routeQuery, state.search).then((res) => {
    // console.log(res);
    state.resultList = res.data;
    console.log(state.resultList);
  });
};

watch(
  () => route.query.tableName,
  (newVal, oldVal) => {
    state.routeQuery = newVal || "";
  }
);

watch(
  () => state.search,
  (newVal, oldVal) => {
    // console.log(newVal);
    if (state.search.trim() != "") {
      debounce(handleSearch());
    } else {
      state.resultList = [];
    }
  }
);

// 生命周期
onMounted(() => {
  let user = JSON.parse(localStorage.getItem("token"));
  state.user = user;
  state.routeQuery = route.query.tableName || "";
});

const handleOpen = (key, keyPath) => {};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleRoute = (tempName) => {
  router.push({
    name: tempName,
  });
};

// 退出登录
// mounted
const handleExit = () => {
  localStorage.removeItem("token");
  router.push({
    name: "Login",
  });
};

// 修改用户信息
const handleChangeUserInfo = () => {
  router.push({
    name: "UserInfo",
  });
};
</script>

<style lang="less" scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #155faa;
  color: #fff;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #155faa;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.headerBox {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .searchBox {
    width: 600px;
    margin-left: 100px;
    position: relative;
    .resultList {
      width: 600px;
      max-height: 400px;
      background-color: #fff;
      z-index: 2;
      position: absolute;
      margin-top: 2px;
      border-radius: 3px;
      overflow: auto;
      ul {
        padding: 10px;
        box-sizing: border-box;
        li {
          padding: 5px;
          color: #000;
          border-bottom: 1px dashed #ccc;
          font-size: 14px;
          transition: 0.2s;
          &:hover {
            cursor: pointer;
            background-color: #f5f7fa;
          }
        }
      }
    }
  }
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 4px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
</style>
