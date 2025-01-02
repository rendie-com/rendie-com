'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//账号位置
        let html = Tool.header("注册cpolar.com账号") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">注册条件：</td><td colspan="2">'+ this.b01(obj.arr[5]) + '</td></tr>\
                <tr><td class="right w150">注册进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">邮件账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">密码：</td><td id="password" colspan="2"></td></tr>\
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
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, arr[1]);
    },
    a05: function (oo) {
        let touse = "cpolar.com="
        if (obj.arr[5] == "1") {//账号位置      表示使用企业邮箱【主账号】
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
            this.a08("");
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
            oo.aliasUserName = touse.split("=")[1];
            $("#username").html(oo.aliasUserName);
            this.a07(oo, touse);
        }
    },
    a07: function (oo, touse) {
        if (oo.touse.indexOf(touse) != -1) {
            $("#state").html("以前有要注册的这个账号，则跳过。");
            this.a08("");
        }
        else {
            //没有的话，则可以注册
            this.d01(oo)//正常注册
        }
    },
    a08: function (t) {
        this.obj.A1++;
        if (t == "ok") {
            $("#state").html("延时1秒后，下一条。。。（可在这里停止注册）");
            //Tool.Time("list", 1000, this.a03, this)
        }
        else if (t == "") {
            $("#state").html("准备下一条。");
            this.a03()
        }
        else {
            alert("出错：" + t);
        }
    },
    /////////////////////////////////////////////////////
    b01: function (val) {
        let arr = ["【主账号】", "【别名1】", "【别名2】", "【别名3】", "【别名4】", "【别名5】"]
        let str = '<option value="">=== 请选择企业邮箱账号位置 ===</option>'
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + (i + 1) + '"' + (val == "" + (i + 1) ? ' selected="selected"' : '') + '>' + (i + 1) + '.使用企业邮箱' + arr[i] + '，注册cpolar.com账号。</option>'
        }
        return '<select class="form-select" onchange="Tool.open(5,this.options[this.selectedIndex].value)">' + str + '</select>';
    },
    ///////////////////////////////////////////////////
    d01: function (oo) {
        $("#state").html("先删除Cookies");
        gg.delAllCookies(["https://cpolar.com/", "https://www.cpolar.com/", "https://dashboard.cpolar.com/"], this.d02, this, oo)
    },
    d02: function (t, oo) {
        $("#state").html("正在进入注册页面。。。");
        let url = "https://dashboard.cpolar.com/signup"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.tabs_remove_create_indexOf(2, url, '创建帐号</button>',true, this.d03, this, oo)
    },
    d03: function (t, oo) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/cpolar.com账号/注入_注册.js", this.d04, this, oo);
    },
    d04: function (t, oo) {
        $("#state").html("正在填写信息。");
        let find = '选择您的套餐</h2><1/>user email is exist.</div>'
        oo.password = "cpolar" + Math.random().toString(36)//换个新密码，不用【腾讯企业邮箱】的密码来注册。
        $("#password").html(oo.password+"（如果程序出错，有可能是这个密码。）");
        gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.aliasUserName + "','" + oo.password + "')", find,true, this.d05, this, oo);
    },
    d05: function (t, oo) {
        if (t[0].indexOf('user email is exist.') != -1) {
            $("#state").html("账号已存在。");
            alert("应该到不了这里，注册过的都记录了。")
        }
        else {
            $("#state").html("注册成功。");
            this.e01(oo);
        }
    },
    //////////////////////////////////////////////////
    e01: function (oo) {
        let url = "https://dashboard.cpolar.com/auth"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在进入【你的隧道 Authtoken】...");
        gg.getFetch(url,"json", this.e02, this, oo)
    },
    e02: function (t, oo) {
        if (t.indexOf(oo.aliasUserName) != -1) {
            let authtoken = Tool.StrSlice(t, '<input id="authtoken" readonly="" type="text" value="', '"')
            $("#state").html("获取所有cookies")
            gg.getAllCookies(["https://cpolar.com/", "https://www.cpolar.com/", "https://dashboard.cpolar.com/"], this.e03, this, [oo, authtoken]);
        }
        else {
            alert("账号不对：不是【" + oo.aliasUserName +"】")
        }
    },
    e03: function (cookies, arr) {
        let arrL = [
            "@.password",
            "@.note",
            "@.cookies",
            '@.token'
        ];
        let arrR = [
            Tool.rpsql(arr[0].password),
            "'注册成功'",
            Tool.rpsql(JSON.stringify(cookies)),
            Tool.rpsql(arr[1])
        ];
        this.e04(arr[0], arrL, arrR)
    },
    e04: function (oo, arrL, arrR) {
        //oo.aliasUserName          有可能是别名，有可能是主账号
        //oo.username               一定是主账号
        let select = "select count(1) From @.cpolar Where @.username=" + Tool.rpsql(oo.aliasUserName);
        arrL.push("@.username"); arrR.push(Tool.rpsql(oo.aliasUserName))
        arrL.push("@.sort"); arrR.push(oo.sort)
        arrL.push("@.addtime"); arrR.push(Tool.gettime(""))
        //////////////////在邮件中记录一下///////////////////
        let touse = oo.touse
        if (touse == "") {
            touse = "cpolar.com=" + oo.aliasUserName
        } else {
            if (touse.indexOf('cpolar.com=' + oo.aliasUserName) == -1) {
                touse += ",cpolar.com=" + oo.aliasUserName
            }
        }
        let sql = 'update @.exmail set @.touse=' + Tool.rpsql(touse) + ' where @.username=' + Tool.rpsql(oo.username) + ''
        /////////////////////////////////////////////////////////////////
        let insert = '<r: db="sqlite.tool">insert into @.cpolar(' + arrL.join(",") + ')values(' + arrR.join(",") + ')<1/>' + sql + '</r:>';
        let str = '"ok"<if Fun(Db(sqlite.tool,' + select + ',count))==0>' + insert + '</if>'
        Tool.ajax.a01(str, 1, this.a08, this)
    },
}
fun.a01();
