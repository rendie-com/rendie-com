'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
        obj.params.site = obj.params.site ? obj.params.site : 'tw'
        obj.params.field = obj.params.field ? obj.params.field : '1'
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词


        //obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//广告状态
        //obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//版位
        this.a02()
    },
    a02: function () {
        //where="'+ this.b08() + '"
        // where @.site=\''+ obj.params.site + '\' and not(@.state=\'deleted\' or @.state=\'closed\') GROUP BY @.productID HAVING COUNT(1) &gt;1//查重复用的
        let data = [{
            action: "sqlite",
            database: "shopee/Shopee广告/广告",
            sql: "select count(1) as total FROM @.table where @.site='"+obj.params.site+"'",
        }, {
            action: "sqlite",
            database: "shopee/Shopee广告/广告",
            sql: "select "+Tool.fieldAs("fromid,start_time,end_time,daily_budget,total_budget,state,product_placement,trait_list,productID,report_impression,report_click,image,title")+" FROM @.table where @.site='"+obj.params.site+"' order by @.report_impression desc"+ Tool.limit(10, obj.params.page, "sqlite"),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (arr) {
        let t = arr[1];
        let tr = [], unit = this.b05(obj.params.site)
        for (let i = 0; i < t.length; i++) {
            tr.push('\
            <tr>\
                <td><img src="https://s-cf-sg.shopeesz.com/file/'+ t[i].image+ '_tn" class="w100"></td>\
                <td class="p-0">'+ this.b02(t[i].productID, t[i].title, t[i].trait_list, t[i].state, t[i].start_time, t[i].end_time, t[i].fromid) + '</td>\
                <td>'+ this.b03(t[i].product_placement) + '</td>\
                <td>'+ this.b04(unit, t[i].daily_budget, t[i].total_budget) + '</td>\
                <td>'+ t[i].report_impression+ '</td>\
                <td>'+ t[i].report_click + '</td>\
                <td>--</td>\
                <td>---</td>\
                <td>--</td>\
                <td>---</td>\
                <td>--</td>\
                <td>---</td>\
                <td>--</td>\
                <td>---</td>\
                <td>--</td>\
                <td>---</td>\
                <td>--</td>\
                <td>---</td>\
                <td>--</td>\
                <td>---</td>\
                <td>--</td>\
                <td>---</td>\
            </tr>')
        }
        let html = Tool.header2(obj.params.jsFile) + '\
        <div class="p-2">\
            <ul class="makeHtmlTab">\
                <li onclick="Tool.main(\'?jsFile='+obj.params.jsFile+'&site=tw\')"'+ (obj.params.site == "tw" ? ' class="hover"' : '') + '>台湾虾皮</li>\
                <li onclick="Tool.main(\'?jsFile='+obj.params.jsFile+'&site=my\')"'+ (obj.params.site == "my" ? ' class="hover"' : '') + '>马来西亚</li>\
                <li onclick="Tool.main(\'?jsFile=js19&site=br\')"'+ (obj.params.site == "br" ? ' class="hover"' : '') + '>巴西</li>\
            </ul>\
            <div style="overflow-x:auto;white-space:nowrap;min-height:600px;">\
            '+ this.b07() + '\
            <table class="table align-middle table-hover center">\
            <thead class="table-light">\
                <tr>\
                    <th class="w120 left" style="padding-left: 30px;position: relative;">'+ this.b01() + '首图</th>\
                    <th class="p-0">'+ this.b11("广告状态", 0, 8, config[obj.params.site].ads_state_count) + '</th>\
                    <th class="p-0">'+ this.b09("版位", 0, 9, config[obj.params.site].ads_type_count) + '</th>\
                    <th>预算</th>\
                    <th>浏览数</th>\
                    <th>点击数</th>\
                    <th>点击率</th>\
                    <th>花费</th>\
                    <th>销售金额</th>\
                    <th>转化</th>\
                    <th>商品已出售</th>\
                    <th>投资产出比</th>\
                    <th>成本收入对比</th>\
                    <th>转化率</th>\
                    <th>每一转化的成本</th>\
                    <th>直接转化</th>\
                    <th>直接已售商品</th>\
                    <th>直接销售金额</th>\
                    <th>直接投资产出比</th>\
                    <th>直接成本收入对比</th>\
                    <th>直接转化率</th>\
                    <th>Cost per Direct Conversion</th>\
                </tr>\
            </thead>\
            <tbody>'+ tr.join("") + '</tbody>\
            </table>' + Tool.page(arr[0][0].total, 10, obj.params.page) + '\
            </div>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '\
        <button title = "操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js01&site='+ obj.params.site + '\')"><a class="dropdown-item pointer">*获取【全部广告】信息</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js23&site='+ obj.params.site + '\')"><a class="dropdown-item pointer">*创建商品广告</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js25&site='+ obj.params.site + '\')"><a class="dropdown-item pointer">*删除重复商品广告</a></li>\
        </ul>'
    },
    b02: function (productID, title, trait_list, state, start_time, end_time, fromid) {
        let str = '\
            <table class="table left align-middle mb-0">\
                <tr>\
                    <td class="right w100">广告ID：</td>\
                    <td>' + fromid + '</td>\
                    <td class="right w100">广告状态：</td>\
                    <td style="position: relative;">'+ this.b06(state) + '</td>\
                    <td class="right">时间：</td>\
                    <td>'+ (end_time == 0 ? "不限时" : Tool.js_date_time2(start_time) + ' - ' + Tool.js_date_time2(end_time)) + '</td>\
                </tr>\
                <tr><td class="right">标题：</td><td colspan="5">'+ title + '</td></tr>\
                <tr style="border-color: transparent">\
                    <td class="right w100">商品ID：</td>\
                    <td><a href="https://seller.shopee.cn/portal/product/' + productID + '" target="_blank">' + productID + '</a></td>\
                    <td class="right w100">商品状态：</td>\
                    <td colspan="3">' + this.b10(trait_list) + '</td>\
                </tr>\
            </table>'
        return str;
    },
    b03: function (type) {
        let str = "未知:" + type;
        switch (type) {
            case "search_product": str = "搜索"; break;
            case "targeting": str = "关联"; break;
            case "all": str = "全部"; break;
        }
        return str;
    },
    b04: function (unit, daily_budget, total_budget) {
        let str = "无限制"
        if (daily_budget) {
            str = unit + (daily_budget * 0.00001).toFixed(2) + '<br/><font color="#999">每日预算</font>'
        }
        else if (total_budget) {
            str = unit + (total_budget * 0.00001).toFixed(2) + '<br/><font color="#999">总预算</font>'
        }
        return str;
    },
    b05: function (site) {
        let unit = "未开发"
        switch (site) {
            case "my": unit = "RM"; break;
            case "br": unit = "R$"; break;
        }
        return unit;
    },
    b06: function (state) {
        let txt = "未知：" + state
        let str1 = '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" style="left: -12px;"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.open7(\'js24\',\''+ obj.params.site + '\',\'' + state + '\',1)"><a class="dropdown-item pointer">*立即开始</a></li>\
        </ul>'
        let str2 = '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" style="left: -12px;"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.open7(\'js24\',\''+ obj.params.site + '\',\'' + state + '\',2)"><a class="dropdown-item pointer">*暂停</a></li>\
        </ul>'
        let str3 = '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" style="left: -12px;"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.open7(\'js24\',\''+ obj.params.site + '\',\'' + state + '\',3)"><a class="dropdown-item pointer">*重启</a></li>\
        </ul>'
        let str4 = '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" style="left: -12px;"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.open7(\'js24\',\''+ obj.params.site + '\',\'' + state + '\',4)"><a class="dropdown-item pointer">*删除</a></li>\
        </ul>'
        switch (state) {
            case "paused": txt = str3 + '<span style="color:#eda500;background:#fff7e0;" class="p-1">暂停中</span>'; break;
            case "ongoing": txt = str2 + '<span style="color: #5c7;background:#ebf9ef;" class="p-1">进行中</span>'; break;
            case "scheduled": txt = str1 + '<span style="color: #2673dd;background:#e5eefb;" class="p-1">已预设</span>'; break;
            case "ended": txt = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已结束</span>'; break;
            case "closed": txt = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已关闭</span>'; break;
            case "deleted": txt = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已删除</span>'; break;
            case "self_abnormal": txt = str4 + '<span class="p-1">异常</span>'; break;
            case "self_NoStandard": txt = '<span class="p-1">重启不达标</span>'; break;
        }
        return txt;
    },
    b07: function () {
        return '\
        <div class="input-group w-50 my-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.params.field + '">' + this.b12(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">广告ID</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">商品ID</a></li>\
            </ul>\
            <input type="text" class="form-control"id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b08: function () {
        let arr = ["@.site='" + obj.params.site + "'"];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.fromid='" + obj.params.searchword + "'"); break;//广告ID
                case "2": arr.push("@.productID=" + obj.params.searchword); break;//商品ID
            }
        }
        //if (obj.arr[8] != "-_-20") { arr.push("@.state='" + Tool.unescape(obj.arr[8]) + "'"); }
        //if (obj.arr[9] != "-_-20") { arr.push("@.product_placement='" + Tool.unescape(obj.arr[9]) + "'"); }
        let where = " order by @.report_impression desc";
        return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + where;
    },
    b09: function (name, val, i, configArr) {
        let arr = Tool.ads_product_placementArr, str = "";
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i][0] + '" ' + (val == arr[i][0] ? ' selected="selected"' : '') + '>' + arr[i][1] + '（' + configArr[i] + '）</option>'
        }
        return '\
        <select onChange="fun.c03('+ i + ',this.options[this.selectedIndex].value)" class="form-select w150">\
            <option value="-_-20">'+ name + '</option>\
            <option value="-1">更新数量</option>\
            '+ str + '\
        </select>'
    },
    b10: function (state) {
        let str = "未知：" + state
        switch (state) {
            case undefined:
            case "normal":
                str = '正常'; break;
            case "item_unlisted": str = '未上架'; break;
            case "item_deleted":
            case "deleted_campaign":
                str = '已删除'; break;
            case "item_normal": str = '正常'; break;
            case "item_reviewing": str = '审核中'; break;
        }
        return str;
    },
    b11: function (name, val, i, configArr) {
        let arr = Tool.ads_stateArr, str = "";
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i][0] + '" ' + (val == arr[i][0] ? ' selected="selected"' : '') + '>' + arr[i][1] + '（' + configArr[i] + '）</option>'
        }
        return '\
        <select onChange="fun.c04('+ i + ',this.options[this.selectedIndex].value)" class="form-select" style="min-width: 150px;">\
            <option value="-_-20">'+ name + '</option>\
            <option value="-1">更新数量</option>\
            '+ str + '\
        </select>'
    },
    b12: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "广告ID"; break;
            case "2": name = "商品ID"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    //////////////////////////////
    c01: function (val) {
        let name = this.b12("" + val)
        $("#Field").html(name).val(val)
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (Field == "2" && isNaN(searchword)) {
            alert("【商品ID】必须是数字。")
        }
        else if (searchword) {
            //searchword = encodeURIComponent(searchword)
            //Tool.main(obj.arr[3] + "/" + obj.params.site + "/1/" + Field + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (I, val) {
        if (val == "-1") {
            Tool.openR("js13", obj.params.site);
        }
        else {
            Tool.open(I, val);
        }
    },
    c04: function (I, val) {
        if (val == "-1") {
            Tool.openR("js12", obj.params.site);
        }
        else {
            Tool.open(I, val);
        }
    },
}
fun.a01();