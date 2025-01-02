'use strict';
let F4 =
{
    next: null, This: null,
    obj: { A1: 1, A2: 0, Aarr: [] },
    a01: function (next, This) {
        this.obj.Aarr = this.b01();
        this.obj.A2 = this.obj.Aarr.length;//任务说明
        this.next = next;
        this.This = This;
        this.a02()
    },
    a02: function () {
        if (this.obj.A1 <= this.obj.A2) {
            $("#taskDes").html(this.b02());
            this.a03();
        }
        else {
            this.a09();
        }
    },
    a03: function () {
        let url = this.obj.Aarr[this.obj.A1 - 1][0];
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在打开【" + this.obj.Aarr[this.obj.A1 - 1][1] + "】页面。。。");
        gg.getFetch(url,"json", this.a04, this);
    },
    a04: function (t) {
        let type = this.obj.Aarr[this.obj.A1 - 1][1]
        if (type == "处罚管理") { this.a05(t); }
        else if (type == "经营品类") { this.a06(t); }
        else if (type == "上架的产品") { this.a07(t); }
        else if (type == "我的资金账户") { this.a08(t); }
        else { $("#state").html("未知操作：" + type) }
    },
    a05: function (t)//处罚管理
    {
        //一般违规				严重违规				知识产权禁限售(第三方投诉)
        let arr = Tool.StrSplits(t, '<span class="text-type2"><b class="orange-text">', "</b>");
        if (arr.length == 2) {
            this.obj.Punish1 = arr[0];
            this.obj.Punish2 = arr[1];
            this.obj.Punish3 = 0;//arr[2];
            this.obj.A1++;
            this.a02();
        }
        else {
            $("#state").html("页面可能已改版");
        }
    },
    a06: function (t)//经营品类
    {
        let industry = Tool.StrSlice(t, "classification  alreadyBind", "类")
        this.obj.industry = industry.substr(industry.length - 1)//经营品类
        this.obj.A1++;
        this.a02();
    },
    a07: function (t)//上架的产品
    {
        if (t.indexOf("<title>上架的产品 </titl") != -1) {
            let str2 = Tool.StrSlice(t, '<div class="rtab-warp" id="newGuideTarget2">', '</ul>');
            let num1 = Tool.StrSlice(str2, '已上架<b>', '</b>').replace(",", "");
            let num2 = Tool.StrSlice(str2, '待审核<b>', '</b>').replace(",", "");
            let num3 = Tool.StrSlice(str2, '审核未通过<b>', '</b>').replace(",", "");
            let num4 = Tool.StrSlice(str2, '已下架<b>', '</b>').replace(",", "");
            let num5 = Tool.StrSlice(t, '<b class="orange">', '</b>');
            this.obj.proArr = [num1, num2, num3, num4, num5]
            this.obj.A1++;
            this.a02();
        }
        else if (t.indexOf("<title> 我的摘要</title>") != -1)//要进"上架的产品"页面，但进不去
        {
            this.obj.proArr = [0, 0, 0, 0, 0];
            this.obj.A1++;
            this.a02();
        }
        else { $("#state").text("没打开页面:" + t); }
    },
    a08: function (t)//我的资金账户
    {
        if (t.indexOf('<h3>很抱歉，您本次访问的网页出现问题，无法显示。</h3>') != -1) {
            this.a03();
        }
        else {
            let arr = Tool.StrSplits(t, 'US $', "</div>")//可用额度
            if (arr === false) {
                //打不开，敦煌自己的原因
                this.obj.Cash1 = false//可用余额
                this.obj.Cash2 = false//冻结余额
                this.obj.Cash3 = false//账户欠款
                this.obj.A1++;
                this.a02();
            }
            else {
                //this.obj.Cash1 = arr[0].replace(",", "");
                //this.obj.Cash2 = arr[1].replace(",", "");
                //this.obj.Cash3 = arr[2].replace(",", "");
                this.obj.Cash1 = false//可用余额
                this.obj.Cash2 = false//冻结余额
                this.obj.Cash3 = false//账户欠款
               
                this.obj.A1++;
                this.a02();
            }
        }
    },
    a09: function () {
        let cash1 = "", cash2 = "", cash3 = ""
        //if (this.obj.Cash1 !== false) {
        //    cash1 = ",@.Cash1=" + this.obj.Cash1;
        //    cash2 = ",@.Cash2=" + this.obj.Cash2;
        //    cash3 = ",@.Cash3=" + this.obj.Cash3;
        //}
        $("#state").html('正在更新数据。。。');
        let str = '""<r: db="sqlite.dhgate">update @.seller set @.Punish1=' + this.obj.Punish1 + ',@.Punish2=' + this.obj.Punish2 + ',@.Punish3=' + this.obj.Punish3 + ',@.upshelf=' + this.obj.proArr[0] + ',@.Pending=' + this.obj.proArr[1] + ',@.NotThrough=' + this.obj.proArr[2] + ',@.downshelf=' + this.obj.proArr[3] + ',@.upLimit=' + this.obj.proArr[4] + ',@.industry=\'' + this.obj.industry + '\' ' + cash1 + cash2 + cash3 + ' where @.fromid=' + this.This.obj.fromid + '</r:>';
        Tool.ajax.a01(str, 1, this.a10, this)
    },
    a10: function (t) {
        if (t == "") {
            $("#taskDes,#url").html("");
            $("#state").html("订单已采集完成");
            this.obj = { A1: 1, A2: 0, Aarr: [] }//下一个账号还要用
            this.next.apply(this.This)
        }
        else {
            $("#state").html('更新数据失败' + t);
        }
    },
    b01: function () {
        return [
            ["https://seller.dhgate.com/punish/punishManage/getPunishInfo.do", "处罚管理", "获取【一般违规】 【严重违规】 【知识产权禁限售(第三方投诉)】"],
            ["https://seller.dhgate.com/merchant/opCatePubMgr.do?dhpath=10001,85", "经营品类", "获取【经营品类】"],
            ["https://seller.dhgate.com/prodmanage/shelf/prodShelf.do?dhpath=10001,21001,0202", "上架的产品", "获取【已上架】 【待审核】 【审核未通过】 【已下架】 【已下架】 【商品上限】数量"]
            //,["https://dhfinet.dhgate.com/dhfinetportal/assets/assetsTotal.do", "我的资金账户", "获取【可提现余额】"]
        ]
    },
    b02: function () {
        let arr = this.obj.Aarr, newArr = [];
        for (let i = 0; i < this.obj.A2; i++) {
            if (i == this.obj.A1 - 1) { newArr.push('<b><font color="red" title="' + arr[i][2] + '">' + arr[i][1] + '</font></b>') }
            else { newArr.push('<span title="' + arr[i][2] + '">' + arr[i][1] + '</span>') }
        }
        return newArr.join(' <i class="fa fa-long-arrow-right"> -&gt; </i> ');
    }
}