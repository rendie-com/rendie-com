'use strict';
var fun =
{
  obj: { A1: 1, A2: 0, uptime: 0, id: 0, shopid: 0 },
  a01: function () {
    this.obj.uptime = Tool.gettime("") - 60 * 60 * 24 * 60
    let html = Tool.header('正在更新【店铺】信息。。。') + '\
		<div class="p-2">\
		  <table class="table table-hover">\
		  <tbody>\
			<tr><td class="right">更新条件：</td><td colspan="2">更新时间在【'+ Tool.js_date_time2(this.obj.uptime) + '】之前的所有店铺。60天前)</td></tr>\
			<tr>\
			<td class="right w100">店铺进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
			<tr><td class="right">店铺ID：</td><td id="shopid" colspan="2"></td></tr>\
			<tr><td class="right">卖家ID：</td><td id="sellerId" colspan="2"></td></tr>\
			<tr><td class="right">关注量：</td><td id="Followers" colspan="2"></td></tr>\
			<tr><td class="right">店铺名称：</td><td id="name" colspan="2"></td></tr>\
			<tr><td class="right">评分：</td><td id="score" colspan="2"></td></tr>\
			<tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
			<tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
		  </tbody>\
		  </table>\
		</div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    gg.isRD(this.a03, this);
  },
  a03: function () {
    // @.shopid=@.sellerId
    let str = '\
		{\
		<r:shop db="sqlite.aliexpress" size=1 page=2 where=" where @.uptime<'+ this.obj.uptime + ' order by @.uptime asc,@.id asc">\
			"id":<:id/>,\
			"shopid":<:shopid/>,\
		</r:shop>\
			"A2":'+ (this.obj.A1 == 1 ? '<@page/>' : 0) + '\
		}'
    $("#state").html("正在获取请求地址。。。");
   Tool.ajax.a01( str,1,this.a04,this)
  },
  a04: function (oo) {
    if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
    this.obj.id = oo.id
    this.obj.shopid = oo.shopid
    if (oo.shopid == 0) {
      alert("aaaaaaaaaaaaaaaaa")
      //this.a14(0, '店铺已关闭', 0, 0)
    }
    else {
      this.a05();
    }
  },
  a05: function () {
    if (this.obj.A1 < this.obj.A2) {
      let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100);
      $("#A1").html(p1 + "%").css("width", p1 + "%");
      $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（条）');
      this.a06();
    }
    else {
      $("#state").html("全部完成");
    }
  },
  a06: function () {
    let url = 'https://aliexpress.com/store/feedback-score/' + this.obj.shopid + '.html'
    $("#shopid").html('<a href="' + url + '" target="_blank">' + this.obj.shopid + '</a>');
    $("#state").html("正在获【ownerMemberId】，主要用于获取【关注量】【评分】【店铺名称】。。。");
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');

    gg.getFetch(url,"json", this.a07, this)
  },
  a07: function (t) {
    if (typeof (t) == "object") {
      if (t.code == 404) {
        this.a14(0, '店铺已关闭', 0, 0)
      }
      else { Tool.pre(["出错：", t]); }
    }
    else {
      let shopid = Tool.StrSlice(t, "storeId: '", "'"), isbool = true;
      if (shopid) {
        $("#state").html("已获得【shopid】也就是【店铺ID】。");
        if (shopid != this.obj.shopid) {
          $("#shopid").html('把【<a href="https://aliexpress.com/store/feedback-score/' + this.obj.shopid + '.html" target="_blank">' + this.obj.shopid + '</a>】改成【<a href="https://aliexpress.com/store/feedback-score/' + shopid + '.html" target="_blank">' + shopid + '</a>】');
          isbool = false;
        }
        if (isbool) {
          $("#state").html("【店铺ID】不用改。。");
          this.a10(t);
        }
        else {
          $("#state").html("要改【店铺id】之前，看是不是已存在。如果存在，就删除当前。");
          this.a08(t, shopid)
        }
      }
      else if ("{status:404}" == t) {
        this.a14(0, '店铺已关闭', 0, 0)
      }
      else {
        Tool.reload("")
        //Tool.save(t)
        $("#state").html("【店铺ID】不对，程序终止。本来是：" + this.obj.shopid + "----确是：" + shopid);
      }

    }
  },
  a08: function (t, shopid) {
    let html = '"<.Db(sqlite.aliexpress,select count(1) from @.shop where @.shopid=' + shopid + ',count)/>"'
    html += '<r: db="sqlite.aliexpress">update @.pro set @.shopid=' + shopid + ' where @.shopid=' + this.obj.shopid + '</r:>'
    $("#state").html("修改本地shopid为当前采集到的shopid...");
    this.obj.shopid = shopid;
   Tool.ajax.a01( html, 1,this.a09, this, t);
  },
  a09: function (t1, t2) {
    if (t1 == "1")//表示款已存在，可以删除，然后下一条。
    {
      let html = '""<r: db="sqlite.aliexpress">delete from @.shop where @.id=' + this.obj.id + '</r:>'
     Tool.ajax.a01( html,1,this.a12,this);
    }
    else if (t1 == "0") { this.a10(t2) }
    else { alert("出错" + t1); }
  },
  a10: function (t) {
    let ownerMemberId = Tool.StrSlice(t, "ownerMemberId: '", "'")
    let sellerId = Tool.StrSlice(t, '<a href="//www.aliexpress.com/store/', '"')
    $("#sellerId").html(sellerId);
    $("#state").html("正在获取关注量。。。");
    let url = "https://my.aliexpress.com/wishlist/wishlist_shop_count.htm?itemtype=store&itemid=" + ownerMemberId + "&_=" + Date.parse(new Date());
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
    gg.getFetch(url,"json", this.a11, this, [ownerMemberId, sellerId])
  },
  a11: function (t, arr) {
    let Followers = Tool.StrSlice(t, 'window.collectNum={"num":', "}")
    $("#Followers").html(Followers);
    $("#state").html("正在获取【评分】。。。");
    let url = "https://feedback.aliexpress.com/display/evaluationDetail.htm?ownerMemberId=" + arr[0] + "&memberType=seller&callType=iframe&iframe_delete=true";
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
    gg.getFetch(url,"json", this.a13, this, [Followers, arr[1]])
  },
  a12: function (t) {
    if (t == "") {
      $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
      $("#sellerId,#score,#name,#shopid,#Followers").html("");
      this.obj.id = 0
      this.obj.shopid = 0
      this.obj.A1++;
      this.a03();
    }
    else { $("#state").html("出错002：" + Tool.pre(t)); }
  },
  a13: function (t, arr) {
    let name = Tool.StrSlice(t, 'target="_top">', "</a>")
    let score = Tool.StrSlice(t, "<td><span>", "%</span>")
    if (score == "") { score = 0; }
    $("#score").html(score);
    $("#name").html(name);
    if (name == false) {
      alert("aaaaaaaaaaaaaaaaaa")
    }
    else {
      this.a14(score, name, arr[0], arr[1])
    }
  },
  a14: function (score, name, Followers, sellerId) {
    let str = '<r: db="sqlite.aliexpress">update @.shop set @.uptime=' + Tool.gettime("") + ',@.Followers=' + Followers + ',@.sellerId=' + sellerId + ',@.shopid=' + this.obj.shopid + ',@.score=' + score + ',@.name=\'' + name.replace(/'/ig, "''") + '\' where @.id=' + this.obj.id + '</r:>'
   Tool.ajax.a01( str,1,this.a12,this);
  }
}
fun.a01()
