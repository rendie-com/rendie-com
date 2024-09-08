'use strict';
let F4 =
{
    a01: function () {
        let txt = '\
    <r:type db="sqlite.aliexpress" where=" where @.fromid=\''+ obj.F4[0] + '\'" size=1>\
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
    </r:type>'
        Tool.ajax.a01(txt, 1, this.a02, this)
    },
    a02: function (t) {
        obj.F4.push(t)
        let arr = t.split("&nbsp;&gt;&nbsp;"), txt
        for (let i = 0; i < arr.length; i++) {
            arr[i] = "@.name='" + (Tool.Trim(arr[i]).replace(/'/g, "''")) + "'";
        }
        txt = '\
    [0\
    <r:type db="sqlite.dhgate" where=" where '+ arr.join(" or ") + '" size=200>,"<:fromid/>"</r:type>\
    ]'
        Tool.ajax.a01(txt, 1, this.a03, this, " ")
    },
    a03: function (arr, key) {
        let str = "[]";
        for (let i = 1; i < arr.length; i++) {
            str += ',["' + arr[i] + '","'
            if (arr[i].length == 3) {
                str += '<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i] + '\'" size=1><:name tag=js/></r:type>'
            }
            else if (arr[i].length == 6) {
                str += '<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i].substr(0, 3) + '\'" size=1><:name tag=js/></r:type>&nbsp;&gt;&nbsp;<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i] + '\'" size=1><:name tag=js/></r:type>';
            }
            else if (arr[i].length == 9) {
                str += '<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i].substr(0, 3) + '\'" size=1><:name tag=js/></r:type>&nbsp;&gt;&nbsp;<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i].substr(0, 6) + '\'" size=1><:name tag=js/></r:type>&nbsp;&gt;&nbsp;<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i] + '\'" size=1><:name tag=js/></r:type>';
            }
            else if (arr[i].length == 12) {
                str += '<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i].substr(0, 3) + '\'" size=1><:name tag=js/></r:type>&nbsp;&gt;&nbsp;<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i].substr(0, 6) + '\'" size=1><:name tag=js/></r:type>&nbsp;&gt;&nbsp;<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i].substr(0, 9) + '\'" size=1><:name tag=js/></r:type>&nbsp;&gt;&nbsp;<r:type db="sqlite.dhgate" where=" where @.fromid=\'' + arr[i] + '\'" size=1><:name tag=js/></r:type>';
            }
            else { alert("类目异常：" + arr[i]); }
            str += '"]'
        }
        Tool.ajax.a01(str, 1, this.a04, this, key)
    },
    a04: function (str, key) {
        let bind = obj.F4[1], txt;
        if (bind) { txt = this.b01(bind); }
        else {
            txt = '\
      ,{\
        "fromid":"0",\
        "arr":\
        [{}\
          <r:type db="sqlite.dhgate" where=" where @.upid=\'0\' order by @.sort asc" size=200>\
          ,{"fromid":"<:fromid/>","name":"<:name/>","isleaf":"<:isleaf/>"}\
          </r:type>\
        ]\
      }';
        }
        Tool.ajax.a01('[{"list":[' + str + ']}' + txt + ']', 1, [str, this.a05, this, key])
    },
    a05: function (arr2, arr3) {
        let str = arr3[0], key = arr3[1];
        if (arr2.length == 1 && obj.F4[1])//表示，已绑定了类目，但类目已不存在了，所以改成未绑定。
        {
            obj.F4[1] = false;
            this.a04(str, key)
        }
        else {
            let t1 = ""
            arr2[0].list.sort();
            for (let i = 1; i < arr2[0].list.length; i++) {
                t1 += '<button type="button" class="btn form-control-sm btn-outline-secondary" onclick="F4.c01(\'' + arr2[0].list[i][0] + '\');" title="点击【选中该类目】">' + arr2[0].list[i][1] + '</button> ';
            }
            let arr4 = ['', '', '', '']
            for (let j = 1; j < arr2.length; j++) {
                for (let i = 1; i < arr2[j].arr.length; i++) {
                    arr4[j - 1] += '<option value="' + arr2[j].arr[i].fromid + '" ' + (arr2[j].arr[i].fromid == arr2[j].fromid ? 'selected="selected"' : '') + '>' + (arr2[j].arr[i].isleaf == "True" ? "&nbsp; &nbsp;" : "+") + arr2[j].arr[i].name + '</option>';
                }
            }
            let arr3 = obj.F4[2].replace(/\s+/g, '').split("&nbsp;&gt;&nbsp;")
            for (let i = 0; i < arr3.length; i++) {
                arr3[i] = '<a href="javascript:;" onclick="F4.c07(\'' + arr3[i] + '\');" data-bs-dismiss="modal">' + arr3[i] + '</a>';
            }
            let html = '\
      <div class="Tul border-n">\
        <div class="input-group w200">\
          <input type="text" class="form-select" id="F4searchword" value="'+ key + '">\
          <div class="input-group-append"><button class="btn btn-outline-secondary form-control-sm" type="button" onclick="F4.c07($(\'#F4searchword\').val());" data-bs-dismiss="modal">搜索</button></div>\
        </div>\
      </div>\
      <div class="Tul">'+ t1 + '</div>\
      <ul class="Tul row">\
        <li class="col"><select size="2" class="form-select" style="height:300px" id="prolist1" onChange="F4.c05(this.value,\'2\',\'3,4\')">'+ arr4[0] + '</select></li>\
        <li class="col"><select size="2" class="form-select" style="height:300px" id="prolist2" onChange="F4.c05(this.value,\'3\',\'4\')">'+ arr4[1] + '</select></li>\
        <li class="col"><select size="2" class="form-select" style="height:300px" id="prolist3" onChange="F4.c05(this.value,\'4\',\'\')">'+ arr4[2] + '</select></li>\
        <li class="col"><select size="2" class="form-select" style="height:300px" id="prolist4">'+ arr4[3] + '</select></li>\
      </ul>'
            Tool.Modal('将速卖通类目【 ' + arr3.join("&nbsp;&gt;&nbsp;") + ' 】绑定到敦煌网类目', html, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onClick="F4.c03(\'' + obj.F4[0] + '\');" data-bs-dismiss="modal">确定绑定</button>', 'modal-xl');
        }
    },
    b01: function (bind) {
        let txt = '\
      <r:type db="sqlite.dhgate" where=" where @.fromid=\''+ bind + '\'" size=1>\
        <r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
          <r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
            <r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
              ,{\
              "fromid":"<:fromid/>",\
              "arr":[{}\
              <r:type db="sqlite.dhgate" where=" where @.upid=\'<:upid/>\' order by @.sort asc" size=200>\
              ,{"fromid":"<:fromid/>","name":"<:name tag=js/>","isleaf":"<:isleaf/>"}\
              </r:type>\
              ]}\
            </r:type>\
            ,{\
            "fromid":"<:fromid/>",\
            "arr":[{}\
            <r:type db="sqlite.dhgate" where=" where @.upid=\'<:upid/>\' order by @.sort asc" size=200>\
            ,{"fromid":"<:fromid/>","name":"<:name tag=js/>","isleaf":"<:isleaf/>"}\
            </r:type>\
            ]}\
          </r:type>\
          ,{\
          "fromid":"<:fromid/>",\
          "arr":[0\
          <r:type db="sqlite.dhgate" where=" where @.upid=\'<:upid/>\' order by @.sort asc" size=200>\
          ,{"fromid":"<:fromid/>","name":"<:name tag=js/>","isleaf":"<:isleaf/>"}\
          </r:type>]}\
        </r:type>\
        ,{\
        "fromid":"<:fromid/>",\
        "arr":[0\
        <r:type db="sqlite.dhgate" where=" where @.upid=\'<:upid/>\' order by @.sort asc" size=200>\
        ,{"fromid":"<:fromid/>","name":"<:name tag=js/>","isleaf":"<:isleaf/>"}\
        </r:type>]}\
      </r:type>';
        return txt;
    },
    c01: function (type) {
        let txt = this.b01(type)

        Tool.ajax.a01('[0' + txt + ']', 1, this.c02, this)
    },
    c02: function (arr2) {
        let arr4 = ['', '', '', '']
        for (let j = 1; j < arr2.length; j++) {
            for (let i = 1; i < arr2[j].arr.length; i++) {
                arr4[j - 1] += '<option value="' + arr2[j].arr[i].fromid + '" ' + (arr2[j].arr[i].fromid == arr2[j].fromid ? 'selected="selected"' : '') + '>' + arr2[j].arr[i].name + '</option>';
            }
        }
        $("#prolist1").html(arr4[0])
        $("#prolist2").html(arr4[1])
        $("#prolist3").html(arr4[2])
        $("#prolist4").html(arr4[3])
    },
    c03: function (fromID) {
        let proselected, valid, txt
        for (let i = 4; i > 0; i--) {
            proselected = $("#prolist" + i).find("option:selected").text()
            if (proselected) { valid = $("#prolist" + i).val(); break; }
        }
        if (valid) {
            txt = '\
			  <if Fun(Db(sqlite.dhgate,select top 1 count(1) from @.type where @.fromid=\''+ valid + '\' and @.isleaf=1,count))==0>\
          绑定不成功，请绑定叶子类目\
        <else/>\
          <if Fun(Db(sqlite.dhgate,select top 1 count(1) from @.typebind where @.type='+ fromID + ',count))==0>\
            <r: db="sqlite.dhgate">insert into @.typebind(@.type,@.typebind)values(\''+ fromID + '\',\'' + valid + '\')</r:>绑定成功\
          <else/>\
            <r: db="sqlite.dhgate">update @.typebind set @.typebind=\''+ valid + '\' where @.type=' + fromID + '</r:>绑定修改成功\
          </if>\
        </if>'
            This = $("#alitype" + fromID);
            Tool.ajax.a01(txt, 1, this.c04, this, This);
        } else { alert("选择绑定的分类") }
    },
    c04: function (txt, This) { This.html(txt); },
    c05: function (val, id, celar) {
        if (celar == "3,4") { $("#prolist3,#prolist4").html(""); } else if (celar == "4") { $("#prolist4").html(""); }
        let str = '[0\
        <r:type db="sqlite.dhgate" where=" where @.upid=\''+ val + '\' order by @.sort asc" size=150>\
        ,{"fromid":"<:fromid/>","name":"<:name tag=js/>","enname":"<:enname tag=js/>","isleaf":"<:isleaf/>"}\
        </r:type>]'
        let This = $("#prolist" + id);
        This.html('<option>加载中。。。</option>')
        Tool.ajax.a01(str, 1, this.c06, this, This)
    },
    c06: function (arr, This) {
        let html = ""
        for (let i = 1; i < arr.length; i++) {
            html += '<option value="' + arr[i].fromid + '">' + (arr[i].isleaf == "True" ? "&nbsp;&nbsp;&nbsp;" : "+") + arr[i].name + '</option>';
        }
        This.html(html);
    },
    c07: function (val) {
        val = Tool.Trim(val)
        if (val) {
            let txt = '[0<r:type db="sqlite.dhgate" where=" where @.name like \'%' + val + '%\'" size=200>,"<:fromid/>"</r:type>]'
            Tool.ajax.a01(txt, 1, this.a03, this, val)
        }
        else { alert("请输入搜索关键词"); }
    },
}
F4.a01();