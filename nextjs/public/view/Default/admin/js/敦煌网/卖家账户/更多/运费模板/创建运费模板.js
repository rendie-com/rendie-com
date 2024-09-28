'use strict';
var fun =
{
    obj:
    {
        A1: 2, A2: 0,
        B1: 1, B2: 0, Barr: [], name: "",
        username: "", password: "", fromid: 0,
        where: ""
    },
    a01: function () {
        let html = Tool.header("创建运费模板...") + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w100 right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">模板进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
        <tr><td class="right">免运费国家：</td><td id="name" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
    </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        Tool.getDHuser(this.a04, this);//获得账号等信息
    },
    a04: function () {
        $("#username").html(this.obj.username);
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(this.a06, this);
    },
    a06: function () {
        let str = '[' + (this.obj.B2 == 0 ? '<@count/>' : 0) + '<r:freight db="sqlite.aliexpress" size=1 page=2>,"<:name/>","<:freightID/>"</r:freight>]'
        Tool.ajax.a01( str, this.obj.B1,this.a07, this);
    },
    a07: function (oo) {
        if (this.obj.B2 == 0) { this.obj.B2 = oo[0]; }
        if (oo[1]) {
            $("#name").html(oo[1]);
            this.obj.Barr = oo[1].split(",")
            this.obj.name = oo[2]
        }
        this.a08();
    },
    a08: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a11);
    },
    a09: function () {
        let o2 = { jsonStr: JSON.stringify(this.b01()) };
        $("#state").html("正在提交。。。");
        let url = "https://seller.dhgate.com/frttemplate/edit/save.do"
        gg.postFetch(url, o2, this.a10, this)
    },
    a10: function (t) {
        if (t.shippingmodelid || t.msg[0] == "模板名称重复") {
            this.obj.B1++;
            this.a06();
        }
        else {
            Tool.pre(["出错", t])
        }


    },
    a11: function () {
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        this.obj.name = "";
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("")
        $("#state").html("正在准备下一个账号...");
        this.obj.username = ""
        this.obj.password = ""
        this.obj.fromid = 0
        this.obj.A1++;
        this.a03();
    },
    b01: function () {
        return {
            "class": "com.dhgate.frttemplate.dto.SupplierShippingmodelDTO",
            "createdate": null,
            "doubleExt1": null,
            "doubleExt2": null,
            "doubleExt3": null,
            "doubleExt4": null,
            "ext1": null,
            "ext2": null,
            "ext3": null,
            "ext4": null,
            "ext5": null,
            "ext6": null,
            "feeTypes": null,
            "isDHPort": null,
            "isdefault": null,
            "modelitems": null,
            "modelname": this.obj.name,
            "modeltype": null,
            "shippingmodelTypeList": [
                this.b02("Cainiao", 216)
            ],
            "shippingmodelid": null,
            "supplierid": null
        }
    },
    b02: function (shippingtypename, countryCount) {
        return {
            "class": "com.dhgate.frttemplate.dto.SupplierShippingmodelTypeDTO",
            "abroadactivityid": null,
            "dhgatediscounttype": null,
            "dispatchport": "001",
            "supportFree": true,
            "supportStd": false,
            "supportWh": false,
            "supportCs": true,
            "supportNoShip": true,
            "shippingmodelOptVOList": [
                {
                    "class": "com.dhgate.frttemplate.dto.SupplierShippingmodelOptDTO",
                    "countryCount": this.obj.Barr.length,
                    "countryidlist": this.obj.Barr.join(","),
                    "displaypricestep": 0,
                    "displaystartprice": 0,
                    "endquantity": 0,
                    "quantitystep": 0,
                    "startquantity": 0,
                    "supportglobal": "0",
                    "sailingdate": 0,
                    "warehouseid": "",
                    "warehouseName": "",
                    "discount": 0,
                    "opttype": 0,
                    "optindex": 0,
                    "shippingtypeid": shippingtypename,
                    "mycountrycodelst": "",
                    "mycountrynamelst": "",
                    "promiseDeliveryTime": "28"
                }
            ],
            "shippingtypeid": shippingtypename,
            "countryCount": countryCount,
            "stCountyCount": 0,
            "wsCountyCount": 0,
            "ctCountyCount": 0,
            "frCountyCount": this.obj.Barr.length,
            "noCountyCount": 0,
            "warehouseid": null,
            "whCountry": "CN",
            "type": "yz"
        }
    },
}
fun.a01();