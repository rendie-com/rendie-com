'use strict';
Object.assign(Tool, {
    addCart: {
        serviceName: "",
        obj:
        {
            A1: 1, A2: 0, Aarr: [],
            countryid: 0,
            orderid: 0
        },
        a01: function (orderid, countryid) {
            this.obj.orderid = orderid;
            this.obj.countryid = countryid;
            gg.isRD(this.a02, this);
        },
        a02: function () {
            $("#seep2").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
            let str = '\
    [\
      {\
				<r:country db="sqlite.dhgate" size=1 where=" where @.upid=\'0\' and @.name=\''+ this.obj.countryid + '\'">\
        	"country":"<:countryid/>",\
				</r:country>\
        <r:buyer db="sqlite.dhgate" size=1 where=" where @.isdefault=1">\
					"PurchaseUserName":"<:UserName/>",\
					"PurchasePassword":"<:password/>"\
        </r:buyer>\
      }\
      <r:orderitem db="sqlite.dhgate" where=" where @.OrderID=\''+ this.obj.orderid + '\'" size=100>,\
      {\
        "AttributeCart":"<:AttributeCart/>",\
        "Amount":<:Amount/>,\
				<r:pro db="sqlite.aliexpress" where=" where @.proid=\'<:proid Fun=Proid($1)/>\'" size=1>\
					"fromid":<:fromid/>,\
					"proid":"<:proid/>",\
					"maxPrice":<:maxPrice f=2/>,\
					"minPrice":<:minPrice f=2/>,\
					"Discount":<:Discount/>,\
					<r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" where=" where @.proid=\'<:proid/>\'" size=1>\
						"aeopAeProductSKUs":<:aeopAeProductSKUs/>,\
					</r:prodes>\
				</r:pro>\
        "proid":"<:proid/>"\
			}\
			</r:orderitem>\
    ]'
            $("#state").html("正在获取订单和采购信息。。。");
            Tool.ajax.a01(str, 1, this.a03, this)
        },
        a03: function (arr) {
            this.obj.Aarr = arr;
            this.obj.A2 = arr.length - 1;
            this.a04();
        },
        a04: function () {
            $("#state").html("正在打开【Home>Account】来确认是否已登陆...");
            let url = "https://www.aliexpress.com/fn/an-account/index"
            gg.getFetch(url,"json", this.a05, this);
        },
        a05: function (oo) {
            if (oo.success == true) {
                $("#state").html("已【登陆】");
                let url = "https://www.aliexpress.com/item/" + this.obj.Aarr[this.obj.A1].fromid + ".html"
                gg.getFetch(url,"json", this.a06A, this);
            }
            else {
                $("#state").html("正在【登陆】...");
                Tool.SMTlogin(this.a06, this);
            }
        },
        a06A: function (t) {
            this.obj._csrf_token_ = Tool.StrSlice(t, "csrfToken: '", "',");
            this.a06()
        },
        a06: function () {
            $("#state").html("正在检查是否有【Ships From】。。。");
            let oo = this.obj.Aarr[this.obj.A1]
            let sku = oo.aeopAeProductSKUs[0], Cart = oo.AttributeCart
            this.obj.Err += '\
    <div class="Tul Title">\
      【'+ this.obj.A1 + '/' + this.obj.A2 + '】<a href="https://www.aliexpress.com/item/' + oo.fromid + '.html" target="_blank">https://www.aliexpress.com/item/' + oo.fromid + '.html</a>\
    </div>'
            if (sku)//
            {
                $("#state").html("正在给【Ships From】加【[ShipsFrom]】。。。");
                for (let i = 0; i < sku.length; i++) {
                    if (sku[i].skuPropertyName == "Ships From") {
                        if (Cart) { Cart += " - [ShipsFrom]"; } else { Cart = "[ShipsFrom]" }
                        break;
                    }
                }
                this.a07(Cart);
            }
            else {
                $("#state").html("1.无购物车属性");
                this.a16();
            }
        },
        a07: function (Cart) {
            $("#state").html("正在去default后，再看有【cart】或无【cart】。。。");
            Cart = Cart.replace(/ - /ig, ",")
            let arr1 = Cart.split(","), arr2 = [];
            for (let i = 0; i < arr1.length; i++)//去掉“default”
            {
                if (Tool.Trim(arr1[i]).toLowerCase() != "default") {
                    arr2.push(arr1[i])
                }
            }
            if (arr2.length == 0) {
                $("#state").html("2.无购物车属性");
                this.a16();
            }
            else {
                $("#state").html("有购物车属性");
                this.obj.Aarr[this.obj.A1].Cart = arr2
                this.a08();
            }
        },
        a08: function () {
            let oo = this.obj.Aarr[this.obj.A1]
            let o1 = oo.aeopAeProductSKUs, o2 = oo.Cart;
            this.obj.Aarr[this.obj.A1].aeopAeProductSKUs = this.b01(o1);//解决出现as pictrue的问题   
            if (o1[0]) {
                if (o1[0].length == o2.length) {
                    if (o2.indexOf("[ShipsFrom]") == -1) {
                        $("#state").html("没【Ships From】");
                        this.obj.ShipsFrom = [{ skuPropertySendGoodsCountryCode: "CN", propertyValueName: "CHINA" }];
                        this.a09();
                    }
                    else {
                        $("#state").html("有【Ships From】");
                        this.d01(o1);
                    }
                }
                else {
                    let err = "俩边购物车属性的个数不同，无法加入购物车。"
                    $("#state").html(err);
                    $("#seep2").html("*(2)").attr("class", "btn btn-danger");
                    Tool.Modal("提示", err, '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '');
                }
            }
            else {
                let err = "【敦煌网】有购物车属性，但是【速卖通】无购物车属性。"
                $("#state").html(err);
                $("#seep2").html("*(2)").attr("class", "btn btn-danger");
                Tool.Modal("加入购物车【异常】", err, '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '');
            }
        },
        a09: function () {
            this.obj.Err += '\
    <ul class="Tul Title row">\
      <li class="w170 center">Ships From<li>\
      <li class="col">Shipping Method</li>\
    </ul>'
            this.a10();
        },
        a10: function ()//获取运费模板
        {
            let oo = this.obj.Aarr[this.obj.A1]
            let URL = "https://www.aliexpress.com/aeglodetailweb/api/logistics/freight?productId=" + oo.fromid + "&count=1&sendGoodsCountry=" + this.obj.ShipsFrom[0].skuPropertySendGoodsCountryCode + "&minPrice=" + oo.minPrice + "&maxPrice=" + oo.maxPrice + "&country=" + this.obj.Aarr[0].country + "&provinceCode=cityCode=&tradeCurrency=USD"//新版
            $("#state").html("正在获取从【" + this.obj.ShipsFrom[0].skuPropertySendGoodsCountryCode + "国】发往【" + this.obj.Aarr[0].country + "国】的【运费模板】。。。<hr/>" + URL);
            Tool.ajax.a01("<.GetHtmlSource(" + URL + ",utf-8)/>", 1, this.a11, this)
        },
        a11: function (oo) {
            let arr = oo.body.freightResult, str = ""
            if (arr) {
                for (let i = 0; i < arr.length; i++) {
                    str += '<option value="' + arr[i].serviceName + '">' + arr[i].company + '（' + arr[i].freightAmount.formatedAmount + ' | ' + arr[i].time + ' days）</option>'
                }
                if (this.obj.ShipsFrom[0].propertyValueName.toUpperCase() == "CHINA")//给初始值
                {
                    ///////注：当有【Ships From】时，一定要有【CHINA】///////////////
                    let cart = this.obj.Aarr[this.obj.A1].Cart;
                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i] == "[ShipsFrom]") { cart[i] = "china"; this.obj.Aarr[this.obj.A1].Cart = cart; break; }
                    }
                }
                /////////////////////////////////////////////////////////////
                if (arr[0].freightAmount.formatedAmount != "US $0.00") { this.obj.isErr = true; }
                //////////////////////////////////////////
                this.obj.Aarr[this.obj.A1].serviceName = arr[0].serviceName//选择的物流
                this.obj.Aarr[this.obj.A1].freightAmount = arr[0].freightAmount.value//物流对应的运费
                //////////////////////////////////////////////////
                let li1 = this.obj.ShipsFrom[0].propertyValueName,
                    li2 = this.obj.ShipsFrom[0].propertyValueName.toUpperCase() == "CHINA" ? ' checked="checked"' : "",
                    li3 = this.obj.Aarr[this.obj.A1].fromid + this.obj.ShipsFrom[0].propertyValueName.replace(/ +/g, "_").toLowerCase()
                this.obj.Err += '\
              <ul class="Tul list-group-item-action row">\
                <li class="w170">\
                  <div class="custom-control custom-radio">\
                    <input type="radio" class="custom-control-input" \
                    value="'+ this.obj.ShipsFrom[0].propertyValueName + '" \
                    '+ li2 + ' name="ShipsFrom_' + this.obj.A1 + '" \
                    id="ShipsFrom_'+ this.obj.A1 + '_' + this.obj.ShipsFrom.length + '">\
                    <label class="custom-control-label" for="ShipsFrom_'+ this.obj.A1 + '_' + this.obj.ShipsFrom.length + '">' + li1 + '</label>\
                  </div>\
                </li>\
                <li class="col">\
                <select class="form-select" id="ShippingMethod'+ li3 + '">' + str + '</select></li>\
              </ul>'
            }
            this.obj.ShipsFrom.shift();
            if (this.obj.ShipsFrom.length == 0) {
                $("#state").html('求【Cart】【skuAmount】【skuAttr】')
                this.a12();
            }
            else {
                this.a11(oo);
            }

        },
        a12: function ()//求【Cart】【skuAmount】【skuAttr】
        {
            let o1 = this.obj.Aarr[this.obj.A1].aeopAeProductSKUs, o2 = this.obj.Aarr[this.obj.A1].Cart;
            $("#state").html("【" + this.obj.A1 + "/" + this.obj.A2 + "】正在找出购物车属性，对应的ID...");
            if (o1[0]) {
                let cart1 = this.b03(o1[0], o2), cart2 = []
                if (cart1.length == o2.length)//俩边购物车，是否还是一样
                {
                    $("#state").html("【" + this.obj.A1 + "/" + this.obj.A2 + "】俩边购物车，已确认还是一样。");
                    for (let i = 0; i < o1[1].length; i++) {

                        cart2 = []
                        for (let j = 0; j < cart1.length; j++) {
                            o1[1][i].skuAttr = o1[1][i].skuAttr.toLowerCase()
                            //skuAttr的格式有【111:222#aa】【111:222】【111:222#aaa;333:444#bbb】
                            if ((";" + o1[1][i].skuAttr + "#").indexOf(";" + cart1[j] + "#") != -1) { cart2.push(true); }
                            else if ((";" + o1[1][i].skuAttr + ";").indexOf(";" + cart1[j] + ";") != -1)//skuAttr的格式有【111:222;333:444】
                            { cart2.push(true); }
                        }
                        if (cart2.length == cart1.length) {
                            this.obj.Aarr[this.obj.A1].Cart = o2;//显示购物车属性，用得上。
                            this.obj.Aarr[this.obj.A1].skuAmount = o1[1][i].skuVal.skuAmount.value;//合计采购成本时，用得上。
                            this.obj.Aarr[this.obj.A1].skuAttr = o1[1][i].skuAttr;//加入购物车，用得上。
                            this.a13();
                            break;
                        }
                    }
                }
                else {
                    let err = "【" + this.obj.A1 + "/" + this.obj.A2 + "】来源已改变...本来要选DH属性：【" + o2 + "】,SMT属性中却没有,所以无法加入购物车。"
                    $("#state").html(err);
                    $("#seep2").html("*(2)").attr("class", "btn btn-danger");
                    $("#state").html("" + err);
                    Tool.Modal("来源已改变", err, '<button type="button"data-bs-dismiss="modal" class="btn btn-secondary">关闭</button><button type="button" class="btn btn-primary" onclick="addCart.a14();" data-bs-dismiss="modal">忽略提示【继续】</button>', '');
                    //Tool.at(JSON.stringify(cart1,null,2));
                }
            }
            else {
                this.obj.Aarr[this.obj.A1].Cart = [];//显示购物车属性，用得上。
                this.obj.Aarr[this.obj.A1].skuAmount = o1[1][0].skuVal.skuAmount.value;//合计采购成本时，用得上。
                this.obj.Aarr[this.obj.A1].skuAttr = o1[1][0].skuAttr;//加入购物车，用得上。      
                this.a13();
            }
        },
        a13: function () {
            let o1 = this.obj.Aarr[this.obj.A1]
            if (!o1.freightAmount) { o1.freightAmount = 0; }
            this.obj.Err += '\
            <ul class="Tul list-group-item-action row">\
              <li class="right w50">属性：</li>\
              <li class="w150">'+ o1.Cart.join(" , ") + '</li>\
              <li class="w50 right">数量：</li>\
              <li class="w30">'+ o1.Amount + '</li>\
              <li class="w50 right">运费：</li>\
              <li class="w70">US $'+ o1.freightAmount.toFixed(2) + '</li>\
              <li class="w50 right">价格：</li>\
              <li class="w150">\
                US $'+ (o1.skuAmount * (100 - o1.Discount) * 0.01).toFixed(2) + '\
                <s style="color:#999;font-size:10px;">US $'+ o1.skuAmount.toFixed(2) + '</s>\
                <span style="background:#fff1f1;padding: 2px 5px;font-size:10px;">-'+ o1.Discount + '%</span>\
              </li>\
              <li class="col right">合计：US $'+ (o1.skuAmount * (100 - o1.Discount) * 0.01 * o1.Amount + o1.freightAmount).toFixed(2) + '</li>\
            </ul>'
            $("#state").html("已经获得【运费模板】。。。");
            this.a14()
        },
        a14: function () {
            this.obj.A1++;
            if (this.obj.A1 <= this.obj.A2) {
                this.a06();
            }
            else {
                this.a15();
            }
        },
        a15: function () {
            if (false)//this.obj.isErr
            {
                let freightAmount = 0, skuAmount = 0, oo = this.obj.Aarr
                /////////////////////////////////////////////////////
                let li1 = 'US $' + this.obj.ChargeDeliver + '（' + this.obj.DeliverType + '）'
                if (this.obj.ChargeDeliver != "0.00") { li1 = '<font color="red">' + li1 + '</font>' }
                //////////////////////////////////////////////////////////
                for (let i = 1; i < oo.length; i++) {
                    freightAmount += oo[i].freightAmount;
                    skuAmount += (oo[i].skuAmount * (100 - oo[i].Discount) * 0.01 * oo[i].Amount) + oo[i].freightAmount;
                }
                let li2 = 'US $' + freightAmount.toFixed(2)
                if (freightAmount != 0) { li2 = '<font color="red">' + li2 + '</font>' }
                ////////////////////////////////////////////////////////
                let aaa = (this.obj.MoneyTotal - skuAmount) / skuAmount * 100
                let err = '\
      <ul class="Tul Title row">\
        <li class="right w70"></li>\
        <li class="col">订单</li>\
        <li class="right w70"></li>\
        <li class="col">采购</li>\
      </ul>\
      <ul class="Tul list-group-item-action row">\
        <li class="right w70">运费：</li>\
        <li class="col">'+ li1 + '</li>\
        <li class="right w70">运费：</li>\
        <li class="col">'+ li2 + '</li>\
      </ul>\
      <ul class="Tul list-group-item-action row">\
        <li class="right w70">实收：</li>\
        <li class="col">US $'+ this.obj.MoneyTotal + '</li>\
        <li class="right w70">成本：</li>\
        <li class="col">US $'+ skuAmount.toFixed(2) + '（' + aaa.toFixed(2) + '%）</li>\
      </ul>\
      <ul class="Tul list-group-item-action row center">\
        <li class="col">city：'+ this.obj.o3.city + '</li>\
        <li class="col">province/State：'+ this.obj.o3.province + '</li>\
        <li class="col">country：'+ this.obj.o3.country + '</li>\
      </ul>'+ this.obj.Err
                let title = "有运费，请选择【Ships From】和【Shipping Method】"
                $("#state").html(title);
                $("#seep2").html("*(2)").attr("class", "btn btn-danger");
                Tool.Modal(title, err, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="addCart.c01();" data-bs-dismiss="modal">继续</button>', 'modal-lg');
            }
            else { this.obj.A1 = 1; this.c02(); }
        },
        a16: function () {
            this.obj.Aarr[this.obj.A1].Cart = []
            this.obj.Aarr[this.obj.A1].skuAttr = ""
            this.obj.ShipsFrom = [{ skuPropertySendGoodsCountryCode: "CN", propertyValueName: "CHINA" }];
            this.a10();
        },
        c02: function () {
            let oo = this.obj.Aarr[this.obj.A1]

            /*
            if(oo.Amount>=2)//注要解决，买的数量大就要运费的问题
            {
                oo.Amount=oo.Amount-4
                if(oo.Amount>0)
                {
                    	
                }
                else
                {this.c03({shopcart_now_num:1})}
            }
            else
            {
                this.c03({shopcart_now_num:1})
            }	
            */

            let url = "https://shoppingcart.aliexpress.com/addToShopcart4Js.htm?callback=Tool.addCart.c03&company=" + oo.serviceName + "&productId=" + oo.fromid + "&quantity=" + oo.Amount + "&skuAttr=" + encodeURIComponent(oo.skuAttr) + "&_csrf_token_=" + this.obj._csrf_token_;
            $("#state").html("【" + this.obj.A1 + "/" + this.obj.A2 + "】正在加入购物车。。。<hr/>" + url);
            $.getScript(url)


        },
        c03: function (oo) {
            if (this.obj.A2 < oo.shopcart_now_num) {
                let err = '购物车商品种类应该是【' + this.obj.A2 + '】但却是【' + oo.shopcart_now_num + '】。'
                $("#state").html(err);
                $("#seep2").html("*(2)").attr("class", "btn btn-danger");
                Tool.Modal("加入购物车异常", err, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="Tool.CopyAddress.a01(fun.obj);" data-bs-dismiss="modal">忽略提示【继续】</button>', '');
            }
            else {
                this.obj.A1++;
                if (this.obj.A1 <= this.obj.A2) { this.c02(); }
                else {
                    $("#seep2").html("*(2)");
                    Tool.CopyAddress.a01(fun.obj);
                }
            }
        },
        d01: function (o1)//打出有多少个国家可发货
        {
            let ShipsFrom = [];
            for (let i = 0; i < o1[0].length; i++) {
                if (o1[0][i].skuPropertyName == "Ships From") {
                    ShipsFrom = o1[0][i].skuPropertyValues;
                    break;
                }
            }
            this.obj.ShipsFrom = JSON.parse(JSON.stringify(ShipsFrom));
            this.d02();
        },
        d02: function () {
            if (this.obj.ShipsFrom.length == 1) {
                let ShipsFrom = "china"
                $("#state").html("有【Ships From】只有个国家,已选择发货国家【" + ShipsFrom + "】");
                let cart = this.obj.Aarr[this.obj.A1].Cart
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i] == "[ShipsFrom]") { cart[i] = ShipsFrom; break; }
                }
                this.obj.Aarr[this.obj.A1].Cart = cart;
            }
            else {
                $("#state").html("有【Ships From】内有多个国家");
            }
            this.a10();
        },
        /*
      c01:function()//提交
        {
        this.obj.A1=1;
        let cart=this.obj.Aarr[this.obj.A1].Cart;
        let ShipsFrom=$("[name='ShipsFrom']:checked").val().toLowerCase()
        for(let i=0;i<cart.length;i++)
        {
          if(cart[i]=="[ShipsFrom]"){cart[i]=ShipsFrom;break;}
        }
        let serviceName=$("#ShippingMethod"+ShipsFrom.replace(/ +/g,"_")).val()
        if(serviceName)
        {
          this.obj.Aarr[this.obj.A1].Cart=cart;
          this.obj.Aarr[this.obj.A1].serviceName=serviceName
          $("#seep2").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>')
          $("#state").html("已选择发货国家【"+ShipsFrom+"】【"+serviceName+"】");
          if(cart.length==0)
          {
            alert("q234qq")
            //this.a13("");
          }
          else
          {
            alert("ewqr1")
            //this.a09();
          }
        }
        else
        {
          $("#seep2").attr("disabled",false);
          $("#state").html("请选择【Shipping Method】。。。serviceName:"+serviceName);
        }
        this.c02();
      },
    
        */
        b01: function (skuobj) {
            ////////////////////【解决出现as pictrue的问题】//////////////////////////////
            let oo = {}, str = '', arr = []
            if (skuobj[0])//不以前上传时有购物车属性，现在没有购物车属性了，才需要这个判断。
            {
                for (let i = 0; i < skuobj[0].length; i++) {
                    arr = skuobj[0][i].skuPropertyValues
                    for (let j = 0; j < arr.length; j++) {
                        if (str.indexOf('|' + arr[j].skuPropertyTips + '|') != -1) { arr[j].skuPropertyTips += "-" + (j + 1) }
                        str += "|" + arr[j].skuPropertyTips + "|"
                    }
                }
            }
            return skuobj
        },
        b02: function (o2) {
            for (let i = 0; i < o2.length; i++) { o2[i] = Tool.Trim(o2[i]); }
            let str01 = o2.join(",");
            str01 = str01.replace(/&lt;/ig, "<");
            str01 = str01.replace("2XL", "XXL");
            str01 = str01.replace(/&gt;/ig, ">");
            str01 = str01.replace("3XL", "XXXL");
            str01 = "," + str01.toLowerCase() + ",";
            ///////////////////////////////////////////
            return str01;
        },
        b03: function (o1, o2) {
            let oo3, cart1 = [], str01 = this.b02(o2), str02;
            for (let i = 0; i < o1.length; i++) {
                oo3 = o1[i].skuPropertyValues;
                for (let j = 0; j < oo3.length; j++) {
                    str02 = oo3[j].skuPropertyTips.toLowerCase();
                    str02 = str02.replace(/ +/ig, " ");
                    str02 = "," + Tool.Trim(str02) + ",";
                    if (str01.indexOf(str02) != -1) {
                        cart1.push(o1[i].skuPropertyId + ":" + oo3[j].propertyValueId); break;
                    }
                    //注意：在上传的敦煌的时后，敦煌会自动将【多个空格】变成一个空格，所以就写上了【.replace(/ +/ig," ")】。
                    //还会去掉左右空格
                }
            }
            return cart1;
        }
    }
})