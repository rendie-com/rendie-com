'use strict';
var fun=
{
  a01:function()
  {
    this.a02();
  },
  a02:function()
  {
    let str='[{}\
    <r:seller size=20 db="sqlite.aliexpress" page=4 where=" order by @.sort asc">\
    ,{\
      "id":<:id/>,\
      "APPKEY":"<:APPKEY/>",\
      "APPSECRET":"<:APPSECRET tag=js/>",\
      "UserName":"<:UserName tag=js/>",\
      "password":"<:password tag=js/>",\
      "note":"<:note tag=js/>",\
      "hide":<:hide/>,\
      "sort":<:sort/>\
    }\
    </r:seller>]'
    Tool.ajax.a01(str,1,this.a03,this);
  },
  a03:function(oo)
  {
    let html='';
    for(let i=1;i<oo.length;i++)
    {
      html+='\
      <tr>\
        <td>'+oo[i].APPKEY+'</td>\
        <td>'+oo[i].APPSECRET+'</td>\
        <td>'+oo[i].UserName+'</td>\
        <td>'+oo[i].password+'</td>\
        <td>'+oo[i].note+'</td>\
        <td>'+oo[i].sort+'</td>\
        <td style="padding-left: 30px;position: relative;">'+this.b03(oo[i].id,oo[i].hide)+'</td>\
      </tr>'
    }
    html=F1.b03()+'\
    <table class="table table-hover center">\
      <thead class="table-light">'+this.b01()+'</thead>\
      <tbody>'+html+this.b02()+'</tbody>\
    </table>'
    Tool.html(null,null,html);
  },
  b01:function()
  {
    return '\
    <tr>\
      <th>APPKEY</th>\
      <th>APPSECRET</th>\
      <th>用户名</th>\
      <th>密码</th>\
      <th>负责人</th>\
      <th>排序</th>\
      <th class="w30" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
          <li><a class="dropdown-item pointer" onClick="fun.sellerAdd()">添加</a></li>\
        </ul>\
      </th>\
    </tr>'
  },
  b02:function()
  {
    return '\
    <tr>\
      <td class="right" colspan="2">开放平台：</td>\
      <td colspan="5" class="left"><a href="https://open.aliexpress.com/" target="_blank">https://open.aliexpress.com/</a></td>\
    </tr>'
  },
  b03:function(id,hide)
  {
    let t1,t2
    if(hide==0)
    {
      t1='\
      <li><a class="dropdown-item pointer" onClick="sellerHide(<:id/>,1)" class="detail-button">已启用</a></li>\
      <li><a class="dropdown-item pointer" onClick="Tool.main(\'/{r:arr(3)/>/<:id/>.html\')" class="detail-button">修改</a></li>\
      <li><a class="dropdown-item pointer" class="detail-button">更多</a></li>'
    }
    else
    {
      t1='\
      <li><a class="dropdown-item pointer" onClick="sellerHide(<:id/>,0)" class="detail-button">已停用</a></li>\
      <li><a class="dropdown-item pointer" onClick="sellerDel(<:id/>)" class="detail-button">删除</a></li>'
    }
    t2='\
    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
    <ul class="dropdown-menu" aria-labelledby="dropdown0">'+t1+'</ul>'
    return t2
  }
}
fun.a01();

/*
$(document).ready(function(){
  $('#sellerAdd').click(function(){
	let html='<r: db="sqlite.aliexpress">insert into @.seller(:from)values (\'aliexpress\')</r:>添加成功'
	$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){alert(txt);location.reload();}});
  })
  $('#sellerEdit').click(function(){
	let id,sql=[]
	$("input[type='checkbox'][name='pre_id']:checked").each(function(){
		id=$(this).val();
		sql[sql.length]="update @.seller set @.APPKEY='"+$("#pre_APPKEY"+id).val()+"',:APPSECRET='"+$("#pre_APPSECRET"+id).val()+"',:UserName='"+$("#pre_UserName"+id).val()+"',:password='"+$("#pre_password"+id).val()+"',:note='"+$("#pre_note"+id).val()+"',:sort="+$("#pre_sort"+id).val()+" where @.id="+id
	});
	let html='<r: db="sqlite.aliexpress">'+sql.join("<1/>")+'</r:>修改成功'
	$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){alert(txt);location.reload();}});
  })
})
*/