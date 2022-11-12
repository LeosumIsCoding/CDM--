import http from '../http/http'

const yaofangStore = {
    namespaced:true,
    state: {
        yaofangs: [],
        input:{
            fangyao:"21",
            lizi:"",
            fangjie:"",
            zucheng:"",
            jiajian:""
        },
        index:{
            fangyao:55,
            lizi:0,
            fangjie:0,
            zucheng:0,
            jiajian:0
        },
    },

    mutations:{
        async updateYaofang(state){
            const res = await http.get("/yaofang/get/allYaofang")
            state.yaofangs = res.data
            console.log(state.yaofangs);
        },
        changeFangyaoIndex(state, index){
            // state.index.fangyao = index
            console.log(state.index.fangyao);
        }
    },

    getters:{
        getFangyaoNeed(state){
            let input = state.input.fangyao
            let str = input.split(" ")
            let yaofangs = state.yaofangs
            let result = yaofangs.filter(value=>{
                for(let i = 0; i<str.length; i++){
                    let status = value.mades.find(item=> item.name.includes(str[i]))
                    if(typeof(status) == "undefined"){
                        return false
                    }
                }                
                return true
            })
            console.log(result);
            return result
        },

        getFangyao4Index(state, index){
            let input = state.input.fangyao
            let str = input.split(" ")
            let yaofangs = state.yaofangs
            let result = yaofangs.filter(value=>{
                for(let i = 0; i<str.length; i++){
                    let status = value.mades.find(item=> item.name.includes(str[i]))
                    if(typeof(status) == "undefined"){
                        return false
                    }
                }                
                return true
            })
            let len = result.length
            if(index< len/10){
                result = result.slice(index*10, (index+1)*10)
            }else{
                result = result.slice(index*10, result.length-1)
            }
            console.log(result);
            return result
        }
    }



}

export default yaofangStore