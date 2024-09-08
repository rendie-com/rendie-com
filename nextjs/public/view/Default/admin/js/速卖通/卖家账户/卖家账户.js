'use strict';
var fun =
{
    a01: function () {
        let str = '[0\
        <r:seller db="sqlite.aliexpress" size=50 where=" order by @.sort asc">\
        ,{\
          "UserName":"<:UserName/>",\
          "password":"<:password/>",\
          "note":"<:note/>",\
          "sort":<:sort/>,\
          "fromid":<:fromid/>\
        }\
        </r:seller>]'
        Tool.ajax.a01(str, 1, this.a02, this);
    },
    a02: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
            <tr>\
            <td>'+ arr[i].sort + '</td>\
            <td><a href="https://login.aliexpress.com/seller.htm?spm=a2g0o.home.1000001.3.650c2145IlU72S&return_url=https://gsp.aliexpress.com" target="_blank">'+ arr[i].UserName + '</a></td>\
            <td>'+ arr[i].password + '</td>\
            <td>'+ arr[i].note + '</td>\
		    <td style="padding-left: 30px;position: relative;">\
			    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
			    <ul class="dropdown-menu">\
				    <li onClick="Tool.open5(\'js03\','+ arr[i].fromid + ')"><a class="dropdown-item pointer">更多</a></li>\
				    <li onclick="fun.c04($(this),'+ arr[i].fromid + ')"><a class="dropdown-item pointer">同步</a></li>\
				    <li onClick="Tool.main(\'js5/'+ arr[i].fromid + '\')"><a class="dropdown-item pointer">修改</a></li>\
				    <li onClick="fun.c26('+ arr[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
			    </ul>\
		    </td>\
            </tr>'
        }
        html = '\
        <header class="panel-heading">卖家账户</header>\
        <div class="p-2">\
          <table class="table table-hover align-middle center">\
            <thead class="table-light">'+ this.b01() + '</thead>\
            <tbody>'+ html + '</tbody>\
          </table>\
        </div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        return '\
        <tr>\
          <th>排序</th>\
          <th>用户名</th>\
          <th>密码</th>\
          <th>备注</th>\
          <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="Tool.main(\'js04\')">更多</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.main(\'js01\')">推广营销</a></li>\
              <li><a class="dropdown-item pointer" onclick="fun.c04($(this),\'all\')" title="包括【上架】【下架】【待审核】【审核未通过】【品牌商投诉】">同步商品状态</a></li>\
              <li><a class="dropdown-item pointer" onClick="fun.c02()">添加</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.main(\'js25.html\')" title="把侵权的产品进行【店铺禁限】">*处理侵权</a></li>\
            </ul>\
          </th>\
        </tr>'
    }
}
fun.a01();