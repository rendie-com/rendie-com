'use strict';
var fun =
{
    a01: function () {
        Tool.header02.a01("-_-20", this.a03, this);
    },
    a03: function (header, fromid, username, token) {
        let html = header + '\
		<div class="p-2">\
            '+ Tool.header01(obj.arr[3]) + '\
            <table class="table table-hover border">\
              <thead class="table-light">\
              <tr>\
                <th class="w300">API名称</th>\
                <th>API描述</th>\
              </tr>\
              </thead>\
              <tbody>'+ this.b01() + '</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    //卖家API>用户API
    b01: function () {
        return '\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/5bab15e62f724ed0bc66dcfcaca88526" target="_blank">dh.punish.brand.list.get$1.0</a></td>\
      <td>查询卖家处罚信息第三方投诉接口</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/b20aedf14f344649ad7064d4d0b3cc85" target="_blank">dh.punish.list.get$1.0</a></td>\
      <td>查询卖家处罚信息接口</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/2c57daa86afc4d73b7b2730c67ad6895" target="_blank">dh.seller.ntalker.account.get$1.0</a></td>\
      <td>获取卖家ntalker账号信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/ac6e55a1055240b0ba770a94d7165e8e" target="_blank">dh.seller.ntalker.siteid.get$1.0</a></td>\
      <td>获取卖家企业ID</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/60074a5a58fa4f94bfd75e01f050f37d" target="_blank">dh.user.base.get$1.0</a></td>\
      <td>查询账号基本信息,可查询买家账号与卖家账号的基本信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/f9f121c63e014f0abbd2ac8d5c2be0d7" target="_blank">dh.user.seller.get$1.1</a></td>\
      <td>查询卖家用户信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/6d8d5ff39b3045e5a05a4e6c3a530f22" target="_blank">dh.user.seller.get$2.0</a></td>\
      <td>查询卖家用户信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/f6dac6543dae40d099161a6e8af1f48b" target="_blank">dh.user.seller.isapiseller$1.0</a></td>\
      <td>查询卖家用户是否api卖家</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/001009" target="_blank">https://open.dhgate.com/docs/api/001009</a>（卖家API &gt; 用户API）</td>\
    </tr>';
    },
}
fun.a01();