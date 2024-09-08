'use strict';
var fun =
{
  a01: function () {
    //obj.params.jsFile         选择JS文件
    //obj.params.id         
    //obj.params.return         
    let data = [{
      action: "sqlite",
      database: "shopee/卖家账户",
      sql: "select " + Tool.fieldAs("username,password,phone,company,note,cookies,sort,config,name") + " FROM @.table where @.id=" + obj.params.id + " limit 1"
    }]
    Tool.ajax.a01(data, this.a02, this)
  },
  a02: function (t) {
    let oo = t[0][0]
    if (!oo.note) oo.note = "";
    let html = Tool.header(obj.params.return, "Shopee  -&gt; 卖家账户 -&gt; 修改") + '\
    <div class="p-2">\
      <table class="table table-hover align-middle" id="div1">\
        <tbody>\
        <tr>\
          <td class="w200 right">用户名：</td>\
          <td class="w-50"><input type="text" class="form-control" value="'+ oo.username + '" onblur="fun.c01($(this),\'username\',\'' + oo.username + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">密码：</td>\
          <td><input type="text" class="form-control" value="'+ oo.password + '" onblur="fun.c01($(this),\'password\',\'' + oo.password + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">提现人：</td>\
          <td><input class="form-control" type="text" value="'+ oo.name + '" onblur="fun.c01($(this),\'name\',\'' + oo.name + '\')"></td>\
          <td></td>\
        </tr>\
          <tr>\
          <td class="right">排序：</td>\
          <td><input type="number" class="form-control" value="'+ oo.sort + '" onblur="fun.c01($(this),\'sort\',\'' + oo.sort + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">手机号：</td>\
          <td><input type="text" class="form-control" value="'+ oo.phone + '" onblur="fun.c01($(this),\'phone\',\'' + oo.phone + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">公司：</td>\
          <td><input type="text" class="form-control" value="'+ oo.company + '" onblur="fun.c01($(this),\'company\',\'' + oo.company + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">备注：</td>\
          <td><input type="text" class="form-control" value="'+ oo.note + '" onblur="fun.c01($(this),\'note\',\'' + oo.note + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
            <td class="right">配置信息：</td>\
            <td class="w-50"><textarea rows="30" class="form-control" onblur="fun.c03($(this))">'+ JSON.stringify(JSON.parse(oo.config), null, 2) + '</textarea></td>\
            <td>\
                shopId = 店铺ID<br/>\
                shopName = 店铺名<br/>\
                activityServiceRate = 活动服务费率<br/>\
                commissionRate = 佣金费率<br/>\
                transactionFees = 交易手续费费率<br/>\
                exchangeRate = 汇率: 1 RMB = 0.6591 MYR<br/>\
                fullPrice = 满RM15买家免费<br/>\
                taxRate = 税率（买家要出的税）<br/>\
                scale = 保留几位小数（例如：台湾站点就没有小数）<br/>\
            </td>\
        </tr>\
        <tr>\
            <td class="right">Cookie：</td>\
            <td class="w-50"><textarea rows="30" class="form-control" disabled>'+ JSON.stringify(JSON.parse(oo.cookies), null, 2) + '</textarea></td>\
            <td></td>\
        </tr>\
      </tbody>\
    </table>\
    </div>'
    Tool.html(null, null, html);
  },
  c01: function (This, L, V) {
    let val = This.val();
    if (val != V && !This.attr("disabled")) {
      This.attr("disabled", true);
      let txt = '"ok"<r: db="sqlite.shopee">update @.seller set @.' + L + '=\'' + val + '\' where @.id=' + obj.arr[4] + '</r:>'
      Tool.at(txt)
      //Tool.ajax.a01(txt, 1, this.c02, this, [This, val]);
    }
  },
  c02: function (t, This) {
    if (t[0].length == 0) {
      This.attr("disabled", false);
    }
    else {
      alert("出错：" + t);
    }
  },
  c03: function (This) {
    /*
    {
      "my": {
        "shopId": 896010703,
        "shopName": "choice.my",
        "priceAdjustment": 200,
        "activityServiceRate": 7.56,
        "commissionRate": 7.56,
        "exchangeRate": 0.6479,
        "fullPrice": 15,
        "taxRate": 10
      },
      "br": {
        "shopId": 911626103,
        "shopName": "cupons.br",
        "priceAdjustment": 200,
        "activityServiceRate": 6,
        "commissionRate": 10,
        "exchangeRate": 0.7058,
        "fullPrice": 19,
        "taxRate": 0
      }
    }
    */
    let val = This.val();
    if (!This.attr("disabled") && val != 0) {
      This.attr("disabled", true);
      try {
        let json = JSON.parse(val);
        let data = [{
          action: "sqlite",
          database: "shopee/卖家账户",
          sql: "update @.table set @.config=" + Tool.rpsql(JSON.stringify(json)) + " where @.id=" + obj.params.id
        }]
        Tool.ajax.a01(data, this.c02, this, This);
      } catch (error) {
        Tool.pre(["JSON格式不对", val]);
      }
    }
  },
}
fun.a01()