'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[],B1:1,B2:0,Barr:[]},time:new Date(),
	a01:function()
	{
		let html =Tool.header('正在获取国家下的【State/Province/Region】和【city】...')+'\
		<div class="p-2">\
		<table class="table table-hover align-middle">\
			<tr><td class="right w200">国家进度：</td>'+Tool.htmlProgress('A')+'</tr>\
			<tr><td class="right">国家名称：</td><td id="name" colspan="2"></td></tr>\
			<tr><td class="right">城市进度：</td><td id="D1"><div class="progress w500"><div class="progress-bar progress-bar-striped bg-success progress-bar-animated" style="width:0%;" id="B1">0%</div></div></td><td id="B2"></td></tr>\
			<tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
			<tr><td class="right">统计：</td><td id="doTime" colspan="2"></td></tr>\
			<tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
		</table>\
		</div>'
		Tool.html(this.a02,this,html);
	},
	a02:function()
	{
		let str = '[{}\
		<r:country db="sqlite.aliexpress" size="500" where=" where @.upid=\'0\' order by @.name asc">,\
		{\
			"id":[country:id],\
			"fromid":[country:fromid],\
			"isleaf":[country:isleaf],\
			"countryid":"[country:countryid]",\
			"name":"[country:name]"\
		}\
		</r:country>]'
		Tool.ajax.a01(str, this.obj.A1, this.a03,this)
	},
	a03:function(oo)
	{
		this.obj.A2 = oo.length-1
		this.obj.Aarr=oo;
		this.a04();
	},
	a04:function()
	{
		if(this.obj.A1 <= this.obj.A2)
		{
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1 + '/' + this.obj.A2 + ' (条)');
			$("#name").html(this.obj.Aarr[this.obj.A1].name + "（" + this.obj.Aarr[this.obj.A1].countryid + "）");
			this.a05();
		}
		else
		{
			$("#A2").html(this.obj.A1+ '/' + this.obj.A2 + " (完)");
			$("#state").html("全部完成")
		}
	},
	a05:function()
	{
		if (this.obj.Aarr[this.obj.A1].isleaf == 1)//国家下，有没有叶子节点。
		{
			let url = 'https://ilogisticsaddress.aliexpress.com/ajaxGetGlobalAddress.htm?callback=fun.a07&country=' + this.obj.Aarr[this.obj.A1].countryid;
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			$("#state").html("正在打开【State/Province/Region】。。。");
			Tool.ajax.a01("<:WebRequestGet(" + url + ")/>",1,this.a06,  this);
		}
		else
		{
			this.obj.A1++; this.a04();
		}
	},
  a06:function (t)
	{
		if (t.indexOf('"success":true') != -1)
		{
			$("#doTime").html(Tool.doTime(this.time,this.obj.A1,this.obj.A2));
			eval(t);
		}
		else
		{document.write("出错:" + t) }
	},
	a07: function (arr)
	{
			let sql = []
			arr = arr.address;
			if (arr.length == 0){this.obj.A1++;this.a04();}
			else
			{
				sql.push('update @.country set @.isleaf=0 where @.id=' + this.obj.Aarr[this.obj.A1].id)
				for (let i = 0; i < arr.length; i++)
				{
					sql.push('insert into @.country(@.name,:sort,:upid,:fromid,:isleaf)values(\'' + arr[i].n.replace(/'/ig, "''") + '\',\'' + (i + 1) + '\',\'' + this.obj.Aarr[this.obj.A1].fromid + '\',\'' + arr[i].id + '\',' + (arr[i].needChildren ? 0 : 1) + ')')
					if (arr[i].needChildren)
					{
						this.obj.Barr.push({ country: this.obj.Aarr[this.obj.A1].countryid, province: arr[i].c, name: arr[i].n, id: arr[i].id });
					}
				}
				this.obj.B2=this.obj.Barr.length;
				$("#state").html("正在添加 "+arr.length + "（个【省/洲】）");
				let str = '<r: db="sqlite.aliexpress">' + sql.join("<1/>") + '</r:>'
				//Tool.at(str)
				Tool.ajax.a01( str,1,this.a08, this)
			}
	},
	a08: function (t)
	{
		if (t == "")
		{
			let p1 = Math.ceil(this.obj.B1 / this.obj.B2 * 100)
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1 + '/' + this.obj.B2 + ' (个)');
			if (this.obj.B1 <= this.obj.B2)
			{
					let url = 'https://ilogisticsaddress.aliexpress.com/ajaxGetGlobalAddress.htm?callback=fun.a09&country=' + this.obj.Barr[this.obj.B1 - 1].country + '&province=' + this.obj.Barr[this.obj.B1 - 1].province;
					$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
					$("#state").html("正在获取【城市】信息。。。");
					Tool.ajax.a01( "<:WebRequestGet(" + url + ")/>",1,this.a06, this);
			}
			else
			{
				$("#doTime").html(Tool.doTime(this.time,this.obj.A1,this.obj.A2));
				$("#B1").html("0%").css("width","0%");
				$("#B2").html("");
				$("#A2").html(this.obj.B1 + '/' + this.obj.B2 + " (完)");
				this.obj.Barr = [];
				this.obj.B1 = 1;
				this.obj.B2 = 0;
				this.obj.A1++;
				this.a04();
			}
		} else { document.write("出错:" + t) }
	},
	a09: function (arr)
	{
		let sql = []
		arr = arr.address;
		if (arr.length == 0)
		{
			alert("aaaaaaabbbbbbbbbbbbaaaaaaaaaaa")
			//this.a10('');
		}
		else
		{
				for (let i = 0; i < arr.length; i++)
				{
						sql.push('insert into @.country(@.name,:sort,:upid,:fromid,:isleaf)values(\'' + arr[i].n.replace(/'/ig, "''") + '\',\'' + (i + 1) + '\',\'' + this.obj.Barr[this.obj.B1 - 1].id + '\',\'' + arr[i].id + '\',' + (arr[i].needChildren ? 0 : 1) + ')')
						if (arr[i].needChildren)
						{alert("【city】下面不可能用子节点。");}
				}
		}
		let str = '<r: db="sqlite.aliexpress">' + sql.join("<1/>") + '</r:>'
		$("#state").html("正在添加 "+arr.length + "（个【城市】）");
		Tool.ajax.a01( str,1,this.a10, this)
	},
  a10:function (t)
	{
			if (t == ""){this.obj.B1++;this.a08(''); } else { Tool.at(t) }
	}	
}
fun.a01();