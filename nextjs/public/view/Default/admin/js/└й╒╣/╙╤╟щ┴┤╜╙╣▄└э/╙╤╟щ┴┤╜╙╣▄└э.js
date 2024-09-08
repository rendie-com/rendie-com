'use strict';
$(function(){
  $('#LinkEditAll').click(function(){
		let sql=[],id
		$("[name='pre_id']:checked").each(function()//捆绑商品
		{
			id=$(this).val()
			sql[sql.length]="update @.link set @.name='"+$("#pre_name"+id).val()+"',:url='"+$("#pre_url"+id).val()+"',:sort='"+$("#pre_sort"+id).val()+"' where @.id="+id
		});
		sql=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<rendie:area tag=\"sql\">"+sql.join("<1/>")+"</rendie:area>修改成功")},async:false}).responseText;
		alert(sql)
		location.reload();
	});	
})