'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    obj.arr[4]=obj.arr[4]?obj.arr[4]:1;//翻页
    obj.arr[5]=obj.arr[5]?obj.arr[5]:"1";//搜索字段
		obj.arr[6]=obj.arr[6]?obj.arr[6]:"-_-20";//搜索关键词
		obj.arr[7]=obj.arr[7]?obj.arr[7]:"-_-20";//DH卖家账户
		obj.arr[8]=obj.arr[8]?obj.arr[8]:"-_-20";//DH状态
    this.a02();
  },
  a02:function()
  {
		let str='[0\
		<r:proupdhgate size=25 db="sqlite.dhgate" page=2 where="'+this.b01()+' order by @.uptime desc,@.id desc">,\
			{\
				"proid":"<:proid/>",\
				"addtime":"<:addtime/>",\
				"uptime":"<:uptime/>",\
				"uptime":"<:uptime/>",\
				"srcA":"<:srcA/>",\
				"srcB":"<:srcB/>",\
				"upUserID":<:upUserID/>,\
				"fromID":<:fromID/>,\
				"status":<:status/>,\
				"id":"<:id/>"\
		}\
		</r:proupdhgate>]'
		Tool.ajax.a01("[]",obj.arr[4],this.a03,this);
	},
  a03:function(arr)
  {
    let html=''
    for(let i=1;i<arr.length;i++)
    {
      html+='\
			<tr>\
				<td>'+this.b05(arr[0].seller,arr[i].upUserID)+'</td>\
				<td>'+this.b06(arr[i].status)+'</td>\
				<td>'+arr[i].proid+'</td>\
				<td><a href="https://www.dhgate.com/product/-/'+arr[i].fromID+'.html" target="_blank">'+arr[i].fromID+'</a></td>\
				<td><a href="'+arr[i].srcA+'" target="_blank">'+arr[i].srcA.split("/").pop()+'</a></td>\
				<td>'+arr[i].srcB+'</td>\
				<td>'+Tool.js_date_time2(arr[i].addtime)+'</td>\
				<td>'+(arr[i].uptime==0?"":Tool.js_date_time2(arr[i].uptime))+'</td>\
				<td style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu">\
						<li onclick=""><a class="dropdown-item pointer">删除</a></li>\
					</ul>\
				</td>\
      </tr>';
    }
   // html+='<tr><td colspan="9" class="left">'+Tool.page(arr[0].count,arr[0].size,4)+'</td></tr>'
		html=Tool.header()+'\
    <div class="p-2">\
		'+this.b02()+'\
    <table class="table table-hover align-middle center">\
      <thead class="table-light">'+this.b04(arr[0])+'</thead>\
      <tbody>'+html+'</tbody>\
    </table>\
		</div>'
    Tool.html(null,null,html);
	},
  b01:function()
  {
    let arr=[];
    if(obj.arr[6]!="-_-20")
    {
      switch(obj.arr[5])
      {
        case "1":arr.push("@.proid='"+Tool.unescape(obj.arr[6])+"'");break;//商品编码
        case "2":arr.push("@.fromID="+Tool.unescape(obj.arr[6]));break;//来源ID
        case "3":arr.push("@.srcA like '%"+Tool.unescape(obj.arr[6])+"%'");break;//【上传前】地址
        case "4":arr.push("@.srcB like '%"+Tool.unescape(obj.arr[6])+"%'");break;//【上传后】地址
      }
    }
		if(obj.arr[7]!="-_-20"){arr.push("@.upuserid="+obj.arr[7])}
		if(obj.arr[8]!="-_-20"){arr.push("@.status="+obj.arr[8])}
    return (arr.length==0?"":" where "+arr.join(" and "));
	},
  b02:function()
  {
    return '\
    <div class="input-group w-50 mb-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+obj.arr[5]+'">'+this.b03(obj.arr[5])+'</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">商品编码</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">来源ID</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c01(3)" value="3">【上传前】地址</li>\
        <li class="dropdown-item pointer" onclick="fun.c01(4)" value="4">【上传后】地址</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+Tool.Trim(Tool.unescape(obj.arr[6]))+'" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>'
  },
  b03:function(val)
	{
    let name="";
    switch(val)
		{
		  case "1":name="商品编码";break;
		  case "2":name="来源ID";break;
		  case "3":name="【上传前】地址";break;
		  case "4":name="【上传后】地址";break;
      default:name="未知："+val;
		}
    return name
  },
  b04:function(oo)
	{
		return '\
		<tr>\
			<th class="p-0"></th>\
			<th class="p-0">'+this.b09(obj.arr[8])+'</th>\
			<th>商品编码</th>\
			<th>来源ID</th>\
			<th>【上传前】地址</th>\
			<th>【上传后】地址</th>\
			<th>上传时间</th>\
			<th>更新时间</th>\
			<th style="padding-left: 30px;position: relative;" class="w30">\
				<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
				<ul class="dropdown-menu">\
					<li onclick="Tool.open4(\'js22\')"><a class="dropdown-item pointer">删除已上传商品的视频</a></li>\
					<li onclick="Tool.open4(\'js13\')"><a class="dropdown-item pointer">获取已上传商品的视频地址</a></li>\
					<li onClick="Tool.open4(\'js11\');"><a class="dropdown-item pointer">*上传产品主图视频到敦煌网</a></li>\
					<li onclick="Tool.open4(\'js15\')"><a class="dropdown-item pointer">获取上传后的视频ID</a></li>\
				</ul>\
			</th>\
    </tr>'
	},
  b05:function(arr,upuserid)
  {
		let str="未知"
		for(let i=1;i<arr.length;i++)
    {
			if(upuserid==arr[i].fromid){str=arr[i].UserName;break;}
		}
		return str
	},
  b06:function(status)
	{
		let arr=[[0,"正常"],[1,"已下架"],[2,"待审核"],[5,"审核未通过"],[3,"品牌商投诉"],[4,"其它"]]
		let str="未知:"+status
		for(let i=0;i<arr.length;i++)
    {
			if(status==arr[i][0]){str=arr[i][1];break;}
		}
		return str
  },
  b08:function(arr,userid)
	{
		let li4=""
    for(let i=1;i<arr.length;i++)
    {
      li4+='<option value="'+arr[i].fromid+'" '+(userid==arr[i].fromid?'selected="selected"':'')+'>'+i+'.'+arr[i].UserName+'</option>';  
    }
    let str='<select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select"><option value="-_-20">DH卖家账户</option>'+li4+'</select>'
		return str
  },
  b09:function(status)
  {
    let str='\
		<select onChange="Tool.open(8,this.options[this.selectedIndex].value)" class="form-select">\
			<option value="-_-20">DH状态</option>\
			<option value="0" '+(status==0?'selected="selected"':'')+'>正常</option>\
			<option value="1" '+(status==1?'selected="selected"':'')+'>已下架</option>\
			<option value="2" '+(status==2?'selected="selected"':'')+'>待审核</option>\
			<option value="5" '+(status==5?'selected="selected"':'')+'>审核未通过</option>\
			<option value="3" '+(status==3?'selected="selected"':'')+'>品牌商投诉</option>\
			<option value="4" '+(status==4?'selected="selected"':'')+'>其它</option>\
		</select>';
    return str;
  },
  c01:function(val)
  {
    let name=this.b03(""+val)
    $("#Field").html(name).val(val)
  },
	c02:function()
	{
    let Field=$("#Field").val(),searchword=Tool.Trim($("#searchword").val());
    if(searchword)
    {   
      searchword=Tool.escape(searchword)
      Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/"+obj.arr[3]+"/1/"+Field+"/"+searchword);
    }else{alert("请输入搜索内容");}    
	},
}
fun.a01()