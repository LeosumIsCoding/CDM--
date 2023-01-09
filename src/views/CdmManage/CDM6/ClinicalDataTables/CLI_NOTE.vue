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
                <span>note_id</span>
                <span>每个注释的唯一标识符。</span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>person_id</span>
                <span></span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>note_event_id</span>
                <span></span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>note_event_field_concept_id</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>note_date</span>
                <span>记录注释的日期。</span>
                <span></span>
                <span>date</span>
              </li>
              <li>
                <span>note_datetime</span>
                <span></span>
                <span>如果未给出时间，请将时间设置为午夜。</span>
                <span>datetime</span>
              </li>
              <li>
                <span>note_type_concept_id</span>
                <span>注释的出处。这很可能是EHR。</span>
                <span>把笔记的源系统，如在EHR记录。公认的概念。</span>
                <span>integer</span>
              </li>
              <li>
                <span>note_class_concept_id</span>
                <span>表示注释的 HL7 LOINC 文档类型词汇分类的标准概念 ID。</span>
                <span>将注释分类映射到标准概念。有关更多信息，请参见 NOTE 表说明中的 ETL 约定。接受的观念。这个概念也可以用具有“种类（LOINC）”与706391（注意）的关系的概念来表示。</span>
                <span>integer</span>
              </li>
              <li>
                <span>note_title</span>
                <span>注释的标题。</span>
                <span></span>
                <span>varchar(250)</span>
              </li>
              <li>
                <span>note_text</span>
                <span>注释的内容。</span>
                <span></span>
                <span>varchar(MAX)</span>
              </li>
              <li>
                <span>encoding_concept_id</span>
                <span>这是表示字符编码类型的概念。</span>
                <span>将表示编码字符类型的概念 ID 放在此处。目前唯一的选项是 UTF-8 （32678）。它以任何其他类型（如 ASCII）编码，然后输入 0。</span>
                <span>integer</span>
              </li>
              <li>
                <span>language_concept_id</span>
                <span>注释的语言。</span>
                <span>使用作为概念后代的概念4182347（世界语言）。</span>
                <span>integer</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>编写注释的提供程序。	</span>
                <span>ETL 可能需要确定将哪个提供程序放在这里。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>写照会的访问。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_id</span>
                <span>写票据的访问详情。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>note_source_value</span>
                <span></span>
                <span>映射到NOTE_CLASS_CONCEPT_ID的源值。</span>
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
