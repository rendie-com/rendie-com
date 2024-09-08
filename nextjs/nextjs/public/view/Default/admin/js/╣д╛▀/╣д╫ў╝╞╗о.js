'use strict';
var fun=
{
  a01:function()
	{
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js01")
    {this.d01();}
    else if(obj.arr[3]=="js02")
    {this.a02("day");}
    else if(obj.arr[3]=="js03")
    {this.a02("all");}
    else if(obj.arr[3]=="js4")
    {this.a02("week");}
    else if(obj.arr[3]=="js5")
    {this.a02("april");}
    else if(obj.arr[3]=="js6")
    {this.a02("NotFinished");}
    else if(obj.arr[3]=="js7")
    {this.a02("Finished");}
    else
    {this.a02("day");}
	},
	a02:function(val)
	{
    obj.arr[4]=obj.arr[4]?parseInt(obj.arr[4]):1;//翻页
		let html,where
		switch (val)
		{
			case "day": where=" where @.addtime&gt;"+parseInt((new Date().getTime() - 1000*60*60*24)/1000)+" order by @.id desc";break;
			case "week": where=this.b11();break;
			case "april": where=this.b12();break;
			case "NotFinished": where=" where @.status=0 order by @.id desc";break;
			case "Finished": where=" where @.status=1 order by @.id desc";break;
			default: where=" order by @.id desc";
		}
    html='\
    [\
      {\
        "size":20,\
        "count":<@count/>\
      }\
      <r:adminplan db="sqlite.tool" size=20 page=2 where="'+where+'">,\
      {\
        "id":<:id/>,\
        "time":<:time/>,\
        "addtime":<:addtime/>,\
        "user":"<:user/>",\
        "des":"<:des tag=js/>",\
        "status":<:status/>,\
        "TipsDays":<:TipsDays/>\
      }</r:adminplan>]'
        Tool.ajax.a01(html, obj.arr[4],this.a03,this,val);
	},
	a03:function(list,val)
	{
		let html='',str2=""
    for(let i=1;i<list.length;i++)
		{
			if(list[i].status==1)
			{str2="<a href=\"javascript:\" onclick=\"fun.c04(0,"+list[i].id+",$(this))\" title='点击设置【未完成】'style=\"color:green\">已完成</a>";}
			else
			{str2="<a href=\"javascript:\" onclick=\"fun.c04(1,"+list[i].id+",$(this))\" title='点击设置【已完成】'>未完成</a>";}
			html+='\
      <tr>\
        <td>'+list[i].id+'</td>\
        <td>'+Tool.userDate13(list[i].addtime*1000)+" ("+Tool.getDay(list[i].addtime*1000)+')</td>\
        <td>'+list[i].user+'</td>\
        <td class="left">'+list[i].des+'</td>\
        <td>-</td>\
        <td>-</td>\
        <td>-</td>\
        <td>-</td>\
        <td>'+str2+'</td>\
        <td>'+Tool.js_date_time2(list[i].time)+'</td>\
        <td>'+this.b03(list[i].TipsDays)+'</td>\
        <td><a href="javascript:;" onclick="fun.e01('+list[i].id+');">编辑</a>&nbsp;|&nbsp;<a onClick="fun.c02('+list[i].id+')" href="javascript:" >删除</a></td>\
			</tr>'
		}
		html+='<tr><td colspan="12" class="left">'+Tool.page(list[0].count, list[0].size, 4)+'</td></tr>'
    html=this.b04(val)+'\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead class="table-light">'+this.b02()+'</thead>\
        <tbody>'+html+'</tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html)
	},
  b01:function()
	{
		let d = new Date()
		let m = d.getMonth()+1;//获取当前月份的日期
		let dd=d.getDate()
		return d.getFullYear()+"-"+(m<10?"0"+m:m)+"-"+(dd<10?"0"+dd:dd)
	},
  b02:function()
	{
		return '\
    <tr>\
      <th>ID</th>\
      <th>日期</th>\
      <th>负责人</th>\
      <th class="left">工作计划内容</th>\
      <th>重要程度</th>\
      <th>开始时间</th>\
      <th>预计完成时间</th>\
      <th>作业状态</th>\
      <th>工作状态</th>\
      <th>完成时间</th>\
      <th>登录提醒</th>\
      <th>操作</th>\
    </tr>'
	},
  b03:function(num)
	{
		let str;
		switch (num){
		case 0: str="不提醒"; break;
		case 1: str="1天"; break;
		case 3: str="3天"; break;
		case 5: str="5天"; break;
		case 7: str="一周"; break;
		case 15: str="半个月"; break;
		case 30: str="一个月"; break;
		default: str="未知："+num;
		}
		return str
	},
  b04:function(val)
	{
    return '\
    <header class="panel-heading">\
      <div onclick="Tool.main(\'js03\');" '+(val=="all"?'class="active"':"")+'>所有计划</div>\
      <div onclick="Tool.main(\'js02\');" '+(val=="day"?'class="active"':"")+'>1天计划</div>\
      <div onclick="Tool.main(\'js4\');" '+(val=="week"?'class="active"':"")+'>7天计划</div>\
      <div onclick="Tool.main(\'js5\');;" '+(val=="april"?'class="active"':"")+'>30天计划</div>\
      <div onclick="Tool.main(\'js6\');" '+(val=="NotFinished"?'class="active"':"")+'>未完成计划</div>\
      <div onclick="Tool.main(\'js7\');" '+(val=="Finished"?'class="active"':"")+'>已完成计划</div>\
      <div onclick="Tool.main(\'js01\');" '+(val=="js01"?'class="active"':"")+'>添加计划</div>\
    </header>'
  },
  b11:function()
	{
    return ' where @.addtime&gt;'+parseInt((new Date().getTime() - 1000*60*60*24*7)/1000)+' order by @.addtime asc'
	},
  b12:function()
	{
    return ' where @.addtime&gt;'+parseInt((new Date().getTime() - 1000*60*60*24*7)/1000)+' order by @.addtime asc'
  },
  c01:function(){},
  c02:function(id)
	{
		let html="\"\"<r: db=\"sqlite.tool\">delete from @.adminplan where @.id="+id+"</r:>"
		Tool.ajax.a01(html,1,this.c03,this);
	},
	c03:function(t)
	{ 
	  if(t=="")
		{window.location.reload();}
		else
		{alert("出错:"+t);}
	},
  c04:function(val,id,oo)
	{
		let str='<r: db="sqlite.tool">update @.adminplan set @.status='+val+',@.time='+Tool.gettime("")+' where @.id='+id+'</r:>'
		Tool.ajax.a01(str,1,this.b06,this,1,[val,id,oo.parent()])
	},
	b06:function(t,oo)
	{
		if(t=="")
		{
			oo[2].html(oo[0]==1?"<a href=\"javascript:\" onclick=\"fun.c04(0,"+oo[1]+",$(this))\" title='点击设置【未完成】'style=\"color:green\">已完成</a>":"<a href=\"javascript:\" onclick=\"fun.c04(1,"+oo[1]+",$(this))\" title='点击设置【已完成】'>未完成</a>");
		}
		else
		{alert("出错："+t);}		
	},
	d01:function()
	{
		let html=this.b04(obj.arr[3])+'\
		<div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
        <tr>\
          <td class="w150 right">负责人：</td>\
          <td class="w200">\
            <select id="user" class="form-select">\
              <option value="星">星</option>\
              <option value="花">花</option>\
            </select>\
          </td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">记录日期：</td>\
          <td><input type="date" value="'+this.b01()+'" id="addtime" class="form-control form-control-sm center"/></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">计划内容：</td>\
          <td colspan="2"><textarea rows="10" cols="70" id="des" class="form-control form-control-sm"></textarea></td>\
        </tr>\
        <tr>\
          <td class="right">计划状态：</td>\
          <td colspan="2">\
            <div class="form-check form-check-inline">\
              <input type="radio" id="status-0" name="status" value="0" checked="checked" class="form-check-input">\
              <label class="form-check-label" for="status-0">未完成</label>\
            </div>\
            <div class="form-check form-check-inline">\
              <input type="radio" id="status-1" name="status" value="1" class="form-check-input">\
              <label class="form-check-label" for="status-1">已完成</label>\
            </div>\
          </td>\
        </tr>\
        <tr>\
          <td>登录提醒：</td>\
          <td>\
            <select id="TipsDays" class="form-select">\
              <option value="0">不提醒</option>\
              <option value="1">1天</option>\
              <option value="3">3天</option>\
              <option value="5">5天</option>\
              <option value="7">一周</option>\
              <option value="15">半个月</option>\
              <option value="30">一个月</option>\
            </select>\
          </td>\
          <td>未完成的计划可以这里设置登录后台提醒时间。</td>\
        </tr>\
        <tr>\
          <td></td><td colspan="2"><button type="button" class="btn btn-secondary btn-sm" onclick="fun.d02()">确定添加</button></td>\
        </tr>\
      </tbody>\
      </table>\
    </div>'
		Tool.html(null,null,html)
	},
  d02:function()
	{
		let plan={addtime:Tool.gettime($("#addtime").val()),des:$("#des").val(),user:$("#user").val(),TipsDays:$("#TipsDays").val(),status:$('[name="status"]:checked').val()}
		if(plan.des)
		{
            plan.html = "<r: db=\"sqlite.tool\">insert into @.adminplan(@.addtime,@.des,@.TipsDays,@.status,@.user)values(" + plan.addtime + ",'" + plan.des.replace(/\n/ig, '<br/>') + "'," + plan.TipsDays + "," + plan.status + ",'" + plan.user +"')</r:>\"添加成功\""
			Tool.ajax.a01(plan.html,1,this.d03,this);
		}else{alert("请填写工作内容！")}
	},
	d03:function(t)
	{
		if(confirm(t+',是否继续添加?'))
		{window.location.reload();}
		else
		{this.a02('day');}
	},
 	e01:function(id)
	{
		let str='\
    <r:adminplan db="sqlite.tool" size=1 where=" where @.id='+id+'">\
    {\
      "id":<:id/>,\
      "addtime":<:addtime/>,\
      "des":"<:des tag=js/>",\
      "status":"<:status/>",\
      "TipsDays":<:TipsDays/>\
    }\
    </r:adminplan>'
		Tool.ajax.a01(str1,this.e02,this,1)
	},
  e02:function(list)
	{
		let html='\
		<header class="panel-heading"><a href="javascript:" onclick="window.location.reload();" class="arrow_back"></a>修改【工作计划】</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
        <tr>\
          <td class="w150 right">记录日期：</td>\
          <td class="w200"><input type="date" value="'+Tool.userDate13(list.addtime*1000,"-")+'" id="addtime" class="form-control form-control-sm center"/></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">计划内容：</td>\
          <td colspan="2"><textarea rows="10" cols="70" id="des" class="form-control form-control-sm">'+list.des.replace(/<br\/>/ig,'\n')+'</textarea></td>\
        </tr>\
        <tr>\
          <td class="right">计划状态：</td>\
          <td colspan="2">\
            <div class="form-check form-check-inline">\
              <input type="radio" id="status-0" name="status" value="0" '+(list.status=="0"?'checked="checked"':'')+' class="form-check-input">\
              <label class="form-check-label" for="status-0">未完成</label>\
            </div>\
            <div class="form-check form-check-inline">\
              <input type="radio" id="status-1" name="status" value="1" '+(list.status=="1"?'checked="checked"':'')+' class="form-check-input">\
              <label class="form-check-label" for="status-1">已完成</label>\
            </div>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">登录提醒：</td>\
          <td>\
            <select id="TipsDays" class="form-select">\
              <option value="0"'+(list.TipsDays==0?'selected="selected"':'')+'>不提醒</option>\
              <option value="1"'+(list.TipsDays==1?'selected="selected"':'')+'>1天</option>\
              <option value="3"'+(list.TipsDays==3?'selected="selected"':'')+'>3天</option>\
              <option value="5"'+(list.TipsDays==5?'selected="selected"':'')+'>5天</option>\
              <option value="7"'+(list.TipsDays==7?'selected="selected"':'')+'>一周</option>\
              <option value="15"'+(list.TipsDays==15?'selected="selected"':'')+'>半个月</option>\
              <option value="30"'+(list.TipsDays==30?'selected="selected"':'')+'>一个月</option>\
            </select>\
            </td>\
            <td>未完成的计划可以这里设置登录后台提醒时间。</td>\
        </tr>\
        <tr>\
          <td></td><td colspan="2"><button type="button" class="btn btn-secondary btn-sm" onclick="fun.e03('+list.id+')">确定修改</button></td>\
        </tr>\
        </tbody>\
      </table>\
    </div>'
		Tool.html(null,null,html)
	},
  e03:function(id)
	{
		let plan={addtime:Tool.gettime($("#addtime").val()),des:$("#des").val(),TipsDays:$("#TipsDays").val(),status:$('[name="status"]:checked').val()},str=""
		if(plan.des)
		{
			str="<r: db=\"sqlite.tool\">update @.adminplan set @.addtime="+plan.addtime+",@.des='"+plan.des.replace(/\n/ig,'<br/>')+"',@.TipsDays="+plan.TipsDays+",@.status="+plan.status+" where @.id="+id+"</r:>"
			Tool.ajax.a01(str,1,this.e04,this)
		}
		else{alert("请填写计划内容！")}
	},
	e04:function(t)
	{
		if(t=="")
		{window.location.reload();}
		else
		{alert("出错"+t);}
	}
}
fun.a01();