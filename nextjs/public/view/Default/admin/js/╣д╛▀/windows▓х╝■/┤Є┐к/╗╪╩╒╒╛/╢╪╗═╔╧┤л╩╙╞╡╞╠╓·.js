'use strict';
var fun=
{
	obj:
	{
		time:null,//记录运行时长
		num:0//当上传视频的时后，上传失败弹窗报了个错误。点重试，可以解决。
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
				<tr><td class="w150 right">下载视频地址：</td><td id="srcA"></td></tr>\
				<tr><td class="w150 right">上传视频地址：</td><td id="srcB"></td></tr>\
				<tr><td class="w150 right">提示：</td><td id="state"></td></tr>\
				<tr><td class="w150 right">说明：</td><td>当【code】字段，收到数据会自动执行。</td></tr>\
				<tr><td class="w150 right">步骤：</td><td>\
					（1）定时检查是否接收到数据。<br/>\
					（2）当接收到数据后，等待图片【敦煌上传视频铺助/标题加载完成.bmp】加载完成<br/>\
					（3）然后下载视频<br/>\
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
	c04:function(t)
  {
		if(t==0)
		{
			$("#RunningTheHelper").html("已运行："+Tool.dateDHM(new Date(),this.obj.time,"s"))
			this.obj.num++;
			if(this.obj.num>30)
			{
				$("#state").html('等了30秒，还没等到上传，看一下是不是出错了。');
				this.d01();
			}
			else
			{Tool.Time(this.c03,1000,this,"1");}			
		}
		else
		{
			this.c05()
		}
  },
	c05:function()
  {
		$("#state").html('正在找【标题加载完成】图标。。。');
		let pic="敦煌上传视频铺助/标题加载完成.bmp"
		win.findPic(pic,0,this.c06,this)
  },
	c06:function(t)
  {
		if(t=="[]")
		{
			this.c04(0)//延时
		}
		else
		{
			//为什么还要取一次值？因为第一次是为了接收到数据，可能不是正确的值，比如：不让上传视频，
			//如果能找到【标题加载完成.bmp】，说明值是正常的，可以用。
			let str='<r:action db="sqlite.tool" size=1 where=" where @.id='+obj.arr[5]+'"><:code tag=0/></r:action>'
			$("#state").html('正在获取【code】字段内容。。。');      
			Tool.ajax.a01(str,1,this.c07,this)
		}
	},
	c07:function(t)
  {
		$("#srcA").html(t);
		$("#state").html('正在【下载视频】。。。');
		win.downLoad(t,this.c08,this)
	},
	c08:function(t)
  {
		if(t=="")
		{
			alert("没下载下来")
		}
		else
		{
			win.copy(t)
			$("#srcB").text(t);
			$("#state").html('正在找【上传视频】按扭。。。');
			let pic="敦煌上传视频铺助/上传视频.bmp"
			win.findPic(pic,0,this.c09,this)
		
		}
  },
	c09:function(t)
  {
		if(t=="[]")
		{alert("既然找【标题加载完成】图标，就不可能，找不到【上传视频】按扭。");}
		else
		{
			let arr=[];eval("arr="+t);arr=arr[0].split(",");
			win.rightClick1(parseInt(arr[0])+5,parseInt(arr[1])+2,this.c10,this);//点【上传视频】
		}
  },
	c10:function()
  {
		win.keyArr(["162◣250","86◣150","86◤150","162◤200","13◣50","13◤200"],this.c11,this)//粘贴+回车
  },
	c11:function()
  {
		let str='""<r: db="sqlite.tool">update @.action set @.code=null where @.id='+obj.arr[5]+'</r:>'
		$("#state").html('正在清空【code】字段内容。。。');
		win.clipboardClear()//清空剪贴板
		Tool.ajax.a01(str,1,this.c12,this)
  },
	c12:function(t)
  {
		if(t=="")
		{
			this.obj.num=0;
			$("#srcA,#srcB").html("");
			$("#state").html('【延时3秒】正在等待上传结果。。。');
			Tool.Time(this.c03,1000*3,this,"1");
		}
		else
		{alert("出错");}
  },
	d01:function()
  {
		$("#state").html('正在找【错误0x8000402】图片。。。');
		let pic="敦煌上传视频铺助/错误0x8000402.bmp"
		win.findPic(pic,0,this.d02,this)
  },
	d02:function(t)
  {
		this.obj.num=0;
		if(t=="[]")
		{
			$("#state").html('没有出错，可以继续。。。');
			this.c04(0)//延时
		}
		else
		{
			$("#state").html('有出错，正在点【重试】。。。');
			let arr=[];eval("arr="+t);arr=arr[0].split(",");
			win.rightClick1(parseInt(arr[0])+140,parseInt(arr[1])+140,this.c03,this);//点【重试】
		}
  }
}
fun.a01();