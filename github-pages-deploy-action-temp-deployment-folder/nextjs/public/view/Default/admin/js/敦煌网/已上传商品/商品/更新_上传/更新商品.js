'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,//账户进度
        B1: 1, B2: 0, Barr: [],
    },
    a01: function () {
        let html = Tool.header("更新商品") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
            <tr><td class="w200 right">账号：</td><td id="username" colspan="2"></td></tr>\
            <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
            </tbody>\
            </table>\
            <ul class="makeHtmlTab" id="upDHgateSeep">\
                <li class="hover" onclick="fun.c01($(this),0)">0.准备信息</li>\
                <li onclick="fun.c01($(this),1)">1.基本信息</li>\
                <li onclick="fun.c01($(this),2)">2.销售信息</li>\
                <li onclick="fun.c01($(this),3)">3.内容描述</li>\
                <li onclick="fun.c01($(this),4)">4.包装信息</li>\
                <li onclick="fun.c01($(this),5)">5.设置运费</li>\
                <li onclick="fun.c01($(this),6)">6.其他信息</li>\
                <li onclick="fun.c01($(this),7)">7.隐藏必填信息</li>\
            </ul>\
            <div id="body0"></div>\
            <table class="table align-middle hide" id="body1"></table>\
            <table class="table align-middle hide" id="body2"></table>\
            <table class="table table-hover align-middle hide" id="body3"></table>\
            <table class="table table-hover align-middle hide" id="body4"></table>\
            <table class="table table-hover align-middle hide" id="body5"></table>\
            <table class="table table-hover align-middle hide" id="body6"></table>\
            <div id="body7" class="hide"></div>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        let str = Tool.DH_seller("", "username,password,cookies,fromid,group,shippingModel,afterSaleID", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        this.obj.fromid = oo.fromid;
        this.obj.group = oo.group;
        this.obj.shippingModel = oo.shippingModel;
        this.obj.afterSaleID = oo.afterSaleID;
        $("#username").html(oo.username);
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a06, this);
        //this.a06()
    },
    a06: function () {
        $("#state").html("正在获取已上传商品表信息。。。");
        //BeforeReview     本地商品状态
        //ManualReview  手动审核状态
        // and @.fromid=542411825
        let str = '\
        {\
            <r:proupdhgate db="sqlite.dhgate" size=1 page=2 where=" where @.upUserID='+ this.obj.fromid + ' and @.BeforeReview=0">\
                "proid":"<:proid/>",\
                "ratio":<:ratio/>,\
                "fromid":<:fromid/>,\
                "BeforeReview":<:BeforeReview/>,\
                "ManualReview":<:ManualReview/>,\
                "pic":<:pic tag=0/>,\
                "upGroupId":"<:upGroupId/>",\
            </r:proupdhgate>\
            "count":<@count/>\
        }'
        Tool.ajax.a01(str, 1, this.a07, this);
    },
    a07: function (oo) {
        $("#state").html("已获得商品信息。。。");
        if (oo.count == 0) {
            this.a22();
        }
        else {
            this.obj.B2 = oo.count;
            this.obj.Barr = oo;
            if (oo.ManualReview == 9) {//表示：图片且详情审核通过
                this.a08()
            }
            else {
                this.a20(10, "手动审核状态，没有通过");
            }
        }
    },
    a08: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a22);
    },
    a09: function () {
        $("#state").html("正在获取商品表信息。。。");
        let str = '\
        {\
            <r:pro db="sqlite.aliexpress" where=" where @.proid=\''+ this.obj.Barr.proid + '\'" size=1>\
                "typeenname":"<r:type db="sqlite.aliexpress" where=" where @.fromid=<:type/>" size=1><r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1><:enname/></r:type><:enname/></r:type>",\
                "name":<:name tag=json/>,\
                "keywords":<:keywords tag=json/>,\
                "brand":<:brand tag=json/>,\
                "typepath":<:typepath/>,\
                "unit":"<:unit/>",\
                "id":"<:ID/>",\
                "alifromid":"<:fromid/>",\
                "alishopid":"<:shopid/>",\
                "hide":"<:hide/>",\
                "ShipToUS":<:ShipToUS/>,\
                "ShipToAU":<:ShipToAU/>,\
                "ShipToRU":<:ShipToRU/>,\
                "ShipToCA":<:ShipToCA/>,\
                "ShipToIT":<:ShipToIT/>,\
                "ShipToFR":<:ShipToFR/>,\
                "ShipToSE":<:ShipToSE/>,\
                "ShipToUK":<:ShipToUK/>,\
                "ShipToIN":<:ShipToIN/>,\
                "ShipToDE":<:ShipToDE/>,\
                "ShipToES":<:ShipToES/>,\
                "ShipToBR":<:ShipToBR/>,\
                "ShipToMY":<:ShipToMY/>,\
                "ShipToNL":<:ShipToNL/>,\
                "ShipToIE":<:ShipToIE/>,\
                "description":<:description tag=json/>,\
                <r:typebind size=1 db="sqlite.aliexpress" where=" where @.type=<:type/>">\
    	            "typebind":"<:dhtype/>",\
    	            "dhtypepath":<:dhtypepath tag=0/>,\
    	            "c0_300":<:c0_300/>,\
    	            "c300_1000":<:c300_1000/>,\
    	            "c1000_":<:c1000_/>,\
                </r:typebind>\
                "lotNum":"<:lotNum/>"\
            </r:pro>\
        }'
        Tool.ajax.a01(str, 1, this.a10, this);
    },
    a10: function (oo) {
        if (oo.name) {
            this.obj.Barr.pro = oo;
            this.a11();
        }
        else {
            this.a20(43, "来源数据不存在");
        }
    },
    a11: function () {
        let Barr = this.obj.Barr;
        let arr1 = Tool.country(), arr2 = [];
        for (let i = 0; i < arr1.length; i++) {
            let name = "ShipTo" + arr1[i].id;
            if (Barr.pro[name] == 1) {
                arr2.push(arr1[i].id);
            }
        }
        if (arr2.length == 0) {
            this.a20(4, "没有运费模板，即哪个国家都不去。");
        }
        else {
            this.a12(Barr, arr2);
        }
    },
    a12: function (Barr, arr2) {
        let str = '{\
        <r:prodes db="sqlite.aliexpress_prodes/' + Tool.pronum(Barr.proid,50) + '" where=" where @.proid=\'' + Barr.proid + '\'" size=1>\
            "aeopAeProductSKUs":<:aeopAeProductSKUs/>,\
            "freight":<:freight tag=0/>,\
            "shippingTempId":"<r:freight db="sqlite.aliexpress" where=" where @.name=\''+ arr2.join(",") + '\'" size=1><:freightID/></r:freight>",\
            "HistoryInfo":<:HistoryInfo tag=0/>,\
            "aeopAeProductPropertys":<:aeopAeProductPropertys/>,\
            "DHpic":<:DHpic tag=0/>,\
            "DHattrPic":<:DHattrPic tag=0/>,\
            "DHdesPic":<:DHdesPic tag=0/>,\
            "DHdes":<:DHdes tag=json/>,\
            "des":<:des tag=json/>\
        </r:prodes>}'
        Tool.ajax.a01(str, 1, this.a13, this);
        //<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(Barr.proid,50) + '">update @.prodes set @.DHdesPic=\'[]\' where @.proid=\'' + Barr.proid + '\'</r:>
    },
    a13: function (oo) {
        this.obj.Barr.prodes = oo;
        if (this.obj.Barr.pro.typebind) {
            $("#state").html("正在获得绑定信息");
            let str = this.b03(this.obj.Barr.pro.typebind)
            Tool.ajax.a01(str, 1, this.a14, this);
        }
        else {
            //Tool.pre(["没有绑定分类", this.obj.Barr]);
            this.a20(17, "没有绑定分类");
        }
    },
    a14: function (DHattr) {
        let Barr = this.obj.Barr;
        //问：为什么不从左到右顺序执行？
        //答：因为第一步有个“产品规格”是跟价格相关，所以必须算出价格，才知道绑定的“产品规格”是什么样子。
        if (Barr.prodes.aeopAeProductSKUs.length == 2) {
            this.a20(3, "来源价格，格式错误，因为是老价格。");
        }
        else {
           let AliexpressSKU = Tool.getAliexpressSKU.a01(Barr.prodes.aeopAeProductSKUs,
                Barr.pro.alifromid,
                Barr.fromid,
                Barr.pro.typepath,
                Barr.pro.dhtypepath,
                Barr.ratio,
                Barr.prodes.HistoryInfo)//把速卖通的价格，做成“二维表格”
            if (AliexpressSKU.err) {
                this.a20(AliexpressSKU.BeforeReview, AliexpressSKU.err);
            }
            else {
                let BindDHgateSKU = Tool.AliexpressSKUtoDHgateSKU.a01(DHattr, AliexpressSKU, Barr.prodes.freight, Barr.ratio, Barr.prodes.DHattrPic, Barr.prodes.HistoryInfo)//转换成敦煌网的“二维表格”
                if (BindDHgateSKU.err) {
                    this.a20(BindDHgateSKU.BeforeReview, BindDHgateSKU.err);
                }
                else {
                    this.a15(BindDHgateSKU, DHattr, Barr)
                }
            }
        }
    },
    a15: function (BindDHgateSKU, DHattr, Barr) {
        let postData = this.b01();
        let productname_keywords = Tool.upDHgateSeep1.productname_keywords.a01(Barr.pro.name, Barr.pro.keywords, Barr.pro.typeenname, Barr.pro.brand)
        postData = postData.concat(productname_keywords);
        let sku0 = [];
        for (let k in BindDHgateSKU) {
            sku0 = BindDHgateSKU[k][0];
            break;
        }
        let arr1 = Tool.upDHgateSeep1.attrlist.a01(DHattr, Barr.prodes.aeopAeProductPropertys, sku0, Barr.pro.name + " " + Barr.pro.keywords + " " + Barr.pro.typeenname)
        //arr1[0]       产品基本属性
        //arr1[1]       自定义属性，超出的属性放到详情中去
        //arr1[2]       购买时，必选属性
        postData = postData.concat(arr1[0]);
        let specselfDef = Tool.upDHgateSeep1.specselfDef.a01(sku0, arr1[2])
        postData = postData.concat(specselfDef);
        postData = postData.concat(Tool.upDHgateSeep1.chooseCustomized());
        this.a16(BindDHgateSKU, Barr, postData, arr1[2], arr1[1]);
    },
    a16: function (BindDHgateSKU, Barr, postData, NewBuyAttr, attrDes) {
        let sortby_packquantity_measureid = Tool.upDHgateSeep2.sortby_packquantity_measureid(Barr.pro.unit, Barr.pro.lotNum)//单位；销售方式；备货状态；库存扣减方式；备货地；备货期；产品价格区间；
        postData = postData.concat(sortby_packquantity_measureid);
        let proSkuInfo_shiptoSkuInfo = Tool.upDHgateSeep2.proSkuInfo_shiptoSkuInfo.a01(BindDHgateSKU,
            Barr.pro.unit,
            Barr.proid,
            Barr.pro.c0_300,
            Barr.pro.c300_1000,
            Barr.pro.c1000_,
            Barr.ratio,
            NewBuyAttr);
        postData = postData.concat(proSkuInfo_shiptoSkuInfo);
        this.a17(Barr, postData, attrDes)
    },
    a17: function (Barr, postData, attrDes) {
        if (Barr.prodes.DHpic == 0) Barr.prodes.DHpic = [];
        if (Barr.prodes.DHattrPic == 0) Barr.prodes.DHattrPic = [];
        if (Barr.prodes.DHdesPic == 0) Barr.prodes.DHdesPic = [];
        /////////////////////////////////////////////
        let upDHgateSeep3 = Tool.upDHgateSeep3.a01(Barr.prodes.DHpic,
            Barr.prodes.DHattrPic,
            Barr.prodes.DHdesPic,
            Barr.pic,
            this.obj.group,
            Barr.prodes.DHdes,
            Barr.pro.description,
            Barr.proid,
            Barr.fromid,
            Barr.pro.name,
            attrDes,
            Barr.pro.brand);
        postData = postData.concat(upDHgateSeep3);
        let upDHgateSeep4 = Tool.upDHgateSeep4.a01();
        postData = postData.concat(upDHgateSeep4);
        let upDHgateSeep5 = Tool.upDHgateSeep5.a01(this.obj.shippingModel, Barr.prodes.shippingTempId);
        postData = postData.concat(upDHgateSeep5);
        let upDHgateSeep6 = Tool.upDHgateSeep6.a01(this.obj.afterSaleID);
        postData = postData.concat(upDHgateSeep6);
        let upDHgateSeep7 = Tool.upDHgateSeep7.a01(Barr.fromid, Barr.pro.typebind);
        postData = postData.concat(upDHgateSeep7);
        gg.postFetch("http://seller.dhgate.com/syi/save.do", Tool.postData(postData), this.a18, this);
    },
    a18: function (t) {
        if (t.code == 403) {
            this.a20(45, "403错误，手动去敦煌网改，也改不了。");
        }
        else if (t.indexOf("详细描述改变") != -1 || t.indexOf('\"isAuditQueue\":null,\"sourcetype\":null,\"type\":\"syi\"') != -1) {
            this.a19(t);
        }
        else if (t.indexOf("只可以删除！") != -1) {
            this.a20(33, "侵权产品，不可以做修改操作，只可以删除！");
        }
        else if (t.indexOf("请确认当前的产品是否是当前用户的") != -1) {
            this.a20(46, "操作失败，请确认当前的产品是否是当前用户的。");
        }
        else if (t.indexOf("产品首图不能重复，请选择其他的图作为产品首图！") != -1) {
            this.a20(24, "产品首图不能重复，请选择其他的图作为产品首图！");
        }
        else if (t.indexOf("产品标题内容不符合平台产品信息发布规范，请核实并修改。") != -1) {
            this.a20(18, "产品标题内容不符合平台产品信息发布规范，请核实并修改。");
        }
        else if (t.indexOf("您无当前类目发布产品权限，请先进行经营品类绑定！") != -1) {
            this.a20(32, "您无当前类目发布产品权限，请先进行经营品类绑定！");
        }
        else if (t.indexOf("产品价格至少有一个可销售") != -1) {
            this.a20(49, "产品价格至少有一个可销售");
        }
        else if (t.indexOf("产品关键词内容不符合平台产品信息发布规范，请核实并修改。") != -1) {
            this.a20(11, "产品关键词内容不符合平台产品信息发布规范，请核实并修改。");
        }
        else if (t.indexOf("无效治理商品不可编辑上架") != -1) {
            this.a20(15, "无效治理商品不可编辑上架");
        }
        else if (t.indexOf("尺码模板信息不能为空！") != -1) {
            this.a20(50, "尺码模板信息不能为空！");
        }
        else if (t.indexOf("的产品完全重复，请修改后再上传产品") != -1) {
            this.a20(20, "的产品完全重复，请修改后再上传产品");
        }
        else if (t.indexOf("产品类目输入不合法，行业准入特别类目限制") != -1) {
            this.a20(47, "产品类目输入不合法，行业准入特别类目限制");
        }
        else if (t.indexOf("产品标题不能包含有") != -1) {
            this.a20(35, "产品标题不能包含有");
        }
        else if (t.indexOf("卖点&特性不能包含有") != -1) {
            this.a20(21, "卖点&特性不能包含有");
        }
        else if (t.indexOf("产品标题中包含堆砌词组") != -1) {
            this.a20(19, "产品标题中包含堆砌词组");
        }
        else if (t.indexOf("产品图片最小上传数量不足3张") != -1) {
            this.a20(34, "产品图片最小上传数量不足3张");
        }
        else if (t.indexOf("最低价格限制") != -1) {
            this.a20(7, "产品零售价格或批发区间价格不可低于该类目最低价格限制US 1$。");
        }
        else if (t.indexOf("重复铺货不可编辑上架") != -1) {
            this.a20(8, "重复铺货不可编辑上架");
        }
        else if (t.indexOf("您当前处于{0}的处罚期间，不允许进行此操作") != -1) {
            this.a23(2, "您当前处于{0}的处罚期间，不允许进行此操作", this.obj.fromid);
        }
        else if (t.indexOf("locale 'zh_CN'.") != -1) {
            this.a20(12, "org.springframework.context.NoSuchMessageException: No message found under code 'error.shipto.invalid.originSkuId' for locale 'zh_CN'.");
        }
        else if (t.indexOf("发布类目不正确，请重新选择类目") != -1) {
            this.a20(32, "发布类目不正确，请重新选择类目");
        }
        else if (t.indexOf("商品自定义规格图片地址") != -1) {
            this.a20(13, "商品自定义规格图片地址");
        }
        else if (t.indexOf("我的摘要</title>") != -1) {
            this.a20(13, "我的摘要</title>");
        }
        else if (t.indexOf("上传了自定义属性属性，但没有属性值") != -1) {
            this.a20(14, "上传了自定义属性属性，但没有属性值");
        }
        else if (t.indexOf("所选产品规格值与产品销售信息-价格列表展示内容不一致，请更改产品规格和自定义规格信息。") != -1) {
            this.a20(27, "所选产品规格值与产品销售信息-价格列表展示内容不一致，请更改产品规格和自定义规格信息。");
        }
        else if (t.indexOf("填写属性[Other]禁止上传，请修改。") != -1) {
            this.a20(13, "填写属性[Other]禁止上传，请修改。");
        }
        else if (t.indexOf("属性不能添加已有属性值") != -1) {
            this.a20(29, "属性不能添加已有属性值");
        }
        else if (t.indexOf("请填写产品的") != -1) {
            this.a20(31, "请填写产品的");
        }
        else if (t.indexOf("重复上传") != -1) {
            this.a20(36, "重复上传");
        }
        else if (t.indexOf("属性选择不正确") != -1) {
            this.a20(37, "属性选择不正确");
        }
        else if (t.indexOf("属性中的自定义属性值") != -1) {
            this.a20(38, "属性中的自定义属性值");
        }
        else if (t.indexOf("产品存在非法属性") != -1) {
            this.a20(39, "产品存在非法属性");
        }
        else if (t.indexOf("产品详细描述上传不成功！") != -1) {
            Tool.Time("reload", 1000, this.a03, this)
        }
        //
        //else if (t.indexOf("上传了自定义属性属性，但没有属性值") != -1) {
        //    this.a23(12, "上传了自定义属性属性，但没有属性值", this.obj.fromid);
        //}
        else {
            //this.a23(12, "发xxxxxxxxxxxxxx", this.obj.fromid);
            Tool.at("更新出错：\n\n" + t);
        }
    },
    a19: function (t) {
        let itemcode = Tool.StrSlice(t, '"itemcode":', ",");
        if (itemcode == this.obj.Barr.fromid) {
            this.a20(1, "");
        }
        else {
            Tool.at("商品编码不对：" + itemcode + "------\n" + t);
        }
    },
    a20: function (BeforeReview, err) {
        let update = 'update @.proupdhgate set @.uptime=' + Tool.gettime("") + ',@.BeforeReview=' + BeforeReview + ',@.err=' + Tool.rpsql(err) + ' where @.fromid=' + this.obj.Barr.fromid;
        Tool.ajax.a01('""<r: db="sqlite.dhgate">' + update + '</r:>', 1, this.a21, this);
    },
    a21: function (t) {
        if (t == "") {
            this.obj.B2 = 0;
            this.obj.Barr = [];
            this.a06();
        }
        else {
            Tool.at("更新出错：\n" + t);
        }
    },
    a22: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").css("width", "0%");
        $("#B1,#B2,#body0,#body1,#body2,#body3,#body4,#body5,#body6,#body7").html("");
        this.a03();
    },
    a23: function (BeforeReview, err, upUserID) {
        let update = 'update @.proupdhgate set @.BeforeReview=' + BeforeReview + ',@.err=' + Tool.rpsql(err) + ' where @.upUserID=' + upUserID;
        Tool.ajax.a01('""<r: db="sqlite.aliexpress">' + update + '</r:>', 1, this.a21, this);
    },
    b01: function (arr) {


        return [
            //{
            //    "name": "specselfDef",
            //    "value": "[{\"attrvalName\":\"Lure with hooks A - 10g\",\"attrId\":9999,\"attrValId\":\"1000\",\"picUrl\":\"f3/albu/ry/g/16/f658c805-5c89-40a5-9b11-c8012372573b.jpg\"},{\"attrvalName\":\"Lure with hooks A - 20g\",\"attrId\":9999,\"attrValId\":\"1001\",\"picUrl\":\"f3/albu/ry/g/16/f658c805-5c89-40a5-9b11-c8012372573b.jpg\"},{\"attrvalName\":\"Lure with hooks A - 30g\",\"attrId\":9999,\"attrValId\":\"1002\",\"picUrl\":\"f3/albu/ry/g/16/f658c805-5c89-40a5-9b11-c8012372573b.jpg\"},{\"attrvalName\":\"Lure with hooks A - 40g\",\"attrId\":9999,\"attrValId\":\"1003\",\"picUrl\":\"f3/albu/ry/g/16/f658c805-5c89-40a5-9b11-c8012372573b.jpg\"},{\"attrvalName\":\"Lure with hooks B - 10g\",\"attrId\":9999,\"attrValId\":\"1004\",\"picUrl\":\"f3/albu/ry/g/16/4b6a442d-7e73-4265-a615-1373ce958e37.jpg\"},{\"attrvalName\":\"Lure with hooks B - 20g\",\"attrId\":9999,\"attrValId\":\"1005\",\"picUrl\":\"f3/albu/ry/g/16/4b6a442d-7e73-4265-a615-1373ce958e37.jpg\"},{\"attrvalName\":\"Lure with hooks B - 30g\",\"attrId\":9999,\"attrValId\":\"1006\",\"picUrl\":\"f3/albu/ry/g/16/4b6a442d-7e73-4265-a615-1373ce958e37.jpg\"},{\"attrvalName\":\"Lure with hooks B - 40g\",\"attrId\":9999,\"attrValId\":\"1007\",\"picUrl\":\"f3/albu/ry/g/16/4b6a442d-7e73-4265-a615-1373ce958e37.jpg\"},{\"attrvalName\":\"Lure with hooks C - 10g\",\"attrId\":9999,\"attrValId\":\"1008\",\"picUrl\":\"f3/albu/ry/g/16/46f69a1d-58cc-4d3e-8bda-e4cd4382264f.jpg\"},{\"attrvalName\":\"Lure with hooks C - 20g\",\"attrId\":9999,\"attrValId\":\"1009\",\"picUrl\":\"f3/albu/ry/g/16/46f69a1d-58cc-4d3e-8bda-e4cd4382264f.jpg\"},{\"attrvalName\":\"1\",\"attrId\":9999,\"attrValId\":\"1010\",\"picUrl\":\"\"},{\"attrvalName\":\"2\",\"attrId\":9999,\"attrValId\":\"1011\",\"picUrl\":\"\"},{\"attrvalName\":\"3\",\"attrId\":9999,\"attrValId\":\"1012\",\"picUrl\":\"\"},{\"attrvalName\":\"4\",\"attrId\":9999,\"attrValId\":\"1013\",\"picUrl\":\"\"},{\"attrvalName\":\"5\",\"attrId\":9999,\"attrValId\":\"1014\",\"picUrl\":\"\"},{\"attrvalName\":\"6\",\"attrId\":9999,\"attrValId\":\"1015\",\"picUrl\":\"\"},{\"attrvalName\":\"7\",\"attrId\":9999,\"attrValId\":\"1016\",\"picUrl\":\"\"},{\"attrvalName\":\"8\",\"attrId\":9999,\"attrValId\":\"1017\",\"picUrl\":\"\"},{\"attrvalName\":\"9\",\"attrId\":9999,\"attrValId\":\"1018\",\"picUrl\":\"\"},{\"attrvalName\":\"10\",\"attrId\":9999,\"attrValId\":\"1019\",\"picUrl\":\"\"}]"
            //},
            //{
            //    "name": "proSkuInfo",
            //    "value": "{\"prodInvenLocationList\":[{\"class\":\"###\",\"inventoryLocation\":\"CN\",\"leadingTime\":\"4\"}],\"skuInfoList\":[{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1000\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-57\",\"id\":\"9999_1000A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1004\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-60\",\"id\":\"9999_1004A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1008\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-55\",\"id\":\"9999_1008A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1001\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-6\",\"id\":\"9999_1001A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1005\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-2\",\"id\":\"9999_1005A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1009\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-4\",\"id\":\"9999_1009A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1002\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-5\",\"id\":\"9999_1002A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1006\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-9\",\"id\":\"9999_1006A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1003\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-1\",\"id\":\"9999_1003A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1007\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"R962945-3\",\"id\":\"9999_1007A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1010\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1010A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1011\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1011A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1012\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1012A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1013\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1013A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1014\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1014A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1015\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1015A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1016\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1016A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1017\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1017A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1018\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1018A8888_CN\"},{\"class\":\"#\",\"attrList\":[{\"attrId\":\"9999\",\"attrVid\":\"1019\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"12\",\"stock\":\"12\",\"skuCode\":\"\",\"id\":\"9999_1019A8888_CN\"}]}"
            //},
            //{
            //    "name": "attrlist",
            //    "value": "[{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1157302,\"attrName\":\"BRAND\",\"isbrand\":\"1\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]},{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1157303,\"attrName\":\"Material \",\"isbrand\":\"0\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"Not filled\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]},{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1157304,\"attrName\":\"Shape\",\"isbrand\":\"0\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"Not filled\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]},{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1157305,\"attrName\":\"Type\",\"isbrand\":\"0\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"Sinking Pencil Bait\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]},{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":11,\"attrName\":\"\",\"isbrand\":\"0\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"Mainland China\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\",\"attrId\":11,\"attrName\":\"Origin\"},{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"LURE\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\",\"attrId\":11,\"attrName\":\"Category\"},{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"Jig HardBait\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\",\"attrId\":11,\"attrName\":\"Model Number\"},{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"1 pcs\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\",\"attrId\":11,\"attrName\":\"Quantity\"}]}]"
            //},

        ]
    },
    b03: function (typebind) {
        return '[0\
        <r:attr db="sqlite.dhgate" where=" where @.cateId=\''+ typebind + '\' order by @.sort,@.id asc" size=40>,\
		    {\
          "name":"<:name tag=js/>",\
          "nameCn":"<:nameCn tag=js/>",\
          "required":"<:required/>",\
          "isother":"<:isother/>",\
          "defined":"<:defined/>",\
          "buyAttr":"<:buyAttr/>",\
          "ischild":"<:ischild/>",\
          "attrId":<:attrId/>,\
          "type":"<:type/>",\
          "js":<:js/>\
        }\
        </r:attr>]'
        //attr.name      属性英文名
        //attr.nameCn  	 属性中文名
        //attr.required  是否必填
        //attr.isother   是否有other属性值
        //attr.defined   属性的属性值是否可以自定义修改
        //attr.buyAttr   是否购买属性（购买时，必选项）
        //attr.ischild   是否子属性（好加事件）
        //attr.attrId    属性ID
        //attr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
        //attr.js    	   js代码
    },
    c01: function (This, val) {
        $("#upDHgateSeep li").removeAttr('class');
        This.attr("class", "hover")
        for (let i = 0; i < 8; i++) {
            if (i == val) {
                $("#body" + i).show();
            }
            else {
                $("#body" + i).hide();
            }
        }
    },
}
fun.a01();