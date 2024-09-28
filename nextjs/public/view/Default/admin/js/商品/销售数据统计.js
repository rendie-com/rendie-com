'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    this.a02();
  },
  a02:function()
	{
    let html='\
    <table class="table table-hover align-middle">\
      <tr class="thead">\
      <th colspan="4">会员购买率 （会员购买率 = 会员有效订单数 ÷ 会员订单总数）</th>\
    </tr>\
    <tr align="center">\
      <td>会员总数</td>\
      <td>会员有效订单数</td>\
      <td>会员订单总数</td>\
      <td>会员购买率</td>\
    </tr>\
    <tr align="center">\
      <td></td>\
      <td></td>\
      <td></td>\
      <td></td>\
    </tr>\
  </table>\
  <table class="tb">\
    <tr class="thead">\
      <th colspan="3">每会员平均订单数及购物额（每会员订单数 = 会员订单总数 ÷ 会员总数）（每会员购物额 = 会员购物总额 ÷ 会员总数） </th>\
    </tr>\
    <tr align="center">\
      <td>会员购物总额</td>\
      <td>每会员订单数</td>\
      <td>每会员购物额</td>\
    </tr>\
    <tr align="center">\
      <td>￥元</td>\
      <td></td>\
      <td>￥元</td>\
    </tr>\
  </table>\
  <table class="tb">\
    <tr class="thead">\
      <th colspan="3">匿名会员平均订单额及购物总额（匿名会员平均订单额 = 匿名会员购物总额 ÷ 匿名会员订单总数）</th>\
    </tr>\
    <tr align="center">\
      <td>匿名会员购物总额</td>\
      <td>匿名会员订单总数</td>\
      <td>匿名会员平均订单额</td>\
    </tr>\
    <tr align="center">\
      <td>￥元</td>\
      <td></td>\
      <td>￥元</td>\
    </tr>\
  </table>\
  <table class="tb">\
    <tr class="thead">\
      <th colspan="3">综合统计</th>\
    </tr>\
    <tr align="center">\
      <td>总订单数 ／ 总购买金额</td>\
      <td>会员订单% ／非会员订单%　</td>\
      <td>会员购买金额% ／非会员购买金额%</td>\
    </tr>\
    <tr align="center">\
      <td>元</td>\
      <td>／</td>\
      <td>／</td>\
    </tr>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();