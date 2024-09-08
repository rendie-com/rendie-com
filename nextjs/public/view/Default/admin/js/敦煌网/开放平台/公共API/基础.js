'use strict';
var fun =
{
    token: "", obj: { username: "", fromid: 0, token: [] },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//切换账户
        F2.a01(this, this.a02);
    },
    a02: function (tokenID, token) {
        let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.base.countrys.get&timestamp=" + new Date().getTime() + "&v=1.0"
       Tool.ajax.a01( 1, '=').replace(/\[&\]/ig,this.a03, "<.WebClientPost(" + URL + ")/>", this, URL.replace(/\[=\]/ig, '&amp;'))
    },
    a03: function (txt, URL) {
        let html = ''
        eval("let obj2=" + txt);
        obj2 = obj2.countryList
        this.sql = obj2;
        for (let i = 0; i < obj2.length; i++) {
            html += "<tr align=\"center\">\
			<td>"+ obj2[i].countryid + "</td>\
			<td>"+ obj2[i].name + "</td>\
			<td>"+ obj2[i].description + "</td>\
			<td>"+ (obj2[i].vaild == 1 ? "有效" : "无效") + "</td>\
			<td>"+ obj2[i].area + "</td>\
			<td>"+ obj2[i].chinaarea + "</td>\
			<td>"+ obj2[i].sortvalue + "</td>\
			<td>"+ obj2[i].countrycode + "</td>\
			<td>"+ obj2[i].currency + "</td>\
			<td><a href=\"javascript:\" onclick=\"fun.d01('"+ obj2[i].currency + "',$(this))\">查看</a></td>\
			<td>"+ obj2[i].callingcode + "</td>\
			</tr>"
        }
        html = '<table class="tb">\
		<tr>\
		<td>\
			<ul class="makeHtmlTab">\
				<li val="1_tbody" class="hover" onclick="fun.e03()">国家列表</li>\
				<li val="2_tbody"  onclick="fun.e01()">单位列表</li>\
			</ul>\
			<table class="tb" id="1_tbody">\
			<tr><td colspan="11" id="URL">'+ URL + '</td></tr>\
			<tr align="center">\
				<td>国家ID</td>\
				<td>国家名称</td>\
				<td>描述</td>\
				<td>是否有效</td>\
				<td>区域</td>\
				<td>区域洲</td>\
				<td>排序值</td>\
				<td>国家代码</td>\
				<td>币种</td>\
				<td>汇率转换</td>\
				<td>国家区号代码</td>\
				</tr>'+ html + '\
				<tr><td colspan="10"><a class="button" href="javascript:" onclick="fun.c01()">一键采集所有国家</a></td><td></td></tr>\
			</table>\
		</td>\
		</tr>\
		</table>'
        F2.b01(html, this.obj.fromid)
    },
    c01: function ()//基础_一键采集所有国家
    {
        $("#1_tbody").html('<tr><td><img src="/' + o.path + 'admin/img/loading-128x128.gif" style="margin-left:45%;"/></td></tr>');
        let obj2 = this.sql, html = '', callingcode, sql, select1, update;
        for (let i = 0; i < obj2.length; i++) {
            callingcode = obj2[i].callingcode ? obj2[i].callingcode.replace(/\s/ig, '') : 0
            sql = "insert into @.country(:countryid,:name,:des,:hide,:area,:chinaarea,:sort,:countrycode,:currency,:callingcode,:from,:fromid) values ('" + obj2[i].countryid + "','" + obj2[i].name + "','" + obj2[i].description + "'," + (obj2[i].vaild == 0 ? 1 : 0) + ",'" + obj2[i].area + "','" + obj2[i].chinaarea + "'," + obj2[i].sortvalue + ",'" + (obj2[i].countrycode == null ? "0" : obj2[i].countrycode) + "','" + obj2[i].currency + "','" + callingcode + "','dhgate',\'" + obj2[i].countryid + "\')"
            select1 = "select top 1 count(1) from @.country where @.countryid='" + obj2[i].countryid + "' and @.from='dhgate'"
            update = 'update @.country set @.name=\'' + obj2[i].name + '\',:fromid=\'' + obj2[i].countryid + '\',:des=\'' + obj2[i].description + '\' where @.countryid=\'' + obj2[i].countryid + '\' and @.from=\'dhgate\''
            html += '\
			<if "Fun(Db('+ select1 + ',count))"=="0">\
				<tr><td>'+ sql + '<r: db="sqlite.dhgate">' + sql + '</r:>----导入成功</td></tr>\
			<else/>\
				<tr><td>'+ update + '<r: db="sqlite.dhgate">' + update + '</r:>----已存在，更新</td></tr>\
			</if>'
        }
        html = '<tr class="thead"><td>一键采集所有国家</td></tr>' + html + '<tr><td>导入完成</td></tr>'
        Tool.ajax.a01(html,1,this.c02,  this);
    },
    c02: function (str) { $("#1_tbody").html(str); },
    d01: function (A, This) {
        let arr = this.sql, str = ''
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i].currency + '">' + arr[i].currency + '</option>'
        }
        str = '<select onchange="fun.d02(this.options[this.selectedIndex].value,\'' + A + '\',$(this))"><option value="">转换币种</option>' + str + '</select>'
        This.parent().html(str)
    },
    d02: function (fromCurrency, toCurrency, This) {
        let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.base.exchangerate.get&timestamp=" + new Date().getTime() + "&v=2.0&fromCurrency=" + fromCurrency + "&toCurrency=" + toCurrency
        $("#URL").html(URL.replace(/\[=\]/ig, '=').replace(/\[&\]/ig, '&amp;'))
       Tool.ajax.a01( "<.WebClientPost(" + URL + ")/>", 1,this.d03, this, This)
    },
    d03: function (t, This) {
        //{"status":{"code":"00000000","message":"OK","solution":"","subErrors":[]},"fromCurrency":"USD","toCurrency":"INR","exchangeRate":77.5634}
        //{"status":{"code":"00000001","message":"call back success and null value returned","solution":"","subErrors":[]},"fromCurrency":null,"toCurrency":null,"exchangeRate":0.0}
        eval("let arr=" + t)
        if (arr.status.code == "00000000") { This.parent().html(arr.fromCurrency + " (" + arr.exchangeRate + ")"); }
        else { This.parent().html("不能识别"); }
    },
    e01: function () {
        $(".tb .makeHtmlTab li").removeAttr('class')
        $("#1_tbody").hide();
        $("[val='2_tbody']").attr("class", "hover")
        if ($("#2_tbody").length == 0) {
            let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.base.measures.get&timestamp=" + new Date().getTime() + "&v=1.0"
           Tool.ajax.a01( 1, '=').replace(/\[&\]/ig,this.e02, "<.WebClientPost(" + URL + ")/>", this, URL.replace(/\[=\]/ig, '&amp;'))
        }
        else {
            $("#2_tbody").show();
        }
    },
    e02: function (t, URL) {
        let html = '', vaild
        eval("let obj2=" + t);
        obj2 = obj2.meauserList
        for (let i = 0; i < obj2.length; i++) {
            if (obj2[i].valid == "1") { vaild = "有效" } else { vaild = "无效" }
            html += "<tr align=\"center\">\
			<td>"+ obj2[i].measureid + "</td>\
			<td>"+ obj2[i].name + "</td>\
			<td>"+ obj2[i].description + "</td>\
			<td>"+ vaild + "</td>\
			<td>"+ obj2[i].cname + "</td>\
			<td>"+ obj2[i].shortname + "</td>\
			<td>"+ obj2[i].plural + "</td>\
			</tr>"
        }
        html = '<table class="tb" id="2_tbody"><tr><td colspan="7">' + URL + '</td></tr><tr align="center"><td>主键ID</td><td>名称</td><td>描述</td><td>是否有效</td><td>中文名</td><td>名称缩写</td><td>名称(复数)</td></tr>' + html + '</table>'
        $("#1_tbody").parent().append(html)
    },
    e03: function () {
        $("#1_tbody").show(); $("#2_tbody").hide();
        $(".tb .makeHtmlTab li").removeAttr('class');
        $("[val='1_tbody']").attr("class", "hover");

    }
}
fun.a01();