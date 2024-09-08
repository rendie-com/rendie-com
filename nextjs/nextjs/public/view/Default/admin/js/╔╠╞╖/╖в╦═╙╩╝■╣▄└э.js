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
    <header class="panel-heading">发送邮件管理</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td align="right">收件人选择: </td>\
      <td align="left"><table>\
          <tr>\
            <td colspan="2"><Input type="radio" value="-1" name="InceptType" id="InceptType--1">\
              <label for="InceptType--1">所有订阅邮箱，共有 <font color=green>1</font> 个有效订阅</label></td>\
          </tr>\
          <tr>\
            <td><Input type="radio" value="0" name="InceptType"id="InceptType-0">\
              <label for="InceptType-0">所有会员</label></td>\
            <td></td>\
          </tr>\
          <tr>\
            <td><Input type="radio" value="1" name="InceptType"id="InceptType-1">\
              <label for="InceptType-1">指定会员组</label></td>\
            <td><r:usergroup size=50>\
                <input type="checkbox" name="GroupID" value="<:id/>" id="GroupID-<:id/>">\
                <label for="GroupID-<:id/>"><:name/></label>\
              </r:usergroup></td>\
          </tr>\
          <tr>\
            <td><Input type="radio" value="2" name="InceptType" id="InceptType-2">\
              <label for="InceptType-2">指定用户名</label></td>\
            <td><Input size="40" name="inceptUser" value="admin" type="text">\
              多个用户名间请用<font color=#0000ff>英文的逗号</font>分隔 </td>\
          </tr>\
          <tr>\
            <td><Input type="radio" value="3" name="InceptType" id="InceptType-3">\
              <label for="InceptType-3">指定Email</label></td>\
            <td><Input size=40 id="InceptEmail" name="InceptEmail"  value="web@rendie.com" type="text">\
              多个Email间请用<font color=#0000ff>英文的逗号</font>分隔 </td>\
          </tr>\
          <tr>\
            <td><Input type="radio" value="4" name="InceptType" id="InceptType-4" checked="checked">\
              <label for="InceptType-4">采集的Email</label></td>\
            <td>最近发送时间小于：\
              <Input size="20" id="sendtime"  value="2013/04/30" type="text"></td>\
          </tr>\
        </table></td>\
    </tr>\
    <tr>\
      <td align="right"> 邮件主题: </td>\
      <td align="left"><Input size="100" name="title" id="title"  value="单身女如何赢得帅哥的约会 - 最时尚的女性杂志 (第1期) " type="text"></td>\
    </tr>\
    <tr>\
      <td align="right"> 邮件内容: </td>\
      <td align="left"><input type="radio" name="sendtype" checked="checked" value="0" id="sendtype-0">\
        <label for="sendtype-0">邮件订阅内容</label>\
        <input type="radio" name="sendtype" value="1" id="sendtype-1">\
        <label for="sendtype-1">普通内容</label>\
        <table>\
          <tr>\
            <td colspan="2"> 发送篇数：\
              <input type="text" name="sendnum" value="10" style="width:50px;text-align:center"/>\
              篇  从所有允许订阅的栏目中选择指定的篇数发送。<br/>\
              限定天数：\
              <input type="text" name="sendday" value="0" style="width:50px;text-align:center"/>\
              天  不限制请输入0，否则只从指定天数内选择文章发送。 </td>\
          </tr>\
          <tr>\
            <td valign="top" nowrap="nowrap"><pres>\
                <textarea  id="content" style="width:640px;font-family: Arial, Helvetica, sans-serif;font-size: 14px;" wrap="off" rows="10" dataType="Require" msg="请填写邮件内容"></textarea>\
              </pres></td>\
          </tr>\
        </table></td>\
    </tr>\
    <tr>\
      <td align="right">发件人: </td>\
      <td align="left"><Input size="50" value="乐趣网" id="sendername" name="sendername" type="text" ></td>\
    </tr>\
    <tr class=tdbg>\
      <td align=right class="clefttitle">邮件优先级：</td>\
      <td><Input type=radio value=1 name="Priority" id="Priority-1">\
        <label for="Priority-1">高</label>\
        <Input type=radio value=3 name="Priority" id="Priority-3" checked="checked">\
        <label for="Priority-3">普通</label>\
        <Input type=radio value=5 name="Priority" id="Priority-5">\
        <label for="Priority-5">低</label></td>\
    </tr>\
    <tr>\
      <td align="right"></td>\
      <td align="left"><Input class="pn" type="button" id="SendMailButton" value=" 发 送 ">\
        <Input class="pn" type="reset" value=" 清 除 "></td>\
    </tr>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();

/*

let progress_id = "loading"; 
function SetProgress(progress) { 
	$("#" + progress_id + " > div").css("width", String(progress) + "%"); //控制#loading div宽度 
  if (progress>10)
  { 
	$("#" + progress_id + " > div").html(String(progress) + "%"); //显示百分比 
  } 
} 
function doProgress(){
	
  $.post("ajax/admin_user.aspx?SendMailSave/"+InceptType+"/1.html"+Math.random(),{content:content,sendername:sendername,title:title,InceptEmail:InceptEmail,sendtime:sendtime},function(obj)
  {
	  let objArr=obj.split("|")
	  if(objArr[0]=="err")
	  {
		  alert(objArr[1])
	  }
	  else
	  {
		SetProgress(objArr[0]);
		if(objArr[0]<100){setTimeout("doProgress()", 1000);}else{alert("发送完成！")}
	  }
  });
}
let title,InceptType,InceptEmail,sendername,sendtime,content
$(function(){
  $("#SendMailButton").click(function()
  {
	sendername=escape($("#sendername").val())//发件人性名
	content=escape($("#content").val())//邮件内容
	title=escape($("#title").val())//邮件主题
	InceptType=$(":radio:checked").val()//收件人选择
	InceptEmail=$("#InceptEmail").val()//指定Email
	sendtime=$("#sendtime").val()//最近发送时间
    if(title=="" || content=="")
	{
		alert("请填写邮件的主题和内容!")
	}
	else
	{
	  $(this).attr("disabled","disabled")
	  $(this).val("正在发送请稍后。。。")
	  doProgress();
	}
  });
  $('input').customInput()
  $('#sendtime').DatePicker({
	format:'Y/m/d',
	date: $('#sendtime').val(),
	current: $('#sendtime').val(),
	starts: 1,
	onBeforeShow:function(){
		$('#sendtime').DatePickerSetDate($('#sendtime').val(), true);
	},
	onChange: function(formated, dates){
		$('#sendtime').val(formated);
	}
  });
})*/
