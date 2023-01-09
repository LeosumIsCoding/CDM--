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
                <span>procedure_occurrence_id</span>
                <span>为一个人的程序记录提供的唯一键。请参阅 ETL，了解如何处理同一访问期间的重复过程。</span>
                <span>应为源数据中出现的过程的每个实例分配此唯一键。在某些情况下，一个人可以在同一次访问中拥有同一过程的多个记录。保留这些重复项并将它们分配单独的、唯一的PROCEDURE_OCCURRENCE_IDs是有效的，尽管应由 ETL 决定如何处理它们。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span>记录该过程的人员的PERSON_ID。这可能是系统生成的代码。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>procedure_concept_id</span>
                <span>建议将PROCEDURE_CONCEPT_ID字段用于分析中的主要用途，并且必须用于网络研究。这是从表示过程的源值映射的标准概念</span>
                <span>PROCEDURE_SOURCE_VALUE映射到的CONCEPT_ID。只有其源值映射到具有“过程”域的标准概念的记录才应进入此表。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>procedure_date</span>
                <span>使用此日期可以确定该过程发生的日期。</span>
                <span>如果一个程序持续超过一天，那么它应该作为程序发生的每一天的单独记录记录，这个逻辑代替procedure_end_date，后者将添加到CDM的未来版本中。</span>
                <span>date</span>
              </li>
              <li>
                <span>procedure_datetime</span>
                <span></span>
                <span>	这不是必需的，尽管它在 v6 中。如果源未指定日期时间，则约定将时间设置为午夜 （00：00：0000）</span>
                <span>datetime</span>
              </li>
              <li>
                <span>procedure_type_concept_id</span>
                <span>此字段可用于确定程序记录的出处，例如程序是否来自 EHR 系统、保险索赔、注册表或其他来源。</span>
                <span>选择最能代表记录出处的PROCEDURE_TYPE_CONCEPT_ID，例如，记录是来自 EHR 记录还是账单声明。如果将过程记录为 EHR 遭遇，则PROCEDURE_TYPE_CONCEPT将是“EHR 遭遇记录”。公认的概念。	</span>
                <span>integer</span>
              </li>
              <li>
                <span>modifier_concept_id</span>
                <span>修饰符旨在提供有关该过程的其他信息，但截至目前，词汇量正在审查中。</span>
                <span>由 ETL 来选择如何映射修饰符（如果源数据中存在）。这些概念通常通过“修饰符”概念类来区分（例如，作为“CPT4”词汇表一部分的“CPT4 修饰符”）。如果一条记录上有多个修饰符，则应选择一个与过程相关的修饰符，而不是提供程序。如果不可用，请设置为 0。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>quantity</span>
                <span>如果省略数量值，则假定为单个过程。</span>
                <span>如果过程在源中具有“0”的数量，则在 ETL 中应默认为“1”。如果源中有记录，则可以假设暴露至少发生过一次</span>
                <span>integer</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>与过程记录关联的提供程序，例如执行过程的提供程序。</span>
                <span>ETL 可能需要选择将哪个PROVIDER_ID放在这里。根据可用的内容，这可能与与整体VISIT_OCCURRENCE记录相关的提供者不同，也可能不同，例如EHR记录上的入院与主治医师。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>发生手术的访问。</span>
                <span>根据源数据的结构，这可能必须根据日期来确定。如果PROCEDURE_DATE发生在访问的开始和结束日期内，则有效的 ETL 选择是从包含该访问的访问中选择VISIT_OCCURRENCE_ID，即使数据中没有明确说明也是如此。虽然不是必需的，但应尝试找到PROCEDURE_OCCURRENCE记录的VISIT_OCCURRENCE_ID。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_id</span>
                <span>发生该过程VISIT_DETAIL记录。例如，如果该人在手术时在ICU，则VISIT_OCCURRENCE记录将反映整体住院时间，VISIT_DETAIL记录将反映医院就诊期间的ICU住院时间。</span>
                <span>规则与VISIT_OCCURRENCE_ID相同。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>procedure_source_value</span>
                <span>此字段包含表示所发生过程的源数据的逐字值。例如，这可以是 CPT4 或 OPCS4 代码。</span>
                <span>使用此值查找源概念 ID，然后将源概念 ID 映射到标准概念 ID。</span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>procedure_source_concept_id</span>
                <span>这是表示过程源值的概念，可能不一定是标准的。不鼓励在分析中使用此字段，因为它不需要包含在整个OHDSI社区中使用的标准概念，并且仅当标准概念不能充分表示给定分析用例所需的过程的来源详细信息时才应使用。请考虑改用PROCEDURE_CONCEPT_ID，以实现在整个网络中保持一致的标准化分析。</span>
                <span>如果使用 OMOP 支持的词汇在源数据中编码PROCEDURE_SOURCE_VALUE，请将表示源值的概念 ID 放在这里。如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>modifier_source_value</span>
                <span></span>
                <span>源中的原始修饰符代码存储在此处以供参考。</span>
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
