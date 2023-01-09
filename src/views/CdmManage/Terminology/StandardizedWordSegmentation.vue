<template>
  <div class="container">
    <div class="tabBar">
      <div class="selectBox">
        <div class="iconBox">
          <el-icon><Tickets /></el-icon>
        </div>
        <div class="optionBox">
          <el-select v-model="state.menu" placeholder="Select">
            <el-option
              v-for="item in state.menuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span>----{{ item.value }}</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btnBox">
        <el-upload
          action=""
          class="upload-demo"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChange"
        >
          <el-button type="primary">上传文件</el-button>
        </el-upload>
        <el-button
          type="primary"
          style="margin-left: 10px"
          @click="handleStandard"
          >标准分词</el-button
        >
        <el-button
          type="primary"
          style="margin-left: 10px"
          @click="handleSendStandard"
          >上传标准数据库</el-button
        >
      </div>
    </div>
    <div class="tableBox">
      <el-table :data="state.resultList" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <div m="4">
              <p
                class="pInfo"
                m="t-0 b-2"
                v-for="(item, index) in state.keyList"
                :key="index"
              >
                <el-tag> {{ item }}</el-tag
                >: {{ props.row[item] }}
              </p>
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          :label="state.keyList[index]"
          :prop="state.keyList[index]"
          v-for="(item, index) in state.keyList"
          :key="index"
        />
        <el-table-column align="right" width="300" v-if="state.keyList.length">
          <template #header>
            <el-input v-model="state.search" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >

            <el-popconfirm
              title="是否删除?"
              @confirm="confirmEvent(scope.$index, scope.row)"
              @cancel="cancelEvent"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <div class="editBox">
      <!-- Form -->
      <el-dialog v-model="state.dialogFormVisible" title="信息详情">
        <el-form :model="state.formItem">
          <el-form-item
            :label="item"
            v-for="(item, index) in state.keyList"
            :key="index"
            :label-width="state.formLabelWidth"
          >
            <el-input v-model="state.formItem[item]" rows="3" type="textarea" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="makeSureChange">确认修改</el-button>
            <el-button type="primary" @click="state.dialogFormVisible = false">
              取消修改
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 添加  -->
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import { Tickets } from "@element-plus/icons-vue";
import { ElLoading } from "element-plus";
import { useRouter } from "vue-router";
import {
  uploadFile,
  standardData,
  sendStandardInfo,
} from "../../../http/api/Standard";
import { ElMessage } from "element-plus";

const router = useRouter();
const state = reactive({
  menuList: [
    {
      value: "tcmdiseasecategories",
      label: "中医疾病类目",
    },
    {
      value: "tcmsyndromecategory",
      label: "中医证候类目",
    },
    {
      value: "governanceTerms",
      label: "治法术语",
    },
    {
      value: "icd11mms",
      label: "ICD-11简明编码列表",
    },
    {
      value: "sickpositiondictionary",
      label: "病位字典",
    },
    {
      value: "pathologicaldictionary",
      label: "病性字典",
    },
  ],
  menu: "",
  resultList: [],
  search: "",
  keyList: [], //key 的数组
  formItem: {}, // 行item
  dialogFormVisible: false, //是否显示
  formLabelWidth: "200px",
  chooseIndex: 0, //选择的下标
  primevalList: [],
});

// 上传文件
const handleChange = (file) => {
  uploadFile(file.raw).then((res) => {
    state.resultList = res.data;
    state.primevalList = [...state.resultList]; //保存数据
    let tempList = [];
    for (let key in res.data[0]) {
      tempList.push(key);
    }
    state.keyList = tempList; // 列表添加数据 key
    console.log(state.keyList);
  });
};

// 编辑
const handleEdit = (index, row) => {
  state.dialogFormVisible = !state.dialogFormVisible; //显示
  state.formItem = { ...row }; //深拷贝
  state.chooseIndex = index;
};

// 删除
const confirmEvent = (index, row) => {
  console.log(state.resultList);
  state.resultList = state.resultList.filter((item, i) => {
    return i != index;
  });

  ElMessage({
    message: "删除成功",
    type: "success",
  });
};

// 确认修改
const makeSureChange = () => {
  state.resultList[state.chooseIndex] = state.formItem;
  state.dialogFormVisible = !state.dialogFormVisible;
};

// 标准化
const handleStandard = () => {
  if (state.menu == "") {
    ElMessage({
      message: "请选择标准规范",
      type: "warning",
    });
  } else {
    if (state.resultList.length == 0) {
      ElMessage({
        message: "请添加需要标准化的数据",
        type: "error",
      });
    } else {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      standardData(JSON.stringify(state.resultList), state.menu).then((res) => {
        state.resultList = res.data;
        loading.close();
      });
    }
  }
};

// 取消
const cancelEvent = () => {};

// 监视属性
watch(
  () => state.search,
  (newVal, oldVal) => {
    if (newVal.trim() != "") {
      state.resultList = state.resultList.filter((item) => {
        for (let i = 0; i < state.keyList.length; i++) {
          if (item[state.keyList[i]].includes(newVal)) {
            return item;
          }
        }
        return false;
      });
    } else {
      state.resultList = state.primevalList;
    }
  }
);

const handleSendStandard = () => {
  sendStandardInfo(state.resultList).then((res) => {
    // console.log(res);
    if (res.data == "插入成功") {
      ElMessage({
        showClose: true,
        message: "插入成功",
        type: "success",
      });
    } else {
      ElMessage({
        showClose: true,
        message: "插入失败",
        type: "error",
      });
    }
  });
};

// 生命周期函数
onMounted(() => {
  // console.log(state.keyList.length);
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .tabBar {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    .selectBox {
      width: auto;
      height: auto;
      display: flex;
      align-items: center;
      .iconBox {
        margin-right: 10px;
        font-size: 30px;
        color: orange;
      }
    }
    .btnBox {
      width: auto;
      margin-left: 20px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
  }
  .tableBox {
    width: 72vw;
    margin-top: 20px;
    .pInfo {
      margin: 10px 0;
    }
  }
}
</style>
