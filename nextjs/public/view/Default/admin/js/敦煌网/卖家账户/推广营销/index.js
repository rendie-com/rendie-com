'use strict';
var fun=
{
  obj:{},
  a01:function()
  {
		let num7=parseInt((new Date().getTime() + 1000*60*60*24*7)/1000);
		let num7_2=Tool.gettime(Tool.userDate13(Date.now()))+60*60*24*7;
        let str='\
        {\
          "num01":<.Db("sqlite.dhgate","select count(1) from @.seller where @.total>0 and @.time1<'+num7+'","count")/>,\
          "time01A":<.Db("sqlite.dhgate","select @.time1 from @.seller where @.total>0 order by @.time1 asc limit 1","count")/>,\
          "time01B":<.Db("sqlite.dhgate","select @.time1 from @.seller where @.total>0 order by @.time1 desc limit 1","count")/>,\
	       "num02":<.Db("sqlite.dhgate","select count(1) from @.seller where @.total>0 and @.time2<'+num7+'","count")/>,\
          "time02A":<.Db("sqlite.dhgate","select @.time2 from @.seller where @.total>0 order by @.time2 asc limit 1","count")/>,\
          "time02B":<.Db("sqlite.dhgate","select @.time2 from @.seller where @.total>0 order by @.time2 desc limit 1","count")/>,\
          "num03":<.Db("sqlite.dhgate","select count(1) from @.seller where @.total>0 and @.time3<'+num7_2+'","count")/>,\
          "time03A":<.Db("sqlite.dhgate","select @.time3 from @.seller where @.total>0 order by @.time3 asc limit 1","count")/>,\
          "time03B":<.Db("sqlite.dhgate","select @.time3 from @.seller where @.total>0 order by @.time3 desc limit 1","count")/>,\
          "num04":<.Db("sqlite.dhgate","select count(1) from @.seller where @.total>0 and @.time4<'+num7_2+'","count")/>,\
          "time04A":<.Db("sqlite.dhgate","select @.time4 from @.seller where @.total>0 order by @.time4 asc limit 1","count")/>,\
          "time04B":<.Db("sqlite.dhgate","select @.time4 from @.seller where @.total>0 order by @.time4 desc limit 1","count")/>,\
          "num05":<.Db("sqlite.dhgate","select count(1) from @.seller where @.total>0 and @.time5<'+num7+'","count")/>,\
          "time05A":<.Db("sqlite.dhgate","select @.time5 from @.seller where @.total>0 order by @.time5 asc limit 1","count")/>,\
          "time05B":<.Db("sqlite.dhgate","select @.time5 from @.seller where @.total>0 order by @.time5 desc limit 1","count")/>,\
          "num06":<.Db("sqlite.dhgate","select count(1) from @.seller where @.total>0 and @.time6<'+num7+'","count")/>,\
          "time06A":<.Db("sqlite.dhgate","select @.time6 from @.seller where @.total>0 order by @.time6 asc limit 1","count")/>,\
          "time06B":<.Db("sqlite.dhgate","select @.time6 from @.seller where @.total>0 order by @.time6 desc limit 1","count")/>,\
          "num07":<.Db("sqlite.dhgate","select count(1) from @.seller where @.total>0 and @.time7<'+num7+'","count")/>,\
          "time07A":<.Db("sqlite.dhgate","select @.time7 from @.seller where @.total>0 order by @.time7 asc limit 1","count")/>,\
          "time07B":<.Db("sqlite.dhgate","select @.time7 from @.seller where @.total>0 order by @.time7 desc limit 1","count")/>\
        }'
      Tool.ajax.a01(str, 1,this.a02,this);
  },
  a02:function(o1)
  {
    let html='\
    <header class="panel-heading"><a href="javascript:" onClick="Tool.main()" class="arrow_back"></a>推广营销</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
      <tbody>\
      <tr>\
        <td class="right">促销分组：</td>\
        <td>\
			<div class="btn-group">\
				<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js24\');">删除促销分组</button>\
				<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js26\');">创建促销分组</button>\
				<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js28\');">重新设置商品价格倍数</button>\
				<button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js13\',\'all\')">整理分组商品</button>\
			</div>\
		</td>\
      </tr>\
      <tr>\
        <td class="right">平台活动报名：</td>\
        <td>\
					<div class="btn-group">\
						<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js02\')">【秒杀】我要报名</button>\
						<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js09\')">【普通促销】我要报名</button>\
						<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js18\')">【跨店满减】我要报名</button>\
						<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js10\')">【新人专享价】我要报名</button>\
					</div>\
				</td>\
      </tr>\
      <tr>\
        <td class="right">店铺活动：</td>\
        <td>\
					<div class="btn-group">\
					<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js36\')" title="1次活动7天\n可做活动数量：'+o1.num06+' 个\n活动结束时间为：'+Tool.js_date_time2(o1.time06A,"-")+' - '+Tool.js_date_time2(o1.time06B,"-")+'">*满几件打几折('+o1.num06+')<br/>'+Tool.dateDHM(o1.time06A*1000)+' — '+Tool.dateDHM(o1.time06B*1000)+'</button>\
					<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js16\')" title="1次活动7天\n可做活动数量：'+o1.num01+' 个\n活动结束时间为：'+Tool.js_date_time2(o1.time01A,"-")+' - '+Tool.js_date_time2(o1.time01B,"-")+'">*创建拼团('+o1.num01+')<br/>'+Tool.dateDHM(o1.time01A*1000)+' — '+Tool.dateDHM(o1.time01B*1000)+'</button>\
					<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js17\')" title="1次活动6天,1次2个活动（直接降价、打折）\n可做活动数量：'+o1.num02+' 个\n活动结束时间为：'+Tool.js_date_time2(o1.time02A,"-")+' - '+Tool.js_date_time2(o1.time02B,"-")+'">*创建限时限量('+o1.num02+')<br/>'+Tool.dateDHM(o1.time02A*1000)+' — '+Tool.dateDHM(o1.time02B*1000)+'</button>\
					</div>\
					<hr/>\
					<div class="btn-group">\
          <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js15\')" title="1次活动2天，时间不能重叠。\n可以做活动数量：'+ o1.num03 + ' 个\n活动结束时间为：' + Tool.js_date_time2(o1.time03A, "-") + ' - ' + Tool.js_date_time2(o1.time03B, "-") + '">*创建全店铺打折(' + o1.num03 + ')<br/>' + Tool.dateDHM(o1.time03A * 1000) + ' — ' + Tool.dateDHM(o1.time03B * 1000) +'</button>\
          <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js12\')">创建全店铺打折_停止活动</button>\
          <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js14\')" title="1次活动10天\n可做活动数量：'+o1.num04+' 个\n活动结束时间为：'+Tool.js_date_time2(o1.time04A,"-")+' - '+Tool.js_date_time2(o1.time04B,"-")+'">*创建全店铺满立减('+o1.num04+')<br/>'+Tool.dateDHM(o1.time04A*1000)+' — '+Tool.dateDHM(o1.time04B*1000)+'</button>\
					</div>\
					<hr/>\
					<div class="btn-group">\
					<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js37\')" title="1次活动7天\n数量：'+o1.num07+' 个\n活动结束时间为：'+Tool.js_date_time2(o1.time07A,"-")+' - '+Tool.js_date_time2(o1.time07B,"-")+'">*创建智能优惠券('+o1.num07+')<br/>'+Tool.dateDHM(o1.time07A*1000)+' — '+Tool.dateDHM(o1.time07B*1000)+'</button>\
					\
					<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js19\')" title="1次活动3天，每3天做3个不同优惠券【领取型、买够送、收藏送】\n可做活动数量：'+o1.num05+' 个\n活动结束时间为：'+Tool.js_date_time2(o1.time05A,"-")+' - '+Tool.js_date_time2(o1.time05B,"-")+'">*创建店铺优惠券('+o1.num05+')<br/>'+Tool.dateDHM(o1.time05A*1000)+' — '+Tool.dateDHM(o1.time05B*1000)+'</button>\
          <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js38\');">*报名优惠券活动</button>\
          <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js32\');">*购物车营销</button>\
					</div>\
					</td>\
      </tr>\
      <tr>\
        <td class="right">流量快车：</td>\
        <td><button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js30\')">*添加商品到流量快车</button></td>\
      </tr>\
      <tr>\
        <td class="right">骆驼客：</td>\
        <td><button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js31\');">*骆驼客添加商品</button></td>\
      </tr>\
      <tr>\
        <td class="right">橱窗管理：</td>\
        <td   ><button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js23\')">*添加产品到橱窗</button></td>\
      </tr>\
      <tr>\
        <td class="right">权益中心：</td>\
        <td   ><button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js35\')">*参与权益</button></td>\
      </tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html);
  }
}
fun.a01();