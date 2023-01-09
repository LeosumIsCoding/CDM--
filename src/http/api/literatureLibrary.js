import http from "../http";
import qs from "qs";

// 分页查询获取数据
const getLiteratureLibraryInfo = (formulaName, clinicalSigns, literatureSources, page, pageSize) => {
    console.log(formulaName, clinicalSigns, literatureSources);
    return http({
        url: `/prescription/getInfo/${page}/${pageSize}`,
        method: "post",
        data:
        {
            formulaName,
            clinicalSigns,
            literatureSources
        }
    });
};

// 通过ids 删除
const deletedLiteratureLibraryByIds = (ids) => {
    return http({
        url: "/prescription/deleteByIds",
        method: "post",
        data: {
            ids
        }
    });
};


// 更新数据信息
const updateLibraryInfo = (item) => {
    return http({
        url: "/prescription/updateInfo",
        method: "post",
        data: {
            ...item
        }
    });
};

// 添加数据信息
const addLibraryInfo = (item) => {
    return http({
        url: "/prescription/addInfo",
        method: "post",
        data: {
            ...item
        }
    });
};

export {
    getLiteratureLibraryInfo,
    deletedLiteratureLibraryByIds,
    updateLibraryInfo,
    addLibraryInfo
};