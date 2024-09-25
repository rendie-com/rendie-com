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
    <header class="panel-heading">发退货记录管理</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <th colspan="13"> 高级查询:\
        <Select id="Field">\
          <Option value="where :orderid like \'%$1%\'">订单编号</Option>\
          <Option value="where :ExpressNumber like \'%$1%\'">快递单号</Option>\
        </Select>\
        <Input id="searchword" type="text" size="30" value="<.unarr(6)/>">\
        <Input type="button" value="查询" class="pn" onClick="orderSearch()">\
      </th>\
    </tr>\
    <tr align="center">\
      <td>ID</td>\
      <td>日期</td>\
      <td>订单编号</td>\
      <td nowrap="nowrap">物流状态</td>\
      <td>来源</td>\
      <td>用户名</td>\
      <td nowrap="nowrap">方向</td>\
      <td nowrap="nowrap">客户姓名</td>\
      <td nowrap="nowrap">快递公司</td>\
      <td>快递单号</td>\
      <td nowrap="nowrap">经手人</td>\
      <td nowrap="nowrap">签收</td>\
      <td align="left">备注/说明</td>\
    </tr>\
    <r:logdeliver size=20 page=4 where=" <.unarr(5)/> order by @.DeliverDate desc,@.id asc">\
      <tr align="center">\
        <td align="left" nowrap="nowrap"><input type="checkbox" value="<:id/>" name="pre_id"  class="checkbox" id="check-<:id/>"/>\
          <label for="check-<:id/>"><:id/></label></td>\
        <td nowrap="nowrap"><:DeliverDate style=yyyy/mm/dd/><br>\
          hh:mm:ss]</td>\
        <td><:orderid/></td>\
        <td><if "<:sendType/>"=="all"||"<:sendType/>"=="1">\
          全部发货\
          <elseif "<:sendType/>"=="part"||"<:sendType/>"=="2"}部分发货\
          <else/>\
          <:sendType/>\
          </if></td>\
        <td><:from/></td>\
        <td><:username/></td>\
        <td>{if <:DeliverType/>==1}发货{elseif <:DeliverType/>==2}退货\
          <else/>\
          未知\
          </if></td>\
        <td nowrap="nowrap"><if "<:clientname/>"==""><:firstName/> <:lastName/>\
            <else/>\
            <:username/></if></td>\
        <td nowrap="nowrap"><:APIopen/></td>\
        <td><:ExpressNumber/></td>\
        <td><:handlername/></td>\
        <td>{if <:status/>==1}<font color=red>&radic;</font>\
          <else/>\
          &Chi;\
          </if></td>\
        <td align="left" class="AutoNewline"><:remark/></td>\
      </tr>\
    </r:logdeliver>\
    <tr>\
      <td colspan="13"><input type="button" class="pn" value="反选" />\
        <input id="logdeliverDel" type="button" class="pn" value="批量删除"/></td>\
    </tr>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();