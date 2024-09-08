'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile        选择JS文件
        obj.params.site = obj.params.site ? obj.params.site : "tw";//站点
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
        obj.params.field = obj.params.field ? obj.params.field : "1";//搜索字段
        obj.params.searchword = obj.params.searchword ? obj.params.searchword : "";//搜索关键词
        obj.params.fe_status = obj.params.fe_status ? obj.params.fe_status : "";//状态	
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/营销中心/优惠券",
            sql: "select count(1) as total FROM @.table" + this.b11(),
        }, {
            action: "sqlite",
            database: "shopee/营销中心/优惠券",
            sql: "select " + Tool.fieldAs("rule,name,voucher_code,fe_display_coin_amount,value,discount,usage_quantity,fe_status,start_time,end_time,uptime,addtime") + " FROM @.table" + this.b11() + Tool.limit(10, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html1 = "", arr = t[1]
        for (let i = 0; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td class="p-0">'+ this.b03(arr[i].name, arr[i].voucher_code, arr[i].value) + '</td>\
                <td>'+ this.b07(arr[i].name, arr[i].voucher_code) + '</td>\
                <td>'+ (arr[i].rule.items ? arr[i].rule.items.length + ' 个商品' : '全部商品') + '</td>\
                <td>-</td>\
                <td>'+
                (arr[i].discount ? arr[i].discount + '%折扣' : '') +
                (arr[i].fe_display_coin_amount ? 'Shopee币回扣' : '') +
                (arr[i].value ? 'RM' + arr[i].value : '') + '\
                </td>\
                <td>'+ arr[i].usage_quantity + '</td>\
                <td>-</td>\
                <td>'+ this.b08(arr[i].fe_status) + '</td>\
                <td class="p-0">'+ this.b05(arr[i].start_time, arr[i].end_time) + '</td>\
                <td class="p-0">'+ this.b04(arr[i].addtime, arr[i].uptime) + '</td>\
           </tr>'
        }
        let html = Tool.header(obj.params.jsFile, obj.params.site) + '\
        <div class="p-2">\
            <ul class="makeHtmlTab">\
                <li onclick="Tool.main(\'?jsFile=js02&site=tw\')"'+ (obj.params.site == "tw" ? ' class="hover"' : '') + '>台湾虾皮</li>\
                <li onclick="Tool.main(\'?jsFile=js02&site=my\')"'+ (obj.params.site == "my" ? ' class="hover"' : '') + '>马来西亚</li>\
                <li onclick="Tool.main(\'?jsFile=js02&site=br\')"'+ (obj.params.site == "br" ? ' class="hover"' : '') + '>巴西</li>\
            </ul>\
 			'+ this.b09() + '\
           <table class="table align-middle center table-hover">\
  			    <thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html1 + '</tbody>\
            </table>' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        let html = '\
        <tr>\
            <th style="padding-left: 30px;position: relative;">'+ this.b02() + '优惠券活动名称 | 优惠券码</th>\
            <th>优惠券类型</th>\
            <th>适用商品范围</th>\
            <th>目标买家</th>\
            <th>折扣金额</th>\
            <th>可使用总数</th>\
            <th>已使用</th>\
            <th class="p-0">\
                <select onChange="Tool.open(\'fe_status\',this.options[this.selectedIndex].value)" class="form-select">\
                    <option value="-_-20">状态</option>\
                    <option value="1" '+ (obj.params.fe_status == "1" ? 'selected="selected"' : '') + '>接下来的活动</option>\
                    <option value="2" '+ (obj.params.fe_status == "2" ? 'selected="selected"' : '') + '>进行中的活动</option>\
                    <option value="3" '+ (obj.params.fe_status == "3" ? 'selected="selected"' : '') + '>已过期</option>\
                </select>\
            </th>\
            <th class="w160">优惠券领取期间</th>\
            <th class="w160">时间</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js03&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*获取【优惠券】信息</a></li>\
		</ul>'
    },
    b03: function (name, voucher_code, value) {
        return '\
        <table class="table mb-0 left">\
            <tr>\
                <td rowspan="2" class="w70">'+ this.b06(voucher_code, value) + '</td>\
                <td title="优惠券活动名称">'+ name + '</td>\
            </tr>\
            <tr><td title="优惠券码">优惠券码：'+ voucher_code + '</td></tr>\
        </table>'
    },
    b04: function (addtime, uptime) {
        return '\
        <table class="table mb-0">\
            <tr><td title="上传时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(uptime) + '</td></tr>\
        </table>'
    },
    b05: function (start_time, end_time) {
        return '\
        <table class="table mb-0">\
            <tr><td title="优惠券领取开始时间">'+ Tool.js_date_time2(start_time) + '</td></tr>\
            <tr><td title="优惠券领取结束时间">'+ Tool.js_date_time2(end_time) + '</td></tr>\
        </table>'
    },
    b06: function (voucher_code, value) {
        let str = "", val = voucher_code.split("-")[0];
        if (value) {
            str = '<img src="https://deo.shopeesz.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers/image/dollar-colorful.5e618d0.png" width="60">'
        }
        else {
            if (val == "SGAME") {
                str = '<img src="https://deo.shopeesz.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers/image/reward-percent-colorful.4ceae47.png" width="60">'
            }
            else if (val == "LIVE") {
                str = '<img src="https://deo.shopeesz.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers/image/dollar-colorful.5e618d0.png" width="60">'
            }
            else if (val == "SFP") {
                str = '<img src="https://deo.shopeesz.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers/image/percent-colorful.0e15568.png" width="60">'
            }
            else {
                str = '<img src="https://deo.shopeesz.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers/image/percent-colorful.0e15568.png" width="60">'
            }
        }
        return str;
    },
    b07: function (name, voucher_code) {
        let str = ""
        if (name.indexOf("直播优惠券") != -1) {
            str = '直播优惠券'
        }
        else if (name.indexOf("店铺游戏优惠券") != -1) {
            str = '店铺游戏优惠券'
        }
        else if (name.indexOf("店铺优惠券") != -1) {
            str = '店铺优惠券'
        }
        else if (name.indexOf("回购买家优惠券") != -1) {
            str = '回购买家优惠券'
        }
        else if (name.indexOf("商品优惠券") != -1) {
            str = '商品优惠券'
        }
        else if (name.indexOf("非公开优惠券") != -1) {
            str = '非公开优惠券'
        }
        else if (name.indexOf("关注礼优惠券") != -1) {
            str = '关注礼优惠券'
        }
        else if (name.indexOf("新买家优惠券") != -1) {
            str = '新买家优惠券'
        }
        else {
            let val = voucher_code.split("-")[0]
            if (val == "SGAME") {
                str = '店铺游戏优惠券'
            }
            else if (val == "LIVE") {
                str = '直播优惠券'
            }
            else if (val == "SFP") {
                str = '关注礼优惠券'
            }
            else {
                str = "[异常]" + name
            }
        }


        return str;
    },
    b08: function (fe_status) {
        let str
        if (fe_status == 1) {
            str = '\
            <div style="position: relative;top: -8px;left: 0px;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                    <li onclick="Tool.open6(\'js04\',\''+ obj.params.site + '\',' + fe_status + ')"><a class="dropdown-item pointer">*删除</a></li>\
                </ul>\
            </div>\
            <span class="p-1" style="color:#ee4d2d;background-color:#fff1f0;">接下来的活动</span>'
        }
        else if (fe_status == 2) {
            str = '\
            <div style="position: relative;top: -8px;left: 0px;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                    <li onclick="Tool.open6(\'js19\',\''+ obj.params.site + '\',' + fe_status + ')"><a class="dropdown-item pointer">*结束</a></li>\
                </ul>\
            </div>\
            <span class="p-1" style="color: #5c7;background-color:#eaf9ef;">进行中的活动</span>'
        }
        else if (fe_status == 3) {
            str = '<span class="p-1" style="color: #666;background-color:#eee;">已过期</span>'
        }
        else {
            str = "未知：" + fe_status
        }
        return str;
    },
    b09: function () {
        return '\
        <div class="input-group w-50 m-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b10(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)">优惠券活动名称</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)">优惠券码</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(obj.params.searchword) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b10: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "优惠券活动名称"; break;
            case "2": name = "优惠券码"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b11: function () {
        let arr = ["@.site='" + obj.params.site + "'"];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.name like '%" + obj.params.searchword + "%'"); break;//优惠券名
                case "2": arr.push("@.voucher_code='" + obj.params.searchword + "'"); break;//优惠券ID
            }
        }
        if (obj.params.fe_status) { arr.push("@.fe_status=" + obj.params.fe_status); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + " order by @.addtime desc";
    },
    /////////////////////////////////////////////////
    c01: function (val) {
        let name = this.b10("" + val)
        $("#field").html(name).val(val)
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            Tool.main("?jsFile=" + obj.params.jsFile + "&site=" + obj.params.site + "&page=1&field=" + field + "&searchword=" + searchword);
        } else { alert("请输入搜索内容"); }
    },
}
fun.a01();