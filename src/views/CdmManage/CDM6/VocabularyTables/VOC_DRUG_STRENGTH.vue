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
                <span>drug_concept_id</span>
                <span>	代表品牌药物或临床药物产品的概念。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>ingredient_concept_id</span>
                <span>该概念代表药物产品中所含的活性成分。</span>
                <span>组合药物将在此表中具有多个记录，每种活性成分一个。</span>
                <span>integer</span>
              </li>
              <li>
                <span>amount_value</span>
                <span>	药物产品中所含活性成分的数值或量。</span>
                <span></span>
                <span>float</span>
              </li>
              <li>
                <span>amount_unit_concept_id</span>
                <span>该概念代表药物产品中所含活性成分量的测量单位。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>numerator_value</span>
                <span>	药物产品中所含活性成分的浓度。</span>
                <span></span>
                <span>float</span>
              </li>
              <li>
                <span>numerator_unit_concept_id</span>
                <span>该概念代表活性成分浓度的测量单位。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>denominator_value</span>
                <span>总液体（或其他可分割产品，如软膏、凝胶、喷雾剂等）的量。</span>
                <span></span>
                <span>float</span>
              </li>
              <li>
                <span>denominator_unit_concept_id</span>
                <span>该概念代表活性成分浓度的分母单位。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>box_size</span>
                <span>分发给患者的盒子中包含的临床品牌药物或定量临床或品牌药物的单位数。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>valid_start_date</span>
                <span>首次记录概念的日期。默认值为 1970 年 1 月 1 日。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>valid_end_date</span>
                <span>当时概念无效的日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>invalid_reason</span>
                <span>该概念无效的原因。当valid_end_date具有默认值时，可能的值为 D（已删除）、U（替换为更新）或 NULL。</span>
                <span></span>
                <span>varchar(1)	</span>
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
