'use strict';
var fun =
{
  Aarr: ["RU", "IN", "BR", "SE", "CA", "DE", "AU", "IT", "ES", "UK", "FR", "US", "MY", "NL", "IE"],//主是是更新【minDay*】字段用的。
  obj: { A1: 1, A2: 0 },
  a01: function () {
    let html = Tool.header('正在修复运费模板和【attrValue】字段...') + '\
		<div class="p-2">\
		  <table class="table table-hover">\
		  <tbody>\
			<tr><td class="right">说明：</td><td colspan="2">\
      目的：为了做包邮的时后商品价格不会太高。（如：查询一个商品，有多个国家送达时间&lt;=28天，算出最高运费且运费&lt;$10，加到商品价格里面，就能做包邮。）<br/>\
      （1）物流【追踪不可用】，会被删除。<br/>\
      （2）修改【minDay*】字段，重新计算运费&lt;$10的最小送达天数（不符合条件的为90天）。<hr/>\
      修复【attrValue】字段目的是为了方便禁限和搜索，这个字段默认是空的。\
      </td ></tr >\
			<tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
			<tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
		  </tbody>\
		  </table>\
		</div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : 0) + '\
		<r:pro db="sqlite.aliexpress" size=10 page=2>,\
			{\
        <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
				  "aeopAeProductPropertys":<:aeopAeProductPropertys tag=0/>,\
				  "freight":<:freight tag=0/>,\
			  </r:prodes>\
			  "proid":"<:proid/>"\
      }\
    </r:pro>]'
    $("#state").html("正在获取运费模板...");
      Tool.ajax.a01(str, this.obj.A1,this.a03, this)
  },
  a03: function (oo) {
    if (this.obj.A2 == 0) { this.obj.A2 = oo[0]; }
    oo.shift()
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
  },
  a04: function (oo) {
    let str = "";
    for (let i = 0; i < oo.length; i++) {
      oo[i].minDayArr = {}
      for (let k in oo[i].freight) {
        let tempArr=this.b01(oo[i].freight[k]);
        oo[i].freight[k] = tempArr[0];
        oo[i].minDayArr[k] = tempArr[1];
      }
      ////////////////////////
      str += '\
      <r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo[i].proid,50) + '">update @.prodes set @.freight=' + Tool.rpsql(JSON.stringify(oo[i].freight)) + ' where @.proid=\'' + oo[i].proid + '\'</r:>\
      <r: db="sqlite.aliexpress">update @.pro set ' + this.b02(oo[i].minDayArr) + this.b03(oo[i].aeopAeProductPropertys) + ' where @.proid=\'' + oo[i].proid + '\'</r:>';
    }
    $("#state").html("正在保存运费模板。。。");
    Tool.ajax.a01( str,1,this.a05, this);
  },
  a05: function (t) {
      if (Tool.Trim(t) == "") {
        this.obj.A1++;
        this.a02();
      }
      else
      { Tool.pre(["出错", t]); }
  },
  b01: function (arr) {
    //（1）物流【追踪不可用】，会被删除。
    let nArr = [], minDay = 90 ;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].tracking == "visible" || arr[i].tracking == "true") {
        nArr.push(arr[i]);
        //（2）修改【minDay*】字段，重新计算运费&lt;$10的最小送达天数。
        let maxDay;
        if (("" + arr[i].deliveryDayMax).indexOf("-") != -1) {
          maxDay = arr[i].deliveryDayMax.split("-")[1];
        }
        else { maxDay = arr[i].deliveryDayMax; }
        maxDay = Tool.int(maxDay)
        //////////////////////////////////////////////////
        if (Tool.int(arr[i].fAmount) < 10 && maxDay < minDay) {
          minDay = maxDay;
        }
      }
      else if (arr[i].tracking == "invisible" || arr[i].tracking == "false" || !arr[i].tracking) { }
      else
      {
        Tool.pre(["未知【追踪是否可用】",arr]);
        bbbbbbbbbbbbbbbbbb
      }
    }
    return [nArr, minDay];    
  },
  b02: function (arr1) {
    let arr2 = [];
    for (let i = 0; i < this.Aarr.length; i++) {
      if (!arr1[this.Aarr[i]]) arr1[this.Aarr[i]] = 90;
      arr2.push("@.minDay" + this.Aarr[i] + "=" + arr1[this.Aarr[i]]);
    }
    return arr2.join(",");
  },
  b03: function (arr) {
    let nArr = [],tempArr=[];
    for (let i = 0; i < arr.length; i++) {
      tempArr.push(arr[i].attrValue)
      if (JSON.stringify(tempArr).length < 1024)//【attrValue】字段只能存1024个字符
      {
        nArr.push(arr[i].attrValue)
      }
      else { break; }      
    }
    return ",@.attrValue=" + Tool.rpsql(JSON.stringify(nArr));
  }
}
fun.a01()