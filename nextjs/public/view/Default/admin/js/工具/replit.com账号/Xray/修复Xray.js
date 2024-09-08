'use strict';
var fun =
{
    //注：【系统可能不会保存您所做的更改】弹窗----------------只要有一个replit.com是打开的，就不会弹窗。
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        let html = Tool.header("修复Xray...") + '\
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
        <r:replit db="sqlite.tool" page=2 size=1 where=" where not(@.xray is null) order by @.sort asc,@.id asc">\
            "username":"<:username tag=js/>",\
            "password":"<:password tag=js/>",\
            "loginmode":"<:loginmode tag=js/>",\
            "serverLocation":"<:serverLocation tag=js/>",\
            "name":"<:name tag=js/>",\
            "cookies":<:cookies tag=0/>,\
            "xray":<:xray tag=0/>,\
        </r:replit>\
        A2:' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '}'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        if (oo.xray.secrets_update_url) {
            this.a12("")
        }
        else {
            $("#username").html(oo.username)
            Tool.loginReplit.a01(oo.username, oo.password, oo.cookies, oo.loginmode, $("#state"), this.a06, this, oo)
        }
    },
    a06: function (isNewTab, oo) {
        oo.serverLocation = oo.serverLocation.replace(/ +/g, "")
        let url = "https://replit.com/@" + oo.name + "/" + oo.serverLocation;
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在进入项目页面...");
        gg.tabs_remove_create_indexOf(3, url, 'Tools</span>',true, this.a07, this, oo)
    },
    a07: function (t, oo) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/replit.com账号/Xray/安装Xray/注入_写代码并执行.js", this.a08, this, oo);
    },
    a08: function (t, oo) {
        $("#state").html("正在注入_写代码并执行。");
        let replit_nix = '\
{ pkgs }:\n\
{\n\
    deps = [\n\
        pkgs.wget\n\
        pkgs.unzip\n\
    ];\n\
}'
        let xray = {
            secrets_update_url: new Base64().encode("https://github.com/web40/replit/raw/main/python.zip"),
            secrets_guid: Tool.guid()
        }
        //oo.username   保存时还要用
        let o2 = { xray: xray, username: oo.username, replit_nix: replit_nix };
        gg.tabs_executeScript_indexOf(3, "", t + ";fun.a01('" + JSON.stringify(xray) + "','" + encodeURIComponent(replit_nix) + "')", '下载更新完成。',true, this.a09, this, o2);
    },
    a09: function (t, oo) {
        $("#state").html("清空一下");
        gg.tabs_executeScript_indexOf(3, "", 'fun.i01();', '清空一下。',true, this.a10, this, oo);
    },
    a10: function (t, oo) {
        let secrets_url = Tool.StrSlice(t[0], '<iframe title="webview" data-cy="ws-webview" src="', ".replit.dev")
        if (secrets_url.length < 100) {
            oo.xray.secrets_url = secrets_url + ".replit.dev"           
            $("#state").html("如果不执行可手动操作这个代码： " + JSON.stringify(oo.xray));
            gg.tabs_executeScript_indexOf(3, "", ";fun.a01('" + JSON.stringify(oo.xray) + "','" + encodeURIComponent(oo.replit_nix) + "')", '下载更新完成。',true, this.a11, this, oo);
        }
        else {
            Tool.at("没有找到\n\n" + secrets_url + "\n\n--------" + t[0])
        }
    },
    a11: function (t, oo) {
        let sql = 'update @.replit set @.xray=' + Tool.rpsql(JSON.stringify(oo.xray)) + ' where @.username=' + Tool.rpsql(oo.username)
        let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
        Tool.ajax.a01(str, 1, this.a12, this)
    },
    a12: function (t) {
        $("#state").html("准备下一条。");
        if (t == "") {
            this.obj.A1++;
            this.a03();
        }
        else {
            alert("出错")
        }
    }
}
fun.a01()