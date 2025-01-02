'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        let str = '[0\
        <r:discount db="sqlite.aliexpress" size=100 where=" order by @.count desc,@.id asc">,\
		{\
			"discount":<:discount/>,\
			"count":<:count/>,\
			"addtime":<:addtime/>\
		}\
		</r:discount>]'
        Tool.ajax.a01( str,1, this.a02,this)
    },
    a02: function (arr) {
        let tbody = "", count = this.b02(arr);
        for (let i = 1; i < arr.length; i++) {
            tbody += '\
            <tr>\
              <td>' + i + '</td>\
              <td>' + arr[i].discount + '% OFF</td>\
              <td>' + arr[i].count + '</td>\
              <td>' + ((arr[i].count / count) * 100).toFixed(2) + '%</td>\
              <td class="left">' + Tool.js_date_time2(arr[i].addtime) + '</td>\
            </tr>'
        }
        let html = Tool.header(obj.arr[3]) + '\
        <div class="p-2">\
          <table class="table table-hover center">\
            <thead class="table-light">'+ this.b01(count) + '</thead>\
            <tbody>'+ tbody + '</tbody>\
          </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function (count) {
        return '\
        <tr>\
          <th style="padding-left: 30px;position: relative;" class="w70">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onclick="Tool.open4(\'js26\')">从商品表中获取折扣</a></li>\
            </ul>编号\
          </th>\
          <th class="w100">折扣</th>\
          <th class="w100" title="商品总数：'+ count +'">商品数量</th>\
          <th class="w100">商品占比</th>\
          <th class="left">添加时间</th>\
        </tr>'
    },
    b02: function (arr) {
        let count = 0;
        for (let i = 1; i < arr.length; i++) {
            count += arr[i].count
        }
        return count;
   },
}
fun.a01();