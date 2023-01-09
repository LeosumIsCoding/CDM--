import http from "../http";


// 分页获取数据
const getTraditionChinaByPage = (page, pageSize) => {
    return http({
        url: `/traditionChinese/${page}/${pageSize}`,
        method: "get",
    });
};

// 查询
const handleSearchInfo = (page, pageSize, kw) => {
    return http({
        url: `/traditionChinese/searchInfo/${page}/${pageSize}`,
        method: "post",
        data: {
            kw
        }
    });
};

// 删除 通过id
const handleDeletedById = (id) => {
    return http({
        url: "/traditionChinese/deleted",
        method: "post",
        data: {
            id
        }
    });
};


// 更新
const handleUpdate = (traditionalChineseDrug) => {
    return http({
        url: "/traditionChinese/update",
        method: "post",
        data: {
            ...traditionalChineseDrug
        }
    });
};


// 添加
const handleAddItem = (traditionalChineseDrug) => {
    return http({
        url: "/traditionChinese/add",
        method: "post",
        data: {
            ...traditionalChineseDrug
        }
    });
};

export {
    getTraditionChinaByPage,
    handleSearchInfo,
    handleDeletedById,
    handleUpdate,
    handleAddItem
};