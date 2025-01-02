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
        let str = '\
        {\
        "count":<@count/>\
        <r:proupdhgate size=1 db="sqlite.dhgate" page=2 where="'+ this.b04() + '">,\
            "id":<:id/>,\
            "upuser":"<:upuser/>",\
            "proid":"<:proid/>",\
            "shopid":"<:shopid/>",\
            "dhfromid":"<:fromid/>",\
            "err":<:err tag=json/>,\
            "pic":<:pic tag=0/>,\
            <r:shop db="sqlite.aliexpress" size=1 where=" where @.shopid=<:shopid/>">\
                "shopname":<:name tag=json/>,\
            </r:shop>\
            <r:pro db="sqlite.aliexpress" size=1 where=" where @.proid=\'<:proid/>\'">\
                "smtfromid":"<:fromid/>",\
                "brand":"<:brand/>",\
                "smttype":"<r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:type/>\'" size=1><:name tag=0/></r:type>",\
            </r:pro>\
            "prodes":{\
                <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "pic":"<:pic/>",\
                    "DHpic":<:DHpic tag=0/>,\
                    "aeopAeProductSKUs":<:aeopAeProductSKUs tag=0/>,\
                    "DHattrPic":<:DHattrPic tag=0/>,\
                    "des":<:des tag=json/>,\
                    "DHdes":<:DHdes tag=json/>,\
                    "DHdesPic":<:DHdesPic tag=0/>\
                </r:prodes>\
            },\
            "status":<:status/>,\
            "ManualReview":<:ManualReview/>\
        </r:proupdhgate>}'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (oo) {
        let html
        if (oo.count == 0) {
            html = Tool.header() + '\
            <div class="p-2">\
            '+ this.b01() + '\
            <table class="table">\
                <thead class="table-light">'+ this.b02() + '</thead>\
                <tbody><tr><td colspan="4">没有数据</td></tr></tbody>\
            </table>\
            </div>'
            Tool.html(null, null, html);
        }
        else {
            html = Tool.header() + '\
            <div class="p-2">\
                '+ this.b01() + '\
                <table class="table">\
                <thead class="table-light">'+ this.b02() + '</thead>\
                <tbody>\
                    <tr>'+ Tool.proupdhgate_pic.a01(oo.pic) + '</tr>\
                    <tr>'+ Tool.prodes_DHpic.a01(oo.prodes.pic, oo.prodes.DHpic, oo.proid) + '</tr>\
                    <tr>'+ Tool.prodes_DHattrPic.a01(oo.prodes.aeopAeProductSKUs, oo.prodes.DHattrPic, oo.proid) + '</tr>\
                    <tr>'+ Tool.prodes_DHes.a01(oo.prodes.des, oo.prodes.DHdes, oo.prodes.DHdesPic, oo.proid) + '</tr>\
                    <tr>\
                        <td colspan="4">\
                            <div class="btn-group">\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',1)">图片审核通过</button>\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',3)">图片审核不通过</button>\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',4)" title="背景色是白色，抠图就能审核通过">可以抠图处理</button>\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',5)" title="背景色是不是白色，抠图就能审核通过">手动处理图片</button>\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',6)">图片异常</button>\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',12)">肖像侵权</button>\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',13)">外观侵权</button>\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',14)">货不对版</button>\
                                <button type="button" class="btn btn-secondary" onclick="Tool.setManualReview(' + oo.id + ',15)">不准卖</button>\
                            </div>\
                        </td>\
                    </tr>\
                    <tr><td  class="p-0" colspan="4">'+ this.b05(oo) + '</td></tr>\
                    <tr><td colspan="4" class="left">' + Tool.page(oo.count, 1, 4) + '</td></tr>\
                </tbody>\
                </table>\
           </div>'
            Tool.html(this.a04, this, html);
         }
    },
    a04: function () {
        $("#picTab li").click(function () {
            $("#picTab li").removeAttr('class')
            $(this).attr("class", "hover")
            let mode = $(this).attr("val")
            $("div[name$='_pic']").hide()
            $("div[name$='" + mode + "_pic']").show()
        })
        $("#DHpicTab li").click(function () {
            $("#DHpicTab li").removeAttr('class')
            $(this).attr("class", "hover")
            let mode = $(this).attr("val")
            $("div[name$='_DHpic']").hide()
            $("div[name$='" + mode + "_DHpic']").show()
        })
        $("#DHattrPicTab li").click(function () {
            $("#DHattrPicTab li").removeAttr('class')
            $(this).attr("class", "hover")
            let mode = $(this).attr("val")
            $("div[name$='_DHattrPic']").hide()
            $("div[name$='" + mode + "_DHattrPic']").show()
        })
        $("#DHdesPicTab li").click(function () {
            $("#DHdesPicTab li").removeAttr('class')
            $(this).attr("class", "hover")
            let mode = $(this).attr("val")
            $("div[name$='_DHdesPic']").hide()
            $("div[name$='" + mode + "_DHdesPic']").show()
        })
    },
    ////////////////////////////////////////////////////////////
    b01: function () {
        return '\
        <div class="input-group w-50 mb-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b10(obj.arr[5]) + '</button>\
          <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c05(1)" value="1">商品编码</li>\
            <li class="dropdown-item pointer" onclick="fun.c05(2)" value="2">敦煌商品ID</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c05(3)" value="3">敦煌卖家账户</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c05(4)" value="4">更新出错原因</a></li>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b02: function () {
        let html = '\
        <tr>\
            <th style="position: relative;" class="w130 right">\
              <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                <li onClick="Tool.open4(\'js21\');" title="为什么要归类？因为速卖通的产品不合格，被删除了。"><a class="dropdown-item pointer">归类【详情不存在】</a></li>\
                <li onClick="Tool.open4(\'js14\');"><a class="dropdown-item pointer">把速卖通的图片上传到敦煌网</a></li>\
                <li onClick="Tool.open4(\'js16\');" title="什么是【劣质图片】？\n主图+属性图+详情图<8张，这是【劣质图片】。\n注：【DHdesPic】字段必须要有图片才行，否则跳过。"><a class="dropdown-item pointer">归类【劣质图片】</a></li>\
                </ul>手动审核状态：\
            </th>\
            <th class="p-0">'+ this.b03(obj.arr[7]) + '</th>\
            <th class="w130 right">上传前本地状态：</th>\
            <th class="p-0">'+ this.b09(obj.arr[8], config.proupdhgate_BeforeReview_count) + '</th>\
        </tr>'
        return html;
    },
    b03: function (examine) {
        let nArr = [], arr = Tool.ManualReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == examine ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + config.proupdhgate_ManualReview_count[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c04(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="-_-20">手动审核状态</option>\
          <option value="-1">更新数量</option>\
          <option value="-2"' + (-2 == examine ? 'selected="selected"' : '') + '>【9.图片且详情审核通过】且无推广图片</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b04: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.proid='" + Tool.unescape(obj.arr[6]) + "'"); break;//商品编码
                case "2": arr.push("@.fromID=" + Tool.unescape(obj.arr[6])); break;//DH商品ID
                case "3": arr.push("@.upuser='" + Tool.unescape(obj.arr[6]) + "'"); break;//运费模板ID
                case "4": arr.push("@.err like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//运费模板ID
            }
        }
        if (obj.arr[7] != "-_-20") {
            if (obj.arr[7] == "-2") {
                arr.push("@.ManualReview=9");
                arr.push("@.pic is null");
            }
            else {
                arr.push("@.ManualReview=" + obj.arr[7])
            }
        }
        if (obj.arr[8] != "-_-20") {
            arr.push("@.proStatus=" + obj.arr[8]);
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b05: function (oo) {
        return '\
        <table class="table mb-0 table-bordered table-hover">\
	        <tbody>\
		        <tr>\
			        <td class="right w130">编码：</td><td>'+ oo.proid + '</td>\
			        <td class="right">SMT店铺ID：</td><td><a href="https://www.aliexpress.com/store/'+ oo.shopid + '" target="_blank" title="点击查看店铺">' + oo.shopid + '</a></td>\
		        </tr>\
		        <tr>\
			        <td class="right">敦煌商品ID：</td>\
			        <td><a href="https://www.dhgate.com/product/-/'+ oo.dhfromid + '.html" target="_blank">' + oo.dhfromid + '</a></td>\
			        <td class="right">SMT商品ID：</td><td>'+ (oo.smtfromid ? '<a href="https://www.aliexpress.com/item/' + oo.smtfromid + '.html" target="_blank" title="点击查看来源">' + oo.smtfromid + '</a>' : '来源商品不存在') + '</td>\
		        </tr>\
		        <tr>\
			        <td class="right">敦煌卖家账户：</td>\
			        <td>'+ oo.upuser + '</td>\
			        <td class="right">分类：</td>\
			        <td>'+ (oo.smttype ? oo.smttype : '来源商品不存在') + '</td>\
		        </tr>\
		        <tr>\
			        <td class="right">上传后状态：</td>\
			        <td>'+ this.b06(oo.status) + '</td>\
			        <td class="right">速卖通品牌：</td>\
			        '+ this.b07(oo.brand) + '\
		        </tr>\
		        <tr>\
			        <td class="right">手动审核状态：</td>\
			        <td>'+ this.b08(oo.ManualReview) + '</td>\
			        <td class="right">速卖通店铺名称：</td>\
			        <td>'+ (oo.shopname ? oo.shopname : '店铺不存在') + '</td>\
		        </tr>\
		        <tr>\
			        <td class="right">更新出错原因：</td>\
			        <td colspan="3">'+ oo.err + '</td>\
		        </tr>\
	        </tbody>\
	    </table>'
    },
    b06: function (status) {
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
    b07: function (brand) {
        if (brand) {
            return '<td class="p-0"> &nbsp; ' + brand + ' <button type="button" class="btn btn-secondary" onclick="Tool.delBrand(\'' + Tool.escape(brand) + '\')">禁限该品牌</button>（禁限原因：该品牌不适合自己生产。）</td>';
        }
        else {
            return "<td>来源商品不存在</td>"
        }
    },
    b08: function (examine) {
        let arr = Tool.ManualReviewArr, t = "未知:" + examine;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == examine) { t = arr[i][1]; break; }
        }
        return t
    },
    b09: function (val, configArr) {
        let nArr = [], arr = Tool.BeforeReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c03(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">本地商品状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';;
    },
    b10: function (Field) {
        let t;
        switch (Field) {
            case "1": t = "商品编码"; break;
            case "2": t = "敦煌商品ID"; break;
            case "3": t = "敦煌卖家账户"; break;
            case "4": t = "更新出错原因"; break;
            default: t = "未知:" + status;
        }
        return t;
    },

    c02: function () {
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
    c03: function (val) {
        if (val == "-1") {
            Tool.open4("js20");
        }
        else {
            Tool.open(8, val);
        }
    },
    //设置首图
    c04: function (val) {
        if (val == "-1") {
            Tool.open4("js19");
        }
        else {
            Tool.open(7, val);
        }
    },
    c05: function (val) {
        let name = this.b10("" + val)
        $("#Field").html(name).val(val)
    }
}
fun.a01();