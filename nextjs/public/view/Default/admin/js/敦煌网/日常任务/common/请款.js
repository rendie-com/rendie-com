'use strict';
let F8 =
{
    next: null, This: null, token: "",
    obj:
    {
        C1: 1, C2: 0, Carr: [],
        D1: 1, D2: 0, Darr: [],
        fromid: 0, token: ""
    },
    token: "",
    a01: function (next, This) {
        this.next = next;
        this.This = This;
        this.a02()
    },
    a02: function () {
        $("#state").html("正在获取运单号。。。");
        //status:		是否请款0--未请款 1--已请款
        let str = '[\
		<@page/>\
		<r:logdeliver db="sqlite.dhgate" where=" where @.shopid='+ this.This.obj.fromid + ' and @.status=0 order by @.id desc" size=10 page=2>,\
			"<:ExpressNumber2 tag=js/>"\
		</r:logdeliver>]'
        Tool.ajax.a01(str, this.obj.C1, this.a03, this)
    },
    a03: function (oo) {
        this.obj.C2 = oo[0];
        this.obj.Carr = oo;
        this.a04();
    },
    a04: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a05, this, this.a08)
    },
    a05: function () {
        let Exp = [], oo = this.obj.Carr;
        for (let i = 1; i < oo.length; i++) {
            if (oo[i]) {
                Exp.push(oo[i].substr(1, oo[i].length - 2).replace(/\//g, ","));//例如：/1234/56/  修改后为：1234,56
            }
        }
        ////////////////////////////////////////////////////
        if (Exp.length == 0) {
            this.a07("");
        }
        else {
            let url = "https://global.cainiao.com/global/detail.json?mailNos=" + Exp.join(",") + "&lang=zh-CN"
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            if (Exp.length > 30) {
                $("#state").html("查询停止，运单号超过30条。");
            }
            else {
                $("#state").html("正在【查询】物流状态...");
                gg.getFetch(url,"json", this.a06, this)
            }
        }

    },
    a06: function (Arr) {
        if (Arr.module) {
            let sql = [], querystate, nodeDesc;
            for (let i = 0; i < Arr.module.length; i++) {
                nodeDesc = Arr.module[i].statusDesc;
                querystate = this.b01(nodeDesc)
                //if (Arr.data[i].mailNo.indexOf("(") != -1)
                //			{
                //				Arr.data[i].mailNo = Arr.data[i].mailNo.substr(0, Arr.data[i].mailNo.indexOf("("))
                //			}
                sql.push('update @.logdeliver set @.querystate=' + querystate + ',@.uptime=' + Tool.gettime("") + ' where @.ExpressNumber2 like \'%/' + Arr.module[i].mailNo + '/%\'')
                if (querystate == -1) { break; }
            }
            if (querystate != -1) {
                $("#state").html("正在【更新】物流状态...");
                let str = '""<r: db="sqlite.dhgate">' + sql.join("<1/>") + '</r:>'
                Tool.ajax.a01(str, 1, this.a07, this)
            }
        }
        else {
            Tool.pre(Arr)
        }
    },
    a07: function (txt) {
        if (txt == "") {
            this.obj.C1++;
            this.a02();
        }
        else { $("#state").text("出错002：" + txt); }
    },
    ///////////////////////////////////////////////////////////////////////
    a08: function () {
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        this.obj.Carr = [];
        $("#C1").css("width", "0%");
        $("#C1,#C2,#url").html("");
        this.a09();
    },
    a09: function () {
        let str = '[\
		{"C2":'+ (this.obj.C2 == 0 ? '<@page/>' : '0') + '}\
		<r:logdeliver db="sqlite.dhgate" size=10 page=2 where=" where @.shopid='+ this.This.obj.fromid + ' and @.queryState=5 and @.status=0">,\
		{\
			"orderid":"<:orderid/>",\
			<r:seller db="sqlite.dhgate" size=1 where=" where @.fromid='+ this.This.obj.fromid + '">\
				"fromid":"<:fromid/>",\
				"token":<:token tag=0/>\
			</r:seller>\
		}\
		</r:logdeliver>\
		]'
        $("#state").html("正在获取【未请款】信息。。。");
        Tool.ajax.a01(str, 1, this.a10, this)
    },
    a10: function (arr) {
        if (this.obj.C2 == 0) { this.obj.C2 = arr[0].C2; }
        arr.shift();
        this.obj.Darr = arr;
        this.obj.D2 = arr.length;
        this.a11();
    },
    a11: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a12, this, this.a20)
    },
    a12: function () {
        Tool.x1x2("D", this.obj.D1, this.obj.D2, this.a13, this, this.a19)
    },
    a13: function ()//请款
    {
        this.obj.fromid = this.obj.Darr[this.obj.D1 - 1].fromid
        this.obj.token = this.obj.Darr[this.obj.D1 - 1].token
        Tool.GetToken(this, this.a14);
    },
    a14: function () {
        $("#state").html("正在查看是否能【请款】。。。");
        let oo = {}
        oo.access_token = this.token
        oo.method = "dh.order.applymoney.check"
        oo.timestamp = new Date().getTime()
        oo.v = "2.0"
        oo.orderNo = this.obj.Darr[this.obj.D1 - 1].orderid
        gg.postFetch("http://api.dhgate.com/dop/router", oo, this.a15, this);
    },
    a15: function (applyobj) {
        let orderNo = this.obj.Darr[this.obj.D1 - 1].orderid
        if (applyobj.canMoneyApply) {
            $("#state").html("正在【请款】。。。");
            let oo = {}
            oo.access_token = this.token
            oo.method = "dh.order.applymoney.get"
            oo.timestamp = new Date().getTime()
            oo.v = "2.0"
            oo.orderNo = orderNo
            gg.postFetch("http://api.dhgate.com/dop/router", oo, this.a16, this);
        }
        else {
            $("#state").html('订单【' + orderNo + '】不能请款...');
            this.a18(orderNo);
        }
    },
    a16: function (obj2) {
        if (obj2.result) {
            let orderNo = this.obj.Darr[this.obj.D1 - 1].orderid
            $("#state").html('<hr/>订单【' + orderNo + '】请款成功。')
            let txt = '<r: db="sqlite.dhgate">update @.order set @.isApplyMoney=1 where @.orderid=\'' + orderNo + '\'<1/>update @.logdeliver set @.Status=1,@.uptime=' + Tool.gettime("") + ' where @.orderid=\'' + orderNo + '\'</r:>'
            Tool.ajax.a01(txt, 1, this.a17, this)
        }
        else { Tool.at("请款失败:" + t) }
    },
    a17: function (t) {
        if (t == "") {
            this.obj.D1++
            this.a12()
        }
        else { Tool.at("出错:" + t); }
    },
    a18: function (orderNo) {
        let txt = '<.Db("sqlite.dhgate","update @.logdeliver set @.Status=2,@.uptime=' + Tool.gettime("") + ' where @.orderid=\'' + orderNo + '\'","execute")/>'//设置为【请款受限】
        Tool.ajax.a01(txt, 1, this.a17, this)
    },
    a19: function (t) {
        if (t == "") {
            this.obj.D1 = 1;
            this.obj.D2 = 0;
            this.obj.Darr = [];
            $("#D1").css("width", "0%");
            $("#D1,#D2").html("");
            this.obj.C1++;
            this.a09();
        }

    },
    a20: function () {
        this.obj.C1 = 1; this.obj.C2 = 0;//下次还要用
        this.obj.Carr = [];
        $("#C1").css("width", "0%");
        $("#C1,#C2,#url").html("");
        this.next.apply(this.This)
    },
    b01: function (val) {
        let querystate = -1
        switch (val) {
            case undefined:
            case "待揽件":
            case "国内快递接收":
            case "Pending delivery":
            case "Packed for picking-up.":
            case "待卖家发货":
            case "等待卖家发货":
            case "已取消":
            case "Pending shipping by the seller":
                querystate = 2;//待揽件
                break;
            case "运输中":
            case "物流商已收到包裹":
            case "包裹已经到达买家所在地，即将派送":
            case "发件国运输中":
            case "离开发件国":
            case "到达目的国":
            case "已揽件":
            case "清关":
            case "包裹已出库":
            case "包裹运输中":
            case "目的国运输中":
            case "目的国清关中":
            case "In transit at destination country":
            case "Your parcel has been picked up.":
            case "Your parcel is in transit":
            case "at destination country,waiting for customs clearance":
            case "Your parcel has left for the destination country.":
                querystate = 3;//运输中
                break;
            case "妥投失败":
            case "包裹退回处理":
            case "包裹退回中":
            case "包裹退回":
            case "已退回":
            case "包裹已销毁":
            case "包裹已退回":
            case "异常":
            case "退回":
            case "Return in progress":
                querystate = 4;//【菜鸟】妥投失败
                break;
            case "包裹已妥投":
            case "妥投":
            case "已妥投":
            case "Delivered":
            case "到达待取":
            case "Your parcel has arrived in the country of destination.":
            case "Your parcel has been successfully delivered.":
                querystate = 5;//【菜鸟】妥投
                break;
            default:
                Tool.at("未知状态：" + val);
        }
        return querystate;
        //querystate = 1;//【菜鸟】查询不到
    }
}