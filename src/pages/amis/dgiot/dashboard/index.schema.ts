// import classnames from 'classnames';
// import { FormClassName } from '@/amis-types';
// import { enum2object } from '@/utils/enum';
// import { orderTypeMapper, payStatusMapper, payTypeMapper, statusMapper } from '../../enum-data';
// import { serverHost } from '../../server-api';

const schema = {
    "title": "15616",
    data:{
        "objectId":window.location
        },
    "body": [
        {
            "type": "grid",
            "columns": [
                {
                    "type": "panel",
                    "title": "本地配置示例 支持交互${objectId}",
                    "name": "chart-local",
                    "body": [
                        {
                            "type": "chart",
                            "config": {
                                "title": {
                                    "text": "极坐标双数值轴"
                                },
                                "legend": {
                                    "data": [
                                        "line"
                                    ]
                                },
                                "polar": {
                                    "center": [
                                        "50%",
                                        "54%"
                                    ]
                                },
                                "tooltip": {
                                    "trigger": "axis",
                                    "axisPointer": {
                                        "type": "cross"
                                    }
                                },
                                "angleAxis": {
                                    "type": "value",
                                    "startAngle": 0
                                },
                                "radiusAxis": {
                                    "min": 0
                                },
                                "series": [
                                    {
                                        "coordinateSystem": "polar",
                                        "name": "line",
                                        "type": "line",
                                        "showSymbol": false,
                                        "data": [
                                            [
                                                0,
                                                0
                                            ],
                                            [
                                                0.03487823687206265,
                                                1
                                            ],
                                            [
                                                0.06958655048003272,
                                                2
                                            ],
                                            [
                                                0.10395584540887964,
                                                3
                                            ],
                                            [
                                                0.13781867790849958,
                                                4
                                            ],
                                            [
                                                0.17101007166283433,
                                                5
                                            ],
                                            [
                                                0.2033683215379001,
                                                6
                                            ],
                                            [
                                                0.2347357813929454,
                                                7
                                            ],
                                            [
                                                0.26495963211660245,
                                                8
                                            ],
                                            [
                                                0.2938926261462365,
                                                9
                                            ],
                                            [
                                                0.3213938048432697,
                                                10
                                            ]
                                        ]
                                    }
                                ],
                                "animationDuration": 2000
                            },
                            "clickAction": {
                                "actionType": "dialog",
                                "dialog": {
                                    "title": "详情",
                                    "body": [
                                        {
                                            "type": "tpl",
                                            "tpl": "<span>当前选中值 ${value|json}<span>"
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "panel",
                    "title": "远程图表示例(返回值带function)",
                    "className":'fw-b',
                    "name": "chart-remote",
                    "body": [
                        // {
                        //     "type": "chart",
                        //     "api": "/amis/api/mock2/chart/chart1"
                        // }
                        {
                            "type": "chart",
                            "config": {
                              "xAxis": {
                                "data": [
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Fri",
                                  "Sat",
                                  "Sun"
                                ],
                                "type": "category"
                              },
                              "yAxis": {
                                "type": "value"
                              },
                              "series": [
                                {
                                  "data": [
                                    820,
                                    932,
                                    901,
                                    934,
                                    1290,
                                    1330,
                                    1320
                                  ],
                                  "type": "bar"
                                }
                              ]
                            },
                            "replaceChartOption": true
                          }
                    ]
                }
            ]
        }
    ]
};

export {
    schema
    // ,
    // amisPageName
};
