'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: []
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//账号位置
        let html = Tool.header("注册replit.com账号") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">注册条件：</td><td colspan="2">'+ this.b01(obj.arr[5]) + '</td></tr>\
                <tr><td class="right w150">注册进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
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
        let touse = "replit.com="
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
            this.a14("");
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
            //以前有要注册的这个账号，则跳过。
            this.a14("");
        }
        else {
            //没有的话，则可以注册
            this.a08()//正常注册
            //this.e01()//针对，注册成功没有记录，就用这个
            //this.d01();//看邮件走这边。
        }
    },
    a08: function () {
        $("#state").html("先删除Cookies");
        gg.delAllCookies(["https://replit.com/~"], this.a09, this)
    },
    a09: function (t) {
        $("#state").html("正在进入注册页面。。。");
        let url = "https://replit.com/signup"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.tabs_remove_create_indexOf(2, url, '<a href="#" class="css-186vti9">Continue with email →</a>',true, this.a10, this, null)
    },
    a10: function (t) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/replit.com账号/注入_注册.js", this.a11, this);
    },
    a11: function (t) {
        $("#state").html("正在填写信息。");
        let oo = this.obj.Aarr
        let find = 'M10.58 3.125c.673-1.167<1/><title>Welcome to Replit - Replit</title><1/>Something went wrong trying to submit. Please try again.</span>'
        gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.aliasUserName + "','" + oo.password + "')", find,true, this.a12, this);
    },
    a12: function (t) {
        if (t[0].indexOf("M10.58 3.125c.673-1.167") != -1) {
            $("#state").html("账号已存在。");
            let arrL = ["@.password", "@.note"]
            let arrR = ["null", "'账号已存在，不知道密码。'"]
            alert("应该到不了这里，注册过的都记录了。")
            //this.a13(arrL, arrR)
        }
        else if (t[0].indexOf("Something went wrong trying to submit. Please try again.</span>") != -1) {
            $("#state").html("提示【Something went wrong trying to submit. Please try again】，延时5秒后再注册。。。");
            Tool.Time("list", 1000 * 5, this.a09, this)
        }
        else {
            $("#state").html("注册成功。");
            this.d01();
        }
    },
    //////////////////////////////////////////
    a13: function (arrL, arrR) {
        //oo.aliasUserName          有可能是别名，有可能是主账号
        //oo.username               一定是主账号
        let oo = this.obj.Aarr
        let select = "select count(1) From @.replit Where @.username=" + Tool.rpsql(oo.aliasUserName);
        arrL.push("@.username"); arrR.push(Tool.rpsql(oo.aliasUserName))
        arrL.push("@.sort"); arrR.push(oo.sort)
        arrL.push("@.addtime"); arrR.push(Tool.gettime(""))
        //////////////////在邮件中记录一下///////////////////
        let touse = oo.touse
        if (touse == "") {
            touse = "replit.com=" + oo.aliasUserName
        } else {
            if (touse.indexOf('replit.com=' + oo.aliasUserName) == -1) {
                touse += ",replit.com=" + oo.aliasUserName
            }           
        }
        let sql = 'update @.exmail set @.touse=' + Tool.rpsql(touse) + ' where @.username=' + Tool.rpsql(oo.username) + ''
        ////////////////////////////////////
        let insert = '<r: db="sqlite.tool">insert into @.replit(' + arrL.join(",") + ')values(' + arrR.join(",") + ')<1/>' + sql + '</r:>';
        let str = '"ok"<if Fun(Db(sqlite.tool,' + select + ',count))==0>' + insert + '</if>'
        Tool.ajax.a01(str, 1, this.a14, this)
    },
    a14: function (t) {
        this.obj.A1++;
        this.obj.Aarr = [];
        if (t == "ok") {
            $("#state").html("延时3秒后，下一条。。。（可在这里停止注册）");
            Tool.Time("list", 3000, this.a03, this)
        }
        else if (t == "") {
            $("#state").html("准备下一条。");
            this.a03()
        }
        else {
            alert("出错：" + t);
        }
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
        Tool.loginExmail.a01(2,oo.username, oo.password, oo.sid, oo.cookies,$("#state"), this.d02, this)
    },
    d02: function (sid) {
        this.obj.Aarr.sid = sid
        this.d03()
    },
    d03: function () {
        let url = "https://exmail.qq.com/cgi-bin/mail_list?folderid=1&page=0&s=inbox&sid=" + this.obj.Aarr.sid + "&nocheckframe=true"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取邮件列表。。。");
        gg.getFetch(url,"json", this.d04, this)
    },
    d04: function (t) {
            let arr1 = Tool.StrSplits(t, "<tr>", "</tr>"), mailid = "";
            $("#state").html("找出【replit.com】发的邮件ID。。。");
            for (let i = 1; i < arr1.length; i++) {
                if (arr1[i].indexOf("cir  Ru") != -1 && arr1[i].indexOf("verify@replit.com") != -1) {//找出所有已读,且是【verify@replit.com】发来的邮件
                    mailid = Tool.StrSlice(arr1[i], " value=\"", "\"")
                    break;
                }
            }
            if (mailid) {
                this.d05(mailid)
            }
            else {
                $("#state").html("延时500ms后再找。。。");
                Tool.Time("list", 500, this.d03, this)
            }
            
    },
    d05: function (mailid) {
        let url = "https://exmail.qq.com/cgi-bin/readmail"
        let oo = {}
        oo.mailid = mailid
        oo.sid = this.obj.Aarr.sid
        oo.f = "json"
        oo.action = "checktranslate"
        $("#url").html(url + '[post]' + JSON.stringify(oo));
        $("#state").html("正在设置为已读。。。");
        gg.postFetch(url, oo, this.d06, this, mailid)
    },
    d06: function (oo, mailid) {
        if (oo.RetCode == "0") {
            let url = "https://exmail.qq.com/cgi-bin/readmail?folderid=1&t=readmail&mailid=" + mailid + "&mode=pre&maxage=3600&base=10.9010&ver=16456&show_ww_icon=false&sid=" + this.obj.Aarr.sid + "&newwin=true&nocheckframe=true";
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在获取邮件内容。。。");
            gg.getFetch(url,"json", this.d07, this)
        }
        else {
            $("#state").html("设置已读失败----，程序终止。");
        }
    },
    d07: function (t) {
        if (t.indexOf('pointer;" href="') != -1) {
            let url = Tool.StrSlice(t, 'pointer;" href="', "\"")
            $("#state").html("正在验证邮件。。。");
            gg.tabs_remove_create_indexOf(2, url, "New on Replit</h2>",true, this.e01, this, null)
        }
        else {
            alert("邮件内容不对")
        }
    },
    e01: function (t) {
        let url = "https://replit.com/account"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在进入设置页面...");
        gg.tabs_remove_create_indexOf(2, url, '/ 10.0 GiB',true, this.e02, this, null)
    },
    e02: function (t) {
        let serverLocation = Tool.StrSlice(t[0], '<path d="M13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg></span></div><span class="css-scxoy8" style="--fontSize: var(--font-size-default); --lineHeight: var(--line-height-default);">', '</span>')
        let name = Tool.StrSlice(t[0], '"username":"', '"')
        let outboundSize = Tool.StrSlice(t[0], '<div class="css-1pwjctj"><span class="css-vkcinh"', "/ 10.0 GiB").split(">")[1]
        $("#state").html("获取所有cookies")
        gg.getAllCookies(["https://replit.com/~"], this.e03, this, [serverLocation, name, outboundSize]);
    },
    e03: function (cookies, arr) {
        let arrL = [
            "@.password",
            "@.note",
            "@.cookies",
            "@.serverLocation",
            '@.name',
            '@.outboundSize'
        ];
        let arrR = [
            Tool.rpsql(this.obj.Aarr.password),
            "'注册成功'",
            Tool.rpsql(JSON.stringify(cookies)),
            Tool.rpsql(arr[0]),
            Tool.rpsql(arr[1]),
            arr[2]
        ];
        this.a13(arrL, arrR)       
    }   
}
fun.a01();
