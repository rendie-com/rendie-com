function input_text(This,L,R)
{
  if(!This.children("input").is("input")){This.html('<input type="text" style="width:'+This.width()+'px" value="'+R+'" onblur="input_text_blur($(this),\''+L+'\')"/>');This.children("input").select();}
}
function input_text_blur(This,L)
{
	
  let val=This.val(),html;
	if(L=="pwd")
	{html="<r: tag=\"sql\">update @.user set @."+L+"='"+CryptoJS.MD5(val).toString()+"' where @.id="+obj.arr4+"</r:>"}
	else
	{html="<r: tag=\"sql\">update @.user set @."+L+"='"+val+"' where @.id="+obj.arr4+"</r:>";}
  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){This.parent().html(val);}});
}