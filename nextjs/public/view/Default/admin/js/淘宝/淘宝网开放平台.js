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
    <table class="tb">\
    <tr align="center">\
      <td width="40">ID</td>\
      <td>client_id</td>\
      <td>client_secret</td>\
      <td>用户名</td>\
      <td>密码</td>\
      <td>负责人</td>\
      <td>排序</td>\
      <td>操作</td>\
    </tr>\
    <r:APIaccount size=50  where=" where @.from=\'taobao\' order by @.sort asc">\
      <tr align="center">\
        <td align="left"><input type="checkbox" value="[APIaccount:id]" name="pre_id"  class="checkbox" id="check-[APIaccount:id]"/>\
          <label for="check-[APIaccount:id]">[APIaccount:id]</label></td>\
        <td><input type="text" id="pre_APPKEY[APIaccount:id]" style="width:99%" value="[APIaccount:APPKEY]"></td>\
        <td><input type="text" id="pre_APPSECRET[APIaccount:id]" style="width:99%" value="[APIaccount:APPSECRET]"></td>\
        <td><input type="text" id="pre_UserName[APIaccount:id]" style="width:99%" value="[APIaccount:UserName]"></td>\
        <td><input type="text" id="pre_password[APIaccount:id]" style="width:99%" value="[APIaccount:password]"></td>\
        <td><input type="text" id="pre_note[APIaccount:id]" style="width:99%" value="[APIaccount:note]"></td>\
        <td><input type="text" id="pre_sort[APIaccount:id]" size="1" style="text-align:center" value="[APIaccount:sort]"></td>\
        <td><if "[APIaccount:hide]"=="0"> <a href="/<.Config(admin)/>/ajax/admin_content.aspx/APIaccount/hide/[APIaccount:id].html">隐藏</a>\
            <else/>\
            <a href="/<.Config(admin)/>/ajax/admin_content.aspx/APIaccount/nohide/[APIaccount:id].html">取消隐藏</a> </if>\
          &nbsp;|&nbsp;<a href="/<.Config(admin)/>/ajax/admin_content.aspx/APIaccount/del/[APIaccount:id].html">删除</a></td>\
      </tr>\
    </r:APIaccount>\
    <tr>\
      <td colspan="8"><input type="button" class="pn" value="反选"  />\
        <input type="button" value="批量修改选中" class="pn" id="APIgatherSelected"></td>\
    </tr>\
    <tr>\
      <th colspan="8">&nbsp;</th>\
    </tr>\
    <tr class="thead">\
      <th colspan="10">添加API账户(<font color=\'red\'>＊</font>为必填,其它选填)</th>\
    </tr>\
    <tr align="center">\
      <td></td>\
      <td>APPKEY<font color=\'red\'>＊</font><br/>\
        <input type="text" id="pre_APPKEY" style="width:99%"></td>\
      <td>APPSECRET<font color=\'red\'>＊</font><br/>\
        <input type="text" id="pre_APPSECRET" style="width:99%"></td>\
      <td>用户名<br/>\
        <input type="text" id="pre_UserName" style="width:99%"></td>\
      <td>密码<br/>\
        <input type="text" id="pre_password" style="width:99%"></td>\
      <td>负责人<br/>\
        <input type="text" id="pre_note" style="width:99%"></td>\
      <td width="25">排序<br/>\
        <input type="text" id="pre_sort" size="1" style="text-align:center"></td>\
      <td><br/>\
        <input type="button" value="添 加" class="pn" style="width:90%;" id="APIaccount"/></td>\
    </tr>\
    <tr>\
      <td align="right" colspan="2">帮助说明：</td>\
      <td align="left" colspan="6"><a href="http://open.taobao.com/" target="_blank">接口文档地址帮助</a></td>\
    </tr>\
  </table>'
    Tool.a01(html)
  }
}
fun.a01();


/*

  
  <script type="text/javascript">
$(document).ready(function(){
	let pre_APPKEY,pre_APPSECRET,pre_UserName,pre_password,pre_note,pre_sort
	$('#APIaccount').click(function(){
		pre_APPKEY=$("#pre_APPKEY").val();pre_APPSECRET=$("#pre_APPSECRET").val()
		pre_UserName=$("#pre_UserName").val();pre_password=$("#pre_password").val()
		pre_note=$("#pre_note").val();pre_sort=$("#pre_sort").val()
		let rtext=$.ajax({type:"POST",url:"/<.Config(admin)/>/ajax/admin_content.aspx/APIaccount/add/taobao.html?"+Math.random(),data:{pre_APPKEY:pre_APPKEY,pre_APPSECRET:pre_APPSECRET,pre_UserName:pre_UserName,pre_password:pre_password,pre_note:pre_note,pre_sort:pre_sort},async:false/>).responseText
		alert(rtext);location.reload();
	})
  $('#APIgatherSelected').click(function(){
	let id,pre_id
	$("input[type='checkbox'][name='pre_id']:checked").each(function(){
		id=$(this).val();pre_id +=","+id;
		pre_APPKEY +="⒜"+$("#pre_APPKEY"+id).val();
		pre_APPSECRET +="⒜"+$("#pre_APPSECRET"+id).val();
		pre_UserName +="⒜"+$("#pre_UserName"+id).val();
		pre_password +="⒜"+$("#pre_password"+id).val();
		pre_note +="⒜"+$("#pre_note"+id).val();
		pre_sort +="⒜"+$("#pre_sort"+id).val();
	});
	let rtext=$.ajax({type:"POST",url:"/<.Config(admin)/>/ajax/admin_content.aspx/APIaccount/edit.html?"+Math.random(),data:{pre_id:pre_id,pre_APPKEY:pre_APPKEY,pre_APPSECRET:pre_APPSECRET,pre_UserName:pre_UserName,pre_password:pre_password,pre_note:pre_note,pre_sort:pre_sort},async:false/>).responseText
	//document.write(rtext)
	alert(rtext);location.reload();
  })
})




$(function(){taobao_tbk_item_get()})
function taobao_tbk_item_get()
{
  let ParamArr=[],URL,sortArr=[],sign,obj2=Object()
	obj2.app_key=obj.app_key
	obj2.appSecret=obj.appSecret
	obj2.method="taobao.tbk.item.get"
	obj2.timestamp=js_date_time((new Date).getTime())
	obj2.format="json"//返回格式,本demo仅支持xml
	obj2.v="2.0"//API版本号
	obj2.cat="16"//后台类目ID
	obj2.sign_method="md5"//签名方式
	obj2.fields="num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick"//返回字段
	for(let x in obj2){sortArr[sortArr.length]=x+obj2[x];ParamArr[ParamArr.length]=x+"="+obj2[x];}
	sortArr.sort()
	//document.write("<pre>"+JSON.stringify(ParamArr,null,2)+"</pre>")
	sign = CryptoJS.MD5(obj.appSecret+sortArr.join("")+obj.appSecret).toString().toUpperCase();
	URL="http://gw.api.taobao.com/router/rest?"+ParamArr.join("&")+"&sign="+sign
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("<.WebClientPost("+URL+")/>")},success:function(txt){taobao_tbk_item_get_001(txt);}/>);
}
function taobao_tbk_item_get_001(txt)
{
	let html='<tr align="center"><td>编号</td>\
	<td title="num_iid">商品ID</td>\
	<td>图片</td>\
	<td title="title" align="left">商品标题</td>\
	<td title="reserve_price">商品一口价格</td>\
	<td title="zk_final_price">商品折扣价格</td>\
	<td title="user_type">卖家类型</td>\
	<td title="provcity">所在地</td>\
	<td title="nick">卖家昵称</td>\
	<td title="seller_id">卖家id</td>\
	<td title="volume">30天销量</td>\
	</tr>',obj3
	eval("let obj2="+txt)
	if(!obj2.error_response)
	{
		obj3=obj2.tbk_item_get_response.results.n_tbk_item
		for(let i=0;i<obj3.length;i++)
		{
		  html+='<tr align="center"><td>'+(i+1)+'</td>\
			<td>'+obj3[i].num_iid+'</td>\
			<td title=\''+JSON.stringify(obj3[i].small_images)+'\'><img style="margin:2px;padding:1px;border:1px solid #ccc" src="'+obj3[i].pict_url+'" border="0" width="50" height="50" align="left"></td>\
			<td align="left"><a target="_blank" href="'+obj3[i].item_url+'">'+obj3[i].title+'</a></td>\
			<td>'+obj3[i].reserve_price+'</td>\
			<td>'+obj3[i].zk_final_price+'</td>\
			<td>'+(obj3[i].user_type==0?"集市":"商城")+'</td>\
			<td>'+obj3[i].provcity+'</td>\
			<td>'+obj3[i].nick+'</td>\
			<td>'+obj3[i].seller_id+'</td>\
			<td>'+obj3[i].volume+'</td>\
			</tr>'
		}
		html+='<tr align="center"><td colspan="11">总数：'+obj2.tbk_item_get_response.total_results+'</td></tr>'
		$("#table").html(html)
	}
	else{alert("出错：\n"+txt);}
}
*/