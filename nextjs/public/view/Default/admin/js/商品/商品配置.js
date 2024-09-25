'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    this.a02();
  },
  a02:function()
	{
    let html='\
    <header class="panel-heading">商城配置</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
    <tr>\
      <td align="right">会员交易管理费：<br/>\
        <font color=red>设置仅当启用会员发布时有效。相当于交易中介服务费用</font></td>\
      <td align="left"> 总交易金额的\
        <input type="text" name="Total_transaction_amount" style="text-align:center" size="6" value="{Fun(Config(Total_transaction_amount))}">\
        %<br>\
        <font color=green>会员成功在本站销售商品收取的交易管理费。当用户成功支付订单立即扣取。</font><br>\
        支付货款给卖方的站内短信/Email通知内容：<br>\
        <textarea name=\'management_fee_des\' cols=\'60\' rows=\'4\'>{Fun(Config(management_fee_des))}</textarea>\
        <br/></td>\
    </tr>\
    <tr>\
      <td align="right">商品价格是否含税：</td>\
      <td align="left"><input onClick="$(\'#rate\').show();" name="Price_is_tax" type="radio" value="1"id="Price_is_tax-1">\
        <label for="Price_is_tax-1">是</label>\
        <span id=\'rate\'>(税率设置：\
        <input type="text" name="Tax_rate_set" style="text-align:center" size="6" value="{Fun(Config(Tax_rate_set))}">\
        %)&nbsp;</span>\
        <input onClick="$(\'#rate\').hide();" name="Price_is_tax" type="radio" value="0" id="Price_is_tax-0">\
        <label for="Price_is_tax-0">否</label></td>\
    </tr>\
    <tr>\
      <td align="right">客户需要另外支付运费：</td>\
      <td align="left"><input name="Pay_the_freight" type="radio" value="1" id="Pay_the_freight-1"/>\
        <label for="Pay_the_freight-1">需要</label>\
        <input name="Pay_the_freight" type="radio" value="0" id="Pay_the_freight-0">\
        <label for="Pay_the_freight-0">不需要</label></td>\
    </tr>\
    <tr>\
      <td align="right">美元汇率：</td>\
      <td align="left"><input  name="Dollar_exchange_rate" type="text" style="text-align:center" size="6" value="{Fun(Config(Dollar_exchange_rate))}">\
        <font color=#ff6600>如:1美元=6.7784人民币元 则这里填6.7784</font><br/>\
        当启用paypal国际版支付平台时，系统将根据此汇率将人民币转换为美元进行支付 </td>\
    </tr>\
    <tr>\
      <td align="right">前缀设置：</td>\
      <td align="left"> 订单编号前缀\
        <input type="text" style=\'text-align:center\' name="Order_prefix" size="6" value="{Fun(Config(Order_prefix))}">\
        在线支付单编号前缀：\
        <input type="text" style=\'text-align:center\' name="Online_prefix" size="6" value="{Fun(Config(Online_prefix))}">\
        <font color=red>不加前缀请留空</font></td>\
    </tr>\
    <tr>\
      <td align="right">商城付款方式：</td>\
      <td align="left"><input type=\'radio\' name=\'Mall_payment\' id="Mall_payment-1" value=\'1\'>\
        <label for="Mall_payment-1">一次性付款</label>\
        <br/>\
        <input type=\'radio\' name=\'Mall_payment\' value=\'2\' id="Mall_payment-2">\
        <label for="Mall_payment-2">不允许一次性付款，只能固定付定金</label>\
        <input type="text" name="Fixed_deposit" size="6" value="{Fun(Config(Fixed_deposit))}" style="text-align:center">\
        元<br/>\
        <input type=\'radio\' name=\'Mall_payment\' value=\'3\' id="Mall_payment-3">\
        <label for="Mall_payment-3">可以付全款，也可以付定金，但定金不能少于</label>\
        <input type="text" name="Deposit_not_less_than" size="6" value="{Fun(Config(Deposit_not_less_than))}" style="text-align:center">\
        元<br/></td>\
    </tr>\
    <tr>\
      <td align="right">收到银行汇款后站内短信/Email通知内容：</td>\
      <td align="left"><textarea name=\'remittance_Email_SMS\' cols=\'60\' rows=\'4\'>{Fun(Config(remittance_Email_SMS))}</textarea></td>\
    </tr>\
    <tr>\
      <td align="right">退款后站内短信/Email通知内容：</td>\
      <td align="left"><textarea name=\'refund_Email_SMS\' cols=\'60\' rows=\'4\'>{Fun(Config(refund_Email_SMS))}</textarea></td>\
    </tr>\
    <tr>\
      <td align="right">开发票后站内短信/Email通知内容：</td>\
      <td align="left"><textarea name=\'invoice_Email_SMS\' cols=\'60\' rows=\'4\'>{Fun(Config(invoice_Email_SMS))}</textarea></td>\
    </tr>\
    <tr>\
      <td align="right">发出货物后站内短信/Email通知内容：</td>\
      <td align="left"><textarea name=\'delivery_Email_SMS\' cols=\'60\' rows=\'4\'>{Fun(Config(delivery_Email_SMS))}</textarea></td>\
    </tr>\
    <tr>\
      <td align="right"></td>\
      <td align="left"><input type="submit" value="确认更新" class="pn" /></td>\
    </tr>\
    </FORM>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();