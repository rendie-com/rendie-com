'use strict';
var fun=
{
  time:new Date(),
	obj:
	{
		A1:1,A2:0,
		B1:1,B2:0,Barr:{},
		where:" where @.upshelf&gt;0",username:"",password:"",fromid:0
	},
  a01:function()
  {
    let html=Tool.header("正在【上传产品主图视频到敦煌网】...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">说明：</td><td colspan="2">【产品未上架】不让上传</td></tr>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
		    <tr><td class="right">产品编码：</td><td id="proid" colspan="2"></td></tr>\
		    <tr><td class="right">产品编号：</td><td id="fromID" colspan="2"></td></tr>\
		    <tr><td class="right">上传前视频：</td><td id="srcA" colspan="2"></td></tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
				</tbody>\
      </table>\
    </div>'
		Tool.html(this.a02,this,html)
  },
	a02:function()
	{
    gg.isRD(this.a03,this);
  },
	a03:function()
	{
    Tool.getDHuser(this.a04,this);
  },
	a04:function()
	{
    $("#username").html(this.obj.username);
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a07,this);
  },
	a05:function()
	{
    $("#state").html("正在退出。。。");
    Tool.SignOut(this.a06,this);
  },
	a06:function()
	{
    $("#state").html("正在登陆。。。");
    Tool.SignIn(this.a07,this);//登陆
  },
  a07:function()
  {
		let str='\
    {\
    	"B2":'+(this.obj.B1==1?'<@count/>':'0')+'\
			<r:proupdhgatevideo size=1 db="sqlite.dhgate" page=2 where=" where @.upUserID='+this.obj.fromid+' and @.srcB is null and @.status=0">,\
				"id":<:id/>,\
				"proid":"<:proid/>",\
				"srcA":"<:srcA/>",\
				"fromID":<:fromID/>\
			</r:proupdhgatevideo>\
		}'
    $("#state").html("正在获取视频信息。。。");
   Tool.ajax.a01(str,1,this.a08,this);
  },
	a08:function(oo)
	{
		if(this.obj.B1==1){this.obj.B2=oo.B2;}
		this.obj.Barr=oo;
		this.a09()
  },
	a09:function()
	{
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a10,this,this.a16)
  },
	a10:function()
	{
		let oo=this.obj.Barr
    $("#proid").html(oo.proid);
    $("#fromID").html(oo.fromID);
    $("#srcA").html('<a href="'+oo.srcA+'" target="_blank">'+oo.srcA+'</a>');
		let url="https://seller.dhgate.com/merchant/upload_video.do?dhpath=10001,93&type=upload&itemcode="+oo.fromID;
    $("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    $("#state").html("正在打开【上传视频】页面。。。");
		gg.tabs_remove_create_indexOf(2,url,'class=" tips inline"',true,this.a11,this)
  },
	a11:function(t)
	{
		let str='""<r: db="mysql.tool">update @.action set @.code=\'"'+this.obj.Barr.srcA+'"\' where @.name=\'敦煌上传视频铺助\'</r:>'
		Tool.ajax.a01(str,1,this.a12,this)
  },
	a12:function(t)
	{
		let oo=this.obj.Barr;
		let videoName=oo.srcA.split("/").pop()
		let code='\
		$(function(){\
			$("#videonameid").val("'+videoName+'");\
			$("#videodesc").val("'+oo.fromID+'-'+oo.proid+'");\
		})'
    $("#state").html("正在填写信息，等待【rendie软件】上传视频，直到上传成功，才断续。。。");
		gg.tabs_executeScript_indexOf(2,null,code,videoName+"</span><1/>此产品未上架</span><1/>此产品编号产品类目暂时不允许上传视频</span><1/>很抱歉，您本次访问的网页出现问题，无法显示<1/>1个文件大小超200MB",true,this.a13,this);
  },
	a13:function(t)
	{
		if(t.indexOf("此产品未上架</span>")!=-1)
		{
			$("#state").html("正在更新【此产品未上架】。。。");
			Tool.ajax.a01(this.b01('此产品未上架'),1,this.a15,this)
		}
		else if(t.indexOf("此产品编号产品类目暂时不允许上传视频</span>")!=-1)
		{
			$("#state").html("正在更新【此产品编号产品类目暂时不允许上传视频】。。。");
			Tool.ajax.a01(this.b01('此产品编号产品类目暂时不允许上传视频'),1,this.a15,this)
		}
		else if(t.indexOf("很抱歉，您本次访问的网页出现问题，无法显示")!=-1)
		{
			$("#state").html("很抱歉，您本次访问的网页出现问题，无法显示");
			alert()
			this.a09();//重新打开			
		}
		else if(t.indexOf("1个文件大小超200MB")!=-1)
		{
			$("#state").html("1个文件大小超200MB");
			Tool.ajax.a01(this.b01('1个文件大小超200MB'),1,this.a15,this)			
		}
		else
		{
			let code='$(function(){$("#upload").click();})'
			$("#state").html("正在，点击【提交】按扭。。。");
			gg.tabs_executeScript_indexOf(2,null,code,'您已成功提交视频',true,this.a14,this);
		}
  },
	a14:function(t)
	{
    $("#state").html("正在【更新结果】。。。");
		let str='""<r: db="sqlite.aliexpress">update @.proupdhgatevideo set @.srcB=\'不知道地址，但上传成功。\',@.uptime='+Tool.gettime("")+' where @.id='+this.obj.Barr.id+'</r:>'
		Tool.ajax.a01(str,1,this.a15,this)
  },
	a15:function(t)
	{
		this.obj.B1++;
		this.obj.Barr=[];
		this.a07();
  },
	a16:function()
	{
		this.obj.B1=1;
		this.obj.B2=0;
		this.obj.Barr=[];
		this.obj.A1++;
		this.obj.username=""
		this.obj.password=""
		this.obj.fromid=0
    $("#B1,#C1").css("width","0%");
    $("#B1,#B2").html('')
		this.a03();
  },
	b01:function(str)
	{
			//清空【敦煌上传视频铺助】，就不用找图了，它会去查数据的。
		return '""<r: db="sqlite.aliexpress">update @.proupdhgatevideo set @.srcB=\'此产品编号产品类目暂时不允许上传视频\',@.uptime='+Tool.gettime("")+' where @.id='+this.obj.Barr.id+'</r:><r: db="mysql.tool">update @.action set @.code=null where @.name=\'敦煌上传视频铺助\'</r:>'
  }
}
fun.a01();