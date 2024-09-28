'use strict';
var fun =
{
    obj: {
        A1: 6, A2: 0
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        let html = Tool.header("正在同步授权信息...") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">用户名进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">用户名：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>';
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        $("#state").html("正在获取账号信息...")
        let str = '{\
        <r:github db="sqlite.tool" page=2 size=1 where=" order by @.sort asc,@.id asc">\
            "username":"<:username tag=js/>",\
            "password":"<:password tag=js/>",\
            "name":"<:name tag=js/>",\
            "cookies":<:cookies tag=0/>,\
        </r:github>\
        A2:' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '}'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        $("#username").html(oo.username)
        Tool.loginGithub.a01(oo.username, oo.password, oo.cookies, oo.name, $("#state"), this.a06, this, oo)
    },
    a06: function (t, oo) {
        let url = "https://github.com/settings/apps/authorizations"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在进入授权页面...");
        oo.url = url
        gg.getFetch(url,"json", this.a07, this, oo)
    },
    a07: function (t, oo) {
        if (t.indexOf('<title>Confirm access</title>') != -1) {
            $("#state").html("要输入密码...");
            this.d01(oo)
        }
        else if (t.indexOf('No authorized applications') != -1) {
            $("#state").html("没有授权任何网站...");
            this.e02('null', oo);
        }
        else if (t.indexOf('<img class="avatar CircleBadge-icon" alt="') != -1) {
            this.e01(t, oo)
        }
        else {
            $("#state").html("已改版了，程序终止。");
        }
    },
    ///////////////////////////////////////////////////
    d01: function (oo) {
        $("#url").html('<a href="' + oo.url + '" target="_blank">' + oo.url + '</a>');
        $("#state").html("正在进入授权页面...");
        gg.tabs_remove_create_indexOf(2, oo.url, '<title>Confirm access</title>',true, this.d02, this, oo)
    },
    d02: function (t, oo) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/github.com账号/同步授权信息/注入_输入密码.js", this.d03, this, oo);
    },
    d03: function (t, oo) {
        $("#state").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>正在注入。。。')
        gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.password + "')", '<img class="avatar CircleBadge-icon" alt="<1/><title>Oh no',true, this.d04, this, oo);
    },
    d04: function (t, oo) {
        if (t[0].indexOf('<img class="avatar CircleBadge-icon" alt="') != -1) {
            alert("aaaaaaaaaaaaaaaaa")
            //this.a06("", oo)
        }
        else {
            $("#state").html("要重新登录...");
            oo.cookies = 0;
            this.a05(oo)
        }
    },
    ///////////////////////////////////
    e01: function (t, oo) {
        let nArr = [], nameArr = Tool.StrSplits(t, '<img class="avatar CircleBadge-icon" alt="', '" height')
        for (let i = 0; i < nameArr.length; i++) {
            let arr = nameArr[i].split("\" src=\"")
            nArr.push({
                name: arr[0],
                ico: arr[1]
            });
        }
        this.e02(Tool.rpsql(JSON.stringify(nArr)), oo)
    },
    e02: function (authorizations, oo) {
        let sql = 'update @.github set @.authorizations=' + authorizations + ' where @.username=' + Tool.rpsql(oo.username)
        let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
        Tool.ajax.a01(str, 1, this.e03, this);
    },
    e03: function (t) {
        if (t == "") {
            $("#state").html("准备下一条。");
            this.obj.A1++;
            this.a03()
        }
        else {
            alert("出错")
        }
    },

}
fun.a01();