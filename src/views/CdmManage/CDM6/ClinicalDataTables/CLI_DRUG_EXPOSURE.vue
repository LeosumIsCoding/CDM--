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
                <span>drug_exposure_id</span>
                <span>为一个人的药物分配或给药记录提供的唯一密钥。请参阅ETL，了解如何在同一次访问期间处理重复药物。</span>
                <span>源数据中存在的药物分配或给药的每个实例都应分配此唯一键。在某些情况下，一个人可以在同一次访问中拥有同一药物的多个记录。保留这些重复项并为其分配单独的、唯一的DRUG_EXPOSURE_IDs是有效的，尽管应由 ETL 决定如何处理它们。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span>记录药物分配或给药的人的PERSON_ID。这可能是系统生成的代码。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>drug_concept_id</span>
                <span>建议将DRUG_CONCEPT_ID字段用于分析中的主要用途，并且必须用于网络研究。这是从源概念ID映射的标准概念，它表示以其他方式引入体内的药物产品或分子。药物概念可以有不同程度的关于药物强度和剂量的信息。此信息与后续字段中的数量和管理信息以及作为标准词汇下载的一部分提供的DRUG_STRENGTH表中的强度信息相关。</span>
                <span>DRUG_SOURCE_VALUE映射到的CONCEPT_ID。概念ID应从源概念ID的映射中导出，或者通过选择代表您拥有的最大量细节的药物概念来派生。其源值映射到具有药物域的标准概念的记录应位于此表中。当代码的药物来源值无法转换为标准药物概念 ID 时，将仅存储药物暴露条目，其中包含相应的SOURCE_CONCEPT_ID和DRUG_SOURCE_VALUE以及DRUG_CONCEPT_ID 0。在映射过程中，具有最详细信息内容的药物概念是首选。这些在概念的CONCEPT_CLASS_ID字段中指出，并按以下优先顺序记录：“品牌包装”，“临床包装”，“品牌药物”，“临床药物”，“品牌药物成分”，“临床药物成分”，“品牌药物形式”，“临床药物形式”，并且仅在没有其他信息可用“成分”的情况下。注意：如果仅知道药物类别，则DRUG_CONCEPT_ID字段应包含 0。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>drug_exposure_start_date</span>
                <span>使用此日期确定药物记录的开始日期。</span>
                <span>有效条目包括处方的开始日期，处方填写日期或记录药物管理的日期。使用药物订购日期作为DRUG_EXPOSURE_START_DATE是有效的ETL选择。</span>
                <span>date</span>
              </li>
              <li>
                <span>drug_exposure_start_datetime	</span>
                <span></span>
                <span>这不是必需的，尽管它在 v6 中。如果源未指定日期时间，则约定将时间设置为午夜 （00：00：0000）</span>
                <span>datetime</span>
              </li>
              <li>
                <span>drug_exposure_end_date</span>
                <span>DRUG_EXPOSURE_END_DATE表示患者药物暴露结束的日期。</span>
                <span>如果此信息在数据中没有明确提供，请使用以下方法推断结束日期：/n/n 1。首先使用持续时间或天数供应量开始，使用计算药物开始日期+供应天数-1天。2.使用量除以日剂量，您可以从sig或源场获得（或假设日剂量为1）用于固体，不可分割的药物产品。如果数量代表成分量，数量除以每日剂量*浓度（从drug_strength）药物概念id告诉您剂量形式。3.如果是给药记录，则设置药物结束日期等于药物开始日期。如果记录是书面处方，则将结束日期设置为开始日期+ 29。如果记录是邮购处方，则将结束日期设置为开始日期+ 89。结束日期必须等于或大于开始日期。布洛芬20mg/mL口服溶液的概念告诉我们这是口服溶液。将持续时间计算为数量（200例）*日剂量（5毫升）/浓度（20毫克/毫升）200 * 5/20 = 50天。剂量形式示例</span>
                <span>date</span>
              </li>
              <li>
                <span>drug_exposure_end_datetime</span>
                <span></span>
                <span>这不是必需的，尽管它在 v6 中。如果源未指定日期时间，则约定将时间设置为午夜 （00：00：0000）</span>
                <span>datetime</span>
              </li>
              <li>
                <span>verbatim_end_date</span>
                <span>这是源数据中出现的药物暴露的结束日期（如果给出）</span>
                <span>将结束日期或终止日期与源数据中显示的日期一样放置，或者如果不可用，则留空。</span>
                <span>date</span>
              </li>
              <li>
                <span>drug_type_concept_id</span>
                <span>您可以使用TYPE_CONCEPT_ID来区分所开具的处方与发出的处方，用药史与患者报告的暴露等。</span>
                <span>选择最能代表记录出处的drug_type_concept_id，例如，它是来自处方记录还是医生给药的记录。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>stop_reason</span>
                <span>一个人停止药物治疗的原因，因为它在来源中表示。原因包括方案已完成，更改，移除等。此字段将在 v6.0 中停用。</span>
                <span>此信息通常不会填充到源数据中，如果信息不存在，则将其留空是有效的 etl 选择。</span>
                <span>varchar(20)</span>
              </li>
              <li>
                <span>refills</span>
                <span>仅当记录来自所写的处方时，才会填写此字段，此字段旨在表示处方时的预期补充。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>quantity</span>
                <span></span>
                <span>为了找到药物的剂量形式，可以使用关系表，其中relationship_id为“具有剂量形式”。如果是液体，则数量代表以drug_strength表给出的单位分配或订购的成分总量。如果源数据中的单位与DRUG_STRENGTH表中的单位不一致，则应将数量转换为DRUG_STRENGTH中给出的正确单位。对于固定剂量形式的临床药物（片剂等），数量是处方或分配的单位/片剂/胶囊的数量（可以是部分的，但只有1/2或1/3，而不是0.01）。临床药物具有可分割的剂量形式（注射剂），其数量是患者获得的成分的量。例如，如果注射量为2mg / mL，但患者获得80mL，则报告数量为160。量化临床药物用可分割的剂量形式（预填充注射器），其数量是与临床药物相似的成分量。请参阅如何计算药物剂量以获取更多信息。</span>
                <span>float</span>
              </li>
              <li>
                <span>days_supply</span>
                <span></span>
                <span>药物供应天数。这应该是处方上给出的逐字days_supply。如果药物是医生施用的，则使用持续时间结束日期（如果给予）或设置为1作为默认值（如果持续时间不可用）。</span>
                <span>integer</span>
              </li>
              <li>
                <span>sig</span>
                <span>这是提供者编写的药物逐字说明。</span>
                <span>如果有的话，将药物的书面说明逐字逐句地放在来源中。</span>
                <span>varchar(MAX)</span>
              </li>
              <li>
                <span>route_concept_id</span>
                <span></span>
                <span>ROUTE_SOURCE_VALUE在路由域中映射到的标准CONCEPT_ID。</span>
                <span>integer</span>
              </li>
              <li>
                <span>lot_number</span>
                <span></span>
                <span></span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>与药物记录相关的提供者，例如撰写处方的提供者或管理药物的提供者。</span>
                <span>ETL 可能需要选择将哪个PROVIDER_ID放在这里。根据可用的内容，这可能与与整体VISIT_OCCURRENCE记录相关的提供者不同，也可能不同，例如EHR记录上的排序与管理医生。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>在处方，管理或分配药物期间访问。</span>
                <span>为了填充该领域，必须在访问中明确启动药物暴露。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_id</span>
                <span>发生药物暴露VISIT_DETAIL记录。例如，如果患者在药物管理时在ICU，则VISIT_OCCURRENCE记录将反映整体住院时间，VISIT_DETAIL记录将反映ICU在医院就诊期间的住院时间。</span>
                <span>规则与VISIT_OCCURRENCE_ID相同。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>drug_source_value</span>
                <span>此字段包含来自表示所发生药物暴露的源数据的逐字值。例如，这可以是 NDC 或吉姆脚本代码。</span>
                <span>此代码映射到标准化词汇表中的标准药物概念，原始代码存储在此处以供参考。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>drug_source_concept_id</span>
                <span>这是代表药物来源价值的概念，可能不一定是标准的。不鼓励在分析中使用此字段，因为它不需要包含在整个OHDSI社区中使用的标准概念，并且仅当标准概念不能充分表示给定分析用例所需的药物的来源详细信息时才应使用。请考虑改用DRUG_CONCEPT_ID，以实现在整个网络中保持一致的标准化分析。</span>
                <span>如果使用 OMOP 支持的词汇在源数据中编码DRUG_SOURCE_VALUE，请将表示源值的概念 ID 放在这里。如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>route_source_value</span>
                <span>此字段包含表示药物途径的源数据的逐字值。</span>
                <span>此信息在源数据中可能被称为不同的东西，但该字段旨在包含一个值，指示何时以及如何向患者提供药物。此源值映射到存储在ROUTE_CONCEPT_ID字段中的标准概念。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>dose_unit_source_value</span>
                <span>该字段包含来自表示所给药物剂量单位的源数据的逐字值。</span>
                <span>该信息在源数据中可能被称为不同的东西，但该字段旨在包含指示给予患者的药物剂量单位的值。这是一个较旧的列，将在即将推出的版本中弃用。</span>
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
