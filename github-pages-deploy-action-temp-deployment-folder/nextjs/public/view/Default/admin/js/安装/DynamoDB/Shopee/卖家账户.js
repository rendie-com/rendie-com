'use strict';
mssql = mssql.concat([{
    name: "table",
    des: "卖家账户",
    database: "shopee/卖家账户",
    action: "dynamodb",
    table: [
        {
            name: "id",
            type: "S",
            des: "索引"
        },
        {
            name: "withdrawee",
            type: "S",
            des: "提现人"
        },
        {
            name: "company",
            type: "S",
            des: "公司"
        },
        {
            name: "sort",
            type: "N",
            des: "排序"
        },
        {
            name: "username",
            type: "S",
            des: "用户名"
        },
        {
            name: "password",
            type: "S",
            des: "密码"
        },
        {
            name: "cookies",
            type: "S",
            des: "登录用的cookies信息"
        },
        {
            name: "localstorage",
            type: "S",
            des: "登录用的localStorage信息"
        },
        {
            name: "phone",
            type: "S",
            des: "手机"
        },
        {
            name: "note",
            type: "S",
            des: "备注"
        },
        {
            name: "config",
            type: "S",
            des: "配置信息（如：店铺ID，店铺名，等等）"
        },
        {
            name: "addtime",
            type: "N",
            des: "添加时间"
        }
    ]
}
]);