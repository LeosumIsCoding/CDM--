

let fs = require("fs")
const path = require("path")
var i = 0

function searchJies(lines){
    let jies = []
    while(1){
        let text = lines[i]
        if(text.includes("第") && text.includes("节")){
            text = text.replace(/\s*/g,"")
            i += 2
            let fangjies = searchFangjies(lines)
            let jie = {
                jie:text,
                zucheng:fangjies
            }
            jies.push(jie)
        }else{
            return jies
        }
    }
}

function searchFangjies(lines){
    let fangjies = []
    while(1){
        let text = lines[i]
        if(i == 640){
            return fangjies
        }
        if(text.includes("组成")){
            text = text.replace(/\s*/g,"")
            i += 2
            fangjies.push(text)
        }else{
            return fangjies
        }
    }
}


fs.readFile('zucheng.txt', 'utf-8', (err, data)=>{
    // console.log(data);
    let lines = data.split(/\r?\n/)
    let flag = 1
    let mydata = []
    while(flag == 1){
        while(1){
            let text = lines[i]
            if(text.includes("章") && text.includes("第")){
                text = text.replace(/\s*/g,"")
                i += 2
                jies = searchJies(lines)
                let zhang = {
                    zhang:text,
                    jies:jies
                }
                mydata.push(zhang)
            }else{
                let dataJson = JSON.stringify(mydata)
                console.log(dataJson);
                let file = path.resolve(__dirname,'./liziJson.txt')
                fs.writeFile(file, dataJson,{encoding:'utf-8'}, err=>{
                    console.log(err);
                })
                fs.close()
                break
            }
        }
    }

})

