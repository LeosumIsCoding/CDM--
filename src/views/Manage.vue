<template>
    <div>
        13213
        <router-view></router-view>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted,getCurrentInstance } from "vue";
  import {useStore} from 'vuex'
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
  

  </script>
  
  <style lang="less" scoped>

  </style>
  