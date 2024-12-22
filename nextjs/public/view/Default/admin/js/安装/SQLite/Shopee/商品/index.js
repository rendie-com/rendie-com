'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "全球商品",
        database: "shopee/商品/全球商品",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "BeforeReview",
                type: "tinyint",
                default: "0",
                des: "审核前本地状态(主要是记录更新时，出现的错误信息)"
            },
            {
                name: "discount",
                type: "tinyint",
                default: "0",
                des: "折扣（以后发布商品，就用这个折扣。）"
            },
            {
                name: "type1",
                type: "integer",
                default: "0",
                des: "一级速卖通商品分类ID（发布到各个站点时要用）"
            },
            {
                name: "ManualReview_1688_categoryId1",
                type: "integer",
                default: "0",
                des: "手动审核1688一级商品分类ID（发布到各个站点时要用）"
            },
            {
                name: "penalty_type",
                type: "tinyint",
                default: "0",
                des: "更新后违规类型"
            },
            {
                name: "ManualReview_1688",
                type: "tinyint",
                default: "0",
                des: "手动审核1688状态"
            },
            {
                name: "ManualReview_1688_fromid",
                type: "numeric(18,0)",
                default: "0",
                des: "人工审核的来源ID，用来当采购货源。"
            },
            {
                name: "ManualReview_1688_unitWeight",
                type: "numeric(8,4)",
                default: "0",
                des: "手动审核1688后单位重量，算shopee运费要用。"
            },
            {
                name: "ManualReview_1688_state",
                type: "tinyint",
                default: "0",
                des: "人工审核的来源ID对应的商品状态，当更新时可知道，采购货源状态。"
            },
            {
                name: "ManualReview_1688_video_status",
                type: "tinyint",
                default: "0",
                des: "1688人工审核视频状态----做活动要排序要用"
            },
            {
                name: "ManualReview_1688_ExplanationVideo_status",
                type: "tinyint",
                default: "0",
                des: "人工审核讲解视频状态-----上传视频时备选视频要用"
            },
            {
                name: "DHAfterReview",
                type: "tinyint",
                default: "0",
                des: "敦煌-审核后本地状态(主要是记录更新成功后，被敦煌审核后，出现审核不通过，按原因划分的状态)"
            },
            {
                name: "ManualReview_1688_subject",
                type: "varchar(255)",
                default: "",
                des: "标题----发布时就用这个标题"
            },
            {
                name: "tw_nameLen",
                type: "integer",
                default: "0",
                des: "发布后台湾语标题长度"
            },
            {
                name: "tw_2_nameLen",
                type: "integer",
                default: "0",
                des: "手动审核对后,翻译后，台湾语标题长度----因为shopee要求【商品名称的建议字数为 25~100】"
            },
            {
                name: "tw_name",
                type: "varchar(255)",
                default: "",
                des: "发布后台湾标题"
            },
            {
                name: "tw_1_name",
                type: "varchar(255)",
                default: "",
                des: "重新审核对后,翻译前台湾标题"
            },
            {
                name: "tw_2_name",
                type: "varchar(255)",
                default: "",
                des: "重新审核对后,翻译后台湾标题"
            },
            {
                name: "ms_nameLen",
                type: "integer",
                default: "0",
                des: "发布后马来语标题长度----因为shopee要求【商品名称的建议字数为 25~100】"
            },
            {
                name: "ms_name",
                type: "varchar(255)",
                default: "",
                des: "发布后马来标题"
            },
            {
                name: "en_nameLen",
                type: "integer",
                default: "0",
                des: "发布后英语标题长度----因为shopee要求【商品名称的建议字数为 25~100】"
            },
            {
                name: "en_name",
                type: "varchar(255)",
                default: "",
                des: "发布后英语标题"
            },
            {
                name: "pt_nameLen",
                type: "integer",
                default: "0",
                des: "发布后葡萄牙语标题长度----因为shopee要求【商品名称的建议字数为 25~100】"
            },
            {
                name: "pt_name",
                type: "varchar(255)",
                default: "",
                des: "发布后葡萄牙语标题长度"
            },
            {
                name: "ManualReview_1688_description",
                type: "text",
                default: "",
                des: "详情----发布时就用这个"
            },
            {
                name: "tw_description",
                type: "text",
                default: "",
                des: "翻译成台湾语后的详情"
            },
            {
                name: "ms_description",
                type: "text",
                default: "",
                des: "翻译成马来语后的详情"
            },
            {
                name: "en_description",
                type: "text",
                default: "",
                des: "翻译成英语后的详情"
            },
            {
                name: "pt_description",
                type: "text",
                default: "",
                des: "翻译成葡萄牙语后的详情"
            },
            {
                name: "shopee_8pic",
                type: "text",
                default: "",
                des: "shopee的9个图片中剩下的8个图片"
            },
            {
                name: "err",
                type: "varchar(255)",
                default: "",
                des: "出错说明"
            },
            {
                name: "ManualReview",
                type: "tinyint",
                default: "0",
                des: "人工审核状态"
            },
            {
                name: "upUserID",
                type: "integer",
                default: "0",
                des: "上传去哪的用户名的ID"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "0 unique",
                des: "产品编码(如：R12345)"
            },
            {
                name: "video",
                type: "varchar(255)",
                default: "",
                des: "上传后的主视频，是个json格式"
            },
            {
                name: "ExplanationVideo",
                type: "varchar(255)",
                default: "",
                des: "上传后的讲解视频，是个json格式"
            },
            {
                name: "pic",
                type: "varchar(255)",
                default: "",
                des: "首图"
            },
            {
                name: "tw_ads_key",
                type: "varchar(50)",
                default: "",
                des: "马来站点-广告-主推关键词"
            },
            {
                name: "tw_ads_keywords",
                type: "text",
                default: "",
                des: "马来站点-广告-启用的关键词"
            },
            {
                name: "my_ads_key",
                type: "varchar(50)",
                default: "",
                des: "马来站点-广告-主推关键词"
            },
            {
                name: "my_ads_keywords",
                type: "text",
                default: "",
                des: "马来站点-广告-启用的关键词"
            },
            {
                name: "br_ads_key",
                type: "varchar(50)",
                default: "",
                des: "巴西站点-广告-主推关键词"
            },
            {
                name: "br_ads_keywords",
                type: "text",
                default: "",
                des: "巴西站点-广告-启用的关键词"
            },
            {
                name: "fromID",
                type: "numeric(18,0)",
                default: "0",
                des: "全球商品ID（上传成功返回的数据ID）"
            },
            {
                name: "isUp",
                type: "bit",
                default: "0",
                des: "是否已上传到【Shopee全球商品】"
            },
            {
                name: "editStatus",
                type: "tinyint",
                default: "0",
                des: "修改状态（0：未修改；1：第一次修改；2：第二次修改；）"
            },
            {
                name: "isMY",
                type: "bit",
                default: "0",
                des: "是否发布到【马来西亚】站点"
            },
            {
                name: "isBR",
                type: "bit",
                default: "0",
                des: "是否发布到【巴西】站点"
            },
            {
                name: "isTW",
                type: "bit",
                default: "0",
                des: "是否发布到【台湾】站点"
            },
            {
                name: "isSG",
                type: "bit",
                default: "0",
                des: "是否发布到【新加坡】站点"
            },
            {
                name: "isUpImg",
                type: "bit",
                default: "0",
                des: "是否已上传图片到【Shopee平台】，为什么要这个字段？答：上传图片太慢了，用这个会快一点。"
            },
            {
                name: "ManualReview_1688_categoryId",
                type: "integer",
                default: "0",
                des: "1688类目ID---绑定类目时要用"
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
            }
        ]
    },
    {
        name: "table",
        des: "【新加坡】店铺商品",
        database: "shopee/商品/店铺商品/sg",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
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
                name: "ismakevideo",
                type: "bit",
                default: "0",
                des: "是否生成视频"
            },
            {
                name: "discount",
                type: "tinyint",
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
                type: "bit",
                default: "0",
                des: "商品能否做折扣活动"
            },
            {
                name: "isPic1WaterMark",
                type: "bit",
                default: "0",
                des: "是否生成首图水印"
            },
            {
                name: "isSignUp",
                type: "bit",
                default: "0",
                des: "商品能否报名活动"
            },
            {
                name: "isTrueSignUp",
                type: "bit",
                default: "0",
                des: "是否已报名活动"
            },
            {
                name: "isSeckill",
                type: "bit",
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
                type: "tinyint",
                default: "0",
                des: "shopee的商品状态"
            },
            {
                name: "_1688_fromid",
                type: "integer",
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
                type: "bit",
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
        name: "table",
        des: "【台湾虾皮】店铺商品",
        database: "shopee/商品/店铺商品/tw",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
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
                name: "ismakevideo",
                type: "bit",
                default: "0",
                des: "是否生成视频"
            },
            {
                name: "discount",
                type: "tinyint",
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
                type: "bit",
                default: "0",
                des: "商品能否做折扣活动"
            },
            {
                name: "isPic1WaterMark",
                type: "bit",
                default: "0",
                des: "是否生成首图水印"
            },
            {
                name: "isSignUp",
                type: "bit",
                default: "0",
                des: "商品能否报名活动"
            },
            {
                name: "isTrueSignUp",
                type: "bit",
                default: "0",
                des: "是否已报名活动"
            },
            {
                name: "isSeckill",
                type: "bit",
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
                type: "tinyint",
                default: "0",
                des: "shopee的商品状态"
            },
            {
                name: "_1688_fromid",
                type: "integer",
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
                type: "bit",
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
        name: "table",
        des: "【马来西亚】店铺商品",
        database: "shopee/商品/店铺商品/my",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
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
                name: "ismakevideo",
                type: "bit",
                default: "0",
                des: "是否生成视频"
            },
            {
                name: "discount",
                type: "tinyint",
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
                type: "bit",
                default: "0",
                des: "商品能否做折扣活动"
            },
            {
                name: "isPic1WaterMark",
                type: "bit",
                default: "0",
                des: "是否生成首图水印"
            },
            {
                name: "isSignUp",
                type: "bit",
                default: "0",
                des: "商品能否报名活动"
            },
            {
                name: "isTrueSignUp",
                type: "bit",
                default: "0",
                des: "是否已报名活动"
            },
            {
                name: "isSeckill",
                type: "bit",
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
                type: "tinyint",
                default: "0",
                des: "shopee的商品状态"
            },
            {
                name: "_1688_fromid",
                type: "integer",
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
                type: "bit",
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
        name: "table",
        des: "【巴西】店铺商品",
        database: "shopee/商品/店铺商品/br",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
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
                type: "tinyint",
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
                name: "ismakevideo",
                type: "bit",
                default: "0",
                des: "是否生成视频"
            },
            {
                name: "isDiscount",
                type: "bit",
                default: "0",
                des: "商品能否做折扣活动"
            },
            {
                name: "isPic1WaterMark",
                type: "bit",
                default: "0",
                des: "是否生成首图水印"
            },
            {
                name: "isSignUp",
                type: "bit",
                default: "0",
                des: "商品能否报名活动"
            },
            {
                name: "isTrueSignUp",
                type: "bit",
                default: "0",
                des: "是否已报名活动"
            },
            {
                name: "isSeckill",
                type: "bit",
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
                type: "tinyint",
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
                type: "integer",
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
                type: "bit",
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
    {
        name: "table",
        des: "禁限商品",
        database: "shopee/商品/违规或删除",
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
                name: "productId",
                type: "integer",
                default: "0",
                des: "商品ID"
            },
            {
                name: "name",
                type: "varchar(255)",
                default: "",
                des: "商品名称"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "",
                des: "商品编码"
            },
            {
                name: "pic",
                type: "varchar(50)",
                default: "",
                des: "图片"
            },
            {
                name: "status",
                type: "tinyint",
                default: "0",
                des: "商品状态"
            },
            {
                name: "penalty_type",
                type: "tinyint",
                default: "0",
                des: "违规类型"
            },
            {
                name: "description",
                type: "varchar(255)",
                default: "",
                des: " 违规原因 "
            },
            {
                name: "myExperience",
                type: "varchar(255)",
                default: "",
                des: " 我的心得，主要是记录Shopee禁我商品，我的看法。 "
            },
            {
                name: "explanation",
                type: "text",
                default: "",
                des: "建议"
            },
            {
                name: "banned_time",
                type: "integer",
                default: "0",
                des: "违规时间"
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
]);