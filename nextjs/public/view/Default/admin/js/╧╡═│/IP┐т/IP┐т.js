'use strict';
var fun =
{
  NoAccess2Arr: [],
  a01: function () {
      obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";
    let urlArr
      if (obj.arr[3] == "js01") {
          urlArr = [
              "admin/js/系统/IP库/common.js",
              "../../plugins/flot-0.8.3/jquery.flot.js",
              "../../plugins/flot-0.8.3/jquery.flot.pie.js",
              "../../plugins/flot-0.8.3/demo/jquery.flot.tooltip.min.js",
              "../../plugins/jqvmap/jquery.vmap.js",
              "../../plugins/jqvmap/maps/jquery.vmap.world.js",
              "admin/js/系统/IP库/国家分布.js"
          ]
          Tool.scriptArr(urlArr);
    }
    else if (obj.arr[3] == "js02") {
      Tool.scriptArr(['admin/js/系统/IP库/从【rendie.com】IP库中获取IP.js']);
    }
    else {
      //
      obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
      obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
      obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
      obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//添加时间_那一列
      this.a02();
    }
  },
  a02: function () {
    let str = '\
    [\
      {\
        "count":<@count/>,\
        "size":30,\
        "NoAccess2":"<.Config(NoAccess2)/>"\
      }\
      <r:ip size=30 page=2 where="'+ this.b03() + '">,\
      {\
        "id":<:id/>,\
        "hit":<:hit/>,\
        "IP":"<:IP/>",\
        "isp":"<:isp/>",\
        "ct":"<:ct/>",\
        "prov":"<:prov/>",\
        "city":"<:city/>",\
        "area":"<:area/>",\
        "idc":"<:idc/>",\
        "asn":<:asn tag=json/>,\
        "addtime":<:addtime/>,\
        "uptime":<:uptime/>\
      }\
      </r:ip>\
    ]'
    Tool.ajax.a01(str, obj.arr[4],this.a03,  this)
  },
  a03: function (arr) {
    let arr1 = []
    if (arr[0].NoAccess2 != "") { arr1 = unescape(arr[0].NoAccess2).split(",") }
    this.NoAccess2Arr = arr1
    let html = '', isbool, tr1;
    for (let i = 1; i < arr.length; i++) {
      isbool = arr1.indexOf(arr[i].IP) != -1
      if (isbool) {
        tr1 = '<li onClick="fun.c06(\'' + arr[i].IP + '\');"><a class="dropdown-item pointer">解除禁止访问</a></li>'
      }
      else {
        tr1 = '<li onClick="fun.c05(\'' + arr[i].IP + '\');"><a class="dropdown-item pointer">禁止访问</a></li>'
      }
      html += '\
      <tr>\
        <td>'+ arr[i].hit + '</td>\
        <td class="right">'+ (isbool ? '<font color="red">（禁止访问）</font>' : '') + arr[i].IP + Tool.IpQuery(arr[i].IP) + '</td>\
        <td class="left">'+ arr[i].asn + '</td>\
        <td>'+ arr[i].isp + '</td>\
        <td>'+ arr[i].ct + '</td>\
        <td>'+ arr[i].prov + '</td>\
        <td>'+ arr[i].city + '</td>\
        <td>'+ arr[i].area + '</td>\
        <td>'+ arr[i].idc + '</td>\
        <td>'+ Tool.js_date_time2(arr[i].uptime) + '</td>\
        <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
        <td style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu">\
						'+ tr1 + '\
						<li onClick="fun.c04('+ arr[i].id + ');"><a class="dropdown-item pointer">删除</a></li>\
					</ul>\
				</td>\
      </tr>'
    }
    html += '<tr><td colspan="12" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
    html = Tool.header() + '\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b02(obj.arr[5]) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c03(1)" value="1">IP地址</li>\
        <li class="dropdown-item pointer" onclick="fun.c03(2)" value="2">归属地</li>\
        <li class="dropdown-item pointer" onclick="fun.c03(3)" value="3">运营商</li>\
        <li class="dropdown-item pointer" onclick="fun.c03(4)" value="4">国家</li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[6] == "-_-20" ? "" : Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>\
    <div class="p-2">\
      <table class="table table-hover center">\
        <thead class="table-light">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
    Tool.html(null, null, html)
  },
  b01: function () {
    return '\
    <tr>\
      <th>访问次数</th>\
      <th class="right">IP地址</th>\
      <th class="left">归属地</th>\
      <th>运营商</th>\
      <th>国家</th>\
      <th>省州</th>\
      <th>城市</th>\
      <th>地区</th>\
      <th>idc</th>\
      <th>更新时间</th>\
      <th class="p-0">\
				<select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
					<option value="-_-20">添加时间</option>\
					<option value="1" '+ (obj.arr[7] == "1" ? 'selected="selected"' : '') + '>添加时间_倒序</option>\
					<option value="2" '+ (obj.arr[7] == "2" ? 'selected="selected"' : '') + '>更新时间_倒序</option>\
				  <option value="3" '+ (obj.arr[7] == "3" ? 'selected="selected"' : '') + '>访问次数_倒序</option>\
				</select>\
      </th>\
      <th class="w30" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0">\
          <div></div><div></div><div></div>\
        </button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
          <li onclick="Tool.open4(\'js02\')" title="如果IP存在则不管，IP不存在则添加。"><a class="dropdown-item pointer">从【rendie.com】IP库中获取IP</a></li>\
          <li onclick="fun.c07()"><a class="dropdown-item pointer">删除所有IP</a></li>\
        </ul>\
      </th>\
    </tr>'
  },
  b02: function (val) {
    let name = "";
    switch (val) {
      case "1": name = "IP地址"; break;
      case "2": name = "归属地"; break;
      case "3": name = "运营商"; break;
      case "4": name = "国家"; break;
      default: name = "未知：" + val;
    }
    return name
  },
  b03: function () {
    let arr = [], str = "";
    if (obj.arr[6] != "-_-20") {
      switch (obj.arr[5]) {
        case "1": arr.push("@.ip like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//当前地址
        case "2": arr.push("@.asn like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//来源地址
        case "3": arr.push("@.isp like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//本地公网IP
        case "4": arr.push("@.ct like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//国家
      }
    }
    switch (obj.arr[7]) {
      case "1": str = "order by @.addtime desc,@.id desc"; break;//【上传时间】倒序
      case "2": str = "order by @.uptime desc,@.id desc"; break;//【更新时间】倒序
      case "3": str = "order by @.hit desc,@.id desc"; break;//【访问次数】倒序
      default: str = "order by @.hit desc,@.id desc"; break;//【访问次数】倒序  
    }
    return (arr.length == 0 ? "" : " where " + arr.join(" and ")) +" "+ str;
  },
  c01: function () { },
  c02: function () {
    let searchword = Tool.Trim($("#searchword").val());
    if (searchword) {
      searchword = Tool.escape(searchword);
      Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + $("#Field").val() + "/" + searchword);
    } else { alert("请输入搜索内容"); }
  },
  c03: function (val) {
    let name = this.b02("" + val)
    $("#Field").html(name).val(val)
  },
  c04: function (id) {
    if (confirm('确定要删除吗？')) {
      let html = "<r: db=\"mysql.admin\">delete from @.ip where @.id=" + id + "</r:>"
        Tool.ajax.a01(html,1,Tool.reload);
    }
  },
  c05: function (ip) {
    if (this.NoAccess2Arr.indexOf(ip) == -1) {
      this.NoAccess2Arr.push(ip)
        Tool.ajax.a01('""<.ConfigSave(NoAccess2,' + escape(this.NoAccess2Arr.join(",")) + ')/>', 1, Tool.reload);
    }
    else { alert("该IP已被禁止,不需要禁止。"); }
  },
  c06: function (ip) {
    if (this.NoAccess2Arr.indexOf(ip) == -1) { alert("该IP没被禁止,不需要解除禁止。"); }
    else {
      let arr1 = this.NoAccess2Arr, arr2 = []
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != ip) { arr2.push(arr1[i]); }
      }
        Tool.ajax.a01('""<.ConfigSave(NoAccess2,' + escape(arr2.join(",")) + ')/>', 1, Tool.reload);
    }
  },
  c07: function () {
    if (confirm('确定要删除所有吗？')) {
      let html = "\"\"<r: db=\"mysql.admin\">delete from @.ip</r:>"
        Tool.ajax.a01(html,1,Tool.reload);
    }
  }
}
fun.a01();