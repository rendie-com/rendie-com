'use strict';
var fun =
{
    pro: [],
    obj: { A1: 1, A2: 0, Aarr: [] },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//商品信息
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//审核状态
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//状态
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//上传到【敦煌】
        obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//【添加/更新】时间
        obj.arr[10] = obj.arr[10] ? obj.arr[10] : "1";//搜索字段
        obj.arr[11] = obj.arr[11] ? obj.arr[11] : "-_-20";//搜索关键词
        obj.arr[12] = obj.arr[12] ? obj.arr[12] : "-_-20";//查看分类数据
        this.a02();
    },
    a02: function () {
        let str = '[\
    {\
      "size":10,\
			"count":<@count/>\
    }\
    <r:pro db="sqlite.dhgate" size=10 page=2 where="'+ this.b04() + '">,\
    {\
      "id":<:id/>,\
      "examine":<:examine/>,\
      "SaleNum":<:SaleNum/>,\
      "ReviewsNum":<:ReviewsNum/>,\
      "Review":<:Review/>,\
      "fromid":<:fromid/>,\
      "shopid":<:shopid/>,\
      "addtime":<:addtime/>,\
      "pic1":"<:pic1/>",\
      "proid":"<:proid/>",\
      "minprice":"<:minprice f=2/>",\
      "maxprice":"<:maxprice f=2/>",\
      "lotNum":"<:lotNum/>",\
      "unit":"<:unit/>",\
      "keywords":<:keywords tag=json/>,\
      "Discount":"<:Discount f=0/>",\
      "datetime":<:datetime/>,\
      "time1":<:time1/>,\
      "timeUS":<:timeUS/>,\
      "name":"<:name tag=js/>",\
      "err":"<:err tag=js/>",\
      "typename":"",\
      "shipToUS":<:shipToUS/>,\
      "hide":<:hide/>\
    }\
    </r:pro>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        this.obj.hideArr = this.b10()
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered">\
            <tr><td title="ID" style="padding-left: 30px;position: relative;">\
							<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
							<ul class="dropdown-menu">\
								<li onClick="Tool.open5(\'js02\','+ arr[i].id + ')"><a class="dropdown-item pointer">查看内容</a></li>\
								<li onClick="fun.c14('+ arr[i].id + ')"><a class="dropdown-item pointer">设置为【手动审核不通过】</a></li>\
								<li onclick="Tool.open5(\'js03\',\''+ arr[i].proid + '\');"><a class="dropdown-item pointer">*重新采集</a></li>\
								<li onclick="Tool.open5(\'js19\',\''+ Tool.escape("@.proid='" + arr[i].proid + "'") + '\');"><a class="dropdown-item pointer">删除</a></li>\
							</ul>'+ arr[i].id + '</td></tr>\
            <tr><td title="来源ID"><a href="https://www.dhgate.com/product/-----/'+ arr[i].fromid + '.html" target="_blank" title="点击查看来源商品">' + arr[i].fromid + '</a></td></tr>\
            <tr><td title="店铺ID"><a href="https://www.dhgate.com/store/'+ arr[i].shopid + '" target="_blank" title="点击查看来源店铺">' + arr[i].shopid + '</a></td></tr>\
          </table>\
        </td>\
        <td class="left p-0">'+ this.b14(arr[i]) + '</td>\
        <td>'+ this.b02(arr[i].examine) + '</td>\
        <td>'+ this.b03(arr[i].hide) + '</td>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered">\
            <tr><td title="添加时间【addtime】">'+ Tool.js_date_time2(arr[i].addtime, "-") + '</td></tr>\
            <tr><td title="更新时间【datetime】">'+ Tool.js_date_time2(arr[i].datetime, "-") + '（' + Tool.datedifference(false, arr[i].datetime * 1000) + '天）</td></tr>\
            <tr><td title="扫描时间【time1】">'+ Tool.js_date_time2(arr[i].time1, "-") + '</td></tr>\
            <tr><td title="运费更新时间【timeUS】">'+ Tool.js_date_time2(arr[i].timeUS, "-") + '（' + Tool.datedifference(false, arr[i].timeUS * 1000) + '天）' + '</td></tr>\
          </table>\
        </td>\
      </tr>'
        }
        html += '<tr><td colspan="5" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = this.b05() + '\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[10] + '">' + this.b06(obj.arr[10]) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c07(1)" value="1">商品标题</li>\
        <li class="dropdown-item pointer" onclick="fun.c07(2)" value="2">商品ID</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c07(3)" value="3">商品编码</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c07(4)" value="4">来源ID</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c07(5)" value="5">店铺名称</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c07(6)" value="6">店铺ID</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c07(7)" value="7">出错说明</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[11] == "-_-20" ? "" : Tool.unescape(obj.arr[11])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button" onclick="fun.c02();">搜索</button>\
      <button class="btn btn-outline-secondary" type="button">'+ (arr[0].type ? arr[0].type : '查看分类数据') + '</button>\
    </div>\
    <div class="p-2">\
			<table class="table table-hover center">\
				<thead class="table-light">'+ this.b01(arr[0]) + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table>\
		</div>';
        Tool.html(null, null, html);
    },
    b01: function (oo) {
        let str = '\
    <tr>\
      <th class="w170"style="padding-left: 30px;position: relative;">'+ this.b12() + 'ID/来源ID/店铺ID</th>\
      <th class="p-0">'+ this.b07() + '</th>\
      <th class="w120 p-0">'+ this.b08() + '</th>\
      <th class="w230 p-0">'+ this.b09(config.pro_hide_count) + '</th>\
      <th class="w230 p-0">'+ this.b11() + '</th>\
    </tr>'
        return str;
    },
    b02: function (examine) {
        let str = "";
        switch (examine) {
            case 0: str = "未审核"; break;
            case 1: str = "审核通过"; break;
            case 2: str = "需要更新"; break;
            case 3: str = "审核不通过"; break;
            case 4: str = "重新审核"; break;
            default: str = "未知：" + status;
        }
        return str;
    },
    b03: function (hide) {
        let str = "", arr = this.obj.hideArr;
        for (let i = 0; i < arr.length; i++) {
            if (hide == "" + i) { str = arr[i][0] + (arr[i][2] ? arr[i][2].replace(/\$1/g, "'" + Tool.escape("@.hide=" + i) + "'") : ""); break; }
        }
        return str;
    },
    b04: function () {
        let whereArr = []
        /////////////////////////////////////////////////////////////////////////////////////////
        if (obj.arr[11] != "-_-20") {
            switch (obj.arr[10]) {
                case "1": whereArr.push("@.name like'%" + Tool.unescape(obj.arr[11]) + "%'"); break;//商品标题
                case "2": whereArr.push("@.id=" + Tool.unescape(obj.arr[11])); break;//商品ID
                case "3": whereArr.push("@.proid='" + Tool.unescape(obj.arr[11]) + "'"); break;//商品编码
                case "4": whereArr.push("@.fromid=" + Tool.unescape(obj.arr[11])); break;//来源ID
                case "5": whereArr.push("@.shopname='" + Tool.unescape(obj.arr[11]) + "'"); break;//店铺名称
                case "6": whereArr.push("@.shopid=" + Tool.unescape(obj.arr[11])); break;//店铺ID
                case "7": whereArr.push("@.err like '%" + Tool.unescape(obj.arr[11]) + "%'"); break;//出错说明
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////
        switch (obj.arr[5]) {
            case "1": whereArr.push("@.SaleNum&gt;1000"); break;
            case "2": whereArr.push("@.SaleNum&gt;10000"); break;
            case "3": whereArr.push("@.SaleNum<30"); break;
            case "4": whereArr.push("@.SaleNum<40"); break;
            case "5": whereArr.push("@.Review<4.6"); break;
            case "6": whereArr.push("@.Review<4.7"); break;
            case "7": whereArr.push("@.shipToUS=1"); break;//发往【美国】免运费
            case "8": whereArr.push("@.shipToUS=0"); break;//发往【美国】收运费
            case "9": whereArr.push("@.shipToUS=2"); break;//不发往【美国】
            case "10": whereArr.push("@.isUpDHgate=1"); break;//已上传至【煌煌网】
            case "11": whereArr.push("@.isUpDHgate=1 and @.shipToUS=1"); break;//已上传至【煌煌网】，且发往【美国】免运费
            case "12": whereArr.push("@.isUpDHgate=1 and @.shipToUS=0"); break;//已上传至【煌煌网】，且发往【美国】收运费
            case "13": whereArr.push("@.isUpDHgate=1 and @.shipToUS=2"); break;//已上传至【煌煌网】，且不发往【美国】
            case "14": whereArr.push("@.ReviewsNum<10"); break;
            case "15": whereArr.push("@.ReviewsNum<20"); break;
            case "16": whereArr.push("@.price<0.5 and @.shipToUS=1"); break;//平均价格<1,且发往【美国】免运费
            case "17": whereArr.push("@.price<1 and @.shipToUS=1"); break;//平均价格<1,且发往【美国】免运费
            case "18": whereArr.push("@.minprice<0.5 and @.shipToUS=1"); break;//最小价格<1,且发往【美国】免运费
            case "19": whereArr.push("@.minprice<1 and @.shipToUS=1"); break;//最小价格<1,且发往【美国】免运费
        }
        ////////////////////////////////////////////////////////
        if (obj.arr[6] != "-_-20") { whereArr.push("@.examine=" + obj.arr[6]); }
        if (obj.arr[7] != "-_-20") { whereArr.push("@.hide=" + obj.arr[7]); }
        if (obj.arr[8] != "-_-20") { whereArr.push("@.isUpDHgate=" + obj.arr[8]); }
        ////////////////////////////////////////
        let where = ""
        switch (obj.arr[9]) {
            case "1": where = " order by @.addtime desc,@.id"; break;
            case "2": where = " order by @.datetime desc,@.id"; break;
            case "3": whereArr.push("@.datetime<" + parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 20) / 1000) + " order by @.datetime,@.id"); break;
            case "4": where = " order by @.time1 desc,@.id"; break;
            case "5": where = " order by @.timeUS desc,@.id"; break;
            case "6": where = " order by @.price asc,@.id"; break;
            case "7": where = " order by @.minprice asc,@.id"; break;
            default: where = " order by @.id desc";
        }
        /////////////////////////////////////////////
        let str = (whereArr[0] ? " where " + whereArr.join(" and ") : "") + where
        return str;
    },
    b05: function () {
        return '\
    <header class="panel-heading">\
			<div onclick="Tool.main()" class="active">商品列表</div>\
			<div onclick="Tool.main(\'js05\')">商品审核</div>\
			<div onclick="Tool.main(\'js06\')">店铺</div>\
			<div onclick="Tool.main(\'js07\')">禁限</div>\
    </header>'
    },
    b06: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品标题"; break;
            case "2": name = "商品ID"; break;
            case "3": name = "商品编码"; break;
            case "4": name = "来源ID"; break;
            case "5": name = "店铺名称"; break;
            case "6": name = "店铺ID"; break;
            case "7": name = "出错说明"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b07: function () {
        return '\
		<select class="form-select" onChange="Tool.open(5,this.options[this.selectedIndex].value)">\
			<option value="-_-20">商品信息</option>\
			<option value="1" '+ (obj.arr[5] == "1" ? 'selected="selected"' : '') + '>销量&gt;1000</option>\
			<option value="2" '+ (obj.arr[5] == "2" ? 'selected="selected"' : '') + '>销量&gt;10000</option>\
			<option value="3" '+ (obj.arr[5] == "3" ? 'selected="selected"' : '') + '>销量&lt;30</option>\
			<option value="4" '+ (obj.arr[5] == "4" ? 'selected="selected"' : '') + '>销量&lt;40</option>\
			<option value="5" '+ (obj.arr[5] == "5" ? 'selected="selected"' : '') + '>评分&lt;4.6</option>\
			<option value="6" '+ (obj.arr[5] == "6" ? 'selected="selected"' : '') + '>评分&lt;4.7</option>\
			<option value="7" '+ (obj.arr[5] == "7" ? 'selected="selected"' : '') + '>发往【美国】免运费</option>\
			<option value="8" '+ (obj.arr[5] == "8" ? 'selected="selected"' : '') + '>发往【美国】收运费</option>\
			<option value="9" '+ (obj.arr[5] == "9" ? 'selected="selected"' : '') + '>不发往【美国】</option>\
			<option value="10" '+ (obj.arr[5] == "10" ? 'selected="selected"' : '') + '>已上传至【煌煌网】</option>\
			<option value="11" '+ (obj.arr[5] == "11" ? 'selected="selected"' : '') + '>已上传至【煌煌网】，且发往【美国】免运费</option>\
			<option value="12" '+ (obj.arr[5] == "12" ? 'selected="selected"' : '') + '>已上传至【煌煌网】，且发往【美国】收运费</option>\
			<option value="13" '+ (obj.arr[5] == "13" ? 'selected="selected"' : '') + '>已上传至【煌煌网】，且不发往【美国】</option>\
			<option value="14" '+ (obj.arr[5] == "14" ? 'selected="selected"' : '') + '>评论量&lt;10</option>\
			<option value="15" '+ (obj.arr[5] == "15" ? 'selected="selected"' : '') + '>评论量&lt;20</option>\
			<option value="16" '+ (obj.arr[5] == "16" ? 'selected="selected"' : '') + '>平均价格&lt;0.5,且发往【美国】免运费</option>\
			<option value="17" '+ (obj.arr[5] == "17" ? 'selected="selected"' : '') + '>平均价格&lt;1,且发往【美国】免运费</option>\
			<option value="18" '+ (obj.arr[5] == "16" ? 'selected="selected"' : '') + '>最小价格&lt;0.5,且发往【美国】免运费</option>\
			<option value="19" '+ (obj.arr[5] == "17" ? 'selected="selected"' : '') + '>最小价格&lt;1,且发往【美国】免运费</option>\
		</select>'
    },
    b08: function () {
        return '\
		<select class="form-select" onChange="Tool.open(6,this.options[this.selectedIndex].value)" >\
			<option value="-_-20">审核状态</option>\
			<option value="0" '+ (obj.arr[6] == "0" ? 'selected="selected"' : '') + '>未审核</option>\
			<option value="1" '+ (obj.arr[6] == "1" ? 'selected="selected"' : '') + '>审核通过</option>\
			<option value="2" '+ (obj.arr[6] == "2" ? 'selected="selected"' : '') + '>需要更新</option>\
			<option value="3" '+ (obj.arr[6] == "3" ? 'selected="selected"' : '') + '>审核不通过</option>\
			<option value="4" '+ (obj.arr[6] == "4" ? 'selected="selected"' : '') + '>重新审核</option>\
		</select>'
    },
    b09: function (oo) {
        let arr = this.obj.hideArr;
        let str = ""
        for (let i = 0; i < oo.length; i++) {
            str += '<option value="' + i + '" ' + (obj.arr[7] == i ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][0] + '(' + oo[i] + ')</option>'
        }
        return '\
		<select class="form-select" onChange="fun.c03(this.options[this.selectedIndex].value)">\
			<option value="-_-20">状态</option>\
			<option value="-1">更新数量</option>\
			'+ str + '\
	 </select>'
    },
    b10: function () {
        let del = '<a href="javascript:;" onclick="Tool.open5(\'js19\',$1)"><svg class="i-trash" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6"></path></svg></a>'
        let update = '<br/><a href="javascript:;" onclick="fun.c13($1)">恢复正常</a>'
        return [
            ["正常", "", ""],
            ["已下架", "", ""],
            ["库存不足", "", ""],
            ["首次404错误", "", ""],
            ["首次正常", "可确保【不合格产品】慢一点在我这上传"],
            ["二次【已下架】", "", ""],
            ["二次【库存不足】", "", ""],
            ["不到美国", "", ""],
            ["图片不足", "", del],
            ["库存为零", "", update],
            ["发布类目不对", "", ""],
            ["图片不能为空", "", ""],
            ["图片上传失败", "", update],
            ["特别类目限制", "", ""],
            ["错误为空", "", update],
            ["采集错误", "", ""],
            ["属性错误", "", update],
            ["单词堆积", "", update],
            ["替换后改正常", "", ""],
            ["描述上传不成功", "", update],
            ["内容超长", "", ""],
            ["没有绑定分类", "", ""],
            ["最低价格限制", "", update],
            ["标题不能包含", "", update],
            ["必须至少包含", "", ""],
            ["sku数量错误", "", ""],
            ["关键词错误", "", update],
            ["提交有:undefined", "", update],
            ["数据本身有问题", "", ""],
            ["两张细节图", "", ""],
            ["展示内容不一致", "", ""],
            ["无当前类目发布权限", "", ""],
            ["产品组ID为空", "", update],
            ["无运费模板可用", "", ""],
            ["评分&lt;4.6", "", del],
            ["销量&lt;30", "", del],
            ["评论量&lt;10", "", del],
            ["评分==0", "", del],
            ["销量==0", "", del],
            ["评论量==0", "", del],
            ["卖点&特性", "", ""],
            ["店铺评分&lt;96", "", del + update],
            ["店铺关注量&lt;1000", "", del + update],
            ["标题错误1", "", ""],
            ["产品标题2", "", ""],
            ["类目限制", "", ""],
            ["评分为：差", "", update],
            ["侵权产品", "", ""],
            ["商品主图重复", "", ""],
            ["---", "", ""],
            ["---", "", ""],
            ["品牌商投诉", "", del],
            ["手动审核不通过", "", ""],
            ["禁卖品牌", "", del + update],
            ["重复商品", "", update],
            ["标题重复", "", ""],
            ["首图重复", "", ""],
            ["审核未通过", "", ""],
            ["二次【404错误】", "", del],
            ["三次【已下架】", "", del],
            ["三次【库存不足】", "", ""],
            ["二次【销量&lt;2】", "", ""],
            ["二次【评分&lt;4】", "", ""],
            ["二次【不到美国】", "", ""],
            ["二次【图片不足】", "", ""]
        ]
    },
    b11: function () {
        return '\
		<select class="form-select" onChange="Tool.open(9,this.options[this.selectedIndex].value)">\
			<option value="-_-20">时间</option>\
			<option value="1" '+ (obj.arr[9] == "1" ? 'selected="selected"' : '') + '>【添加时间】倒序</option>\
			<option value="2" '+ (obj.arr[9] == "2" ? 'selected="selected"' : '') + '>【更新时间】倒序</option>\
			<option value="3" '+ (obj.arr[9] == "3" ? 'selected="selected"' : '') + '>【20天外】未更新倒序</option>\
			<option value="4" '+ (obj.arr[9] == "4" ? 'selected="selected"' : '') + '>【扫描时间】倒序</option>\
			<option value="5" '+ (obj.arr[9] == "5" ? 'selected="selected"' : '') + '>【运费更新时间】倒序</option>\
			<option value="6" '+ (obj.arr[9] == "6" ? 'selected="selected"' : '') + '>【平均价格】升序</option>\
			<option value="7" '+ (obj.arr[9] == "7" ? 'selected="selected"' : '') + '>【最小价格】升序</option>\
		</select>'
    },
    b12: function () {
        return '\
		<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu" aria-labelledby="dropdown0">\
			<li onClick="Tool.open4(\'js10\')"><a class="dropdown-item pointer">设置TYPE1_TYPE2_TYPE3字段内容</a></li>\
			<li onClick="Tool.open4(\'js20\')"><a class="dropdown-item pointer" title="包括【删除重复】">把【类目表】名称添加到商品关键词中</a></li>\
			<li onClick="Tool.open4(\'js12\')"><a class="dropdown-item pointer">处理各种修复</a></li>\
			<li onClick="fun.c12(4.6)"><a class="dropdown-item pointer">归类【评分&lt;4.6】</a></li>\
			<li onClick="fun.c05(30)"><a class="dropdown-item pointer">归类【销量&lt;30】</a></li>\
			<li onClick="fun.c10(10)"><a class="dropdown-item pointer">归类【评论量&lt;10】</a></li>\
			<li onClick="fun.c11()"><a class="dropdown-item pointer">归类【评分==0】</a></li>\
			<li onClick="fun.c06()"><a class="dropdown-item pointer">归类【销量==0】</a></li>\
			<li onClick="fun.c04()"><a class="dropdown-item pointer">归类【评论量==0】</a></li>\
			<li onClick="Tool.open4(\'js17\')"><a class="dropdown-item pointer">归类【店铺评分&lt;96】</a></li>\
			<li onClick="Tool.open4(\'js18\')"><a class="dropdown-item pointer">归类【店铺关注量&lt;1000】</a></li>\
			<li onClick="Tool.open4(\'js04\')"><a class="dropdown-item pointer">删除商品表中多余的详情</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open4(\'js01\')" title="主要检查是否为【404】或【已下架】，7天检查一次">在正常商品中扫描非正常商品</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js19\',\''+ Tool.escape("@.shiptoUS=0") + '\')">删除发往【美国】收运费的商品</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'AU\')">*按国家【AU】澳大利亚(Australia)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'RU\')">*按国家【RU】俄罗斯(Russia)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'US\')">*按国家【US】美国(United States)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'CA\')">*按国家【CA】加拿大(Canada)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'IT\')">*按国家【IT】意大利(Italy)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'FR\')">*按国家【FR】法国(France)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'SE\')">*按国家【SE】瑞典(Sweden)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'UK\')">*按国家【UK】英国(United Kingdom)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'IN\')">*按国家【IN】印度(India)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'DE\')">*按国家【DE】德国(Germany)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'ES\')">*按国家【ES】西班牙(Spain)获取商品运费信息</a></li>\
			<li><a class="dropdown-item pointer" onClick="Tool.open5(\'js11\',\'BR\')">*按国家【BR】巴西(Brazil)获取商品运费信息</a></li>\
		</ul>'
    },
    b13: function (shipToUS) {
        let str = "未知"
        if (shipToUS == 0) { str = "发往美国，收运费"; }
        else if (shipToUS == 1) { str = "发往美国，免运费"; }
        else if (shipToUS == 2) { str = "不发往美国"; }
        return str;
    },
    b14: function (oo) {
        return '\
		<table class="table mb-0 table-bordered">\
			<tr>\
				<td><a target="_blank" href="'+ oo.pic1 + '"><img class="border" src="' + oo.pic1.replace("0x0", "100x100") + '" title="点击预览" border="0" width="90"></a></td>\
				<td class="p-0">'+ this.b15(oo) + '</td>\
			</tr>\
		</table>'
    },
    b15: function (oo) {
        return '\
		<table class="table table-bordered mb-0">\
		<tr>\
			<td colspan="6"><a href="/item/a/'+ oo.id + '.html" target="_blank">' + oo.name + '</a>【' + oo.typename + '】【' + this.b13(oo.shipToUS) + '】【' + (oo.isup == 1 ? '已上传' : '未上传') + '】</td>\
		</tr>\
		<tr>\
			<td>编码：'+ oo.proid + '</td>\
			<td>价格：$'+ (oo.minprice == oo.maxprice ? oo.minprice : oo.minprice + '-' + oo.maxprice) + '(' + (oo.lotNum == 1 ? oo.unit : oo.lotNum + ' ' + oo.unit + '/lot') + ')</td>\
			<td>折扣：'+ oo.Discount + '%</td>\
			<td>销量：'+ oo.SaleNum + '</td>\
			<td>评论量：'+ oo.ReviewsNum + '</td>\
			<td>评分：'+ oo.Review + '</td>\
		</tr>\
		<tr><td colspan="6">关键词：'+ oo.keywords + '</td></tr>\
		<tr><td colspan="6">出错说明：'+ oo.err + '</td></tr>\
		</table>'
    },
    c01: function () {
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (Field == "2" && isNaN(searchword)) {
            alert("【商品来源ID】必须是数字。")
        }
        else if (searchword) {
            searchword = Tool.escape(searchword)
            Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/-_-20/-_-20/-_-20/-_-20/-_-20/" + Field + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (val) {
        if (val == "-1") { Tool.open4("js13"); }
        else { Tool.main('/' + obj.arr[0] + '/list/' + obj.arr[2] + '/' + obj.arr[3] + '/1/' + obj.arr[5] + '/' + obj.arr[6] + '/' + val + '/' + obj.arr[8] + '/' + obj.arr[9]); }
    },
    c04: function () {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=39,@.err=\'归类【评论量==0】\' where @.ReviewsNum=0</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c05: function (val) {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=35,@.err=\'归类【销量<' + val + '】\' where @.salenum<' + val + '</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c06: function () {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=38,@.err=\'归类【销量==0】\' where @.salenum=0</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c07: function (val) {
        let name = this.b06("" + val)
        $("#Field").html(name).val(val)
    },
    c08: function (hide) {
        let str = '<r: db="sqlite.aliexpress">delete from @.pro where @.hide=' + hide + '</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c09: function (hide) {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=0,@.err=null where @.hide=' + hide + '</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c10: function (val) {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=36,@.err=\'归类【评论量<' + val + '】\' where @.ReviewsNum<' + val + '</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c11: function () {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=37,@.err=\'归类【评分==0】\' where @.Review=0</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c12: function (val) {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=34,@.err=\'归类【评分<' + val + '】\' where @.Review<' + val + '</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c13: function (val) {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=0,@.err=null where ' + Tool.unescape(val) + '</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    },
    c14: function (id) {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=52,@.err=\'手动审核不通过\' where @.id=' + id + '</r:>'
        Tool.ajax.a01( str,1,Tool.reload);
    }
}
fun.a01();