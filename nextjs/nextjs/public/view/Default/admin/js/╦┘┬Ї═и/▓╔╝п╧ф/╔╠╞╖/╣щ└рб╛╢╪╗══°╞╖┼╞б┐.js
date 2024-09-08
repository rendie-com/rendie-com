'use strict';
var fun =
  {
    obj: { A1: 1, A2: 0 },
    a01: function () {
      let html = Tool.header('正在归类【敦煌网品牌】...') + '\
	    <div class="p-2">\
		    <table class="table table-hover">\
		    <tbody>\
		    <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
		    </tbody>\
		    </table>\
	    </div>'
      Tool.html(this.a02, this, html);
    },
    a02: function () {
      let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : 0) +'<r:pro db="sqlite.aliexpress" size=50 page=2>,<:brand tag=json/></r:pro>]'
      $("#state").html("正在获取店铺ID...");
      Tool.ajax.a01( str, this.obj.A1,this.a03, this)
    },
    a03: function (oo) {
      if (this.obj.A2 == 0) { this.obj.A2 = oo[0]; }
      Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
    },
    a04: function (oo) {      
      let arr=[]
      for (let i = 1; i < oo.length; i++) {
        arr.push(Tool.rpsql(oo[i]))
      }
      let str = '[0<r:brand db="sqlite.dhgate" size=50 page=2 where=" where @.name in(' + arr.join(",")+')">,<:name tag=json/></r:brand>]'
     Tool.ajax.a01( str,1,this.a05,this)
    },
    a05: function (oo) {  
      let arr = []
      for (let i = 1; i < oo.length; i++) {
        arr.push(Tool.rpsql(oo[i]))
      }
      if (arr.length == 0) {
        this.a06("")
      }
      else {
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=65,@.err=\'归类【敦煌网品牌】\' where @.brand in(' + arr.join(",") + ')</r:>'
       Tool.ajax.a01( str,1,this.a06,this)
      }
      
    },
    a06: function (t) {
      if (t == "") {
        $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
        this.obj.A1++;
        this.a02();
      }
      else { Tool.pre(["出错", t]); }
    }
  }.a01();