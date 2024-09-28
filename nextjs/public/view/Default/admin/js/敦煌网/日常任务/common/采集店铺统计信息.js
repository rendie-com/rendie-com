'use strict';
let F10 =
{
    next: null, This: null,
    obj: { A1: 1, A2: 0 },
    a01: function (next, This) {
        $("#taskDes").html("采集店铺统计信息");
        this.next = next;
        this.This = This;
        this.a02()
    },
    a02: function (t) {
        let timeA = new Date(new Date().getTime() - 1000 * 60 * 60 * 48 * 7), timeB = new Date()
        let url = "http://seller.dhgate.com/wisdom/store/searchStoreOverviewTrendRecently.do?storeOverviewTrendReqParam=%7B%22startdatestr%22%3A%22" + Tool.userDate13(timeA, "-") + "%22%2C%22enddatestr%22%3A%22" + Tool.userDate13(timeB, "-") + "%22%2C%22platformId%22%3A%22ALL%22%2C%22searchDateType%22%3A%221%22%7D"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在打开【商铺详细数据】（7天）。。。");
        gg.getFetch(url,"json", this.a03, this)
    },
    a03: function (arr1) {
        this.obj.arr1 = arr1.storeOverviewTrendResp.data
        $("#state").html("正在打开【服务能力分】。");
        let url = "http://seller.dhgate.com/mydh/ajaxShopService.do"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a04, this)//服务能力分

        /*if(str.indexOf('<title>502 Bad Gateway</title>')!=-1)//进不去
    {
            alert("aaaaaaaaaaaaaaaaaaaaaa")
      //Tool.Time(this.a06,1000,this,"1");
    }
    else
    {
    }*/
    },
    a04: function (arr1) {
        $("#state").html("正在打开【交易】。");
        this.obj.arr2 = arr1.todayServicePoints
        let url = "http://seller.dhgate.com/mycenter/ajax.do?act=getOrderInfo&isblank=true"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a05, this);//交易 
    },
    a05: function (arr1) {
        $("#state").html("正在打开【物流标准】。");
        this.obj.arr3 = arr1.dispute
        if (this.obj.arr3 == undefined) { this.obj.arr3 = 0; }
        let url = "https://seller.dhgate.com/logistics/stat/icview.do?icid=t0"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a06, this)
    },
    a06: function (t) {
        //等级标准	优秀	良好	合格	待改善   无
        $("#state").html("正在打开【处罚管理】。");
        this.obj.arr4 = Tool.StrSlice(t, '"score":"', '"');
        if (this.obj.arr4 == "") { this.obj.arr4 = 4; }
        let url = "http://seller.dhgate.com/punish/punishManage/getPunishInfo.do?dhpath=10009,32&type=1#GZ-CF-1"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a07, this)//处罚管理 
    },
    a07: function (str) {
        $("#state").html("已打开【处罚管理】")
        if (str.indexOf("处罚详情</div>") != -1) {
            //一般违规				严重违规				知识产权禁限售(第三方投诉)
            let arr = Tool.StrSplits(str, '<span class="text-type2"><b class="orange-text">', "</b>");
            if (arr.length == 2) {
                //this.obj.arr5=[arr[0],arr[1],arr[2]]
                this.obj.arr5 = [arr[0], arr[1], 0]
                $("#state").html('正在进"管理产品"页面。。。');
                let url = "http://seller.dhgate.com/prodmanage/shelf/prodShelf.do?dhpath=10001,21001,0202"
                $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
                gg.getFetch(url,"json", this.a08, this)//管理产品 
            }
            else { alert("找不到处罚详情-可能已改版"); }
        }
        else if (str.indexOf('<title>登录') != -1)//进不去
        {
            alert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssss")
            $("#state").html("进不去...");
            //win.WebUrl("2","http://seller.dhgate.com/punish/punishManage/getPunishInfo.do?dhpath=10009,32&type=1#GZ-CF-1",this.a08,this);//处罚管理
        }
        else { $("#state").text("出错01：" + str); }
    },
    a08: function (str) {
        if (str.indexOf("您的店铺商品数量上限为") != -1) {
            let str2 = Tool.StrSlice(str, '<div class="rtab-warp" id="newGuideTarget2">', '</ul>');
            let num1 = Tool.Trim(Tool.StrSlice(str2, '已上架<b>', '</b>').replace(",", ""));
            this.obj.arr6 = num1;
            this.a09()
        }
        else if (str.indexOf("<title>错误页面 </title>") != -1) {
            let url = "http://seller.dhgate.com/prodmanage/shelf/prodShelf.do?dhpath=10001,21001,0202"
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.a08, this)
        }
        else if (str.indexOf("<title> 我的摘要</title>") != -1)//要进"上架的产品"页面，但进不去
        {
            $("#state").html('【管理产品】页面，进不去。。。');
            this.obj.arr6 = 0;
            this.a09()
        }
        else { $("#state").text("出错02：" + str); }
    },
    a09: function () {
        let sql = "", insertL = "", insertR = "", arr2 = [], select1 = "", update1, arr1 = this.obj.arr1, arr3 = [], arr4 = [];
        for (let i = 0; i < arr1.length; i++) {
            arr2 = arr1[i]
            arr2.statDate = arr2.statDate.split("T")[0]
            arr2.visitConfirmRate = arr2.visitConfirmRate * 100

            //Exposure            arr2.searchExpoCnt    曝光量
            //Browse              arr2.visitStoreCnt    浏览量
            //visitors            arr2.storeVisitorNum  访客数
            //money               arr2.confirmAmount    成交金额
            //OrderNum            arr2.confirmOrders    订单数
            //ConversionRate      arr2.visitConfirmRate 转化率(100.00%)

            //ServiceCapability   this.obj.arr2       服务能力
            //Disputes            this.obj.arr3       纠纷中
            //Appropriate         this.obj.arr4       物流服务等级	
            //Punish1             this.obj.arr5[0]    交易违规
            //Punish2             this.obj.arr5[1]    产品信息违规
            //Punish3             this.obj.arr5[2]    知识产权禁限售
            //OnShelves           this.obj.arr6       已上架
            arr3 = this.b01(arr2);
            select1 = arr3[0]; insertL = arr3[1]; insertR = arr3[2]; update1 = arr3[3];
            if (i == arr1.length - 1)//表示最近的一天
            {
                arr4 = this.b02();
                insertL += arr4[0];
                insertR += arr4[1];
                update1 += arr4[2];
            }
            let arrA = arr2.statDate.split("-")
            sql += '\
      <if Fun(Db("sqlite.dhgate","'+ select1 + '","count"))==0>\
        <.Db("sqlite.dhgate","insert into @.shopanalysis('+ insertL + ')values(' + insertR + ')","execute")/>\
      <else/>\
        <.Db("sqlite.dhgate","update @.shopanalysis set '+ update1 + ' where @.fromid=' + this.This.obj.fromid + ' and @.year=' + arrA[0] + ' and @.month=' + Number(arrA[1]) + ' and @.day=' + Number(arrA[2]) + '","execute")/>\
      </if>'
        }
        Tool.ajax.a01("[" + sql + "]", 1, this.a10, this)
    },
    a10: function (t) {
        if (t[0] == null) {
            $("#taskDes,#url").html("");
            $("#state").html("【采集店铺统计信息】已采集完成");
            this.obj.A1 = 1; this.obj.A2 = 0;//下次还要用
            this.next.apply(this.This)
        }
        else {
            $("#state").html("出错：" + Tool.pre(t));
        }
    },
    b01: function (arr2) {
        let arr1 = arr2.statDate.split("-")
        let select1 = "select count(1) from @.shopanalysis where @.fromid=" + this.This.obj.fromid + " and @.year=" + arr1[0] + " and @.month=" + Number(arr1[1]) + " and @.day=" + Number(arr1[2]);
        let insertL = "@.fromid,@.name,@.year,@.month,@.day,@.Exposure,@.Browse,@.visitors,@.money,@.OrderNum,@.ConversionRate"
        let insertR = this.This.obj.fromid + ",'" + this.This.obj.username + "'," + arr1[0] + "," + Number(arr1[1]) + "," + Number(arr1[2]) + "," + arr2.searchExpoCnt + "," + arr2.visitStoreCnt + "," + arr2.storeVisitorNum + "," + arr2.confirmAmount + "," + arr2.confirmOrders + "," + arr2.visitConfirmRate
        let update1 = "@.Exposure=" + arr2.searchExpoCnt + ",@.Browse=" + arr2.visitStoreCnt + ",@.visitors=" + arr2.storeVisitorNum + ",@.money=" + arr2.confirmAmount + ",@.OrderNum=" + arr2.confirmOrders + ",@.ConversionRate=" + arr2.visitConfirmRate;

        return [select1, insertL, insertR, update1]
    },
    b02: function () {
        let insertL = ",@.ServiceCapability,@.Disputes,@.Appropriate,@.Punish1,@.Punish2,@.Punish3,@.OnShelves,@.uptime"
        let insertR = "," + this.obj.arr2 + "," + this.obj.arr3 + "," + this.obj.arr4 + "," + this.obj.arr5[0] + "," + this.obj.arr5[1] + "," + this.obj.arr5[2] + "," + this.obj.arr6 + "," + Tool.gettime("")
        let update1 = ",@.uptime=" + Tool.gettime("") + ",@.Appropriate=" + this.obj.arr4 + ",@.OnShelves=" + this.obj.arr6
        return [insertL, insertR, update1]
    }
}