'use strict';
var fun =
{
    T: [], obj: { A1: 1, A2: 0, B1: 1, B2: 0, Barr: [] }, token: "",
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//物流状态
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//请款状态
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//时间
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "1";//搜索字段 
        obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//搜索关键词 
        this.a02();
    },
    a02: function () {
        let str = '[\
    {\
      "size":30,\
      "count":<@count/>,\
      "count0":<.Db(sqlite.dhgate,select count(1) from @.logdeliver where @.queryState=0,count)/>,\
      "count1":<.Db(sqlite.dhgate,select count(1) from @.logdeliver where @.queryState=1,count)/>,\
      "count2":<.Db(sqlite.dhgate,select count(1) from @.logdeliver where @.queryState=2,count)/>,\
      "count3":<.Db(sqlite.dhgate,select count(1) from @.logdeliver where @.queryState=3,count)/>,\
      "count4":<.Db(sqlite.dhgate,select count(1) from @.logdeliver where @.queryState=4,count)/>,\
      "count5":<.Db(sqlite.dhgate,select count(1) from @.logdeliver where @.queryState=5,count)/>\
    }\
    <r:logdeliver db="sqlite.dhgate" size=30 page=2 where="'+ this.b03() + '">,\
		{\
			"status":<:status/>,\
			"queryState":<:queryState/>,\
			"DeliverDate":<:DeliverDate/>,\
			"uptime":<:uptime/>,\
			"orderid":"<:orderid/>",\
			"shopname":"<:shopname/>",\
      "Express":"<:Express tag=js/>",\
      "ExpressNumber":"<:ExpressNumber tag=js/>",\
      "Express2":"<:Express2 tag=js/>",\
      "ExpressNumber2":"<:ExpressNumber2 tag=js/>",\
      <r:order db="sqlite.dhgate" size=1 where=" where @.orderid=\'<:orderid/>\'">\
        "PurchaseStatus":<:PurchaseStatus/>,\
        "Oid":<:id/>,\
        "PurchaseRemark":"<:PurchaseRemark tag=js/>",\
      </r:order>\
			"id":<:id/>\
		}\
		</r:logdeliver>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let html = ''
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
      <td class="left">'+ arr[i].Express + '<hr/>' + (arr[i].ExpressNumber == arr[i].ExpressNumber2 ? "相同" : this.b06(arr[i].ExpressNumber)) + '</td>\
      <td class="left">'+ arr[i].Express2 + '<hr/>' + this.b06(arr[i].ExpressNumber2) + '</td>\
      <td>'+ Tool.queryState(arr[i].queryState) + '<br/>（' + Tool.datedifference(false, arr[i].DeliverDate * 1000) + '天）</td>\
      <td class="p-0">\
				<table class="table table-bordered m-0">\
					<tr><td title="卖家店铺名">'+ arr[i].shopname + '</td></tr>\
      		<tr><td title="订单号	"><a href="javascript:" onclick="Tool.main(\'js01/' + arr[i].orderid + '\')">' + arr[i].orderid + '</a></td></tr>\
				</table>\
			</td>\
      <td class="p-0">\
				<table class="table table-bordered m-0">\
					<tr><td title="采购状态	">'+ Tool.PurchaseStatus(arr[i].PurchaseStatus) + '</td></tr>\
      		<tr><td title="采购备注" class="p-0"><input type="text" class="form-control form-control" value="'+ arr[i].PurchaseRemark + '" onblur="fun.f01($(this),' + arr[i].Oid + ',\'PurchaseRemark\',\'' + arr[i].PurchaseRemark + '\')"></td></tr>\
				</table>\
			</td>\
      <td>'+ this.b07(arr[i].status, arr[i].DeliverDate * 1000) + '</td>\
      <td class="p-0">\
				<table class="table table-bordered m-0">\
					<tr><td title="发货时间">'+ Tool.js_date_time2(arr[i].DeliverDate) + '</td></tr>\
      		<tr><td title="更新时间	">'+ Tool.js_date_time2(arr[i].uptime) + '</td></tr>\
				</table></td>\
      </tr>'
        }
        html += '<tr><td colspan="11" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = this.b04() + '\
      <div class="p-2">\
        <table class="table align-middle table-hover">\
          <thead class="table-light center">'+ this.b01(arr[0]) + '</thead>\
          <tbody class="center">'+ html + '</tbody>\
        </table>\
      </div>'
        Tool.html(null, null, html)
    },
    /////////////////////////////////
    b01: function (oo) {
        let str = '\
    <tr>\
      <th class="left" style="padding-left: 30px;position: relative;">\
				<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li onClick="Tool.open4(\'js04\');"><a class="dropdown-item pointer" title="注：只从【采购方】获取信息。并更新【采购运单号】【采购订单状态】【订单到达时间】。">*获取【采购方】信息</a></li>\
          <li onClick="fun.c08();"><a class="dropdown-item pointer">【已入账】的订单改为【无需请款】</a></li>\
          <li onClick="fun.c09()"><a class="dropdown-item pointer">【订单取消】的订单改为【无需请款】</a></li>\
        </ul>\
				实际【DH物流公司】\
			</th>\
      <th class="left">采购方【SMT物流公司】</th>\
      <th class="p-0">\
        <Select onchange="Tool.open(5,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="-_-20">物流状态</option>\
        <option value="13" title="【已入账】【订单取消】的订单，就【无需查询】了">无需查询</option>\
        <option value="0" '+ (obj.arr[5] == '0' ? 'selected="selected"' : '') + '>未查询（' + oo.count0 + '）</option>\
        <option value="1" '+ (obj.arr[5] == '1' ? 'selected="selected"' : '') + '>【菜鸟】查询不到（' + oo.count1 + '）</option>\
        <option value="2" '+ (obj.arr[5] == '2' ? 'selected="selected"' : '') + '>【菜鸟】揽收（' + oo.count2 + '）</option>\
        <option value="3" '+ (obj.arr[5] == '3' ? 'selected="selected"' : '') + '>【菜鸟】运输中（' + oo.count3 + '）</option>\
        <option value="4" '+ (obj.arr[5] == '4' ? 'selected="selected"' : '') + '>【菜鸟】妥投失败（' + oo.count4 + '）</option>\
        <option value="5" '+ (obj.arr[5] == '5' ? 'selected="selected"' : '') + '>【菜鸟】妥投（' + oo.count5 + '）</option>\
        <option value="6" '+ (obj.arr[5] == '6' ? 'selected="selected"' : '') + '>【17track】查询不到</option>\
        <option value="7" '+ (obj.arr[5] == '7' ? 'selected="selected"' : '') + '>【17track】运输途中</option>\
        <option value="8" '+ (obj.arr[5] == '8' ? 'selected="selected"' : '') + '>【17track】到达待取</option>\
        <option value="9" '+ (obj.arr[5] == '9' ? 'selected="selected"' : '') + '>【17track】投递失败</option>\
        <option value="10" '+ (obj.arr[5] == '10' ? 'selected="selected"' : '') + '>【17track】成功签收</option>\
        <option value="11" '+ (obj.arr[5] == '11' ? 'selected="selected"' : '') + '>【17track】可能异常</option>\
        <option value="12" '+ (obj.arr[5] == '12' ? 'selected="selected"' : '') + '>【17track】运输过久</option>\
        </Select>\
      </th>\
      <th class="w170">订单信息</th>\
      <th>采购信息</th>\
      <th class="p-0">\
        <Select onChange="Tool.open(6,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="-_-20">请款状态</option>\
        <option value="0" '+ (obj.arr[6] == '0' ? 'selected="selected"' : '') + '>未请款</option>\
        <option value="1" '+ (obj.arr[6] == '1' ? 'selected="selected"' : '') + '>已请款</option>\
        <option value="2" '+ (obj.arr[6] == '2' ? 'selected="selected"' : '') + ' title="当【妥投】太快，就不给请款">请款受限</option>\
        <option value="3" '+ (obj.arr[6] == '3' ? 'selected="selected"' : '') + ' title="【已入账】【订单取消】的订单，就【无需请款】">无需请款</option>\
      </Select>\
      </th>\
      <th class="w170 p-0">\
				<Select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
					<option value="-_-20">时间</option>\
					<option value="1" '+ (obj.arr[7] == '1' ? 'selected="selected"' : '') + '>【发货时间】倒序</option>\
					<option value="2" '+ (obj.arr[7] == '2' ? 'selected="selected"' : '') + '>【更新时间】倒序</option>\
				</Select>\
			</th>\
    </tr>'
        return str;
    },
    b02: function () {

    },
    b03: function () {
        let arr = [], t1 = " order by @.id desc";
        if (obj.arr[5] != "-_-20") arr.push("@.queryState=" + obj.arr[5]);//物流状态
        if (obj.arr[6] != "-_-20") arr.push("@.status=" + obj.arr[6]);//请款状态
        if (obj.arr[9] != "-_-20") {
            switch (obj.arr[8]) {
                case "1": arr.push("@.orderid like '%" + Tool.unescape(obj.arr[9]) + "%'"); break;//订单编号
                case "2": arr.push("@.Express like '%" + Tool.unescape(obj.arr[9]) + "%'"); break;//实际【物流公司】        
                case "3": arr.push("@.ExpressNumber like '%" + Tool.unescape(obj.arr[9]) + "%'"); break;//实际【物流单号】        
                case "4": arr.push("@.Express2 like '%" + Tool.unescape(obj.arr[9]) + "%'"); break;//采购方【物流公司】        
                case "5": arr.push("@.ExpressNumber2 like '%" + Tool.unescape(obj.arr[9]) + "%'"); break;//采购方【物流单号】        
            }
        }
        /////////////////////////////////////
        switch (obj.arr[7]) {
            case "1": t1 = " order by @.DeliverDate desc"; break;//【发货时间】倒序
            case "2": t1 = " order by @.uptime desc"; break;//【更新时间】倒序        
        }
        return (arr[0] ? " where " + arr.join(" and ") : "") + t1;
    },
    b04: function () {
        return Tool.header() + '\
        <div class="input-group w-50 m-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[8] + '">' + this.b05(obj.arr[8]) + '</button>\
          <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c06(1)" value="1">订单编号</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c06(2)" value="2">实际【DH物流公司】</li>\
            <li class="dropdown-item pointer" onclick="fun.c06(3)" value="3">实际【DH物流单号】</li>\
            <li class="dropdown-item pointer" onclick="fun.c06(4)" value="4">采购方【SMT物流公司】</li>\
            <li class="dropdown-item pointer" onclick="fun.c06(5)" value="5">采购方【SMT物流单号】</li>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[9] == "-_-20" ? "" : Tool.unescape(obj.arr[9])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b05: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "订单编号"; break;
            case "2": name = "实际【DH物流公司】"; break;
            case "3": name = "实际【DH物流单号】"; break;
            case "4": name = "采购方【SMT物流公司】"; break;
            case "5": name = "采购方【SMT物流单号】"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b06: function (ExpressNumber2) {
        let str = ""
        if (ExpressNumber2) {
            ExpressNumber2 = ExpressNumber2.substr(1, ExpressNumber2.length - 2)
            str = ExpressNumber2 + '\
			<a href="http://global.cainiao.com/detail.htm?mailNoList='+ ExpressNumber2.replace(/\//g, "%2C") + '" target="_blank" title="用【菜鸟】查询物流">\
				<img src="/'+ o.path + '/admin/img/logdeliver/cainiao.png" height="16"/>\
			</a>\
			<a href="https://t.17track.net/zh-cn#nums=' + ExpressNumber2.replace(/\//g, ",") + '" target="_blank" title="用【17TRACK】查询物流">\
				<img src="/'+ o.path + '/admin/img/logdeliver/17track.ico" height="16"/>\
			</a>\
			<a href="https://www.sypost.net/search?orderNo=' + ExpressNumber2.replace(/\//g, "%2C") + '" target="_blank" title="用【顺友】查询物流">\
				<img src="/'+ o.path + '/admin/img/logdeliver/sypost.png" height="16"/>\
			</a>\
			<a href="https://www.1tracking.net/zh-CN/detail?nums=' + ExpressNumber2.replace(/\//g, "%2C") + '" target="_blank" title="用【1Tracking】查询物流">\
				<img src="/'+ o.path + '/admin/img/logdeliver/1tracking.ico" height="16"/>\
			</a>'
        }
        return str;
    },
    b07: function (status, time) {
        let name = "";
        switch (status) {
            case 0: name = "未请款"; break;
            case 1: name = "已请款"; break;
            case 2: name = "<a href=\"javascript:;\" onclick=\"fun.c07()\" title=\"点击所有【请款受限】修改为：【未请款】，方便下次正常请款。\">请款受限</a><br/>（" + Tool.datedifference(false, time) + "天）"; break;
            case 3: name = "无需请款"; break;
            default: name = "未知：" + status;
        }
        return name
    },
    c01: function (page) { obj.arr[4] = page; Tool.main('/' + obj.arr.join("/")) },
    c02: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            let url = obj.arr[3]+"/1/-_-20/-_-20/-_-20/" + $("#Field").val() + "/" + searchword
            Tool.main(url);
        } else {
            alert("请输入搜索内容");
        }
    },
    c03: function (id) {
        let str = 'delete from @.logdeliver where @.id=' + id
        str = "\"\"<r: db=\"sqlite.dhgate\">" + str + "</r:>"
        Tool.ajax.a01(str, 1, this.c04, this)
    },
    c04: function (t) { if (t == "") { location.reload(); } else { Tool.at("出错:" + t); } },
    c05: function () {
    },
    c06: function (val) {
        let name = this.b05("" + val)
        $("#Field").html(name).val(val)
    },
    c07: function () {
        let html = "\"\"<r: db=\"sqlite.dhgate\">update @.logdeliver set @.status=0 where @.status=2</r:>"
        Tool.ajax.a01(html, 1, this.c04, this)
    },
    c08: function () {
        let html = "update @.logdeliver A,a.@.order B set a.@.status=3,A.:queryState=13 where a.@.orderid=b.@.orderid and not(B.:inAccountDate=0)"
        html = "\"\"<r: db=\"sqlite.dhgate\">" + html + "</r:>"
        Tool.ajax.a01(html, 1, this.c04, this)
    },
    c09: function () {
        let html = "update @.logdeliver A,:order B set a.@.status=3,A.:queryState=13 where a.@.orderid=b.@.orderid and b.@.status='111000'"
        html = "\"\"<r: db=\"sqlite.dhgate\">" + html + "</r:>"
        Tool.ajax.a01(html, 1, this.c04, this)
    },
    //////////////////////////////
    f01: function (This, id, L, V) {
        let val = This.val(), html = '';
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            if (L == "PurchaseStatus") {
                let oo = This.find("option:selected"); This.find("option").attr("selected", false); oo.attr("selected", true); html = This.html();//先选中，再取代码
                This.html("<option>加载加...</option>");
            }
            else { html = val; This.val("加载加..."); }
            let txt = "\"\"<r: tag=\"sql\">update @.dhOrder set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
            Tool.ajax.a01(txt, this.f02, this, [This, html]);
        }
    },
    f02: function (t, This) {
        if (t == "") {
            This[0].attr("disabled", false);
            if (This[1].indexOf('</option>') == -1) { This[0].val(This[1]); }
            else { This[0].html(This[1]); }
        }
        else { alert("出错：" + t) }
    }
}
fun.a01();
