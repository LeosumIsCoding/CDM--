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
                <span>concept_id</span>
                <span>	所有域中每个概念的唯一标识符。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>concept_name</span>
                <span>概念的明确，有意义和描述性的名称。</span>
                <span></span>
                <span>varchar(255)</span>
              </li>
              <li>
                <span>domain_id</span>
                <span>	概念所属的域表的外键。</span>
                <span></span>
                <span>varchar(20)</span>
              </li>
              <li>
                <span>vocabulary_id</span>
                <span>	词汇表的外键，指示概念是从哪个来源改编的。</span>
                <span></span>
                <span>varchar(20)</span>
              </li>
              <li>
                <span>concept_class_id	</span>
                <span>概念的属性或概念类。例如“临床药物”，“成分”，“临床发现”等。</span>
                <span></span>
                <span>	varchar(20)	</span>
              </li>
              <li>
                <span>standard_concept</span>
                <span>此标志确定概念在何处为标准概念，即在数据、分类概念或非标准源概念中使用。允许的值为“S”（标准概念）和“C”（分类概念），否则内容为 NULL。	</span>
                <span></span>
                <span>	varchar(1)</span>
              </li>
              <li>
                <span>concept_code	</span>
                <span>概念代码表示源词汇表中概念的标识符，例如 SNOMED-CT 概念 ID、RX 规范 RXCUI 等。请注意，概念代码在词汇表中不是唯一的。</span>
                <span></span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>valid_start_date</span>
                <span>首次记录概念的日期。默认值为 1970 年 1 月 1 日，这意味着概念没有（已知的）开始日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>valid_end_date</span>
                <span>概念因被删除或被新概念取代（更新）而失效的日期。默认值为 31-Dec-2099，这意味着，概念在被弃用之前一直有效。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>invalid_reason</span>
                <span>概念无效的原因。当valid_end_date具有默认值时，可能的值为 D（已删除）、U（替换为更新）或 NULL</span>
                <span></span>
                <span>	varchar(1)</span>
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
