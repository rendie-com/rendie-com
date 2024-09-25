'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "订单",
        database: "shopee/订单",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "DomesticWaybill",
                type: "text",
                default: "",
                des: "站点国内运单号（如：json）"
            },
            {
                name: "seller_income_breakdown",
                type: "text",
                default: "",
                des: "卖家价格明细（如：json）"
            },
            {
                name: "buyer_payment_breakdown",
                type: "text",
                default: "",
                des: "买家价格明细（如：json）"
            },
            {
                name: "package_number",
                type: "varchar(30)",
                default: "",
                des: "包裹编号（如：OFG172202595203743）---获取国内运单号要用"
            },
            {
                name: "tracking_number",
                type: "varchar(30)",
                default: "",
                des: "国外运单号（如：MY240967550364Y）"
            },
            {
                name: "tracking_info",
                type: "text",
                default: "",
                des: "国外物流信息"
            },
            {
                name: "site",
                type: "varchar(3)",
                default: "",
                des: "站点---主要记录是来至哪个站点（如：my,br等）"
            },
            {
                name: "shop_id",
                type: "integer",
                default: "0",
                des: "店铺ID（如：896010703）---主要记录是来至哪个站点ID（说明：一个站点，可以有多个店铺。）"
            },
            {
                name: "user_id",
                type: "integer",
                default: "0",
                des: "用户ID（如：40156834）---还不知道有什么用"
            },
            {
                name: "order_id",
                type: "varchar(20)",
                default: "",
                des: "订单ID（如：172202594288609）---还不知道有什么用"
            },
            {
                name: "order_sn",
                type: "varchar(20)",
                default: "",
                des: "订单编号（如：2406165VNRY0Y1）---这个能在网页中看到"
            },
            {
                name: "total_price",
                type: "numeric(8,3)",
                default: "0",
                des: "订单总价（如：25.23）---这个能在网页中看到"
            },
            {
                name: "shipping_method",
                type: "integer",
                default: "0",
                des: "装运_方法（如：28016）---还不知道有什么用"
            },
            {
                name: "shipping_address",
                type: "varchar(20)",
                default: "",
                des: "发货地址（如：NO******）-----这个能在网页中看到"
            },
            {
                name: "shipping_fee",
                type: "numeric(8,3)",
                default: "0",
                des: "总运费（如：2.23）---卖家运费+买家运费=2.10+0.13=2.23----------这个好像是买家出的"
            },
            {
                name: "actual_carrier",
                type: "varchar(50)",
                default: "",
                des: "物流公司（如：Standard Delivery）"
            },
            {
                name: "order_type",
                type: "tinyint",
                default: "0",
                des: "订单类型（如：2）---还不知道有什么用"
            },
            {
                name: "payment_method",
                type: "tinyint",
                default: "0",
                des: "付款方式（如：4）"
            },
            {
                name: "payment_method_name",
                type: "varchar(50)",
                default: "",
                des: "付款方式名称（如：Online Banking）"
            },
            {
                name: "remark",
                type: "varchar(255)",
                default: "",
                des: "买家备注"
            },
            {
                name: "status",
                type: "tinyint",
                default: "",
                des: "状态（如：2）---还不知道有什么用"
            },
            {
                name: "create_time",
                type: "integer",
                default: "0",
                des: "创建时间（如：1718503395）----下单时间"
            },
            {
                name: "delivery_time",
                type: "integer",
                default: "0",
                des: "交货_时间（如：0）----发完货就有数据了，但好像是一天，还不知道有什么用"
            },
            {
                name: "complete_time",
                type: "integer",
                default: "0",
                des: "完成时间（如：0）"
            },
            {
                name: "pickup_time",
                type: "integer",
                default: "0",
                des: "拾取时间（如：0）"
            },
            {
                name: "shipping_confirm_time",
                type: "integer",
                default: "0",
                des: "发货_确认_时间（如：1718503456）----可能是买家的付款时间"
            },
            {
                name: "arrange_pickup_by_date",
                type: "integer",
                default: "0",
                des: "安排提货日期（如：0）---------还不知道有什么用"
            },
            {
                name: "auto_cancel_3pl_ack_date",
                type: "integer",
                default: "0",
                des: "订单自动取消的时间（如：1718983800）--------超过这个时间被扫描算迟发货"
            },
            {
                name: "auto_cancel_arrange_ship_date",
                type: "integer",
                default: "0",
                des: "自动取消安排发货日期（如：1718724600）-----超过这个时间没填国内运单算迟发货"
            },
            {
                name: "buyer_is_rated",
                type: "numeric(8,3)",
                default: "0",
                des: "买方报价（如：0）-----还不知道有什么用"
            },
            {
                name: "buyer_last_change_address_time",
                type: "integer",
                default: "0",
                des: "购买者最后更改地址时间（如：0）"
            },
            {
                name: "buyer_txn_fee",
                type: "numeric(8,3)",
                default: "0",
                des: "买方txn费用（如：0.00）-----还不知道有什么用"
            },
            {
                name: "buyer_cancel_reason",
                type: "tinyint",
                default: "0",
                des: "购买者取消原因（如：0）"
            },
            {
                name: "cancel_time",
                type: "integer",
                default: "0",
                des: "取消时间（如：0）"
            },
            {
                name: "cancel_userid",
                type: "integer",
                default: "0",
                des: "取消用户ID（如：0）-----还不知道有什么用"
            },
            {
                name: "coin_offset",
                type: "numeric(8,3)",
                default: "0",
                des: "可能是shopee币（如：0.00）"
            },
            {
                name: "escrow_release_time",
                type: "integer",
                default: "0",
                des: "等待买家在2024/06/27前点选完成订单（如：1719329400）-----在网页可见"
            },
            {
                name: "pickup_cutoff_time",
                type: "integer",
                default: "0",
                des: "拾取截止时间（如：0）----买家取货时间"
            },
            {
                name: "shipping_proof",
                type: "varchar(255)",
                default: "",
                des: "装运证明（如：）----还不知道有什么用"
            },
            {
                name: "shipping_proof_status",
                type: "tinyint",
                default: "0",
                des: "发货_发货_状态（如：0）----还不知道有什么用"
            },
            {
                name: "payby_date",
                type: "integer",
                default: "0",
                des: "买家付款的超时时间，就是买家的最晚付款时间。（如：1718524995）"
            },
            {
                name: "price_before_discount",
                type: "numeric(8,3)",
                default: "0",
                des: "价格优惠（如：25.23）------还不知道有什么用"
            },
            {
                name: "ship_by_date",
                type: "integer",
                default: "0",
                des: "发货日期（如：1718724600）----还不知道有什么用，但和发货取消时间相同"
            },
            {
                name: "voucher_absorbed_by_seller",
                type: "bit",
                default: "0",
                des: "是否用了优惠券（如：true）"
            },
            {
                name: "voucher_code",
                type: "varchar(100)",
                default: "",
                des: "优惠券码（如：CHOI06161;FSV-902389432057872）"
            },
            {
                name: "coins_cash_by_voucher",
                type: "numeric(8,3)",
                default: "0",
                des: "优惠金额（如：0.69）"
            },
            {
                name: "buyer_address_name",
                type: "varchar(20)",
                default: "",
                des: "买家地址名称（如：R******P）------这个能在网页中看到"
            },
            {
                name: "buyer_address_phone",
                type: "varchar(20)",
                default: "",
                des: "买家地址手机号（如：******35）------这个能在网页中看到"
            },
            {
                name: "order_items",
                type: "text",
                default: "",
                des: "订单商品信息（如：json）----这个能在网页中看到"
            },
            {
                name: "buyer_user",
                type: "text",
                default: "",
                des: "买家账号信息（如：json）------这个能在网页中看到"
            },
        ]
    },
]);