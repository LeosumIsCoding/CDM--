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
                <span>source_code</span>
                <span>正在翻译成标准概念的源代码。</span>
                <span></span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>source_concept_id</span>
                <span>正在转换为标准概念的源概念的外键。</span>
                <span>这要么是 0，要么是 20 亿以上的数字，这是为特定于站点的代码和映射保留的概念</span>
                <span>integer</span>
              </li>
              <li>
                <span>source_vocabulary_id</span>
                <span>词汇表的外键，用于定义要转换为标准概念的源代码的词汇表。</span>
                <span></span>
                <span>varchar(20)</span>
              </li>
              <li>
                <span>source_code_description</span>
                <span>源代码的可选描述。包含此内容是为了便于将源代码的描述与概念的名称进行比较。</span>
                <span></span>
                <span>varchar(255)</span>
              </li>
              <li>
                <span>target_concept_id</span>
                <span>源代码映射到的目标概念。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>target_vocabulary_id</span>
                <span>目标概念的词汇。</span>
                <span></span>
                <span>varchar(20)</span>
              </li>
              <li>
                <span>valid_start_date</span>
                <span>首次记录映射实例的日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>valid_end_date</span>
                <span>映射实例因被删除或被新关系取代（更新）而变得无效的日期。默认值为 2099 年 12 月 31 日。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>invalid_reason</span>
                <span>映射实例无效的原因。当valid_end_date具有默认值时，可能的值为 D（已删除）、U（替换为更新）或 NULL</span>
                <span></span>
                <span>varchar(1)</span>
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
