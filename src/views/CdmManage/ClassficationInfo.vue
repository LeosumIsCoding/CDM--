<template>
  <div class="container">
    <el-container class="layout-container-demo" style="height: 700px">
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="['1']" @select="handleSelect">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><PieChart /></el-icon>领域
              </template>
              <el-radio-group
                v-model="state.check"
                @change="handleChangeDomain"
              >
                <el-menu-item
                  :index="item.index"
                  v-for="(item, index) in state.DoMAINList"
                  :key="index"
                  ><el-radio :label="item.listName"
                /></el-menu-item>
              </el-radio-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><MessageBox /></el-icon>概念
              </template>
              <el-radio-group
                v-model="state.check"
                @change="handleChangeConcept"
              >
                <el-menu-item
                  :index="item.index"
                  v-for="(item, index) in state.ConceptList"
                  :key="index"
                  ><el-radio :label="item.listName"
                /></el-menu-item>
              </el-radio-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Promotion /></el-icon>类别
              </template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Orange /></el-icon>VOCAB
              </template>
              <el-menu-item index="4-1">Option 1</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><Briefcase /></el-icon>有效性
              </template>
              <el-menu-item index="5-1">Option 1</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="btnBox">
            <div class="useBtn">
              <div class="downloadBtn">
                <el-button type="success" @click="handleDownload"
                  >下载</el-button
                >
              </div>
              <div class="tranlateBtn">
                <el-switch
                  v-model="state.isTranslate"
                  size="large"
                  active-text="翻译"
                  inactive-text="不翻译"
                  style="
                    --el-switch-on-color: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  @change="handleTranslate"
                />
              </div>
            </div>
            <!-- 分页 -->
            <div class="toolbar">
              <div class="demo-pagination-block">
                <el-pagination
                  v-model:currentPage="state.currentPage"
                  v-model:page-size="state.pageSize"
                  :page-sizes="[15, 50, 300]"
                  layout="sizes, prev, pager, next"
                  :total="state.totalPage"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>
          </div>
        </el-header>
        <el-main>
          <el-scrollbar>
            <el-table :data="state.records" height="640px">
              <el-table-column
                prop="id"
                label="Id"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="code"
                label="Code"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="classname"
                label="ClassName"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="name"
                label="Name"
                min-width="200"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="domain"
                label="Domain"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="invalidreason"
                label="Invalidreason"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="standardconcept"
                label="Standardconcept"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="vocabulary"
                label="Vocabulary"
                :show-overflow-tooltip="true"
              ></el-table-column>
            </el-table>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import http from "@/http/http.js";
import {
  Menu as IconMenu,
  Message,
  Setting,
  PieChart,
  MessageBox,
  Orange,
  Promotion,
  Briefcase,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { downLoadDrug } from "@/http/api/Drug.js";
import translate from "../../utils/translate.js";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const state = reactive({
  domain: "",
  pageSize: 15,
  page: 1,
  check: "",
  currentPage: 1, //当前页
  totalPage: 0,
  records: [],
  tableName: "drug",
  DoMAINList: computed(() => store.state.DoMAINList),
  isTranslate: false,
  ConceptList: computed(() => store.state.ConceptList),
});

// 获取信息
const getDrugsInfo = () => {
  http
    .post("/drug", {
      tableName: state.tableName,
      page: state.page - 1,
      pageSize: state.pageSize,
    })
    .then((res) => {
      // console.log(res);

      state.records = res.data;
    });
};

const getTotalPage = () => {
  http({
    method: "post",
    url: "/drug/total",
    data: {
      tableName: state.tableName,
    },
  }).then((res) => {
    // console.log(res);
    state.totalPage = res.data.data;
  });
};

const handleSizeChange = (val) => {
  state.pageSize = val;
  getDrugsInfo();
};
const handleCurrentChange = (val) => {
  state.page = val;
  getDrugsInfo();

  // console.log(val);

  // router.push({
  //   name: "ClassficationInfo",
  //   query: {
  //     domain: val,
  //   },
  // });
};

//点击单选框改变
const handleChangeDomain = (name) => {
  state.currentPage = 1;
  let tempItem = state.DoMAINList.filter((item, index) => {
    return item.listName == name;
  });
  state.tableName = tempItem[0].tableName;
  getTotalPage();
  getDrugsInfo();

  router.push({
    name: "ClassficationInfo",
    query: {
      domain: name,
      tableName: state.tableName,
    },
  });

  // 修改翻译·状态
  state.isTranslate = false;
};

const handleChangeConcept = (name) => {
  state.currentPage = 1;
  let tempItem = state.ConceptList.filter((item, index) => {
    return item.listName == name;
  });
  state.tableName = tempItem[0].tableName;
  getTotalPage();
  getDrugsInfo();

  router.push({
    name: "ClassficationInfo",
    query: {
      domain: name,
    },
  });
};

// 选择
const handleSelect = (key, keyPath) => {
  // console.log(key, keyPath);
};

// 翻译修改
const handleTranslate = (val) => {
  state.isTranslate = val;
  state.records.forEach((item) => {
    // translate(item.name).then((res) => {
    //   // console.log(res.data.translateResult[0][0].tgt);
    //   item.name = res.data.translateResult[0][0].tgt;
    // });
    Promise.all([
      translate(item.classname),
      translate(item.name),
      translate(item.vocabulary),
    ]).then((res) => {
      // console.log(res);
      item.classname = res[0].data.translateResult[0][0].tgt;
      item.name = res[1].data.translateResult[0][0].tgt;
      item.vocabulary = res[2].data.translateResult[0][0].tgt;
    });
  });
};

// 下载
const handleDownload = () => {
  let tableName = state.tableName;
  downLoadDrug(tableName).then((res) => {
    const filename =
      decodeURI(
        res.headers["content-disposition"].split(";")[1].split("=")[1]
      ) || `${tableName}.xls`;
    const blob = new Blob([res.data], {
      type: "application/octet-stream",
    });
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  });
};

onMounted(() => {
  state.domain = route.query.domain;
  // state.checkList.push(state.domain);
  state.check = state.domain;
  let tempItem = state.DoMAINList.filter((item, index) => {
    return item.listName == state.domain;
  });
  state.tableName = tempItem[0].tableName;

  getTotalPage();
  getDrugsInfo();

  // translate("china").then((res) => {
  //   console.log(res.data.translateResult[0][0].tgt);
  // });
});
</script>

<style lang="less" scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.btnBox {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  .useBtn {
    display: flex;
    height: 60px;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    min-width: 250px;
  }
}
</style>
