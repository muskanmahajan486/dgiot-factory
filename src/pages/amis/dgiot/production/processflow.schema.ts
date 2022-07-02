import classnames from 'classnames';
import Cookies from 'js-cookie';
import { FormClassName } from '@/amis-types';
import { FormatTime, getTime } from '@/utils/utils'
//36d6cc689d 工艺流程
// 详情对话框
function detailsDialog() {
  return {
    type: 'button',
    label: '查看',
    level: 'info',
    // size: 'xs',
    actionType: 'dialog',
    dialog: {
      title: '查看关键工艺参数 ',
      closeOnEsc: true,
      actions: [{ type: 'button', label: '关闭', level: 'primary', actionType: 'close' }],
      body: {
        type: 'service',
        api: '/usemock/keystep',
        className: classnames(FormClassName.label5x),
        body: [
          {
            type: "table",
            title: "工艺参数",
            source: "$list",
            style: "hieght:150px",
            columns: [
              {
                name: "name",
                label: "参数名称",
                width: 80
              },
              {
                name: "value",
                label: "参数值",
                width: 80
              }
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
    label: '出库',
    level: 'success',
    // size: 'xs',
    actionType: 'dialog',
    dialog: {
      // size: 'xs',
      title: '订单出库',
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
          url: "/iotapi/amis/Device1/${objectId}", ///${objectId}
          requestAdaptor: function (api: any) {
            console.log('api.data',api.data);

            let setAcl = {}
            setAcl['role:' + api.data.dept] = {
              "read": true,
              "write": true
            }
            let ctt = api.data.content
            ctt.personel = api.data.dept
            return {
              ...api,
              data: {
                content: ctt, // 获取暴露的 api 中的 data 变量
                //   foo: 'bar' // 新添加数据
                // "ACL": {
                //     "role:开发者": {
                //         "read": true,
                //         "write": true
                //     }
                // },
                // "content":{

                // },
                "ACL": setAcl,
                "detail": {
                  payout: "已派发"
                },
                "devaddr": `工厂_devaddr_${new Date().getTime()}`,
                "isEnable": true,
                "name": `工厂_name_${new Date().getTime()}`,
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
          { type: 'static', name: 'devaddr', label: '单据编号' },
          { name: 'ACL', type: 'input-text', visibleOn: "false", label: '权限' },
          {
            "label": "审核",
            "type": "select",
            "name": "isaudit",
            "options": [
              {
                "label": "合格",
                "value": "合格"
              },
              {
                "label": "不合格",
                "value": "不合格"
              }
            ],
            required: true
          },
          {
            label: '审核意见',
            type: 'input-text',
            name: 'objection',
            value: '合格通过'
          },
          {
            name: 'dept',
            type: 'nested-select',
            label: '派发人员',
            labelField: 'label',
            valueField: 'value',
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
          // { type: 'text', name: 'content.mynumber', label: '派发数量' },
        ]
      }
    },
    visibleOn: "content.jdinfo.dcheck=='待审核'"
  };
}

//新建
function created() {
  return {
    type: 'button',
    label: '新建',
    icon: 'fa fa-plus pull-left',
    level: 'primary',
    className: 'm-b-sm',
    drawer: {
      body: {
        api: {
          method: 'post',
          url: '/iotapi/amis/Device',

          // headers: {
          //     sessionToken: Cookies.get('authorization')
          // },
          requestAdaptor: function (api: any) {
            // let setAcl = {}
            // setAcl['role:'+api.data.dept] = {
            //     "read": true,
            //     "write": true
            // }
            let ctt = api.data.content
            ctt.code = "GYB" + new Date().getTime()
            ctt.starttime = getTime()
            return {
              ...api,
              data: {
                ...api.data, // 获取暴露的 api 中的 data 变量
                //   foo: 'bar' // 新添加数据
                "ACL": {
                  "role:开发者": {
                    "read": true,
                    "write": true
                  }
                },
                // "detail": { 
                // },
                "content": ctt,
                // "devaddr": `GYB${new Date().getTime()}`,
                "isEnable": true,
                "name": `工艺流程_name_${new Date().getTime()}`,
                "profile": {},
                "route": {},
                product: {
                  className: "Product",
                  objectId: "36d6cc689d",
                  __type: "Pointer"
                }
              }
            };
          },
        },
        // api: {
        //     method: 'put',
        //     url: '/iotapi/amis/Device/${objectId}',

        //     headers: {
        //         sessionToken: Cookies.get('authorization')
        //     },
        //     requestAdaptor: function (api: any) {
        //         return {
        //             ...api,
        //             data: {
        //                 ...api.data, // 获取暴露的 api 中的 data 变量
        //                 //   foo: 'bar' // 新添加数据
        //                 "ACL": {
        //                     "role:开发者": {
        //                         "read": true,
        //                         "write": true
        //                     }
        //                 },
        //                 "detail": {},
        //                 "devaddr": `工厂_devaddr_${new Date().getTime()}`,
        //                 "isEnable": true,
        //                 "name": `工厂_name_${new Date().getTime()}`,
        //                 "profile": {},
        //                 "route": {},
        //                 product: {
        //                     className: "Product",
        //                     objectId: "d5f1b2dcd8",
        //                     __type: "Pointer"
        //                 }
        //             }
        //         };
        //     },
        // },

        body: [
          {
            name: 'content.proname',
            type: 'input-text', //'select',
            label: '工艺名称',
            // searchable: true,
            // extractValue: true,
            // source: {
            //     method: "get",
            //     url: "/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
            //     data: whereData,

            //     // requestAdaptor:function (api:any){
            //     //     return {
            //     //         ...api.data,
            //     //         data:{
            //     //             ...api.data,
            //     //             where:{
            //     //                 "type":"metaData"
            //     //                 }
            //     //         }
            //     //     }
            //     // },

            //     // Adaptor: function (payload:any, response:any, api:any) {
            //     //     return {
            //     //       ...payload,
            //     //        data: {
            //     //         // ...payload, // 获取暴露的 api 中的 data 变量
            //     //         where:{
            //     //             "type":"metaData"
            //     //         }
            //     //        }
            //     //     };
            //     //   },
            //     responseData: {
            //         options: "${items|pick:label~data.name,value~data}"
            //     }
            // },
            // deferApi: "/usemock/device/listAll",
            required: true
          },
          {
            name: 'devaddr',
            type: 'input-text', //nested-select
            label: '计划编号',
            value: `GYB${new Date().getTime()}`,
            // labelField: 'label',
            // valueField: 'label',
            // selectMode: "tree",
            // source: "/usemock/getgongyi",
            required: true
          },
          // {
          //   name: 'content.code',
          //   type: 'input-text',
          //   label: '唯一码',
          //   // required: true,
          //   disabledOn: "${false}"
          // },
          {
            name: 'content.fin_product',
            type: 'input-text', //nested-select
            label: '选择成品',
            // labelField: 'label',
            // valueField: 'label',
            // selectMode: "tree",
            // source: "/usemock/getgongyi",
            required: true
          },
          {
            name: 'content.step',
            type: 'input-text',
            label: '工序',
            required: true
          },
          {
            mode: 'inline',
            name: 'title1',
            type: 'static',
            label: '工序清单',
            // value: '',
            labelClassName: 'text-lg p-md font-bold'
          },
          {
            type: "crud",
            api: "/usemock/keystep", //"/usemock/device/listAll",
            syncLocation: false,
            name: 'detail',
            columns: [

              {
                name: "name",
                label: "参数名称"
              },
              {
                name: "value",
                label: "参数值"
              },
              {
                type: "operation",
                label: "操作",
                buttons: [
                  {
                    label: "删除",
                    type: "button",
                    actionType: "ajax",
                    level: "danger",
                    confirmText: "确认要删除？",
                    // api: {
                    //     method: 'delete',
                    //     url: '/iotapi/amis/Device/${objectId}',
                    //     headers:{
                    //         sessionToken:Cookies.get('authorization')
                    //     }
                    // },
                    // api: "delete:/amis/api/mock2/sample/${id}"
                  }
                ]
              }
            ]
          }
        ],
        type: 'form',
        // initApi: '/iotapi/amis/Device/${objectId}'
      },
      title: '新增数据'
    },
    actionType: 'drawer'
  }
}

const whereData = {
  // skip: 0,
  // limit: 20,
  keys: "objectId,title,data",
  // order: "-createdAt",
  where: {
    parent: '36d6cc689d'
  }

}
const schema = {
  type: 'page',
  data: {
    "userid": window.location
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
              label: '派发工单管理',
              labelClassName: 'text-lg p-md font-bold'
            }
          ],
          columnClassName: 'bg-white'
        },
        {
          body: [
            // created(),
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
              defaultParams: {
                skip: 1,
                limit: 10, order: '-updatedAt',
                count: 'objectId',
                where: { "product": "ec71804a3d" }
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
                {
                  name: 'where.content.Documents_state',
                  type: 'input-text',
                  placeholder: '审核状态查询',
                  size: 'md',
                  
                },
                  // {
                  //   name: 'endtime',
                  //   type: 'input-datetime',
                  //   maxDate: '${endtime}',
                  //   placeholder: '结束时间',
                  //   inputClassName: 'w-md',
                  //   format: "YYYY-MM-DD hh:mm:ss"
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
              // rowClassNameExpr: "<%= data.detail.payout !=='已派发'? 'bg-light' : '' %>",
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
                // {
                //   name: 'content.personel.label',
                //   label: '当前人员',
                // },
                {
                  name: 'content.Product_type',
                  label: '产品类型'
                },
                {
                  name: 'content.Number',
                  label: '生产数量',
                },
                {
                  name: "content.jdinfo.isstart",
                  type: "mapping",
                  label: '工单生产状态',
                  map: {
                    "已完成": "<span class='label label-info'>已完成</span>",
                    "合格": "<span class='label label-success'>合格</span>",
                    "加工中": "<span class='label label-warning'>加工中</span>",
                    "*": "<span class='label label-danger'>未开始</span>",
                  }
                },
                {
                  name: 'content.jdinfo.taskstart',
                  label: '任务开工时间'
                },
                {
                  name: 'content.jdinfo.taskend',
                  label: '任务完工时间'
                },
                {
                  name: 'content.jdinfo.mhour',
                  label: '工期'
                },
                {
                  name: "content.jdinfo.dcheck",
                  label: "审核状态",
                  type: "mapping",
                  map: {
                    "待审核": "<span class='label label-info'>待审核</span>",
                    "合格": "<span class='label label-success'>合格</span>",
                    "不合格": "<span class='label label-danger'>不合格</span>",
                  }
                },
                {
                  type: 'operation',
                  label: '操作',
                  buttons: [
                    {
                      type: 'button',
                      label: '查看',
                      drawer: {
                        body: {
                          body: [
                            {
                              name: 'devaddr',
                              type: 'static',
                              label: '单据编号',
                              labelClassName: 'font-bold'
                              // required: true,
                              // disabledOn: "false"
                            },
                            {
                              name: 'content.Material_code',
                              type: 'static', //'select',
                              label: '物料编号',
                              searchable: true,
                              extractValue: true,
                              labelClassName: 'font-bold'
                              // required: true
                            },
                            {
                              name: 'content.DeviceName',
                              type: 'static', //nested-select
                              label: '物料名称',
                              // value: "content.step",
                              labelField: 'label',
                              valueField: 'label',
                              selectMode: "tree",
                              labelClassName: 'font-bold',
                              // source: "/usemock/getgongyi",
                              required: true
                            },
                            {
                              name: 'content.Number',
                              type: 'static',
                              // value: "${content.material}",
                              label: '计划生产数量',
                              labelClassName: 'font-bold'
                            },
                            {
                              name: 'content.jdinfo.process',
                              type: 'static',
                              // value: "${content.material}",
                              label: '实际生产数量',
                              labelClassName: 'font-bold'
                            },
                            {
                              name: 'content.jdinfo.isstart',
                              type: 'static',
                              // value: "${content.material}",
                              label: '任务状态',
                              labelClassName: 'font-bold'
                            },
                            {
                              name: 'content.jdinfo.taskstart',
                              type: 'static',
                              label: '任务开始时间',
                              labelClassName: 'font-bold'
                            },
                            {
                              name: 'content.jdinfo.taskend',
                              type: 'static',
                              label: '任务结束时间',
                              labelClassName: 'font-bold'
                            },
                          ],
                          type: 'form',
                          // initApi: '/iotapi/amis/Device/${objectId}'
                        },
                        title: '查看'
                      },
                      actionType: 'drawer'
                    },
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
                    distDialog(),
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
                      // visibleOn: "detail.payout=='已派发'"
                    },
                  ]
                }
              ],
              headerToolbar: [],
              footerToolbar: [
                // {
                //     type: 'tpl',
                //     tpl: '定制内容示例：当前有 ${count} 条数据。',
                //     className: 'v-middle'
                // },
                {
                  align: 'left',
                  type: 'pagination'
                },
                { align: 'left', type: 'statistics' }
              ],
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
export {
  schema
  // ,
  // amisPageName
};
