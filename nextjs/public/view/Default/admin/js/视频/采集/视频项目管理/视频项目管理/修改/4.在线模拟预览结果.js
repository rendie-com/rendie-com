'use strict';
$(function(){
  $(".makeHtmlTab li").click(function(){if($(this).attr("rel")=="1"){obj.code.mode=1;}else{obj.code.mode=0;}$(".makeHtmlTab li").removeClass();$(this).attr("class","hover");returnURL();})
  $(".makeHtmlTab li[rel='"+obj.code.mode+"']").attr("class","hover");
  returnURL()
});
function returnURL(){
  obj.isMode=4//表示在演示页面
  $("#tbody").html("<tr align='center'><td><img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/></td></tr>")
  if(obj.code.a[obj.code.mode].pageset=="1")//分页设置：	不分页	 批量分页	 手动分页	 直接采集内容页(分页)	 提交分页(post)
  {
	  obj.listUrl=obj.code.a[obj.code.mode].pageurl1.replace(/\{\$ID\}/,obj.code.a[obj.code.mode].istart);
	  $.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: encodeURIComponent("<.WebRequestGet(" + obj.listUrl + ")/>") }, success: function (htmlcode) { ListHTML(htmlcode) } });
  }
}
function ListHTML(htmlcode)
{
  if(obj.typemode=="1"){type=StrSlice(htmlcode,obj.code.b[obj.code.mode].typeA,obj.code.b[obj.code.mode].typeB);}//获取分类ID方式
  let str=StrSlice(htmlcode,obj.code.b[obj.code.mode].listA,obj.code.b[obj.code.mode].listB);
  if(str===false){
		let html="<tr><td class=\"label\">出错说明：</td><td>获取列表页内容是否正确.</td></tr>\
		<tr><td class=\"label\">访问链接：</td><td><a href='view-source:"+obj.listUrl+"' target=\"_blank\">view-source:"+obj.listUrl+'</a></td></tr>\
		<tr><td class=\"label\">内容：</td><td><textarea rows="10" style="width:98%;" id="viewsource">'+htmlcode.replace("</textarea>","<\\/textarea>")+'</textarea></td></tr>\
		<tr><td></td><td><a href="javascript:" class="button" onClick="FunListHTML()">提交源码</a></td></tr>'
		$("#tbody").html(html)
  }
  else
  {
		str=StrSlice(str,obj.code.b[obj.code.mode].mlinkA,obj.code.b[obj.code.mode].mlinkB);
		if(str===false){if(!confirm("截取 链接开始~数据链接结束 失败\n\n点[确定]忽略这错误提示，[取消]返回修改")){return;}}
		if(obj.code.b[obj.code.mode].isspecialmlink=="1"){str=obj.code.b[obj.code.mode].mlinkRR.replace("[变量]",str)}//特殊链接处理
		obj.articleUrl=str
    $("#tbody").html("<tr align='center'><td><img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>正在获取内容。。。<hr>"+str+"</td></tr>")
	  $.ajax({ type: "post", url: "exe.html?" + Math.random(), data: { data: encodeURIComponent("<.GetHtmlSource2(" + obj.articleUrl + ")/>") }, success: function (result) { returnArticle(result); } });
  }
	//obj.articleUrl="https://www.aliexpress.com/item/2016-Hot-Selling-100FT-Expandable-Magic-Flexible-Hose-Water-For-Garden-Car-Pipe-Plastic-Hoses-To/32591331598.html"
}
function FunListHTML()
{
	let str=$('#viewsource').val()
  $("#tbody").html("<tr align='center'><td><img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>正在提交。。。</td></tr>")
  ListHTML(str)
}
function returnArticle(htmlcode)
{
  $("#tbody").html("<tr align='center'><td><img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>已获取内容页内容。。。</td></tr>")
  let type=StrSlice(htmlcode,obj.code.c[obj.code.mode].typeA,obj.code.c[obj.code.mode].typeB);//获取分类ID方式
  if(type){obj.sql=[];obj.sql[0]=Object();AjaxSQL(htmlcode,0);}
  else
  {
		let html="<tr><td class=\"label\">出错说明：</td><td>获取不到【分类ID】,请检查内容是否正确.</td></tr>\
		<tr><td class=\"label\">访问链接：</td><td><a href='view-source:"+obj.articleUrl+"' target=\"_blank\">view-source:"+obj.articleUrl+'</a></td></tr>\
		<tr><td class=\"label\">内容：</td><td><textarea rows="10" style="width:98%;" id="viewsource">'+htmlcode+'</textarea></td></tr>\
		<tr><td></td><td><a href="javascript:" class="button" onClick="returnArticle($(\'#viewsource\').val())">提交源码</a></td></tr>'
		$("#tbody").html(html)
  }
}
function subArticle(){returnArticle($("#viewsource").val())}