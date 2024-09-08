'use strict';
var fun={
  NowTime:new Date(),
	obj:{A1:1},
  a01:function()
  {
    obj.arr[4]=obj.arr[4]?obj.arr[4]:"-_-20";//所有审核状态，未审核，已审核，取消
    let html='\
    <div class="Tul thead"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>导入到商品库</div>\
    <ul class="Tul list-group-item-action"><li class="w100 right">商品进度：</li>'+Tool.htmlProgress('A')+'</ul>\
    <ul class="Tul list-group-item-action"><li class="w100 right">提示：</li><li id="state">正在准备商品...</li></ul>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    let examine=obj.arr[4]=="-_-20"?"":"and @.examine="+obj.arr[4]
		let html='\
		[{"A2":<@page/>}\
    <r:tempproduct size=20 page=3 where=" where @.inbase=0 and @.hide=0 '+examine+'">,\
    {\
      "pic":"<:pic tag=js/>",\
      "pic1":"<:pic1/>",\
      "examine":"<:examine/>",\
      "shopName":"<:shopName tag=js/>",\
      "shopid":"<:shopid/>",\
      "shopUrl":"<:shopUrl/>",\
      "videoUrl":"<:videoUrl/>",\
      "des":"<:des tag=js/>",\
      "name":"<:name tag=js/>",\
      "SaleNum":"<:SaleNum/>",\
      "Review":"<:Review/>",\
      "HistoryPrice":"<:HistoryPrice tag=js/>",\
      "Weight":"<:Weight/>",\
      "length":"<:length/>",\
      "width":"<:width/>",\
      "height":"<:height/>",\
      "deliveryTime":"<:deliveryTime/>",\
      "aeopAeProductPropertys":"<:aeopAeProductPropertys tag=js/>",\
      "aeopAeProductSKUs":"<:aeopAeProductSKUs tag=js/>",\
      "keys":"<:keys tag=js/>",\
      "keys1":"<:keys1 tag=js/>",\
      "keys2":"<:keys2 tag=js/>",\
      "Discount":<:Discount/>,\
      "fromurl":"<:fromurl tag=js/>",\
      "from":"<:from tag=js/>",\
      "fromid":"<:fromid/>",\
      "lotNum":"<:lotNum/>",\
      "price":"<:price f=2/>",\
      "minprice":"<:minprice f=2/>",\
      "maxprice":"<:maxprice f=2/>",\
      "unit":"<:unit tag=js/>",\
      "type":"<:type/>"\
    }\
    </r:tempproduct>]'
		Tool.ajax.a01(html,1,this.a03,this)
	/*
  "tempreview":[\
				<r:tempreview size=20 where=" where @.fromid=<:fromid/>">\
				{if [tempreview:i]!=1},</if>\
				{\
					"name":"[tempreview:name tag=js]",\
					"from":"[tempreview:from]",\
					"fromid":"[tempreview:fromid]",\
					"des":"[tempreview:des tag=js]",\
					"addtime":"[tempreview:addtime]",\
					"pic":"[tempreview:pic tag=js]",\
					"CountryCode":"[tempreview:CountryCode tag=js]",\
					"CountryName":"[tempreview:CountryName tag=js]",\
					"Rank":"[tempreview:Rank tag=js]",\
					"Price":"[tempreview:Price tag=js]",\
					"Quantity":"[tempreview:Quantity tag=js]",\
					"Unit":"[tempreview:Unit tag=js]",\
					"LotNum":"[tempreview:LotNum tag=js]",\
					"Star":"[tempreview:Star tag=js]",\
					"BuyerFeedback":"[tempreview:BuyerFeedback tag=js]",\
					"SupplierReply":"[tempreview:SupplierReply tag=js]",\
					"BuyerReply":"[tempreview:BuyerReply tag=js]",\
					"DiggUp":"[tempreview:DiggUp tag=js]",\
					"DiggDown":"[tempreview:DiggDown tag=js]"\
				}\
				</r:tempreview>\
			\]\
	*/
  },
  a03:function(objPro)
  {
		this.obj.A2=objPro[0].A2+this.obj.A1-1;
		if(this.obj.A2==0)
		{$("#state").html('导入完成');}
		else
		{
      $("#state").html("正在导入...");
      let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
      let arr=[],sel="",ins="",upd="",html=""
      for(let i=1;i<objPro.length;i++)
      {
        arr=this.b01(objPro[i])
        sel="select top 1 count(1) from @.smtPro where @.fromid='"+objPro[i].fromid+"'"
        ins='insert into @.smtPro(:'+arr[0].join(",:")+')values('+arr[1].join(",")+')'
        upd="update @.tempproduct set @.inbase=1 where @.fromurl='"+objPro[i].fromurl+"'"
        html+='<if "Fun(Db('+sel+',count))"=="0"><r: db="sqlite.aliexpress">'+ins+'</r:></if><r: db="sqlite.aliexpress">'+upd+'</r:>'
      }
     Tool.ajax.a01(html,1,this.a05,this)
    }
  },
  a05:function(txt)
  {
		if(txt=="")
		{
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
      this.obj.A1++
      if(this.obj.A1<=this.obj.A2)
      {
        Tool.Time(this.a02,5,this,"1");  
      }
      else{$("#state").html("完");}
    }
		else
		{alert("错误号001:<hr>"+txt);}
  },
  b01:function(objPro)
  {
    let proA=[],proB=[]
    for(let o in objPro)
    {         
      if(("|Discount|length|width|height|lotNum|shopid|deliveryTime|examine|").indexOf("|"+o+"|")!=-1)
      {
        proA[proA.length]=o;
        proB[proB.length]=objPro[o];
      }
      else
      {
        proA[proA.length]=o;
        proB[proB.length]="'"+(objPro[o]).replace(/'/ig,"''")+"'";
      }
    }
    return [proA,proB]
  },
}.a01();
/*
 a03:function(pagecount,num)
  {
		let EndTime= new Date()
		let t,d,h,m,s,Implemented,age,Surplus
		t=EndTime.getTime()-this.NowTime.getTime();
		d=Math.floor(t/1000/60/60/24);h=Math.floor(t/1000/60/60%24);
		m=Math.floor(t/1000/60%60);
		s=Math.floor(t/1000%60);
		Implemented='<b>'+d+'</b>天<b>'+h+'</b>时<b>'+m+'</b>分<b>'+s+'</b>秒'
		age=t/1000/num
		Surplus=pagecount-num
		d=Math.floor(Surplus*age/60/60/24);
		h=Math.floor(Surplus*age/60/60%24);
		m=Math.floor(Surplus*age/60%60);
		s=Math.floor(Surplus*age%60);
		$("#state").html('已执行'+Implemented+'，平均<b>'+age.toFixed(2)+'</b>秒/条，剩<b>'+Surplus+'</b>条，大约<b>'+d+'</b>天<b>'+h+'</b>时<b>'+m+'</b>分<b>'+s+'</b>秒完成。')
  },
$(function(){obj.NowTime=new Date();TempProducthtml();})
function insertReview(obj)
{
	let review2A,review2B,review=[]
	for(let j=0;j<obj.length;j++)
	{
		review2A=[];review2B=[]
		for(let p in obj[j])
		{
			review2A[review2A.length]=p;
				if(("|Rank|Price|Quantity|LotNum|Star|DiggUp|DiggDown|fromid|SaleNum|").indexOf("|"+p+"|")>0)
				{review2B[review2B.length]=obj[j][p];}
				else
				{review2B[review2B.length]="'"+(obj[j][p]).replace(/'/ig,"''")+"'";}
		}
		sql='insert into @.Review(:'+review2A.join(",:")+')values('+review2B.join(",")+')'
		review[j]="("+(j+1)+').'+sql+'<r: db="sqlite.aliexpress">'+sql+'</r:>'
	}
	return "<hr>"+review.join("<hr>")
}

*/