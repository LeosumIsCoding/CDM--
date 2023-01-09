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
                <span>visit_occurrence_id</span>
                <span>使用它来识别人与医疗保健系统之间独特的交互。此标识符跨其他 CDM 事件表进行链接，以将事件与访问相关联。</span>
                <span>这应该通过为一个人与医疗保健系统之间的每个唯一交互创建一个唯一标识符来填充，其中该人在一段时间内接受医疗商品或服务。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span></span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_concept_id</span>
                <span>此字段包含表示就诊类型的概念 ID，如住院或门诊。此字段中的所有概念都应是标准的，并且属于访问域。</span>
                <span>根据此人发生的访问类型填充此字段。例如，这可以是“住院访问”，“门诊访问”，“门诊访问”等。此表将包含“访问”域中的标准概念。这些概念以分层结构排列，通过汇总到全球大多数医疗保健系统中采用的一般熟悉的访问来促进队列定义。</span>
                <span>integer</span>
              </li>
              <li>
                <span>visit_start_date</span>
                <span>对于住院就诊，开始日期通常是入院日期。对于门诊就诊，开始日期和结束日期将是相同的。</span>
                <span>在填充visit_start_date时，您应该考虑患者体验，以决定如何定义就诊。在住院就诊的情况下，这应该是患者入院或机构的日期。在所有其他情况下，这应该是患者与提供者交互的日期。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>visit_end_date</span>
                <span>对于住院就诊，结束日期通常是出院日期。</span>
                <span>访问结束日期是强制性的。如果源中未提供结束日期，则有三种方法可以得出它们：门诊就诊：visit_end_datetime=visit_start_datetime急诊室就诊：visit_end_datetime=visit_start_datetime住院就诊：通常有关于出院的信息。如果没有，您应该能够从活动的突然下降或住院程序/药物的缺乏中获得结束日期。非医院机构就诊：特别是对于索赔数据，如果未提供结束日期，则假定就诊是在访问发生的月份内。对于在 ETL 日期正在进行的住院就诊，请将处理数据的日期输入visit_end_datetime，并使用 32220“静止患者”visit_type_concept_id，以将访问标识为不完整。所有其他访问：visit_end_datetime = visit_start_datetime。如果这是一天的访问，则结束日期应与开始日期匹配。</span>
                <span>date</span>
              </li>
              <li>
                <span>visit_end_datetime</span>
                <span></span>
                <span>如果没有给出访问结束日期的时间，请将其设置为午夜 （00：00：0000）。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>visit_type_concept_id</span>
                <span>使用此字段可以了解访问记录的出处或记录的来源。</span>
                <span>根据访问记录的出处填充此字段，例如它是否来自 EHR 记录或账单声明。</span>
                <span>Integer</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>每个访问记录只有一个提供者，ETL文档应清楚地说明他们是如何被选中的（参加，承认等）。如果源中有多个与访问关联的提供程序，则可以将其反映在事件表（CONDITION_OCCURRENCE、PROCEDURE_OCCURRENCE等）或VISIT_DETAIL表中。</span>
                <span>如果有多个提供商与访问相关联，则需要选择要放在这里的提供商。其他提供程序可以存储在visit_detail表中。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>care_site_id</span>
                <span>此字段提供有关进行访问的护理地点的信息。</span>
                <span>一次访问应该只有一个护理点。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_source_value</span>
                <span>此字段包含来自源数据的逐字值，这些源数据表示所发生的就诊类型（住院、门诊、急诊等）。</span>
                <span>如果源数据中有关于访问类型的信息，则该值应存储在此处。如果访问是来自源的访问的合并，则使用层次结构来选择访问源值，例如 IP -> ER-> OP。这应该与选择的逻辑一致，以确定如何创建访问。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>visit_source_concept_id</span>
                <span></span>
                <span>如果使用 OMOP 支持的词汇表在源数据中编码访问源值，请将表示源值的概念 ID 放在这里。如果不可用，则设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>admitted_from_concept_id</span>
                <span>使用此字段可确定患者从何处入院。例如，这个概念是访问域的一部分，可以指示患者是否从长期护理机构入院。</span>
                <span>如果可用，请将admitted_from_source_value映射到访问域中的标准概念。如果不可用，则设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>admitted_from_source_value</span>
                <span></span>
                <span>此信息在源数据中可能被称为其他信息，但该字段旨在包含一个值，指示某人从何处被录取。通常，这仅适用于有住院时间的就诊，如住院就诊或长期护理就诊。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>discharge_to_concept_id</span>
                <span>使用此字段可确定患者在就诊后出院的位置。例如，这个概念是访问领域的一部分，可以表明患者是否出院回家或被送往长期护理机构。</span>
                <span>如果可用，请将discharge_to_source_value映射到访问域中的标准概念。如果不可用，则设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>discharge_to_source_value</span>
                <span></span>
                <span>此信息在源数据中可能被称为不同的东西，但该字段旨在包含一个值，指示一个人在访问后出院的位置，例如他们回家或被转移到长期护理。通常，这仅适用于停留一天或更长时间的访问。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>preceding_visit_occurrence_id</span>
                <span>使用此字段可以查找在给定访问之前为该人员发生的访问。中间可能有几天或几年的时间。</span>
                <span>preceding_visit_id可用于链接当前访问之前的访问。请注意，这不是对称的，并且没有“following_visit_id”这样的东西。</span>
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
