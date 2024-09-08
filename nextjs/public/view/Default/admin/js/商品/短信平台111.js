'use strict';
$(function(){
	$('#smssave').click(function(){
		let isSMS=$("[name='isSMS']:checked").val(),SMSuser=$("#SMSuser").val(),SMSpwd=$("#SMSpwd").val(),SMSuserReg=$("#SMSuserReg").val(),SMSPaycomplete=$("#SMSPaycomplete").val(),SMSInsufficientAmount=$("#SMSInsufficientAmount").val()
		let html="<r: tag=\"sql\">update @.config set @.isSMS="+isSMS+",:SMSuser='"+SMSuser+"',:SMSpwd='"+SMSpwd+"',:SMSuserReg='"+SMSuserReg+"',:SMSPaycomplete='"+SMSPaycomplete+"',:SMSInsufficientAmount='"+SMSInsufficientAmount+"' where @.id=1</r:>"
		$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){
			alert(txt+"修改成功");
			window.location.reload();
		}});
	})	
})