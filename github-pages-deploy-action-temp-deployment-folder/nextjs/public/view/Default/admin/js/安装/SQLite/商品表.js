'use strict';
mssql = mssql.concat([
    {
        "name": "order",
        "des": "订单表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "isApplyMoney",
                "type": "bit",
                "default": "0",
                "des": "是否请款"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "入录时间，记录这条数据什么时间添加的。"
            },
            {
                "name": "PurchaseRemark",
                "type": "text",
                "default": "",
                "des": "采购备注"
            },
            {
                "name": "CommissionTime",
                "type": "integer",
                "default": "",
                "des": "提成时间"
            },
            {
                "name": "updateDate",
                "type": "integer",
                "default": "0",
                "des": "更新时间"
            },
            {
                "name": "PurchaseTime",
                "type": "integer",
                "default": "0",
                "des": "采购时间"
            },
            {
                "name": "PurchaseProcessingTime",
                "type": "integer",
                "default": "0",
                "des": "采购处理时间"
            },
            {
                "name": "PurchaseWaitingDelivery",
                "type": "integer",
                "default": "0",
                "des": "采购等待发货天数"
            },
            {
                "name": "PurchaseRefundTime",
                "type": "integer",
                "default": "0",
                "des": "采购退款成功时间"
            },
            {
                "name": "itemTotalPrice",
                "type": "Money",
                "default": "0",
                "des": "产品总计"
            },
            {
                "name": "gatewayFee",
                "type": "Money",
                "default": "0",
                "des": "支付手续费"
            },
            {
                "name": "PurchaseRefund",
                "type": "Money",
                "default": "0",
                "des": "采购退款"
            },
            {
                "name": "orderRefund",
                "type": "Money",
                "default": "0",
                "des": "订单退款"
            },
            {
                "name": "PurchaseCost",
                "type": "Money",
                "default": "0",
                "des": "采购成本"
            },
            {
                "name": "fromuser",
                "type": "varchar(100)",
                "default": "",
                "des": "来源用户(用于记住是从哪个用户采集过来的数据)"
            },
            {
                "name": "fromuserid",
                "type": "integer",
                "default": "0",
                "des": "来源用户ID(同上)"
            },
            {
                "name": "ArrivalTime",
                "type": "integer",
                "default": "0",
                "des": "运达时间(天)"
            },
            {
                "name": "UserName",
                "type": "varchar(100)",
                "default": "",
                "des": "来源用户名(买家的用户名)"
            },
            {
                "name": "fromHead",
                "type": "varchar(100)",
                "default": "",
                "des": "来源负责人(谁来负责来源用户)"
            },
            {
                "name": "userid",
                "type": "integer",
                "default": "0",
                "des": "用户ID(如:小明有三个敦煌账户，那【用户ID】表式小明)"
            },
            {
                "name": "lastName",
                "type": "varchar(50)",
                "default": "",
                "des": "收货人姓名(姓)"
            },
            {
                "name": "eClearanceCode",
                "type": "varchar(50)",
                "default": "",
                "des": "电子结算代码(当国家为韩国时要填写这个)"
            },
            {
                "name": "buyerId",
                "type": "varchar(32)",
                "default": "",
                "des": "买家ID（示例值：ff808081416839d5014168e43ab30033）"
            },
            {
                "name": "orderId32",
                "type": "varchar(32)",
                "default": "",
                "des": "订单32位ID（示例值：ff808081416839d5014168e43ab30033,在【智能崔款】时和【修改运单号】时有用）"
            },
            {
                "name": "firstName",
                "type": "varchar(50)",
                "default": "",
                "des": "收货人姓名(名)"
            },
            {
                "name": "PurchaseOrderId",
                "type": "varchar(255)",
                "default": "",
                "des": "采购单号"
            },
            {
                "name": "PurchaseUserName",
                "type": "varchar(50)",
                "default": "",
                "des": "采购用户"
            },
            {
                "name": "PurchaseShipping",
                "type": "varchar(150)",
                "default": "",
                "des": "采购运费"
            },
            {
                "name": "PurchaseStatus",
                "type": "tinyint",
                "default": "0",
                "des": "采购状态（0:待采购;1:待付款;2:已付款;3:退款中;4:取消;5:已付款（问题订单）;6:待取消（废弃）;7:问题订单(未发货);8:假运单号(已发货);9:申请二次采购;10:退款完成;11:采购退款失败;）"
            },
            {
                "name": "PurchaseOrderStatus",
                "type": "varchar(50)",
                "default": "",
                "des": "采购订单状态（同步采购后的订单状态）"
            },
            {
                "name": "Entrust",
                "type": "tinyint",
                "default": "0",
                "des": "委托状态（0:未委托;1:已委托;）"
            },
            {
                "name": "isDeliver",
                "type": "bit",
                "default": "0",
                "des": "是否发货（0:未发货;1:已发货;）主要用于采购后找出已发货的订单"
            },
            {
                "name": "EntrustPrice",
                "type": "Money",
                "default": "0",
                "des": "委托金额"
            },
            {
                "name": "ExchangeRate",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "汇率（1美元=6.3人民币元=6.3汇率）"
            },
            {
                "name": "ProfitMargin",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "委托订单利润率（如：1.05）"
            },
            {
                "name": "deliveryDeadline",
                "type": "integer",
                "default": "0",
                "des": "发货截止时间"
            },
            {
                "name": "proviceFirstStageName",
                "type": "varchar(100)",
                "default": "",
                "des": "国标收货地址第一级地址"
            },
            {
                "name": "addressCitySecondStageName",
                "type": "varchar(100)",
                "default": "",
                "des": "国标收货地址第二级地址"
            },
            {
                "name": "addressCountiesThirdStageName",
                "type": "varchar(100)",
                "default": "",
                "des": "国标收货地址第三级地址"
            },
            {
                "name": "city",
                "type": "varchar(50)",
                "default": "",
                "des": "买家城市"
            },
            {
                "name": "country",
                "type": "varchar(50)",
                "default": "",
                "des": "买家国家"
            },
            {
                "name": "OrderID",
                "type": "varchar(50)",
                "default": "",
                "des": "订单编号"
            },
            {
                "name": "province",
                "type": "varchar(50)",
                "default": "",
                "des": "买家州/省"
            },
            {
                "name": "vatNumber",
                "type": "varchar(50)",
                "default": "",
                "des": "税号"
            },
            {
                "name": "abn",
                "type": "varchar(20)",
                "default": "",
                "des": "识别号码"
            },
            {
                "name": "commissionAmount",
                "type": "Money",
                "default": "0",
                "des": "佣金金额(来源平台收的金额)"
            },
            {
                "name": "MoneyTotal",
                "type": "Money",
                "default": "0",
                "des": "订单总金额(实收金额)"
            },
            {
                "name": "MoneyGoods",
                "type": "Money",
                "default": "0",
                "des": "订单总额(加运费后的价格)"
            },
            {
                "name": "InvoiceType",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "InvoiceContent",
                "type": "text",
                "default": "",
                "des": "发票内容，包括抬头、商品名称、金额等"
            },
            {
                "name": "Invoiced",
                "type": "integer",
                "default": "0",
                "des": "是否已开票"
            },
            {
                "name": "Remark",
                "type": "text",
                "default": "",
                "des": "买家备注"
            },
            {
                "name": "MoneyReceipt",
                "type": "Money",
                "default": "0",
                "des": "已收款"
            },
            {
                "name": "reducePrice",
                "type": "Money",
                "default": "0",
                "des": "订单降价金额"
            },
            {
                "name": "risePrice",
                "type": "Money",
                "default": "0",
                "des": "订单涨价金额"
            },
            {
                "name": "BeginDate",
                "type": "integer",
                "default": "0",
                "des": "开始服务日期"
            },
            {
                "name": "InputTime",
                "type": "integer",
                "default": "0",
                "des": "录入时间"
            },
            {
                "name": "ContactMan",
                "type": "varchar(50)",
                "default": "",
                "des": "收货人姓名"
            },
            {
                "name": "address",
                "type": "varchar(255)",
                "default": "",
                "des": "收货地址"
            },
            {
                "name": "address2",
                "type": "varchar(255)",
                "default": "",
                "des": "收货地址2"
            },
            {
                "name": "Zip",
                "type": "varchar(10)",
                "default": "",
                "des": "邮编"
            },
            {
                "name": "Mobile",
                "type": "varchar(50)",
                "default": "",
                "des": "手机"
            },
            {
                "name": "Phone",
                "type": "varchar(50)",
                "default": "",
                "des": "联系电话"
            },
            {
                "name": "QQ",
                "type": "varchar(50)",
                "default": "",
                "des": "QQ"
            },
            {
                "name": "Email",
                "type": "varchar(50)",
                "default": "",
                "des": "Email"
            },
            {
                "name": "paymenttype",
                "type": "integer",
                "default": "0",
                "des": "付款方式"
            },
            {
                "name": "DeliverType",
                "type": "varchar(100)",
                "default": "",
                "des": "送货方式 (存放物流APIopen，买家选择物流方式)"
            },
            {
                "name": "Status",
                "type": "varchar(50)",
                "default": "",
                "des": "<table><tr class=\"thead2\"><td colspan=\"2\">订单状态【速卖通】</td></tr><tr align=\"center\"><td>状态</td><td>说明</td></tr><tr align=\"center\"><td>PLACE_ORDER_SUCCESS</td><td>等待买家付款</td></tr><tr align=\"center\"><td>IN_CANCEL</td><td>买家申请取消</td></tr><tr align=\"center\"><td>WAIT_SELLER_SEND_GOODS</td><td>等待您发货</td></tr><tr align=\"center\"><td>SELLER_PART_SEND_GOODS</td><td>部分发货</td></tr><tr align=\"center\"><td>WAIT_BUYER_ACCEPT_GOODS</td><td>等待买家收货</td></tr><tr align=\"center\"><td>FUND_PROCESSING</td><td>买家确认收货后，等待退放款处理的状态</td></tr><tr align=\"center\"><td>FINISH</td><td>已结束的订单</td></tr><tr align=\"center\"><td>IN_ISSUE</td><td>含纠纷的订单</td></tr><tr align=\"center\"><td>IN_FROZEN</td><td>冻结中的订单</td></tr><tr align=\"center\"><td>WAIT_SELLER_EXAMINE_MONEY</td><td>等待您确认金额</td></tr><tr align=\"center\"><td>RISK_CONTROL</td><td>订单处于风控24小时中，从买家在线支付完成后开始，持续24小时</td></tr><tr class=\"thead2\"><td colspan=\"2\">订单状态【敦煌网/本站】</td></tr><tr align=\"center\"><td>状态</td><td>说明</td></tr><tr align=\"center\"><td>111000</td><td>订单取消</td></tr><tr align=\"center\"><td>101003</td><td>等待买家付款</td></tr><tr align=\"center\"><td>102001</td><td>买家已付款，等待平台确认</td></tr><tr align=\"center\"><td>103001</td><td>等待您发货</td></tr><tr align=\"center\"><td>105001</td><td>买家退款中，等待协商结果</td></tr><tr align=\"center\"><td>105002</td><td>退款协议已达成</td></tr><tr align=\"center\"><td>105003</td><td>部分退款后，等待发货</td></tr><tr align=\"center\"><td>105004</td><td>买家取消退款申请</td></tr><tr align=\"center\"><td>103002</td><td>已部分发货</td></tr><tr align=\"center\"><td>101009</td><td>等待买家确认收货</td></tr><tr align=\"center\"><td>106001</td><td>退款/退货协商中，等待协议达成</td></tr><tr align=\"center\"><td>106002</td><td>买家投诉到平台</td></tr><tr align=\"center\"><td>106003</td><td>协议已达成，执行中</td></tr><tr align=\"center\"><td>102006</td><td>已确认收货</td></tr><tr align=\"center\"><td>102007</td><td>超过预定期限，自动确认收货</td></tr><tr align=\"center\"><td>102111</td><td>交易成功</td></tr><tr align=\"center\"><td>111111</td><td>交易关闭</td></tr></table>"
            },
            {
                "name": "DeliverStatus",
                "type": "integer",
                "default": "0",
                "des": "物流状态(0:全部发货;1部分发货;)"
            },
            {
                "name": "EnableDownload",
                "type": "integer",
                "default": "0",
                "des": "是否允许下载"
            },
            {
                "name": "PresentMoney",
                "type": "Money",
                "default": "0",
                "des": "返还的现金券"
            },
            {
                "name": "PresentPoint",
                "type": "integer",
                "default": "0",
                "des": "赠送点券"
            },
            {
                "name": "PresentScore",
                "type": "integer",
                "default": "0",
                "des": "得到的积分"
            },
            {
                "name": "DiscountPayment",
                "type": "integer",
                "default": "0",
                "des": "付款方式的折扣"
            },
            {
                "name": "ChargeDeliver",
                "type": "Money",
                "default": "0",
                "des": "运费"
            },
            {
                "name": "PayToUser",
                "type": "integer",
                "default": "0",
                "des": "付款给卖家标志"
            },
            {
                "name": "CouponUserID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "UseScoreisshop",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "NoUseCouponMoney",
                "type": "Money",
                "default": "0",
                "des": "不使用优惠券抵扣金额"
            },
            {
                "name": "UseCouponMoney",
                "type": "Money",
                "default": "0",
                "des": "使用优惠券抵扣金额"
            },
            {
                "name": "PayTime",
                "type": "integer",
                "default": "0",
                "des": "支付时间"
            },
            {
                "name": "ToCity",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Weight",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "OrderType",
                "type": "integer",
                "default": "0",
                "des": "1团购单 0商品单"
            },
            {
                "name": "Ip",
                "type": "varchar(50)",
                "default": "",
                "des": "购买IP"
            },
            {
                "name": "Refer",
                "type": "varchar(255)",
                "default": "",
                "des": "来源URL"
            },
            {
                "name": "from",
                "type": "varchar(100)",
                "default": "",
                "des": "来源(空:商成订单;fast:快速下单;aliexpress:速卖通订单;dhgate:敦煌网订单)"
            },
            {
                "name": "UseScoreMoney",
                "type": "money",
                "default": "0",
                "des": "使用积分抵扣的金额"
            },
            {
                "name": "UseScore",
                "type": "integer",
                "default": "",
                "des": "使用了积分"
            },
            {
                "name": "TotalScore",
                "type": "integer",
                "default": "",
                "des": "记录总的得积分数"
            },
            {
                "name": "DeliveryDate",
                "type": "integer",
                "default": "0",
                "des": "发货时间"
            },
            {
                "name": "ScoreTF",
                "type": "tinyint",
                "default": "0",
                "des": "1积分已送出 0积分未送出"
            },
            {
                "name": "product",
                "type": "text",
                "default": "",
                "des": "产品信息"
            },
            {
                "name": "alipaytradeno",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "alipaytradestatus",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "paymentplatId",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "PayStatus",
                "type": "integer",
                "default": "0",
                "des": "付款方式 0未付款 1已付清 2已付定金 3.已退款 100.不用在线支付"
            },
            {
                "name": "InvoiceCode",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "Invoiceaddress",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "InvoiceTel",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "InvoiceBank",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "InvoiceBankCard",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "buyerConfirmDate",
                "type": "integer",
                "default": "0",
                "des": "买家确认收货时间"
            },
            {
                "name": "inAccountDate",
                "type": "integer",
                "default": "0",
                "des": "入账时间"
            },
            {
                "name": "cancelDate",
                "type": "integer",
                "default": "0",
                "des": "交易取消时间"
            },
            {
                "name": "warnReason",
                "type": "varchar(255)",
                "default": "",
                "des": "警告原因(对于来源平台，会给订单的警告)"
            }
        ]
    },
    {
        "name": "keys",
        "des": "搜索关键词维护表",
        "db": "pro",
        "dbType": "sqlite",
        //"sql": [
        //  "create unique index pk_keys ON @.keys(@.keys)"
        //],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "keys",
                "type": "varchar(50)",
                "default": "0 unique",
                "des": "搜索关键词"
            },
            {
                "name": "proNum",
                "type": "integer",
                "default": "0",
                "des": "产品数"
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": "第一次搜索时间"
            },
            {
                "name": "hit",
                "type": "integer",
                "default": "0",
                "des": "搜索频率(次)"
            },
            {
                "name": "LastUseTime",
                "type": "integer",
                "default": "0",
                "des": "最后搜索时间"
            }
        ]
    },
    {
        "name": "logedays",
        "des": "有效期明细表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "UserName",
                "type": "varchar(50)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "user",
                "type": "varchar(50)",
                "default": "",
                "des": "操作员"
            },
            {
                "name": "Edays",
                "type": "integer",
                "default": "0",
                "des": "有效天数"
            },
            {
                "name": "InOrOutFlag",
                "type": "integer",
                "default": "0",
                "des": "类型1-增加,2-减少"
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": "操作时间"
            },
            {
                "name": "IP",
                "type": "varchar(20)",
                "default": "",
                "des": "IP地址"
            },
            {
                "name": "Descript",
                "type": "text",
                "default": "",
                "des": "备注"
            }
        ]
    },
    {
        "name": "loginvoice",
        "des": "发票日志表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "OrderID",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "InvoiceTitle",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "UserName",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "ClientName",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "InvoiceType",
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "InvoiceNum",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "InvoiceContent",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "InvoiceDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "HandlerName",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Inputer",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "MoneyTotal",
                "type": "money",
                "default": "0",
                "des": ""
            },
            {
                "name": "InputTime",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "logmoney",
        "des": "资金明细表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "UserName",
                "type": "varchar(50)",
                "default": "",
                "des": "会员名"
            },
            {
                "name": "ClientName",
                "type": "varchar(100)",
                "default": "",
                "des": "客户姓名"
            },
            {
                "name": "examine",
                "type": "tinyint",
                "default": "0",
                "des": "审核状态(0:未审核;1:审核通过;2:需要更新;3:需要替换;4:重新审核;)"
            },
            {
                "name": "Money",
                "type": "Money",
                "default": "0",
                "des": "支付金额"
            },
            {
                "name": "CurrMoney",
                "type": "Money",
                "default": "0",
                "des": "余额"
            },
            {
                "name": "ChannelID",
                "type": "integer",
                "default": "0",
                "des": "模型ID"
            },
            {
                "name": "userID",
                "type": "integer",
                "default": "0",
                "des": "用户表ID"
            },
            {
                "name": "Type",
                "type": "integer",
                "default": "0",
                "des": "类型 1人工充值  2.推荐返款充值，3委托扣款 4购买点券，5订单取消退款"
            },
            {
                "name": "IncomeOrPayOut",
                "type": "integer",
                "default": "0",
                "des": "类型 1,收入 2,支出"
            },
            {
                "name": "OrderID",
                "type": "varchar(30)",
                "default": "",
                "des": "支付的订单ID（坤在用，我匆动）"
            },
            {
                "name": "PaymentID",
                "type": "integer",
                "default": "",
                "des": "在线支付的支付单ID"
            },
            {
                "name": "Remark",
                "type": "text",
                "default": "",
                "des": "备注"
            },
            {
                "name": "Time",
                "type": "integer",
                "default": "0",
                "des": "退款或汇款日期"
            },
            {
                "name": "Inputer",
                "type": "varchar(50)",
                "default": "",
                "des": "操作员"
            },
            {
                "name": "IP",
                "type": "varchar(50)",
                "default": "",
                "des": "IP"
            },
            {
                "name": "Times",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Income",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "MoneyType",
                "type": "integer",
                "default": "0",
                "des": "交易方式（1：现金；2：汇款；3：在线支付；4：虚拟货币；5：提现；5：奖励；）"
            },
            {
                "name": "LogTime",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "qiandao",
        "des": "签到",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "qdxq",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Username",
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "IP",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Status",
                "type": "tinyint",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "shopbundlesale",
        "des": "捆绑销售的商品",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "proid",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "kbproid",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "kbprice",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "province",
        "des": "省份表",
        "db": "pro",
        "dbType": "sqlite",
        //"sql": [
        //  "create index @.Parentid ON @.province(@.Parentid)"
        //],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "City",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Citys",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "OrderID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Parentid",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "logpoint",
        "des": "点券明细表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "user",
                "type": "varchar(50)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "userID",
                "type": "integer",
                "default": "0",
                "des": "用户ID"
            },
            {
                "name": "addTime",
                "type": "integer",
                "default": "0",
                "des": "收入或支出的时间"
            },
            {
                "name": "IP",
                "type": "varchar(20)",
                "default": "",
                "des": "交易的IP地址"
            },
            {
                "name": "InOrOutFlag",
                "type": "tinyint",
                "default": "0",
                "des": "类型1-收入,2-支出"
            },
            {
                "name": "Point",
                "type": "integer",
                "default": "0",
                "des": "交易点数"
            },
            {
                "name": "CurrPoint",
                "type": "integer",
                "default": "0",
                "des": "可用点数"
            },
            {
                "name": "Des",
                "type": "text",
                "default": "",
                "des": "备注"
            }
        ]
    },
    {
        "name": "logscore",
        "des": "积分明细表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "Name",
                "type": "varchar(50)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "IP",
                "type": "varchar(50)",
                "default": "",
                "des": "提交时IP"
            },
            {
                "name": "User",
                "type": "varchar(50)",
                "default": "",
                "des": "操作员"
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "InOrOutFlag",
                "type": "tinyint",
                "default": "0",
                "des": "操作类型（1:收入;2:支出;）"
            },
            {
                "name": "Score",
                "type": "integer",
                "default": "0",
                "des": "交易点数"
            },
            {
                "name": "CurrScore",
                "type": "integer",
                "default": "0",
                "des": "当前点数"
            },
            {
                "name": "type",
                "type": "tinyint",
                "default": "0",
                "des": "类型（0:手工添加;1：点广告;2:点友情链接;）"
            },
            {
                "name": "Descript",
                "type": "varchar(255)",
                "default": "",
                "des": "操作备注"
            }
        ]
    },
    {
        "name": "usercard",
        "des": "充值卡管理表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "CardNum",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "CardPass",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "UserName",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Money",
                "type": "Money",
                "default": "0",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "EndDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "UseDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "GroupName",
                "type": "varchar(200)",
                "default": "",
                "des": ""
            },
            {
                "name": "AllowGroupID",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "CardType",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "ValidNum",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "ValidUnit",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "IsUsed",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "IsSale",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "GroupID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "ExpireGroupID",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "tempproduct",
        //"sql": [
        //  "create index @.commend ON @.tempproduct(@.commend)",
        //  "create index @.letter ON @.tempproduct(@.letter)",
        //  "create index @.hide ON @.tempproduct(@.hide)",
        //  "create index @.inbase ON @.tempproduct(@.inbase)"
        //],
        "des": "产品表临时库",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "SizeTemplate",
                "type": "text",
                "default": "",
                "des": "产品尺码模板代码"
            },
            {
                "name": "Followers",
                "type": "integer",
                "default": "0",
                "des": "店铺关注量"
            },
            {
                "name": "shopScore",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "店铺评分"
            },
            {
                "name": "ReviewsNum",
                "type": "integer",
                "default": "0",
                "des": "评论数量"
            },
            {
                "name": "shopName",
                "type": "varchar(100)",
                "default": "",
                "des": "店铺名称"
            },
            {
                "name": "HistoryPrice",
                "type": "varchar(255)",
                "default": "",
                "des": "历史价格。如：[{price:\"均价1\",price:\"时间1\"},{price:\"均价2\",price:\"时间2\"}]"
            },
            {
                "name": "shopid",
                "type": "integer",
                "default": "0",
                "des": "店铺ID"
            },
            {
                "name": "shopUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "店铺地址"
            },
            {
                "name": "videoUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "视频地址"
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": "商品名称"
            },
            {
                "name": "from",
                "type": "varchar(255)",
                "default": "",
                "des": "来源"
            },
            {
                "name": "aeopAeProductPropertys",
                "type": "text",
                "default": "",
                "des": "自定义属性"
            },
            {
                "name": "aeopAeProductSKUs",
                "type": "text",
                "default": "",
                "des": "价格属性"
            },
            {
                "name": "lotNum",
                "type": "integer",
                "default": "0",
                "des": "每包件数"
            },
            {
                "name": "promiseTemplateId",
                "type": "integer",
                "default": "0",
                "des": "服务模板"
            },
            {
                "name": "freightTemplateId",
                "type": "integer",
                "default": "0",
                "des": "运费模板"
            },
            {
                "name": "length",
                "type": "integer",
                "default": "0",
                "des": "长"
            },
            {
                "name": "isImageWatermark",
                "type": "bit",
                "default": "0",
                "des": "图片是否加水印的标识。true为打水印,false不打水印"
            },
            {
                "name": "width",
                "type": "integer",
                "default": "0",
                "des": "宽"
            },
            {
                "name": "height",
                "type": "integer",
                "default": "0",
                "des": "高"
            },
            {
                "name": "deliveryTime",
                "type": "integer",
                "default": "0",
                "des": "备货期"
            },
            {
                "name": "isImageDynamic",
                "type": "bit",
                "default": "0",
                "des": "商品主图图片类型：多动态图填true,静态单图填false"
            },
            {
                "name": "LimitBuyTaskID",
                "type": "integer",
                "default": "0",
                "des": "抢购任务ID"
            },
            {
                "name": "type",
                "type": "varchar(18)",
                "default": "",
                "des": "商品分类ID"
            },
            {
                "name": "keywords",
                "type": "varchar(255)",
                "default": "",
                "des": "meta标签里的关键词"
            },
            {
                "name": "color",
                "type": "varchar(20)",
                "default": "",
                "des": "商品标题颜色"
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "商品图片"
            },
            {
                "name": "err",
                "type": "text",
                "default": "",
                "des": "错误内容"
            },
            {
                "name": "pic1",
                "type": "varchar(255)",
                "default": "",
                "des": "首图"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "商品详情"
            },
            {
                "name": "description",
                "type": "varchar(512)",
                "default": "",
                "des": "meta标签里的description"
            },
            {
                "name": "IsLimitBuy",
                "type": "tinyint",
                "default": "0",
                "des": "是否限时限量 0:限时抢购 1:限量抢购"
            },
            {
                "name": "hit",
                "type": "integer",
                "default": "0",
                "des": "点击量"
            },
            {
                "name": "dayhit",
                "type": "integer",
                "default": "0",
                "des": "日点击量"
            },
            {
                "name": "weekhit",
                "type": "integer",
                "default": "0",
                "des": "周点击量"
            },
            {
                "name": "monthhit",
                "type": "integer",
                "default": "0",
                "des": "月点击量"
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": "商品备注"
            },
            {
                "name": "digg",
                "type": "integer",
                "default": "0",
                "des": "【顶】次数"
            },
            {
                "name": "LimitBuyAmount",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "enname",
                "type": "varchar(120)",
                "default": "",
                "des": "英文标题"
            },
            {
                "name": "letter",
                "type": "varchar(1)",
                "default": "",
                "des": "标题首字母"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "datetime",
                "type": "integer",
                "default": "0",
                "des": "修改时间"
            },
            {
                "name": "commend",
                "type": "tinyint",
                "default": "0",
                "des": "推荐星级"
            },
            {
                "name": "SaleNum",
                "type": "integer",
                "default": "0",
                "des": "已销售数量"
            },
            {
                "name": "tread",
                "type": "integer",
                "default": "0",
                "des": "【踩】次数"
            },
            {
                "name": "amount",
                "type": "integer",
                "default": "0",
                "des": "数量"
            },
            {
                "name": "downdata",
                "type": "text",
                "default": "",
                "des": "上传附件地址"
            },
            {
                "name": "attribute",
                "type": "text",
                "default": "",
                "des": "购物车属性"
            },
            {
                "name": "price",
                "type": "Money",
                "default": "0",
                "des": "售价，当有多个价格时，该价格为平均价格"
            },
            {
                "name": "MinPrice",
                "type": "Money",
                "default": "0",
                "des": "最小售价"
            },
            {
                "name": "MaxPrice",
                "type": "Money",
                "default": "0",
                "des": "最大售价"
            },
            {
                "name": "PriceMarket",
                "type": "Money",
                "default": "0",
                "des": "市场价"
            },
            {
                "name": "LimitBuyPrice",
                "type": "Money",
                "default": "0",
                "des": "抢购价"
            },
            {
                "name": "AttributeCart",
                "type": "text",
                "default": "",
                "des": "购物车属性"
            },
            {
                "name": "Unit",
                "type": "varchar(50)",
                "default": "",
                "des": "商品单位"
            },
            {
                "name": "score",
                "type": "integer",
                "default": "0",
                "des": "积分"
            },
            {
                "name": "Discount",
                "type": "money",
                "default": "0",
                "des": "折扣率（折）"
            },
            {
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": "是否隐藏（1:隐藏 0:显示）"
            },
            {
                "name": "ScoreSend",
                "type": "integer",
                "default": "0",
                "des": "赚送积分"
            },
            {
                "name": "AlarmNum",
                "type": "integer",
                "default": "0",
                "des": "库存报警下限数量"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "Review",
                "type": "numeric(2,1)",
                "default": "0",
                "des": "购买后客户给的评分"
            },
            {
                "name": "brand",
                "type": "varchar(255)",
                "default": "",
                "des": "品牌"
            },
            {
                "name": "fromUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "来源URL"
            },
            {
                "name": "inbase",
                "type": "tinyint",
                "default": "0",
                "des": "入库状态（0：未入库;1：已入库）"
            },
            {
                "name": "examine",
                "type": "tinyint",
                "default": "0",
                "des": "审核状态(0:未审核;1:审核通过;2:需要更新;3:需要替换;4:重新审核;)"
            },
            {
                "name": "Weight",
                "type": "numeric(10,2)",
                "default": "0",
                "des": "单重量"
            }
        ]
    },
    {
        "name": "shopbundleselect",
        "des": "捆邦",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "ProID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Pid",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "AttributeCart",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "Amount",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "UserName",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Price",
                "type": "Money",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "user",
        "des": "用户表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "shopName",
                "type": "varchar(100)",
                "default": "",
                "des": "店铺名称"
            },
            {
                "name": "commend",
                "type": "tinyint",
                "default": "0",
                "des": "推荐星级"
            },
            {
                "name": "Name",
                "type": "varchar(50)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "FirstName",
                "type": "varchar(50)",
                "default": "",
                "des": "用户名（性）"
            },
            {
                "name": "LastName",
                "type": "varchar(50)",
                "default": "",
                "des": "用户名（名）"
            },
            {
                "name": "nickname",
                "type": "varchar(50)",
                "default": "",
                "des": "昵称"
            },
            {
                "name": "pwd",
                "type": "varchar(32)",
                "default": "",
                "des": "密码"
            },
            {
                "name": "regTime",
                "type": "integer",
                "default": "0",
                "des": "注册时间"
            },
            {
                "name": "face",
                "type": "varchar(255)",
                "default": "",
                "des": "头像"
            },
            {
                "name": "Email",
                "type": "varchar(255)",
                "default": "",
                "des": "邮件"
            },
            {
                "name": "age",
                "type": "integer",
                "default": "0",
                "des": "年龄"
            },
            {
                "name": "isEntrust",
                "type": "bit",
                "default": "1",
                "des": "是否全权委托"
            },
            {
                "name": "RecommendID",
                "type": "integer",
                "default": "0",
                "des": "推荐人ID"
            },
            {
                "name": "score",
                "type": "integer",
                "default": "0",
                "des": "积分"
            },
            {
                "name": "looked",
                "type": "integer",
                "default": "0",
                "des": "是否审核0正常1锁定"
            },
            {
                "name": "LoginTime",
                "type": "integer",
                "default": "",
                "des": "登陆时间"
            },
            {
                "name": "type",
                "type": "varchar(50)",
                "default": "",
                "des": "1企业会员 0普通会员"
            },
            {
                "name": "LastLoginTime",
                "type": "integer",
                "default": "0",
                "des": "上次登陆时间"
            },
            {
                "name": "LoginTimes",
                "type": "integer",
                "default": "0",
                "des": "登录次数"
            },
            {
                "name": "level",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "birthday",
                "type": "varchar(50)",
                "default": "",
                "des": "生日"
            },
            {
                "name": "sex",
                "type": "varchar(50)",
                "default": "",
                "des": "性别"
            },
            {
                "name": "qq",
                "type": "varchar(50)",
                "default": "",
                "des": "QQ"
            },
            {
                "name": "Zip",
                "type": "varchar(50)",
                "default": "",
                "des": "邮政编码"
            },
            {
                "name": "Mobile",
                "type": "varchar(50)",
                "default": "",
                "des": "手机"
            },
            {
                "name": "Question",
                "type": "varchar(50)",
                "default": "",
                "des": "密码问题"
            },
            {
                "name": "Answer",
                "type": "varchar(50)",
                "default": "",
                "des": "问题答案"
            },
            {
                "name": "RealName",
                "type": "varchar(50)",
                "default": "",
                "des": "真实姓名"
            },
            {
                "name": "address",
                "type": "varchar(200)",
                "default": "",
                "des": "联系地址"
            },
            {
                "name": "Money",
                "type": "Money",
                "default": "0",
                "des": "可用金额"
            },
            {
                "name": "GroupID",
                "type": "integer",
                "default": "0",
                "des": "用户组ID，0为未指定"
            },
            {
                "name": "QQopenid",
                "type": "varchar(32)",
                "default": "",
                "des": "QQ验证ID"
            },
            {
                "name": "alipayID",
                "type": "varchar(50)",
                "default": "",
                "des": "支付宝验证ID"
            },
            {
                "name": "alipay",
                "type": "varchar(50)",
                "default": "",
                "des": "支付宝账号"
            },
            {
                "name": "weixin",
                "type": "varchar(50)",
                "default": "",
                "des": "微信账号"
            },
            {
                "name": "EDays",
                "type": "integer",
                "default": "",
                "des": "有效天数"
            },
            {
                "name": "BeginDate",
                "type": "integer",
                "default": "0",
                "des": "开始计费日期"
            },
            {
                "name": "PostNum",
                "type": "integer",
                "default": "0",
                "des": "发帖数"
            },
            {
                "name": "BestTopicNum",
                "type": "integer",
                "default": "0",
                "des": "最好的话题数"
            },
            {
                "name": "ClubGradeID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Medal",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "Prestige",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "LockOnClub",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "ChargeType",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "locked",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "Point",
                "type": "integer",
                "default": "0",
                "des": "点数"
            },
            {
                "name": "OfficeTel",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "gradeid",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "LoginIP",
                "type": "varchar(50)",
                "default": "",
                "des": "登陆IP"
            },
            {
                "name": "LastLoginIP",
                "type": "varchar(50)",
                "default": "",
                "des": "最后登陆IP"
            },
            {
                "name": "IDCard",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Fax",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Province",
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "City",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "HomePage",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "ICQ",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "MSN",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "UC",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Sign",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "Privacy",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "CheckNum",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "random",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "AllianceUser",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "HomeTel",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "IsOnline",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "ClubSpecialPower",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "UserCardID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "SinaId",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "IsApi",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "qiandao",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "qiandao_m",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "qiandao_xqco",
                "type": "text",
                "default": "",
                "des": ""
            }
        ]
    },
    {
        "name": "shop",
        "des": "商品店铺",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "from",
                "type": "varchar(150)",
                "default": "",
                "des": "来源（如：aliexpress）"
            },
            {
                "name": "fromid",
                "type": "integer",
                "default": "0",
                "des": "店铺ID"
            },
            {
                "name": "name",
                "type": "varchar(150)",
                "default": "",
                "des": "店铺名"
            },
            {
                "name": "score1",
                "type": "tinyint",
                "default": "0",
                "des": "描述相符（评分）"
            },
            {
                "name": "score2",
                "type": "tinyint",
                "default": "0",
                "des": "服务态度（评分）"
            },
            {
                "name": "score3",
                "type": "tinyint",
                "default": "0",
                "des": "发货速度（评分）"
            },
            {
                "name": "Rank",
                "type": "integer",
                "default": "0",
                "des": "等级"
            },
            {
                "name": "address",
                "type": "varchar(150)",
                "default": "",
                "des": "地址"
            },
            {
                "name": "logo",
                "type": "varchar(250)",
                "default": "",
                "des": "店铺LOGO"
            },
            {
                "name": "Banner",
                "type": "varchar(250)",
                "default": "",
                "des": "店铺横幅"
            },
            {
                "name": "key",
                "type": "varchar(250)",
                "default": "",
                "des": "店铺关键词"
            },
            {
                "name": "Group",
                "type": "text",
                "default": "",
                "des": "店铺内分组（用json格式）"
            }
        ]
    },
    {
        "name": "pro",
        "des": "商品表",
        "db": "pro",
        "dbType": "sqlite",
        //"sql": [
        //  "create index @.type ON @.pro(@.type)",
        //  "create index @.commend ON @.pro(@.commend)",
        //  "create index @.letter ON @.pro(@.letter)",
        //  "create index @.from ON @.pro(@.from)",
        //  "create index @.hide ON @.pro(@.hide)"
        //],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "proid",
                "type": "varchar(10)",
                "default": "",
                "des": "商品编码"
            },
            {
                "name": "shopName",
                "type": "varchar(100)",
                "default": "",
                "des": "店铺名称"
            },
            {
                "name": "shopScore",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "店铺评分"
            },
            {
                "name": "SizeTemplate",
                "type": "text",
                "default": "",
                "des": "产品尺码模板代码"
            },
            {
                "name": "Followers",
                "type": "integer",
                "default": "0",
                "des": "店铺关注量"
            },
            {
                "name": "HistoryPrice",
                "type": "text",
                "default": "",
                "des": "历史价格。如：[{price:\"均价1*\",price:\"时间1\"},{price:\"均价2\",price:\"重采时间2\"}]"
            },
            {
                "name": "shopUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "店铺地址"
            },
            {
                "name": "videoUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "视频地址"
            },
            {
                "name": "keywords",
                "type": "varchar(255)",
                "default": "",
                "des": "meta标签里的keywords"
            },
            {
                "name": "description",
                "type": "varchar(512)",
                "default": "",
                "des": "meta标签里的description"
            },
            {
                "name": "aeopAeProductPropertys",
                "type": "text",
                "default": "",
                "des": "自定义属性"
            },
            {
                "name": "aeopAeProductSKUs",
                "type": "text",
                "default": "",
                "des": "价格属性"
            },
            {
                "name": "freightTemplateId",
                "type": "integer",
                "default": "0",
                "des": "运费模板"
            },
            {
                "name": "promiseTemplateId",
                "type": "integer",
                "default": "0",
                "des": "服务模板"
            },
            {
                "name": "deliveryTime",
                "type": "integer",
                "default": "0",
                "des": "备货期"
            },
            {
                "name": "wsValidNum",
                "type": "integer",
                "default": "0",
                "des": "商品有效天数"
            },
            {
                "name": "packageType",
                "type": "bit",
                "default": "0",
                "des": "打包销售"
            },
            {
                "name": "isLock",
                "type": "bit",
                "default": "0",
                "des": "是否锁定（将正在更新的数据锁定，防止重复更新）0:不锁定;1:锁定;"
            },
            {
                "name": "checkPrice",
                "type": "bit",
                "default": "0",
                "des": "False:【单价格】与True:【多价格】"
            },
            {
                "name": "lotNum",
                "type": "integer",
                "default": "0",
                "des": "每包件数"
            },
            {
                "name": "bulkOrder",
                "type": "integer",
                "default": "0",
                "des": "批发最小数量"
            },
            {
                "name": "bulkDiscount",
                "type": "integer",
                "default": "0",
                "des": "批发折扣 扩大100倍，存整数。取值范围:1-99。注意：这是折扣，不是打折率。 如,打68折,则存32。批发最小数量和批发折扣需同时有值或无值。"
            },
            {
                "name": "isImageDynamic",
                "type": "bit",
                "default": "0",
                "des": "商品主图图片类型：多动态图填true,静态单图填false。"
            },
            {
                "name": "isImageWatermark",
                "type": "bit",
                "default": "0",
                "des": "图片是否加水印的标识。true为打水印,false不打水印"
            },
            {
                "name": "type",
                "type": "varchar(18)",
                "default": "",
                "des": "商品分类ID"
            },
            {
                "name": "typeID",
                "type": "integer",
                "default": "",
                "des": "内容页的模板ID（即TYPE表中的ID）"
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": "商品名称"
            },
            {
                "name": "from",
                "type": "varchar(100)",
                "default": "",
                "des": "来源"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "Review",
                "type": "numeric(2,1)",
                "default": "0",
                "des": "购买后客户给的评分"
            },
            {
                "name": "shopid",
                "type": "integer",
                "default": "0",
                "des": "店铺ID"
            },
            {
                "name": "fromUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "来源URL"
            },
            {
                "name": "color",
                "type": "varchar(20)",
                "default": "",
                "des": "商品标题颜色"
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "商品图片"
            },
            {
                "name": "pic1",
                "type": "varchar(255)",
                "default": "",
                "des": "首图"
            },
            {
                "name": "pic1Md5",
                "type": "varchar(32)",
                "default": "",
                "des": "首图MD5"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "商品详情"
            },
            {
                "name": "commend",
                "type": "tinyint",
                "default": "0",
                "des": "推荐星级"
            },
            {
                "name": "hit",
                "type": "integer",
                "default": "0",
                "des": "点击量"
            },
            {
                "name": "dayhit",
                "type": "integer",
                "default": "0",
                "des": "日点击量"
            },
            {
                "name": "weekhit",
                "type": "integer",
                "default": "0",
                "des": "周点击量"
            },
            {
                "name": "monthhit",
                "type": "integer",
                "default": "0",
                "des": "月点击量"
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": "商品备注"
            },
            {
                "name": "digg",
                "type": "integer",
                "default": "0",
                "des": "【顶】次数"
            },
            {
                "name": "tread",
                "type": "integer",
                "default": "0",
                "des": "【踩】次数"
            },
            {
                "name": "enname",
                "type": "varchar(120)",
                "default": "",
                "des": "英文标题"
            },
            {
                "name": "letter",
                "type": "varchar(1)",
                "default": "",
                "des": "标题首字母"
            },
            {
                "name": "StartDate",
                "type": "integer",
                "default": "0",
                "des": "开始时间"
            },
            {
                "name": "EndDate",
                "type": "integer",
                "default": "0",
                "des": "结束时间"
            },
            {
                "name": "time1",
                "type": "integer",
                "default": "0",
                "des": "扫描时间。主要判断【是否404】【是否已下架】"
            },
            {
                "name": "time2",
                "type": "integer",
                "default": "0",
                "des": "找出发往美国【运费太贵】的商品的扫描时间，当【运费模板】的【采商品时间】大于该时间，说明是要扫描的商品"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "datetime",
                "type": "integer",
                "default": "0",
                "des": "修改时间"
            },
            {
                "name": "IsLimitbuy",
                "type": "tinyint",
                "default": "0",
                "des": "是否限时限量 0:限时抢购 1:限量抢购"
            },
            {
                "name": "totalnum",
                "type": "integer",
                "default": "0",
                "des": "库存数量"
            },
            {
                "name": "score",
                "type": "integer",
                "default": "0",
                "des": "积分"
            },
            {
                "name": "SaleNum",
                "type": "integer",
                "default": "0",
                "des": "已销售数量"
            },
            {
                "name": "ReviewsNum",
                "type": "integer",
                "default": "0",
                "des": "评论数量"
            },
            {
                "name": "downdata",
                "type": "text",
                "default": "",
                "des": "上传附件地址"
            },
            {
                "name": "attribute",
                "type": "text",
                "default": "",
                "des": "购物车属性"
            },
            {
                "name": "price",
                "type": "money",
                "default": "0",
                "des": "售价，当有多个价格时，该价格为平均价格"
            },
            {
                "name": "MinPrice",
                "type": "money",
                "default": "0",
                "des": "最小售价"
            },
            {
                "name": "MaxPrice",
                "type": "money",
                "default": "0",
                "des": "最大售价"
            },
            {
                "name": "PriceMarket",
                "type": "money",
                "default": "0",
                "des": "市场价"
            },
            {
                "name": "LimitBuyPrice",
                "type": "money",
                "default": "0",
                "des": "抢购价"
            },
            {
                "name": "AttributeCart",
                "type": "text",
                "default": "",
                "des": "购物车属性"
            },
            {
                "name": "Discount",
                "type": "money",
                "default": "0",
                "des": "折扣率（折）"
            },
            {
                "name": "Unit",
                "type": "varchar(50)",
                "default": "",
                "des": "商品单位"
            },
            {
                "name": "AlarmNum",
                "type": "integer",
                "default": "0",
                "des": "库存报警下限数量"
            },
            {
                "name": "Weight",
                "type": "numeric(10,2)",
                "default": "0",
                "des": "单重量"
            },
            {
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": "显示状态（0:显示;1:隐藏;2:数据错误;3:审核未通过;4:品牌商投诉;5:疑似侵权;6:禁卖品牌;7:重复商品;8:标题重复;9:首图重复;）"
            },
            {
                "name": "err",
                "type": "text",
                "default": "",
                "des": "错误内容"
            },
            {
                "name": "ScoreSend",
                "type": "integer",
                "default": "0",
                "des": "赚送积分"
            },
            {
                "name": "LimitBuyTaskID",
                "type": "integer",
                "default": "0",
                "des": "抢购任务ID"
            },
            {
                "name": "brand",
                "type": "varchar(50)",
                "default": "",
                "des": "品牌"
            },
            {
                "name": "height",
                "type": "varchar(50)",
                "default": "",
                "des": "高"
            },
            {
                "name": "width",
                "type": "varchar(50)",
                "default": "",
                "des": "宽"
            },
            {
                "name": "length",
                "type": "varchar(50)",
                "default": "",
                "des": "长"
            },
            {
                "name": "Property",
                "type": "varchar(255)",
                "default": "",
                "des": "商品属性（0:无;1:新品;2热卖;3:特价;4:抢;5:首发;6:清仓;7:独家;8:人气;9:话费;10:惊爆价;11:分期优惠;12:抢完;）"
            },
            {
                "name": "ServiceTerm",
                "type": "integer",
                "default": "0",
                "des": "升级年限"
            },
            {
                "name": "IsDiscount",
                "type": "tinyint",
                "default": "0",
                "des": "允许折扣"
            },
            {
                "name": "FreeShipping",
                "type": "integer",
                "default": "0",
                "des": "未知"
            },
            {
                "name": "WholesaleNum",
                "type": "integer",
                "default": "0",
                "des": "未知"
            },
            {
                "name": "WholesalePrice",
                "type": "Money",
                "default": "0",
                "des": "未知"
            },
            {
                "name": "PriceMember",
                "type": "Money",
                "default": "0",
                "des": "未知"
            },
            {
                "name": "examine",
                "type": "tinyint",
                "default": "0",
                "des": "审核状态(0:未审核;1:审核通过;2:需要更新;3:需要替换;4:重新审核;)"
            }
        ]
    },
    {
        "name": "review",
        "des": "评论",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "name",
                "type": "varchar(100)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "from",
                "type": "varchar(20)",
                "default": "",
                "des": "类型（空:本站留言;news:本站新闻;video:本站视频;product:本站产品;aliexpress:速卖通产品）"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "内容"
            },
            {
                "name": "ip",
                "type": "varchar(50)",
                "default": "",
                "des": "IP"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "pic",
                "type": "varchar(255)",
                "default": "",
                "des": "图片"
            },
            {
                "name": "CountryCode",
                "type": "varchar(3)",
                "default": "",
                "des": "国家代码"
            },
            {
                "name": "CountryName",
                "type": "varchar(255)",
                "default": "",
                "des": "国家"
            },
            {
                "name": "Rank",
                "type": "integer",
                "default": "0",
                "des": "等级"
            },
            {
                "name": "Price",
                "type": "money",
                "default": "0",
                "des": "单价"
            },
            {
                "name": "Quantity",
                "type": "integer",
                "default": "0",
                "des": "数量"
            },
            {
                "name": "Unit",
                "type": "varchar(50)",
                "default": "",
                "des": "单位"
            },
            {
                "name": "LotNum",
                "type": "integer",
                "default": "0",
                "des": "每包数量"
            },
            {
                "name": "Star",
                "type": "integer",
                "default": "0",
                "des": "星级"
            },
            {
                "name": "BuyerFeedback",
                "type": "text",
                "default": "",
                "des": "买家反馈"
            },
            {
                "name": "SupplierReply",
                "type": "text",
                "default": "",
                "des": "供应商的回复"
            },
            {
                "name": "BuyerReply",
                "type": "text",
                "default": "",
                "des": "买方的答复"
            },
            {
                "name": "DiggUp",
                "type": "integer",
                "default": "0",
                "des": "顶"
            },
            {
                "name": "DiggDown",
                "type": "integer",
                "default": "0",
                "des": "踩"
            }
        ]
    },
    {
        "name": "attr",
        "des": "属性表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "from",
                "type": "varchar(150)",
                "default": "",
                "des": "来源"
            },
            {
                "name": "name",
                "type": "varchar(150)",
                "default": "",
                "des": "属性英文名"
            },
            {
                "name": "nameCn",
                "type": "varchar(150)",
                "default": "",
                "des": "属性中文名"
            },
            {
                "name": "attrId",
                "type": "integer",
                "default": "0",
                "des": "属性ID"
            },
            {
                "name": "cateId",
                "type": "varchar(15)",
                "default": "",
                "des": "分类ID"
            },
            {
                "name": "buyAttr",
                "type": "bit",
                "default": "0",
                "des": "是否购买属性（购买时，必选项）"
            },
            {
                "name": "saleAttr",
                "type": "bit",
                "default": "0",
                "des": "是否销售属性（购买时，非必选项）"
            },
            {
                "name": "required",
                "type": "bit",
                "default": "0",
                "des": "是否必填"
            },
            {
                "name": "isother",
                "type": "bit",
                "default": "0",
                "des": "是否有other属性值"
            },
            {
                "name": "style",
                "type": "tinyint",
                "default": "0",
                "des": "类目选择样式(1：文本 2：图片 3：图文；)"
            },
            {
                "name": "defined",
                "type": "bit",
                "default": "0",
                "des": "属性的属性值是否可以自定义修改"
            },
            {
                "name": "ischild",
                "type": "bit",
                "default": "0",
                "des": "是否子属性（好加事件）"
            },
            {
                "name": "childUpId",
                "type": "integer",
                "default": "0",
                "des": "父属性值ID（好知道该组是从哪个属性值ID上出来的，就是子属性）"
            },

            {
                "name": "isshow",
                "type": "bit",
                "default": "0",
                "des": "初次是否显示(子属性会用上)"
            },
            {
                "name": "type",
                "type": "varchar(150)",
                "default": "",
                "des": "显示方式<br/>DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框<br/>SMT:input:文字 list_box:单选类型 interval:单选类型 check_box:多选类型"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序（显示出来的时后很重要）"
            },
            {
                "name": "js",
                "type": "text",
                "default": "",
                "des": "js代码"
            }
        ]
    },
    {
        "name": "orderitem",
        "des": "订购项目表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "OrderID",
                "type": "varchar(50)",
                "default": "",
                "des": "订单ID"
            },
            {
                "name": "from",
                "type": "varchar(50)",
                "default": "",
                "des": "来源"
            },
            {
                "name": "ProID",
                "type": "varchar(20)",
                "default": "",
                "des": "产品编码（非产品ID,本数据库编码）"
            },
            {
                "name": "fromID",
                "type": "integer",
                "default": "0",
                "des": "来源ID（产品ID，下单时的来源ID）"
            },
            {
                "name": "SaleType",
                "type": "integer",
                "default": "0",
                "des": "销售类型 1--正常销售 2--换购 3--赠送 4--批发"
            },
            {
                "name": "PriceOriginal",
                "type": "money",
                "default": "0",
                "des": "原价"
            },
            {
                "name": "CostPrice",
                "type": "money",
                "default": "0",
                "des": "成本单价"
            },
            {
                "name": "Price",
                "type": "money",
                "default": "0",
                "des": "商品单价"
            },
            {
                "name": "RealPrice",
                "type": "money",
                "default": "0",
                "des": "实际销售价"
            },
            {
                "name": "Amount",
                "type": "integer",
                "default": "0",
                "des": "订购数量"
            },
            {
                "name": "TotalPrice",
                "type": "money",
                "default": "0",
                "des": "订购金额"
            },
            {
                "name": "BeginDate",
                "type": "integer",
                "default": "0",
                "des": "开始计算服务期限日期"
            },
            {
                "name": "ServiceTerm",
                "type": "integer",
                "default": "0",
                "des": "服务期限"
            },
            {
                "name": "Remark",
                "type": "text",
                "default": "",
                "des": "备注"
            },
            {
                "name": "PresentMoney",
                "type": "money",
                "default": "0",
                "des": "返还的现金券"
            },
            {
                "name": "PresentPoint",
                "type": "integer",
                "default": "0",
                "des": "赠送点券"
            },
            {
                "name": "PresentExp",
                "type": "integer",
                "default": "0",
                "des": "赠送的积分"
            },
            {
                "name": "AttributeCart",
                "type": "varchar(255)",
                "default": "",
                "des": "产品属性"
            },
            {
                "name": "IsChangedBuy",
                "type": "tinyint",
                "default": "0",
                "des": "是否换购品"
            },
            {
                "name": "PackID",
                "type": "integer",
                "default": "0",
                "des": "礼包ID"
            },
            {
                "name": "LimitBuyTaskID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "IsLimitBuy",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "BundleSaleProID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "zip",
                "type": "varchar(10)",
                "default": "",
                "des": ""
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "图片"
            },
            {
                "name": "Unit",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "ip",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "PurchaseURL",
                "type": "varchar(255)",
                "default": "",
                "des": "采购链接"
            },
            {
                "name": "fromURL",
                "type": "varchar(255)",
                "default": "",
                "des": "来源链接"
            },
            {
                "name": "AttrID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "IsMember",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Score",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "currencyCode",
                "type": "varchar(10)",
                "default": "",
                "des": "货币单位"
            }
        ]
    },
    {
        "name": "paymentplat",
        "des": "支付平台表",
        "db": "pro",
        "dbType": "sqlite",
        //"sql": [
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('网银在线','20303579','网银在线',1,7,0,'http://merchant3.chinabank.com.cn/register.do',1,'kesion',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('中国在线支付网','000000','中国在线支付网',1,7,0,'http://www.ipay.cn/home/index.php',2,'aaaaaaaaaa',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('上海环迅','000000','上海环迅',1,7,0,'https://www.ips.com.cn/',3,'aaaaaaaaaa',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('西部支付','000000','西部支付',1,7,0,'http://www.yeepay.com/',4,'aaaaaaaaaa',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('l88888','000000','l88888',1,7,0,'http://new.xpay.cn/SignUp/Default.aspx',5,'aaaaaaaaaa',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('云网支付','000000','云网支付',1,7,0,'https://www.cncard.net/products/products.asp',6,'aaaaaaaaaa',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.Key,@.MD5Key,@.RateByUser)VALUES ('支付宝','huangxingjl02@163.com','支付宝',0,7,1,'https://b.alipay.com/newIndex.htm',7,'2088102437140721','40tptq1k54bfhyeltxvt8huq8pucthec',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('快钱支付','1001307179101','快钱支付',1,7,0,'https://www.99bill.com/website/',8,'KFKBZJJKEJM38AFF',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('支付宝担保交易接口','kesioncms@hotmail.com','支付宝担保交易接口',1,7,0,'http://act.life.alipay.com/systembiz/kesion/',9,'|',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('财付通','1211401701','财付通',1,7,0,'http://union.tenpay.com/mch/mch_register.shtml?sp_suggestuser=1202640601',10,'52433660530ef61cc4cb1e365b08fcd7',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('财付通中介交易','111394','财付通中介交易',1,7,0,'http://union.tenpay.com/mch/mch_register_1.shtml?sp_suggestuser=1202640601',11,'',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('PayPal国际','B2YKP3UWAUZT8','PayPal国际',1,7,0,'https://www.paypal.com/c2/cgi-bin/webscr?cmd=_registration-run',12,'MGpTkVSkOZTtbC6WhmKI7uxMs34NaU232wV6BloCOXN6pHj2wa7kmIZ3j0S',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('PayPal贝宝','kesioni30@sina.com','PayPal贝宝',1,7,0,'https://www.paypal.com/cn/cgi-bin/webscr?cmd=_registration-run',13,'lulHstdXZEf0eDsQbOCYmo_5ja3C5y-WPJf81j0eDFScnnZEv0M7YQZkZR0',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('宝易互通','1001','宝易互通',1,7,0,'https://www.umbpay.com/mer/',14,'111111',1)",
        //  "insert into @.paymentplat(@.name,@.accountid,@.des,@.Rate,@.IsDefault,@.IsDisabled,@.platreg,@.OrderID,@.MD5Key,@.RateByUser)VALUES ('支付宝标准双接口','0','支付宝标准双接口',1,7,0,'http://act.life.alipay.com/systembiz/kesion/',15,'0',1)"
        //],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "Name",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "AccountID",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Key",
                "type": "varchar(50)",
                "default": "",
                "des": "支付账号Key"
            },
            {
                "name": "MD5Key",
                "type": "varchar(100)",
                "default": "",
                "des": "支付账号MD5Key"
            },
            {
                "name": "Rate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "RateByUser",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "OrderID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "IsDisabled",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "IsDefault",
                "type": "tinyint",
                "default": "0",
                "des": ""

            },
            {
                "name": "PlatReg",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            }
        ]
    },
    {
        "name": "paymenttype",
        "des": "付款方式表",
        "db": "pro",
        "dbType": "sqlite",
        //"sql": [
        //  "insert into @.paymenttype(@.name,@.Discount,@.orderid,@.isDefault)VALUES ('在线支付',100,1,1)",
        //  "insert into @.paymenttype(@.name,@.Discount,@.orderid,@.isDefault)VALUES ('余额支付',100,2,0)",
        //  "insert into @.paymenttype(@.name,@.Discount,@.orderid,@.isDefault)VALUES ('银行转帐',100,3,0)",
        //  "insert into @.paymenttype(@.name,@.Discount,@.orderid,@.isDefault)VALUES ('邮局汇款',100,4,0)",
        //  "insert into @.paymenttype(@.name,@.Discount,@.orderid,@.isDefault)VALUES ('货到付款',100,5,0)",
        //  "insert into @.paymenttype(@.name,@.Discount,@.orderid,@.isDefault)VALUES ('现金',100,6,0)",
        //  "insert into @.paymenttype(@.name,@.Discount,@.orderid,@.isDefault)VALUES ('支票',100,7,0)"
        //],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "Name",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Discount",
                "type": "Money",
                "default": "0",
                "des": "折扣率（折）"
            },
            {
                "name": "orderid",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "isDefault",
                "type": "tinyint",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "shopcoupon",
        "des": "商店优惠券",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "FaceValue",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "MinAmount",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "CouponType",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "BeginDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "EndDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Inputer",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Status",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "MaxDiscount",
                "type": "tinyint",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "shopcouponuser",
        "des": "商店优惠券用户",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "CouponId",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "CouponNum",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "UserName",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "OrderID",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "UseTime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "UseFlag",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "MailTF",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "AvailableMoney",
                "type": "money",
                "default": "0",
                "des": ""
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": ""
            }
        ]
    },
    {
        "name": "shoplimitbuy",
        "des": "商店限制购买",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "TaskName",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "TaskType",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "LimitBuyBeginTime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "LimitBuyEndTime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "LimitBuyPayTime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Intro",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "Status",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "TemplateID",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            }
        ]
    },
    {
        "name": "shoppackageselect",
        "des": "礼包",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "ProID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "PackID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "AttributeCart",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "Amount",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "UserName",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "AttrID",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "shopspecificationprice",
        "des": "店铺规格价格",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "itemNo",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "proid",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "attr1",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "attr2",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "attr3",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "price",
                "type": "Money",
                "default": "0",
                "des": ""
            },
            {
                "name": "amount",
                "type": "integer",
                "default": "0",

                "des": ""
            },
            {
                "name": "weight",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "shopuserorder",
        "des": "收货信息表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "UserName",
                "type": "varchar(100)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "ContactMan",
                "type": "varchar(100)",
                "default": "",
                "des": "收货性名"
            },
            {
                "name": "Email",
                "type": "varchar(100)",
                "default": "",
                "des": "邮件"
            },
            {
                "name": "Mobile",
                "type": "varchar(100)",
                "default": "",
                "des": "手机"
            },
            {
                "name": "countryid",
                "type": "varchar(100)",
                "default": "",
                "des": "国家"
            },
            {
                "name": "proviceFirstStageName",
                "type": "varchar(100)",
                "default": "",
                "des": "国标收货地址第一级地址"
            },
            {
                "name": "addressCitySecondStageName",
                "type": "varchar(100)",
                "default": "",
                "des": "国标收货地址第二级地址"
            },
            {
                "name": "addressCountiesThirdStageName",
                "type": "varchar(100)",
                "default": "",
                "des": "国标收货地址第三级地址"
            },
            {
                "name": "address",
                "type": "varchar(255)",
                "default": "",
                "des": "详细收货地址信息"
            },
            {
                "name": "address2",
                "type": "varchar(255)",
                "default": "",
                "des": "详细收货地址信息2"
            },
            {
                "name": "zip",
                "type": "varchar(50)",
                "default": "",
                "des": "邮编"
            },
            {
                "name": "Phone",
                "type": "varchar(50)",
                "default": "",
                "des": "电话"
            },
            {
                "name": "QQ",
                "type": "varchar(50)",
                "default": "",
                "des": "QQ"
            }
        ]
    },
    {
        "name": "shoppingcart",
        "des": "购物车表",
        "db": "pro",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "adddate",
                "type": "integer",
                "default": "0",
                "des": "加入购物车时间"
            },
            {
                "name": "username",
                "type": "varchar(100)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "userid",
                "type": "integer",
                "default": "0",
                "des": "用户名ID"
            },
            {
                "name": "proid",
                "type": "varchar(10)",
                "default": "",
                "des": "商品编码"
            },
            {
                "name": "attr",
                "type": "varchar(255)",
                "default": "",
                "des": "购买后的属性"
            },
            {
                "name": "amount",
                "type": "integer",
                "default": "0",
                "des": "数量"
            }
        ]
    }
]);