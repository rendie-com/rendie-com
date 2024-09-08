'use strict';
let menuList =
    [
        {
            "name": "Shopee",
            "list": [
                {
                    "name": "类目",
                    "template": "Shopee/类目.html"
                },
                {
                    "name": "物流方式",
                    "template": "Shopee/物流方式.html"
                },
                {
                    "name": "违禁词",
                    "template": "Shopee/违禁词.html"
                },
                {
                    "name": "黑名单",
                    "template": "Shopee/黑名单.html"
                },
                {
                    "name": "品牌",
                    "template": "Shopee/品牌.html"
                },
                null,
                {
                    "name": "商品",
                    "template": "Shopee/商品.html"
                },
                {
                    "name": "营销中心",
                    "template": "Shopee/营销中心.html"
                },
                {
                    "name": "Shopee广告",
                    "template": "Shopee/Shopee广告.html"
                },
                {
                    "name": "商业分析",
                    "template": "Shopee/商业分析.html"
                },
                {
                    "name": "销售辅导",
                    "template": "Shopee/销售辅导.html"
                },
                null,                
                {
                    "name": "卖家账户",
                    "template": "Shopee/卖家账户.html"
                },
                {
                    "name": "订单",
                    "template": "Shopee/订单.html"
                },
                {
                    "name": "聊聊",
                    "template": "Shopee/聊聊.html"
                },
                null,
                {
                    "name": "开放平台",
                    "template": "Shopee/开放平台.html"
                },
                {
                    "name": "任务",
                    "template": "Shopee/任务.html"
                },
                {
                    "name": "买家账户",
                    "template": "Shopee/买家账户.html"
                },
                {
                    "name": "采集箱",
                    "template": "Shopee/采集箱.html"
                },
           ]
        },
        {
            "name": "TikTok",
            "list": [
                {
                    "name": "类目",
                    "template": "TikTok/类目.html"
                },
               {
                    "name": "商品",
                    "template": "TikTok/商品.html"
                },
                {
                    "name": "卖家账户",
                    "template": "TikTok/卖家账户.html"
                },
            ]
        },
        {
            "name": "Lazada",
            "list": [
                {
                    "name": "商品列表",
                    "template": "Lazada/商品列表.html"
                },
                {
                    "name": "卖家账户",
                    "template": "Lazada/卖家账户.html"
                },
            ]
        },
        {
            "name": "Shein",
            "list": [
                {
                    "name": "商品列表",
                    "template": "Shein/商品列表.html"
                },
                {
                    "name": "卖家账户",
                    "template": "Shein/卖家账户.html"
                },
            ]
        },
        {
            "name": "Temu",
            "list": [
                {
                    "name": "商品类目",
                    "template": "Temu/商品类目.html"
                },
                {
                    "name": "商品列表",
                    "template": "Temu/商品列表.html"
                },
                {
                    "name": "卖家账户",
                    "template": "Temu/卖家账户.html"
                },
            ]
        },
       {
            "name": "敦煌网",
            "list": [
                {
                    "name": "国家",
                    "template": "敦煌网/国家.html"
                },
                {
                    "name": "品牌",
                    "template": "敦煌网/品牌.html"
                },
                {
                    "name": "类目",
                    "template": "敦煌网/类目.html"
                },
                {
                    "name": "物流公司",
                    "template": "敦煌网/物流公司.html"
                },
                {
                    "name": "已上传商品",
                    "template": "敦煌网/已上传商品.html"
                },
                {
                    "name": "知识产权投诉",
                    "template": "敦煌网/知识产权投诉.html"
                },
                {
                    "name": "搜索词追踪",
                    "template": "敦煌网/搜索词追踪.html"
                },
                null,
                {
                    "name": "卖家账户",
                    "template": "敦煌网/卖家账户.html"
                },
                {
                    "name": "订单",
                    "template": "敦煌网/订单.html"
                },
                {
                    "name": "站内信",
                    "template": "敦煌网/站内信.html"
                },
                null,
                {
                    "name": "日常任务",
                    "template": "敦煌网/日常任务.html",
                    "default": "default"
                },
                {
                    "name": "店铺统计",
                    "template": "敦煌网/店铺统计.html"
                },
                {
                    "name": "产品分析",
                    "template": "敦煌网/产品分析.html"
                },
                {
                    "name": "提现",
                    "template": "敦煌网/提现.html"
                },
                {
                    "name": "订单统计",
                    "template": "敦煌网/订单统计.html"
                },
                null,
                {
                    "name": "开放平台",
                    "template": "敦煌网/开放平台.html"
                },
                null,
                {
                    "name": "采集",
                    "template": "敦煌网/采集.html"
                },
                {
                    "name": "采集箱",
                    "template": "敦煌网/采集箱.html"
                },
                {
                    "name": "采购账户",
                    "template": "敦煌网/采购账户.html"
                }
            ]
        },
        {
            "name": "速卖通",
            "list": [
                {
                    "name": "国家",
                    "template": "速卖通/国家.html"
                },
                {
                    "name": "品牌",
                    "template": "速卖通/品牌.html"
                },
                {
                    "name": "类目",
                    "template": "速卖通/类目.html"
                },
                {
                    "name": "物流公司",
                    "template": "速卖通/物流公司.html"
                },
                {
                    "name": "运费模板",
                    "template": "速卖通/运费模板.html"
                },
                null,
                {
                    "name": "采集",
                    "template": "速卖通/采集.html"
                },
                {
                    "name": "采集箱",
                    "template": "速卖通/采集箱.html"
                },
                {
                    "name": "采购账户",
                    "template": "速卖通/采购账户.html"
                },
                {
                    "name": "卖家账户",
                    "template": "速卖通/卖家账户.html"
                },
                null,
                {
                    "name": "开放平台",
                    "template": "速卖通/开放平台.html"
                }
            ]
        },
        {
            "name": "拼多多",
            "list": [
                {
                    "name": "采集箱",
                    "template": "拼多多/采集箱.html"
                },
                {
                    "name": "卖家账户",
                    "template": "拼多多/卖家账户.html"
                },
                {
                    "name": "采购订单",
                    "template": "拼多多/采购订单.html"
                },
            ]
        },
        {
            "name": "1688",
            "list": [
                {
                    "name": "类目",
                    "template": "1688/类目.html"
                },
                {
                    "name": "采集箱",
                    "template": "1688/采集箱.html"
                },
                {
                    "name": "买家账户",
                    "template": "1688/买家账户.html"
                },
                {
                    "name": "买家订单",
                    "template": "1688/买家订单.html"
                },
            ]
        },
        {
            "name": "淘宝",
            "list": [
                {
                    "name": "采集箱",
                    "template": "淘宝/采集箱.html"
                },
                {
                    "name": "买家账户",
                    "template": "淘宝/买家账户.html"
                },
                {
                    "name": "买家订单",
                    "template": "淘宝/买家订单.html"
                },
            ]
        },
        {
            "name": "Ozon",
            "list": [
                {
                    "name": "商品类目",
                    "template": "Ozon/商品类目.html"
                },
                {
                    "name": "商品列表",
                    "template": "Ozon/商品列表.html"
                },
                {
                    "name": "卖家账户",
                    "template": "Ozon/卖家账户.html"
                },
            ]
        },
        {
            "name": "Joom",
            "list": [
                {
                    "name": "商品列表",
                    "template": "Joom/商品列表.html"
                },
                {
                    "name": "卖家账户",
                    "template": "Joom/卖家账户.html"
                },
            ]
        },
        /*
        {
          "name": "eBay",
          "list": [
            {
              "name": "国家列表",
              "template": "eBay/国家列表.html"
            },
            {
              "name": "物流公司",
              "template": "eBay/物流公司.html"
            },
            {
              "name": "类目列表",
              "template": "eBay/类目列表.html"
            },
            {
              "name": "已上传商品",
              "template": "eBay/已上传商品.html"
            },
            null,
            {
              "name": "eBay账户",
              "template": "eBay/eBay账户.html"
            },
            null,
            {
              "name": "开放开台",
              "template": "eBay/开放开台.html"
            }
          ]
        },
        {
          "name": "Amazon",
          "list": [
            {
              "name": "已上传商品",
              "template": "Amazon/已上传商品.html"
            },
            {
              "name": "Amazon账户",
              "template": "Amazon/Amazon账户.html"
            }
          ]
        },
        */
        {
            "name": "商品",
            "list": [
                {
                    "name": "搜索关键词维护",
                    "template": "商品/搜索关键词维护.html"
                },
                {
                    "name": "商品管理",
                    "template": "商品/商品管理.html"
                },
                {
                    "name": "地区管理",
                    "template": "工具/地区管理.html"
                },
                null,
                {
                    "name": "商品配置",
                    "template": "商品/商品配置.html"
                },
                {
                    "name": "商品订单",
                    "template": "商品/商品订单.html"
                },
                {
                    "name": "发退货查询",
                    "template": "商品/发退货查询.html"
                },
                {
                    "name": "开发票查询",
                    "template": "商品/开发票查询.html"
                },
                {
                    "name": "销售数据统计",
                    "template": "商品/销售数据统计.html"
                },
                null,
                {
                    "name": "付款方式",
                    "template": "商品/付款方式.html"
                },
                {
                    "name": "优惠券管理",
                    "template": "商品/优惠券管理.html"
                },
                {
                    "name": "捆绑商品管理",
                    "template": "商品/捆绑商品管理.html"
                },
                {
                    "name": "抢购管理",
                    "template": "商品/抢购管理.html"
                },
                {
                    "name": "收货人地址",
                    "template": "商品/收货人地址.html"
                },
                {
                    "name": "购物车",
                    "template": "商品/购物车.html"
                },
                {
                    "name": "商品属性管理",
                    "template": "商品/商品属性管理.html"
                },
                null,
                {
                    "name": "线下充值卡管理",
                    "template": "商品/线下充值卡管理.html"
                },
                {
                    "name": "线上充值卡管理",
                    "template": "商品/线上充值卡管理.html"
                },
                {
                    "name": "站内信管理",
                    "template": "商品/站内信管理.html"
                },
                {
                    "name": "会员签到管理",
                    "template": "商品/会员签到管理.html"
                },
                {
                    "name": "客户管理",
                    "template": "商品/客户管理.html"
                },
                {
                    "name": "发送邮件管理",
                    "template": "商品/发送邮件管理.html"
                },
                null,
                {
                    "name": "有效期明细",
                    "template": "商品/有效期明细.html"
                },
                {
                    "name": "积分明细",
                    "template": "商品/积分明细.html"
                },
                {
                    "name": "资金明细",
                    "template": "商品/资金明细.html"
                },
                {
                    "name": "点券明细",
                    "template": "商品/点券明细.html"
                },
                {
                    "name": "商品评论管理",
                    "template": "商品/商品评论管理.html"
                },
                null,
                {
                    "name": "来源分类",
                    "template": "商品/来源分类.html"
                },
                {
                    "name": "会员配置",
                    "template": "商品/会员配置.html"
                },
                {
                    "name": "在线支付平台",
                    "template": "商品/在线支付平台.html"
                },
                {
                    "name": "多系统接口设置",
                    "template": "商品/多系统接口设置.html"
                },
                {
                    "name": "短信平台",
                    "template": "商品/短信平台.html"
                },
                {
                    "name": "短信推广",
                    "template": "商品/短信推广.html"
                },
                null,
                {
                    "name": "微信公众平台",
                    "template": "商品/微信公众平台.html"
                },
                {
                    "name": "alibaba开放平台",
                    "template": "商品/alibaba开放平台.html"
                },
                {
                    "name": "Shopify账户",
                    "template": "商品/Shopify账户.html"
                },
                {
                    "name": "Joom账户",
                    "template": "商品/Joom账户.html"
                },
                {
                    "name": "Tophatter账户",
                    "template": "商品/Tophatter账户.html"
                },
                {
                    "name": "Cdiscount账户",
                    "template": "商品/Cdiscount账户.html"
                },
                {
                    "name": "MyMall账户",
                    "template": "商品/MyMall账户.html"
                }
            ]
        },
        {
            "name": "视频",
            "list": [
                {
                    "name": "视频采集管理",
                    "template": "视频/视频采集管理.html"
                },
                {
                    "name": "视频评论管理",
                    "template": "视频/视频评论管理.html"
                },
                {
                    "name": "视频管理",
                    "template": "视频/视频管理.html"
                },
                {
                    "name": "用户管理",
                    "template": "工具/用户管理.html"
                },
                null,
                {
                    "name": "分类转换",
                    "template": "视频/分类转换.html"
                },
                {
                    "name": "过滤字典",
                    "template": "视频/过滤字典.html"
                },
                {
                    "name": "修复数据格式",
                    "template": "视频/修复数据格式.html"
                },
                {
                    "name": "数据批量替换",
                    "template": "视频/数据批量替换.html"
                },
                {
                    "name": "删除指定来源",
                    "template": "视频/删除指定来源.html"
                },
                {
                    "name": "设置点击量",
                    "template": "视频/设置点击量.html"
                },
                {
                    "name": "无效图片清除",
                    "template": "视频/无效图片清除.html"
                },
                {
                    "name": "报错处理",
                    "template": "视频/报错处理.html"
                },
                {
                    "name": "伪原创设置",
                    "template": "视频/伪原创设置.html"
                },
                {
                    "name": "自定义标签管理",
                    "template": "视频/自定义标签管理.html"
                },
                null,
                {
                    "name": "广告管理",
                    "template": "视频/广告管理.html"
                },
                {
                    "name": "友情链接管理",
                    "template": "视频/友情链接管理.html"
                },
                {
                    "name": "留言管理",
                    "template": "视频/留言管理.html"
                },
                {
                    "name": "生成选项",
                    "template": "视频/生成选项.html"
                },
                {
                    "name": "生成百度地图",
                    "template": "视频/生成百度地图.html"
                },
                {
                    "name": "生成谷歌地图",
                    "template": "视频/生成谷歌地图.html"
                },
                {
                    "name": "生成RSS地图",
                    "template": "视频/生成RSS地图.html"
                }
            ]
        },
        {
            "name": "工具",
            "list": [
                {
                    "name": "定时任务",
                    "template": "工具/定时任务.html"
                },
                {
                    "name": "工作计划",
                    "template": "工具/工作计划.html"
                },
                {
                    "name": "网址导航",
                    "template": "工具/网址导航.html"
                },
                null,
                {
                    "name": "腾讯企业邮箱",
                    "template": "工具/腾讯企业邮箱.html"
                },
                {
                    "name": "github.com账号",
                    "template": "工具/github.com账号.html"
                },
                {
                    "name": "replit.com账号",
                    "template": "工具/replit.com账号.html"
                },
                {
                    "name": "vercel.com账号",
                    "template": "工具/vercel.com账号.html"
                },
                null,
                {
                    "name": "google.com账号",
                    "template": "工具/google.com账号.html"
                },
                {
                    "name": "cloudflare.com账号",
                    "template": "工具/cloudflare.com账号.html"
                },
                {
                    "name": "freenom.com账号",
                    "template": "工具/freenom.com账号.html"
                },
                {
                    "name": "OneDrive账号",
                    "template": "工具/OneDrive账号.html"
                },
                {
                    "name": "cpolar.com账号",
                    "template": "工具/cpolar.com账号.html"
                },
                null,
                {
                    "name": "windows插件",
                    "template": "工具/windows插件.html"
                },
                {
                    "name": "linux服务器插件",
                    "template": "工具/linux服务器插件.html"
                },
                {
                    "name": "chrome插件",
                    "template": "工具/chrome插件.html"
                }
            ]
        },
        {
            "name": "扩展",
            "list": [
                {
                    "name": "论坛配置",
                    "template": "论坛/论坛配置.html"
                },
                {
                    "name": "论坛管理",
                    "template": "论坛/论坛管理.html"
                },
                {
                    "name": "论坛等级头衔",
                    "template": "论坛/论坛等级头衔.html"
                },
                {
                    "name": "论坛勋章管理",
                    "template": "论坛/论坛勋章管理.html"
                },
                null,
                {
                    "name": "问答参数配置",
                    "template": "论坛/问答参数配置.html"
                },
                {
                    "name": "问答等级头衔",
                    "template": "论坛/问答等级头衔.html"
                },
                {
                    "name": "问答专家认证管理",
                    "template": "论坛/问答专家认证管理.html"
                },
                {
                    "name": "问答管理",
                    "template": "论坛/问答管理.html"
                },
                {
                    "name": "新闻评论管理",
                    "template": "扩展/新闻评论管理.html"
                },
                {
                    "name": "新闻管理",
                    "template": "扩展/新闻管理.html"
                },
                {
                    "name": "图片管理",
                    "template": "扩展/图片管理.html"
                },
                {
                    "name": "新闻项目管理",
                    "template": "扩展/新闻项目管理.html"
                },
                {
                    "name": "图片项目管理",
                    "template": "扩展/图片项目管理.html"
                },
                {
                    "name": "客户项目管理",
                    "template": "扩展/客户项目管理.html"
                },
                null,
                {
                    "name": "空间参数设置",
                    "template": "扩展/空间参数设置.html"
                },
                {
                    "name": "个人空间管理",
                    "template": "扩展/个人空间管理.html"
                },
                {
                    "name": "空间博文管理",
                    "template": "扩展/空间博文管理.html"
                },
                {
                    "name": "微博数据管理",
                    "template": "扩展/微博数据管理.html"
                },
                {
                    "name": "用户相册管理",
                    "template": "扩展/用户相册管理.html"
                },
                {
                    "name": "用户圈子管理",
                    "template": "扩展/用户圈子管理.html"
                },
                {
                    "name": "用户留言管理",
                    "template": "扩展/用户留言管理.html"
                },
                {
                    "name": "用户歌曲管理",
                    "template": "扩展/用户歌曲管理.html"
                },
                null,
                {
                    "name": "企业空间管理",
                    "template": "扩展/企业空间管理.html"
                },
                {
                    "name": "企业新闻管理",
                    "template": "扩展/企业新闻管理.html"
                },
                {
                    "name": "企业产品管理",
                    "template": "扩展/企业产品管理.html"
                },
                {
                    "name": "行业广告管理",
                    "template": "扩展/行业广告管理.html"
                },
                {
                    "name": "荣誉证书管理",
                    "template": "扩展/荣誉证书管理.html"
                }
            ]
        },
        {
            "name": "系统",
            "list": [
                {
                    "name": "站点信息",
                    "template": "系统/站点信息.html"
                },
                {
                    "name": "系统配置",
                    "template": "系统/系统配置.html"
                },
                {
                    "name": "SQL助手",
                    "template": "系统/SQL助手.html"
                },
                {
                    "name": "标签助手",
                    "template": "系统/标签助手.html"
                },
                null,
                {
                    "name": "文件管理",
                    "template": "系统/文件管理.html"
                },
                {
                    "name": "导入、导出",
                    "template": "系统/导入、导出.html"
                },
                {
                    "name": "数据表",
                    "template": "系统/数据表.html"
                },
                {
                    "name": "插件",
                    "template": "系统/插件.html"
                },
                null,
                {
                    "name": "后台分类",
                    "template": "系统/后台分类.html"
                },
                {
                    "name": "用户组",
                    "template": "系统/用户组.html"
                },
                {
                    "name": "系统账号",
                    "template": "系统/系统账号.html"
                },
                null,
                {
                    "name": "后台登陆日志",
                    "template": "系统/后台登陆日志.html"
                },
                {
                    "name": "访问日志",
                    "template": "系统/访问日志.html"
                },
                {
                    "name": "出错日志",
                    "template": "系统/出错日志.html"
                },
                null,
                {
                    "name": "IP库",
                    "template": "系统/IP库.html"
                }
            ]
        }
    ]