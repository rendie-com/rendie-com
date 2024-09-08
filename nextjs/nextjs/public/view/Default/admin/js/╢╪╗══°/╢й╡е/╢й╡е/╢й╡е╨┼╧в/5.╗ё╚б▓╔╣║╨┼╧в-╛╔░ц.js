//'use strict';
//Object.assign(Tool, {
//    GetPurchasingInformation:
//    {
//        temp: {}, num: 1, obj: {},
//        //////////////2.获取采购信息///////////////////////////
//        a01: function (obj) {
//            this.obj = obj
//            gg.isRD(this.a02, this);
//        },
//        a02: function () {
//            $("#seep5").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
//            $("#state").html("正在开打【订单列表】页面...");
//            let url = "https://www.aliexpress.com/p/order/index.html"
//            gg.tabs_remove_create_indexOf(2, url, 'align-items: center;">Order ID: ',true, this.a03, this)//删除后创建再查找(返回网页内容)
//        },
//        a03: function (oo) {
//            let t = oo[0]
//            if (t.indexOf("<title>Buy Products Online from China Wholesalers at Aliexpress.com</title>") != -1)//是不是要登陆
//            {
//                $("#state").html("正在【登陆】...");
//                F1.SMTlogin(this.a02, this);
//            }
//            else if (t.indexOf('align-items: center;">Order ID: ') != -1) {
//                this.a04(t);
//            }
//            else {
//                $("#state").html("找不到采购信息。。。"); Tool.at(t)
//            }
//        },
//        a04: function (t) {
//            let arr1, arr2, arr3 = []
//            arr1 = Tool.strRepArr(t, 'center;">Order ID\: (.*?)<span', 1);
//            arr2 = Tool.StrSplits(t, 'Total:', '</span>');
//            $("#state").html("已打开【订单列表】页面...(" + arr1.length + ") " + arr1.join(" , "));
//            if (arr1.length == arr2.length && arr1.length != 0) {
//                for (let i = 0; i < arr1.length; i++) {
//                    arr3.push('<if Fun(Db("sqlite.dhgate","select count(1) from @.order where @.PurchaseOrderId like \'%' + arr1[i] + '%\'","count"))==0>,' + arr1[i] + '</if>')
//                }
//                Tool.ajax.a01("[0" + arr3.join("") + "]", 1, this.a05, this)
//            }
//            else {
//                $("#state").html("已打开【订单列表】页面，但个数不匹配。订单个数：" + arr1.length + "，价格个数：" + arr2.length);
//            }
//        },
//        a05: function (oo) {
//            //oo:为要打开的采购单号
//            if (oo.length == 1) {
//                /////////////////////翻页找采购订单////////////////////////////////////////
//                //this.num++;      
//                //win.WebSetHTML("2","label|Go to page","加载中。。。");
//                //win.WebClick('2', 'a|pageno="'+this.num+'"', this.a04, this);
//                ///////////////////////////////////////////////////////////////
//                let title = "无【采购信息】可获取"
//                $("#state").html(title);
//                $("#seep5").html("*(5)").attr("class", "btn btn-danger");
//                Tool.Modal("提示", title, '<button type="button"  class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '');
//            }
//            else {
//                $("#state").html("已打开【订单列表】页面...");
//                oo.shift();
//                this.temp = { A1: 1, A2: oo.length, Aarr: oo, Purchase: [0, 0, 0, 0, 0], isErr: false, Err: "" }
//                this.a06();
//            }
//        },
//        a06: function () {
//            $("#state").html("正在修改该订单地址...");
//            let str = '{\
//			<r:countrybind db="sqlite.dhgate" where=" where @.addressA=\''+ this.obj._o3.country + " - " + this.obj._o3.province + '\'" size=1>\
//				"Bind2":"<:addressB/>",\
//			</r:countrybind>\
//			<r:countrybind db="sqlite.dhgate" where=" where @.addressA=\''+ this.obj._o3.country + " - " + this.obj._o3.province + " - " + this.obj._o3.city + '\'" size=1>\
//				"Bind3":"<:addressB/>",\
//			</r:countrybind>\
//			<r:country db="sqlite.dhgate" where=" where @.name=\''+ this.obj._o3.country + '\'" size=1>\
//				"callingcode":"[country:callingcode]"\
//			</r:country>\
//			}';
//            Tool.ajax.a01(str, 1, this.a07A, this)
//        },
//        a07A: function (oo) {
//            let str = '{"PurchaseUserName":"<r:buyer db="sqlite.aliexpress" where=" where @.isdefault=1" size=1><:UserName/></r:buyer>"}'
//            Tool.ajax.a01(str, 1, this.a07, this)
//        },
//        a07: function (o1, oo) {
//            this.obj.PurchaseUserName = o1.PurchaseUserName;
//            //////////////////////////////
//            /*
//               let arr=[]
//               if(oo.Bind2)//以前【省/洲】绑定过
//               {
//                   arr=oo.Bind2.split(" - ")
//                   this.obj.o3.province=arr[1];
//                   this.obj.o3.city=this.obj.o3.city;
//               }
//               else if(oo.Bind3)//以前【省/洲】和【城市】绑定过
//               {
//                   arr=oo.Bind3.split(" - ")
//                   this.obj.o3.province=arr[1];
//                   this.obj.o3.city=arr[2];
//               }
//               */
//            if (this.obj._o3.abn) { this.obj.o3.address2 = (this.obj._o3.address2 ? this.obj._o3.address2 + "," : "") + "BN/GST:" + this.obj._o3.abn }
//            if (this.obj.o3.country == "Netherlands(Holland)") { this.obj.o3.country = "Netherlands"; }
//            this.obj.o3.zip = this.obj.o3.zip.toUpperCase();
//            this.a08();
//        },
//        a08: function () {
//            if (this.temp.A1 <= this.temp.A2) {
//                $("#state").html('【' + this.temp.A1 + '/' + this.temp.A2 + '】正在打开【订单详情】页面...');
//                let url = "https://www.aliexpress.com/p/order/detail.html?orderId=" + this.temp.Aarr[this.temp.A1 - 1]
//                gg.tabs_remove_create_indexOf(2, url, 'Order ID',true, this.a0A9, this)//删除后创建再查找(返回网页内容)
//            }
//            else {
//                this.a12();
//            }
//        },
//        a0A9: function () {
//            let code = '$("span.comet-icon-arrowdown").click();$("body").html();'
//            gg.tabs_executeScript_indexOf(2, "js/jquery-3.6.3.min.js", code, "order-detail-info-content has-switch expand-info",true, this.a0B9, this)//运行代码
//        },
//        a0B9: function (oo) {
//            let txt = oo[0]
//            $("#state").html('【' + this.temp.A1 + '/' + this.temp.A2 + '】已打开【订单详情】页面...');
//            if (txt.indexOf(this.temp.Aarr[this.temp.A1 - 1]) != -1)//确认是不是这个订单
//            {
//                let smt = {}, arr1, arr2, isbool = true;
//                smt.picArr = Tool.StrSplits(txt, 'background-image: url(&quot;', '_220x220')//商品图片
//                //"Heather  Kantirakis</div><div>1 7577738193</div><div>3513 Edinburgh drive</div><div data-pl=\"contact_info_address\">Virginia beach, Virginia, United States, 23452</div>"
//                let str = Tool.StrSplits(txt, "<div class=\"contact-info\" data-pl=\"contact_info\">", '<span class="comet-icon comet-icon-arrowup switch-icon">')[0]
//                str = str.replace(" data-pl=\"contact_info_address\"", "")
//                arr1 = str.split("</div><div>")
//                if (arr1.length == 3) {
//                    alert("没点开")
//                    isbool = false;
//                }
//                else if (arr1.length == 4) {
//                    smt.contactPerson = arr1[0]//Contact Name
//                    smt.phone = arr1[1].replace(" ", "-");
//                    let arr3 = arr1[2].split(",")
//                    smt.address = arr3[0];
//                    if (arr3.length > 1) { smt.address2 = Tool.Trim(arr3[1]); }
//                    else { smt.address2 = ""; }
//                    arr2 = arr1[3].split(",")
//                }
//                else {
//                    alert("没测")
//                    isbool = false;
//                    pre(arr1)
//                }
//                if (isbool) {
//                    if (arr2.length == 4) {
//                        //Other, Waikato, New Zealand, 3240
//                        smt.city = Tool.Trim(arr2[0]);
//                        smt.province = Tool.Trim(arr2[1]);
//                        smt.country = Tool.Trim(arr2[2]);
//                        smt.zip = Tool.Trim(arr2[3]);
//                    }
//                    else if (arr2.length == 5) {
//                        //SEGRE,Maine-et-Loire, Other, France, 49500
//                        smt.city = Tool.Trim(arr2[0]);
//                        smt.province = Tool.Trim(arr2[1]);
//                        smt.country = Tool.Trim(arr2[3]);
//                        smt.zip = Tool.Trim(arr2[4]);
//                    }
//                    smt.zip = smt.zip.substr(0, smt.zip.indexOf("<"));
//                    //以下不要
//                    if (smt.city == "Other") {
//                        this.obj.o3.address = this.obj._o3.address + "," + this.obj._o3.city;
//                        this.obj.o3.city = "Other"
//                    }
//                    if (smt.province == "Other") { this.obj.o3.city = this.obj._o3.city + "," + this.obj._o3.province }
//                    $("#state").html('已打开【订单详情】01...');
//                    this.a10(smt, txt)
//                }
//            }
//            else {
//                $("#state").html('【' + this.temp.A1 + '/' + this.temp.A2 + '】不是这个订单...');
//                Tool.at(txt)
//            }
//        },
//        a10: function (smt, txt) {
//            let PriceArr = Tool.StrSplits(txt, '<div class=\"order-price-item\">', '</div>');
//            let Subtotal = this.b03(PriceArr[0]) //PriceArr[0]          表示：Subtotal
//            let Shipping = this.b04(PriceArr[1]) //PriceArr[1]          表示：Shipping
//            let Tax = 0, Total = 0, Discount = 0
//            switch (PriceArr.length) {
//                case 3:
//                    Total = this.b06(PriceArr[2]) //PriceArr[2]          表示：Total
//                    this.a11(Subtotal, Shipping, Tax, Total, Discount, smt)
//                    break;
//                case 4:
//                    Tax = this.b05(PriceArr[2]) //PriceArr[2]            表示：Tax          （当PriceArr[3]有“VAT included”内容时，PriceArr[2]表示Total）
//                    Total = this.b06(PriceArr[3]) //PriceArr[3]          表示：Total
//                    this.a11(Subtotal, Shipping, Tax, Total, Discount, smt)
//                    break;
//                case 5:
//                    Discount = this.b07(PriceArr[2])//PriceArr[2]           表示：Store Discount
//                    Tax = this.b05(PriceArr[3])//PriceArr[3]                表示：Tax 
//                    Total = this.b06(PriceArr[4])//PriceArr[4]              表示：Total 
//                    this.a11(Subtotal, Shipping, Tax, Total, Discount, smt)
//                    break;
//                default: $("#state").html("速卖通已改版，程序终止。"); break;
//            }
//        },
//        a11: function (Subtotal, Shipping, Tax, Total, Discount, smt) {
//            /////////////////////////////////////////////////
//            this.temp.Purchase[0] += smt.picArr.length;
//            this.temp.Purchase[1] += Total//采购金额
//            this.temp.Purchase[2] += Shipping//采购运费
//            this.temp.Purchase[3] += Tax//采购税费
//            this.temp.Purchase[4] += Subtotal//采购商品小计
//            //////////////////////////////////////
//            if (
//                this.obj.o3.contactPerson != smt.contactPerson ||
//                this.obj.o3.address != smt.address ||
//                this.obj.o3.address2 != smt.address2 ||
//                this.obj.o3.city.toLowerCase() != smt.city.toLowerCase() ||
//                this.obj.o3.province.toLowerCase() != smt.province.toLowerCase() ||
//                this.obj.o3.country.toLowerCase() != smt.country.toLowerCase() ||
//                this.obj.o3.zip != smt.zip ||
//                this.obj.o3.phone != smt.phone
//            ) { this.temp.isErr = true; }
//            this.temp.Err += this.b02(smt, Subtotal, Shipping, Tax, Total)
//            $("#state").html('已打开【订单详情】02...');
//            this.temp.A1++;
//            this.a08();
//        },
//        a12: function () {
//            let P1str, P2str, P3str, P4str;
//            ////////////////////////////////////
//            let P1 = ((this.obj.MoneyTotal - this.temp.Purchase[1]) / this.temp.Purchase[1] * 100).toFixed(2)
//            if (P1 < 30 || P1 > 90) { this.temp.isErr = true; P1str = '<font color="red">US $' + this.temp.Purchase[1] + '（' + P1 + '%）</font>'; }
//            else { P1str = 'US $' + this.temp.Purchase[1] + '（' + P1 + '%）'; }
//            ////////////////////////////////
//            let minP2 = parseFloat(this.obj.ChargeDeliver) - 3, maxP2 = minP2 + 6;
//            if (this.temp.Purchase[2] < minP2 || this.temp.Purchase[2] > maxP2) { this.temp.isErr = true; P2str = '<font color="red">US $' + this.temp.Purchase[2].toFixed(2) + '</font>'; }
//            else { P2str = 'US $' + this.temp.Purchase[2].toFixed(2); }
//            ////////////////////////////////////
//            if (this.obj.orderitem.length != this.temp.Purchase[0]) { this.temp.isErr = true; P3str = '<font color="red">' + this.temp.Purchase[0] + '组</font>' }
//            else { P3str = this.temp.Purchase[0] + '组' }
//            ////////////////////////////////////////////////
//            P4str = 'US $' + this.temp.Purchase[3].toFixed(2)
//            if (this.temp.Purchase[3]) {
//                P4str += '（' + (this.temp.Purchase[3] / (this.temp.Purchase[4] + this.temp.Purchase[2]) * 100).toFixed(2) + '%）'
//            }
//            this.temp.Err += '\
//			<tr><th colspan="5">合计</th></tr>\
//			<tr>\
//				<th></th>\
//				<th>敦煌网</th>\
//				<th></th>\
//				<th colspan="2">速卖通</th>\
//			</tr>\
//			<tr>\
//				<td class="right"></td>\
//				<td></td>\
//				<td class="right">商品价格：</td>\
//				<td colspan="2">US $'+ this.temp.Purchase[4].toFixed(2) + '</td>\
//			</tr>\
//			<tr>\
//				<td class="right">运费：</td>\
//				<td>US $'+ this.obj.ChargeDeliver + '（' + this.obj.DeliverType + '）</td>\
//				<td class="right">运费：</td>\
//				<td colspan="2" title="超出±3会提示，否则不会提示。">'+ P2str + '</td>\
//			</tr>\
//			<tr>\
//				<td class="right"></td>\
//				<td></td>\
//				<td class="right">税费：</td>\
//				<td colspan="2">'+ P4str + '</td>\
//			</tr>\
//			<tr>\
//				<td class="right">订单实收：</td>\
//				<td>US $'+ this.obj.MoneyTotal + '</td>\
//				<td class="right">采购成本：</td>\
//				<td colspan="2" title="30%>利润率>90%会提示，否则不会提示。">'+ P1str + '</td>\
//			</tr>\
//			<tr>\
//				<td class="right">商品：</td>\
//				<td>'+ this.obj.orderitem.length + '组</td>\
//				<td class="right">商品：</td>\
//				<td colspan="2">'+ P3str + '</td>\
//			</tr>'
//            this.a13();
//        },
//        a13: function () {
//            if (this.temp.isErr) {
//                let title = "获取采购信息【异常】"
//                $("#state").html(title);
//                $("#seep5").html("*(5)").attr("class", "btn btn-danger");
//                Tool.Modal(title, '<table class="table table-hover mb-0"><tbody>' + this.temp.Err + '</tbody></table>', '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="Tool.GetPurchasingInformation.c01()" data-bs-dismiss="modal">忽略提示【继续】</button>', 'modal-xl');
//            }
//            else { this.c01() }
//        },
//        b01: function () {
//            let PurchaseOrderId = []
//            for (let i = 0; i < this.temp.Aarr.length; i++) {
//                PurchaseOrderId.push(this.temp.Aarr[i])
//            }
//            return '[<r: db="sqlite.dhgate">update @.order set @.PurchaseTime=' + Tool.gettime("") + ',@.PurchaseOrderId=\'' + PurchaseOrderId.join("/") + '\',@.PurchaseCost=' + this.temp.Purchase[1] + ',@.PurchaseStatus=2,@.PurchaseUserName=\'' + this.obj.PurchaseUserName + '\' where @.orderid=\'' + this.obj.orderid + '\'</r:>]'
//        },
//        b02: function (smt, Subtotal, Shipping, Tax, Total) {
//            //////////////////////////////////////////////////////////////////////
//            let dhpic = '', alipic = ''
//            for (let i = 0; i < this.obj.orderitem.length; i++) {
//                dhpic += '<img style="margin:3px;padding:1px;border:1px solid #ccc" src="' + this.obj.orderitem[i].pic + '" height="70">';
//            }
//            for (let i = 0; i < smt.picArr.length; i++) { alipic += '<img style="margin:3px;padding:1px;border:1px solid #ccc" src="' + smt.picArr[i] + '_100x100.jpg" height="70">'; }
//            //////////////////////////////////////////
//            let str = '\
//			<tr class="table-light"><th colspan="5">【'+ this.temp.A1 + '/' + this.temp.A2 + '】采购单号：' + this.temp.Aarr[this.temp.A1 - 1] + '</th></tr>\
//			<tr>\
//				<th></th>\
//				<th>敦煌网地址</th>\
//				<th>修改后地址</th>\
//				<th class="center">对比</th>\
//				<th>通卖通地址</th>\
//			</tr>\
//			<tr>\
//				<td class="right">Contact Name：</td>\
//				<td>'+ this.obj._o3.contactPerson + '</td>\
//				<td>'+ (this.obj._o3.contactPerson == this.obj.o3.contactPerson ? '' : this.obj.o3.contactPerson) + '</td>\
//				<td class="center">'+ (smt.contactPerson == this.obj.o3.contactPerson ? '正确' : '<font color=red>错误</font>') + '</td>\
//				<td>'+ smt.contactPerson + '</td>\
//			</tr>\
//			<tr>\
//				<td class="right">Address Line 1：</td>\
//				<td>'+ this.obj._o3.address + '</td>\
//				<td>'+ (this.obj._o3.address == this.obj.o3.address ? '' : this.obj.o3.address) + '</td>\
//				<td class="center">'+ (smt.address == this.obj.o3.address ? '正确' : '<font color=red>错误</font>') + '</td>\
//				<td>'+ smt.address + '</td>\
//			</tr>\
//			<tr>\
//				<td class="right">Address Line 2：</td>\
//				<td>'+ this.obj._o3.address2 + '</td>\
//				<td>'+ (this.obj._o3.address2 == this.obj.o3.address2 ? '' : this.obj.o3.address2) + '</td>\
//				<td class="center">'+ (smt.address2 == this.obj.o3.address2 ? '正确' : '<font color=red>错误</font>') + '</td>\
//				<td>'+ smt.address2 + '</td>\
//			</tr>\
//			<tr>\
//			<td class="right">city：</td>\
//			<td>'+ this.obj._o3.city + '</td>\
//			<td>'+ (this.obj._o3.city.toLowerCase() == this.obj.o3.city.toLowerCase() ? '' : this.obj.o3.city) + '</td>\
//			<td class="center">'+ (smt.city.toLowerCase() == this.obj.o3.city.toLowerCase() ? '正确' : '<font color=red>错误</font>') + '</td>\
//			<td>'+ smt.city + '</td>\
//			</tr>\
//			<tr>\
//			<td class="right">province/State：</td>\
//			<td>'+ this.obj._o3.province + '</td>\
//			<td>'+ (this.obj._o3.province.toLowerCase() == this.obj.o3.province.toLowerCase() ? '' : this.obj.o3.province) + '</td>\
//			<td class="center">'+ (smt.province == this.obj.o3.province ? '正确' : '<font color=red>错误</font>') + '</td>\
//			<td>'+ smt.province + '</td>\
//			</tr>\
//			<tr>\
//			<td class="right">country：</td>\
//			<td>'+ this.obj._o3.country + '</td>\
//			<td>'+ (this.obj._o3.country.toLowerCase() == this.obj.o3.country.toLowerCase() ? '' : this.obj.o3.country) + '</td>\
//			<td class="center">'+ (smt.country.toLowerCase() == this.obj.o3.country.toLowerCase() ? '正确' : '<font color=red>错误</font>') + '</td>\
//			<td>'+ smt.country + '</td>\
//			</tr>\
//			<tr>\
//			<td class="right">Postal Code：</td>\
//			<td>'+ this.obj._o3.zip + '</td>\
//			<td>'+ (this.obj._o3.zip == this.obj.o3.zip ? '' : this.obj.o3.zip) + '</td>\
//			<td class="center">'+ (smt.zip == this.obj.o3.zip ? '正确' : '<font color=red>错误</font>') + '</td>\
//			<td>'+ smt.zip + '</td>\
//			</tr>\
//			<tr>\
//			<td class="right">Phone Number：</td>\
//			<td>'+ this.obj._o3.phone + '</td>\
//			<td>'+ (this.obj._o3.phone == this.obj.o3.phone ? '' : this.obj.o3.phone) + '</td>\
//			<td class="center">'+ (smt.phone == this.obj.o3.phone ? '正确' : '<font color=red>错误</font>') + '</td>\
//			<td>'+ smt.phone + '</td>\
//			</tr>\
//			<tr>\
//			<td class="right">Vat Number：</td>\
//			<td colspan="4">'+ this.obj._o3.vatNumber + '</td>\
//			</tr>\
//			<tr>\
//			<td class="right">BN/GST：</td>\
//			<td colspan="4">'+ this.obj._o3.abn + '</td>\
//			</tr>\
//			<ul class="Tul Title row">\
//				<td></td>\
//				<td colspan="2">敦煌网</td>\
//				<td colspan="2">速卖通（商品：'+ smt.picArr.length + '组 ）</td>\
//			</tr>\
//			<tr>\
//			<td class="right">图片：</td>\
//			<td  colspan="2">'+ dhpic + '</td>\
//			<td  colspan="2">'+ alipic + '</td>\
//			</tr>\
//			<tr>\
//				<td colspan="5" class="right">商品价格：US $'+ Subtotal.toFixed(2) + '、运费：US $' + Shipping.toFixed(2) + '、税费：US $' + Tax.toFixed(2) + '、小计：US $' + Total.toFixed(2) + '</td>\
//			</tr>'
//            return str;
//        },
//        b03: function (price) {
//            let productSumPrice = Tool.StrSlice(price, '$', '</span>');
//            let Price0 = parseFloat(productSumPrice.replace(/,/g, ""))
//            $("#state").html('采购商品小计（Subtotal）...' + Price0);
//            return Price0
//        },
//        b04: function (shippingPrice) {
//            let Price1;
//            if (shippingPrice.indexOf("Free shipping") != -1) {
//                Price1 = 0;
//                $("#state").html('采购运费（Shipping）：Free shipping');
//            }
//            else {
//                shippingPrice = Tool.StrSlice(shippingPrice, '$', '</span>');
//                Price1 = parseFloat(shippingPrice.replace(/,/g, ""))
//                $("#state").html('采购运费（Shipping）：' + Price1);
//            }
//            return Price1
//        },
//        b05: function (Tax) {
//            let Price2 = 0;
//            let taxPrice = Tool.StrSlice(Tax, '$', '</span>');
//            if (taxPrice) { Price2 = parseFloat(taxPrice.replace(/,/g, "")) }           
//            $("#state").html('采购税费（Tax）：' + Price2);
//            return Price2
//        },
//        b06: function (Total) {           
//            let MoneyTotal = Total.replace(new RegExp("<.*?>", "ig"), "")
//            MoneyTotal = MoneyTotal.split("$")[1]
//            let Price3 = parseFloat(MoneyTotal.replace(/,/g, ""))
//            $("#state").html('采购金额...' + Price3);
//            return Price3
//        },
//        b07: function (str) {
//            let Discount = str.replace(new RegExp("<.*?>", "ig"), "")
//            Discount = Tool.StrSlice(Discount, '$', '&');
//            let Price = parseFloat(Discount.replace(/,/g, ""))
//            $("#state").html('Store Discount：' + Price);
//            return Price
//        },
//        c01: function () {
//            $("#seep5").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>')
//            Tool.ajax.a01(this.b01(), 1, this.c02, this);
//        },
//        c02: function (t) {
//            if (t[0] == null) {
//                $("#seep5").html("*(5)")
//                if (this.obj.Remark) {
//                    $("#state").html("已获得采购信息，【刷新】可以立即查看结果。");
//                    Tool.Modal("提示", "该订单有【买家备注】，需要手动在【速卖通】发送站内信。", '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '');
//                }
//                else { location.reload(); }
//            } else { alert("出错" + t); }
//        },
//        ///////////////////////////////////////////////////////////
//        d01: function (obj) {
//            this.obj = obj
//            gg.isRD(this.d02, this);
//        },
//        d02: function () {
//            $("#seep5").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
//            $("#state").html("正在开打【订单列表】页面...");
//            let url = "https://www.aliexpress.com/p/order/detail.html?spm=a2g0o.order_list.order_list_main.1.21ef1802Qpalj4&orderId=8185785363740596"
//            gg.tabs_remove_create_indexOf(2, url, 'align-items: center;">Order ID: ', true, this.a03, this)//删除后创建再查找(返回网页内容)
//        },
//    }
//})