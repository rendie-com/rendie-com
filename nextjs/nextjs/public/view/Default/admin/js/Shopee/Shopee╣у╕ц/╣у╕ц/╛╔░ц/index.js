'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "my";//站点
        obj.arr[5] = obj.arr[5] ? parseInt(obj.arr[5]) : 1;//翻页
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//广告状态
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//类型
        this.a02()
    },
    a02: function () {
        let str = '[\
        {"count":<@count/>}\
		<r:ads size=10 db="sqlite.shopee" page=2 where="'+ this.b08() + '">,\
		{\
			"start_time":<:start_time/>,\
			"end_time":<:end_time/>,\
			"daily_budget":<:daily_budget/>,\
			"total_budget":<:total_budget/>,\
			"state":<:state tag=json/>,\
			"product_placement":<:product_placement tag=json/>,\
			"trait_list":<:trait_list tag=json/>,\
			"productID":<:productID/>,\
			"report_impression":<:report_impression/>,\
			"report_click":<:report_click/>,\
			"image":<:image tag=json/>,\
			"title":<:title tag=json/>,\
		}\
		</r:ads>]'
        Tool.ajax.a01(str, obj.arr[5], this.a03, this);
    },
    a03: function (t) {
        let tr = [], unit = this.b05(obj.arr[4])
        for (let i = 1; i < t.length; i++) {
            tr.push('\
            <tr>\
                <td><img src="https://s-cf-sg.shopeesz.com/file/'+ t[i].image + '_tn" class="w100"></td>\
                <td class="p-0">'+ this.b02(t[i].productID,t[i].title, t[i].trait_list,t[i].state, t[i].start_time, t[i].end_time) + '</td>\
                <td>'+ this.b03(t[i].product_placement) + '</td>\
                <td>'+ this.b04(unit, t[i].daily_budget, t[i].total_budget) + '</td>\
                <td>'+t[i].report_impression+'</td>\
                <td>'+t[i].report_click+'</td>\
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
        let html = Tool.header2() + '\
        <div class="p-2">\
            <ul class="makeHtmlTab">\
                <li onclick="Tool.main(\'-_-20\/tw\')"'+ (obj.arr[4] == "tw" ? ' class="hover"' : '') + '>台湾虾皮</li>\
                <li onclick="Tool.main(\'-_-20\/my\')"'+ (obj.arr[4] == "my" ? ' class="hover"' : '') + '>马来西亚</li>\
                <li onclick="Tool.main(\'js19\/br\')"'+ (obj.arr[4] == "br" ? ' class="hover"' : '') + '>巴西</li>\
            </ul>\
            <div style="overflow-x:auto;white-space:nowrap;min-height:600px;">\
            '+ this.b07() + '\
            <table class="table align-middle table-hover center">\
            <thead class="table-light">\
                <tr>\
                    <th class="w120 left" style="padding-left: 30px;position: relative;">'+ this.b01() +'首图</th>\
                    <th class="p-0">'+ this.b11("广告状态", obj.arr[7], 7, config[obj.arr[4]].ads_state_count)+ '</th>\
                    <th class="p-0">'+ this.b09("版位", obj.arr[8], 8, config[obj.arr[4]].ads_type_count) + '</th>\
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
            </table>\
            </div>\
            <div class="m-2">' + Tool.page(t[0].count, 10, 5) + '</div>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '\
        <button title = "操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.open5(\'js20\',\''+ obj.arr[4] + '\')"><a class="dropdown-item pointer">*获取【全部广告】信息</a></li>\
            <li onClick="Tool.open5(\'js03\',\''+ obj.arr[4] + '\')"><a class="dropdown-item pointer">*创建搜索广告</a></li>\
            <li onClick="Tool.open5(\'js05\',\''+ obj.arr[4] + '\')"><a class="dropdown-item pointer">*创建关联广告</a></li>\
        </ul>'
    },
    b02: function (productID,title,trait_list, state, start_time, end_time) {
           let str = '\
            <table class="table left align-middle mb-0">\
                <tr>\
                    <td class="right w100">广告状态：</td>\
                    <td>'+ this.b06(state) + '</td>\
                    <td class="right w100">商品ID：</td>\
                    <td><a href="https://seller.shopee.cn/portal/product/' +productID + '" target="_blank">' + productID+ '</a></td>\
                    <td class="right w100">商品状态：</td>\
                    <td>' +this.b10(trait_list)+  '</td>\
                </tr>\
                <tr><td class="right">标题：</td><td colspan="5">'+ title+ '</td></tr>\
                <tr style="border-color: transparent">\
                    <td class="right">时间：</td><td colspan="5">'+ (end_time == 0 ? "不限时" : Tool.js_date_time2(start_time) + ' - ' + Tool.js_date_time2(end_time)) + '</td>\
                </tr>\
            </table>'
        return str;
    },
    b03: function (type) {
        let str = "未知:" + type;
        switch (type) {
            case "all": str = "全部----注：旧版不可能有这个，这是新版才有的。"; break;
            case "search_product": str = "搜索"; break;
            case "targeting": str = "关联"; break;
            case "all": str = "全部"; break;
        }
        str += '\
        <div style="position: relative;top: -28px;left: 0px;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
                <li onClick="Tool.open6(\'js04\',\''+ obj.arr[4] + '\',\'' + type + '\')"><a class="dropdown-item pointer">*修改广告时间</a></li>\
                <li onClick="Tool.open7(\'js11\',\''+ obj.arr[4] + '\',\'' + type + '\',1)"><a class="dropdown-item pointer">*暂停广告</a></li>\
                <li onClick="Tool.open7(\'js11\',\''+ obj.arr[4] + '\',\'' + type + '\',3)"><a class="dropdown-item pointer">*重启广告</a></li>\
            </ul>\
        </div>'
        return str
    },
    b04: function (unit, daily_budget, total_budget) {
        let str = "无限制"
        if (daily_budget) {
            str = unit + (daily_budget*0.00001).toFixed(2) + '<br/><font color="#999">每日预算</font>'
        }
        else if (total_budget) {
            str = unit + (total_budget*0.00001).toFixed(2) + '<br/><font color="#999">总预算</font>'
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
        let str = "未知：" + state
        switch (state) {
            case "paused": str = '<span style="color:#eda500;background:#fff7e0;" class="p-1">暂停中</span>'; break;
            case "ongoing": str = '<span style="color: #5c7;background:#ebf9ef;" class="p-1">进行中</span>'; break;
            case "scheduled": str = '<span style="color: #2673dd;background:#e5eefb;" class="p-1">已预设</span>'; break;
            case "ended":str = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已结束</span>';break;
            case "closed":str = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已关闭</span>';break;
        }
        return str;
    },
    b07: function () {
        return '\
        <div class="input-group w-50 my-2">\
            <input type="text" class="form-control" placeholder="请输入商品ID" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c01();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c01();">搜索</button>\
        </div>'
    },
    b08: function () {
        let arr = ["@.site='" + obj.arr[4] + "'"];
        if (obj.arr[6] != "-_-20") { arr.push("@.productID='" + Tool.unescape(obj.arr[6]) + "'"); }
        if (obj.arr[7] != "-_-20") { arr.push("@.state='" + Tool.unescape(obj.arr[7]) + "'"); }
        if (obj.arr[8] != "-_-20") { arr.push("@.product_placement='" + Tool.unescape(obj.arr[8]) + "'"); }
        let where = " order by @.report_impression desc,@.id desc";
        return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + where;
    },
    b09: function (name, val, i, configArr) {
        return '\
        <select onChange="fun.c03('+ i + ',this.options[this.selectedIndex].value)" class="form-select w150">\
            <option value="-_-20">'+ name + '</option>\
            <option value="-1">更新数量</option>\
            <option value="all" '+ (val == "all" ? 'selected="selected"' : '') + '>全部（' + configArr[0] +'）</option>\
            <option value="search_product" '+ (val == "search_product" ? 'selected="selected"' : '') + '>商品（' + configArr[1] +'）</option>\
            <option value="targeting" '+ (val == "targeting" ? 'selected="selected"' : '') + '>关联（' + configArr[2] +'）</option>\
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
            case "deleted":
                str = '已删除'; break;
            case "item_normal": str = '正常'; break;
            case "item_reviewing": str = '审核中'; break;
        }
        return str;
    },
    b11: function (name, val, i,configArr) {
        let arr = [
            ["scheduled", "已预设"],
            ["ongoing", "进行中"],
            ["paused", "暂停中"],
            ["ended", "已结束"],
            ["deleted", "已删除"],
            ["closed", "已关闭"],
        ], str = "";
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i][0] + '" ' + (val == arr[i][0] ? ' selected="selected"' : '') + '>' + arr[i][1] + '（' + configArr[i] +'）</option>'
        }
        return '\
        <select onChange="fun.c02('+ i + ',this.options[this.selectedIndex].value)" class="form-select" style="min-width: 150px;">\
            <option value="-_-20">'+ name + '</option>\
            <option value="-1">更新数量</option>\
            '+ str +'\
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
    c03: function (I, val) {
        if (val == "-1") {
            Tool.open5("js13", obj.arr[4]);
        }
        else {
            Tool.open(I, val);
        }
    },
}
fun.a01();