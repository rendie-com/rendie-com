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
                    <li class="hover" val="1000">接口</li>\
                    <li val="0100">类目</li>\
                    <li val="0010">佣金率</li>\
                    <li val="0001">当前代码</li>\
		        </ul>\
                <table class="table table-hover" id="api">\
                  <thead class="table-light">\
                  <tr>\
                    <th class="w300">API名称</th>\
                    <th>API描述</th>\
                  </tr>\
                  </thead>\
                  <tbody>'+ this.b01() + '</tbody>\
                </table>\
                <div id="dh_category_get"></div>\
                <table class="table table-hover align-middle hide center" id="dh_categorys_commissions"></table>\
                <table class="table align-middle hide" id="thisCode">\
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
            if (mode == "1000") {
                $("#api").show()
                $("#dh_category_get,#dh_categorys_commissions,#thisCode").hide()
            }
            else if (mode == "0100") {
                $("#dh_category_get").show()
                $("#api,#dh_categorys_commissions,#thisCode").hide()
                Tool.dh_category_list.a01(This.obj.token.access_token);
            }
            else if (mode == "0010") {
                $("#dh_categorys_commissions").show()
                $("#api,#dh_category_get,#thisCode").hide()
                Tool.dh_categorys_commissions.a01(This.obj.token.access_token);
            }
            else if (mode == "0001") {
                $("#api,#dh_category_get,#dh_categorys_commissions").hide()
                $("#thisCode").show()
            }
        })
    },
    //卖家API>类目API
    b01: function () {
        return '\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/13bda4d491b44ea9811da9602ae15aef" target="_blank">dh.category.attrval.list$2.0</a></td>\
          <td>根据发布类目id、属性id、属性值id获取子属性、子属性值列表信息。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/6e03a743b995467bab9231f62abe4824" target="_blank">dh.category.attrval.listBrand$2.0</a></td>\
          <td>根据发布类目id,子属性id,发布属性值id获取子属性值列表</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/46780095a737436bae5f4a5a00111f78" target="_blank">dh.category.brandList$2.0</a></td>\
          <td>通过品牌名称获取品牌列表属性</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/dbfb7746145641919ec018a0e3f93115" target="_blank">dh.category.brands$2.0</a></td>\
          <td>通过品牌名称获取品牌列表属性</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/4232db68acff43ce961066903a8196ba" target="_blank">dh.category.get$1.0</a></td>\
          <td>获取类目属性,根据叶子发布类目ID获取类目属性列表（包含属性值）和类目限制数据（价格）。传入有效的叶子类目ID。建议后期更换使用dh.category.get 2.0接口。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/0c39f5a828134110901bbf78356ef1ec" target="_blank">dh.category.get$2.0</a></td>\
          <td>获取类目详细信息，包括类目信息、属性信息、属性值信息、和类目限制数据(价格、必须包含的关键字、不能包含的关键字)。入参来源：获取类目列表接口(dh.category.list)。注意传入有效的叶子类目ID。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/d63ce88bdf4d49699609795d3f094b64" target="_blank">dh.category.is3Ccategory$2.0</a></td>\
          <td>判断是否为3C类目或获取所有3C类目，入参不传为获取全部3C类目值，以逗号分隔；用于上传,修改产品时，判断是否需要填写售后模板属性值</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/61b58c6034cd489398a3896175fc2eaf" target="_blank">dh.category.itemname.valid$2.0</a></td>\
          <td>检查产品所在的类目是否容许对应的产品名；入参来源：获取类目列表接口(dh.categorys.get)返回的类目ID参数入参参数</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/79dff528fce6490c829476e6063651c5" target="_blank">dh.category.list$2.0</a></td>\
          <td>根据类目ID查询子类目信息,如果类目ID为空返回所有的一级类目, 所返回的信息可作为获取类目属性接口(dh.category.get)和商品上传（dh.product.add）的入参参数。</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/caf3c526acf54886b29fe82da245248b" target="_blank">dh.category.path.get$2.0</a></td>\
          <td>根据类目ID获取该类目路径上的所有主线类目,即通过子类目获取其以上主线类目</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/4cc82ed528954d8d94d19e040340b72d" target="_blank">dh.category.proname.valid$1.0</a></td>\
          <td>检查产品所在的类目是否容许对应的产品名</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/4872e78092e94e509a1cf120b85bfc1a" target="_blank">dh.categoryid.list$2.0</a></td>\
          <td>通过类目修改时间获取类目Id列表</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/478a854210b94bbe9dc5c5382ce2946f" target="_blank">dh.categorys.commissions$1.0</a></td>\
          <td>获取佣金率列表,根据佣金公式计算佣金率</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/2797047a86b74140ba935ad9d3f1d4e1" target="_blank">dh.categorys.get$1.0</a></td>\
          <td>获取类目列表,根据类目ID查询子类目信息</td>\
        </tr>\
        <tr>\
          <td class="right">来源：</td>\
          <td><a href="https://open.dhgate.com/docs/api/001003" target="_blank">https://open.dhgate.com/docs/api/001003</a>（卖家API &gt; 类目API）</td>\
        </tr>'
    }
}
fun.a01();