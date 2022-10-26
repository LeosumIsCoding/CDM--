<template>
  <div class="container">
    <div class="searchBox">
      <h2>搜索</h2>
      <el-input v-model="state.search" placeholder="Please input" clearable />
    </div>
    <div class="typeBox">
      <div class="typeTitle">
        <h2>搜索域</h2>
      </div>
      <div class="mainBox">
        <div class="typeItemBox">
          <div
            @click="handleRouter(item.englishName, item.tableName)"
            class="typeItem"
            v-for="item in state.typeItemList"
            :key="item.id"
          >
            <p>{{ item.name }}</p>
            <p><i :class="item.ico"></i></p>
            <p>
              <el-icon><Document /></el-icon>
              {{ item.totalCount }}
            </p>
          </div>
        </div>
        <div class="echartsBox" id="echartsDom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/static/css/iconfont.css";
import { reactive, watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Document } from "@element-plus/icons-vue";
import * as echarts from "echarts";

const router = useRouter();

const state = reactive({
  typeItemList: [
    {
      id: 0,
      name: "药剂",
      englishName: "Drug",
      tableName: "drug",
      ico: "iconfont icon-drug-full",
      totalCount: 5375149,
    },
    {
      id: 1,
      name: "条件",
      englishName: "Condition",
      tableName: "do_condition",
      ico: "iconfont icon-shebeileishebeichucun",
      totalCount: 698141,
    },
    {
      id: 2,
      name: "程序",
      englishName: "Procedure",
      tableName: "do_procedure",
      ico: "iconfont icon-chengxu",
      totalCount: 737031,
    },
    {
      id: 3,
      name: "设备",
      englishName: "Device",
      tableName: "do_device",
      ico: "iconfont icon-demand",
      totalCount: 493705,
    },
    {
      id: 4,
      name: "观察",
      englishName: "Observations",
      tableName: "do_procedure",
      ico: "iconfont icon-fanxiangguancha",
      totalCount: 586419,
    },
    {
      id: 5,
      name: "测量",
      englishName: "Measurement",
      tableName: "do_measurement",
      ico: "iconfont icon-wenduceliang",
      totalCount: 363337,
    },
  ],
  search: "",
});

// watch(
//   () => state.search,
//   (oldVal, newVal) => {
//     console.log(oldVal, newVal);
//   }
// );

const echartsInit = () => {
  var myChart = echarts.init(document.getElementById("echartsDom"));
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: "数据",
      subtext: "Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 5375149, name: "药剂" },
          { value: 698141, name: "条件" },
          { value: 737031, name: "程序" },
          { value: 493705, name: "设备" },
          { value: 586419, name: "观察" },
          { value: 363337, name: "测量" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
};

const handleRouter = (englishName, tableName) => {
  router.push({
    name: "ClassficationInfo",
    query: {
      domain: englishName,
      tableName,
    },
  });
};

onMounted(() => {
  echartsInit();
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  padding: 0 20px;
  box-sizing: border-box;
  .searchBox {
    width: 100%;
    height: auto;
    padding: 10px 0;
    box-sizing: border-box;
    h2 {
      margin: 5px 0;
      color: #999;
    }
  }
  .typeBox {
    margin-top: 50px;
    color: #000;
    .typeTitle {
      width: 100%;
      height: auto;
      color: #999;
    }
    .mainBox {
      width: 100%;
      height: auto;
      display: flex;

      .typeItemBox {
        width: 50%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        .typeItem {
          width: 30%;
          margin: 20px 10px;
          height: 150px;
          background: #f5f5f5;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 5px;
          box-shadow: 2px 3px 5px #ccc;
          p {
            &:nth-child(1) {
              font-size: 20px;
            }
            &:nth-child(2) {
              i {
                font-size: 40px;
                color: #647a35;
              }
              cursor: pointer;
              margin: 20px 0 5px;
            }
            &:nth-child(3) {
              font-size: 15px;
              color: #666;
            }
          }
          &:hover {
            box-shadow: 2px 3px 5px #8b968d;
          }
        }
      }
      .echartsBox {
        width: 50%;
        height: 400px;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
