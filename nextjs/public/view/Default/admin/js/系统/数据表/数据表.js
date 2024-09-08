'use strict';
var fun =
{
    TablePre: "",
    a01: function () {
        let html = '{"ConnType":"<.Config(ConnType)/>"}'
        Tool.ajax.a01(html, 1, this.a02, this);
    },
    a02: function (oo) {
        let html = '[{"TablePre":"<.Config(TablePre)/>"'
        if (oo.ConnType == "access") {
            html += '\
      <r:MSysObjects pre="" size=300 where=" where Type=1">,\
      {\
          "crdate":"[MSysObjects:DateCreate]",\
          "update":"[MSysObjects:DateUpdate]",\
          "name":"[MSysObjects:name]"\
      }\
      </r:MSysObjects>]'
        }
        else {
            html += '\
      <r:sysobjects size=300 where=" where xtype=\'u\'">,\
        {\
          "crdate":"[sysobjects:crdate]",\
          "update":"[sysobjects:refdate]",\
          "name":"[sysobjects:name]"\
        }\
      </r:sysobjects>]'
        }
        Tool.ajax.a01(html, 1, this.a03, this);
    },
    a03: function (oo) {
        this.TablePre = oo[0].TablePre
        oo.shift()
        mssql = Tool.objsort(mssql, "name");
        let html = '', arr = [];
        for (let i = 0; i < mssql.length; i++) {
            html += '\
      <tr class="list-group-item-action">\
        <td><a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),\''+ this.TablePre + mssql[i].name + '\')"></a> ' + (i + 1) + '</td>\
        <td>' + (mssql[i].db ? mssql[i].db : "默认") + '</td>\
        <td class="left">' + this.TablePre + mssql[i].name + '</td>\
        <td class="left">'+ mssql[i].des + '</td>\
        <td></td>\
        <td></td>\
        <td></td>\
      </ul>'
            //this.b01(oo[i].name)
            //oo[i].crdate
            //oo[i].update
        }
        html = '\
    <header class="panel-heading">数据表</header>\
    <div class="p-2">\
      <table class="table center">\
        <thead class="table-light">\
          <tr>\
            <th class="w70">编号</th>\
            <th class="w200">数据库</th>\
            <th class="left">表名</th>\
            <th class="left">说明</th>\
            <th class="w160">创建时间</th>\
            <th class="w160">更新时间</th>\
            <th>操作</th>\
          </tr>\
        </thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html);
    },
    b01: function (name) {
        let val = "<font color=red>该表不存在</font>";
        switch (name) {
            case "MSysACEs":
            case "MSysAccessStorage":
            case "MSysNameMap":
            case "MSysNavPaneGroupCategories":
            case "MSysNavPaneGroupToObjects":
            case "MSysNavPaneGroups":
            case "MSysNavPaneObjectIDs":
            case "MSysNavPaneObjectIDs":
            case "MSysQueries":
            case "MSysObjects":
            case "MSysRelationships": val = "access系统表"; break;
            default:
                for (let i = 0; i < mssql.length; i++) {
                    if (mssql[i].name.indexOf("|") != -1) {
                        let arr = mssql[i].name.split("|")
                        for (let j = 1; j <= arr[1]; j++) {
                            if ((this.TablePre + arr[0] + j).toLowerCase() == name.toLowerCase()) {
                                val = mssql[i].des; break; break;
                            }
                        }
                    }
                    else {
                        if (this.TablePre + mssql[i].name.toLowerCase() == name.toLowerCase()) {
                            val = mssql[i].des; break;
                        }
                    }
                }
        }
        return val
    },
    c01: function (This, name) {
        name = name.replace("|", "_")
        if (This.attr("Class") == "Mo MoB") { $("#Mo" + name).hide(); This.attr("Class", "Mo MoA"); }
        else {
            This.attr("Class", "Mo MoB")
            if ($("#Mo" + name).length) { $("#Mo" + name).show(); }
            else {
                //////////////////////////////////////////
                let table = [], arr = [];
                for (let i = 0; i < mssql.length; i++) {
                    /*if(mssql[i].name.indexOf("|")!=-1)
                    {
                      arr=mssql[i].name.split("|")
                      for(let j=1;j<=arr[1];j++)
                      {
                        if(name==(this.TablePre+arr[0]+j))
                        {
                          table=mssql[i].table;break;break;
                        }
                      }
                    }
                    else
                    {
                    }*/
                    if (name == this.TablePre + mssql[i].name.replace("|", "_")) {
                        table = mssql[i].table; break;
                    }
                }
                /////////////////////////
                let str = ''
                for (let i = 0; i < table.length; i++) {
                    //if(table[i].name!="id") aa.push(this.TablePre +table[i].name)
                    str += '\
          <tr>\
            <td>' + this.TablePre + table[i].name + '</td>\
            <td>' + table[i].type + '</td>\
            <td>' + table[i].default + '</td>\
            <td>\
              <div class="form-check form-check-inline">\
                <input type="checkbox" class="form-check-input" value="1" name="update' + table[i].name + '" id="edit' + table[i].name + '1">\
                <label class="form-check-label" for="edit' + table[i].name + '1">改</label>\
              </div>\
              <div class="form-check form-check-inline">\
                <input type="checkbox" class="form-check-input" value="1" name="select' + table[i].name + '" id="select' + table[i].name + '2">\
                <label class="form-check-label" for="select' + table[i].name + '2">查</label>\
              </div>\
            </td>\
            <td class="left">' + table[i].des + '</td>\
          </tr>'
                }
                str = '\
        <tr id="Mo' + name + '">\
          <td colspan="5" class="shadow bg-white rounded">\
          <header class="panel-heading left">'+ name + '</header>\
          <div class="p-2">\
            <table class="table table-hover mb-0 center">\
            <thead class="table-light">\
              <tr>\
                <th class="w200 center">字段</th>\
                <th class="w300">类型</th>\
                <th class="w100">默认值</th>\
                <th class="w130">匿名权限</th>\
                <th class="left">说明</th>\
              </tr>\
            </thead>\
            <tbody>'+ str + '</tbody>\
            </table>\
          </div>\
          </td>\
        </tr>'
                This.parent().parent().after(str)
            }
        }
    }
}
fun.a01();