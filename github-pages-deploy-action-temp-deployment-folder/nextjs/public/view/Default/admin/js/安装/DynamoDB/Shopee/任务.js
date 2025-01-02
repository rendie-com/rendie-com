'use strict';
mssql = mssql.concat([{
    name: "table",
    des: "定时任务",
    database: "shopee/任务/定时任务",
    action: "dynamodb",
    table: [
        {
            name: "id",
            type: "S",
            des: "索引"
        },
        {
            name: "taskname",
            type: "S",
            des: "名称"
        },
        {
            name: "priority",
            type: "N",
            des: "优先级"
        },
        {
            name: "runcycle",
            type: "N",
            des: "执行周期"
        },
        {
            name: "isenable",
            type: "N",
            des: "是否启用"
        },
        {
            name: "addtime",
            type: "N",
            des: "添加时间"
        },
        {
            name: "jsfile",
            type: "S",
            des: "js文件"

        },
        {
            name: "runtime",
            type: "N",
            des: "运行时间"
        },
        {
            name: "nexttime",
            type: "N",
            des: "下次运行时间"
        },
        {
            name: "remark",
            type: "S",
            des: "备注"
        }
    ]
},
]);