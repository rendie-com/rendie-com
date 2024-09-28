'use strict';
var fun =
{
  a01: function () {
    obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
    //obj.params.id   
    //obj.params.return
    this.a02()
  },
  a02: function () {
    let data = [{
      action: "sqlite",
      database: "tool",
      sql: "update @.fav set @.sort=@.sort+1 where @.id=" + obj.params.id,
    }, {
      action: "sqlite",
      database: "tool",
      sql: "select " + Tool.fieldAs("name,note,url,ico,sort,id,type") + " FROM @.fav where @.id=" + obj.params.id,
    }]
    Tool.ajax.a01(data, this.a03, this)
  },
  a03: function (t) {
    let oo = t[1][0]
    let html = Tool.header(obj.params.return, "工具 &gt; 网址导航 &gt; 修改") + '\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
          <tr>\
            <td class="w100 right">图标：</td>\
            <td><input type="text" value="'+ oo.ico + '" class="form-control" onblur="fun.c01($(this),\'ico\')"/></td>\
          </tr>\
          <tr>\
            <td class="right"><a href="'+ oo.url + '" target="_blank">网址</a>：</td>\
            <td><input type="text" value="'+ oo.url + '" class="form-control" onblur="fun.c01($(this),\'url\')"/></td>\
          </tr>\
          <tr>\
          <td class="right">网址说明：</td>\
          <td><input type="text" value="'+ oo.name + '" class="form-control" class="form-control" onblur="fun.c01($(this),\'name\')"/></td>\
          </tr>\
          <tr>\
            <td class="right">分类：</li>\
            <td><select class="form-select w200" onchange="fun.c03($(this),this.options[this.selectedIndex].value)">'+ this.b01(oo.type) + '</select></td>\
          </tr>\
          <tr>\
            <td class="right">排序：</td>\
            <td><input type="text" value="'+ oo.sort + '" class="form-control w70 center" onblur="fun.c01($(this),\'sort\')"/></td>\
          </tr>\
          <tr>\
            <td class="right">备注：</td>\
            <td><textarea rows="30" class="form-control" onblur="fun.c01($(this),\'note\')">'+ oo.note + '</textarea></td>\
          </tr>\
        </tbody>\
      </table>\
    </div>'
    Tool.html(null, null, html)
  },
  b01: function (type) {
    let str = ''
    for (let i = 0; i <= 20; i++) {
      str += '<option value="' + i + '" ' + (type == "" + i ? ' selected="selected"' : "") + '>' + this.b02(i) + '</option>'
    }
    return str
  },
  b02: function (type) {
    let str = "";
    switch (type) {
      case 0: str = "其它"; break;
      case 1: str = "国内电商"; break;
      case 2: str = "国外电商"; break;
      case 3: str = "C#语言"; break;
      case 4: str = "航模"; break;
      case 5: str = "资金"; break;
      case 6: str = "邮箱"; break;
      case 7: str = "网站模板"; break;
      case 8: str = "抠图网站"; break;
      case 9: str = "服务器相关"; break;
      case 10: str = "数据库"; break;
      case 11: str = "游戏"; break;
      case 12: str = "API开放平台"; break;
      case 13: str = "手机"; break;
      case 14: str = "视频网站"; break;
      case 15: str = "操作系统"; break;
      case 16: str = "应用软件"; break;
      case 17: str = "前端开发"; break;
      case 18: str = "后端开发"; break;
      case 19: str = "软件开发"; break;
      case 20: str = "硬件开发"; break;
      default: str = "未知：" + type;
    }
    return str;
  },
  c01: function (This, L, V) {
    let val = This.val();
    if (val != V && !This.attr("disabled")) {
      This.attr("disabled", true);
      let data = [{
        action: "sqlite",
        database: "tool",
        sql: "update @.fav set @." + L + "=" + Tool.rpsql(val) + " where @.id=" + obj.params.id,
      }]
      Tool.ajax.a01(data, this.c02, this, This);
    }
  },
  c02: function (t, This) {
    if (t[0].length == 0) {
      This.attr("disabled", false);
    }
    else {
      Tool.pre("出错：" + t);
    }
  },
  c03: function (This, val) {
    This.attr("disabled", true);
    let data = [{
      action: "sqlite",
      database: "tool",
      sql: "update @.fav set @.type=" + val + " where @.id=" + obj.params.id,
    }]
    Tool.ajax.a01(data, this.c02, this, This);
  },
}
$(function () {
  fun.a01();
})
