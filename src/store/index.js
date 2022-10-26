import { createStore } from 'vuex';

export default createStore({
    state: {
        DoMAINList: [{
            index: "1-1",
            tableName: "do_condition",
            listName: "Condition"
        }, {
            index: "1-2",
            tableName: "do_condition_status",
            listName: "Condition Status"
        }, {
            index: "1-3",
            tableName: "do_conditionordevice",
            listName: "Condition/Device"
        }, {
            index: "1-4",
            tableName: "do_conditionormeas",
            listName: "Condition/Meas"
        }, {
            index: "1-5",
            tableName: "do_conditionorobs",
            listName: "Condition/Obs"
        }, {
            index: "1-6",
            tableName: "do_conditionorprocedure",
            listName: "Condition/Procedure"
        }, {
            index: "1-7",
            tableName: "do_cost",
            listName: "Cost"
        }, {
            index: "1-8",
            tableName: "do_currency",
            listName: "Currency"
        }, {
            index: "1-9",
            tableName: "do_device",
            listName: "Device"
        }, {
            index: "1-10",
            tableName: "do_deviceorprocedure",
            listName: "Device/Procedure"
        }, {
            index: "1-11",
            tableName: "drug",
            listName: "Drug"
        }, {
            index: "1-12",
            tableName: "do_drugorprocedure",
            listName: "Drug/Procedure"
        }, {
            index: "1-13",
            tableName: "do_episode",
            listName: "Episode"
        }, {
            index: "1-14",
            tableName: "do_ethnicity",
            listName: "Ethnicity"
        }, {
            index: "1-15",
            tableName: "do_gender",
            listName: "Gender"
        }, {
            index: "1-16",
            tableName: "do_geography",
            listName: "Geography"
        }, {
            index: "1-17",
            tableName: "do_measvalue",
            listName: "Meas Value"
        }, {
            index: "1-18",
            tableName: "do_measvalueoperator",
            listName: "Meas value Operator"
        }, {
            index: "1-19",
            tableName: "do_measurement",
            listName: "Measurement"
        }, {
            index: "1-20",
            tableName: "do_metadata",
            listName: "Metadata"
        }, {
            index: "1-21",
            tableName: "do_obsorprocedure",
            listName: "Obs/Procedure"
        }, {
            index: "1-22",
            tableName: "do_Observation",
            listName: "Observation"
        }, {
            index: "1-23",
            tableName: "do_payer",
            listName: "Player"
        }, {
            index: "1-24",
            tableName: "do_placeofservice",
            listName: "Place of Service"
        }, {
            index: "1-25",
            tableName: "do_plan",
            listName: "Plan"
        }, {
            index: "1-26",
            tableName: "do_planstopreason",
            listName: "Plan Stop Reason"
        }, {
            index: "1-27",
            tableName: "do_procedure",
            listName: "Procedure"
        }, {
            index: "1-28",
            tableName: "do_provider",
            listName: "Provider"
        }, {
            index: "1-29",
            tableName: "do_race",
            listName: "Race"
        }, {
            index: "1-30",
            tableName: "do_regimen",
            listName: "Regimen"
        }, {
            index: "1-31",
            tableName: "do_relationship",
            listName: "Relationship"
        }, {
            index: "1-32",
            tableName: "do_revenuecode",
            listName: "Revenue Code"
        }, {
            index: "1-33",
            tableName: "do_route",
            listName: "Route"
        }, {
            index: "1-34",
            tableName: "do_specanatomicsite",
            listName: "Spec Anatomic Site"
        }, {
            index: "1-35",
            tableName: "do_specdiseasestatus",
            listName: "Spec Disease Status"
        }, {
            index: "1-36",
            tableName: "do_specimen",
            listName: "Specimen"
        }, {
            index: "1-37",
            tableName: "do_Sponsor",
            listName: "Sponsor"
        }, {
            index: "1-38",
            tableName: "do_typeconcept",
            listName: "Type Concept"
        }, {
            index: "1-39",
            tableName: "do_unit",
            listName: "Unit"
        }, {
            index: "1-40",
            tableName: "do_visit",
            listName: "Visit"
        }],  //分类列表
        ConceptList: [
            {
                index: "2-1",
                tableName: "co_classification",
                listName: "Classification"
            }, {
                index: "2-2",
                tableName: "co_nonstandard",
                listName: "Non-standard"
            }, {
                index: "2-3",
                tableName: "co_standard",
                listName: "Standard"
            }
        ],
        isClose: true
    },
    mutations: {
        CHANGEISCLOSE(state) {
            state.isClose = !state.isClose;
        }
    },
    actions: {
        changeIsClose(context) {
            context.commit("CHANGEISCLOSE");
        }
    },
    getters: {
        closeState(state) {
            return state.isClose;
        }
    }
});