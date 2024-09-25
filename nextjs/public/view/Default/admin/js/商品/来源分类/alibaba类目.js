'use strict';
function ModifiedAB(This,fromID)
{
  if(This.attr("Class")=="Mo MoB")
  {
	$(".Mo"+fromID).hide();This.attr("Class","Mo MoA");
  }
  else
  {
	This.attr("Class","Mo MoB")
	if($(".Mo"+fromID).length)
	{$(".Mo"+fromID).show();}
	else
	{
	  let m1=parseInt(This.css("margin-left"))+20
	  let html='\
	  <strip>\
	  <div class="Mo'+fromID+'">\
	  <r:type where=" where @.from=\'alibaba\' and @.upid=\''+fromID+'\' order by @.sort asc" size=50>\
		<ul class="Tul tr">\
		<li class="w200">\
		<if "<:isleaf/>"=="False"}\
		<a href="javascript:" class="Mo MoA" onclick="ModifiedAB($(this),\'<:fromID/>\')" style="margin-left:'+m1+'px;"></a>&nbsp;<:fromID/>\
		<else/>\
		<a class="Mo" style="margin-left:'+m1+'px;"></a>&nbsp;<:fromID/>\
		</if>\
		</li>\
		<div><:name/>（<:enname/>）\
		<if "<:isleaf/>"=="True"><a href="javascript:" class="detail-button" onclick="attributesAB($(this),\'<:fromID/>\')">查看属性</a></if>\
		</li>\
		</ul>\
	  </r:type>\
	  </div></strip>';
	  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(html)},success:function(result){This.parent().parent().after(result);}});
	}
  }
}