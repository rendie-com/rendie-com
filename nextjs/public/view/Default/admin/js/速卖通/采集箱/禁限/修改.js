'use strict';
var fun =
{
  a01: function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
    obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1"//搜索字段
    this.a02();
  },

  ///////////////////////////////////////////
  c10: function (id) {
    let str = '\
    <r:restriction size=1 db="sqlite.aliexpress" where=" where @.id='+ id + '">\
		{\
			id:<:id/>,\
			mode:<:mode/>,\
      type:"<:type tag=js/>",\
			name:"<:name tag=js/>",\
			des:"<:des tag=js/>",\
			addtime:"<:addtime/>",\
			time:"<:time/>",\
			types:"<if "<:type/>"!=""><r:type where=" where @.fromid=<:type/>" size=1><r:type where=" where @.fromid=<:upid/>" size=1><r:type where=" where @.fromid=<:upid/>" size=1><r:type where=" where @.fromid=<:upid/>" size=1><:name tag=js/> &gt; </r:type><:name tag=js/> &gt; </r:type><:name tag=js/> &gt; </r:type><:name tag=js/></r:type></if>"\
		}\
		</r:restriction>'
    Tool.ajax.a01( str,1,this.c11, this)
  },
  c11: function (t) {
    eval("let arr=" + t)
    let str = '<header class="panel-heading"><a href="javascript:window.location.reload()" class="arrow_back"></a>禁限_修改</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
      <tr>\
      <td class="w150 right">禁限方式：</td>\
      <td class="w500"><select id="mode" class="form-select">\
        <option value="0" '+ (arr.mode == 0 ? 'selected="selected"' : '') + '></option>\
        <option value="1" '+ (arr.mode == 1 ? 'selected="selected"' : '') + '>类目禁限</option>\
        <option value="2" '+ (arr.mode == 2 ? 'selected="selected"' : '') + '>关键词禁限</option>\
        <option value="3" '+ (arr.mode == 3 ? 'selected="selected"' : '') + '>店铺ID禁限</option>\
        </select></td><td></td>\
      </tr>\
      <tr>\
        <td class="right">关键词：</td>\
        <td><input type="text" size="50" id="pre_name" value="'+ Tool.Trim(arr.name) + '" class="form-control form-control-sm"/></td>\
        <td><font color="red">＊</font></td>\
      </tr>\
      <tr>\
        <td class="right">说明：</td><td><textarea class="form-control form-control-sm" id="pre_des" cols="50" rows="4" >'+ arr.des + '</textarea></td><td></td>\
      </tr>\
      <tr>\
        <td class="right">类目：</td>\
        <td colspan="2"><button class="btn btn-sm btn-outline-secondary" id="restrictionType" value="'+ arr.type + '" type="button" onClick="Tool.typeAT(\'restrictionType\');">' + (arr.types ? arr.types : '选择分类') + '</button></td>\
      </tr>\
      <tr><td></td><td colspan="2"><input type="button" class="btn btn-sm btn-secondary" onClick="fun.c12('+ arr.id + ');"value="确定修改"/></td>\
      </tr>\
      </tbody>\
      </table>\
    </div>'
    $("#table").html(str)
  },
  c12: function (id) {
    let str = "<r: db=\"sqlite.aliexpress\">update @.restriction set @.name='" + $("#pre_name").val().replace(/\'/, "''") + "',:des='" + $("#pre_des").val().replace(/\'/, "''") + "',:type='" + $("#restrictionType").val() + "',:mode=" + $("#mode").val() + " where @.id=" + id + "</r:>"
    Tool.ajax.a01( str,1,this.c13, this);
  },
  c13: function (t) {
    if (t == "") { alert("修改成功"); window.location.reload(); } else { alert("出错:" + t); }
  },
  c23: function () {
    if (confirm("是否【确定】添加?")) {
     Tool.ajax.a01( "<r: db=\"sqlite.aliexpress\">insert into @.restriction(:addtime)values((now))</r:>",1,this.c24,this);
    }
  },
  ///////////////////////////////////
  c24: function (txt) {
    if (txt == "") { window.location.reload(); } else { alert("操作失败：" + txt); }
  },
  c25: function (id) {
    if (confirm("是否【确定】则删除。")) {Tool.ajax.a01( "<r: tag=\"sql\">delete from @.restriction where @.id=" + id + "</r:>",1,this.c24,this); }
  },
}
fun.a01();