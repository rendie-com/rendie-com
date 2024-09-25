'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "优惠券",
        database: "shopee/营销中心/优惠券",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "name",
                type: "varchar(100)",
                default: "",
                des: "优惠券名称（优惠券名称对买家不可见）"
            },
            {
                name: "voucher_id",
                type: "integer",
                default: "0",
                des: "优惠券ID"
            },
            {
                name: "voucher_code",
                type: "varchar(100)",
                default: "",
                des: "优惠码（如：REND04025）"
            },
            {
                name: "start_time",
                type: "integer",
                default: "0",
                des: "优惠券领取期限-开始时间"
            },
            {
                name: "end_time",
                type: "integer",
                default: "0",
                des: "优惠券领取期限-结束时间"
            },
            {
                name: "discount",
                type: "integer",
                default: "0",
                des: "折扣（如：25）"
            },
            {
                name: "usage_quantity",
                type: "integer",
                default: "0",
                des: "可使用总数（如：3张）"
            },
            {
                name: "fe_display_coin_amount",
                type: "integer",
                default: "0",
                des: "Shopee币回扣（如：2000 Shopee币）"
            },
            {
                name: "value",
                type: "numeric(10,2)",
                default: "0",
                des: "折扣金额（如：1.00）"
            },
            {
                name: "min_price",
                type: "numeric(10,2)",
                default: "0",
                des: "最低消费金额（如：250.00）"
            },
            {
                name: "max_value",
                type: "numeric(10,2)",
                default: "0",
                des: "最高上限数额（如：10.00）"
            },
            {
                name: "rule",
                type: "text",
                default: "",
                des: "规则（是对象）"
            },
            {
                name: "site",
                type: "varchar(3)",
                default: "",
                des: "站点---主要记录是来至哪个站点（如：my,br等）"
            },
            {
                name: "fe_status",
                type: "tinyint",
                default: "0",
                des: "状态(1:表示接下来的活动；2：表示进行中的活动；3：表示已过期)"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "修改时间"
            }
        ]
    },
    {
        name: "table",
        des: "折扣",
        database: "shopee/营销中心/折扣",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "title",
                type: "varchar(100)",
                default: "",
                des: "折扣名称（如：【14】打折 2024-04-28）"
            },
            {
                name: "promotion_id",
                type: "integer",
                default: "0",
                des: "促销id"
            },
            {
                name: "status",
                type: "tinyint",
                default: "0",
                des: "状态"
            },
            {
                name: "start_time",
                type: "integer",
                default: "0",
                des: "折扣活动-开始时间"
            },
            {
                name: "end_time",
                type: "integer",
                default: "0",
                des: "折扣活动-结束时间"
            },
            {
                name: "images",
                type: "text",
                default: "",
                des: "商品图片（如： [\"cn-11134207-7r98o-lsmgvtacu6zh1f\"]）"
            },
            {
                name: "total_product",
                type: "integer",
                default: "0",
                des: "商品总数"
            },
            {
                name: "site",
                type: "varchar(3)",
                default: "",
                des: "站点---主要记录是来至哪个站点（如：my,br等）"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
        ]
    },
    {
        name: "table",
        des: "店内秒杀",
        database: "shopee/营销中心/店内秒杀",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "flash_sale_id",
                type: "integer",
                default: "0",
                des: "限时抢购ID"
            },
            {
                name: "status",
                type: "tinyint",
                default: "0",
                des: "状态"
            },
            {
                name: "start_time",
                type: "integer",
                default: "0",
                des: "折扣活动-开始时间"
            },
            {
                name: "end_time",
                type: "integer",
                default: "0",
                des: "折扣活动-结束时间"
            },
            {
                name: "site",
                type: "varchar(3)",
                default: "",
                des: "站点---主要记录是来至哪个站点（如：my,br等）"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "item_count",
                type: "integer",
                default: "0",
                des: "商品数量"
            },
            {
                name: "timeslot_id",
                type: "integer",
                default: "0",
                des: "未知"
            },
            {
                name: "type",
                type: "integer",
                default: "0",
                des: "未知"
            },
        ]
    },
    {
        name: "table",
        des: "加购优惠",
        database: "shopee/营销中心/加购优惠",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "add_on_deal_id",
                type: "numeric(18,0)",
                default: "0",
                des: "加购优惠ID"
            },
            {
                name: "add_on_deal_name",
                type: "varchar(100)",
                default: "",
                des: "加购优惠名称"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "start_time",
                type: "integer",
                default: "0",
                des: "活动开始时间"
            },
            {
                name: "end_time",
                type: "integer",
                default: "0",
                des: "活动结束时间"
            },
            {
                name: "sub_item_limit",
                type: "tinyint",
                default: "0",
                des: "未知"
            },
            {
                name: "sub_item_priority",
                type: "text",
                default: "",
                des: "未知"
            },
            {
                name: "sub_type",
                type: "tinyint",
                default: "0",
                des: "未知"
            },
            {
                name: "purchase_min_spend",
                type: "numeric(8,2)",
                default: "0",
                des: "未知"
            },
            {
                name: "per_gift_num",
                type: "tinyint",
                default: "0",
                des: "每份礼物数量"
            },
            {
                name: "source",
                type: "tinyint",
                default: "0",
                des: "未知"
            },
            {
                name: "status",
                type: "tinyint",
                default: "0",
                des: "未知"
            },
            {
                name: "site",
                type: "varchar(3)",
                default: "",
                des: "站点---主要记录是来至哪个站点（如：my,br等）"
            },
        ]
    },

]);