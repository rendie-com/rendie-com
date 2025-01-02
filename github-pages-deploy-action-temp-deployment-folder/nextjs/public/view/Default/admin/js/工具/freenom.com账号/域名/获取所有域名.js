'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile         选择JS文件
        //obj.params.return         翻页
        let html = Tool.header(obj.params.return, "工具 &gt; freenom.com账号 &gt; 域名 &gt; 获取所有域名") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">访问地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">注：</td><td colspan="2">没有做翻页，只做了第一页的域名获取。</td></tr>\
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
        $("#state").html("正在进入域名列表页面。。。");
        let url = "https://my.freenom.com/clientarea.php?action=domains"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        let str = '<h1 class="primaryFontColor">My Domains'
        str += '<1/><label for="rememberMe">Remember Me</label>'
        gg.tabs_remove_create_indexOf(2, url, str, false, this.a04, this)
    },
    a04: function (t) {
        if (t.indexOf('<h1 class="primaryFontColor">My Domains') != -1) {
            this.a05(t)
        }
        else if (t.indexOf('<label for="rememberMe">Remember Me</label>') != -1) {
            $("#state").html("要登录")
            this.d01();
        }
        else {
            Tool.at("未知：\n\n" + t)
        }
    },
    a05: function (t) {
        let Domain = Tool.StrSplits(t, '<td class="second"><a href="http://', '/"')
        let RegistrationDate = Tool.StrSplits(t, ' <td class="third">', '</td>')
        let ExpiryDate = Tool.StrSplits(t, '<td class="fourth">', '</td>')
        let fromId = Tool.StrSplits(t, 'clientarea.php?action=domaindetails', '"')
        if (Domain.length + RegistrationDate.length + ExpiryDate.length + fromId.length == 40) {
            this.a06(Domain, RegistrationDate, ExpiryDate, fromId)
        }
        else {
            Tool.pre(["已改版。。。", Domain, RegistrationDate, ExpiryDate, fromId])
        }
    },
    a06: function (Domain, RegistrationDate, ExpiryDate, fromId) {
        let oo = { fromidArr: [], insertArr: [] }
        for (let i = 0; i < fromId.length; i++) {
            fromId[i] = fromId[i].split("=")[1];
            RegistrationDate[i] = parseInt(Date.parse(RegistrationDate[i]) / 1000);
            ExpiryDate[i] = parseInt(Date.parse(ExpiryDate[i]) / 1000);
            let arrL = [
                "@.addtime",
                "@.Domain",
                "@.RegistrationDate",
                "@.ExpiryDate",
                '@.fromId'
            ];
            let arrR = [
                Tool.gettime(""),
                Tool.rpsql(Domain[i]),
                RegistrationDate[i],
                ExpiryDate[i],
                fromId[i]
            ];
            oo.fromidArr.push(Tool.int(fromId[i]));
            oo.insertArr.push('insert into @.freenom_domains(' + arrL.join(",") + ')values(' + arrR.join(",") + ')')
        }
        let data = [{
            action: "sqlite",
            database: "tool",
            sql: "select @.fromid as fromid From @.freenom_domains Where @.fromid in('" + oo.fromidArr.join("','") + "')",
        }]
        Tool.ajax.a01(data, this.a07, this, oo)
    },
    a07: function (t, oo) {
        $("#state").html("正在插入或更新。。。");
        let fromidArr = [], sqlArr = [];
        for (let i = 0; i < t[0].length; i++) {
            fromidArr.push(t[0][i].fromid)
        }
        /////////////////////////////
        for (let i = 0; i < oo.fromidArr.length; i++) {
            if (fromidArr.indexOf(oo.fromidArr[i]) == -1) {
                console.log(fromidArr, oo.fromidArr[i])
                sqlArr.push(oo.insertArr[i])
            }
        }
        this.a08(sqlArr)
    },
    a08: function (sqlArr) {
        let data = []
        for (let i = 0; i < sqlArr.length; i++) {
            data.push({
                action: "sqlite",
                database: "tool",
                sql: sqlArr[i]
            })
        }
        if (data.length == 0) {
            $("#state").html("全部完成");
        }
        else {
            Tool.ajax.a01(data, this.a09, this)
        }

    },
    a09: function (t) {
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
            $("#state").html("全部完成");
        }
    },
    //////////////////////////////////////
    d01: function () {
        let str = '\
            {<r:freenom db="sqlite.tool" size=1>\
              "email":"<:email tag=js/>",\
              "FirstName":"<:FirstName tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:freenom>}'
        alert("要登陆")
        //Tool.ajax.a01(str, 1, this.d02, this)
    },
    d02: function (oo) {
        Tool.loginFreenom.a01(oo.email, oo.password, oo.FirstName, oo.cookies, $("#state"), this.d03, this)
    },
    d03: function (t) {
        this.a03()
    }
}
fun.a01();