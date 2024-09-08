'use strict';
var fun=
{
  obj: {A1:1,num:0},
  a01:function()
  {
    let html='\
		<div class="Tul thead"><a href="javascript:" onclick="Tool.main(\'%20/1/4.html\')" class="arrow_back"></a>正在给【60天没联系的买家发送推广站内信】...</div>\
		<ul class="Tul list-group-item-action"><li class="w100 right">卖家账户：</li><li id="username"></li></ul>\
    <ul class="Tul list-group-item-action"><li class="w100 right">卖家进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">买家页进度：</li>'+Tool.htmlProgress('B')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">买家账户：</li><li id="buyer"></li></ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">买家账户ID：</li><li id="buyerid"></li></ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">买家条进度：</li>'+Tool.htmlProgress('C')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">计数：</li><li id="num"></li></ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">状态：</li><li id="state">正在准备数据...</ul>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    let str='{\
    <r:APIaccount size=1 page=2 where=" where @.from=\'dhgate\' order by @.sort asc,@.id asc">\
    "token":[APIaccount:token],\
    "username":"[APIaccount:username]",\
    "fromid":"[APIaccount:fromid]"\
    </r:APIaccount>,\
    "A1":'+this.obj.A1+',\
    "A2":<@page/>,"B1":1,"B2":0,"num":'+this.obj.num+'}';
    Tool.ajax.a01(str,this.obj.A1,this.a03,this);
  },
  a03:function(oo)
  {
    this.obj=oo;
		let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
    $("#username").html(this.obj.username);
    $("#A1").html(p1+"%").css("width",p1+"%");
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
		F1.a01(this,this.a04);
  },
  a04:function()
  {
    $("#state").html("正在获取买家信息。。。")
    //:buyerid=\'ff8080815ce3f2c7015cfcfe65780b19\'
    //and DateDiff(day,@.time3,GETDATE())&gt;90
    // and @.buyerorgid is null and @.time2 is null
    let str='[\
    {"B2":<@page/>}\
    <r:msguser size=10 page=2 where=" where @.sellerId='+this.obj.fromid+' and DateDiff(day,@.time3,GETDATE())&gt;60 and not(@.buyerid is null or @.buyerid=\'0\'or :buyerid=\'1\')">,\
    {\
      "buyer":"[msguser:buyer]",\
      "buyerid":"[msguser:buyerid]",\
      "keys":"[msguser:keys tag=js]",\
      "types":"[msguser:types]"\
    }\
    </r:msguser>]'
   Tool.ajax.a01(str,1,this.a05,this);
	},
  a05:function(oo)
  {
    if(this.obj.num>500)
    {
      alert("已经发送了500条了！！")
    }
    else
    {
      if(oo[0].B2==0)
      {
        this.a13();
      }
      else
      {
        if(!this.obj.B2){this.obj.B2=oo[0].B2;}
        this.obj.C1=1;
        this.obj.C2=oo.length-1;
        this.obj.Carr=oo;
        this.obj.ProArr=[];
        let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
        $("#B1").html(p1+"%").css("width",p1+"%");
        $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）');
        this.a06()
      }
    }
  },
  a06:function()
  {
    if(this.obj.C1<=this.obj.C2)
    {
      $("#buyer").html(this.obj.Carr[this.obj.C1].buyer);
      $("#buyerid").html(this.obj.Carr[this.obj.C1].buyerid);
      let p1=Math.ceil(this.obj.C1/this.obj.C2*100);
      $("#C1").html(p1+"%").css("width",p1+"%");
      $("#C2").html(this.obj.C1+'/'+this.obj.C2+'（条）');
      this.obj.ProArr=[]
      this.a07()
    }
    else
    {
      this.obj.B1++;
      if(this.obj.B1<=this.obj.B2)
      {this.a04();}
      else
      {this.a13();}
    }
  },
  a07:function()
  {
    let str=""
    if(this.obj.Carr[this.obj.C1].types=="")
    {
      str='[{}<r:product where=" where @.isUpDHgate=1 order by newid()" size=3>'+this.b01()+'</r:product>]';
    }
    else
    {
      let mode = Math.round(Math.random() * 1),arr=[],ran=0
      if(mode==1)
      {
        arr=this.obj.Carr[this.obj.C1].keys.split(",")
        ran= Math.round(Math.random() * (arr.length-1))
        str='[{}<r:product where=" where @.name like \'%'+arr[ran].replace(/'/g,"''")+'%\' and @.isUpDHgate=1 order by @.SaleNum desc" size=3>'+this.b01()+'</r:product>]';
      }
      else
      {
        arr=this.obj.Carr[this.obj.C1].types.split(",")
        ran=Math.round(Math.random() * (arr.length-1));
        str='[{}<r:product where=" where @.type=\''+arr[ran]+'\' and @.isUpDHgate=1 order by @.SaleNum desc" size=3>'+this.b01()+'</r:product>]';
      }
    }
   Tool.ajax.a01(str,1,this.a08,this)
  },
  a08:function(oo)
  {
    for(let i=1;i<oo.length;i++)
    {
      let isbool=true;
      for(let j=0;j<this.obj.ProArr.length;j++)//去重复
      {
        if(!oo[i].fromID||oo[i].fromID==this.obj.ProArr[j].fromID){isbool=false;break;}
      }
      if(isbool)
      {
        //折后价格=(成本+20%税费+0.031415926手续费)*30%利润
        Pmin=oo[i].minprice
        Pmin=(Pmin+(Pmin*0.2)+0.031415926)*1.3;
        Pmin=Pmin+(Pmin*0.008)//平台手续费
        if(Pmin<10){Pmin=Pmin.toFixed(2);}
        else if(Pmin<100){Pmin=Pmin.toFixed(1);}
        else if(Pmin<1000){Pmin=Pmin.toFixed(0);}
        else
        {Pmin=Pmin.toFixed(0);}
        oo[i].minprice=Pmin
        /////////////////////////////////////
        oo[i].off=Math.round((1-(1.3/oo[i].ratio))*100)
        this.obj.ProArr.push(oo[i]);
      }
    }
    if(this.obj.ProArr.length<3)
    {
      this.obj.Carr[this.obj.C1].types=""
      this.a07();
    }
    else
    {
      $("#state").html("正在生成图片。。。")
      let str='<.站内信推广('+o.path+'admin/img/msg_Promote.jpg,'+this.obj.ProArr[0].pic.split(";")[0]+'_200x200.jpg|$'+this.obj.ProArr[0].minprice+'|'+this.obj.ProArr[0].off+'%,'+this.obj.ProArr[1].pic.split(";")[0]+'_200x200.jpg|$'+this.obj.ProArr[1].minprice+'|'+this.obj.ProArr[1].off+'%,'+this.obj.ProArr[2].pic.split(";")[0]+'_200x200.jpg|$'+this.obj.ProArr[2].minprice+'|'+this.obj.ProArr[2].off+'%)/>'
     Tool.ajax.a01(str,1,this.a09,this)
    }
  },
  a09:function(t)
  {
    $("#state").html("正在上传图片。。。")
    let URL='http://api.dhgate.com/dop/router?method=dh.album.img.upload&v=2.1&funType=albu&imgName='+(new Date).getTime()+'.jpg&imgBase64='+t+'&timestamp='+(new Date).getTime()+'&access_token='+this.token
   Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,this.a10,this)
  },
  a10:function(oo)
  {
    if(oo.status)
    {
      if(oo.status.code=="00000000")
      {
        if(Tool.isChina(this.obj.Carr[this.obj.C1].buyer)){this.obj.Carr[this.obj.C1].buyer="friend";}
        let content="Dear " + this.obj.Carr[this.obj.C1].buyer + " \n up to 90% off. please check the store link. This is a new product in 2020. I hope you can see it. \n Thank you. \n URL1: https://www.dhgate.com/product/-/"+this.obj.ProArr[0].fromID+".html \n URL2: https://www.dhgate.com/product/-/"+this.obj.ProArr[1].fromID+".html \n URL3: https://www.dhgate.com/product/-/"+this.obj.ProArr[2].fromID
        $("#state").html("正在发送信息。。。")
        let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.message.send&timestamp=" + new Date().getTime()+"&v=2.0&reciverId=" + this.obj.Carr[this.obj.C1].buyerid + "&msgTitle=Golden Week Special: Deasl Up to 90% Off&sendMsgType=4&content="+content+"&attUrls="+oo.imgUrl
       Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,this.a11,this)
      }else{$("#state").html("001:<pre>"+JSON.stringify(oo,null,2)+"</pre>");}
    }else{ $("#state").html("003:<pre>"+JSON.stringify(oo,null,2)+"</pre>");}
  },
  a11:function(oo)
  {  
    if(oo.status)
    {
      if(oo.status.code=="00000000")
      {
        $("#state").html("发送成功，正在更新本地数据。。。")
        $("#C2").html(this.obj.C1+'/'+this.obj.C2+'（完）');
        let html = "<r: tag=\"sql\">update @.msguser set @.time2=getdate(),:time3=getdate() where @.buyerid='" + this.obj.Carr[this.obj.C1].buyerid + "'</r:>";
       Tool.ajax.a01( html,1,this.a12,this);
      }
      else{$("#state").html("002:<pre>"+JSON.stringify(oo,null,2)+"</pre>");}
   }else{ $("#state").html("004:<pre>"+JSON.stringify(oo,null,2)+"</pre>");}
  },
  a12:function(t)
  {
    if(t=="")
    {
      $("#state").html("更新本地数据成功。。。")
      this.obj.C1++;
      this.obj.num++;
      $("#num").html(this.obj.num);
      this.a06();
    }
    else
    {$("#state").html(t);}
  },
  a13:function()
  {
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
    this.obj.A1++;
    if(this.obj.A1<=this.obj.A2)
    {
      this.a02();
    }
    else
    {
      $("#state").html("全部完成")
    }
  },
  b01:function()
  {
    return ',\
    {\
      "pic":"<:pic/>",\
      <r:dhuppro size=1 where=" where @.proid=\'<:proid/>\'">\
      "ratio":[dhuppro:ratio],\
      "fromID":[dhuppro:fromID],\
      </r:dhuppro>\
      "minprice":<:minprice f=2/>\
    }'
  },
}.a01();
