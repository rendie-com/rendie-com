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
    <header class="panel-heading">捆绑商品管理</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td>序号</td>\
      <td>小图</td>\
      <td>商品名称</td>\
      <td>参考价</td>\
      <td>商城价</td>\
      <td>添加时间</td>\
      <td>捆绑商品数</td>\
      <td>操作</td>\
    </tr>\
      <r:product size=20 page=3 where=" where @.ID in(select distinct(:proid) from @.ShopBundleSale) and  :hide=0 order by @.id desc">\
        <tr>\
          <td><:id/>\
            <input type=\'hidden\' name=\'id\' value=\'<:id/>\'></td>\
          <td><Img src=\'images/<:pic tag=1-3-1/>\' width=\'40\' height=\'40\' /></td>\
          <td><a href="<:id/>" target="_blank"><:name/></a></td>\
          <td><:PriceMarket f=2/> 元</td>\
          <td><:price f=2/> 元</td>\
          <td><:addtime/></td>\
          <r:ShopBundleSale where=" where @.proid=<:id/>" size=1>\
            <td><font color=red>[ShopBundleSale:count(*)]</font> 件</td>\
          </r:ShopBundleSale>\
          <td><a href=\'ajax/admin_shop.aspx?DelBundleSale/<:id/>.html\' onclick="return(confirm(\'确定移除所有捆绑定吗?\'));">移除</a> &nbsp;|&nbsp; <a href=\'<:id/>\'>修改</a></td>\
        </tr>\
      </r:product>\
    </form>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();