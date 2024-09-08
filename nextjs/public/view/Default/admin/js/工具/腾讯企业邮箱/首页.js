'use strict';
var fun =
{
  a01: function () {
    //obj.params.jsFile     选择JS文件 
    obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
    this.a02();
  },
  a02: function () {
    let data = [{
      action: "sqlite",
      database: "tool",
      sql: "select count(1) as total FROM @.exmail",
    }, {
      action: "sqlite",
      database: "tool",
      sql: "select " + Tool.fieldAs("sort,addtime,username,touse,alias,note,id") + " FROM @.exmail  order by @.sort asc,@.id asc" + Tool.limit(10, obj.params.page, "sqlite"),
    }]
    Tool.ajax.a01(data, this.a03, this);
  },
  a03: function (t) {
    let html = "", arr = t[1]
    for (let i = 0; i < arr.length; i++) {
      arr[i].alias = arr[i].alias ? arr[i].alias : '';
      arr[i].touse = arr[i].touse ? arr[i].touse : '';
      arr[i].note = arr[i].note ? arr[i].note : '';
      html += '\
      <tr>\
        <td>'+ arr[i].sort + '</td>\
        <td style="padding-left: 30px;position: relative;">\
          <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu">\
          <li onClick="Tool.openR(\'?jsFile=js02&id='+ arr[i].id + '\')"><a class="dropdown-item pointer">修改</a></li>\
          </ul>\
        </td>\
        <td class="left">* <a href="javascript:;" onclick="Tool.SignIn.a01('+ arr[i].id + ',$(this).parent())" title="点击登陆">' + arr[i].username + '</a></td>\
        <td class="left">'+ arr[i].alias.split(",").join("<br/>") + '</td>\
        <td class="left">'+ arr[i].touse.split(",").join("<br/>") + '</td>\
        <td class="left">'+ arr[i].note + '</td>\
        <td>'+ Tool.js_date_time2(arr[i].addtime, "/") + '</td>\
      </tr>'
    }
    html = '\
        <header class="panel-heading">腾讯企业邮箱</header>\
        <div class="p-2">\
          <table class="table table-hover align-top center">\
            <thead class="table-light">'+ this.b01() + '</thead>\
            <tbody>'+ html + '</tbody>\
          </table>' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
        </div>'
    Tool.html(null, null, html)
  },
  b01: function () {
    return '\
        <tr>\
          <th class="w60">排序</th>\
          <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="fun.c01()">生成197个成员</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js01\')">*获取成员并修改密码</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js03\')">*设置成员别名</a></li>\
            </ul>\
          </th>\
          <th class="w200 left">成员</th>\
          <th class="w200 left">别名</th>\
          <th class="w300 left">在哪里被使用过</th>\
          <th class="left">备注</th>\
          <th class="w170">添加时间</th>\
        </tr>'
  },
  c01: function () {
    //Math.random().toString(36)       //JS产生随机10位由字母数字混合的字符串
    let arr = ["邮箱账号(必填), 邮箱密码(必填), 编号, 名字, 联系电话, 部门(部门层级用斜杠分隔), 性别, 职务, 手机, 生日, 强制安全登陆模式"]
    for (let i = 1; i < 198; i++) {
      let name = ""
      if (i < 10) {
        name = "00" + i
      }
      else if (i < 100) {
        name = "0" + i
      }
      else {
        name = "" + i
      }
      //注：名字用“i”,是用来要排序的。
      arr.push("r" + name + "@rendie.com,A" + Math.random().toString(36) + ", " + name + ", " + i + ", 020-12345678-123, 腾讯/广州分公司,男,项目经理,13900000000,1984-01-01,关闭")
    }
    Tool.at(arr.join("\n"))
  },
}
fun.a01();