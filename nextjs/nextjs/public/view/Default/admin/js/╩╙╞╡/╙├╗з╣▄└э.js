'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js01")
    {Tool.scriptArr(['admin/js/工具/用户管理/用户添加.js']);}
    else
    {
      obj.arr[4]=obj.arr[4]?parseInt(obj.arr[4]):1;//翻页
      obj.arr[5]=obj.arr[5]?obj.arr[5]:"1";//搜索字段
      obj.arr[6]=obj.arr[6]?obj.arr[6]:"-_-20";//搜索内容
      this.a02()
    }    
  },
  a02:function()
  {
    let str='[\
    {\
      "size":20,\
      "count":<@count/>,\
      "usergroup":\
      [{}\
      <r:usergroup size=50>,\
        {\
          "id":"<:id/>",\
          "name":"<:name/>"\
        }\
      </r:usergroup>\
      ]\
    }\
    <r:user size=20 page=2 where=" order by @.LastLoginTime desc,@.id desc">,\
    {\
      "email":"[user:email]",\
      "name":"[user:name]",\
      "GroupID":[user:GroupID],\
      "point":[user:point],\
      "money":[user:money f=2],\
      "score":[user:score],\
      "LastLoginIP":"[user:LastLoginIP]",\
      "LastLoginTime":"[user:LastLoginTime]",\
      "regtime":"[user:regtime]",\
      "LoginTimes":"[user:LoginTimes]",\
      "RecommendID":[user:RecommendID],\
      "id":[user:id]\
    }\
    </r:user>]'
    Tool.ajax.a01(str,obj.arr[4],this.a03,this);
  },
  a03:function(arr)
  {
    let html=""
    for(let i=1;i<arr.length;i++)
    {
      html+='\
      <tr align="center">\
        <td align="left">\
          <input type="checkbox" value="'+arr[i].id+'" name="pre_id"  class="form-check-input" id="flexRadioDefault'+arr[i].id+'"/>\
          <label class="form-check-label pointer" for="flexRadioDefault'+arr[i].id+'">'+arr[i].id+'</label></td>\
        <td>'+(arr[i].name==""?'邮件登陆':arr[i].name)+'</td>\
        <td>'+arr[i].email+'</td>\
        <td>'+arr[i].GroupID+'</td>\
        <td>'+arr[i].point+' 个</td>\
        <td>'+arr[i].money+' 元</td>\
        <td>'+arr[i].score+' 分</td>\
        <td>'+arr[i].LastLoginIP+'</td>\
        <td>'+arr[i].LastLoginTime+'</td>\
        <td>'+arr[i].regtime+'</td>\
        <td>'+arr[i].LoginTimes+' 次</td>\
        <td>'+arr[i].RecommendID+'</td>\
        <td>\
        <a href="javascript:" onclick="Tool.main(\'{rr:attr(type1)/>/[user:id]\');">修改</a>\
          &nbsp;|&nbsp; \
          <a href="javascript:" onclick="Tool.main(\'{rr:attr(type2)/>/[user:id]\');">加积分</a>\
          &nbsp;|&nbsp; \
          <a href="javascript:" onclick="Tool.main(\'{rr:attr(type3)/>/[user:id]\');">续天数</a>\
          &nbsp;|&nbsp;\
          <a href="javascript:" onclick="Tool.main(\'{rr:attr(type4)/>/[user:id]\');">续费</a>\
          &nbsp;|&nbsp;\
          <a href="javascript:" onclick="Tool.main(\'{rr:attr(type5)/>/[user:id]\');">续点券</a>\
            &nbsp;|&nbsp;\
        <if "[user:locked]"=="1"><a href="javascript:" onclick="UserLock([user:id],0)">解锁</a>\
          <else/>\
          <a href="javascript:" onclick="UserLock([user:id],1)">锁定</a></if>&nbsp;|&nbsp;<a href="javascript:" onclick="DelUser([user:id])">删除</a></td>\
        </r:user>\
      </tr>'
    }
    html+='\
    <tr>\
      <td colspan="13" class="p-1">\
        <div class="btn-group btn-group-sm">\
          <button id="seep1" type="button" class="btn btn-secondary" onclick="">反选</button>\
          <button id="seep2" type="button" class="btn btn-secondary" onclick="">批量删除</button>\
          <select id="level1" name="level1" class="form-select w200">\
            <option value="0">请选择用户组</option>\
            <r:usergroup size=50>\
              <option value="<:id/>"><:name/></option>\
            </r:usergroup>\
          </select>\
          <button id="seep3" type="button" class="btn btn-secondary" onclick="fun.c14()" title="复制地址">批量设用户组</button>\
        </div>\
      </td>\
    </tr>\
    <tr><td class="left" colspan="13">'+Tool.page(arr[0].count, arr[0].size, 4)+'</td></tr>';
    let html='\
    <header class="panel-heading"><div class="active" onclick="Tool.main();">用户管理</div><div onclick="Tool.main(\'js01\');">用户添加</div></header>\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+obj.arr[5]+'">'+this.b02(obj.arr[5])+'</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c03(1)" value="1">用户名</li>\
        <li class="dropdown-item pointer" onclick="fun.c03(2)" value="2">ID</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c03(3)" value="3">邮件</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c03(4)" value="4">最后登录IP</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+(obj.arr[6]=="-_-20"?"":Tool.unescape(obj.arr[6]))+'" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <thead class="table-light center">'+this.b01()+'</thead>\
        <tbody>'+html+'</tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html)
  },
  b01:function()
  {
    return '\
    <tr>\
      <th>ID</th>\
      <th>用户名</th>\
      <th>邮件</th>\
      <th>所属用户组</th>\
      <th>点券</th>\
      <th>余额</th>\
      <th>积分</th>\
      <th>最后登录IP</th>\
      <th>最后活动时间</th>\
      <th>注册时间</th>\
      <th>登录</th>\
      <th>推荐人</th>\
      <th>操作</th>\
    </tr>'
  },
  b02:function(val)
	{
    let name="";
    switch(val)
		{
		  case "1":name="用户名";break;
		  case "2":name="ID";break;
		  case "3":name="邮件";break;
		  case "4":name="最后登录IP";break;	
      default:name="未知："+val;
		}
    return name
  },
  c01:function(){},
  c02:function()
  {
    let searchword=Tool.Trim($("#searchword").val());
    if(searchword)
    {        
      searchword=encodeURIComponent(searchword);
      Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/"+obj.arr[3]+"/1/"+$("#Field").val()+"/"+searchword);
    }else{alert("请输入搜索内容");}  
  },
  c03:function(val)
  {
    let name=this.b02(""+val)
    $("#Field").html(name).val(val)
  }
}
fun.a01();
/*
<script type="text/javascript">
$(document).ready(function(){
  $('#DelUser').click(function(){
    let pre_id=""
    $("input[type='checkbox'][name='pre_id']:checked").each(function(){id=$(this).val();if(pre_id==""){pre_id=id;}else{pre_id=pre_id+","+id;}});
		let str="delete from @.user where @.id in("+pre_id+")"
		str='{ren'+'die:area tag="sql">'+str+'{/ren'+'die:area}删除成功！'
		str=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
		alert(str)
		window.location.reload();
  })
})
function DelUser(id)
{
	let str="delete from @.user where @.id="+id
	str='<ren'+'die:area tag="sql">'+str+'</ren'+'die:area>删除成功！'
	str=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
	alert(str)
	window.location.reload();
}
function UserLock(id,mode)
{
	let str="update @.user set @.locked="+mode+"  where @.id="+id
	str='{ren'+'die:area tag="sql">'+str+'{/ren'+'die:area}修改成功！'
	str=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
	alert(str)
	window.location.reload();
}
</script> 
*/