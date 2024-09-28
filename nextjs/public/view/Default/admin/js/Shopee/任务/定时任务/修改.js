'use strict';
var fun =
{
  a01: function () {
    //obj.params.jsFile         选择JS文件
    //obj.params.id             ID
    //obj.params.return         返回
    this.a02();
  },
  a02: function () {
    let data = [{
      action: "${default_db}",
      database: "shopee/任务/定时任务",
      sql: "select " + Tool.fieldAs("id,name,jsfile,runtime,cycle,remark,isenable,priority") + " FROM @.table where @.id=" + obj.params.id,
    }]
    Tool.ajax.a01(data, this.a03, this);
  },
  a03: function (t) {
    let oo = t[0][0]
    if (!oo.name) oo.name = "";
    let jsfile = ""; if (oo.jsfile) { jsfile = JSON.stringify(JSON.parse(oo.jsfile), null, 2); }//
    if (!oo.remark) oo.remark = "";
    let html = Tool.header(obj.params.return, "Shopee  &gt; 定时任务 &gt; 修改") + '\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
          <tr>\
          <td class="w200 right">任务名称：</td>\
          <td><input type="text" class="form-control" value="'+ oo.name + '" onblur="fun.c01($(this),\'name\',\'' + oo.name + '\')"></td>\
          <td class="w300">如:定时生成首页</td>\
          </tr>\
          <tr>\
          <td class="right">JS文件地址：</td>\
          <td><textarea rows="5" class="form-control" onblur="fun.c04($(this),\'jsfile\')">' + jsfile + '</textarea></td>\
          <td>json格式如:["admin/js/Shopee/任务/定时任务/启动定时任务/所有任务/保持在线.js"]</td>\
          </tr>\
          <tr>\
          <td class="right">执行周期：</td>\
          <td>\
            <div class="input-group w150">\
            <input class="form-control center" type="text" value="' + oo.cycle + '" onblur="fun.c01($(this),\'cycle\',\'' + oo.cycle + '\')">\
            <span class="input-group-text">分钟</span>\
            </div>\
          </td>\
          <td></td>\
          </tr>\
          <tr>\
          <td class="right">排序：</td>\
          <td><input class="form-control w150 center" type="text" value="' + oo.priority + '" onblur="fun.c01($(this),\'priority\',\'' + oo.priority + '\')"></td>\
          <td>当有多个任务时，值越小优先运行。</td>\
          </tr>\
          <tr>\
          <td class="right">是否启用：</td>\
          <td>\
          <div class="form-check form-switch">\
          <input class="form-check-input" type="checkbox" '+ (oo.isenable == 1 ? 'checked' : '') + ' onclick="fun.c03($(this),\'isenable\')">\
          </div>\
          </td>\
          <td></td>\
          </tr>\
          <tr>\
          <td class="right">任务说明：</td>\
          <td><textarea rows="5" class="form-control" onblur="fun.c01($(this),\'remark\')">' + oo.remark + '</textarea></td>\
          <td></td>\
          </tr>\
        </tbody>\
      </table>\
    </div>'
    Tool.html(null, null, html);
  },
  //////////////////////////////////////////////
  c01: function (This, L, V) {
    let val = This.val();
    if (val != V && !This.attr("disabled")) {
      This.attr("disabled", true);
      let data = [{
        action: "${default_db}",
        database: "shopee/任务/定时任务",
        sql: "update @.table set @." + L + "='" + val + "' where @.id=" + obj.params.id,
      }]
      Tool.ajax.a01(data, this.c02, this, This);
    }
  },
  c02: function (t, This) {
    if (t[0].length == 0) {
      This.attr("disabled", false);
    }
    else {
      Tool.pre(["出错：", t]);
    }
  },
  c03: function (This, L) {
    if (!This.attr("disabled")) {
      This.attr("disabled", true);
      let data = [{
        action: "${default_db}",
        database: "shopee/任务/定时任务",
        sql: "update @.table set @." + L + "='" + (This.is(":checked") ? 1 : 0) + "' where @.id=" + obj.params.id,
      }]
      Tool.ajax.a01(data, this.c02, this, This);
    }
  },
  c04: function (This, L) {
    let val = This.val();
    if (!This.attr("disabled") && val) {
      This.attr("disabled", true);
      try {
        let json = JSON.parse(val);
        let data = [{
          action: "${default_db}",
          database: "shopee/任务/定时任务",
          sql: "update @.table set @." + L + "=" + Tool.rpsql(JSON.stringify(json)) + " where @.id=" + obj.params.id,
        }]
        Tool.ajax.a01(data, this.c02, this, This);
      } catch (error) {
        Tool.pre(["JSON格式不对", val]);
      }
    }
  },
}
fun.a01();