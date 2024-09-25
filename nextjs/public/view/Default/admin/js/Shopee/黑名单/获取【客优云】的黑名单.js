'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header(obj.params.return, 'Shopee &gt; 黑名单 &gt; 获取【客优云】的黑名单') + '\
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
        let count = 1244//因为【客优云】里面没有页码或总数量。
        if (this.obj.A2 == 0) { this.obj.A2 = Math.ceil(count / 50); }
        let url = "https://api.keyouyun.com/jax/api/order/user-blacks/1?page=" + (this.obj.A1 - 1) + "&size=50&total=" + count + "&userAccount="
        gg.getFetch(url,"json", this.a04, this)
    },
    a04: function (arr) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, arr);
    },
    ////////////////////////////////
    d01: function (arr) {
        let oo = { idArr: [], insertArr: [] }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].userAccount.indexOf("\n") == 0) { arr[i].userAccount = arr[i].userAccount.substring(1); }
            oo.idArr.push(arr[i].id)
            oo.insertArr.push("insert into @.table(@.fromid,@.userAccount,@.reason,@.addtime,@.uptime)values(" + arr[i].id + "," + Tool.rpsql(arr[i].userAccount) + "," + Tool.rpsql(arr[i].reason) + "," + Tool.gettime(arr[i].gmtCreate) + "," + Tool.gettime(arr[i].gmtModified) + ")")
        }
        let data = [{
            action: "sqlite",
            database: "shopee/黑名单",
            sql: "select @.fromid as fromid FROM @.table where @.fromid in(" + oo.idArr.join(",") + ")",
        }]
        Tool.ajax.a01(data, this.d02, this, oo)
    },
    d02: function (t, oo) {
        if (t[0].length == 0) {
            $("#state").html("正在插入。。。");
            this.d03(oo.insertArr)
        }
        else {
            $("#state").html("正在插入2。。。");
            let idArr = [], sqlArr = [];
            for (let i = 0; i < t[0].length; i++) {
                idArr.push(t[0][i].fromid)
            }
            for (let i = 0; i < oo.idArr.length; i++) {
                if (idArr.indexOf(oo.idArr[i]) == -1) {
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
                database: "shopee/黑名单",
                sql: sqlArr[i]
            })
        }
        if (data.length == 0) {
            Tool.ajax.a01(data, this.d04, this)
        }
        else {
            this.d05();
        }
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
            this.d05()
        }
    },
    d05: function () {
        this.obj.A1++;
        this.a03();
    },
}
fun.a01();