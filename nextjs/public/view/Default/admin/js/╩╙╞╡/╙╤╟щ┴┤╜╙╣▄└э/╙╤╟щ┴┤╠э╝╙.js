'use strict';
$(function(){
  $('#pre_type').change(function(){if($(this).val()=="pic"){$("#tr_pre_pic").show()}else{$("#tr_pre_pic").hide()}});	
  $('#LinkAdd').click(function(){
		let obj2={name:$("#pre_name").val(),url:$("#pre_url").val(),type:$("#pre_type").val(),pic:$("#pre_pic").val(),sort:$("#pre_sort").val(),des:$("#pre_des").val()}
		obj2.sort=obj2.sort==""?1:obj2.sort
		let sql="<r: tag=\"sql\">insert into @.link(:type,:name,:pic,:url,:des,:sort)values ('"+obj2.type+"','"+obj2.name+"','"+obj2.pic+"','"+obj2.url+"','"+obj2.des+"',"+obj2.sort+")</r:>添加成功"
		sql=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(sql)},async:false}).responseText;
		alert(sql)
		location.reload();
	});	
})
