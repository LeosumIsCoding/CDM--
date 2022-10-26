<template>
  <div class="container">
    <div class="cintainInfo" v-html="info"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: ["info"],

  setup(props) {
    // console.log(props);

    const state = reactive({
      info: props.info,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  // width: 90%;
  height: 100px;
  background-color: #fff;
  box-shadow: 0px 3px 7px #ccc;
  border-radius: 5px;
  margin: 20px;
  .cintainInfo {
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
  }
}

li,
p {
  margin: 10px 0;
}
</style>
