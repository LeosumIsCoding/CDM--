<template>
  <div class="container">
    <el-table :data="state.tableData" stripe style="width: 100%">
      <el-table-column
        prop="termsnums"
        show-overflow-tooltip
        label="编号"
        width="180"
      />
      <el-table-column
        prop="termsname"
        show-overflow-tooltip
        label="治法名称"
        width="180"
      />
      <el-table-column
        prop="englishnname"
        show-overflow-tooltip
        label="英文名称"
        width="180"
      />
      <el-table-column
        prop="synonymlist"
        show-overflow-tooltip
        label="同义词列表"
        width="180"
      />
      <el-table-column prop="describes" show-overflow-tooltip label="描述" />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="state.search"
            size="small"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        :currentPage="state.currentPage"
        :total="state.totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 对话框 -->
    <el-dialog v-model="state.dialogFormVisible" title="Shipping address">
      <el-form :model="state.form">
        <el-form-item
          label="Promotion name"
          :label-width="state.formLabelWidth"
        >
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogFormVisible = true">Cancel</el-button>
          <el-button type="primary" @click="state.dialogFormVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { getGovernanceTerms } from "@/http/api/Terminology.js";

const state = reactive({
  tableData: [],
  isClose: computed(() => store.getters.closeState),
  totalPage: 0,
  currentPage: 1,
  page: 1,
  pageSize: 13,
  search: "",
  dialogFormVisible: true,
  formLabelWidth: "140px",
  form: { name: "" },
});

// 发生axios 请求
const getAxiosInfo = () => {
  getGovernanceTerms(state.page, state.pageSize).then((res) => {
    state.totalPage = res.data.pages;
    state.tableData = res.data.records;
  });
};

const handleSizeChange = (newVal) => {};
const handleCurrentChange = (val) => {
  state.currentPage = val;
  state.page = val;
  getAxiosInfo();
};

// 编辑
const handleEdit = (index, row) => {
  console.log(index, row);
};

// 删除
const handleDelete = (index, row) => {
  console.log(index, row);
};

onMounted(() => {
  getAxiosInfo();
});
</script>

<style lang="less" scoped>
.container {
  width: 72vw;
  height: 640px;
  .demo-pagination-block {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
  .demo-pagination-block .demonstration {
    margin-bottom: 16px;
  }
}
</style>
