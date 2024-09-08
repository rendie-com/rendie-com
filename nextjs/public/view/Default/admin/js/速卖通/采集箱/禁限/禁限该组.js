'use strict';
var fun=
{
  obj: {
    A1: 1, A2: 0,
    B1: 1, B2: 0, Barr: []
  },
  a01:function(mode)
  {
    obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";
    obj.arr[5] = obj.arr[5] ? obj.arr[5] : 0;
    obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";
    //obj.arr[4]    返回URL
    //obj.arr[5]    禁限模式【1：类目，2：关键词，3：店铺ID，4：品牌，5：禁售产品】
    //obj.arr[6]    禁限表ID(主要用于单个禁限)
    let html=Tool.header('正在进行【'+this.b01()+'】...')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
      <tr><td class="w100 right">页进度：</td>'+Tool.htmlProgress('A')+'</tr>\
      <tr><td class="right">禁限名称：</td><td id="name" colspan="2"></td></tr>\
      <tr><td class="right">条进度：</td>'+Tool.htmlProgress('B')+'</tr>\
      <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备禁限内容...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    let where = ""//
    if(obj.arr[6]!="-_-20"){where=" and @.id="+obj.arr[6]}
    let str='[<@page/>\
    <r:restriction db="sqlite.aliexpress" size=20 page=2 where=" where @.mode='+ obj.arr[5] + where +' order by @.id desc">,\
    {\
      "id":<:id/>,\
      "mode":<:mode/>,\
      "type":"<:type/>",\
      "name":<:name tag=json/>,\
      "des":<:des tag=json/>\
    }</r:restriction>]'
	  Tool.ajax.a01(str,this.obj.A1,this.a03,this);
  },
  a03:function(arr)
  {
    $("#state").html("已获得禁限内容。。。");
    this.obj.A2 = arr[0];
    this.obj.B2=arr.length-1;
    this.obj.Barr = arr;
    this.a04();
  },
  a04: function () {
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this,null)
  },
  a05: function () {
    Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a06, this, this.a07)
  },
  a06: function () {
    let oo=this.obj.Barr[this.obj.B1]
    $("#name").html(oo.name);
    switch (oo.mode)
		{
			//case "0":this.d01(oo);break;//关键词禁限
			//case "1":this.e01(oo);break;//类目禁限
      //case 2: this.g01(oo);break;
      //case "3": this.f01(oo); break;//店铺ID名称禁限
      case 4: 
      case 5:
        this.g01(oo); break;
      default:
        $("#name").html("未知：" + oo.mode);
        break;
    }
  },
  a07: function () {
    this.obj.B1 = 1
    this.obj.B2 = 0;
    this.obj.Barr = [];
    this.obj.A1++;
    this.a02();
  },
  b01:function()
  {
    let name=""
		switch(obj.arr[5])
		{
      case "1": name = "类目禁限"; break;
      case "2": name = "关键词禁限"; break;
      case "3": name = "店铺ID禁限"; break;
      case "4": name = "品牌禁限"; break;
      case "5": name = "禁售产品"; break;
			default:name="未知";
		}
    return name;
  },

  g01: function (oo) {
    let sqlArr = [];
    //商品质量认证： ce
    if (oo.name.toLowerCase() != "ce")
    {
      sqlArr.push("update @.pro set @.hide=51,@.err='" + this.b01() + "-疑似品牌名称：" + Tool.sql01(oo.name) + "' where @.attrValue like '%\"" + Tool.sql01(oo.name) + "\"%'")
    }
    sqlArr.push("update @.pro set @.hide=53,@.err='" + this.b01() +"-品牌名称：" + Tool.sql01(oo.name) + "' where @.brand=" + Tool.rpsql(oo.name))
   Tool.ajax.a01( '<r: db="sqlite.aliexpress">' + sqlArr.join('<1/>') +'</r:>',1,this.g02,this);
  },
  g02: function (t) {
    if (t == "") {
      this.obj.B1++;
      this.a05();
    }
    else {
      Tool.pre("出错："+t)
    }
  },
}
fun.a01();
    ////////////////////////////////////////////////////


    //if (!isNaN(parseFloat(Tool.Trim(oo.name)))) {
    //  let str = '<r: db="sqlite.aliexpress">update @.restriction set @.mode=6 where @.id=' + oo.id + '</r:>';
    // Tool.ajax.a01(str,1,this.g02,this);
    //}
    //else
    //{
    //  this.obj.B1++;
    //  //Tool.pre(oo)
    //  this.a05();
    //}

    ////let str = '<r: db="sqlite.aliexpress">update @.restriction set @.name=' + Tool.rpsql(Tool.Trim(oo.name)) + ' where @.id=' + oo.id + '</r:>';


  //a05:function()
  //{
  //  $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（完）');
  //  this.obj.B1++;
  //  if(this.obj.B1<=this.obj.B2)
  //  {this.a04();}
  //  else
  //  {this.a06();}
  //},
  //a06:function()
  //{
  //  $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
  //  this.obj.A1++;
  //  if(this.obj.A1<=this.obj.A2)
		//{this.a02();}
  //  else
  //  {$("#state").html("全部完成");}
  //},
  ////////////////////////////////////
  ////////////////////////////////////////////////////////
  //d01:function(obj2)
  //{
  //  obj2.name=obj2.name.replace(/\'/g,"''")
  //  obj2.des=obj2.des.replace(/\'/g,"''")
  //  let sql,arr=[]
  ///*  if(obj2.type=="")
  //  {
  //  }
  //  else
  //  {
  //    sql="with area as(select @.fromID from @.type where @.fromID='"+obj2.type+"' union all select a.@.fromID from @.type a join area b on a.@.upid=b.@.fromid)update @.pro set @.pro.@.hide=53,@.pro.@.err='关键词禁限-标题或关键词(名称:"+obj2.name+";说明:"+obj2.des+")' from @.pro,area where @.pro.@.hide<51 and @.pro.@.type=area.@.fromID"; 
  //  }*/
  //    sql="update @.pro set @.hide=53,@.err='关键词禁限-标题或关键词(名称:"+obj2.name+")' where @.hide<51";
  //  arr[arr.length]=sql+" and (' '+@.name+' | '+@.keywords+' ') like '% "+obj2.name+" %'<1/>update @.restriction set @.time="+Tool.gettime("")+" where @.id="+obj2.id//4个必要项    
  //  //arr[arr.length]=sql+" and @.aeopAeProductPropertys like '% "+obj2.name+" %'"//左右空格
  //  //arr[arr.length]=sql+" and @.aeopAeProductPropertys like '%\""+obj2.name+" %'"//左双引右空格
  //  //arr[arr.length]=sql+" and @.aeopAeProductPropertys like '% "+obj2.name+"\"%'"//在空格左双引
  //  //arr[arr.length]=sql+" and @.aeopAeProductPropertys like '%\""+obj2.name+"\"%'"//左右双引
  //  //arr[arr.length]=sql+" and cast(:des AS char(500)) like '% "+obj2.name+" %'"//左右空格
  //  //arr[arr.length]=sql+" and cast(:des AS char(500)) like '%>"+obj2.name+" %'"//左尖右空格
  //  //arr[arr.length]=sql+" and cast(:des AS char(500)) like '% "+obj2.name+"<%'"//左空格右尖
  //  sql=arr.join("[分隔符]");
  //  if(obj2.type!="")
  //  {
  //    sql=sql.replace(/\(pre\)aeopAeProductPropertys /ig,":pro.@.aeopAeProductPropertys ")
  //    sql=sql.replace(/\(pre\)des /ig,":pro.@.des ");
  //    sql=sql.replace(/\(pre\)name /ig,":pro.@.name ");
  //    sql=sql.replace(/\(pre\)keys /ig,":pro.@.keys ");
  //    sql=sql.replace(/\(pre\)keys1 /ig,":pro.@.keys1 ");
  //    sql=sql.replace(/\(pre\)keys2 /ig,":pro.@.keys2 ");
  //  }
  //  $("#state").html("正在准备【禁限SQL语句】...")
  //  this.obj.Carr=sql.split("[分隔符]")
  //  this.obj.C2=this.obj.Carr.length
  //  this.obj.C1=1
  //  this.d02(obj2);
  //},
  //d02:function(obj2)
  //{
  //  let p2=Math.ceil(this.obj.C1/this.obj.C2*100);
  //  $("#C1").html(p2+"%").css("width",p2+"%");
  //  $("#C2").html(this.obj.C1+'/'+this.obj.C2+'（条）');
  //  let str='<r: db="sqlite.aliexpress">'+this.obj.Carr[this.obj.C1-1]+'</r:>'
  // Tool.ajax.a01(str,1,this.d03,this,obj2);
  //},
  //d03:function(t,obj2)
  //{
  //  if(t=="")
  //  {
  //    $("#state").html("禁限成功")
  //    $("#C2").html(this.obj.C1+'/'+this.obj.C2+'（完）');
  //    this.obj.C1++;
  //    if(this.obj.C1<=this.obj.C2)
  //    {this.d02(obj2);}
  //    else
  //    {this.a05();}
  //  }else
		//{
		//	Tool.at("操作失败01："+t);
		//}
  //},
  ////////////////////////////////////////////////////////
  //e01:function(obj2)
  //{
  //  this.obj.C2=1;this.obj.C1=1;
  //  let p1=Math.ceil(this.obj.C1/this.obj.C2*100)
  //  $("#C1").html(p1+"%").css("width",p1+"%");
  //  $("#C2").html(this.obj.C1+'/'+this.obj.C2+' (条)');      
  //  let str,area="with area as(select @.fromID from @.type where @.fromID='"+obj2.type+"'union all select a.@.fromID from @.type a join area b on a.@.upid=b.@.fromid)"
  //  str="<r: db=\"sqlite.aliexpress\">"+area+"update @.pro set @.pro.@.hide=53,@.pro.@.err='类目禁限(说明:"+obj2.des.replace(/\'/,"''")+";类目ID:"+obj2.type+")' from @.pro,area where @.pro.@.type=area.@.fromID<1/>update @.restriction set @.time="+Tool.gettime("")+" where @.id="+obj2.id+"</r:>"
  // Tool.ajax.a01(str,1,this.e02,this)
  //},
  //e02:function(t)
  //{
  //  if(t=="")
  //  {
  //    $("#C2").html(this.obj.C1+'/'+this.obj.C2+' (完)'); 
  //    this.a05();
  //  }else{alert("操作失败02："+t);}
  //},
  //f01:function(obj2)
  //{
  //  this.obj.C2=1;this.obj.C1=1;
  //  let p1=Math.ceil(this.obj.C1/this.obj.C2*100)
  //  $("#C1").html(p1+"%").css("width",p1+"%");
  //  $("#C2").html(this.obj.C1+'/'+this.obj.C2+' (条)');
  //  let where=":shopid="+obj2.name
  //  let des="店铺ID禁限(说明:"+obj2.des.replace(/\'/ig,"''")+";店铺ID："+obj2.name;
  //  str="<r: db=\"sqlite.aliexpress\">update @.pro set @.hide=53,@.err='"+des+"' where "+where+"<1/>update @.restriction set @.time="+Tool.gettime("")+" where @.id="+obj2.id+"<1/>delete from @.freight where @.shopid="+obj2.name+"</r:>";	
  // Tool.ajax.a01(str,1,this.e02,this);
  //}