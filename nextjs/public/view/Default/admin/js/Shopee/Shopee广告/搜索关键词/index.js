'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
        obj.params.site = obj.params.site ? obj.params.site : 'tw'
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        // obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//品质分数
        // obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//搜索量
        // obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//推荐出价
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/Shopee广告/关键词",
            sql: "select count(1) as total FROM @.table" + this.b05(),
        }, {
            action: "sqlite",
            database: "shopee/Shopee广告/关键词",
            sql: "select " + Tool.fieldAs("keyword,cn_keyword,productIdArr,recommended_price,search_volume,relevance,addtime,uptime") + " FROM @.table" + this.b05() + " order by @.uptime desc" + Tool.limit(20, obj.params.page, "sqlite"),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html = "", arr1 = t[1];
        for (let i = 0; i < arr1.length; i++) {
            html += '\
            <tr>\
                <td class="left w200 p-0">'+ this.b07(arr1[i].keyword, arr1[i].cn_keyword) + '</td>\
                <td class="left">'+ arr1[i].productIdArr + '</td>\
                <td>'+ arr1[i].relevance + '</td>\
                <td>'+ arr1[i].search_volume + '</td>\
                <td>'+ (arr1[i].recommended_price * 0.00001).toFixed(2) + '</td>\
                <td class="p-0">'+ this.b03(arr1[i].addtime, arr1[i].uptime) + '</td>\
            </tr>';
        }
        html = Tool.header2(obj.params.jsFile) + '\
		<div class="p-2">\
            <ul class="makeHtmlTab">\
                <li onclick="Tool.main(\'?jsFile='+ obj.params.jsFile + '&site=tw\')"' + (obj.params.site == "tw" ? ' class="hover"' : '') + '>台湾虾皮</li>\
                <li onclick="Tool.main(\'?jsFile='+ obj.params.jsFile + '&site=my\')"' + (obj.params.site == "my" ? ' class="hover"' : '') + '>马来西亚</li>\
                <li onclick="Tool.main(\'?jsFile='+ obj.params.jsFile + '&site=br\')"' + (obj.params.site == "br" ? ' class="hover"' : '') + '>巴西</li>\
            </ul>\
            '+ this.b01() + '\
			<table class="table table-hover center">\
				<thead class="table-light">'+ this.b02() + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table>\
            ' + Tool.page(t[0][0].total, 20, obj.params.page) + '\
		</div>'
        Tool.html(null, null, html)
    },
    ////////////////////////////////////
    b01: function () {
        return '\
        <div class="input-group w-50 my-2">\
            <input type="text" class="form-control" placeholder="请输入关键词" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c01();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c01();">搜索</button>\
        </div>'
    },
    b02: function () {
        let html = '\
        <tr>\
          <th class="left" style="padding-left: 30px;position: relative;">'+ this.b06() + '关键词</th>\
          <th class="left">关联商品ID</th>\
          <th class="p-0 w100"">'+ this.b04('品质分数', 7, 7) + '</th>\
          <th class="p-0 w100">'+ this.b04('搜索量', 8, 8) + '</th>\
          <th class="p-0 w100">'+ this.b04('推荐出价', 9, 9) + '</th>\
          <th class="w160">时间</th>\
        </tr>'
        return html;
    },
    b03: function (addtime, uptime) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="添加时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(uptime) + '</td></tr>\
        </table>'
    },
    b04: function (name, val, i) {
        return '\
        <select onChange="fun.c02('+ i + ',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">'+ name + '</option>\
            <option value="asc" '+ (val == "asc" ? 'selected="selected"' : '') + '>升序</option>\
            <option value="desc" '+ (val == "desc" ? 'selected="selected"' : '') + '>降序</option>\
        </select>'
    },
    b05: function () {
        let arr = [
            "@.site='" + obj.params.site + "'"
        ];
        if (obj.params.searchword) { arr.push("@.keyword like '%" + Tool.unescape(obj.params.searchword) + "%'"); }
        // if (obj.arr[7] != "-_-20") {
        //     if (obj.arr[7] == "asc") {
        //         where = " order by @.relevance asc";
        //     }
        //     else {
        //         where = " order by @.relevance desc";
        //     }
        // }
        // //////////////////////////////////////
        // if (obj.arr[8] != "-_-20") {
        //     if (obj.arr[8] == "asc") {
        //         where = " order by @.search_volume asc";
        //     }
        //     else {
        //         where = " order by @.search_volume desc";
        //     }
        // }
        // /////////////////////////////////
        // if (obj.arr[9] != "-_-20") {
        //     if (obj.arr[9] == "asc") {
        //         where = " order by @.recommended_price asc";
        //     }
        //     else {
        //         where = " order by @.recommended_price desc";
        //     }
        // }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b06: function () {
        return '\
        <button title = "操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.open5(\'js06\',\''+ obj.params.site + '\')"><a class="dropdown-item pointer">*获取【店铺商品】的关键词</a></li>\
            <li onClick="Tool.open5(\'js07\',\''+ obj.params.site + '\')"><a class="dropdown-item pointer">翻译关键词</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js26&table=keyword&database=shopee_bak&newdatabase=shopee/Shopee广告/关键词\');"><a class="dropdown-item pointer">把旧表复制到新表</a></li>\
        </ul>'
    },
    b07: function (keyword, cn_keyword) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="关键词">'+ keyword + '</td></tr>\
            <tr><td title="中文关键词">'+ cn_keyword + '</td></tr>\
        </table>'
    },
    /////////////////////////////////////////
    c01: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            Tool.main(obj.params.jsFile + "/" + obj.params.site + "/1/" + encodeURIComponent(searchword));
        }
        else {
            alert("请输入搜索内容");
        }
    },
    c02: function (I, val) {
        let arr = []
        for (let i = 6; i < 9; i++) {
            if (i == I) {
                arr.push(val)
                break;
            }
            else {
                arr.push("-_-20")
            }
        }
        Tool.main(obj.params.jsFile + "/" + obj.params.site + "/1/" + arr.join("/"))
    },
}
fun.a01();