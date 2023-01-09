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
                <span>drug_era_id</span>
                <span></span>
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
                <span>drug_concept_id</span>
                <span>概念 ID 表示特定的药物成分。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>drug_era_start_datetime	</span>
                <span></span>
                <span>药物时代开始日期是给定成分的第一次药物暴露的开始日期，自上次暴露以来至少为31天。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>drug_era_end_datetime</span>
                <span></span>
                <span>	药物时代结束日期是最后一次药物暴露的结束日期。每次药物暴露的结束日期要么取自现场drug_exposure_end_date，要么由于通常不可用，使用以下规则推断：对于药房处方数据，药物分配日期加上供应天数用于推断药物暴露的结束日期。根据特定国家/地区的医疗保健系统，此供应信息要么在day_supply字段中明确提供，要么从包装尺寸或类似信息中推断出来。对于程序药物，通常在单个日期（即给药日期）施用药物。允许在两个后续此类外推DRUG_EXPOSURE记录之间使用30天的标准持久性窗口（间隙，松弛），以被视为合并到单个药物时代。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>drug_exposure_count</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>gap_days</span>
                <span></span>
                <span>差距日确定在导致DRUG_ERA记录的所有药物暴露事件之间观察到的总无药物天数。假设患者“未储存”药物，即如果观察到新的药物处方或补充（写入新的DRUG_EXPOSURE记录），则放弃先前事件的剩余供应。持久性窗口和间隔天数之间的区别在于，前者是两个后续DRUG_EXPOSURE记录之间允许的最大无毒时间，而后者是在上述无库存假设下给定药物时代实际无毒天数的总和。</span>
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
