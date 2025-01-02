'use strict';
var fun=
{
  obj: {A1:1,A2:3,Aarr:["001","002","003"],B1:1,B2:0,Barr:[]},
  a01:function()
  {
    let html='\
		<div class="Tul thead"><a href="javascript:" onclick="Tool.main(\'%20/1/'+obj.arr[5]+'\')" class="arrow_back"></a>正在【获取站内信中的用户】数据...</div>\
		<ul class="Tul list-group-item-action"><li class="w100 right">类型进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">页进度：</li>'+Tool.htmlProgress('B')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">状态：</li><li id="state">正在准备数据...</li></ul>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    if(this.obj.A1 <= this.obj.A2)
    {
      let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100)
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
      let str = '[\
      {\
        "pagecount":<@page/>\
      }\
      <r:message size=10 page=2 where=" where @.from=\'dhgate\' and @.msgType=\''+this.obj.Aarr[this.obj.A1-1]+'\' order by @.id asc">,\
      {\
        "fromuser":"[message:fromuser]",\
        "fromuserid":"[message:fromuserid]",\
        "receiver":"[message:receiver]",\
        "recieverId":"[message:recieverId]",\
        "sender":"[message:sender]",\
        "senderId":"[message:senderId]",\
        "msgType":"[message:msgType]",\
        "param":"[message:param]",\
        "Sendtime":"[message:Sendtime]"\
      }\
      </r:message>]'
      Tool.ajax.a01(str,this.obj.B1,this.a03,this)
    }
    else
    {$("#state").html("全部完成。");}
  },
  a03:function(oo)
  {
    $("#state").html("已获得数据");
    this.obj.B2=oo[0].pagecount;this.obj.Barr=oo;
    if(this.obj.B1 <= this.obj.B2)
    {
      let p1 = Math.ceil(this.obj.B1 / this.obj.B2 * 100)
      $("#B1").html(p1+"%").css("width",p1+"%");
      $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）');
      this.a04(oo)
    }
    else
    {
      this.obj.A1++;this.obj.B1=1
      this.a02();
    }
  },
  a04:function(msgList)
  {
    let sql=[],select1,insert1,arr1=[],arr2=[],arr3=[],buyer="",buyerId="",unique=[];
    for(let i=1;i<msgList.length;i++)
    {      
        if(msgList[i].sender.toUpperCase()==msgList[i].fromuser.toUpperCase())
        {
          buyer=msgList[i].receiver;
          buyerId=msgList[i].recieverId;
        }
        else if(msgList[i].receiver.toUpperCase()==msgList[i].fromuser.toUpperCase())
        {
          buyer=msgList[i].sender
          buyerId=msgList[i].senderId
        }
        else
        {alert("到不了这里。");}
        if(unique.indexOf(buyerId)==-1)//去重复
        {
          unique.push(buyerId)
          select1 = "select top 1 count(1) from @.msguser where @.buyerId='" + buyerId + "'"
          insert1 = "insert into @.msguser(:seller,:sellerId,:buyer,:buyerId,:time3)values('" + msgList[i].fromuser + "'," + msgList[i].fromuserid + ",'" + buyer.replace(/'/g,"''") + "','" + buyerId + "','" + msgList[i].Sendtime + "')"
          sql.push('{if Fun(Db('+select1+',count))==0}<r: db="sqlite.dhgate">'+insert1+'</r:>{/if}')
          if(msgList[i].msgType=="001"&&msgList[i].param.length!=32)
          {arr1.push([msgList[i].param,buyerId,msgList[i].Sendtime]);}
          else if(msgList[i].msgType=="002")
          {arr2.push([msgList[i].param,buyerId,msgList[i].Sendtime]);}
          else{arr3.push([0,buyerId,msgList[i].Sendtime]);}
        }
    }
    $("#state").html("正在获得用户信息。。。");
   Tool.ajax.a01(1,arr2,this.a05, sql.join(""), this,[arr1,arr3])
  },
  a05:function(t,arr)
  {
    if(t=="")
    {
      if(arr[0].length==0&&arr[1].length==0&&arr[2].length==0){this.obj.B1++;this.a02();}//表示没有询盘
      else
      {
        let html="{}";
        for(let i=0;i<arr[0].length;i++)//询盘站内信
        {
          html+='\
          ,{\
          <r:dhUpPro where=" where @.fromid='+arr[0][i][0]+'" size=1>\
            <r:product where=" where @.proid=\'[dhUpPro:proid]\'" size=1>\
              "keys1":["<:keys tag=js/>","<:keys1 tag=js/>","<:keys2 tag=js/>"],\
              "type1":"<:type/>",\
            </r:product>\
          </r:dhUpPro>\
          <r:msguser where=" where @.buyerId=\''+arr[0][i][1]+'\'" size=1>\
            "keys2":"[msguser:keys]",\
            "type2":"[msguser:types]",\
            "time3":"[msguser:time3]",\
            "time3_1":"'+arr[0][i][2]+'",\
            "buyerId":"'+arr[0][i][1]+'"\
          </r:msguser>\
          }'
        }
        for(let i=0;i<arr[1].length;i++)//订单站内信
        {
          html+='\
          <r:dhOrderItem where=" where @.OrderID=\''+arr[1][i][0]+'\'" size=50>\
            ,{\
            <r:dhUpPro where=" where @.fromid=[dhOrderItem:fromid]" size=1>\
            <r:product where=" where @.proid=\'[dhUpPro:proid]\'" size=1>\
              "keys1":["<:keys tag=js/>","<:keys1 tag=js/>","<:keys2 tag=js/>"],\
              "type1":"<:type/>",\
            </r:product>\
            </r:dhUpPro>\
            <r:msguser where=" where @.buyerId=\''+arr[1][i][1]+'\'" size=1>\
              "keys2":"[msguser:keys]",\
              "type2":"[msguser:types]",\
              "time3":"[msguser:time3]",\
              "time3_1":"'+arr[1][i][2]+'",\
              "buyerId":"'+arr[1][i][1]+'"\
            </r:msguser>\
            }\
          </r:dhOrderItem>'
        }
        for(let i=0;i<arr[2].length;i++)//其它，主要是为了用最近的时间
        {
          html+='\
          ,{\
          <r:msguser where=" where @.buyerId=\''+arr[2][i][1]+'\'" size=1>\
            "time3":"[msguser:time3]",\
            "time3_1":"'+arr[2][i][2]+'",\
            "buyerId":"'+arr[2][i][1]+'"\
          </r:msguser>\
          }'
        }        
        Tool.ajax.a01("["+html+"]",1,this.a06, this)
      }      
    }
    else
    {$("#state").html("出错："+t)}
  },
  a06:function(oo)
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
        sql.push('update @.msguser set @.keys=\''+key.replace(/'/ig,"''")+'\',:types=\''+type+'\',:time3=\''+time3+'\' where @.buyerId=\''+oo[i].buyerId+'\'')
      }
      else
      {
        sql.push('update @.msguser set @.time3=\''+time3+'\' where @.buyerId=\''+oo[i].buyerId+'\'')
      }
    }
    if(sql.length==0)
    {
      this.a07("");
    }
    else
    {Tool.ajax.a01('<r: db="sqlite.dhgate">'+sql.join("<1/>")+'</r:>',1,this.a07, this);}
    
  },
  a07:function(t)
  {
    if(t=="")
    {
      this.obj.B1++;this.a02();
    }
    else
    {
      
      alert("出错："+t);
    }
  }
}.a01();