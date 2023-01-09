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
                <span>payer_plan_period_id</span>
                <span>人员、付款人、计划和时间段的每个唯一组合的唯一标识符。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span>计划所涵盖的人。</span>
                <span>单个人员可以有多个重叠PAYER_PLAN_PERIOD记录</span>
                <span>bigint</span>
              </li>
              <li>
                <span>contract_person_id</span>
                <span>作为计划的主要订户/合同所有者的人员。</span>
                <span>这可能与PERSON_ID相同，也可能不同。例如，如果一位母亲在她的计划中有她的儿子，并且PAYER_PLAN_PERIOD记录是儿子的记录，那么儿子的PERSON_ID将PAYER_PLAN_PERIOD。PERSON_ID和母亲的PERSON_ID会PAYER_PLAN_PERIOD。CONTRACT_PERSON_ID。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>payer_plan_period_start_date</span>
                <span>计划承保范围的开始日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>payer_plan_period_end_date</span>
                <span>	计划承保范围的结束日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>payer_concept_id</span>
                <span>此字段表示向管理该人的护理的提供者提供补偿的组织。</span>
                <span>将付款人直接映射到标准CONCEPT_ID。如果不存在，请联系词汇团队。没有可用于此信息的全局受控词汇表。关键是要对这些信息进行分层，并确定人员是否具有相同的付款人，尽管付款人的姓名不是必需的。如果不可用，请设置为 0。公认的概念。</span>
                <span>integer</span>
              </li>  
              <li>
                <span>payer_source_value</span>
                <span>这是源数据中显示的付款人。</span>
                <span></span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>payer_source_concept_id</span>
                <span></span>
                <span>	如果源数据编码 OMOP 支持的词汇表中的付款人将存储concept_id此处。如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>plan_concept_id</span>
                <span>此字段表示此人注册的特定健康福利计划。</span>
                <span>将计划直接映射到标准CONCEPT_ID。如果不存在，请联系词汇团队。没有可用于此信息的全局受控词汇表。关键是要对这些信息进行分层，并确定人们是否具有相同的健康福利计划，尽管该计划的名称不是必需的。如果不可用，请设置为 0。公认的概念。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>plan_source_value</span>
                <span>	这是源数据中显示的个人的健康福利计划。</span>
                <span></span>
                <span>varchar</span>
              </li>
              <li>
                <span>plan_source_concept_id</span>
                <span></span>
                <span>如果源数据编码 OMOP 支持的词汇表中的计划，则在此处存储concept_id。如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>contract_concept_id</span>
                <span>此字段表示PERSON_ID与CONTRACT_PERSON_ID之间的关系。它应该被理解为PERSON_ID是CONTRACT_PERSON_ID CONTRACT_CONCEPT_ID。因此，如果CONTRACT_CONCEPT_ID代表“继女”的关系，那么记录PAYER_PLAN_PERIOD记录的人就是CONTRACT_PERSON_ID的继女。</span>
                <span>如果可用，请使用此字段表示PERSON_ID与CONTRACT_PERSON_ID之间的关系。如果记录PAYER_PLAN_PERIOD记录的人是CONTRACT_PERSON_ID的继女，那么CONTRACT_CONCEPT_ID 4330864。如果不可用，请设置为 0。公认的概念。	</span>
                <span>integer</span>
              </li>
              <li>
                <span>contract_source_value</span>
                <span>这是PERSON_ID与源数据中显示的CONTRACT_PERSON_ID的关系。</span>
                <span></span>
                <span>varchar</span>
              </li>
              <li>
                <span>contract_source_concept_id</span>
                <span></span>
                <span>	如果源数据对 OMOP 支持的词汇表中PERSON_ID与CONTRACT_PERSON_ID之间的关系进行编码，则存储此处concept_id。如果不可用，请设置为 0。</span>
                <span></span>
              </li>
              <li>
                <span>sponsor_concept_id</span>
                <span>	此字段代表为计划提供资金的计划发起人。这包括自我保险，小团体健康计划和大型团体健康计划。</span>
                <span>将赞助商直接映射到标准CONCEPT_ID。如果不存在，请联系词汇团队。没有可用于此信息的全局受控词汇表。关键是要对这些信息进行分层，并确定人员是否具有相同的赞助商，尽管赞助商的名称不是必需的。如果不可用，请设置为 0。公认的概念。	</span>
                <span>integer</span>
              </li>
              <li>
                <span>sponsor_source_value</span>
                <span>	源数据中显示的计划发起人。</span>
                <span></span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>sponsor_source_concept_id</span>
                <span></span>
                <span>	如果源数据编码 OMOP 支持的词汇表中的发起人将concept_id存储在此处。</span>
                <span>integer</span>
              </li>
              <li>
                <span>family_source_value</span>
                <span>	同一保单所涵盖的所有人（通常是一个家庭）的通用标识符。</span>
                <span>通常，这些是策略成员的注册 ID 的常用数字。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>stop_reason_concept_id</span>
                <span>	此字段表示该人员离开计划的原因（如果已知）。</span>
                <span>将停车原因直接映射到标准CONCEPT_ID。如果不存在，请联系词汇团队。没有可用于此信息的全局受控词汇表。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>stop_reason_source_value</span>
                <span>计划停止原因显示在源数据中。</span>
                <span></span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>stop_reason_source_concept_id</span>
                <span></span>
                <span>如果源数据编码了 OMOP 支持的词汇表中的停止原因，则在此处存储concept_id。</span>
                <span>integer</span>
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
