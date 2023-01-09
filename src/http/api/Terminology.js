import http from "../http";

// 中医疾病类目
const getDiseasecategory = (page, pageSize) => {
    // console.log(page, pageSize);
    return http.get(`/tcm/diseasecategories/${page}/${pageSize}`);
};

// 中医证候类目
const getSyndromeCategory = (page, pageSize) => {
    return http.get(`/tcm/syndromeCategory/${page}/${pageSize}`);
};


// 获取治法术语
const getGovernanceTerms = (page, pageSize) => {
    return http.get(`/governanceTerms/${page}/${pageSize}`);
};


// 添加治法术语
const addGovernceTerms = (form) => {
    return http.post("/governanceTerms/addItem", {
        ...form
    });
};

// 更新
const updateGovernanceTerms = (form) => {
    return http.post("/governanceTerms/updateItem", {
        ...form
    });
};

// 删除
const deleteGovernanceTerms = (id) => {
    return http.get(`/governanceTerms/deletedItem/${id}`);
};

// 获取iCD 的信息
const getICDPages = (page, pageSize) => {
    return http.get(`/icd/list/${page}/${pageSize}`);
};

// 获取 SickPositionDictionary 的分页
const getSickPositionDictionaryPages = (page, pageSize) => {
    // console.log(page, pageSize);
    return http.get(`/sick/pages/${page}/${pageSize}`);
};

// 获取 PathologicalDictionary 的分页
const getPathologicalDictionaryPages = (page, pageSize) => {
    return http.get(`/path/pages/${page}/${pageSize}`);
};

export {
    getDiseasecategory,
    getSyndromeCategory,
    getGovernanceTerms,
    updateGovernanceTerms,
    addGovernceTerms,
    deleteGovernanceTerms,
    getICDPages,
    getSickPositionDictionaryPages,
    getPathologicalDictionaryPages
};