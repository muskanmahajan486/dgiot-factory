/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot-jiande 
 *  version : 0.0.2 
 *  description : dgiot-jiande 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Sun Jul 03 2022 16:02:30 GMT+0800 (China Standard Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{yTAX:function(t,e,a){"use strict";a.r(e),a.d(e,"schema",(function(){return i}));var i={title:"15616",data:{objectId:window.location},body:[{type:"grid",columns:[{type:"panel",title:"本地配置示例 支持交互${objectId}",name:"chart-local",body:[{type:"chart",config:{title:{text:"极坐标双数值轴"},legend:{data:["line"]},polar:{center:["50%","54%"]},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},angleAxis:{type:"value",startAngle:0},radiusAxis:{min:0},series:[{coordinateSystem:"polar",name:"line",type:"line",showSymbol:!1,data:[[0,0],[.03487823687206265,1],[.06958655048003272,2],[.10395584540887964,3],[.13781867790849958,4],[.17101007166283433,5],[.2033683215379001,6],[.2347357813929454,7],[.26495963211660245,8],[.2938926261462365,9],[.3213938048432697,10]]}],animationDuration:2e3},clickAction:{actionType:"dialog",dialog:{title:"详情",body:[{type:"tpl",tpl:"<span>当前选中值 ${value|json}<span>"}]}}}]},{type:"panel",title:"远程图表示例(返回值带function)",className:"fw-b",name:"chart-remote",body:[{type:"chart",config:{xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],type:"category"},yAxis:{type:"value"},series:[{data:[820,932,901,934,1290,1330,1320],type:"bar"}]},replaceChartOption:!0}]}]}]}}}]);