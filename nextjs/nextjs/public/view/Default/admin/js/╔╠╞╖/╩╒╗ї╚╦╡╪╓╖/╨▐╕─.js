'use strict';
var fun=
{
  a01:function()
  {
    let html='\
    <r:ShopUserorder where=" where @.id='+obj.arr[4]+'">\
    {\
      "countryid":"[ShopUserorder:countryid]",\
      "UserName":"[ShopUserorder:UserName]",\
      "ContactMan":"[ShopUserorder:ContactMan]",\
      "proviceFirstStageName":"[ShopUserorder:proviceFirstStageName]",\
      "addressCitySecondStageName":"[ShopUserorder:addressCitySecondStageName]",\
      "addressCountiesThirdStageName":"[ShopUserorder:addressCountiesThirdStageName]",\
      "Address":"[ShopUserorder:Address]",\
      "Address2":"[ShopUserorder:Address2]",\
      "zip":"[ShopUserorder:zip]",\
      "Mobile":"[ShopUserorder:Mobile]",\
      "Phone":"[ShopUserorder:Phone]",\
      "Email":"[ShopUserorder:Email]",\
      "qq":"[ShopUserorder:qq]",\
      "UserName":"[ShopUserorder:UserName]",\
      "country":\
      [{}\
        <r:country size=250 where=" where @.upid=\'0\' and @.from=\'aliexpress\' order by @.sort,:id asc">\
        ,{\
          "countryid":"[country:countryid]",\
          "name":"[country:name]"\
        }\
        </r:country>\
      ]\
    }</r:ShopUserorder>'
		Tool.ajax.a01(html,1,this.a02,this)
  },
  a02:function(oo)
  {
    let html='<div class="Tul thead"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>修改收货地址</div>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">*用户名：</li>\
      <li class="w300"><INPUT value="'+oo.UserName+'" id="UserName"  type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">*收货人姓名：</li>\
      <li class="w300"><INPUT value="'+oo.ContactMan+'" id="ContactMan" type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">country：</li>\
      <li class="w300">\
       <select id="countryid" class="form-select">\
       <option value="">--Country/Region--</option>'+this.b01(oo.country,oo.countryid)+'\
       </select>\
      </li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
     <li class="w150 right">State/Province/Region：</li>\
     <li class="w300"><INPUT value="'+oo.proviceFirstStageName+'" id="proviceFirstStageName"  type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
     <li class="w150 right">City：</li>\
     <li class="w300"><INPUT value="'+oo.addressCitySecondStageName+'" id="addressCitySecondStageName"  type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
     <li class="w150 right">区/县：</li>\
     <li class="w300"><INPUT value="'+oo.addressCountiesThirdStageName+'" id="addressCountiesThirdStageName"  type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
     <li class="w150 right">*详细地址：</li>\
     <li class="w300"><INPUT value="'+oo.Address+'" id="Address"  type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
     <li class="w150 right">详细地址2：</li>\
     <li class="w300"><INPUT value="'+oo.Address2+'" id="Address2"  type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
     <li class="w150 right">收货人邮编：</li>\
     <li class="w100"><INPUT  maxLength=6 value="'+oo.zip+'" id="Zip" type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">手机号码：</li>\
      <li  class="w300"><INPUT value="'+oo.Mobile+'" id="Mobile"type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">或固定电话</li>\
      <li class="w300"><INPUT value="'+oo.Phone+'" id="Phone" type="text" class="form-select"><li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">收货人邮箱：</li>\
      <li class="w300"><INPUT value="'+oo.Email+'" id="Email"type="text" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
     <li class="w150 right">收货人QQ：</li>\
     <li class="w300"><INPUT value="'+oo.qq+'" id="QQ" type="text" class="form-select"></li>\
    </ul>'
    Tool.html(null,null,html);
  },
  b01:function(arr,countryid)
  {
    let str=""
    for(let i=1;i<arr.length;i++)
    {
      str+='<option value="'+arr[i].countryid+'"'+(arr[i].countryid==countryid?'selected="selected"':'')+'>'+i+'. '+arr[i].countryid+'（'+arr[i].name+'）</option>'
    }
    return str
  }
}
fun.a01();
/*
<script type="text/javascript">
function CheckForm() 
{ 
  let obj=Object(),txt
  obj.UserName=$("#UserName").val()
  obj.ContactMan=$("#ContactMan").val()
  obj.Address=$("#Address").val()
  obj.Address2=$("#Address2").val()
  obj.Zip=$("#Zip").val()
  obj.Phone=$("#Phone").val()
  obj.Mobile=$("#Mobile").val()
  obj.Email=$("#Email").val()
  obj.QQ=$("#QQ").val()
  obj.countryid=$("#countryid").val()
  obj.proviceFirstStageName=$("#proviceFirstStageName").val()
  obj.addressCitySecondStageName=$("#addressCitySecondStageName").val()
  obj.addressCountiesThirdStageName=$("#addressCountiesThirdStageName").val()
  if (obj.ContactMan==""){alert('请输入收货人姓名!');$("#ContactMan").focus();return false;}
  if (obj.Address==""){alert('请输入收货人地址!');$("#Address").focus();return false; }
  if (obj.Zip==""){alert('请输入收货人邮编!');$("#Zip").focus();return false; }
  if (obj.Phone==""&&$("#Mobile").val()==""){alert('收货人手机或电话至少要填一个!');$("#Mobile").focus();return false;}
  txt='{ren'+'die:area tag="sql">update @.ShopUserOrder set @.proviceFirstStageName=\''+obj.proviceFirstStageName+'\',:addressCitySecondStageName=\''+obj.addressCitySecondStageName+'\',:addressCountiesThirdStageName=\''+obj.addressCountiesThirdStageName+'\',:UserName=\''+obj.UserName+'\',:ContactMan=\''+obj.ContactMan+'\',:Address=\''+obj.Address+'\',:Address2=\''+obj.Address2+'\',:Zip=\''+obj.Zip+'\',:Phone=\''+obj.Phone+'\',:Mobile=\''+obj.Mobile+'\',:Email=\''+obj.Email+'\',:QQ=\''+obj.QQ+'\',:countryid=\''+obj.countryid+'\' where @.id=<.arr(4)/>{/ren'+'die:area/>修改成功！'
  txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(txt)},async:false}).responseText;
  alert(txt)
  window.location.reload();
}
</script>


*/