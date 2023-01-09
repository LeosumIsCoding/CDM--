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
                <span>person_id</span>
                <span
                  >假设每个具有不同唯一标识符的人实际上是不同的人，应该独立对待。</span
                >
                <span
                  >任何需要发生以唯一标识人员的人员链接都应在编写此表之前完成。如果此标识符是整数，则可以是提供的源数据中的原始
                  ID，否则它可以是自动生成的数字。</span
                >
                <span>bigint</span>
              </li>
              <li>
                <span>gender_concept_id</span>
                <span
                  >此字段旨在捕获人出生时的生物性别。该领域不应用于研究性别认同问题。</span
                >
                <span
                  >在假设数据中存在的性别或性别值是出生时的生物性别的情况下使用数据中存在的性别或性别值。如果源数据捕获性别认同，则应将其存储在观察表中。公认的性别观念</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>year_of_birth</span>
                <span>使用year_of_birth计算年龄。</span>
                <span
                  >在假设数据中存在的性别或性别值是出生时的生物性别的情况下使用数据中存在的性别或性别值。如果源数据捕获性别认同，则应将其存储在观察表中。公认的性别观念</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>month_of_birth</span>
                <span></span>
                <span>
                  对于提供确切出生日期的数据源，应提取月份并将其存储在此字段中。</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>day_of_birth</span>
                <span></span>
                <span
                  >对于提供确切出生日期的数据源，应提取该日期并将其存储在此字段中。</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>birth_datetime</span>
                <span></span>
                <span
                  >此字段不是必需的，但强烈建议您这样做。对于提供确切出生日期的数据源，该值应存储在此字段中。如果源中未提供birth_datetime，请使用以下逻辑推断日期：如果day_of_birth为
                  null，month_of_birth不为
                  null，则使用该年当月的第一天。如果month_of_birth为空，或者day_of_birth和month_of_birth均为空，并且该人在其出生年份有记录，则使用最早记录的日期，否则使用该年的6月15日。如果未给出出生时间，请使用午夜（00：00：0000）。
                  日</span
                >
                <span>datetime</span>
              </li>
              <li>
                <span>death_datetime</span>
                <span
                  >此字段是要在分析中使用的死亡日期，由 ETL
                  逻辑确定。有关某人死亡的任何其他信息都存储在观察表中，concept_id
                  4306655或CONDITION_OCCURRENCE。</span
                >
                <span
                  >如果一个人有多个死亡日期，请选择被认为最可靠的日期。这可能是从该人被列为死者的医院出院，也可能是提供的最晚死亡日期。如果患者在来源中给出的死亡日期后60天以上有临床活动，则删除死亡记录是一个可行的选择，因为它可能被错误地报告。同样，如果死亡记录来自信誉良好的来源（例如政府提供的信息），则在死后60天内删除数据中发生的事件记录也是一个可行的选择>。</span
                >
                <span>datetime</span>
              </li>
              <li>
                <span>race_concept_id</span>
                <span>此字段捕获该人的种族或民族背景。</span>
                <span
                  >仅当您有有关种族或民族背景的信息时，才使用此字段。词汇包含有关等级系统中主要种族和民族背景的概念。由于人类种族和民族背景的不精确性，这不是一个完美的系统。不支持混合种族。如果无法确定明确的种族或民族背景，请使用Concept_Id
                  0。接受的比赛概念。</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>ethnicity_concept_id</span>
                <span
                  >此字段捕获美国政府管理和预算办公室 （OMB）
                  定义的种族：它仅区分“西班牙裔”和“非西班牙裔”。种族和民族背景不存储在这里。</span
                >
                <span
                  >仅当您拥有美国数据和此信息的来源时，才使用此字段。不要试图从该人的种族或民族背景推断种族。公认的种族概念</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>location_id</span>
                <span
                  >位置是指该人的实际地址。此字段应捕获人员的最后已知位置。任何先前的位置都将捕获到LOCATION_HISTORY表中。</span
                >
                <span
                  >将“位置”表中的location_id放在此处，该表表示该人最精细的位置信息。例如，这可以表示邮政编码或其部分，州或县的任何内容。由于许多数据库都包含去识别化的数据，因此通常会降低位置的精度以防止重新识别。此字段应捕获最后一个已知位置。任何先前的位置都将捕获到LOCATION_HISTORY表中。</span
                >
                <span>bigint</span>
              </li>
              <li>
                <span>provider_id</span>
                <span
                  >提供者是指最后一个已知的初级保健提供者（全科医生）。</span
                >
                <span
                  >将provider_id从该人最后已知的全科医生的提供者表中移开。如果有多个提供程序，则由
                  ETL 决定将哪个提供程序放在这里。</span
                >
                <span>bigint</span>
              </li>
              <li>
                <span>care_site_id</span>
                <span>护理网站是指提供者通常提供初级保健的地方。</span>
                <span></span>
                <span>bigint</span>
              </li>
              <li>
                <span>person_source_value</span>
                <span
                  >使用此字段可链接回源数据中的人员。这通常用于 ETL
                  逻辑的错误检查。</span
                >
                <span
                  >某些用例需要能够链接回源数据中的人员。此字段允许存储出现在源中的人员值。此字段不是必需的，但强烈建议使用此字段。</span
                >
                <span>varchar(50)</span>
              </li>
              <li>
                <span>gender_source_value</span>
                <span
                  >此字段用于存储源数据中人员的生物性别。它不适用于标准分析，仅供参考。</span
                >
                <span>将人的生物性别放在源数据中。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>gender_source_concept_id</span>
                <span>由于选项数量较少，因此趋于零。</span>
                <span
                  >如果源数据以非标准词汇表编码生物性别，请将concept_id存储在此处，否则设置为
                  0。</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>race_source_value</span>
                <span>
                  此字段用于存储源数据中人员的种族。它不适用于标准分析，仅供参考。</span
                >
                <span>将该人的种族与源数据中显示的种族放在一起。</span>
                <span>varchar(50)</span>
              </li>
              <li>
                <span>race_source_concept_id</span>
                <span>由于选项数量较少，因此趋于零。</span>
                <span
                  >如果源数据代码在 OMOP
                  支持的词汇表中争用，则存储此处concept_id，否则设置为 0。</span
                >
                <span>integer</span>
              </li>
              <li>
                <span>ethnicity_source_value</span>
                <span
                  >此字段用于存储源数据中人员的种族。它不适用于标准分析，仅供参考。</span
                >
                <span
                  >如果此人的种族不是OMB标准的“西班牙裔”或“非西班牙裔”，则在此处存储源数据中的该值。</span
                >
                <span>varchar(50)</span>
              </li>
              <li>
                <span>ethnicity_source_concept_id</span>
                <span>由于选项数量较少，因此趋于零。</span>
                <span
                  >如果源数据在 OMOP
                  支持的词汇表中编码种族，请将concept_id存储在此处，否则设置为
                  0。</span
                >
                <span>integer</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据处理" name="dispose">
          <el-button type="primary" @click="handleAdd">添加</el-button>

          <el-dialog v-model="state.dialogFormVisible" title="添加数据">
            <el-form :model="state.form">
              <el-form-item label="person_id" :label-width="formLabelWidth">
                <el-input v-model="state.form.person_id" autocomplete="off" />
              </el-form-item>
              <el-form-item label="person_id" :label-width="formLabelWidth">
                <el-input v-model="state.form.person_id" autocomplete="off" />
              </el-form-item>
              <el-form-item label="person_id" :label-width="formLabelWidth">
                <el-input v-model="state.form.person_id" autocomplete="off" />
              </el-form-item>
              <el-form-item label="person_id" :label-width="formLabelWidth">
                <el-input v-model="state.form.person_id" autocomplete="off" />
              </el-form-item>
              <el-form-item label="person_id" :label-width="formLabelWidth">
                <el-input v-model="state.form.person_id" autocomplete="off" />
              </el-form-item>
              <el-form-item label="person_id" :label-width="formLabelWidth">
                <el-input v-model="state.form.person_id" autocomplete="off" />
              </el-form-item>
              <el-form-item label="person_id" :label-width="formLabelWidth">
                <el-input v-model="state.form.person_id" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="state.dialogFormVisible = false"
                  >取消</el-button
                >
                <el-button type="primary" @click="dialogFormVisible = false"
                  >确认</el-button
                >
              </span>
            </template>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import CDMListMain from "@/components/CDMListMain.vue";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";

import { ref } from "vue";

const tabPosition = ref("left");

const state = reactive({
  query: "",
  editableTabsValue: "structure",
  dialogFormVisible: false,
  form: {
    person_id: "",
    gender_concept_id: "",
    year_of_birth: "",
    month_of_birth: "",
    day_of_birth: "",
    birth_datetime: "",
    death_datetime: "",
    race_concept_id: "",
    ethnicity_concept_id: "",
    location_id: "",
    provider_id: "",
    care_site_id: "",
    person_source_value: "",
    gender_source_value: "",
    gender_source_concept_id: "",
    race_source_value: "",
    race_source_concept_id: "",
    ethnicity_source_value: "",
    ethnicity_source_concept_id: "",
  },
});
const route = useRoute();

// 添加数据
const handleAdd = () => {
  state.dialogFormVisible = !state.dialogFormVisible;
};

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
