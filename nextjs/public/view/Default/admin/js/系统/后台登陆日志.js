'use strict';
var fun =
{
  a01: function () {
    obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
    if (obj.params.jsFile == "js01") {
      Tool.scriptArr(['admin/js/系统/访问日志/从IP中获取【国家】【归属地】信息.js']);
    }
    else if (obj.params.jsFile == "js02") {
      Tool.scriptArr(['../../plugins/ua-parser/ua-parser.min.js', 'admin/js/敦煌网/产品分析/图片访问日志/从【客户端信息】中获取【系统信息】.js']);
    }
    else {
      obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页               
      obj.params.field = obj.params.field ? obj.params.field : '1'//搜索字段
      obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
      let data = [{
        action: "process",
        fun: "env",
        name: "NEXTJS_CONFIG_DEFAULT_DB"
      }]
      Tool.ajax.a01(data, this.a02, this);
    }
  },
  a02: function (t) {
    let data = [{
      action: t[0],
      database: "main",
      sql: "select count(1) as total FROM @.loginlog" + this.b03(),
    }, {
      action: t[0],
      database: "main",
      sql: "select " + Tool.fieldAs("user,logintime,localip,os,browser,lang,url,useragent,fromurl,ip,des,asn,ct,resulttf,id") + " FROM @.loginlog" + this.b03() + " order by @.id desc" + Tool.limit(10, obj.params.page, t[0])
    }]
    Tool.ajax.a01(data, this.a03, this);
  },
  a03: function (t) {
    let html = '', arr = t[1];
    for (let i = 0; i < arr.length; i++) {
      html += '\
      <tr>\
        <td class="left p-0">\
          <table class="table mb-0 table-bordered">\
          <tbody>\
          <tr>\
            <td class="right w90">当前地址：</td><td><a href="'+ arr[i].url + '" target="_blank">' + arr[i].url + '</a></td>\
          </tr>\
          <tr>\
            <td class="right">来源地址：</td><td><a href="'+ arr[i].fromurl + '" target="_blank">' + arr[i].fromurl + '</a></td>\
          </tr>\
          <tr>\
            <td class="right">客户信息：</td><td>'+ arr[i].useragent + '</td>\
          </tr>\
          <tr>\
            <td class="right">备注：</td><td>'+ arr[i].des + '</td>\
          </tr>\
          </tbody>\
          </table>\
        </td>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered">\
          <tbody>\
            <tr><td title="操作员">'+ arr[i].user + '</td></tr>\
            <tr><td title="操作结果">'+ (arr[i].resulttf == 0 ? '<font color="red">橾作失败</font>' : '橾作成功') + '</td></tr>\
            <tr><td title="登陆时间">'+ Tool.js_date_time2(arr[i].logintime, "-") + '</td></tr>\
          </tbody>\
          </table>\
        </td>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered">\
          <tbody>\
            <tr><td title="操作系统">'+ (arr[i].os ? arr[i].os : '&nbsp;') + '</td></tr>\
            <tr><td title="语言">'+ (arr[i].lang ? arr[i].lang : '&nbsp;') + '</td></tr>\
            <tr><td title="浏览器">'+ (arr[i].browser ? arr[i].browser : '&nbsp;') + '</td></tr>\
          </tbody>\
          </table>\
        </td>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered">\
          <tbody>\
            <tr><td title="公网IP">'+ arr[i].ip + Tool.IpQuery(arr[i].ip) + '</td></tr>\
						<tr><td title="公网IP归属地">'+ (arr[i].asn ? "【" + arr[i].ct + "】" + arr[i].asn : '&nbsp;') + '</td></tr>\
            <tr><td title="服务器局域网IP">'+ arr[i].localip + Tool.IpQuery(arr[i].localip) + '</td></tr>\
          </tbody>\
          </table>\
        </td>\
      </tr>'
    }
    html = '\
    <header class="panel-heading">日志管理</header>\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b02(obj.params.field) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">公网IP</li>\
        <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">服务器局域网IP</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c01(3)" value="3">操作系统</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c01(4)" value="4">浏览器</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>\
    <div class="p-2">\
      <table class="table align-top center table-hover">\
        <thead class="table-light">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
    </div>'
    Tool.html(null, null, html)
  },
  b01: function () {
    let str = '\
    <tr>\
      <th class="left" style="padding-left: 30px;position: relative;">\
				<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li onClick="Tool.open5(\'js01\',\'loginlog\')"><a class="dropdown-item pointer">*从IP中获取【国家】【归属地】信息</a></li>\
          <li onClick="Tool.open5(\'js02\',\'loginlog\')"><a class="dropdown-item pointer">从【客户端信息】中获取【系统信息】</a></li>\
        </ul>\
			浏览器反馈信息\
			</th>\
      <th class="w170">操作员</th>\
      <th class="w200">系统信息</th>\
      <th class="w230">IP信息</th>\
    </tr>'
    return str;
  },
  b02: function (val) {
    let name = "";
    switch (val) {
      case "1": name = "公网IP"; break;
      case "2": name = "服务器局域网IP"; break;
      case "3": name = "操作系统"; break;
      case "4": name = "浏览器"; break;
      default: name = "未知：" + val;
    }
    return name
  },
  b03: function () {
    let str = ""
    if (obj.params.searchword) {
      switch (obj.params.field) {
        case "1": str = " where @.ip like '%" + obj.params.searchword + "%'"; break;//公网IP
        case "2": str = " where @.localip like '%" + obj.params.searchword + "%'"; break;//服务器局域网IP
        case "3": str = " where @.os like '%" + obj.params.searchword + "%'"; break;//操作系统
        case "4": str = " where @.browser like '%" + obj.params.searchword + "%'"; break;//浏览器
      }
    }
    return str;
  },
  c01: function (val) {
    let name = this.b02("" + val)
    $("#field").html(name).val(val)
  },
  c02: function () {
    let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
    if ((field == "1" || field == "2") && isNaN(searchword)) {
      alert("【商品ID】或【商品ID】必须是数字。")
    }
    else if (searchword) {
      Tool.main("?jsFile=" + obj.params.jsFile + "&page=1&field=" + field + "&searchword=" + searchword);
    } else { alert("请输入搜索内容"); }
  },
}
$(function () { fun.a01(); })