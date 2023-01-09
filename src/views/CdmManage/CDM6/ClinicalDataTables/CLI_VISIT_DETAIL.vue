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
                <span>visit_detail_id</span>
                <span>使用它来识别人与医疗保健系统之间独特的交互。此标识符跨其他 CDM 事件表进行链接，以将事件与访问详细信息相关联。</span>
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
                <span>visit_detail_concept_id</span>
                <span>此字段包含一个概念 ID，表示就诊详细信息的类型，如住院或门诊。此字段中的所有概念都应是标准的，并且属于访问域。</span>
                <span>根据此人发生的访问类型填充此字段。例如，这可以是“住院访问”，“门诊访问”，“门诊访问”等。此表将包含“访问”域中的标准概念。这些概念以分层结构排列，通过汇总到全球大多数医疗保健系统中采用的一般熟悉的访问来促进队列定义。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>visit_detail_start_date</span>
                <span>这是相遇开始的日期。这可能等于也可能不等于访问详细信息与之关联的访问日期。</span>
                <span>在填充visit_start_date时，您应该考虑患者体验，以决定如何定义就诊。这很可能应该是患者与提供者交互的日期。</span>
                <span>date</span>
              </li>
              <li>
                <span>visit_detail_start_datetime</span>
                <span></span>
                <span>如果没有给出访问开始日期的时间，请将其设置为午夜 （00：00：0000）。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>visit_detail_end_date</span>
                <span>这是患者与提供者交互的结束日期。</span>
                <span>访问详细信息结束日期是强制性的。如果来源中未提供结束日期，则有三种方法可以得出它们：<br> - 门诊访问详细信息：visit_detail_end_datetime = visit_detail_start_datetime - 急诊室访问详细信息：visit_detail_end_datetime = visit_detail_start_datetime - 住院访问详细信息：通常有关于出院的信息。如果没有，您应该能够从活动的突然下降或住院程序/药物的缺乏中获得结束日期。- 非医院机构访问详细信息：特别是对于索赔数据，如果未提供结束日期，则假设访问是在发生该访问的月份内.<br>对于在ETL之日正在进行的住院访问详细信息，请将处理数据的日期放入visit_detai_end_datetime，并与32220“静止患者”visit_detail_type_concept_id，以将访问标识为不完整。所有其他访问详细信息：visit_detail_end_datetime = visit_detail_start_datetime。</span>
                <span>date</span>
              </li>
              <li>
                <span>visit_detail_end_datetime</span>
                <span></span>
                <span>如果没有给出访问结束日期的时间，请将其设置为午夜 （00：00：0000）。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>visit_detail_type_concept_id</span>
                <span>使用此字段可以了解访问详细信息记录的出处或记录的来源。</span>
                <span>根据访问详细信息记录的出处填充此字段，例如它是否来自 EHR 记录或账单声明。公认的概念。</span>
                <span>Integer</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>每个访问记录只有一个提供者，ETL文档应清楚地说明他们是如何被选中的（参加，承认等）。这是利用VISIT_DETAIL表的典型原因，因为即使每个VISIT_DETAIL记录只能有一个提供程序，也可以对可与VISIT_OCCURRENCE记录关联的VISIT_DETAIL记录数没有限制。</span>
                <span>与访问关联的其他提供程序可以存储在此表中，其中每个VISIT_DETAIL记录表示不同的提供程序。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>care_site_id</span>
                <span>此字段提供有关发生访问详细信息的护理站点的信息。</span>
                <span>只有一个护理站点应与访问详细信息相关联。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_source_value</span>
                <span>此字段包含来自源数据的逐字值，这些值表示发生的就诊详细信息类型（住院、门诊、急诊等）。</span>
                <span>如果源数据中有关于访问详细信息类型的信息，则该值应存储在此处。如果访问是源访问的合并，则使用层次结构选择VISIT_DETAIL_SOURCE_VALUE，例如 IP -> ER-> OP。这应该与选择的逻辑一致，以确定如何创建访问。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>visit_detail_source_concept_id	</span>
                <span></span>
                <span>如果使用 OMOP 支持的词汇在源数据中编码VISIT_DETAIL_SOURCE_VALUE，请将表示源值的概念 ID 放在这里。如果不可用，则映射到 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>admitted_from_concept_id</span>
                <span></span>
                <span>此信息在源数据中可能被称为其他信息，但该字段旨在包含一个值，指示某人从何处被录取。通常，这仅适用于有住院时间的就诊，如住院就诊或长期护理就诊。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>admitted_from_source_value</span>
                <span>使用此字段可确定患者从何处入院。例如，这个概念是访问域的一部分，可以指示患者是否从长期护理机构入院。</span>
                <span>如果可用，请将admitted_from_source_value映射到访问域中的标准概念。如果不可用，则映射到 0。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>discharge_to_source_value	</span>
                <span></span>
                <span>此信息在源数据中可能被称为不同的东西，但该字段旨在包含一个值，指示一个人在访问后出院的位置，例如他们回家或被转移到长期护理。通常，这仅适用于停留一天或更长时间的访问。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>discharge_to_concept_id</span>
                <span>使用此字段可以确定患者在访问详细信息记录后出院的位置。例如，这个概念是访问领域的一部分，可以表明患者是否出院回家或被送往长期护理机构。</span>
                <span>如果可用，请将DISCHARGE_TO_SOURCE_VALUE映射到“访问”域中的“标准概念”。如果不可用，请设置为 0。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>preceding_visit_detail_id</span>
                <span>使用此字段可以查找在给定访问详细信息记录之前为该人员发生的访问详细信息。中间可能有几天或几年的时间。</span>
                <span>PRECEDING_VISIT_DETAIL_ID可用于链接当前访问详细信息之前的访问。请注意，这不是对称的，并且没有“following_visit_id”这样的东西。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_parent_id</span>
                <span>使用此字段可以查找包含给定访问详细信息记录的访问详细信息。这用于需要嵌套在VISIT_OCCURRENCE/VISIT_DETAIL关系之外的访问详细信息记录的情况。</span>
                <span>如果访问在源中的表示方式有多个嵌套级别，则可以使用VISIT_DETAIL_PARENT_ID来记录此关系。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>使用此字段可将VISIT_DETAIL记录链接到其VISIT_OCCURRENCE。</span>
                <span>将包含VISIT_DETAIL记录的VISIT_OCCURRENCE_ID放在这里。</span>
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
