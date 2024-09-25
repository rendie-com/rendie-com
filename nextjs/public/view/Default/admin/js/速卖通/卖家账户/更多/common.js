'use strict';
Object.assign(Tool,{
	aliexpressSeller:function(A,B)
	{
    if(!B.obj.A1){B.obj.A1=1;}
		let str='{\
    <r:seller db="sqlite.aliexpress" size=1 page=2 where="'+B.obj.where+' order by @.sort asc,@.id asc">\
      "token":<:token tag=0/>,\
      "fromid":"<:fromid/>",\
      "username":"<:username/>",\
      "password":"<:password/>",\
      "shippingModel":<:shippingModel/>,\
      "afterSaleID":"<:afterSaleID/>",\
      "SizeTemplate":<:SizeTemplate/>,\
      "upmode":<:upmode/>,\
      "Group":<:Group/>,\
    </r:seller>\
    "A1":'+B.obj.A1+',"A2":<@page/>\
    }'
		this.json(this.aliexpressSeller02,str,this,B.obj.A1,[A,B])
	},
  aliexpressSeller02:function(oo,arr)
  {
    arr[1].obj=oo;
		arr[0].apply(arr[1]);
	},
})