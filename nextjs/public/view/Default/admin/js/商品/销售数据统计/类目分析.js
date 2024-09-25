'use strict';
function ModifiedAB(This,id)
{
  if (This.attr("Class")=="Mo MoB")
  {This.attr("Class","Mo MoA");$(".Mo"+id).hide();}
  else
  {
	This.attr("Class","Mo MoB")
	if($(".Mo"+id).length)
	{$(".Mo"+id).show();}
	else
	{
	  let m1=parseInt(This.css("margin-left"))+20
	  let html='<strip><ul class="Mo'+id+'"><.LoadScript(admin/html/商城/销售数据统计/类目分析.js)/>\
	  <r:type where=" where @.from=\'aliexpress\' and @.upid=\''+id+'\' order by @.sort asc" size=200>\
	  <li class="tr">\
	  <div class="w200">\
		<if "<:isleaf/>"=="False"}\
		  <a href="javascript:" class="Mo MoA" onclick="ModifiedAB($(this),\'<:fromID/>\')" style="margin-left:'+m1+'px;"></a>&nbsp;<:fromID/>\
		<else/>\
		  <a class="Mo" style="margin-left:'+m1+'px;"></a>&nbsp;<:fromID/>\
		</if>\
	  </div>\
	  <div>\
		<:name/>（<:enname/>）\
	  <b>【<:fromID Fun="Fun(run(aliexpressType($1)))"/>】</b></div>\
	  </li>\
	  </r:type></ul></strip>';
	  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(html)},success:function(result){This.parent().parent().after(result);}});
	}
  }
}
