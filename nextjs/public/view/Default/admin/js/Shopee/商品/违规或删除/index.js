'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
        obj.params.field = obj.params.field ? obj.params.field : '1'//搜索字段
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        //obj.params.site               站点
        //obj.params.status             商品状态
        //obj.params.penalty_type       违规类型
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/商品/违规或删除",
            sql: "select count(1) as total FROM @.table" + this.b08(),
        }, {
            action: "sqlite",
            database: "shopee/商品/违规或删除",
            sql: "select " + Tool.fieldAs("site,productid,proid,status,penalty_type,pic,name,myexperience,description,explanation,banned_time,uptime,addtime") + " FROM @.table" + this.b08() + " order by @.id desc" + Tool.limit(10, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html1 = "", arr = t[1];
        for (let i = 0; i < arr.length; i++) {
            arr[i].myexperience = arr[i].myexperience ? arr[i].myexperience : ""
            html1 += '\
            <tr>\
                <td>'+ this.b03(arr[i].pic) + '</td>\
                <td class="left p-0">'+ this.b09(arr[i].productid, arr[i].proid, arr[i].name, arr[i].description, arr[i].explanation) + '</td>\
                <td class="p-0">'+ this.b04(arr[i].addtime, arr[i].uptime, arr[i].banned_time, arr[i].myexperience, arr[i].productid) + '</td>\
                <td class="center">'+ this.b10(arr[i].site) + '</td>\
                <td>'+ this.b05(arr[i].status) + '</td>\
                <td style="padding-left:25px;position:relative;">'+ this.b11(arr[i].penalty_type) + '</td>\
           </tr>'
        }
        let html = Tool.header2(obj.params.jsFile) + '\
		<div class="p-2">\
            <div class="m-3">注：这里的商品，不会随着商品的删除而删除。主要目的是禁限商品用的。</div>\
			'+ this.b06() + '\
			<table class="table align-top table-hover">\
				<thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html1 + '</tbody>\
			</table>' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
		</div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        let html = '\
        <tr>\
          <th style="padding-left: 30px;position: relative;" class="w220 left" colspan="2">'+ this.b02() + '商品信息</th>\
          <th class="w200 center">时间 / 我的心得</th>\
          <th class="w130 p-0">'+ this.b13(obj.params.site, "site") + '</th>\
          <th class="w130 p-0">'+ this.b12(obj.params.status, "status",config.bannedPro_status_count) + '</th>\
          <th class="w200 p-0">'+ this.b14(obj.params.penalty_type, "penalty_type", config.bannedPro_penalty_type_count) + '</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js20\');"><a class="dropdown-item pointer">获取【违规或删除】信息</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js38\');"><a class="dropdown-item pointer">获取【搜索排名降低】的商品</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js63&table=bannedPro&database=shopee_bak&newdatabase=shopee/商品/违规或删除\');"><a class="dropdown-item pointer">把旧表复制到新表</a></li>\
		</ul>'
    },
    b03: function (pic) {
        let html = "\
            <a href=\"https://s-cf-sg.shopeesz.com/file/" + pic + "\" target=\"_blank\">\
                <img src=\"https://s-cf-sg.shopeesz.com/file/"+ pic + "_tn\" class=\"img-fluid rounded\">\
            </a>"
        return html;
    },
    b04: function (addtime, uptime, banned_time, myexperience, productid) {
        return '\
        <table class="table mb-0 center border">\
            <tr><td title="添加时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(uptime) + '</td></tr>\
            <tr><td title="违规时间">'+ Tool.js_date_time2(banned_time) + '</td></tr>\
            <tr><td title="我的心得" class="p-0"><textarea class="form-control" rows="2" onblur="fun.c03($(this),\'myexperience\',' + productid + ')">' + myexperience + '</textarea></td></tr>\
        </table>'
    },
    b05: function (status) {
        let name = "未知：" + status
        switch (status) {
            case 1: name = "上架商品"; break;
            case 3: name = "已禁卖"; break;
            case 4: name = "Shopee删除"; break;
            case 6: name = "审查中"; break;
            case 8: name = "未上架"; break;
        }
        return name
    },
    b06: function () {
        return '\
        <div class="input-group w-50 m-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b07(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)">商品ID</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)">商品名称</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)">违规原因</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(4)">我的心得</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(5)">商品编码</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b07: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品ID"; break;
            case "2": name = "商品名称"; break;
            case "3": name = "违规原因"; break;
            case "4": name = "我的心得"; break;
            case "5": name = "商品编码"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b08: function () {
        let arr = [];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.productid=" + obj.params.searchword); break;//商品编码
                case "2": arr.push("@.name like '%" + obj.params.searchword + "%'"); break;//商品名称
                case "3": arr.push("@.description like '%" + obj.params.searchword + "%'"); break;//违规原因
                case "4": arr.push("@.myexperience like '%" + obj.params.searchword + "%'"); break;//我的心得
                case "5": arr.push("@.proid='" + obj.params.searchword + "'"); break;//商品编码
            }
        }
        if (obj.params.site) { arr.push("@.site='" + obj.params.site + "'"); }//站点
        if (obj.params.status) { arr.push("@.status=" + obj.params.status); }//商品状态
        if (obj.params.penalty_type) { arr.push("@.penalty_type=" + obj.params.penalty_type); }//商品状态
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b09: function (productid, proid, name, description, explanation) {
        return '\
        <table class="table mb-0 border">\
            <tr><td class="right w100">商品ID：</td><td class="p-0">' + this.b15(productid, proid) + '</td></tr>\
            <tr><td class="right">商品名称：</td><td><a href="https://seller.shopee.cn/portal/product/'+ productid + '" target="_blank">' + name + '</a></td></tr>\
            <tr><td class="right">违规原因：</td><td>' + description + '</td></tr>\
            <tr><td class="right">建议：</td><td>' + explanation + '</td></tr>\
        </table>'
    },
    b10: function (val) {
        let name = "未知：" + val
        switch (val) {
            case "my": name = "马来西亚"; break;
            case "br": name = "巴西"; break;
        }
        return name
    },
    b11: function (val) {
        let name = ""
        let str1 = '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="fun.c07('+ val + ');"><a class="dropdown-item pointer">*删除</a></li>\
		</ul>'
        switch (val) {
            case 1: name = "违禁商品"; break;
            case 2: name = "仿冒品或侵犯知识产权商品"; break;
            case 3: name = "劣质刊登"; break;
            case 4: name = "不适当的照片"; break;
            case 5: name = str1 + "资料不足"; break;
            case 6: name = "改善商城商品"; break;
            case 7: name =  str1 +"其他上架规范"; break;
            default: name = "未知：" + val
        }
        return name
    },
    b12: function (val, name,configArr) {
        let nArr = [], arr = Tool.shopPro_statusArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + arr[i][0] + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + arr[i][0] + '.' + arr[i][1] + '('+configArr[i]+')</option>');
        }
        return '\
        <select onChange="fun.c05(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
          <option value="">状态</option>\
          <option value="-1">更新数量</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b13: function (val, name) {
        return '\
        <select onChange="Tool.open(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">来源站点</option>\
            <option value="tw" '+ (val == "tw" ? 'selected="selected"' : '') + '>台湾虾皮</option>\
            <option value="my" '+ (val == "my" ? 'selected="selected"' : '') + '>马来西亚</option>\
            <option value="br" '+ (val == "br" ? 'selected="selected"' : '') + '>巴西</option>\
        </select>'
    },
    b14: function (val, name, bannedPro_penalty_type_count) {
        let nArr = [], arr = Tool.penalty_type;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + bannedPro_penalty_type_count[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c06(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
			<option value="">违规类型</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
		</select>'
    },
    b15: function (productid, proid) {
        return '\
        <table class="table mb-0">\
            <tr>\
            <td class="w150">'+ productid + '</td>\
            <td class="right w150">商品编码：</td>\
            <td class="p-0"><input type="text" class="form-control w200" value="'+ proid + '" onblur="fun.c03($(this),\'proid\',' + productid + ')" disabled></td>\
            </tr>\
        </table>'
    },
    /////////////////////////////////////////////////
    c01: function (val) {
        let name = this.b07("" + val)
        $("#field").html(name).val(val)
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if (field == "1" && isNaN(searchword)) {
            alert("【商品ID】必须是数字。")
        }
        else if (searchword) {
            Tool.main("?jsFile=" + obj.params.jsFile + "&page=1&field=" + field + "&searchword=" + searchword);

        } else { alert("请输入搜索内容"); }
    },
    c03: function (This, name, productid) {
        This.attr("disabled", true);
        let data = [{
            action: "sqlite",
            database: "shopee/商品/违规或删除",
            sql: 'update @.table set @.' + name + '=' + Tool.rpsql(This.val()) + ' where @.productid=' + productid,
        }]
        Tool.ajax.a01(data, this.c04, this, This);
    },
    c04: function (t, This) {
        if (t[0].length == 0) {
            This.attr("disabled", false);
        }
        else {
            Tool.pre(["更新出错", t]);
        }
    },
    c05: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js21");
        }
        else {
            Tool.open(name, val);
        }
    },
    c06: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js36");
        }
        else {
            Tool.open(name, val);
        }
    },
    c07: function (penalty_type) {
        let data = [{
            action: "sqlite",
            database: "shopee/商品/违规或删除",
            sql: "delete from @.table where @.penalty_type=" + penalty_type,
        }]
        Tool.ajax.a01(data, Tool.reload);
    },
}
fun.a01();