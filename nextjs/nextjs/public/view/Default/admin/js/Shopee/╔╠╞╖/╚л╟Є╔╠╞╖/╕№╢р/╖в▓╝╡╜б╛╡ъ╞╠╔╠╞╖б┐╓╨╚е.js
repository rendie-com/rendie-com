'use strict';
var fun =
{
    obj:
    {
        type1: 0,//速卖通的一级类目
        site: "",//站点
        mode: 0,//发布数量
    },
    a01: function () {
        $("#state").html("正在获得配置参数");
        let data = [{
            action: "sqlite",
            database: "aliexpress",
            sql: "select @.fromid as fromid,@.name as name FROM @.type where @.upid=0 and @.isleaf=0 order by @.sort desc,@.id asc",
        }]
        
        Tool.ajax.a01(data, this.a02, this)
    },
    a02: function (t) {
        let html = Tool.header(obj.params.return,"Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 发布到【店铺商品】中去") + '\
        <div class="p-2">\
             <table class="table table-hover align-middle mb-0">\
                 <tbody>\
                    <tr><td class="right w200">发布站点：</td><td colspan="2">'+ this.b01() + '</td></tr>\
                    <tr><td class="right">发布类目：</td><td colspan="2">'+ this.b02(t[0]) + '</td></tr>\
                    <tr><td class="right">发布数量：</td><td colspan="2">'+ this.b05() + '</td></tr>\
                    <tr><td class="right">参数：</td><td colspan="2" class="p-0" id="parameter"></td></tr>\
                    <tr><td class="right">账号：</td><td colspan="2" id="username"></td></tr>\
                    <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                    <tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
                    <tr><td class="right">物流方式：</td><td colspan="5" id="logistics" class="p-0"></td></tr>\
                    <tr><td class="right">不包邮定价：</td><td colspan="2" class="p-0">'+ this.b03() + '</td></tr>\
                 </tbody>\
                 <tbody id="tbody"></tbody>\
             </table>\
         </div>'
        Tool.html(this.a03, this, html)
    },
    a03: function () {
        //this.d01()
    },
    /////////////////////////////////////////////////
    b01: function () {
        return '\
         <select class="form-select"  onChange="fun.c01($(this),this.options[this.selectedIndex].value)">\
             <option value="-_-20">请选择发布的站点</option>\
             <option value="tw">台湾虾皮</option>\
             <option value="my">马来西亚</option>\
             <option value="br">巴西</option>\
         </select>'
    },
    b02: function (typeArr) {
        let nArr = [];
        for (let i = 0; i < typeArr.length; i++) {
            nArr.push('<option value="' + typeArr[i].fromid + '">' + (i+1) + '.' + typeArr[i].name + '</option>');
        }
        return '\
         <select onChange="fun.c02($(this),this.options[this.selectedIndex].value)" class="form-select">\
           <option value="-_-20">速卖通类目</option>\
           ' + nArr.join("") + '\
         </select>';
    },
    b03: function () {
        return '\
         <table class="table mb-0 align-middle">\
             <tr>\
                 <td class="right">店铺商品价格 = </td>\
                 <td colspan="5">全球商品价格 * 站点调价比例 + 跨境物流成本（藏价）<hr style="background-color: #000;"/>1 - 佣金费率 - 活动服务费率 - 交易手续费率</td>\
             </tr>\
             <tr class="table-light"><th colspan="6">例1：【马来西亚】站点</th></tr>\
             <tr>\
                 <td class="right">全球商品价格：</td>\
                 <td>10 USD</td>\
                 <td class="right">站点调价比例：</td>\
                 <td>200 %</td>\
                 <td class="right">跨境物流成本（藏价）：</td>\
                 <td>15 MYR</td>\
             </tr>\
             <tr>\
                 <td class="right">佣金费率：</td>\
                 <td>7.56 %</td>\
                 <td class="right">活动服务费率：</td>\
                 <td>7.56 %（参加了活动）</td>\
                 <td class="right">交易手续费率：</td>\
                 <td>2 %</td>\
             </tr>\
             <tr>\
                 <td class="right">汇率：</td>\
                 <td>1 USD = 4.8 MYR</td>\
                 <td class="right">店铺商品价格：</td>\
                 <td colspan="3"><b>((10 * 4.8 * 2) + 15) / (1 - 0.0756 - 0.0756 - 0.02) ≈ 133.93 MYR</b></td>\
             </tr>\
             <tr>\
                 <td class="right"></td>\
                 <td></td>\
                 <td class="right">我际际上是这么做的：</td>\
                 <td colspan="3">\
                    （1）“站点调价比例”就是“利润率”，“跨境物流成本（藏价）”就是“运费”。<br/>\
                    （2）不要“运费”。因为买10件，可能还是这个运费。<br/>\
                    例如：要50%利润还要打5折，的定价是多少?<br/>\
                    商品价格 = 全球商品价格 * 汇率 * 利润率 = 10 * 4.8 * (1 + 0.5) = 10 * 4.8 * 1.5 = 72<br/>\
                    打折前 = 商品价格 / 5折  = 72 / 0.5 = 144（按这个+公式定原价）<br/>\
                    打折后 = 打折前 * 0.5 = 144 * 0.5 = 72（按这个+公式为成交价）<br/>\
                    店铺商品价格 = 打折后 / (1 - 佣金费率 - 活动服务费率 - 交易手续费率) <br/>\
                    = 72 / (1 - 0.0756 - 0.0756 - 0.02)<br/>\
                    = 72 / 0.8288<br/>\
                    = 86.872586872586872586872586872587<hr/>\
                    已知成交价，反推成本：<br/>\
                    平台费 = 店铺商品价格 * (佣金费率 + 活动服务费率 + 交易手续费率) <br/>\
                    = 86.872586872586872586872586872587 * (0.0756 + 0.0756 + 0.02)<br/>\
                    = 86.872586872586872586872586872587 * 0.1712<br/>\
                    = 14.872586872586872586872586872587<br/>\
                    我的价格 = 店铺商品价格 - 平台费 - 成本价<br/>\
                    = 86.872586872586872586872586872587 - 14.872586872586872586872586872587 - 10 * 4.8<br/>\
                    = 86.872586872586872586872586872587 - 14.872586872586872586872586872587 - 48<br/>\
                    = 24（刚好50%的利润）<br/>\
                </td>\
             </tr>\
             <tr class="table-light"><th colspan="6">例2：【巴西】站点</th></tr>\
             <tr>\
                 <td class="right">全球商品价格：</td>\
                 <td>10 USD</td>\
                 <td class="right">站点调价比例：</td>\
                 <td>200 %</td>\
                 <td class="right">跨境物流成本（藏价）：</td>\
                 <td>95.8 BRL</td>\
             </tr>\
             <tr>\
                 <td class="right">佣金费率：</td>\
                 <td>10 %</td>\
                 <td class="right">活动服务费率：</td>\
                 <td>0（没有参加活动）</td>\
                 <td class="right">交易手续费率：</td>\
                 <td>2 %</td>\
             </tr>\
             <tr>\
                 <td class="right">汇率：</td>\
                 <td>1 USD = 5.6 BRL</td>\
                 <td class="right">店铺商品价格：</td>\
                 <td colspan="3"><b>((10 * 5.6 * 2) + 95.8) / (1 - 0.1 - 0 - 0.02) ≈ 236.14 BRL</b></td>\
             </tr>\
         </table>'
    },
    b04: function (oo) {
        return '\
         <table class="table mb-0 align-middle">\
             <tr class="table-light center"><th class="w120"></th><th class="w100">台湾虾皮</th><th class="w100">马来西亚</th><th class="w100">巴西</th><th></th></tr>\
             <tr>\
                 <td class="right">汇率：</td>\
                 <td><input type="text" class="form-control center" value="'+ oo.tw.exchangeRate + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.my.exchangeRate + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.br.exchangeRate + '")" disabled="disabled"></td>\
                 <td></td>\
             </tr>\
             <tr>\
                 <td class="right">佣金费率：</td>\
                 <td><input type="text" class="form-control center" value="'+ oo.tw.commissionRate + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.my.commissionRate + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.br.commissionRate + '")" disabled="disabled"></td>\
                 <td></td>\
             </tr>\
             <tr>\
                 <td class="right">活动服务费率：</td>\
                 <td><input type="text" class="form-control center" value="'+ oo.tw.activityServiceRate + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.my.activityServiceRate + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.br.activityServiceRate + '")" disabled="disabled"></td>\
                 <td></td>\
             </tr>\
             <tr>\
                 <td class="right">满多少免运费：</td>\
                 <td><input type="text" class="form-control center" value="'+ oo.tw.fullPrice + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.my.fullPrice + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.br.fullPrice + '")" disabled="disabled"></td>\
                 <td></td>\
             </tr>\
             <tr>\
                 <td class="right">税率：</td>\
                 <td><input type="text" class="form-control center" value="'+ oo.tw.taxRate + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.my.taxRate + '")" disabled="disabled"></td>\
                 <td><input type="text" class="form-control center" value="'+ oo.br.taxRate + '")" disabled="disabled"></td>\
                 <td></td>\
             </tr>\
             <tr>\
                 <td class="right">说明：</td>\
                 <td colspan="4">以这里的"参数"为准，如果不对，那就把shopee的"参数"复制过来。（注：在shopee填的参数，不会对这里的价格产生影响。）</td>\
             </tr>\
         </table>'
    },
    b05: function () {
        let str = '\
        <select onChange="fun.c03($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">请选择发布数量</option>\
            <option value="1">不限制</option>\
            <option value="2">10条</option>\
            <option value="3">20条</option>\
        </select>';
        return str;
    },
    //////////////////////////////////////////////////////
    c01: function (This, val) {
        This.attr("disabled", "disabled");
        this.obj.site = val;
        this.d01()
    },
    c02: function (This, val) {
        This.attr("disabled", "disabled")
        this.obj.type1 = val;
        this.d01()
    },
    c03: function (This, val) {
        This.attr("disabled", "disabled")
        this.obj.mode = val;
        this.d01()
    },
    //////////////////////////////////////////////////////
    d01: function () {
        if (this.obj.site && this.obj.type1 && this.obj.mode) {
            Tool.login.a01(this.d02, this);
        }
    },
    d02: function (t) {
        $("#parameter").html(this.b04(t))
        Tool.logistics.a01(this.obj.site, $("#logistics"), this.d03, this, t)
    },
    d03: function (logistics, seller) {
        Tool.release.a01(this.obj, logistics, seller, $("#tbody"), this.d04, this)
    },
    d04: function () {
        $("#state").html("全部完成。")
    },
}
fun.a01();