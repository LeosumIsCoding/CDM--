<template>
  <div id="main">
    <div class="search-widget">
      <div class="search-line">
        <div class="text-input">
          <el-input v-model="store.state.Yaofang.input.lizi" placeholder="关键字请用空格分隔" />
          <el-button type="primary">搜素例子</el-button>
        </div>
      </div>
  
      <div class="show-widget">
        <ShowWidget v-for="(fangyao,index) in lizi" :key="index" :data="fangyao" />
      </div>
    </div>
  </div>
  </template>
    
  <script setup>
  import "@/static/css/iconfont.css";
  import ShowWidget from './ShowWidget.vue'
  import { useStore } from "vuex";
  import {computed, defineComponent, reactive} from 'vue'
  
  const store = useStore()
  console.log(store);
  const component = defineComponent({
    ShowWidget
  })
  
  const state = reactive({
    index:0
  })
  
  const lizi = computed(()=> store.getters["Yaofang/getLiziNeed"])
  
  // const index = computed(()=>store.state.Yaofang.index.fangyao)
  
  // const indexChange = (index)=>{
  //   state.index = index
  //   store.commit("Yaofang/changeFangyaoIndex", index)
  // }
  </script>
    
  <style lang="less" scoped>
  #main{
    padding: 20px;
  
    .search-line{
  
      .text-input{
        display: flex;
      width: 800px;
    }
    }
    .search-widget{
      border-radius: 10px;
      height: 100vh;
      .show-widget{
        
        // overflow:scroll;
      }
    }
  
  
  }
  </style>
    