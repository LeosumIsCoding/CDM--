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
                <span>cohort_definition_id</span>
                <span>	这是提供给队列的标识符，通常由 ATLAS 应用程序提供</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>cohort_definition_name</span>
                <span>队列的简短描述</span>
                <span></span>
                <span>varchar(255)</span>
              </li>
              <li>
                <span>cohort_definition_description</span>
                <span>队列的完整描述。</span>
                <span></span>
                <span>	varchar(MAX)</span>
              </li>
              <li>
                <span>definition_type_concept_id</span>
                <span>类型定义记录表示的同期群定义类型以及如何执行语法。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>cohort_definition_syntax</span>
                <span>	用于操作同期群定义的语法或代码。</span>
                <span></span>
                <span>varchar(MAX)</span>
              </li>
              <li>
                <span>subject_concept_id</span>
                <span>此字段包含一个概念，该概念表示作为队列成员的受试者的域（例如，人员、提供者、访问）。</span>
                <span></span>
                <span>integer</span>
              </li>

              <li>
                <span>cohort_initiation_date</span>
                <span>在同期群表中指示同期群启动时间的日期。</span>
                <span></span>
                <span>date</span>
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
