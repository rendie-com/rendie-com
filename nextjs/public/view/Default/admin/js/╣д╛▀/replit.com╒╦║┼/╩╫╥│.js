'use strict';
var fun =
{
  a01: function () {
    //obj.params.jsFile         选择JS文件
    obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
    obj.params.serverLocation = obj.params.serverLocation ? obj.params.serverLocation : ''//服务器位置
    this.a02();
  },
  a02: function () {
    let data = [{
      action: "sqlite",
      database: "tool",
      sql: "select count(1) as total FROM @.replit" + this.b03(),
    }, {
      action: "sqlite",
      database: "tool",
      sql: "select " + Tool.fieldAs("sort,outboundSize,addtime,itemCount,username,name,loginmode,serverLocation,note,id") + " FROM @.replit" + this.b03() + " order by @.sort asc,@.id asc" + Tool.limit(20, obj.params.page),
    }]
    Tool.ajax.a01(data, this.a03, this)
  },
  a03: function (t) {
    let html = "", url1, url2, arr = t[1]
    for (let i = 0; i < arr.length; i++) {
      url1 = "https://" + arr[i].serverLocation.replace(" ", "") + "--" + arr[i].name + ".repl.co/v.txt"
      url2 = "https://" + arr[i].name + ".repl.co/admin"
      html += '\
            <tr>\
            <td>'+ i + '</td>\
            <td>'+ arr[i].sort + '</td>\
		    <td style="padding-left: 30px;position: relative;">\
			    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
			    <ul class="dropdown-menu">\
				    <li onClick="Tool.openR(\'?jsFile=js02&id='+ arr[i].id + '\')"><a class="dropdown-item pointer">修改</a></li>\
				    <li onClick="Tool.main(\'?jsFile=js06&id='+ arr[i].id + '\')"><a class="dropdown-item pointer">查看Xray配置</a></li>\
			    </ul>\
		    </td>\
            <td class="left">* <a href="javascript:;" onclick="Tool.SignIn.a01('+ arr[i].id + ',$(this).parent())" title="点击登陆">' + arr[i].username + '</a>' + (arr[i].loginmode ? "（" + arr[i].loginmode + "）" : "") + '</td>\
            <td><a href="'+ url2 + '" title="点击打开rendie网站" target="_blank">' + arr[i].name + '</a></td>\
            <td><a href="'+ url1 + '" title="点击打开Xray网站" target="_blank">' + arr[i].serverLocation + '</a></td>\
            <td>'+ arr[i].outboundSize.toFixed(1) + ' GB</td>\
            <td>'+ arr[i].itemCount + '</td>\
            <td class="left">'+ arr[i].note + '</td>\
            <td>'+ Tool.js_date_time2(arr[i].addtime, "/") + '</td>\
            </tr>'
    }
    html = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
          <table class="table table-hover align-middle center">\
            <thead class="table-light">'+ this.b01() + '</thead>\
            <tbody>'+ html + '</tbody>\
          </table>' + Tool.page(t[0][0].total, 20, obj.params.page) + '\
        </div>'
    Tool.html(null, null, html)
  },
  b01: function () {
    return '\
        <tr>\
          <th class="w50">编号</th>\
          <th class="w50">排序</th>\
          <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js01\')" title="用【腾讯企业邮箱】注册">*企业邮箱注册账号</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js03\')" title="包括【名称】【服务器位置】【已出站】">*同步信息</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js05\')">*安装Xray</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js08\')">*修复Xray</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js09\')">从github.com获取已授权账号</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js10\')">部署rendie网站</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js11\')">修复rendie网站</a></li>\
            </ul>\
          </th>\
          <th class="w300 left">用户名</th>\
          <th class="w100">名称</th>\
          <th class="p-0 w130">'+ this.b02("服务器位置") + '</th>\
          <th class="w100">已出站</th>\
          <th class="w70">项目数</th>\
          <th class="left">备注</th>\
          <th class="w170">添加时间</th>\
        </tr>'
  },
  b02: function (name) {
    return '\
        <select onchange="Tool.open(5,this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">'+ name + '</option>\
            <option value="1">Asia</option>\
            <option value="2">North America</option>\
        </select>'
  },
  b03: function () {
    let arr = [];
    if (obj.params.serverLocation) {
      switch (obj.params.serverLocation) {
        case "1": arr.push("@.serverLocation='Asia'"); break;//商品编码
        case "2": arr.push("@.serverLocation='North America'"); break;//DH商品ID
      }
    }
    return (arr.length == 0 ? "" : " where " + arr.join(" and "));
  }
}
fun.a01();