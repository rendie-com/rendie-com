'use strict';
function OrderDel(id)
{
	let html="<r: tag=\"sql\">delete from @.order where @.id="+id+"</r:>删除成功"
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){alert(txt);window.location.reload();}});
}