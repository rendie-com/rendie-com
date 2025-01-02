'use strict';
var fun =
{
    obj: {
        DEFAULT_DB: "",
        size: 20
    },
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
        obj.params.site = obj.params.site ? obj.params.site : 'tw'
        obj.params.field = obj.params.field ? obj.params.field : '1'
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        this.a03(["sqlite"])
    },
    // a02: function () {
    //     let data = [{
    //         action: "process",
    //         fun: "env",
    //         name: "NEXTJS_CONFIG_DEFAULT_DB"
    //     }]
    //     Tool.ajax.a01(data, this.a03, this);
    // },
    a03: function (t) {
        this.obj.DEFAULT_DB = t[0];
        let sessionObj = {}
        let str = sessionStorage.getItem(window.location.pathname + obj.params.jsFile)
        if (str) sessionObj = JSON.parse(str)
        Tool.ajax.a01(this.b07(t[0], sessionObj[obj.params.page]), this.a04, this, sessionObj);
    },
    a04: function (t, sessionObj) {
        let html1 = "", arr = Tool.getArr(t[0], this.obj.DEFAULT_DB);
        for (let i = 0; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td>'+ arr[i].itemid + '</td>\
                <td>'+ arr[i].shopid + '</td>\
                <td class="nowrap">'+ arr[i].shop_location + '</td>\
                <td>'+ this.b04(arr[i].image) + '</td>\
                <td class="left"><a href="https://' + (obj.params.site == "tw" ? "xiapi" : obj.params.site) + '.xiapibuy.com/product/' + arr[i].shopid + '/' + arr[i].itemid + '/" target="_blank">' + arr[i].title + '</a></td>\
                <td>'+ arr[i].price + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
            </tr>'
        }
        let html = Tool.header2(obj.params.jsFile, obj.params.site) + '\
    	<div class="p-2">\
    		'+ Tool.header3(obj.params.jsFile, obj.params.site) + this.b06() + '\
    		<table class="table align-middle table-hover center">\
    			<thead class="table-light">'+ this.b01() + '</thead>\
    			<tbody>'+ html1 + '</tbody>\
    		</table>\
            ' + Tool.page2(sessionObj, t[0].LastEvaluatedKey, t[1], this.obj.DEFAULT_DB, this.obj.size, obj.params.page, obj.params.jsFile) + '\
    	</div>'
        Tool.html(null, null, html)
    },
    //////////////////////////////////////////////
    b01: function () {
        let html = '\
        <tr>\
          <th style="padding-left:25px;position: relative;" class="w120">'+ this.b02() + '商品ID</th>\
          <th class="w120">店铺ID</th>\
          <th class="w120">店铺位置</th>\
          <th>图片</th>\
          <th class="left">标题</th>\
          <th class="w120">价格</th>\
          <th class="w170">创建时间</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js01&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">采集商品</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js10&table=pro_'+ obj.params.site + '&database=shopee_gather&newdatabase=shopee/采集箱/商品/' + obj.params.site + '\');"><a class="dropdown-item pointer">把一个db文件拆分成多个db文件</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js11&table=table&database=shopee/采集箱/商品/'+ obj.params.site + '&toaction=dynamodb\');"><a class="dropdown-item pointer">*把【sqlite】数据库该表同步到【DynamoDB】数据库</a></li>\
		</ul>'
    },
    b03: function () {
        let arr = [];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.itemid='" + obj.params.searchword + "'"); break;//商品编码
                case "2": arr.push("@.shopid=" + obj.params.searchword); break;//DH商品ID
                case "3": arr.push("@.shop_location like '%" + obj.params.searchword + "%'"); break;//店铺位置
                case "4": arr.push("@.name like '%" + obj.params.searchword + "%'"); break;//标题
            }
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b04: function (pic) {
        let html = "\
        <a href=\"https://s-cf-sg.shopeesz.com/file/" + pic + "\" target=\"_blank\">\
            <img src=\"https://s-cf-sg.shopeesz.com/file/"+ pic + "_tn\" class=\"img-fluid rounded w100\">\
        </a>"
        return html;
    },
    b05: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品ID"; break;
            case "2": name = "店铺ID"; break;
            case "3": name = "店铺位置"; break;
            case "4": name = "标题"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b06: function () {
        return '\
        <div class="input-group w-50 m-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b05(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)">商品ID</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)">店铺ID</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)">店铺位置</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(4)">标题</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b07: function (DEFAULT_DB, ExclusiveStartKey) {
        if (DEFAULT_DB == "dynamodb") {
            return this.b08(this.obj.size, DEFAULT_DB, ExclusiveStartKey)
        }
        else {
            return this.b09(this.obj.size, DEFAULT_DB)
        }
    },
    b08: function (size, DEFAULT_DB, ExclusiveStartKey) {
        let TableName = Tool.getChinaAscii('shopee_采集箱_商品_' + obj.params.site + '_table')
        let params = {
            ProjectionExpression: 'itemid,shopid,title,image,shop_location,currency,price,addtime', // 只获取这些字段
            Limit: size, // 每页项目数上限
            TableName: TableName,
        }
        if (ExclusiveStartKey && obj.params.page != 1) {//翻页
            params.ExclusiveStartKey = ExclusiveStartKey;
        }
        let data = [{
            action: DEFAULT_DB,
            fun: "scan",
            params: params,
        }]
        /////////////////////////////////////////////
        if (obj.params.page == 1) {
            data.push({
                action: DEFAULT_DB,
                fun: "scan",
                params: {
                    TableName: TableName,
                    Select: 'COUNT' // 请求只返回项目总数
                }
            })
        }
        return data;
    },
    b09: function (size, DEFAULT_DB) {
        let data = [{
            action: DEFAULT_DB,
            database: "shopee/采集箱/商品/" + obj.params.site,
            sql: "select " + Tool.fieldAs("itemid,shopid,title,image,shop_location,currency,price,addtime") + " FROM @.table" + this.b03() + Tool.limit(size, obj.params.page, DEFAULT_DB),
        }, {
            action: DEFAULT_DB,
            database: "shopee/采集箱/商品/" + obj.params.site,
            sql: "select count(1) as Count FROM @.table" + this.b03(),
        }]
        return data
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

// let data = [{
//     action: "fs",
//     fun: "access_sqlite",
//     database: "shopee/采集箱/商品/" + obj.params.site,
//     mode: 0,
//     elselist: [{
//         action: "fs",
//         fun: "download_sqlite",
//         urlArr: ["https://github.com/rendie-com/rendie-com/releases/download/1/shopee_gather_product_" + obj.params.site + ".db", "https://github.com/rendie-com/rendie-com/releases/download/2/shopee_gather_product_" + obj.params.site + ".db"],
//         database: "shopee/采集箱/商品/" + obj.params.site
//     }]
// }]