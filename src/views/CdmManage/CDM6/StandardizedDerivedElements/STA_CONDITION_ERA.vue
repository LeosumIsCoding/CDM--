<template>
  <!-- cdmv6 模块 -->
  <div class="container">
    <CDMListMain
      :title="state.query.title"
      :TableDescription="state.query.TableDescription"
      :UserGuide="state.query.UserGuide"
      :ETLConventions="state.query.ETLConventions"
    />

    <div class="containerBox">
      <el-tabs
        :tab-position="tabPosition"
        @tab-click="handleClick"
        v-model="state.editableTabsValue"
        class="demo-tabs"
      >
        <el-tab-pane label="表单结构" name="structure">
          <div class="tableBox">
            <ul>
              <!-- 表头 -->
              <li>
                <span>CDM领域</span>
                <span> 用户指南</span>
                <span>ETL约定</span>
                <span>数据类型</span>
              </li>
              <!-- 表单内容 -->
              <li>
                <span>condition_era_id</span>
                <span></span>
                <span></span>
                <span>	bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>condition_concept_id</span>
                <span>表示条件的概念 ID。	</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>condition_era_start_datetime</span>
                <span>	从“条件发生”的各个实例构造的条件时代“的开始日期。它是按时间顺序记录的该病症的第一个实例的开始日期，自同一病症的任何先前记录以来至少为31天</span>
                <span></span>
                <span>datetime</span>
              </li>
              <li>
                <span>condition_era_end_datetime</span>
                <span>从“条件发生”的各个实例构造的条件时代的结束日期。它是条件的最终连续记录实例的结束日期。</span>
                <span></span>
                <span>datetime</span>
              </li>
              <li>
                <span>condition_occurrence_count</span>
                <span>用于构造条件时代的单个条件发生次数。</span>
                <span></span>
                <span>integer</span>
              </li>  
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据处理" name="dispose">数据处理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import CDMListMain from "@/components/CDMListMain.vue";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";

import { ref } from "vue";

const tabPosition = ref("left");

const state = reactive({
  query: "",
  editableTabsValue: "structure",
});
const route = useRoute();

onMounted(() => {
  state.query = route.query;
});

// 切换选项卡
const handleClick = (tab, event) => {
  // console.log(tab, event);
  console.log(tab.props.name);
};
</script>

<style lang="less" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs {
  min-height: 600px;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.containerBox {
  width: 100%;
  height: auto;
}

.tableBox {
  height: auto;
  ul {
    li {
      font-size: 14px;
      display: flex;
      padding: 5px 3px;
      box-sizing: border-box;
      span {
        display: block;
        flex: 2;
        &:last-child {
          flex: 1;
        }
        &:first-child {
          flex: 1;
        }
      }
      &:first-child {
        span {
          font-weight: bold;
        }
        border-bottom: 2px solid #cccc;
      }
      &:nth-child(n + 2) {
        border-bottom: 1px solid #cccc;
        &:hover {
          background-color: rgba(225, 225, 225, 0.3);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
