<template>
<div id="main">
    <div class="title">
        {{data.title}}
    </div>
    <div class="lizi">
        <div>案例:</div>
        <div class="lizi-text">{{data.cases}}</div>
    </div>

    <div class="row">
        <div class="mades">
            <div class="title">组成:</div>
            <div ref="echartsDom" class="echarts" id="echarts"></div>
            <div class="tip">
                <span>单位：g</span>
            </div>
        </div>
        <div class="add_reduce">
            <div class="title">
                加减:
            </div>
            <div class="item">
                <ol type="1">
                    <li v-for="(jiajian,index) in data.addReduce" :key="index">{{jiajian}}</li>
                </ol>
            </div>
        </div>
        <div class="fangjie">
            <div class="title">
                方解：
            </div>
            <ol>
                <li v-for="(jiajian,index) in data.solutions" :key="index">{{jiajian}}</li>
            </ol>
        </div>
    </div>
</div>
</template>
    
<script setup>
import {defineProps, onMounted,ref} from 'vue'
import * as echarts from 'echarts'
const echartsDom = ref(null)
const echartsInit = (data) => {
  var myChart = echarts.init(echartsDom.value);
  // 指定图表的配置项和数据
  var option = {
    // title: {
    //   text: "数据",
    //   subtext: "Data",
    //   left: "center",
    // },
    tooltip: {
      trigger: "item",
    },
    // legend: {
    //   orient: "vertical",
    //   left: "left",
    // },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: data.mades,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
};

onMounted(()=>{
    echartsInit(props.data)
})
const props = defineProps({
    data:{
        type:Object,
        required:true
    }
})

</script>
    
<style lang="less" scoped>
#main{
    margin: 20px;
    color: rgb(255, 255, 255);
    background-color: rgb(99, 117, 105);
    .title{
        font-size: 20px;
        margin-bottom: 10px;
    }
    .lizi{
        margin-left: 20px;
        word-spacing: 10px;
        margin-bottom: 10px;
        .lizi-text{
            margin-left: 30px;
        }
    }
    .row{
        display: flex;
    }
    .mades{
        position: relative;
        padding-bottom: 20px;
        .title{
            margin-left: 20px;
            font-size: 16px;
        }
        .tip{
            position: absolute;
            bottom: 0;
            left: 50%;
            font-size: 10px;
            transform: translateX(-50%);
        }
        
        .echarts{
            margin-left: 30px;
            width: 300px;
            height: 150px;
        }
    }
    .add_reduce{
        .title{
            font-size: 16px;
        }
        .item{
            margin-left: 20px;
            font-size: 10px;
            li{
                margin-top: 5px;
            }
        }
    }
    .fangjie{
        margin-left: 10px;
        font-size: 5px;
        .title{
            font-size: 16px;
        }
        li{
            margin-left: 20px;
            margin-top: 5px;
        }
    }

}
</style>
    