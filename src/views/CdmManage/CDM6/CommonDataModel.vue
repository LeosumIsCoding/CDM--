<template>
  <div class="container">
    <el-container class="layout-container-demo" style="height: 710px">
      <el-aside width="200px">
        <el-scrollbar class="scrollbar">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-menu-item index="0" @click="handleRouteInfoPage">
              <el-icon><Location /></el-icon>
              <span>Changes in v6.0</span>
            </el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                <el-icon><PriceTag /></el-icon>
                <span>Clinical Data Tables</span>
              </template>
              <el-menu-item-group title="临床数据表">
                <el-menu-item
                  index="1-1"
                  @click="
                    handleClick({
                      name: 'CLI_PERSON',
                      title: 'PERSON',
                      TableDescription:
                        '此表用作数据库中所有人员的中央身份管理。它包含唯一标识每个人或患者的记录，以及一些人口统计信息。',
                      UserGuide: '此表中的所有记录都是独立的人。',
                      ETLConventions:
                        '数据库中的所有人员都需要此表中的一条记录，除非他们不符合 ETL 中指定的数据质量要求。尽管如此，没有事件的人应该有记录。如果多个数据源将事件贡献给数据库，则必须在可能的情况下跨源协调人员，以便为每个人员创建一条记录。BIRTH_DATETIME 必须等同于 BIRTH_DAY、BIRTH_MONTH 和 BIRTH_YEAR 的内容。如果 BIRTH_DATETIME 在源中不可用，则下表列出了一条有用的规则，用于推导 BIRTH_DATETIME。CDM v6.0 的新功能此人的死亡日期现在存储在此表中，而不是单独的 DEATH 表中。如果源数据中给出了多个死亡日期，ETL 应该选择将哪个死亡日期放入 PERSON 表中。任何其他日期都可以使用代表“死亡日期”的概念4265167存储在 OBSERVATION 表中。同样，死因存储在 CONDITION_OCCURRENCE 表中，使用 CONDITION_STATUS_CONCEPT_ID 32891表示“死因”。',
                    })
                  "
                  >PERSON</el-menu-item
                >
                <el-menu-item
                  index="1-2"
                  @click="
                    handleClick({
                      name: 'CLI_OBSERVATION_PERIOD',
                      title: 'OBSERVATION_PERIOD',
                      TableDescription:
                        '该表包含的记录定义了两个条件预计保持的时间跨度：(i) 发生在人员身上的临床事件记录在事件表中，以及 (ii) 没有记录表明在此期间没有发生此类事件时间跨度。',
                      UserGuide:
                        '对于每个 Person，可能存在一个或多个 OBSERVATION_PERIOD 记录，但它们不会重叠或彼此背靠背。事件可能存在于患者的 OBSERVATION_PERIOD 记录的所有时间跨度之外，但是，在这些时间跨度之外没有事件不能解释为没有事件的证据。发病率或流行率应该只计算活跃的 OBSERVATION_PERIOD 记录的时间。在构建群组时，外部事件可用于定义纳入标准，但不保证这些标准的性能。此外，OBSERVATION_PERIOD 记录可以短至一天，这极大地扰乱了作为群组特征的一部分的任何比率计算的分母。为避免这种情况，应将最短观察时间作为任何群组定义的要求。',
                      ETLConventions:
                        '每个人都需要至少有一个 OBSERVATION_PERIOD 记录，它应该代表具有高临床事件捕获率的时间间隔。一些源数据具有非常相似的概念，例如保险索赔数据中的登记期。在其他源数据（例如大多数 EHR 系统）中，这些时间跨度需要在一组假设下进行推断。定义这些假设是 ETL 开发人员的自由裁量权。在许多 ETL 解决方案中，临床事件（条件、药物、程序、设备、测量、就诊）的第一次发生或第一次高质量发生的开始日期被定义为 OBSERVATION_PERIOD 记录的开始日期和结束日期临床事件的最后一次高质量发生，或者数据库周期的结束成为每个人的 OBSERVATOIN_PERIOD 的结束。如果一个人只有一个临床事件，则 OBSERVATION_PERIOD 记录可以短至一天。根据这些定义，临床事件可能会超出 OBSERVATION_PERIOD 记录定义的时间跨度。家族史或临床事件史通常不用于在它们所指的时间生成 OBSERVATION_PERIOD 记录。任何两个重叠或相邻的 OBSERVATION_PERIOD 记录都必须合并为一个。',
                    })
                  "
                  >OBSERVATION_PERIOD</el-menu-item
                >
                <el-menu-item
                  index="1-3"
                  @click="
                    handleClick({
                      name: 'CLI_VISIT_OCCURRENCE',
                      title: 'VISIT_OCCURRENCE',
                      TableDescription:
                        '此表包含人员在一段时间内与医疗保健系统互动的事件。它们通常也被称为“邂逅”。访问由它们发生的情况配置来定义，例如（i）患者是否来到医疗机构，反之亦然，或者互动是远程的，（ii）是否以及什么样的训练有素的医务人员在访问期间提供服务，以及（iii）访问是短暂的还是涉及卧床的较长时间。',
                      UserGuide: `
                        定义访问的配置由访问域中的概念描述，它形成一个分层结构，但汇总到全球大多数医疗保健系统采用的一般熟悉的访问：
住院访问：在医院，护理点，床上，持续超过一天的人，医生和其他提供者可以全天候提供服务
急诊室访问：在一天内在护理现场访问专门的医疗机构以治疗紧急情况的人员，医生和提供者可以全天候提供服务
急诊室和住院部就诊：患者访问急诊室，然后进行后续的住院就诊，其中急诊科是医院的一部分，从急诊室到其他医院科的过渡是不确定的
非医院机构访问：由于健康状况不佳而长期或永久访问专门机构的人，没有医生，但可能还有其他提供者可以全天候提供服务
门诊就诊：在护理地点，一天内在没有床位的情况下访问专门的门诊医疗机构，医生或医疗服务提供者在访问期间提供服务
家访：提供者访问人员，没有护理站点，在一天内提供服务
远程医疗访问：患者通过通信媒体与提供者互动
药房访问：在一天内在护理现场访问药房分发药物的人
实验室访问：患者在一天内访问护理现场的专用机构，以进行测量。
救护车访问：使用运输服务的人，目的是在一天内在没有护理站点的情况下启动其他访问之一，可能与陪同访问和提供服务的提供者一起
病例管理访问：出于管理目的，在没有护理站点的情况下，在没有提供者参与的一天内与医疗保健系统进行交互的人员
访问持续时间或“停留时间”被定义为VISIT_END_DATE - VISIT_START_DATE。对于所有访问，这是<1天，除了住院访问和非医院机构访问。CDM还包含VISIT_DETAIL表，其中存储了有关访问的其他信息，例如，住院访问期间在单位之间的转移。`,
                      ETLConventions:
                        '如果源数据包含服务地点或程序的编码系统，例如用于油井访问的CPT代码，则可以轻松获得访问。在这些情况下，可以查找代码并将其映射到标准访问概念。否则，必须在 ETL 过程中识别访问概念。此表将包含“访问”域中的概念。这些概念以分层结构排列，通过汇总到全球大多数医疗保健系统中采用的一般熟悉的访问来促进队列定义。访问可以彼此相邻，即一个访问的结束日期可以与另一个访问的开始日期相同。因此，可以记录同一天的访问量或其后代。多日访问不得重叠，即共享开始和结束日期以外的日期。通常情况下，应该为如何定义访问以及如何分配Visit_Concept_Id编写一些逻辑。例如，在美国，看似在住院就诊期间发生的门诊就诊可以合并为具有相同Visit_Occurrence_Id的门诊就诊。在EHR数据中，彼此相距一天之内的住院就诊可以串在一起以创建一次就诊。这完全取决于源数据以及如何将遭遇记录转换为访问事件。提供者可以通过 PROVIDER_ID“访问”字段与“访问”相关联，也可以通过链接到 VISIT 和 PROVIDER 表的PROCEDURE_OCCURRENCE记录间接关联。',
                    })
                  "
                  >VISIT_OCCURRENCE</el-menu-item
                >
                <el-menu-item
                  index="1-4"
                  @click="
                    handleClick({
                      name: 'CLI_VISIT_DETAIL',
                      title: 'VISIT_DETAIL',
                      TableDescription:
                        'VISIT_DETAIL表是一个可选表，用于表示父VISIT_OCCURRENCE表中每条记录的详细信息。一个很好的例子是住院期间医院单位之间的移动或与一项保险索赔相关的索赔线。对于VISIT_OCCURRENCE表中的每条记录，VISIT_DETAIL表中可能有 0 条或多条具有 1：n 关系的记录，其中 n 可能为 0。VISIT_DETAIL表在结构上与VISIT_OCCURRENCE表非常相似，属于访问域。',
                      UserGuide: `
                      定义访问详细信息的配置由访问域中的概念描述，它形成一个分层结构。“访问详细信息”记录将通过两种方式与“访问发生次数”记录相关联：
1. “访问详细信息”记录将具有与 2 关联的VISIT_OCCURRENCE_ID。VISIT_DETAIL_CONCEPT_ID将成为访问VISIT_CONCEPT_ID的后代。
                       `,
                      ETLConventions:
                        '填写VISIT_DETAIL表不是强制性的，但是如果您发现创建VISIT_OCCURRENCE记录的逻辑包括汇总多个较小的记录以创建一张访问图片，那么最好使用VISIT_DETAIL。例如，在EHR数据中，一个人可能在医院里，但不是一次总体访问，而是记录他们与医疗保健提供者互动的时间。医院中的一个人每天与多个提供者进行多次互动，因此必须使用一些启发式（由ETL定义）将相遇串联在一起，以识别整个访问。在这种情况下，相遇将被视为访问详细信息，整个访问将被视为访问事件。在此示例中，还可以使用词汇表将“访问详细信息”与“访问事件”区分开来，方法是将VISIT_CONCEPT_ID设置为 9201，并将VISIT_DETAIL_CONCEPT_IDs设置为 9201 或其子项，以指示患者在护理时在医院的位置。',
                    })
                  "
                  >VISIT_DETAIL</el-menu-item
                >
                <el-menu-item
                  index="1-5"
                  @click="
                    handleClick({
                      name: 'CLI_CONDITION_OCCURRENCE',
                      title: 'CONDITION_OCCURRENCE',
                      TableDescription:
                        '此表包含表明存在诊断、体征或症状的疾病或医疗状况的人员事件记录，该事件由提供者观察到或由患者报告。',
                      UserGuide: `条件由“条件”域中的概念定义，这些概念形成一个复杂的层次结构。因此，患有相同疾病的同一个人可能有多个病症记录，这些记录属于同一个等级家庭。大多数病症记录都是根据诊断代码映射的，但记录的体征、症状和摘要描述也有助于此表。排除诊断不应记录在此表中，但实际上其否定性质并不总是在源数据中捕获，并且在确定应患有记录疾病的人时必须采取其他预防措施。记录源数据中存在的所有条件。有关诊断/表型定义的任何决定都将通过队列规范来完成。这些同期群可以放在同期群表中。条件从开始到结束跨越一个时间间隔，但通常记录为没有结束日期的单个快照记录。原因有两个：（i）在记录时，持续时间未知，后来也没有记录，以及（ii）当人们感觉好转时，他们通常会停止与医疗保健系统的互动，这导致对已解决的病症的不完整捕获。CONDITION_ERA表可解决此问题。家族史和既往诊断（“病史”）未记录在此表中。相反，它们列在观察表中。在建立诊断过程中编写的代码，例如“问题”和“排除”，不应在此处表示。相反，如果它们用于分析，则应将它们记录在观察表中。但是，此信息并非始终可用。`,
                      ETLConventions:
                        '映射到条件域的标准概念的源代码和源文本字段必须记录在此处。',
                    })
                  "
                  >CONDITION_OCCURRENCE</el-menu-item
                >
                <el-menu-item
                  index="1-6"
                  @click="
                    handleClick({
                      name: 'CLI_DRUG_EXPOSURE',
                      title: 'DRUG_EXPOSURE',
                      TableDescription:
                        '此表捕获有关摄入或以其他方式引入体内的药物暴露的记录。药物是一种生化物质，其配制方式使当施用于人时，它将对新陈代谢产生一定的生化作用。药物包括处方药和非处方药、疫苗和大分子生物疗法。在当地摄入或应用的放射性设备不算作药物。',
                      UserGuide: `此表中记录的目的是尽可能表明接触某种药物的可能性最大。在这种情况下，药物被定义为活性成分。药物暴露由药物领域的概念定义，形成一个复杂的层次结构。因此，如果一个DRUG_SOURCE_CONCEPT_ID是组合产品，则可能会映射到多个标准概念 ID。此表中的记录表示处方、处方和提供者管理的药物，仅举几例。DRUG_TYPE_CONCEPT_ID可用于查找和筛选这些类型。该表包括有关药物产品，给定数量和给药途径的其他信息。`,
                      ETLConventions:
                        '有关数量和剂量的信息以各种不同的方式提供，对于ETL来说，从数据中提供尽可能多的信息非常重要。根据数据字段的来源，可以以不同的方式捕获，即给药药物的数量可能与处方的数量具有单独的含义。如果患者在同一天有多个关于同一药物或程序的记录，ETL不应重复数据，除非有可能的理由相信该项目是真实的数据重复。记下如何处理处方的笔芯。',
                    })
                  "
                  >DRUG_EXPOSURE</el-menu-item
                >
                <el-menu-item
                  index="1-7"
                  @click="
                    handleClick({
                      name: 'CLI_PROCEDURE_OCCURRENCE',
                      title: 'PROCEDURE_OCCURRENCE',
                      TableDescription:
                        '此表包含由医疗保健提供者为诊断或治疗目的对患者进行排序或执行的活动或过程的记录。',
                      UserGuide: `实验室测试不是一个程序，如果观察到一些预期的结果量和单位，那么它应该是一个测量。放血术是一种手术，但如此微不足道，以至于它往往很少被捕获。可以假设存在与许多实验室测试相关的放血手术，因此没有必要将它们添加为单独的程序。如果用户在并发天数内发现相同的过程，则假定这些记录是持续时间超过一天的过程的一部分。这一逻辑取代了procedure_end_date，后者将添加到清洁发展机制的未来版本中。`,
                      ETLConventions:
                        '如果一个程序持续超过一天，那么它应该作为程序发生的每一天的单独记录记录，这个逻辑代替了PROCEDURE_END_DATE，后者将添加到CDM的未来版本中。在处理重复记录时，ETL 必须确定是将它们汇总为一条记录还是将它们分开。要考虑的事项是： - 相同的过程 - 相同的PROCEDURE_DATETIME - 相同的访问发生或访问详细信息 - 相同的提供程序 - 相同的程序修饰符。映射到过程域的标准概念的源代码和源文本字段必须记录在此处。',
                    })
                  "
                  >PROCEDURE_OCCURRENCE</el-menu-item
                >
                <el-menu-item
                  index="1-8"
                  @click="
                    handleClick({
                      name: 'CLI_DEVICE_EXPOSURE',
                      title: 'DEVICE_EXPOSURE',
                      TableDescription:
                        '设备域捕获有关一个人暴露于外来物理物体或仪器的信息，该物体或仪器通过化学作用以外的机制用于诊断或治疗目的。设备包括植入式物体（例如起搏器、支架、人工关节）、医疗设备和用品（例如绷带、拐杖、注射器）、医疗程序中使用的其他器械（例如缝合线、除颤器）和临床护理中使用的材料（例如粘合剂、身体材料、牙科材料、手术材料）。',
                      UserGuide: `设备或电源与程序之间的区别有时很模糊，但前者是物理对象，而后者是操作，通常用于应用设备或电源。`,
                      ETLConventions:
                        '映射到设备域的标准概念的源代码和源文本字段必须记录在此处。',
                    })
                  "
                  >DEVICE_EXPOSURE</el-menu-item
                >
                <el-menu-item
                  index="1-9"
                  @click="
                    handleClick({
                      name: 'CLI_MEASUREMENT',
                      title: 'MEASUREMENT',
                      TableDescription:
                        '测量表包含测量记录，即通过对个人或个人的样本进行系统和标准化的检查或测试获得的结构化值（数字或分类）。测量表包含实验室测试，生命体征，病理报告中的定量结果等测量的顺序和结果。测量值存储为属性值对，属性为测量概念，值表示结果。该值可以是概念（存储在VALUE_AS_CONCEPT中），也可以是带有单位（UNIT_CONCEPT_ID）的数值（VALUE_AS_NUMBER）。获取样本的过程位于PROCEDURE_OCCURRENCE表中，但如果源数据中不存在PROCEDURE_OCCURRENCE记录，则无需为每个测量创建PROCEDURE_OCCURRENCE记录。测量与观察的不同之处在于，它们需要标准化测试或一些其他活动来生成定量或定性结果。如果没有结果，则假定进行了实验室测试，但未捕获结果。',
                      UserGuide: `测量主要是实验室测试，只有少数例外，如血压或功能测试。结果以值和单位组合的形式给出。在调查测量时，请查找operator_concept_ids（<、>等）。`,
                      ETLConventions:
                        '此表中仅应包含源值映射到测量域中的概念的记录。尽管每个测量值始终都有一个结果，但VALUE_AS_NUMBER字段和VALUE_AS_CONCEPT_ID字段不是强制性的，因为结果通常不会在源数据中给出。当结果未知时，测量记录仅表示执行了相应测量的事实，这本身已经是某些用例的有用信息。对于某些测量概念，结果包含在测试中。例如，ICD10 CONCEPT_ID 45548980“未指定的血清酶水平异常”表示测量结果（异常）。在这些情况下，除了“映射到”记录之外，CONCEPT_RELATIONSHIP表还包含第二条记录，其relationship_id设置为“映射到值”。在此示例中，“映射到”关系指向4046263“酶测量”以及“映射到值”记录以4135493“异常”。',
                    })
                  "
                  >MEASUREMENT</el-menu-item
                >
                <el-menu-item
                  index="1-10"
                  @click="
                    handleClick({
                      name: 'CLI_OBSERVATION',
                      title: 'OBSERVATION',
                      TableDescription:
                        '观察表捕获在检查，询问或程序中获得的有关人的临床事实。任何其他领域无法表示的任何数据，例如社会和生活方式事实，病史，家族史等，都记录在这里。清洁发展机制 6.0 版的新增功能现在，可以使用OBSERVATION_EVENT_ID字段将观测值链接到 CDM 实例中的其他记录，并OBS_EVENT_FIELD_CONCEPT_ID。要将另一条记录链接到观测值，主键将进入OBSERVATION_EVENT_ID（CONDITION_OCCURRENCE_ID、DRUG_EXPOSURE_ID等），概念表示OBS_EVENT_FIELD_CONCEPT_ID中从 go 中获取OBSERVATION_EVENT_ID的字段。例如，哮喘CONDITION_OCCURRENCE可能与哮喘家族史的观察有关。在这种情况下，哮喘记录的CONDITION_OCCURRENCE_ID将进入家族历史记录的OBSERVATION_EVENT_ID，CONCEPT_ID 1147127将以OBS_EVENT_FIELD_CONCEPT_ID表示OBSERVATION_EVENT_ID代表CONDITION_OCCURRENCE_ID。',
                      UserGuide: `观察结果与测量的不同之处在于，它们不需要标准化测试或其他一些活动来生成临床事实。典型的观察是病史，家族史，对某些治疗的需求，社会环境，生活方式选择，医疗保健使用模式等。如果生成的临床事实需要标准化测试，例如实验室测试或成像并导致标准化结果，则数据项将记录在MEASIE表中。如果观察到的临床事实确定了疾病或其他医疗状况的体征，症状，诊断，则将其记录在CONDITION_OCCURRENCE表中。有效的观察概念不强制来自任何域，尽管它们仍应为标准概念。`,
                      ETLConventions:
                        '其源值映射到除“状况”、“程序”、“药物”、“测量”或“设备”以外的任何域的记录应存储在“观察表”中。观察结果可以存储为属性值对，属性作为观察概念，值表示临床事实。这个事实可以是概念（存储在VALUE_AS_CONCEPT中），数值（VALUE_AS_NUMBER），逐字字符串（VALUE_AS_STRING）或日期时间（VALUE_AS_DATETIME）。尽管观察结果没有明确的结果，但临床事实可以与VALUE_AS_*字段中的观察类型分开陈述。建议对作为肯定断言的暗示性陈述的观测值进行记录，即使 null 值是等效的，也应记录值为“是”（concept_id=4188539）。',
                    })
                  "
                  >OBSERVATION</el-menu-item
                >
                <el-menu-item
                  index="1-11"
                  @click="
                    handleClick({
                      name: 'CLI_NOTE',
                      title: 'NOTE',
                      TableDescription:
                        'NOTE 表捕获提供者在给定日期以自由文本（ASCII 或最好是 UTF8 格式）注释记录的有关患者的非结构化信息。note_text类型为氯波或变色（MAX），具体取决于 RDBMS。',
                      UserGuide: ``,
                      ETLConventions: `HL7/LOINC CDO 是文档命名一致的标准，用于支持一系列用例：检索、组织、显示和交换。它指导创建用于临床笔记的LOINC代码。CDO 使用 5 个维度对每个文档进行注释：
文件类型：在宏观层面上表征文档的一般结构（例如麻醉同意书）
服务类型：描述服务或活动类型（例如评估、咨询和摘要）。时间序列的概念，例如，在开始（入场）在结束（放电）被归入该轴中。示例：出院教学。
设置：设置是CMS定义的扩展（例如住院，门诊）
主题域 （SMD）：表征注释的主题域（例如麻醉学）
角色：描述文档作者的培训或专业水平，但不细分为专业或亚专业（例如医师）这5个维度的每个组合汇总为唯一的LOINC代码。
根据CDO的要求，5个维度中只需要2个维度就可以正确注释文档;文档类型和其他 4 个维度中的任何一个。但是，并非所有 CDO 维度的排列都必然会产生现有的 LOINC 代码。这些维度中的每一个都包含在 OMOP 词汇表中的“测量值”域下，每个维度都表示为一个概念类。`,
                    })
                  "
                  >NOTE</el-menu-item
                >
                <el-menu-item
                  index="1-12"
                  @click="
                    handleClick({
                      name: 'CLI_NOTE_NLP',
                      title: 'NOTE_NLP',
                      TableDescription:
                        'NOTE_NLP表对临床笔记上NLP的所有输出进行编码。每行表示从注释中提取的单个术语。',
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >NOTE_NLP</el-menu-item
                >
                <el-menu-item
                  index="1-13"
                  @click="
                    handleClick({
                      name: 'CLI_SPECIMEN',
                      title: 'SPECIMEN',
                      TableDescription:
                        '标本域包含识别来自人的生物样本的记录。',
                      UserGuide: ``,
                      ETLConventions: `解剖网站以尽可能具体的粒度级别进行编码，因此可以使用标准化词汇表派生更高级别的分类。`,
                    })
                  "
                  >SPECIMEN</el-menu-item
                >
                <el-menu-item
                  index="1-14"
                  @click="
                    handleClick({
                      name: 'CLI_FACT_RELATIONSHIP',
                      title: 'FACT_RELATIONSHIP',
                      TableDescription:
                        'FACT_RELATIONSHIP表包含有关作为记录存储在清洁发展机制任何表中的事实之间关系的记录。可以在同一域或不同域中的事实之间定义关系。事实关系的例子包括：人际关系（亲子关系），护理地点关系（卫生系统内设施的分层组织结构），适应症关系（药物暴露和相关条件之间），使用关系（在相关程序过程中的设备），或彼此衍生的事实（从相关标本得出的测量值）。',
                      UserGuide: ``,
                      ETLConventions: `所有关系都是方向性的，并且每个关系在FACT_RELATIONSHIP表中对称表示两次。例如，如果 person_id = 1 是 person_id = 2 的母FACT_RELATIONSHIP表中有两条记录（所有字符串实际上都concept_id概念表中的记录：- Person， 1， Person， 2， 父项 - Person， 2， 2， Person， 1， 子项`,
                    })
                  "
                  >FACT_RELATIONSHIP</el-menu-item
                >
                <el-menu-item
                  index="1-15"
                  @click="
                    handleClick({
                      name: 'CLI_SURVEY_CONDUCT',
                      title: 'SURVEY_CONDUCT',
                      TableDescription:
                        'SURVEY_CONDUCT表用于存储已完成调查或调查表的实例。',
                      UserGuide: `此表捕获了单个调查表的详细信息，例如谁完成了调查问卷，何时完成以及与哪些患者治疗或访问相关（如果有）。`,
                      ETLConventions: `每个调查都有一个SURVEY_CONCEPT_ID，概念表中的一个概念标识了问卷，例如EQ5D，VR12，SF12。每个调查表都应存在于概念表中。每个调查都可以选择与特定的访问相关联，以便将其链接到完成该访问期间以及根据患者的反应分配治疗的任何后续访问。`,
                    })
                  "
                  >SURVEY_CONDUCT</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Cpu /></el-icon>
                <span>Health System Data Tables</span>
              </template>
              <el-menu-item-group title="卫生系统数据表">
                <el-menu-item
                  index="2-1"
                  @click="
                    handleClick({
                      name: 'SYS_LOCATION',
                      title: 'LOCATION',
                      TableDescription:
                        'LOCATION 表表示捕获人员和护理站点的物理位置或地址信息的通用方法。清洁发展机制 6.0 版的新增功能LOCATION 表现在包括纬度和经度。',
                      UserGuide: ``,
                      ETLConventions: `每个地址或位置都是唯一的，在表中仅存在一次。位置不包含名称，例如医院的名称。为了构建可在邮政服务中使用的完整地址，需要将“位置”中的地址信息与“护理站点”中的信息相结合。对于标准化的地理空间可视化和分析，地址至少需要地理编码为纬度和经度。`,
                    })
                  "
                  >LOCATION</el-menu-item
                >
                <el-menu-item
                  index="2-2"
                  @click="
                    handleClick({
                      name: 'SYS_LOCATION_HISTORY',
                      title: 'LOCATION_HISTORY',
                      TableDescription:
                        '“位置历史记录”表存储人员或护理站点与地理位置之间的关系。此表是 CDM v6.0 的新增功能',
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >LOCATION_HISTORY</el-menu-item
                >
                <el-menu-item
                  index="2-3"
                  @click="
                    handleClick({
                      name: 'SYS_CARE_SITE',
                      title: 'CARE_SITE',
                      TableDescription:
                        'CARE_SITE表包含唯一标识的机构（物理或组织）单位（办公室、病房、医院、诊所等）的列表。',
                      UserGuide: ``,
                      ETLConventions: `护理部位是location_id和place_of_service_source_value的独特组合。护理网站不考虑提供者（人类）信息这样的专业。许多源数据没有区分个人和机构提供者。CARE_SITE表包含机构提供商。如果来源（而不是唯一标识单个护理站点）仅提供有限的信息（如服务地点），则通用或“池化”护理站点记录将列在CARE_SITE表中。护理站点之间可能存在层次结构和业务关系。例如，病房可以属于诊所或部门，而诊所或部门又可以属于医院，而医院系统又可以属于H FACT_RELATIONSHIP MO。`,
                    })
                  "
                  >CARE_SITE</el-menu-item
                >
                <el-menu-item
                  index="2-4"
                  @click="
                    handleClick({
                      name: 'SYS_PROVIDER',
                      title: 'PROVIDER',
                      TableDescription:
                        'PROVIDER 表包含唯一标识的医疗保健提供者的列表。这些是为患者提供实际医疗保健的个人，例如医生，护士，助产士，物理治疗师等。',
                      UserGuide: ``,
                      ETLConventions: `许多来源没有区分个人和机构提供者。提供程序表包含各个提供程序。如果源（而不是唯一标识单个提供程序）仅提供有限的信息（如专业、通用或“池化”提供程序记录）列在 PROVIDER 表中。`,
                    })
                  "
                  >PROVIDER</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><PartlyCloudy /></el-icon>
                <span>Health Economics Data Tables</span>
              </template>
              <el-menu-item-group title="卫生经济学数据表">
                <el-menu-item
                  index="3-1"
                  @click="
                    handleClick({
                      name: 'ECO_PAYER_PLAN_PERIOD',
                      title: 'PAYER_PLAN_PERIOD',
                      TableDescription: `PAYER_PLAN_PERIOD表捕获了某人在特定健康计划福利结构下从给定付款人连续注册的时间段的详细信息。每个接受医疗保健的人通常都由健康福利计划覆盖，该计划支付（全部或部分）或直接提供护理的费用。这些福利计划由付款人提供，例如健康保险或州或政府机构。在每个计划中，健康福利的细节是为个人或其家人定义的，健康福利计划可能会随着时间的推移而变化，通常随着利用率的增加（达到某些成本阈值，如免赔额），计划可用性和购买选择。付款人组织，健康福利计划以及它们对个人有效的时间段的独特组合记录在此表中。`,
                      UserGuide: `一个人可以有多个重叠的Payer_Plan_Periods。例如，美国的医疗和药物覆盖范围可以用两个Payer_Plan_Periods来表示。该计划的福利结构的细节鲜为人知，其想法只是为了确定计划的不同之处。`,
                      ETLConventions: ``,
                    })
                  "
                  >PAYER_PLAN_PERIOD</el-menu-item
                >
                <el-menu-item
                  index="3-2"
                  @click="
                    handleClick({
                      name: 'ECO_COST',
                      title: 'COST',
                      TableDescription: `COST表捕获包含OMOP临床事件表中记录的任何医疗事件的成本的记录，例如DRUG_EXPOSURE，PROCEDURE_OCCURRENCE，VISIT_OCCURRENCE，VISIT_DETAIL，DEVICE_OCCURRENCE，观察或测量。

成本表中的每条记录都考虑了为临床事件交易的金额。因此，COST表可用于表示应收账款（费用）和付款（已付款），每种交易类型由其COST_CONCEPT_ID表示。“COST_TYPE_CONCEPT_ID”字段将使用标准化词汇表中的概念来指定成本数据的源（出处）。对PAYER_PLAN_PERIOD表中健康计划信息的引用存储在记录中，用于裁决系统的信息，以确定人员对临床事件的益处。`,
                      UserGuide: `在处理汇总成本时，提供者提供的商品或服务的成本通常不直接知道，而是从医院费用乘以平均成本费用比得出的。`,
                      ETLConventions: `付款人为每个响应生成一个成本记录。在索赔数据库中，付款人为计费的商品或服务报告的付款和付款条件将生成一个成本记录。如果源数据包含多个付款人的付款信息（即一个实体的主要保险和次要保险付款），则会为每个报表付款人创建成本记录。因此，一个过程可能为每个付款人提供多个成本记录，但通常每个实体包含一条记录或不包含任何记录。付款人报销成本记录将使用PAYER_PLAN_ID字段进行标识。药物成本由成分成本（批发分销商或制造商收取的金额），配药费（药房收取的金额和销售税）组成。`,
                    })
                  "
                  >COST</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Box /></el-icon>
                <span>Standardized Derived Elements</span>
              </template>
              <el-menu-item-group title="标准化派生元素">
                <el-menu-item
                  index="4-1"
                  @click="
                    handleClick({
                      name: 'STA_DRUG_ERA',
                      title: 'DRUG_ERA',
                      TableDescription:
                        '药物时代被定义为假设该人暴露于特定活性成分的时间跨度。药物时代与药物暴露不同：暴露是与药物交付给该人时的来源相对应的单个记录，而连续的药物暴露期在某些规则下组合以产生连续的药物时代。',
                      UserGuide: ``,
                      ETLConventions: `可以在此处找到用于生成DRUG_ERA记录的 SQL 脚本。`,
                    })
                  "
                  >DRUG_ERA</el-menu-item
                >
                <el-menu-item
                  index="4-2"
                  @click="
                    handleClick({
                      name: 'STA_DOSE_ERA',
                      title: 'DOSE_ERA',
                      TableDescription:
                        '剂量时代被定义为假设该人暴露于恒定剂量的特定活性成分的时间跨度。',
                      UserGuide: ``,
                      ETLConventions: `剂量时代将使用标准化算法从DRUG_EXPOSURE表中的记录和DRUG_STRENGTH表中的剂量信息中导出。剂量形式信息不被考虑在内。因此，如果患者在不同配方之间切换，或者使用不同的配方的不同制造商，剂量时代仍然跨越暴露于成分的整个时间。`,
                    })
                  "
                  >DOSE_ERA</el-menu-item
                >
                <el-menu-item
                  index="4-3"
                  @click="
                    handleClick({
                      name: 'STA_CONDITION_ERA',
                      title: 'CONDITION_ERA',
                      TableDescription: `条件时代被定义为假定该人具有给定条件的时间跨度。与药物时代类似，疾病时代是疾病发生的时间顺序。将单个条件事件合并到单个条件时代有两个用途：

它允许汇总需要频繁持续护理的慢性病，而不是将每个病症发生视为一个独立的事件。
它允许针对同一病症聚合多次、按时就诊的医生，以避免重复计算病症的发生次数。例如，考虑一个人去看她的初级保健医生（PCP）并被转介给专科医生。稍后，该人会访问专科医生，该专科医生确认PCP的原始诊断并提供适当的治疗方法来解决该病症。这两次独立的医生就诊应该归纳为一个病症时代。`,
                      UserGuide: ``,
                      ETLConventions: `每个“条件”时代对应于一个或多个形成连续间隔的“条件发生”记录。“condition_concept_id”字段包含的概念与构成“条件时代”的CONDITION_OCCURRENCE表记录的概念相同。与药物时代相反，条件时代不聚合以包含不同分层的条件。可以在此处找到用于生成CONDITION_ERA记录的SQl脚本 条件时代开始日期是第一个条件发生的开始日期。“条件时代结束日期”是最后一次“条件”发生的结束日期。条件 Eras 的持久性窗口为 30 天，这意味着，如果在任何一次发生后的 30 天内没有发生相同的condition_concept_id，则将被视为condition_era_end_date。`,
                    })
                  "
                  >CONDITION_ERA</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><Briefcase /></el-icon>
                <span>Metadata Tables</span>
              </template>
              <el-menu-item-group title="元数据表">
                <el-menu-item
                  index="5-1"
                  @click="
                    handleClick({
                      name: 'MET_METADATA',
                      title: 'METADATA',
                      TableDescription: `元数据表包含有关已转换为 OMOP 通用数据模型的数据集的元数据信息。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >METADATA</el-menu-item
                >
                <el-menu-item
                  index="5-2"
                  @click="
                    handleClick({
                      name: 'MET_CDM_SOURCE',
                      title: 'CDM_SOURCE',
                      TableDescription: `CDM_SOURCE表包含有关源数据库以及用于将数据转换为 OMOP 通用数据模型的过程的详细信息。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >CDM_SOURCE</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="6">
              <template #title>
                <el-icon><Sunset /></el-icon>
                <span>Vocabulary Tables</span>
              </template>
              <el-menu-item-group title="词汇表">
                <el-menu-item
                  index="6-1"
                  @click="
                    handleClick({
                      name: 'VOC_CONCEPT',
                      title: 'CONCEPT',
                      TableDescription: `标准化词汇表包含记录或概念，这些记录或概念唯一地标识用于表达CDM所有领域表中临床信息的每个基本含义单元。概念来自词汇表，这些词汇表通过使用代码和相关描述来表示整个领域（例如条件，药物，程序）的临床信息。一些概念被指定为标准概念，这意味着这些概念可以用作OMOP通用数据模型和标准化分析中临床实体的规范表达式。每个标准概念都属于一个域，该域定义了概念在清洁发展机制数据表中预期出现的位置。

概念可以代表广泛的类别（如“心血管疾病”），详细的临床元素（“前外侧壁的心肌梗死”）或修改特征和属性，以定义不同细节层次的概念（疾病的严重程度，相关的形态等）。

标准化词汇表中的记录派生自国家或国际词汇，如 SNOMED-CT、RxNorm 和 LOINC，或定义为涵盖观测数据分析各个方面的自定义概念。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >CONCEPT</el-menu-item
                >
                <el-menu-item
                  index="6-2"
                  @click="
                    handleClick({
                      name: 'VOC_VOCABULARY',
                      title: 'VOCABULARY',
                      TableDescription: `词汇表包括从各种来源收集或由OMOP社区从头开始创建的词汇列表。此参考表由每个词汇源的单个记录填充，并包含词汇的描述性名称和其他关联属性。。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >VOCABULARY</el-menu-item
                >
                <el-menu-item
                  index="6-3"
                  @click="
                    handleClick({
                      name: 'VOC_DOMAIN',
                      title: 'DOMAIN',
                      TableDescription: `域表包含标准化词汇表的概念可以属于的 OMOP 定义的域的列表。域为 CDM 表中的标准化字段定义一组允许的概念。例如，“条件”域包含描述患者状况的概念，这些概念只能存储在CONDITION_OCCURRENCE和CONDITION_ERA表的condition_concept_id字段中。此参考表由每个域的单个记录填充，并包含域的描述性名称。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >DOMAIN</el-menu-item
                >
                <el-menu-item
                  index="6-4"
                  @click="
                    handleClick({
                      name: 'VOC_CONSEPT_CLASS',
                      title: 'CONCEPT_CLASS',
                      TableDescription: `CONCEPT_CLASS表是一个参考表，其中包括用于区分给定词汇中的概念的分类列表。此参考表由每个概念类的单个记录填充。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >CONCEPT_CLASS</el-menu-item
                >
                <el-menu-item
                  index="6-5"
                  @click="
                    handleClick({
                      name: 'VOC_CONCEPT_RELATIONSHIP',
                      title: 'CONCEPT_RELATIONSHIP',
                      TableDescription: `CONCEPT_RELATIONSHIP表包含定义任何两个概念与关系的性质或类型之间的直接关系的记录。每种类型的关系都在关系表中定义。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >CONCEPT_RELATIONSHIP</el-menu-item
                >
                <el-menu-item
                  index="6-6"
                  @click="
                    handleClick({
                      name: 'VOC_RELATIONSHIP',
                      title: 'RELATIONSHIP',
                      TableDescription: `RELATIONSHIP 表提供了可用于关联CONCEPT_RELATIONSHP表中任意两个概念的所有类型的关系的参考列表。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >RELATIONSHIP</el-menu-item
                >
                <el-menu-item
                  index="6-7"
                  @click="
                    handleClick({
                      name: 'VOC_CONSCPT_SYONYM',
                      title: 'CONCEPT_SYNONYM',
                      TableDescription: `CONCEPT_SYNONYM表用于存储概念的备用名称和说明。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >CONCEPT_SYNONYM</el-menu-item
                >
                <el-menu-item
                  index="6-8"
                  @click="
                    handleClick({
                      name: 'VOC_CONCEPT_ANCESTOR',
                      title: 'CONCEPT_ANCESTOR',
                      TableDescription: `CONCEPT_ANCESTOR表旨在通过提供概念之间的完整层次结构关系来简化观察分析。只有概念之间的直接父子关系存储在CONCEPT_RELATIONSHIP表中。为了确定更高级别的祖先联系，必须在分析时导航所有单独的直接关系。CONCEPT_ANCESTOR表包括所有父子关系的记录，以及祖父母-孙子关系和任何其他等级的谱系关系的记录。使用CONCEPT_ANCESTOR表可以查询分层概念的所有后代。例如，药物成分和药物产品都是药物类祖先的后代。
此表完全派生自概念表、CONCEPT_RELATIONSHIP表和关系表。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >CONCEPT_ANCESTOR</el-menu-item
                >
                <el-menu-item
                  index="6-9"
                  @click="
                    handleClick({
                      name: 'VOC_SOURCE_TO_CONCEPT_MAP',
                      title: 'SOURCE_TO_CONCEPT_MAP',
                      TableDescription: `源到概念映射表是 OMOP 通用数据模型中的遗留数据结构，建议在 ETL 过程中使用，以维护标准化词汇表中不作为概念提供的本地源代码，并将每个源代码的映射建立到标准概念的映射，作为可用于填充通用数据模型表的target_concept_ids。SOURCE_TO_CONCEPT_MAP表不再填充发布到 OMOP 社区的标准化词汇中的内容。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >SOURCE_TO_CONCEPT_MAP</el-menu-item
                >
                <el-menu-item
                  index="6-10"
                  @click="
                    handleClick({
                      name: 'VOC_DRUG_STRENGTH',
                      title: 'DRUG_STRENGTH',
                      TableDescription: `DRUG_STRENGTH表包含有关特定药物产品中包含的特定成分的量或浓度和相关单位的结构化内容。此表是支持药物利用率标准化分析的补充信息。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >DRUG_STRENGTH</el-menu-item
                >
                <el-menu-item
                  index="6-11"
                  @click="
                    handleClick({
                      name: 'VOC_COHORT',
                      title: 'COHORT',
                      TableDescription: `COHORT 表包含一段时间内满足一组给定条件的受试者的记录。同期群的定义包含在COHORT_DEFINITION表中。它被列为 RESULTS 方案的一部分，因为它是数据库用户以及 ATLAS 等工具需要能够写入的表。CDM 和词汇表都是只读的，因此建议将同期群表和COHORT_DEFINTION表保存在单独的架构中，以减轻混淆。`,
                      UserGuide: ``,
                      ETLConventions: `队列通常包括被诊断患有特定疾病的患者，暴露于特定药物的患者，但也可以是执行特定程序的提供者。同期群记录必须具有开始日期和结束日期，但结束日期可以设置为开始日期，也可以使用观察期开始日期应用审查日期。同期群记录必须包含主题 ID，该 ID 可以指个人、提供者、访问记录或护理网站，尽管它们通常是人员 ID。队列定义将通过主题概念 ID 定义主题的类型。一个主题在任何时候都可以属于（或不属于）一个队列。一个主题在任何时刻都只能在队列表中有一条记录，即一个人不可能包含多个记录，这些记录指示队列成员身份在时间上重叠`,
                    })
                  "
                  >COHORT</el-menu-item
                >
                <el-menu-item
                  index="6-12"
                  @click="
                    handleClick({
                      name: 'VOC_COHORT_DEFINITION',
                      title: 'COHORT_DEFINITION',
                      TableDescription: `COHORT_DEFINITION表包含定义队列的记录，这些队列通过关联的描述和语法以及实例化（算法的执行）放置在 COHORT 表中。队列是一组在一段时间内满足给定纳入标准组合的受试者。COHORT_DEFINITION表提供了一个标准化的结构，用于维护控制将主题包含在队列中的规则，并且可以存储操作编程代码以在OMOP通用数据模型中实例化队列。`,
                      UserGuide: ``,
                      ETLConventions: ``,
                    })
                  "
                  >COHORT_DEFINITION</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 12px"> </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import {
  Sunset,
  Briefcase,
  Box,
  PartlyCloudy,
  Cpu,
  PriceTag,
  Location,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import CDMInfo from "../../../components/CDMInfo.vue";
import CDMListMain from "@/components/CDMListMain.vue";

const router = useRouter();

const handleClick = ({
  title,
  TableDescription,
  UserGuide,
  ETLConventions,
  name,
}) => {
  router.push({
    name,
    query: {
      title,
      TableDescription,
      UserGuide,
      ETLConventions,
    },
  });
};

// 跳转到首页

const handleRouteInfoPage = () => {
  router.push({
    name: "Cdm6Info",
  });
};
</script>

<style lang="less" scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  font-size: 20px;
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 5px;
  box-sizing: border-box;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
