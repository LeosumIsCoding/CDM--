<template>
  <!-- 首页 -->
  <div>
    <div class="container">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">
          <el-icon><DArrowLeft /></el-icon
        ></el-radio-button>
        <el-radio-button :label="true">
          <el-icon><DArrowRight /></el-icon
        ></el-radio-button>
      </el-radio-group>
      <div class="containMain">
        <div class="containMainLeft">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1" @click="handleRoute('DiseaseCategory')">
              <el-icon><Promotion /></el-icon>
              <template #title>中医疾病类目</template>
            </el-menu-item>
            <el-menu-item index="2" @click="handleRoute('TCMSyndromes')">
              <el-icon><Finished /></el-icon>
              <template #title>中医证候类目</template>
            </el-menu-item>
            <el-menu-item index="3" @click="handleRoute('GovernanceTerms')">
              <el-icon><icon-menu /></el-icon>
              <template #title>治法术语</template>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="containMainRight">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  Menu as IconMenu,
  Promotion,
  Finished,
  DArrowLeft,
  DArrowRight,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isCollapse = ref(store.getters.closeState);

const handleOpen = (key, keyPath) => {
  store.dispatch("changeIsClose");
};
const handleClose = (key, keyPath) => {
  store.dispatch("changeIsClose");
};

const handleRoute = (tempName) => {
  router.push({
    name: tempName,
  });
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 650px;
}

.el-menu-vertical-demo {
  height: 650px;
}

.container {
  width: 100%;
  height: 710px;
  padding: 5px;
  box-sizing: border-box;
  .containMain {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: left;
    .containMainRight {
      padding: 5px;
      box-sizing: border-box;
    }
  }
}
</style>
