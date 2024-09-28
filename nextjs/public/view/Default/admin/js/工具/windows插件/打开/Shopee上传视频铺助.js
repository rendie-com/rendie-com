'use strict';
var fun=
{
	obj:
	{
		time:null,//记录运行时长
	},
  a01:function()
  {
		let str='\
		<table class="table align-middle">\
			<thead class="table-light"><tr><td colspan="2">执行说明</td></tr></thead>\
      <tbody>\
				<tr>\
					<td class="w150 right">操作：</td>\
					<td><button class="btn btn-outline-secondary" type="button" id="RunningTheHelper" onclick="fun.c01();">运行铺助程序</button></td>\
				</tr>\
				<tr><td class="w150 right">下载地址：</td><td id="srcA"></td></tr>\
				<tr><td class="w150 right">上传地址：</td><td id="srcB"></td></tr>\
				<tr><td class="w150 right">提示：</td><td id="state"></td></tr>\
				<tr><td class="w150 right">说明：</td><td>当【code】字段，收到数据会自动执行。</td></tr>\
				<tr><td class="w150 right">步骤：</td><td>\
					（1）定时检查是否接收到数据。<br/>\
					（2）当接收到数据后，点击【添加图片】按扭<br/>\
					（3）然后下载<br/>\
					（4）然后复制下载好的【视频地址】<br/>\
					（5）然后【Ctrl+V】+【回车】，<br/>\
					（6）最后清空接收信息和剪贴板，回到第一步。</td></tr>\
			</tbody>\
    </table>'
    Tool.body(str);
  },
	c01:function()
  {
		win.isRD(this.c02,this)
  },
	c02:function()
  {
		this.obj.time=new Date();
		$("#RunningTheHelper").attr("disabled",true);
		this.c03()
  },
	c03:function()
  {
		let str='<r:action db="sqlite.tool" size=1 where=" where @.id='+obj.arr[5]+'"><:code tag=0/></r:action>'
		$("#state").html('正在查询数数据，是否存在。。。');      
		Tool.ajax.a01(str,1,this.c04,this)
  },
	c04:function(url)
  {
		if(url==0)
		{
			$("#RunningTheHelper").html("已运行："+Tool.dateDHM(new Date(),this.obj.time,"s"))
			Tool.Time(this.c03,500,this,"1");			
		}
		else
		{
			this.c05(url)
		}
  },
	c05:function(url)
  {
		let src="Shopee上传视频铺助/添加视频.bmp"
		$("#state").html('正在找【'+url+'】。。。');
		win.findPic(src,0,this.c06,this,url)
  },
	c06:function(t,url)
  {
		if(t=="[]")
		{
			$("#state").html('没找到。。。');
			Tool.Time(this.c05,2000,this,"1",url);//延时
		}
		else
		{
			let arr=[];eval("arr="+t);arr=arr[0].split(",");
			win.rightClick1(parseInt(arr[0])+90,parseInt(arr[1])+20,this.c07,this,url);//点【添加视频】
		}
	},
	c07:function(url)
  {
		$("#srcA").html(url);
		$("#state").html('正在【下载】。。。');
		win.downLoad(url,this.c08,this,url)		
	},
	c08:function(t,url)
  {		
		if(t=="[object Object]")
		{
		  $("#state").html('没下载下来，重新下载，延时2秒。。。');
			Tool.Time(this.c07,2000,this,"1",url);
		}
		else
		{
			$("#srcB").text(t+" MB");
			let arr=t.split(",")
			win.copy(arr[0])
			this.c09();
		}
  },
	c09:function()
  {
		$("#state").html('正在【粘贴】。。。');
		win.keyArr(["162◣300","86◣100","86◤30","162◤200","13◣50","13◤200"],this.c10,this)//粘贴+回车
  },
	c10:function()
  {
		$("#state").html('正在清空【code】字段内容。。。');
		win.clipboardClear()//清空剪贴板
		let str='""<r: db="sqlite.tool">update @.action set @.code=null where @.id='+obj.arr[5]+'</r:>'
		Tool.ajax.a01(str,1,this.c11,this)
  },
	c11:function(t)
  {
		this.obj.url=""
		this.obj.type="";
		$("#srcA,#srcB").html("");
		$("#state").html('正在等待上传结果。。。');
		this.c04(0)//延时
  }
}
fun.a01();