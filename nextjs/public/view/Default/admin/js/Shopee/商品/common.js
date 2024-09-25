Object.assign(Tool, {
    header2: function (jsFile) {
        let html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main(\'\')"'+ (!jsFile ? ' class="active"' : '') + '>平台关联</div>\
          <div onclick="Tool.main(\'?jsFile=js40\')"'+ (jsFile == "js40" ? ' class="active"' : '') + '>全球商品</div>\
          <div onclick="Tool.main(\'?jsFile=js43\')"'+ (jsFile == "js43" ? ' class="active"' : '') + '>全球商品_修改</div>\
          <div onclick="Tool.main(\'?jsFile=js04\')"'+ (jsFile == "js04" || jsFile == "js15" ? ' class="active"' : '') + '>店铺商品</div>\
          <div onclick="Tool.main(\'?jsFile=js19\')"'+ (jsFile == "js19" ? ' class="active"' : '') + '>违规或删除</div>\
          <div onclick="Tool.main(\'?jsFile=js28\')"'+ (jsFile == "js28" || jsFile == "js30" ? ' class="active"' : '') + '>图片</div>\
        </header>'
        return html;
    },
    tab: function (jsFile, site) {
        let html = '\
       <ul class="makeHtmlTab">\
            <li'+ (site == "tw" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=' + jsFile + '&site=tw\')">台湾虾皮</li>\
            <li'+ (site == "my" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=' + jsFile + '&site=my\')">马来西亚</li>\
            <li'+ (site == "br" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=' + jsFile + '&site=br\')">巴西</li>\
        </ul>'
        return html;
    },
    BeforeReview: [
        [0, "未更新"],
        [1, "更新成功"],
        [2, "类目名称丢失"],
        [3, "没绑定类目"],
        [4, "绑定不了"],
        [5, "图片个数不一致"],
        [6, "图片还未上传"],
        [7, "不能重复"],
        [8, "SKU number should be less than 100"],
        [9, "属性错误1"],
        [10, "属性错误2"],
        [11, "sku格式不对"],
        [12, "Product DTS value"],
        [13, "Option name length"],
        [14, "variation is out of limit7"],
        [15, "发货天数超过4天"]
    ],
    penalty_type: [
        [0, "未违规"],
        [1, "违禁商品"],
        [2, "仿冒品或侵犯知识产权商品"],
        [3, "劣质刊登"],
        [4, "不适当的照片"],
        [5, "资料不足"],
        [6, "改善商城商品"],
        [7, "其他上架规范"],
        [8, "发布商品失败"]
    ],
    ManualReview_1688: [
        [0, "未审核"],
        [1, "使用1688属性图", '<a href="javascript:;" onclick="fun.c10($1);" class="m-2">设置为【未更新】</a>'],
        [2, "需要修改"],
        [3, "审核不通过"],
        [4, "异常"]
    ],
    ManualReview_1688_stateArr: [
        [0, "正常"],
        [1, "404错误"],
        [2, "商品已下架"],
        [3, "采集内容已改变"],
        [4, "xxxxx"],
        [5, "xxxxx"],
        [6, "库存为零"],
        [7, "1688自已出错了"],
        [8, "1688的另一个版本"],
        [9, "xxxxx"]
    ],
    shopPro_statusArr: [
        [-3, "问题数据"],
        [-4, "下架失败"],
        [0, "未知"],
        [1, "上架商品"],
        [2, "修改后【审查中】"],
        [3, "已禁卖"],
        [4, "Shopee删除"],
        [6, "审查中"],
        [8, "未上架"],
    ],
    shopPro_unitWeight: [
        [11, "0-10克", 0, 10],
        [12, "10-20克", 10, 20],
        [13, "20-30克", 20, 30],
        [14, "30-40克", 30, 40],
        [15, "40-50克", 40, 50],
        [16, "50-60克", 50, 60],
        [17, "60-70克", 60, 70],
        [88, "70-80克", 70, 80],
        [19, "80-90克", 80, 90],
        [20, "&gt;90克", 90],
    ],
    shopPro_title: [
        [1, "  能下架", "@.isUnlisted=1"],
        [2, "不能下架", "@.isUnlisted=0"],
        [3, "  需要改价", "@.price_uptime=1"],
        [4, "不需要改价", "@.price_uptime=0"],
        [5, "    已改价", "@.price_uptime>1"],
        [6, "已报名商品活动", "@.isTrueSignUp=1"],
    ],
    shopPro_activity: [
        [1, "  能打折", "@.isDiscount=1"],
        [2, "不能打折", "@.isDiscount=0"],
        [3, "  能报名", "@.isSignUp=1"],
        [4, "不能报名", "@.isSignUp=0"],
        [5, "  能做秒杀", "@.isSeckill=1"],
        [6, "不能做秒杀", "@.isSeckill=0"],
    ],
    shopPro_price: [
        [1, "旧折扣&gt;=80", "@.discount>=80"],
        [2, "旧折扣&lt;=8", "@.discount<=8"],
        [3, "新折扣&gt;=80", "@.newDiscount>=80"],
        [4, "新折扣&lt;=8", "@.newDiscount<=8"],
        [5, "新折扣&gt;=50", "@.newDiscount>=50"],
        [6, "最终定价&gt;100", "@.input_normal_price>100"],
        [7, "最终定价&gt;200", "@.input_normal_price>200"],
        [8, "最终定价&gt;300", "@.input_normal_price>300"],
        [9, "最终定价&gt;400", "@.input_normal_price>400"],
        [10, "最终定价&gt;500", "@.input_normal_price>500"],
    ],
    ManualReview_1688_video_status: [
        [0, "未审核"],
        [1, "无视频"],
        [2, "有视频"],
        [3, "审核不通过"],
        [4, "要修改的视频"],
        [5, "有中文的视频"],
        [6, "工厂视频"],
        [7, "审核通过"],
        [8, "时长小于10"],
        [9, "时长大于60"],
        [10, "上传视频出错"]
    ],
    GlobalPro_editStatus: [
        [0, "未修改"],
        [1, "第一次修改"],
        [2, "第二次修改"],
        [3, "货源不对"],
        [4, "需要修改"],
        [5, "货源类目不对"],
        [6, "侵权商品"]
    ],
})