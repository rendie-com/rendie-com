'use strict';
var fun=
{
  obj:{},data:{},
  a01:function()
  {
    let url=o.cacheFolder+"ImportDate.txt?"+Math.random()
    let This=this;$.ajax(url,{type:'get',success:function(t){This.a02(t);}});
  },
  a02:function(txt)
  {
		eval("let oo="+txt);
    this.obj=oo;
    let html='<.connect('+oo.connType+'|'+oo.conn+')/>[{/>'
    if(oo.connType=="access")
    {
      html+='\
      <r:MSysObjects pre="" size=200 where=" where Type=1">,\
      {\
          "name":"[MSysObjects:name]"\
      }\
      </r:MSysObjects>]'
    }
    else
    {
      html+='\
      <r:sysobjects size=200 where=" where xtype=\'u\'">,\
        {\
          "name":"[sysobjects:name]"\
        }\
      </r:sysobjects>]'
    }
    Tool.ajax.a01(html,1,this.a03,this)
  },
  a03:function(oo)
  {
    if(oo.length==201){alert("数据表大于200个，请与管理员联系。");}
    let html = '',arr=[];
    oo=Tool.objsort(oo,"name");
    for (let i = 1; i < oo.length; i++) 
    {
      html += '\
      <tr class="list-group-item-action">\
        <td class="left">\
          <input class="form-check-input pointer" type="checkbox" value="'+ i + '" name="pre_id" id="pre_id'+i+'" onclick="fun.c02(\'' + oo[i].name + '\',$(this).is(\':checked\'))">\
          <label class="form-check-label pointer" for="pre_id'+i+'">'+ i + '</label>\
        </td>\
        <td>' + oo[i].name + '</td>\
        <td id="td1_' + oo[i].name + '" class="p-0"></td>\
        <td id="td2_' + oo[i].name + '" class="left p-0"></td>\
      </ul>'
    }
		html='\
		<header class="panel-heading">第二步 选择源表</header>\
		 <div class="p-2">\
      <table class="table table-hover align-middle center">\
      <thead class="table-light">\
        <tr>\
        <th class="w70">编号</th>\
        <th class="w300">源（外表）</th>\
        <th class="w300">目标（内表）</th>\
        <th class="left">操作</th>\
        </tr>\
      </head>\
      <tbody>'+html+'\
      <tr>\
        <td></td>\
        <td colspan="3" class="left p-1">\
          <button type="button" class="btn btn-sm btn-secondary" onclick="fun.c01();">上一步</button>\
          <button type="button" class="btn btn-sm btn-secondary" onclick="fun.c08();">下一步</button>\
        </td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html);
  },
  c01:function()
  {
    Tool.main('/'+obj.arr[0]+'/'+obj.arr[1]+'/'+obj.arr[2]);
  },
  c02:function(name,chk)
  {
    if(chk)
    { Tool.ajax.a01( '<.Config(ConnType)/>',1,this.c03, this,  name); }
    else
    {$("#td1_"+name).html("");$("#td2_"+name).html("");}
  },
  c03:function(t,name)
  {
    let html='[{}'
    if(t=="access")
    {
      html+='<r:MSysObjects pre="" size=200 where=" where Type=1">,{"name":"[MSysObjects:name]"}</r:MSysObjects>]'
    }
    else
    {
      html+='<r:sysobjects size=200 where=" where xtype=\'u\'">,{"name":"[sysobjects:name]"}</r:sysobjects>]'
    }
    Tool.ajax.a01(html,1,this.c04,this,name)
  },
  c04:function(oo,name)
  {
    let html='<select id="tb_'+name+'" class="form-select">';
    for(let i=1;i<oo.length;i++)
    {
       html+='<option value="'+oo[i].name+'" '+(oo[i].name==name?' selected="selected"':'')+'>'+oo[i].name+'</option>'  
    }
    html+='</select>'
    $("#td1_"+name).html(html);
    $("#td2_"+name).html('<button type="button" class="btn btn-outline-secondary btn-sm" onclick="fun.c05(\''+name+'\')">列映射</button>');
  },
  c05:function(name)
  {
    let html='\
    <.connect('+this.obj.connType+'|'+this.obj.conn+')/>\
    [{}\
    <r:syscolumns where=" where id=(select max(id) from sysobjects where xtype=\'u\' and name=\''+name+'\')" size="200" pre="">\
    ,{\
      "name":"[syscolumns:name]",\
      "xtype":"<r:systypes where=" where xtype=[syscolumns:xtype]" size="1" pre="">[systypes:name]</r:systypes>",\
      "length":"[syscolumns:length]",\
      "isnullable":"[syscolumns:isnullable]"\
     }\
    </r:syscolumns>]'
    Tool.ajax.a01(html,1,this.c06,this,name)
  },
  c06:function(oo,name)
  {
    oo.shift();
    let nameB=$("#tb_"+name).val();
    this.data[name]={};
    this.data[name].nameB=nameB;
    this.data[name].syscolumnsA={};
    this.data[name].syscolumnsA=oo;
    let html='[{}\
    <r:syscolumns where="  where id=(select max(id) from sysobjects where xtype=\'u\' and name=\''+nameB+'\')" size="200" pre="">\
    ,{\
      "name":"[syscolumns:name]",\
      "xtype":"<r:systypes where=" where xtype=[syscolumns:xtype]" size="1" pre="">[systypes:name]</r:systypes>",\
      "length":"[syscolumns:length]",\
      "isnullable":"[syscolumns:isnullable]"\
      }\
      </r:syscolumns>]'
    Tool.ajax.a01(html,1,this.c07,this,name);
  },
  c07:function(oo,name)
  {
    oo.shift();
    this.data[name].syscolumnsB=oo;
    let html="",txtli,objA=this.data[name].syscolumnsA,objB=this.data[name].syscolumnsB
    for(let i=0;i<objA.length;i++)
    {
      txtli='<option value="">忽略</option>'
      for(let j=0;j<objB.length;j++)
      {
        txtli+='<option value="'+objB[j].name+'" '+(objA[i].name==objB[j].name?' selected="selected"':'')+'>'+objB[j].name+'---'+objB[j].xtype+'---'+objB[j].length+'---'+objB[j].isnullable+'</option>'  
      }
      html+='\
      <tr>\
        <td>'+(i+1)+'</td>\
        <td>'+objA[i].name+'</td>\
        <td>'+objA[i].xtype+'</td>\
        <td>'+objA[i].length+'</td>\
        <td>'+objA[i].isnullable+'</td>\
        <td><select id="sel_'+objA[i].name+'" class="form-select">'+txtli+'</select></td>\
      </tr>'
    }
    html='\
    <table class="table table-hover mb-0 center">\
      <thead class="table-light">\
      <tr>\
        <th class="w50">编号</th>\
        <th>'+name+'（外表）</th>\
        <th class="w100">类型</th>\
        <th class="w50">长度</th>\
        <th class="w70">允许空</th>\
        <th>'+this.data[name].nameB+'（内表）---类型---长度---允许空</th>\
      </tr>\
      </head>\
      <tbody>'+html+'</tbody>\
    </table>'
	 Tool.Modal("修改列映射",html,'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>','modal-xl');
  },
  c08:function()
  {
    Tool.main('/js02');
  }
}
fun.a01();

/*
a11:function()
{
	if(this.date.nameA)
	{
	  let txt='<r: tag="file" file="'+this.cacheFolder+'ImportDate.txt">'+JSON.stringify(this.date)+'</r:><r:type where=" where @.from=\'rendie\' and @.id='+this.arr3+'"><r:type where=" where @.from=\'rendie\' and @.upid=\'<:upid/>\' order by @.sort asc" start=2 size=1>'+this.arr1+'/list/<:id/>.html</r:type></r:type>';
	  Tool.ajax.a01(txt,1,this.a10,this);
	}else{alert("请选择表");}
}

function DataImportNext3()
{
	let IsSkip=[],name=[],selectname=[],vname,IsReplace=[]
	$("input[name='IsSkip']:checked").each(function(){IsSkip[IsSkip.length]=$(this).val();});
	$("input[name='IsReplace']:checked").each(function(){IsReplace[IsReplace.length]=$(this).val();});
	$("select").each(function()
	{
		vname=$(this).attr("name")
		name[name.length]=vname
		selectname[selectname.length]=$("select[name='"+vname+"']").val()
	});
	ImportDate.IsSkip=IsSkip
	ImportDate.name=name
	ImportDate.selectname=selectname
	ImportDate.IsReplace=IsReplace
	<pres>
	let txt='<r: tag="file" file="/{Fun(Config(cacheFolder))}/ImportDate.js"}let ImportDate='+JSON.stringify(ImportDate)+'</r:>'
	</pres>
	txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(txt)},async:false}).responseText;
	<r:type where=" where @.from='rendie' and @.id=Fun(arr(3))"}
	<r:type where=" where @.from='rendie' and @.upid='<:upid/>' order by @.sort asc" size=1 start=2}
	location.href='<.arr(1)/>/list/<:id/>.html';
	</r:type>
	</r:type>
}
$.ajax("/inc/table.txt?"+Math.random(),{type:'get',success:function(str){table(str);},error:function(){alert("加载出错");}});
function table(txt){
		let html='<tr align="center">\
    <td width="200">站内【'+ImportDate.channelname+'】表的字段</td>\
    <td width="200">站内【'+ImportDate.channelname+'】表的字段类型</td>\
    <td width="250">站外【'+ImportDate.tablename+'】表的字段(<a href="javcscript:" onClick="FieldName()">一键匹配</a>)</td>\
    <td width="100">相同跳过(<a href="javascript:" onClick="checkAll()">全选</a>)</td>\
    <td width="100">相同替换</td>\
    <td></td>\
  </tr>'
	let ShowField='Fun(ShowField('+ImportDate.tablename+','+ImportDate.datasourcestr+'))'
	ShowField=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+ShowField+"}")},async:false}).responseText;
		eval("let obj="+txt);
		for(let i=0;i<obj.length;i++)
		{
			if(obj[i].name==ImportDate.channelname)
			{
				for(let j=0;j<obj[i].table.length;j++)
				{
					if(obj[i].table[j].name!="id")
					{
						html+='<tr align="center">\
							<td width="200">'+obj[i].table[j].name+'</td>\
							<td width="250">'+obj[i].table[j].type+'</td>\
							<td width="200"><select name="'+obj[i].table[j].name+'" >\
								<option value="0">-此项不导入-</option>\
								'+ShowField+'\
								</select>\
							</td>\
							<td width="50"><input type="checkbox" name="IsSkip" value="'+obj[i].table[j].name+'"></td>\
							<td width="50"><input type="checkbox" name="IsReplace" value="'+obj[i].table[j].name+'"></td>\
							<td></td>\
						</tr>'
					}
				}
				break;
			}
		}
		$("#ImportDes").html(html)
		DefaultImportDate()
}
function FieldName()
{
	let TablePre="<.Config(TablePre)/>",name
	$("select").each(function(){
		name=$(this).attr("name")
		$("[name='"+name+"'] option[value='"+TablePre+name+"']").attr("selected", true);
	});
}
function checkAll(){$("[name='IsSkip']").attr("checked", true);}
function aliexpressImport(){
	$("[name='<.Config(TablePre)/>OrderID'] option[value='订单号']").attr("selected", true);
	$("[name='<.Config(TablePre)/>Status'] option[value='订单状态']").attr("selected", true);
	$("[name='<.Config(TablePre)/>UserName'] option[value='负责人(业务员)']").attr("selected", true);
	$("[name='<.Config(TablePre)/>ContactMan'] option[value='收货人名称']").attr("selected", true);
	$("[name='<.Config(TablePre)/>Email'] option[value='买家邮箱']").attr("selected", true);
	$("[name='<.Config(TablePre)/>InputTime'] option[value='下单时间']").attr("selected", true);
	$("[name='<.Config(TablePre)/>PayTime'] option[value='付款时间']").attr("selected", true);
	$("[name='<.Config(TablePre)/>MoneyTotal'] option[value='订单金额']").attr("selected", true);
	$("[name='<.Config(TablePre)/>ChargeDeliver'] option[value='物流费用']").attr("selected", true);
	$("[name='<.Config(TablePre)/>MoneyGoods'] option[value='产品总金额']").attr("selected", true);
	$("[name='<.Config(TablePre)/>product'] option[value='产品信息_（双击单元格展开所有产品信息！）']").attr("selected", true);
	$("[name='<.Config(TablePre)/>Remark'] option[value='订单备注']").attr("selected", true);
	$("[name='<.Config(TablePre)/>country'] option[value='收货国家']").attr("selected", true);
	$("[name='<.Config(TablePre)/>province'] option[value='州/省']").attr("selected", true);
	$("[name='<.Config(TablePre)/>city'] option[value='城市']").attr("selected", true);
	$("[name='<.Config(TablePre)/>Address'] option[value='地址']").attr("selected", true);
	$("[name='<.Config(TablePre)/>Zip'] option[value='邮编']").attr("selected", true);
	$("[name='<.Config(TablePre)/>Phone'] option[value='联系电话']").attr("selected", true);
	$("[name='<.Config(TablePre)/>Mobile'] option[value='手机']").attr("selected", true);
	$("[name='<.Config(TablePre)/>DeliverType'] option[value='买家选择物流']").attr("selected", true);
	$("[name='<.Config(TablePre)/>deliveryDeadline'] option[value='发货期限']").attr("selected", true);
	$("[name='<.Config(TablePre)/>DeliveryDate'] option[value='发货时间']").attr("selected", true);
	$("[name='IsSkip']:checkbox[value='rd_OrderID']").attr('checked','true');
	myform.action="/<.Config(admin)/>/ajax/admin_tool.aspx/DataImportNext3/aliexpress.html"
}
function DefaultImportDate()
{
	for(let i=0;i<ImportDate.name.length;i++)
	{
		$("select[name='"+ImportDate.name[i]+"'] option[value='"+ImportDate.selectname[i]+"']").attr("selected", true);
	}
	for(let i=0;i<ImportDate.IsSkip.length;i++)
	{
		$("[name='IsSkip'][value='"+ImportDate.IsSkip[i]+"']").attr("checked", true);
	}
	for(let i=0;i<ImportDate.IsReplace.length;i++)
	{
		$("[name='IsReplace'][value='"+ImportDate.IsReplace[i]+"']").attr("checked", true);
	}
}
*/