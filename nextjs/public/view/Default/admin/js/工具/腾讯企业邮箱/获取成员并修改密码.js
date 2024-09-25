'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: [],
        sid: ""
    },
    a01: function () {
        let html = Tool.header("获取成员并修改密码") + '\
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
        /////////////////////////////
        $("#state").html("正在获取【所有成员】...")
        let url = "https://exmail.qq.com/cgi-bin/bizmail_account?action=show_party_fast&sid=" + this.obj.sid + "&partyid=5280176&responseStatus=new&t=addr_data_fast.json&fetch_cache_page=undefined&page=0&limit=20000"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a05, this)
    },
    a05: function (t) {
        if (t.indexOf("<!--cgi exception-->") != -1) {
            Tool.at("sid以经过期，请从新登陆。")
        }
        else {
            let arr
            eval("arr=" + t)
            this.obj.Aarr = arr.userlist;
            this.obj.A2 = arr.userlist.length;
            this.a06()
        }
    },
    a06: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a07, this);
    },
    a07: function () {
        let oo = this.obj.Aarr[this.obj.A1 - 1]
        $("#username").html(oo.alias)
        $("#state").html("正在打开【修改】页面...")
        let url = "https://exmail.qq.com/qy_mng_logic/frame?sid=" + this.obj.sid + "#mbr/account/edit/" + oo.alias + ",m=" + oo.partyid
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.tabs_remove_create_indexOf(2, url, "编辑成员</h3>",true, this.a08, this)
    },
    a08: function (t) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/腾讯企业邮箱/注入_修改信息.js", this.a09, this);
    },
    a09: function (t) {
        $("#state").html("正在修改信息。");
        let pwd = "A" + Math.random().toString(36)
        gg.tabs_executeScript_indexOf(2, null, t + "\nfun.a01('" + pwd + "')", '禁用</a>',true, this.a10, this, pwd);
    },
    a10: function (t, pwd) {
        let username = this.obj.Aarr[this.obj.A1 - 1].alias
        let select = "select count(1) From @.exmail Where @.username=" + Tool.rpsql(username);
        let sort = Tool.int(this.obj.Aarr[this.obj.A1 - 1].name);
        if (!sort) { sort = 0; }//老账号，名称就不是数字
        ////////////////////////////////////////////////////////////////////////
        let update = '<r: db="sqlite.tool">update @.exmail set @.sort=' + sort + ', @.password=' + Tool.rpsql(pwd) + ' where @.username=' + Tool.rpsql(username) + '</r:>'
        let insert = '<r: db="sqlite.tool">insert into @.exmail(@.username,@.password,@.sort,@.addtime)values(' + Tool.rpsql(username) + ',' + Tool.rpsql(pwd) + ',' + sort + ',' + Tool.gettime("") + ')</r:>';
        let str = '""<if Fun(Db(sqlite.tool,' + select + ',count))==0>' + insert + '<else/>' + update + '</if>'
        Tool.ajax.a01(str, 1, this.a11, this)
    },
    a11: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.a06();
        }
        else {
            alert("出错：" + t);
        }
    },
}
fun.a01();