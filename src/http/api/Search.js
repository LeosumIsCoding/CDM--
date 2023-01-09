import http from "../http";

// 搜索
const handleSearchClassficiation = (tableName, kw) => {
    return http.post("/drug/drugSearch", {
        tableName,
        kw
    });
};


// 标准分词搜索
const standardSearch = (tableName, keyWord) => {
    return http.post("/standardized/search", {
        tableName,
        keyWord
    });
};


export {
    handleSearchClassficiation,
    standardSearch
};