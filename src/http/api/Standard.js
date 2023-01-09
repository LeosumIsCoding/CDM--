import axios from "axios";

const BASEURL = "http://127.0.0.1:5000";


// 上传文件
const uploadFile = (file) => {
    // console.log(file);
    let formData = new FormData();
    formData.append('file', file);

    return axios({
        url: BASEURL + "/upload",
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    });
};


// 标准化
const standardData = (dataList, dbName) => {
    let formData = new FormData();
    formData.append("dataList", dataList);
    formData.append("dbName", dbName);
    return axios({
        url: BASEURL + "/standard",
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    });
};


// 知识图谱
const getknowledGegraph = (nid) => {
    let formData = new FormData();
    formData.append("nid", nid);
    return axios({
        url: BASEURL + "/knowledGegraph",
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    });
};

// 所有标准表的信息
const sendStandardInfo = (dataList) => {
    let formData = new FormData();
    formData.append("dataList", JSON.stringify(dataList));
    return axios({
        url: BASEURL + "/sendStandardInfo",
        method: "post",
        data: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
};

// 获取所有的数据库字段描述
const getSqlTabDescription = () => {
    return axios({
        url: BASEURL + "/getColums",
        method: "get",
    });
};

// 更新字段描述信息
const updateSqlTabDescription = (tableName, info) => {
    let formdata = new FormData();
    formdata.append("tableName", tableName);
    formdata.append("info", info);
    return axios({
        url: BASEURL + "/updateDescription",
        method: "post",
        data: formdata,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
};


// 添加字段
const addSqlTab = (columName,
    columType,
    columLong,
    columIsNull,
    cloumDescription, //描述
    cloumDefault,) => {
    let formData = new FormData();
    formData.append("columName", columName);
    formData.append("columType", columType);
    formData.append("columLong", columLong);
    formData.append("columIsNull", columIsNull);
    formData.append("cloumDescription", cloumDescription);
    formData.append("cloumDefault", cloumDefault);
    return axios({
        url: BASEURL + "/addTab",
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    });
};

// 删除字段
const deletedSqlTab = (columnName) => {
    let formData = new FormData();
    formData.append("columnName", columnName);

    return axios({
        url: BASEURL + "/deleteTab",
        method: "post",
        data: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
};


// 导出数据
const downloadInfo = () => {
    return axios({
        url: BASEURL + "/allexcel",
        method: "get"
    });
};

export {
    uploadFile,
    standardData,
    sendStandardInfo,
    getknowledGegraph,
    getSqlTabDescription,
    updateSqlTabDescription,
    addSqlTab,
    deletedSqlTab,
    downloadInfo
};