'use strict';
var fun=
{
	obj:{A1:1,A2:0,B1:1,B2:0,Barr:[]},
	a01:function()
	{
    let html=Tool.header('正在【从敦煌网获取【热搜关键词】】任务。。。')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w120">关键词进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right w120">导入进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
    gg.isRD(this.a03,this);
  },
  a03:function()
  {
    let str = '\
		{\
		<r:seller size=1 db="sqlite.dhgate" where=" where @.username=\'sport_11\'">\
			"username":"<:username/>",\
			"password":"<:password/>"\
		</r:seller>\
		}'
   Tool.ajax.a01(str,1,this.a04,this)
	},
  a04:function(oo)
	{
    this.obj.username=oo.username;
    this.obj.password=oo.password;
		$("#state").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 正在退出。。。')
		$("#username").html(oo.username);
    Tool.SignOut(this.a05,this);
	},
  a05:function(This)
	{
		$("#state").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 正在登陆。。。')
    Tool.SignIn(this.a06,this);
	},
  a06:function()
	{
		let url='https://seller.dhgate.com/wisdom/keyword/hotSearch.do?dhpath=10007,61,6201&page='+this.obj.A1
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>')
		gg.getFetch(url,"json",this.a07,this);
	},
  a07:function(t)
	{
		$("#state").html("正在截取内容。。。")
		if(t.indexOf('<table cellpadding="0" cellspacing="0"')!=-1)
		{
			let html=Tool.Trim(Tool.StrSlice(t,'国家(TOP3)</th>','</table>'));
			let arr1=html.split('<td class="padleft20">'),arr2=[]
			let newArr=[]
			for(let i=1;i<arr1.length;i++)
			{
				arr2=arr1[i].split('</td>');
				if(arr2[0].length>50){arr2[0]=arr2[0].substr(0,50);}
				newArr.push({
					keys:arr2[0],//关键词
					searchIdx:arr2[1].split('>')[1],//搜索热度
					searchPopularity:arr2[2].split('>')[1],//搜索人气
					searchIdxChange:arr2[3].split('>')[1].split('<')[0],//热度变化
					clickIdx:arr2[4].split('>')[1],//点击量
					clickSearchRate:arr2[5].split('>')[1].replace("%",""),//点击率
					productNumber:arr2[6].split('>')[1],//平台产品数
					confirmVisitRate:arr2[7].split('>')[1].replace("%",""),//浏览-成交转化率
					country:arr2[8].split('>')[1]//国家(TOP3)
				})
			}
			let A2=Tool.StrSlice(t,'				共有','条记录');
			if(this.obj.A2==0){this.obj.A2=Math.ceil(parseInt(A2)/newArr.length);}
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
			this.obj.Barr=newArr;
			this.obj.B2=newArr.length;
			this.a08()
		}
		else
		{alert("内容不对");}
	},
  a08:function()
	{
		let arrL=[],arrR=[],arrUp=[]
		let arr=this.obj.Barr[this.obj.B1-1];
		for(let j in arr)
		{
			arrL.push('@.'+j);
			if(j=="keys"||j=="country")
			{arrR.push("'"+arr[j].replace(/'/g,"''")+"'");}
			else
			{arrR.push(arr[j]);}
			if(j!="keys")
			{
				if(j=="country")
				{arrUp.push('@.'+j+"='"+arr[j]+"'");}
				else
				{arrUp.push('@.'+j+"="+arr[j]);}
			}
		}
		let str='\
		<if Fun(Db(sqlite.dhgate,select count(1) from @.keys where @.keys=\''+arr.keys.replace(/'/g,"''") + '\',count))==0>\
			<r: db="sqlite.dhgate">insert into @.keys('+arrL.join(",")+',@.addtime)values('+arrR.join(",")+','+Tool.gettime("")+')</r:>\
		<else/>\
			<r: db="sqlite.dhgate">update @.keys set '+arrUp.join(",")+',@.uptime='+Tool.gettime("")+' where @.keys=\''+arr.keys.replace(/'/g,"''") + '\'</r:>\
		</if>';
		let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
		$("#B1").html(p1+"%").css("width",p1+"%");
		$("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）');
		$("#state").html("正在导入内容。。。")
		Tool.ajax.a01('""'+str,1,this.a09,this);
	},
  a09:function(t)
	{
		if(t=="")
		{			
			$("#state").html("正在导入成功。。。")
			this.obj.B1++;
			if(this.obj.B1<=this.obj.B2)
			{this.a08();}
			else
			{this.obj.B1=1;this.a10();}
		}
		else
		{Tool.at("出错01："+t);}
	},
  a10:function()
	{
		this.obj.A1++;
		if(this.obj.A1<=this.obj.A2)
		{
			this.a06();
		}
		else
		{$("#state").html("全部完成。。。");}		
  }
}
fun.a01();