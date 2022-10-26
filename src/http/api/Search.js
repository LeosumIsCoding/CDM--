import http from "../http";

// 搜索
const handleSearchClassficiation = (tableName, kw) => {
    return http.post("/drug/drugSearch", {
        tableName,
        kw
    });
};

export {
    handleSearchClassficiation
};