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
              <tbody id="tbody">'+ this.b01() + '</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },

    //卖家API>在线发货API
    b01: function () {
        return '\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/c7201d890aae4d6ea184d19813225cd0" target="_blank">dh.online.channel.list$1.0</a></td>\
      <td>用于获取系统支持的渠道列表信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/74973c227d99434eb4debbbbfbd1c2b0" target="_blank">dh.online.collect.cancel$1.0</a></td>\
      <td>取消草稿状态揽收交接单</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/85c21bec4b924067871ac4daf6bfd1d2" target="_blank">dh.online.collect.channel.list$1.0</a></td>\
      <td>用于获取系统支持的揽收渠道列表信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/8e423bfbf3964a76a51717afd46ff3a2" target="_blank">dh.online.collect.detail$1.0</a></td>\
      <td>获取揽收单详情信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/b0dac80698704046abf2b8ba036f0d31" target="_blank">dh.online.collect.draft$1.0</a></td>\
      <td>创建草稿状态揽收交接单</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/33a39d99bc65488d8e7420344283b6f7" target="_blank">dh.online.collect.label$1.0</a></td>\
      <td>打印揽收单面单</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/a9ef64901d9344718f6a4caacf6edce9" target="_blank">dh.online.collect.submit$1.0</a></td>\
      <td>提交揽收单</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/f092931df135452dbf993a9d9f543bc5" target="_blank">dh.online.collect.update$1.0</a></td>\
      <td>修改草稿状态揽收交接单</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/0a6a278058324913899aa0d057c1350e" target="_blank">dh.online.delivery.modify$1.0</a></td>\
      <td>用于修改DHGate平台的运单号</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/d6754c0d25ea4742b4c0e870d382ae46" target="_blank">dh.online.freight.estimate$1.0</a></td>\
      <td>用于估算运费</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/4286d3d8e8b4468b9905e7b4c886fd95" target="_blank">dh.online.label.get$1.0</a></td>\
      <td>用于查询运单的标签</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/698552ab822344cea5179d1975476fe9" target="_blank">dh.online.order.batch$1.0</a></td>\
      <td>用于批量查询已变更状态的运单信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/d469f62fc3fe4100872d1bcca8b80055" target="_blank">dh.online.order.cancelMerge$1.0</a></td>\
      <td>用于取消参加合包的订单</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/41cebe4933184842bb771e09fa22e0ea" target="_blank">dh.online.order.get$1.0</a></td>\
      <td>用于查询运单详情</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/696987b54c5e4d16a273890f331c070e" target="_blank">dh.online.order.merge.status$1.0</a></td>\
      <td>查询交易订单合包状态</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/a7e444a47cea45f08fe745a2882cb19e" target="_blank">dh.online.order.place$1.0</a></td>\
      <td>用于申请运单号</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/508b335472bc4a8a8ff4650afc8be070" target="_blank">dh.online.trackinfo.list$1.0</a></td>\
      <td>用于获取运单的物流跟踪信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/7daaf80f0a49410aa0c70d8f75bcc4b0" target="_blank">dh.order.delivery.save$2.0</a></td>\
      <td>上传运单号,可理解为快递单号,仅支持POST方式提交请求。调用此方法前需要先有订单</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/001010" target="_blank">https://open.dhgate.com/docs/api/001010</a>（卖家API &gt; 在线发货API）</td>\
    </tr>';
    },
}
fun.a01();