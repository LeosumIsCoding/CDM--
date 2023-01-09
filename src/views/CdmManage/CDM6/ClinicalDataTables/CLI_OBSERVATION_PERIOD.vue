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
                <span>observation_period_id</span>
                <span>一个人可以有多个离散的观察期，这些观察期由Observation_Period_Id标识。</span>
                <span>为人员的每个离散观察期分配唯一observation_period_id。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span>记录观察期的 PERSON 记录的人员 ID。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>observation_period_start_date</span>
                <span>使用此日期可确定观察期的开始日期</span>
                <span>通常情况下，源数据中不存在观测周期的概念。在这些情况下，可以将observation_period_start_date推断为“人”可用的最早事件日期。在保险索赔数据中，观察期可视为该人与付款人登记的时间段。如果一个人切换了计划，但留在同一付款人那里，因此数据捕获仍在继续，那么PAYER_PLAN_PERIOD捕获该更改。</span>
                <span>date</span>
              </li>
              <li>
                <span>observation_period_end_date</span>
                <span>使用此日期来确定我们可以假定记录某个人员的所有事件的时间段的结束日期。</span>
                <span>通常情况下，源数据中不存在观测周期的概念。在这些情况下，可以将observation_period_end_date推断为“人员”可用的最后一个事件日期。在保险索赔数据中，观察期可视为该人与付款人登记的时间段。</span>
                <span>date</span>
              </li>
              <li>
                <span>period_type_concept_id</span>
                <span>此字段可用于确定观察期的出处，例如该期间是根据保险登记文件、EHR 医疗保健遭遇或其他来源确定的。</span>
                <span>选择最能代表期间确定方式的observation_period_type_concept_id。公认的概念。</span>
                <span>Integer</span>
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
