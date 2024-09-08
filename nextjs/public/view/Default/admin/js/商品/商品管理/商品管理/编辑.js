'use strict';
function EditProduct()
{
  let oEditor = FCKeditorAPI.GetInstance("pre_content");
	let pre_content=oEditor.GetXHTML(true)
	let AttributeCart=$("#AttributeCart").val()
	let str="<r: tag=\"sql\">update @.product set @.des='"+pre_content+"',:AttributeCart='"+AttributeCart+"' where @.id="+obj.arr4+"</r:>修改成功"
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(str)},success:function(t){
		alert(t);location.reload() 
  }});
}
function input_text(This,L,R)
{
		This.html('<input type="text" style="width:'+This.width()+'px" value="'+R+'" onblur="input_text_blur($(this),\''+L+'\')"/>');
		This.children("input").select();
}
function input_text_blur(This,L)
{
	let str="<r: tag=\"sql\">update @.product set @."+L+"='"+This.val()+"' where @.id="+obj.arr4+"</r:>操作成功"
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(str)},success:function(t){
		This.parent().html(This.val())
  }});
}
