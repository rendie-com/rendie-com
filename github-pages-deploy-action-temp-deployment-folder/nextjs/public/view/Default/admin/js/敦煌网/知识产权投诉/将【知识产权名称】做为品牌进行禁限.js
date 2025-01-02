'use strict';
var fun=
{
  obj:
  {
    A1: 1, A2: 0,Aarr: [],
  },
  a01: function () {
    let html = Tool.header('正在将【知识产权名称】做为品牌进行禁限。。。') + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">品牌进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') +'<r:beComplained size=10 db="sqlite.dhgate" page=2 where=" order by @.createTime desc">,<:intelRightName tag=json/></r:beComplained>]'
    Tool.ajax.a01( str, this.obj.A1,this.a03, this);
  },
  a03: function (oo) {
    if (this.obj.A2 == 0) this.obj.A2 = oo[0];
    oo.shift();   
    this.a04(Tool.unique(oo));
  },
  a04: function (arr) {
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null,arr);
  },
  a05: function (arr) {
    let sqlArr = []
    for (let i = 0; i < arr.length; i++) {
      sqlArr.push("update @.pro set @.hide=51,@.err='将【知识产权名称】做为品牌进行禁限-疑似品牌名称：" + Tool.sql01(arr[i]) + "' where @.attrValue like '%\"" + Tool.sql01(arr[i]) + "\"%'")
      sqlArr.push("update @.pro set @.hide=53,@.err='将【知识产权名称】做为品牌进行禁限-品牌名称：" + Tool.sql01(arr[i]) + "' where @.brand=" + Tool.rpsql(arr[i]))
    }
    let str = '<r: db="sqlite.aliexpress">' + sqlArr.join("<1/>") +'</r:>'
   Tool.ajax.a01( str,1,this.a06,this);
  },
  a06: function (t) {
    if (t == "") {
      this.obj.A1++;
      this.a02();
    }
    else {
      Tool.at("出错："+t)
    }
    
  },
  
}
fun.a01();