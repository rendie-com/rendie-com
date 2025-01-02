'use strict';
Object.assign(Tool, {
    ComparedProduct: {
        obj: {},
        a01: function (status, warnReason, PurchaseOrderId, PurchaseStatus, msgCount, PurchaseRemark, orderid) {
            this.obj = {
                status: status,
                warnReason: warnReason,
                PurchaseOrderId: PurchaseOrderId,
                PurchaseStatus: PurchaseStatus,
                msgCount: msgCount,
                PurchaseRemark: PurchaseRemark,
                orderid: orderid,
                ///////////////////////////////////////////
                A1: 1, A2: 0, Aarr: [],//orderitem表的商品数组
                err: "",//提示内容
                isErr: false//是否要提示
            }
            gg.isRD(this.a02, this);
        },
        a02: function (t) {
            let isbool = true, oo = this.obj;
            if (oo.status != '103001' ||
                oo.warnReason.indexOf('客户已完成付款，请在') == -1 ||
                oo.PurchaseOrderId != '' ||
                oo.PurchaseStatus != 0 ||
                oo.msgCount != 0 ||
                oo.PurchaseRemark != '') { isbool = false; }
            ////////////////////////////////////////////////////////
            if (isbool) { this.a03(); }
            else {
                //核对商品前，检测到该订单【异常】
                this.r01(oo)

            }
        },
        a03: function () {
            $("#seep1").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
            //注：DHfromid   用获取DH内容是要用
            let str = '[0\
            <r:orderitem db="sqlite.dhgate" where=" where @.OrderID=\''+ this.obj.orderid + '\'" size=100>,\
            {\
        	    "DHfromid":"<:fromid/>",\
        	    "proid":"<:proid/>"\
            }\
            </r:orderitem>]'
            $("#state").html("正在获取,订单中的商品。。。");
            Tool.ajax.a01(str, 1, this.a04, this)
        },
        a04: function (arr) {
            if (arr.length == 101) { $("#state").html("一个订单,里面的商品,不能超过小于100个。"); }
            else if (arr[1].proid) {
                let str = "[0"
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i].proid.indexOf("_") != -1) {
                        str += '\
        	            <r:pro db="sqlite.aliexpress" where=" where @.proid=\''+ arr[i].proid.split("_")[0] + '\'" size=1>,\
                                    {\
        		            "DHfromid":"'+ arr[i].DHfromid + '",\
        		            "fromid":<:fromid/>,\
        		            "minprice":<:minprice/>,\
        		            "maxprice":<:maxprice/>,\
        		            "Discount":<:Discount/>,\
        		            "proid":"<:proid/>"\
        	            }\
        	            </r:pro>';
                    }
                }
                $("#state").html("正在获取,商品的更多信息。。。");
                Tool.ajax.a01(str + "]", 1, this.a05, this, arr.length)
            }
            else { $("#state").html("找不到订单号[" + this.obj.orderid + "]"); }
        },
        a05: function (oo, len) {
            $("#state").html("已获得商品信息。。。");
            if (oo.length == len) {
                oo.shift()
                this.obj.A1 = 1;
                this.obj.A2 = oo.length;
                this.obj.Aarr = oo;
                this.obj.Err = "";//提示内容
                this.obj.isErr = false;//是否要提示
                this.a06();
            }
            else {
                $("#state").html("订单中的商品，在本地打不到（订单：" + len + "个，本地：" + oo.length + "个）。");
            }
        },
        a06: function () {
            $("#state").html('【' + this.obj.A1 + '/' + this.obj.A2 + '】正在获取DH详情页...');
            let url = "https://www.dhgate.com/product/-/" + this.obj.Aarr[this.obj.A1 - 1].DHfromid + ".html";
            gg.getFetch(url,"json", this.a07, this)
        },
        a07: function (t) {
            if (t == "{status:404}")//下架
            {
                this.obj.Aarr[this.obj.A1 - 1].DH = { name: "", unit: "", packingQuantity: "", picArr: [], desPicArr: [] };
                //this.a08()
                alert("404-----")
            }
            else if (t == "{status:403}")//命陆就可以打开
            {
                alert("aaaaaaaaaa33333333aaaaaaaaaa")
            }
            else if (t.indexOf('id="urlLink" value="') != -1)//需要手动验证
            {
                let url = "https://www.dhgate.com/product/-/" + this.obj.Aarr[this.obj.A1 - 1].DHfromid + ".html";
                $("#state").html('<a href="' + url + '" target="_blank">' + url + '</a>');
                alert("需要手动验证");
            }
            else {
                $("#state").html('获取DH详情页...');
                this.obj.Aarr[this.obj.A1 - 1].DH = this.b03(t);
                this.obj.Aarr[this.obj.A1 - 1].DH.desPicArr = this.b02(t);
                this.obj.Aarr[this.obj.A1 - 1].DH.name = Tool.StrSlice(t, '<h2 class="div-title" data="rendie">', '</h2>');
                this.a08()
            }
        },
        a08: function () {
            $("#state").html('【' + this.obj.A1 + '/' + this.obj.A2 + '】正在获取SMT详情页...');
            let url = "https://www.aliexpress.com/item/" + this.obj.Aarr[this.obj.A1 - 1].fromid + ".html";
            gg.getFetch(url,"json", this.a09, this)
        },
        a09: function (t) {
            if (t == "{status:404}")//下架
            {
                alert("-----------404------")
                //this.obj.Aarr[this.obj.A1 - 1].SMT = { name: "", unit: "", packingQuantity: "", minprice: 0, maxprice: 0, Discount: 0, picArr: [[], []], isshelf: true };
                //this.a10("")
            }
            else if (typeof (t) == 'object') {
                $("#state").html("正在登录速卖通账号。。。")
                Tool.pre(t)
                //Tool.aliexpressDefaultLogin.a01(this.a08, this)
            }
            else {
                $("#state").html('【' + this.obj.A1 + '/' + this.obj.A2 + '】已获得SMT详情页,正在获取SMT详情内容...');
                let desurl = Tool.StrSlice(t, '"descriptionUrl":"', '"');
                this.obj.Aarr[this.obj.A1 - 1].SMT = this.b06(t)//得到SMT的信息
                gg.getFetch(desurl,"text", this.a10, this)
            }
        },
        a10: function (smtdes) {
            this.obj.Aarr[this.obj.A1 - 1].SMT.desPicArr = this.b04(smtdes)
            $("#state").html('【' + this.obj.A1 + '/' + this.obj.A2 + '】已获取SMT详情内容,正在获取DH对应SMT的图片链接...');
            let proid = this.obj.Aarr[this.obj.A1 - 1].proid
            let str = '{\
            <r:prodes db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '" where=" where @.proid=\'' + proid + '\'" size=1 >\
        	    "DHpic":<:DHpic tag=0/>,\
        	    "DHattrPic":<:DHattrPic tag=0/>,\
        	    "DHdesPic":<:DHdesPic tag=0/>\
            </r:prodes>}'
            Tool.ajax.a01(str, 1, this.a11, this)
        },
        a11: function (oo) {
            let pic40Arr = this.obj.Aarr[this.obj.A1 - 1].SMT.picArr[0], picAarr = this.b01(oo), index, nArr = [];
            $("#state").html('【' + this.obj.A1 + '/' + this.obj.A2 + '】正在获取本地图片链接...');
            for (let i = 0; i < pic40Arr.length; i++) {
                index = picAarr.indexOf(pic40Arr[i])
                if (index != -1) {
                    nArr.push(pic40Arr[i]);
                }
            }
            this.obj.Aarr[this.obj.A1 - 1].SMT.picArr2 = nArr
            this.a12()
        },
        a12: function () {
            this.obj.Err += this.b05();//如果要提示，就给提示。
            this.obj.A1++;
            if (this.obj.A1 <= this.obj.A2) {
                this.a06();
            }
            else {
                if (this.obj.isErr) {
                    $("#state").html("<b>商品不同</b>")
                    $("#seep1").html("*(1)").attr("class", "btn btn-danger");
                    Tool.Modal("核对商品时【商品不同】", '<table class="table table-hover mb-0"><tbody>' + this.obj.Err + "</tbody></table>", '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick=\'Tool.addCart.a01(fun.obj.orderid,fun.obj.o3.country);\' data-bs-dismiss="modal">忽略提示【继续】</button>', 'modal-xl');
                }
                else {
                    $("#seep1").html("*(1)")
                    Tool.addCart.a01(fun.obj.orderid, fun.obj.o3.country);
                }
            }
        },
        b01: function (oo) {
            let arr = [];
            for (let i = 0; i < oo.DHpic.length; i++) { arr.push(oo.DHpic[i].picA.aliexpressPic); }
            for (let i = 0; i < oo.DHattrPic.length; i++) { arr.push(oo.DHattrPic[i].picA.aliexpressPic); }
            for (let i = 0; i < oo.DHdesPic.length; i++) { arr.push(oo.DHdesPic[i].picA.aliexpressPic); }
            return arr;
        },
        b02: function (t) {
            let des = Tool.StrSlice(t, '<h2 class="div-title">Description</h2>', 'More Description</span>');
            let desPicArr = Tool.regSplits(des.replace(/(<a [\S\s]*?<\/a>)/ig, ""), ' src="', '"');
            return desPicArr
        },
        b03: function (str)//得到DH的信息
        {
            let picArr = Tool.StrSlice(str, '"oriImgList":["', '"]').split('","');
            picArr = Tool.unique(picArr);//去重复
            for (let i = 0; i < picArr.length; i++) {
                if (picArr[i].indexOf('/0x0/') != -1) { picArr[i] = Tool.StrSlice(picArr[i], '/0x0/', '.jpg') + ".jpg"; }
                else {
                    alert("DH截取图片失败，请与管理员联系。")
                }

            }
            ////////////////////////////////////////////////
            let unit = Tool.StrSlice(str, '<span class="price-pieces">/ ', '</span>').toLowerCase();
            if (unit == "lot") { unit = "piece"; }
            //////////////////////////
            let packingQuantity = Tool.StrSlice(str, '"lot":', ',');
            /////////////////////////////
            return { picArr: picArr, unit: unit, packingQuantity: packingQuantity }
        },
        b04: function (smtdes) {
            let desPicArr = Tool.regSplits(smtdes.replace(/(<a [\S\s]*?<\/a>)/ig, ""), ' src="', '"');
            desPicArr = Tool.unique(desPicArr);//去重复
            return desPicArr
        },
        b05: function () {
            let oo = this.obj.Aarr[this.obj.A1 - 1]
            ///////////////////////////////////////////////////
            let html = '\
            <tr>\
        	    <th class="center w100">【'+ this.obj.A1 + '/' + this.obj.A2 + '】</th>\
        	    <th>敦煌网（<a href="https://www.dhgate.com/product/-/'+ oo.DHfromid + '.html" target="_blank">新窗口打开该商品</a>）</th>\
        	    <th>速卖通（<a href="https://www.aliexpress.com/item/'+ oo.fromid + '.html" target="_blank">新窗口打开该商品</a>）</th>\
        	    <th class="center">对比结果</th>\
            </tr>'+ this.b09(oo) + this.b10(oo) + this.b11(oo) + this.b12(oo);
            return html
        },
        b06: function (str)//SMT 
        {
            let price = this.b07(str)//算出最小价格，和最大价格
            //////////////////////////////////////////////////////////////
            let Discount = Tool.regSlice(str, 'e,"discount":', ',');
            if (!Discount) { Discount = 0 }
            ///////////////////////////////////////
            let picArr = this.b08(str)//放大镜图片
            ////////////////////////////////////////
            let name = Tool.StrSlice(str, '"subject":"', '","');
            name = Tool.Trim(name).replace(/  +/ig, " ");//主要是在【上传商品】时，DH做了这个操作。
            /////////////////////////////////////////////
            let unit = Tool.StrSlice(str, '"multiUnitName":"', '"').toLowerCase();
            if (unit == "pieces") { unit = "piece" }
            else if (unit == "sets") { unit = "set" }
            ////////////////////////////
            let packingQuantity = Tool.StrSlice(str, '"numberPerLot":', ',');
            //////////////////////////////
            let isshelf = false;//是否已下架
            if (str.indexOf('Sorry, this item is no longer available!</div>') != -1) { this.obj.isErr = true; isshelf = true; }
            return {
                name: name,
                unit: unit,
                packingQuantity: packingQuantity,
                minprice: price[0],
                maxprice: price[1],
                Discount: Discount,
                picArr: picArr,
                isshelf: isshelf
            }
        },
        b07: function (str)//算出最小价格和最大价格
        {
            //let arr = []
            //eval("arr=" + Tool.regSplits(str, '"skuModule":', ',"priceGuarantee"'))
            //arr = arr.skuPriceList;
            //let minprice = 0, maxprice = 0, newprice = 0;
            //for (let i = 0; i < arr.length; i++) {
            //    newprice = arr[i].skuVal.skuAmount.value;
            //    if (i == 0) { minprice = newprice; }
            //    else if (newprice < minprice) { minprice = newprice; }
            //    if (newprice > maxprice) { maxprice = newprice; }
            //}
            //return [minprice, maxprice]
            return [0, 0]
        },
        b08: function (str)//放大镜图片
        {
            let html = Tool.StrSlice(str, '"summImagePathList":[', ']'), pic40Arr = [], num = -1, alipicArr
            eval("alipicArr=[" + html + "]")
            alipicArr = Tool.unique(alipicArr)//去重复
            for (let i = 0; i < alipicArr.length; i++) {
                num = alipicArr[i].indexOf("_50x50")
                if (num != -1) { alipicArr[i] = alipicArr[i].substr(0, num); }
                pic40Arr.push(Tool.StrSlice(alipicArr[i], "com/kf/", "/"));
            }
            return [pic40Arr, alipicArr]
        },
        b09: function (oo) {
            let li1_1 = "", li1_2 = "", li1_3 = "", len = 0, cc = "";
            for (let i = 0; i < oo.DH.picArr.length; i++) {
                if (oo.SMT.picArr2.indexOf(oo.DH.picArr[i]) != -1) { len++; }
                li1_1 += '<img style="margin:3px;padding:1px;border:1px solid #ccc" src="http://image.dhgate.com/100x100/' + oo.DH.picArr[i] + '" width="72">';
            }
            for (let i = 0; i < oo.SMT.picArr[1].length; i++) { li1_2 += '<img style="margin:3px;padding:1px;border:1px solid #ccc" src="' + oo.SMT.picArr[1][i] + '" width="72">'; }
            //////////////////////////////////////////////////////
            cc = parseInt((len / oo.DH.picArr.length) * 100)
            li1_3 = len + "/" + oo.DH.picArr.length + "<hr/>" + cc + "%";
            //////////////////////////////////////
            if (cc < 70) { this.obj.isErr = true; li1_3 = '<font color="red">' + li1_3 + '</font>'; }
            return '\
            <tr>\
        	    <td class="right">放大镜图片：</td>\
        	    <td>'+ li1_1 + '</td>\
        	    <td>'+ li1_2 + '</td>\
        	    <td class="center">'+ li1_3 + '</td>\
            </tr>'
        },
        b10: function (oo) {
            let name = "", unit = "", packingQuantity = "";
            if (oo.DH.name != oo.SMT.name) { this.obj.isErr = true; name = '<font color="red">不同</font>'; } else { name = "相同"; }
            if (("|" + oo.DH.unit + "|").indexOf("|" + oo.SMT.unit + "|") == -1) { this.obj.isErr = true; unit = '<font color="red">不同</font>'; } else { unit = "相同"; }
            if (oo.DH.packingQuantity != oo.SMT.packingQuantity) { this.obj.isErr = true; packingQuantity = '<font color="red">不同</font>'; } else { packingQuantity = "相同"; }
            return '\
            <tr>\
        	    <td class="right">标题：</td>\
        	    <td>'+ oo.DH.name + '</td>\
        	    <td>'+ oo.SMT.name + '</td>\
        	    <td class="center">'+ name + (oo.SMT.isshelf ? '<hr/><font color="red">已下架</font>' : '') + '</td>\
            </tr>\
            <tr>\
        	    <td class="right">单位：</td>\
        	    <td>'+ oo.DH.unit + '</td>\
        	    <td>'+ oo.SMT.unit + '</td>\
        	    <td class="center">'+ unit + '</td>\
            </tr>\
            <tr>\
        	    <td class="right">每包件数：</td>\
        	    <td>'+ oo.DH.packingQuantity + '</td>\
        	    <td>'+ oo.SMT.packingQuantity + '</td>\
        	    <td class="center">'+ packingQuantity + '</td>\
            </tr>'
        },
        b11: function (oo) {
            let dh = oo.DH.desPicArr, smt = oo.SMT.desPicArr;
            let li1_1 = "", li1_2 = "", li1_3 = "", len = 0, cc = "";
            for (let i = 0; i < dh.length; i++) {
                if (oo.SMT.picArr2.indexOf(dh[i]) != -1) { len++; }
                li1_1 += '<img style="margin:3px;padding:1px;border:1px solid #ccc" src="' + dh[i] + '" width="72">';
            }
            for (let i = 0; i < smt.length; i++) { li1_2 += '<img style="margin:3px;padding:1px;border:1px solid #ccc" src="' + smt[i] + '" width="72">'; }
            for (let i = 0; i < dh.length; i++) { if (smt.indexOf(dh[i]) != -1) { len++; } }
            if (dh.length == 0) { cc = 100 }
            else { cc = parseInt((len / dh.length) * 100) }
            li1_3 = len + "/" + dh.length + "<hr/>" + cc + "%";
            if (cc < 70) { this.obj.isErr = true; li1_3 = '<font color="red">' + li1_3 + '</font>'; }
            //////////////////////////////////////////////////
            return '\
            <tr>\
        	    <td class="right">详情图片：</td>\
        	    <td>'+ li1_1 + '</td>\
        	    <td>'+ li1_2 + '</td>\
        	    <td class="center">'+ li1_3 + '</td>\
            </tr>'
        },
        b12: function (oo) {
            let price1 = '', price2 = '', price3 = ''
            if (oo.minprice == oo.maxprice) {
                price1 = 'US $' + (oo.minprice * (100 - oo.Discount) * 0.01).toFixed(2) + ' <s style="color:#999;font-size:10px;">US $' + oo.minprice.toFixed(2) + '</s><span style="background:#fff1f1;padding: 2px 5px;font-size:10px;">-' + oo.Discount + '%</span>'
            }
            else {
                price1 = 'US $' + (oo.minprice * (100 - oo.Discount) * 0.01).toFixed(2) + ' - ' + (oo.maxprice * (100 - oo.Discount) * 0.01).toFixed(2) + ' <s style="color:#999;font-size:10px;">US $' + oo.minprice.toFixed(2) + ' - ' + oo.maxprice.toFixed(2) + '</s><span style="background:#fff1f1;padding: 2px 5px;font-size:10px;">-' + oo.Discount + '%</span>'
            }
            if (oo.SMT.minprice == oo.SMT.maxprice) {
                price2 = 'US $' + (oo.SMT.minprice * (100 - oo.SMT.Discount) * 0.01).toFixed(2) + ' <s style="color:#999;font-size:10px;">US $' + oo.SMT.minprice.toFixed(2) + '</s><span style="background:#fff1f1;padding: 2px 5px;font-size:10px;">-' + oo.SMT.Discount + '%</span>'
            }
            else {
                price2 = 'US $' + (oo.SMT.minprice * (100 - oo.SMT.Discount) * 0.01).toFixed(2) + ' - ' + (oo.SMT.maxprice * (100 - oo.SMT.Discount) * 0.01).toFixed(2) + ' <s style="color:#999;font-size:10px;">US $' + oo.SMT.minprice.toFixed(2) + ' - ' + oo.SMT.maxprice.toFixed(2) + '</s><span style="background:#fff1f1;padding: 2px 5px;font-size:10px;">-' + oo.SMT.Discount + '%</span>'
            }
            if (price1 != price2) { this.obj.isErr = true; price3 = '<a href="javascript:;" onClick="Tool.main(\'js6/1/' + oo.proid + '\');" class="red" title="重新采集该商品\n注：主要是为了，在【第2步】加入购物车时能得到实时价格，这样就能在【第5步】确认商品时，判断【价格】是否一样。">*不同</font>'; } else { price3 = "相同"; }
            return '\
            <tr>\
        	    <th></th>\
        	    <th>本地价格</th>\
        	    <th>速卖通价格</th>\
        	    <th nowrap>对比结果</th>\
            </tr>\
            <tr>\
        	    <td></td>\
        	    <td>'+ price1 + '</td>\
        	    <td>'+ price2 + '</td>\
        	    <td>'+ price3 + '</td>\
            </tr>'
        },
        //核对商品前，检测到该订单【异常】
        r01: function (oo) {
            let txt = '\
			<table class="table table-hover center mb-0">\
			<tbody>\
			<thead class="table-light center">\
			<tr>\
				<th class="w130"></th>\
				<th>检测值</th>\
				<th>正常值</th>\
				<th class="w100">检测结果</th>\
			</tr>\
			</thead>\
			<tr>\
				<td class="right">订单状态：</td>\
				<td>'+ Tool.orderStatus(oo.status) + '</td>\
				<td>等待您发货</td>\
				<td>'+ (oo.status == '103001' ? '正常' : '<font color="red">异常</font>') + '</td>\
			</tr>\
			<tr>\
				<td class="right">警告原因：</td>\
				<td>'+ oo.warnReason + '</td>\
				<td>客户已完成付款，请在xxxx-xx-xx前发货。</td>\
				<td>'+ (oo.warnReason.indexOf('客户已完成付款，请在') != -1 ? '正常' : '<font color="red">异常</font>') + '</td>\
			</tr>\
			<tr>\
				<td class="right">采购单号：</td>\
				<td>'+ oo.PurchaseOrderId + '</td>\
				<td></td>\
				<td>'+ (oo.PurchaseOrderId == '' ? '正常' : '<font color="red">异常</font>') + '</td>\
			</tr>\
			<tr>\
				<td class="right">采购状态：</td>\
				<td>'+ Tool.PurchaseStatus(oo.PurchaseStatus) + '</td>\
				<td>等待采购</td>\
				<td>'+ (oo.PurchaseStatus == 0 ? '正常' : '<font color="red">异常</font>') + '</td>\
			</tr>\
			<tr>\
				<td class="right">采购备注：</td>\
				<td>'+ oo.PurchaseRemark + '</td>\
				<td></td>\
				<td>'+ (oo.PurchaseRemark == '' ? '正常' : '<font color="red">异常</font>') + '</td>\
			</tr>\
			<tr>\
				<td class="right">站内数的条数：</td>\
				<td>'+ oo.msgCount + ' 条</td>\
				<td>0 条</td>\
				<td>'+ (oo.msgCount == 0 ? '正常' : '<font color="red">异常</font>') + '</td>\
			</tr>\
			</tbody>\
			</table>'
            $("#seep1").attr("class", "btn btn-danger");
            Tool.Modal("核对商品前，检测到该订单【异常】", txt, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="Tool.ComparedProduct.a03()" data-bs-dismiss="modal">忽略提示【继续】</button>', 'modal-xl');
        }
    }
})
//     c01: function () {
//         let url = "https://www.dhgate.com/product/-/" + this.obj.Aarr[this.obj.A1 - 1].DHfromid + ".html";
//         //gg.tabs_remove_create_indexOf(2,url,'Specifications<1/><img class="bgFullImg"',true,this.a09,this)//删除后创建再查找(返回网页内容)
//         //gg.getFetch(url,"json",this.c02,this);
//         alert("到了再说")
//     },
//     c02: function (t) {
//         alert(url)
//         if (t.indexOf('id="urlLink" value="') != -1) {
//             this.a07(t);
//         }
//         else {
//             Tool.Modal("需要手动验证", '请【手动验证通过】后，再请点【确定】按扭，自动继续。。。', '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="Tool.ComparedProduct.c01()" data-bs-dismiss="modal">忽略提示【继续】</button>', '');
//         }
//     },
