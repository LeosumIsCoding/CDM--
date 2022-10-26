import axios from "axios";
export default (word) => {
    return axios.get(`/api/translate?&doctype=json&type=EN2ZH_CN&i=${word}`);
};