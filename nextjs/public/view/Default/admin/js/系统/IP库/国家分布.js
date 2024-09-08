'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[]},
  a01:function()
  {
			this.a02();
  },
  a02:function()
  {
    let str = '[{}\
		<r:country size="300" db="sqlite.dhgate" where=" where @.upid=\'0\' order by @.ipcount desc">,\
    {\
      "countryid":"<:countryid/>",\
      "name":"<:name/>",\
      "des":"<:des/>",\
      "chinaarea":"<:chinaarea/>",\
      "countrycode":"<:countrycode/>",\
      "currency":"<:currency/>",\
      "callingcode":"<:callingcode/>",\
      "ipcount":<:ipcount/>\
    }\
    </r:country>]'
	  Tool.ajax.a01(str, obj.arr[4],this.a03,this)
  },
  a03:function(arr) 
  {
    let html1 = '',html2 = '',data1={},data2=[]
    for (let i = 1; i < arr.length; i++)
    {
      html2 += '\
      <tr>\
        <td>'+ i + '</td>\
        <td>'+ arr[i].countryid + '</td>\
        <td class="left">'+this.b02(arr[i].countryid)+ arr[i].name + '（'+ arr[i].des + '）</td>\
        <td>'+ arr[i].ipcount + '</td>\
        <td>'+ arr[i].chinaarea + '</td>\
        <td>'+ arr[i].countrycode + '</td>\
        <td>'+ arr[i].currency + '</td>\
        <td>'+ arr[i].callingcode + '</td>\
      </ul>'
			//////////////////////////////////////////////////////////////
			this.obj.Aarr.push(arr[i].des)
			data1[arr[i].countryid.toLowerCase()]=arr[i].ipcount
			data1[arr[i].countryid.toLowerCase()+"des"]="<br/>国家（英文）："+arr[i].name +"<br/>国家（中文）："+this.b02(arr[i].countryid)+arr[i].des+'<br/>IP数量：'+arr[i].ipcount+"<br/>区域洲："+arr[i].chinaarea+"<br/>国家代码："+arr[i].countrycode+"<br/>币种："+arr[i].currency+"<br/>区号代码："+arr[i].callingcode
			if(i<=15)
			{
				html1+='\
				<tr>\
					<td>'+i+'</td>\
					<td class="left">'+this.b02(arr[i].countryid)+ arr[i].name + '（'+ arr[i].des + '）</td>\
					<td>'+ arr[i].ipcount + '</td>\
				</tr>'
				data2.push({label:this.b02(arr[i].countryid)+ arr[i].des,data:arr[i].ipcount});
			}
			else
			{
				let num=0;
				if(data2[15]===undefined)
				{
					data2.push({label:"其它",data:arr[i].ipcount});
				}
				else
				{
					data2[data2.length-1].data+=arr[i].ipcount;
				}				
			}
    }
		if(arr.length!=1)
		{
			html1+='\
			<tr>\
				<td>'+data2.length+'</td>\
				<td class="left">'+data2[data2.length-1].label+'</td>\
				<td>'+ +data2[data2.length-1].data + '</td>\
			</tr>'
		}
		let html=Tool.header()+'\
    <div class="p-2">\
      <table class="table align-top">\
        <tbody>\
				<tr>\
					<td id="pie-donutContainer"></td>\
					<td class="w-25 p-0">'+this.b01(html1)+'</td>\
				</tr>\
				<tr>\
					<td colspan="2" id="vmap" style="height:700px;border: 1px dashed gainsboro;"></td>\
				</tr>\
				</tbody>\
      </table>\
      <table class="table center">\
        <thead class="table-light">\
        <tr>\
          <th>编号</th>\
          <th>代码</th>\
          <th class="left">国家名称（描述）</th>\
          <th title="注：IP是不重复的。">IP数量</th>\
          <th>区域洲</th>\
          <th>国家代码</th>\
          <th>币种</th>\
          <th>区号代码</th>\
        </tr>\
        </thead>\
        <tbody>'+html2+'</tbody>\
			</table>\
    </div>'
    Tool.html(this.a04,this,html,[data1,data2])	
  },
  a04:function(data) 
  {
		if(data[1].length!=0)
		{
			let This=this
			jQuery('#vmap').vectorMap({
				map: 'world_en',
				backgroundColor: "#fff",
				hoverOpacity: 0.7,
				selectedColor: '#333333',
				enableZoom: true,
				borderWidth:2,
				showTooltip: true,
				values: data[0],
				scaleColors: ["#b6d6ff", "#005ace"],
				onLabelShow: function(event, label, code)
				{
					//console.log(event)
					let des=data[0][code+"des"]
					label.html('国家代码：'+code+(des===undefined?'':des));
				},
				normalizeFunction: 'polynomial'
			});
			this.a05(data[1]);
		}
	},
  a05:function(data) 
  {
		if(data[0].data!=0){$.plot($("#pie-donutContainer"), data,{
     	series: 
			{					
				pie: 
				{
					show: true,
					radius: 720,
					innerRadius: 0.5,
					label: 
					{
						show: true,
						radius: 1,
						formatter: function(label, series)
						{
								return '<div style="font-size:8px;text-align:center;padding:2px 20px 2px 5px;color:white;">'+label+'<br/><b>'+Math.round(series.percent)+'%</b></div>';
						}, 
						background: { opacity: 0.5,color: '#000' }
					}
				}
			},
			legend: {show: false},
			grid: {hoverable: true},
				tooltip: true,
				tooltipOpts:
				{
					defaultTheme: false,
					content: "占比：%p.0%<br/>国家：%s"
				}
		});}
	},
  b01:function(html1) 
  {
		return '\
		<table class="table center table-hover mb-0">\
			<tbody>\
			<tr class="table-light">\
				<th class="w60" style="padding-left: 30px;position: relative;">\
				<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
				<ul class="dropdown-menu">\
					<li onClick="fun.c01()"><a class="dropdown-item pointer">按国家统计IP数量</a></li>\
				</ul>编号\
				</th>\
				<th class="left">国家</th>\
				<th>IP数量</th>\
			</tr>\
			</thead>\
			<tbody>'+html1+'</tbody>\
		</table>'
	},
  b02:function(countryid)
  {
		let str=""
		if(countryid=="PS"||countryid=="KV")
		{}
		else
		{
			str='<img src="https://image.dhgate.com/images/flag/' + countryid + '.gif"/> '
		}		
		return str
	},
  c01:function()
  {
    let html='\
		<header class="panel-heading"><a href="javascript:" onclick="location.reload();" class="arrow_back"></a>正在【按国家统计IP数量】。。。</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w100">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
		this.obj.A2=this.obj.Aarr.length;
    Tool.html(this.c02,this,html);
	},
  c02:function()
  {
		if(this.obj.A1<=this.obj.A2)
		{
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
			this.c03()
		}
		else
		{$("#state").html("全部完成");}
	},
  c03:function()
  {
		let ct=this.obj.Aarr[this.obj.A1-1]
		$("#state").html("正在统计【"+ct+"】的ip数量。。。");
		let str='"<.Db(mysql.admin,select count(1) as Total FROM @.ip where @.ct=\''+ct+'\',count)/>"'
		Tool.ajax.a01(str,1,this.c04,this,ct)
	},
  c04:function(t,ct)
  {
		$("#state").html("正在保存【"+ct+"】的ip数量。。。");
		let str='""<r: db="sqlite.dhgate">update @.country set @.ipcount='+t+' where @.des=\''+ct+'\'</r:>'
		Tool.ajax.a01(str,1,this.c05,this)
	},
  c05:function(t)
  {
		if(t=="")
		{$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');this.obj.A1++;this.c02();}
		else
		{alert("出错");}
  }
}
fun.a01();
