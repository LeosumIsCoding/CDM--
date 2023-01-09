<template>
  <div class="container" ref="container">
    <el-tabs
      v-model="state.activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="术语类目" name="first">
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
              :page-count="state.totalPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="知识图谱展示" name="second">
        <div class="knowledGegraph">
          <div class="knowledGegraphLeft">
            <ul
              v-infinite-scroll="load"
              class="infinite-list"
              style="overflow: auto"
            >
              <li
                :id="state.activeClass == i.tcmid ? 'active' : ''"
                v-for="i in state.tableData"
                :key="i"
                class="infinite-list-item"
                @click="handleChangeItem(i)"
              >
                {{ i.classification }}
              </li>
            </ul>
          </div>
          <div class="knowledGegraphRight">
            <div id="main" v-if="state.isShow"></div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch, computed, ref } from "vue";
import { getDiseasecategory } from "@/http/api/Terminology.js";
import { useStore } from "vuex";
import { getknowledGegraph } from "@/http/api/Standard";
import * as echarts from "echarts";

const store = useStore();

const state = reactive({
  tableData: [],
  isClose: computed(() => store.getters.closeState),
  totalPage: 0,
  currentPage: 1,
  page: 0,
  pageSize: 13,
  activeName: "first",
  activeClass: 1,
  principal: "", //主
  nodeList: [], //节点数组
  echartsData: [], //节点Data
  linksData: [],
  isShow: false,
});

// 切换标签页
const handleClick = (tab, event) => {
  state.activeName = tab.props.name;
};

// 滚动条加载
const load = () => {
  state.page = state.page + 1;
  getPageInfo();
};

const getPageInfo = () => {
  getDiseasecategory(state.page, state.pageSize).then((res) => {
    state.tableData = res.data.records;
    state.totalPage = res.data.pages;
  });
};

// 滚动条点击
const handleChangeItem = (item) => {
  state.activeClass = item.tcmid;

  console.log(state.activeClass);
  state.isShow = false;
  setTimeout(() => {
    renderEcharts();
  }, 500);
};

// 获取可视化数据
const getEchartsInfo = async () => {
  await getknowledGegraph(state.activeClass).then((res) => {
    state.nodeList = [];
    state.echartsData = [];
    state.linksData = [];

    // console.log(res.data);
    state.nodeList = res.data.nodeList;
    // console.log(state.nodeList);
    let tempList = [];

    tempList = res.data.nodeList.map((item) => {
      return item.source;
    });

    // console.log(tempList);

    // 过滤
    let filterList = [...new Set(tempList)];

    let tempData = filterList.map((item) => {
      return {
        name: item,
        des: item, //描述
        symbolSize: 40,
        category: "子节点",
      };
    });

    tempData.push({
      name: res.data.principal,
      des: res.data.principal, //描述
      symbolSize: 50,
      category: "父节点",
    });

    // 节点处理
    state.echartsData = tempData;

    // 关系处理
    let tempLinkList = res.data.nodeList.map((item) => {
      return {
        source: item.source,
        target: item.target,
        name: "",
        des: "",
      };
    });

    // console.log([...new Set(tempLinkList)]);

    state.linksData = tempLinkList;

    console.log(state.linksData);
    console.log(state.echartsData);

    echartsInit();
  });
};

// 渲染可视化
const renderEcharts = () => {
  state.isShow = true;
  getEchartsInfo();
};

watch(
  () => state.activeName,
  (newVal, oldVal) => {
    if (newVal == "second") {
      state.isShow = true;
      renderEcharts();
    }
  },
  { deep: true, immediate: true }
);

const handleSizeChange = (newVal) => {};

const handleCurrentChange = (val) => {
  state.currentPage = val;
  state.page = val;
  // console.log(val);
  getPageInfo();
};

// echarts 初始化
const echartsInit = () => {
  var myChart = echarts.init(document.getElementById("main"));
  var categories = [{ name: "父节点" }, { name: "子节点" }];
  let option = {
    // 图的标题
    title: {
      text: "知识图谱",
    },
    // 提示框的配置
    tooltip: {
      formatter: function (x) {
        return x.data.des;
      },
    },
    // 工具箱
    toolbox: {
      // 显示工具箱
      show: true,
      feature: {
        mark: {
          show: true,
        },
        // 还原
        restore: {
          show: true,
        },
        // 保存为图片
        saveAsImage: {
          show: true,
        },
      },
    },
    legend: [
      {
        // selectedMode: 'single',
        data: categories.map(function (a) {
          return a.name;
        }),
      },
    ],
    series: [
      {
        type: "graph", // 类型:关系图
        layout: "force", //图的布局，类型为力导图
        symbolSize: 40, // 调整节点的大小
        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [2, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20,
            },
          },
        },
        force: {
          repulsion: 2500,
          edgeLength: [10, 50],
        },
        draggable: true,
        lineStyle: {
          normal: {
            width: 2,
            color: "#ffc454",
          },
        },
        edgeLabel: {
          normal: {
            show: true,
            formatter: function (x) {
              return x.data.name;
            },
          },
        },
        label: {
          normal: {
            show: true,
            textStyle: {},
          },
        },
        // 数据
        data: state.echartsData,
        links: state.linksData,
        categories: categories,
      },
    ],
  };
  myChart.setOption(option);
};

onMounted(() => {
  getPageInfo();
  // echartsInit();
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
        text-align: left;
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
  .knowledGegraph {
    width: 100%;
    min-height: 550px;
    display: flex;
    .knowledGegraphLeft {
      min-width: 200px;
      height: 550px;
      ul {
        #active {
          background-color: #545c64;
          color: #fff;
          transition: 0.2s;
        }
      }
      /*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
      ::-webkit-scrollbar {
        width: 5px;
        height: 16px;
        background-color: #f5f5f5;
      }
      /*定义滚动条轨道
 内阴影+圆角*/
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
      }
      /*定义滑块
 内阴影+圆角*/
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #ccc;
      }
      .infinite-list {
        max-width: 200px;
        height: 600px;
        padding: 0;
        margin: 0;
        list-style: none;
      }
      .infinite-list .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: var(--el-color-primary-light-9);
        margin: 10px;
        color: var(--el-color-primary);
        cursor: pointer;
      }
      .infinite-list .infinite-list-item + .list-item {
        margin-top: 10px;
      }
    }
    .knowledGegraphRight {
      min-width: 980px;
      height: 550px;
      margin-left: 20px;
      #main {
        width: 100%;
        height: 550px;
      }
    }
  }

  // 滚动
}
</style>
