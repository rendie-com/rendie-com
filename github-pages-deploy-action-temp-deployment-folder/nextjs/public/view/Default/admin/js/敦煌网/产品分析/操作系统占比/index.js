'use strict';
var fun=
{
  a01:function()
  {
		let str='\
    [\
      [0\
				<r:dhgatelogimg_os size=30 where=" order by @.count desc">,\
				{\
					"count":<:count/>,\
					"os":"<:os/>"\
				}\
				</r:dhgatelogimg_os>\
			],\
      [0\
				<r:dhgatelogpro_os size=30 where=" order by @.count desc">,\
      	{\
					"count":<:count/>,\
					"os":"<:os/>"\
				}\
      	</r:dhgatelogpro_os>\
			]\
    ]'
    Tool.ajax.a01(html,1,this.a02,this)
	},
  a02:function(oo) 
  {
		let arr1=this.b01(oo[0],"img"),arr2=this.b01(oo[1],"pro")
		this.a03(arr1,arr2);
	},
  a03:function(arr1,arr2) 
  {
		let html='\
    <header class="panel-heading">\
      <div onclick="Tool.main()">图片访问日志</div>\
      <div onclick="Tool.main(\'js01\')">商品访问日志</div>\
      <div onclick="Tool.main(\'js02\')">商品分析</div>\
      <div onclick="Tool.main(\'js05\')" class="active">操作系统占比</div>\
    </header>\
		<div class="p-2">\
      <table class="table align-top">\
        <thead class="table-light">\
				<tr><th colspan="2">【图片访问日志】的操作系统占比</th></tr>\
				</thead>\
				<tbody>\
				<tr>\
					<td id="pie-donutContainer1"></td>\
					<td class="w-25 p-0">'+arr1[0]+'</td>\
				</tr>\
				</tbody>\
      </table>\
			<table class="table align-top">\
        <thead class="table-light">\
				<tr><th colspan="2">【商品访问日志】的操作系统占比</th></tr>\
				</thead>\
				<tr>\
					<td id="pie-donutContainer2"></td>\
					<td class="w-25 p-0">'+arr2[0]+'</td>\
				</tr>\
				</tbody>\
      </table>\
    </div>'
		Tool.html(this.a04,this,html,[arr1[1],arr2[1]])
	},
  a04:function(oo)
  {
		let op={
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
						threshold: 0.02,
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
		}
		if(oo[0][0]){$.plot($("#pie-donutContainer1"), oo[0],op);}
		if(oo[1][0]){$.plot($("#pie-donutContainer2"), oo[1],op);}
	},
  b01:function(arr,mode)
  {
		let html='\
		<table class="table center table-hover mb-0">\
		<thead class="table-light">\
			<tr>\
				<th class="w60" style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu">'+this.b02(mode)+'</ul>编号\
				</th>\
				<th>操作系统</th><th>访问次数</th><th>占比</th></tr>\
		</thead>\
		<tbody>'
		if(arr.length==31){alert("操作系统有30个，会益出，请与管理员联系。");}
		let data=[],count=0,count2=0;
		for(let i=1;i<arr.length;i++){count+=arr[i].count}
		for(let i=1;i<arr.length;i++)
		{
			if(count){count2=((arr[i].count/count)*100).toFixed();}
			html+='<tr><td>'+i+'</td><td>'+arr[i].os+'</td><td>'+arr[i].count+'</td><td>'+count2+' %</td></tr>'
			data.push({label:arr[i].os,data:arr[i].count});
		}
		return [html+"</tbody></table>",data];
	},
  b02:function(mode)
  {
		let html=''
		if(mode=="img")
		{
			html='\
			<li onClick="Tool.open5(\'js06\',\'dhgatelogimg\')"><a class="dropdown-item pointer">获取新的操作系统</a></li>\
			<li onClick="Tool.open5(\'js07\',\'dhgatelogimg\')"><a class="dropdown-item pointer">统计操作系统的访问次数</a></li>'
		}
		else
		{
			html='\
			<li onClick="Tool.open5(\'js06\',\'dhgatelogpro\')""><a class="dropdown-item pointer">获取新的操作系统</a></li>\
			<li onClick="Tool.open5(\'js07\',\'dhgatelogpro\')""><a class="dropdown-item pointer">统计操作系统的访问次数</a></li>'
		}
		return html;
	}
}
fun.a01();