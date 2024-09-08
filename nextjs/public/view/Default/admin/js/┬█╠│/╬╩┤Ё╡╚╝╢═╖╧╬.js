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
    let html='<header class="panel-heading">问答等级头衔设置</header>\
    <table class="table table-hover align-middle">\
    <form name="selform" id="selform" method="post" action="?">\
      <tr>\
        <td align="center">等级ID</td>\
        <td>用户等级头衔</td>\
        <td>颜色</td>\
        <td>图标</td>\
        <td>所需积分数</td>\
        <td>管理操作</td>\
      </tr>\
      <r:askgrade size=50 where=" where @.TypeFlag=0">\
        <tr>\
          <td align="center"><input type="checkbox" name="pre_id" id="GradeID-[askgrade:id]" value="[askgrade:id]">\
            <label for="GradeID-[askgrade:id]">[askgrade:id]</label></td>\
          <td><input  type="text" size="20" name="name6" value="[askgrade:name]" /></td>\
          <td><input  type="text" size="10" name="color6" value="[askgrade:color]" /></td>\
          <td><input  type="text" size="10" name="ico6" value="[askgrade:pic]" />\
            <img src="/<.Path/>admin/img/club/[askgrade:pic]" /></td>\
          <td><input  type="text" size="5" name="Score6" value="[askgrade:score]" /></td>\
          <td><a href="?x=c&typeflag=0&id=6" onClick="return(confirm(\'确定删除吗?\'))">删除</a></td>\
        </tr>\
      </r:askgrade>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选" />\
          <input class="pn" type="submit" name="submit_button" value="批量保存设置"/></td>\
      </tr>\
    </form>\
    <form action="?x=b&typeflag=0" method="post" name="myform" id="form">\
      <tr class="thead">\
        <td colspan="6">&nbsp;&nbsp;<strong>&gt;&gt;新增等级头衔</strong><<</td>\
      </tr>\
      <tr>\
        <td></td>\
        <td><input name="name" type="text"  id="name" size="25"></td>\
        <td><input style="text-align:center" name="color" type="text" value="#000000"  id="color" size="10"></td>\
        <td><input style="text-align:center" name="rank" type="text" value="rank0.gif"  id="rank" size="10"></td>\
        <td><input style="text-align:center" name="Score" type="text" value="1000"  id="Score" size="5">\
          分</td>\
        <td><input name="Submit3" class="pn" type="submit" value="OK,提交"></td>\
      </tr>\
    </form>\
    </table><div class="attention" style="color:#FF0000"> <strong>说明：</strong><br/>\
    <li>等级图标必须放于club/images目录下；</li>\
  </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();