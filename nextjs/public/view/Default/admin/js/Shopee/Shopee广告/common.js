Object.assign(Tool, {
    header2: function (jsFile) {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main(\'\')"'+ (!jsFile || jsFile == "js19" ? ' class="active"' : '') + '>【Shopee】广告</div>\
            <div onclick="Tool.main(\'?jsFile=js08\')"'+ (jsFile == "js08" || jsFile == "js21" ? ' class="active"' : '') + '>商品广告_修改</div>\
            <div onclick="Tool.main(\'?jsFile=js02\')"'+ (jsFile == "js02" ? ' class="active"' : '') + '>搜索关键词</div>\
        </header>'
        return html;
    },
    common_add_keyword: {
        a01: function (arr, site, next, This, t) {
            let oo = {
                next: next,
                This: This,
                t: t
            }
            let sqlArr = [];
            for (let i = 0; i < arr.length; i++) {
                let select = "select count(1) from @.keyword where @.keyword=" + Tool.rpsql(arr[i].keyword) + " and @.site='" + site + "'"
                let insert = "insert into @.keyword(@.keyword,@.recommended_price,@.search_volume,@.relevance,@.site)values(" + Tool.rpsql(arr[i].keyword) + "," + arr[i].recommended_price + "," + arr[i].search_volume + "," + arr[i].relevance + ",'" + site + "')"
                let update = "update @.keyword set @.recommended_price=" + arr[i].recommended_price + ", @.search_volume=" + arr[i].search_volume + " , @.relevance=" + arr[i].relevance + "  where @.keyword=" + Tool.rpsql(arr[i].keyword) + " and @.site='" + site + "'"
                sqlArr.push('<if Fun(Db(sqlite.shopee,' + select + ',count))==0><r: db="sqlite.shopee">' + insert + '</r:><else/><r: db="sqlite.shopee">' + update + '</r:></if>')
            }
            $("#state").html("正在更新本地商品状态。。。");
            Tool.ajax.a01('"ok"' + sqlArr.join(""), 1, this.a02, this, oo)
        },
        a02: function (t, oo) {
            if (t == "ok") {
                oo.next.apply(oo.This, [oo.t])
            }
            else {
                Tool.pre(["出错", t])
            }
        }
    },
    ads_stateArr: [
        ["scheduled", "已预设"],
        ["ongoing", "进行中"],
        ["paused", "暂停中"],
        ["ended", "已结束"],
        ["deleted", "已删除"],
        ["closed", "已关闭"],
        ["self_abnormal", "异常"],//我自已加的，执行操作有出错，就放这里面。
        ["self_NoStandard", "重启不达标"],//我自已加的，执行操作有出错，就放这里面。
    ],
    ads_product_placementArr: [
        ["all", "全部"],
        ["search_product", "搜索"],
        ["targeting", "关联"],
    ],
})