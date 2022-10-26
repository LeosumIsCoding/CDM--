<template>
  <div class="container" ref="container">
    <div class="tableContain">
      <ul>
        <li>
          <span>术语类目代码</span>
          <span>中医疾病名术语与分类</span>
        </li>
        <li v-for="(item, index) in state.tableData" :key="index">
          <span> {{ item.termcategorycode }} </span
          ><span :style="{ textIndent: `${item.termtype}em` }">
            {{ item.classification }}
          </span>
        </li>
      </ul>
      <div class="demo-pagination-block">
        <el-pagination
          :currentPage="state.currentPage"
          :total="state.totalPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch, computed, ref } from "vue";
import { getDiseasecategory } from "@/http/api/Terminology.js";
import { useStore } from "vuex";

const store = useStore();

const state = reactive({
  tableData: [],
  isClose: computed(() => store.getters.closeState),
  totalPage: 0,
  currentPage: 1,
  page: 1,
  pageSize: 15,
});

const getPageInfo = () => {
  getDiseasecategory(state.page, state.pageSize).then((res) => {
    state.tableData = res.data.records;
    state.totalPage = res.data.pages;
    console.log(res);
  });
};

const handleSizeChange = (newVal) => {};
const handleCurrentChange = (val) => {
  state.currentPage = val;
  state.page = val;
  getPageInfo();
};

onMounted(() => {
  getPageInfo();
});

watch(
  () => state.isClose,
  (newVal, oldVal) => {}
);
</script>

<style lang="less" scoped>
.container {
  width: 72vw;
  height: 640px;
  transition: all 0.2s initial;
  .tableContain {
    flex: 1;
    height: 100%;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #dcdfe6;
    li {
      display: flex;
      border-top: 1px solid #dcdfe6;
      justify-content: space-between;
      span {
        flex: 1;
        padding: 7px;
        box-sizing: border-box;
        text-align: center;
      }
      &:nth-child(1) {
        color: #000;
        font-weight: bold;
      }
      &:nth-child(n + 2) {
        cursor: pointer;
        &:hover {
          background-color: #f5f7fa;
        }
        span {
          &:nth-child(2) {
            text-align: left;
            color: #666;
          }
        }
      }
    }

    .demo-pagination-block {
      display: flex;
      justify-content: center;
    }
    .demo-pagination-block + .demo-pagination-block {
      margin-top: 10px;
    }
    .demo-pagination-block .demonstration {
      margin-bottom: 16px;
    }
  }
}
</style>
