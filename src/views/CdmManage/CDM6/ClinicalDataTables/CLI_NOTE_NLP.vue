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
                <span>note_nlp_id</span>
                <span>NLP 记录的唯一标识符。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>note_id</span>
                <span>这是 NLP 记录所关联的注释记录NOTE_ID。</span>
                <span></span>
                <span>	integer</span>
              </li>
              <li>
                <span>section_concept_id</span>
                <span></span>
                <span>SECTION_CONCEPT_ID应用于表示NOTE_NLP记录中包含的注释部分。这些概念可以作为文档面板的一部分找到，并且基于所写注释的类型，即出院摘要。这些面板可以作为具有“子项”与CONCEPT_ID 45875957的关系的概念找到。</span>
                <span>	integer</span>
              </li>
              <li>
                <span>snippet</span>
                <span>	术语周围的小文本窗口</span>
                <span></span>
                <span>varchar(250)</span>
              </li>
              <li>
                <span>"offset"</span>
                <span>	输入注释中提取的术语的字符偏移</span>
                <span></span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>lexical_variant</span>
                <span>从 NLP 工具中提取的原始文本。</span>
                <span></span>
                <span>varchar(250)</span>
              </li>
              <li>
                <span>note_nlp_concept_id	</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>note_nlp_source_concept_id</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>nlp_system</span>
                <span></span>
                <span>提取该术语的 NLP 系统的名称和版本。对数据来源有用。</span>
                <span>varchar(250)</span>
              </li>
              <li>
                <span>nlp_date</span>
                <span>票据处理的日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>nlp_datetime</span>
                <span>票据处理的日期和时间。</span>
                <span></span>
                <span>datetime</span>
              </li>
              <li>
                <span>term_exists</span>
                <span></span>
                <span>Term_exists被定义为一个标志，指示患者是否确实患有或患有这种疾病。以下任何修饰符都会使Term_exists为假：否定=真主语=[患者以外的任何东西]条件=真/li> Rule_out=真不确定=非常低的确定性或任何较低的确定性完全缺乏修饰符会使Term_exists为真。</span>
                <span>varchar(1)</span>
              </li>
              <li>
                <span>term_temporal</span>
                <span></span>
                <span>Term_temporal是指示一个条件是存在的还是只是过去。以下将是过去：<br><br> - 历史记录 = true - Concept_date = 报告时间之前的任何内容</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>term_modifiers</span>
                <span></span>
                <span>对于那里的修饰符，它们必须具有以下值：<br><br> - 否定 = 假 - 主题 = 患者 - 条件 = 假 - Rule_out = 假 - 不确定 = 真或高或中等甚至低（可以争论低）。Term_modifiers将不同类型的实体（条件，药物，实验室等）的所有修饰符连接成一个字符串。实验室值将另存为修改器之一。</span>
                <span>varchar(2000)</span>
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
