'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        let html = Tool.header('1688 &gt; 类目 &gt; 采集类目属性') + '\
		<div class="p-2"><table class="table table-hover">\
          <tbody>\
            <tr><td class="right w150">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        //为什么用“huangxingjl02”？答：只有这个店铺开了店，可以访问。
        let str = '\
        {<r:buyer db="sqlite.1688" size=1 where=" where @.username=\'huangxingjl02\'">\
            "username":"<:username tag=js/>",\
            "password":"<:password tag=js/>",\
            "cookies":<:cookies tag=0/>\
        </r:buyer>}'
        Tool.ajax.a01(str, 1, this.a04, this)
    },
    a04: function (oo) {
        $("#username").html(oo.username);
        Tool.login1688.a01(oo.username, oo.password, oo.cookies, $("#state"), this.d01, this)
    },
    /////////////////////////////////////////
    d01: function () {
        $("#state").html("正在获取叶子类目。。。");
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '<r:category' + obj.arr[5] + ' db="sqlite.1688" size=1 page=2 where=" where @.isleaf=1 and @.isAttr=0">,<:fromid/></r:category' + obj.arr[5] + '>]'
        Tool.ajax.a01(str, 1, this.d02, this)
    },
    d02: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this, null, arr[1])
    },
    d03: function (fromid) {
        let url = "https://offer-new.1688.com/popular/publish.htm?catId=" + fromid + "&v=1.2.27&operator=new"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.d04, this, fromid)
    },
    d04: function (t1, fromid) {
        let txt = Tool.StrSlice(t1, '"catProp":', ',"userCategory":')
        if (txt) {
            $("#state").html("正常");
            this.d05(txt, fromid)
        }
        else if (t1.indexOf('您尚未开通买家保障，暂不能发布') != -1) {
            $("#state").html("您尚未开通买家保障，暂不能发布");
            this.e01(2, fromid);
        }
        else if (t1.indexOf('请签署安全承诺书') != -1) {
            $("#state").html("请签署安全承诺书");
            this.e01(3, fromid);
        }
        else if (t1.indexOf('请签医药相关的安全承诺书。') != -1) {
            $("#state").html("请签医药相关的安全承诺书。");
            this.e01(4, fromid);
        }
        else if (t1.indexOf(',"catProp",') != -1) {
            $("#state").html("没有属性");
            this.e01(5, fromid);
        }
        else if (t1.indexOf('您还未开通旺铺。') != -1) {
            $("#state").html("您还未开通旺铺。");
            this.e01(6, fromid);
        }
        else {
            Tool.at("内容不对" + t1)
        }
    },
    d05: function (txt, fromid) {
        if (txt.indexOf(',"customExtraService":') != -1) {
            txt = txt.split(',"customExtraService":')[0];
        }
        let oo = JSON.parse(txt)
        let arr = oo.fields.dataSource
        let select = "select count(1) from @.attr" + obj.arr[5] + " where @.catId=" + fromid
        let insert = 'insert into @.attr' + obj.arr[5]+'(@.catId,@.json)values(' + fromid + ',' + Tool.rpsql(JSON.stringify(arr)) + ')'
        let html = '"ok"<if Fun(Db(sqlite.1688,' + select + ',count))==0><r: db="sqlite.1688">' + insert + '</r:></if>'
        Tool.ajax.a01(html, 1, this.d06, this, fromid)
    },
    d06: function (t, fromid) {
        if (t == "ok") {
            this.e01(1, fromid);
        }
        else {
            Tool.pre(["出错01：", t])
        }
    },
    ////////////////////////////////////////////////
    e01: function (isAttr, fromid) {
        let update = '"ok"<r: db="sqlite.1688">update @.category' + obj.arr[5] + ' set @.isAttr=' + isAttr + ' where @.fromid=' + fromid + '</r:>'
        Tool.ajax.a01(update, 1, this.e02, this)
    },
    e02: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.d01();
        }
        else {
            Tool.pre(["出错01：", t])
        }
    }
}
fun.a01();