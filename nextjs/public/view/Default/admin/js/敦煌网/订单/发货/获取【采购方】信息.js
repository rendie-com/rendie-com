'use strict';
var fun=
{
	obj:
	{
		A1:1,A2:0,Aarr:[],
		B1:1,B2:0,Barr:[],
		Express2:[],ExpressNumber2:[]
	},
	time:new Date(),
  a01:function()
  {
    let html=Tool.header('正在获取【采购方】信息...（注：只从【采购方】获取信息。更新【采购运单号】）')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr>\
					<td class="right w150">订单进度：</td>'+Tool.htmlProgress('A')+'</tr>\
				<tr><td class="right">采购账号：</td><td id="PurchaseUserName" colspan="2"></td></tr>\
				<tr><td class="right">订单号：</td><td id="OrderId" colspan="2"></td></tr>\
				<tr><td class="right">采购单号：</td><td id="PurchaseOrderId" colspan="2"></td></tr>\
        <tr>\
					<td class="right">采购单号进度：</td>'+Tool.htmlProgress('B')+'</tr>\
				<tr><td class="right">运单到达时间：</td><td id="PurchaseWaitingDelivery" colspan="2"></td></tr>\
				<tr><td class="right">采购物流公司：</td><td id="APIopen2" colspan="2"></td></tr>\
				<tr><td class="right">采购运单号：</td><td id="ExpressNumber2" colspan="2"></td></tr>\
				<tr><td class="right">采购备注：</td><td id="PurchaseRemark" colspan="2"></td></tr>\
        <tr><td class="right">统计：</td><td id="doTime" colspan="2"></td></tr>\
        <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
				<tr><td class="right">提示：</td><td id="state" colspan="2">正在准备订单...</td></tr>	\
			</tbody>\
      </table>\
    </div>';
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    gg.isRD(this.a03,this);
  },
	a03:function()
  {
    // where @.orderid=\'3399390455\' or @.PurchaseOrderId like \'%/%\'
		// where not(@.PurchaseOrderId is null or @.PurchaseUserName is null) and @.status=\'101009\'
		//
    let html='\
		{\
		"A2":'+(this.obj.A2==0?'<@count/>':'0')+'\
		<r:order db="sqlite.dhgate" size=1 page=2 where=" a Inner Join @.logdeliver b on a.@.OrderId=b.@.OrderId where b.@.uptime=0 and a.@.PurchaseUserName=\'r001@rendie.com\'">,\
			"PurchaseOrderId":"<:a.@.PurchaseOrderId/>",\
			"PurchaseUserName":"<:a.@.PurchaseUserName/>",\
			"OrderId":<:a.@.OrderId/>,\
			"PurchaseWaitingDelivery":<:a.@.PurchaseWaitingDelivery/>,\
			"shopname":"<:a.@.fromuser/>",\
			"shopid":<:a.@.fromuserid/>,\
			"uptime":<:b.@.uptime/>,\
			"PurchaseRemark":"<:a.@.PurchaseRemark tag=js/>"\
		</r:order>\
		}'
		$("#state").html("正在获取订单信息。。。");
   Tool.ajax.a01(html,1,this.a04,this)
	},
  a04:function(oo)
  {
		this.obj.Aarr=oo;
		if(this.obj.A2==0){this.obj.A2=oo.A2;}
		this.a05();
	},
  a05:function()
  {
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06,this)
	},
  a06:function()
  {
		let oo=this.obj.Aarr;
		$("#PurchaseUserName").html(oo.PurchaseUserName);
		let arr1=oo.PurchaseOrderId.split("/")
		let arr2=[]
		for(let i=0;i<arr1.length;i++)
		{
			arr2.push("<a href=\"https://trade.aliexpress.com/order_detail.htm?orderId="+arr1[i]+"\" target=\"_blank\">"+arr1[i]+"</a>");
		}
		$("#PurchaseOrderId").html(arr2.join(" / "));
		$("#OrderId").html(oo.OrderId);
		$("#PurchaseWaitingDelivery").html(Tool.js_date_time2(oo.PurchaseWaitingDelivery,"-"));
		$("#PurchaseRemark").html(oo.PurchaseRemark);
		if(
			oo.PurchaseUserName!="huangxingjl02@gmail.com"&&
			oo.PurchaseUserName!="heyouhua888@163.com"&&
			oo.PurchaseUserName!="gzonet_com@qq.com"&&
			oo.PurchaseUserName!="cuji302@gmail.com"&&
			oo.PurchaseUserName!="akun@mkche.com"&&
			oo.PurchaseUserName!="792733082@qq.com")
		{
			this.a07();
		}//oo.uptime==0&&
		else
		{
			alert("bbbbbbbbbbbbbbbbbbb")
			//this.a11([]);
		}
		
	},
  a07:function()
  {
    if(this.obj.Aarr.PurchaseOrderId=="")
    {
			alert("qqqqqqqqqqqqqqqqqqqq")
//	  	if(this.obj.Aarr.PurchaseRemark.indexOf('[没采购]')==-1)
//      {
//       Tool.ajax.a01(this.b01('[没采购]'),1,this.a09,this); 
//      }
//			else
//			{this.a09("");}
    }
    else
    {
      if(this.obj.Aarr.PurchaseOrderId.indexOf("/")!=-1)//有多个采购单号
      {
        this.obj.Barr=this.obj.Aarr.PurchaseOrderId.split("/");
        this.obj.B2=this.obj.Barr.length;
 				$("#state").html("有多个采购单号。。。");
        this.a08();
      }
      else
      {
        this.obj.Barr=[this.obj.Aarr.PurchaseOrderId];
        this.obj.B2=1;
        this.a08();
      }
    }
  },
  a08:function()
  {
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09,this,this.a12)
  },
  a09:function()
  {
		this.obj.Barr[this.obj.B1-1]=Tool.Trim(this.obj.Barr[this.obj.B1-1]);
		$("#state").html("正在获取【SMT订单内容】...")
		let url="https://track.aliexpress.com/logisticsdetail.htm?spm=a2g0o.order_detail.0.0.3dedf19cra1Vup&tradeId="+this.obj.Barr[this.obj.B1-1]
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
		gg.tabs_remove_create_indexOf(2,url,'Order number:',true,this.a10,this)//删除后创建再查找(返回网页内容)
  },
  a10:function(str)
  {
    $("#state").html("正在获取【SMT订单内容】...");
    if(str.indexOf("<title>Buy Products Online from China Wholesalers at Aliexpress.com</title>")!=-1)//是不是要登陆
    {
      $("#state").html("正在【登陆】...");
      //F1.SMTlogin(this.a05,this);
    }
		else if(str.indexOf('<span class="value">'+this.obj.Barr[this.obj.B1-1]+'</span>')!=-1)
		{
      $("#state").html("正在获取【SMT订单内容】正确")
      this.a11(str);
    }
    else if(str.indexOf('OOPS!</h2>')!=-1)//要换账号了
		{
      $("#state").html("正在【要换账号】...");
			let url="https://login.aliexpress.com/xman/xlogout.htm?spm=a2g0o.9042647.0.0.4fa94c4dHNsKj4&return_url=https%3A%2F%2Ftrade.aliexpress.com"
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
      //gg.getFetch(url,"json",this.a12,this);
    }
		else
		{$("#state").html("找不到采购信息。。。【"+this.obj.Barr[this.obj.B1-1]+"】");Tool.at(str);}
  },
  a11:function(str)
  {
    let APIopen2Arr=Tool.StrSplits(str,'<span class="title">','</span>')
    let ExpressNumber2Arr=Tool.StrSplits(str,'<div class="tracking-no"><span>','</span>')
    $("#APIopen2").html(APIopen2Arr.join(" , "));
    $("#ExpressNumber2").html(ExpressNumber2Arr.join(" , ")); 
		   
    if(APIopen2Arr.length==1)
    {
      this.obj.Express2.push(APIopen2Arr[0]);
      this.obj.ExpressNumber2.push(ExpressNumber2Arr[0]);
      this.obj.B1++;
      this.a08();
    }
    else if(APIopen2Arr.length==0)//
    {
			$("#state").html("没有发货运单号【跳过】");
      this.obj.Express2.push("[没有发货]");
      this.obj.ExpressNumber2.push("[没有发货]");
      this.obj.B1++;
      this.a08();
    }
    else
    {$("#state").html("一个采购订单，有多个发货运单号，没做");}
  },
 	a12:function()
  {
    let Express2="/"+this.obj.Express2.join("/").replace(/\'/g,"''")+"/",ExpressNumber2="/"+this.obj.ExpressNumber2.join("/")+"/";
		let select1="select count(1) as Total from @.logdeliver where @.OrderID='"+this.obj.Aarr.OrderId+"'";
		let update="update @.logdeliver set @.Express2='"+Express2+"',@.ExpressNumber2='"+ExpressNumber2+"',@.uptime="+Tool.gettime("")+" where @.OrderID='"+this.obj.Aarr.OrderId+"'";
		let insert="insert into @.logdeliver(@.OrderID,@.Express2,@.ExpressNumber2,@.shopname,@.shopid,@.uptime)values('"+this.obj.Aarr.OrderId+"','"+Express2+"','"+ExpressNumber2+"','"+this.obj.Aarr.shopname+"',"+this.obj.Aarr.shopid+","+Tool.gettime("")+")";
    let str='""<if Fun(Db(sqlite.dhgate,'+select1+',count))==0><r: db="sqlite.dhgate">'+insert+'</r:><else/><r: db="sqlite.dhgate">'+update+'</r:></if>';
   Tool.ajax.a01(str,1,this.a13,this)
 	},
  a13:function(t)
  {
		$("#doTime").html(Tool.doTime(this.time,this.obj.A1,this.obj.A2)); 
    if(t=="")
    {
      this.obj.B1=1;
      this.obj.B2=0;
      this.obj.Barr=[];
      this.obj.Express2=[];
      this.obj.ExpressNumber2=[];
      $("#B1").html("0%").css("width","0%");
      $("#B2").html('');
      this.obj.A1++;
      this.a03();
    }
    else
    {$("#state").html("出错："+t);}
  }
}
fun.a01();
/*
  a12:function(t)
  {
		F1.SMTlogin(this.a07,this,this.obj.Aarr.PurchaseUserName);
  },
  c01:function(orderid)
  {
		this.obj.A1--;
		let str="[<r: db=\"sqlite.dhgate\">update @.order set @.PurchaseUserName=null where @.OrderID='"+orderid+"'</r:>]";
		Tool.ajax.a01(str,1,this.a11,this)
	}

   b01:function(str)
  {
		let oo=this.obj.Aarr;
		
		oo.PurchaseWaitingDelivery
    let PurchaseWaitingDelivery=Tool.StrSlice(str,'Estimated delivery:',"</span>");
		
		pre(Tool.js_date_time2(Tool.gettime(PurchaseWaitingDelivery+" 2022")))
		
  }

  a13:function(t)
  {
    let ret1=/The supplier is processing your order\n\s+<\/dd>/i;
    let ret2=/class="current">\s*<span class="first state">Place Order/i;
    let ret3=/Closed\n\s+<\/dd>/i;
    let ret4=/The buyer has cancelled this order.\n\s+<\/dd>/i;
    if(ret1.test(t))
    {
      if(this.obj.Aarr[5].indexOf('[SMT没发货]')==-1){Tool.ajax.a01(this.b01("[SMT没发货]"),1,this.a09,this);}else{this.a09("");}
    }//付款了，但没发货
    else if(ret2.test(t))//没付款
    {     
      if(this.obj.Aarr[5].indexOf('[SMT未付款]')==-1){Tool.ajax.a01(this.b01("[SMT未付款]"),1,this.a09,this);}else{this.a09("");}
    }
    else if(ret3.test(t))//订单关闭
    {     
      if(this.obj.Aarr[5].indexOf('[SMT订单关闭]')==-1){Tool.ajax.a01(this.b01("[SMT订单关闭]"),1,this.a09,this);}else{this.a09("");}
    }
    else if(ret4.test(t))//买家取消订单
    {     
      if(this.obj.Aarr[5].indexOf('[SMT买家取消订单]')==-1){
	  Tool.ajax.a01(this.b01("[SMT买家取消订单]"),1,this.a09,this);}else{this.a09("");}
    }
    else
    {$("#state").html("订单异常。。。");Tool.at(t);}
  },
  b01:function(t)
  {
    return '<r: db="sqlite.dhgate">update @.order set @.PurchaseStatus=5,:PurchaseRemark=\''+this.obj.Aarr[4]+t+'\' where @.orderid=\''+this.obj.Aarr[3]+'\' and @.from=\'dhgate\'</r:>';
  }*/
	
	
/*
	obj:{A1:1,A2:0},
	a01:function()
  {
    let html='\
		{\
		"A2":<@count/>\
		<r:logdeliver db="sqlite.dhgate" page=2 size=1 where=" order by @.id asc">,\
			"OrderId":"<:OrderId/>",\
			"shopName":"<:shopName/>",\
			"shopID":"<:shopID/>",\
			"DeliverDate":<@.DeliverDate/>,\
			"queryState":<:queryState/>,\
			"Express":"<@.Express tag=js/>",\
			"Express2":"<@.Express2 tag=js/>",\
			"Status":<:Status/>\
		</r:logdeliver>\
		}'
    Tool.ajax.a01(html,this.obj.A1,this.a02,this)
  },
  a02:function(oo)
  {
		this.obj.A2=oo.A2
		let sel="select count(1) from @.logdeliver1 where @.OrderId='"+oo.OrderId+"'"
		let html='<if Fun(Db(sqlite.dhgate,'+sel+',count))==0><r: db="sqlite.dhgate">insert into @.logdeliver1(:OrderId,@.shopname,@.shopid,@.DeliverDate,:queryState,:Status,@.Express,@.Express2)values(\''+oo.OrderId+'\',\''+oo.shopName+'\','+oo.shopID+','+oo.DeliverDate+','+oo.queryState+','+oo.Status+',\'['+oo.Express.replace(/'/g,"''")+']\',\'['+oo.Express2.replace(/'/g,"''")+']\')</r:></if>'
		$("#table").html(this.obj.A1+"---"+Tool.pre(oo))
		Tool.ajax.a01(html,1,this.a03,this)
	},
  a03:function(t)
  {
		if(t=="")
		{
			this.obj.A1++;
			if(this.obj.A1<=this.obj.A2)
			{
				this.a01();
			}
		}
		else
		{Tool.at(t)}
	}	
	
	*/
