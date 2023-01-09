import axios from "axios";
// const baseURL = 'http://127.0.0.1:1010';
import BASEURL from "../BASEURL";
// 下载
const downLoadDrug = (tableName) => {
    return axios({
        method: "get",
        url: BASEURL + `/drug/export/${tableName}`,
        responseType: 'blob'
    });
};



export {
    downLoadDrug
};