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
                <span>specimen_id</span>
                <span>每个标本的唯一标识符。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span>从中获取标本的人。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>specimen_concept_id</span>
                <span></span>
                <span>SPECIMEN_SOURCE_VALUE在样本域中映射到的标准CONCEPT_ID。公认的概念</span>
                <span>integer</span>
              </li>
              <li>
                <span>specimen_type_concept_id</span>
                <span></span>
                <span>输入样本记录的来源，如在EHR系统中。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>specimen_date</span>
                <span>采集标本的日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>specimen_datetime</span>
                <span></span>
                <span></span>
                <span>datetime</span>
              </li>
              <li>
                <span>数量</span>
                <span>从该人身上采集的标本数量。</span>
                <span></span>
                <span>float</span>
              </li>
              <li>
                <span>unit_concept_id</span>
                <span>试样数量的单位。</span>
                <span>将UNIT_SOURCE_VALUE映射到“设备”域中的“标准概念”。公认的概念</span>
                <span>integer</span>
              </li>
              <li>
                <span>anatomic_site_concept_id</span>
                <span>这是标本来自身体上的部位。</span>
                <span>将ANATOMIC_SITE_SOURCE_VALUE映射到“规范解剖网站”域中的“标准概念”。这应该以最低粒度级别进行编码 接受的概念</span>
                <span>integer</span>
              </li>
              <li>
                <span>disease_status_concept_id</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>specimen_source_id</span>
                <span>这是源系统中样本的标识符。</span>
                <span></span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>specimen_source_value</span>
                <span></span>
                <span></span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>unit_source_value</span>
                <span></span>
                <span>此单位表示样本的数量，如源中所示。</span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>anatomic_site_source_value</span>
                <span></span>
                <span>这是取出标本的尸体上的部位，如来源所示。</span>
                <span>varchar(50)	</span>
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
