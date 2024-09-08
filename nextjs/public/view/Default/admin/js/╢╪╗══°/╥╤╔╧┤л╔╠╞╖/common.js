Object.assign(Tool, {
    header: function () {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main()"'+ (obj.arr[3] == "-_-20" ? ' class="active"' : '') + '>商品</div>\
            <div onclick="Tool.main(\'js02\')"'+ (obj.arr[3] == "js02" ? ' class="active"' : '') + '>图片审核</div>\
            <div onclick="Tool.main(\'js23\')"'+ (obj.arr[3] == "js23" ? ' class="active"' : '') + '>属性图片审核</div>\
            <div onclick="Tool.main(\'js03\')"'+ (obj.arr[3] == "js03" ? ' class="active"' : '') + '>详情审核</div>\
            <div onclick="Tool.main(\'js12\')"'+ (obj.arr[3] == "js12" ? ' class="active"' : '') + '>视频审核</div>\
            <div onclick="Tool.main(\'js07\')"'+ (obj.arr[3] == "js07" ? ' class="active"' : '') + '>排名</div>\
            <div onclick="Tool.main(\'js08\')"'+ (obj.arr[3] == "js08" ? ' class="active"' : '') + '>平均排名</div>\
            <div onclick="Tool.main(\'js09\')"'+ (obj.arr[3] == "js09" ? ' class="active"' : '') + '>店铺</div>\
            <div onclick="Tool.main(\'js10\')"'+ (obj.arr[3] == "js10" ? ' class="active"' : '') + '>历史价格</div>\
        </header>'
        return html;
    },
    delBrand: function (brand) {
        brand = Tool.unescape(brand);
        let selectType = "select count(1) from @.restriction where @.mode=4 and @.name=" + Tool.rpsql(brand)
        let arr = [
            4,
            Tool.rpsql(brand),
            "'来自【图片审核】；禁限原因：该品牌不适合自己生产'",
            Tool.gettime(""),
            Tool.gettime("")
        ]
        let html = '<if Fun(Db(sqlite.aliexpress,' + selectType + ',count))==0><r: db="sqlite.aliexpress">insert into @.restriction(@.mode,@.name,@.des,@.addtime,@.time)values(' + arr.join(",") + ')</r:></if>'//添加禁限品牌
        html += '<r: db="sqlite.aliexpress">update @.pro set @.hide=53,@.err=' + arr[2] + ' where @.brand=' + Tool.rpsql(brand) + '</r:>'//禁限
        html += '<r: db="sqlite.aliexpress">update @.pro p,@.proupdhgate dh SET dh.@.ManualReview=10 WHERE p.@.proid = dh.@.proid and p.@.hide>0</r:>'//归类【速卖通商品非正常】
        Tool.ajax.a01(html, 1, Tool.reload);
    }
})