'use strict';
let F3 =
{
    obj: { Group: [] },
    a01: function () {
        let This = fun.obj.F3[0], freid = fun.obj.F3[1], shippingTempId = fun.obj.F3[2]
        this.obj.Group = fun.obj.F3[3]
        this.a02(This, freid, shippingTempId)
    },
    a02: function (This, freid, shippingTempId) {
        This.html("查看类目-刷新");
        if ($("#__" + freid).length) {
            $("#__" + freid).html("正在获取【类目】数据...");
        }
        else {
            This.parent().parent().parent().parent().after("<tr id=\"__" + freid + "\"><td colspan=\"10\">正在获取【类目】数据...</td></tr>")
        }
        let str = '\
        [\
        <r:freight db="sqlite.aliexpress" size=1 where=" where @.freid=\''+ freid + '\'">\
          <:shopid/>\
          <r:pro db="sqlite.aliexpress" size=200 right="distinct" where=" where @.shopid=<:shopid/> and @.hide=0">\
          ,<:type/>\
          </r:pro>\
        </r:freight>\
        ]'
        Tool.ajax.a01(str, 1, [freid, this.a03, this, shippingTempId]);
    },
    a03: function (arr, arr2) {
        let html = '{"shopid":' + arr[0] + '}';
        for (let i = 1; i < arr.length; i++) {
            html += ',\
              {\
              "type":"'+ arr[i] + '",\
              "ali":"\
                <r:type db="sqlite.aliexpress" where=" where @.fromid=\''+ arr[i] + '\'" size=1>\
                  <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>\
                    <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>\
                      <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>\
                        <:name tag=js/>&nbsp;&gt;&nbsp;\
                      </r:type>\
                      <:name tag=js/>&nbsp;&gt;&nbsp;\
                    </r:type>\
                    <:name tag=js/>&nbsp;&gt;&nbsp;\
                  </r:type>\
                  <:name tag=js/>\
                </r:type>",\
              <r:typebind db="sqlite.aliexpress" size=1 where=" where @.type='+ arr[i] + '">\
              "dhbind":"<:type/>",\
              "dh":"\
                  <r:type db="sqlite.dhgate" where=" where @.fromid=\'<:dhtype/>\'" size=1>\
                    <r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
                      <r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
                        <r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
                          <:name tag=js/>&nbsp;&gt;&nbsp;\
                        </r:type>\
                        <:name tag=js/>&nbsp;&gt;&nbsp;\
                      </r:type>\
                      <:name tag=js/>&nbsp;&gt;&nbsp;\
                    </r:type>\
                    <:name tag=js/>\
                  </r:type>",\
                </r:typebind>\
                "count1":<.Db(sqlite.aliexpress,select count(1) as total from @.proupdhgate where @.upFreightId=\''+ arr2[1] + '\' and @.upGroupId=\'' + this.b01(arr[i]) + '\' and @.upuserid=' + obj.arr[4] + ',count)/>,\
                "count2":<.Db(sqlite.aliexpress,select count(1) as total from @.pro where @.shopid=\''+ arr[0] + '\' and @.type=\'' + arr[i] + '\' and @.hide=0 and not EXISTS (select 0 from @.proupdhgate where @.proupdh.@.proid=@.pro.@.proid and @.pro.@.shopid=\'' + arr[0] + '\' and @.pro.@.type=\'' + arr[i] + '\' and @.pro.@.hide=0),count)/>,\
                "count3":<.Db(sqlite.aliexpress,select count(1) as total from @.pro where @.shopid=\''+ arr[0] + '\' and @.type=\'' + arr[i] + '\' and @.hide=0,count)/>\
              }'
        }
        Tool.ajax.a01('[' + html + ']', 1, this.a04, this, arr2);
    },
    a04: function (arr, arr2) {
        let html = "", td1 = "", td1Arr = [];
        for (let i = 1; i < arr.length; i++) {
            if (this.b01(arr[i].type) == "") { td1 = "未创建"; td1Arr.push(arr[i].type); } else { td1 = ""; }
            arr[i].ali = arr[i].ali.replace(/\s+/g, '')
            if (arr[i].dh) { arr[i].dh = arr[i].dh.replace(/\s+/g, ''); }
            else { arr[i].dh = ""; arr[i].dhbind = ""; }
            html += '\
            <tr>\
                <td>'+ i + '</td>\
                <td class="left">'+ arr[i].ali + '</td>\
                <td class="left p-0">\
                <button type="button" class="btn btn-outline-secondary" onclick="F3.c01(\''+ arr[i].type + '\',\'' + arr[i].dhbind + '\');" id="alitype' + arr[i].type + '" title="点击【绑定类目】">' + (arr[i].dh ? arr[i].dh : '未绑定') + '</button>\
                </td>\
                <td>'+ arr[i].count1 + '</td>\
                <td>'+ arr[i].count2 + '</td>\
                <td>'+ arr[i].count3 + '</td>\
                <td>'+ td1 + '</td>\
                <td colspan="2" style="padding-left: 30px;position: relative;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-'+ arr[i].type + '"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu" aria-labelledby="dropdown-'+ arr[i].type + '">\
                <li><a class="dropdown-item pointer" onclick="fun.i01($(this),\''+ arr[i] + '\')">设置该类【需要更新】</a></li>\
                <li><a class="dropdown-item pointer" onclick="F3.c02($(this),\''+ arr[i].type + '\',\'' + arr2[0] + '\')">删除</a></li>\
                </ul>\
                </td>\
            </tr>'
        }
        html = '\
		<td colspan="10">\
        <table class="table table-hover m-2 shadow bg-white rounded">\
          <thead class="table-light">\
          <tr>\
            <th>编号</th>\
            <th class="left">ALI类目</th>\
            <th class="left">绑定DH后类目</th>\
            <th>已上传</th>\
            <th>可上传</th>\
            <th>组内数量</th>\
            <th>创建分组</th>\
            <th style="padding-left: 30px;position: relative;">\
			    <button title=\"操作\" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-c05"><div></div><div></div><div></div></button>\
			    <ul class="dropdown-menu" aria-labelledby="dropdown0">\
				    <li><a class="dropdown-item pointer" onclick=\"fun.c05(\''+ td1Arr.join(",") + '\');\">*一键创建分组（' + (td1Arr.length) + '）</a></li>\
			    </ul>\
            </th>\
          </tr>\
          </thead>\
          <tbody>'+ html + '</tbody>\
        </table>\
        </td>'
        $("#__" + arr2[0]).html(html);
    },
    b01: function (aliType) {
        let arr = this.obj.Group, groupId = "";
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].remark == aliType) { groupId = arr[i].groupId; break; }
            for (let j = 0; j < arr[i].itemChildGroupList.length; j++) {
                if (arr[i].itemChildGroupList[j].remark == aliType) { groupId = arr[i].itemChildGroupList[j].groupId; break; }
            }
        }
        return groupId;
    },
    c01: function (type, dhbind) {
        obj.F4 = [type, dhbind];
        Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改/查看类目_绑定DH后类目.js']);
    },
    c02: function (This, type, freid) {
        let str = '<r:freight db="sqlite.aliexpress" size=1 where=" where @.freid=\'' + freid + '\'"><r: db="sqlite.dhgate">delete from @.pro where @.shopid=<:shopid/> and @.type=\'' + type + '\' and @.from=\'aliexpress\'</r:></r:freight>'
        alert("没做" + str)
        //Tool.ajax.a01(str,1,this.c03,this,This);
    },
    c03: function (txt, This) {
        if (txt == "") {
            This.parent().parent().parent().remove();
        }
        else { alert("出错:" + txt); }
    },
}
F3.a01();