'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: [],
        sid: ""
    },
    a01: function () {
        let html = Tool.header("设置成员别名") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">账号：</td><td colspan="2" id="username"></td></tr>\
                <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
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
        $("#state").html("正在打开【腾讯企业邮箱-登录入口】...注：需要手动登录...")
        let url = "https://exmail.qq.com/login"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.tabs_remove_create_indexOf(2, url, "<title>腾讯企业邮箱</title>",true, this.a04, this)
    },
    a04: function (t) {
        this.obj.sid = Tool.StrSlice(t[0], 'sSid: "', '"')
        this.a05();
    },
    a05: function () {
        $("#state").html("正在获取【所有成员】...")
        let url = "https://exmail.qq.com/cgi-bin/bizmail_account?action=show_party_fast&sid=" + this.obj.sid + "&partyid=5280176&responseStatus=new&t=addr_data_fast.json&fetch_cache_page=undefined&page=0&limit=20000"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a06, this)
    },
    a06: function (t) {
        if (t.indexOf("<!--cgi exception-->") != -1) {
            Tool.at("sid以经过期，请从新登陆。")
        }
        else {
            let arr
            eval("arr=" + t)
            this.obj.Aarr = arr.userlist;
            this.obj.A2 = arr.userlist.length;
            this.a07()
        }
    },
    a07: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a08, this);
    },
    a08: function () {
        let oo = this.obj.Aarr[this.obj.A1 - 1]
        $("#username").html(oo.alias)
        let reg = /r[0-9]+@/g;
        if (reg.test(oo.alias)) {
            $("#state").html("正在设置成员别名...")
            let url = "https://exmail.qq.com/cgi-bin/bizmail_account"
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '[post]</a>');
            gg.postFetch(url, Tool.postData(this.b01(oo)), this.a09, this);
        }
        else {
            $("#state").html("不达标【不设置别名】...")
            this.a11("");
        }
    },
    a09: function (t) {
        if (t.indexOf('retcode : "0"') != -1) {
            this.a10()
        }
        else {
            Tool.at("出错：\n" + t)
        }
    },
    a10: function () {
        let oo = this.obj.Aarr[this.obj.A1 - 1]
        let right = oo.alias.substr(1, 4) + oo.alias.split("@")[1]
        let alias = "a" + right + ",b" + right + ",c" + right + ",d" + right + ",e" + right
        let str = '""<r: db="sqlite.tool">update @.exmail set @.alias=' + Tool.rpsql(alias) + ' where @.username=' + Tool.rpsql(oo.alias) + '</r:>'
        Tool.ajax.a01(str, 1, this.a11, this)
    },
    a11: function (t) {
        if (t == "") {
            $("#state").html("下一条...")
            this.obj.A1++;
            this.a07();
        }
        else {
            alert("更新出错：" + t)
        }
    },
    b01: function (oo) {
        let params = [
            {
                "name": "sid",
                "value": this.obj.sid
            },
            {
                "name": "action",
                "value": "add_alias"
            },
            {
                "name": "t",
                "value": "biz_rf_mgr"
            },
            {
                "name": "alias",
                "value": oo.alias
            },

            {
                "name": "ef",
                "value": "js"
            },
            {
                "name": "resp_charset",
                "value": "UTF8"
            },
            //////////【1】//////////////////
            {
                "name": "slavealias",
                "value": "a" + oo.alias.substr(1, 3)
            },
            {
                "name": "slavedomain",
                "value": oo.alias.split("@")[1]
            },
            ////////////【2】////////////////
            {
                "name": "slavealias",
                "value": "b" + oo.alias.substr(1, 3)
            },
            {
                "name": "slavedomain",
                "value": oo.alias.split("@")[1]
            },
            ////////////【3】////////////////
            {
                "name": "slavealias",
                "value": "c" + oo.alias.substr(1, 3)
            },
            {
                "name": "slavedomain",
                "value": oo.alias.split("@")[1]
            },
            //////////【4】//////////////////
            {
                "name": "slavealias",
                "value": "d" + oo.alias.substr(1, 3)
            },
            {
                "name": "slavedomain",
                "value": oo.alias.split("@")[1]
            },
            //////////【5】//////////////////
            {
                "name": "slavealias",
                "value": "e" + oo.alias.substr(1, 3)
            },
            {
                "name": "slavedomain",
                "value": oo.alias.split("@")[1]
            }
        ]
        return params;
    },
}
fun.a01();