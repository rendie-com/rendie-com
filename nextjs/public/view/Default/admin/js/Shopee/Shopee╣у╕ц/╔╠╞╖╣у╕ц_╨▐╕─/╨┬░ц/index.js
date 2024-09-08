'use strict';
var fun =
{
    temp_keywords: [],//保存时要用
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "tw";//站点
        obj.arr[5] = obj.arr[5] ? parseInt(obj.arr[5]) : 1;//翻页
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//请选择【广告状态】
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//请选择【版位】
        obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//请选择【修改状态】
        obj.arr[10] = obj.arr[10] ? obj.arr[10] : "-_-20";//请选择【新增关键词时间】
        this.a02()
    },
    a02: function () {
        let str = '{\
        "count":<@count/>\
		<r:ads size=1 db="sqlite.shopee" page=2 where="'+ this.b08() + '">,\
			"id":<:id/>,\
			"start_time":<:start_time/>,\
			"end_time":<:end_time/>,\
			"editStatus":<:editStatus/>,\
			"key_uptime":<:key_uptime/>,\
			"daily_budget":<:daily_budget/>,\
			"total_budget":<:total_budget/>,\
			"state":<:state tag=json/>,\
			<r:shopPro_'+ obj.arr[4] + ' size=1 db="sqlite.shopee" where=" where @.fromid=<:productID/>">\
			   "proid":<:proid tag=json/>,\
               <r:GlobalPro size=1 db="sqlite.shopee" where=" where @.proid=\'<:proid/>\'">\
                   "ManualReview_1688_fromid":<:ManualReview_1688_fromid/>,\
			       "'+ obj.arr[4] + '_ads_key":<:' + obj.arr[4] + '_ads_key tag=json/>,\
                   "name":<:ManualReview_1688_subject tag=json/>,\
                    <r:proList size=1 db="sqlite.1688" where=" where @.fromid=<:ManualReview_1688_fromid/>">\
                        <r:category0 size=1 db="sqlite.1688" where=" where @.fromID=<:categoryId/>">\
                            "catNamePath":<:catNamePath tag=json/>,\
                        </r:category0>\
                    </r:proList>\
                </r:GlobalPro>\
			</r:shopPro_'+ obj.arr[4] + '>\
            "productID":<:productID/>,\
            "image":<:image tag=json/>,\
            "title":<:title tag=json/>,\
			"trait_list":<:trait_list tag=json/>,\
			"keywords":<:keywords tag=0/>,\
		</r:ads>}'
        Tool.ajax.a01(str, obj.arr[5], this.a03, this);
    },
    a03: function (oo) {
        if (oo.keywords) {
            this.temp_keywords = oo.keywords;//保存时要用
            ////////////////////////////////////
            let nArr = []
            for (let i = 0; i < oo.keywords.length; i++) {
                nArr.push(Tool.rpsql(oo.keywords[i].keyword.keyword))
            }
            let str = '[0\
            <r:keyword size="' + nArr.length + '" db="sqlite.shopee" where=" where @.keyword in(' + nArr.join(",") + ') and @.site=\'' + obj.arr[4] + '\'">,\
            {\
                "keyword":<:keyword tag=json/>,\
                "cn_keyword":<:cn_keyword tag=json/>,\
                "recommended_price":<:recommended_price/>,\
                "search_volume":<:search_volume/>,\
                "relevance":<:relevance/>,\
            }\
            </r:keyword>]'
            Tool.ajax.a01(str, 1, this.a04, this, oo);
        }
        else {
            this.a04([], oo)
        }
    },
    a04: function (keyword, oo) {
        let html = Tool.header2() + '\
        <div class="p-2">\
            <ul class="makeHtmlTab">\
                <li onclick="Tool.main(\'js08\/tw\')"' + (obj.arr[4] == "tw" ? ' class="hover"' : '') + '>台湾虾皮</li>\
                <li onclick="Tool.main(\'js08\/my\')"' + (obj.arr[4] == "my" ? ' class="hover"' : '') + '>马来西亚</li>\
                <li onclick="Tool.main(\'js21\/br\')"' + (obj.arr[4] == "br" ? ' class="hover"' : '') + '>巴西</li>\
            </ul>\
            '+ this.b07() + '\
            <table class="table align-middle table-bordered">\
                <thead class="table-light"><tr><th colspan="7" class="p-0">'+ this.b15() + '</th></tr></thead>\
                <tbody>'+ this.b02(oo, keyword) + '</tbody>\
            </table>\
            ' + Tool.page(oo.count, 1, 5) + '\
        </div>'
        Tool.html(this.a05, this, html);
    },
    a05: function (t) {
        $('.easyzoom').easyZoom();
    },
    b01: function (arr, unit, keyword, id, key, proid) {
        for (let i = 0; i < arr.length; i++) {
            let keyObj = this.b13(arr[i].keyword.keyword, keyword)
            arr[i].cn_keyword = keyObj.cn_keyword;
            arr[i].relevance = keyObj.relevance ? keyObj.relevance : 0;
            arr[i].search_volume = keyObj.search_volume ? keyObj.search_volume : 0;
            arr[i].self_title_keyword = arr[i].self_title_keyword ? 1 : 0;
            arr[i].recommended_price = keyObj.recommended_price;
        }
        arr.sort(function (A, B) {
            if (B.self_title_keyword) {
                return B.self_title_keyword - A.self_title_keyword
            }
            else {
                return B.search_volume - A.search_volume
            }
        })
        return this.b14(arr, unit, id, key, proid)
    },
    b02: function (oo, keyword) {
        let str = "", unit = this.b05(obj.arr[4])
        if (oo.count != 0) {
            str = '<tr>\
                <td rowspan="4" class="p-0 w200">\
                <div class="easyzoom easyzoom--overlay">\
                    <a href=\"https://s-cf-sg.shopeesz.com/file/' + oo.image + '\" target="_blank">\
                        <img src="https://s-cf-sg.shopeesz.com/file/'+ oo.image + '_tn"  class="figure-img img-fluid mb-0 rounded w200">\
                    </a>\
                </div>\
                </td>\
                <td class="right">主推关键词：</td>\
                <td>'+ this.b17(oo[obj.arr[4] + "_ads_key"], keyword) + '</td>\
                <td class="right">标题：</td>\
                <td>'+ oo.title + (oo.name ? '<br/><div style=color:#999;">' + oo.name + '</div>' : '') + '</td>\
                <td class="right">每日预算：</td>\
                <td>'+ this.b04(unit, oo.daily_budget, oo.total_budget, oo.id) + '</td>\
            </tr>\
            <tr>\
                <td class="right">广告状态：</td>\
                <td>'+ this.b06(oo.state) + '</td>\
                <td class="right">1688类目路径：</td>\
                <td>'+ (oo.catNamePath ? oo.catNamePath : '') + '</td>\
                <td class="right">广告时间：</td>\
                <td>'+ (oo.end_time == 0 ? "不限时" : Tool.js_date_time2(oo.start_time) + ' - ' + Tool.js_date_time2(oo.end_time)) + '</td>\
            </tr>\
            <tr>\
                <td class="right">商品ID：</td>\
                <td><a href="https://seller.shopee.cn/portal/product/' + oo.productID + '" target="_blank">' + oo.productID + '</a></td>\
                <td class="right">1688详情ID：</td>\
                <td>'+ (oo.ManualReview_1688_fromid ? '<a href="https://detail.1688.com/offer/' + oo.ManualReview_1688_fromid + '.html" target="_blank">' + oo.ManualReview_1688_fromid + '</a>' : '') + '</td>\
                <td class="right">新增关键词时间：</td>\
                <td>'+ Tool.js_date_time2(oo.key_uptime) + '</td>\
            </tr>\
            <tr>\
                <td class="right">商品状态：</td>\
                <td>' + this.b10(oo.trait_list) + '</td>\
                <td class="right">修改状态：</td>\
                <td>'+ this.b20(oo.editStatus, oo.id) + '</td>\
                <td class="right">商品编码：</td>\
                <td>'+ (oo.proid ? oo.proid : "") + '</td>\
            </tr>\
            <tr>\
                <td colspan="7" class="p-0">\
                    <table class="table center table-hover mb-0">\
                        <thead class="table-light">\
                            <tr>\
                            <th class="w70">编号</th>\
                            <th class="w70">状态</th>\
                            <th class="left">关键词（中文）</th>\
                            <th>标题词</th>\
                            <th>品质分数</th>\
                            <th>搜索量</th>\
                            <th>匹配类型</th>\
                            <th>当前单次点击出价</th>\
                            <th title="只在新增关键词时有内容，当再次获取广告信息时消失。">新增关键词时间</th>\
                            <th>平均排名</th>\
                            </tr>\
                        </thead>\
                        <tbody>'+ this.b01(oo.keywords, unit, keyword, oo.id, oo[obj.arr[4] + "_ads_key"],  oo.proid) + '</tbody>\
                    </table>\
                </td>\
            </tr>'
        }
        return str;
    },
    b04: function (unit, daily_budget, total_budget, id) {
        let str = "无限制"
        if (daily_budget) {
            str = '\
            <div class="input-group">\
              <span class="input-group-text">'+ unit + '</span>\
              <input type="text" class="form-control" value="'+ (daily_budget * 0.00001).toFixed(2) + '" onblur="fun.c04($(this),' + id + ',\'daily_budget\',\'' + (daily_budget * 0.00001).toFixed(2) + '\')"/>\
            </div>'
        }
        else if (total_budget) {
            str = unit + total_budget.toFixed(2) + '<font color="#999">（总预算）</font>'
        }
        return str;
    },
    b05: function (site) {
        let unit = "未开发"
        switch (site) {
            case "tw": unit = "NT$"; break;
            case "my": unit = "RM"; break;
            case "br": unit = "R$"; break;
        }
        return unit;
    },
    b06: function (state) {
        let str = "未知：" + state
        switch (state) {
            case "paused": str = '<span style="color:#eda500;background:#fff7e0;" class="p-1">暂停中</span>'; break;
            case "ongoing": str = '<span style="color: #5c7;background:#ebf9ef;" class="p-1">进行中</span>'; break;
            case "scheduled": str = '<span style="color: #2673dd;background:#e5eefb;" class="p-1">已预设</span>'; break;
            case "ended": str = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已结束</span>'; break;
            case "closed": str = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已关闭</span>'; break;
            case "deleted": str = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已删除</span>'; break;
            case "self_abnormal": str = '<span class="p-1">异常</span>'; break;
        }
        return str;
    },
    //搜索
    b07: function () {
        return '\
        <div class="input-group w-50 my-2">\
            <input type="text" class="form-control" placeholder="请输入商品ID" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c01();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c01();">搜索</button>\
        </div>'
    },
    b08: function () {
        let arr = [
            "@.site='" + obj.arr[4] + "'",
        ];
        if (obj.arr[6] != "-_-20") { arr.push("@.productID=" + obj.arr[6]); }
        if (obj.arr[7] != "-_-20") { arr.push("@.state='" + obj.arr[7] + "'"); }
        if (obj.arr[8] != "-_-20") { arr.push("@.product_placement='" + obj.arr[8] + "'"); }
        if (obj.arr[9] != "-_-20") { arr.push("@.editStatus=" + obj.arr[9]); }
        if (obj.arr[10] != "-_-20") {
            let time = Tool.gettime("") - 60 * 60 * 24 * Tool.int(obj.arr[10])
            arr.push("@.key_uptime&gt;" + time);
        }
        let where = " order by @.report_impression desc";
        return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + where;
    },
    b10: function (state) {
        let str = "未知：" + state
        switch (state) {
            case undefined:
            case "normal":
                str = '正常'; break;
            case "item_unlisted": str = '未上架'; break;
            case "item_deleted": str = '已删除'; break;
            case "item_normal": str = '正常'; break;
            case "item_reviewing": str = '审核中'; break;
        }
        return str;
    },
    b11: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.open5(\'js15\',\''+ obj.arr[4] + '\');"><a class="dropdown-item pointer">*增加新的关键词</a></li>\
            <li onClick="Tool.open5(\'js10\',\''+ obj.arr[4] + '\');"><a class="dropdown-item pointer">*停用所有关键词</a></li>\
            <li onClick="Tool.open5(\'js17\',\''+ obj.arr[4] + '\');"><a class="dropdown-item pointer">*把修改好的搜索广告同步有Shopee平台</a></li>\
            <li onClick="Tool.open5(\'js18\',\''+ obj.arr[4] + '\');"><a class="dropdown-item pointer">*修改广告的版位为【全部】</a></li>\
        </ul>'
    },
    b12: function (match_type) {
        let str = "未知：" + match_type
        switch (match_type) {
            case "broad": str = '广泛匹配'; break;
            case "exact": str = '精准匹配'; break;
        }
        return str;
    },
    b13: function (key, arr) {
        let nArr = []
        for (let i = 1; i < arr.length; i++) {
            if (key == arr[i].keyword) {
                nArr = arr[i];
                break;
            }
        }
        return nArr;
    },
    b14: function (arr, unit, id, key, proid) {
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            /*
            {
              "keyword": {
                "bid_price": 7000,
                "keyword": "rantai",
                "match_type": "broad",
                "recommended_price": 22000,
                "state": "active"
              },
              "cn_keyword": "链",
              "relevance": 10,
              "search_volume": 52969,
              "recommended_price": 22000
            }
            */
            str += '\
            <tr '+ (key == arr[i].keyword.keyword ? 'style="font-weight:bold;"' : '') + '>\
                <td>'+ (i + 1) + '</td>\
                <td><div class="form-switch"><input type="checkbox" class="form-check-input" '+ (arr[i].keyword.state == "active" ? 'checked="checked"' : '') + ' onclick="fun.c08($(this),\'' + arr[i].keyword.keyword + '\',' + id + ')"></div></td>\
                <td class="left"><span style="padding-left:5px;position:relative;top:-8px;left:-20px;">'+ this.b16(arr[i].keyword.keyword, proid) + '</span>' + arr[i].keyword.keyword + (arr[i].cn_keyword ? "（" + arr[i].cn_keyword + "）" : '') + '</td>\
                <td>'+ (arr[i].self_title_keyword == 1 ? '是' : '<font color="#999">否</font>') + '</td>\
                <td>'+ (arr[i].relevance ? arr[i].relevance : '-') + '</td>\
                <td>'+ (arr[i].search_volume ? arr[i].search_volume : '-') + '</td>\
                <td>'+ this.b12(arr[i].keyword.match_type) + '</td>\
                <td class="p-0 w200">\
                    <div class="input-group">\
                      <span class="input-group-text">'+ unit + '</span>\
                      <input type="text" disabled class="form-control" value="'+ (arr[i].keyword.bid_price * 0.00001).toFixed(2) + '"/>\
                      '+ (arr[i].recommended_price ? '<span class="input-group-text" title="推荐出价">' + (arr[i].keyword.recommended_price * 0.00001).toFixed(2) + '</span>' : '') + '\
                    </div>\
                </td>\
                <td>' + (arr[i].self_addtime ? Tool.js_date_time2(arr[i].self_addtime, "-") : '') + '</td>\
                <td>-</td>\
            </tr>'
        }
        return str;
    },
    b15: function () {
        return '\
        <table class="table mb-0">\
        <tr>\
            <td style="padding-left:15px;position: relative;top:8px" class="w20">'+ this.b11() + '</td>\
            <td>'+ this.b18(obj.arr[7], 7, config[obj.arr[4]].ads_state_count) + '</td>\
            <td>'+ this.b22(obj.arr[8], 8, config[obj.arr[4]].ads_type_count) + '</td>\
            <td>'+ this.b19(obj.arr[9], 9, config[obj.arr[4]].ads_keyword_editStatus_count) + '</td>\
            <td>'+ this.b21(obj.arr[10], 10, config[obj.arr[4]].ads_keyword_key_uptime_count) + '</td>\
        <tr>\
        </table>';
    },
    b16: function (key, proid) {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="fun.c11(\''+ key + '\',\'' + proid + '\')"><a class="dropdown-item pointer">设置为【主推关键词】</a></li>\
        </ul>'
    },
    b17: function (key, arr) {
        let str = key;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].keyword == key) {
                str += '<br/><div style=color:#999;">' + arr[i].cn_keyword + '</div>'
                break;
            }
        }
        return str ? str : '';
    },
    b18: function (val, I, configArr) {
        let arr = Tool.ads_stateArr, str = "";
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i][0] + '" ' + (val == arr[i][0] ? ' selected="selected"' : '') + '>' + arr[i][1] + '（' + configArr[i] + '）</option>'
        }
        return '\
        <select onchange="fun.c02(' + I + ',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择【广告状态】</option>\
            <option value="-1">更新数量</option>\
            '+ str + '\
        </select>'
    },
    b19: function (val, I, configArr) {
        let arr = [
            [0, "未修改"],
            [1, "第一次修改"],
            [2, "第二次修改"],
            [3, "无关键词"],
            [4, "1688类目错误"],
            [5, "已删除"],
       ], str = "";
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i][0] + '" ' + (val == arr[i][0] ? ' selected="selected"' : '') + '>' + arr[i][1] + '（' + configArr[i] + '）</option>'
        }
        return '\
        <select onchange="fun.c06(' + I + ',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择【修改状态】</option>\
            <option value="-1">更新数量</option>\
            '+ str + '\
        </select>'
    },
    b20: function (editStatus, id) {
        let arr = [
            [0, "未修改"],
            [1, "第一次修改"],
            [2, "第二次修改"],
            [3, "无关键词"],
            [4, "1688类目错误"],
            [5, "已删除"],
        ], str = ""
        for (let i = 0; i < arr.length; i++) {
            str += '\
            <div class="form-check form-check-inline">\
                <input onclick="fun.c03(\'editStatus\','+ i + ',' + id + ')" class="form-check-input" type="radio" name="editStatus" id="editStatus' + i + '" ' + (editStatus == arr[i][0] ? 'disabled checked' : '') + '>\
                <label class="form-check-label" for="editStatus'+ i + '">' + arr[i][1] + '</label>\
            </div>'
        }
        return str
    },
    b21: function (val, I, configArr) {
        let arr = [
            [1, "最近一天内"],
            [2, "最近二天内"],
            [3, "最近三天内"],
        ], str = "";
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i][0] + '" ' + (val == arr[i][0] ? ' selected="selected"' : '') + '>' + arr[i][1] + '（' + configArr[i] + '）</option>'
        }
        return '\
        <select onchange="fun.c07(' + I + ',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择【新增关键词时间】</option>\
            <option value="-1">更新数量</option>\
            '+ str + '\
        </select>'
    },
    b22: function (val, I, configArr) {
        let arr = Tool.ads_product_placementArr, str = "";
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i][0] + '" ' + (val == arr[i][0] ? ' selected="selected"' : '') + '>' + arr[i][1] + '（' + configArr[i] + '）</option>'
        }
        return '\
        <select onchange="fun.c10(' + I + ',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择【版位】</option>\
            <option value="-1">更新数量</option>\
            '+ str + '\
        </select>'
    },
    //////////////////////////////
    c01: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            Tool.main(obj.arr[3] + "/" + obj.arr[4] + "/1/" + encodeURIComponent(searchword));
        }
        else {
            alert("请输入搜索内容");
        }
    },
    c02: function (I, val) {
        if (val == "-1") {
            Tool.open5("js12", obj.arr[4]);
        }
        else {
            Tool.open(I, val);
        }
    },
    c03: function (L, val, id) {
        let html = "\"ok\"<r: db=\"sqlite.shopee\">update @.ads set @." + L + "=" + val + " where @.id=" + id + "</r:>"
        Tool.ajax.a01(html, 1, Tool.reload);
    },
    c04: function (This, id, L, V) {
        let val = This.val(), html = "\"ok\"<r: db=\"sqlite.shopee\">update @.ads set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
        if (val != "" + V && !This.attr("disabled")) {
            This.attr("disabled", true);
            Tool.ajax.a01(html, 1, this.c05, this, [This, val]);
        }
    },
    c05: function (t, arr) {
        if (t == "ok") {
            arr[0].attr("disabled", false);
            arr[0].val(arr[1]);
        }
        else { alert("出错：" + t); }
    },
    c06: function (I, val) {
        if (val == "-1") {
            Tool.open5("js14", obj.arr[4]);
        }
        else {
            Tool.open(I, val);
        }
    },
    c07: function (I, val) {
        if (val == "-1") {
            Tool.open5("js16", obj.arr[4]);
        }
        else {
            Tool.open(I, val);
        }
    },
    c08: function (This, keyword, id) {
        This.attr("disabled", true);
        let arr = this.temp_keywords
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].keyword.keyword == keyword) {
                arr[i].keyword.state = This.prop("checked") ? "active" : "deleted";
            }
        }
        let html = "\"ok\"<r: db=\"sqlite.shopee\">update @.ads set @.keywords=" + Tool.rpsql(JSON.stringify(arr)) + " where @.id=" + id + "</r:>"
        Tool.ajax.a01(html, 1, this.c09, this, This);
    },
    c09: function (t, This) {
        if (t == "ok") {
            This.attr("disabled", false);
        }
        else {
            Tool.pre(["出错：", t]);
        }
    },
    c10: function (I, val) {
        if (val == "-1") {
            Tool.open5("js13", obj.arr[4]);
        }
        else {
            Tool.open(I, val);
        }
    },
    c11: function (val, proid) {
        let html = "\"ok\"<r: db=\"sqlite.shopee\">update @.GlobalPro set @." + obj.arr[4] + "_ads_key='" + val + "' where @.proid='" + proid + "'</r:>"
        Tool.ajax.a01(html, 1, Tool.reload);
    },
}
fun.a01();