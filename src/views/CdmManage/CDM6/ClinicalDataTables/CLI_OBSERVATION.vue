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
                <span>observation_id</span>
                <span>为人员的观察记录提供的唯一键。请参阅 ETL，了解如何处理同一访问期间的重复观测值。</span>
                <span>应为源数据中存在的每个观测值实例分配此唯一键。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span>记录观察结果的人的PERSON_ID。这可能是系统生成的代码。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>observation_concept_id</span>
                <span>建议将OBSERVATION_CONCEPT_ID字段用于分析中的主要用途，并且必须用于网络研究。</span>
                <span>OBSERVATION_SOURCE_CONCEPT_ID映射到的CONCEPT_ID。此表中的概念没有必须遵守的指定域。唯一的规则是，在“状况”、“程序”、“药物”、“度量”或“设备”域中具有“概念”的记录必须转到相应的表。</span>
                <span>integer</span>
              </li>
              <li>
                <span>observation_date</span>
                <span>观察的日期。根据观察结果所代表的内容，这可能是实验室测试的日期，调查的日期或患者的家族史的日期。</span>
                <span>对于某些观察结果，ETL可能需要选择哪个日期。</span>
                <span>date</span>
              </li>
              <li>
                <span>observation_datetime</span>
                <span></span>
                <span>如果未给出时间，则设置为午夜 （00：00：00）。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>observation_type_concept_id</span>
                <span>此字段可用于确定观测记录的出处，例如测量值是否来自 EHR 系统、保险索赔、注册表或其他来源。</span>
                <span>选择最能代表记录的出处的OBSERVATION_TYPE_CONCEPT_ID，例如，记录是来自 EHR 记录还是计费声明。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>value_as_number</span>
                <span>这是观测结果的数值，如果适用且可用。并不期望所有观测值都具有数值结果，相反，如果存在值，则此字段用于容纳值。</span>
                <span></span>
                <span>float</span>
              </li>
              <li>
                <span>value_as_string</span>
                <span>这是观测结果的分类值（如果适用且可用）。</span>
                <span></span>
                <span>varchar(60)</span>
              </li>
              <li>
                <span>value_as_concept_id</span>
                <span>一些用于观察表的记录可能具有在一个源代码中表示的两个临床想法。例如，这在描述某些疾病的家族史的ICD10代码中很常见。在OMOP中，词汇将这两个临床思想分为两个代码;一个成为OBSERVATION_CONCEPT_ID，另一个成为VALUE_AS_CONCEPT_ID。使用观测表时，请务必牢记这种可能性，并检查VALUE_AS_CONCEPT_ID字段以获取相关信息。</span>
                <span>请注意，VALUE_AS_CONCEPT_ID的值可以通过包含观测内容的来源概念的映射来提供。在这些情况下，除了“映射到”记录之外，CONCEPT_RELATIONSHIP表还包含第二条记录，其relationship_id设置为“映射到值”。例如，ICD10 Z82.4“缺血性心脏病和其他循环系统疾病的家族史”与4167217“临床发现的家族史”有“映射到”关系，以及“价值地图”记录，134057“心血管系统疾病”。</span>
                <span>Integer</span>
              </li>
              <li>
                <span>qualifier_concept_id</span>
                <span>此字段包含进一步指定临床事实的所有属性，例如程度、严重程度、药物间相互作用警报等。</span>
                <span>使用您的最佳判断，了解在这里使用什么概念，以及它们是否有必要准确表示临床记录。这些概念的领域没有限制，它们只需要是标准的。</span>
                <span>Integer</span>
              </li>
              <li>
                <span>unit_concept_id</span>
                <span>目前没有推荐用于单个观测概念的单位。UNIT_SOURCE_VALUES应映射到“单位”域中的“标准概念”，该概念最能表示源数据中给定的单位。</span>
                <span>与OBSERVATION_CONCEPT_IDs相关的单元没有标准化要求，但是，ETL有责任选择最合理的单元。</span>
                <span>Integer</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>与观察记录关联的提供者，例如订购测试的提供者或记录结果的提供者。</span>
                <span>ETL 可能需要选择将哪个PROVIDER_ID放在这里。根据可用的内容，这可能与与整个VISIT_OCCURRENCE记录关联的提供程序不同，也可能不同。例如，EHR记录上的入院医生与主治医生。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>观察发生的访问。</span>
                <span>根据源数据的结构，这可能必须根据日期来确定。如果OBSERVATION_DATE发生在访问的开始和结束日期内，则有效的 ETL 选择是从包含该访问的访问中选择VISIT_OCCURRENCE_ID，即使数据中没有明确说明。虽然不是必需的，但应设法找到观察记录的VISIT_OCCURRENCE_ID。如果观测值与源数据中明确显示的访问相关，则观测结果日期可能超出访问日期的范围。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_id</span>
                <span>观测发生期间VISIT_DETAIL记录。例如，如果该人当时在 ICU，则VISIT_OCCURRENCE记录将反映整个住院时间，VISIT_DETAIL记录将反映医院就诊期间的 ICU 住院时间。</span>
                <span>规则与VISIT_OCCURRENCE_ID相同。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>observation_source_value</span>
                <span>此字段包含来自表示所发生观测值的源数据的逐字值。例如，这可以是 ICD10 或读取代码。</span>
                <span>此代码映射到标准化词汇表中的标准概念，原始代码存储在此处以供参考。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>observation_source_concept_id	</span>
                <span>这是代表OBSERVATION_SOURCE_VALUE的概念，可能不一定是标准的。不鼓励在分析中使用此字段，因为它不需要包含在整个OHDSI社区中使用的标准概念，并且仅当标准概念不能充分表示给定分析用例所需的观察的源详细信息时才应使用。请考虑改用OBSERVATION_CONCEPT_ID来启用在整个网络中保持一致的标准化分析。</span>
                <span>如果使用 OMOP 支持的词汇表在源数据中对OBSERVATION_SOURCE_VALUE进行编码，请将表示源值的概念 ID 放在这里。如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>unit_source_value</span>
                <span>此字段包含来自源数据的逐字值，这些源数据表示所发生观测值的单位。</span>
                <span>此代码映射到标准化词汇表中的标准条件概念，原始代码存储在此处以供参考。</span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>qualifier_source_value</span>
                <span>此字段包含来自源数据的逐字值，这些源数据表示所发生观测值的限定符。</span>
                <span>此代码映射到标准化词汇表中的标准条件概念，原始代码存储在此处以供参考。</span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>observation_event_id</span>
                <span>如果观测记录与数据库中的另一条记录相关，则此字段是链接记录的主键。</span>
                <span>将链接记录的主键（如果适用）放在此处。有关更多详细信息，请参阅观察表的 ETL 约定。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>obs_event_field_concept_id</span>
                <span>如果观测记录与数据库中的另一条记录相关，则此字段是标识链接记录的主键来自哪个表的CONCEPT_ID。</span>
                <span>放置标识OBSERVATION_EVENT_ID来自哪个表和字段的CONCEPT_ID。</span>
                <span>integer</span>
              </li>
              <li>
                <span>value_as_datetime</span>
                <span>某些观测记录可能会将结果存储为日期值。</span>
                <span></span>
                <span>datetime</span>
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
