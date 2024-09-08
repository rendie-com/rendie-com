'use strict';
var fun =
{
    obj:
    {
        A1: 3, A2: 0
    },
    a01: function () {
        let html = Tool.header('正在【从商品表中获取运费模板】...') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		        <tr><td class="right">说明：</td><td colspan="2">【运费&gt;$10】【承诺28天内送达】，在采集运费模时就处理了,所以可以直接创建运费模板。</td></tr></tbody>\
		        <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr></tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let html = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '<r:pro db="sqlite.aliexpress" size="10" page="2">,[' + this.b01() + ']</r:pro>]'
        Tool.ajax.a01( html, this.obj.A1, this.a03,this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        arr.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr)
    },
    a04: function (arr1) {
        let arr2=[],//去重
            sql = [];
        $("#state").html("正在计算。。。(每页" + arr1.length +" 条)");
        for (let i = 0; i < arr1.length; i++) {
            let name = arr1[i].join("")
            if (arr2.indexOf(name) == -1) {//去重用的
                arr2.push(name);
                let isSql = this.b02(arr1[i])
                if (isSql) sql.push(isSql);
            }
        }
        Tool.ajax.a01( sql.join(""),1,this.a05, this);
    },
    a05: function (t) {
        if (Tool.Trim(t) == "") {
            this.a06();
        }
        else {
            Tool.at("出错" + t)
        }
    },
    a06: function () {
        $("#state").html("正在计算设置运费ID...");
        let str = '[0<r:freight db="sqlite.aliexpress" size="10" where=" where @.freightID=\'0\'">,<:id/></r:freight>]'
        Tool.ajax.a01( str,1,this.a07, this);
    },
    a07: function (oo) {
        if (oo.length == 1) {
            $("#state").html("设置运费ID完成，准备下一页...");
            this.obj.A1++;
            this.a02();
        }
        else {
            let str = '';
            for (let i = 1; i < oo.length; i++) {
                let ran = "F" + Tool.randomRange(1000, 9999)
                str += '\
		        <if Fun(Db("sqlite.aliexpress","select count(1) from @.freight where @.freightID=\''+ ran + '\'","count"))==0>\
			        <r: db="sqlite.aliexpress">update @.freight set @.freightID=\''+ ran + '\' where @.id=' + oo[i] + '</r:>\
		        </if>';
            }
            Tool.ajax.a01( str, 1,this.a05,this);
        }
    },   
    b01: function () {
        let arr1 = Tool.country(), arr2 = [];
        for (let i = 0; i < arr1.length; i++) {
            arr2.push("<:ShipTo" + arr1[i].id + "/>")
        }
        return arr2.join(",")
    },
    b02: function (arr1) {
        let country = Tool.country();
        let nameArr = [], freeCountryArr = []
        for (let j = 0; j < country.length; j++) {
            if (arr1[j] == 1) {//等于1表示免运费
                nameArr.push(country[j].id)
                freeCountryArr.push(country[j].name + "(" + country[j].id + ")")
            }
        }
        if (nameArr.length == 0) {
            return false;
        }
        else {
            return '\
		    <if Fun(Db("sqlite.aliexpress","select count(1) from @.freight where @.name=\''+ nameArr.join(",") + '\'","count"))==0>\
			    <r: db="sqlite.aliexpress">insert into @.freight(@.name,@.freeCountry,@.addtime)values(\'' + nameArr.join(",") + '\',\'' + freeCountryArr.join(" , ") + '\',' + Tool.gettime("") + ')</r:>\
		    </if>';
        }
        
   }
}
fun.a01();