'use strict';
Object.assign(Tool, {
    CopyAddress: {
        obj: {},
        a01: function (obj) {
            this.obj = obj;
            gg.isRD(this.a02, this);
        },
        a02: function () {
            $("#seep3").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
            let str = '\
			{<r:country db="sqlite.dhgate" where=" where @.name='+ Tool.rpsql(this.obj.o3.country) + '" size=1>\
				"countryid":"<:countryid/>",\
				<r:countrybind db="sqlite.dhgate" where=" where @.addressA='+ Tool.rpsql(this.obj.o3.country + " - " + this.obj.o3.province) + '" size=1>\
					"Bind2":"<:addressB/>",\
				</r:countrybind>\
				<r:countrybind db="sqlite.dhgate" where=" where @.addressA='+ Tool.rpsql(this.obj.o3.country + " - " + this.obj.o3.province + " - " + this.obj.o3.city) + '" size=1>\
					"Bind3":"<:addressB/>",\
				</r:countrybind>\
				"callingcode":"<:callingcode/>"\
			</r:country>}';
            $("#state").html("正在查找，是否有绑定的【国家】【省/洲】【城市】...");
            Tool.ajax.a01(str, 1, this.a03A, this)
        },
        a03A: function (obj1) {
            let str = '\
			{\
			<r:country db="sqlite.aliexpress" where=" where @.countryid=\''+ obj1.countryid + '\'" size=1>\
				"countrybindCountryId":"<:countryid/>",\
				"countrybindIsleaf":<:Isleaf/>\
			</r:country>}'
            Tool.ajax.a01(str, 1, this.a03, this, obj1)
        },
        a03: function (oo, obj1) {
            obj1.countrybindCountryId = oo.countrybindCountryId
            obj1.countrybindIsleaf = oo.countrybindIsleaf
            //////////////////////////////////////////////////////
            if (obj1.countrybindCountryId)//国家有没有绑定
            {
                this.obj.o3.CountryId = obj1.countrybindCountryId
                this.obj.o3.callingcode = obj1.callingcode
                if (obj1.countrybindIsleaf == 0)//当前国家【不是】叶子节点
                {
                    let arr = []
                    if (obj1.Bind2)//以前【省/洲】绑定过
                    {
                        arr = obj1.Bind2.split(" - ")
                        this.obj.o3.provinceBind = arr[1];
                        this.obj.o3.cityBind = this.obj.o3.city;
                        this.a04()
                    }
                    else if (obj1.Bind3)//以前【省/洲】和【城市】绑定过
                    {
                        arr = obj1.Bind3.split(" - ")
                        this.obj.o3.provinceBind = arr[1];
                        this.obj.o3.cityBind = arr[2];
                        this.a04()
                    }
                    else {
                        Tool.CopyAddress.bind.a01(obj1.countrybindCountryId, this.obj.o3, this.d01, this)//列出【已绑定国家】下的【省/洲】来绑定。
                    }
                }
                else//当前国家【是】叶子节点
                {
                    this.obj.o3.provinceBind = this.obj.o3.province;
                    this.obj.o3.cityBind = this.obj.o3.city;
                    this.a04();
                }
            }
            else {
                $("#state").html("国家【未绑定】：" + this.obj.o3.country);
            }
        },
        a04: function () {
            $("#state").html("正在打开【地址列表页】。。。");
            let url = "https://www.aliexpress.com/p/address-manage/index.html"
            gg.tabs_remove_create_indexOf(2, url, ">Edit</button>",true, this.a05, this)
        },
        a05: function (t) {
            Tool.ajax.text("/view/Default/admin/js/敦煌网/订单/订单/订单信息/3.复制地址_注入.js", this.a06, this);
        },
        a06: function (t) {
            let obj1 = this.obj.o3;
            obj1.phone = obj1.phone.replace(/\n|\r/g, "")
            if (obj1.phone.indexOf("-") != -1) {
                let arr = obj1.phone.split("-");
                if (obj1.callingcode == arr[0])//俩边相同则修改this.obj1.phone
                { obj1.phone = obj1.phone.substr(arr[0].length + 1); }
            }
            ////////////////////////////////////
            if (obj1.cityBind == "Other") { obj1.address += "," + obj1.city; }//【city】绑定【Other】后【address】的处理
            else if (obj1.provinceBind == "Other") { obj1.cityBind += "," + obj1.province; }//【province】绑定【Other】后【city】的处理
            ///////////////////////////////////////////
            if (obj1.abn != "") { if (obj1.address2 == "") { obj1.address2 = "BN/GST:" + obj1.abn } else { obj1.address2 = obj1.address2 + ",BN/GST:" + obj1.abn } }
            obj1.zip = obj1.zip.toUpperCase();
            ////////////////////////////////////////////////////
            let obj2 = {
                contactPerson: obj1.contactPerson,
                mobileNo: obj1.phone,
                phoneCountry: obj1.callingcode,
                address: obj1.address,
                address2: obj1.address2,
                country: obj1.country,
                province: obj1.provinceBind,
                city: obj1.cityBind,
                zip: obj1.zip,
                cpf: obj1.vatNumber
            }
            gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01(" + JSON.stringify(obj2)+")", "找到就返回",true, this.a07, this)
        },
        a07: function (t) {

        },

        //        a07: function (str) {
        //            $("#state").html("正在检查复制结果。。。")
        //            if (str.indexOf(',"success":true') != -1) {
        //                this.a08();
        //            }
        //            else if (str.indexOf('"system error:not login or not a buyer"') != -1) {
        //                alert("aaaaaa444444444aaaaaaaaa")
        //                //win.WebUrl("2","https://login.aliexpress.com/",this.a03,this);
        //            }
        //            else if (str.indexOf(',"success":false') != -1) {
        //                let oo
        //                str = str.replace("<body>", "").replace("</body>", "")
        //                eval("oo=" + str)
        //                $("#state").html(str);
        //                $("#seep3").html("*(3)").attr("class", "btn btn-danger");
        //                Tool.Modal("复制地址【出错】，请检查原因", "出错信息如下：<br/><pre>" + JSON.stringify(oo, null, 2) + "</pre>", '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="CopyAddress.a08()" data-bs-dismiss="modal">忽略提示【继续】</button>', 'modal-lg');
        //            }
        //            else { alert(str); }
        //        },
        //        a08: function () {
        //            gg.getFetch("https://ilogisticsaddress.aliexpress.com/addressList.htm?spm=a2g0s.9042311.0." + Math.random(),"text", this.a09, this)
        //        },
        //        a09: function (str) {
        //            $("#state").html("正在打开地址页。。。")
        //            let li1, li2, li3, li4, li5, li6, err = ''
        //            this.obj.o3.contactPerson = this.obj.o3.contactPerson.replace(/(^\s*)|(\s*$)/g, "")
        //            this.obj.o3.address = this.obj.o3.address.replace(/(^\s*)|(\s*$)/g, "")
        //            this.obj.o3.address2 = this.obj.o3.address2.replace(/(^\s*)|(\s*$)/g, "")
        //            li1 = Tool.StrSlice(str, '"contactPerson":"', '"').replace(/&#39;/g, "'")
        //            err += '\
        //			<tr>\
        //				<td class="w110 right">Contact Name：</td>\
        //				<td>'+ this.obj.o3.contactPerson + '</td>\
        //				<td>'+ li1 + '</li>\
        //				<td class="w60 center">'+ (li1 == this.obj.o3.contactPerson ? '正常' : '<font color=red>不匹配</font>') + '</td>\
        //			</tr>'
        //            li2 = Tool.StrSlice(str, '"address":"', '",')
        //            err += '\
        //			<tr>\
        //				<td class="right">Address Line 1：</td>\
        //				<td>'+ this.obj.o3.address + '</td>\
        //				<td>'+ li2 + '</td>\
        //				<td class="w60 center">'+ (li2 == this.obj.o3.address ? '正常' : '<font color=red>不匹配</font>') + '</td>\
        //			</tr>'
        //            li3 = Tool.StrSlice(str, '"address2":"', '",')
        //            if (li3) { li3 = li3.replace("&eacute;", "é"); } else { li3 = ""; }
        //            err += '\
        //			<tr>\
        //				<td class="right">Address Line 2：</td>\
        //				<td>'+ this.obj.o3.address2 + '</td>\
        //				<td>'+ li3 + '</td>\
        //				<td class="w60 center">'+ (li3 == this.obj.o3.address2 ? '正常' : '<font color=red>不匹配</font>') + '</td>\
        //			</ul>'
        //            li4 = [Tool.StrSlice(str, '"city":"', '",'), Tool.StrSlice(str, '"province":"', '",'), Tool.StrSlice(str, '"zip":"', '",')]
        //            err += '\
        //			<tr>\
        //				<td class="right">city：</td>\
        //				<td>'+ this.obj.o3.cityBind + '</td>\
        //				<td>'+ li4[0] + '</td>\
        //				<td class="w60 center">'+ (li4[0] == this.obj.o3.cityBind ? '正常' : '<font color=red>不匹配</font>') + '</td>\
        //			</ul>\
        //			<tr>\
        //				<td class="right">province/State：</td>\
        //				<td>'+ this.obj.o3.provinceBind + '</td>\
        //				<td>'+ li4[1] + '</td>\
        //				<td class="w60 center">'+ (li4[1] == this.obj.o3.provinceBind ? '正常' : '<font color=red>不匹配</font>') + '</td>\
        //			</ul>'
        //            li5 = Tool.StrSlice(str, '"countryName":"', '",')
        //            if (li5 == "Cote D&#39;Ivoire") { li5 = "Ivory Coast"; }//修复国家的名称不一样
        //            else if (li5 == "Netherlands") { li5 = "Netherlands(Holland)"; }
        //            else if (li5 == "Reunion") { li5 = "Reunion Island"; }
        //            err += '\
        //			<tr>\
        //				<td class="right">country：</td>\
        //				<td>'+ this.obj.o3.country + '</td>\
        //				<td>'+ li5 + '</td>\
        //				<td class="center">'+ (li5.toLowerCase() == this.obj.o3.country.toLowerCase() ? '正常' : '<font color=red>不匹配</font>') + '</td>\
        //			</tr>\
        //			<tr>\
        //				<td class="right">Postal Code：</td>\
        //				<td>'+ this.obj.o3.zip + '</td>\
        //				<td>'+ li4[2] + '</td>\
        //				<td class="center">'+ (li4[2] == this.obj.o3.zip ? '正常' : '<font color=red>不匹配</font>') + '</td>\
        //			</tr>'
        //            li6 = Tool.StrSlice(str, '"phoneCountry":"', '",') + "-" + Tool.StrSlice(str, '"mobileNo":"', '"')
        //            err += '\
        //			<tr>\
        //				<td class="w110 right">Phone Number：</td>\
        //				<td>'+ this.obj.o3.callingcode + '-' + this.obj.o3.phone + '</td>\
        //				<td>'+ li6 + '</td>\
        //				<td class="center">'+ (li6 == this.obj.o3.callingcode + "-" + this.obj.o3.phone ? '正常' : '<font color=red>不匹配</font>') + '</td>\
        //			</tr>';
        //            if (li1 != this.obj.o3.contactPerson || li2 != this.obj.o3.address || li3 != this.obj.o3.address2 || li4[0].toLowerCase() != this.obj.o3.cityBind.toLowerCase() || li4[1] != this.obj.o3.provinceBind || li5.toLowerCase() != this.obj.o3.country.toLowerCase() || li4[2] != this.obj.o3.zip || li6 != this.obj.o3.callingcode + "-" + this.obj.o3.phone) {
        //                err = '<table class="table table-hover">\
        //				<thead>\
        //					<tr>\
        //						<th class="w150"></th>\
        //						<th>敦煌网地址</th>\
        //						<th>速卖通地址</th>\
        //						<th class="w80 center">检测结果</th>\
        //					</th>\
        //				</thead>\
        //				<tbody>'+ err + '</tbody>\
        //				</table>'
        //                $("#seep3").html("*(3)").attr("class", "btn btn-danger");
        //                Tool.Modal("复制地址【出错】，请检查原因", err, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="Tool.SubmitPayment.a01(fun.obj);" data-bs-dismiss="modal">忽略提示【继续】</button>', 'modal-lg');
        //            }
        //            else {
        //                $("#seep3").html("*(3)")
        //                Tool.SubmitPayment.a01(fun.obj);
        //            }
        //        },
                d01: function (oo) {
                    for (let k in oo) {
                        this.obj.o3[k] = oo[k];
                    }
                    this.a02();
                },
    }
})

//        a06: function (str) {
//
//            /////////////////////////////////////////////////////////////////////////////////
//            let url02 = ""
//            if (obj1.CountryId == "CL")//如果国家是：智利 (Chile)，需要填写【rutNo】
//            {
//                url02 = "&rutNo=" + obj1.zip//给个编码，这里只是让他通过而已。
//            }
//            ///////////////////////////////////////////////////////////
//            let url = "https://ilogisticsaddress.aliexpress.com/ajaxSaveOrUpdateBuyerAddress.htm?\
//_csrf_token_="+ _csrf_token_ + "&\
//id="+ id + "&\
//contactPerson="+ obj1.contactPerson + "\
//&mobileNo="+ obj1.phone + "&\
//phoneCountry="+ obj1.callingcode + "&\
//address="+ encodeURIComponent(obj1.address) + "&\
//address2="+ encodeURIComponent(obj1.address2) + "&\
//country="+ obj1.CountryId + "&\
//province="+ obj1.provinceBind + "&\
//city="+ obj1.cityBind + "&\
//zip="+ obj1.zip + "&\
//cpf="+ obj1.vatNumber + "&\
//selected=true&\
//features=%7B%22ruPassport%22%3A%22taxNumber%22%2C%22locale%22%3A%22en_US%22%7D&\
//shipcompany=CPAM&\
//useLocalAddress=true"+ url02;
//                Tool.pre(url)
//            //gg.getFetch(url,"json", this.a07, this)
//        },