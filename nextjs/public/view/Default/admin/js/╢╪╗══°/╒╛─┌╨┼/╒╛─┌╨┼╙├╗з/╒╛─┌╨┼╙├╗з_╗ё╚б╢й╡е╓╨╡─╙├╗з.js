'use strict';
var fun=
{
  obj: {A1:1,A2:0},
  a01:function()
  {
    let html='\
		<div class="Tul thead"><a href="javascript:" onclick="Tool.main(\'-_-20/1/'+obj.arr[5]+'\')" class="arrow_back"></a>正在【获取订单中的用户】数据...</div>\
		<ul class="Tul list-group-item-action"><li class="w100 right">页进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">状态：</li><li id="state">正在准备数据...</li></ul>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    //and @.buyerId=\'ff808081302b895f013035ad1c365942\'
    //rd_fromuserid=5215 and 
    let str = '\
    [\
      {\
        "A2":<@page/>\
      }\
      <r:order size=30 page=2 where=" where @.from=\'dhgate\'">,\
      {\
        "seller":"<:fromuser/>",\
        "sellerId":<:fromuserid/>,\
        "orderid":"<:orderid/>",\
        "orderid32":"<:orderid32/>",\
        "time3":"<:BeginDate/>",\
        "buyerOrgId":"<:buyerId/>",\
        "buyer":"<:username/>"\
      }\
      </r:order>\
    ]'
    Tool.ajax.a01(str,this.obj.A1,this.a03,this)    
  },
  a03:function(msgList)
  {
    this.obj.A2=msgList[0].A2
    if(this.obj.A1 <= this.obj.A2)
    {
      let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100)
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
      let unique=[],buyerOrgId="",arr1=[],select1="",insert1="",sql=[];
      for(let i=1;i<msgList.length;i++)
      { 
        buyerOrgId=msgList[i].buyerOrgId
        if(unique.indexOf(buyerOrgId)==-1)//去重复
        {
          unique.push(buyerOrgId)
          select1 = "select top 1 count(1) from @.msguser where @.buyerOrgId='" + buyerOrgId + "'"
          insert1 = "insert into @.msguser(:seller,:sellerId,:buyer,:buyerOrgId,:time3)values('" + msgList[i].seller + "'," + msgList[i].sellerId + ",'" + msgList[i].buyer.replace(/'/g,"''") + "','" + buyerOrgId + "','" + msgList[i].time3 + "')"
          sql.push('{if Fun(Db('+select1+',count))==0}<r: db="sqlite.dhgate">'+insert1+'</r:>{/if}')
          arr1.push([msgList[i].orderid,buyerOrgId,msgList[i].time3,msgList[i].sellerId,msgList[i].orderid32]);
        }
      }
      $("#state").html("正在获得用户信息。。。");
     Tool.ajax.a01( sql.join(""),1,this.a04, this,arr1)
    }
    else
    {$("#state").html("全部完成。");}
  },
  a04:function(t,arr)
  {
    if(t=="")
    {
      let html="{}",select1="",update1="";
      for(let i=0;i<arr.length;i++)//订单站内信
      {
        ///////////////////////当buyerid为空，则buyer就为订单号////////////////////////////////////
        select1 = "select top 1 count(1) from @.msguser where @.buyerOrgId='" + arr[i][1] + "' and @.buyerid is null"
        update1 = "update @.msguser set @.buyer='"+arr[i][4]+"' where @.buyerOrgId='" + arr[i][1] + "' and @.sellerId="+ arr[i][3]
        //注：sellerId很重要。同一个用户在我的多个账号购买东西，只记一次，且留下的卖家ID，只记一次。所以要填的订单号orderid32，就一定要是这个卖家的
        html+='{if Fun(Db('+select1+',count))!=0}<r: db="sqlite.dhgate">'+update1+'</r:>{/if}'
        /////////////////////////////////////////////////////
        html+='\
        <r:dhOrderItem where=" where @.OrderID=\''+arr[i][0]+'\'" size=50>\
          ,{\
          <r:dhUpPro where=" where @.fromid=[dhOrderItem:fromid]" size=1>\
          <r:product where=" where @.proid=\'[dhUpPro:proid]\'" size=1>\
            "keys1":["<:keys tag=js/>","<:keys1 tag=js/>","<:keys2 tag=js/>"],\
            "type1":"<:type/>",\
          </r:product>\
          </r:dhUpPro>\
          <r:msguser where=" where @.buyerOrgId=\''+arr[i][1]+'\'" size=1>\
            "keys2":"[msguser:keys]",\
            "type2":"[msguser:types]",\
            "time3":"[msguser:time3]",\
            "time3_1":"'+arr[i][2]+'",\
            "buyerOrgId":"'+arr[i][1]+'"\
          </r:msguser>\
          }\
        </r:dhOrderItem>'
      }
      Tool.ajax.a01("["+html+"]",1,this.a05, this)
    }
    else
    {$("#state").html("出错："+t)}
  },
  a05:function(oo)
  {
    let sql=[],type="",key="",time3=""
    for(let i=1;i<oo.length;i++)
    {
      type=oo[i].type2;
      key=oo[i].keys2;
      time3=oo[i].time3
      if(new Date(Date.parse(time3))<new Date(Date.parse(oo[i].time3_1))){time3=oo[i].time3_1;}//选最大的时间（即：最近时间）
      if(oo[i].type1)//表示本地还能找得到
      {
        if(type==""){type=oo[i].type1;}
        else
        {
          if((","+type+",").indexOf(","+oo[i].type1+",")==-1){type+=","+oo[i].type1;}
        }
        //////////////////////////////////
        if(key=="")
        {
          key=Tool.Trim(oo[i].keys1[0])+","+Tool.Trim(oo[i].keys1[1])+","+Tool.Trim(oo[i].keys1[2])
        }
        else
        {
          for(let j=0;j<3;j++)
          {
            if((","+key+",").indexOf(","+Tool.Trim(oo[i].keys1[j])+",")==-1){key+=","+Tool.Trim(oo[i].keys1[j]);}
          }
        }      
        sql.push('update @.msguser set @.keys=\''+key.replace(/'/ig,"''")+'\',:types=\''+type+'\',:time3=\''+time3+'\' where @.buyerOrgId=\''+oo[i].buyerOrgId+'\'')
      }
      else
      {
        sql.push('update @.msguser set @.time3=\''+time3+'\' where @.buyerOrgId=\''+oo[i].buyerOrgId+'\'')
      }
    }
    if(sql.length==0)
    {
      this.a06("");
    }
    else
    {Tool.ajax.a01('<r: db="sqlite.dhgate">'+sql.join("<1/>")+'</r:>',1,this.a06, this);}
  },
  a06:function(t)
  {
    if(t=="")
    {
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
      this.obj.A1++;
      if(this.obj.A1 <= this.obj.A2)
      {this.a02();}
      else
      {$("#state").html("全部完成。");}
    }
    else
    {alert("出错："+t);}
  }
}
fun.a01();
//update @.msguser set @.buyer=null,rd_buyerid=null where @.buyerid='0'