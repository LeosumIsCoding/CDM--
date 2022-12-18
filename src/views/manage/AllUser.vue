<template>
    <el-table :data="state.userData" style="width: 100%">

      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="password" label="密码" width="120" />
      <el-table-column prop="type" label="身份" width="120" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="header" label="头像" width="120" />
      <el-table-column fixed="isdeleted" label="状态" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >Detail</el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script lang="ts" setup>
import { reactive ,onMounted} from 'vue';
import http from '../../http/http';
  const handleClick = () => {
    console.log('click')
  }
  

  const state = reactive({
    userData:[]
  })

  onMounted(()=>{
    http.get("/user/get/all-user").then(res=>{
        state.userData = res.data
        console.log(state.userData);
        
    })
  })
  </script>
  
  
  <style lang="less" scoped>

  </style>
  