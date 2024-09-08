'use strict';
var fun =
{
    //注：【系统可能不会保存您所做的更改】弹窗----------------只要有一个replit.com是打开的，就不会弹窗。
    obj: {
        A1: 1, A2: 0, Aarr: {}
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        let html = Tool.header("安装Xray...") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">用户名进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">用户名：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        $("#state").html("正在获取账号信息...")
        let str = '{\
        <r:replit db="sqlite.tool" page=2 size=1 where=" order by @.sort asc,@.id asc">\
            "username":"<:username tag=js/>",\
            "password":"<:password tag=js/>",\
            "loginmode":"<:loginmode tag=js/>",\
            "serverLocation":"<:serverLocation tag=js/>",\
            "name":"<:name tag=js/>",\
            "xray":<:xray tag=json/>,\
            "cookies":<:cookies tag=0/>,\
        </r:replit>\
        A2:' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '}'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        this.obj.Aarr = oo;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        let oo = this.obj.Aarr
        oo.serverLocation = oo.serverLocation.replace(/ +/g, "")
        $("#username").html(oo.username)
        if (oo.xray != 0) {//有数据就下一条
            this.a13("");
        }
        else {
            Tool.loginReplit.a01(oo.username, oo.password, oo.cookies, oo.loginmode, $("#state"), this.a06, this)
        }
    },
    a06: function (t) {
        //为什么还要打开一次？因为是不第三个选项卡打开。
        let url = "https://replit.com/~"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在进入首页...");
        gg.tabs_remove_create_indexOf(3, url, 'Home</h1>',true, this.a07, this, null)
    },
    a07: function (t) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/replit.com账号/Xray/安装Xray/注入_创建Bash项目.js", this.a08, this);
    },
    a08: function (t) {
        $("#state").html("正在注入_创建Bash项目。");
        if (this.obj.Aarr.serverLocation != "") {
            gg.tabs_executeScript_indexOf(3, "", t + "\nfun.a01('" + this.obj.Aarr.serverLocation + "')", '<title>main.sh - ',true, this.a09, this);
        }
        else {
            $("#state").html("没有【服务器位置】，请【同步信息】后再来。");
        }        
    },
    a09: function (t) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/replit.com账号/Xray/安装Xray/注入_写代码并执行.js", this.a10, this);
    },
    a10: function (t) {       
        $("#state").html("正在注入_写代码并执行。");
        let replit_nix = '\
{ pkgs }:\n\
{\n\
    deps = [\n\
        pkgs.wget\n\
        pkgs.unzip\n\
    ];\n\
}'
       let xrayA = {
            secrets_url: "https://github.com/rendie-com/Replit/raw/main/python.zip",
            secrets_guid: Tool.guid()
        }
        this.obj.Aarr.xray = xrayA//保存时还要用
        let xrayB = {
            secrets_url: new Base64().encode(xrayA.secrets_url),
            secrets_guid: xrayA.secrets_guid
        }
        gg.tabs_executeScript_indexOf(3, "", t + ";fun.a01('" + JSON.stringify(xrayB) + "','" + encodeURIComponent(replit_nix) + "')", '下载更新完成。',true, this.a11, this);        
    },
    a11: function (t) {
        let url = "https://replit.com/~"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在进入首页...");
         gg.tabs_remove_create_indexOf(3, url, 'class="css-wtm5vu"<1/>>You don\'t have any  Repls</span',true, this.a12, this)
    },
    a12: function (t) {
        let itemCount = 0;
        if (t[0].indexOf('>You don\'t have any  Repls</span') == -1) {
            itemCount = t[0].split('class="css-wtm5vu"').length - 1
        }
        let sql = 'update @.replit set @.itemCount=' + itemCount + ',@.xray=' + Tool.rpsql(JSON.stringify(this.obj.Aarr.xray)) + ' where @.username=' + Tool.rpsql(this.obj.Aarr.username)
        let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
        Tool.ajax.a01(str, 1, this.a13, this)
    },
    a13: function (t) {
        if (t == "") {
            $("#state").html("准备下一条。");
            this.obj.A1++;
            this.obj.Aarr = {}
            this.a03();
        }
        else {
            alert("出错")
        }
    }
}
fun.a01()