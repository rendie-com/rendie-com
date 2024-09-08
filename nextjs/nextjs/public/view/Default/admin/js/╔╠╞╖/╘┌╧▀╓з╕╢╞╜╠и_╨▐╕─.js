'use strict';
function input_text(This,L,R)
{
  if(!This.children("input").is("input")){This.html('<input type="text" style="width:'+This.width()+'px" value="'+R+'" onblur="input_text_blur($(this),\''+L+'\')"/>');This.children("input").select();}
}
function input_text_blur(This,L)
{
  let str,val=This.val(),html="<r: tag=\"sql\">update @.paymentplat set @."+L+"='"+val+"' where @.id="+obj.arr4+"</r:>"
  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){This.parent().html(val);}});
}
