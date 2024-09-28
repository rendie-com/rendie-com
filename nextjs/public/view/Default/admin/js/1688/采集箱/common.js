Object.assign(Tool, {
    header: function (jsFile) {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main(\'\')"'+ (!jsFile ? ' class="active"' : '') + '>【1688】主商品列表</div>\
            <div onclick="Tool.main(\'?jsFile=js03\')"'+ (jsFile == "js03" ? ' class="active"' : '') + '>次商品列表</div>\
            <div onclick="Tool.main(\'?jsFile=js09\')"'+ (jsFile == "js09" || jsFile == "js11" || jsFile == "js14" ? ' class="active"' : '') + '>图片</div>\
            <div onclick="Tool.main(\'?jsFile=js08\')"'+ (jsFile == "js08" ? ' class="active"' : '') + '>货源图片审核</div>\
            <div onclick="Tool.main(\'?jsFile=js23\')"'+ (jsFile == "js23" ? ' class="active"' : '') + '>视频审核</div>\
            <div onclick="Tool.main(\'?jsFile=js27\')"'+ (jsFile == "js27" ? ' class="active"' : '') + '>主要下游平台</div>\
        </header>'
        return html;
    },
    ManualReview_1688: [
        [0, "未审核"],
        [1, "使用1688属性图"],
        [2, "需要修改"],
        [3, "审核不通过"],
        [4, "异常"]
    ],
    ManualReview_video_status: [
        [0, "未审核"],
        [1, "无视频"],
        [2, "有视频"],
        [3, "审核不通过"],
        [4, "要修改的视频"],
        [5, "有中文的视频"],
        [6, "工厂视频"],
        [7, "审核通过"],
        [8, "时长小于10"],
        [9, "时长大于60"]
    ],
})