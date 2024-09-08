'use strict';
$(function(){
  $(".makeHtmlTab li").click(function(){
	 if($(this).attr("rel")=="1"){obj.code.mode=1;}else{obj.code.mode=0;}
	 $(".makeHtmlTab li").removeClass();
	 $(this).attr("class","hover");
	 getHTML();
  })
  $(".makeHtmlTab li[rel='"+obj.code.mode+"']").attr("class","hover");
  getHTML();
});
function getHTML(){
	
  let html='\
  <tr align="center"><td colspan="2"><font id="stephit1" color="red">１. 设置基本参数</font>&nbsp;&nbsp; <font id="stephit2">２. 列表页连接设置</font>&nbsp;&nbsp; <font id="stephit3">３. 内容页连接设置</font>&nbsp;&nbsp; <font id="stephit4">４. 预览结果</font></td></tr><tr>\
	<td class="label">来源：</td>\
	<td><input type="text" id="from" value="'+obj.from+'" size=50 /></td>\
  </tr>\
  <tr>\
	<td class="label">采集配置信息说明：</td>\
	<td><input type="text" id="note" value="'+obj.note.replace(/"/ig,'&quot;')+'" size=50 /></td>\
  </tr>\
  <tr>\
	<td class="label">采集类目说明：</td>\
	<td><input type="text" id="name" value="'+obj.name.replace(/"/ig,'&quot;')+'" size=120 /></td>\
  </tr>\
  <tr>\
	<td class="label">入库方式：</td>\
	<td>\
		<input type="radio" name="into" '+(obj.code.a[obj.code.mode].into=="0"?'checked="checked"':'')+' value="0" id="into-0"/>\
		<label for="into-0">临时库</label>\
		<input type="radio" name="into" '+(obj.code.a[obj.code.mode].into=="1"?'checked="checked"':'')+' value="1" id="into-1"/>\
		<label for="into-1">直接入库(不建议使用，会损成数据库很大 或 损坏)</label>\
	</td>\
  </tr>\
  <tr>\
	<td class="label">网页编码：</td>\
	<td>\
		<input type="text" id="charset" value="'+obj.code.a[obj.code.mode].charset+'" size=10/>\
		<select onChange="$(\'#charset\').val(this.value);">\
		<option value="">请选择编码</option>\
		<option value="GB2312" >GB2312</option>\
		<option value="GBK">GBK</option>\
		<option value="BIG5">BIG5</option>\
		<option value="UTF-8">UTF-8</option>\
		</select>\
	</td>\
  </tr>\
  <tr>\
	<td class="label">分类设置：</td>\
	<td>\
		<input type="radio" name="autocls" value="0" onClick="show(\'selcls\');" '+(obj.code.a[obj.code.mode].autocls=="0"?'checked="checked"':'')+' id="autocls-0"/><label for="autocls-0">固定分类</label>\
		<input type="radio" name="autocls" value="1" onClick="hide(\'selcls\');" '+(obj.code.a[obj.code.mode].autocls=="1"?'checked="checked"':'')+' id="autocls-1"/><label for="autocls-1">智能归类</label>\
		<input type="radio" name="autocls" value="2" onClick="hide(\'selcls\');" '+(obj.code.a[obj.code.mode].autocls=="2"?'checked="checked"':'')+' id="autocls-2"/><label for="autocls-2">采集分类ID</label>\
	</td>\
  </tr>\
  <tr>\
	<td class="label">分页设置：</td>\
	<td>\
	<input type="radio" '+(obj.code.a[obj.code.mode].pageset=="0"?'checked="checked"':'')+' name="pageset" value="0" onClick="hide(\'istartiend\',\'page_2\',\'page_3\',\'page_4\');show(\'page_1\');" id="pageset-0"/><label for="pageset-0">不分页</label>\
	<input type="radio" '+(obj.code.a[obj.code.mode].pageset=="1"?'checked="checked"':'')+' name="pageset" value="1" onClick="hide(\'page_1\',\'page_2\',\'page_3\',\'page_4\');show(\'istartiend\',\'page_1\');"/ id="pageset-1"><label for="pageset-1">批量分页</label>\
	<input type="radio" '+(obj.code.a[obj.code.mode].pageset=="2"?'checked="checked"':'')+' name="pageset" value="2" onClick="hide(\'page_1\',\'istartiend\',\'page_3\',\'page_4\');show(\'page_2\');"id="pageset-2"/><label for="pageset-2">手动分页</label>\
	<input type="radio" '+(obj.code.a[obj.code.mode].pageset=="3"?'checked="checked"':'')+' name="pageset" value="3" onClick="hide(\'page_1\',\'page_2\',\'istartiend\',\'page_4\');show(\'page_3\');"id="pageset-3"/><label for="pageset-3">直接采集内容页(不分页)</label>\
	<input type="radio" '+(obj.code.a[obj.code.mode].pageset=="4"?'checked="checked"':'')+' name="pageset" value="4" onClick="hide(\'page_1\',\'page_2\',\'page_3\',\'page_4\');show(\'page_4\',\'page_1\');"id="pageset-4"/><label for="pageset-4">提交分页(post)</label>\
	</td>\
  </tr>\
  <tr id="page_3" style="display:none">\
	<td class="label">内容页链接：</td>\
	<td><textarea id="pageurlarticle" rows="17" style="width:99%;white-space:nowrap;overflow:scroll;">'+obj.code.a[obj.code.mode].pageurlarticle+'</textarea>&nbsp;每行一个链接</font></td>\
  </tr>\
  <tr id="page_1" '+(obj.code.a[obj.code.mode].pageset=="1"?'':'style="display:none"')+'>\
	<td class="label">列表页URL：</td>\
	<td><input type="text" id="pageurl1" value="'+obj.code.a[obj.code.mode].pageurl1+'" size="120" />&nbsp;变量<font color="red">{$ID}</font></td>\
  </tr>\
  <tr id="page_4" '+(obj.code.a[obj.code.mode].pageset=="4"?'':'style="display:none"')+'>\
	<td class="label">提交表单代码：</td>\
	<td><textarea id="pageurlfrom" rows="17" cols="85">'+obj.code.a[obj.code.mode].pageurlfrom+'</textarea>&nbsp;变量<font color="red">{$ID}</font></td>\
  </tr>\
  <tr id="istartiend" '+(obj.code.a[obj.code.mode].pageset=="1"?'':'style="display:none"')+'>\
	<td class="label">起始ID：</td>\
	<td>标准格式：Http://www.rendie.com/list/list_{$ID}.html<br />\
				开始：<input type="text" id="istart" value="'+obj.code.a[obj.code.mode].istart+'" style="width:60px;text-align:center;"/> - \
				结束：<input type="text" id="iend" value="'+obj.code.a[obj.code.mode].iend+'" style="width:60px;text-align:center;" />&nbsp;\
				步长：<input type="text" id="step" value="'+obj.code.a[obj.code.mode].step+'" style="width:60px;text-align:center;"/>&nbsp;\
  例如：1 - 10 或者 10 - 1</td>\
  </tr>\
  <tr id="page_2" '+(obj.code.a[obj.code.mode].pageset=="2"?'':'style="display:none"')+'>\
	<td class="label">手动分页：</td>\
	<td><textarea id="pageurl2" rows="17" style="width:99%;white-space:nowrap;overflow:scroll;">'+obj.code.a[obj.code.mode].pageurl2+'</textarea>&nbsp;每行一个链接</td>\
  </tr>\
  <tr>\
	<td class="label"></td>\
	<td><a href="javascript:" class="button left" onClick="nextstep()">下一步</a></td>\
  </tr>'
  $("#table").html(html)
}
function nextstep(){
  obj.code.mode=obj.code.mode//手机版  或   电脑版
  obj.code.a[obj.code.mode].into=$("[name='into']:checked").val();//入库方式
  obj.code.a[obj.code.mode].autocls=$("[name='autocls']:checked").val();//分类设置
  obj.code.a[obj.code.mode].pageset=$("[name='pageset']:checked").val()//分页设置
  obj.code.a[obj.code.mode].charset=$("#charset").val()//网页编码
  obj.code.a[obj.code.mode].pageurl1=$("#pageurl1").val()//列表页URL
  obj.code.a[obj.code.mode].istart=$("#istart").val()//开始
  obj.code.a[obj.code.mode].iend=$("#iend").val()//结束
  obj.code.a[obj.code.mode].step=$("#step").val()//步长
  obj.code.a[obj.code.mode].pageurl2=$("#pageurl2").val()//手动分页
  let html="<r: tag=\"sql\">update @.gatherURL set @.from='"+$("#from").val()+"',:name='"+($("#name").val()).replace(/'/ig, "''")+"',:note='"+($("#note").val()).replace(/'/ig, "''")+"',:code='"+(JSON.stringify(obj.code)).replace(/'/ig, "''")+"' where @.id="+obj.arr4+"</r:>"
  let nextLink=obj.code.a[obj.code.mode].pageset=="1"?obj.typeLink2:obj.typeLink3
  $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(){maincontent(nextLink);}});
}
