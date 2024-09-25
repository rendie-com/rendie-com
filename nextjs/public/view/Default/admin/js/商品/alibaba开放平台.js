'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    this.a02();
  },
  a02:function()
	{
    let html='\
    <div class="m-2 shadow p-2 bg-white rounded">\
    <ul class="Tul center">\
      <li class="w70">ID</li>\
      <li class="w150">APPKEY</li>\
      <li class="w150">APPSECRET</li>\
      <li class="w200">用户名</li>\
      <li class="w150">密码</li>\
      <li class="w150">绑定账号</li>\
      <li class="w150">负责人</li>\
      <li class="w150">排序</li>\
      <li>操作</li>\
    </ul>\
    <r:APIaccount size=20 page=4  where=" where @.from=\'1688\' order by @.sort asc">\
      <ul class="Tul center tr">\
        <li class="w70">\
          <input type="checkbox" value="[APIaccount:id]" name="pre_id"  class="checkbox" id="check-[APIaccount:id]"/>\
          <label for="check-[APIaccount:id]">[APIaccount:id]</label>\
        </li>\
        <li class="w150 txtli" ondblclick="input_text($(this),[APIaccount:id],\'APPKEY\')">[APIaccount:APPKEY]</li>\
        <li class="w150 txtli" ondblclick="input_text($(this),[APIaccount:id],\'APPSECRET\')">[APIaccount:APPSECRET]</li>\
        <li class="w200 txtli" ondblclick="input_text($(this),[APIaccount:id],\'UserName\')">[APIaccount:UserName]</li>\
        <li class="w150 txtli" ondblclick="input_text($(this),[APIaccount:id],\'password\')">[APIaccount:password]</li>\
        <li class="w150">\
          <r:user where=" where @.id=[APIaccount:binduserID]" size=1>[user:name]</r:user>\
        </li>\
        <li class="w150 txtli" ondblclick="input_text($(this),[APIaccount:id],\'note\')">[APIaccount:note]</li>\
        <li class="w150 txtli" ondblclick="input_text($(this),[APIaccount:id],\'sort\')">[APIaccount:sort]</li>\
        <li>\
          <if "[APIaccount:hide]"=="0"><a href="javascript:" onClick="APIaccountHide([APIaccount:id],1)" class="detail-button">已启用</a><a href="javascript:" onClick="Tool.main(\'{r:arr(3)/>/[APIaccount:id]\')" class="detail-button">修改</a><a href="javascript:" class="detail-button">更多</a>\
            <else/>\
            <a href="javascript:" onClick="APIaccountHide([APIaccount:id],0)" class="detail-button">已停用</a><a href="javascript:" onClick="APIaccountDel([APIaccount:id])" class="detail-button">删除</a></if>\
        </li>\
      </ul>\
    </r:APIaccount>\
    <ul class="Tul center">\
      <li><a href="javascript:" class="button left" onClick="checkOthers(\'input\',\'pre_id\')">反选</a><a href="javascript:" class="button left" id="BatchBindManager">批量绑定账户</a><a href="javascript:" class="button middle" onClick="APIaccountAdd()">添加</a></li>\
    </ul>\
    <ul class="Tul">\
      <li class="pages"> <.load(admin/html/分页通用.html)/> </li>\
    </ul>\
    <ul class="Tul">\
      <li class="w200 right">帮助说明：</li>\
      <li><a href="https://open.1688.com/api/sysJoin.htm?spm=a260s.8208020.0.0.cn31Wf&ns=cn.alibaba.open" target="_blank">接口文档地址</a></li>\
    </ul>\
  </div>'
    Tool.a01(html)
  }
}
fun.a01();


/*

//日期和时间戳互换
function js_date_time(unixtime){return userDate(unixtime)+" "+userTime(unixtime)}
//时间戳转换成四位时间10:10:00
function userTime(uTime){
    let myDate = new Date(uTime*1000);
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    let second = myDate.getSeconds();
    return hours + ':' + minutes + ':' + second;
}
//时间戳转换成八位日期2014-5-5 
function userDate(uData){
	let myDate = new Date(uData*1000);
	let year = myDate.getFullYear();
	let month = myDate.getMonth() + 1;
	let day = myDate.getDate();
	return year + '/' + month + '/' + day;
}
function returnGetToken(URL,type)
{
  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("<.WebClientPost("+URL+")/>")/>,success:function(txt){
		eval("let getToken="+txt)
		obj.token=getToken.access_token
		setCookie("1688_token",getToken.access_token,10)
		if(type==2){setCookie("1688_refresh_token",getToken.refresh_token,24*30)}	 
		pagelist(1)
  }});
}
$(function(){
	obj.token=getCookie("1688_token")
	if(obj.token=="")
	{
		let URL,txt,Param
		if(getCookie("1688_refresh_token")=="")
		{
			let code=getQueryString("code")
			if(code==null)//是否要登陆
			{
				setCookie("URL1688",window.location.href,30*24);
			  Param="client_id="+obj.APPKEY+"&site=china&redirect_uri="+window.location.href
			  URL="http://gw.open.1688.com/auth/authorize.htm?"+Param+"&_aop_signature=[$1]"
			  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("<.httpRequestPostParam("+URL+",,"+Param+","+obj.APPSECRET+",code)/>")},success:function(txt){location.href=txt;}/>)
			}
			else
			{
				URL = "https://gw.open.1688.com/openapi/http/1/system.oauth2/getToken/"+obj.APPKEY+"?grant_type=authorization_code&need_refresh_token=true&client_id="+obj.APPKEY+"&client_secret="+obj.APPSECRET+"&redirect_uri="+getCookie("URL1688")+"&code="+ code
				returnGetToken(URL,2)
			}
		}
		else
		{
			URL="https://gw.open.1688.com/openapi/param2/1/system.oauth2/getToken/"+obj.APPKEY+"?refresh_token="+getCookie("1688_refresh_token")+"&grant_type=refresh_token&client_id="+obj.APPKEY+"&client_secret="+obj.APPSECRET
			returnGetToken(URL,1);
		}
	}
	else
	{
		pagelist(1);
	}
});*/