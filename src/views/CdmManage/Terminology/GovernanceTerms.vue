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
        width="100"
      />
      <el-table-column
        prop="describes"
        width="180"
        show-overflow-tooltip
        label="描述"
      />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="state.search"
            size="small"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleAdd(scope.$index, scope.row)"
            >添加</el-button
          >
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
        :page-count="state.totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 对话框 -->
    <el-dialog v-model="state.dialogFormVisible" title="治法术语">
      <el-form :model="state.form">
        <el-form-item label="编号" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.termsnums" autocomplete="off" />
        </el-form-item>
        <el-form-item label="治法名称" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.termsname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="英文名称" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.englishnname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="同义词列表" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.synonymlist" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="state.formLabelWidth">
          <!-- <el-input v-model="state.form.describes" autocomplete="off" /> -->
          <el-input
            v-model="state.form.describes"
            :rows="2"
            type="textarea"
            placeholder=""
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">删除</el-button>
          <el-button type="primary" @click="handleClickMakeSure()"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog
      v-model="state.delVisible"
      title="治法术语"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否确认删除</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.delVisible = false">Cancel</el-button>
          <el-button type="primary" @click="makeSureDelete">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import {
  getGovernanceTerms,
  addGovernceTerms,
  updateGovernanceTerms,
  deleteGovernanceTerms,
} from "@/http/api/Terminology.js";
import { ElMessage } from "element-plus";

const state = reactive({
  tableData: [],
  isClose: computed(() => store.getters.closeState),
  totalPage: 0,
  currentPage: 1,
  page: 0,
  pageSize: 12,
  search: "",
  dialogFormVisible: false,
  formLabelWidth: "140px",
  delVisible: false,
  form: {
    termsnums: "",
    termsname: "",
    englishnname: "",
    synonymlist: "", //同义词列表
    describes: "", //描述
  },
  // 空
  nullForm: {
    termsnums: "",
    termsname: "",
    englishnname: "",
    synonymlist: "", //同义词列表
    describes: "", //描述
  },
  handleType: "Add",
  itemIndex: 0,
});

// 发生axios 请求
const getAxiosInfo = () => {
  getGovernanceTerms(state.page, state.pageSize).then((res) => {
    state.totalPage = res.data.pages;
    state.tableData = res.data.records;
    // console.log(res.data);
  });
};

const handleClose = () => {};

// 点击确认
const handleClickMakeSure = () => {
  let { handleType } = state;
  if (handleType == "Add") {
    addGovernceTerms(state.form).then((res) => {
      if (res.data == true) {
        ElMessage({
          message: "添加成功",
          type: "success",
        });
        state.dialogFormVisible = !state.dialogFormVisible;
      } else {
        ElMessage.error("添加失败");
      }
    });
  } else if (handleType == "Edit") {
    state.form.termsid = state.itemIndex;

    updateGovernanceTerms(state.form).then((res) => {
      if (res.data == true) {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
        state.dialogFormVisible = !state.dialogFormVisible;
      } else {
        ElMessage.error("修改失败");
      }
    });
  } else {
    deleteGovernanceTerms(state.itemIndex).then((res) => {
      if (res.data == true) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        state.tableData = state.tableData.filter((item, index) => {
          return item.termsid != state.itemIndex;
        });
        state.delVisible = !state.delVisible;
      } else {
        ElMessage.error("添加失败");
      }
    });
  }
};

const handleSizeChange = (newVal) => {};
const handleCurrentChange = (val) => {
  state.currentPage = val;
  state.page = val;
  getAxiosInfo();
};

// 添加
const handleAdd = (index, row) => {
  state.handleType = "Add";
  state.dialogFormVisible = true;
};

// 编辑
const handleEdit = (index, row) => {
  state.handleType = "Edit";
  state.itemIndex = state.tableData[index].termsid;
  // console.log(state.tableData);

  state.form = row;
  state.dialogFormVisible = true;
};

// 删除
const handleDelete = (index, row) => {
  state.handleType = "Delete";
  state.itemIndex = state.tableData[index].termsid;
  state.delVisible = !state.delVisible;
};

// 确认删除
const makeSureDelete = () => {
  handleClickMakeSure();
  // console.log(state.itemIndex);
};

// 取消
const handleCancel = () => {
  state.dialogFormVisible = false;
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
