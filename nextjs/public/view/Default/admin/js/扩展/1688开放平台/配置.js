'use strict';
function APIaccountAdd()
{
	let html='<rendie:area tag="sql">insert into @.APIaccount(:from)values (\'1688\')</rendie:area>添加成功'
	$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){alert(txt);location.reload();}});
}
function input_text(This,id,L)
{
  if(!This.children("input").is("input")){This.html('<input type="text" style="width:100%" value="'+This.html()+'" onblur="input_text_blur($(this),'+id+',\''+L+'\')"/>');This.children("input").focus();}
}
function input_text_blur(This,id,L)
{
  let str,val=This.val(),html="<rendie:area tag=\"sql\">update @.APIaccount set @."+L+"='"+val+"' where @.id="+id+"</rendie:area>"
  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){
	  This.parent().html(val);
  }});
}