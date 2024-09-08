'use strict';
var fun=
{
  token:"",obj:{pcount:30,username:"",fromid:0,token:[]},
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js1")
    {
      obj.arr[4]=obj.arr[4]?obj.arr[4]:"-_-20";//主题ID
      obj.arr[5]=obj.arr[5]?obj.arr[5]:"-_-20";//切换账户
      obj.arr[6]=obj.arr[6]?obj.arr[6]:"-_-20";//返回地址
      F2.a01(this,this.d01);//得到this.token,this.obj.username【响应变量：this.token,this.obj.fromid,this.obj.token,obj.arr[5]】
    }
    else
    {
      obj.arr[4]=obj.arr[4]?obj.arr[4]:1;//翻页
      obj.arr[5]=obj.arr[5]?obj.arr[5]:"-_-20";//切换账户
      obj.arr[6]=obj.arr[6]?obj.arr[6]:"-_-20";//买卖家消/息系统消息/平台公告
      obj.arr[7]=obj.arr[7]?obj.arr[7]:"-_-20";//最近3个月
      obj.arr[8]=obj.arr[8]?obj.arr[8]:"-_-20";//搜索关键词
      obj.arr[9]=obj.arr[9]?obj.arr[9]:"-_-20";//搜索字段【已读/未读/全部】
      obj.arr[10]=obj.arr[10]?obj.arr[10]:"-_-20";//搜索字段【已标记/未标记/全部】
      F2.a01(this,this.a02);//得到this.token,this.obj.username【响应变量：this.token,this.obj.fromid,this.obj.token,obj.arr[5]】
    }
  },
  a02:function()
	{
    obj.arr[7]=obj.arr[7]=="-_-20"?90:parseInt(obj.arr[7])//最近3个月
    let today=new Date();
    let endDate=Tool.js_date_time(today.getTime(),"-");
    let startDate=Tool.js_date_time(today.setDate(today.getDate()-obj.arr[7]),"-")
    let URL = "http://api.dhgate.com/dop/router?access_token="+this.token+"&method=dh.message.count.list&timestamp=" + new Date().getTime() + "&v=2.0&endDate="+endDate+"&startDate="+startDate
   Tool.ajax.a01("<.WebClientPost("+escape(URL)+")/>",1,this.a03,this)//先得到【obj.arr[7]】天数的站内信数量
  },
  a03:function(oo)
	{
    //msgType     买卖家消息    001=询盘      002=订单        003=其它
    //msgType     系统消息      004=订单      005=产品        006=付款/退款   007=促销   008=账户   009=其它
    //msgType     平台公告      010=活动宣传   011=政策通知     012=商品营销    013=其它
    let Count=0,msgType="";
		if(!oo.code)
		{
      switch(obj.arr[6])
      {
        case "-_-20":msgType="001,002,003";break;
        case "2":msgType="004,005,006,007,008,009";break;
        case "3":msgType="010,011,012,013";break;
      }
      ////////////////////////////////////////////////////
			oo=oo.msgCountList
			for(let i=0;i<oo.length;i++)
			{
				if(msgType)
				{if((","+msgType+",").indexOf(","+oo[i].msgType+",")!=-1)Count+=oo[i].msgCount}
				else
				{Count+=oo[i].msgCount}
			}
      ///////////////////////////////////////////////////
      let arr8=obj.arr[8]=="-_-20"?"":Tool.unescape(obj.arr[8]);//搜索字段【已读/未读/全部】
      let arr9=obj.arr[9]=="-_-20"?"-1":obj.arr[9];//搜索字段【已读/未读/全部】
      let arr10=obj.arr[10]=="-_-20"?"-1":obj.arr[10];//搜索字段【已标记/未标记/全部】
      ///////////////////////////////////////////////////
      let URL = "http://api.dhgate.com/dop/router?access_token="+this.token+"&method=dh.message.list&timestamp=" + new Date().getTime() + "&v=2.0&beforeDay="+obj.arr[7]+"&pageNo="+obj.arr[4]+"&pageSize="+this.obj.pcount+"&searchKey="+arr8+"&msgType="+msgType+"&isRead="+arr9+"&isMark="+arr10
		  Tool.ajax.a01("<.WebClientPost("+escape(URL)+")/>",1,[Count,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,this.a04,this,'&amp;')])//得到站内信列表
		}else{Tool.echo(oo);} 
	},
  a04:function(obj2,arr)
  {
		if(!obj2.code)
		{
			obj2=obj2.msgList
			let receiverArr=[],senderArr=[],html=this.b02(arr[1])
			for(let i=0;i<obj2.length;i++)
			{
        receiverArr=this.b03(obj2[i]);senderArr=this.b04(obj2[i]);
				html+="<ul class=\"Tul center\">\
					<li class=\"w130 left\">"+Tool.checkbox(obj2[i].msgId)+"</li>\
          <li class=\"w100\">"+this.b01(obj2[i].msgType)+"</li>\
          <li class=\"w500 left\" title=\"附加参数:"+obj2[i].param+"\n收信人organizationId:"+obj2[i].recieverOrgId+"\n收信人systemuserbaseid:"+obj2[i].recieverId+"\n发送人的organizationId:"+obj2[i].senderOrgId+"\n发送人的systemuserbaseid:"+obj2[i].senderId+"\"><a href='javascript:' onclick=\"Tool.main('"+obj.arr[0]+"/list/"+obj.arr[2]+"/js1/"+obj2[i].msgId+"/"+obj.arr[5]+"/"+encodeURIComponent(obj.arr.join("/"))+".html');\">"+obj2[i].msgTitle+"</a>【"+obj2[i].msgReplyCount+"】</li>\
					<li class=\"w30\"><span "+receiverArr[0]+"></span></li>\
          <li class=\"w30\"><span "+receiverArr[1]+"></span></li>\
          <li class=\"w40\">"+receiverArr[2]+"</li>\
					<li class=\"w200 left\">"+receiverArr[3]+"</li>\
					<li class=\"w30\"><span "+senderArr[0]+"></span></li>\
          <li class=\"w30\"><span "+senderArr[1]+"></span></li>\
          <li class=\"w40\">"+senderArr[2]+"</li>\
					<li class=\"w200 left\">"+senderArr[3]+"</li>\
					<li class=\"w150 right\">"+obj2[i].lastReplyTime+"</li>\
				</ul>"
			}
			html+=Tool.page(arr[0],this.obj.size,4)
		  F2.b01(html,this.obj.fromid)
		}else{Tool.echo(oo);} 
  },
	b01:function(msgType)
	{
		let str="";
		switch(msgType)
		{
			case "001":str="询盘";break;
			case "002":str="订单";break;
			case "003":str="其它";break;
			case "004":str="订单";break;
			case "005":str="产品";break;
			case "006":str="付款/退款";break;
			case "007":str="促销";break;
			case "008":str="账户";break;
			case "009":str="其它";break;
			case "010":str="活动宣传";break;
			case "011":str="政策通知";break;
			case "012":str="商品营销";break;
			case "013":str="其它";break;
			default:str="未知";break;
		}
		return str
	}, 
  b02:function(url)
  {
    let html='<div class="Tul tr Fnone">'+url+'</div>\
    <ul class="makeHtmlTab">\
      <li '+(obj.arr[6]=='%20'?'class="hover"':'')+' onclick="Tool.main();">买卖家消息 </li>\
      <li '+(obj.arr[6]=='2'?'class="hover"':'')+' onclick="Tool.main(\''+obj.arr[3]+'/1/'+obj.arr[5]+'/2.html\');">系统消息</li>\
      <li '+(obj.arr[6]=='3'?'class="hover"':'')+' onclick="Tool.main(\''+obj.arr[3]+'/1/'+obj.arr[5]+'/3.html\');">平台公告</li>\
    </ul>\
    <div class="Tul">\
    <div class="input-group w500">\
      <div class="input-group-prepend">\
      <select id="readed" class="form-select">\
        <option value="-1" '+(obj.arr[9]=='-1'?' selected="selected"':'')+'>全部</option>\
        <option value="1" '+(obj.arr[9]=='1'?' selected="selected"':'')+'>已读</option>\
        <option value="0" '+(obj.arr[9]=='0'?' selected="selected"':'')+'>未读</option>\
        </select>\
        </div>\
        <div class="input-group-prepend">\
        <select id="marked" class="form-select">\
        <option value="-1" '+(obj.arr[10]=='-1'?' selected="selected"':'')+'>全部</option>\
        <option value="1" '+(obj.arr[10]=='1'?' selected="selected"':'')+'>已标记</option>\
        <option value="0" '+(obj.arr[10]=='0'?' selected="selected"':'')+'>未标记</option>\
        </select>\
      </div>\
      <input type="text" class="form-select" value="'+Tool.Trim(Tool.unescape(obj.arr[8]))+'" placeholder="输入订单编号" id="searchword" onkeydown="if(event.keyCode==13)fun.c06();">\
      <div class="input-group-append"><button class="btn btn-outline-secondary form-control-sm" type="button" onclick="fun.c06();">搜索</button></div>\
    </div>\
    </div>\
    <ul class="Tul center">\
      <li class="w40 left">'+Tool.checkbox("&nbsp;")+'</li>\
      <li class="operatBoxBtn w30">\
        <button title="操作" class="menu-button"><div></div><div></div><div></div></button>\
        <div class="operatBoxMore" style="left:0;">\
        <span onclick="">设置为已读</span>\
        <span onclick="">设置为未读</span>\
        <span onclick="">设置标记</span>\
        <span onclick="">取消标记</span>\
        <span onclick="">删除</span>\
        </div>\
      </li>\
      <li class="w60 left">主题ID</li>\
      <li class="w100">类型</li>\
      <li class="w500 left">主题的标题</li>\
      <li class="w100">收信人状态</li>\
      <li class="w200 left">收信人</li>\
      <li class="w100">发送人状态</li>\
      <li class="w200 left">发送人</li>\
      <li class="w150 right">\
        <select name="beforeDate" onChange="Tool.open(7,this.options[this.selectedIndex].value);" class="form-select">\
        <option value="30" '+(obj.arr[7]=="30"?' selected="selected"':'')+'>最近1个月</option>\
        <option value="60" '+(obj.arr[7]=="60"?' selected="selected"':'')+'>最近2个月</option>\
        <option value="90" '+(obj.arr[7]=="90"?' selected="selected"':'')+'>最近3个月</option>\
        <option value="180" '+(obj.arr[7]=="180"?' selected="selected"':'')+'>最近6个月</option>\
        <option value="270" '+(obj.arr[7]=="270"?' selected="selected"':'')+'>最近9个月</option>\
        <option value="366" '+(obj.arr[7]=="366"?' selected="selected"':'')+'>最近12个月</option>\
        </select>\
      </li>\
    </ul>'
    return html;
 	}, 
  b03:function(oo)
  {
    let receiverRead="",receiverMark="",receiverStatus="",receiverNickName="";
    if(oo.receiverNickName.toLowerCase()==this.obj.username.toLowerCase())
    {
      if(oo.receiverRead==1)
      {receiverRead='class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.c02($(this),'+oo.msgId+',0)"';}
      else
      {receiverRead='class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.c02($(this),'+oo.msgId+',1)"';}
      if(oo.receiverMark==1)
      {receiverMark='class="hasmarked" title="当前【已标记】\n点击设置【未标记】" onclick="fun.c04($(this),'+oo.msgId+',0)"';}
      else
      {receiverMark='class="inb-smmark" title="当前【未标记】\n点击设置【已标记】" onclick="fun.c04($(this),'+oo.msgId+',1)"';}
      receiverNickName="<b>"+oo.receiverNickName+"</b>"
    }
    else
    {
      if(oo.receiverRead==1)
      {receiverRead='class="hasread" title="当前【已读】\n你不是【收信人】，无法设置【未读】" style="cursor: default;"';}
      else
      {receiverRead='class="inb-smcheck" title="当前【未读】\n你不是【收信人】，无法设置【已读】" style="cursor: default;"';}
      if(oo.receiverMark==1)
      {receiverMark='class="hasmarked" title="当前【已标记】\n你不是【收信人】，无法设置【未标记】" style="cursor: default;"';}
      else
      {receiverMark='class="inb-smmark" title="当前【未标记】\n你不是【收信人】，无法设置【已标记】" style="cursor: default;"';}
      receiverNickName=oo.receiverNickName
    }
    if(oo.receiverStatus==0){receiverStatus="正常"}else{receiverStatus="垃圾箱"}
    return [receiverRead,receiverMark,receiverStatus,receiverNickName]
  }, 
  b04:function(oo)
  {
    let senderRead="",senderMark="",senderStatus="",senderNickName=""
    if(oo.senderNickName.toLowerCase()==this.obj.username.toLowerCase())
    {
      if(oo.senderRead==1)
      {senderRead='class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.c02($(this),'+oo.msgId+',0)"';}
      else
      {senderRead='class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.c02($(this),'+oo.msgId+',1)"';}
      if(oo.senderMark==1)
      {senderMark='class="hasmarked" title="当前【已标记】\n点击设置【未标记】" onclick="fun.c04($(this),'+oo.msgId+',0)"';}
      else
      {senderMark='class="inb-smmark" title="当前【未标记】\n点击设置【已标记】" onclick="fun.c04($(this),'+oo.msgId+',1)"';}
      senderNickName="<b>"+oo.senderNickName+"</b>"
    }
    else
    {
      if(oo.senderRead==1)
      {senderRead='class="hasread" title="当前【已读】\n你不是【发信人】，无法设置【未读】" style="cursor:default;"';}
      else
      {senderRead='class="inb-smcheck" title="当前【未读】\n你不是【发信人】，无法设置【已读】" style="cursor:default;"';}
      if(oo.senderMark==1)
      {senderMark='class="hasmarked" title="当前【已标记】\n你不是【发信人】，无法设置【未标记】" style="cursor:default;"';}
      else
      {senderMark='class="inb-smmark" title="当前【未标记】\n你不是【发信人】，无法设置【已标记】" style="cursor:default;"';}
      senderNickName=oo.senderNickName
    }
    //////////////////////////////////////////////////////////////
    if(oo.senderStatus==0){senderStatus="正常";}else{senderStatus="垃圾箱";}
    return [senderRead,senderMark,senderStatus,senderNickName]
  },
  b05:function(attNames,attUrls)
	{
    let arr=attUrls.split(","),html=""
	  for(let i=0;i<arr.length;i++)
	  {
		html+='<a class="inb-jpgfile" href="http://image.dhgate.com/'+arr[i]+'" target="_blank" title="'+attNames+'"><img width="250" src="http://image.dhgate.com/'+arr[i]+'"/></a> '
	  }
	  return '<div class="inb-filtericon">'+html+'</div>'
  },
  c01:function(){},
  c02:function(This,msgid,Read)
  {
    This = This.parent();
    This.html("<img src='/" + o.path + "admin/img/loading-16x16.gif' height='12'>");
    let URL = "http://api.dhgate.com/dop/router?access_token="+this.token+"&method=dh.message.status.update&timestamp=" + new Date().getTime() + "&v=2.0&msgIds="+msgid+"&readStatus="+Read
    Tool.ajax.a01("<.WebClientPost("+escape(URL)+")/>",1,this.c03,this,[This, msgid, Read])
  },
  c03:function(oo,arr)
  {
    if(oo.result)
    {
      if (arr[2] == 0)
      {arr[0].html('<span class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.c02($(this),' + arr[1] + ',1)"></span>');}
      else
      {arr[0].html('<span class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.c02($(this),' + arr[1] + ',0)"></span>');}
    }
    else{Tool.at(oo);}
  },
  c04:function(This,msgid,Mark)
  {
    This = This.parent();
    This.html("<img src='/"+o.path+"admin/img/loading-16x16.gif' height='12'>");
    let URL = "http://api.dhgate.com/dop/router?access_token="+this.token+"&method=dh.message.status.update&timestamp=" + new Date().getTime() + "&v=2.0&msgIds="+msgid+"&markStatus="+Mark
    Tool.ajax.a01("<.WebClientPost("+escape(URL)+")/>",1,this.c05,this,[This,msgid,Mark])
  },
  c05:function(oo,arr)
  {
    if(oo.result)
    {
      if(arr[2]==0)
      {arr[0].html('<span class="inb-smmark" title="当前【未标记】\n点击设置【已标记】" onclick="fun.c04($(this),' + arr[1] + ',1)"></span>');}
      else
      {arr[0].html('<span class="hasmarked" title="当前【已标记】\n点击设置【未标记】" onclick="fun.c04($(this),' + arr[1] + ',0)"></span>');}
    }else{Tool.at(oo);}
  },
  c06:function()
  {
    let searchword=$("#searchword").val();
    if(searchword)
    {
      searchword=encodeURIComponent(Tool.Trim(searchword));     Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/1/"+obj.arr[4]+"/%20/%20/%20/"+searchword+"/"+$("#readed").val()+"/"+$("#marked").val());
    }
    else{alert("请输入搜索关键词");}
  },
	d01:function()
	{
    let URL = "http://api.dhgate.com/dop/router?access_token="+this.token+"&method=dh.message.get&timestamp=" + new Date().getTime() + "&v=2.0&msgId="+obj.arr[4]
    Tool.ajax.a01('<.WebClientPost('+escape(URL)+')/>',1,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,this.a08,this,'&amp;'));
	},
  a08:function(obj2,url)
	{
    if(obj2.msgTitle)
    {
      let html='<div class="Tul thead"><a href="javascript:;" onclick="Tool.main(\'/'+Tool.unescape(obj.arr[6]).replace(/ /g,"-_-20")+'\')" class="arrow_back"></a>站内信_内容信息</div>\
      <div class="Tul">'+url+'</div>\
      <ul class="Tul"><li class="right w200">来源账号:</li><li>'+this.obj.username+'</li></ul>\
      <ul class="Tul"><li class="right w200">消息主题(msgTitle):</li><li>'+obj2.msgTitle+'</li></ul>\
      <ul class="Tul"><li class="right w200">发送者昵称(senderNickName):</li><li>'+obj2.senderNickName+'</li></ul>\
      <ul class="Tul"><li class="right w200">附加参数(param):</li><li>'+obj2.param+'</li></ul>\
      <ul class="Tul"><li class="right w200">消息总数(msgReplyCount):</li><li>'+obj2.msgReplyCount+'</li></ul>\
      <ul class="Tul"><li class="right w200">消息类型(msgType):</li><li>'+this.b01(obj2.msgType)+'</li></ul>\
      <ul class="Tul"><li class="right w200">最后回复时间(lastReplyTime):</li><li>'+obj2.lastReplyTime+'</li></ul>'    
      let right="",str="",obj3=obj2.msgDetailList    
      //this.obj.to32Id=obj3[i].senderNickName==arr[0]?obj3[i].receiverId:obj3[i].senderId;
      for(let i=obj3.length-1;i>-1;i--)
      {
        right=obj3[i].senderNickName.toLowerCase()==this.obj.username.toLowerCase()?"":'-right'
        str+="<div class=\"clear "+right+"\">\
                <div title=\"记录ID(detailId):"+obj3[i].detailId+"\n收信人的昵称(receiverNickName):"+obj3[i].receiverNickName+"\n收件人ID(receiverId):"+obj3[i].receiverId+"\n发信人的昵称(senderNickName):"+obj3[i].senderNickName+"\n发信人ID(senderId):"+obj3[i].senderId+"\n附件URL列表(attUrls):"+obj3[i].attUrls+"\n附件名称列表(attNames):"+obj3[i].attNames+"\">发信人:"+obj3[i].senderNickName+" 创建时间:"+obj3[i].createTime+"</div>\
                <div class=\"inb-ourscon"+right+"\">\
                  <div class=\"inb-ourstiti"+right+"\">&nbsp;&nbsp;</div>\
                  "+(obj3[i].content).replace(/\n/ig,"<br/>")+(obj3[i].attUrls?this.b05(obj3[i].attNames,obj3[i].attUrls):'')+"\
                </div>\
              </div>"
      }
    }
    else
    {Tool.echo(obj2);}
    html+='<div class="Tul">'+str+'</div><ul class="Tul"><li style="width: 100%;"><textarea id="content" style="ime-mode:disabled;width:100%;" rows="5" placeholder="温馨提示：请用英文填写所有内容，不要在此处留下联系方式(电话、电子邮件、网址等)。敦煌网将对此内容进行监控， 违反者将受到惩罚。"></textarea></li></ul><ul class="Tul"><li><input id="input_file_molding_1" type="file"><input id="input_file_molding_2" type="file"><input id="input_file_molding_3" type="file"></li></ul><ul class="Tul"><li><a class="button" href="javascript:" onclick="fun.a09($(this))">回复</a></li></ul>'
    Tool.html(null,null,html)  
  }, 
}
fun.a01();
/*

	
	a09:function(This)
	{
    let formData = new FormData();//构造空对象，下面用append 方法赋值。 
		let bool=false,img={o1:$("#input_file_molding_1"),o2:$("#input_file_molding_2"),o3:$("#input_file_molding_3")}
		this.obj.des2=($("#content").val()).replace(/'/ig,"''")
		This.parent().html("正在发送你的信息。。。。。。")
		if(img.o1.val()!=""){formData.append("file",img.o1[0].files[0]);bool=true;}
		if(img.o2.val()!=""){formData.append("file",img.o2[0].files[0]);bool=true;}
		if(img.o3.val()!=""){formData.append("file",img.o3[0].files[0]);bool=true;}
		if(bool)
		{
			let _this=this
			$.ajax({url:"exe/upload/"+encodeURIComponent(o.cacheFolder)+".html?"+Math.random(),type:'POST',data:formData,processData:false,contentType:false,success:function(t)
			{
				eval("_this.obj.attUrls="+t);
				_this.obj.A1=0;
				_this.c19();
			},error:function(t){alert("失败:" + JSON.stringify(t));}});
			
		}
		else
		{
			this.obj.attUrls=[];this.a10();
		}
  }, 
  a10:function()
  {
		if(this.obj.des2==""){alert("请填写回复内容。")}
		else
		{
			let URL="http://api.dhgate.com/dop/router?access_token="+this.token+"&method=dh.message.info.reply&timestamp=" + new Date().getTime() + "&v=2.0&msgId="+this.obj.msgId+"&content="+this.obj.des2+"&receiverId="+this.obj.to32Id+"&attUrls="+this.obj.attUrls.join(",");
			Tool.ajax.a01("<.WebClientPost("+escape(URL)+")/>",1,this.a11,this)
		}
  },
  a11:function(t)
  {
		//{"status":{"code":"00000000","message":"OK","solution":"","subErrors":[]},"msgTopicId":"585575482"}
		eval("let obj2="+t)
		if(obj2.msgTopicId){alert('发送成功');window.location.reload();}
		else{alert("回复站内信失败，请与管理员联系:<hr/>"+t);}
  },  

  ///////////////////////////////////////////////////////////////
  
*/

