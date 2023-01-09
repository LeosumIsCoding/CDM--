import http from "../http";

// 获取中要数据库信息
const getChineseMedicineDBInfo = (book_name, characters, functional_indications, page, pageSize) => {
    console.log(book_name, characters, functional_indications);
    return http({
        url: `/chineseMedicine/getInfoPage/${page}/${pageSize}`,
        method: "post",
        data: {
            book_name,
            characters,
            functional_indications
        }
    });
};

// 通过ids 删除
const deletedChineseDbByIds = (ids) => {
    return http({
        url: "/chineseMedicine/deleteByIds",
        method: "post",
        data: {
            ids
        }
    });
};

// 更新
const updateChineseDB = (item) => {
    return http({
        url: "/chineseMedicine/updateInfo",
        method: "post",
        data: {
            ...item
        }
    });
};

// 添加数据信息
const addChineseDBInfo = (item) => {
    return http({
        url: "/chineseMedicine/addInfo",
        method: "post",
        data: {
            ...item
        }
    });
};

export {
    getChineseMedicineDBInfo,
    deletedChineseDbByIds,
    updateChineseDB,
    addChineseDBInfo
};