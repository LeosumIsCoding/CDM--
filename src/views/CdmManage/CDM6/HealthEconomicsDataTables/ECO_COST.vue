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
                <span>cost_id</span>
                <span>每个 COST 记录的唯一标识符。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span></span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>cost_event_id</span>
                <span>	如果成本记录与数据库中的另一条记录相关，则此字段是链接记录的主键。</span>
                <span>如果成本记录与数据库中的另一条记录相关，则此字段是链接记录的主键。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>cost_event_field_concept_id</span>
                <span>如果 Cost 记录与数据库中的另一条记录相关，则此字段是标识链接记录的主键来自哪个表CONCEPT_ID。</span>
                <span>如果成本记录与数据库中的另一条记录相关，则此字段是链接记录的主键。</span>
                <span>integer</span>
              </li>
              <li>
                <span>cost_concept_id</span>
                <span>	一个外键，它引用属于“成本”词汇表的标准化词汇表中的标准成本概念标识符。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>cost_type_concept_id</span>
                <span>	CONCEPT 表中概念的外键标识符，用于 COST 数据的出处或来源，并属于“类型概念”词汇表</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>cost_source_concept_id</span>
                <span>引用源中使用的代码的成本概念的外键。	</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>cost_source_value</span>
                <span>成本在源数据中显示的源值</span>
                <span></span>
                <span></span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>currency_concept_id</span>
                <span>	表示用于描绘国际货币（如 USD 表示美元）的 3 个字母代码的概念的外键标识符。这些属于“货币”词汇</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>cost</span>
                <span>	实际财务成本金额</span>
                <span></span>
                <span>float</span>
              </li>
              <li>
                <span>incurred_date</span>
                <span>	临床事件的第一个服务日期对应于捕获信息（例如访问日期，程序日期，病情日期，药物日期等）中的费用。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>billed_date</span>
                <span></span>
                <span>为服务或遭遇生成帐单的日期</span>
                <span>date</span>
              </li>
              <li>
                <span>paid_date</span>
                <span>收到服务或遭遇付款的日期</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>revenue_code_concept_id</span>
                <span>一个外键，指的是属于“收入代码”词汇表的“收入代码标准化词汇表”中的标准概念 ID。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>drg_concept_id</span>
                <span>	一个外键，用于指属于“DRG”词汇表的 DRG 代码的标准化词汇表中的标准概念 ID。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>revenue_code_source_value</span>
                <span>收入代码在源数据中显示的源值，存储在此处以供参考。</span>
                <span></span>
                <span>	varchar(50)</span>
              </li>
              <li>
                <span>drg_source_value</span>
                <span>	3 位 DRG 源代码的源值，如源数据所示，存储在此处以供参考</span>
                <span></span>
                <span>	varchar(50)</span>
              </li>
              <li>
                <span>payer_plan_period_id</span>
                <span>PAYER_PLAN_PERIOD表的外键，其中存储了付款人、计划和家庭的详细信息。记录与参与paid_by_payer字段的付款人相关的payer_plan_id。</span>
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
