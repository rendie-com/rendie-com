'use strict';
let F3 =
{
    next: null, This: null,
    obj: { A1: 1, A2: 0, B1: 1, B2: 1, C1: 1, C2: 0, CArr: [], C2Arr: [], C3Arr: [] },
    a01: function (next, This) {
        this.obj.AArr = this.b01();
        this.obj.A2 = this.obj.AArr.length;//任务说明
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
            $("#taskDes,#url").html("");
            $("#state").html("站内信已采集完成");
            this.obj.A1 = 1; this.obj.A2 = 0;//下次还要用
            this.next.apply(this.This)
        }
    },
    a03: function () {
        if (this.obj.B1 <= this.obj.B2) {
            let url = this.obj.AArr[this.obj.A1 - 1][0] + this.obj.B1;
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在打开【" + this.obj.AArr[this.obj.A1 - 1][1] + "】页面。。。");
            gg.getFetch(url,"json", this.a04, this);
        }
        else {
            this.obj.A1++;
            this.obj.B1 = 1; this.obj.B2 = 1; this.a02();
        }
    },
    a04: function (str) {
        $("#state").html("已打开【" + this.obj.AArr[this.obj.A1 - 1][1] + "】页面。。。");
        if (str.indexOf('每页显示') != -1) {

            this.a05(str);
        }
        else if (str.indexOf('<title>登录 </title>') != -1)//要进"买家消息"页面，但进不去,要重登
        {
            alert("aaaaaaaaaaaaaaaaaa")
            //this.f06();
        }
        else if (str.indexOf('暂时还没有您的站内信') != -1 || str.indexOf('无权限访问 </title>') != -1) {
            this.obj.A1++;
            this.obj.B1 = 1; this.obj.B2 = 1; this.a02();
        }
        else { alert("获得内容异常01"); Tool.at(str); }
    },
    a05: function (str) {
        let messageidArr = Tool.StrSplits(str, "/messageweb/loadmessagedetail.do?messageid=", "&");
        let nameArr = Tool.StrSplits(str, 'style="cursor:pointer" target="_blank">', "</a>");
        let msgTypeArr = Tool.StrSplits(str, '<td class="inb-smtype">', "</td>");
        msgTypeArr.shift()
        let rcount = Tool.strRepArr(str, '共有\\s*([0-9]+)\\s*条记录', 1)[0];
        let pcount = Tool.Trim(Tool.StrSlice(str, '每页显示', ' 条'));
        this.obj.B2 = Math.ceil(parseInt(rcount) / parseInt(pcount));
        this.obj.CArr = messageidArr;
        this.obj.C2Arr = nameArr;
        this.obj.C3Arr = msgTypeArr;
        this.obj.C2 = this.obj.CArr.length;
        /////////////////////////////////////////////////////////////
        let p1 = Math.ceil(this.obj.B1 / this.obj.B2 * 100);
        $("#B1").html(p1 + "%").css("width", p1 + "%");
        $("#B2").html(this.obj.B1 + '/' + this.obj.B2 + '（页）');
        if (messageidArr.length == nameArr.length && messageidArr.length == msgTypeArr.length) {
            if (this.obj.AArr[this.obj.A1 - 1][1] == "平台公告(未读)") { this.a20(); }
            else { this.a06(); }
        }
        else {
            Tool.pre(["DH可能已改版：", messageidArr, nameArr, msgTypeArr])
        }
    },
    a06: function () {
        if (this.obj.C1 <= this.obj.C2) {
            let p1 = Math.ceil(this.obj.C1 / this.obj.C2 * 100);
            $("#C1").html(p1 + "%").css("width", p1 + "%");
            $("#C2").html(this.obj.C1 + '/' + this.obj.C2 + '（条）');
            if (this.obj.AArr[this.obj.A1 - 1][1] == "买家消息(未读)") { this.a07(); }
            else if (this.obj.AArr[this.obj.A1 - 1][1] == "系统消息(未读)") { this.a14(); }
            else { alert("未知操作01：" + this.obj.AArr[this.obj.A1 - 1][1]); }
        }
        else {
            $("#B2").html(this.obj.B1 + '/' + this.obj.B2 + '（完）');
            this.obj.B1++;
            this.obj.C1 = 1; this.obj.c2 = 0; this.obj.CArr = []; this.obj.C2Arr = []; this.obj.C3Arr = [];
            this.a03();
        }
    },
    a07: function () {
        $("#state").html("正在开打【站内信内容】。。。");
        let url = "http://seller.dhgate.com/messageweb/loadmessagedetail.do?messageid=" + this.obj.CArr[this.obj.C1 - 1] + "&dhpath=10005,0301,51001";
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a08, this);
    },
    a08: function (str) {
        $("#state").html("已开打【站内信内容】。。。");
        if (str.indexOf('<h2>站内信详情') != -1) {
            if (this.obj.AArr[this.obj.A1 - 1][1] == "买家消息(未读)") { this.a09(str); }
            else if (this.obj.AArr[this.obj.A1 - 1][1] == "系统消息(未读)") { this.a16(str); }
            else { alert("未知操作02：" + this.obj.AArr[this.obj.A1 - 1][1]); }
        }
        else { alert("获得内容异常02"); Tool.at(str); }
    },
    a09: function (str) {
        let param = "", msgType = ""
        let msgTitle = Tool.Trim(Tool.StrSlice(str, '主题<!--主题-->：', '</h2>'))
        let msgTypename = Tool.Trim(this.obj.C3Arr[this.obj.C1 - 1])
        $("#state").html("正在本地更新站内信。。。");
        if (msgTypename == "订单") {
            param = msgTitle.substr(3);
            msgType = "002";
            let html = '{<r:order db="sqlite.dhgate" where=" where @.orderID=\'' + param + '\'" size="1">"PurchaseRemark":"<:PurchaseRemark tag=js/>"</r:order>}'
            Tool.ajax.a01(html, 1, this.a10, this, [str, param, msgTitle, msgType, "[有站内信]"])
        }
        else if (msgTypename == "询盘") {
            /*
                  if(msgTitle.substr(0,3)=="PO#")// (询盘订单有可能写在标题上)
            {
              param=msgTitle.substr(3);
            }
            else
            {}
                  */
            param = Tool.StrSlice(str, '<a href="//www.dhgate.com/product/', '.html');
            let lastLen = param.lastIndexOf('/') + 1;
            param = param.substr(lastLen);
            msgType = "001";
            this.a11(str, param, msgTitle, msgType, "");
        }
        else if (msgTypename == "其它") {
            msgType = "003";
            this.a11(str, param, msgTitle, msgType, "");
        }
        else {
            $("#state").html("未知类型：" + msgTypename);
        }
    },
    a10: function (t, oo) {
        if (t.PurchaseRemark != null) {
            let str = this.b07(t.PurchaseRemark, oo[4], oo[1]);
            $("#state").html("正在处理站内信。。。。2");
            this.a11(oo[0], oo[1], oo[2], oo[3], str)
        }
        else {
            let err = '订单：' + oo[1] + ',不存在。\n请先采订单后，再采站内信。';
            $("#state").html(err);
            Tool.Modal("提示", err, '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '')
        }
    },
    a11: function (str, param, msgTitle, msgType, PurchaseRemark) {
        let arr = this.b06(this.b05(str), str, param, msgTitle, msgType, PurchaseRemark).split("[分隔符]")
        $("#state").html("正在更新本地数据。。。。");
        if (!arr[1]) { arr[1] = ""; }
        Tool.ajax.a01("[" + arr[0] + "]", 1, this.a12, this, arr[1])
    },
    a12: function (t, html)//要分别存俩个数据库
    {
        if (html) {
            Tool.ajax.a01("[" + html + "]", 1, this.a12, this, "")
        }
        else if (t[0] == null) {
            let url = "http://seller.dhgate.com/messageweb/read.do?state=0&topicid=" + this.obj.CArr[this.obj.C1 - 1]
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在设置【买家消息未读】。。。");
            gg.getFetch(url,"json", this.a13, this);
        }
        else { $("#state").html("出错001：" + t); }
    },
    a13: function (oo) {
        $("#state").html("正在设置【买家消息未读】。。。。");
        if (oo.isSuccess == true) {
            $("#C2").html(this.obj.C1 + '/' + this.obj.C2 + '（完）');
            this.obj.C1++;
            this.a06();
        }
        else { Tool.pre(["获得内容异常03", oo]); }
    },
    ////////////////////////////////////////////////////////////////////////////
    a14: function ()//去掉不重要信息
    {
        let nArr = []
        for (let i = 0; i < this.obj.C2; i++) {
            if (this.obj.C2Arr[i].indexOf("放款监控延迟放款通知") != -1 ||
                this.obj.C2Arr[i].indexOf("订单完成通知！") != -1 ||
                this.obj.C2Arr[i] == "超承诺运达时间站内信" ||
                this.obj.C2Arr[i] == "请款成功通知" ||
                this.obj.C2Arr[i] == "[DHgate] 拒绝请款通知！" ||
                this.obj.C2Arr[i] == "[DHgate]恭喜！买家下单购买了您的产品！" ||
                this.obj.C2Arr[i].indexOf("账户款项解冻PO#") != -1 ||
                this.obj.C2Arr[i].indexOf("敦煌网邀请您对纠纷裁决结果进行评价") != -1 ||
                this.obj.C2Arr[i] == "备货期预警")//有该内容，就是跳过。
            { nArr.push("topicid=" + this.obj.CArr[i]); }
        }
        if (nArr.length == 0) {
            $("#state").html("已没有不重要信息。。。");
            this.a07();
        }
        else {
            let url = "http://seller.dhgate.com/messageweb/read.do?state=1&" + nArr.join("&")
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在设置【已读】。。。");
            gg.getFetch(url,"json", this.a15, this);
        }
    },
    a15: function (oo) {
        if (oo.isSuccess == true) {
            $("#state").html("【已读】设置成功");
            this.a03();
        }
        else { Tool.pre(["获得内容异常04", oo]); }
    },
    a16: function (str) {
        let msgTitle = Tool.Trim(Tool.StrSlice(str, '主题<!--主题-->：', '</h2>'))
        let msgTypename = Tool.Trim(this.obj.C3Arr[this.obj.C1 - 1])
        $("#state").html("正在获取【订单号】。。。");
        if (msgTypename == "订单")//004
        {
            this.a19(str, msgTitle)
        }
        else if (msgTypename == "付款/退款")//006
        {
            alert("【付款/退款】这里面，有重要信息，但没开发。")
        }
        else if (msgTypename == "账户")//008
        {
            this.a17(str, msgTitle, "008")
        }
        else if (msgTypename == "其它")//009
        {
            this.a17(str, msgTitle, "009")
        }
        else {
            alert("没有该类型：" + msgTypename)
        }
    },
    a17: function (str, msgTitle, msgType)//008  主要是为了找到订单号
    {
        let param = "", err = ""
        if (msgTitle.indexOf('Dhgate审核为高风险订单') != -1) { param = msgTitle.split("PO# ")[1]; err = "[高风险]" }
        else if (msgTitle.indexOf('退款申请完成') != -1) { param = Tool.StrSlice(msgTitle, "订单：（", "）"); err = "[退款完成]" }
        else if (msgTitle.indexOf('协议达成一致-退换货/退货退款') != -1) { param = Tool.StrSlice(msgTitle, "PO#:", "，"); err = "[协议达成一致-退换货/退货退款]" }
        else if (msgTitle.indexOf('平台已退款买家') != -1) { param = Tool.StrSlice(msgTitle, "纠纷订单", "平台"); err = "[退款买家]" }
        else if (msgTitle.indexOf('您有一个纠纷订单') != -1) { param = Tool.StrSlice(msgTitle, "您有一个纠纷订单 ", "，"); err = "[纠纷订单]" }
        else if (msgTitle == '超备货期站内信') { param = Tool.StrSlice(str, '您的', '订单已超过备货期'); err = "[超备货期]" }
        else if (msgTitle.indexOf('买家申请修改发货信息') != -1) { param = Tool.StrSlice(msgTitle, "PO# ", "，"); err = "[修改发货信息]" }
        else if (msgTitle.indexOf('平台已给出裁决方案') != -1) { param = Tool.StrSlice(msgTitle, "纠纷订单 ", " ，"); err = "[裁决]" }
        else if (msgTitle.indexOf('关于您的智能裁决订单号') != -1) { param = msgTitle.split("关于您的智能裁决订单号")[1]; err = "[裁决]" }
        else if (msgTitle.indexOf('建议取消订单') != -1) { param = Tool.StrSlice(msgTitle, "，PO#", "，"); err = "[建议取消]" }
        else if (msgTitle.indexOf('全额退款通知') != -1) { param = Tool.StrSlice(msgTitle, "纠纷订单 ", " 全额退款通知"); err = "[全额退款通知]" }
        else if (msgTitle.indexOf('您已取消订单') != -1) { param = msgTitle.split("您已取消订单")[1]; err = "[您已取消]" }
        else if (msgTitle.indexOf('敦煌网调解中心邀请您对我们的服务进行评价') != -1) { param = Tool.StrSlice(msgTitle, '纠纷case ID:', '，'); err = "[邀请评价]"; }
        else if (msgTitle.indexOf('账户款项冻结PO#') != -1) {
            param = msgTitle.split('PO#')[1];
            err = "[款项冻结]";
        }
        else if (msgTitle.indexOf('买家已向信用卡公司提出拒付') != -1) {
            param = msgTitle.split('PO# ')[1];
            err = "[拒付]";
        }
        else if (msgTitle.indexOf('拒付通知') != -1) {
            param = Tool.StrSlice(msgTitle, 'PO#', '拒');
            err = "[拒付]";
        }
        else if (msgTitle.indexOf('买家发起信用卡拒付，需要您提供证据。PO# ') != -1) {
            param = msgTitle.split('PO# ')[1];
            err = "[需要您提供证据]";
        }
        else if (msgTitle.indexOf('买家已经修改协议，请及时处理纠纷订单') != -1) {
            param = Tool.StrSlice(msgTitle, '理纠纷订单 ', ' ！');
            err = "[修改协议]";
        }
        else if (msgTitle == "退款通知") {
            param = Tool.StrSlice(str, '敦煌网已为订单 ', ' 操作退款');
            if (!param) { param = Tool.StrSlice(str, '关于您的订单 ', '，我们'); }
            if (!param) { param = Tool.StrSlice(str, '关于您的订单', '，我们'); }
            err = "[退款通知]";
        }
        else if (msgTitle.indexOf("未对买家的解决方案做出响应，协议自动达成") != -1) {
            param = Tool.StrSlice(msgTitle, '纠纷订单 ', '，5天');
            err = "[自动达成]";
        }
        else if (msgTitle.indexOf("请及时提供纠纷证据") != -1)//主题：通知: 请及时提供纠纷证据order number 3295536401
        {
            param = msgTitle.split("order number ")[1]
            err = "[请提供证据]";
        }
        else if (msgTitle == "DHgate风控调查结束，订单恢复正常") {
            param = Tool.StrSlice(str, '订单PO#', '，');
            err = "[恢复正常]";
        }
        else if (msgTitle == "资金账户余额不足，请及时充值") {
            param = "null"; err = "[余额不足]";
        }
        else if (str.indexOf("买家2小时内取消该待发货订单，请您务必不要发货") != -1) {
            param = Tool.StrSlice(str, '关于您的订单 ', '，');
            err = "[不要发货]";
        }
        else if (msgTitle == "FR邮件标题") {
            param = Tool.StrSlice(str, '您的订单 ', '，买家'); err = "[买家主动要求取消订单]";
        }
        else if (msgTitle.indexOf("胜诉通知") != -1) {
            param = Tool.StrSlice(msgTitle, 'PO#', '胜诉通知'); err = "[胜诉通知]";
        }
        else if (msgTitle.indexOf("纠纷升级") != -1) {
            param = Tool.StrSlice(msgTitle, '纷订单:', ' ，'); err = "[纠纷升级]";
        }
        else if (msgTitle == "来自敦煌网的通知:您购买的店铺模板即将到期" || msgTitle.indexOf("您的店铺已经恢复-[订单转接服务]") != -1 || msgTitle.indexOf("联盟CPS卖家店铺老客返佣到账") != -1) { param = "null"; err = ""; }

        else if (msgTitle == "[DHgate]恭喜！您的店铺有一笔新的订单！") { param = Tool.StrSlice(str, '订单号码为：', '，'); err = "[新订单]"; }
        if (param) {
            if (param == "null") {
                $("#C2").html(this.obj.C1 + '/' + this.obj.C2 + '（完）');
                this.obj.C1++;
                this.a06();
            }
            else {
                this.a18(str, param, msgTitle, msgType, err);
            }
        }
        else {
            $("#state").html("【1】没有找到订单号。。。请匆须手动将，该订单设置成问题订单，并说明原因，因为该站内信【已读】了");
        }
    },
    a18: function (str, param, msgTitle, msgType, err) {
        let html = '{<r:order db="sqlite.dhgate" where=" where @.orderID=\'' + param + '\'" size="1">"PurchaseRemark":"<:PurchaseRemark tag=js/>"</r:order>}'
        $("#state").html('正在获取采购备注。。。')
        Tool.ajax.a01(html, 1, this.a10, this, [str, param, msgTitle, msgType, err])
    },
    /////////////////////////////////////////////
    a19: function (str, msgTitle)//004   主要是为了找到订单号
    {
        let param = "", err = ""
        if (msgTitle == "退款通知") { param = Tool.StrSlice(str, '敦煌网已为订单 ', ' 操作退款'); err = "[退款通知]"; }
        else if (msgTitle.indexOf('发货前退款“处理说明书”') != -1) {
            param = Tool.StrSlice(msgTitle, '订单PO#:', '，'); err = "[有站内信]";
        }
        else if (msgTitle.indexOf('【协议纠纷开启-虚假运单号】') != -1) {
            param = Tool.StrSlice(msgTitle, '虚假运单号】PO#:', '，'); err = "[虚假运单号]";
        }
        else if (msgTitle.indexOf('【协议纠纷开启-货物与描述不符】') != -1) {
            param = Tool.StrSlice(msgTitle, '货物与描述不符】PO#:', '，'); err = "[货物与描述不符]";
        }
        else if (msgTitle.indexOf('【协议纠纷-协商中】') != -1) {
            param = Tool.StrSlice(msgTitle, '协议纠纷-协商中】PO#:', '，'); err = "[买家已修改协议方案]";
        }
        else if (msgTitle.indexOf('服务评价') != -1) {
            param = Tool.StrSlice(msgTitle, '订单', '服务评价'); err = "[服务评价]";
        }
        else if (msgTitle == "DHgate风控调查结束，订单恢复正常") {
            param = Tool.StrSlice(str, '订单PO#', '，'); err = "[恢复正常]";
        }
        else if (msgTitle == "如何避免纠纷升级?--距离升级还有5天") {
            param = Tool.StrSlice(str, '您的订单', '，'); err = "[还有5天]";
            if (!param) { param = Tool.StrSlice(str, '于您的订单', '，'); }
        }
        else if (msgTitle.indexOf('买家已经将纠纷升级，请及时处理') != -1) {
            param = Tool.StrSlice(msgTitle, '订单PO#:', ' ，');
            if (!param) { param = param = Tool.StrSlice(msgTitle, '订单PO#:', '，'); }
            err = "[纠纷升级]";
        }
        else if (msgTitle.indexOf('【协议纠纷开启-未收到货】') != -1) {
            param = Tool.StrSlice(msgTitle, 'PO#:', ' ，'); err = "[未收到货]";
        }
        else if (msgTitle.indexOf('买家已经拒绝您提出的方案，请及时处理') != -1) {
            param = Tool.StrSlice(msgTitle, 'PO#:', '，'); err = "[买家已经拒绝]";
        }
        else if (msgTitle.indexOf('买家已修改了退款申请') != -1) {
            param = Tool.StrSlice(msgTitle, 'PO#:', '，'); err = "[买家已修改了退款申请]";
        }
        else if (msgTitle.indexOf('敦煌网调解中心邀请您对我们的服务进行评价') != -1) {
            param = Tool.StrSlice(msgTitle, '订单号', '，'); err = "[邀请评价]";
            //if(!param){param=Tool.StrSlice(msgTitle,'订单号','，');}
        }
        else if (msgTitle.indexOf('达成退款协议') != -1 || msgTitle.indexOf('退款协议已达成') != -1) {
            param = Tool.StrSlice(msgTitle, 'PO#:', ' ，');
            if (!param) { param = Tool.StrSlice(msgTitle, 'PO#:', '，'); }
            err = "[达成退款]";
        }
        else if (msgTitle.indexOf("【协议纠纷超时】") != -1) {
            param = Tool.StrSlice(msgTitle, 'PO#', ' ，');
            err = "[协议纠纷超时]";
        }
        else if (msgTitle.indexOf("买家已取消退款协议") != -1) {
        }
        else if (msgTitle.indexOf("【协议纠纷】关于您的纠纷订") != -1) {
            param = Tool.StrSlice(msgTitle, 'ID#:', '，');
            err = "[协议纠纷确认收货]";
        } else if (msgTitle.indexOf("【纠纷协议达成一致】关于您的纠纷") != -1) {
            param = Tool.StrSlice(msgTitle, 'ID#:', '，');
            err = "[纠纷协议达成一致]";
        }
        else if (msgTitle.indexOf('买家提交了协议方案，请及时处理') != -1) { param = Tool.StrSlice(msgTitle, 'PO#:', ' ，'); err = "[买家提交了协议]"; }
        else if (msgTitle.indexOf('自动达成退款协议') != -1)//主题：【协议纠纷超时】PO#3320619831 ，卖家5天内未响应买家协议方案，自动达成退款协议
        {
            param = Tool.StrSlice(msgTitle, '【协议纠纷超时】PO#', ' ，');
            err = "[自动达成退款协议]";
        }
        //////////////////////////////////////////////////////////////////////
        if (param) {
            $("#state").html("（004）param=" + param + " & err=" + err);
            this.a18(str, param, msgTitle, "004", err);
        }
        else { $("#state").html("（004）没有找到订单号。。。请匆须手动将，该订单设置成问题订单，并说明原因，因为该站内信【已读】了"); }
    },
    a20: function () {
        let url = "http://seller.dhgate.com/messageweb/read.do?state=1&topicid=" + this.obj.CArr.join("&topicid=")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在设置【平台公告已读】。。。");
        gg.getFetch(url,"json", this.a15, this);
    },
    /////////////////////////////////////////////////////////////////
    b01: function () {
        return [
            ["http://seller.dhgate.com/messageweb/newmessagecenter.do?msgtype=001,002,003&dhpath=10005,0301,51001&readed=0&beforeDate=366&page=", "买家消息(未读)"],
            ["http://seller.dhgate.com/messageweb/newmessagecenter.do?msgtype=004,005,006,007,008,009&dhpath=10005,0301,51001&readed=0&beforeDate=366&page=", "系统消息(未读)"],
            ["http://seller.dhgate.com/messageweb/newmessagecenter.do?msgtype=010,011,012,013&dhpath=10005,0301,51003&readed=0&beforeDate=366&page=", "平台公告(未读)"]
        ];
    },
    b02: function () {
        let arr = this.obj.AArr, newArr = [];
        for (let i = 0; i < this.obj.A2; i++) {
            if (i == this.obj.A1 - 1) { newArr.push('<b><font color="red">' + arr[i][1] + '</font></b>') }
            else { newArr.push('<span>' + arr[i][1] + '</span>') }
        }
        return newArr.join(' <i class="fa fa-long-arrow-right"></i> ');
    },
    b05: function (str) {
        $("#state").html("正在获取【站内信内容】。。。");
        let sql = [], content = "", Arr3 = [], str2 = "";
        str2 = Tool.StrSlice(str, '<div class="inb-hidecon" style="display:none;">', '<div class="inb-chart clearfix">');//如果有隐藏的消息
        if (str2) {
            let Arr1 = Tool.StrSplits(str2, '<span class="inb-ourstiti">', '</span>\r\n            									</div>');
            for (let i = 0; i < Arr1.length; i++) {
                Arr3 = this.b08(Arr1[i])
                content = Tool.StrSlice(Arr1[i], '<pre>', '</pre>');
                //sql.push(this.b09(content+"============",Arr3))
                sql.unshift(this.b09(content, Arr3))
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        str2 = Tool.StrSlice(str, '<div class="inb-chart clearfix">', '<script type="text/javascript">');
        let Arr2 = Tool.StrSplits(str2, '<span class="inb-ourstiti">', '</span>\r\n        									</div>');//显示的消息
        for (let i = 0; i < Arr2.length; i++) {
            Arr3 = this.b08(Arr2[i])
            content = Tool.StrSlice(Arr2[i], '<pre>', '</pre>');
            if (!content) { content = Arr2[i].split('<span class="inb-ourscon">')[1]; }
            sql.unshift(this.b09(content, Arr3))
        }
        return sql;
    },
    b06: function (sql, str, param, msgTitle, msgType, html) {
        let select1 = "select count(1) from @.msg where @.fromID=" + this.obj.CArr[this.obj.C1 - 1]
        let des = JSON.stringify(sql).replace(/'/ig, "''").replace(/\\/ig, "\\\\");
        let SendTime
        if (str.indexOf('<p>最后回复<!--最后回复-->：') != -1) {
            SendTime = Tool.StrSlice(str, '<p>最后回复<!--最后回复-->：', '</p>')
            SendTime = Tool.gettime(SendTime);
        }
        else if (str.indexOf('<span>SYSTEM</span>&nbsp;') != -1) {
            SendTime = Tool.StrSlice(str, '<span>SYSTEM</span>&nbsp;', '</span>')
            SendTime = Tool.gettime(SendTime);
        }
        else {
            html = "没有找到最后回复"
        }
        if (SendTime) {
            let sender = Tool.Trim(Tool.StrSlice(str, '联&nbsp;&nbsp;系&nbsp;人<!--联&nbsp;&nbsp;系&nbsp;人-->：', '<'))
            let update = "update @.msg set @.SendTime=" + SendTime + ",@.msgreplycount=" + sql.length + ",@.name='" + msgTitle.replace(/'/ig, "''") + "',@.param='" + param + "',@.Sender='" + sender.replace(/'/ig, "''") + "',@.fromuser='" + this.This.obj.username + "',@.fromuserid='" + this.This.obj.fromid + "',@.receiver='" + this.This.obj.username + "',@.msgType='" + msgType + "',@.receiverRead=0 where @.fromid=" + this.obj.CArr[this.obj.C1 - 1]
            let insert1 = "insert into @.msg(@.fromID,@.fromuser,@.fromuserid,@.Sender,@.receiver,@.name,@.Sendtime,@.senderRead,@.receiverRead,@.msgType,@.msgReplyCount,@.param)values(" + this.obj.CArr[this.obj.C1 - 1] + ",'" + this.This.obj.username + "'," + this.This.obj.fromid + ",'" + sender.replace(/'/ig, "''") + "','" + this.This.obj.username.replace(/'/ig, "''") + "','" + msgTitle.replace(/'/ig, "''") + "'," + SendTime + ",1,0,'" + msgType + "'," + sql.length + ",'" + param + "')"
            $("#state").html("正在入库。。。");
            html += "<if Fun(Db(sqlite.dhgate," + select1 + ",count))==0><r: db=\"sqlite.dhgate\">" + insert1 + "</r:><else/><r: db=\"sqlite.dhgate\">" + update + "</r:></if>"
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            select1 = "select count(1) from @.msgdes where @.fromID=" + this.obj.CArr[this.obj.C1 - 1];
            insert1 = "insert into @.msgdes(@.fromID,@.des)values(" + this.obj.CArr[this.obj.C1 - 1] + ",'" + des + "')";
            update = "update @.msgdes set @.des='" + des + "' where @.fromid=" + this.obj.CArr[this.obj.C1 - 1]
            html += "[分隔符]<if Fun(Db(sqlite.dhgatemsgdes," + select1 + ",count))==0><r: db=\"sqlite.dhgatemsgdes\">" + insert1 + "</r:><else/><r: db=\"sqlite.dhgatemsgdes\">" + update + "</r:></if>"
        }
        return html;
    },
    b07: function (t, Remark, orderid) {
        let PurchaseRemark = t.substr(15)
        if (PurchaseRemark.indexOf(Remark) == -1) { PurchaseRemark += Remark; }//去重复
        let str = '<r: db="sqlite.dhgate">update @.order set @.purchasestatus=5,@.PurchaseRemark=\'' + PurchaseRemark + '\' where @.orderID=\'' + orderid + '\'</r:>'
        return str;
    },
    b08: function (str) {
        let receiver = "", sender = "", attUrlsArr = ["", ""]
        let name = Tool.Trim(Tool.StrSlice(str, '<var></var><span>', '</span>'))
        if (name.toUpperCase() == this.This.obj.username.toUpperCase())//如果是卖家发送的信息
        { receiver = ""; sender = this.This.obj.username; }
        else { receiver = this.This.obj.username; sender = name; }
        ////////////////////////////////////
        attUrlsArr[0] = Tool.StrSplits(str, '<a class="inb-jpgfile" href="', '"')
        attUrlsArr[1] = Tool.StrSplits(str, 'target="_blank">', '</a>')
        if (attUrlsArr[0] != false) {
            attUrlsArr[0] = "http:" + attUrlsArr[0].join(",http:");
            attUrlsArr[1] = attUrlsArr[1].join(",");
        }
        else { attUrlsArr[0] = null; attUrlsArr[1] = null; }
        ///////////////////////////////////////
        let createTime = Tool.Trim(Tool.StrSlice(str, '</span>&nbsp;', '</span>'))
        return [receiver, sender, attUrlsArr[0], attUrlsArr[1], createTime]
    },
    b09: function (content, Arr3) {
        let oo =
        {
            "detailId": 0,
            "content": content,
            "createTime": Arr3[4],
            "receiverNickName": Arr3[0],
            "receiverId": "",
            "senderNickName": Arr3[1],
            "senderId": "",
            "attUrls": Arr3[2],
            "attNames": Arr3[3]
        }
        return oo
    }
}