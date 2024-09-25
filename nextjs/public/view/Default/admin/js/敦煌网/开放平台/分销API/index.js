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
                <li class="hover" onclick="fun.c01($(this),\'b01\')">商品API</li>\
                <li onclick="fun.c01($(this),\'b02\')">订单API</li>\
                <li onclick="fun.c01($(this),\'b03\')">物流API</li>\
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
    //分销API > 商品API
    b01: function () {
        return '\
    <tr>\
      <td><a href="/docs/api/detail/b88e10c7cdc247fca59419b85be37e5b" target="_blank">dh.dropshipping.currency.list$1.0</a></td>\
      <td>【币种API】 获取币种列表</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/4205fbd6d6b74a119529836aa1e4cf22" target="_blank">dh.dropshipping.dispcategory.list$1.0</a></td>\
      <td>【类目API】 根据展示类目ID查询子类目信息,如果类目ID为空返回所有的一级类目</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/7c648dbc583544bdb6163138424ee4a1" target="_blank">dh.dropshipping.item.get$1.0</a></td>\
      <td>【商品API】 获取详情</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/c0a1672dfdce4bb8a21c6551f40906b4" target="_blank">dh.dropshipping.item.list$1.0</a></td>\
      <td>【列表API】 获取分销商品列表信息接口，该列表所返回的商品信息为商品的简略信息。</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/abcd2e67497e41b5a29c73085d64399d" target="_blank">dh.dropshipping.price.get$1.0</a></td>\
      <td>【商品API】 获取商品价格</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/6d306cdb84f14a24a8834e2a2206b7e5" target="_blank">dh.webhook.subscribe$1.0</a></td>\
      <td>【webhook API】 订阅商品</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/430e21617daa4a2e8eb19518ac6b4eab" target="_blank">dh.webhook.unsubscribe$1.0</a></td>\
      <td>【webhook API】 取消订阅商品</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/004001" target="_blank">https://open.dhgate.com/docs/api/004001</a>（分销API &gt; 商品API）</td>\
    </tr>';
    },
    //分销API > 订单API
    b02: function () {
        return '\
    <tr>\
      <td><a href="/docs/api/detail/1231fa83e6094cbab75d3a8d27913776" target="_blank">dh.buyer.order.get$2.0</a></td>\
      <td>买家查询订单详情接口</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/aab57915403f4870bae8ae16ba66a812" target="_blank">dh.buyer.order.pay$1.0</a></td>\
      <td>买家订单支付接口</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/d57650c0b5424bf981d12a8f08653115" target="_blank">dh.buyer.order.place$2.0</a></td>\
      <td>买家下单接口</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/fab4906ab8014172935302925706bea3" target="_blank">dh.buyer.trade.order.status.get$1.0</a></td>\
      <td>买家查询订单状态</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/004002" target="_blank">https://open.dhgate.com/docs/api/004002</a>（分销API &gt; 订单API）</td>\
    </tr>';
    },
    //分销API > 物流API
    b03: function () {
        return '\
    <tr>\
      <td><a href="/docs/api/detail/b53f9cec18034311972a0ac458e5fc46" target="_blank">dh.dropshipping.ship.get$1.0</a></td>\
      <td>【物流信息API】 获取商品运费详情。</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/004003" target="_blank">https://open.dhgate.com/docs/api/004003</a>（分销API &gt; 物流API）</td>\
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