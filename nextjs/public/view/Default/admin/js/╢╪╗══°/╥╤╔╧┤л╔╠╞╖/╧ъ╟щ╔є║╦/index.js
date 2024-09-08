'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//手动审核状态
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//本地商品状态
        this.a02();
    },
    a02: function () {
        let str = '[\
        {\
          "size":1,\
          "count":<@count/>\
        }\
        <r:proupdhgate db="sqlite.dhgate" size=1 page=2 where="'+ this.b06() + '">,\
	    {\
		    "shopid":"<:shopid/>",\
		    "dhfromid":"<:fromid/>",\
		    "proid":"<:proid/>",\
		    "upuser":"<:upuser/>",\
		    "ManualReview":<:ManualReview/>,\
		    "status":<:status/>,\
		    <r:shop db="sqlite.aliexpress" size=1 where=" where @.shopid=<:shopid/>">\
			    "shopname":<:name tag=json/>,\
		    </r:shop>\
		    <r:pro db="sqlite.aliexpress" size=1 where=" where @.proid=\'<:proid/>\'">\
			    "smtfromid":"<:fromid/>",\
			    "brand":"<:brand/>",\
			    "smttype":"\
				    <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:type/>\'" size=1>\
					    <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>\
						    <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>\
							    <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>\
								    <:name tag=js/>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\
							    </r:type>\
							    <:name tag=js/>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\
						    </r:type>\
						    <:name tag=js/>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\
					    </r:type>\
					    <:name tag=js/>\
				    </r:type>\
			    ",\
		    </r:pro>\
		    <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
			    "des":<:des tag=json/>,\
			    "DHdes":<:DHdes tag=json/>,\
		    </r:prodes>\
		    "id":"<:id/>"\
         }\
        </r:proupdhgate>]'
        str = Tool.strip(str);
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html = "", err = "没有详情，来源数据已删除，点击【修复详情】，可以将【手动审核状态】，调整为【详情已删除】。";
        for (let i = 1; i < arr.length; i++) {
            if (!arr[i].des) {
                arr[i].des = err
                arr[i].DHdes = err
            }
            html += '\
			<tr>\
			<td class="p-0" colspan="4">\
			    <table class="table mb-0 table-bordered table-hover">\
				<tbody>\
			    <tr>\
				    <td class="p-0">\
					    <textarea  id="TempDes'+ arr[i].proid + '" style="display:none">' + arr[i].des.replace(/>/g, "&gt;").replace(/</g, "&lt;") + '</textarea>\
					    <input type="hidden" id="TempDes'+ arr[i].proid + '___Config" value="' + arr[i].proid + '" style="display:none" />\
					    <iframe id="TempDes'+ arr[i].proid + '___Frame" src="/' + o.path + 'admin/fckeditor/editor/fckeditor.html?InstanceName=TempDes' + arr[i].proid + '&amp;Toolbar=rendie" width="100%" height="700" frameborder="0" scrolling="no"></iframe>\
				    </td>\
				    <td class="p-0">\
					    <textarea  id="des'+ arr[i].proid + '" style="display:none">' + arr[i].DHdes.replace(/>/g, "&gt;").replace(/</g, "&lt;") + '</textarea>\
					    <input type="hidden" id="des'+ arr[i].proid + '___Config" value="' + arr[i].proid + '" style="display:none" />\
					    <iframe id="des'+ arr[i].proid + '___Frame" src="/' + o.path + 'admin/fckeditor/editor/fckeditor.html?InstanceName=des' + arr[i].proid + '&amp;Toolbar=rendie" width="100%" height="700" frameborder="0" scrolling="no"></iframe>\
				    </td>\
                </tr>\
			    <tr>\
				    <td class="p-0">\
				    </td>\
				    <td class="p-0">\
				    <div class="btn-group">\
					    <button type="button" class="btn btn-secondary"onclick="fun.c01()">确认保存</button>\
					    <button type="button" class="btn btn-secondary"onclick="fun.c02(11)">详情审核不通过</button>\
					    <button type="button" class="btn btn-secondary"onclick="fun.c02(16)">详情异常</button>\
					    <button type="button" class="btn btn-secondary"onclick="fun.c03(9)">保存 -【图片且详情审核通过】</button>\
				    </div>\
				    </td>\
			    </tr>\
                </tbody>\
				</table>\
				</td>\
			</tr>\
            <tr>\
			<td class="p-0" colspan="4">\
			<table class="table mb-0 table-bordered table-hover">\
				<tbody>\
					<tr>\
						<td class="right w130">编码：</td><td>'+ arr[i].proid + '</td>\
						<td class="right">SMT店铺ID：</td><td><a href="https://www.aliexpress.com/store/'+ arr[i].shopid + '" target="_blank" title="点击查看店铺">' + arr[i].shopid + '</a></td>\
					</tr>\
					<tr>\
						<td class="right">上传后ID：</td>\
						<td><a href="https://www.dhgate.com/product/-/'+ arr[i].dhfromid + '.html" target="_blank">' + arr[i].dhfromid + '</a></td>\
						<td class="right">SMT商品ID：</td><td><a href="https://www.aliexpress.com/item/'+ arr[i].smtfromid + '.html" target="_blank" title="点击查看来源">' + arr[i].smtfromid + '</a></td>\
					</tr>\
					<tr>\
						<td class="right">上传后账户：</td>\
						<td>'+ arr[i].upuser + '</td>\
						<td class="right">分类：</td>\
						<td>'+ arr[i].smttype + '</td>\
					</tr>\
					<tr>\
						<td class="right">上传后状态：</td>\
						<td>'+ this.b01(arr[i].status) + '</td>\
						<td class="right">速卖通品牌：</td>\
						'+ this.b07(arr[i].brand) + '\
					</tr>\
					<tr>\
						<td class="right">手动审核状态：</td>\
						<td></td>\
						<td class="right">SMT店铺名称：</td>\
						<td>'+ arr[i].shopname + '</td>\
					</tr>\
				</tbody>\
				</table>\
				</td>\
			</tr>'
            //'+ this.b02(arr[i].ManualReview) + '
        }
        html += '<tr><td colspan="4">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = Tool.header() + '\
        <div class="p-2">'+ this.b03() + '\
        <table class="table align-top">\
          <thead class="table-light">'+ this.b04() + '</thead>\
          <tbody>'+ html + '</tbody>\
        </table>\
		</div>'
        Tool.html(null, null, html);
    },
    b01: function (status) {
        let t;
        switch (status) {
            case 0: t = "已上架"; break;
            case 1: t = "已下架"; break;
            case 2: t = "待审核"; break;
            case 3: t = "品牌商投诉"; break;
            case 4: t = "其它"; break;
            case 5: t = "审核未通过"; break;
            default: t = "未知:" + status;
        }
        return t;
    },
    b02: function (ManualReview) {
        let arr = Tool.ManualReviewArr, t = "未知:" + ManualReview;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == ManualReview) { t = arr[i][1]; break; }
        }
        return t
    },
    b03: function () {
        return '\
        <div class="input-group w-50 mb-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b09(obj.arr[5]) + '</button>\
          <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c04(1)" value="1">商品编码</li>\
            <li class="dropdown-item pointer" onclick="fun.c04(2)" value="2">敦煌商品ID</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c04(3)" value="3">敦煌卖家账户</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c04(4)" value="4">更新出错原因</a></li>\
          </ul>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c05();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c05();">搜索</button>\
        </div>'
    },
    b04: function () {
        let html = '\
        <tr>\
            <th style="position: relative;" class="w130 right">\
              <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                <li onClick="Tool.open4(\'js17\');"><a class="dropdown-item pointer">把【DHdes字段】调整为水印图片</a></li>\
                </ul>手动审核状态：\
            </th>\
            <th class="p-0"></th>\
            <th class="w130 right">本地商品状态：</th>\
            <th class="p-0"></th>\
        </tr>'
        //'+ this.b05(obj.arr[7]) + '
        //'+ this.b08(obj.arr[8], config.proupdhgate_proStatus_count) + '
        return html;
    },
    b05: function (examine) {
        let nArr = [], arr = Tool.ManualReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == examine ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + config.proupdhgate_ManualReview_count[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c06(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="-_-20">手动审核状态</option>\
          <option value="-1">更新数量</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b06: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.proid='" + Tool.unescape(obj.arr[6]) + "'"); break;//商品编码
                case "2": arr.push("@.fromID=" + Tool.unescape(obj.arr[6])); break;//DH商品ID
                case "3": arr.push("@.upuser='" + Tool.unescape(obj.arr[6]) + "'"); break;//运费模板ID
                case "4": arr.push("@.err like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//运费模板ID
            }
        }
        if (obj.arr[7] != "-_-20") { arr.push("@.ManualReview=" + obj.arr[7]) }
        if (obj.arr[8] != "-_-20") {
            arr.push("@.proStatus=" + obj.arr[8]);
        }
       return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b07: function (brand) {
        if (brand) {
            return '<td class="p-0"> &nbsp; ' + brand + ' <button type="button" class="btn btn-secondary" onclick="Tool.delBrand(\'' + Tool.escape(brand) + '\')">禁限该品牌</button>（禁限原因：该品牌不适合自己生产。）</td>';
        }
        else {
            return "<td>来源商品不存在</td>"
        }
    },
    b08: function (val, configArr) {
        let nArr = [], arr = Tool.proStatusArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c07(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">本地商品状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';;
    },
    b09: function (Field) {
        let t;
        switch (Field) {
            case "1": t = "商品编码"; break;
            case "2": t = "敦煌商品ID"; break;
            case "3": t = "敦煌卖家账户"; break;
            case "4": t = "更新出错原因"; break;
            default: t = "未知:" + Field;
        }
        return t;
    },
    c01: function () {
        let proid = $("input[type='hidden'][id$='___Config']").val(), oEditor = FCKeditorAPI.GetInstance("des" + proid);
        let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes set @.DHdes=' + Tool.rpsql(oEditor.GetXHTML(true)) + ' where @.proid=\'' + proid + '\'</r:>'
        Tool.ajax.a01(str, 1, Tool.reload)
    },
    c02: function (ManualReview) {
        let proid = $("input[type='hidden'][id$='___Config']").val()
        let str = '<r: db="sqlite.aliexpress">update @.proupdhgate set @.ManualReview=' + ManualReview + ' where @.proid=\'' + proid + '\'</r:>'
        Tool.ajax.a01(str, 1, Tool.reload)
    },
    c03: function (ManualReview) {
        let proid = $("input[type='hidden'][id$='___Config']").val(), oEditor = FCKeditorAPI.GetInstance("des" + proid);
        let str = '<r: db="sqlite.aliexpress">update @.proupdhgate set @.ManualReview=' + ManualReview + ' where @.proid=\'' + proid + '\'</r:><r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes set @.DHdes=' + Tool.rpsql(oEditor.GetXHTML(true)) + ' where @.proid=\'' + proid + '\'</r:>'
        Tool.ajax.a01(str, 1, Tool.reload)
    },
    c04: function (val) {
        let name = this.b09("" + val)
        $("#Field").html(name).val(val)
    },
    c05: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (Field == "2" && isNaN(searchword)) {
            alert("【敦煌商品ID】必须是数字。")
        }
        else if (searchword) {
            searchword = Tool.escape(searchword)
            Tool.main(obj.arr[3] + "/1/" + Field + "/" + searchword);
        }
        else { alert("请输入搜索内容"); }
    },
    c06: function (val) {
        if (val == "-1") {
            Tool.open4("js19");
        }
        else {
            Tool.open(7, val);
        }
    },
    c07: function (val) {
        if (val == "-1") {
            Tool.open4("js20");
        }
        else {
            Tool.open(8, val);
        }
    }

}
fun.a01();