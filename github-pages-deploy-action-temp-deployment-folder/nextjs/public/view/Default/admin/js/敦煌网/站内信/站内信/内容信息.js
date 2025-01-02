'use strict';
var fun=
{
  obj:{},token:"",
  a01:function()
  {
    obj.arr[4]=obj.arr[4]?obj.arr[4]:"-_-20";//来源ID
		this.a02();
  },
  a02:function()
  {
		let str='\
    {\
      <r:msg size=1 db="sqlite.dhgate" where=" where '+this.b01()+'" page=2>\
      "username":"<:fromuser/>",\
      "msgformid":<:fromid/>,\
      <r:seller size=1 db="sqlite.dhgate" where=" where @.UserName=\'<:fromuser/>\'">\
        "password":"<:password/>",\
        "fromid":"<:fromid/>",\
        "token":<:token tag=0/>,\
      </r:seller>\
      "PurchaseURL":"<:PurchaseURL/>",\
      "PurchaseNote":"<:PurchaseNote/>",\
      "name":"<:name tag="js"/>",\
      "SendTime":"<:SendTime/>",\
      "msgtype":"<:msgtype/>",\
      "sender":"<:sender tag=js/>",\
      "senderId":"<:senderId/>",\
      "senderRead":"<:senderRead/>",\
      "senderMark":"<:senderMark/>",\
      "senderStatus":"<:senderStatus/>",\
      "receiver":"<:receiver tag=js/>",\
      "recieverId":"<:recieverId/>",\
      "receiverRead":"<:receiverRead/>",\
      "receiverMark":"<:receiverMark/>",\
      "receiverStatus":"<:receiverStatus/>",\
      "param":"<:param/>",\
      "isQA":"<:isQA/>",\
      "PurchaseUserName":"<r:buyer db="sqlite.dhgate" size=1 where=" where @.isdefault=1"><:UserName/></r:buyer>",\
      <if "<:msgtype/>"=="002">\
        <r:order db="sqlite.dhgate" size=1 where=" where @.orderid=\'<1:param/>\'">\
        "PurchaseUserName2":"<:PurchaseUserName/>",\
        "PurchaseOrderId":"<:PurchaseOrderId/>",\
        "orderitemFromid":"<r:orderitem db="sqlite.dhgate" where=" where @.OrderID=\'<:OrderID/>\'" size="50">,<:fromid/></r:orderitem>",\
        </r:order>\
      </if>\
      </r:msg>\
      "count":<@count/>\
    }';
    //【orderitemFromid】  一个订单里面有多少组产品，可以知道是哪个产品的询盘。
		Tool.ajax.a01(str,1,this.a03,this)
  },
  a03:function(oo)
  {
    this.obj=oo;
    let str='';
    if(oo.msgtype=="001")//询盘
    {
      str='{\
      <r:pro size=1 db="sqlite.aliexpress" where=" where @.proid=(select @.proid from @.proupdhgate where @.fromid='+oo.param+')">\
      "proId":[0,<:fromid/>],\
      "shopId":"<:shopId/>"\
      </r:pro>}'
      //"proId"  是为了与“002同步”
     Tool.ajax.a01(str,1,this.a06,this)
    }
    else if(oo.msgtype=="002")//订单
    {
      if(oo.orderitemFromid)
      {
        oo.orderitemFromid=oo.orderitemFromid.substr(1);
        str='[0<r:pro db="sqlite.aliexpress" size=50 where=" where @.proid in(select @.proid from @.proupdhgate where @.fromid in('+oo.orderitemFromid+'))">,<:fromid/></r:pro>]'
       Tool.ajax.a01(str,1,this.a04,this)
      }
      else
      {alert("找不到订单号："+oo.param);}
    }
    else
    {
			this.a04([])
    }
  },
  a04:function(oo)
  {
    oo.shift();
    this.obj.proidArr=oo;
    let str='\
    {\
    <r:msgdes db="sqlite.dhgatemsgdes" size=1 where=" where @.fromid='+this.obj.msgformid+'">\
      "des":<:des/>\
    </r:msgdes>\
    }'
   Tool.ajax.a01(str,1,this.a05,this)
  },
  a05:function(oo)
  {
    this.obj.des=oo.des
    this.a07(this.obj)
  },
  a07:function(msg)
  {
		if(msg.productId){msg.productId=msg.productId.substr(1).split(",");}//产品来源ID
		this.obj=
		{
      ////////设置【已读】【未读】需要/////////////
			fromid:msg.fromid,
			token:msg.token,
			username:msg.username,password:msg.password,
      //////////////////////////////////
			msgformid:msg.msgformid,
      PurchaseURL:msg.PurchaseURL,
			productId:msg.productId,
			PurchaseUserName:msg.PurchaseUserName,//给智能化用的
      des:msg.des,
		}
    /////////////////////////////////////
    msg.username=msg.username.toLowerCase()
    msg.sender=msg.sender.toLowerCase()
    msg.receiver=msg.receiver.toLowerCase()  
    if(msg.sender==msg.username)//我是发送者
    {
      this.obj.myname=msg.sender
      this.obj.my32id=msg.senderId
      this.obj.myRead=msg.senderRead
      /////////////////////////////
      this.obj.toname=msg.receiver
      this.obj.to32id=msg.recieverId
    }
    else if(msg.receiver==msg.username)//我是接收者
    {
      this.obj.myname=msg.receiver
      this.obj.my32id=msg.recieverId
      this.obj.myRead=msg.receiverRead
      /////////////////////////
      this.obj.toname=msg.sender
      this.obj.to32id=msg.senderId
    }
    else
    {alert("异常");}
    ///////////////////////////////////////
		let arr=this.b02(msg.des,msg.username),msgURL='',str2='',prostr='',shopstr='';
    /////////////////////////////////////////////////////////////
		if(msg.PurchaseOrderId)//有采购单号，说明是订单站内信
		{
			msgURL="https://trade.aliexpress.com/order_detail.htm?orderId="+msg.PurchaseOrderId;
			str2='';
		}
		else
		{
      //否则就是询盘站内信
			if(msg.productId)
			{
				for(let i=0;i<msg.productId.length;i++)
				{
					if(msg.productId[i])
				  {
            msgURL="https://www.aliexpress.com/item/"+msg.productId[i];
						prostr+=',<a href="'+msgURL+'" target="_blank">'+msgURL+'</a>';						
					}else{prostr+=',【商品】不存在'}
        }
				prostr=prostr.substr(1);
        shopstr='<a href="'+msg.shopUrl+'" target="_blank">'+msg.shopUrl+'</a>';
			}
		}
    ///////////////////////////////////////////////////////////////////
		if(msg.page!=0)
		{
			if(msg.PurchaseUserName2){msg.PurchaseUserName=msg.PurchaseUserName2;}
				//\
			str2='\
			<div class="row">\
      <div class="col table2">\
				'+this.b04(msg.page,msg.pagecount,msg.receiverNum,msg.senderNum,obj.arr)+'\
				<ul class="Tul"><li class="w70 right">来源用户：</li><li>'+msg.username+'</li></ul>\
				<ul class="Tul"><li class="w70 right">消息状态：</li>'+this.b05(msg)+'</ul>\
				<ul class="Tul row"><li class="w70 right">标题：</li><li class="col">'+msg.name+' <a class="button" href="javascript:" onclick="fun.c21($(this))">翻译</a></li></ul>\
				<ul class="Tul"><li class="w70 right">类型：</li><li>'+this.b06(msg)+'</li></ul>\
				<ul class="Tul row"><li>'+arr[0]+'</li></ul><ul class="Tul"><li style="width: 100%;"><textarea id="content" style="ime-mode:disabled;width:100%;"  rows="5" placeholder="温馨提示：请用英文填写所有内容，不要在此处留下联系方式(电话、电子邮件、网址等)。敦煌网将对此内容进行监控， 违反者将受到惩罚。"></textarea></li></ul>\
				<ul class="Tul"><li><INPUT id="input_file_molding_1" type="file"><INPUT id="input_file_molding_2" type="file"><INPUT id="input_file_molding_3" type="file"></li></ul>\
				<ul class="Tul"><li><a class="button" href="javascript:" onClick="fun.c01($(this))">回复</a></li></ul>\
			</div>\
			<div class="col table2">\
			<div class="Tul thead">采购站内信详情</div>\
			<ul class="Tul">\
			<li class="w70 right">采购问答：</li><li>\
			<select onchange="fun.d01($(this))">\
			<option value="0" '+(msg.isQA==0?'selected="selected"':'')+'>无需问答</option>\
			<option value="1" '+(msg.isQA==1?'selected="selected"':'')+'>异常信息</option>\
			<option value="2" '+(msg.isQA==2?'selected="selected"':'')+'>已问待答</option>\
			<option value="3" '+(msg.isQA==3?'selected="selected"':'')+'>已答待问</option>\
			<option value="4" '+(msg.isQA==4?'selected="selected"':'')+'>处理完成</option>\
			</select>\
			</li></ul>\
			<ul class="Tul"><li class="w70 right">采购备注：</li><li class="w500"><input type="text" value="'+msg.PurchaseNote+'" onblur="fun.d03($(this),\'PurchaseNote\')"></li></ul>\
			<ul class="Tul"><li class="w70 right">采购用户：</li><li>'+(msg.PurchaseUserName?msg.PurchaseUserName:'不需要')+'</li></ul>\
			<ul class="Tul"><li class="w70 right">采购商品：</li><li>'+(prostr?prostr:'【商品】不存在')+'</li></ul>\
      <ul class="Tul"><li class="w70 right">采购店铺：</li><li>'+(shopstr?shopstr:'【店铺】不存在')+'</li></ul>\
			<ul class="Tul"><li class="w70 right">采购订单：</li><li>'+(msg.PurchaseOrderId?'<a href="https://trade.aliexpress.com/order_detail.htm?orderId='+msg.PurchaseOrderId+'" target="_blank">https://trade.aliexpress.com/order_detail.htm?orderId='+msg.PurchaseOrderId+'</a>':'【订单】不存在')+'</li></ul>\
			<ul class="Tul"><li style="width: 100%;"><textarea id="PurchaseDes" style="ime-mode:disabled;width:100%;" rows="5">'+arr[1]+'</textarea></li></ul>\
      <ul class="Tul"><li><a class="button" href="javascript:" onClick="fun.e01($(this))">*采购发送站内信</a></li></ul>\
      '+str2+'</div>\
      </div>'
		}
    Tool.html(this.a09,this,str2);
    ///////////////////////////////////////////////////////////////////
    if(msgURL!=msg.PurchaseURL)//更新采购链接
		{
			let str3='<r: db="sqlite.dhgate">update @.msg set @.PurchaseURL=\''+msgURL+'\' where @.fromid='+msg.msgformid+'</r:>';
			//Tool.ajax.a01(str3,1,this.a08,this)
		}
  },
  a09:function()
  {
    if(this.obj.myRead==0)//如果站内信未读
    {
      this.d01($("#Read0"),1);
    }
  },
  b01:function()
  {
    let where
    //		if(obj.arr[5])
    //		{where=Tool.unescape(obj.arr[5])+' and datediff(day,@.Sendtime,getdate())<=30';}
    //		else
    //		{}
    where='@.fromid='+obj.arr[4];
    return where
  },
  b02:function(msg,username)
  {
		let str="",isright,arr=[]
		for(let i=msg.length-1;i>-1;i--)
		{
			if(!msg[i].senderNickName)msg[i].senderNickName=""
			isright=msg[i].senderNickName.toLowerCase()==username.toLowerCase()?"":"-right"
			str+='\
			<div class="clear '+isright+'">\
        <div>发信人:'+msg[i].senderNickName+'&nbsp;&nbsp;&nbsp;&nbsp;创建时间:'+msg[i].createTime+'</div>\
        <div class="inb-ourscon'+isright+'">\
          <div class="inb-ourstiti'+isright+'">&nbsp;&nbsp;</div>\
          '+(msg[i].senderNickName=="SYSTEM"?msg[i].content:"<div>"+Tool.Trim(msg[i].content.replace(/</ig,"&lt;").replace(/>/ig,"&gt;")))+' <a class="button" href="javascript:" onclick="fun.c21($(this))">翻译</a></div>\
          '+(msg[i].attUrls?this.b03(msg[i].attNames,msg[i].attUrls):'')+'\
        </div>\
			</div>'
			/////////////////////////////////////////////////////////////////////////////////
			if(isright){arr.push(msg[i].content);}else{arr=[];}
		}
		return [str,arr.join("\n\n")]
  },
  b03:function(attNames,attUrls)
  {
	  let arr=attUrls.split(","),html=""
	  for(let i=0;i<arr.length;i++)
	  {html+='<a class="inb-jpgfile" href="'+arr[i]+'" target="_blank" title="'+attNames+'"><img width="250" src="'+arr[i]+'"/></a>';}
	  return '<div class="inb-filtericon">'+html+'</div>'
  },
  b04:function(page,pagecount,receiverNum,senderNum,arr2)
  {
		let pagestr="",arr
		if(page<2)
		{
			pagestr='<a href="javascript:Tool.main(\'/'+arr2.join("/")+'\')" class="detail-button">下一条</a>'
		}
		else if(page>=pagecount)
		{
			
			pagestr='<a href="javascript:Tool.main(\'/'+arr2.join("/")+'\')" class="detail-button">上一条</a>'}
		else
		{
			pagestr='<a href="javascript:Tool.main(\'/'+arr2.join("/")+'\')" class="detail-button">上一条</a>'
		
		  pagestr+='<a href="javascript:Tool.main(\'/'+arr2.join("/")+'\')" class="detail-button">下一条</a>'
		}		
		return '\
    <div class="Tul thead">敦煌站内信详情	<span style="float:right;">\
		<select class="form-select" onChange="Tool.open(5,this.options[this.selectedIndex].value)">\
			<option value="-_-20">我的状态</option>\
			<option value="'+encodeURIComponent(":receiverRead=1 and @.receiver=@.fromuser")+'" '+(obj.arr[5]==encodeURIComponent(":receiverRead=1 and @.receiver=@.fromuser")?'selected="selected"':'')+'>已读(接收者)</option>\
			<option value="'+encodeURIComponent(":senderRead=1 and @.sender=@.fromuser")+'" '+(obj.arr[5]==encodeURIComponent(":senderRead=1 and @.sender=@.fromuser")?'selected="selected"':'')+'>已读(发送者)</option>\
			<option value="'+encodeURIComponent(":receiverRead=0 and @.receiver=@.fromuser")+'" '+(obj.arr[4]==encodeURIComponent(":receiverRead=0 and @.receiver=@.fromuser")?'selected="selected"':'')+'>未读(接收者【'+receiverNum+'】)</option>\
			<option value="'+Tool.escape('@.senderRead=0 and @.sender=@.fromuser')+'" '+(obj.arr[4]==Tool.escape('@.senderRead=0 and @.sender=@.fromuser')?'selected="selected"':'')+'>未读(发送者【'+senderNum+'】)</option>\
			<option value="'+Tool.escape('@.receiverMark=1 and @.receiver=@.fromuser')+'" '+(obj.arr[4]==Tool.escape('@.receiverMark=1 and @.receiver=@.fromuser')?'selected="selected"':'')+'>已标记</option>\
			<option value="'+Tool.escape('@.receiverMark=0 and @.receiver=@.fromuser')+'" '+(obj.arr[4]==Tool.escape('@.receiverMark=0 and @.receiver=@.fromuser')?'selected="selected"':'')+'>未标记</option>\
			<option value="'+Tool.escape('@.receiverStatus=0 and @.receiver=@.fromuser')+'" '+(obj.arr[4]==Tool.escape('@.receiverStatus=0 and @.receiver=@.fromuser')?'selected="selected"':'')+'>正常</option>\
			<option value="'+Tool.escape('@.receiverStatus=1 and @.receiver=@.fromuser')+'" '+(obj.arr[4]==Tool.escape('@.receiverStatus=1 and @.receiver=@.fromuser')?'selected="selected"':'')+'>回收站</option>\
		</select>\
		('+page+'/'+pagecount+''+pagestr+')\
		</span></div>'
  },
  b05:function(msg)
  {
    let str=''
    if(msg.receiver.toUpperCase()==msg.username.toUpperCase())//自已是【接收者】的未读
		{
      str='<li class="w30 center">';
      if(msg.receiverRead=="True")
      {str+='<span class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.d01($(this),0)"></span>';}
      else
      {str+='<span class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.d01($(this),1)" id="Read0"></span>';this.obj.load=true;}
      str+='</li><li class="w30 center">'
      if (msg.receiverMark == "True") 
      {str += '<span class="hasmarked" title="当前【已标记】\n点击设置【未标记】" onclick="fun.xxx($(this),0)"></span>'}
      else
      {str += '<span class="inb-smmark" title="当前【未标记】\n点击设置【已标记】" onclick="fun.xxxx($(this),1)"></span>';}
      str+='</li><li class="w40 center">'+(msg.receiverStatus == "True"?'回收站':'正常')+'</li>'//0表示【正常】 1表示【回收站】
    }
		else if(msg.sender.toUpperCase()==msg.username.toUpperCase())//自已是【发送者】的未读
		{
      str='<li class="w30 center">';
      if(msg.senderRead=="True")
      {str+='<span class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.d01($(this),0)"></span>';}
      else
      {str+='<span class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.d01($(this),1)" id="Read0"></span>';this.obj.load=true;}
      str+='</li><li class="w30 center">'
      if (msg.senderMark == "True") 
      {str += '<span class="hasmarked" title="当前【已标记】\n点击设置【未标记】" onclick="fun.xxxx($(this),0)"></span>'}
      else
      {str += '<span class="inb-smmark" title="当前【未标记】\n点击设置【已标记】" onclick="fun.xxx($(this),1)"></span>';}
      str+='</li><li class="w40 center">'+(msg.senderStatus == "True"?'回收站':'正常')+'</li>'//0表示【正常】 1表示【回收站】
    }
		else
		{str="<li>异常</li>"}
    return str
  },
  b06:function(msg)
  {
		let str,orderLink=obj.arr[0]+"/"+obj.arr[1]+'/'+obj.arr[2]+'/js2/'+msg.param
		switch(msg.msgtype)
		{
			case "001":str='<a href="https://www.dhgate.com/product/------/'+msg.param+'.html" title="查看产品" target="_blank">买卖家消息-询盘</a>';break;
			case "002":str='<a href="javascript:" onclick="Tool.main(\'/'+orderLink+'\')" title="查看订单">买卖家消息-订单</a>';break;
			case "003":str='买卖家消息-其它';break;
			case "004":str='<a href="javascript:" onclick="Tool.main(\'/'+orderLink+'\')" title="查看订单">系统消息-订单</a>';break;
			case "005":str='<a href="javascript:" onclick="Tool.main(\'/'+orderLink+'\')" title="查看订单">系统消息-产品</a>';break;
			case "006":str='<a href="javascript:" onclick="Tool.main(\'/'+orderLink+'\')" title="查看订单">系统消息-付款/退款</a>';break;
			case "007":str='<a href="javascript:" onclick="Tool.main(\'/'+orderLink+'\')" title="查看订单">系统消息-促销</a>';break;
			case "008":str='<a href="javascript:" onclick="Tool.main(\'/'+orderLink+'\')" title="查看订单">系统消息-账户</a>';break;
			case "009":str='<a href="javascript:" onclick="Tool.main(\'/'+orderLink+'\')" title="查看订单">系统消息-其它</a>';break;
			case "010":str='平台公告-活动宣传';break;
			case "011":str='平台公告-政策通知';break;
			case "012":str='平台公告-商品营销';break;
			case "013":str='平台公告-其它';break;
			default:str="未知"
		}
	  return str
  },
//	/////////////////////////////////////////////
  d01:function(This,Read)
	{
    This = This.parent();
    This.html("<img src='/" + o.path + "admin/img/loading-16x16.gif' height='12'>");
    //需要参数：this.obj.formid,this.obj.token,this.obj.username,this.obj.password
    this.obj.msg={isRead:Read,msgIds:this.obj.msgformid,This:This};
    Tool.message_status(this,this.d02);//设置【已读】【未读】
  },
  d02:function()
  {
    if (this.obj.msg.isRead == 0) 
    {
      this.obj.msg.This.html('<span class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.d01($(this),1)"></span>');
    }
    else
    {
      this.obj.msg.This.html('<span class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.d01($(this),0)"></span>');
    }
  },
}
fun.a01();
//  a06:function(oo)
//  {
//    this.obj.shopId=oo.shopId;
//    this.a04(oo.proId)
//  },
//  a08:function(t)
//  {
//    if(t!="")
//    {
//      alert("更新错误:"+t);
//    }
//  },
//  c01:function(This)
//	{
//		alert("aaaaaaaa")
//    //需要参数：this.obj.formid,this.obj.token
//    F1.a01(this,this.c02,This);
//	},
//  c02:function(This)
//  {
//    let formData = new FormData();//构造空对象，下面用append 方法赋值。 
//		let bool=false,img={o1:$("#input_file_molding_1"),o2:$("#input_file_molding_2"),o3:$("#input_file_molding_3")}
//		this.obj.des2=($("#content").val()).replace(/'/ig,"''")
//		This.parent().html("正在发送你的信息。。。。。。")
//		if(img.o1.val()!=""){formData.append("file",img.o1[0].files[0]);bool=true;}
//		if(img.o2.val()!=""){formData.append("file",img.o2[0].files[0]);bool=true;}
//		if(img.o3.val()!=""){formData.append("file",img.o3[0].files[0]);bool=true;}
//		if(bool)
//		{
//			let _this=this
//			$.ajax({url:"ajax/upload/"+encodeURIComponent(o.cacheFolder)+".html?"+Math.random(),type:'POST',data:formData,processData:false,contentType:false,success:function(t)
//			{
//				eval("_this.obj.attUrls="+t);
//				_this.obj.A1=0;
//				_this.c19();
//			},error:function(t){alert("失败:" + JSON.stringify(t));}});
//		}
//		else
//		{
//      this.obj.attUrls=[];
//      if(this.obj.des2==""){alert("请填写回复内容。")}
//      else
//      {this.c03();}
//    }
//  },
//  c03:function()
//  {
//    if(this.obj.to32id=="")
//    {this.f01();}
//    else
//    {
//      let URL="http://api.dhgate.com/dop/router?access_token="+this.token+"&method=dh.msg.info.reply&timestamp=" + new Date().getTime() + "&v=2.0&msgId="+obj.arr[4]+"&content="+this.obj.des2+"&receiverId="+this.obj.to32id+"&attUrls="+this.obj.attUrls.join(","); 
//     Tool.ajax.a01("<.WebClientPost("+escape(URL)+")/>",1,this.c04,this)
//    }
//  },
//  c04:function(obj2)
//  {
//		//{"status":{"code":"00000000","msg":"OK","solution":"","subErrors":[]},"msgTopicId":"585575482"}
//		if(obj2.msgTopicId)
//		{this.c05();}
//    else if(obj2.msg=="令牌Access Token过期或不存在"){this.f01();}
//		else{Tool.echo(obj2);}
//  },
//  c05:function()
//  {
//    let oo=
//    {
//      content:this.obj.des2,
//      createTime:Tool.js_date_time(new Date().getTime()),
//      receiverNickName:this.obj.toname,
//      receiverId:this.obj.to32id,
//      /////////////////////////
//      senderNickName:this.obj.myname,
//      senderId:this.obj.my32id,
//      attUrls:this.obj.attUrls.join(","),
//      attNames:this.obj.attUrls.join(",")
//    }
//    this.obj.des.unshift(oo)
//    let html="<r: tag=\"sql\">update @.msg set @.des='"+JSON.stringify(this.obj.des).replace(/'/ig,"''")+"',:SendTime=getdate(),:msgreplycount=:msgreplycount+1,:senderRead=0 where @.from='dhgate' and @.fromid="+obj.arr[4]+"</r:>"
//   Tool.ajax.a01(html,1,this.c06,this)
//  },
//  c06:function(txt)
//  {
//    if(txt==""){alert('发送成功');window.location.reload();}else{alert("错误01："+txt);}
//  },
//  c19:function()
//	{
//		if(this.obj.A1<this.obj.attUrls.length)
//		{
//			let html='<.WebClientPost(http://api.dhgate.com/dop/router?method=dh.album.img.upload&v=2.1&funType=albu&imgName='+(new Date).getTime()+'.jpg&imgBase64=Fun(imgToBase64('+this.obj.attUrls[this.obj.A1]+'))&timestamp='+(new Date).getTime()+'&access_token='+this.token+')/>'
//			Tool.ajax.a01(html,1,this.c20,this)
//		}else{this.c03();}
//   },
//  c20:function(r){eval("let img="+r);this.obj.attUrls[this.obj.A1]=img.imgUrl;this.obj.A1++;this.c19();},
//  c21:function(This)
//	{
//    let str=This.parent().html().split(' <a class="button"')[0];
//    let url="http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=zh&q="+encodeURIComponent(str)
//   Tool.ajax.a01(this,[This.parent(),this.c22,"<.GetHtmlSource("+url+",UTF-8)/>",1,str])
//  },
//  c22:function(oo,o2)
//	{
//    let des="",arr=oo.sentences
//    for(let i=0;i<arr.length;i++)
//    {
//      des+=(i==0?'':'\n')+arr[i].trans;
//    }
//    o2[0].html(o2[1]+"<hr/>"+des)
//  },
//  e01:function(This){win.isRD(this.e02,this);},
//  e02:function()
//  {
//    let des=$("#PurchaseDes").val()
//    if(des==""){alert("发送内容不能为空！");}
//    else
//    {
//      win.Copy(des);
//      let msgURL="https://msg.aliexpress.com/buyerMsgListNew.htm?from=web&msgType=product&memberType=seller&productId="+this.obj.productId+"&refer=https://www.aliexpress.com/item/"+this.obj.productId;      
//      win.WebStart(msgURL);
//      Tool.Time(this.e03,500,this,"1");
//    }
//  },
//  e03:function()
//  {
//    win.ImgTime("敦煌网/敦煌站内信_内容信息/发送.bmp",20,500,this.e04,this);
//  },
//  e04:function(t)
//  {
//    if(t.indexOf("找图片次数超限")!=-1)
//		{alert(t);}
//		else
//		{
//      eval("let arr="+t);
//      win.click(arr[0][0][0]-100,arr[0][0][1],this.e05,this,arr);
//    }
//  },
//  e05:function(arr)
//  {
//    win.KeyArr("162◣50,86◣50,86◤50,162◤50")
//    Tool.Time(this.e06,300,this,"1",arr);
//  },
//  e06:function(arr)
//  {
//    win.click(arr[0][0][0],arr[0][0][1],this.e07,this);
//  },
//  e07:function()
//  {
//    
//  },
//  f01:function()
//  {
//    gg.isRD(this.f02,this);
//  },
//  f02:function()
//  {
//    $("#state").html("正在退出...");
//    Tool.SignOut(this.f03,this);
//  },
//  f03:function()
//  {
//    $("#state").html("正在登陆...");
//    Tool.SignIn(this.f04,this);
//  },
//  f04:function()
//  {
//    let url="http://seller.dhgate.com/msgweb/loadmsgdetail.do?msgid="+obj.arr[4]
//    gg.getFetch(url,"json",this.f05,this);
//  },
//  f05:function(str)
//	{
//    let topicId=Tool.StrSlice(str,'type="hidden" name="topicId" value="','"');
//    let fromSysuserbaseid=Tool.StrSlice(str,'id="fromSysuserbaseid" value="','"');
//    let supplierid=Tool.StrSlice(str,'id="supplierid" value="','"');
//    let toSysuserbaseid="",url="",parm=""
//    url="http://seller.dhgate.com/msgweb/replytobuyer.do?msgtype=2&filesize=0"
//    toSysuserbaseid=Tool.StrSlice(str,'name="toSysuserbaseid" value="','"');
//    ////////////////////////////////////////////////
//    url=url+"&topicId="+topicId+"&content="+encodeURI(this.obj.des2)+"&fromSysuserbaseid="+fromSysuserbaseid +"&toSysuserbaseid="+toSysuserbaseid+"&supplierid="+supplierid
//    $("#state").html("正在【回复站内信】...<hr/>"+url);
//    gg.getFetch(url,"json",this.f06,this)
//  },
//  f06:function(t)
//  {
//    if(t.indexOf('"isSuccess":true')!=-1)
//    {
//      this.c05();
//    }
//    else
//    {$("#state").html("【回复站内信】失败..."+t);}
//  }

/*
"senderNum":"<.Db("sqlite.dhgate","select count(1) as total from @.msg where @.msgtype in(\'001\',\'002\',\'003\') and @.senderread=0 and @.sender=@.fromuser","count")/>",\
      "receiverNum":"<.Db("sqlite.dhgate","select count(1) as total from @.msg where @.msgtype in(\'001\',\'002\',\'003\') and @.receiverread=0 and @.receiver=@.fromuser","count")/>",\
			
*/