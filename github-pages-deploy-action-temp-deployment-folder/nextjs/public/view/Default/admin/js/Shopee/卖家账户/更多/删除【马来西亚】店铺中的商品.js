'use strict';
var fun =
{
  obj:
	{
		A1:1,A2:0,
		B1:1,B2:0,Barr:[],
		where:" where @.fromid="+obj.arr[5],//Seller表的 where语句
	},
  a01:function()
  {
    let html=Tool.header("Shopee -&gt; 卖家账户 -&gt; 更多 -&gt; 删除【马来西亚】店铺中的商品")+'\
    <div class="p-2">\
      <table class="table table-hover align-middle mb-0">\
      <tbody>\
				<tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
				<tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
				<tr><td class="right">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
				<tr><td class="right">店铺商品ID：</td><td id="itemIdMY" colspan="2"></td></tr>\
				<tr><td class="right">说明：</td><td colspan="2">只是设置【itemIdMY和isMY】字段为0，如果删除失败了，手动获取一下【店铺中商品ID】，再来删除。</td></tr>\
				<tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html)
	},
  a02:function()
  {
    gg.isRD(this.a03,this);
	},
  a03:function()
  {
		$("#state").html("正在获得配置参数");
		Tool.shopeeSeller(this.a04,this);
	},
  a04:function()
  {
    $("#username").html(this.obj.username);
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this)
	},
  a05:function()
  {
		$("#state").html("正在获取商品信息。。。");
		Tool.ajax.a01(this.b01(),1,this.a06,this);
	},
  a06:function(oo)
  {
    if(this.obj.B2==0){this.obj.B2=oo[0];}
		oo.shift();
		$("#itemIdMY").html(oo.join(" , "))
		this.obj.Barr=oo
		Tool.x1x2("B", this.obj.B1, this.obj.C2, this.a07,this,this.a10)
	},
  a07:function()
  {
		let url="https://seller.shopee.cn/api/v3/product/delete_product/?version=3.1.0&SPC_CDS_VER=2&cbsc_shop_region=my"
		let data={"product_id_list":this.obj.Barr}
		$("#state").html("正在shopee中删除【店铺商品】。。。");
		gg.postFetch(url,JSON.stringify(data),this.a08,this)
	},
  a08:function(t)
  {
		$("#state").html("正在清除【店铺商品ID】。。。");
		let txt='""<r: db="sqlite.aliexpress">update @.proUpShopee set @.itemIdMY=0,@.isMY=0 where @.itemIdMY in('+this.obj.Barr.join(",")+')</r:>'
		Tool.ajax.a01(txt,1,this.a09,this)
	},
  a09:function(t)
  {
		this.obj.B1++;
		this.a05();
	},
  a10:function(t)
  {
		$("#state").html("完成");
  },
  b01:function()
  {
    return '['+(this.obj.B2==0?'<@page/>':'0')+'<r:proUpShopee db="sqlite.aliexpress" size=100 page=2 where=" where @.upUserID='+this.obj.fromid+' and @.isMY=1">,<:itemIdMY/></r:proUpShopee>]'
  }
}
fun.a01();