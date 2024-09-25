'use strict';
mssql = mssql.concat([
    // {
    //     name: "keyword",
    //     des: " 关键词",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //         {
    //             name: "keyword",
    //             type: "varchar(100)",
    //             default: "0",
    //             des: "关键词"
    //         },
    //         {
    //             name: "cn_keyword",
    //             type: "varchar(100)",
    //             default: "0",
    //             des: "翻译后关键词"
    //         },
    //         {
    //             name: "recommended_price",
    //             type: "integer",
    //             default: "0",
    //             des: "推荐出价（注：这个价格要*0.00001）"
    //         },
    //         {
    //             name: "search_volume",
    //             type: "integer",
    //             default: "0",
    //             des: "搜索量"
    //         },
    //         {
    //             name: "relevance",
    //             type: "smallint",
    //             default: "0",
    //             des: "品质分数"
    //         },
    //         {
    //             name: "productIdArr",
    //             type: "text",
    //             default: "",
    //             des: "品质分数"
    //         },
    //         {
    //             name: "uptime",
    //             type: "integer",
    //             default: "0",
    //             des: "更新时间"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //     ]
    // },
    // {
    //     name: "buyer",
    //     des: "买家账户",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "sort",
    //             type: "integer",
    //             default: "0",
    //             des: "排序"
    //         },
    //         {
    //             name: "UserName",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "用户名（登录用的）"
    //         },
    //         {
    //             name: "mail",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "邮箱（如：huangxingjl03@gmail.com）"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(5)",
    //             default: "",
    //             des: "名称（如：my）"
    //         },
    //         {
    //             name: "loginMode",
    //             type: "varchar(50)",
    //             default: "",
    //             des: "登录方式（如：GitHub）"
    //         },
    //         {
    //             name: "password",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "密码"
    //         },
    //         {
    //             name: "note",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "备注"
    //         },
    //         {
    //             name: "cookies",
    //             type: "text",
    //             default: "",
    //             des: "登录用的cookies信息"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         }
    //     ]
    // },
    // {
    //     name: "orders",
    //     des: "订单",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "DomesticWaybill",
    //             type: "text",
    //             default: "",
    //             des: "站点国内运单号（如：json）"
    //         },
    //         {
    //             name: "seller_income_breakdown",
    //             type: "text",
    //             default: "",
    //             des: "卖家价格明细（如：json）"
    //         },
    //         {
    //             name: "buyer_payment_breakdown",
    //             type: "text",
    //             default: "",
    //             des: "买家价格明细（如：json）"
    //         },
    //         {
    //             name: "package_number",
    //             type: "varchar(30)",
    //             default: "",
    //             des: "包裹编号（如：OFG172202595203743）---获取国内运单号要用"
    //         },
    //         {
    //             name: "tracking_number",
    //             type: "varchar(30)",
    //             default: "",
    //             des: "国外运单号（如：MY240967550364Y）"
    //         },
    //         {
    //             name: "tracking_info",
    //             type: "text",
    //             default: "",
    //             des: "国外物流信息"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //         {
    //             name: "shop_id",
    //             type: "integer",
    //             default: "0",
    //             des: "店铺ID（如：896010703）---主要记录是来至哪个站点ID（说明：一个站点，可以有多个店铺。）"
    //         },
    //         {
    //             name: "user_id",
    //             type: "integer",
    //             default: "0",
    //             des: "用户ID（如：40156834）---还不知道有什么用"
    //         },
    //         {
    //             name: "order_id",
    //             type: "varchar(20)",
    //             default: "",
    //             des: "订单ID（如：172202594288609）---还不知道有什么用"
    //         },
    //         {
    //             name: "order_sn",
    //             type: "varchar(20)",
    //             default: "",
    //             des: "订单编号（如：2406165VNRY0Y1）---这个能在网页中看到"
    //         },
    //         {
    //             name: "total_price",
    //             type: "numeric(8,3)",
    //             default: "0",
    //             des: "订单总价（如：25.23）---这个能在网页中看到"
    //         },
    //         {
    //             name: "shipping_method",
    //             type: "integer",
    //             default: "0",
    //             des: "装运_方法（如：28016）---还不知道有什么用"
    //         },
    //         {
    //             name: "shipping_address",
    //             type: "varchar(20)",
    //             default: "",
    //             des: "发货地址（如：NO******）-----这个能在网页中看到"
    //         },
    //         {
    //             name: "shipping_fee",
    //             type: "numeric(8,3)",
    //             default: "0",
    //             des: "总运费（如：2.23）---卖家运费+买家运费=2.10+0.13=2.23----------这个好像是买家出的"
    //         },
    //         {
    //             name: "actual_carrier",
    //             type: "varchar(50)",
    //             default: "",
    //             des: "物流公司（如：Standard Delivery）"
    //         },
    //         {
    //             name: "order_type",
    //             type: "smallint",
    //             default: "0",
    //             des: "订单类型（如：2）---还不知道有什么用"
    //         },
    //         {
    //             name: "payment_method",
    //             type: "smallint",
    //             default: "0",
    //             des: "付款方式（如：4）"
    //         },
    //         {
    //             name: "payment_method_name",
    //             type: "varchar(50)",
    //             default: "",
    //             des: "付款方式名称（如：Online Banking）"
    //         },
    //         {
    //             name: "remark",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "买家备注"
    //         },
    //         {
    //             name: "status",
    //             type: "smallint",
    //             default: "",
    //             des: "状态（如：2）---还不知道有什么用"
    //         },
    //         {
    //             name: "create_time",
    //             type: "integer",
    //             default: "0",
    //             des: "创建时间（如：1718503395）----下单时间"
    //         },
    //         {
    //             name: "delivery_time",
    //             type: "integer",
    //             default: "0",
    //             des: "交货_时间（如：0）----发完货就有数据了，但好像是一天，还不知道有什么用"
    //         },
    //         {
    //             name: "complete_time",
    //             type: "integer",
    //             default: "0",
    //             des: "完成时间（如：0）"
    //         },
    //         {
    //             name: "pickup_time",
    //             type: "integer",
    //             default: "0",
    //             des: "拾取时间（如：0）"
    //         },
    //         {
    //             name: "shipping_confirm_time",
    //             type: "integer",
    //             default: "0",
    //             des: "发货_确认_时间（如：1718503456）----可能是买家的付款时间"
    //         },
    //         {
    //             name: "arrange_pickup_by_date",
    //             type: "integer",
    //             default: "0",
    //             des: "安排提货日期（如：0）---------还不知道有什么用"
    //         },
    //         {
    //             name: "auto_cancel_3pl_ack_date",
    //             type: "integer",
    //             default: "0",
    //             des: "订单自动取消的时间（如：1718983800）--------超过这个时间被扫描算迟发货"
    //         },
    //         {
    //             name: "auto_cancel_arrange_ship_date",
    //             type: "integer",
    //             default: "0",
    //             des: "自动取消安排发货日期（如：1718724600）-----超过这个时间没填国内运单算迟发货"
    //         },
    //         {
    //             name: "buyer_is_rated",
    //             type: "numeric(8,3)",
    //             default: "0",
    //             des: "买方报价（如：0）-----还不知道有什么用"
    //         },
    //         {
    //             name: "buyer_last_change_address_time",
    //             type: "integer",
    //             default: "0",
    //             des: "购买者最后更改地址时间（如：0）"
    //         },
    //         {
    //             name: "buyer_txn_fee",
    //             type: "numeric(8,3)",
    //             default: "0",
    //             des: "买方txn费用（如：0.00）-----还不知道有什么用"
    //         },
    //         {
    //             name: "buyer_cancel_reason",
    //             type: "smallint",
    //             default: "0",
    //             des: "购买者取消原因（如：0）"
    //         },
    //         {
    //             name: "cancel_time",
    //             type: "integer",
    //             default: "0",
    //             des: "取消时间（如：0）"
    //         },
    //         {
    //             name: "cancel_userid",
    //             type: "integer",
    //             default: "0",
    //             des: "取消用户ID（如：0）-----还不知道有什么用"
    //         },
    //         {
    //             name: "coin_offset",
    //             type: "numeric(8,3)",
    //             default: "0",
    //             des: "可能是shopee币（如：0.00）"
    //         },
    //         {
    //             name: "escrow_release_time",
    //             type: "integer",
    //             default: "0",
    //             des: "等待买家在2024/06/27前点选完成订单（如：1719329400）-----在网页可见"
    //         },
    //         {
    //             name: "pickup_cutoff_time",
    //             type: "integer",
    //             default: "0",
    //             des: "拾取截止时间（如：0）----买家取货时间"
    //         },
    //         {
    //             name: "shipping_proof",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "装运证明（如：）----还不知道有什么用"
    //         },
    //         {
    //             name: "shipping_proof_status",
    //             type: "smallint",
    //             default: "0",
    //             des: "发货_发货_状态（如：0）----还不知道有什么用"
    //         },
    //         {
    //             name: "payby_date",
    //             type: "integer",
    //             default: "0",
    //             des: "买家付款的超时时间，就是买家的最晚付款时间。（如：1718524995）"
    //         },
    //         {
    //             name: "price_before_discount",
    //             type: "numeric(8,3)",
    //             default: "0",
    //             des: "价格优惠（如：25.23）------还不知道有什么用"
    //         },
    //         {
    //             name: "ship_by_date",
    //             type: "integer",
    //             default: "0",
    //             des: "发货日期（如：1718724600）----还不知道有什么用，但和发货取消时间相同"
    //         },
    //         {
    //             name: "voucher_absorbed_by_seller",
    //             type: "smallint",
    //             default: "0",
    //             des: "是否用了优惠券（如：true）"
    //         },
    //         {
    //             name: "voucher_code",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "优惠券码（如：CHOI06161;FSV-902389432057872）"
    //         },
    //         {
    //             name: "coins_cash_by_voucher",
    //             type: "numeric(8,3)",
    //             default: "0",
    //             des: "优惠金额（如：0.69）"
    //         },
    //         {
    //             name: "buyer_address_name",
    //             type: "varchar(20)",
    //             default: "",
    //             des: "买家地址名称（如：R******P）------这个能在网页中看到"
    //         },
    //         {
    //             name: "buyer_address_phone",
    //             type: "varchar(20)",
    //             default: "",
    //             des: "买家地址手机号（如：******35）------这个能在网页中看到"
    //         },
    //         {
    //             name: "order_items",
    //             type: "text",
    //             default: "",
    //             des: "订单商品信息（如：json）----这个能在网页中看到"
    //         },
    //         {
    //             name: "buyer_user",
    //             type: "text",
    //             default: "",
    //             des: "买家账号信息（如：json）------这个能在网页中看到"
    //         },
    //     ]
    // },
    
    // {
    //     name: "similarProduct",
    //     des: "类似产品",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //         {
    //             name: "l1_cat_id",
    //             type: "integer",
    //             default: "0",
    //             des: "一级类目"
    //         },
    //         {
    //             name: "l2_cat_id",
    //             type: "integer",
    //             default: "0",
    //             des: "二级类目"
    //         },
    //         {
    //             name: "l3_cat_id",
    //             type: "integer",
    //             default: "0",
    //             des: "三级类目"
    //         },
    //         {
    //             name: "item_id",
    //             type: "integer",
    //             default: "0",
    //             des: "商品ID"
    //         },
    //         {
    //             name: "min_price",
    //             type: "numeric(10,4)",
    //             default: "0",
    //             des: "最低金额（如：250.00）"
    //         },
    //         {
    //             name: "max_price",
    //             type: "numeric(10,4)",
    //             default: "0",
    //             des: "最高金额（如：250.00）"
    //         },
    //         {
    //             name: "price",
    //             type: "numeric(10,4)",
    //             default: "0",
    //             des: "显示金额（如：250.00）"
    //         },
    //         {
    //             name: "image",
    //             type: "varchar(50)",
    //             default: "",
    //             des: "图片"
    //         },
    //         {
    //             name: "title",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "标题"
    //         },
    //         {
    //             name: "status",
    //             type: "smallint",
    //             default: "0",
    //             des: "状态（如：1）"
    //         },
    //         {
    //             name: "ManualReviewStatus",
    //             type: "smallint",
    //             default: "0",
    //             des: "人工审核状态"
    //         },
    //         {
    //             name: "similarProduct",
    //             type: "text",
    //             default: "",
    //             des: "类似产品"
    //         },
    //     ]
    // },
    // {
    //     name: "ads",
    //     des: "广告",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "editStatus",
    //             type: "smallint",
    //             default: "0",
    //             des: "修改状态（0：未修改；1：第一次修改；2：第二次修改；2：第三次修改；）"
    //         },
    //         {
    //             name: "fromid",
    //             type: "integer",
    //             default: "0",
    //             des: "来源ID"
    //         },
    //         {
    //             name: "daily_budget",
    //             type: "integer",
    //             default: "0",
    //             des: "每日预算"
    //         },
    //         {
    //             name: "total_budget",
    //             type: "integer",
    //             default: "0",
    //             des: "总预算"
    //         },
    //         {
    //             name: "start_time",
    //             type: "integer",
    //             default: "0",
    //             des: "开始时间"
    //         },
    //         {
    //             name: "end_time",
    //             type: "integer",
    //             default: "0",
    //             des: "结束时间"
    //         },
    //         {
    //             name: "state",
    //             type: "varchar(10)",
    //             default: "0",
    //             des: "状态（如：closed）"
    //         },
    //         {
    //             name: "product_placement",
    //             type: "varchar(10)",
    //             default: "0",
    //             des: "搜索广告或关联广告"
    //         },
    //         {
    //             name: "trait_list",
    //             type: "varchar(50)",
    //             default: "0",
    //             des: '商品状态数组（如： ["item_deleted"]）'
    //         },
    //         {
    //             name: "image",
    //             type: "varchar(50)",
    //             default: "0",
    //             des: "图片"
    //         },
    //         {
    //             name: "title",
    //             type: "varchar(255)",
    //             default: "0",
    //             des: "标题"
    //         },
    //         {
    //             name: "type",
    //             type: "varchar(10)",
    //             default: "0",
    //             des: "状态（如：keyword）"
    //         },
    //         {
    //             name: "key_uptime",
    //             type: "integer",
    //             default: "0",
    //             des: "新增关键词更新时间"
    //         },
    //         {
    //             name: "productID",
    //             type: "integer",
    //             default: "",
    //             des: "商品ID(知道商品ID方便找到广告)"
    //         },
    //         {
    //             name: "report_impression",
    //             type: "integer",
    //             default: "",
    //             des: "浏览数"
    //         },
    //         {
    //             name: "report_click",
    //             type: "integer",
    //             default: "",
    //             des: "点击数"
    //         },
    //         {
    //             name: "keywords",
    //             type: "text",
    //             default: "",
    //             des: "搜索商品联想的关键词"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //     ]
    // },
    // {
    //     name: "logistics",
    //     des: "物流方式",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "name",
    //             type: "varchar(5)",
    //             default: "",
    //             des: "国家代码（如：SG）"
    //         },
    //         {
    //             name: "cn_name",
    //             type: "varchar(10)",
    //             default: "",
    //             des: "国家（如：新加坡）"
    //         },
    //         {
    //             name: "currency_unit",
    //             type: "varchar(5)",
    //             default: "",
    //             des: "货币单位（如：SGD）"
    //         },
    //         {
    //             name: "currency_symbol",
    //             type: "varchar(5)",
    //             default: "",
    //             des: "货币符号（如：$）"
    //         },
    //         {
    //             name: "description",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "说明"
    //         },
    //         {
    //             name: "cargo_types",
    //             type: "text",
    //             default: "",
    //             des: "物流信息json格式"
    //         },
    //     ]
    // },
    // {
    //     name: "user_blacks",
    //     des: " 黑名单",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "fromid",
    //             type: "integer",
    //             default: "0 unique",
    //             des: "来源ID"
    //         },
    //         {
    //             name: "userAccount",
    //             type: "varchar(100)",
    //             default: "0",
    //             des: "买家ID"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //         {
    //             name: "uptime",
    //             type: "integer",
    //             default: "0",
    //             des: "更新时间"
    //         },
    //         {
    //             name: "reason",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "被标记的原因"
    //         }
    //     ]
    // },
    // {
    //     name: "brand",
    //     des: "品牌",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //         {
    //             name: "brand_id",
    //             type: "integer",
    //             default: "0 unique",
    //             des: "品牌ID"
    //         },
    //         {
    //             name: "name",
    //             type: "varchar(100)",
    //             default: "0",
    //             des: "品牌名称"
    //         },
    //         {
    //             name: "category_ids",
    //             type: "text",
    //             default: "",
    //             des: "品牌有哪些分类ID"
    //         }
    //     ]
    // },
    // {
    //     name: "bannedword_dianxiaomi",
    //     des: "【店小秘】违禁词",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "name",
    //             type: "varchar(150)",
    //             default: "0 unique",
    //             des: "违禁词名称"
    //         },
    //         {
    //             name: "count",
    //             type: "integer",
    //             default: "0",
    //             des: "违禁次数"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         }
    //     ]
    // },
    // {
    //     name: "bannedword_keyouyun",
    //     des: "【客优云】违禁词",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "name",
    //             type: "varchar(150)",
    //             default: "0 unique",
    //             des: "违禁词名称"
    //         },
    //         {
    //             name: "isWhitelist",
    //             type: "smallint",
    //             default: "0",
    //             des: "是否白名单"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         }
    //     ]
    // },
    // {
    //     name: "seller",
    //     des: "卖家账户",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "name",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "提现人"
    //         },
    //         {
    //             name: "company",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "公司"
    //         },
    //         {
    //             name: "sort",
    //             type: "integer",
    //             default: "0",
    //             des: "排序"
    //         },
    //         {
    //             name: "UserName",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "用户名"
    //         },
    //         {
    //             name: "password",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "密码"
    //         },
    //         {
    //             name: "cookies",
    //             type: "text",
    //             default: "",
    //             des: "登录用的cookies信息"
    //         },
    //         {
    //             name: "localStorage",
    //             type: "text",
    //             default: "",
    //             des: "登录用的localStorage信息"
    //         },
    //         {
    //             name: "phone",
    //             type: "varchar(11)",
    //             default: "",
    //             des: "手机"
    //         },
    //         {
    //             name: "note",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "备注"
    //         },
    //         {
    //             name: "config",
    //             type: "text",
    //             default: "",
    //             des: "配置信息（如：店铺ID，店铺名，等等）"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         }
    //     ]
    // },
    
   
    // {
    //     name: "GlobalPro",
    //     des: "全球商品",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "BeforeReview",
    //             type: "smallint",
    //             default: "0",
    //             des: "审核前本地状态(主要是记录更新时，出现的错误信息)"
    //         },
    //         {
    //             name: "discount",
    //             type: "smallint",
    //             default: "0",
    //             des: "折扣（以后发布商品，就用这个折扣。）"
    //         },
    //         {
    //             name: "type1",
    //             type: "integer",
    //             default: "0",
    //             des: "一级商品分类ID（发布到各个站点时要用）"
    //         },
    //         {
    //             name: "penalty_type",
    //             type: "smallint",
    //             default: "0",
    //             des: "更新后违规类型"
    //         },
    //         {
    //             name: "ManualReview_1688",
    //             type: "smallint",
    //             default: "0",
    //             des: "手动审核1688状态"
    //         },
    //         {
    //             name: "ManualReview_1688_fromid",
    //             type: "numeric(18,0)",
    //             default: "0",
    //             des: "人工审核的来源ID，用来当采购货源。"
    //         },
    //         {
    //             name: "ManualReview_1688_unitWeight",
    //             type: "numeric(8,4)",
    //             default: "0",
    //             des: "手动审核1688后单位重量，算shopee运费要用。"
    //         },
    //         {
    //             name: "ManualReview_1688_state",
    //             type: "smallint",
    //             default: "0",
    //             des: "人工审核的来源ID对应的商品状态，当更新时可知道，采购货源状态。"
    //         },
    //         {
    //             name: "ManualReview_1688_video_status",
    //             type: "smallint",
    //             default: "0",
    //             des: "1688人工审核视频状态（0：未审核；1：无视频；2：有视频；3：审核不通过；4：带中文审核通过；5：完全审核通过；）----做活动要排序要用"
    //         },
    //         {
    //             name: "DHAfterReview",
    //             type: "smallint",
    //             default: "0",
    //             des: "敦煌-审核后本地状态(主要是记录更新成功后，被敦煌审核后，出现审核不通过，按原因划分的状态)"
    //         },
    //         {
    //             name: "ManualReview_1688_subject",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "标题----发布时就用这个标题"
    //         },
    //         {
    //             name: "tw_nameLen",
    //             type: "integer",
    //             default: "0",
    //             des: "发布后台湾语标题长度----因为shopee要求【商品名称的建议字数为 25~100】"
    //         },
    //         {
    //             name: "tw_name",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "发布后台湾标题"
    //         },
    //         {
    //             name: "ms_nameLen",
    //             type: "integer",
    //             default: "0",
    //             des: "发布后马来语标题长度----因为shopee要求【商品名称的建议字数为 25~100】"
    //         },
    //         {
    //             name: "ms_name",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "发布后马来标题"
    //         },
    //         {
    //             name: "en_nameLen",
    //             type: "integer",
    //             default: "0",
    //             des: "发布后英语标题长度----因为shopee要求【商品名称的建议字数为 25~100】"
    //         },
    //         {
    //             name: "en_name",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "发布后英语标题"
    //         },
    //         {
    //             name: "pt_nameLen",
    //             type: "integer",
    //             default: "0",
    //             des: "发布后葡萄牙语标题长度----因为shopee要求【商品名称的建议字数为 25~100】"
    //         },
    //         {
    //             name: "pt_name",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "发布后葡萄牙语标题长度"
    //         },
    //         {
    //             name: "ManualReview_1688_description",
    //             type: "text",
    //             default: "",
    //             des: "详情----发布时就用这个"
    //         },
    //         {
    //             name: "tw_description",
    //             type: "text",
    //             default: "",
    //             des: "翻译成台湾语后的详情"
    //         },
    //         {
    //             name: "ms_description",
    //             type: "text",
    //             default: "",
    //             des: "翻译成马来语后的详情"
    //         },
    //         {
    //             name: "en_description",
    //             type: "text",
    //             default: "",
    //             des: "翻译成英语后的详情"
    //         },
    //         {
    //             name: "pt_description",
    //             type: "text",
    //             default: "",
    //             des: "翻译成葡萄牙语后的详情"
    //         },
    //         {
    //             name: "err",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "出错说明"
    //         },
    //         {
    //             name: "ManualReview",
    //             type: "smallint",
    //             default: "0",
    //             des: "人工审核状态"
    //         },
    //         {
    //             name: "upUserID",
    //             type: "integer",
    //             default: "0",
    //             des: "上传去哪的用户名的ID"
    //         },
    //         {
    //             name: "proid",
    //             type: "varchar(10)",
    //             default: "0 unique",
    //             des: "产品编码(如：R12345)"
    //         },
    //         {
    //             name: "video",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "上传后的视频，是个json格式"
    //         },
    //         {
    //             name: "pic",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "首图"
    //         },
    //         {
    //             name: "tw_ads_key",
    //             type: "varchar(50)",
    //             default: "",
    //             des: "马来站点-广告-主推关键词"
    //         },
    //         {
    //             name: "tw_ads_keywords",
    //             type: "text",
    //             default: "",
    //             des: "马来站点-广告-启用的关键词"
    //         },
    //         {
    //             name: "my_ads_key",
    //             type: "varchar(50)",
    //             default: "",
    //             des: "马来站点-广告-主推关键词"
    //         },
    //         {
    //             name: "my_ads_keywords",
    //             type: "text",
    //             default: "",
    //             des: "马来站点-广告-启用的关键词"
    //         },
    //         {
    //             name: "br_ads_key",
    //             type: "varchar(50)",
    //             default: "",
    //             des: "巴西站点-广告-主推关键词"
    //         },
    //         {
    //             name: "br_ads_keywords",
    //             type: "text",
    //             default: "",
    //             des: "巴西站点-广告-启用的关键词"
    //         },
    //         {
    //             name: "fromID",
    //             type: "numeric(18,0)",
    //             default: "0",
    //             des: "全球商品ID（上传成功返回的数据ID）"
    //         },
    //         {
    //             name: "isUp",
    //             type: "smallint",
    //             default: "0",
    //             des: "是否已上传到【Shopee全球商品】"
    //         },
    //         {
    //             name: "editStatus",
    //             type: "smallint",
    //             default: "0",
    //             des: "修改状态（0：未修改；1：第一次修改；2：第二次修改；）"
    //         },
    //         {
    //             name: "isMY",
    //             type: "smallint",
    //             default: "0",
    //             des: "是否发布到【马来西亚】站点"
    //         },
    //         {
    //             name: "isBR",
    //             type: "smallint",
    //             default: "0",
    //             des: "是否发布到【巴西】站点"
    //         },
    //         {
    //             name: "isTW",
    //             type: "smallint",
    //             default: "0",
    //             des: "是否发布到【台湾】站点"
    //         },
    //         {
    //             name: "isUpImg",
    //             type: "smallint",
    //             default: "0",
    //             des: "是否已上传图片到【Shopee平台】，为什么要这个字段？答：上传图片太慢了，用这个会快一点。"
    //         },
    //         {
    //             name: "ManualReview_1688_categoryId",
    //             type: "integer",
    //             default: "0",
    //             des: "1688类目ID---绑定类目时要用"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "上传时间"
    //         },
    //         {
    //             name: "uptime",
    //             type: "integer",
    //             default: "0",
    //             des: "更新时间"
    //         }
    //     ]
    // },
    {
        name: "shopPro_tw",
        des: "【台湾虾皮】店铺商品",
        database: "shopee",
        action: "pg",
        table: [
            {
                name: "id",
                type: "serial primary key",
                default: "",
                des: "索引"
            },
            {
                name: "unitWeight",
                type: "numeric(8,4)",
                default: "0",
                des: "单位重量，算shopee运费要用。"
            },
            {
                name: "discount",
                type: "smallint",
                default: "0",
                des: "旧折扣（算利润要用）"
            },
            {
                name: "newDiscount",
                type: "numeric(8,4)",
                default: "0",
                des: "新折扣（当采购改价，我不用改价，改折扣）"
            },
            {
                name: "isDiscount",
                type: "smallint",
                default: "0",
                des: "商品能否做折扣活动"
            },
            {
                name: "isPic1WaterMark",
                type: "smallint",
                default: "0",
                des: "是否生成首图水印"
            },
            {
                name: "isSignUp",
                type: "smallint",
                default: "0",
                des: "商品能否报名活动"
            },
            {
                name: "isTrueSignUp",
                type: "smallint",
                default: "0",
                des: "是否已报名活动"
            },
            {
                name: "isSeckill",
                type: "smallint",
                default: "0",
                des: "商品能否做秒杀活动"
            },
            {
                name: "input_normal_price",
                type: "numeric(8,3)",
                default: "0",
                des: "原价---从获取店铺信息而来"
            },
            {
                name: "freight",
                type: "numeric(8,3)",
                default: "0",
                des: "运费"
            },
            {
                name: "name",
                type: "varchar(255)",
                default: "",
                des: "标题"
            },
            {
                name: "pic",
                type: "varchar(100)",
                default: "",
                des: "首图"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "0",
                des: "产品编码(如：R12345)"
            },
            {
                name: "fromID",
                type: "numeric(18,0)",
                default: "0 unique",
                des: "店铺商品ID（发布成功返回的数据ID）"
            },
            {
                name: "status",
                type: "smallint",
                default: "0",
                des: "shopee的商品状态"
            },
            {
                name: "_1688_fromid",
                type: "numeric(18,0)",
                default: "0",
                des: "详情ID---采购时要用"
            },
            {
                name: "scale",
                type: "integer",
                default: "0",
                des: "件倍数---计算采购价格要用"
            },
            {
                name: "_1688_saleNum",
                type: "integer",
                default: "0",
                des: "销量---做活动时要用"
            },
            {
                name: "_1688_maxPrice",
                type: "money",
                default: "0",
                des: "最高售价---做活动时要用"
            },
            {
                name: "_1688_freight",
                type: "numeric(8,3)",
                default: "0",
                des: "1688运费---定价要用"
            },
            {
                name: "_1688_MinimumOrder",
                type: "integer",
                default: "0",
                des: "1688最低购买量-----计算定价可用"
            },
            {
                name: "MinimumOrder",
                type: "integer",
                default: "0",
                des: "以前填写最低购买量----做活动时要用（秒杀）"
            },
            {
                name: "min_purchase_limit",
                type: "integer",
                default: "0",
                des: "现在的最低购买量----在【重新计算新折扣】的时后，判断这俩个是否一样用的"
            },
            {
                name: "promotion",
                type: "text",
                default: "",
                des: "该商品的活动信息"
            },
            {
                name: "model_list",
                type: "text",
                default: "",
                des: "价格和价格ID信息----报名活动要用，更新商品要用"
            },
            {
                name: "isUnlisted",
                type: "smallint",
                default: "0",
                des: "是否可以下架(参加某些活动，商品是不能下架的。)"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "上传时间(同步过来的时间)"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "更新时间(同步过来的时间)"
            },
            {
                name: "price_uptime",
                type: "integer",
                default: "0",
                des: "价格修改时间（本来是不用修改价格的，但是有某些原因，又不得不修改价格。注：修改价格后7天后才可以去做活动，否则说你违规调价。）"
            },
            {
                name: "self_uptime",
                type: "integer",
                default: "0",
                des: "自定义更新时间(当该时间大于【更新时间】，则表示商品要更新了。)"
            }
        ]
    },
    {
        name: "shopPro_my",
        des: "【马来西亚】店铺商品",
        database: "shopee",
        action: "pg",
        table: [
            {
                name: "id",
                type: "serial primary key",
                default: "",
                des: "索引"
            },
            {
                name: "unitWeight",
                type: "numeric(8,4)",
                default: "0",
                des: "单位重量，算shopee运费要用。"
            },
            {
                name: "discount",
                type: "smallint",
                default: "0",
                des: "旧折扣（算利润要用）"
            },
            {
                name: "newDiscount",
                type: "numeric(8,4)",
                default: "0",
                des: "新折扣（当采购改价，我不用改价，改折扣）"
            },
            {
                name: "isDiscount",
                type: "smallint",
                default: "0",
                des: "商品能否做折扣活动"
            },
            {
                name: "isPic1WaterMark",
                type: "smallint",
                default: "0",
                des: "是否生成首图水印"
            },
            {
                name: "isSignUp",
                type: "smallint",
                default: "0",
                des: "商品能否报名活动"
            },
            {
                name: "isTrueSignUp",
                type: "smallint",
                default: "0",
                des: "是否已报名活动"
            },
            {
                name: "isSeckill",
                type: "smallint",
                default: "0",
                des: "商品能否做秒杀活动"
            },
            {
                name: "input_normal_price",
                type: "numeric(8,3)",
                default: "0",
                des: "原价---从获取店铺信息而来"
            },
            {
                name: "freight",
                type: "numeric(8,3)",
                default: "0",
                des: "运费"
            },
            {
                name: "name",
                type: "varchar(255)",
                default: "",
                des: "标题"
            },
            {
                name: "pic",
                type: "varchar(100)",
                default: "",
                des: "首图"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "0",
                des: "产品编码(如：R12345)"
            },
            {
                name: "fromID",
                type: "numeric(18,0)",
                default: "0 unique",
                des: "店铺商品ID（发布成功返回的数据ID）"
            },
            {
                name: "status",
                type: "smallint",
                default: "0",
                des: "shopee的商品状态"
            },
            {
                name: "_1688_fromid",
                type: "numeric(18,0)",
                default: "0",
                des: "详情ID---采购时要用"
            },
            {
                name: "scale",
                type: "integer",
                default: "0",
                des: "件倍数---计算采购价格要用"
            },
            {
                name: "_1688_saleNum",
                type: "integer",
                default: "0",
                des: "销量---做活动时要用"
            },
            {
                name: "_1688_maxPrice",
                type: "money",
                default: "0",
                des: "最高售价---做活动时要用"
            },
            {
                name: "_1688_freight",
                type: "numeric(8,3)",
                default: "0",
                des: "1688运费---定价要用"
            },
            {
                name: "_1688_MinimumOrder",
                type: "integer",
                default: "0",
                des: "1688最低购买量-----计算定价可用"
            },
            {
                name: "MinimumOrder",
                type: "integer",
                default: "0",
                des: "以前填写最低购买量----做活动时要用（秒杀）"
            },
            {
                name: "min_purchase_limit",
                type: "integer",
                default: "0",
                des: "现在的最低购买量----在【重新计算新折扣】的时后，判断这俩个是否一样用的"
            },
            {
                name: "promotion",
                type: "text",
                default: "",
                des: "该商品的活动信息"
            },
            {
                name: "model_list",
                type: "text",
                default: "",
                des: "价格和价格ID信息----报名活动要用，更新商品要用"
            },
            {
                name: "isUnlisted",
                type: "smallint",
                default: "0",
                des: "是否可以下架(参加某些活动，商品是不能下架的。)"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "上传时间(同步过来的时间)"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "更新时间(同步过来的时间)"
            },
            {
                name: "price_uptime",
                type: "integer",
                default: "0",
                des: "价格修改时间（本来是不用修改价格的，但是有某些原因，又不得不修改价格。注：修改价格后7天后才可以去做活动，否则说你违规调价。）"
            },
            {
                name: "self_uptime",
                type: "integer",
                default: "0",
                des: "自定义更新时间(当该时间大于【更新时间】，则表示商品要更新了。)"
            }
        ]
    },
    {
        name: "shopPro_br",
        des: "【巴西】店铺商品",
        database: "shopee",
        action: "pg",
        table: [
            {
                name: "id",
                type: "serial primary key",
                default: "",
                des: "索引"
            },
            {
                name: "unitWeight",
                type: "numeric(8,4)",
                default: "0",
                des: "单位重量，算shopee运费要用。"
            },
            {
                name: "discount",
                type: "smallint",
                default: "0",
                des: "折扣（以后算利润要用）"
            },
            {
                name: "newDiscount",
                type: "numeric(8,4)",
                default: "0",
                des: "新折扣（当采购改价，我不用改价，改折扣）"
            },
            {
                name: "isDiscount",
                type: "smallint",
                default: "0",
                des: "商品能否做折扣活动"
            },
            {
                name: "isPic1WaterMark",
                type: "smallint",
                default: "0",
                des: "是否生成首图水印"
            },
            {
                name: "isSignUp",
                type: "smallint",
                default: "0",
                des: "商品能否报名活动"
            },
            {
                name: "isTrueSignUp",
                type: "smallint",
                default: "0",
                des: "是否已报名活动"
            },
            {
                name: "isSeckill",
                type: "smallint",
                default: "0",
                des: "商品能否做秒杀活动"
            }, {
                name: "input_normal_price",
                type: "numeric(8,3)",
                default: "0",
                des: "原价---从获取店铺信息而来"
            },
            {
                name: "freight",
                type: "numeric(8,3)",
                default: "0",
                des: "运费"
            },
            {
                name: "name",
                type: "varchar(255)",
                default: "",
                des: "标题"
            },
            {
                name: "pic",
                type: "varchar(100)",
                default: "",
                des: "首图"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "0",
                des: "产品编码(如：R12345)"
            },
            {
                name: "fromID",
                type: "numeric(18,0)",
                default: "0 unique",
                des: "店铺商品ID（发布成功返回的数据ID）"
            },
            {
                name: "status",
                type: "smallint",
                default: "0",
                des: "shopee的商品状态"
            },
            {
                name: "scale",
                type: "integer",
                default: "0",
                des: "件倍数---计算采购价格要用"
            },
            {
                name: "_1688_fromid",
                type: "numeric(18,0)",
                default: "0",
                des: "详情ID---采购时要用"
            },
            {
                name: "_1688_saleNum",
                type: "integer",
                default: "0",
                des: "销量---做活动时要用"
            },
            {
                name: "_1688_maxPrice",
                type: "money",
                default: "0",
                des: "最高售价---做活动时要用"
            },
            {
                name: "_1688_freight",
                type: "numeric(8,3)",
                default: "0",
                des: "1688运费---定价要用"
            },
            {
                name: "_1688_MinimumOrder",
                type: "integer",
                default: "0",
                des: "1688最低购买量-----计算定价可用"
            },
            {
                name: "MinimumOrder",
                type: "integer",
                default: "0",
                des: "以前填写最低购买量"
            },
            {
                name: "min_purchase_limit",
                type: "integer",
                default: "0",
                des: "现在的最低购买量----在【重新计算新折扣】的时后，判断这俩个是否一样用的"
            },
            {
                name: "promotion",
                type: "text",
                default: "",
                des: "该商品的活动信息"
            },
            {
                name: "model_list",
                type: "text",
                default: "",
                des: "价格和价格ID信息----报名活动要用，更新商品要用"
            },
            {
                name: "isUnlisted",
                type: "smallint",
                default: "0",
                des: "是否可以下架(参加某些活动，商品是不能下架的。)"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "上传时间"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "更新时间"
            },
            {
                name: "price_uptime",
                type: "integer",
                default: "0",
                des: "价格修改时间（本来是不用修改价格的，但是有某些原因，又不得不修改价格。注：修改价格后7天后才可以去做活动，否则说你违规调价。）"
            },
            {
                name: "self_uptime",
                type: "integer",
                default: "0",
                des: "自定义更新时间(当该时间大于【更新时间】，则表示商品要更新了。)"
            }
        ]
    },
    // {
    //     name: "voucher",
    //     des: "优惠券",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "name",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "优惠券名称（优惠券名称对买家不可见）"
    //         },
    //         {
    //             name: "voucher_id",
    //             type: "integer",
    //             default: "0",
    //             des: "优惠券ID"
    //         },
    //         {
    //             name: "voucher_code",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "优惠码（如：REND04025）"
    //         },
    //         {
    //             name: "start_time",
    //             type: "integer",
    //             default: "0",
    //             des: "优惠券领取期限-开始时间"
    //         },
    //         {
    //             name: "end_time",
    //             type: "integer",
    //             default: "0",
    //             des: "优惠券领取期限-结束时间"
    //         },
    //         {
    //             name: "discount",
    //             type: "integer",
    //             default: "0",
    //             des: "折扣（如：25）"
    //         },
    //         {
    //             name: "usage_quantity",
    //             type: "integer",
    //             default: "0",
    //             des: "可使用总数（如：3张）"
    //         },
    //         {
    //             name: "fe_display_coin_amount",
    //             type: "integer",
    //             default: "0",
    //             des: "Shopee币回扣（如：2000 Shopee币）"
    //         },
    //         {
    //             name: "value",
    //             type: "numeric(10,2)",
    //             default: "0",
    //             des: "折扣金额（如：1.00）"
    //         },
    //         {
    //             name: "min_price",
    //             type: "numeric(10,2)",
    //             default: "0",
    //             des: "最低消费金额（如：250.00）"
    //         },
    //         {
    //             name: "max_value",
    //             type: "numeric(10,2)",
    //             default: "0",
    //             des: "最高上限数额（如：10.00）"
    //         },
    //         {
    //             name: "rule",
    //             type: "text",
    //             default: "",
    //             des: "规则（是对象）"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //         {
    //             name: "fe_status",
    //             type: "smallint",
    //             default: "0",
    //             des: "状态(1:表示接下来的活动；2：表示进行中的活动；3：表示已过期)"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //         {
    //             name: "uptime",
    //             type: "integer",
    //             default: "0",
    //             des: "修改时间"
    //         }
    //     ]
    // },
    // {
    //     name: "bannedPro",
    //     des: "禁限商品",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //         {
    //             name: "productId",
    //             type: "integer",
    //             default: "0",
    //             des: "商品ID"
    //         },
    //         {
    //             name: "name",
    //             type: "varchar(255)",
    //             default: "",
    //             des: "商品名称"
    //         },
    //         {
    //             name: "proid",
    //             type: "varchar(10)",
    //             default: "",
    //             des: "商品编码"
    //         },
    //         {
    //             name: "pic",
    //             type: "varchar(50)",
    //             default: "",
    //             des: "图片"
    //         },
    //         {
    //             name: "status",
    //             type: "smallint",
    //             default: "0",
    //             des: "商品状态"
    //         },
    //         {
    //             name: "penalty_type",
    //             type: "smallint",
    //             default: "0",
    //             des: "违规类型"
    //         },
    //         {
    //             name: "description",
    //             type: "varchar(255)",
    //             default: "",
    //             des: " 违规原因 "
    //         },
    //         {
    //             name: "myExperience",
    //             type: "varchar(255)",
    //             default: "",
    //             des: " 我的心得，主要是记录Shopee禁我商品，我的看法。 "
    //         },
    //         {
    //             name: "explanation",
    //             type: "text",
    //             default: "",
    //             des: "建议"
    //         },
    //         {
    //             name: "banned_time",
    //             type: "integer",
    //             default: "0",
    //             des: "违规时间"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //         {
    //             name: "uptime",
    //             type: "integer",
    //             default: "0",
    //             des: "修改时间"
    //         }
    //     ]
    // },
    // {
    //     name: "discount",
    //     des: "优惠券",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "title",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "折扣名称（如：【14】打折 2024-04-28）"
    //         },
    //         {
    //             name: "promotion_id",
    //             type: "integer",
    //             default: "0",
    //             des: "促销id"
    //         },
    //         {
    //             name: "status",
    //             type: "smallint",
    //             default: "0",
    //             des: "状态"
    //         },
    //         {
    //             name: "start_time",
    //             type: "integer",
    //             default: "0",
    //             des: "折扣活动-开始时间"
    //         },
    //         {
    //             name: "end_time",
    //             type: "integer",
    //             default: "0",
    //             des: "折扣活动-结束时间"
    //         },
    //         {
    //             name: "images",
    //             type: "text",
    //             default: "",
    //             des: "商品图片（如： [\"cn-11134207-7r98o-lsmgvtacu6zh1f\"]）"
    //         },
    //         {
    //             name: "total_product",
    //             type: "integer",
    //             default: "0",
    //             des: "商品总数"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //     ]
    // },
    // {
    //     name: "flash_sale",
    //     des: "店内秒杀",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "flash_sale_id",
    //             type: "integer",
    //             default: "0",
    //             des: "限时抢购ID"
    //         },
    //         {
    //             name: "status",
    //             type: "smallint",
    //             default: "0",
    //             des: "状态"
    //         },
    //         {
    //             name: "start_time",
    //             type: "integer",
    //             default: "0",
    //             des: "折扣活动-开始时间"
    //         },
    //         {
    //             name: "end_time",
    //             type: "integer",
    //             default: "0",
    //             des: "折扣活动-结束时间"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //         {
    //             name: "uptime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //         {
    //             name: "item_count",
    //             type: "integer",
    //             default: "0",
    //             des: "商品数量"
    //         },
    //         {
    //             name: "timeslot_id",
    //             type: "integer",
    //             default: "0",
    //             des: "未知"
    //         },
    //         {
    //             name: "type",
    //             type: "integer",
    //             default: "0",
    //             des: "未知"
    //         },
    //     ]
    // },
    // {
    //     name: "add_on_deal",
    //     des: "店内秒杀",
    //     database: "shopee",
    //     action: "pg",
    //     table: [
    //         {
    //             name: "id",
    //             type: "serial primary key",
    //             default: "",
    //             des: "索引"
    //         },
    //         {
    //             name: "add_on_deal_id",
    //             type: "numeric(18,0)",
    //             default: "0",
    //             des: "加购优惠ID"
    //         },
    //         {
    //             name: "add_on_deal_name",
    //             type: "varchar(100)",
    //             default: "",
    //             des: "加购优惠名称"
    //         },
    //         {
    //             name: "addtime",
    //             type: "integer",
    //             default: "0",
    //             des: "添加时间"
    //         },
    //         {
    //             name: "start_time",
    //             type: "integer",
    //             default: "0",
    //             des: "活动开始时间"
    //         },
    //         {
    //             name: "end_time",
    //             type: "integer",
    //             default: "0",
    //             des: "活动结束时间"
    //         },
    //         {
    //             name: "sub_item_limit",
    //             type: "smallint",
    //             default: "0",
    //             des: "未知"
    //         },
    //         {
    //             name: "sub_item_priority",
    //             type: "text",
    //             default: "",
    //             des: "未知"
    //         },
    //         {
    //             name: "sub_type",
    //             type: "smallint",
    //             default: "0",
    //             des: "未知"
    //         },
    //         {
    //             name: "purchase_min_spend",
    //             type: "numeric(8,2)",
    //             default: "0",
    //             des: "未知"
    //         },
    //         {
    //             name: "per_gift_num",
    //             type: "smallint",
    //             default: "0",
    //             des: "每份礼物数量"
    //         },
    //         {
    //             name: "source",
    //             type: "smallint",
    //             default: "0",
    //             des: "未知"
    //         },
    //         {
    //             name: "status",
    //             type: "smallint",
    //             default: "0",
    //             des: "未知"
    //         },
    //         {
    //             name: "site",
    //             type: "varchar(3)",
    //             default: "",
    //             des: "站点---主要记录是来至哪个站点（如：my,br等）"
    //         },
    //     ]
    // },
]);


//{
//    name: "ManualReview",
//    type: "smallint",
//    default: "0",
//    des: "人工审核状态"
//},
//{
//    name: "SaleNum",
//    type: "integer",
//    default: "0",
//    des: "已销售数量"
//},
//{
//    name: "upUserID",
//    type: "integer",
//    default: "0",
//    des: "上传去哪的用户名的ID"
//},
//{
//    name: "BrowseMY",
//    type: "integer",
//    default: "0",
//    des: "shopee的浏览量"
//},
//{
//    name: "FollowersMY",
//    type: "integer",
//    default: "0",
//    des: "shopee的关注量"
//},
//{
//    name: "video",
//    type: "varchar(255)",
//    default: "",
//    des: "上传后的视频，是个json格式"
//},
//{
//    name: "pic1",
//    type: "text",
//    default: "",
//    des: "首图"
//},
//{
//    name: "pic",
//    type: "text",
//    default: "",
//    des: "上传后，放大镜图片"
//},
//{
//    name: "attrPic",
//    type: "text",
//    default: "",
//    des: "上传后，属性中图片"
//},
//{
//    name: "MinPrice",
//    type: "money",
//    default: "0",
//    des: "折后最小售价"
//},
//{
//    name: "itemIdMY",
//    type: "numeric(18,0)",
//    default: "0",
//    des: "【马来西亚】站点的店铺商品ID（发布到店铺的商品ID）"
//},
//{
//    name: "minDiscount",
//    type: "smallint",
//    default: "0",
//    des: "速卖通历史价格中的，三次最低折扣，用来俩边打折相用用的。"
//},
//{
//    name: "ReviewsNum",
//    type: "integer",
//    default: "0",
//    des: "速卖通商品的评论量"
//},