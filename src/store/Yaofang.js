import http from '../http/http'

const yaofangStore = {
    namespaced:true,
    state: {
        yaofangs: []
    },

    mutations:{
        async updateYaofang(state){
            const res = await http.get("/yaofang/get/allYaofang")
            state.yaofangs = res
        }
    }



}

export default yaofangStore