'use strict';
var fun =
{
    obj: {
        PicA: [],//复制要用
        proid: ""//保存要用
    },
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
            <r:proupdhgate size=1 db="sqlite.dhgate" page=2 where="'+ this.b12() + '">\
                "id":<:id/>,\
                "upuser":"<:upuser/>",\
                "proid":"<:proid/>",\
                "smtshopid":<:shopid/>,\
                "dhfromid":<:fromid/>,\
                "err":<:err tag=json/>,\
                "ManualReview":<:ManualReview/>,\
                <r:pro db="sqlite.aliexpress" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "smtfromid":"<:fromid/>",\
                    "brand":"<:brand/>",\
                    "smttype":"<r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:type/>\'" size=1><:name tag=0/></r:type>",\
                </r:pro>\
                <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "aeopAeProductSKUs":<:aeopAeProductSKUs tag=0/>,\
                    "DHattrPic":<:DHattrPic tag=0/>,\
                </r:prodes>\
            </r:proupdhgate>\
            "count":<@count/>\
        }'
                //"proStatus":<:proStatus/>,\
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (oo) {
        this.obj.proid = oo.proid;
        this.obj.DHattrPic = oo.DHattrPic;
        let html = Tool.header() + '\
        <div class="p-2">\
            '+ this.b01() + '\
            <table class="table">\
                <thead class="table-light">'+ this.b02() + '</thead>\
                <tbody>\
                    '+ this.b05(oo) + '\
                    <tr>\
                        <td colspan="4" class="left p-0">\
                            <ul class="makeHtmlTab" id="makeHtmlTab">\
                                <li class="hover" val="1000">1.【aeopAeProductSKUs】购物车图片</li>\
                                <li val="0100">2.【DHattrPic.picA】来源图片</li>\
                                <li val="0010">3.【DHattrPic.picB】无水印图片</li>\
                                <li val="0001">4.【DHattrPic.picC】有水印图片</li>\
                            </ul>\
                            <div name="1000_body">' + this.b09(oo.aeopAeProductSKUs) + '</div>\
                            <div class="hide" name="0100_body">' + this.b08(oo.DHattrPic, "picA") + '</div>\
                            <div class="hide" name="0010_body">' + this.b08(oo.DHattrPic, "picB") + '</div>\
                            <div class="hide" name="0001_body">' + this.b08(oo.DHattrPic, "picC") + '</div>\
                        </td>\
                    </tr>\
                    <tr>\
                    <td colspan="4">手动审核状态：\
                        <div class="btn-group">\
					    <button type="button" class="btn btn-secondary" onclick="fun.c07(' + oo.id + ',17)">设置【属性图片未上传】</button>\
					    <button type="button" class="btn btn-secondary" onclick="fun.c07(' + oo.id + ',3)">设置【图片审核不通过】</button>\
					    <button type="button" class="btn btn-secondary" onclick="fun.c07(' + oo.id + ',12)">肖像侵权</button>\
				        </div>\
                    </td>\
                    </tr>\
                    <tr><td colspan="4" class="left">' + Tool.page(oo.count, 1, 4) + '</td></tr>\
                </tbody>\
            </table>\
		</div>'
        Tool.html(this.a04, this, html);
    },
    a04: function () {
        $("#makeHtmlTab li").click(function () {
            $("#makeHtmlTab li").removeAttr('class')
            $(this).attr("class", "hover")
            let mode = $(this).attr("val")
            $("div[name$='_body']").hide()
            $("div[name$='" + mode + "_body']").show()
        })
    },
    b01: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b15(obj.arr[5]) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c11(1)" value="1">商品编码</li>\
                <li class="dropdown-item pointer" onclick="fun.c11(2)" value="2">敦煌商品ID</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c11(3)" value="3">敦煌卖家账户</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c11(4)" value="4">更新出错原因</a></li>\
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
                    <li onClick="Tool.open4(\'js24\');"><a class="dropdown-item pointer">把【属性图片未上传】上传到敦煌网</a></li>\
                </ul>手动审核状态：\
            </th>\
            <th class="p-0"></th>\
            <th class="w130 right">本地商品状态：</th>\
            <th class="p-0"></th>\
        </tr>'
        //'+ this.b03(obj.arr[7]) + '
        //'+ this.b04(obj.arr[8], config.proupdhgate_proStatus_count) + '
        return html;
    },
    b03: function (examine) {
        let nArr = [], arr = Tool.ManualReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == examine ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + config.proupdhgate_ManualReview_count[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c01(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">手动审核状态</option>\
            <option value="-1">更新数量</option>\
            <option value="-2"' + (-2 == examine ? 'selected="selected"' : '') + '>图片审核通过且无推广图片</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b04: function (val, configArr) {
        let nArr = [], arr = Tool.proStatusArr;
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
    b05: function (oo) {
        let str = '\
		<tr>\
			<td class="right">手动审核状态：</td>\
			<td></td>\
			<td class="right">本地商品状态：</td>\
			<td></td>\
		</tr>\
		<tr>\
			<td class="right">编码：</td><td>'+ oo.proid + '</td>\
			<td class="right">SMT店铺ID：</td><td><a href="https://www.aliexpress.com/store/'+ oo.smtshopid + '" target="_blank" title="点击查看店铺">' + oo.smtshopid + '</a></td>\
		</tr>\
		<tr>\
			<td class="right">敦煌商品ID：</td>\
			<td><a href="https://www.dhgate.com/product/-/'+ oo.dhfromid + '.html" target="_blank">' + oo.dhfromid + '</a></td>\
			<td class="right">SMT商品ID：</td>\
            <td>'+ (oo.smtfromid ? '<a href="https://www.aliexpress.com/item/' + oo.smtfromid + '.html" target="_blank" title="点击查看来源">' + oo.smtfromid + '</a>' : '来源商品不存在') + '</td>\
		</tr>\
		<tr>\
			<td class="right">敦煌卖家账户：</td>\
			<td>'+ oo.upuser + '</td>\
			<td class="right">分类：</td>\
			<td>'+ (oo.smttype ? oo.smttype : '来源商品不存在') + '</td>\
		</tr>\
		<tr>\
			<td class="right">速卖通品牌：</td>\
			'+ this.b13(oo.brand) + '\
		</tr>\
		<tr>\
			<td class="right">更新出错原因：</td>\
			<td colspan="4">'+ oo.err + '</td>\
		</tr>'
        //'+ this.b06(oo.ManualReview) + '
        //'+ this.b07(oo.proStatus) + '
        return str;
    },
    b06: function (examine) {
        let arr = Tool.ManualReviewArr, t = "未知:" + examine;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == examine) {
                t = arr[i][1];
                break;
            }
        }
        return t
    },
    b07: function (proStatus) {
        let arr = Tool.proStatusArr, t = "未知:" + proStatus;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == proStatus) {
                t = arr[i][1];
                break;
            }
        }
        return t;
    },
    b08: function (arr, picABC) {
        var str = "", fileurlA = "", fileurlB = "";
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    if (picABC == "picA") {
                        fileurlA = 'https://ae01.alicdn.com/kf/' + arr[i].picA.aliexpressPic + '.jpg';
                        fileurlB = 'https://ae01.alicdn.com/kf/' + arr[i].picA.aliexpressPic + '.jpg_200x200.jpg';
                        str += this.b14(fileurlA, fileurlB, i, arr[i].picA.aliexpressPic)
                    }
                    else if (picABC == "picB" || picABC == "picC") {
                        if (arr[i][picABC]) {
                            fileurlA = 'https://image.dhgate.com/webp/m/170x170/' + arr[i][picABC].fileurl;
                            fileurlB = 'https://image.dhgate.com/' + arr[i][picABC].fileurl
                            str += this.b14(fileurlA, fileurlB, i, arr[i][picABC].fileurl)
                        }
                        else {
                            str += ' <figure class="figure border mb-1 p-1 w170 center">'+(i+1)+'.还没上传图片</figure>'
                        }
                    }
                                   
                }
                else {
                    str += ' <figure class="figure border mb-1 p-1 w170 center">' + (i + 1) +'.空位置图片</figure>'
                }
            }
        }
        else {
            str = "没有属性图片。"
        }
        return str
    },
    b09: function (oo) {
        let arr = [];
        for (let k in oo) {
            arr = oo[k][0];
            break;
        }
       return this.b10(arr)
    },
    b10: function (arr) {
        let picArr = [], isboolArr = [];
        for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].skuPropertyValues;
            picArr = [];
            for (let j = 0; j < arr2.length; j++) {
                //怎么知道是图片组？答：只要当前组有一个图片，那就是图片组。
                //（注1：购物车属性，只能出现一个组片。比如：颜色有图片，尺寸有图片，那是不行的，我这只会出来第一组图片）
                //为什么不判断第一个是不为图片？答：因为图片给中可以不放图片，也可以放一个图片，并不需要全放图片。
                let url40 = "";
                if (arr2[j].skuPropertyImagePath)
                {
                    isboolArr.push(true);
                    url40 = Tool.StrSlice(arr2[j].skuPropertyImagePath, "com/kf/", "/")
                }
                picArr.push(url40)
            }
            if (isboolArr.length > 0) {
                break;
            }
        }
        this.obj.PicA = picArr;
        return this.b11(picArr)
    },
    b11: function (arr) {
        var str = "";
        if (arr.length != 0) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    str += '\
                    <figure class="figure border mb-1 mt-1 p-1">\
                        <a href="https://ae01.alicdn.com/kf/'+ arr[i] + '.jpg" target="_blank">\
                            <img src="https://ae01.alicdn.com/kf/'+ arr[i] + '.jpg_200x200.jpg" class="figure-img img-fluid rounded w170">\
                        </a>\
                        <figcaption class="figure-caption text-center">' + (i + 1) + '</figcaption>\
                    </figure>'
                }
                else {
                    str += ' <figure class="figure border mb-1 mt-1 p-1 w170 center">' + (i + 1) + '.空位置图片</figure>'
                }
            }
        }
        else {
            str = "没有属性图片。"
        }
        return str + '<button type="button" class="btn btn-secondary" style="position: relative;top: -5px;left: 5px;" onclick="fun.c04()">把【aeopAeProductSKUs】购物车图片复制到【DHattrPic.picA】来源图片里面</button>'
    },
    b12: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.proid='" + Tool.unescape(obj.arr[6]) + "'"); break;//商品编码
                case "2": arr.push("@.fromID=" + Tool.unescape(obj.arr[6])); break;//DH商品ID
                case "3": arr.push("@.upuser='" + Tool.unescape(obj.arr[6]) + "'"); break;
                case "4": arr.push("@.err like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;
            }
        }
        if (obj.arr[7] != "-_-20") {
            if (obj.arr[7] == "-2") {
                arr.push("@.ManualReview=1");
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
    b13: function (brand) {
        if (brand) {
            return '<td class="p-0" colspan="3"> &nbsp; ' + brand + ' <button type="button" class="btn btn-secondary" onclick="fun.c12(\'' + brand + '\')">禁限该品牌</button>（禁限原因：该品牌不适合自己生产。）</td>';
        }
        else {
            return '<td  colspan="3">来源商品不存在</td>'
        }
    },
    b14: function (fileurlA, fileurlB, i, url40) {
        let str = "";
        if (url40) {
            str += '\
            <figure class="figure border mb-1 mt-1 p-1">\
                <a href="'+ fileurlA + '" target="_blank">\
                    <img src="' + fileurlB + '" class="figure-img img-fluid rounded w170">\
                </a>\
                <figcaption class="figure-caption text-center">\
                <a href="javascript:;" onclick="fun.c06(\'' + url40 + '\')">' + (i + 1) + '.删除</a>\
                </figcaption>\
            </figure>'
        }
        else {
            str += ' <figure class="figure border mb-1 mt-1 p-1 w170 center">异常</figure>'
        }
        return str;
    },
    b15: function (Field) {
        let t;
        switch (Field) {
            case "1": t = "商品编码"; break;
            case "2": t = "敦煌商品ID"; break;
            case "3": t = "敦煌卖家账户"; break;
            case "4": t = "更新出错原因"; break;
            default: t = "未知:" + Field;
        }
        return t;
    },
    c01: function (val) {
        if (val == "-1") {
            Tool.open4("js19");
        }
        else {
            Tool.open(7, val);
        }
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
    c04: function () {
        let picArr = this.obj.PicA;
        let DHattrPic = [];
        for (let i = 0; i < picArr.length; i++) {
            if (picArr[i]) {
                DHattrPic.push({
                    "picA": {
                        "aliexpressPic": picArr[i]
                    }
                })
            }
            else {
                DHattrPic.push(false);
            }           
        }
        this.c05(DHattrPic)
    },
    c05: function (DHattrPic) {
        let proid = this.obj.proid;
        var str = "update @.prodes set @.DHattrPic=" + Tool.rpsql(JSON.stringify(DHattrPic)) + " where @.proid='" + proid + "'";
        str = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">' + str + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c06: function (pic) {
        let arr = this.obj.DHattrPic;
        if (arr[0].picC) {//如果有水印，就删除水印的。
            for (let i = 0; i < arr.length; i++) {

            }
            alert("有数据再说")
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    if (pic == arr[i].picA.aliexpressPic) {
                        arr[i] = false;
                        break;
                    }
                }                
            }
            this.c05(arr);
        }


    },
    c07: function (id, examine) {
        let str = '""<r: db="sqlite.dhgate">update @.proupdhgate set @.ManualReview=' + examine + ' where @.id=' + id + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    }
}
fun.a01();