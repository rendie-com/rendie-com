'use strict';
var fun =
{
    obj: {
        A1: 96, A2: 0, Aarr: {}
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//账号位置
        let html = Tool.header("注册github.com账号") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">注册条件：</td><td colspan="2">'+ this.b01(obj.arr[5]) + '</td></tr>\
                <tr><td class="right">注册进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">邮件账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        switch (obj.arr[5]) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
                gg.isRD(this.a03, this);
                break;
        }

    },
    a03: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '\
        <r:exmail db="sqlite.tool" page=2 size=1 where=" order by @.sort asc,@.id asc">,\
        {\
          "sort":<:sort/>,\
          "username":"<:username tag=js/>",\
          "alias":"<:alias tag=js/>",\
          "password":"<:password tag=js/>",\
          "cookies":<:cookies tag=0/>,\
          "touse":"<:touse tag=js/>",\
          "sid":"<:sid tag=js/>"\
        }\
        </r:exmail>]'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (arr) {
        if (this.obj.A2 == 0) this.obj.A2 = arr[0]
        this.obj.Aarr = arr[1];
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        let oo = this.obj.Aarr
        let touse = "github.com="
        if (obj.arr[5] == "1") {
            $("#username").html(oo.username);
            oo.aliasUserName = oo.username;//更新时要用
            this.a07(oo, touse + oo.username);
        }
        else {
            this.a06(oo, touse)
        }
    },
    a06: function (oo, touse) {
        if (oo.alias == "")//表示没有别名
        {
            $("#username").html("没有别名");
            //过
            this.d06("");
        }
        else {
            let aliasArr = oo.alias.split(",")
            switch (obj.arr[5]) {
                case "2": touse += aliasArr[0]; break;
                case "3": touse += aliasArr[1]; break;
                case "4": touse += aliasArr[2]; break;
                case "5": touse += aliasArr[3]; break;
                case "6": touse += aliasArr[4]; break;
            }
            oo.aliasUserName = touse.split("=")[1];//注：这个样更新的时后要用（this.obj.Aarr会跟着改变）
            $("#username").html(oo.aliasUserName);
            this.a07(oo, touse);
        }
    },
    a07: function (oo, touse) {
        if (oo.touse.indexOf(touse) != -1) {
            $("#state").html("以前有要注册的这个账号，则跳过。");
            this.d06("");
        }
        else {
            //没有的话，则可以注册
            this.a08()//正常注册
            //this.d01()//注册成功，但没点邮件，走这边。
        }
    },
    a08: function () {
        $("#state").html("先删除Cookies");
        gg.delAllCookies(["https://github.com/"], this.a09, this)
    },
    a09: function (t) {
        $("#state").html("正在进入注册页面。。。");
        let url = "https://github.com/signup"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.tabs_remove_create_indexOf(2, url, 'data-optimizely-event="click.signup_continue.email"',true, this.a10, this, null)
    },
    a10: function (t) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/github.com账号/注入_注册.js", this.a11, this);
    },
    a11: function (t) {
        $("#state").html("正在填写信息。");
        let oo = this.obj.Aarr
        let find = '<title>Please verify your email address</title>'
        gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.aliasUserName + "','" + oo.password + "')", find,true, this.d01, this);
    },
    /////////////////////////////////////////////////////////////
    b01: function (val) {
        let arr = ["【主账号】", "【别名1】", "【别名2】", "【别名3】", "【别名4】", "【别名5】"]
        let str = '<option value="">=== 请选择企业邮箱账号位置 ===</option>'
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + (i + 1) + '"' + (val == "" + (i + 1) ? ' selected="selected"' : '') + '>' + (i + 1) + '.使用企业邮箱' + arr[i] + '，注册replit.com账号。</option>'
        }
        return '<select class="form-select" onchange="Tool.open(5,this.options[this.selectedIndex].value)">' + str + '</select>';
    },
    //////////////////////////////////////////////////
    d01: function () {
        $("#state").html("登录邮件，去看一下，有没有发邮件过来。");
        let oo = this.obj.Aarr
        Tool.getExmailDes.a01(2, oo.username, oo.password, oo.sid, oo.cookies, "Your GitHub launch code</u>", this.d02, this)
    },
    d02: function (t) {
        if (t.indexOf('<a href="https://github.com/users/') != -1) {
            let url = "https://github.com/users/" + Tool.StrSlice(t, '<a href="https://github.com/users/', "\"")
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在验证邮件。。。");
            gg.tabs_remove_create_indexOf(2, url, " is already verified.<1/>Your email was verified.",true, this.d03, this, null)
        }
        else {
            alert("邮件内容不对")
        }
    },
    d03: function (t) {
        let name = Tool.StrSlice(t[0], '<meta name="user-login" content="', '"');
        $("#state").html("获取所有cookies")
        gg.getAllCookies(["https://github.com/"], this.d04, this, name);
    },
    d04: function (cookies, name) {
        let arrL = [
            "@.password",
            "@.note",
            "@.cookies",
            '@.name'
        ];
        let arrR = [
            Tool.rpsql(this.obj.Aarr.password),
            "'注册成功'",
            Tool.rpsql(JSON.stringify(cookies)),
            Tool.rpsql(name)
        ];
        this.d05(arrL, arrR)
    },
    d05: function (arrL, arrR) {
        //oo.aliasUserName          有可能是别名，有可能是主账号
        //oo.username               一定是主账号
        let oo = this.obj.Aarr
        let select = "select count(1) From @.github Where @.username=" + Tool.rpsql(oo.aliasUserName);
        arrL.push("@.username"); arrR.push(Tool.rpsql(oo.aliasUserName))
        arrL.push("@.sort"); arrR.push(oo.sort)
        arrL.push("@.addtime"); arrR.push(Tool.gettime(""))
        //////////////////在邮件中记录一下///////////////////
        let touse = oo.touse
        if (touse == "") { touse = "github.com=" + oo.aliasUserName }
        else {
            if (touse.indexOf('github.com=' + oo.aliasUserName) == -1) {
                touse += ",github.com=" + oo.aliasUserName
            }
        }
        let sql = 'update @.exmail set @.touse=' + Tool.rpsql(touse) + ' where @.username=' + Tool.rpsql(oo.username) + ''
        ////////////////////////////////////
        let insert = '<r: db="sqlite.tool">insert into @.github(' + arrL.join(",") + ')values(' + arrR.join(",") + ')<1/>' + sql + '</r:>';
        let str = '"ok"<if Fun(Db(sqlite.tool,' + select + ',count))==0>' + insert + '</if>'
        Tool.ajax.a01(str, 1, this.d06, this)
    },
    d06: function (t) {
        this.obj.A1++;
        this.obj.Aarr = {};
        if (t == "ok") {
            $("#state").html("下一条");
            this.a03();
        }
        else if (t == "") {
            $("#state").html("准备下一条。");
            this.a03()
        }
        else {
            alert("出错：" + t);
        }
    }
}
fun.a01();
