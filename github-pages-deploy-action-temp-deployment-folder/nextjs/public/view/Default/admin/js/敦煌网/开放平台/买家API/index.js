'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        this.a02();
    },
    a02: function () {
        Tool.header02.a01(obj.arr[3], this.a03, this);
    },
    a03: function (header, fromid, username, token) {
        let html = header + '\
		<div class="p-2">\
            <ul class="makeHtmlTab">\
              <li class="hover" onclick="fun.c01($(this),\'b01\')">联盟API</li>\
              <li onclick="fun.c01($(this),\'b02\')">交易API</li>\
              <li onclick="fun.c01($(this),\'b03\')">用户API</li>\
		    </ul>\
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
    //买家API &gt; 联盟API
    b01: function () {
        return '\
    <tr>\
      <td><a href="/docs/api/detail/95225875777d4dfba54004caa1e7e087" target="_blank">dh.buyer.affiliate.campaign.list$1.0</a></td>\
      <td>优惠活动列表</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/ca200b2d825544c9ad924194054480e6" target="_blank">dh.buyer.affiliate.get$1.0</a></td>\
      <td>推广者订单详情</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/f9c66d78ac7746d495bbc2eaf3d45ca6" target="_blank">dh.buyer.affiliate.list$1.0</a></td>\
      <td>推广者订单列表</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/002003" target="_blank">https://open.dhgate.com/docs/api/002003</a>（买家API &gt; 联盟API）</td>\
    </tr>';
    },
    //买家API &gt; 交易API
    b02: function () {
        return '\
    <tr>\
      <td><a href="/docs/api/detail/e3170b24293f4aeb839ff8de16c1f816" target="_blank">dh.buyer.trade.deliveryno.get$1.0</a></td>\
      <td>通过订单号查询货运单号接口</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/857df47ad5f74e44aed4821f0213252e" target="_blank">dh.buyer.trade.order.cancel$2.0</a></td>\
      <td>买家取消订单接口</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/6f60731eab4e4f979a7cba6482c37a5d" target="_blank">dh.buyer.trade.order.confirm$1.0</a></td>\
      <td>买家订单确认</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/c340cf8d47d541ef9cb99f09eca59a29" target="_blank">dh.buyer.trade.order.confirm$2.0</a></td>\
      <td>买家订单确认</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/4bc900db0fd54eb18c5e6af43a9c879f" target="_blank">dh.buyer.trade.order.place$1.0</a></td>\
      <td>买家下单接口</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/002001" target="_blank">https://open.dhgate.com/docs/api/002001</a>（买家API &gt; 交易API）</td>\
    </tr>';
    },
    //买家API &gt; 用户API
    b03: function () {
        return '\
    <tr>\
      <td><a href="/docs/api/detail/a30569b5139e4de088ada07aa0e7fbe8" target="_blank">dh.buyer.user.get$2.0</a></td>\
      <td>查询买家账号基本信息</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/002002" target="_blank">https://open.dhgate.com/docs/api/002002</a>（买家API &gt; 用户API）</td>\
    </tr>';
    },
    c01: function (This, val) {
        $(".makeHtmlTab li").attr("class", "");
        This.attr("class", "hover");
        ///////////////////////////////////////
        let str = "";
        switch (val) {
            case "b01": str = this.b01(); break;
            case "b02": str = this.b02(); break;
            case "b03": str = this.b03(); break;
            default: str = '<tr><td colspan="2">未知</td></tr>'; break;
        }
        $("#tbody").html(str)
    }
}
fun.a01();