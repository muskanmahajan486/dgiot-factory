import classnames from 'classnames';
import Cookies from 'js-cookie';
import { FormClassName } from '@/amis-types';
import { getTreeParents, getuserList, getRoleId, getDepartmentId, getnowTime } from '@/utils/utils'
//生产报工 d5f1b2dcd8 ec71804a3d 


// 详情对话框
function detailsDialog() {
    return {
        type: 'button',
        label: '查看',
        level: 'info',
        // size: 'xs',
        actionType: 'dialog',
        dialog: {
            title: '查看物料清单 ',
            size: "lg",
            closeOnEsc: true,
            actions: [{ type: 'button', label: '关闭', level: 'primary', actionType: 'close' }],
            body: {
                type: 'service',
                // api: '/usemock/keystep',
                api: {
                    method: 'get',
                    url: `/iotapi/classes/Device`,
                    data: {
                        skip: 1,
                        limit:100,
                        count: "objectId",
                        include: "product",
                        where:{
                            "name":{"$regex":"${name}"}
                            // name:"${objectId}"
                        }
                        // "count": "objectId"
                    },
                    // "adaptor": "return {\n    ...payload,\n    count:payload.count,\n results:payload.results \n}",
    
                    //   responseData: {
                    //     "$": "$$",
                    //     count: '${total}',
                    //     rows: '${items}'
                    //   }
                    // },
                    adaptor: function (payload: any, response: any, api: any) {
                      console.log("payloadtree", payload);
                      // let options =  getuserList(payload.data.rows)
                      // console.log('fasfaf',options);
    
                      // payload.data.options =  getTreeParents(payload.data.options)
                      // console.log("转换树options", payload.data.options);
                      return {
                        // ...payload,
                        data: {
                          count: payload.data.count,
                          rows: payload.data.rows
                        },
                        status: 0,
                        msg: 'ok'
                      };
                    }
                  },
                className: classnames(FormClassName.label5x),
                body: [
                    {
                        type: "table",
                        title: "工艺参数",
                        source: "$rows",
                        style: "hieght:150px",
                        columns: [
                            {
                                name: "content.DeviceAddr",
                                label: "单据编号",
                                width: 100
                            },
                            {
                                name: "name",
                                label: "子项物料名称",
                                popOver: {
                                    "trigger": "hover",
                                    "showIcon": false,
                                    "body": "${name}",
                                    "popOverClassName": "min-w-0",
                                    // "position": "left-center-right-center right-center-left-center"
                                    // body: {
                                    //     type: "tpl",
                                    //     tpl: "${name}"
                                    // }
                                },
                                className: 'overflow-hidden white-space-nowrap text-overflow-ellipsis',
                                width: 125
                            },
                            {
                                name: "content.Product_code",
                                label: "产品编号",
                                width: 80
                            },
                            {
                                name: "content.Production_Order_No",
                                label: "生产订单编号",
                                width: 80
                            },
                            {
                                name: "content.Item_type",
                                label: "子项类型",
                                width: 80
                            },
                            {
                                name: "content.Subitem_BOM_number",
                                label: "子项物料编码",
                                width: 80
                            },
                            
                        ]
                    }
                ]
            }
        }
    };
}
//派发
function distDialog() {
    return {
        type: 'button',
        label: '派发',
        level: 'success',
        // size: 'xs',
        actionType: 'dialog',
        dialog: {
            // size: 'xs',
            title: '派发任务',
            // data: {
            //     '&': '$$',
            // },
            body: {
                type: 'form',
                // mode: "inline",
                className: classnames(FormClassName.flex_label5x),
                // initApi: {
                //   method: "get",
                //   url: `${serverHost}/iotapi/curd-page@getDetail?orderId=$orderId`,
                // },
                api: {
                    method: 'put',
                    url: "/iotapi/amis/Device/${objectId}", ///${objectId}
                    requestAdaptor: function (api: any) {
                        console.log('api数据查看', api.data);
                        let setAcl = api.data.ACL
                        let index = 0
                        // for (let i in setAcl){
                        //     if(setAcl[i].write&&setAcl[i].write ==true){ //i !=getRoleId()&&
                        //         setAcl[i].write = false
                        //         // console.log('替换成功');
                        //     }
                        //     index++
                        // }
                        setAcl[api.data.dept.objectId] = {
                            "read": true,
                            "write": true
                        }
                        console.log('setAcl', setAcl);
                        // setAcl[getRoleId()] = {
                        //     "read": true,
                        //     "write": true
                        // }
                        // setAcl['role:浙江保舒康'] = {
                        //     "read": true,
                        //     "write": false
                        // }
                        // let list = []
                        let ctt = api.data.content
                        let list = ctt.personlist || []
                        ctt.personel = api.data.dept
                        list.push(api.data.dept)
                        ctt.personlist = list
                        ctt.compnum = 0
                        ctt.jdinfo = ctt.jdinfo || {}
                        // ctt.jdinfo.isstart = '未开始'
                        ctt.imageUrl = api.data.myUrl ? 'http://121.5.171.21:1250' + api.data.myUrl : ''
                        // ctt.desc = "收到货,第一时间拆包装,质量非常好,与卖家描述一致,完全超出我的 期望值,包装很仔细"
                        ctt.taskList = []
                        ctt.tag = 1
                        console.log('content内容', ctt)
                        return {
                            ...api,
                            data: {
                                content: ctt, // 获取暴露的 api 中的 data 变量
                                "ACL": setAcl,
                                "detail": {
                                    payout: "已派发",
                                },
                                // "devaddr": `G${new Date().getTime()}`,
                                "isEnable": true,
                                // "name": `G${new Date().getTime()}`,
                                "profile": {},
                                "route": {},
                                product: {
                                    className: "Product",
                                    objectId: "ec71804a3d",
                                    __type: "Pointer"
                                }

                            }
                        };
                    },
                },
                controls: [
                    { type: 'static', name: 'content', label: '唯一码', visibleOn: "false" },
                    { name: 'ACL', type: 'input-text', visibleOn: "false", label: '权限' },
                    // {
                    //     type: 'select', 
                    //     name: 'devaddr',
                    //      label: '派发人员', 
                    //      searchable: true,
                    //     // source: "/usemock/getWuliao",
                    //     source: {
                    //         method: "get",
                    //         url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                    //         convertKeyToPath: true,
                    //         data: whereData,

                    //         responseData: {
                    //             options: "${items | pick:label~data.name, value~data
                    // } "
                    // }
                    //     },
                    // },
                    {
                        name: 'dept',
                        type: 'nested-select',
                        label: '派发人员',
                        // labelField: 'label',
                        // valueField: 'value',
                        selectMode: "tree",
                        // source: "/usemock/getgongyi",
                        source: {
                            method: "get",
                            url: '/iotapi/usertree', //'/iotapi/roletree',  // /usemock/usercrtree "/iotapi/amis/Dict", //"/iotapi/
                            adaptor: function (payload: any, response: any, api: any) {
                                console.log("payloadtree", payload);
                                // payload.data.options =  getTreeParents(payload.data.options)
                                console.log("转换树options", payload.data.options);
                                return {
                                    ...payload,
                                    status: 0,
                                    msg: 'ok'
                                };
                            },
                            responseData: {
                                options: "${options|pick:label~label,value~value,children~children}"
                            }
                        },
                        required: true
                    },
                    {
                        type: "input-file",
                        name: "content.image",
                        label: "图片上传",
                        // asBlob:true,
                        receiver: {
                            url: '/upload',
                            method: 'post',
                            requestAdaptor: function (api: any) {
                                console.log('文件上传内容', api, api.data[0])
                                var file = api.data
                                var jsonData = { file: '' }
                                file.forEach((value: any, key: any) => jsonData[key] = value);
                                console.log(jsonData);

                                // var res:any = await getBinaryFromFile(file)
                                let token = Cookies.get('authorization') || ''
                                console.log('token', token)
                                var data = new FormData();
                                data.append("file", jsonData.file);
                                data.append("scene", "default");
                                data.append("filename", "");
                                data.append("output", "json");
                                data.append("path", "");
                                data.append("code", "");
                                data.append("auth_token", token);
                                data.append("submit", "upload");
                                console.log('data内容', data)
                                return {
                                    ...api,
                                    data: data

                                };
                            },
                            adaptor: function (payload: any, response: any, api: any) {
                                return {
                                    ...payload,
                                    status: 0,
                                    msg: 'ok'
                                };
                            },

                        },
                        autoFill: {
                            myUrl: "${path}"
                        }

                    },
                    {
                        type: "input-text",
                        name: "myUrl",
                        label: "url",
                        disabledOn: "${false}"
                    },
                ]
            }
        },
        visibleOn: "detail.payout!=='已派发'"
    };
}

const whereData = {
    // skip: 0,
    // limit: 20,
    keys: "objectId,title,data",
    // order: "-createdAt",
    where: {
        parent: '9470abe2e7'
    }

}
const schema = {
    type: 'page',
    data: {
        "roleId": localStorage.getItem("roleId"),
        "departmentId": localStorage.getItem("departmentId"),
    },
    // "initApi": {
    //   "url": "iotapi/classes/Device/${parse_objectid}",
    //   "method": "get",
    //   "adaptor": "return {\r\n  \"status\":0,\r\n  \"msg\":\"\",\r\n  \"data\":response.data.content\r\n  }",
    //   "headers": {
    //     "store": "localStorage",
    //     "dgiotReplace": "parse_objectid"
    //   },
    //   "dataType": "json"
    // },
    body: [
        {
            type: 'grid',
            columns: [
                {
                    md: 12,
                    body: [
                        {
                            mode: 'inline',
                            name: 'title',
                            type: 'static',
                            label: '生产计划',
                            labelClassName: 'text-lg p-md font-bold'
                        }
                    ],
                    columnClassName: 'bg-white'
                },
                {
                    body: [
                        {
                            icon: 'fa fa-plus pull-left',
                            type: 'button',
                            actionType: 'dialog',
                            label: '新建',
                            level: 'primary',
                            className: 'm-b-sm',
                            dialog: {
                                closeOnEsc: true,
                                // api: '/usemock/device/listAll',
                                actions: [
                                    {
                                        label: "取消",
                                        actionType: "close",
                                        type: "button"
                                    },
                                    {
                                        label: "提交",
                                        actionType: "confirm",
                                        type: "button",
                                        level: "primary"
                                    },
                                ],
                                body: {
                                    api: {
                                        method: 'post',
                                        url: '/iotapi/amis/Device',

                                        // headers: {
                                        //     sessionToken: Cookies.get('authorization')
                                        // },
                                        requestAdaptor: function (api: any) {
                                            let setAcl = {}
                                            console.log("roleid", getRoleId());
                                            setAcl[getRoleId()] = {
                                                "read": true,
                                                "write": true
                                            }
                                            setAcl['role:杭州杰诺实业'] = {
                                                "read": true,
                                                "write": false
                                            }
                                            console.log('测试', api);
                                            let list = []
                                            let ctt = api.data.content
                                            let person = {
                                                label: localStorage.getItem('nick'),
                                                objectId: getRoleId()
                                            }
                                            list.push(person)
                                            ctt.personlist = list
                                            ctt.imageUrl = 'http://121.5.171.21:1250' + api.data.myUrl
                                            delete api.data.myUrl
                                            ctt.jdinfo = {}
                                            return {
                                                ...api,
                                                data: {
                                                    ...api.data, // 获取暴露的 api 中的 data 变量
                                                    //   foo: 'bar' // 新添加数据
                                                    "ACL": setAcl,
                                                    content: ctt,
                                                    "detail": {
                                                        payout: "未派发"
                                                    },
                                                    "devaddr": `GDH${getnowTime()}`,
                                                    "isEnable": true,
                                                    // "name": `GDH${getnowTime()}`,
                                                    "profile": {},
                                                    "route": {},
                                                    product: {
                                                        className: "Product",
                                                        objectId: "ec71804a3d", //"d5f1b2dcd8",
                                                        __type: "Pointer"
                                                    }
                                                }
                                            };
                                        },
                                    },
                                    // "closeOnEsc": true,
                                    // mode: "normal",
                                    body: [
                                        {
                                            name: 'content.material',
                                            type: 'select',
                                            label: '产出物料',
                                            searchable: true,
                                            // source: "/usemock/getWuliao",
                                            source: {
                                                method: "get",
                                                url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                                convertKeyToPath: true,
                                                data: {
                                                    // skip: 0,
                                                    // limit: 20,
                                                    keys: "objectId,title,data",
                                                    //   orderBy: "objectId",
                                                    where: {
                                                        // parent:{
                                                        parent: 'bb7d4be836'
                                                        // }

                                                    }

                                                },

                                                responseData: {
                                                    options: "${items|pick:label~data.name,value~data}"
                                                }
                                            },
                                            // deferApi: "/usemock/device/listAll",
                                            required: false
                                        },
                                        {
                                            name: 'name',
                                            type: 'input-text',
                                            label: '工单名称',
                                            required: true
                                        },
                                        {
                                            type: "input-file",
                                            name: "content.image",
                                            label: "图片上传",
                                            // asBlob:true,
                                            receiver: {
                                                url: '/upload',
                                                method: 'post',
                                                requestAdaptor: function (api: any) {
                                                    console.log('文件上传内容', api, api.data[0])
                                                    var file = api.data
                                                    var jsonData = { file: '' }
                                                    file.forEach((value: any, key: any) => jsonData[key] = value);
                                                    console.log(jsonData);

                                                    // var res:any = await getBinaryFromFile(file)
                                                    let token = Cookies.get('authorization') || ''
                                                    console.log('token', token)
                                                    var data = new FormData();
                                                    data.append("file", jsonData.file);
                                                    data.append("scene", "default");
                                                    data.append("filename", "");
                                                    data.append("output", "json");
                                                    data.append("path", "");
                                                    data.append("code", "");
                                                    data.append("auth_token", token);
                                                    data.append("submit", "upload");
                                                    console.log('data内容', data)
                                                    return {
                                                        ...api,
                                                        data: data

                                                    };
                                                },
                                                adaptor: function (payload: any, response: any, api: any) {
                                                    return {
                                                        ...payload,
                                                        status: 0,
                                                        msg: 'ok'
                                                    };
                                                },

                                            },
                                            autoFill: {
                                                myUrl: "${path}"
                                            }

                                        },
                                        {
                                            type: "input-text",
                                            name: "myUrl",
                                            label: "url",
                                            disabledOn: "${false}"
                                        },
                                        // { 
                                        //     name: 'content.desc',
                                        //     type: 'input-text',
                                        //     label:'描述',
                                        //     required: true
                                        // },
                                        {
                                            name: 'content.package',
                                            type: 'input-text',
                                            label: '包装款式',
                                            required: true
                                        },
                                        {
                                            name: 'content.flower',
                                            type: 'input-text',
                                            label: '花纹',
                                            // required: true
                                        },
                                        {
                                            name: 'content.layer',
                                            type: 'input-text',
                                            label: '层数',
                                            // required: true
                                        },
                                        {
                                            name: 'content.prostand',
                                            type: 'input-text',
                                            label: '产品规格',
                                            required: true
                                        },
                                        {
                                            name: 'content.packsmall',
                                            type: 'input-text',
                                            label: '小包装',
                                            // required: true
                                        },
                                        {
                                            name: 'content.packmb',
                                            type: 'input-text',
                                            label: '中/大包装',
                                            // required: true
                                        },
                                        // {
                                        //     name: 'content.unit',
                                        //     type: 'select',
                                        //     label: '计量单位',
                                        //     searchable: true,
                                        //     // source: "/usemock/getWuliao",
                                        //     source: {
                                        //         method: "get",
                                        //         url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                        //         convertKeyToPath: true,
                                        //         data: {
                                        //             // skip: 0,
                                        //             // limit: 20,
                                        //             keys: "objectId,title,data",
                                        //             //   orderBy: "objectId",
                                        //             where: {
                                        //                 // parent:{
                                        //                 parent: 'e201133194'
                                        //                 // }

                                        //             }
                                        //         },
                                        //         responseData: {
                                        //             options: "${items|pick:label~data.name,value~data}"
                                        //         }
                                        //     },
                                        //     // deferApi: "/usemock/device/listAll",
                                        //     required: false
                                        // },
                                        // {
                                        //     name: 'content.priority',
                                        //     type: 'select',
                                        //     label: '优先级',
                                        //     searchable: true,
                                        //     // source: "/usemock/getWuliao",
                                        //     source: {
                                        //         method: "get",
                                        //         url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                        //         convertKeyToPath: true,
                                        //         data: {
                                        //             // skip: 0,
                                        //             // limit: 20,
                                        //             keys: "objectId,title,data",
                                        //             //   orderBy: "objectId",
                                        //             where: {
                                        //                 // parent:{
                                        //                 parent: '5c96f31928'
                                        //                 // }

                                        //             }

                                        //         },

                                        //         responseData: {
                                        //             options: "${items|pick:label~data.name,value~data}"
                                        //         }
                                        //     },
                                        //     // deferApi: "/usemock/device/listAll",
                                        //     required: false
                                        // },
                                        // {
                                        //     name: 'content.step',
                                        //     type: 'nested-select',
                                        //     label: '工艺步骤',
                                        //     // labelField: 'label',
                                        //     // valueField: 'label',
                                        //     selectMode: "tree",
                                        //     // source: "/usemock/getgongyi",
                                        //     source: {
                                        //         method: "get",
                                        //         url: '/iotapi/relation',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                        //         // headers: {
                                        //         //     sessionToken: Cookies.get('authorization')
                                        //         // },
                                        //         data: {
                                        //             destClass: "_Role",
                                        //             destId: localStorage.getItem("departmentId"),//getRoleId(),
                                        //             destField: "views",
                                        //             srcClass: "View"
                                        //         },
                                        //         adaptor: function (payload: any, response: any, api: any) {
                                        //             // console.log("这是对低代码数据的处理",payload);
                                        //             let data = payload.data.rows[0].data.body[0].options;
                                        //             // console.log("这是对低代码数据的处理",payload,data);
                                        //             payload.data = {} //重新定义data
                                        //             payload.data.options = data;
                                        //             // console.log("这是对低代码数据的处理222",payload);

                                        //             return {
                                        //                 ...payload,
                                        //                 status: 0,
                                        //                 msg: 'ok'
                                        //             };
                                        //         },
                                        //         // responseData: {
                                        //         //     options: "${results[0].data.body[0]|pick:label~objectId,value~value,children~children}"
                                        //         // }
                                        //     },
                                        //     // required: true
                                        // },
                                        // {
                                        //     name: 'content.workshop',
                                        //     type: 'input-text',
                                        //     label: '生产车间'
                                        // },
                                        {
                                            name: 'content.doctime',
                                            type: 'input-date',
                                            // minDate: '${starttime}',
                                            label: '单据日期',
                                            inputClassName: 'w-md',
                                            value: "today",
                                            format: "YYYY-MM-DD", // hh:mm:ss
                                            required: true
                                        },
                                        {
                                            name: 'content.starttime',
                                            type: 'input-datetime',
                                            // maxDate: '${starttime}',
                                            placeholder: '计划开始时间',
                                            label: '计划开始时间',
                                            inputClassName: 'w-md',
                                            value: "now",
                                            format: "YYYY-MM-DD HH:mm:ss",
                                            required: true
                                        },
                                        {
                                            name: 'content.endtime',
                                            type: 'input-datetime',
                                            maxDate: '${endtime}',
                                            placeholder: '计划结束时间',
                                            label: '计划结束时间',
                                            inputClassName: 'w-md',
                                            value: "+1day",
                                            format: "YYYY-MM-DD HH:mm:ss",
                                            required: true
                                        },
                                        {
                                            name: 'content.number',
                                            type: 'input-number',
                                            label: '数量',
                                            value: 1,
                                            required: true
                                        },
                                    ],
                                    type: 'form'
                                },
                                title: '产出信息'
                            }
                        },
                        {
                            type: 'crud',
                            mode: 'table',
                            api: {
                                method: 'get',
                                url: `/iotapi/classes/Device`,
                                // data: {
                                //     // "skip": "${page}",
                                //     // "limit": "${perPage}",
                                //     // "count": "objectId"
                                // },
                                // "adaptor": "return {\n    ...payload,\n    count:payload.count,\n results:payload.results \n}",

                                // responseData: {
                                //     "$": "$$",
                                //     count: '${count}',
                                //     rows: '${rows}'
                                // },
                                adaptor: function (payload: any, response: any, api: any) {
                                    console.log("payloadtree", payload);
                                    // let options =  getuserList(payload.data.rows)
                                    // console.log('fasfaf',options);

                                    // payload.data.options =  getTreeParents(payload.data.options)
                                    // console.log("转换树options", payload.data.options);
                                    return {
                                        data: {
                                            count: payload.data.count,
                                            rows: payload.data.rows
                                        },
                                        status: 0,
                                        msg: 'ok'
                                    };
                                },
                                // adaptor: function (payload: any, response: any, api: any) {
                                //     console.log("payload111111",payload,response);
                                //     // payload.count = payload.items.length

                                //     return {
                                //         ...payload,
                                //         data:{
                                //             count:payload.data.count,
                                //             items:payload.data.rows,
                                //         },
                                //         status: 0,
                                //         msg: 'ok'
                                //     };
                                // }
                            },
                            defaultParams: {
                                skip: 0,
                                limit: 10,
                                order: '-createdAt',
                                // orderBy:'objectId',
                                // orderDir: 'desc',
                                count: 'objectId',
                                where: {
                                    "product": "ec71804a3d", // "d5f1b2dcd8",   
                                }
                            },
                            // "source":"${results}",
                            // perPage: 10,
                            pageField: 'skip',
                            perPageField: 'limit',
                            filter: {
                                body: [
                                    {
                                        mode: 'inline',
                                        name: 'where.devaddr.$regex',
                                        size: 'md',
                                        type: 'input-text',
                                        placeholder: '按单据编号查询'
                                    },
                                    {
                                        name: 'where.name.$regex',
                                        type: 'input-text',
                                        size: 'md',
                                        // minDate: '${starttime}',
                                        placeholder: '按物料名称查询',
                                        // inputClassName: 'w-md',
                                        // format: "YYYY-MM-DD hh:mm:ss"
                                    },
                                    // {
                                    //     name: 'where.content.starttime.$lt',
                                    //     type: 'input-datetime',
                                    //     // maxDate: '${endtime}',
                                    //     placeholder: '结束时间',
                                    //     inputClassName: 'w-md',
                                    //     format: "YYYY-MM//-DD hh:mm:ss"
                                    // },
                                    // {
                                    //     type: 'button',
                                    //     label: '查询',
                                    //     level: 'primary',
                                    //     actionType: 'submit'
                                    // },
                                    { label: '查询', level: 'primary', type: 'submit', size: 'md' },
                                    { label: "重置", type: "reset", size: 'md' }
                                ],
                                title: '',
                                submitText: ''
                            },
                            rowClassNameExpr: "<%= data.detail.payout !=='已派发'? 'bg-light' : '' %>",
                            columns: [
                                {
                                    name: 'devaddr',
                                    label: '单据编号',
                                },
                                {
                                    name: 'content.Type_of_document',
                                    label: '单据类型',
                                },
                                {
                                    name: 'content.Document_date',
                                    label: '单据日期',
                                    width: 120
                                },
                                {
                                    name: 'content.DeviceName',
                                    label: '物料名称',
                                    popOver: {
                                        "trigger": "hover",
                                        "showIcon": false,
                                        "body": "${content.DeviceName}",
                                        "popOverClassName": "min-w-0",
                                        // "position": "left-center-right-center right-center-left-center"
                                        // body: {
                                        //     type: "tpl",
                                        //     tpl: "${name}"
                                        // }
                                    },
                                    className: 'overflow-hidden white-space-nowrap text-overflow-ellipsis',
                                    width: 125
                                },
                               
                                {
                                    name: 'content.Documents_state',
                                    label: '单据状态'
                                },
                                {
                                    name:'content.Specifications',
                                    label:'规格型号',
                                    width: 200
                                },
                                {
                                    name: 'content.Product_type',
                                    label: '产品类型'
                                },
                                {
                                    name: 'content.Material_code',
                                    label: '物料编码'
                                },
                                // {
                                //     name: 'content.material.name',
                                //     label: '物料名称'
                                // },

                                {
                                    name: 'content.Production_workshop',
                                    label: '生产车间'
                                },
                                
                                {
                                    name: 'content.Number',
                                    label: '数量'
                                },
                                // {
                                //     name: 'content.package',
                                //     label: '包装款式',
                                // },
                                // {
                                //     name: 'content.flower',
                                //     label: '花纹',
                                // },
                                // {
                                //     name: 'content.layer',
                                //     label: '层数'
                                // },
                                // {
                                //     name: 'content.prostand',
                                //     label: '产品规格'
                                // },
                                // {
                                //     name: 'content.packsmall',
                                //     label: '小包装',
                                //     width: 80
                                // },
                                // {
                                //     name: 'content.packmb',
                                //     label: '中/大包装',
                                //     width: 80
                                // },
                                {
                                    type: 'operation',
                                    label: '领料清单',
                                    width: 100,
                                    buttons: [
                                        detailsDialog()
                                    ]
                                },
                                {
                                    name: 'content.Unit',
                                    label: '单位'
                                },
                                {
                                    name: 'detail.payout',
                                    label: '业务状态',
                                    width: 80
                                },

                                // {
                                //     name: 'content.step',
                                //     label: '工艺步骤'
                                // },
                                // {
                                //     name: 'content.product',
                                //     label: '生产单元'
                                // },
                                {
                                    name: 'content.personel.label',
                                    label: '派发人员'
                                },                 
                                {
                                    type: 'operation',
                                    label: '操作',
                                    fixed: 'right',
                                    width: 190,
                                    buttons: [
                                        {
                                            type: 'button',
                                            label: '查看',
                                            drawer: {
                                                body: {
                                                    body: [
                                                        {
                                                            name: 'devaddr',
                                                            type: 'static', //'select',
                                                            label: '单据编号',
                                                            // searchable: true,
                                                            extractValue: true,
                                                            required: true,
                                                            labelClassName: 'font-bold'
                                                        },
                                                        // {
                                                        //     name: 'content.material.name',
                                                        //     type: 'input-text', //'select',
                                                        //     label: '产出物料',
                                                        //     searchable: true,
                                                        //     extractValue: true,
                                                        //     required: true
                                                        // },
                                                        {
                                                            name: 'name',
                                                            type: 'static',
                                                            label: '物料名称',
                                                            labelClassName: 'font-bold'
                                                            // required: true,
                                                            // disabledOn: "${false}"
                                                        },
                                                        {
                                                            name: 'content.Material_code',
                                                            type: 'static',
                                                            label: '物料编码',
                                                            labelClassName: 'font-bold',
                                                            // required: true,
                                                            disabledOn: "${false}"
                                                        },
                                                       
                                                        // {
                                                        //     name: 'content.step',
                                                        //     type: 'input-text', //nested-select
                                                        //     label: '工艺步骤',
                                                        //     value: "content.step",
                                                        //     labelField: 'label',
                                                        //     valueField: 'label',
                                                        //     selectMode: "tree",
                                                        //     // source: "/usemock/getgongyi",
                                                        //     required: true
                                                        // },
                                                        // {
                                                        //     name: 'content.starttime',
                                                        //     type: 'input-text',
                                                        //     // minDate: '${starttime}',
                                                        //     // placeholder: '起始时间',
                                                        //     label: '起始时间',
                                                        //     // format: "YYYY-MM-DD hh:mm:ss",
                                                        //     // inputClassName: 'w-md',
                                                        //     // required: true
                                                        // },
                                                        // {
                                                        //     name: 'content.endtime',
                                                        //     type: 'input-text',
                                                        //     label: '结束时间',
                                                        // },
                                                        {
                                                            name: 'content.Number',
                                                            type: 'static',
                                                            label: '计划数量',
                                                            required: true,
                                                            labelClassName: 'font-bold'
                                                        },
                                                        {
                                                            type: "image",
                                                            source:'content.imageUrl',
                                                            // name:'content.imageUrl',
                                                            src: "${content.imageUrl}",
                                                            enlargeAble:true,
                                                            // "thumbMode": "w-full"
                                                        },
                                                        {
                                                            // mode: 'inline',
                                                            name: 'title1',
                                                            type: 'static',
                                                            label: '人员过程',
                                                            value: '',
                                                            labelClassName: 'text-lg p-md font-bold'
                                                        },
                                                        {
                                                            type: "crud",
                                                            source: '${content.personlist}', //"/usemock/device/listAll",
                                                            syncLocation: false,
                                                            columns: [
                                                                {
                                                                    name: "objectId",
                                                                    label: "编号",
                                                                },
                                                                {
                                                                    name: "label",
                                                                    label: "姓名"
                                                                },
                                                            ]
                                                        }
                                                    ],
                                                    type: 'form',
                                                    // initApi: '/iotapi/amis/Device/${objectId}'
                                                },
                                                title: '查看'
                                            },
                                            actionType: 'drawer'
                                        },
                                        distDialog(),
                                        {
                                            api: {
                                                method: 'delete',
                                                url: '/iotapi/amis/Device/${objectId}',
                                                headers: {
                                                    sessionToken: Cookies.get('authorization')
                                                }
                                            },
                                            type: 'button',
                                            label: '删除',
                                            level: 'danger',
                                            actionType: 'ajax',
                                            confirmText: '确认要删除？'
                                        },
                                        {
                                            type: 'button',
                                            label: '任务',
                                            level: 'info',
                                            drawer: {
                                                body: {
                                                    body: [

                                                      
                                                        {
                                                            mode: 'inline',
                                                            name: 'title',
                                                            type: 'static',
                                                            label: '成品信息详情',
                                                            labelClassName: 'text-lg p-md font-bold'
                                                        },
                                                        {
                                                            type: "crud",
                                                            source: '${content.jdinfo.ctaskList}',
                                                            // api: "/usemock/keystep", //"/usemock/device/listAll",
                                                            syncLocation: false,
                                                            headerToolbar: [
                                                                "export-excel",
                                                            ],
                                                            columns: [
                                                                {
                                                                    name: "cdate",
                                                                    label: "日期",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "dingdan",
                                                                    label: "订单号",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "mhour",
                                                                    label: "工长",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "prom",
                                                                    label: "产品型号",
                                                                    groupName: "${devaddr}"
                                                                }, 
                                                                {
                                                                    name: "ymodel",
                                                                    label: "原料型号",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "prostand",
                                                                    label: "产品规格",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "packspec",
                                                                    label: "包装规格",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "pnumber",
                                                                    label: "生产数量",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "rejects",
                                                                    label: "不良品",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "smater",
                                                                    label: "上级原料",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "ymater",
                                                                    label: "剩料",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "fmater",
                                                                    label: "废料",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "machine",
                                                                    label: "机台",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "people",
                                                                    label: "人员",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "subtime",
                                                                    label: "提交时间",
                                                                    groupName: "${devaddr}"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            mode: 'inline',
                                                            name: 'title1',
                                                            type: 'static',
                                                            label: '半成品信息详情',
                                                            value: '',
                                                            labelClassName: 'text-lg p-md font-bold'
                                                        },
                                                        {
                                                            type: "crud",
                                                            source: '${content.jdinfo.btaskList}',
                                                            // api: "/usemock/keystep", //"/usemock/device/listAll",
                                                            syncLocation: false,
                                                            headerToolbar: [
                                                                "export-excel",
                                                            ],
                                                            columns: [
                                                                {
                                                                    name: "bdate",
                                                                    label: "日期",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "dingdan",
                                                                    label: "订单号",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "prom",
                                                                    label: "产品型号",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "bprom",
                                                                    label: "半成品型号",
                                                                    groupName: "${devaddr}"
                                                                },  
                                                                {
                                                                    name: "ymodel",
                                                                    label: "原料型号",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "prostand",
                                                                    label: "产品规格",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "packspec",
                                                                    label: "包装规格",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "pnumber",
                                                                    label: "生产数量",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "rejects",
                                                                    label: "不良品",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "smater",
                                                                    label: "上机原料",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "ymater",
                                                                    label: "剩料",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "fmater",
                                                                    label: "废料",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "machine",
                                                                    label: "机台",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "people",
                                                                    label: "人员",
                                                                    groupName: "${devaddr}"
                                                                }
                                                            ]
                                                        },
                                                    ],
                                                    type: 'form',
                                                },
                                                size: "xl",
                                                title: '查看任务详情'
                                            },
                                            actionType: 'drawer',
                                            visibleOn: "detail.payout=='已派发'"
                                        },
                                    ]
                                }
                            ],
                            headerToolbar: [
                                "export-excel",
                            ],
                            footerToolbar: [
                                // {
                                //     type: 'tpl',
                                //     tpl: '定制内容示例：当前有 ${count} 条数据。',
                                //     className: 'v-middle'
                                // },
                                "switch-per-page",
                                {
                                    align: 'left',
                                    type: 'pagination'
                                },
                                // { align: 'left', type: 'statistics' }
                            ],
                            perPageAvailable: [10, 20, 50, 100, 200],
                            alwaysShowPagination: true,
                            syncLocation: false
                        }
                    ]
                }
            ]
        }
    ],
    style: {
        backgroundColor: ''
    },

    messages: {}
    // bodyClassName: 'bg-light'
};
console.log('打印schema', schema);

export {
    schema
    // ,
    // amisPageName
};
