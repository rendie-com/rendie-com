'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
        obj.params.site = obj.params.site ? obj.params.site : 'tw'//站点
        obj.params.field = obj.params.field ? obj.params.field : '1'//搜索字段
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "fs",
            fun: "access_sqlite",
            database: "shopee/采集箱/店铺/" + obj.params.site,
            mode: 0,
            elselist: [{
                action: "fs",
                fun: "download_sqlite",
                urlArr: ["https://github.com/rendie-com/rendie-com/releases/download/1/shopee_gather_shop_" + obj.params.site + ".db","https://github.com/rendie-com/rendie-com/releases/download/2/shopee_gather_shop_" + obj.params.site + ".db"],
                database: "shopee/采集箱/店铺/" + obj.params.site
            }]
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/店铺/" + obj.params.site,
            sql: "select count(1) as total FROM @.table" + this.b03(),
        }, {
            action: "sqlite",
            database: "shopee/采集箱/店铺/" + obj.params.site,
            sql: "select " + Tool.fieldAs("shopname,follower_count,get_follower_time,following_count,is_official_shop,last_login_time,nickname,portrait,products,response_rate,response_time,shop_rating,shopee_verified_flag,show_official_shop_label,show_shopee_verified_label,userid,shopid,username,is_in_fss,ps_plus,rating_good,rating_normal,rating_bad,is_shopee_choice,shop_location") + " FROM @.table" + this.b03() + " order by @.get_follower_time desc" + Tool.limit(10, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a04, this);
    },
    a04: function (t) {
        let html1 = "", arr = t[1]
        for (let i = 0; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td>'+ arr[i].userid + '</td>\
                <td>'+ arr[i].shopid + '</td>\
                <td>'+ arr[i].shop_location + '</td>\
                <td>'+ this.b04(arr[i].portrait) + '</td>\
                <td class="left">\
                    <b>'+ arr[i].shopname + '</b><br/>\
                    ' + arr[i].username + '\
                    <div style="color:#999"><font color=red>' + arr[i].follower_count + '</font> 粉丝 &nbsp; | &nbsp; <font color=red>' + arr[i].following_count + '</font> 关注中</div>\
                </td>\
                <td>'+ arr[i].products + '</td>\
                <td>'+ arr[i].shop_rating + '</td>\
                <td>'+ arr[i].response_rate + '%</td>\
                <td>'+ arr[i].response_time + '</td>\
                <td>'+ arr[i].rating_good + '</td>\
                <td>'+ arr[i].rating_normal + '</td>\
                <td>'+ arr[i].rating_bad + '</td>\
                <td class="p-0">'+ this.b07(arr[i].last_login_time, arr[i].get_follower_time) + '</td>\
            </tr>'
        }
        let html = Tool.header2(obj.params.jsFile, obj.params.site) + '\
		<div class="p-2">\
			'+ Tool.header3(obj.params.jsFile, obj.params.site) +
            this.b06() + '\
			<table class="table align-middle table-hover center">\
				<thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html1 + '</tbody>\
			</table> ' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
		</div>'
        Tool.html(null, null, html)
    },
    //////////////////////////////////////////////
    b01: function () {
        let html = '\
        <tr>\
          <th style="padding-left:25px;position: relative;">'+ this.b02() + '用户ID</th>\
          <th>店铺ID</th>\
          <th>店铺位置</th>\
          <th>头像</th>\
          <th class="left">基本信息</th>\
          <th>商品数量</th>\
          <th>评分</th>\
          <th>聊天回应率</th>\
          <th>聊天回应时间</th>\
          <th>好评数量</th>\
          <th>中评数量</th>\
          <th>差评数量</th>\
          <th class="w170">时间</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js03&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">采集店铺</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js04&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">从商品中获取店铺ID</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js10&table=users_'+ obj.params.site + '&database=shopee_gather&newdatabase=shopee/采集箱/店铺/' + obj.params.site + '\');"><a class="dropdown-item pointer">把一个db文件拆分成多个db文件</a></li>\
		</ul>'
    },
    b03: function () {
        let arr = [];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.userid=" + obj.params.searchword); break;//用户ID
                case "2": arr.push("@.shopid=" + obj.params.searchword); break;//店铺ID
                case "3": arr.push("@.shopname like '%" + obj.params.searchword + "%'"); break;//店铺名称
                case "4": arr.push("@.username like '%" + obj.params.searchword + "%'"); break;//用户名
            }
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b04: function (pic) {
        let html = "\
        <a href=\"https://s-cf-sg.shopeesz.com/file/" + pic + "\" target=\"_blank\">\
            <img src=\"https://s-cf-sg.shopeesz.com/file/"+ pic + "_tn\" class=\"img-fluid w60\" style=\"border-radius:50%;\">\
        </a>"
        return html;
    },
    b05: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "用户ID"; break;
            case "2": name = "店铺ID"; break;
            case "3": name = "店铺名称"; break;
            case "4": name = "用户名"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b06: function () {
        return '\
        <div class="input-group w-50 m-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b05(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)">用户ID</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)">店铺ID</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)">店铺名称</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(4)">用户名</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b07: function (last_login_time, get_follower_time) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="最后登陆时间">'+ Tool.js_date_time2(last_login_time) + '</td></tr>\
            <tr><td title="获取粉丝时间">'+ Tool.js_date_time2(get_follower_time) + '</td></tr>\
        </table>'
    },
    c01: function (val) {
        let name = this.b05("" + val)
        $("#field").html(name).val(val)
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if ((field == "1" || field == "2") && isNaN(searchword)) {
            alert("【商品ID】或【商品ID】必须是数字。")
        }
        else if (searchword) {
            Tool.main("?jsFile=" + obj.params.jsFile + "&site=" + obj.params.site + "&page=1&field=" + field + "&searchword=" + searchword);
        } else { alert("请输入搜索内容"); }
    },
}
fun.a01();