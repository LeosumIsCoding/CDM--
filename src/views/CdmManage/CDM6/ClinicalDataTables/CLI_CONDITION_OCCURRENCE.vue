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
                <span>condition_occurrence_id</span>
                <span
                  >为人员的条件记录提供的唯一密钥。请参阅
                  ETL，了解如何处理同一访问期间的重复条件。</span
                >
                <span
                  >应为源数据中存在的条件的每个实例分配此唯一键。在某些情况下，一个人在同一次访问中可以有多个相同情况的记录。保留这些重复项并将它们分配单独的、唯一的CONDITION_OCCURRENCE_IDs是有效的，尽管应由
                  ETL 决定如何处理它们。</span
                >
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span>记录病情的人的PERSON_ID。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>condition_concept_id</span>
                <span
                  >建议将CONDITION_CONCEPT_ID字段用于分析中的主要用途，并且必须用于网络研究。这是从表示条件的源值映射的标准概念</span
                >
                <span
                  >CONDITION_SOURCE_VALUE映射到的CONCEPT_ID。只有其源值映射到具有“Condition”域的概念的记录才应进入此表。公认的概念。</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>condition_start_date</span>
                <span>使用此日期可确定条件的开始日期</span>
                <span
                  >大多数情况下，数据源没有条件的开始日期。相反，如果源只有一个与条件记录关联的日期，则可以将该日期同时用于CONDITION_START_DATE和CONDITION_END_DATE。</span
                >
                <span>date</span>
              </li>
              <li>
                <span>condition_start_datetime</span>
                <span></span>
                <span
                  >如果源未指定日期时间，则约定将时间设置为午夜
                  （00：00：0000）</span
                >
                <span>datetime</span>
              </li>
              <li>
                <span>condition_end_date</span>
                <span>使用此日期可确定条件的结束日期</span>
                <span
                  >大多数情况下，数据源没有条件的开始日期。相反，如果源只有一个与条件记录关联的日期，则可以将该日期同时用于CONDITION_START_DATE和CONDITION_END_DATE。</span
                >
                <span>date</span>
              </li>
              <li>
                <span>condition_end_datetime</span>
                <span></span>
                <span
                  >如果源未指定日期时间，则约定将时间设置为午夜
                  （00：00：0000）</span
                >
                <span>datetime</span>
              </li>
              <li>
                <span>condition_type_concept_id</span>
                <span
                  >此字段可用于确定“状况”记录的出处，例如，状况是否来自 EHR
                  系统、保险索赔、登记处或其他来源。</span
                >
                <span
                  >选择最能代表记录出处的condition_type_concept_id。公认的概念。</span
                >
                <span>Integer</span>
              </li>
              <li>
                <span>condition_status_concept_id</span>
                <span
                  >这个概念代表了访问期间给出的诊断（承认诊断，最终诊断），诊断是否由于实验室检查结果而确定，诊断是否是排他性的，或者是否是初步诊断等。</span
                >
                <span
                  >在“状况状态”域中选择最能代表诊断时访问期间点的概念。这些可能包括入院诊断、主要诊断和继发诊断。如果不可用，请设置为
                  0。公认的概念。</span
                >
                <span>Integer</span>
              </li>
              <li>
                <span>stop_reason</span>
                <span>
                  “停止原因”指示条件在源数据中的目的方面不再有效的原因。请注意，停止原因并不一定意味着该情况不再发生。</span
                >
                <span
                  >此信息通常不会填充到源数据中，如果信息不存在，则将其留空是有效的
                  etl 选择。</span
                >
                <span>varchar(20)</span>
              </li>
              <li>
                <span>provider_id</span>
                <span
                  >与病症记录相关的提供者，例如进行诊断的提供者或记录症状的提供者。</span
                >
                <span
                  >ETL
                  可能需要选择将哪个PROVIDER_ID放在这里。根据可用的内容，这可能与与整体VISIT_OCCURRENCE记录相关的提供者不同，也可能不同，例如EHR记录上的入院与主治医师。</span
                >
                <span>bigint</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>发生病情的访问。</span>
                <span
                  >根据源数据的结构，这可能必须根据日期来确定。如果CONDITION_START_DATE发生在访问的开始和结束日期内，则有效的
                  ETL
                  选择是从包含该访问的访问中选择VISIT_OCCURRENCE_ID，即使数据中没有明确说明也是如此。虽然不是必需的，但应尝试找到CONDITION_OCCURRENCE记录的VISIT_OCCURRENCE_ID。</span
                >
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_id</span>
                <span
                  >发生条件VISIT_DETAIL记录。例如，如果患者在诊断时在
                  ICU，则VISIT_OCCURRENCE记录将反映整体住院时间，VISIT_DETAIL记录将反映
                  ICU 在医院就诊期间的住院时间。</span
                >
                <span>规则与VISIT_OCCURRENCE_ID相同。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>condition_source_value</span>
                <span
                  >此字段包含表示所发生情况的源数据中的逐字值。例如，这可以是
                  ICD10 或读取代码。</span
                >
                <span
                  >此代码映射到标准化词汇表中的标准条件概念，原始代码存储在此处以供参考。</span
                >
                <span>varchar(50)</span>
              </li>
              <li>
                <span>condition_source_concept_id</span>
                <span
                  >这是表示条件源值的概念，可能不一定是标准的。不建议在分析中使用此字段，因为它不需要包含在整个
                  OHDSI
                  社区中使用的标准概念，并且仅当标准概念不能充分表示给定分析用例所需的条件的源详细信息时才应使用。请考虑改用CONDITION_CONCEPT_ID，以实现在整个网络中保持一致的标准化分析。</span
                >
                <span
                  >如果使用 OMOP
                  支持的词汇在源数据中编码CONDITION_SOURCE_VALUE，请将表示源值的概念
                  ID 放在这里。如果不可用，请设置为 0。</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>condition_status_source_value</span>
                <span>此字段包含表示条件状态的源数据中的逐字值。</span>
                <span
                  >此信息在源数据中可能称为其他信息，但该字段旨在包含一个值，该值指示何时以及如何向患者提供诊断。此源值映射到存储在CONDITION_STATUS_CONCEPT_ID字段中的标准概念。</span
                >
                <span>varchar(50) </span>
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
