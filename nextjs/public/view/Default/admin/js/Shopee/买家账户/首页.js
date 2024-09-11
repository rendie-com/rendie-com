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
      database: "shopee/买家账户",
      sql: "select count(1) as total FROM @.table",
    }, {
      action: "sqlite",
      database: "shopee/买家账户",
      sql: "select " + Tool.fieldAs("sort,addtime,site,username,mail,note,id") + " FROM @.table order by @.sort asc,@.id asc" + Tool.limit(20, obj.params.page),
    }]
    Tool.ajax.a01(data, this.a03, this)
  },
  a03: function (t) {
    let html = "", arr = t[1]
    for (let i = 0; i < arr.length; i++) {
      html += '\
            <tr>\
            <td>'+ (i + 1) + '</td>\
            <td>'+ arr[i].sort + '</td>\
            <td>'+ arr[i].site + '</td>\
		    <td style="padding-left: 30px;position: relative;">\
			    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
			    <ul class="dropdown-menu">\
				    <li onClick="Tool.open5(\'js01\','+ arr[i].id + ')"><a class="dropdown-item pointer">修改</a></li>\
				    <li onClick="Tool.SignIn.a01(2,'+ arr[i].id + ',$(this))"><a class="dropdown-item pointer">*正常登陆</a></li>\
			    </ul>\
		    </td>\
            <td class="left">* <a href="javascript:;" onclick="Tool.SignIn.a01(1,'+ arr[i].id + ',$(this).parent())" title="点击登陆">' + arr[i].username + '</a></td>\
            <td>'+ arr[i].mail + '</td>\
            <td class="left">'+ arr[i].note + '</td>\
            <td>'+ Tool.js_date_time2(arr[i].addtime, "/") + '</td>\
            </tr>'
    }
    html = '\
        <header class="panel-heading">SHOPEE &gt; 买家账户</header>\
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
          <th class="w50">站点</th>\
          <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="fun.c01()">添加</a></li>\
              <li onClick="Tool.openR(\'?jsFile=js02&table=buyer&database=shopee_bak&newdatabase=shopee/买家账户\');"><a class="dropdown-item pointer">把旧表复制到新表</a></li>\
           </ul>\
          </th>\
          <th class="left">用户名</th>\
          <th>邮箱</th>\
          <th class="left">备注</th>\
          <th class="w170">添加时间</th>\
        </tr>'
  },
  c01: function () {
    let html = "\"ok\"<r: db=\"sqlite.shopee\">insert into @.buyer(@.addtime)values(" + Tool.gettime("") + ")</r:>"
    Tool.ajax.a01(html, 1, Tool.reload)
  },
}
fun.a01();