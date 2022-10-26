<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {onMounted} from 'vue'
export default {
  setup() {
    return {};
  },

  onMounted(){
    console.log(123);
  }
};
</script>

<style lang="less">
@import "./static/css/reset.css";
</style>
