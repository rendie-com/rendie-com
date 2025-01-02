'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('正在【人民币提现】...') + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
            <tbody>\
              <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		          <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		          <tr><td class="right">地址：</td><td id="url" colspan="2"></td></tr>\
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


        let str = '\
        {\
          "A2":<@page/>,\
          <r:seller db="sqlite.dhgate" where=" where @.Cash1&gt;15 order by @.sort asc,@.id asc" size="1" page="2">\
          "fromid":<:fromid/>,\
          "hide":<:hide/>,\
          "note":"<:note tag=js/>",\
          "cookies":<:cookies tag=0/>,\
          "username":"<:username/>",\
          "password":"<:password/>"\
          </r:seller>\
        }'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this);
    },
    a04: function (oo) {
        this.obj.fromid = oo.fromid;
        this.obj.hide = oo.hide;
        this.obj.note = oo.note
        this.obj.A2 = oo.A2;
        if (this.obj.A1 <= this.obj.A2) {
            let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100)
            $("#username").html(oo.username);
            $("#A1").html(p1 + "%").css("width", p1 + "%");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（个）');
            this.a05(oo)
        }
        else { $("#state").html("没有账号可以同步"); }
    },
    a05: function (oo) {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a06, this);
    },
    a06: function () {
        $("#state").html("正在进【提现】页面。。。");
        let url = "https://dhfinet.dhgate.com/dhfinetportal/withdraw/toWithdraw.do?currencyType=CNY"
        $("#url").html(url);
        gg.getFetch(url,"json", this.a07, this)//进"提现"页面
    },
    a07: function (str) {
        if (str.indexOf("账户已冻结，不能提现") != -1) {
            $("#state").html("账户已冻结，不能提现");
            if (this.obj.note.indexOf('[不能提现]') == -1) {
                let html = '[<r: db="sqlite.dhgate">update @.seller set @.note=\'[不能提现]' + this.obj.note + '\' where @.fromid=' + this.obj.fromid + '</r:>]';
                Tool.ajax.a01(html, 1, this.a11, this)
            }
            else { this.a11([]); }
        }
        else if (str.indexOf("可提取金额") != -1) {
            this.obj.fineSellerLimit = parseInt(Tool.StrSlice(str, '<input type="hidden" id="fineSellerLimit" value="', '"'))
            if (this.obj.hide == 2) { this.obj.fineSellerLimit -= 60; }//物流不达标时，留$60
            if (this.obj.fineSellerLimit >= 15) {
                let bankAccountId = Tool.StrSlice(str, 'attr-bid="', '"')
                $("#state").html("正在进【提现】。。。");
                let url = "https://dhfinet.dhgate.com/dhfinetportal/withdraw/confirm.do?bankAccountId=" + bankAccountId + "&withdraw.bankAccountType=CNY&withdraw.amount=" + this.obj.fineSellerLimit
                $("#url").html(url);
                gg.getFetch(url,"json", this.a08, this)//"提现"
            }
            else {
                this.a11([]);
            }
        }
        else if (str.indexOf("<title>错误页面 </title>") != -1) {
            this.a06();
        }
        else {
            $("#state").html("未知内容。。。"); Tool.at(str);
        }
    },
    a08: function (str) {
        $("#state").html("正在进【提现确认】。。。");
        let amount = parseInt(Tool.StrSlice(str, 'input type="hidden" name="withdraw.amount" value="', '"'));
        if (amount == this.obj.fineSellerLimit) {
            var fund_token = Tool.StrSlice(str, 'name="fund_token" value="', '"');
            let tradeNo = Tool.StrSlice(str, 'name="tradeNo" value="', '"');
            this.obj.rate = Tool.StrSlice(str, 'name="rate" value="', '"');
            this.obj.Fee = Tool.StrSlice(str, 'name="withdraw.withdrawFee" value="', '"');
            this.obj.Money = Tool.StrSlice(str, 'name="withdrawMoney" value="', '"');
            this.obj.Note = Tool.Trim(Tool.StrSlice(str, '<span i18n=\"i18n.setting-19\">人民币账户</span>', '</td>').replace(/\n|\s+/ig, " "));
            let url = "https://dhfinet.dhgate.com/dhfinetportal/withdraw/doWithdraw.do?fund_token=" + fund_token + "&tradeNo=" + tradeNo + "&withdraw.amount=" + this.obj.fineSellerLimit + "&withdraw.bankAccountType=CNY&rate=" + this.obj.rate + "&withdraw.withdrawFee=" + this.obj.Fee + "&withdrawMoney=" + this.obj.Money + "&smsSubscribe=&smsFee="
            gg.getFetch(url,"json", this.a09, this)//"确认提现"
        }
        else {
            $("#state").html("提现数量不对\n本来是：" + this.obj.fineSellerLimit + "\n结果是：" + amount);
        }

    },
    a09: function (str) {
        $("#state").html("正在进【申请提现】。。。");
        if (str.indexOf("提现申请受理成功") != -1) {
            this.a10();
        }
        else { $("#state").html("正在进【申请提现】。。。"); Tool.at(str); }
    },
    a10: function () {
        let str = '[<r: db="sqlite.dhgate">insert into @.withdraw(@.amount,@.fromid,@.rate,@.Fee,@.Money,@.Note,@.addtime)values(' + this.obj.fineSellerLimit + ',' + this.obj.fromid + ',' + this.obj.rate + ',' + this.obj.Fee + ',' + this.obj.Money + ',\'' + this.obj.Note + '\',\'' + Tool.gettime("") + '\')</r:>]';
        Tool.ajax.a01(str, 1, this.a11, this)
    },
    a11: function (t) {
        if (t[0] == null) {
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
            this.obj.A1++;
            if (this.obj.A1 <= this.obj.A2) {
                this.obj = { A1: this.obj.A1 }
                this.a03();
            }
            else { $("#state").html("全部完成"); }
        }
        else { $("#state").html("更新失败。。。"); Tool.at(t); }
    }
}
fun.a01();