'use strict';
$(function(){
  $(".makeHtmlTab li").click(function(){
	 if($(this).attr("rel")=="1"){obj.code.mode=1;}else{obj.code.mode=0;}
	 $(".makeHtmlTab li").removeClass();
	 $(this).attr("class","hover");
	 getHTML();
  })
  $(".makeHtmlTab li[rel='"+obj.code.mode+"']").attr("class","hover");
  getHTML()
});
function getHTML(){
  $("#table").html("<tr align='center'><td><img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/></td></tr>")
  let URL=returnURL(obj.code.a[obj.code.mode]),html
	$.ajax({
		type: "POST", url: obj.mode + "exe.html?" + Math.random(), data: { data: encodeURIComponent("<.GetHttpWebRequest(" + URL + "," + obj.code.a[obj.code.mode].charset + ")/>") },success:function(txt){
	txt=txt.replace(/\<\/textarea\>/ig,"&lt;/textarea&gt;");
	html='\
	<tr><td colspan="2" align="center"><font id="stephit1">１. 设置基本参数</font>&nbsp;&nbsp;<font id="stephit2" color="red">２. 列表页连接设置</font>&nbsp;&nbsp;<font id="stephit3">３. 内容页连接设置</font>&nbsp;&nbsp;<font id="stephit4">４. 预览结果</font></td></tr><tr><td class="label">采集地址：</td><td><a href="'+URL+'" target="_blank">'+URL+'</a></td></tr>\
		<tr id="htmltable">\
			<td class="label" nowrap="nowrap">显示源码：</td><td><textarea id="htmlcode" style="width:950px;height:200px;font-family:Fixedsys" wrap="off" readonly>'+txt+'</textarea>\
			</td>\
		</tr>\
  <tr>\
	  <td class="label">列表链接：</td>\
	  <td>\
		  <table class="tb2">\
			  <tr><th>说明</th><th style="text-align:left">截取开始位置:</th><th style="text-align:left">截取结束位置:</th></tr>\
			  <tr align="center"><td>列表</td><td><textarea id="listA" rows="3" cols="50">'+obj.code.b[obj.code.mode].listA+'</textarea></td><td><textarea id="listB" rows="3" cols="50">'+obj.code.b[obj.code.mode].listB+'</textarea></td></tr>\
			  <tr align="center"><td>链接</td><td><textarea id="mlinkA" rows="3" cols="50">'+obj.code.b[obj.code.mode].mlinkA+'</textarea></td><td><textarea id="mlinkB" rows="3" cols="50">'+obj.code.b[obj.code.mode].mlinkB+'</textarea></td></tr>\
			  <tr align="center"><td>商品ID</td><td align="left"><textarea id="proidA" rows="3" cols="50">'+obj.code.b[obj.code.mode].proidA+'</textarea><br/>用于区分，在获取列表页内容时，判断商品是否存在，如果存在则跳过。</td><td valign="top"><textarea id="proidB" rows="3" cols="50">'+obj.code.b[obj.code.mode].proidB+'</textarea></td></tr>\
			  <tr>\
				  <td>特殊链接处理</td><td colspan="2">\
				  <input type="radio" name="isspecialmlink" id="isspecialmlink-0" value="0" onClick="$(\'#specialmlinkbody\').hide();" '+(obj.code.b[obj.code.mode].isspecialmlink=="0"?'checked="checked"':'')+'/>\
				  <label for="isspecialmlink-0">不作设置</label>\
				  <input type="radio" name="isspecialmlink" id="isspecialmlink-1" value="1" onClick="$(\'#specialmlinkbody\').show()" '+(obj.code.b[obj.code.mode].isspecialmlink=="1"?'checked="checked"':'')+'/>\
				  <label for="isspecialmlink-1">替换地址</label>（对于使用了JavaScript跳转形式的连接请使用此功能）\
				  </td>\
			  </tr>\
			  <tbody id="specialmlinkbody" '+(obj.code.b[obj.code.mode].isspecialmlink=="0"?'style="display:none"':'')+'>\
			  <tr><td>要替换的地址</td><td colspan="2"><textarea id="mlinkRR" rows="3" cols="100">'+obj.code.b[obj.code.mode].mlinkRR+'</textarea><p class="red">实际连接:/list/?[变量].html</p></td></tr>\
			  </tbody>\
		  </table>\
	  </td>\
  </tr>\
	<tr>\
	<td class="label"></td>\
	<td>\
	  <a href="javascript:" class="button left" onClick="prestep()">上一步</a>\
	  <a href="javascript:" class="button" onClick="nextstep()">下一步</a>\
	</td>\
	</tr>'
	$("#table").html(html)
  }});		
}
function returnURL(obj2){
  let reverse,URL=obj2.pageurl1
  if(obj2.pageset=="1"||obj2.pageset=="3")
  {
	URL=URL.replace(/\{\$ID\}/,obj2.istart);
  }
  else if(obj2.pageset=="2")
  {
	let arr=(obj2.pageurl2).split("\n")
	if(obj2.reverse=="0"){reverse=0}else{reverse=arr.length-1}
	URL=arr[reverse];
  }
  else if(obj2.pageset=="2"){alert("【提交分页】还没做");}
  return URL
}
function prestep(){maincontent(obj.typeLink1);}
function nextstep(){
  obj.code.mode=obj.code.mode//手机版  或   电脑版
  obj.code.b[obj.code.mode].listA=$("#listA").val();obj.code.b[obj.code.mode].listB=$("#listB").val();//列表
  obj.code.b[obj.code.mode].mlinkA=$("#mlinkA").val();obj.code.b[obj.code.mode].mlinkB=$("#mlinkB").val();//链接
  obj.code.b[obj.code.mode].proidA=$("#proidA").val();obj.code.b[obj.code.mode].proidB=$("#proidB").val();//商品ID
  obj.code.b[obj.code.mode].isspecialmlink=$("[name='isspecialmlink']:checked").val();
  obj.code.b[obj.code.mode].mlinkRR=$("#mlinkRR").val();//要替换的地址
  let html="<r: tag=\"sql\">update @.gatherURL set @.code='"+(JSON.stringify(obj.code)).replace(/'/ig, "''")+"' where @.id="+obj.arr4+"</r:>"
  $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){maincontent(obj.typeLink3);}});
}
