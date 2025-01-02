'use strict';
var fun=
{
  obj:{},
  a01:function()
  {
    let str='\
    <r:gather size=1 db="sqlite.aliexpress" where=" where @.id='+obj.arr[4]+'">\
    {\
      "code":<:code/>,\
      "note":"<:note tag=js/>",\
      "sort":"<:sort/>",\
      "name":"<:name tag=js/>"\
    }\
    </r:gather>'
	  Tool.ajax.a01(html,1,this.a02,this)
  },
  a02:function(oo)
  {
		this.obj=oo;
    gg.isRD(this.a03,this)
  },
  a03:function()
  { 
    this.obj.url=this.b01(this.obj.code.a);
    gg.getFetch(this.obj.url,"text",this.a04,this)
  },
  a04:function(txt)
  {
		txt=txt.replace(/\<\/textarea\>/ig,"&lt;/textarea&gt;");
		let codeB=this.obj.code.b;
    if(!codeB){codeB=this.b02();}
		let html='\
    <header class="panel-heading">\
			<a class="arrow_back" onclick="Tool.main();"></a>\
			<div onclick="Tool.main(\'js01/'+obj.arr[4]+'\');">１. 设置基本参数</div>\
			<div onclick="Tool.main(\'js02/'+obj.arr[4]+'\');" class="active">２. 列表页连接设置</div>\
			<div onclick="Tool.main(\'js03/'+obj.arr[4]+'\');">３. 内容页连接设置</div>\
			<div onclick="Tool.main(\'js04/'+obj.arr[4]+'/1\');">４. 预览结果</div>\
    </header>\
		<div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
					<tr>\
						<td class="w150 right">采集地址：</td>\
						<td colspan="2"><a href="'+this.obj.url+'" target="_blank">'+this.obj.url+'</a></td>\
					</tr>\
					<tr>\
						<td class="right">显示源码：</td>\
						<td colspan="2"><textarea id="htmlcode" rows="12" class="form-control">'+txt+'</textarea></td>\
					</tr>\
					<tr class="table-light">\
						<th></th>\
						<th>截取开始位置:</th><th>截取结束位置:</th>\
					</tr>\
					<tr>\
						<td class="right">列表：</td>\
						<td><textarea id="listA" rows="3" cols="50" class="form-control">'+codeB.listA+'</textarea></td>\
						<td><textarea id="listB" rows="3" cols="50" class="form-control">'+codeB.listB+'</textarea></td>\
					</tr>\
					<tr>\
						<td class="right" title="用于区分，在获取列表页内容时，判断商品是否存在，如果存在则跳过。">商品ID：</td>\
						<td><textarea id="proidA" rows="3" cols="50" class="form-control">'+codeB.proidA+'</textarea></li>\
						<td><textarea id="proidB" rows="3" cols="50" class="form-control">'+codeB.proidB+'</textarea></li>\
					</tr>\
					<tr>\
						<td class="right">特殊链接处理：</td>\
						<td colspan="2">\
							<div class="form-check form-check-inline">\
								<input type="radio" class="form-check-input" value="0" name="isspecialmlink" id="radio0" onClick="$(\'#specialmlinkbody\').hide();" '+(codeB.isspecialmlink=="0"?'checked="checked"':'')+'>\
								<label class="custom-control-label" for="radio0">不作设置</label>\
							</div>\
							<div class="form-check form-check-inline">\
								<input type="radio" class="form-check-input" value="1" name="isspecialmlink" id="radio1" onClick="$(\'#specialmlinkbody\').show()" '+(codeB.isspecialmlink=="1"?'checked="checked"':'')+'>\
								<label class="custom-control-label" for="radio1">替换地址</label>\
							</div>\
						</td>\
					</tr>\
					<tr id="specialmlinkbody" '+(codeB.isspecialmlink=="0"?'style="display:none"':'')+'>\
						<td class="right">要替换的地址：</td>\
						<td colspan="2">\
							<textarea id="mlinkRR" rows="3" class="form-control">'+codeB.mlinkRR+'</textarea>\
							<p class="red">实际连接:/list/?[变量].html</p>\
						</td>\
					</tr>\
					<tr>\
						<td></td>\
						<td colspan="2">\
							<button type="button" class="btn btn-outline-secondary" onclick="Tool.main(\'js01/'+obj.arr[4]+'\');">上一步</button>\
							<button type="button" class="btn btn-outline-secondary" onclick="fun.c01()">【保存】下一步</button>\
						</td>\
					</tr>\
				</tbody>\
      </table>\
    </div>'
		Tool.html(null,null,html);
  },
  /////////////////////////////////////
  c01:function()
  {
		let codeB={};
		codeB.listA=$("#listA").val();codeB.listB=$("#listB").val();//列表
		codeB.proidA=$("#proidA").val();codeB.proidB=$("#proidB").val();//商品ID
		codeB.isspecialmlink=$("[name='isspecialmlink']:checked").val();
		codeB.mlinkRR=$("#mlinkRR").val();//要替换的地址
		this.obj.code.b=codeB;
		let str="<r: db=\"sqlite.aliexpress\">update @.gather set @.code='"+(JSON.stringify(this.obj.code)).replace(/'/ig, "''").replace(/\\/ig, "\\\\")+"' where @.id="+obj.arr[4]+"</r:>"
		Tool.ajax.a01(str,1,this.c02,this)
	},
	c02:function(t)
	{
		if(t=="")
		{Tool.main('/'+obj.arr[0]+'/list/'+obj.arr[2]+'/js03/'+obj.arr[4]);}
		else
		{Tool.at(t);}
  },
	b01:function(obj2)
  {
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
  },
	b02:function()
  {
    let a=
    {
      listA:"",listB:"",
      proidA:"",proidB:"",
      isspecialmlink:0,
      mlinkRR:""
    }
    return a;
  }
}
fun.a01();