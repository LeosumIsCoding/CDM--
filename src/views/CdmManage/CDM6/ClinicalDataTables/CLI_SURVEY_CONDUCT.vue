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
                <span>survey_conduct_id</span>
                <span>每个已完成调查的唯一标识符。</span>
                <span>对于调查完成的每个实例，创建一个唯一标识符。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span></span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>survey_concept_id</span>
                <span>这是代表已完成调查的概念。</span>
                <span>将标识人员已完成的调查的CONCEPT_ID。此表没有指定的域，但概念类“暂存/规模”包含许多常见调查。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>survey_start_date</span>
                <span>调查开始的日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>survey_start_datetime</span>
                <span></span>
                <span>如果没有给出时间，请设置为午夜。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>survey_end_date</span>
                <span>调查完成的日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>survey_end_datetime</span>
                <span></span>
                <span>如果没有给出时间，请设置为午夜。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>这是与调查完成关联的提供程序。</span>
                <span>ETL 可能需要选择将哪个提供程序放在这里。这可以是订购调查的提供商，也可以是观察调查完成的提供商。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>assisted_concept_id</span>
                <span>这是一个概念，代表调查是在协助下还是独立完成的。</span>
                <span>此字段没有特定的域或类，只需选择最能表示源中给定值的域或类即可。</span>
                <span>integer</span>
              </li>
              <li>
                <span>respondent_type_concept_id</span>
                <span>这是一个概念，代表谁实际记录了调查的答案。例如，这可能是患者或研究助理。</span>
                <span>此字段没有特定的域或类，只需选择最能表示源中给定值的域或类即可。</span>
                <span>integer</span>
              </li>
              <li>
                <span>timing_concept_id</span>
                <span>这是一个代表调查时间的概念。例如，这可能是3个月的随访预约。</span>
                <span>此字段没有特定的域或类，只需选择最能表示源中给定值的域或类即可。</span>
                <span>integer</span>
              </li>
              <li>
                <span>collection_method_concept_id</span>
                <span>此概念表示如何收集响应。</span>
                <span>使用与CONCEPT_ID 42529316具有“有答案”关系的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>assisted_source_value</span>
                <span>表示患者是否需要帮助才能完成调查的源值。示例：“在无帮助的情况下完成”、“在帮助下完成”。</span>
                <span></span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>respondent_type_source_value</span>
                <span>代表完成调查的人员角色的源代码。</span>
                <span></span>
                <span>varchar(100)</span>
              </li>
              <li>
                <span>timing_source_value</span>
                <span>表示调查时间的文本字符串。示例：基线，6 个月随访。</span>
                <span></span>
                <span>varchar(100)</span>
              </li>
              <li>
                <span>collection_method_source_value</span>
                <span>在源数据中显示的收集方法。</span>
                <span></span>
                <span>varchar(100)</span>
              </li>
              <li>
                <span>survey_source_value</span>
                <span>源数据中显示的调查名称。</span>
                <span></span>
                <span>varchar(100)</span>
              </li>
              <li>
                <span>survey_source_concept_id</span>
                <span></span>
                <span>如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>survey_source_identifier</span>
                <span>源系统中每个已完成调查的唯一标识符。</span>
                <span></span>
                <span>varchar(100)</span>
              </li>
              <li>
                <span>validated_survey_concept_id</span>
                <span></span>
                <span>	如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>validated_survey_source_value</span>
                <span>表示调查验证状态的源值。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>survey_version_number</span>
                <span>使用的问卷或调查的版本号。</span>
                <span></span>
                <span>varchar(20)</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>visit_occurrence_id</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>response_visit_occurrence_id</span>
                <span>进行与调查有关的任何治疗的访问。</span>
                <span></span>
                <span>bigint</span>
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
