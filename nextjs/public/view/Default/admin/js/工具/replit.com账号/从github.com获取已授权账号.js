'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        let html = Tool.header("正在从github.com获取已授权账号...") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '<r:github db="sqlite.tool" page=2 size=20 where=" order by @.sort asc,@.id asc">,\
        {\
            "username":"<:username tag=js/>",\
            "bakemail":"<:bakemail tag=js/>",\
            "authorizations":<:authorizations tag=0/>\
        }</r:github>]'
        $("#state").html("正在获取github表的信息。。。")
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) this.obj.A2 = arr[0]
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
    },
    a04: function (arr) {
        let nArr = []
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].authorizations != 0) {//如果有授权账号
                for (let j = 0; j < arr[i].authorizations.length; j++) {
                    if (arr[i].authorizations[j].name == "Replit") {//授权给了【Replit】
                        nArr.push({
                            username: arr[i].username,
                            bakemail: arr[i].bakemail
                        })
                    }
                }
            }
        }
        this.a05(nArr)
    },
    a05: function (arr) {
        if (arr.length == 0) {
            $("#state").html("跳过")
            this.a07("");
        }
        else {
            $("#state").html("入库")
            this.a06(arr);
        }
    },
    a06: function (arr) {
        //说明：GitHub的邮件账号，不能和replit邮件重复（即：GitHub加replit邮件是唯一的）。
        //因为password字段没有用，所以把备用邮箱填进去。（为什么？备用邮箱用于确认是否登录replit）
        let sqlArr = [];
        for (let i = 0; i < arr.length; i++) {
            let select = "select count(1) From @.replit Where @.username=" + Tool.rpsql(arr[i].username);
            let arrL = ["@.username", "@.password", "@.loginMode"];
            let arrR = [Tool.rpsql(arr[i].username), Tool.rpsql(arr[i].bakemail), "'GitHub'"];
            let insert = '<r: db="sqlite.tool">insert into @.replit(' + arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>';
            sqlArr[i] = '<if Fun(Db(sqlite.tool,' + select + ',count))==0>' + insert + '</if>'
        }
        Tool.ajax.a01('""' + sqlArr.join(""), 1, this.a07, this)
    },
    a07: function (t) {
        this.obj.A1++;
        if (t == "") {
            $("#state").html("准备下一条。");
            this.a02()
        }
        else {
            alert("出错：" + t);
        }
    }
}
fun.a01();