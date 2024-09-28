 'use strict';
mssql = mssql.concat([
   {
        name: "table",
        des: "广告",
        database: "shopee/Shopee广告/广告",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "editStatus",
                type: "tinyint",
                default: "0",
                des: "修改状态（0：未修改；1：第一次修改；2：第二次修改；2：第三次修改；）"
            },
            {
                name: "fromid",
                type: "integer",
                default: "0",
                des: "来源ID"
            },
            {
                name: "daily_budget",
                type: "integer",
                default: "0",
                des: "每日预算"
            },
            {
                name: "total_budget",
                type: "integer",
                default: "0",
                des: "总预算"
            },
            {
                name: "start_time",
                type: "integer",
                default: "0",
                des: "开始时间"
            },
            {
                name: "end_time",
                type: "integer",
                default: "0",
                des: "结束时间"
            },
            {
                name: "state",
                type: "varchar(10)",
                default: "0",
                des: "状态（如：closed）"
            },
            {
                name: "product_placement",
                type: "varchar(10)",
                default: "0",
                des: "搜索广告或关联广告"
            },
            {
                name: "trait_list",
                type: "varchar(50)",
                default: "0",
                des: '商品状态数组（如： ["item_deleted"]）'
            },
            {
                name: "image",
                type: "varchar(50)",
                default: "",
                des: "图片"
            },
            {
                name: "title",
                type: "varchar(255)",
                default: "0",
                des: "标题"
            },
            {
                name: "type",
                type: "varchar(10)",
                default: "0",
                des: "状态（如：keyword）"
            },
            {
                name: "key_uptime",
                type: "integer",
                default: "0",
                des: "新增关键词更新时间"
            },
            {
                name: "productID",
                type: "integer",
                default: "",
                des: "商品ID(知道商品ID方便找到广告)"
            },
            {
                name: "report_impression",
                type: "integer",
                default: "",
                des: "浏览数"
            },
            {
                name: "report_click",
                type: "integer",
                default: "",
                des: "点击数"
            },
            {
                name: "keywords",
                type: "text",
                default: "",
                des: "搜索商品联想的关键词"
            },
            {
                name: "site",
                type: "varchar(3)",
                default: "",
                des: "站点---主要记录是来至哪个站点（如：my,br等）"
            },
        ]
    }, 
     {
        name: "table",
        des: " 关键词",
        database: "shopee/Shopee广告/关键词",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "site",
                type: "varchar(3)",
                default: "",
                des: "站点---主要记录是来至哪个站点（如：my,br等）"
            },
            {
                name: "keyword",
                type: "varchar(100)",
                default: "0",
                des: "关键词"
            },
            {
                name: "cn_keyword",
                type: "varchar(100)",
                default: "0",
                des: "翻译后关键词"
            },
            {
                name: "recommended_price",
                type: "integer",
                default: "0",
                des: "推荐出价（注：这个价格要*0.00001）"
            },
            {
                name: "search_volume",
                type: "integer",
                default: "0",
                des: "搜索量"
            },
            {
                name: "relevance",
                type: "tinyint",
                default: "0",
                des: "品质分数"
            },
            {
                name: "productIdArr",
                type: "text",
                default: "",
                des: "品质分数"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "更新时间"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
        ]
    },
]);
