'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ''//择JS文件        
        obj.params.site = obj.params.site ? obj.params.site : 'tw'
        let html = Tool.header(obj.params.jsFile,obj.params.site) + '\
        <div class="p-2">\
            '+Tool.header3(obj.params.jsFile,obj.params.site)+'\
            <table class="table align-middle">\
            <tbody>\
                <tr><td class="right w200">商品活动：</td><td>'+ this.b03() + '</td></tr>\
                <tr><td class="right">营销工具：</td><td class="p-0">'+ this.b01() + '</td></tr>\
                <tr><td class="right">与买家互动：</td><td>'+ this.b02() + '</td></tr>\
                <tr>\
                <td class="right">跨境活动报名：</td>\
                <td>\
                <button type="button" class="btn btn-secondary" onclick="Tool.openR(\'?jsFile=js15\');">前往报名</button>\
                </td>\
                </tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    //营销工具
    b01: function () {
        return '\
        <table class="table mb-0 center table-hover align-top">\
            <thead class="table-light">\
                <tr>\
                    <th class="w150">活动名称</th>\
                    <th class="w170">30天内是否有活动可做</th>\
                    <th class="left">说明</th>\
                </tr>\
            </thead>\
            <tbody>\
                <tr>\
                    <td style="padding-left: 20px;position: relative;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		                <ul class="dropdown-menu">\
                            <li onClick="Tool.openR(\'?jsFile=js01&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*创建【优惠券】</a></li>\
		                </ul>\
                        优惠券\
                    </td>\
                    <td title="上次活动结束时间">'+ this.b04(config[obj.params.site].coupon_time) + '</td>\
                    <td class="left">\
                    （1）【店铺优惠券1】：3% Shopee币回扣，最高上限数额1，最低消费15，可使用总数100。（3天一个活动，做30天）<br/>\
                    （2）【店铺优惠券2】：折扣金额1，最低消费20，可使用总数100。（3天一个活动，做30天）<br/>\
                    （3）【新买家优惠券】：折扣金额2，最低消费30，可使用总数100。（3天一个活动，做30天）<br/>\
                    （4）【回购买家优惠券】：折扣金额3，最低消费50，可使用总数100。（30天一个活动，做30天）<br/>\
                    （5）【商品优惠券】：折扣金额10，最低消费100，可使用总数100。（3天一个活动，做30天，选100个来源销量大的商品）<br/>\
                    （6）【关注礼优惠券】：最低消费20，折扣金额2，可使用总数100。（3天一个活动，做30天）<br/>\
                    （7）【非公开优惠券】：折扣金额3，最低消费50，可使用总数100。（3天一个活动，做30天）<br/>\
                    （8）【直播优惠券】：折扣金额3，最低消费50，可使用总数100。（3天一个活动，做30天）<br/>\
                    </td>\
                </tr>\
                <tr>\
                    <td style="padding-left: 20px;position: relative;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		                <ul class="dropdown-menu">\
                            <li onClick="Tool.openR(\'?jsFile=js05&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*创建【折扣活动】</a></li>\
		                </ul>\
                        折扣活动\
                    </td>\
                    <td>'+ Tool.js_date_time2(config[obj.params.site].discount_time) + '</td>\
                    <td class="left">\
                    （1）2天一个活动，做10天。<br/>\
                    （2）活动时间可以重叠，但同一时间商品不能重复。<br/>\
                    （3）每个商品都有自己的折扣。（即：指定折扣）<br/>\
                    （4）在指定折扣且包邮门槛下，利润达到10%的商品。（就是“能打折”的商品）<br/>\
                    （5）设置折扣为： 指定折扣 - 6。（例如：指定折扣50，那现在是44。为什么要减6？答：报名商品活动时shopee要求的。）\
                    </td>\
                </tr>\
                <tr>\
                    <td style="padding-left: 20px;position: relative;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		                <ul class="dropdown-menu">\
                            <li onClick="Tool.openR(\'?jsFile=js17&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*创建【套装优惠】</a></li>\
		                </ul>\
                        套装优惠\
                    </td>\
                    <td></td>\
                    <td class="left">（1）【套装优惠】的商品不能与【加购优惠】商品重叠，所以我全做【加购折扣】了，这个功能就没必要做了。</td>\
                </tr>\
                <tr>\
                    <td style="padding-left: 20px;position: relative;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		                <ul class="dropdown-menu">\
                            <li onClick="Tool.openR(\'?jsFile=js13&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*创建【加购优惠】</a></li>\
		                </ul>\
                        加购优惠\
                    </td>\
                    <td>'+ Tool.js_date_time2(config[obj.params.site].add_on_deal_time) + '</td>\
                    <td class="left">\
                    （1）做近30天内<br/>\
                    （2）为每个商品做一个加购优惠，商加商品选100个来源销量大的商品。<br/>\
                    （3）加购是属于折上折（就是要比店内折扣要低），所以我用的是【指定折扣价格】。<br/>\
                    （4）【加购增品】与【加购折扣】的商品不能重叠，所以我全做【加购折扣】了，【加购增品】功能就没必要做了。\
                    </td>\
                </tr>\
                <tr>\
                    <td style="padding-left: 20px;position: relative;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		                <ul class="dropdown-menu">\
                            <li onClick="Tool.openR(\'?jsFile=js09&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*创建【店内秒杀】</a></li>\
		                </ul>\
                        店内秒杀\
                    </td>\
                    <td></td>\
                    <td class="left">\
                    （1）做近3天内的活动，因为会提前减库存，所以我用【最低购买量 * 3】。<br/>\
                    （2）【店内秒杀】是时段报名制，每个时段报10商品。<br/>\
                    （3）每个商品都有自己的折扣。（即：指定折扣）<br/>\
                    （4）商品选来源10个销量大的商品。<br/>\
                    （5）在指定折扣且包邮门槛下，利润达到10% 的商品。（就是“能打折”的商品）<br/>\
                    （6）促销价格: 低于最近7天的最低价格（不包括Shopee 限时选购)。解决方法是在【指定折扣价格-0.01】。<br/>\
                    （7）折扣上限: 10% ~ 99%\
                    </td>\
                </tr>\
                <tr>\
                    <td style="padding-left: 20px;position: relative;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		                <ul class="dropdown-menu">\
                            <li onClick="Tool.open4(\'js0xx1\');"><a class="dropdown-item pointer">*创建【运费促销】</a></li>\
		                </ul>\
                        运费促销\
                    </td>\
                    <td></td>\
                    <td class="left"></td>\
                </tr>\
                <tr>\
                    <td style="padding-left: 20px;position: relative;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		                <ul class="dropdown-menu">\
                            <li onClick="Tool.open4(\'js0xx1\');"><a class="dropdown-item pointer">*创建【样品促销活动】</a></li>\
		                </ul>\
                        样品促销活动\
                    </td>\
                    <td></td>\
                    <td class="left">在订单完成7天后向买家发放商品的优惠券，提升转化率和<b>回购率</b>。</td>\
                </tr>\
            </tbody>\
        </table>'
    },
    //与买家互动
    b02: function () {
        return '\
        <div class="btn-group mt-2">\
            <button type="button" class="btn btn-secondary" onclick="" >\
                <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" class="w50"><path d="M35.522 18a2 2 0 0 1 1.912 1.413l4.407 14.358.035.13c.486 2.066-.46 3.099-2.835 3.099-2.21 0-4.41-1.422-6.599-4.267a2 2 0 0 0-1.585-.78L28 31.951v.02h-2.956a2 2 0 0 0-1.6.798C21.327 35.59 19.165 37 16.96 37c-2.376 0-3.321-1.033-2.835-3.1l.035-.13 4.407-14.357a2 2 0 0 1 1.749-1.406l.163-.007h15.044ZM23 22a.75.75 0 0 0-.743.648l-.007.102v1.5h-1.5a.75.75 0 0 0-.102 1.493l.102.007h1.499l.001 1.5a.75.75 0 0 0 1.493.102l.007-.102-.001-1.5h1.501a.75.75 0 0 0 .102-1.493l-.102-.007h-1.5v-1.5A.75.75 0 0 0 23 22Zm10 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill-rule="evenodd"></path></svg>\
                创建【店铺游戏】\
            </button>\
            <button type="button" class="btn btn-secondary" onclick="" >\
                <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" class="w50"><path fill-rule="evenodd" clip-rule="evenodd" d="M32 22a4.998 4.998 0 0 1-2.492 4.327 9.7 9.7 0 0 1 2.695 1.18 2.799 2.799 0 0 0-.197-.007c-1.282 0-2.426.909-2.649 2.188h-.13c-.899 0-1.727.716-1.727 1.718v.875c0 .463.176.865.455 1.163V38h-8.923a1.843 1.843 0 0 1-1.834-2.023l.118-1.196a9.734 9.734 0 0 1 7.177-8.454A5 5 0 1 1 32 22Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M35.994 29c.656 0 1.188.512 1.188 1.143 0 .466-.29.866-.704 1.045h2.295c.125 0 .227.097.227.218v.875c0 .121-.102.219-.227.219h-9.546a.223.223 0 0 1-.227-.219v-.875c0-.12.102-.218.227-.218h2.295a1.143 1.143 0 0 1-.704-1.045c0-.631.532-1.143 1.188-1.143.365 0 .691.158.91.407l.052.064.01.014.044.066.565.824a.5.5 0 0 0 .825 0l.588-.857.032-.047c.217-.285.567-.471.962-.471Zm-3.988.682a.506.506 0 0 0-.122.997l.052.01.033.005h.977l-.53-.802-.022-.03a.503.503 0 0 0-.332-.177l-.056-.003Zm3.624.15a.508.508 0 0 1 .87.356.507.507 0 0 1-.404.496l-.062.01h-.98l.542-.821.035-.04ZM34.5 33h4.045v5a1 1 0 0 1-1 1H34.5v-6Zm-1 0h-4.045v5a1 1 0 0 0 1 1H33.5v-6Z"></path></svg>\
                创建【关注礼】\
            </button>\
            <button type="button" class="btn btn-secondary" onclick="" >\
                <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" class="w50"><path d="M31.13 15.218a.693.693 0 0 1 .957-.05c.29.245.364.68.187 1.015l-.06.098-1.94 2.685h5.293c1.08 0 1.957.946 1.957 2.114v3.945l3.7-2.888a.47.47 0 0 1 .21-.094l.077-.006c.24 0 .44.187.481.434l.008.095v11.679c0 .11-.032.219-.093.31a.467.467 0 0 1-.607.167l-.076-.049-3.7-2.889v4.101c0 1.168-.876 2.115-1.957 2.115h-17.61C16.876 38 16 37.053 16 35.885V21.08c0-1.168.876-2.114 1.957-2.114h4.295l-1.939-2.685a.837.837 0 0 1 .127-1.113.693.693 0 0 1 .957.05l.073.087 2.643 3.66h4.3l2.644-3.66.073-.087Zm-6.814 9.405c-.24 0-.44.187-.481.433l-.008.095v6.428c0 .09.021.178.061.257a.474.474 0 0 0 .585.244l.08-.039 5.353-3.214a.51.51 0 0 0 .19-.205.558.558 0 0 0-.117-.665l-.073-.054-5.352-3.214a.46.46 0 0 0-.238-.066Z" fill-rule="evenodd"></path></svg>\
                创建【直播】\
            </button>\
        </div>\
        <br/>\
        <div class="btn-group mt-2">\
                <button type="button" class="btn btn-secondary" onclick="" >\
                <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" class="w50"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 19a2 2 0 0 0-2 2v12.928a2 2 0 0 0 2 2h2.5v2.646a1 1 0 0 0 1.575.818L27 35.928h2.727A7.4 7.4 0 0 1 40 25.773V21a2 2 0 0 0-2-2H18Zm3.75 5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9ZM21 30.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75ZM36 38a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm1.064-3.938c-.24.144-.527.24-.863.24-.383 0-.67-.049-1.007-.145-.24-.095-.527-.287-.815-.479h-.047c-.024 0-.036 0-.042.006-.006.006-.006.018-.006.042l-.432.623c-.096.096-.048.24.048.336.288.24.623.431.959.575.383.192.863.24 1.342.24h.048c.384 0 .672-.048.96-.144.287-.096.527-.24.718-.431.192-.192.336-.384.48-.624.096-.24.144-.48.144-.719 0-.335-.048-.623-.192-.863-.144-.24-.336-.431-.528-.623a2.86 2.86 0 0 0-.719-.432 5.836 5.836 0 0 0-.815-.335l-.144-.048-.431-.144a.773.773 0 0 1-.336-.192c-.034-.034-.068-.062-.1-.088-.058-.048-.108-.09-.14-.151a.692.692 0 0 1-.095-.336c0-.096.048-.192.096-.288.047-.096.096-.144.191-.24.096-.047.192-.095.336-.143.144-.048.336-.048.527-.048.144 0 .288 0 .432.048l.431.143c.144.048.288.096.384.144.024 0 .036.012.048.024.012.012.024.024.048.024.096.048.24 0 .288-.048l.335-.527c.048-.048.048-.096.048-.192 0-.048-.048-.096-.096-.144a.25.25 0 0 0-.072-.048.247.247 0 0 1-.072-.048c-.144-.096-.287-.191-.48-.24a2.372 2.372 0 0 0-.622-.191 3.696 3.696 0 0 0-.72-.096c-.383 0-.719.048-.959.144-.287.096-.527.24-.719.431a2.251 2.251 0 0 0-.431.576 1.531 1.531 0 0 0-.144.67c0 .336.048.576.192.816.096.192.288.383.48.575.191.144.43.288.67.384.24.096.528.192.816.288.095.047.24.095.383.143.072.024.144.06.216.096.072.036.144.072.216.096.072.048.132.096.191.144.06.048.12.096.192.144a.773.773 0 0 1 .144.431c0 .288-.096.48-.336.624Z"></path></svg>\
                创建【评论奖励】\
            </button>\
        </div>'
    },
    b03: function () {
        return '\
        <div class="btn-group">\
            <button type="button" class="btn btn-secondary" onclick="Tool.openR(\'?jsFile=js20&site='+ obj.params.site + '\');">立即报名</button>\
            <button type="button" class="btn btn-secondary" onclick="Tool.openR(\'?jsFile=js21&site='+ obj.params.site + '\');">撤销报名</button>\
            <button type="button" class="btn btn-secondary" onclick="Tool.openR(\'?jsFile=js23&site='+ obj.params.site + '\');">删除【尚未提交】商品</button>\
        </div>\
        <br/>（1）在指定折扣且包邮门槛下，利润达到10%的商品。\
        <br/>（2）shopee要求报名的商品，要在店内【折扣+5】（如：之前是-35%，现在要-40%）。\
        <br/>（3）这是无限【折扣+5】（如：现在已经是-40%了，然后再拿该商品去报名活动，就要调成-45%了，目前解决方法是等该活动结束，在来报名。）。\
        <br/>注：折扣+5，并不是利润率少5%。\
        <br/>例如1：原价100卖130利润率是30%，定价185.71<sup>-30%</sup>=130，那185.71<sup>-35%</sup>=121，利润率只有21%了。\
        <br/>例如2：原价100卖130利润率是30%，定价650<sup>-80%</sup>=130，那650<sup>-85%</sup>=97.5，这时就亏了。\
        '
    },
    b04: function (arr) {
        let nArr = []
        for (let i = 0; i < arr.length; i++) {
            nArr.push(Tool.js_date_time2(arr[i]));
        }
        return nArr.join("<br/>")
    }
}
fun.a01();

/*
 <div class="btn-group">\
<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js01\');" title="，\n可做活动数量：'+ o1.num05 + ' 个\n活动结束时间为：' + Tool.js_date_time2(o1.time05A, "-") + ' - ' + Tool.js_date_time2(o1.time05B, "-") + '">\
\
*创建【优惠券】(' + o1.num05 + ')<br/>\
' + Tool.dateDHM(o1.time05A * 1000) + ' — ' + Tool.dateDHM(o1.time05B * 1000) + '\
</button>\
<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js10\')" title="1次活动2天，时间不能重叠。\n可以做活动数量：'+ o1.num03 + ' 个\n活动结束时间为：' + Tool.js_date_time2(o1.time03A, "-") + ' - ' + Tool.js_date_time2(o1.time03B, "-") + '">\
\
建立新的折扣活动(' + o1.num03 + ')<br/>' + Tool.dateDHM(o1.time03A * 1000) + ' — ' + Tool.dateDHM(o1.time03B * 1000) + '\
</button>\
<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js16\')" >\
创建【加购优惠】\
</button>\
<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js14\')" title="可做活动数量：'+ o1.num02 + ' 个\n活动结束时间为：' + Tool.js_date_time2(o1.time02A, "-") + ' - ' + Tool.js_date_time2(o1.time02B, "-") + '">\
创建【店内秒杀】(' + o1.num02 + ')<br/>' + Tool.dateDHM(o1.time02A * 1000) + ' — ' + Tool.dateDHM(o1.time02B * 1000) + '\
</button>\

*/
//    let num7_2 = Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 7;
//    let day2 = Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 2;
//    let html = '\
//    {\
//   "num02":<.Db("sqlite.shopee","select count(1) from @.seller where @.hide=0 and @.time2<'+ day2 + '","count")/>,\
//      "time02A":<.Db("sqlite.shopee","select @.time2 from @.seller where @.hide=0 order by @.time2 asc limit 1","count")/>,\
//      "time02B":<.Db("sqlite.shopee","select @.time2 from @.seller where @.hide=0 order by @.time2 desc limit 1","count")/>,\
//      \
//"num03":<.Db("sqlite.shopee","select count(1) from @.seller where @.hide=0 and @.time3<'+ day2 + '","count")/>,\
//      "time03A":<.Db("sqlite.shopee","select @.time3 from @.seller where @.hide=0 order by @.time3 asc limit 1","count")/>,\
//      "time03B":<.Db("sqlite.shopee","select @.time3 from @.seller where @.hide=0 order by @.time3 desc limit 1","count")/>,\
//      \
//   "num05":<.Db("sqlite.shopee","select count(1) from @.seller where @.hide=0 and @.time5<'+ num7_2 + '","count")/>,\
//      "time05A":<.Db("sqlite.shopee","select @.time5 from @.seller where @.hide=0 order by @.time5 asc limit 1","count")/>,\
//      "time05B":<.Db("sqlite.shopee","select @.time5 from @.seller where @.hide=0 order by @.time5 desc limit 1","count")/>\
//    }'
//    Tool.ajax.a01("{}", 1, this.a02, this);
