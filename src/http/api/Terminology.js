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

export {
    getDiseasecategory,
    getSyndromeCategory,
    getGovernanceTerms
};