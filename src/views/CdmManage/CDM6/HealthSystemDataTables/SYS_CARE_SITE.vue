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
                <span>care_site_id</span>
                <span></span>
                <span>为location_id和place_of_service_source_value的每个唯一组合分配一个 ID。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>care_site_name</span>
                <span>care_site在源数据中显示的名称</span>
                <span></span>
                <span>	varchar(255)</span>
              </li>
              <li>
                <span>place_of_service_concept_id</span>
                <span>这是描述护理部位特征的高级方法。然而，通常，护理站点可以在多种环境中提供护理（住院，门诊等），并且这种粒度应反映在访问中。</span>
                <span>在访问域中选择最能代表护理网站中提供医疗保健的环境的概念。如果护理站点中的大多数就诊都是住院治疗，则place_of_service_concept_id应代表住院患者。如果存在有关唯一护理站点（例如药房）的信息，则应创建护理站点记录。如果此信息不可用，则设置为 0。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>location_id</span>
                <span>LOCATION_ID来自 LOCATION 表，表示care_site的物理位置。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>care_site_source_value</span>
                <span>care_site在源数据中显示的标识符。这可以是与care_site名称分开的标识符。</span>
                <span></span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>place_of_service_source_value</span>
                <span></span>
                <span>将care_site的服务位置放在源数据中的显示位置。</span>
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
