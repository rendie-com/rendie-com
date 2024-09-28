'use strict';
var fun=
{
	date:[],
	a01:function()
	{
	  this.a02()
	},
	a02:function()
	{
	  let str='[{}<r:deliverytype db="sqlite.aliexpress" size="200">,\
    {\
    "id":<:id/>,\
    "name":"<:name tag=js/>",\
    "bindDh":"<:bindDh tag=js/>",\
    "APIopen":"<:APIopen/>"\
    }</r:deliverytype>]'
		Tool.ajax.a01(str,1,this.a03,this)
	},
	a03:function(arr)
	{
		let html=""
		this.date=[];
		for(let i=1;i<arr.length;i++)
		{
			this.date.push(arr[i].name)
			html+='\
      <tr>\
        <td>'+i+'</td>\
        <td>'+arr[i].name+'</td>\
        <td>'+arr[i].bindDh+'</td>\
        <td>'+arr[i].APIopen+'</td>\
			</tr>'
		}
		html+='<tr><td colspan="8" class="left"><button type="button" class="btn btn-secondary btn-sm" onclick="fun.b01()">一键绑定到【敦煌网】</button></td></tr>'
		html = '\
    <header class="panel-heading">【速卖通】物流公司</header>\
    <div class="p-2">\
      <table class="table table-hover center">\
      <thead class="table-light">\
        <tr>\
          <th class="w50">编号</th>\
          <th class="w300">物流公司名称</th>\
          <th class="w300">绑定到【敦煌网】</th>\
          <th>物流公司代码</th>\
        </tr>\
      </thead>\
      <tbody>'+html+'</tbody>\
      </table>\
    </div>'
		Tool.html(null,null,html)
	},
	b01:function()
	{
		let arr=this.date,sql=[];
		for(let i=0;i<arr.length;i++)
		{
   		sql.push("update @.deliverytype set @.bind='"+this.b02(arr[i])+"' where @.name='"+arr[i].replace(/\'/g,"''")+"' and @.from='aliexpress'")
		}
		let str='<r: db="sqlite.aliexpress">'+sql.join("<1/>")+'</r:>'
		Tool.ajax.a01(str,1,this.b03,this)
	},
  b02:function(name)
	{
		let bindname="";
		switch(name)
		{
		  case "DPEX":bindname="TOLL-Online Shipping";;break;
		  case "USPS":bindname="USPS- Abroad Delivery";break;
		  case "SunYou Economic Air Mail":bindname="忽略";break;
		  case "Cainiao Super Economy":bindname="忽略";break;
		  case "AUSPOST":bindname="忽略";break;
		  case "CDEK_RU":bindname="忽略";break;
		  case "EKC":bindname="忽略";break;
		  case "Ukrposhta":bindname="忽略";break;
		  case "DHL e-commerce":bindname="忽略";break;
		  case "Sweden Post":bindname="忽略";break;
		  case "4PX Singapore Post OM Pro":bindname="忽略";break;
		  case "Correos Economy":bindname="忽略";break;
		  case "J-NET":bindname="忽略";break;
		  case "SF Economic Air Mail":bindname="忽略";break;
		  case "PONY_RU":bindname="忽略";break;
		  case "SF Express":bindname="忽略";break;
		  case "SF eParcel":bindname="SF eParcel";break;
		  case "Aramex":bindname="Aramex-Online Shipping";break;
		  case "Seller's Shipping Method - ES":bindname="忽略";break;
		  case "Seller's Shipping Method - FR":bindname="忽略";break;
		  case "Seller's Shipping Method - IT":bindname="忽略";break;
		  case "Seller's Shipping Method - AU":bindname="忽略";break;
		  case "Seller's Shipping Method - DE":bindname="忽略";break;
		  case "Yanwen Economic Air Mail":bindname="忽略";break;
		  case "CORREOS PAQ 72":bindname="忽略";break;
		  case "Royal Mail Economy":bindname="忽略";break;
		  case "Special Line-YW":bindname="忽略";break;l
		  case "RETS-EXPRESS":bindname="忽略";break;
		  case "Swiss Post":bindname="忽略";break;
		  case "GATI":bindname="忽略";break;
		  case "Posti Finland":bindname="忽略";break;
		  case "UPS Expedited":bindname="忽略";break;
		  case "UPS Express Saver":bindname="UPS SAVER";break;
		  case "TNT":bindname="TNT";break;
		  case "Singapore Post":bindname="SINGAPOREPOST";break;
		  case "HongKong Post Air Mail":bindname="HONGKONGPOST";break;
		  case "Fedex IP":bindname="FEDEX_IP";break;
		  case "Russia Express-SPSR":bindname="忽略";break;
		  case "AliExpress Premium Shipping":bindname="忽略";break;
		  case "Seller's Shipping Method - RU":bindname="忽略";break;
		  case "POS Malaysia":bindname="忽略";break;
		  case "Seller's Shipping Method - US":bindname="忽略";break;
		  case "Turkey Post":bindname="忽略";break;
		  case "eTotal":bindname="忽略";break;
		  case "PostNL":bindname="忽略";break;
		  case "China Post Ordinary Small Packet Plus":bindname="ePacket";break;
		  case "AliExpress?Saver?Shipping":bindname="忽略";break;
		  case "Aliexpress Direct":bindname="忽略";break;
		  case "IML Express":bindname="忽略";break;
		  case "Russian Post":bindname="忽略";break;
		  case "PONY_RU":bindname="忽略";break;
		  case "DHL_DE":bindname="忽略";break;
		  case "ASM":bindname="忽略";break;
		  case "4PX DE DHL INLAND DELIVERY-CZ":bindname="忽略";break;
		  case "Colissimo_old":bindname="忽略";break;
		  case "4PX_PLPOST_RM":bindname="忽略";break;
		  case "CAINIAO WAREHOUSE STANDARD SHIPPING":bindname="忽略";break;
		  case "France Express":bindname="忽略";break;
		  case "DHL_IT":bindname="忽略";break;
		  case "DHL_FR":bindname="忽略";break;
		  case "139 ECONOMIC Package":bindname="139Express";break;
		  case "139EXPRESS":bindname="139Express";break;
		  case "Royal Mail":bindname="Royal Mail";break;
		  case "Seller's Shipping Method - UK":bindname="忽略";break;
		  case "Euro-business Parcel":bindname="忽略";break;
		  case "Entrega Local":bindname="忽略";break;
		  case "Cainiao Expedited Economy":bindname="忽略";break;
		  case "Cainiao Standard For Special Goods":bindname="忽略";break;
		  case "UBI":bindname="UBI Smart Parcel-Online";break;
		  case "AliExpress Standard-BE":bindname="忽略";break;
		  case "China Post Air Parcel":bindname="忽略";break;
		  case "DHL_CZ":bindname="忽略";break;
		  case "TURKEY_POST":bindname="忽略";break;
		  case "360Lion Standard Packet":bindname="忽略";break;
		  case "Flyt Express":bindname="忽略";break;
		  case "TOPYOU":bindname="忽略";break;
		  case "Exelot Express":bindname="忽略";break;
		  case "Correios":bindname="忽略";break;
		  case "Posteitaliane":bindname="忽略";break;
		  case "Correos":bindname="忽略";break;
		  case "LAPOSTE":bindname="忽略";break;
		  case "Deutsche Post":bindname="忽略";break;
		  case "OTHER PL":bindname="忽略";break;
		  case "DPD_PL":bindname="忽略";break;
		  case "Russian Air":bindname="忽略";break;
		  case "Cainiao Super Economy for Special Goods":bindname="忽略";break;
		  case "Cainiao Saver Shipping For Special Goods":bindname="忽略";break;
		  case "Fedex IE":bindname="FEDEX_IE";break;
		  case "EMS":bindname="EMS";break;
		  case "e-EMS":bindname="EMS";break;
		  case "UPS":bindname="UPS";break;
		  case "DHL":bindname="DHL";break;
		  case "aCommerce":bindname="忽略";break;
		  case "4PX CZ DHL european second zone delivery":bindname="忽略";break;
		  case "4PX CZ DHL european first zone delivery":bindname="忽略";break;
		  case "DPD_ES":bindname="忽略";break;
		  case "4PX US Expedited SMART PACKET":bindname="忽略";break;
		  case "4PX USPS Small Package inland delivery":bindname="忽略";break;
		  case "Cainiao Heavy Parcel Line":bindname="忽略";break;
		  case "CHOICE":bindname="忽略";break;
		  case "CN_IML_EXPRESS_RU":bindname="忽略";break;
		  case "ARAS":bindname="忽略";break;
		  case "4PX SEUR 24 HOURS DELIVERY":bindname="忽略";break;
		  case "4PX TR72-PACKET":bindname="忽略";break;
		  case "SPSR_RU":bindname="忽略";break;
		  case "GC_FEDEX_LARGEPARCEL":bindname="忽略";break;
		  case "CJ_LOGISTICS":bindname="忽略";break;
		  case "JCEX Express":bindname="忽略";break;
		  case "Cainiao Super Economy Global":bindname="忽略";break;
		  case "4PXES_GLSEU_SMALL":bindname="忽略";break;
		  case "4PXES_POSTPY_ES":bindname="忽略";break;
		  case "SHUNYOU_STANDARD_SG":bindname="忽略";break;
		  case "4PXES_ESPOST_EU":bindname="忽略";break;
		  case "EMS_AE":bindname="忽略";break;
		  case "Cainiao Expedited Standard":bindname="忽略";break;
		  case "Seller's Shipping Method - CZ":bindname="忽略";break;
		  case "4PX US Ground big packet":bindname="忽略";break;
		  case "WINIT_YODEL_PARKET_HOMEMINI":bindname="忽略";break;
		  case "YODE":bindname="忽略";break;
		  case "Post LV":bindname="忽略";break;
		  case "BR Standard Packet":bindname="忽略";break;
		  case "GC_FR_POST_LOCAL_NS":bindname="忽略";break;
		  case "GC_DHL_EU_1":bindname="忽略";break;
		  case "4PX_DHL_EU1":bindname="忽略";break;
		  case "POSTKR":bindname="忽略";break;
		  case "GC_FEDEX_GROUND":bindname="忽略";break;
		  case "4PX CORREOS PAQ24":bindname="忽略";break;
		  case "WINITUSPS_FIRSTCLASS":bindname="忽略";break;
		  case "Cainiao-DPEX":bindname="忽略";break;
		  case "4PXES_GLSEU_LARGE":bindname="忽略";break;
		  case "4PX ROYAL MAIL TRACKED48":bindname="忽略";break;
		  case "CN_JNET_EXPRESS_RU":bindname="忽略";break;
		  case "GLS_ES":bindname="忽略";break;
		  case "4PXES_SEUR EU":bindname="忽略";break;
		  case "4PX_DHL_PL":bindname="忽略";break;
		  case "4PX_BPOST_EU":bindname="忽略";break;
		  case "4PX_GLS_BE":bindname="忽略";break;
		  case "4PX_DHL_DE":bindname="忽略";break;
		  case "4PX_GLS_EU":bindname="忽略";break;
		  case "GES Express":bindname="忽略";break;
		  case "SunYou":bindname="忽略";break;
		  case "Flyt Special Economy":bindname="忽略";break;
		  case "TOPYOU Special Economy":bindname="忽略";break;
		  case "YANWEN Special Standard":bindname="YANWEN";break;
		  case "YANWEN Special Economy":bindname="YANWEN";break;
		  case "BSC Special Standard":bindname="忽略";break;
		  case "SunYou Special Economy":bindname="忽略";break;
		  case "GLS_FR_5days":bindname="忽略";break;
		  case "Correos Express":bindname="忽略";break;
		  case "UPS_PL":bindname="忽略";break;
		  case "WINITUPS_SUREPOST":bindname="忽略";break;
		  case "Seller's Shipping Method - IL":bindname="忽略";break;
		  case "CAINIAO WAREHOUSE EXPRESS SHIPPING":bindname="忽略";break;
		  case "CJ Oversea":bindname="忽略";break;
		  case "4PX US Ground SMART PACKET":bindname="忽略";break;
		  case "4PX TR72-PACKET BY ZONE":bindname="忽略";break;
		  case "ePacket":bindname="ePacket";break;
		  case "AliExpress Standard Shipping":bindname="Ocean";break;
		  case "Seller's Shipping Method":bindname="忽略";break;
		  case "Cainiao Standard - SG Air":
		  case "Aliexpress Selection Saver":
		  case "AliExpress Selection Shipping for Korea":bindname="忽略";break;
		  case "CaiNiao Fulfillment Standard":bindname="忽略";break;
		  case "Aliexpress Selection Standard":bindname="忽略";break;
		  case "China Post Registered Air Mail":bindname="China Post Air Mail";break;
		  default:bindname="未绑定";
		}
	  return bindname;
	},
  b03:function(t)
	{
	  if(t==""){location.reload();}else{Tool.echo("出错01:"+t);}
	}
}
fun.a01();