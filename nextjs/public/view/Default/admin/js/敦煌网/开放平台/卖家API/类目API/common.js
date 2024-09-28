'use strict';
Object.assign(Tool, {
    dh_categorys_commissions:
    {
        a01: function (access_token) {
            let oo = {}, url = "http://api.dhgate.com/dop/router"
            oo.access_token = access_token
            oo.method = "dh.categorys.commissions"
            oo.timestamp = (new Date).getTime()
            oo.v = "1.0"
            $("#thisUrl").val(url);
            $("#thisPost").html(JSON.stringify(oo, null, 2));
            gg.postFetch(url, oo, this.a02, this)
        },
        a02: function (oo) {
            $("#thisJson").html(JSON.stringify(oo, null, 2));
            let html = '\
            <thead class="table-light">\
            <tr>\
                <th rowspan="2">类别Id</th>\
                <th colspan="5">订单金额：[0,300]</th>\
                <th colspan="5">订单金额：[300,1000]</th>\
                <th colspan="5">订单金额：[1000,]</th>\
            </tr>\
            <tr>\
                <th title="价格右边界">右边界</th>\
                <th title="价格左边界">左边界</th>\
                <th>佣金率</th>\
                <th title="价格右边界是否是开区间">右边界开区间</th>\
                <th title="价格左边界是否是开区间">左边界开区间</th>\
                <th title="价格右边界">右边界</th>\
                <th title="价格左边界">左边界</th>\
                <th>佣金率</th>\
                <th title="价格右边界是否是开区间">右边界开区间</th>\
                <th title="价格左边界是否是开区间">左边界开区间</th>\
                <th title="价格右边界">右边界</th>\
                <th title="价格左边界">左边界</th>\
                <th>佣金率</th>\
                <th title="价格右边界是否是开区间">右边界开区间</th>\
                <th title="价格左边界是否是开区间">左边界开区间</th>\
            </tr>\
            </thead>'
            let tbody = ""
            for (let i = 0; i < oo.list.length; i++) {
                tbody += '\
                <tr>\
                    <td>'+ oo.list[i].cateId + '</td>\
                    <td>'+ oo.list[i].unitList[0].rightBound + '</td>\
                    <td>'+ oo.list[i].unitList[0].leftBound + '</td>\
                    <td>'+ oo.list[i].unitList[0].commissionRate + '</td>\
                    <td>'+ oo.list[i].unitList[0].rightBoundClose + '</td>\
                    <td>'+ oo.list[i].unitList[0].leftBoundClose + '</td>\
                    \
                    <td>'+ (oo.list[i].unitList[1] ? oo.list[i].unitList[1].rightBound : '无') + '</td>\
                    <td>'+ (oo.list[i].unitList[1] ? oo.list[i].unitList[1].leftBound : '无') + '</td>\
                    <td>'+ (oo.list[i].unitList[1] ? oo.list[i].unitList[1].commissionRate : '无') + '</td>\
                    <td>'+ (oo.list[i].unitList[1] ? oo.list[i].unitList[1].rightBoundClose : '无') + '</td>\
                    <td>'+ (oo.list[i].unitList[1] ? oo.list[i].unitList[1].leftBoundClose : '无') + '</td>\
                    \
                    <td>'+ (oo.list[i].unitList[2] ? oo.list[i].unitList[2].rightBound : '无') + '</td>\
                    <td>'+ (oo.list[i].unitList[2] ? oo.list[i].unitList[2].leftBound : '无') + '</td>\
                    <td>'+ (oo.list[i].unitList[2] ? oo.list[i].unitList[2].commissionRate : '无') + '</td>\
                    <td>'+ (oo.list[i].unitList[2] ? oo.list[i].unitList[2].rightBoundClose : '无') + '</td>\
                    <td>'+ (oo.list[i].unitList[2] ? oo.list[i].unitList[2].leftBoundClose : '无') + '</td>\
                </tr>'

            }
            html += '<tbody>' + tbody + '</tbody>'
            $("#dh_categorys_commissions").html(html)


        }
    },
    dh_category_list: {
        access_token: "",
        a01: function (access_token) {
            this.access_token = access_token;
            this.a02("", 5);
        },
        a02: function (parentId, marginleft) {
            let oo = {
                access_token: this.access_token,
                method: "dh.category.list",
                timestamp: (new Date).getTime(),
                parentId: parentId,
                v: "2.0"
            }, url = "http://api.dhgate.com/dop/router"
            $("#thisUrl").val(url);
            $("#thisPost").html(JSON.stringify(oo, null, 2));
            gg.postFetch(url, oo, this.a03, this, [parentId, marginleft])
        },
        a03: function (oo, typeArr) {
            $("#thisJson").html(JSON.stringify(oo, null, 2));
            let type = oo.catePubList;
            if (type) {
                let html = "",
                    Modified,//【加号】和【减号】按扭
                    categoryId//【查看属性】按扭
                for (let i = 0; i < type.length; i++) {
                    if (type[i].leaf == 0) {
                        Modified = "<a href=\"javascript:\" class=\"Mo MoA\" onclick=\"Tool.dh_category_list.c01($(this),'" + type[i].catePubId + "')\" style=\"margin-left:" + typeArr[1] + "px;\"></a>";
                        categoryId = ""
                    }
                    else {
                        Modified = "<a class=\"Mo\" style=\"margin-left:" + typeArr[1] + "px;\"></a>";
                        categoryId = '<button type="button" class="btn btn-outline-secondary btn-sm" onclick="Tool.dh_category_list.c02($(this),\'' + type[i].catePubId + '\',unescape(\'' + escape(type[i].pubNameCn + '（' + type[i].pubName + '）') + '\'))">查看属性</button>';
                    }
                    html += '\
                    <tr>\
			            <td class="w200">'+ Modified + type[i].catePubId + '</td>\
			            <td class="w450">' + type[i].pubNameCn + ' (' + type[i].pubName + ')' + categoryId + '</td>\
			            <td>'+ type[i].remark + '</td>\
                    </tr>'
                }
                this.a04(html, typeArr);
            }
            else {
                alert("DH的问题，获取不到类目" + txt)
            }
        },
        a04: function (html, typeArr) {
            if (typeArr[0]) {
                html = '<table class="table table-hover mb-0 align-middle">' + html + '</table>'
                $(".Mo" + typeArr[0] + " td").html(html)
            }
            else {
                html = '\
			    <table class="table table-hover mb-0 align-middle">\
                <thead class="table-light">\
			    <tr>\
				    <th class="w200" style="padding-left: 30px;position: relative;">\
					    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					    <ul class="dropdown-menu">\
						    <li onClick="Tool.open4(\'js14/'+ obj.arr[4] + '/' + obj.arr[5] +'\');"><a class="dropdown-item pointer">一键采集所有类目</a></li>\
					    </ul>\
					    来源ID\
				    </th>\
				    <th>分类名称（英文）</th>\
				    <th>备注说明</th>\
			    </tr>\
			    </thead>'+ html + '</table>'
                $("#dh_category_get").html(html)
            }
        },
        b01: function (attr) {
            let str = ""
            for (let i = 0; i < attr.length; i++) {
                str += "<tr>\
			    <td title=\"主键(catePubAttrId):"+ attr[i].catePubAttrId + "\n属性ID(attrId):" + attr[i].attrId + "\n叶子发布类目ID(catePubId):" + attr[i].catePubId + "\n是否必填(required):" + attr[i].required + "\n是否定位属性(located):" + attr[i].located + "\n是否销售属性(saleAttr):" + attr[i].saleAttr + "\n是否购买属性(buyAttr):" + attr[i].buyAttr + "\n类目选择样式(style):" + attr[i].style + " (1:文本 2:图片 3:图文)\n形式(type):" + attr[i].type + "(1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框)\n属性的属性值是否可以自定义修改(defined)：" + attr[i].defined + "\n是否品牌(isBrand):" + attr[i].isBrand + "\n是否有other属性值(isother):" + attr[i].isother + "\n子属性ID(childAttrId):" + attr[i].childAttrId + "\" class=\"w300 right\">\
				    "+ (attr[i].childAttrId ? "*" : "") + attr[i].lineAttrNameCn + " (" + attr[i].lineAttrName + "):\
			    </td>\
			    <td>"+ this.b02(attr[i].categoryPubAttrValList, attr[i].type, attr[i].isBrand, attr[i].catePubId, attr[i].childAttrId) + "</td>\
			    </tr>"
                if (attr[i].childAttrId) { this.b05(attr[i].categoryPubAttrValList[0].catePubAttrvalId, attr[i].catePubId, attr[i].childAttrId, false); }//【子属性】
            }
            return str
        },
        b02: function (attr, type, isBrand, catePubId, childAttrId) {
            let str = ""
            if (isBrand == 1) { str = '<select class="form-select"><option value="99">- 无品牌 -</option><option value="0">选择其它品牌</option></select>' }
            else {
                switch (type)//形式 1：多选框 2：下拉框 4：字符型输入框 5：数值型输入框
                {
                    case "1": str = this.b03(attr); break;
                    case "2": str = "<select class=\"form-select\" " + (!childAttrId ? "" : " onchange=\"fun.b07(this.options[this.options.selectedIndex].value," + catePubId + "," + childAttrId + ",true)\"") + ">" + this.b04(attr) + "</select>"; break;
                    case "4":
                    case "5": str = '<input type="text" class="form-control form-control-sm">'; break;
                    default: str = "未知" + type; break;
                }
            }
            return str
        },
        b03: function (attr) {
            let str = ""
            for (let i = 0; i < attr.length; i++) {
                str += '\
			<div class="form-check form-check-inline">\
				<input class="form-check-input" type="checkbox" id="attrValId-' + attr[i].catePubAttrvalId + '">\
				<label class="form-check-label" for="attrValId-' + attr[i].catePubAttrvalId + '" title="属性值主键:' + attr[i].catePubAttrvalId + '\n发布类目属性编号:' + attr[i].catePubAttrId + '\n产品线属性值编号:' + attr[i].attrValId + '\n属性值图片链接:' + attr[i].picUrl + '">' + attr[i].lineAttrvalNameCn + ' (' + attr[i].lineAttrvalName + ')</label>\
			</div>'
            }
            return str
        },
        b04: function (attr) {
            let str = "<option>请选择</option>"
            for (let i = 0; i < attr.length; i++) {
                str += "<option title='属性值主键:" + attr[i].catePubAttrvalId + "\n发布类目属性编号:" + attr[i].catePubAttrId + "\n产品线属性值编号:" + attr[i].attrValId + "\n属性值图片链接:" + attr[i].picUrl + "' value=\"" + attr[i].catePubAttrvalId + "\">" + attr[i].lineAttrvalNameCn + " (" + attr[i].lineAttrvalName + ")</option>"
            }
            return str
        },

        b05: function (catePubAttrValId, catePubId, childAtrrId, bool) {
            if (bool) { $("#childAttrId" + childAtrrId).find('td:last').html('<img src="/' + o.path + 'admin/img/loading.gif" align="absmiddle" height="22"/>'); }
            let URL = "http://api.dhgate.com/dop/router?access_token=" + this.access_token + "&method=dh.category.attrval.list&timestamp=" + (new Date).getTime() + "&catePubAttrValId=" + catePubAttrValId + "&catePubId=" + catePubId + "&childAtrrId=" + childAtrrId + "&v=2.0"
            alert(URL)
            //Tool.ajax.a01( "<.WebClientPost(" + URL + ")/>", 1, [bool,this.b06,this, childAtrrId]);
        },
        b06: function (type, arr) {
            type = type.categoryPubAttr
            if (type.categoryPubAttrValList.length != 0)//注：这个判断是重要。因为DH认为，没有属性值的属性，是不能算属性的。
            {
                let str = "<td align=\"right\" title=\"主键:" + type.catePubAttrId + "\n属性Id:" + type.attrId + "\n叶子发布类目id:" + type.catePubId + "\n是否为必填项:" + type.required + "\n是否定位属性:" + type.located + "\n是否销售属性:" + type.saleAttr + "\n是否购买属性:" + type.buyAttr + "\n类目选择样式:" + type.style + "(1：文本 2：图片 3：图文；)\n类目选择形式:" + type.type + "(1：多选框 2：下拉框 4：字符型输入框 5：数值型输入框;)\n属性的属性值是否可以自定义修改:" + type.defined + "\n是否是品牌属性:" + type.isBrand + "\n是否有other属性值:" + type.isother + "\n子属性ID(childAttrId):" + type.childAttrId + "\">" + type.lineAttrNameCn + "(" + type.lineAttrName + "):</td><td>" + this.b04(type.categoryPubAttrValList, type.type, type.isBrand, type.catePubId, type.childAttrId) + "</td>"
                if (arr[0]) { $("#childAttrId" + arr[1]).html(str); }
                else {
                    str = "<tr id=\"childAttrId" + type.attrId + "\">" + str + "</tr>"
                    $("td[title$='子属性ID(childAttrId):" + arr[1] + "']").parent().after(str)
                    if (type.childAttrId) {
                        this.b05(type.categoryPubAttrValList[0].catePubAttrvalId, type.catePubId, type.childAttrId, false);
                    }
                }
            }
        },
        c01: function (This, fromID) {
            if (This.attr("Class") == "Mo MoB") { $(".Mo" + fromID).hide(); This.attr("Class", "Mo MoA"); }
            else {
                This.attr("Class", "Mo MoB")
                if ($(".Mo" + fromID).length) { $(".Mo" + fromID).show(); }
                else {
                    This.parent().parent().after('<tr class="Mo' + fromID + '"><td colspan="3" class="p-0"><img height="30" src="/' + o.path + 'admin/img/loading_42x42.gif"/></td></tr>')
                    let marginleft = parseInt(This.css("margin-left")) + 20;
                    this.a02(fromID, marginleft);
                }
            }
        },
        c02: function (This, catepubid, title) {
            if ($("#attributes" + catepubid).length == 0) {
                This.parent().parent().after('<tr id="attributes' + catepubid + '"><td class="shadow bg-white rounded" colspan="3"><img src="/' + o.path + 'admin/img/loading_42x42.gif"/> 正在加载【属性】。。。</td></tr>')
                let oo =
                {
                    access_token: this.access_token,
                    method: "dh.category.get",
                    timestamp: (new Date).getTime(),
                    catePubId: catepubid,
                    v: "2.0"
                }, url = "http://api.dhgate.com/dop/router"
                $("#thisUrl").val(url);
                $("#thisPost").html(JSON.stringify(oo, null, 2));
                gg.postFetch(url, oo, this.c03, this, [catepubid, title])
            }
            else if ($("#attributes" + catepubid).is(":visible")) { $("#attributes" + catepubid).hide() }
            else { $("#attributes" + catepubid).show() }
        },
        c03: function (type, arr) {
            let str = this.b01(type.categoryPubAttrList) + this.b01(type.categoryPubAttrgroupList)
            str = '<div class="panel-heading" title="发布类目ID:' + type.catePubId + '\n英文名称:' + type.pubName + '\n中文名称:' + type.pubNameCn + '\n说明:' + type.remark + '\n是否叶子类目:' + type.leaf + '\n父级发布类目:' + type.pareCatePubId + '\n不能包含的关键词:' + type.excludeKeyWords + '\n必须包含的关键词:' + type.inlucdeKeyWords + '">' + arr[1] + '</div><table class="table table-hover align-middle"><tbody>' + str + '</tbody></table>'
            $("#attributes" + arr[0] + " td").html(str)
        },
    },
    dh_category_brands: {
        //function open_page(page) {
        //    let URL = "http://api.dhgate.com/dop/router?access_token=" + o.token + "&method=dh.category.brands&timestamp=" + (new Date).getTime() + "&pageNum=" + page + "&pageSize=" + o.pcount + "&indexCode=" + o.indexCode + "&catePubId=&brandsName=&v=1.0"
        //    $.ajax({
        //        type: "POST", url: "exe.html?" + Math.random(), data: {
        //            data: escape("<.WebClientPost(" + URL + ")/>") />, success: function (txt) {
        //                eval("let obj2=" + txt);
        //                let productCount = obj2.pageCount
        //                obj2 = obj2.result
        //                let htmlstr = "", brandinfo, html
        //                for (let i = 0; i < obj2.length; i++) {
        //                    brandinfo = obj2[i].brandinfo; if (brandinfo != null) brandinfo = brandinfo.replace(/"/g, "\"")
        //                    htmlstr += "\
        //        <td class=\"BoHo\" valign=\"bottom\" style=\"overflow:hidden;white-space:pre;width:70px;\" title=\"品牌名称:"+ obj2[i].brandname + "\n品牌名称（中文）:" + obj2[i].brandnameCn + "\n添加类型:" + obj2[i].type + "\n状态:" + obj2[i].status + "\n来源:" + obj2[i].source + "\n添加日期:" + js_date_time(obj2[i].addtime) + "\n主键（品牌ID）:" + obj2[i].brandid + "\n销售国别:" + obj2[i].salecountry + "\n备注:" + obj2[i].remark + "\n操作人:" + obj2[i].operator + "\n品牌小写名称:" + obj2[i].brandnamelower + "\n是否PP:" + obj2[i].ispp + "\n品牌国别:" + obj2[i].brandcountry + "\n品牌别名:" + obj2[i].brandalias + "\n类目:" + obj2[i].catalog + "\n联系方式:" + obj2[i].contect + "\n是否可见:" + obj2[i].isshow + "\n变形词:" + obj2[i].keywords + "\n品牌简介：" + brandinfo + "\"><img src=\"http://image.dhgate.com/" + obj2[i].logo + "\" width=\"50\"/><br/>" + obj2[i].brandname + "</td>"
        //                    if ((i + 1) % 12 == 0) { htmlstr += "</tr><tr align=\"center\">" }
        //                }
        //                let az = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(","), tr1 = ""
        //                for (let i = 0; i < az.length; i++) {
        //                    if (az[i] == o.indexCode) { tr1 += '<a class="detail-button cur" href="javascript:" onClick="open_AZ(\'' + az[i] + '\')">' + az[i] + '</a>' }
        //                    else { tr1 += '<a class="detail-button" href="javascript:" onClick="open_AZ(\'' + az[i] + '\')">' + az[i] + '</a>' }
        //                }
        //                tr1 = '<tr align=\"center\"><td colspan="12">' + tr1 + '</td></tr>'
        //                if ($(".open_tb").length == 0) {
        //                    html = '\
        //      <div id="producttype" class="popdiv" style="width:880px;position:fixed;top:150px;margin-left:15%;z-index:1000;">\
        //        <div class="poptitie"><img src="/'+ o.path + 'admin/img/btn_close.gif" onClick="$(this).parent().parent().remove();"/>选择其它品牌</div>\
        //        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="open_tb">\
        //        '+ tr1 + '\
        //        <tr align=\"center\">'+ htmlstr + '</tr>\
        //        <tr><td colspan="12" height="30" align=\"center\">'+ pageshow_open(productCount, o.size, page, 8) + '</td></tr>\
        //        </table>\
        //      </div>'
        //                    $("body").after(html);
        //                }
        //                else {
        //                    html = tr1 + '\
        //      <tr align=\"center\">'+ htmlstr + '</tr>\
        //      <tr><td colspan="12" height="30" align=\"center\">'+ pageshow_open(productCount, o.size, page, 8) + '</td></tr>'
        //                    $(".open_tb").html(html)
        //                }
        //            }
        //        });
        //}

    }
})