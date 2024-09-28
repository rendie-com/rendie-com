'use strict';
var fun =
  {
    obj:
    {
      A1: 1, A2: 0
    },
    a01: function () {
      let html = Tool.header("正在从【rendie.com】IP库中获取IP...") + '\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
      <tbody>\
		    <tr><td class="right w150">IP进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
				</tbody>\
      </table>\
    </div>';
      Tool.html(this.a02, this, html)
    },
    a02: function () {
      gg.isRD(this.a03, this);
    },
    a03: function () {
      let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
		<r:ip db="mysql.admin" size=100 page=2 where=" order by @.id desc">,\
		{\
			"hit":<:hit/>,\
			"ip":"<:ip/>",\
			"isp":"<:isp/>",\
			"ct":"<:ct/>",\
			"prov":"<:prov/>",\
			"city":"<:city/>",\
			"area":"<:area/>",\
			"idc":"<:idc/>",\
			"asn":<:asn tag=json/>,\
			"addtime":<:addtime/>,\
			"uptime":<:uptime/>\
		}\
		</r:ip>]'
      gg.postJson('https://rendie.com/ajax/' + this.obj.A1, str, this.a04, this);
    },
    a04: function (arr) {
      if (arr.status == "error") {
        Tool.pre(arr)
      }
      else if (arr.status == "parsererror") {
        Tool.at(arr.error)
    }
      else {
        if (arr.length > 1) {
          if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
          Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, arr)
        }
        else
        {         
         Tool.pre(["出错:",arr]);
        }
      }
    },
    a05: function (arr) {
      let str = "", sel = "", insA, insB;
      for (let i = 1; i < arr.length; i++) {
        arr[i].ip = arr[i].ip.replace(/>/g,"&gt;")
        sel = "select count(1) from @.ip where @.ip='" + arr[i].ip + "'";
        insA = "@.hit,@.ip,@.isp,@.ct,@.prov,@.city,@.area,@.idc,@.asn,@.addtime,@.uptime";
        insB = arr[i].hit + ",'" + arr[i].ip + "'," + Tool.rpsql(arr[i].isp) + "," + Tool.rpsql(arr[i].ct) + "," + Tool.rpsql(arr[i].prov) + "," + Tool.rpsql(arr[i].city) + "," + Tool.rpsql(arr[i].area) + "," + Tool.rpsql(arr[i].idc) + "," + Tool.rpsql(arr[i].asn) + "," + arr[i].addtime + "," + arr[i].uptime;
        str += '<if Fun(Db(mysql.admin,' + sel + ',count))==0><r: db="mysql.admin">insert into @.ip(' + insA + ')values(' + insB + ')</r:></if>'
      }
      Tool.ajax.a01( str,1, this.a06,this);
    },
    a06: function (t) {
      if (t == "") {
        this.obj.A1++;
        this.a03();
      }
      else {
        alert("出错")
      }
    }
  }.a01();