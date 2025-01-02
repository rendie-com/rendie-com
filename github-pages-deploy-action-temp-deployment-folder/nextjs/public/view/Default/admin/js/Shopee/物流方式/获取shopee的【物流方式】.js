'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile     表示选择JS文件  
        let html = Tool.header(obj.params.return, 'Shopee &gt; 物流方式 &gt; 获取shopee的【物流方式】') + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                <tr><td class="right w150">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function (t) {
        let url = "https://solutions.shopee.cn/sellers/pricing-simulator/api/sls/site-config?date=" + Tool.userDate13(Date.now(), "-")
        $("#state").html("正在访问地址：" + url);
        gg.getFetch(url,"json", this.a04, this)
    },
    a04: function (oo) {
        if (oo.code == 200000) {
            this.a05(oo.data.site_info)
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    a05: function (arr) {
        let oo = { nameArr: [], insertArr: [], updateArr: [] }
        for (let i = 0; i < arr.length; i++) {
            oo.nameArr.push(arr[i].name)
            let arrL = [
                "@.name",
                "@.cn_name",
                "@.currency_unit",
                "@.currency_symbol",
                "@.description",
                "@.cargo_types"]
            let arrR = [
                Tool.rpsql(arr[i].name),
                Tool.rpsql(arr[i].cn_name),
                Tool.rpsql(arr[i].currency_unit),
                Tool.rpsql(arr[i].currency_symbol),
                Tool.rpsql(arr[i].description),
                Tool.rpsql(JSON.stringify(arr[i].cargo_types))
            ]
            oo.insertArr.push("insert into @.table(" + arrL.join(",") + ")values(" + arrR.join(",") + ")")
            oo.updateArr.push("update @.table set @.cargo_types=" + Tool.rpsql(JSON.stringify(arr[i].cargo_types)) + "  where @.name=" + Tool.rpsql(arr[i].name))
        }
        $("#state").html("正在查询。。。");
        this.d01(oo)
    },
    /////////////////////////////////////////////////////////////////////////////
    d01: function (oo) {
        let data = [{
            action: "sqlite",
            database: "shopee/物流方式",
            sql: "select @.name as name from @.table where @.name in('" + oo.nameArr.join("','") + "')",
        }]
        Tool.ajax.a01(data, this.d02, this, oo);
    },
    d02: function (t, oo) {
        if (t[0].length == 0) {
            $("#state").html("正在插入。。。");
            this.d03(oo.insertArr)
        }
        else {
            $("#state").html("正在插入或更新。。。");
            let nameArr = [], sqlArr = [];
            for (let i = 0; i < t[0].length; i++) {
                nameArr.push(t[0][i].name)
            }
            for (let i = 0; i < oo.nameArr.length; i++) {
                if (nameArr.indexOf(oo.nameArr[i]) == -1) {
                    sqlArr.push(oo.insertArr[i])
                }
                else {
                    sqlArr.push(oo.updateArr[i])
                }
            }
            this.d03(sqlArr)
        }
    },
    d03: function (sqlArr) {
        let data = []
        for (let i = 0; i < sqlArr.length; i++) {
            data.push({
                action: "sqlite",
                database: "shopee/物流方式",
                sql: sqlArr[i]
            })
        }
        Tool.ajax.a01(data, this.d04, this)
    },
    d04: function (t) {
        let isErr = false
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) {
                isErr = true;
                break;
            }
        }
        if (isErr) {
            Tool.pre(["有错误", t])
        }
        else {
            $("#state").html("全部完成");
        }
    },
}
fun.a01();