'use strict';
var fun =
{
    obj: {
        username: "", fromid: 0, token: []
    },
   a01: function () {
        Tool.header02.a01("-_-20", this.a03, this);
    },
    a03: function (header, fromid, username, token) {
        this.obj.fromid = fromid
        this.obj.username = username
        this.obj.token = token
        ////////////////////////////////////////
       let html = header + '\
		<div class="p-2">\
            '+ Tool.header01(obj.arr[3]) + '\
            <div class="border">\
                <ul class="makeHtmlTab" id="makeHtmlTab">\
                    <li class="hover" val="100">接口</li>\
                    <li val="010">订单</li>\
                    <li val="001">当前代码</li>\
		        </ul>\
               <table class="table table-hover border" id="api">\
                  <thead class="table-light">\
                  <tr>\
                    <th class="w300">API名称</th>\
                    <th>API描述</th>\
                  </tr>\
                  </thead>\
                  <tbody>'+ this.b01() + '</tbody>\
                </table>\
                <div class="hide" id="dh_order_list_get"></div>\
                <table class="table border align-middle hide" id="thisCode">\
                    <tbody>\
                        <tr>\
                            <td class="right w100">请求地址：</td><td><input type="text" class="form-control" id="thisUrl" disabled="disabled"></td>\
                        </tr>\
                        <tr>\
                            <td class="right w100">post参数：</td><td><textarea id="thisPost" rows="10" class="form-control" disabled="disabled"></textarea></td>\
                        </tr>\
                        <tr>\
                            <td class="right w100">返回内容：</td><td><textarea id="thisJson" rows="30" class="form-control" disabled="disabled"></textarea></td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
       </div>'
        Tool.html(this.a04, this, html);
    },
    a04: function () {
        let This = this;
        $("#makeHtmlTab li").click(function () {
            $("#makeHtmlTab li").removeAttr('class')
            $(this).attr("class", "hover")
            let mode = $(this).attr("val")
            if (mode == "100") {
                $("#api").show()
                $("#dh_order_list_get,#thisCode").hide()
            }
            else if (mode == "010") {
                $("#dh_order_list_get").show()
                $("#api,#thisCode").hide()
                Tool.dh_order_list_get.a01(This.obj.token.access_token);
            }
            else if (mode == "001") {
                $("#api,#dh_order_list_get").hide()
                $("#thisCode").show()
            }
        })
    },
    //卖家API>订单API
    b01: function () {
        return '\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/fb2fb522d3e24ce6bf89b52f65e572db" target="_blank">dh.order.applymoney.check$2.0</a></td>\
          <td>判断订单是否可以请款,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/a9f5eadf291e40fcb86816426fb93027" target="_blank">dh.order.applymoney.get$1.0</a></td>\
          <td>判断订单是否可以请款,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/43b5964122524764af4b48d24fba2b87" target="_blank">dh.order.applymoney.get$2.0</a></td>\
          <td>订单请款接口,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/24e79cf141d24a3eb3024e6561534dce" target="_blank">dh.order.disputeclose.list$2.0</a></td>\
          <td>获取seller纠纷关闭订单列表,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/2e60596aa4514dc0899823aeebba2797" target="_blank">dh.order.disputeopen.list$2.0</a></td>\
          <td>获取seller纠纷开启订单列表,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/98a2cfec450e4bdaaa034fdb3c70dfdd" target="_blank">dh.order.get$1.0</a></td>\
          <td>订单详情接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/3939130a447d4b2e8f805ebb85babff1" target="_blank">dh.order.get$1.1</a></td>\
          <td>订单详情接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/c15148f0c0c54780ab8ef712e3e3047a" target="_blank">dh.order.get$2.0</a></td>\
          <td>订单详情接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/697417e4374543e296c676bb9b39ce8a" target="_blank">dh.order.list.get$1.1</a></td>\
          <td>获取seller订单列表,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/110f7e3d7cea490888ba23646df3b2ac" target="_blank">dh.order.list.get$1.2</a></td>\
          <td>获取seller订单列表,仅支持POST方式提交请求,时间跨度不能超过1年（365天）</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/60ac994e052945c49b1c3096e38bf126" target="_blank">dh.order.list.get$1.3</a></td>\
          <td>获取seller订单列表,仅支持POST方式提交请求,时间跨度不能超过1年（365天）</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/3989a45314ab4887aff6ee6a68f14dfe" target="_blank">dh.order.list.get$2.0</a></td>\
          <td>获取seller订单列表,仅支持POST方式提交请求,时间跨度不能超过1年（365天）</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/6e2f0d417dc54dc29b596c1d7bfebbd1" target="_blank">dh.order.money.get$1.0</a></td>\
          <td>订单请款接口,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/e635ce70d46343b1a671e458a58d5de2" target="_blank">dh.order.product.get$1.0</a></td>\
          <td>订单产品信息接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/f460cbb82a5246329ed3bfd0808e3311" target="_blank">dh.order.product.get$1.1</a></td>\
          <td>订单产品信息接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/794f8165ba6c4867a072477706e7b72f" target="_blank">dh.order.product.get$2.0</a></td>\
          <td>订单产品信息接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/08a7f486063f431c82647403a8305dad" target="_blank">dh.order.refund.list$1.0</a></td>\
          <td>获取订单的退款信息接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/08e8609b21c54b1789e5635d15a6b4ad" target="_blank">dh.order.refund.list$1.1</a></td>\
          <td>获取订单的退款信息接口</td>\
        </tr>\
        <tr>\
          <td class="right">来源：</td>\
          <td><a href="https://open.dhgate.com/docs/api/001007" target="_blank">https://open.dhgate.com/docs/api/001007</a>（卖家API &gt; 订单API）</td>\
        </tr>';
    },
}
fun.a01();