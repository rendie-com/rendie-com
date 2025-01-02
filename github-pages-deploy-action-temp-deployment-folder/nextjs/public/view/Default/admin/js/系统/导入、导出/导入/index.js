'use strict';
var fun=
{
	a01:function()
	{
		this.a02();
	},
	a02:function()
  {
    let html='\
    <header class="panel-heading">\
			<div onclick="Tool.main();" class="active">导入</div>\
			<div onclick="Tool.main(\'js03\');">导出SQL脚本文件</div>\
		</header>\
    <div class="p-2">\
			<ul class="makeHtmlTab">\
				<li rel="1" class="hover">从SQL脚本文件导入</li>\
				<li rel="2">从数据库导入</li>\
			</ul>\
			'+this.b02()+this.b03()+'\
		</div>'
    Tool.html(this.a03,this,html);
  },
  a03:function()
  {
		$(".makeHtmlTab li").click(function()
		{
			 $(".makeHtmlTab li").removeClass();
			 $(this).attr("class","hover");
			 if($(this).attr("rel")=="1")
			 {
				 $("#makeHtmlTab1").show()
				 $("#makeHtmlTab2").hide()
			 }
			 else
			 {
				 $("#makeHtmlTab1").hide()
				 $("#makeHtmlTab2").show()
			 }
		})
  },
  b01:function(L)
	{
    let str=""
    switch(L)
    {
     case "Conn1":str="sql server";break;
     case "Conn2":
     case "Conn3":
     case "Conn4":str="access";break;
     case "Conn5":str="oracle";break;
     default:alert("未知内容");
    }
    return str;
  },
  b02:function()
	{
		return '\
		<table class="table table-hover align-middle" id="makeHtmlTab1">\
			<tbody>\
			<tr><td><input type="button" class="btn btn-secondary" onclick="Tool.open4(\'js06\')" value="开始导入"></td></tr>\
			</tbody>\
		</table>'
  },
  b03:function()
	{
		return '\
		<table class="table table-hover align-middle" id="makeHtmlTab2" style="display: none;">\
      <tbody>\
        <tr>\
          <td class="center">数据库类型</td>\
          <td>连接字符串</td>\
        </tr>\
      <tr>\
        <td class="w180 right">（sql server）例1：</td>\
        <td>\
          <div class="input-group">\
            <div class="input-group-text">\
              <input class="form-check-input mt-0 pointer" type="radio" value="1" name="connType" checked/>\
            </div>\
            <input type="text" class="form-control" id="Conn1" value="Data Source=(local);Initial Catalog=db10;User ID=sa;Password=密码;Max Pool Size=512;">\
            <button class="btn btn-outline-secondary" type="button" onclick="fun.c05($(this),\'Conn1\')">测式</button>\
          </div>\
        </td>\
      </tr>\
      <tr>\
       <td class="right">（access 2003）例2：</td>\
       <td>\
          <div class="input-group">\
            <div class="input-group-text">\
              <input class="form-check-input mt-0 pointer" type="radio" value="2" name="connType">\
            </div>\
            <input type="text" class="form-control" id="Conn2" value="Provider=Microsoft.Jet.OLEDB.4.0;Data Source=E:\\project\\db\\bak.mdb">\
            <button class="btn btn-outline-secondary" type="button" onclick="fun.c05($(this),\'Conn2\')">测式</button>\
          </div>\
       </td>\
      </tr>\
      <tr>\
        <td class="right">（.xls）例3：</td>\
        <td>\
          <div class="input-group">\
            <div class="input-group-text">\
              <input class="form-check-input mt-0 pointer" type="radio" value="3" name="connType">\
            </div>\
            <input type="text" class="form-control" id="Conn3" value="Provider=Microsoft.Jet.OLEDB.4.0;Data Source=E:\\project\\db\\db.xls;Extended Properties=\'Excel 8.0;HDR=Yes;IMEX=1\'">\
            <button class="btn btn-outline-secondary" type="button" onclick="fun.c05($(this),\'Conn3\')">测式</button>\
          </div>\
        </td>\
      </tr>\
      </div>\
      <tr>\
        <td class="right">（.xlsx）例4：</td>\
        <td>\
          <div class="input-group">\
            <div class="input-group-text">\
              <input class="form-check-input mt-0 pointer" type="radio" value="4" name="connType">\
            </div>\
            <input type="text" class="form-control" id="Conn4" value="Provider=Microsoft.Jet.OLEDB.4.0;Data Source=E:\\project\\db\\db.xlsx;Extended Properties=\'Excel 12.0;HDR=Yes;IMEX=1\'">\
            <button class="btn btn-outline-secondary" type="button" onclick="fun.c05($(this),\'Conn4\')">测式</button>\
          </div>\
        </td>\
      </tr>\
      <tr>\
        <td class="right">（oracle）例5：</td>\
        <td>\
          <div class="input-group">\
            <div class="input-group-text">\
              <input class="form-check-input mt-0 pointer" type="radio" value="5" name="connType">\
            </div>\
            <input type="text" class="form-control" id="Conn5" vlue="Data Source=366SBJH; user id=366SBJH;password=366SBJH">\
            <button class="btn btn-outline-secondary" type="button" onclick="fun.c05($(this),\'Conn5\')">测式</button>\
          </div>\
        </td>\
      </tr>\
      <tr>\
        <td></td>\
        <td><button type="button" class="btn btn-secondary" onclick="fun.c03()">下一步</button></td>\
      </tr>\
      </tbody>\
      </table>'	
	},
  c01:function()
	{
			
	},
  c02:function(o1,oo)
	{
		if(o1[0]==null)
    {
      Tool.Modal("数据库配置","数据库配置成功。",'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>','modal-l');
    }
    else
    {
      Tool.Modal("连接数据库出错","连接字符串：<textarea style=\"height: 200px;\" class=\"form-control form-control-sm\">"+oo[2]+"</textarea>出错原因:<textarea style=\"height: 200px;\" class=\"form-control form-control-sm\">"+o1+'</textarea>','<button type="button"data-bs-dismiss="modal" aria-label="Close">关闭</button>','modal-xl');
    }
    oo[0].attr("disabled",false);
  },
  c03:function()
  {
    let i=$("input[name='connType']").val();
    let html='<r: tag="file" file="'+o.cacheFolder+'ImportDate.txt">{"connType":"'+this.b01("Conn"+i)+'","conn":"'+$("#Conn"+i).val()+'"}</r:>';
    Tool.ajax.a01(html,1,this.c04,this)
  },
  c04:function(t)
  {
    if(t=="")
    {
      Tool.main('/js01');
    }
    else
    {alert("出错："+t);}
  },
  c05:function(This,L)
	{
    let val=$("#"+L).val();
		if(!This.attr("disabled"))
		{
      This.val("加载加...");
			This.attr("disabled",true);
      if(val==''){alert('请输入连接字符串!');}
      else
      {
        Tool.ajax.a01("[<.connect("+this.b01(L)+"|"+val+")/>]",1,this.c02,this,[This,L,val]);
      }
    }
  }
}
fun.a01()