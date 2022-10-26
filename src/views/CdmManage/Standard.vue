<template>
  <!-- 标准词汇表 -->
  <div class="container">
    <div class="containLeft">
      <ul v-for="(item, index) in state.tipList" :key="index">
        <li @click="handleClick(item.mainInfo)">{{ item.tipTitle }}</li>
        <li
          v-for="(v, i) in item.child"
          :key="i"
          @click="handleClick(v.contain)"
        >
          {{ v.name }}
        </li>
      </ul>
    </div>
    <div class="containRight" v-if="state.isShow">
      <TipInfo :info="state.info" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, nextTick } from "vue";
import TipInfo from "../../components/TipInfo.vue";

const state = reactive({
  tipList: [],
  info: "",
  isShow: false,
});

const handleClick = (contain) => {
  // console.log(contain);
  state.info = contain;
  state.isShow = true;
};

onMounted(() => {
  axios.get("/tip.json").then((res) => {
    console.log(res);
    state.tipList = res.data;
    state.info = state.tipList[0].mainInfo;
    state.isShow = !state.isShow;
  });
});
</script>

<style lang="less" scoped>
.container {
  height: auto;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  .containLeft {
    width: 20%;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 14px;
    ul {
      li {
        &:nth-child(1) {
          padding: 2px 0;
          font-weight: bold;
        }
        color: #666;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  .containRight {
    width: 80%;
    height: auto;
  }
}
</style>
