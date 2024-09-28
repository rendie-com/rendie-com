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
    //卖家API>站内信API
    b01: function () {
        return '\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/7cc5c1e30eef484da9c49d90f4c02c59" target="_blank">dh.message.count$2.0</a></td>\
      <td>获取站内信总数、未读数量、已读数量、未读系统消息量、未读买卖消息量、未读平台公告消息量</td>\
    </tr>\
    <tr data-row-key="30d804e97ad3428ab6ad5f0e14fefacc">\
      <td><a href="https://open.dhgate.com/docs/api/detail/30d804e97ad3428ab6ad5f0e14fefacc" target="_blank">dh.message.count.list$2.0</a></td>\
      <td>获取时间段内不同类型站内信数量接口</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/8d29a463f25e4c7585880025204571e0" target="_blank">dh.message.delete$2.0</a></td>\
      <td>删除站内信信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/7ec5eb733ca74db29a5112dabe62d826" target="_blank">dh.message.detail.get$1.0</a></td>\
      <td>获取站内信内容信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/15f8c23869c74ded82645fcf7a566d2e" target="_blank">dh.message.get$2.0</a></td>\
      <td>获取一条站内信的详细回复内容信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/08fc00257d8740fc804caddfec907734" target="_blank">dh.message.info.reply$1.0</a></td>\
      <td>站内信回复</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/3e922eadfa924300a92682c2ef712adb" target="_blank">dh.message.info.reply$2.0</a></td>\
      <td>站内信回复</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/a303b89b1a7c45079014f14fe5fe087d" target="_blank">dh.message.info.send$1.0</a></td>\
      <td>站内信发送</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/60bb9b8beabd4843ae3d764fafca959c" target="_blank">dh.message.list$2.0</a></td>\
      <td>获取站内信主题列表</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/14fe68f5079c47c9bd61f1b70e89092c" target="_blank">dh.message.list.recent$2.0</a></td>\
      <td>获取最近更新站内信主题列表</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/711f248bf8164e6c8eef857ec6ffa253" target="_blank">dh.message.readed.update$1.0</a></td>\
      <td>更新站内信状态为已读</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/c50d8068d7d245849f149b477fc23985" target="_blank">dh.message.send$2.0</a></td>\
      <td>站内信发送</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/1e5e885384404be89f2c195527169771" target="_blank">dh.message.status.update$2.0</a></td>\
      <td>修改站内信为已读、未读、标记、未标记状态</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/ef882b3f2c794de2b174be4badffff74" target="_blank">dh.messages.get$1.0</a></td>\
      <td>获取站内信主题列表信息</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/001006" target="_blank">https://open.dhgate.com/docs/api/001006</a>（卖家API &gt; 站内信API）</td>\
    </tr>';
    },
}
fun.a01();