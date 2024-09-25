'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header(obj.params.return, 'Shopee &gt; 违禁词 &gt; 【客优云】违禁词 &gt; 获取【客优云】的违禁词') + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                <tr><td class="right w150">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function (t) {
        let url = "https://api.keyouyun.com/lux/api/forbiddenWords/page?page=" + (this.obj.A1 - 1) + "&size=50&platformId=10&words=&type=&ustartDate=&uendDate="
        gg.getFetch(url,"json", this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.pages; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, oo.records);
    },
    ///////////////////////////////////////////////
    d01: function (arr) {
        let oo = { nameArr: [], insertArr: [] }
        let selArr = []
        for (let i = 0; i < arr.length; i++) {
            selArr.push(Tool.rpsql(arr[i].vocabularyName))
            oo.nameArr.push(arr[i].vocabularyName)
            oo.insertArr.push("insert into @.table(@.name,@.addtime)values(" + Tool.rpsql(arr[i].vocabularyName) + "," + Tool.gettime("") + ")")
        }
        let data = [{
            action: "sqlite",
            database: "shopee/违禁词/客优云",
            sql: "select @.name as name FROM @.table where @.name in(" + selArr.join(",") + ")",
        }]
        Tool.ajax.a01(data, this.d02, this,oo)
    },
    d02: function (t,oo) {
        if (t[0].length == 0) {
            $("#state").html("正在插入。。。");
            this.d03(oo.insertArr)
        }
        else {
            $("#state").html("正在插入2。。。");
            let nameArr = [], sqlArr = [];
            for (let i = 0; i < t[0].length; i++) {
                nameArr.push(t[0][i].name)
            }
            for (let i = 0; i < oo.nameArr.length; i++) {
                if (nameArr.indexOf(oo.nameArr[i]) == -1) {
                    sqlArr.push(oo.insertArr[i])
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
                database: "shopee/违禁词/客优云",
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
            this.obj.A1++;
            this.a03();
        }
    },
}
fun.a01();