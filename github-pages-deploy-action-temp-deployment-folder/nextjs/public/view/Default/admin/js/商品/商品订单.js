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
    <header class="panel-heading">商品订单</header>\
    <table class="table table-hover align-middle">\
      <tr>\
      <th colspan="7"> 快速查询：\
        <Select onChange="" size=1 name=SearchType >\
          <Option value=0 selected>所有订单</Option>\
          <Option value=1>24小时之内的新订单</Option>\
          <Option value=2>最近10天内的新订单</Option>\
          <Option value=3>最近一月内的新订单</Option>\
          <Option value=4>未确认的订单</Option>\
          <Option value=5>未付款的订单</Option>\
          <Option value=6>未付清的订单</Option>\
          <Option value=7>未送货的订单</Option>\
          <Option value=8>未签收的订单</Option>\
          <Option value=9>未开发票的订单</Option>\
          <Option value=11>未结清的订单</Option>\
          <Option value=12>已结清的订单</Option>\
          <Option value=13>需要服务跟踪的订单</Option>\
        </Select>\
        &nbsp;&nbsp;\
        高级查询：\
        <Select id="Field" name="Field" >\
          <Option value=1>订单编号</Option>\
          <Option value=2>收货人</Option>\
          <Option value=3>用户名</Option>\
          <Option value=4>联系地址</Option>\
          <Option value=5>联系电话</Option>\
          <Option value=6>下单时间</Option>\
          <Option value=7>推荐人</Option>\
        </Select>\
        <Input id=Keyword type="text">\
        <Input type="button" value="查询" class="pn">\
      </th>\
    </tr>\
    <tr align="center">\
      <td>ID <a href="<r:idorderlink}"> <img src="/<.Path/>admin/img/minus.gif" title="按ID排序" /> </a></td>\
      <td>订单编号</td>\
      <td align="left">子订单列表</td>\
      <td nowrap>下单时间/支付时间</td>\
      <td nowrap>支付金额</td>\
      <td nowrap>采购状态</td>\
      <td nowrap>订单状态</td>\
    </tr>\
    <r:order size=10 page=4 where=" where @.from=\'rendie\' order by @.BeginDate desc,@.id desc">\
      <tr align="center">\
        <td align="left" nowrap><input type="checkbox" value="<:id/>" name="pre_id"  class="checkbox" id="check-<:id/>" />\
          <label for="check-<:id/>"><:id/></label></td>\
        <td><a href="<.arr(1)/>/article/{r:arr(3)/>/<:orderid/>.html"> <:orderid/> </a></td>\
        <td align="left"><table class="tb2">\
            <r:orderitem where=" where @.OrderID=\'<:OrderID/>\'" size=50>\
              <tr>\
                <if "[orderitem:i]"=="1">\
                  <th rowspan="4" align="center"> <a target="_blank" href="[orderitem:pic]"> <img style="margin:2px;padding:1px;border:1px solid #ccc" src="[orderitem:pic]" title="点击预览" border="0" width="50" height="50" align="left"> </a> </th>\
                  <th style="text-align:left"><a href="[orderitem:fromURL]" target="_blank"> [orderitem:name] </a></th>\
                  <else/>\
                  <td rowspan="4" align="center"><a target="_blank" href="[orderitem:pic]"> <img style="margin:2px;padding:1px;border:1px solid #ccc" src="[orderitem:pic]" title="点击预览" border="0" width="50" height="50" align="left"> </a></td>\
                  <td style="text-align:left"><a href="[orderitem:fromURL]" target="_blank"> [orderitem:name] </a></td>\
                </if>\
              </tr>\
              <tr>\
                <td> 编码:\
                  <if "[orderitem:proid]"=="">无\
                    <else/>\
                    [orderitem:proid]</if>\
                  &nbsp;&nbsp;\
                  数量:[orderitem:Amount]（[orderitem:Unit]）\
                  &nbsp;&nbsp;\
                  价格:[orderitem:RealPrice f=2]\
                  &nbsp;&nbsp;\
                  属性:[orderitem:AttributeCart] </td>\
              </tr>\
              <tr>\
                <td>产品备注:[orderitem:Remark]</td>\
              </tr>\
              <tr>\
                <td> 采购地址:\
                  <r:product size=1 where=" where @.from=\'dhgate\' and @.fromid=[orderitem:fromid]"> <a target="_blank" href="<:PurchaseUrl/>"> <:PurchaseUrl/> </a> （ <a target="_blank" href="<.arr(1)/>/list/{rr:attr(type3)/>/<:fromid/>.html"> 修改产品 </a> ） </r:product></td>\
              </tr>\
            </r:orderitem>\
          </table></td>\
        <td><:BeginDate/><br/>\
          /<br/>\
          <:paytime/></td>\
        <td><:MoneyTotal f=2/></td>\
        <td><if "<:PurchaseStatus/>"=="0">待采购\
            <elseif "<:PurchaseStatus/>"=="1"/>\
            待付款\
            <elseif "<:PurchaseStatus/>"=="2"/>\
            已付款\
            <elseif "<:PurchaseStatus/>"=="3"/>\
            退款中\
            <elseif "<:PurchaseStatus/>"=="4"/>\
            取消\
            <elseif "<:PurchaseStatus/>"=="5"/>            无需采购\
            <elseif "<:PurchaseStatus/>"=="6"/>            待取消\
            <elseif "<:PurchaseStatus/>"=="7"/>            问题订单(未发货)\
            <elseif "<:PurchaseStatus/>"=="8"/>            假运单号(已发货)\
            <elseif "<:PurchaseStatus/>"=="9"/>            申请二次采购\
            <elseif "<:PurchaseStatus/>"=="10"/>            采购退款成功\
            <elseif "<:PurchaseStatus/>"=="11"/>            采购退款失败\
            <else/>\
            其它-<:PurchaseStatus/> </if></td>\
        <td nowrap="nowrap"><if "<:status/>"=="111000">订单取消\
            <elseif "<:status/>"=="101003"/>\
            等待买家付款\
            <elseif "<:status/>"=="102001"/>\
            买家已付款，等待平台确认\
            <elseif "<:status/>"=="103001"/>\
            <font color=red>等待您发货</font> <br>\
            <input type="button" class="pn" value="立即发货" onClick="window.location.href=\'<.arr(1)/>/list/{rr:attr(type2)/>/<:OrderID/>.html\'">\
            <br/>\
            超时时间：<:deliveryDeadline/>\
            <elseif "<:status/>"=="105001"/>\
            买家退款中，等待协商结果\
            <elseif "<:status/>"=="105002"/>\
            退款协议已达成\
            <elseif "<:status/>"=="105003"/>\
            部分退款后，等待发货\
            <elseif "<:status/>"=="105004"/>\
            买家取消退款申请\
            <elseif "<:status/>"=="103002"/>\
            已部分发货\
            <elseif "<:status/>"=="101009"/>\
            等待买家确认收货<br>\
            <input type="button" class="pn" value="二次发货" onClick="window.location.href=\'<.arr(1)/>/list/{rr:attr(type2)/>/<:OrderID/>.html\'">\
            <br/>\
            注：二次发货，需卖家后台删除假运单号\
            <elseif "<:status/>"=="106001"/>\
            退款/退货协商中，等待协议达成\
            <elseif "<:status/>"=="106002"/>\
            买家投诉到平台\
            <elseif "<:status/>"=="106003"/>\
            协议已达成，执行中\
            <elseif "<:status/>"=="102006"/>\
            已确认收货\
            <elseif "<:status/>"=="102007"/>\
            超过预定期限，自动确认收货\
            <elseif "<:status/>"=="102111"/>\
            交易成功\
            <elseif "<:status/>"=="111111"/>\
            交易关闭\
            <else/>\
            <:status/> </if>\
          <if "<:isApplyMoney/>"=="True"}<br/>\
          <font style="color:#999999">已请款</font>\
          </if>\
          <r:logdeliver size=1 where=" where @.orderid=\'<:orderid/>\' and @.DeliverType=1"}<br/>\
          <font style="color:#f00">本地已发货</font>\
          </r:logdeliver></td>\
      </tr>\
    </r:order>\
    <tr>\
      <td colspan="12"><input type="button" class="pn" value="反选"  />\
        <input type="button" value="批量删除" class="pn" onClick="if(confirm(\'确定要删除吗\')){OrderDel();}else{return false}"></td>\
    </tr>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();
/*
	function OrderDel()
	{
		let ids=[],txt
		$("input[type='checkbox'][name='pre_id']:checked").each(function(){ids[ids.length]=$(this).val();});
		txt='<ren'+'die:area tag="sql">delete from @.order where @.id in('+ids.join(",")+')</ren'+'die:area>删除成功'
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(txt)},async:false}).responseText;
		alert(txt);
		window.location.reload();
	}
*/