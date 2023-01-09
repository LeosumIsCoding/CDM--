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
                <span>provider_id</span>
                <span>假设具有不同唯一标识符的每个提供者实际上是不同的人，应独立对待。</span>
                <span>此标识符可以是源数据的原始 ID，前提是它是整数，否则它可以是自动生成的数字。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>provider_name</span>
                <span></span>
                <span>此字段不是必需的，因为不必具有提供程序的实际标识。相反，这个想法是在整个数据库中唯一和匿名地识别护理提供者。</span>
                <span>varchar(255)</span>
              </li>
              <li>
                <span>npi</span>
                <span>这是医疗保险和医疗补助服务中心（CMS）发给美国医疗保健提供者的国家提供者号码。</span>
                <span></span>
                <span>varchar(20)</span>
              </li>
              <li>
                <span>dea</span>
                <span>这是美国联邦机构DEA发布的标识符，允许提供者为受控物质开具处方。</span>
                <span></span>
                <span>varchar(20)</span>
              </li>
              <li>
                <span>specialty_concept_id</span>
                <span>如果提供程序有多个专业，则此字段表示数据中出现的最常见专业或表示列出的所有专业的最具体概念。这包括内科、急诊医学等专科医生和专职卫生专业人员，如护士、助产士和药剂师。</span>
                <span>如果提供者有多个专业，则有两个选项：1.选择一个concept_id它是多个专业的共同祖先，或者，2.选择提供者最常出现的专业。此字段中的概念应为“标准”，并带有“提供程序”域。如果不可用，请设置为 0。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>care_site_id</span>
                <span>这是提供程序主要在其中执行的位置的CARE_SITE_ID。</span>
                <span>如果提供者有多个护理部位，则应记录主要或最常施加CARE_SITE_ID。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>year_of_birth</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>gender_concept_id</span>
                <span>此字段表示源数据中记录的提供程序的性别。</span>
                <span>如果给出，请从性别领域输入一个概念，代表提供者记录的性别。如果不可用，请设置为 0。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>provider_source_value</span>
                <span>使用此字段可链接回源数据中的提供程序。这通常用于 ETL 逻辑的错误检查。</span>
                <span>某些用例需要能够链接回源数据中的提供程序。此字段允许存储源中显示的提供程序标识符。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>specialty_source_value</span>
                <span>这是源数据中显示的提供程序或专业类型。这包括内科、急诊医学等专科医生和专职卫生专业人员，如护士、助产士和药剂师。</span>
                <span>将提供程序类型放在源数据中。此字段由 ETL-er 自行决定这应该是源中的编码值还是查找值的文本描述。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>specialty_source_concept_id</span>
                <span>这通常为零，因为许多网站使用专有代码来存储医生的专业。</span>
                <span>如果源数据代码提供程序专业在 OMOP 支持的词汇中存储concept_id此处。如果不可用，请设置为 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>gender_source_value</span>
                <span>这是源数据中显示的提供者的性别。</span>
                <span>将提供商的性别与源数据中显示的性别一致。此字段由 ETL-er 自行决定这应该是源中的编码值还是查找值的文本描述。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>gender_source_concept_id</span>
                <span>这通常为零，因为许多网站使用专有代码来存储提供商性别。</span>
                <span>如果源数据代码提供程序性别在 OMOP 支持的词汇中存储concept_id此处。如果不可用，请设置为 0。</span>
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
