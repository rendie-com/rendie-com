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
    //卖家API>客户评论API
    b01: function () {
        return '\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/f16a7eb57eb84264b404efeae39e1de5" target="_blank">dh.review.apply$1.0</a></td>\
      <td>申请修改买家给卖价的评价</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/7e4a890b07ad46038b19d44c79632ec4" target="_blank">dh.review.delete$1.0</a></td>\
      <td>卖家删除对买家的评价</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/4f9e80e8827a4849906ea11cc8df24ff" target="_blank">dh.review.feedback$1.0</a></td>\
      <td>卖家对买家的评价</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/e9545d494eb94d09b5bf5a0971874ad1" target="_blank">dh.review.get$1.0</a></td>\
      <td>获取买家给卖家的评价列表</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/deffbdc8f5ba4791b34aa59bdf73329b" target="_blank">dh.review.reply$1.0</a></td>\
      <td>保存卖家回复内容</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/cf60c9f0e07442a7ac1c5e3b9275c7f1" target="_blank">dh.review.send$1.0</a></td>\
      <td>获取卖家给买家的评价列表</td>\
    </tr>\
    <tr>\
      <td><a href="https://open.dhgate.com/docs/api/detail/d76b5c0840aa4279bf0801763a7481c6" target="_blank">dh.review.wait$1.0</a></td>\
      <td>获取卖家给买家的评价列表</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/001004" target="_blank">https://open.dhgate.com/docs/api/001004</a>（卖家API &gt; 客户评论API）</td>\
    </tr>'
    },
}
fun.a01();