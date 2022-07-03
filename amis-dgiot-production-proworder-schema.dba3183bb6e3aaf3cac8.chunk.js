/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot-jiande 
 *  version : 0.0.2 
 *  description : dgiot-jiande 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Sun Jul 03 2022 16:02:30 GMT+0800 (China Standard Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{MFhY:function(e,t,l){"use strict";l.r(t),l.d(t,"schema",(function(){return _}));l("07d7"),l("FZtP");var a=l("ejTr"),i=l.n(a),o=l("CvqZ"),d=l.n(o),n=l("8Vev"),x=l.n(n),h=l("NDYa"),r=l.n(h),b=l("aNQX"),g=l.n(b),m=l("04Ix"),p=l.n(m),s=l("TSYQ"),u=l.n(s),w=l("p46w"),c=l.n(w),f=l("w5tg"),v=l("c+yx");function y(e,t){var l=i()(e);if(d.a){var a=d()(e);t&&(a=x()(a).call(a,(function(t){return r()(e,t).enumerable}))),l.push.apply(l,a)}return l}function N(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?y(Object(l),!0).forEach((function(t){p()(e,t,l[t])})):g.a?Object.defineProperties(e,g()(l)):y(Object(l)).forEach((function(t){Object.defineProperty(e,t,r()(l,t))}))}return e}var _={type:"page",data:{userid:window.location},body:[{type:"grid",columns:[{md:12,body:[{mode:"inline",name:"title",type:"static",label:"生产工单管理",labelClassName:"text-lg p-md font-bold"}],columnClassName:"bg-white"},{body:[{type:"crud",mode:"table",api:{method:"get",url:"/iotapi/classes/Device",adaptor:function(e,t,l){return console.log("payloadtree",e),{data:{count:e.data.count,rows:e.data.rows},status:0,msg:"ok"}}},defaultParams:{skip:0,limit:10,order:"-createdAt",count:"objectId",where:{product:"ec71804a3d","detail.payout":"已派发"}},pageField:"skip",perPageField:"limit",filter:{body:[{mode:"inline",name:"where.devaddr.$regex",size:"md",type:"input-text",placeholder:"按单据编号查询"},{name:"where.name.$regex",type:"input-text",size:"md",placeholder:"按物料名称查询"},{label:"查询",level:"primary",type:"submit",size:"md"},{label:"重置",type:"reset",size:"md"}],title:"",submitText:""},columns:[{name:"devaddr",label:"单据编号"},{name:"content.Type_of_document",label:"单据类型"},{name:"content.Document_date",label:"单据日期",width:120},{name:"content.DeviceName",label:"物料名称",popOver:{trigger:"hover",showIcon:!1,body:"${content.DeviceName}",popOverClassName:"min-w-0"},className:"overflow-hidden white-space-nowrap text-overflow-ellipsis",width:125},{name:"content.Product_type",label:"产品类型"},{name:"content.Specifications",label:"规格型号",width:200},{name:"content.Number",label:"生产数量"},{name:"content.Material_code",label:"物料编码"},{name:"content.Production_workshop",label:"生产车间"},{name:"content.Unit",label:"单位"},{type:"operation",label:"操作",buttons:[{type:"button",label:"查看",drawer:{body:{body:[{name:"devaddr",type:"static",label:"订单号",extractValue:!0,required:!0},{name:"name",type:"static",label:"物料名称",disabledOn:"${false}"},{name:"content.Material_code",type:"static",label:"物料编码",disabledOn:"${false}"},{name:"content.Number",type:"static",label:"计划数量",required:!0},{type:"image",source:"content.imageUrl",src:"${content.imageUrl}",enlargeAble:!0},{name:"title1",type:"static",label:"人员过程",value:"",labelClassName:"text-lg p-md font-bold"},{type:"crud",source:"${content.personlist}",syncLocation:!1,columns:[{name:"objectId",label:"编号"},{name:"label",label:"姓名"}]},{name:"content.taskstart",type:"static",label:"实际开始时间",visibleOn:"content.taskstart"},{name:"content.taskend",type:"static",label:"实际结束时间",visibleOn:"content.taskend"},{name:"content.isaudit",type:"static",label:"审核",visibleOn:"content.isaudit"},{name:"content.opinion",type:"static",label:"审核意见",visibleOn:"content.opinion"},{name:"content.fqinfo.isstart",type:"static",label:"任务状态",visibleOn:"content.fqinfo.isstart"},{name:"content.fqinfo.taskstart",type:"static",label:"实际开始时间",visibleOn:"content.fqinfo.taskstart"},{name:"content.fqinfo.taskend",type:"static",label:"实际结束时间",visibleOn:"content.fqinfo.taskend"},{name:"content.fqinfo.isaudit",type:"static",label:"审核",visibleOn:"content.fqinfo.isaudit"},{name:"content.fqinfo.opinion",type:"static",label:"审核意见",visibleOn:"content.fqinfo.opinion"}],type:"form"},title:"查看"},actionType:"drawer"},{api:{method:"put",url:"/iotapi/amis/Device/${objectId}",headers:{sessionToken:c.a.get("authorization")},requestAdaptor:function(e){console.log("111",e);var t=e.data.content;return t.fast="加急",N(N({},e),{},{data:{content:t}})}},type:"button",label:"加急",level:"warning",actionType:"ajax",confirmText:"是否确认优先处理?"},{type:"button",label:"指派",level:"success",actionType:"dialog",dialog:{title:"指派任务",body:{type:"form",className:u()(f.b.flex_label5x),api:{method:"put",url:"/iotapi/amis/Device/${objectId}",requestAdaptor:function(e){console.log("api数据查看",e.data);var t=e.data.ACL;for(var l in t)l!=Object(v.c)()&&"role:建德生产计划部门"!=l&&t[l].write&&1==t[l].write&&(t[l].write=!1);t[e.data.dept.objectId]={read:!0,write:!0};var a=e.data.content;a.pinfo={},a.personel=e.data.dept;var i=a.personlist;return i.push(e.data.dept),a.personlist=i,console.log("setAcl",t),N(N({},e),{},{data:{ACL:t,content:a}})}},controls:[{type:"static",name:"content",label:"唯一码",visibleOn:"false"},{name:"ACL",type:"input-text",visibleOn:"false",label:"权限"},{name:"dept",type:"nested-select",label:"派发人员",selectMode:"tree",source:{method:"get",url:"/iotapi/usertree",adaptor:function(e,t,l){return console.log("payloadtree",e),console.log("转换树options",e.data.options),N(N({},e),{},{status:0,msg:"ok"})},responseData:{options:"${options|pick:label~label,value~value,children~children}"}},required:!0}]}},visibleOn:"content.jdinfo.isstart!='加工中'"},{type:"button",label:"任务",level:"info",drawer:{body:{body:[{mode:"inline",name:"title",type:"static",label:"成品信息详情",labelClassName:"text-lg p-md font-bold"},{type:"crud",source:"${content.jdinfo.ctaskList}",syncLocation:!1,headerToolbar:["export-excel"],columns:[{name:"cdate",label:"日期",groupName:"${devaddr}"},{name:"dingdan",label:"订单号",groupName:"${devaddr}"},{name:"mhour",label:"工长",groupName:"${devaddr}"},{name:"prom",label:"产品型号",groupName:"${devaddr}"},{name:"ymodel",label:"原料型号",groupName:"${devaddr}"},{name:"prostand",label:"产品规格",groupName:"${devaddr}"},{name:"packspec",label:"包装规格",groupName:"${devaddr}"},{name:"pnumber",label:"生产数量",groupName:"${devaddr}"},{name:"rejects",label:"不良品",groupName:"${devaddr}"},{name:"smater",label:"上级原料",groupName:"${devaddr}"},{name:"ymater",label:"剩料",groupName:"${devaddr}"},{name:"fmater",label:"废料",groupName:"${devaddr}"},{name:"machine",label:"机台",groupName:"${devaddr}"},{name:"people",label:"人员",groupName:"${devaddr}"},{name:"subtime",label:"提交时间",groupName:"${devaddr}"}]},{mode:"inline",name:"title1",type:"static",label:"半成品信息详情",value:"",labelClassName:"text-lg p-md font-bold"},{type:"crud",source:"${content.jdinfo.btaskList}",syncLocation:!1,headerToolbar:["export-excel"],columns:[{name:"bdate",label:"日期",groupName:"${devaddr}"},{name:"dingdan",label:"订单号",groupName:"${devaddr}"},{name:"prom",label:"产品型号",groupName:"${devaddr}"},{name:"bprom",label:"半成品型号",groupName:"${devaddr}"},{name:"ymodel",label:"原料型号",groupName:"${devaddr}"},{name:"prostand",label:"产品规格",groupName:"${devaddr}"},{name:"packspec",label:"包装规格",groupName:"${devaddr}"},{name:"pnumber",label:"生产数量",groupName:"${devaddr}"},{name:"rejects",label:"不良品",groupName:"${devaddr}"},{name:"smater",label:"上机原料",groupName:"${devaddr}"},{name:"ymater",label:"剩料",groupName:"${devaddr}"},{name:"fmater",label:"废料",groupName:"${devaddr}"},{name:"machine",label:"机台",groupName:"${devaddr}"},{name:"people",label:"人员",groupName:"${devaddr}"}]}],type:"form"},size:"xl",title:"查看任务详情"},actionType:"drawer",visibleOn:"detail.payout=='已派发'"},{api:{method:"delete",url:"/iotapi/amis/Device/${objectId}",headers:{sessionToken:c.a.get("authorization")}},type:"button",label:"删除",level:"danger",actionType:"ajax",confirmText:"确认要删除？"}]}],headerToolbar:[],footerToolbar:["switch-per-page",{align:"left",type:"pagination"},{align:"left",type:"statistics"}],perPageAvailable:[10,20,50,100],alwaysShowPagination:!0,syncLocation:!1}]}]}],style:{backgroundColor:""},messages:{}}},w5tg:function(e,t,l){"use strict";var a,i,o,d,n,x;l.d(t,"c",(function(){return a})),l.d(t,"e",(function(){return i})),l.d(t,"d",(function(){return o})),l.d(t,"b",(function(){return n})),l.d(t,"a",(function(){return x})),function(e){e.Inline_Block="global-inline-block",e.MB_None="mb-none"}(a||(a={})),function(e){e.width_full="global-width-full",e.width_unset="global-width-unset",e.width1x="global-width-1x",e.width2x="global-width-2x",e.width3x="global-width-3x",e.width4x="global-width-4x",e.width5x="global-width-5x",e.width6x="global-width-6x",e.width7x="global-width-7x",e.width8x="global-width-8x",e.width9x="global-width-9x",e.width10x="global-width-10x",e.width11x="global-width-11x",e.width12x="global-width-12x",e.width13x="global-width-13x",e.width14x="global-width-14x",e.width15x="global-width-15x",e.width16x="global-width-16x",e.width17x="global-width-17x",e.width18x="global-width-18x",e.width19x="global-width-19x",e.width20x="global-width-20x",e.width21x="global-width-21x",e.width22x="global-width-22x",e.width23x="global-width-23x",e.width24x="global-width-24x",e.width25x="global-width-25x",e.width26x="global-width-26x",e.width27x="global-width-27x",e.width28x="global-width-28x",e.width29x="global-width-29x",e.width30x="global-width-30x",e.width31x="global-width-31x",e.width32x="global-width-32x",e.width33x="global-width-33x",e.width34x="global-width-34x",e.width35x="global-width-35x",e.width36x="global-width-36x",e.width37x="global-width-37x",e.width38x="global-width-38x",e.width39x="global-width-39x",e.width40x="global-width-40x",e.width41x="global-width-41x",e.width42x="global-width-42x",e.width43x="global-width-43x",e.width44x="global-width-44x",e.width45x="global-width-45x",e.width46x="global-width-46x",e.width47x="global-width-47x",e.width48x="global-width-48x"}(i||(i={})),function(e){e.height_full="global-height-full",e.height_unset="global-height-unset",e.height1x="global-height-1x",e.height2x="global-height-2x",e.height3x="global-height-3x",e.height4x="global-height-4x",e.height5x="global-height-5x",e.height6x="global-height-6x",e.height7x="global-height-7x",e.height8x="global-height-8x",e.height9x="global-height-9x",e.height10x="global-height-10x",e.height11x="global-height-11x",e.height12x="global-height-12x",e.height13x="global-height-13x",e.height14x="global-height-14x",e.height15x="global-height-15x",e.height16x="global-height-16x",e.height17x="global-height-17x",e.height18x="global-height-18x",e.height19x="global-height-19x",e.height20x="global-height-20x",e.height21x="global-height-21x",e.height22x="global-height-22x",e.height23x="global-height-23x",e.height24x="global-height-24x"}(o||(o={})),d||(d={}),function(e){e.label2x="form-label-2x",e.label3x="form-label-3x",e.label4x="form-label-4x",e.label5x="form-label-5x",e.label6x="form-label-6x",e.label7x="form-label-7x",e.label8x="form-label-8x",e.label9x="form-label-9x",e.label10x="form-label-10x",e.input10x="form-input-10x",e.input12x="form-input-12x",e.input14x="form-input-14x",e.input16x="form-input-16x",e.input18x="form-input-18x",e.input20x="form-input-20x",e.input22x="form-input-22x",e.input24x="form-input-24x",e.input26x="form-input-26x",e.input28x="form-input-28x",e.input30x="form-input-30x",e.input32x="form-input-32x",e.flex_label2x="flex-form-label-2x",e.flex_label3x="flex-form-label-3x",e.flex_label4x="flex-form-label-4x",e.flex_label5x="flex-form-label-5x",e.flex_label6x="flex-form-label-6x",e.flex_label7x="flex-form-label-7x",e.flex_label8x="flex-form-label-8x",e.flex_label9x="flex-form-label-9x",e.flex_label10x="flex-form-label-10x",e.flex_label12x="flex-form-label-12x",e.flex_label14x="flex-form-label-14x",e.flex_label16x="flex-form-label-16x",e.flex_input10x="flex-form-input-10x",e.flex_input12x="flex-form-input-12x",e.flex_input14x="flex-form-input-14x",e.flex_input16x="flex-form-input-16x",e.flex_input18x="flex-form-input-18x",e.flex_input20x="flex-form-input-20x",e.flex_input22x="flex-form-input-22x",e.flex_input24x="flex-form-input-24x",e.flex_input26x="flex-form-input-26x",e.flex_input28x="flex-form-input-28x",e.flex_input30x="flex-form-input-30x",e.flex_input32x="flex-form-input-32x",e.item_height2_5x="form-item-height-2_5x",e.item_height3_5x="form-item-height-3_5x"}(n||(n={})),function(e){e.width10x="dialog-width-10x",e.width15x="dialog-width-15x",e.width20x="dialog-width-20x",e.width25x="dialog-width-25x",e.width30x="dialog-width-30x",e.width35x="dialog-width-35x",e.width40x="dialog-width-40x",e.width45x="dialog-width-45x",e.width50x="dialog-width-50x",e.width55x="dialog-width-55x",e.width60x="dialog-width-60x",e.width65x="dialog-width-65x",e.width70x="dialog-width-70x",e.width75x="dialog-width-75x",e.width80x="dialog-width-80x",e.width85x="dialog-width-85x",e.width90x="dialog-width-90x",e.width95x="dialog-width-95x",e.width100x="dialog-width-100x",e.width105x="dialog-width-105x",e.width110x="dialog-width-110x",e.width115x="dialog-width-115x",e.width120x="dialog-width-120x",e.width125x="dialog-width-125x",e.width130x="dialog-width-130x",e.width135x="dialog-width-135x",e.width140x="dialog-width-140x",e.width145x="dialog-width-145x",e.width150x="dialog-width-150x"}(x||(x={}))}}]);