'use strict';
var fun =
{
    a01: function () {
        let str = '\
    [0\
		<r:type db="sqlite.dhgate" where=" where @.upid=\'0\' order by @.sort asc" size=200>,\
    {\
			"fromID":"<:fromID/>",\
			"name":"<:name/>",\
			"enname":"<:enname tag=js/>"\
    }\
    </r:type>]'
        Tool.ajax.a01(str, 1, this.a02, this);
    },
    a02: function (arr) {
        let html2 = "";
        for (let i = 1; i < arr.length; i++) {
            html2 += '\
      <tr>\
        <td class="center">'+ i + '</td>\
        <td><a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),\''+ arr[i].fromID + '\')"></a> ' + arr[i].fromID + '</td>\
        <td>'+ arr[i].name + '（' + arr[i].enname + '）</td>\
      </tr>'
        }
        let html = '\
    <header class="panel-heading">\
        <div class="active" onclick="Tool.main()">【敦煌网】类目</div>\
        <div onclick="Tool.main(\'js01\')">商品佣金率</div>\
    </header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
      <thead class="table-light">\
        <tr>\
          <th class="w50">编号</th>\
          <th class="w200 center">来源ID</th>\
          <th>分类名称（英文）</th>\
        </ul>\
      </thead>\
      <tbody>'+ html2 + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html);
    },
    ////////////////////////////////////////////
    b01: function (oo, ischild, type, nameCn, cateId) {
        let str = ""
        if (type == "4" || type == "5") { str = '<input type="text" class="form-control form-control-sm">'; }
        else if (type == "2") {
            str = '<select class="form-select"><option>请选择' + nameCn + '</option>'
            for (let i = 0; i < oo.length; i++) { str += '<option title="attrValId:' + oo[i].attrValId + '" value="' + oo[i].attrValId + '">' + oo[i].lineAttrvalNameCn + ' (' + oo[i].lineAttrvalName + ')</option>'; }
            str += '</select>'
        }
        else if (type == "1") {
            for (let i = 0; i < oo.length; i++) {
                str += '<div class="form-check form-check-inline">\
				<input class="form-check-input" type="checkbox" id="attrValId-' + oo[i].attrValId + '">\
				<label class="form-check-label" for="attrValId-' + oo[i].attrValId + '">' + oo[i].lineAttrvalNameCn + ' (' + oo[i].lineAttrvalName + ')</label></div>';
            }
        }
        else { str = '未知type:' + type; }
        return str;
    },
    /////////////////////////////////////////////
    c01: function (This, fromID) {
        if (This.attr("Class") == "Mo MoB") { $(".Mo" + fromID).hide(); This.attr("Class", "Mo MoA"); }
        else {
            This.attr("Class", "Mo MoB")
            if ($(".Mo" + fromID).length) { $(".Mo" + fromID).show(); }
            else {
                This.parent().parent().after('<tr><td class="Mo' + fromID + ' p-0" colspan="3"><img height="30" src="/' + o.path + 'admin/img/loading_42x42.gif"/></td></tr>');
                let str = '\
				[{}\
				<r:type  db="sqlite.dhgate" where=" where @.upid=\'' + fromID + '\' order by @.sort asc" size=50>,\
        {\
        "isleaf":"<:isleaf/>",\
        "fromID":"<:fromID/>",\
        "name":"<:name tag=js/>",\
        "enname":"<:enname tag=js/>"\
        }\
        </r:type>]'
                let m1 = parseInt(This.css("margin-left")) + 20
                Tool.ajax.a01( str,1,this.c02, this, [fromID, m1]);
            }
        }
    },
    c02: function (arr, oo) {
        let str = '', li1 = '', li2 = '';
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].isleaf == "0") {
                li1 = '<a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),\'' + arr[i].fromID + '\')" style="margin-left:' + oo[1] + 'px;"></a>';
                li2 = ''
            }
            else {
                li1 = '<a class="Mo" style="margin-left:' + oo[1] + 'px;"></a>';
                li2 = '<button type="button" class="btn btn-outline-secondary btn-sm" onclick="fun.c03($(this),\'' + arr[i].fromID + '\',unescape(\'' + escape(arr[i].name + '（' + arr[i].enname + '）') + '\'))">查看属性</button>'
            }
            str += '\
      <tr>\
        <td class="w50 center">'+ i + '</td>\
        <td class="w200">'+ li1 + ' ' + arr[i].fromID + '</td>\
        <td class="p-0">'+ arr[i].name + '（' + arr[i].enname + '）' + li2 + '</td>\
      </tr>'
        }
        if (str == "") {
            str = '没有子类';
        }
        else {
            str = '<table class="table table-hover mb-0 align-middle"><tbody>' + str + '</tbody></table>'
        }
        $(".Mo" + oo[0]).html(str)
    },
    c03: function (This, fromID, title) {
        if ($("#attributes" + fromID).length == 0) {
            let str = '[0\
	  <r:attr db="sqlite.dhgate" where=" where @.cateId=\'' + fromID + '\' order by @.sort,@.id asc" size=30>,\
      {\
        "cateId":"<:cateId/>",\
        "ischild":"<:ischild/>",\
        "attrId":"<:attrId/>",\
        "buyAttr":"<:buyAttr/>",\
        "saleAttr":"<:saleAttr/>",\
        "defined":"<:defined/>",\
        "required":"<:required/>",\
        "style":"<:style/>",\
        "isother":"<:isother/>",\
        "type":"<:type/>",\
        "name":"<:name tag=js/>",\
        "nameCn":"<:nameCn tag=js/>",\
        "js":<:js/>\
      }</r:attr>]'
            This.parent().parent().after('<tr id="attributes' + fromID + '"><td class="shadow bg-white rounded" colspan="3"><img src="/' + o.path + 'admin/img/loading_42x42.gif"/> 正在加载【属性】。。。</td></tr>')
            Tool.ajax.a01(str, 1, this.c04, this, [fromID, title]);
        }
        else if ($("#attributes" + fromID).is(":visible")) {
            $("#attributes" + fromID).hide()
        }
        else { $("#attributes" + fromID).show() }
    },
    c04: function (js, arr) {
        let str = '';
        for (let i = 1; i < js.length; i++) {
            str += '<tr>\
			<td class="right w200" title="属性ID(attrId)=' + js[i].attrId + '\n是否购买属性（购买时，必选项）(buyAttr)=' + js[i].buyAttr + '\n是否销售属性（购买时，非必选项）(saleAttr)=' + js[i].saleAttr + '\n是否子属性（好加事件）(ischild)=' + js[i].ischild + '\n显示方式(1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框)(type)=' + js[i].type + '\n是否必填(required)=' + js[i].required + '\n是否有other属性值(isother)=' + js[i].isother + '\n类目选择样式(1：文本 2：图片 3：图文；)(style)=' + js[i].style + '\n属性的属性值是否可以自定义修改(defined):' + js[i].defined + '">' + js[i].nameCn + '(' + js[i].name + ')：</td><td>' + this.b01(js[i].js, js[i].ischild, js[i].type, js[i].nameCn, js[i].cateId) + '</td>\
			</tr>';
        }
        str = '<div class="panel-heading">' + arr[1] + '</div><table class="table table-hover align-middle"><tbody>' + str + '</tbody></table>'
        $("#attributes" + arr[0] + " td").html(str)
    }
}
fun.a01();