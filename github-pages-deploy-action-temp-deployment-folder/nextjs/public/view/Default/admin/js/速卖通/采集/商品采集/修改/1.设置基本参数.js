'use strict';
var fun=
{
  obj:{},
  a01:function()
	{
		obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//ID
    let str='\
    <r:gather db="sqlite.aliexpress" size=1 where=" where @.id='+obj.arr[4]+'">\
    {\
      "code":<:code tag=0/>,\
      "note":"<:note tag=js/>",\
      "sort":"<:sort/>",\
      "name":"<:name tag=js/>"\
    }\
    </r:gather>'
		Tool.ajax.a01(html,1,this.a02,this)
  },
  a02:function(obj2)
  {
		this.obj=obj2;
		let codeA=obj2.code.a;
		let html='\
    <header class="panel-heading">\
			<a class="arrow_back" onclick="Tool.main();"></a>\
			<div onclick="Tool.main(\'js01/'+obj.arr[4]+'\');" class="active">１. 设置基本参数</div>\
			<div onclick="Tool.main(\'js02/'+obj.arr[4]+'\');">２. 列表页连接设置</div>\
			<div onclick="Tool.main(\'js03/'+obj.arr[4]+'\');">３. 内容页连接设置</div>\
			<div onclick="Tool.main(\'js04/'+obj.arr[4]+'/1\');">４. 预览结果</div>\
    </header>\
		<div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
				<tr>\
					<td class="w150 right">配置信息说明：</td>\
					<td><input type="text" id="note" class="form-control w-50" value="'+this.obj.note.replace(/"/ig,'&quot;')+'"/></td>\
				</tr>\
				<tr>\
					<td class="right">采集类目说明：</td>\
					<td><input type="text" id="name" class="form-control w-50" value="'+this.obj.name.replace(/"/ig,'&quot;')+'"/></td>\
				</tr>\
				<tr>\
					<td class="right">排序：</td>\
					<td><input type="text" id="sort" class="form-control w150 center" value="'+this.obj.sort.replace(/"/ig,'&quot;')+'"/></td>\
				</tr>\
				<tr>\
					<td class="right">网页编码：</td>\
					<td>\
						<select class="form-select w150" id="charset">\
							<option value="">请选择编码</option>\
							<option value="GB2312" '+(codeA.charset=="GB2312"?'selected="selected"':'')+'>GB2312</option>\
							<option value="GBK" '+(codeA.charset=="GBK"?'selected="selected"':'')+'>GBK</option>\
							<option value="BIG5" '+(codeA.charset=="BIG5"?'selected="selected"':'')+'>BIG5</option>\
							<option value="UTF-8" '+(codeA.charset=="UTF-8"?'selected="selected"':'')+'>UTF-8</option>\
						</select>\
					</td>\
				</tr>\
				<tr>\
					<td class="right">分类设置：</td>\
					<td>\
						<div class="form-check form-check-inline">\
							<input type="radio" class="form-check-input" value="0" name="autocls" id="radio0" onClick="show(\'selcls\');" '+(codeA.autocls=="0"?'checked="checked"':'')+'>\
							<label class="custom-control-label" for="radio0">固定分类</label>\
						</div>\
						<div class="form-check form-check-inline">\
							<input type="radio" class="form-check-input" value="1" name="autocls" id="radio1" onClick="show(\'selcls\');" '+(codeA.autocls=="1"?'checked="checked"':'')+'>\
							<label class="custom-control-label" for="radio1">智能归类</label>\
						</div>\
						<div class="form-check form-check-inline">\
							<input type="radio" class="form-check-input" value="2" name="autocls" id="radio2" onClick="show(\'selcls\');" '+(codeA.autocls=="2"?'checked="checked"':'')+'>\
							<label class="custom-control-label" for="radio2">采集分类ID</label>\
						</div>\
					</td>\
				</tr>\
				<tr>\
					<td class="right">分页设置：</td>\
					<td>\
						<div class="form-check form-check-inline">\
							<input type="radio" class="form-check-input" value="0" name="pageset" id="pageset0" onClick="hide(\'istartiend\',\'page_2\',\'page_3\',\'page_4\');show(\'page_1\');" '+(codeA.pageset=="0"?'checked="checked"':'')+'>\
							<label class="custom-control-label" for="pageset0">不分页</label>\
						</div>\
						<div class="form-check form-check-inline">\
							<input type="radio" class="form-check-input" value="1" name="pageset" id="pageset1" onClick="hide(\'page_1\',\'page_2\',\'page_3\',\'page_4\');show(\'istartiend\',\'page_1\');" '+(codeA.pageset=="1"?'checked="checked"':'')+'>\
							<label class="custom-control-label" for="pageset1">批量分页</label>\
						</div>\
						<div class="form-check form-check-inline">\
							<input type="radio" class="form-check-input" value="2" name="pageset" id="pageset2" onClick="hide(\'page_1\',\'istartiend\',\'page_3\',\'page_4\');show(\'page_2\');" '+(codeA.pageset=="2"?'checked="checked"':'')+'>\
							<label class="custom-control-label" for="pageset2">手动分页</label>\
						</div>\
						<div class="form-check form-check-inline">\
							<input type="radio" class="form-check-input" value="3" name="pageset" id="pageset3" onClick="hide(\'page_1\',\'page_2\',\'istartiend\',\'page_4\');show(\'page_3\');" '+(codeA.pageset=="3"?'checked="checked"':'')+'>\
							<label class="custom-control-label" for="pageset3">直接采集内容页(不分页)</label>\
						</div>\
						<div class="form-check form-check-inline">\
							<input type="radio" class="form-check-input" value="4" name="pageset" id="pageset4" onClick="hide(\'page_1\',\'page_2\',\'page_3\',\'page_4\');show(\'page_4\',\'page_1\');" '+(codeA.pageset=="4"?'checked="checked"':'')+'>\
							<label class="custom-control-label" for="pageset4">提交分页(post)</label>\
						</div>\
					</td>\
				</tr>\
				<tr id="page_3" style="display:none">\
					<td>内容页链接：</td>\
					<td>\
						<table>\
						<tr>\
							<td><textarea id="pageurlarticle" rows="17" style="width:99%;white-space:nowrap;overflow:scroll;">'+codeA.pageurlarticle+'</textarea></td>\
							<td>每行一个链接</td>\
						</tr>\
						</table>\
					</td>\
				</tr>\
				<tr id="page_1" '+(codeA.pageset=="1"?'':'style="display:none"')+'>\
					<td class="right">列表页URL：</td>\
					<td class="p-0">\
						<table class="table mb-0 align-middle">\
						<tr>\
						<td><input type="text" id="pageurl1" value="'+codeA.pageurl1+'" class="form-control"/></td>\
						<td class="w100">变量<font color="red">{$ID}</font></td>\
						</tr>\
						</table>\
					</td>\
				</tr>\
				<tr id="page_4" '+(codeA.pageset=="4"?'':'style="display:none"')+'>\
					<td class="right">提交表单代码：</td>\
					<td><textarea id="pageurlfrom" rows="17" cols="85">'+codeA.pageurlfrom+'</textarea>&nbsp;变量<font color="red">{$ID}</font></td>\
				</tr>\
				<tr>\
					<td class="right">起始ID：</td>\
					<td>\
						<table>\
						<tr>\
							<td>开始：</td>\
							<td class="w60"><input type="text" id="istart" class="form-control center" value="'+codeA.istart+'"/></td>\
							<td>&nbsp;- 结束：</td>\
							<td class="w60"><input type="text" id="iend" class="form-control center" value="'+codeA.iend+'"/></td>\
							<td>&nbsp; 步长：</td>\
							<td class="w60"><input type="text" id="step" class="form-control center" value="'+codeA.step+'"/></td>\
							<td>&nbsp;例如：1 - 10 或者 10 - 1</td>\
						<tr>\
						</table>\
					</td>\
				</tr>\
				<tr id="page_2" class="Tul" '+(codeA.pageset=="2"?'':'style="display:none"')+'>\
					<td class="label">手动分页：</td>\
					<td><textarea id="pageurl2" rows="17" style="width:99%;white-space:nowrap;overflow:scroll;">'+codeA.pageurl2+'</textarea>&nbsp;每行一个链接</td>\
				</tr>\
				<tr>\
					<td></td>\
					<td>\
						<button type="button" class="btn btn-outline-secondary" onclick="fun.c01()">【保存】下一步</button>\
					</td>\
				</tr>\
				</tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html)
  },
  c01:function()
  {
		let codeA={}
		codeA.into=$("[name='into']:checked").val();//入库方式
		codeA.autocls=$("[name='autocls']:checked").val();//分类设置
		codeA.pageset=$("[name='pageset']:checked").val()//分页设置
		codeA.charset=$("#charset").val()//网页编码
		codeA.pageurl1=$("#pageurl1").val()//列表页URL
		codeA.istart=$("#istart").val()//开始
		codeA.iend=$("#iend").val()//结束
		codeA.step=$("#step").val()//步长
		codeA.pageurl2=$("#pageurl2").val()//手动分页
		this.obj.code.a=codeA
		let str="<r: db=\"sqlite.aliexpress\">update @.gather set @.sort='"+$("#sort").val()+"',@.name='"+($("#name").val()).replace(/'/ig, "''")+"',@.note='"+($("#note").val()).replace(/'/ig, "''")+"',@.code='"+(JSON.stringify(this.obj.code)).replace(/'/ig, "''").replace(/\\/ig, "\\\\")+"' where @.id="+obj.arr[4]+"</r:>"
		Tool.ajax.a01(str,1,this.c02,this)
  },
  c02:function(txt)
  {
    if(txt==""){Tool.main('/'+obj.arr[0]+'/list/'+obj.arr[2]+'/js02/'+obj.arr[4]);}else{Tool.at(txt);}
  }
}
fun.a01();