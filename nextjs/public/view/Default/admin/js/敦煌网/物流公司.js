'use strict';
var fun =
{
    a01: function () {
        this.a02()
    },
    a02: function () {
        let str = '[0<r:deliverytype db="sqlite.dhgate" size="200">,{"id":<:id/>,"name":"<:name tag=js/>","bindSmt":"<:bindSmt tag=js/>","APIopen":"<:APIopen/>"}</r:deliverytype>]'
        Tool.ajax.a01(str, 1, this.a03, this)
    },
    a03: function (arr) {
        let html = ""
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td>'+ i + '</td>\
        <td>'+ arr[i].name + '</td>\
        <td>'+ arr[i].bindSmt + '</td>\
        <td>'+ arr[i].APIopen + '</td>\
			</tr>'
        }
        html = '\
		<header class="panel-heading">【敦煌网】物流公司</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <thead class="table-light center">\
      <tr>\
        <th>编号</th>\
        <th>物流公司名称</ht>\
        <th>绑定到【速卖通】</ht>\
        <th>物流公司代码</ht>\
      </tr>\
      </thead>\
      <tbody class="center">'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html)
    }
}
fun.a01();