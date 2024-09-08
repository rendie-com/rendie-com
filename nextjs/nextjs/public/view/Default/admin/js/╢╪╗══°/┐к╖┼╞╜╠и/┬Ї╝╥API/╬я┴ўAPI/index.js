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
    //卖家API>物流API
    b01: function () {
        return '\
    <tr data-row-key="3b7ecebaefce4802a6b6dbc0efbc1f85">\
      <td><a href="https://open.dhgate.com/docs/api/detail/3b7ecebaefce4802a6b6dbc0efbc1f85" target="_blank">dh.shipping.compute.item$2.0</a></td>\
      <td>计算单个产品，且指定唯一物流方式，所得到的运费接口</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/03196603aa044366b6a50eb13e04c784" target="_blank">dh.shipping.compute.package$2.0</a></td>\
      <td>产品运费计算通用接口，直接通过物流包装信息、产品数量、运达国家等信息计算运费列表信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/6d385f4629094c4293621841ad80d3c5" target="_blank">dh.shipping.template.get$1.0</a></td>\
      <td>卖家获取运费模版</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/9265652be9014117b23c1e135a158b3e" target="_blank">dh.shipping.template.get$2.0</a></td>\
      <td>运费模版详情接口</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/e30b8898e5ea464499c2844fa4522dd5" target="_blank">dh.shipping.template.list$2.0</a></td>\
      <td>卖家获取运费模版列表基础信息接口，此接口提供运费模板基本信息。获取运费模板详情请调用接口dh.shipping.template.get</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/f87595d16ddc4753ba09a0e6e19c1be7" target="_blank">dh.shipping.templates.get$1.0</a></td>\
      <td>卖家获取运费模版列表</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/86ed0720a2324e84bbac9b7cec307ad1" target="_blank">dh.shipping.trackinfo.get$1.0</a></td>\
      <td>获得物流信息</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/fd9c221f4a204d1cad6e0696b5268cb3" target="_blank">dh.shipping.trackinfo.list$2.0</a></td>\
      <td>物流追踪信息接口</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/c995c197cde44d51aae8a5499b514029" target="_blank">dh.shipping.typelist$2.0</a></td>\
      <td>获取回填中物流方式列表信息，返回所有物流方式</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/160a8e7048ab401c89e1e57154b0045a" target="_blank">dh.shipping.types.get$1.0</a></td>\
      <td>获取运费模板中物流方式列表信息</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/001005" target="_blank">https://open.dhgate.com/docs/api/001005</a>（卖家API &gt; 物流API）</td>\
    </tr>';
    },
    
}
fun.a01();