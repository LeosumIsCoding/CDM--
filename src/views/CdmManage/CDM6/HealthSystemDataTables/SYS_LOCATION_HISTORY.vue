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
                <span>location_id</span>
                <span>这是LOCATION_HISTORY记录LOCATION_ID。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>relationship_type_concept_id</span>
                <span>这是位置和实体（人员、提供者或CARE_SITE）之间的关系</span>
                <span>此字段中的概念必须位于“位置”类中。如果DOMAIN_ID CARE_SITE则此值应为 0，当域为“提供程序”时，值为 Office。</span>
                <span>integer</span>
              </li>
              <li>
                <span>domain_id</span>
                <span></span>
                <span>	与位置相关的实体的域。无论是个人，提供者还是CARE_SITE。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>entity_id</span>
                <span></span>
                <span>实体的唯一标识符。引用person_id、provider_id或care_site_id，具体取决于domain_id。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>start_date</span>
                <span>关系开始的日期</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>end_date</span>
                <span>关系结束的日期</span>
                <span></span>
                <span>date</span>
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
