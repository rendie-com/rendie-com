'use strict';
var fun =
{
    a01: function () {
        this.a02({})
    },
    a02: function (oo) {
        let html = this.b04(oo, 0) + this.b02();
        html = '\
    <header class="panel-heading">后台分类管理</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <thead class="table-light center">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        return '\
    <tr>\
      <th class="w350 left">ID.分类名称</th>\
      <th>中文名</th>\
      <th>列表模板</th>\
      <th class="w50">排序</th>\
      <th class="w30"></th>\
    </ul>'
    },
    b02: function () {
        return '\
    <tr>\
    <td colspan="9" class="p-1">\
    <div class="btn-group btn-group-sm">\
      <button type="button" class="btn btn-secondary" onclick="fun.xxxxxx()">反选</button>\
      <button type="button" class="btn btn-secondary" onclick="fun.c07(1)">设置叶子类目</button>\
      <button type="button" class="btn btn-secondary" onclick="fun.c07(0)">设置非叶子类目</button>\
      <button type="button" class="btn btn-secondary" onclick="fun.MoveType01()">移动分类</button>\
      <button type="button" class="btn btn-secondary" onclick="fun.c09()">添加</button>\
    </div>\
    </td>\
  </tr>'
    },
    b03: function (fromID) {
        return '[{}<r:type where=" where @.upid=' + fromID + ' order by @.sort asc" size=200>,\
    {\
      "id":"<:id/>",\
      "isleaf":"<:isleaf/>",\
      "upid":"<:upid/>",\
      "name":"<:name/>",\
      "template":"<:template/>",\
      "sort":"<:sort/>"\
    }\
    </r:type>]'
    },
    b04: function (oo, m1) {
        let li1 = "", html = "";
        for (let i = 1; i < oo.length; i++) {
            html += '\
      <tr name="type'+ oo[i].upid + '">\
        <td class="left">\
          '+ (oo[i].isleaf == "False" ? '<a href="javascript:" class="Mo MoA"  style="margin-left:' + m1 + 'px;" onclick="fun.c01($(this),' + oo[i].id + ')"></a>' : '<a class="Mo" style="margin-left:' + m1 + 'px;"></a>') + '\
          <div class="form-check form-check-inline">\
            <input type="checkbox" class="form-check-input" value="'+ oo[i].id + '" name="pre_id" id="customCheck' + oo[i].id + '">\
            <label class="form-check-label" for="customCheck'+ oo[i].id + '">' + oo[i].id + '.' + oo[i].name + '</label>\
          </div>\
        </td>\
        <td class="p-0"><input type="text" value="'+ oo[i].name + '" class="form-control form-control-sm" onblur="fun.c03($(this),' + oo[i].id + ',\'name\',\'' + oo[i].name + '\')"></td>\
        <td class="p-0"><input type="text" value="'+ oo[i].template + '" class="form-control form-control-sm" onblur="fun.c03($(this),' + oo[i].id + ',\'template\',\'' + oo[i].template + '\')"></td>\
        <td class="w50 p-0"><input type="text" value="'+ oo[i].sort + '" class="center form-control form-control-sm" onblur="fun.c03($(this),' + oo[i].id + ',\'sort\',\'' + oo[i].sort + '\')"></td>\
        <td class="w30" style="padding-left: 30px;position: relative;">\
          <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu">\
          '+ li1 + '\
          <li><a class="dropdown-item pointer" onClick="fun.c05($(this),'+ oo[i].id + ')">删除</a></li>\
        </ul>\
        </td>\
      </tr>'
        }
        return html
    },
    c01: function (This, id) {
        if (This.attr("Class") == "Mo MoB") { This.attr("Class", "Mo MoA"); $("[name='type" + id + "']").hide(); }
        else {
            This.attr("Class", "Mo MoB")
            if ($("[name='type" + id + "']").length == 1) { $("[name='type" + id + "']").show(); }
            else {
                let m1 = parseInt(This.css("margin-left")) + 30, oo = This.parent().parent();
                oo.after('<tr id="loading"><td colspan="9"><img class="w20" src="' + o.path + 'admin/img/loading_42x42.gif"/> 正在加载【子类】。。。</td></tr>');
                Tool.ajax.a01('' + this.b03(id),1,this.c02,  this, [oo, m1])
            }
        }
    },
    c02: function (o1, o2) {
        $("#loading").remove();
        o2[0].after(this.b04(o1, o2[1]))
    },
    c03: function (This, id, L, V) {
        let val = This.val(), html = "<r: tag=\"sql\">update @.type set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            This.val("加载加...");
            Tool.ajax.a01(html, 1,this.c04,  this, [This, val]);
        }
    },
    c04: function (t, oo) {
        if (t == "") { oo[0].attr("disabled", false); oo[0].val(oo[1]); }
        else { alert("出错：" + t); }
    },
    c05: function (This, id) {
        if (confirm('确定要删除吗？')) {
            let html = "<r: tag=\"sql\">delete from @.type where @.id=" + id + "</r:>"
            Tool.ajax.a01( html,1,this.c06, this, This);
        }
    },
    c06: function (t, This) {
        if (t == "") { This.parent().parent().parent().remove(); }
        else { alert("出错：" + t); }
    },
    c07: function (val) {
        let pre_id = Tool.returnID();
        if (pre_id) {
            let html = "<r: tag=\"sql\">update @.type set @.isleaf=" + val + " where @.id in(" + pre_id + ")</r:>"
            Tool.ajax.a01(html,1,this.c08,  this);
        } else { alert("请选择要设置的ID。"); }
    },
    c08: function (t) {
        if (t == "") { location.reload();; }
        else { alert("出错：" + t); }
    },
    c09: function () {
        if (confirm('确定要添加吗？')) {
            let html = "<r: tag=\"sql\">insert into @.type(:upid)values('0')</r:>"
            Tool.ajax.a01(html,1,this.c08,  this);
        }
    },
    MoveType01: function () {
        let pre_id = Tool.returnID();
        if (pre_id) {
            let html = '\
			<div id="producttype" class="popdiv" style="width:822px;position:fixed;top:150px;margin-left:15%;z-index:1000;">\
				<div class="poptitie"><img src="/<.Path/>admin/img/btn_close.gif" onClick="$(this).parent().parent().remove();"/>请选择移动的分类</div>\
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tb2" style="overflow:auto;">\
				<tr>\
					<td valign="top" >\
					<ul class="cmblock">\
					<li>\
					<select size="5" style="width:200px;height:300px" id="prolist1" onChange="fun.MoveType03(this.value,\'2\',\'3,4\')">\
					<r:type where=" where @.from=\'rendie\' and @.upid=\'0\' order by @.sort asc" size=200><option value=\'<:id/>\'><:name/></option></r:type>\
					</select>\
					<select size="5" style="width:200px;height:300px" id="prolist2" onChange="fun.MoveType03(this.value,\'3\',\'4\')"></select>\
					<select size="5" style="width:200px;height:300px" id="prolist3" onChange="fun.MoveType03(this.value,\'4\',\'\')"></select>\
					<select size="5" style="width:200px;height:300px" id="prolist4"></select>\
					</li>\
					</ul>\
					<a class="button left" href="javascript:" onClick="fun.MoveType04(\''+ pre_id + '\');">确定</a><a class="button middle" href="javascript:" onClick="$(this).parent().parent().parent().parent().parent().remove();">取消</a></td>\
				</tr>\
				</table>\
			</div>'
           Tool.ajax.a01( html,1,this.MoveType02,this)
        } else { alert("请选择要移动的ID。"); }
    },
    MoveType02: function (t) { $("body").after(t); },
    MoveType03: function (a, b, c) {
        $("#producttype").append('<div id="loading"><img src="/' + o.path + 'admin/img/loading.gif" align="absmiddle" /></div>')
        if (c == "3,4") { $("#prolist3").html(""); $("#prolist4").html(""); } else if (c == "4") { $("#prolist4").html(""); }
        let str = '<r:type where=" where @.from=\'rendie\' and @.upid=\'' + a + '\' order by @.sort asc" size=100><option value=\'<:id/>\'><:name/></option></r:type>'

        $.ajax({
            type: "POST", url: "ajax.html?" + Math.random(), data: { data: escape(str) }, success: function (t) {

                $("#prolist" + b).html(t); $("#loading").remove();
            }
        });
    },
    MoveType04: function (val) {
        let proselected, valid, txt
        for (let i = 4; i > 0; i--) {
            proselected = $("#prolist" + i).find("option:selected").text()
            if (proselected) { valid = $("#prolist" + i).val(); break; }
        }
        if (valid) {
            txt = '<r: db="mysql.admin">update @.type set @.upid=\'' + valid + '\' where @.id in(' + val + ')</r:>修改绑定成功'
            $.ajax({ type: "POST", url: "ajax.html?" + Math.random(), data: { data: escape(txt) }, success: function (t) { alert(t); location.reload(); } });
        } else { alert("选择移动的分类") }
    },
}
fun.a01()
/*

	

    TypeIsHide:function(This,fromID,hide)
    {
        let str="<r: tag=\"sql\">update @.type set @.hide="+hide+" where @.id="+fromID+"</r:>";
        $.ajax({type:"POST",url:"ajax.html?"+Math.random(),data:{data:escape(str)},success:function(txt){
        if(hide==1)
        {This.attr("onclick","TypeIsHide($(this),"+fromID+",0)");This.html("取消隐藏");}
        else
        {This.attr("onclick","TypeIsHide($(this),"+fromID+",1)");This.html("隐藏");}
        }});
    }*/