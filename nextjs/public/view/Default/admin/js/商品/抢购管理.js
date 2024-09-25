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
    <table class="table table-hover align-middle">\
      <tr>\
      <td align="center">ID</td>\
      <td>任务名称</td>\
      <td>任务类型</td>\
      <td>活动时间</td>\
      <td>最后付款时间</td>\
      <td>状态</td>\
      <td>操作</td>\
    </tr>\
      <input type=\'hidden\' name=\'action\' value=\'BatchSave\'>\
      <r:shoplimitbuy size=25 page=4>\
        <tr>\
          <td align=\'center\'>[ShopLimitBuy:id]\
            <input type=\'hidden\' name=\'id\' value=\'[shoplimitbuy:id]\'></td>\
          <td>[ShopLimitBuy:taskName]</td>\
          <td>{if [ShopLimitBuy:TaskType]==1}限时抢购{elseif [ShopLimitBuy:TaskType]==2}<span style=\'color:red\'>限量抢购</span>\
            </if></td>\
          <td>从[ShopLimitBuy:LimitBuyBeginTime]至[ShopLimitBuy:LimitBuyEndTime]止</td>\
          <td>下单后<font color=red>[ShopLimitBuy:LimitBuyPayTime]</font>小时内</td>\
          <td>{if [ShopLimitBuy:TaskType]==1}正常\
            <else/>\
            关闭\
            </if></td>\
          <td><r:type where=" where @.from=\'rendie\' and @.id=Fun(arr(3))">\
              <r:type where=" where @.from=\'rendie\' and @.upid=\'<:upid/>\' order by @.sort asc" start=2 size=2> {if <:i/>==3} <a href=\'?list/<:id/>/[shoplimitbuy:id].html\'>\<:name/>\
                <r:product where=" where @.limitbuytaskid=[shoplimitbuy:id]"> (<font color=red><:count(:id)/></font>) </r:product>\
                </a>|\
                <else/>\
                <a href=\'?list/<:id/>/[shoplimitbuy:id].html\' ><:name/></a>|\
                </if>\
              </r:type>\
            </r:type>\
            <a href=\'ajax/admin_shop.aspx?DelLimitBuyTask/[shoplimitbuy:id].html\' onClick="return(confirm(\'删除后不可恢复,确定删除吗?\'))">删除</a></td>\
        </tr>\
      </r:shoplimitbuy>\
    </form>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();