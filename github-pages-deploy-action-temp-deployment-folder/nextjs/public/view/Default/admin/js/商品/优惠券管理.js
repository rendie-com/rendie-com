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
      <tr align="center">\
      <td width="50" align="center">选择</td>\
      <td>优惠券名</td>\
      <td>面值</td>\
      <td>订单下限</td>\
      <td>发放方式</td>\
      <td>发放数量</td>\
      <td>有效期</td>\
      <td>状态</td>\
      <td>管理操作</td>\
    </tr>\
    <r:shopcoupon size=25 page=4>\
      <tr align="center">\
        <td align="left"><input type="checkbox" value="[shopcoupon:id]" name="pre_id"  class="checkbox" id="check-[shopcoupon:id]" />\
          <label for="check-[shopcoupon:id]">[shopcoupon:id]</label></td>\
        <td>[shopcoupon:name]</td>\
        <td><font color=red>[shopcoupon:FaceValue]</font>元</td>\
        <td><font color=red>[shopcoupon:minamount]</font>元</td>\
        <td><if "[shopcoupon:CouponType]"=="0">按用户发放\
            <elseif "[shopcoupon:CouponType]"=="1"/>\
            线下发放<elseif "[shopcoupon:CouponType]"=="2"/}按订单金额发放\
<elseif "[shopcoupon:CouponType]"=="3"/}新会员自动发放\
            <else/>\
            未知</if></td>\
        <td><span style="color:red;font-weight:bold">\
          <r:ShopCouponuser where=" where @.CouponId=[shopcoupon:id]"> [ShopCouponuser:count(*)] </r:ShopCouponuser>\
          </span></td>\
        <td><font color="#999999"> [shopcoupon:begindate]&nbsp;至&nbsp;[shopcoupon:enddate]</font></td>\
        <td> {if 1>0} <font color=green>已过期</font>{elseif [shopcoupon:status]==1/} <font color=#cccccc>正常</font>\
          <else/>\
          <font color=red>禁用</font>\
          </if></td>\
        <td nowrap="nowrap"><r:type where=" where @.from=\'rendie\' and @.upid=<.arr(3)/> order by @.sort asc"> <a href="?list/<:id/>/[shopcoupon:id].html"><:name/></a>&nbsp;|&nbsp; </r:type>\
          <a rel="[shopcoupon:id]" href="javascript:" class="CouponDel">删除</a></td>\
      </tr>\
    </r:shopcoupon>\
    <tr>\
      <td colspan="9"><input type="button" class="pn" value="反选" />\
        <input type="button" value="批量删除" id="CouponAllDel" class="pn"/></td>\
    </tr>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();

/*

$(function(){
  $(".CouponDel").click(function(){
	let obj=$(this)
	if(confirm('删除优惠券,将同时删除原已分配数据且不可恢复,确定删除该优惠券吗？'))
	{
	  $.get("ajax/admin_shop.aspx?CouponDel/"+$(this).attr("rel")+Math.random(),function(result){
	  if(result){obj.parent().parent().remove();}else{alert("删除优惠券,失败！")}
	  });
    }
  });
  $("#CouponAllDel").click(function(){
	let ids=""
	if(confirm('删除优惠券,将同时删除原已分配数据且不可恢复,确定删除该优惠券吗？'))
	{
	  $('input[name="pre_id"]:checked').each(function(){
		  if(ids=="")
		  {
			ids=$(this).val()
		  }
		  else
		  {
			ids=ids+","+$(this).val()
		  }
	  });
	  if(ids==""){alert("请选择ID");return false}
	  $.get("ajax/admin_shop.aspx?CouponDel/"+ids+Math.random(),function(result){
	  if(result){
	  $('input[name="pre_id"]:checked').each(function(){$(this).parent().parent().parent().remove();});
	  }else{alert("删除优惠券,失败！")}
	  });
    }
  });
})
*/