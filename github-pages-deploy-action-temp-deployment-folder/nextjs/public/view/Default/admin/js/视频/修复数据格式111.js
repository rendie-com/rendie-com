'use strict';
$(function(){
  $(".makeHtmlTab li").click(function()//显示列表、隐藏列表
  {
	$(".makeHtmlTab li").removeAttr('class')
	$(this).attr("class","hover")
	let i,rel=$(this).attr("rel")
	for (i=1;i<3;i++)
	{
	  if(i==rel)
	  {$("#compress"+i).show()}
	  else
	  {$("#compress"+i).hide()}
	}
  })
})
function compress()
{
	$.ajax({
		type: "POST", url: obj.mode + "exe.html?" + Math.random(), data: { data: encodeURIComponent("<.BtnZipFiles/>") },success:function(txt){
	  document.write(txt);
  }});
}