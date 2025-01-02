'use strict';
var fun =
{
  obj: {
    DEFAULT_DB: "",
    size: 20
  },
  a01: function () {
    obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
    obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页               
    obj.params.field = obj.params.field ? obj.params.field : '1'//搜索字段
    obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
    this.a02();
  },
  a02: function () {
    let data = [{
      action: "process",
      fun: "env",
      name: "NEXTJS_CONFIG_DEFAULT_DB"
    }]
    Tool.ajax.a01(data, this.a03, this);
  },
  a03: function (t) {
    this.obj.DEFAULT_DB = t[0];
    let sessionObj = {}
    let str = sessionStorage.getItem(window.location.pathname + obj.params.jsFile)
    if (str) sessionObj = JSON.parse(str)
    Tool.ajax.a01(this.b04(t[0], sessionObj[obj.params.page]), this.a04, this, sessionObj);
  },
  a04: function (t, sessionObj) {
    let html = '', arr = Tool.getArr(t[0], this.obj.DEFAULT_DB);
    for (let i = 0; i < arr.length; i++) {
      html += '\
      <tr>\
        <td style="padding-left: 22px;position:relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ arr[i].id + '"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown'+ arr[i].id + '">\
            <li><a class="dropdown-item pointer" onClick="Tool.openR(\'?jsFile=js01&id='+ arr[i].id + '\')">修改</a></li>\
            <li><a class="dropdown-item pointer" onClick="ManagerDel('+ arr[i].id + ')">删除</a></li>\
            </ul>\
        </td>\
        <td>'+ arr[i].username + '</td>\
        <td>'+ (arr[i].realname ? arr[i].realname : '') + '</td>\
        <td>'+ arr[i].groupid + '</td>\
        <td>'+ (arr[i].logintime ? Tool.js_date_time2(arr[i].logintime) : "") + '</td>\
        <td>'+ (arr[i].loginip ? arr[i].loginip : '') + '</td>\
        <td>'+ (arr[i].logintimes ? arr[i].logintimes + ' 次' : '') + '</td>\
        <td>'+ this.b02(""+arr[i].islocked) + '</td>\
      </tr>'
    }
    html = '\
    <header class="panel-heading">系统账号管理</header>\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.params.field + '">' + this.b03(obj.params.field) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c03(1)" value="1">ID</li>\
        <li class="dropdown-item pointer" onclick="fun.c03(2)" value="2">用户名</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c03(3)" value="3">所属用户组</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c03(4)" value="4">真实姓名</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead class="table-light">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>' + Tool.page2(sessionObj, t[0].LastEvaluatedKey, t[1], this.obj.DEFAULT_DB, this.obj.size, obj.params.page, obj.params.jsFile) + '\
    </div>'
    Tool.html(null, null, html)
  },
  b01: function () {
    let str = '\
        <tr>\
          <th style="padding-left: 30px;position: relative;" class="w30">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="fun.c04()">添加用户</a></li>\
            </ul>\
          </th>\
          <th>用户名</th>\
          <th>真实姓名</th>\
          <th>所属用户组</th>\
          <th>最近登录时间</th>\
          <th>最近登陆IP</th>\
          <th>登录</th>\
          <th>状态</th>\
        </tr>'
    return str;
  },
  b02: function (state) {
    let str = "未知"
    switch (state) {
      case "0": str = "锁定"; break;
      case "1": str = "激活"; break;
    }
    return str;
  },
  b03: function (val) {
    let name = "";
    switch (val) {
      case "1": name = "ID"; break;
      case "2": name = "用户名"; break;
      case "3": name = "所属用户组"; break;
      case "4": name = "真实姓名"; break;
      default: name = "未知：" + val;
    }
    return name
  },
  b04: function (DEFAULT_DB, ExclusiveStartKey) {
    if (DEFAULT_DB == "dynamodb") {
      return this.b05(this.obj.size, DEFAULT_DB, ExclusiveStartKey)
    }
    else {
      return this.b06(this.obj.size, DEFAULT_DB)
    }
  },
  b05: function (size, DEFAULT_DB, ExclusiveStartKey) {
    let params = {
      ProjectionExpression: 'id,realname,groupid,logintime,loginip,logintimes,username,islocked', // 只获取这些字段
      Limit: size, // 每页项目数上限
      TableName: 'main_manager',
    }
    if (ExclusiveStartKey && obj.params.page != 1) {//翻页
      params.ExclusiveStartKey = ExclusiveStartKey;
    }
    let data = [{
      action: DEFAULT_DB,
      fun: "scan",
      params: params,
    }]
    /////////////////////////////////////////////
    if (obj.params.page == 1) {
      data.push({
        action: DEFAULT_DB,
        fun: "scan",
        params: {
          TableName: 'main_manager',
          Select: 'COUNT' // 请求只返回项目总数
        }
      })
    }
    return data;
  },
  b06: function (size, DEFAULT_DB) {
    let data = [{
      action: DEFAULT_DB,
      database: "main",
      sql: "select " + Tool.fieldAs("id,realname,groupid,logintime,loginip,logintimes,islocked,username") + " FROM @.manager" + " order by @.id desc" + Tool.limit(size, obj.params.page, DEFAULT_DB)
    }]
    if (obj.params.page == 1) {
      data.push({
        action: DEFAULT_DB,
        database: "main",
        sql: "select count(1) as Count FROM @.manager",
      })
    }
    return data;
  },
  c01: function () { },
  c02: function () {
    let searchword = Tool.Trim($("#searchword").val());
    if (searchword) {
      searchword = encodeURIComponent(searchword);
      Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/%20/%20/%20/" + $("#Field").val() + "/" + searchword);
    } else { alert("请输入搜索内容"); }
  },
  c03: function (val) {
    let name = this.b03("" + val)
    $("#Field").html(name).val(val)
  },
  c04: function () {
    let DEFAULT_DB = this.obj.DEFAULT_DB
    let data = []
    if (DEFAULT_DB == "dynamodb") {
      data = [{
        action: DEFAULT_DB,
        fun: "putItem",
        params: {
          TableName: "main_manager",
          Item: {
            "id": { S: Tool.guid() },
            "username": { S: "新用户" },
            "islocked": { N: "1" },
            "groupid": { N: "1" },
          }
        },
      }]
    }
    else {
      data = [{
        action: DEFAULT_DB,
        database: "main",
        sql: "insert into @.manager(@.username)values(\'新用户\')",
      }]
    }
    Tool.ajax.a01(data, this.c05, this);
  },
  c05: function (t) {
    if (t[0] == "插入成功") {
      location.reload();
    }
    else {
      Tool.pre(["出错", t])
    }
  },
}
fun.a01();
/*
 "usergroupName":"<r:usergroup where=" where @.id=<:groupid/>" size=1><:Name/></r:usergroup>",\
function ManagerDel(id)
{
  if(confirm('确定要删除吗')){
    let str='<ren'+'die:area db="mysql.admin">delete from @.Manager where @.id='+id+'</ren'+'die:area>'
    str=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
    window.location.reload();
    }else{return false;}
}
*/