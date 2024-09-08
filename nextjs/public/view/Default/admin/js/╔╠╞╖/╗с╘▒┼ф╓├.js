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
    <header class="panel-heading">会员配置</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td align="right" width="300">是否允许新会员注册：</td>\
      <td align="left"><input name="whether_member" type="radio" value="1" id="whether_member-1">\
        <label for="whether_member-1">是</label>\
        <input name="whether_member" type="radio" value="0"id="whether_member-0">\
        <label for="whether_member-0">否</label></td>\
      <td style="color:#999;">选择否将不允许会员注册</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">注册成功发邮件通知：</td>\
      <td align="left"><input name="EmailCheckTF" type="radio" value="1" id="EmailCheckTF-1">\
        <label for="EmailCheckTF-1">是</label>\
        <input name="EmailCheckTF" type="radio" value="0" id="EmailCheckTF-0">\
        <label for="EmailCheckTF-0">否</label></td>\
      <td style="color:#999;">用户组设置成需要邮件验证时,只有激活成功才会发送。</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">新注册启用IP限制：</td>\
      <td align="left"><input name="IP_limit" type="radio" value="1"id="IP_limit-1">\
        <label for="IP_limit-1">是</label>\
        <input name="IP_limit" type="radio" value="0"id="IP_limit-0">\
        <label for="IP_limit-0">否</label></td>\
      <td style="color:#999;">若选择是，那么一个IP地址只能注册一次</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">新注册允许上传文件：</td>\
      <td align="left"><input name="Allowed_upload" type="radio" value="1" id="Allowed_upload-1">\
        <label for="Allowed_upload-1">允许</label>\
        <input name="Allowed_upload" type="radio" value="0" id="Allowed_upload-0">\
        <label for="Allowed_upload-0">不允许</label></td>\
      <td style="color:#999;">指当有自定义上传字段时，允许会员注册时同时上传文件。</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">启用验证码：</td>\
      <td align="left"><input name="VerificCodeTF" type="checkbox" value="1"id="VerificCodeTF-1">\
        <label for="VerificCodeTF-1">注册时启用验证码</label>\
        <input name="LoginVerificCodeTF" type="checkbox" value="1"id="LoginVerificCodeTF-1">\
        checked="checked"{/if}>\
        <label for="LoginVerificCodeTF-1">登录时启用验证码</label></td>\
      <td style="color:#999;">启用验证码功能可以在一定程度上防止暴力营销软件或注册机自动注册</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">每个Email允许注册多次：</td>\
      <td align="left"><input name="EmailMultiRegTF" type="radio" value="1"id="EmailMultiRegTF-1">\
        <label for="EmailMultiRegTF-1">是</label>\
        <input name="EmailMultiRegTF" type="radio" value="0"id="EmailMultiRegTF-0">\
        <label for="EmailMultiRegTF-0">否</label></td>\
      <td style="color:#999;">若选择是，则利用同一个Email可以注册多个会员。</td>\
    </tr>\
    <tr>\
      <td align="right">每个手机号码只能注册一次：</td>\
      <td><input name="Mobile_allows_registered" type="radio" value="1"id="Mobile_allows_registered-1">\
        <label for="Mobile_allows_registered-1">是</label>\
        <input name="Mobile_allows_registered" type="radio" value="0" id="Mobile_allows_registered-0">\
        <label for="Mobile_allows_registered-0">否</label></td>\
      <td class=\'tips\'>开启后可以有效防止恶意注册</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">新会员注册时用户名：</td>\
      <td align="left"> 最少字符数\
        <input name="UserNameLimitChar" type="text" size="3" value="{Fun(Config(UserNameLimitChar))}" style="text-align:center">\
        个字符&nbsp;&nbsp;最多字符数\
        <input name="UserNameMaxChar" type="text" size="3" value="{Fun(Config(UserNameMaxChar))}" style="text-align:center">\
        个字符 </td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right" width="300">禁止注册的用户名：</td>\
      <td align="left"><textarea name="EnabledUserName" cols="50" rows="3">{Fun(Config(EnabledUserName))}</textarea></td>\
      <td style="color:#999;">在左边指定的用户名将被禁止注册，每个用户名请用"|"符号分隔</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">只允许一个人登录：</td>\
      <td align="left"><input name="ALogged" type="radio" value="1"id="ALogged-1">\
        <label for="ALogged-1">是</label>\
        <input name="ALogged" type="radio" value="0"id="ALogged-0">\
        <label for="ALogged-0">否</label></td>\
      <td style="color:#999;">启用此功能可以有效防止一个会员账号多人使用的情况</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">新注册会员：</td>\
      <td align="left"> 赠送资金\
        <input style=\'text-align:center\' name="UserFunds" type="text" size="5" value="{Fun(Config(UserFunds))}">\
        元 \
        赠送积分\
        <input style=\'text-align:center\' name="UserIntegral" type="text" size="5" value="{Fun(Config(UserIntegral))}">\
        分 \
        赠送点券\
        <input style=\'text-align:center\' name="IntegralVoucher" type="text" size="5" value="{Fun(Config(IntegralVoucher))}">\
        点 </td>\
      <td style="color:#999;">为0时不赠送</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">积分与点券兑换比率：</td>\
      <td align="left"><input style=\'text-align:center\' name="voucher_exchange" type="text" size="5" value="{Fun(Config(voucher_exchange))}">\
        分积分可兑换 <font color=red>1</font> 点点券 </td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right" width="300">积分与有效期兑换比率：</td>\
      <td align="left"><input style=\'text-align:center\' name="Integral_validity" type="text" size="5" value="{Fun(Config(Integral_validity))}">\
        分积分可兑换 <font color=red>1</font> 天有效期 </td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right" width="300">资金与点券兑换比率：</td>\
      <td align="left"><input style=\'text-align:center\' name="Money_Voucher" type="text" size="5" value="{Fun(Config(Money_Voucher))}">\
        元人民币可兑换<font color=red>1</font> 点点券 </td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right" width="300">资金与有效期兑换比率：</td>\
      <td align="left"><input style=\'text-align:center\' name="Money_validity" type="text" size="5" value="{Fun(Config(Money_validity))}">\
        元人民币可兑换 <font color=red>1</font> 天有效期 </td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right" width="300">点券设置：</td>\
      <td align="left"> 名称\
        <input style=\'text-align:center\' name="VoucherName" type="text" size="5" value="{Fun(Config(VoucherName))}">\
        <font color=red>例如：点券、金币</font> 单位\
        <input style=\'text-align:center\' name="VoucherUnit" type="text" size="5" value="{Fun(Config(VoucherUnit))}">\
        <font color=red>例如：点、个</font></td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right" width="300">会员可用空间大小：</td>\
      <td align="left"><input name="Dimensional_Size" type="text" size="5" value="{Fun(Config(Dimensional_Size))}">\
        KB &nbsp;&nbsp; <font color=#ff6600>提示：1 KB = 1024 Byte，1 MB = 1024 KB</font></td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right" width="300"> 推广计划设置：<br/>\
        <a href=\'KS.PromotedPlan.asp\'><font color=red>查看推广记录</font></a></td>\
      <td align="left"> 会员推广赠送积分：\
        <input style=\'text-align:center\' name="promotionIntegral" type="text" size="5" value="{Fun(Config(promotionIntegral))}">\
        分 \
        &nbsp;<font color=green>一天内同一IP获得的访问仅算一次有效推广</font><br/>\
        会员推广赠送积分：\
        <input name="promotionUserIntegral" type="text" size="5" value="1" style=\'text-align:center\'>\
        分 \
        &nbsp;<font color=green>成功推广一个用户注册得到的积分</font><br/>\
        点一个广告赠送积分：\
        <input name="Some_advertising" type="text" size="5" value="{Fun(Config(Some_advertising))}" style=\'text-align:center\'>\
        分 <font color=green>&nbsp;一天内点击同一个广告只计一次积分</font><br/>\
        点一个友情链接赠送积分：\
        <input name="promotion_send_link" type="text" size="5" value="{Fun(Config(promotion_send_link))}" style=\'text-align:center\'>\
        分 \
        &nbsp;<font color=green>一天内点击同一个友情链接只计一次积分</font></td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right" width="300">每个会员每天最多只能增加</td>\
      <td align="left"><input name="maxaddintegral" type="text" size="5" value="{Fun(Config(maxaddintegral))}">\
        个积分 </td>\
      <td style="color:#999;">每个会员一天内达到这里设置的积分,将不能再增加</td>\
    </tr>\
    <tr>\
      <td align="right" width="300">积分/资金互换设置</td>\
      <td align="left"><input name="Money_exchange_voucher" type="checkbox" value=\'1\' id="Money_exchange_voucher-1">\
        <label for="Money_exchange_voucher-1">允许资金兑换点券</label>\
        <br/>\
        <input name="points_for_voucher" type="checkbox" value="1" id="points_for_voucher-1"/>\
        <label for="points_for_voucher-1">允许经验积分兑换点券</label>\
        <br/>\
        <input name="Funds_for_effective_duration" type="checkbox" value="1"id="Funds_for_effective_duration-1">\
        <label for="Funds_for_effective_duration-1">允许资金兑换有效天数</label>\
        <br/>\
        <input name="points_for_effective_days" type="checkbox" value="1"id="points_for_effective_days-1">\
        <label for="points_for_effective_days-1">允许经验积分兑换有效天数</label>\
        <br/>\
        <input name="voucher_exchange_funds" type="checkbox" value="1"id="voucher_exchange_funds-1">\
        <label for="voucher_exchange_funds-1">允许点券兑换资金(不建议开启)</label>\
        <br/>\
        <input name="free_filling" type="checkbox" value="1" id="free_filling-1" >\
        <label for="free_filling-1">允许会员使用自由充</label></td>\
      <td style="color:#999;"></td>\
    </tr>\
    <tr>\
      <td align="right">签到设置：</td>\
      <td> 启用签到功能：\
        <input name="Setting201" type="radio" value="1">\
        是&nbsp;&nbsp;\
        <input name="Setting201" type="radio" value="0">\
        否<br/>\
        开始时间：\
        <input  style="text-align:center" name="Setting206" type="text" size="15" value="{Fun(Config(Setting206))}">\
        格式:年-月-日<br>\
        会员每次签到得：\
        <input  style="text-align:center" name="Setting202" type="text" size="5" value="{Fun(Config(Setting202))}">\
        分<br>\
        会员连续签到：\
        <input  style="text-align:center" onBlur="CheckNumber(this,\'会员连续签天数\');" name="Setting203" type="text" size="5" value="{Fun(Config(Setting203))}">\
        天 得 ：\
        <input  style="text-align:center" onBlur="CheckNumber(this,\'会员连续签天数得积分\');" name="Setting204" type="text" size="5" value="{Fun(Config(Setting204))}">\
        分<br/>\
        会员每次没签到扣：\
        <input  style="text-align:center" name="Setting205" type="text" size="5" value="{Fun(Config(Setting205))}">\
        分\
        &nbsp;&nbsp; <a href="?DelQianDao.html" style="color:red" onClick="return(confirm(\'此操作不可逆，只有改变签到开始时间时才使用，您确定清空签到记录吗？\'));">清空签到记录</a></td>\
      <td class="tips"></td>\
    </tr>\
    <tr>\
      <td align="right"></td>\
      <td align="left"><input type="submit" value="确认更新" class="pn" /></td>\
      <td class=\'tips\'></td>\
    </tr>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();