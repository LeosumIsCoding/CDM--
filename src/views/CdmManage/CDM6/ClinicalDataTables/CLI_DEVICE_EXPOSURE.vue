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
                <span>device_exposure_id</span>
                <span>用于记录一个人暴露于异物或仪器的唯一密钥。</span>
                <span>对源数据中存在的异物或设备暴露的每个实例都应分配此唯一键。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_id</span>
                <span></span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>device_concept_id</span>
                <span>建议将DEVICE_CONCEPT_ID字段用于分析中的主要用途，并且必须用于网络研究。这是从源概念 ID 映射的标准概念，它表示该人接触到的异物或仪器。</span>
                <span>DEVICE_SOURCE_VALUE映射到的CONCEPT_ID。</span>
                <span>integer</span>
              </li>
              <li>
                <span>device_exposure_start_date</span>
                <span>使用此日期可确定设备记录的开始日期。</span>
                <span>有效条目包括植入器械程序的开始日期、器械处方日期或器械管理日期。</span>
                <span>date</span>
              </li>
              <li>
                <span>device_exposure_start_datetime	</span>
                <span></span>
                <span>这不是必需的，尽管它在 v6 中。如果源未指定日期时间，则约定将时间设置为午夜 （00：00：0000）</span>
                <span>datetime</span>
              </li>
              <li>
                <span>device_exposure_end_date</span>
                <span>DEVICE_EXPOSURE_END_DATE表示患者设备暴露结束的那一天（如果给予）。</span>
                <span>将结束日期或终止日期与源数据中显示的日期一样放置，或者如果不可用，则留空。</span>
                <span>date</span>
              </li>
              <li>
                <span>device_exposure_end_datetime</span>
                <span></span>
                <span>如果源未指定日期时间，则约定将时间设置为午夜 （00：00：0000）</span>
                <span>datetime</span>
              </li>
              <li>
                <span>device_type_concept_id</span>
                <span>您可以使用TYPE_CONCEPT_ID来表示记录的出处，例如记录是来自管理性索赔还是 EHR。公认的概念。</span>
                <span>选择最能代表记录出处的drug_type_concept_id，例如，它是来自处方记录还是医生给药的记录。</span>
                <span>integer</span>
              </li>
              <li>
                <span>unique_device_id</span>
                <span>这是FDA监管设备的唯一设备标识号（如果提供）。</span>
                <span>对于受 FDA 监管的医疗器械，如果数据源中提供唯一设备标识 （UDI），则会在UNIQUE_DEVICE_ID字段中记录。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>quantity</span>
                <span></span>
                <span></span>
                <span>integer</span>
              </li>
              <li>
                <span>provider_id</span>
                <span>与设备记录关联的提供商，例如编写处方的提供商或植入设备的提供商。</span>
                <span>ETL 可能需要选择将哪个PROVIDER_ID放在这里。根据可用的内容，这可能与与整个VISIT_OCCURRENCE记录关联的提供程序不同，也可能不同。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_occurrence_id</span>
                <span>开具或给予设备的访问。</span>
                <span>要填充此现场设备暴露，必须在访问中明确启动。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>visit_detail_id</span>
                <span>开具或给予设备的访问详细信息。</span>
                <span>要填充此字段，必须在访问详细信息记录中显式启动设备暴露。</span>
                <span>bigint</span>
              </li>
              <li>
                <span>device_source_value</span>
                <span>此字段包含表示所发生设备暴露的源数据的逐字记录值。例如，这可以是 NDC 或吉姆脚本代码。</span>
                <span>此代码映射到标准化词汇表中的标准设备概念，原始代码存储在此处以供参考。</span>
                <span>varchar(50)	</span>
              </li>
              <li>
                <span>device_source_concept_id</span>
                <span>这是表示设备源值的概念，可能不一定是标准的。不建议在分析中使用此字段，因为它不需要包含在整个 OHDSI 社区中使用的标准概念，并且仅当标准概念不能充分表示给定分析用例所需的设备源详细信息时才应使用此字段。请考虑改用DEVICE_CONCEPT_ID来实现在整个网络中保持一致的标准化分析。</span>
                <span>如果使用 OMOP 支持的词汇表在源数据中对DEVICE_SOURCE_VALUE进行编码，请将表示源值的概念 ID 放在这里。如果不可用，请设置为 0。</span>
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
