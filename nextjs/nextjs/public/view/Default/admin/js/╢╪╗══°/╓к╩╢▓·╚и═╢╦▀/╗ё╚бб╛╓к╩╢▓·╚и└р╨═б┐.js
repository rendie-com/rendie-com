'use strict';
var fun=
{
  obj:
  {
    A1: 1, A2: 0,
    B1: 1, B2: 0,Barr: []
  },
  a01: function () {
    let html = Tool.header('正在获取【知识产权类型】。。。') + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right w150">类型进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') +'<r:beComplained size=100 db="sqlite.dhgate" page=2>,<:PropertyType tag=json/></r:beComplained>]'
    Tool.ajax.a01( str, this.obj.A1,this.a03, this);
  },
  a03: function (oo) {
    if (this.obj.A2 == 0) this.obj.A2 = oo[0];    
    oo.shift();
    this.a04(oo);
  },
  a04: function (oo) {
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, this.a06,oo)
  },
  a05: function (oo) {
    this.obj.Barr.push.apply(this.obj.Barr, oo)
    this.obj.Barr = Tool.unique(this.obj.Barr)
    this.obj.A1++;
    this.a02()
  },
  a06: function () {
    this.obj.B2 = this.obj.Barr.length;
    this.a07();
  },
  a07: function () {
    Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this, this.a10)
  },
  a08: function () {
    let str = '<.Db(sqlite.dhgate,select count(1) as Total FROM @.beComplained where @.PropertyType=' + Tool.rpsql(this.obj.Barr[this.obj.B1 - 1]) + ',count)/>'
    Tool.ajax.a01( str, this.obj.A1,this.a09, this);
  },
  a09: function (t) {
    this.obj.Barr[this.obj.B1 - 1] = [this.obj.Barr[this.obj.B1 - 1],t];
    this.obj.B1++;
    this.a07()
  },
  a10: function () {
    config.beComplained_PropertyType = this.obj.Barr;
    let str = '<r: file="/' + o.path + 'admin/js/敦煌网/知识产权投诉/config.js">let config=' + JSON.stringify(config, null, 2) + '</r:>';
   Tool.ajax.a01( str,1,this.a11,this);
  },
  a11: function (t) {
    if (t == "") {
      $("#state").html("全部完成。");
    }
    else { Tool.pre(["出错", t]); }
  } 

}
fun.a01();