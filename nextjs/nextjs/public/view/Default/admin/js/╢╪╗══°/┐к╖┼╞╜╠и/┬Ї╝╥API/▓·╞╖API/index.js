'use strict';
var fun =
{
    obj: {
        username: "", fromid: 0, token: []
    },
   a01: function () {
        //obj.arr[3]        选择JS文件
        //obj.arr[4]        翻页
        //obj.arr[5]        切换账户
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
                    <li val="010">产品</li>\
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
                <div class="hide" id="dh_item_list"></div>\
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
                $("#dh_item_list,#thisCode").hide()
            }
            else if (mode == "010") {
                $("#dh_item_list").show()
                $("#api,#thisCode").hide()
                Tool.dh_item_list.a01(This.obj.token.access_token);
            }
            else if (mode == "001") {
                $("#api,#dh_item_list").hide()
                $("#thisCode").show()
            }
        })
    },
    //卖家API>产品API
    b01: function () {
        return '\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/a0d9e78c7ff84c0cb877c0c077afd3c4" target="_blank">dh.item.add$2.0</a></td>\
          <td>卖家发布产品信息,仅支持POST方式提交请求.入参关联接口：dh.categorys.get，dh.album.img.upload，dh.shipping.templates.get等</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/6ff0cb895263438f8b53d6cc1d41d5f3" target="_blank">dh.item.aftersale.list$2.0</a></td>\
          <td>获取售后模板列表接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/35c381fb724746179da4131c5fb762b6" target="_blank">dh.item.base.update$2.0</a></td>\
          <td>更新俄语站产品基本信息接口；仅支持POST方式提交请求。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/020a5d567c234285a31aa7e9e0d66a68" target="_blank">dh.item.delete.list$2.0</a></td>\
          <td>批量删除产品,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/33b0a426d20c427b82e526f8aad05237" target="_blank">dh.item.downshelf.list$2.0</a></td>\
          <td>批量下架产品,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/9ada9ab8400d4d45bb74f55005c4a5ef" target="_blank">dh.item.get$2.0</a></td>\
          <td>卖家获取产品详情</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/650269b0f3bc4dc89b52de4db29c732d" target="_blank">dh.item.get.stock$1.0</a></td>\
          <td>获取商品的备货信息，包括商品是否有备货、备货期、扣减库存类型、以及有备货时各sku(包括不可销售的sku)在各备货地对应的库存数量；仅支持POST方式提交请求。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/0ee50432f18940da86660acbf479d244" target="_blank">dh.item.group.list$2.0</a></td>\
          <td>获取产品组列表接口,获取卖家所有产品组信息</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/423e9d1318f64930aa2e410753b21e14" target="_blank">dh.item.html.get$2.0</a></td>\
          <td>获取产品长描信息</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/91e0dc6ecb1542c19ae8fbf18e3bc5d4" target="_blank">dh.item.leading.update.list$2.0</a></td>\
          <td>批量修改备货期接口；仅支持POST方式提交请求。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/dfbf15b1b02847cca5b85ae8dc059de9" target="_blank">dh.item.list$2.0</a></td>\
          <td>卖家获取产品列表信息接口，该列表所返回的产品信息为产品的简略信息。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/ecf124bc8d96490d86e94bcb2e2890b9" target="_blank">dh.item.price.update$2.0</a></td>\
          <td>修改产品价格信息接口；仅支持POST方式提交请求。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/951cde607b75428abdff781970163342" target="_blank">dh.item.short.video.upload$1.0</a></td>\
          <td>【商品短视频API】 短视频上传</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/6e7e42c3ebe341deb6e3cdd809399299" target="_blank">dh.item.short.video.uploadQuery$1.0</a></td>\
          <td>【商品短视频API】 上传查询</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/7f6f1af050b44194a0f31ec76bc6fe34" target="_blank">dh.item.sku.get$2.0</a></td>\
          <td>获得产品sku信息接口.skuId通过dh.item.sku.list获取</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/a36d979f9bec4120883b7b93b8029a8c" target="_blank">dh.item.sku.list$2.0</a></td>\
          <td>产品sku列表接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/ae7da68321a64dfcab90351184827154" target="_blank">dh.item.skuAttrval.get$2.0</a></td>\
          <td>获得产品sku属性值列表接口，skuId通过dh.product.sku.list获取</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/697d1cf57de84fc699a2369c661fe867" target="_blank">dh.item.status.get$2.0</a></td>\
          <td>产品状态接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/bfa962263dff4cf0b93b32a1e8d9b5e2" target="_blank">dh.item.template.list$2.0</a></td>\
          <td>获取尺码模板列表接口。返回内容为空表示查询不到尺码列表信息</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/66005e4b70a4489e97a079c6cf9ceaf6" target="_blank">dh.item.update$2.0</a></td>\
          <td>通过下载产品详情接口（dh.item.get）所返回的参数,上传产品接口（dh.item.add）所上传的参数按照卖家要求修改后作为修改产品的入参参数</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/9302888ede734d90885191abef6d11e0" target="_blank">dh.item.update.sku.stock.quantity$1.0</a></td>\
          <td>更新商品sku的备货数量，当商品备货状态为有备货时才能更新商品sku备货数量;仅支持POST方式提交请求。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/2816b059f6ab4b4084b92b881ec38030" target="_blank">dh.item.update.stock$1.0</a></td>\
          <td>更新商品备货信息，当商品备货状态为有备货时才能更新商品sku备货数量;仅支持POST方式提交请求。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/a7295bb041944d80b2799c8d7bcb2ff8" target="_blank">dh.item.upshelf.list$2.0</a></td>\
          <td>批量上架产品,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/04eb90ad235142b29a1551d03f875eef" target="_blank">dh.item.wholesale.update.list$2.0</a></td>\
          <td>批量修改折扣接口；仅支持POST方式提交请求。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/7cbcd7352a954ba6ac1a1d168e75ea6b" target="_blank">dh.product.get$1.1</a></td>\
          <td>卖家获取产品详情(建议使用dh.item.get 2.0接口)</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/0c7a6c7045f44a5c97cc44bc0e822fce" target="_blank">dh.product.html.get$1.0</a></td>\
          <td>获取产品长描内容接口,获取产品长描信息</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/1ed7b1d62d57463089a230dbbbae85e6" target="_blank">dh.product.state.get$1.0</a></td>\
          <td>产品状态接口</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/1a9e9f81baaf4d96a9983d68a222343b" target="_blank">dh.products.get$1.0</a></td>\
          <td>卖家获取产品列表(建议使用dh.item.list 2.0接口)</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/6dc3fccafb624e29beac8286f826884c" target="_blank">dh.relmodel.add$2.0</a></td>\
          <td>卖家增加关联产品模板信息,仅支持POST方式提交请求.</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/c1d5b842a03146cf9e145d662fb149df" target="_blank">dh.relmodel.delete$2.0</a></td>\
          <td>卖家批量删除关联产品模板,仅支持POST方式提交请求.</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/0ea0f1a4be734a42b72de0301af39bba" target="_blank">dh.relmodel.modify$2.0</a></td>\
          <td>卖家修改关联产品模板信息,仅支持POST方式提交请求.</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/f6a7409294f94ee190c63ab25e7186cc" target="_blank">dh.relmodel.pageget$2.0</a></td>\
          <td>卖家获取关联产品模板详细信息包括模板关联的产品</td>\
        </tr>\
        <tr>\
          <td class="right">来源：</td>\
          <td><a href="https://open.dhgate.com/docs/api/001008" target="_blank">https://open.dhgate.com/docs/api/001008</a>（卖家API &gt; 产品API）</td>\
        </tr>';
    }
}
fun.a01();