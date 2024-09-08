var fun=
{
	a01:function()
	{
    let str='\
    <r:usergroup size=1 where=" where @.id='+obj.arr[4]+'">\
    {\
      "name":"<:name/>",\
      "descript":"<:descript tag=js/>",\
      "ChargeType":<:ChargeType/>,\
      "GroupPoint":<:GroupPoint/>,\
      "ValidDays":<:ValidDays/>,\
      "ShowOnReg":<:ShowOnReg/>,\
      "SpaceSize":<:SpaceSize/>,\
      "ValidType":<:ValidType/>,\
      "id":"<:id/>"\
    }\
    </r:usergroup>'
   Tool.ajax.a01(str,1,this.a02,this);
  },
  a02:function(oo)
  { 
    //style="display:none"
    let html='\
    <div class="Tul thead"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>用户组管理修改</div>\
    <ul class="makeHtmlTab">\
      <li rel="1" class="hover">修改基本信息</li>\
      <li rel="2">功能选项</li>\
    </ul>\
    <div id="tbody_1">'+this.b02(oo)+'</div>\
    <div id="tbody_2">\
      <div class="Tul thead2">特殊功能选项</div>\
      <div class="Tul list-group-item-action">\
        <input type="checkbox" name="GroupSetting1" value="1" id="GroupSetting1">\
        <label for="GroupSetting1">在发布信息需要审核的模型，此会员组发布信息不需要审核</label>\
      </div>\
      <div class="Tul list-group-item-action">\
        <input type="checkbox" name="GroupSetting2" value="1" id="GroupSetting2">\
        <label for="GroupSetting2">可以修改和删除已审核的（自己的）文档</label>\
      </div>\
      <div class="Tul list-group-item-action">\
        一天内最多只能在同一个模型发布\
        <input type="text"  name="GroupSetting3" value="0" style="text-align:center;width:30px" />\
        篇文档 <font color="blue">不限制请输入"-1"</font>\
      </div>\
      <div class="Tul list-group-item-action">\
        <font color=#ff6600>一天内最多只能在同一类文档使用\
        <input  type="text" name="GroupSetting4" value="0" style="text-align:center;width:30px" />\
        次 <font color="blue">不限制请输入"0"</font>,此功能一般用于控制按有效期计费的会员权限,防止一次性恶意下载,查看全部收费信息，不是按有效期计费的用户组，建议设置成"0"。</font>\
      </div>\
      <div class="Tul list-group-item-action">\
         发布信息时获取积分为模型设置的\
          <input type="text"  name="GroupSetting5" value="0" style="text-align:center;width:30px" />\
          倍 <font color="blue">输入"0" 表示此会员组不得分</font>\
      </div>\
      <div class="Tul list-group-item-action">\
        发布信息时获取点券为模型设置的\
        <input type="text"  name="GroupSetting6" value="0" style="text-align:center;width:30px" />\
        倍 <font color="blue">输入"0" 表示此会员组不得点券</font>\
      </div>\
      <div class="Tul list-group-item-action">\
        发布信息时获取资金为模型设置的\
        <input type="text"  name="GroupSetting7" value="0" style="text-align:center;width:30px" />\
        倍 <font color="blue">输入"0" 表示此会员组不得资金</font>\
      </div>\
      <div class="Tul list-group-item-action">\
        此会员组发表评论可得：\
        <input type="text"  name="GroupSetting8" size="5" value="0" style="text-align:center"/>\
        分积分作为奖励\
        1个月内评论被删除将扣除\
        <input type="text"  name="GroupSetting9" size="5" value="0000" style="text-align:center"/>\
        分积分 <font color=blue>可输入"0"表示不增加也不减少积分</font>\
      </div>\
      <div class="Tul list-group-item-action">\
        此会员组发表信息被审核后是否发站内短消息通知\
        <input type="radio" name="GroupSetting10" value="1" id="GroupSetting10-1">\
        <label for="GroupSetting10-1">是</label>\
        <input type="radio" name="GroupSetting10" value="0" id="GroupSetting10-0">\
        <label for="GroupSetting10-0">否</label>\
      </div>\
      <div class="Tul list-group-item-action">\
        此会员组会员每隔\
        <input type="text"  name="GroupSetting11" size="5" value="[area:name tag=11]" style="text-align:center"/>\
        分钟后,重新登录奖励\
        <input  type="text" name="GroupSetting12" size="5" value="[area:name tag=12]" style="text-align:center"/>\
        分积分 <font color=blue>不想奖励请输入"0"</font>\
      </div>\
      <div class="Tul list-group-item-action">\
        此会员组在允许刷新添加时间的模型里允许在\
        <input  type="text" name="GroupSetting13" size="5" value="[area:name tag=13]" style="text-align:center"/>\
        分钟后重新刷新发布。不允许请输入"0" \
      </div>\
      <div class="Tul list-group-item-action">\
        短消息设置：最大容量为\
        <input type="text" name="GroupSetting14" size="5" value="[area:name tag=14]" style="text-align:center"/>\
        条,短信内容最多字符数\
        <input type="text" name="GroupSetting15" size="5" value="[area:name tag=15]" style="text-align:center"/>\
        个字符 群发限制人数\
        <input type="text" name="GroupSetting16" size="5" value="[area:name tag=16]" style="text-align:center"/>\
        人 <span style="color:#999">不限制，请输入"0"</span>\
      </div>\
      <div class="Tul list-group-item-action">\
        允许上传附件:\
        <input type="radio" onClick="$("#fj").show();" name="GroupSetting17" value="1" id="GroupSetting17-1">\
        <label for="GroupSetting17-1">允许</label>\
        <input type="radio" onClick="$("#fj").hide();" name="GroupSetting17" value="0" id="GroupSetting17-0">\
        <label for="GroupSetting17-0">不允许</label>\
      </div>\
      <div class="Tul list-group-item-action">\
        允许上传的附件扩展名:\
        <input  type="text" value="" name="GroupSetting18" />\
        多个扩展名用 |隔开,如gif|jpg|rar等 \
      </div>\
      <div class="Tul list-group-item-action">\
        允许上传的文件大小：\
        <input  name="GroupSetting19" type="text" value="" style="text-align:center" size="8">\
        KB\
      </div>\
      <div class="Tul list-group-item-action">\
        每天上传文件个数：\
        <input  name="GroupSetting20" type="text" value="" style="text-align:center" size="8">\
        个,不限制请填0</font>\
      </div>\
      <div class="Tul list-group-item-action">\
        签名字数限制：最大\
        <input type="text" name="GroupSetting21" size="5" value="" style="text-align:center"/>\
        个字符 <span style="color:#999">不限制，请输入"0"</span>\
      </div>\
      <div class="Tul thead2">商城权限：</div>\
      <ul class="Tul list-group-item-action">\
        <li class="w180 right">自动升级权限：</li>\
        <li>\
          累计在商城消费\
          <input type="text"  name="GroupSetting22" value="[area:name tag=22]" style="text-align:center;width:40px" />\
          元，可以自动升级到此会员组。<span class="tips">如果不想自动升级请输入"0"</span>\
        </li>\
      </ul>\
      <ul class="Tul list-group-item-action row">\
        <li class="w180 right">商城优惠措施：</li>\
        <li>\
          享受正价产品\
          <input type="text"   name="GroupSetting23" value="[area:name tag=23]" style="text-align:center;width:40px" />\
          折优惠 <span class="tips">该用户组没有任何优惠请输入"0"</span><br/>\
          享受正价产品\
          <input type="text"  name="GroupSetting24" value="[area:name tag=24]" style="text-align:center;width:40px" />\
          倍积分 <span class="tips">该用户组购物不奖积分请输入"0"</span>\
        </li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="w180 right">永久享受推荐奖励积分：</li>\
        <li>\
          <input type="radio" onClick="$(\'#jf\').show();" name="GroupSetting25" value="1" id="GroupSetting25-1"/>\
          <label for="GroupSetting25-1">是 </label>\
          <input onClick="$(\'#jf\').hide();" type="radio" name="GroupSetting25" value="0" id="GroupSetting25-0"/>\
          <label for="GroupSetting25-0">否</label>\
          <span class="tips">(选择"是"将享受推荐奖励积分制度)</span><span id=\'jf\' > &nbsp;享受奖励积分百分比\
          <input type="text"  name="GroupSetting26" value="[area:name tag=26]" style="text-align:center;width:40px" />\
          % </span>\
        </li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="w180 right">独享VIP会员专用客服通道：</li>\
        <li>\
          <input type="radio"  name="GroupSetting27" value="1" id="GroupSetting27-1"/>\
          <label for="GroupSetting27-1">是 </label>\
          <input type="radio" name="GroupSetting27" value="0" id="GroupSetting27-0"/>\
          <label for="GroupSetting27-0">否</label>\
        </li>\
      </ul>\
    </div>'
    Tool.html(null,null,html)
  },
  b01:function(oo)
  {
    let str='\
    <ul class="Tul list-group-item-action border-n">\
      <li class="w100" style="padding: 3px 0 0 0;">\
        <div class="custom-control custom-radio">\
          <input type="radio" class="custom-control-input" value="1" name="ChargeType" id="ChargeType-1"'+(oo.ChargeType==1?' checked="checked"':'')+'>\
          <label class="custom-control-label" for="ChargeType-1">扣点数</label>\
        </div>\
      </li>\
      <li class="w100 right">默认点数：</li>\
      <li class="w100"><input name="GroupPoint" type="text" id="GroupPoint" style="text-align:center"   value="'+oo.GroupPoint+'" size="5" maxlength="5" class="form-select"></li>\
      <li>点</li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w100" style="padding: 3px 0 0 0;">\
        <div class="custom-control custom-radio">\
          <input type="radio" class="custom-control-input" value="2" name="ChargeType" id="ChargeType-2"'+(oo.ChargeType==2?' checked="checked"':'')+'>\
          <label class="custom-control-label" for="ChargeType-2">有效期</label>\
        </div>\
      </li>\
      <li class="w100 right">默认有效期：</li>\
      <li class="w100">\
      <input name="ValidDays" type="text" id="ValidDays" style="text-align:center"  value="'+oo.ValidDays+'" size="5" maxlength="5" class="form-select"></li>\
      <li>天</li>\
    </ul>\
    <div class="Tul list-group-item-action" style="padding: 3px 0 0 0;">\
      <div class="custom-control custom-radio">\
        <input type="radio" class="custom-control-input" value="2" name="ChargeType" id="ChargeType-3"'+(oo.ChargeType==3?' checked="checked"':'')+'>\
        <label class="custom-control-label" for="ChargeType-3">无限期（永不过期）</label>\
      </div>\
    </div>'
    return str;
  },
  b02:function(oo)
  {
    let str='\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">用户组名称：</li>\
      <li class="w200"><input id="Name" type="text" value="'+oo.name+'" class="form-select"></li>\
    </ul>\
    <ul class="Tul list-group-item-action row">\
      <li class="right w150">用户组简介：</li>\
      <li class="w500"><textarea id="Descript" cols="50" rows="5" class="form-select">'+oo.descript+'</textarea></li>\
    </ul>\
    <ul class="Tul">\
      <li class="w150 right">用户组计费方式：</li>\
      <li>'+this.b01(oo)+'</li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">是否允许前台注册：</li>\
      <li>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" name="ShowOnReg" value="1"'+(oo.ShowOnReg==1?' checked="checked"':'')+' id="ShowOnReg-1" class="custom-control-input">\
          <label for="ShowOnReg-1" class="custom-control-label">允许</label>\
        </div>\
        <div class="custom-control custom-radio custom-control-inline">\
          <input type="radio" name="ShowOnReg" value="0"'+(oo.ShowOnReg==0?' checked="checked"':'')+' id="ShowOnReg-0" class="custom-control-input">\
          <label for="ShowOnReg-0" class="custom-control-label">不允许</label>\
        </div>\
      </li>\
    </ul>\
    <ul class="Tul">\
      <li class="w150 right">新会员注册验证方式：</li>\
      <li>\
        <div class="custom-control custom-radio">\
          <input id="a1" name="ValidType" type="radio"'+(oo.ValidType==0?' checked="checked"':'')+' value="0" class="custom-control-input">\
          <label for="a1" class="custom-control-label">无需验证</label>\
        </div>\
        <div class="custom-control custom-radio">\
          <input id="a2" name="ValidType" type="radio"'+(oo.ValidType==1?' checked="checked"':'')+' value="1" class="custom-control-input">\
          <label for="a2" class="custom-control-label">邮件验证（<font class="tips">会员注册后系统会发一封带有验证码的邮件给此会员，会员必须在通过邮件验证后才能真正成为正式注册会员</font>）</label>\
        </div>\
        <div class="custom-control custom-radio">\
          <input id="a3" name="ValidType" type="radio"'+(oo.ValidType==2?' checked="checked"':'')+' value="2" class="custom-control-input"/>\
          <label for="a3" class="custom-control-label">后台人工验证</label>\
        </div>\
      </li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">分配空间大小：</li>\
      <li class="50"><input type="text" name="SpaceSize" size="10"  style="text-align:center" value="'+oo.SpaceSize+'" class="form-select"/></li>\
      <li>KB <font color="#FF0000">&nbsp;提示：1 KB = 1024 Byte，1 MB = 1024 KB</font></li>\
    </ul>'
    return str;
  },
}
fun.a01();
/*

$(function(){
  $('[Modified]').live('click',function(){
		if($(this).attr("Class")=="Modified ModifiedB")
		{
			$(this).attr("Class","Modified ModifiedA");
			let id=$(this).attr("Modified")
			$(".Mo"+id).parent().hide()
		}
		else
		{
			$(this).attr("Class","Modified ModifiedB")
			let id=$(this).attr("Modified")
			if($(".Mo"+id).css("padding-left"))
			{
			 $(".Mo"+id).parent().show() 
			}
			else
			{
				let str="\
					<tr>\
						<td colspan=\"10\" class=\"Mo"+id+"\">\
							<table class=\"tb2\">\
							<r:type where=\" where @.from in('admin','user') and @.upid='"+id+"' order by @.sort asc\" size=200>\
							<tr>\
							<td>\
									{if \"<:isleaf/>\"==\"False\"}\
										<a href=\"javascript:\" Modified=\"<:id/>\" class=\"Modified ModifiedA\" ></a>\
									<else/>\
										<a class=\"Modified\"></a>\
									</if>\
									<input type=\"checkbox\" value=\"<:id/>\" name=\"pre_level\" id=\"check-<:id/>\"/>\
									<label for=\"check-<:id/>\"><:name/></label>\
							</td>\
							</tr>\
							</r:type>\
							</table>\
						</td>\
					</tr>"
			str=$.ajax({type:"POST",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
			$(this).parent().parent().after(str)
			let pl=20+parseInt($(this).parent().css("padding-left"))
			$(".Mo"+id).css("padding-left",pl+"px")
			}
		}
  });
  $(".makeHtmlTab li").click(function()//显示列表、隐藏列表
  {
		$(".tb .makeHtmlTab li").removeAttr('class')
		$(this).attr("class","hover")
		let i,rel=$(this).attr("rel")
		for (i=1;i<=4;i++)
		{
				if(i==rel)
			{
				$("#tbody_"+i).show()
		 }
			else
			{
				$("#tbody_"+i).hide()
			}
		}
  })
	$("#UserGroupSave").click(function(){
		let PowerList=[],txt
    $("input[name='pre_level']:checked").each(function(){PowerList[PowerList.length]=$(this).val();});
		PowerList=unique(PowerList)
		txt='<r: tag="sql">update @.usergroup set @.PowerList=\''+PowerList.join(",")+'\',:Name=\''+$("#Name").val()+'\',:Descript=\''+$("#Descript").val()+'\' where @.id='+managerID+'</r:>修改成功！'
		txt=$.ajax({type:"POST",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(txt)},async:false}).responseText;
		alert(txt)
		window.location.reload();
	})
})
function selfmenuEdit()
{
	let arr=[],html='',arritem=[],checked
	arr=menulist.split("|")
	PowerList='<r:usergroup where=" where @.id='+managerID+'"><:PowerList/></r:usergroup>'
	PowerList=$.ajax({type:"POST",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(PowerList)},async:false}).responseText;
	for(let i=0;i<arr.length;i++)
	{
		if((","+PowerList+",").indexOf(",self_"+i+",")==-1){checked='';}else{checked='checked="checked"';}
		arritem=arr[i].split(",")
		html+='<tr><td><a class=\"Modified\"></a><input type=\"checkbox\" value=\"self_'+i+'\" name=\"pre_level\" id=\"check-self_'+i+'\" '+checked+' /><label for=\"check-self_'+i+'\">'+(arritem[0]?arritem[0]:"-")+'</label></td></tr>'
	}
	return html
}*/