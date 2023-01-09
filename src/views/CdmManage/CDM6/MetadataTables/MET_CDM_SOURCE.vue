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
                <span>cdm_source_name</span>
                <span>CDM 实例的名称。</span>
                <span></span>
                <span>	varchar(255)</span>
              </li>
              <li>
                <span>cdm_source_abbreviation</span>
                <span>CDM 实例的缩写。</span>
                <span></span>
                <span>	varchar(25)</span>
              </li>
              <li>
                <span>cdm_holder</span>
                <span></span>
                <span>	varchar(255)</span>
                <span>清洁发展机制实例的持有者。</span>
              </li>
              <li>
                <span>source_description</span>
                <span>CDM 实例的说明。</span>
                <span></span>
                <span>varchar(MAX)</span>
              </li>
              <li>
                <span>source_documentation_reference	</span>
                <span></span>
                <span></span>
                <span>	varchar(255)	</span>
              </li>
              <li>
                <span>cdm_etl_reference</span>
                <span></span>
                <span>将链接放到使用的 CDM 版本。</span>
                <span>varchar(255)	</span>
              </li>
              <li>
                <span>source_release_date</span>
                <span>源数据的发布日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>cdm_release_date</span>
                <span>CDM 实例的发布数据。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>cdm_version</span>
                <span></span>
                <span></span>
                <span>	varchar(10)</span>
              </li>
              <li>
                <span>vocabulary_version</span>
                <span></span>
                <span></span>
                <span>	varchar(10)</span>
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
