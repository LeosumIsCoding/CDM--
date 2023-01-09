<template>
  <div class="containerBox">
    <!-- 按钮的盒子 -->
    <div class="btnBox">
      <el-button type="primary" @click="handleAddInfo">添加数据</el-button>
      <el-button type="success" @click="handleSearch">数据搜索</el-button>
    </div>
    <el-tabs
      v-model="state.activeName"
      type="border-card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        :label="item"
        :name="item"
        class="tab"
        v-for="(item, index) in state.classesList"
        :key="index"
      >
        <div style="height: 1000px">
          <el-table :data="state.TCMList" style="width: 100%" stripe>
            <el-table-column label="名称" prop="name" width="200" />
            <el-table-column label="简介" prop="info" show-overflow-tooltip />
            <el-table-column align="right">
              <template #default="scope">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="确认是否删除"
                  @confirm="confirmEvent(scope.row)"
                >
                  <template #reference>
                    <el-button type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div></el-tab-pane
      >
    </el-tabs>
    <div class="changePage">
      <el-pagination
        :currentPage="state.page"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 编辑 -->
    <el-dialog v-model="state.dialogFormVisible" title="编辑">
      <el-form :model="state.form">
        <el-form-item label="名称" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="简介"
          type="textarea"
          :label-width="state.formLabelWidth"
        >
          <el-input
            v-model="state.form.info"
            type="textarea"
            autocomplete="off"
            autosize
          />
        </el-form-item>
        <el-form-item label="类别" :label-width="state.formLabelWidth">
          <el-select
            v-model="state.form.classes"
            placeholder="state.form.classes"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in state.classesList"
              :key="index"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="makeSureUpdate"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加-->
    <div class="addBox">
      <el-dialog v-model="state.addFormVisible" title="添加数据">
        <el-form :model="state.addform">
          <el-form-item label="名称" :label-width="state.formLabelWidth">
            <el-input v-model="state.addform.name" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="简介"
            type="textarea"
            :label-width="state.formLabelWidth"
          >
            <el-input
              v-model="state.addform.info"
              type="textarea"
              autocomplete="off"
              autosize
            />
          </el-form-item>
          <el-form-item label="类别" :label-width="state.formLabelWidth">
            <el-select
              v-model="state.addform.classes"
              placeholder="请选择已有类别类别"
              :disabled="state.addform.useClasses.trim() != ''"
            >
              <el-option
                :label="item"
                v-for="(item, index) in state.classesList"
                :key="index"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="自定义类别" :label-width="state.formLabelWidth">
            <el-input v-model="state.addform.useClasses" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="state.addFormVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="makeSureUserTCMAdd"
              :disabled="state.addform.name == '' || state.addform.info == ''"
            >
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <!-- 搜索 -->
    <el-dialog v-model="state.searchVisible" title="搜索内容" center>
      <div class="searchBox">
        <el-input
          v-model="state.searchInput"
          placeholder="Please input"
          clearable
        />
      </div>
      <div class="searchContain">
        <el-table :data="state.searchData" height="250" style="width: 100%">
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column prop="info" label="简介" />
          <el-table-column prop="classes" label="类别" />
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.searchVisible = false">取消</el-button>
          <el-button type="primary" @click="state.searchVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import {
  getClasses,
  getTCMInfoByClass,
  updatedupdateTCMTerminology,
  addTCMItem,
  searchItem,
  deletedById,
} from "@/http/api/TCM.js";
import throttle from "@/utils/throttle.js";

const state = reactive({
  activeName: "",
  classesList: [],
  page: 1,
  pageSize: 10,
  total: 0,
  TCMList: [], //中医数据列表
  dialogFormVisible: false, //是否展示
  form: {
    name: "",
    info: "",
    classes: "",
  },
  formLabelWidth: "140px",
  addFormVisible: false, //对话框
  addform: {
    //添加的表单
    name: "",
    info: "",
    classes: "",
    useClasses: "", //用户自定义类别
  },
  searchVisible: false,
  searchInput: "", //用户搜索
  searchData: [], //搜索的结果
  timer: null,
});

// 页面大小改变;
const handleSizeChange = (number) => {
  // console.log(number);
  state.pageSize = number;
  getTCMInfo();
};

// 当前页改变
const handleCurrentChange = (number) => {
  // console.log(number);
  state.page = number;
  getTCMInfo();
};

// 确认添加
const makeSureUserTCMAdd = () => {
  let { name, info, classes, useClasses } = state.addform;
  // 判断用户的自定义
  if (useClasses.trim() != "") {
    addTCMItem(name, info, useClasses).then((res) => {
      if (res.data) {
        ElMessage({
          message: "添加成功",
          type: "success",
        });
      } else {
        ElMessage.error("添加失败");
      }
    });
  } else {
    if (classes == "") {
      ElMessage.error("类别不能为空");
    } else {
      addTCMItem(name, info, classes).then((res) => {
        if (res.data) {
          ElMessage({
            message: "添加成功",
            type: "success",
          });
        } else {
          ElMessage.error("添加失败");
        }
      });
    }
  }
};

/**
 * 获取中药数据信息
 */
const getTCMInfo = () => {
  getTCMInfoByClass(state.activeName, state.page, state.pageSize).then(
    (res) => {
      // console.log(res.data);
      state.total = res.data.total;
      state.TCMList = res.data.records;
    }
  );
};

// 获取中医术语分类
const getTCMClasses = () => {
  getClasses()
    .then((result) => {
      console.log(result);
      state.classesList = result.data;
      state.activeName = result.data[0];
      getTCMInfo();
    })
    .catch((err) => {
      console.log(err);
    });
};

// 确认更新
const makeSureUpdate = () => {
  // updatedupdateTCMTerminology(state.form);
  updatedupdateTCMTerminology(state.form).then((res) => {
    if (res.data) {
      ElMessage({
        message: "更新成功",
        type: "success",
      });
      state.dialogFormVisible = !state.dialogFormVisible;
    } else {
      ElMessage.error("更新失败");
      state.dialogFormVisible = !state.dialogFormVisible;
    }
  });
};

// 添加数据
const handleAddInfo = () => {
  // 先置空
  state.addform.name = "";
  state.addform.info = "";
  state.addform.classes = "";
  state.addform.useClasses = "";
  state.addFormVisible = !state.addFormVisible;
};

// 确认删除按钮
const confirmEvent = (row) => {
  let { tid } = row;
  deletedById(tid).then((res) => {
    if (res.data) {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
    } else {
      ElMessage.error("删除失败");
    }
  });
};

// 按钮功能
const handleEdit = (index, row) => {
  // console.log(index, row);
  state.dialogFormVisible = !state.dialogFormVisible;
  // console.log(row);
  state.form = row;
};

// 点击删除
const handleDelete = (index, row) => {
  console.log(index, row);
};

// 切换tab
const handleClick = (tab, event) => {
  state.activeName = tab.props.name;
  getTCMInfo();
  state.page = 1;
};

// 点击搜索
const handleSearch = () => {
  state.searchVisible = !state.searchVisible;
  state.searchInput = "";
};

// 搜索请求
const searchInfo = () => {
  let inputInfo = state.searchInput;
  searchItem(inputInfo).then((res) => {
    state.searchData = res.data;
  });
};

// 监听属性
watch(
  () => state.searchInput,
  (newVal, oldVal) => {
    if (newVal.trim() != "") {
      clearTimeout(state.timer);
      state.timer = setTimeout(() => {
        searchInfo();
      }, 1000);
    }
    {
      state.searchData = [];
    }
  }
);

onMounted(() => {
  getTCMClasses();
});
</script>

<style lang="less" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.containerBox {
  width: 72vw;
  min-height: 640px;
  .btnBox {
    width: 100%;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
  .tab {
    height: 460px;
  }
  .changePage {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }

  .searchContain {
    margin-top: 20px;
  }
}
</style>
