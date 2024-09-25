'use strict';
var fun=
{
  obj:{},
  a01:function()
  {
    let str='\
    <r:gatherURL size=1 where=" where @.id='+obj.arr[4]+'">\
    {\
      "code":[gatherURL:code],\
      "from":"[gatherURL:from tag=js]",\
      "note":"[gatherURL:note tag=js]",\
      "sort":[gatherURL:sort],\
      "name":"[gatherURL:name tag=js]"\
    }\
    </r:gatherURL>'
    Tool.ajax.a01(str,1,this.a02,this);
  },
  a02:function(oo)
  {
    this.obj=oo;
    let codeA=oo.code.a[oo.code.mode]
    let html='\
    <ul class="Tul thead">\
      <li style="margin:0;"><a class="arrow_back" onclick="Tool.main();"></a></li>\
      <li class="active">１. 设置基本参数</li>\
      <li onclick="Tool.main(\'js02/'+obj.arr[4]+'\');">２. 列表页连接设置</li>\
      <li onclick="Tool.main(\'js03/'+obj.arr[4]+'\');">３. 内容页连接设置</li>\
      <li onclick="Tool.main(\'js04/'+obj.arr[4]+'/1.html\');">４. 预览结果</li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w100 right">来源：</li>\
      <li class="w300"><input type="text" id="from" class="form-select" value="'+oo.from+'"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w100 right">配置信息说明：</li>\
      <li class="w300"><input type="text" id="note" class="form-select" value="'+oo.note.replace(/"/ig,'&quot;')+'"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w100 right">采集类目说明：</li>\
      <li class="w300"><input type="text" id="name" class="form-select" value="'+oo.name.replace(/"/ig,'&quot;')+'"></li>\
    </ul>\
		<ul class="Tul list-group-item-action">\
      <li class="w100 right">排序：</li>\
      <li class="w100"><input type="text" id="sort" class="form-select" value="'+oo.sort+'"/></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w100 right">入库方式：</li>\
      <li>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="0" name="into" id="into0" '+(codeA.into=="0"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="into0">临时库</label>\
        </div>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="1" name="into" id="into1" '+(codeA.into=="1"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="into1">直接入库(不建议使用，会损成数据库很大 或 损坏)</label>\
        </div>\
        </li>\
    </ul>\
		<ul class="Tul list-group-item-action">\
      <li class="w100 right">网页编码：</li>\
      <li class="w100">\
        <select class="form-select" id="charset">\
        <option value="">请选择编码</option>\
        <option value="GB2312" '+(codeA.charset=="GB2312"?'selected="selected"':'')+'>GB2312</option>\
        <option value="GBK" '+(codeA.charset=="GBK"?'selected="selected"':'')+'>GBK</option>\
        <option value="BIG5" '+(codeA.charset=="BIG5"?'selected="selected"':'')+'>BIG5</option>\
        <option value="UTF-8" '+(codeA.charset=="UTF-8"?'selected="selected"':'')+'>UTF-8</option>\
        </select>\
      </li>\
    </ul>\
		<ul class="Tul list-group-item-action">\
      <li class="w100 right">分类设置：</li>\
      <li>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="0" name="autocls" id="radio0" onClick="show(\'selcls\');" '+(codeA.autocls=="0"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="radio0">固定分类</label>\
        </div>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="1" name="autocls" id="radio1" onClick="show(\'selcls\');" '+(codeA.autocls=="1"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="radio1">智能归类</label>\
        </div>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="2" name="autocls" id="radio2" onClick="show(\'selcls\');" '+(codeA.autocls=="2"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="radio2">采集分类ID</label>\
        </div>\
		  </li>\
    </ul>\
		<ul class="Tul list-group-item-action">\
      <li class="w100 right">分页设置：</li>\
      <li>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="0" name="pageset" id="pageset0" onClick="hide(\'istartiend\',\'page_2\',\'page_3\',\'page_4\');show(\'page_1\');" '+(codeA.pageset=="0"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="pageset0">不分页</label>\
        </div>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="1" name="pageset" id="pageset1" onClick="hide(\'page_1\',\'page_2\',\'page_3\',\'page_4\');show(\'istartiend\',\'page_1\');" '+(codeA.pageset=="1"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="pageset1">批量分页</label>\
        </div>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="2" name="pageset" id="pageset2" onClick="hide(\'page_1\',\'istartiend\',\'page_3\',\'page_4\');show(\'page_2\');" '+(codeA.pageset=="2"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="pageset2">手动分页</label>\
        </div>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="3" name="pageset" id="pageset3" onClick="hide(\'page_1\',\'page_2\',\'istartiend\',\'page_4\');show(\'page_3\');" '+(codeA.pageset=="3"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="pageset3">直接采集内容页(不分页)</label>\
        </div>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" class="custom-control-input" value="4" name="pageset" id="pageset4" onClick="hide(\'page_1\',\'page_2\',\'page_3\',\'page_4\');show(\'page_4\',\'page_1\');" '+(codeA.pageset=="4"?'checked="checked"':'')+'>\
          <label class="custom-control-label" for="pageset4">提交分页(post)</label>\
        </div>\
		  </li>\
    </ul>\
		<ul id="page_3" class="Tul" style="display:none">\
			<li class="w100 label">内容页链接：</li>\
			<li><textarea id="pageurlarticle" rows="17" style="width:99%;white-space:nowrap;overflow:scroll;">'+codeA.pageurlarticle+'</textarea>&nbsp;每行一个链接</font></li>\
		</ul>\
		<ul id="page_1" class="Tul  list-group-item-action" '+(codeA.pageset=="1"?'':'style="display:none"')+'>\
			<li class="w100 right">列表页URL：</li>\
			<li class="w800"><input type="text" id="pageurl1" value="'+codeA.pageurl1+'" class="form-select"/></li><li>&nbsp;变量<font color="red">{$ID}</font></li>\
		</ul>\
		<ul id="page_4" class="Tul" '+(codeA.pageset=="4"?'':'style="display:none"')+'>\
			<li class="w100 right">提交表单代码：</li>\
			<li><textarea id="pageurlfrom" rows="17" cols="85">'+codeA.pageurlfrom+'</textarea>&nbsp;变量<font color="red">{$ID}</font></li>\
		</ul>\
		<ul class="Tul list-group-item-action">\
			<li class="w100 right">起始ID：</li>\
			<li>开始：</li>\
			<li><input type="text" id="istart" class="form-select" value="'+codeA.istart+'" style="width:60px;text-align:center;"/></li>\
			<li>&nbsp;- 结束：</li>\
			<li><input type="text" id="iend" class="form-select" value="'+codeA.iend+'" style="width:60px;text-align:center;" /></li>\
			<li>&nbsp; 步长：</li>\
			<li><input type="text" id="step" class="form-select" value="'+codeA.step+'" style="width:60px;text-align:center;"/></li>\
			<li>&nbsp;例如：1 - 10 或者 10 - 1</li>\
		</ul>\
		<ul id="page_2" class="Tul" '+(codeA.pageset=="2"?'':'style="display:none"')+'>\
			<li class="label">手动分页：</li>\
			<li><textarea id="pageurl2" rows="17" style="width:99%;white-space:nowrap;overflow:scroll;">'+codeA.pageurl2+'</textarea>&nbsp;每行一个链接</li>\
		</ul>\
    <ul class="Tul">\
			<li class="w100"></li>\
			<li><a href="javascript:" class="button left" onClick="fun.c01()">【保存】下一步</a></li>\
		</ul>'
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
    this.obj.code.a[this.obj.code.mode]=codeA
		let str="[<r: tag=\"sql\">update @.gatherURL set @.from='"+$("#from").val()+"',:sort='"+$("#sort").val()+"',:name='"+($("#name").val()).replace(/'/ig, "''")+"',:note='"+($("#note").val()).replace(/'/ig, "''")+"',:code='"+(JSON.stringify(this.obj.code)).replace(/'/ig, "''")+"' where @.id="+obj.arr[4]+"</r:>]"
		Tool.ajax.a01(str,1,this.c02,this)
  },
  c02:function(txt)
  {
    if(txt[0]==null)
    {Tool.main('/'+obj.arr[0]+'/list/'+obj.arr[2]+'/js02/'+obj.arr[4]);}else{document.write(txt);}
  }
}
fun.a01();