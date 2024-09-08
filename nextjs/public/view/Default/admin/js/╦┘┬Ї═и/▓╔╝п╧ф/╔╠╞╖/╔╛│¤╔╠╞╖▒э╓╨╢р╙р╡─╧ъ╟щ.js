'use strict';
var fun=
{
  obj:{A1:1,A2:9,B1:1,B2:0},
  a01:function()
  {
    let html=Tool.header('正在删除商品表中多余的详情')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">数据库进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">分页进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    if(this.obj.A1<=this.obj.A2)
    {
      let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');  
      $("#state").html("正在查询商品详情表。。。");
      this.obj.B1=1;
      this.a03()
    }
    else
    {
      $("#state").html("全部完成");
    }
  },
  a03:function()
  {
    let str='\
    [<@page/>\
      <r:proDes db="sqlite.aliexpressProDes'+this.obj.A1+'" size=50 page=2>\
      ,"<:proid/>"\
      </r:proDes>\
    ]'
    Tool.ajax.a01(str,this.obj.B1,this.a04,this)
  },
  a04:function(oo)
  {
    this.obj.B2=oo[0];
    if(this.obj.B1<=this.obj.B2)
    {
      let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
      $("#B1").html(p1+"%").css("width",p1+"%");
      $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）');
      oo.shift();
      this.a05(oo);
    }
    else
    {
      this.obj.A1++;
      this.a02();
    }
  },
  a05:function(oo)
  {
    let str='\
    [0\
      <r:pro db="sqlite.aliexpress" size=50 where=" where @.proid in(\''+oo.join("','")+'\')">\
      ,"<:proid/>"\
      </r:pro>\
    ]'
    $("#state").html("正在查询商品表。。。");
    Tool.ajax.a01(str,1,this.a06,this,oo)
  },
  a06:function(o1,o2)
  {
    if(o1.length-1==o2.length)
    {
      this.obj.B1++;
      this.a03();
    }
    else
    {
      $("#state").html("正在商品表中，找不到对应的商品详情[proID]。。。");
      this.a07(o1,o2);
    }
  },
  a07:function(o1,o2)
  {
    let arr=[],isbool=false;
    for(let i=0;i<o2.length;i++)
    {
      isbool=false;
      for(let j=1;j<o1.length;j++)
      {
        if(o2[i]==o1[j]){isbool=true;break;}
      }
      if(isbool==false){arr.push(o2[i]);}
    }
    let str='[<r: db="sqlite.aliexpressProDes'+this.obj.A1+'">delete from @.proDes where @.proid in(\''+arr.join("','")+'\')</r:>]'
    Tool.ajax.a01(str,1,this.a08,this)
  },
  a08:function(oo)
  {
    if(oo[0]==null)
    {
      this.a03();
    }
    else{alert("删除出错");}
  }
}.a01();
