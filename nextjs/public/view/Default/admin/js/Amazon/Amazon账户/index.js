'use strict';
var fun =
{
    token: "", obj: {},
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        if (obj.arr[3] == "js01")//修改
        {
            //obj.arr[4]    账号来源ID
            Tool.scriptArr(['admin/js/Amazon/Amazon账户/修改.js']);
        }
        else { this.a02(); }

    },
    a02: function (t) {
        let str = '[\
    {}\
    <r:seller db="mysql.Amazon" size=50 where=" order by @.sort asc,@.id asc">,\
    {\
      "sort":<:sort/>,\
      "id":<:id/>,\
      "note":"<:note/>",\
      "name":"<:name/>",\
      "UserName":"<:UserName/>",\
      "password":"<:password/>",\
      "hide":<:hide/>,\
      "fromid":<:fromid/>\
    }\
    </r:seller>]'
        Tool.ajax.a01($2,$4,$1,$3);
    },
    a03: function (arr) {
        let html = "";
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
				<td class="p-0">\
					<input type="text" class="form-control center" value="'+ arr[i].sort + '" onblur="fun.c44($(this),' + arr[i].id + ',\'sort\',\'' + arr[i].sort + '\')"/>\
				</td>\
				<td>'+ arr[i].UserName + '</td>\
				<td>'+ arr[i].password + '</td>\
				<td class="p-0">\
					<input type="text" value="'+ arr[i].note + '" class="form-control" onblur="fun.c44($(this),' + arr[i].id + ',\'note\',\'' + arr[i].note + '\')"/>\
				</td>\
				<td>'+ arr[i].name + '</td>\
				<td></td>\
				<td></td>\
				<td></td>\
				<td></td>\
				<td></td>\
				<td></td>\
				<td></td>\
				<td>'+ (arr[i].hide == 0 ? '正常' : '已禁用') + '</li>\
				<td class="w30" style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu" aria-labelledby="dropdown0">\
						<li><a class="dropdown-item pointer" onClick="">更多</a></li>\
						<li><a class="dropdown-item pointer" onClick="Tool.main(\'js01/'+ arr[i].fromid + '\')">修改</a></li>\
						<li><a class="dropdown-item pointer" onClick="fun.c26('+ arr[i].id + ')">删除</a></li>\
					</ul>\
				</td>\
      </tr>'
        }
        html = '\
    <header class="panel-heading">Amazon账户（<a href="http://www.amazon.com/" target="_blank">http://www.amazon.com/</a>）</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead class="table-light">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html)
    },
    b01: function (t) {
        let str = '\
    <tr>\
      <th>编号</th>\
      <th>用户名</th>\
      <th>密码</th>\
      <th>备注</th>\
      <th>提现人</th>\
      <th>行业</th>\
      <th title="交易违规/产品信息违规/知识产权禁限售/知识产权禁限售(第三方投诉)/待查看处罚/可解除处罚/需申诉处理的处罚">处罚</th>\
      <th>上架/总数/上限</th>\
      <th>下架</th>\
      <th>未通过</th>\
      <th>投诉</th>\
      <th>提现金额</th>\
      <th>状态</th>\
      <th class="w30" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
          <li><a class="dropdown-item pointer" onClick="">更多</a></li>\
          <li><a class="dropdown-item pointer" onClick="fun.c01()">添加账户</a></li>\
        </ul>\
      </th>\
    </tr>'
        return str
    },
    c01: function () {
        let fromid = parseInt(Math.random() * 999)
        let html = '""<if "Fun(Db(mysql.Amazon,select count(1) from @.seller where @.fromid=' + fromid + ',count))"=="0"><r: db="mysql.Amazon">INSERT into @.seller(@.fromid)VALUES(' + fromid + ')</r:><else/>重设</if>'
        Tool.ajax.a01( html,1, this.c02,this)
    },
    c02: function (t) {
        if (t == "") { location.reload(); } else if (t == "重设") { this.c01(); } else { alert("出错：" + t); }
    },
}
fun.a01();