'use strict';
var fun=
{
	obj:{A1:1},
  a01:function()
  {
    let html='\
		<div class="Tul thead"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>正在获取敦煌订单地址...</div>\
		<ul class="Tul list-group-item-action"><li class="w100 right">页进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">提示：</li><li id="state">正在准备订单...</li></ul>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    let str='[\
    {"A1":'+this.obj.A1+',"A2":<@page/>}\
    <r:order size=10 page=2 where=" where @.from=\'dhgate\' order by @.id asc">\
    ,{\
      "contactPerson":"<:firstName tag=js/> <:lastName tag=js/>",\
      "address":"<:address tag=js/>",\
      "address2":"<:address2 tag=js/>",\
      "city":"<:city tag=js/>",\
      "province":"<:province  tag=js/>",\
      "country":"<:country tag=js/>",\
      <r:country where=" where @.name=\'<:country/>\' and @.from=\'dhgate\'" size=1>\
      "countryid":"[country:countryid]",\
      "countryName":"[country:des tag=js]",\
      </r:country>\
      "zip":"<:zip tag=js/>",\
      "phone":"<:phone tag=js/>",\
      "vatNumber":"<:vatNumber/>",\
      "abn":"<:abn/>"\
    }\
    </r:order>]'
    Tool.ajax.a01(str,this.obj.A1,this.a03,this)
  },
  a03:function(arr)
  {
    this.obj.A2=arr[0].A2;
    let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
    $("#A1").html(p1+"%").css("width",p1+"%");
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
    let str="",select1=""
    for(let i=1;i<arr.length;i++)
    {
      arr[i].phone=arr[i].phone.replace(/\)|\(|\n/g,"")
      select1="select top 1 count(1) from @.ShopUserOrder where @.phone='"+arr[i].phone+"' and @.countryid='"+arr[i].countryid+"'"
      str+='<if Fun(Db('+select1+',count))==0><r: tag="sql">insert into @.ShopUserOrder(:ContactMan,:address,:address2,:addressCitySecondStageName,:proviceFirstStageName,:zip,:countryid,:phone) values (\''+arr[i].contactPerson+'\',\''+arr[i].address.replace(/'/g,"''")+'\',\''+arr[i].address2.replace(/'/g,"''")+'\',\''+arr[i].city.replace(/'/g,"''")+'\',\''+arr[i].province.replace(/'/g,"''")+'\',\''+arr[i].zip+'\',\''+arr[i].countryid+'\',\''+arr[i].phone+'\')</r:></if>'
    }
   Tool.ajax.a01(str,1,this.a04,this)
  },
  a04:function(t)
  {
		if(t=="")
		{
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
			this.obj.A1++;
			if(this.obj.A1<=this.obj.A2)
			{
        this.a02();
      }
			else
			{$("#state").html("全部完成。");}
		}else{$("#state").html("错误02:"+t);}
  },
}
fun.a01();