'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : "";
        obj.params.type = obj.params.type ? obj.params.type : "现货类目";//【1688】现货类目 或 加工定制类目
        this.a02()
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "1688/类目/" + obj.params.type,
            sql: "select " + Tool.fieldAs("fromID,name,isleaf") + " FROM @.table where @.upid=0 order by @.sort asc",
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html2 = "", arr = t[0];
        for (let i = 0; i < arr.length; i++) {
            html2 += '\
            <tr>\
                <td class="center">'+ (i+1) + '</td>\
                <td><a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),\''+ arr[i].fromID + '\')"></a> ' + arr[i].fromID + '</td>\
                <td>'+ arr[i].name + '</td>\
            </tr>'
        }
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main(\'?jsFile='+ obj.params.jsFile + '&type=现货类目\')"' + (obj.params.type == "现货类目" ? ' class="active"' : '') + '>【1688】现货类目</div>\
            <div onclick="Tool.main(\'?jsFile='+ obj.params.jsFile + '&type=加工定制类目\')"' + (obj.params.type == "加工定制类目" ? ' class="active"' : '') + '>加工定制类目</div>\
        </header>\
        <div class="p-2">\
            <div class="m-2 p-2">为什么会有俩个类目？答：这俩个类目也没什么区别，采集现货类目会报错，可能要删除，但1688的俩个类目，我也没找到区别在哪里。（在使用过成中请用【加工定制类目】，因为没有报错。）</div>\
            <table class="table table-hover align-middle">\
                <thead class="table-light">\
                    <tr>\
                        <th class="w70" style="padding-left:30px;position: relative;">\
                            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
						    <ul class="dropdown-menu">\
							    <li onClick="Tool.openR(\'?jsFile=js01&type='+ obj.params.type + '\')"><a class="dropdown-item pointer">*采集类目</a></li>\
							    <li onClick="Tool.open5(\'?jsFile=js02&type='+ obj.params.type + '\')"><a class="dropdown-item pointer">*采集类目属性</a></li>\
                                <li onClick="Tool.openR(\'?jsFile=js03&table=category'+ (obj.params.type == "现货类目" ? 0 : 1) + '&database=1688&newdatabase=1688/类目/' + obj.params.type + '\');"><a class="dropdown-item pointer">把旧类目表复制到新类目表</a></li>\
                                <li onClick="Tool.openR(\'?jsFile=js03&table=attr'+ (obj.params.type == "现货类目" ? 0 : 1) + '&database=1688&newdatabase=1688/类目/' + obj.params.type + '属性\');"><a class="dropdown-item pointer">把旧类目属性表复制到新类目属性表</a></li>\
						    </ul>\
                            编号\
                        </th>\
                        <th class="w200 center">来源ID</th>\
                        <th>分类名称</th>\
                    </tr>\
                </thead>\
                <tbody>'+ html2 + '</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    ///////////////////////////////////////////////
    c01: function (This, fromID) {
        if (This.attr("Class") == "Mo MoB") {
            $(".Mo" + fromID).hide();
            This.attr("Class", "Mo MoA");
        }
        else {
            This.attr("Class", "Mo MoB")
            if ($(".Mo" + fromID).length) { $(".Mo" + fromID).show(); }
            else {
                This.parent().parent().after('<tr><td class="Mo' + fromID + ' p-0" colspan="3"><img height="30" src="/' + o.path + 'admin/img/loading_42x42.gif"/></td></tr>');
                let m1 = parseInt(This.css("margin-left")) + 20;
                this.c02(fromID, m1)
            }
        }
    },
    c02: function (fromID, m1) {
        let str = '[0\
    	<r:category'+ obj.params.type + ' db="sqlite.1688" where=" where @.upid=\'' + fromID + '\' order by @.sort asc" size=50>,\
        {\
            "isleaf":"<:isleaf/>",\
            "fromID":"<:fromID/>",\
            "name":"<:name tag=js/>"\
        }\
        </r:category'+ obj.params.type + '>]'
        Tool.ajax.a01(str, 1, this.c03, this, [fromID, m1]);

    },
    c03: function (arr, oo) {
        let str = '', li1 = '', li2 = '';
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].isleaf == "0") {
                li1 = '<a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),\'' + arr[i].fromID + '\')"></a>';
                li2 = ''
            }
            else {
                li1 = '<a class="Mo"></a>';
                li2 = '<button type="button" class="btn btn-outline-secondary btn-sm" onclick="fun.c04($(this),\'' + arr[i].fromID + '\',decodeURIComponent(\'' + encodeURIComponent(arr[i].name) + '\'))" style="margin-left:10px;">查看属性</button>'
            }
            str += '\
            <tr>\
                <td class="w50 center">'+ i + '</td>\
                <td class="w200">'+ li1 + ' ' + arr[i].fromID + '</td>\
                <td class="p-0">'+ arr[i].name + li2 + '</td>\
            </tr>'
        }
        if (str == "") {
            str = '没有子类';
        }
        else {
            str = '<table class="table table-hover mb-0 align-middle" style="margin-left:' + oo[1] + 'px;"><tbody>' + str + '</tbody></table>'
        }
        $(".Mo" + oo[0]).html(str)
    },
    c04: function (This, fromID, title) {
        if ($("#attributes" + fromID).length == 0) {
            let str = '{\
            <r:attr'+ obj.params.type + ' db="sqlite.1688" where=" where @.catId=\'' + fromID + '\'" size=1>\
                 "catId":<:catId/>,\
                 "json":<:json tag=0/>\
            </r:attr'+ obj.params.type + '>}'
            This.parent().parent().after('<tr id="attributes' + fromID + '"><td class="shadow bg-white rounded" colspan="3"><img src="/' + o.path + 'admin/img/loading_42x42.gif"/> 正在加载【属性】。。。</td></tr>')
            Tool.ajax.a01(str, 1, this.c05, this, [fromID, title]);
        }
        else if ($("#attributes" + fromID).is(":visible")) {
            $("#attributes" + fromID).hide()
        }
        else { $("#attributes" + fromID).show() }
    },
    c05: function (js, arr) {
        let str = '<pre>' + JSON.stringify(js, null, 2) + '</pre>';
        str = '<div class="panel-heading">' + arr[1] + '</div><table class="table table-hover align-middle"><tbody><tr><td>' + str + '</td></tr></tbody></table>'
        $("#attributes" + arr[0] + " td").html(str)
    }
}
fun.a01();
//////////////////////////////////////////////
// b01: function (oo, ischild, type, nameCn, cateId) {
//     let str = ""
//     if (type == "4" || type == "5") { str = '<input type="text" class="form-control form-control-sm">'; }
//     else if (type == "2") {
//         str = '<select class="form-select"><option>请选择' + nameCn + '</option>'
//         for (let i = 0; i < oo.length; i++) { str += '<option title="attrValId:' + oo[i].attrValId + '" value="' + oo[i].attrValId + '">' + oo[i].lineAttrvalNameCn + ' (' + oo[i].lineAttrvalName + ')</option>'; }
//         str += '</select>'
//     }
//     else if (type == "1") {
//         for (let i = 0; i < oo.length; i++) {
//             str += '<div class="form-check form-check-inline">\
//	<input class="form-check-input" type="checkbox" id="attrValId-' + oo[i].attrValId + '">\
//	<label class="form-check-label" for="attrValId-' + oo[i].attrValId + '">' + oo[i].lineAttrvalNameCn + ' (' + oo[i].lineAttrvalName + ')</label></div>';
//         }
//     }
//     else { str = '未知type:' + type; }
//     return str;
// },