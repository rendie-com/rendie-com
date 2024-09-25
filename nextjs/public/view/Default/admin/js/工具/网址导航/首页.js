'use strict';
var fun =
{
  a01: function () {
    obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
    obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
    obj.params.type = obj.params.type ? obj.params.type : ''//分类
    obj.params.field = obj.params.field ? obj.params.field : '1'
    obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
    this.a02();
  },
  a02: function () {
    let data = [{
      action: "sqlite",
      database: "tool",
      sql: "select count(1) as total FROM @.fav" + this.b01(),
    }, {
      action: "sqlite",
      database: "tool",
      sql: "select " + Tool.fieldAs("id,addtime,uptime,sort,ico,url,name,type") + " FROM @.fav" + this.b01() + Tool.limit(20, obj.params.page),
    }]
    Tool.ajax.a01(data, this.a03, this);
  },
  a03: function (t) {
    let html = '', list = t[1]
    for (let i = 0; i < list.length; i++) {
      html += '\
      <tr>\
        <td>'+ this.b03(list[i].type) + '</td>\
        <td style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ list[i].id + '">\
          <div></div><div></div><div></div>\
        </button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown'+ list[i].id + '">\
          <li onclick="Tool.openR(\'?jsFile=js01&id='+ list[i].id + '\')"><a class="dropdown-item pointer">修改</a></li>\
          <li onclick="fun.c04('+ list[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
        </ul>\
        </td>\
        <td class="left">'+ (list[i].ico ? '<img src="' + list[i].ico + '" width="14"/>' : "") + ' <a href="' + list[i].url + '" target="_blank" onclick="fun.c09(' + list[i].id + ')">' + list[i].url + '</a> ' + list[i].name + '</li>\
        <td>'+ Tool.js_date_time2(list[i].uptime) + '</td>\
        <td>'+ Tool.js_date_time2(list[i].addtime) + '</td>\
        <td>'+ list[i].sort + '</td>\
      </tr>'
    }
    html = this.b05() + '\
    <div class="p-2">\
      <table class="table table-hover center align-middle">\
      <thead class="table-light">'+ this.b02() + '</thead>\
      <tbody>'+ html + '</tbody>\
      </table>' + Tool.page(t[0][0].total, 20, obj.params.page) + '\
    </div>'
    
    Tool.html(null, null, html)
  },
  b01: function () {
    let arr = [];
    if (obj.params.searchword) {
      switch (obj.params.field) {
        case "1": arr.push("@.url like '%" + obj.params.searchword + "%'"); break;//订单编号
        case "2": arr.push("@.name like '%" + obj.params.searchword + "%'"); break;//用户名
        case "3": arr.push("@.note like '%" + obj.params.searchword + "%'"); break;//采购单号
      }
    }
    if (obj.params.type) { arr.push("@.type=" + obj.params.type) }
    let where = " order by @.sort desc,@.id desc"
    return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + where;
  },
  b02: function () {
    return '\
    <tr>\
      <th class="w150 p-0">\
        <select onChange="Tool.open(\'type\',this.options[this.selectedIndex].value)" class="form-select">\
        <option value="">分类</option>'+ this.b04(obj.params.type) + '</select>\
      </th>\
      <th class="w30" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0">\
          <div></div><div></div><div></div>\
        </button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
          <li onclick="fun.c03()"><a class="dropdown-item pointer">添加网址</a></li>\
        </ul>\
      </th>\
      <th class="left">网址</th>\
      <th class="w170">更新时间</th>\
      <th class="w170">添加时间</th>\
      <th class="w70">排序</th>\
    </tr>'
  },
  b03: function (type) {
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
  b04: function (type) {
    let str = ''
    for (let i = 0; i <= 20; i++) {
      str += '<option value="' + i + '" ' + (type == "" + i ? ' selected="selected"' : "") + '>' + this.b03(i) + '</option>'
    }
    return str
  },
  b05: function () {
    return '\
    <header class="panel-heading">网址导航</header>\
    <div class="input-group w500 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b06(obj.params.field) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">网址</li>\
        <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">说明</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c01(3)" value="3">备注</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>'
  },
  b06: function (val) {
    let name = "";
    switch (val) {
      case "1": name = "网址"; break;
      case "2": name = "说明"; break;
      case "3": name = "备注"; break;
      default: name = "未知：" + val;
    }
    return name
  },
  //////////////////////////////////////////////////////////////////
  c01: function (val) {
    let name = this.b06("" + val)
    $("#field").html(name).val(val)
  },
  c02: function () {
    let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
    if (searchword) {
      Tool.main("?jsFile=" + obj.params.jsFile + "&site=" + obj.params.site + "&page=1&field=" + field + "&searchword=" + searchword);
    } else { alert("请输入搜索内容"); }
  },
  c03: function () {
    let data = [{
      action: "sqlite",
      database: "tool",
      sql: "insert into @.fav(@.sort,@.addtime)values(9999," + Tool.gettime("") + ")",
    }]
    Tool.ajax.a01(data, Tool.reload)
  },
  c04: function (id) {
    if (confirm('确定删除该网址吗?')) {
      let data = [{
        action: "sqlite",
        database: "tool",
        sql: "delete from @.fav where @.id=" + id,
      }]
      Tool.ajax.a01(data, Tool.reload)
    }
  },
}
$(function () {
  fun.a01();
})
// c05: function (id) {
//   let html = "", fav = { url: $("#url").val(), ico: $("#ico").val(), name: $("#name").val(), sort: $("#sort").val(), type: $('#type').val(), note: $('#note').val() }
//   if (fav.url) {
//     html = "\"\"<r: db=\"sqlite.tool\">update @.fav set @.uptime='" + Tool.gettime("") + "', @.ico='" + fav.ico + "',@.url='" + fav.url + "',@.name='" + fav.name + "',@.note='" + fav.note.replace(/\'/ig, "''") + "',@.sort=" + fav.sort + ",@.type=" + fav.type + " where @.id=" + id + "</r:>"
//     Tool.ajax.a01(html, 1, this.c06, this)
//   }
//   else { alert("请填写网址！") }
// },

// c09: function (id) {
//   let html = "\"\"<.Db(sqlite.tool,update @.fav set @.sort=@.sort+1 where @.id=" + id + ",execute)/>"
//   Tool.ajax.a01(html, 1, this.c10, this)
// },
// c10: function (t) {
//   if (t != "") { alert(t); }
// },