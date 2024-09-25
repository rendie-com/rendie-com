var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        this.a02();
    },
    a02: function () {
        let str = '[\
    {\
      "size":10,\
      "count":<@count/>\
    }\
    <r:proupdhgate size=10 db="sqlite.dhgate" page=2 where=" where @.isranking=1 '+ this.b05() + '">,\
		{\
			"proid":"<:proid/>",\
    	"ranking":[{}\
				<r:proupdhgatekeysranking size=10 db="sqlite.dhgate" where=" where @.proid=\'<:proid/>\' order by @.id asc">,\
				{\
					"keys1":"<:keys1/>",\
					"keys1ClickNum":<:keys1ClickNum/>,\
					"keys1ranking":<:keys1ranking/>,\
					"keys2":"<:keys2/>",\
					"keys2ClickNum":<:keys2ClickNum/>,\
					"keys2ranking":<:keys2ranking/>,\
					"keys3":"<:keys3/>",\
					"keys3ClickNum":<:keys3ClickNum/>,\
					"keys3ranking":<:keys3ranking/>,\
					"addtime":<:addtime/>\
				}\
				</r:proupdhgatekeysranking>],\
		  "upuser":"<:upuser/>",\
			"keysScanTime":<:keysScanTime/>,\
			"keysClickTime":<:keysClickTime/>\
    }\
    </r:proupdhgate>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr1) {
        let html = "", data1 = [];
        for (let i = 1; i < arr1.length; i++) {
            html += '\
      <tr>\
      	<td class="p-0">\
					<table class="table mb-0 table-hover">\
						<tr>\
						<td title="商品编码" style="padding-left: 30px;position: relative;">\
							<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
							<ul class="dropdown-menu">\
          			<li onClick="fun.c03(\''+ arr1[i].proid + '\')"><a class="dropdown-item pointer">*搜索关键词然后模拟点击</a></li>\
							</ul>\
							'+ arr1[i].proid + '\
						</td>\
						</tr>\
						<tr><td title="卖家店铺">'+ arr1[i].upuser + '</td></tr>\
					</table>\
				</td>\
      	<td class="p-0 center">\
					<table class="table mb-0 table-hover">\
						<tr><td title="扫描时间">'+ Tool.userDate13(arr1[i].keysScanTime * 1000, "/") + '</td></tr>\
						<tr><td title="点击时间">'+ Tool.userDate13(arr1[i].keysClickTime * 1000, "/") + '</td></tr>\
					</table>\
				</td>\
      	<td class="p-0" id="keys1'+ arr1[i].proid + '"></td>\
      	<td class="p-0" id="keys2'+ arr1[i].proid + '"></td>\
      	<td class="p-0" id="keys3'+ arr1[i].proid + '"></td>\
      </tr>';
            //////////////////////////////////////////////////'+Tool.pre(arr1[i].ranking)+'
            data1.push({ proid: arr1[i].proid, keysArr: this.b02(arr1[i].ranking) });
            ////////////////////////////////////////////////////////////
        }
        html += '<tr><td colspan="5" class="left">' + Tool.page(arr1[0].count, arr1[0].size, 4) + '</td></tr>'
        let html2 = Tool.header() + this.b03() + '\
    <div class="p-2">\
			<table class="table table-bordered table-hover align-middle">\
				<thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table>\
		</div>'
        Tool.html(this.a04, this, html2, data1)
    },
    a04: function (arr) {
        let oo = {}
        let str = '\
		<header class="panel-heading">排名：{{value}}</header>\
		<table class="table table-bordered center" style="color: white;left:-5px;position: relative;margin:0 10px 15px 5px;">\
			<thead><tr><th>编号</th><th>添加时间</th><th>关键词</th><th>模拟点击量</th></tr></thead>\
			<tbody>{{value:levels}}</tbody>\
		</table>'
        for (let i = 0; i < arr.length; i++) {
            $("#keys1" + arr[i].proid).sparkline(arr[i].keysArr[0][0], {
                type: 'bar',
                height: 70,
                barWidth: 25,
                barSpacing: 2,
                tooltipFormat: str,
                tooltipValueLookups: { levels: arr[i].keysArr[0][1] }
            });
            ///////////////////////////////////////////
            $("#keys2" + arr[i].proid).sparkline(arr[i].keysArr[1][0], {
                type: 'bar',
                height: 70,
                barWidth: 25,
                barSpacing: 2,
                tooltipFormat: str,
                tooltipValueLookups: { levels: arr[i].keysArr[1][1] }
            });
            //////////////////////////////////////////////////////////
            $("#keys3" + arr[i].proid).sparkline(arr[i].keysArr[2][0], {
                type: 'bar',
                height: 70,
                barWidth: 25,
                barSpacing: 2,
                tooltipFormat: str,
                tooltipValueLookups: { levels: arr[i].keysArr[2][1] }
            });
        }
    },
    b01: function () {
        let html = '\
    <tr>\
      <th class="left" style="padding-left: 30px;position: relative;">\
				<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li onClick="fun.c04(\'js04\',7)"><a class="dropdown-item pointer" title="扫描商品三个关键词在DH的排名，【7天一次】。">*关键词中<font color="red">无排名</font>的查找排名</a></li>\
          <li onClick="fun.c04(\'js04\',1)"><a class="dropdown-item pointer" title="扫描商品三个关键词在DH的排名，【每天一次】。">*关键词中<font color="red">有排名</font>的查找排名</a></li>\
          <li onClick="fun.c04(\'js06\',1)"><a class="dropdown-item pointer" title="扫描商品三个关键词在DH的排名，每天一次】。">*关键词中有排名的打开浏览</a></li>\
          <li onClick="fun.c06()"><a class="dropdown-item pointer">删除十天前的关键词排名</a></li>\
        </ul>\
				商品编码/店铺名称</th>\
      <th class="w110">扫描/点击时间</th>\
      <th class="w-25">关键词一排名</th>\
      <th class="w-25">关键词二排名</th>\
      <th class="w-25">关键词三排名</th>\
    </tr>'
        return html;
    },
    b02: function (arr) {
        let keys1 = [], keys1_keys1 = {}, keys2 = [], keys2_keys2 = {}, keys3 = [], keys3_keys3 = {}, len = arr.length
        for (let i = 1; i < len; i++) {
            keys1.push(arr[i].keys1ranking);
            if (keys1_keys1[arr[i].keys1ranking]) { keys1_keys1[arr[i].keys1ranking] += '<tr><td>' + i + '</td><td>' + Tool.userDate13(arr[i].addtime * 1000) + '</td><td>' + arr[i].keys1 + '</td><td>' + arr[i].keys1ClickNum + '</td></tr>'; }
            else { keys1_keys1[arr[i].keys1ranking] = '<tr><td>' + i + '</td><td>' + Tool.userDate13(arr[i].addtime * 1000) + '</td><td>' + arr[i].keys1 + '</td><td>' + arr[i].keys1ClickNum + '</td></tr>'; }
            /////////////////////////////////////////////
            keys2.push(arr[i].keys2ranking);
            if (keys2_keys2[arr[i].keys2ranking]) { keys2_keys2[arr[i].keys2ranking] += '<tr><td>' + i + '</td><td>' + Tool.userDate13(arr[i].addtime * 1000) + '</td><td>' + arr[i].keys2 + '</td><td>' + arr[i].keys2ClickNum + '</td></tr>'; }
            else { keys2_keys2[arr[i].keys2ranking] = '<tr><td>' + i + '</td><td>' + Tool.userDate13(arr[i].addtime * 1000) + '</td><td>' + arr[i].keys2 + '</td><td>' + arr[i].keys2ClickNum + '</td></tr>'; }
            /////////////////////////////////////////////////
            keys3.push(arr[i].keys3ranking);
            if (keys3_keys3[arr[i].keys3ranking]) { keys3_keys3[arr[i].keys3ranking] += '<tr><td>' + i + '</td><td>' + Tool.userDate13(arr[i].addtime * 1000) + '</td><td>' + arr[i].keys3 + '</td><td>' + arr[i].keys3ClickNum + '</td></tr>'; }
            else { keys3_keys3[arr[i].keys3ranking] = '<tr><td>' + i + '</td><td>' + Tool.userDate13(arr[i].addtime * 1000) + '</td><td>' + arr[i].keys3 + '</td><td>' + arr[i].keys3ClickNum + '</td></tr>'; }
        }
        return [[keys1, keys1_keys1], [keys2, keys2_keys2], [keys3, keys3_keys3]];
    },
    b03: function () {
        return '\
    <div class="input-group w400 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b04(obj.arr[5]) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c05(1)" value="1">商品编码</li>\
        <li class="dropdown-item pointer" onclick="fun.c05(2)" value="2">店铺名称</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>'
    },
    b04: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "店铺名称"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b05: function () {
        let str = "";
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": str += " and @.proid='" + Tool.unescape(obj.arr[6]) + "'"; break;//商品编码
                case "2": str += " and @.upuser like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//商品来源ID
            }
        }
        return str;
    },
    c01: function () { },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword)
            Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + Field + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (val) {
        let r = Tool.escape("/" + obj.arr.join("/"));//返回URL
        Tool.main('/js05/' + val + '/' + r);
    },
    c04: function (js, val) {
        let r = Tool.escape("/" + obj.arr.join("/"));//返回URL
        Tool.main('/' + js + '/' + val + '/' + r);
    },
    c05: function (val) {
        let name = this.b04("" + val)
        $("#Field").html(name).val(val)
    },
    c06: function () {
        let newTime = Tool.gettime("") - 60 * 60 * 24 * 10//当前时间减十天
        let str = '""<r: db="sqlite.aliexpress">delete from @.proupdhgatekeysranking where @.addtime<' + newTime + '</r:>';
        Tool.ajax.a01(str, 1, Tool.reload);
    }
}
fun.a01();