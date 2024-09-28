'use strict';
var fun =
{
  obj:
	{
		A1:1,A2:0,
		B1:1,B2:0,
		where:" where @.fromid="+obj.arr[5],//Seller表的 where语句
	},
  a01:function()
  {
    let html=Tool.header("Shopee -&gt; 卖家账户 -&gt; 更多 -&gt; 删除【有品牌】的商品")+'\
    <div class="p-2">\
      <table class="table table-hover align-middle mb-0">\
      <tbody>\
				<tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
				<tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
				<tr><td class="right">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
				<tr><td class="right">Shopee商品ID：</td><td id="fromid" colspan="2"></td></tr>\
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
  a06:function(arr)
  {
    if(this.obj.B2==0){this.obj.B2=arr[0];}
		arr.shift();
		let arr1=[],arr2=[]
		for(let i=0;i<arr.length;i++)
		{
			arr1.push(arr[i][0]);arr2.push(arr[i][1])
		}
		$("#fromid").html(arr.join(" , "));
		Tool.x1x2("B", this.obj.B1, this.obj.C2, this.a07,this,null,[arr1,arr2])
	},
  a07:function(arr)
  {
		let arr3={"mtsku_item_id_list":arr[0]}
		let data=JSON.stringify(arr3)
		$("#state").html("正在提交...");
		let url="https://seller.shopee.cn/api/v3/mtsku/delete_mtsku/?SPC_CDS_VER=2&cbsc_shop_region=my"
		gg.postFetch(url,JSON.stringify(data),this.a08,this,arr[1])
	},
  a08:function(t,idArr)
  {
		let oo,falseArr=[],trueArr=[];
		eval("oo="+t)
		if(oo.code==0)
		{
			let arr=oo.data.result;
			for(let i=0;i<arr.length;i++)
			{
				if(arr[i].code==0)
				{trueArr.push(arr[i].data.id);}
				else
				{falseArr.push(arr[i].data.id);}
			}
			if(falseArr.length==0)
			{this.a09(trueArr,idArr);}
			else
			{
				pre(["有错误：",falseArr])
			}
		}
		else
		{Tool.at("出错："+t);}
	},
  a09:function(arr,idArr)
  {
		let str='""<r: db="sqlite.aliexpress">update @.pro set @.isUpShopee=0 where @.proid in(\''+idArr.join("','")+'\')<1/>delete from @.proUpShopee where @.fromid in('+arr.join(",")+')</r:>';
		$("#state").html("正在更新...");
		Tool.ajax.a01(str,1,this.a10,this);
	},
  a10:function()
  {
		this.obj.B1++;
		this.a05();
	},
  b01:function()
  {
    return '\
    ['+(this.obj.B2==0?'<@page/>':'0')+'\
      <r:proUpShopee db="sqlite.aliexpress" size=10 page=2 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upUserID='+this.obj.fromid+' and b.@.isBrand=1">\
       ,[<:a.@.fromid/>,"<:b.@.proid/>"]\
    	</r:proUpShopee>\
    ]'
  },
}
fun.a01();
		

//