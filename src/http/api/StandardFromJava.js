import http from '../http';


// 获取数据
const getAllInfo = (page, pageSize) => {
    return http({
        url: `/standard/getAllInfo/${page}/${pageSize}`,
        method: "get"
    });
};

// 更新数据
const updateInfo = (item) => {
    return http({
        url: "/standard/updateInfo",
        method: "post",
        data: {
            ...item
        }
    });
};


// 根据id 删除
const deleteById = (id) => {
    return http({
        url: "/standard/deleteById",
        method: "post",
        data: {
            lid: id
        }
    });
};

export {
    getAllInfo,
    updateInfo,
    deleteById
};