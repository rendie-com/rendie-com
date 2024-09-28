'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? Tool.int(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1"//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20"//搜索内容
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20"//禁限方式
        this.a02();
    },
    a02: function () {
        let str = '[\
		{\
      "size":20,\
      "count":<@count/>\
		}\
    <r:restriction db="sqlite.aliexpress" size=20 page=2 where="'+ this.b01() + ' order by @.name desc">,\
		{\
			"id":<:id/>,\
			"mode":<:mode/>,\
			"name":<:name tag=json/>,\
			"des":<:des tag=json/>,\
			"addtime":"<:addtime/>",\
			"time":"<:time/>",\
			"types":"<:type/>"\
		}\
		</r:restriction>]'
        //<if "<:type/>"!=""><r:type where=" where @.fromid=<:type/>" size=1><r:type where=" where @.fromid=<:upid/>" size=1><r:type where=" where @.fromid=<:upid/>" size=1><r:type where=" where @.fromid=<:upid/>" size=1><:name/> &gt; </r:type><:name/> &gt; </r:type><:name/> &gt; </r:type><:name/></r:type></if>
        Tool.ajax.a01(str, obj.arr[4],this.a03,  this)
    },
    a03: function (arr) {
        let html = ""
        for (let i = 1; i < arr.length; i++) {

            html += '\
      <tr>\
        <td class="w30" style="padding-left: 30px;position: relative;">\
          <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ arr[i].id + '"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu" aria-labelledby="dropdown'+ arr[i].id + '">\
            <li><a class="dropdown-item pointer" onclick="Tool.open6(\'js08\','+ arr[i].mode + ',' + arr[i].id + ')">禁限</a></li>\
            <li><a class="dropdown-item pointer" onclick="fun.c10('+ arr[i].id + ')">修改</a></li>\
            <li><a class="dropdown-item pointer" onclick="fun.c25('+ arr[i].id + ')">删除</a></li>\
          </ul>\
        </td>\
        <td>'+ this.b05(arr[i].mode) + '</td>\
        <td>' + arr[i].name + '</td>\
        <td class="left">'+ arr[i].des + '</td>\
        <td>'+ arr[i].types + '</td>\
        <td class="p-0">'+ this.b06(arr[i].addtime, arr[i].time) + '</td>\
			</tr>'
        }
        html += '<tr><td colspan="6" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = Tool.header(obj.arr[3]) + '\
        <div class="input-group w-50 m-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b03(obj.arr[5]) + '</button>\
          <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c04(1)" value="1">名称/店铺ID</li>\
            <li class="dropdown-item pointer" onclick="fun.c04(2)" value="2">说明</li>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[6] == "-_-20" ? "" : Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>\
        <div class="p-2">\
          <table class="table table-hover center">\
            <thead class="table-light">'+ this.b02(arr[0]) + '</thead>\
            <tbody>'+ html + '</tbody>\
          </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        let arr = []
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.name like '%" + Tool.sql01(Tool.unescape(obj.arr[6])) + "%'"); break;//名称
                case "2": arr.push("@.des like '%" + Tool.sql01(Tool.unescape(obj.arr[6])) + "%'"); break;//说明
            }
        }
        if (obj.arr[7] != "-_-20") {
            arr.push("@.mode=" + obj.arr[7])
        }
        //下面这一行去重复要用。
        //arr.push('@.name in (select @.name from @.restriction where @.mode=' + obj.arr[7] +' group by @.name having count(1) &gt;= 2)');
        return (arr[0] ? " where " + arr.join(" and ") : "")
    },
    b02: function (oo) {
        return '\
    <tr>\
      <th style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
          <li><a class="dropdown-item pointer" onclick="fun.c23()">添加</a></li>\
        </ul>\
      </th>\
      <th class="p-0 w120">\
				<select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
					<option value="-_-20">禁限分组</option>\
					<option value="1" '+ (obj.arr[7] == "1" ? 'selected="selected"' : '') + '>类目</option>\
					<option value="2" '+ (obj.arr[7] == "2" ? 'selected="selected"' : '') + '>关键词</option>\
					<option value="3" '+ (obj.arr[7] == "3" ? 'selected="selected"' : '') + '>店铺ID</option>\
					<option value="4" '+ (obj.arr[7] == "4" ? 'selected="selected"' : '') + '>品牌</option>\
					<option value="5" '+ (obj.arr[7] == "5" ? 'selected="selected"' : '') + '>禁售产品</option>\
					<option value="6" '+ (obj.arr[7] == "6" ? 'selected="selected"' : '') + '>其它</option>\
				</select>\
			</th>\
      <th class="w120">名称/店铺ID</th>\
      <th class="left">说明</th>\
      <th nowrap>类目</th>\
      <th class="w170">时间</th>\
    </tr>'
    },
    b03: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "名称/店铺ID"; break;
            case "2": name = "说明"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b04: function () {

    },
    b05: function (mode) {
        let str = "";
        switch (mode) {
            case 1: str = '类目'; break;
            case 2: str = '关键词'; break;
            case 3: str = '店铺ID'; break;
            case 4: str = '品牌<hr/><a href="javascript:;" onclick="Tool.open5(\'js08\',' + mode + ')" title="结果在【速卖通_采集箱_商品_状态_疑似侵权】和【速卖通_采集箱_商品_状态_禁卖品牌】中展示。\n注：【禁卖品牌】高于【疑似侵权】。">禁限该组</a>'; break;
            case 5: str = '禁售产品<hr/><a href="javascript:;" onclick="Tool.open5(\'js08\',' + mode + ')" title="结果在【速卖通_采集箱_商品_状态_疑似侵权】和【速卖通_采集箱_商品_状态_禁卖品牌】中展示。\n注：【禁卖品牌】高于【疑似侵权】。">禁限该组</a>'; break;
            case 6: str = '其它'; break;
            default: str = "未知：" + mode;
        }
        return str + '';
    },
    b06: function (addtime, time) {
        return '\
    <table class="table mb-0 table-bordered">\
      <tr><td title="添加时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
      <tr><td title="更新时间">' + Tool.js_date_time2(time) + '</td></tr>\
    </table>'
    },
    c01: function () {
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = Tool.escape(searchword)
            Tool.main(obj.arr[3] + "/1/" + Field + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function () {

    },
    c04: function (val) {
        let name = this.b03("" + val)
        $("#Field").html(name).val(val)
    },
    c23: function () {
        if (confirm("是否【确定】添加?")) {
           Tool.ajax.a01( "<r: db=\"sqlite.aliexpress\">insert into @.restriction(:addtime)values((now))</r:>",1,this.c24,this);
        }
    },
    ///////////////////////////////////
    c24: function (txt) {
        if (txt == "") { window.location.reload(); } else { alert("操作失败：" + txt); }
    },
    c25: function (id) {
        if (confirm("是否【确定】则删除。")) {
           Tool.ajax.a01( "<r: db=\"sqlite.aliexpress\">delete from @.restriction where @.id=" + id + "</r:>",1,this.c24,this);
        }
    },
    c44: function (This, id, L, V) {
        let val = This.val(), html = "<r: db=\"sqlite.aliexpress\">update @.restriction set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            This.val("加载加...");Tool.ajax.a01( 1, val,this.c45, html, this, [This, L]);
        }
    },
    c45: function (t, oo) {
        if (t == "") {
            oo[0].attr("disabled", false); oo[0].val(oo[1]);
        }
        else { alert("出错：" + t); }
    },
}
fun.a01();