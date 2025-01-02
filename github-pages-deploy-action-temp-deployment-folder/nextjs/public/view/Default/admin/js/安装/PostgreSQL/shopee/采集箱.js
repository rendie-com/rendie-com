// 'use strict';
// mssql = mssql.concat([
//     {
//         name: "accounts_tw",
//         des: "采集箱-粉丝TW",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index accounts_tw_userid ON @.accounts_tw(@.userid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "userid",
//                 type: "integer",
//                 default: "0 unique",
//                 des: "用户ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "follow_count",
//                 type: "integer",
//                 default: "0",
//                 des: "我的关注次数"
//             },
//             {
//                 name: "notFollow_count",
//                 type: "integer",
//                 default: "0",
//                 des: "我的取关次数"
//             },
//             {
//                 name: "follow_time",
//                 type: "integer",
//                 default: "0",
//                 des: "我的关注时间"
//             },
//             {
//                 name: "status",
//                 type: "smallint",
//                 default: "",
//                 des: "状态（如：1）----还不知道有什么用"
//             },
//             {
//                 name: "last_active_time",
//                 type: "integer",
//                 default: "0",
//                 des: "最后登录时间"
//             },
//             {
//                 name: "username",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "用户名（如：jianshao.my）"
//             },
//             {
//                 name: "shopname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺名称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "portrait",
//                 type: "varchar(50)",
//                 default: "",
//                 des: "头像（如：595170becdb25bccda3e19a3840e6e8d）"
//             },
//             {
//                 name: "is_preferred_plus",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_official_shop",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_shopee_verified",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_following",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否关注我的用户"
//             },
//             {
//                 name: "is_my_following",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否我关注的用户"
//             },
//             {
//                 name: "is_seller",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//         ]
//     },
//     {
//         name: "accounts_my",
//         des: "采集箱-粉丝MY",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index accounts_my_userid ON @.accounts_my(@.userid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "userid",
//                 type: "integer",
//                 default: "0 unique",
//                 des: "用户ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "follow_count",
//                 type: "integer",
//                 default: "0",
//                 des: "我的关注次数"
//             },
//             {
//                 name: "notFollow_count",
//                 type: "integer",
//                 default: "0",
//                 des: "我的取关次数"
//             },
//             {
//                 name: "follow_time",
//                 type: "integer",
//                 default: "0",
//                 des: "我的关注时间"
//             },
//             {
//                 name: "status",
//                 type: "smallint",
//                 default: "",
//                 des: "状态（如：1）----还不知道有什么用"
//             },
//             {
//                 name: "last_active_time",
//                 type: "integer",
//                 default: "0",
//                 des: "最后登录时间"
//             },
//             {
//                 name: "username",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "用户名（如：jianshao.my）"
//             },
//             {
//                 name: "shopname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺名称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "portrait",
//                 type: "varchar(50)",
//                 default: "",
//                 des: "头像（如：595170becdb25bccda3e19a3840e6e8d）"
//             },
//             {
//                 name: "is_preferred_plus",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_official_shop",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_shopee_verified",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_following",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否关注我的用户"
//             },
//             {
//                 name: "is_my_following",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否我关注的用户"
//             },
//             {
//                 name: "is_seller",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//         ]
//     },
//     {
//         name: "accounts_br",
//         des: "采集箱-粉丝BR",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index accounts_br_userid ON @.accounts_br(@.userid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "userid",
//                 type: "integer",
//                 default: "0 unique",
//                 des: "用户ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "follow_count",
//                 type: "integer",
//                 default: "0",
//                 des: "我的关注次数"
//             },
//             {
//                 name: "notFollow_count",
//                 type: "integer",
//                 default: "0",
//                 des: "我的取关次数"
//             },
//             {
//                 name: "follow_time",
//                 type: "integer",
//                 default: "0",
//                 des: "我的关注时间"
//             },
//             {
//                 name: "status",
//                 type: "smallint",
//                 default: "",
//                 des: "状态（如：1）----还不知道有什么用"
//             },
//             {
//                 name: "last_active_time",
//                 type: "integer",
//                 default: "0",
//                 des: "最后登录时间"
//             },
//             {
//                 name: "username",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "用户名（如：jianshao.my）"
//             },
//             {
//                 name: "shopname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺名称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "portrait",
//                 type: "varchar(50)",
//                 default: "",
//                 des: "头像（如：595170becdb25bccda3e19a3840e6e8d）"
//             },
//             {
//                 name: "is_preferred_plus",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_official_shop",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_shopee_verified",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//             {
//                 name: "is_following",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否关注我的用户"
//             },
//             {
//                 name: "is_my_following",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否我关注的用户"
//             },
//             {
//                 name: "is_seller",
//                 type: "smallint",
//                 default: "0",
//                 des: ""
//             },
//         ]
//     },
//     {
//         name: "users_tw",
//         des: "采集箱-店铺",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index users_tw_shopid ON @.users_tw(@.shopid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "shop_location",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺位置（如：中国大陆）"
//             },
//             {
//                 name: "status",
//                 type: "smallint",
//                 default: "0",
//                 des: "状态（如：1）----还不知道有什么用"
//             },
//             {
//                 name: "shopname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺名称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "get_follower_time",
//                 type: "integer",
//                 default: "0",
//                 des: "获取粉丝时间"
//             },
//             {
//                 name: "follower_count",
//                 type: "integer",
//                 default: "0",
//                 des: "粉丝数量"
//             },
//             {
//                 name: "following_count",
//                 type: "integer",
//                 default: "0",
//                 des: "关注中"
//             },
//             {
//                 name: "is_official_shop",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为官方店"
//             },
//             {
//                 name: "last_login_time",
//                 type: "integer",
//                 default: "0",
//                 des: "最后登陆时间"
//             },
//             {
//                 name: "nickname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "昵称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "portrait",
//                 type: "varchar(50)",
//                 default: "",
//                 des: "肖像（如：595170becdb25bccda3e19a3840e6e8d）"
//             },
//             {
//                 name: "products",
//                 type: "integer",
//                 default: "0",
//                 des: "商品数量"
//             },
//             {
//                 name: "response_rate",
//                 type: "smallint",
//                 default: "0",
//                 des: "聊天回应率（如：47）"
//             },
//             {
//                 name: "response_time",
//                 type: "integer",
//                 default: "0",
//                 des: "聊天回应时间（如：8501（几小时内））"
//             },
//             {
//                 name: "shop_rating",
//                 type: "numeric(8,7)",
//                 default: "0",
//                 des: "评分（如：4.90206）"
//             },
//             {
//                 name: "shopee_verified_flag",
//                 type: "smallint",
//                 default: "0",
//                 des: "评级标志"
//             },
//             {
//                 name: "show_official_shop_label",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否显示官方标志"
//             },
//             {
//                 name: "show_shopee_verified_label",
//                 type: "smallint",
//                 default: "0",
//                 des: "未知---还不知道做用"
//             },
//             {
//                 name: "userid",
//                 type: "integer",
//                 default: "0",
//                 des: "用户ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "username",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "用户名（如：jianshao.my）"
//             },
//             {
//                 name: "is_in_fss",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否报了免运活动"
//             },
//             {
//                 name: "ps_plus",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为【Preferred+】"
//             },
//             {
//                 name: "rating_good",
//                 type: "integer",
//                 default: "0",
//                 des: "好评数量（如：136372）"
//             },
//             {
//                 name: "rating_normal",
//                 type: "integer",
//                 default: "0",
//                 des: "中评数量（如：5001）"
//             },
//             {
//                 name: "rating_bad",
//                 type: "integer",
//                 default: "0",
//                 des: "差评数量（如：2040）"
//             },
//             {
//                 name: "is_shopee_choice",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为choice标志"
//             },
//         ]
//     },
//     {
//         name: "users_my",
//         des: "采集箱-店铺",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index users_my_shopid ON @.users_my(@.shopid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "shop_location",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺位置（如：中国大陆）"
//             },
//             {
//                 name: "status",
//                 type: "smallint",
//                 default: "0",
//                 des: "状态（如：1）----还不知道有什么用"
//             },
//             {
//                 name: "shopname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺名称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "get_follower_time",
//                 type: "integer",
//                 default: "0",
//                 des: "获取粉丝时间"
//             },
//             {
//                 name: "follower_count",
//                 type: "integer",
//                 default: "0",
//                 des: "粉丝数量"
//             },
//             {
//                 name: "following_count",
//                 type: "integer",
//                 default: "0",
//                 des: "关注中"
//             },
//             {
//                 name: "is_official_shop",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为官方店"
//             },
//             {
//                 name: "last_login_time",
//                 type: "integer",
//                 default: "0",
//                 des: "最后登陆时间"
//             },
//             {
//                 name: "nickname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "昵称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "portrait",
//                 type: "varchar(50)",
//                 default: "",
//                 des: "肖像（如：595170becdb25bccda3e19a3840e6e8d）"
//             },
//             {
//                 name: "products",
//                 type: "integer",
//                 default: "0",
//                 des: "商品数量"
//             },
//             {
//                 name: "response_rate",
//                 type: "smallint",
//                 default: "0",
//                 des: "聊天回应率（如：47）"
//             },
//             {
//                 name: "response_time",
//                 type: "integer",
//                 default: "0",
//                 des: "聊天回应时间（如：8501（几小时内））"
//             },
//             {
//                 name: "shop_rating",
//                 type: "numeric(8,7)",
//                 default: "0",
//                 des: "评分（如：4.90206）"
//             },
//             {
//                 name: "shopee_verified_flag",
//                 type: "smallint",
//                 default: "0",
//                 des: "评级标志"
//             },
//             {
//                 name: "show_official_shop_label",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否显示官方标志"
//             },
//             {
//                 name: "show_shopee_verified_label",
//                 type: "smallint",
//                 default: "0",
//                 des: "未知---还不知道做用"
//             },
//             {
//                 name: "userid",
//                 type: "integer",
//                 default: "0",
//                 des: "用户ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "username",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "用户名（如：jianshao.my）"
//             },
//             {
//                 name: "is_in_fss",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否报了免运活动"
//             },
//             {
//                 name: "ps_plus",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为【Preferred+】"
//             },
//             {
//                 name: "rating_good",
//                 type: "integer",
//                 default: "0",
//                 des: "好评数量（如：136372）"
//             },
//             {
//                 name: "rating_normal",
//                 type: "integer",
//                 default: "0",
//                 des: "中评数量（如：5001）"
//             },
//             {
//                 name: "rating_bad",
//                 type: "integer",
//                 default: "0",
//                 des: "差评数量（如：2040）"
//             },
//             {
//                 name: "is_shopee_choice",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为choice标志"
//             },
//         ]
//     },
//     {
//         name: "users_br",
//         des: "采集箱-店铺",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index users_br_shopid ON @.users_br(@.shopid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "shop_location",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺位置（如：中国大陆）"
//             },
//             {
//                 name: "status",
//                 type: "smallint",
//                 default: "0",
//                 des: "状态（如：1）----还不知道有什么用"
//             },
//             {
//                 name: "shopname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺名称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "get_follower_time",
//                 type: "integer",
//                 default: "0",
//                 des: "获取粉丝时间"
//             },
//             {
//                 name: "follower_count",
//                 type: "integer",
//                 default: "0",
//                 des: "粉丝数量"
//             },
//             {
//                 name: "following_count",
//                 type: "integer",
//                 default: "0",
//                 des: "关注中"
//             },
//             {
//                 name: "is_official_shop",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为官方店"
//             },
//             {
//                 name: "last_login_time",
//                 type: "integer",
//                 default: "0",
//                 des: "最后登陆时间"
//             },
//             {
//                 name: "nickname",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "昵称（如：Skullreaper Digital）"
//             },
//             {
//                 name: "portrait",
//                 type: "varchar(50)",
//                 default: "",
//                 des: "肖像（如：595170becdb25bccda3e19a3840e6e8d）"
//             },
//             {
//                 name: "products",
//                 type: "integer",
//                 default: "0",
//                 des: "商品数量"
//             },
//             {
//                 name: "response_rate",
//                 type: "smallint",
//                 default: "0",
//                 des: "聊天回应率（如：47）"
//             },
//             {
//                 name: "response_time",
//                 type: "integer",
//                 default: "0",
//                 des: "聊天回应时间（如：8501（几小时内））"
//             },
//             {
//                 name: "shop_rating",
//                 type: "numeric(8,7)",
//                 default: "0",
//                 des: "评分（如：4.90206）"
//             },
//             {
//                 name: "shopee_verified_flag",
//                 type: "smallint",
//                 default: "0",
//                 des: "评级标志"
//             },
//             {
//                 name: "show_official_shop_label",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否显示官方标志"
//             },
//             {
//                 name: "show_shopee_verified_label",
//                 type: "smallint",
//                 default: "0",
//                 des: "未知---还不知道做用"
//             },
//             {
//                 name: "userid",
//                 type: "integer",
//                 default: "0",
//                 des: "用户ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "username",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "用户名（如：jianshao.my）"
//             },
//             {
//                 name: "is_in_fss",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否报了免运活动"
//             },
//             {
//                 name: "ps_plus",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为【Preferred+】"
//             },
//             {
//                 name: "rating_good",
//                 type: "integer",
//                 default: "0",
//                 des: "好评数量（如：136372）"
//             },
//             {
//                 name: "rating_normal",
//                 type: "integer",
//                 default: "0",
//                 des: "中评数量（如：5001）"
//             },
//             {
//                 name: "rating_bad",
//                 type: "integer",
//                 default: "0",
//                 des: "差评数量（如：2040）"
//             },
//             {
//                 name: "is_shopee_choice",
//                 type: "smallint",
//                 default: "0",
//                 des: "是否为choice标志"
//             },
//         ]
//     },
//     {
//         name: "pro_tw",
//         des: "采集箱-商品-台湾",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index pro_tw_itemid ON @.pro_tw(@.itemid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "currency",
//                 type: "varchar(5)",
//                 default: "",
//                 des: "货币单位（如：MYR）----当site出错这个可以找回"
//             },
//             {
//                 name: "itemid",
//                 type: "integer",
//                 default: "0",
//                 des: "商品ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "name",
//                 type: "varchar(255)",
//                 default: "",
//                 des: "标题"
//             },
//             {
//                 name: "image",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "首图"
//             },
//             {
//                 name: "shop_location",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺位置（如：中国大陆）"
//             },
//             {
//                 name: "price",
//                 type: "integer",
//                 default: "0",
//                 des: "价格"
//             },
//             {
//                 name: "addtime",
//                 type: "integer",
//                 default: "0",
//                 des: "添加时间"
//             }
//         ]
//     },
//     {
//         name: "pro_my",
//         des: "采集箱-商品-马来西亚",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index pro_my_itemid ON @.pro_my(@.itemid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "currency",
//                 type: "varchar(5)",
//                 default: "",
//                 des: "货币单位（如：MYR）----当site出错这个可以找回"
//             },
//             {
//                 name: "itemid",
//                 type: "integer",
//                 default: "0",
//                 des: "商品ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "name",
//                 type: "varchar(255)",
//                 default: "",
//                 des: "标题"
//             },
//             {
//                 name: "image",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "首图"
//             },
//             {
//                 name: "shop_location",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺位置（如：中国大陆）"
//             },
//             {
//                 name: "price",
//                 type: "integer",
//                 default: "0",
//                 des: "价格"
//             },
//             {
//                 name: "addtime",
//                 type: "integer",
//                 default: "0",
//                 des: "添加时间"
//             }
//         ]
//     },
//     {
//         name: "pro_br",
//         des: "采集箱-商品-巴西",
//         database: "shopee_gather",
//         action: "pg02",
//         sql: [
//             "create index pro_br_itemid ON @.pro_br(@.itemid)"
//         ],
//         table: [
//             {
//                 name: "id",
//                 type: "serial primary key",
//                 default: "",
//                 des: "索引"
//             },
//             {
//                 name: "currency",
//                 type: "varchar(5)",
//                 default: "",
//                 des: "货币单位（如：MYR）----当site出错这个可以找回"
//             },
//             {
//                 name: "itemid",
//                 type: "integer",
//                 default: "0",
//                 des: "商品ID"
//             },
//             {
//                 name: "shopid",
//                 type: "integer",
//                 default: "0",
//                 des: "店铺ID"
//             },
//             {
//                 name: "name",
//                 type: "varchar(255)",
//                 default: "",
//                 des: "标题"
//             },
//             {
//                 name: "image",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "首图"
//             },
//             {
//                 name: "shop_location",
//                 type: "varchar(100)",
//                 default: "",
//                 des: "店铺位置（如：中国大陆）"
//             },
//             {
//                 name: "price",
//                 type: "integer",
//                 default: "0",
//                 des: "价格"
//             },
//             {
//                 name: "addtime",
//                 type: "integer",
//                 default: "0",
//                 des: "添加时间"
//             }
//         ]
//     },
// ]);