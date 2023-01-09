import http from "../http";



// 中医 获取类别
const getClasses = () => {
    return http({
        url: "/tcmterminology/type",
        method: "get"
    });
};


// 分类的名称
// 页面
// 页面大小
const getTCMInfoByClass = (className, page, pageSize) => {
    return http({
        url: `/tcmterminology/${page}/${pageSize}`,
        method: "post",
        data: {
            className
        }
    });
};

// 更新
const updatedupdateTCMTerminology = (tcmTerminology) => {
    let { name, info, classes, tid, isdeleted } = tcmTerminology;

    return http({
        url: "/tcmterminology/update",
        method: "POST",
        data: {
            name: name,
            info: info,
            classes: classes,
            tid: tid,
            isdeleted: isdeleted
        }
    });
};

// 添加
const addTCMItem = (name, info, classes) => {
    return http({
        url: "/tcmterminology/add",
        method: "post",
        data: {
            name, info, classes
        }
    });
};

// 搜索
const searchItem = (inputInfo) => {
    return http({
        url: "/tcmterminology/search",
        method: "post",
        data: {
            inputInfo
        }
    });
};


// 删除通过id 
const deletedById = (tid) => {
    return http({
        url: "/tcmterminology/deleted",
        method: "post",
        data: {
            tid
        }
    });
};

export {
    getClasses,
    getTCMInfoByClass,
    updatedupdateTCMTerminology,
    addTCMItem,
    searchItem,
    deletedById
};