var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    this.a02()    
  },
  a02:function()
  {
    let html='<header class="panel-heading"><div onclick="Tool.main();">用户管理</div><div onclick="Tool.main(\'js01\');" class="active">用户添加</div></header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
      <tbody>\
      <tr>\
        <td align="right">用户名称：</td>\
        <td><Input id="UserName" type="text" size="30" value="" class="form-control form-control-sm"/></td>\
        <td><font color="red">* </font><input type="button" value="检测帐号" class="btn btn-sm btn-outline-secondary"/></td>\
        <td align="right">电子邮箱：</td>\
        <td><Input id="Email" type="text" size=30 Value="" class="form-control form-control-sm"/></td>\
        <td><font color="red">* </font></td>\
      </tr>\
      <tr>\
        <td align="right">用户密码：</td>\
        <td><INPUT  type="password" id="pwd" value="admin888" size="30" maxLength="18" class="form-control form-control-sm"></td>\
        <td><font color="red">* </font><font class=tips>用户登录时的密码</font></td>\
        <td align="right">手机号码：</td>\
        <td><INPUT  type="text" id="Mobile" value="" size="30" maxLength="12" class="form-control form-control-sm"/></td>\
        <td></td>\
      </tr>\
      <tr>\
        <td align="right">密码问题：</td>\
        <td><Select id="Question" class="form-select">\
            <Option value="" selected="selected">--请您选择--</Option>\
            <Option value="我的宠物名字？">我的宠物名字？</Option>\
            <Option value="我最好的朋友是谁？">我最好的朋友是谁？</Option>\
            <Option value="我最喜爱的颜色？">我最喜爱的颜色？</Option>\
            <Option value="我最喜爱的电影？">我最喜爱的电影？</Option>\
            <Option value="我最喜爱的影星？">我最喜爱的影星？</Option>\
            <Option value="我最喜爱的歌曲？">我最喜爱的歌曲？</Option>\
            <Option value="我最喜爱的食物？">我最喜爱的食物？</Option>\
            <Option value="我最大的爱好？">我最大的爱好？</Option>\
            <Option value="我中学校名全称是什么？">我中学校名全称是什么？</Option>\
            <Option value="我的座右铭是？">我的座右铭是？</Option>\
            <Option value="我最喜欢的小说的名字？">我最喜欢的小说的名字？</Option>\
            <Option value="我最喜欢的卡通人物名字？">我最喜欢的卡通人物名字？</Option>\
            <Option value="我母亲/父亲的生日？">我母亲/父亲的生日？</Option>\
            <Option value="我最欣赏的一位名人的名字？">我最欣赏的一位名人的名字？</Option>\
            <Option value="我最喜欢的运动队全称？">我最喜欢的运动队全称？</Option>\
            <Option value="我最喜欢的一句影视台词？">我最喜欢的一句影视台词？</Option>\
          </Select>\
        </td>\
        <td><font color="#FF6600">*</font></td>\
        <td align="right">问题答案：</td>\
        <td><INPUT type="text" maxLength=20 size=30 id="Answer"class="form-control form-control-sm"/></td>\
        <td></td>\
      </tr>\
      <tr>\
      <td align="right">用户组：</td>\
      <td>\
        <select id="GroupID" class="form-select">\
        <option value="0">请选择用户组</option>\
        <r:usergroup size=50>\
        <option value="<:id/>"><:name/></option>\
        </r:usergroup>\
        </select>\
      </td>\
      <td></td>\
      <td align="right">论坛头衔：</td>\
      <td>\
      <select id="clubgradeid" class="form-select">\
        <option value="0">请选择论坛头衔</option>\
       <r:askgrade size=50>\
        <option value=\'[askgrade:id]\'>[askgrade:name]</option>\
        </r:askgrade>\
      </select>\
      </td>\
      <td></td>\
      </tr>\
      <tr>\
        <td align="right">问答头衔：</td>\
        <td>\
          <select id="gradeid" class="form-select">\
          <option value="0">请选择问答头衔</option>\
          <r:askgrade size=50 where=" where @.TypeFlag=0">\
          <option value=\'[askgrade:id]\' >[askgrade:name]</option>\
          </r:askgrade>\
          </select>\
      </td>\
      <td></td>\
      <td align="right">用户状态：</td>\
      <td><input type="radio" name="locked" value="0" checked="checked" id="locked-0" class="form-check-input"/>\
        <label for="locked-0" class="form-check-label pointer me-2">正常</label>\
        <input type="radio" name="locked" value="1" id="locked-1" class="form-check-input"/>\
        <label for="locked-1" class="form-check-label pointer me-2">锁定</label>\
      </td>\
      <td></td>\
    </tr>\
    <tr>\
      <td align="right">计费方式：</td>\
      <td Colspan="5">\
        <input name="ChargeType" type="radio" value="1" checked="checked" id="ChargeType-1" class="form-check-input"/>\
        <label for="ChargeType-1" class="form-check-label pointer me-2">扣点数<font color="#0066CC">（推荐）</font></label>\
        <input type="radio" name="ChargeType" value="2" id="ChargeType-2" class="form-check-input"/>\
        <label for="ChargeType-2" class="form-check-label pointer me-2">有效期(在有效期内，用户可以任意阅读收费内容)</label>\
        <input type="radio" name="ChargeType" value="3" id="ChargeType-3" class="form-check-input"/>\
        <label for="ChargeType-3" class="form-check-label pointer me-2">无限期</label></td>\
    </tr>\
    <tr> \
      <td align="right">用户姓名：</td>\
      <td class="p-0">\
        <table class="table table-borderless align-middle mb-0">\
        <tbody><tr>\
          <td><Input id="FirstName" type="text" size=10 Value=""class="form-control form-control-sm" /></td>\
          <td class="w30 ms-0">（性）</td>\
          <td><Input id="LastName" type="text" size=10 Value="" class="form-control form-control-sm"/></td>\
          <td class="w30 ms-0">（名）</td>\
        </tr></tbody>\
        </table>\
      </td>\
      <td></td>\
      <td align="right">头像地址：</td>\
      <td><input type="text" maxlength="255" size="30" id="Face" value="" class="form-control form-control-sm"/></td>\
      <td></td>\
    </tr>\
    <tr>\
      <td Colspan="6" align="center"><button type="button" class="btn btn-secondary btn-sm" onclick="fun.c01()">确定添加</button></td>\
    </tr>\
    </tbody>\
    </TABLE>'
    Tool.html(null,null,html)
  },
  c01:function()
  {
    let o1={},str
    o1.name=$("#UserName").val()
    o1.Email=$("#Email").val()
    o1.pwd=$("#pwd").val();
    o1.Mobile=$("#Mobile").val()
    o1.Question=$("#Question").val()
    o1.Answer=$("#Answer").val()
    o1.GroupID=$("#GroupID").val()
    o1.clubgradeid=$("#clubgradeid").val()
    o1.locked=$("[name='locked']:checked").val()
    o1.ChargeType=$("[name='ChargeType']:checked").val()
    o1.Face=$("#Face").val()
    o1.FirstName=$("#FirstName").val()
    o1.LastName=$("#LastName").val()
    o1.gradeid=$("#gradeid").val()
    str="insert into @.user(@.name,:Email,:pwd,:Mobile,:Question,:Answer,:GroupID,:clubgradeid,:locked,:ChargeType,:Face,:FirstName,:LastName,:gradeid)values('"+o1.name+"','"+o1.Email+"','<.GetMd5("+o1.pwd+")/>','"+o1.Mobile+"','"+o1.Question+"','"+o1.Answer+"',"+o1.GroupID+","+o1.clubgradeid+","+o1.locked+","+o1.ChargeType+",'"+o1.Face+"','"+o1.FirstName+"','"+o1.LastName+"',"+o1.gradeid+")"
    str='[<r: tag="sql">'+str+'</r:>]'
   Tool.ajax.a01(str,1,this.c02,this);
  },
  c02:function(oo)
  {
    if(oo[0]==null)
    {
      alert('添加成功！')
      window.location.reload();
    }
    else
    {
      alert("出错："+oo[0])
    }
  }
}
fun.a01()