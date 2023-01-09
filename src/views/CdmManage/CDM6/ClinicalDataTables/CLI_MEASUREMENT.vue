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
                <span>measurement_id</span>
                <span>	为人员的测量记录提供的唯一键。请参阅 ETL，了解如何处理同一次访问期间的重复测量。</span>
                <span>应为源数据中存在的每个测量实例分配此唯一键。在某些情况下，一个人可以在同一次访问中拥有同一测量的多个记录。保留这些重复项并将它们分配单独的、唯一的MEASUREMENT_IDs是有效的，尽管应由 ETL 决定如何处理它们。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span>记录测量的人员的PERSON_ID。这可能是系统生成的代码。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>measurement_concept_id</span>
                <span>建议将MEASUREMENT_CONCEPT_ID字段用于分析中的主要用途，并且必须用于网络研究。</span>
                <span>MEASUREMENT_SOURCE_CONCEPT_ID映射到的CONCEPT_ID。只有其SOURCE_CONCEPT_IDs映射到具有“测量”域的标准概念的记录才应进入此表。</span>
                <span>integer</span>
              </li>
              <li>
                <span>measurement_date</span>
                <span>使用此日期可确定测量的日期。</span>
                <span>如果与记录（如order_date、draw_date和result_date）关联的源数据中存在多个日期，请选择最接近从患者抽取样本的日期的日期。</span>
                <span>date</span>
              </li>
              <li>
                <span>measurement_datetime</span>
                <span></span>
                <span>	这不是必需的，尽管它在 v6 中。如果源未指定日期时间，则约定将时间设置为午夜 （00：00：0000）</span>
                <span>datetime</span>
              </li>
              <li>
                <span>measurement_time</span>
                <span></span>
                <span>这是为了向后兼容而存在的，并将在即将推出的版本中弃用。</span>
                <span>varchar(10)</span>
              </li>
              <li>
                <span>measurement_type_concept_id</span>
                <span>此字段可用于确定测量记录的出处，例如测量是否来自 EHR 系统、保险索赔、注册表或其他来源。</span>
                <span>选择最能代表记录的出处的MEASUREMENT_TYPE_CONCEPT_ID，例如，记录是来自 EHR 记录还是账单声明。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>operator_concept_id</span>
                <span>概念4172703“=”的含义与省略OPERATOR_CONCEPT_ID值相同。由于很少使用此字段，因此在设计分析时，请务必不要忘记针对不同于 = 的值测试此字段的内容。</span>
                <span>运算符=,=,>=,>这些概念属于“Meas 值运算符”域。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>value_as_number</span>
                <span>这是测量结果的数值（如果可用）。请注意，血压等测量值将被分成其组成部分，即收缩期记录一条记录，舒张期记录一条记录。</span>
                <span>如果源中存在负值，请将VALUE_AS_NUMBER设置为 NULL，但以下测量值（列为 LOINC 代码）除外：<br>- 1925-7 通过计算计算动脉血液中的碱基过量 - 1927-3 通过计算计算在静脉血液中的基础过量 - 8632-2 QRS-Axis - 通过计算计算的 11555-0 血液中的基础过量 - 1926-5 毛细血管血液中的碱基过量 - 28638-5 通过计算计算动脉脐带血中的碱基过量 28639-3 通过计算计算静脉脊髓血中的碱基过量</span>
                <span>float</span>
              </li>
              <li>
                <span>value_as_concept_id</span>
                <span>如果原始数据给出了测量的分类结果，则捕获这些值并将其映射到“Meas Value”域中的标准概念。</span>
                <span>如果原始数据提供了分类结果以及测量的连续结果，则保留这两个值是有效的ETL选择。连续值应位于“VALUE_AS_NUMBER”字段中，分类值应映射到“Meas Value”域中的标准概念，并放入VALUE_AS_CONCEPT_ID字段中。这也是“映射到价值”关系的目的地。</span>
                <span>integer</span>
              </li>
              <li>
                <span>unit_concept_id</span>
                <span>目前没有推荐的单位用于单个测量，即不强制将血红蛋白a1C测量值表示为百分比。UNIT_SOURCE_VALUES应映射到“单位”域中的“标准概念”，该概念最能表示源数据中给定的单位。</span>
                <span>与MEASUREMENT_CONCEPT_IDs相关的单元没有标准化要求，但是，ETL有责任选择最合理的单元。</span>
                <span>integer</span>
              </li>
              <li>
                <span>range_low</span>
                <span>范围与VALUE_AS_NUMBER具有相同的单位。这些范围由源提供，如果未给出，则应保持 NULL。</span>
                <span>如果提供的正常上限和下限的参考范围（通常由实验室提供），则这些参考范围存储在RANGE_HIGH和RANGE_LOW字段中。如果未提供，则应将其设置为 NULL。</span>
                <span>float</span>
              </li>
              <li>
                <span>range_high</span>
                <span>范围与VALUE_AS_NUMBER具有相同的单位。这些范围由源提供，如果未给出，则应保持 NULL。</span>
                <span>如果提供的正常上限和下限的参考范围（通常由实验室提供），则这些参考范围存储在RANGE_HIGH和RANGE_LOW字段中。如果未提供，则应将其设置为 NULL。</span>
                <span>float</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>与测量记录关联的提供商，例如订购测试的提供商或记录结果的提供商。</span>
                <span>ETL 可能需要选择将哪个PROVIDER_ID放在这里。根据可用的内容，这可能与与整个VISIT_OCCURRENCE记录关联的提供程序不同，也可能不同。例如，EHR记录上的入院医生与主治医生。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>测量发生的访问。</span>
                <span>根据源数据的结构，这可能必须根据日期来确定。如果MEASUREMENT_DATE发生在访问的开始和结束日期内，则有效的 ETL 选择是从包含该访问的访问中选择VISIT_OCCURRENCE_ID，即使数据中没有明确说明。虽然不是必需的，但应尝试找到测量记录的VISIT_OCCURRENCE_ID。如果测量值在源数据中明确与访问相关，则测量结果日期可能超出访问日期的范围。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_id</span>
                <span>发生测量VISIT_DETAIL记录。例如，如果该人当时在 ICU，则VISIT_OCCURRENCE记录将反映整个住院时间，VISIT_DETAIL记录将反映医院就诊期间的 ICU 住院时间。</span>
                <span>规则与VISIT_OCCURRENCE_ID相同。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>measurement_source_value</span>
                <span>此字段包含来自表示所发生测量的源数据的逐字值。例如，这可以是 ICD10 或读取代码。</span>
                <span>此代码映射到标准化词汇表中的标准测量概念，原始代码存储在此处以供参考。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>measurement_source_concept_id</span>
                <span>这是代表MEASUREMENT_SOURCE_VALUE的概念，可能不一定是标准的。不鼓励在分析中使用此字段，因为它不需要包含在整个OHDSI社区中使用的标准概念，并且仅当标准概念不能充分表示给定分析用例所需的测量的源详细信息时才应使用。请考虑改用MEASUREMENT_CONCEPT_ID来实现在整个网络中保持一致的标准化分析。</span>
                <span>如果使用 OMOP 支持的词汇在源数据中对MEASUREMENT_SOURCE_VALUE进行编码，请将表示源值的概念 ID 放在这里。如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>unit_source_value</span>
                <span>此字段包含来自源数据的逐字值，该值表示所发生的测量单位。</span>
                <span>此代码映射到标准化词汇表中的标准条件概念，原始代码存储在此处以供参考。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>value_source_value</span>
                <span>此字段包含源数据中测量值的逐字结果值。</span>
                <span>如果在源数据中同时给出了连续结果和分类结果，以便同时包含VALUE_AS_NUMBER和VALUE_AS_CONCEPT_ID，请在此处存储映射到VALUE_AS_CONCEPT_ID的逐字值。</span>
                <span>varchar(50)</span>
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
