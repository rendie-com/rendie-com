'use strict';
var fun =
{
    obj: {},
    a01: function () {
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//账号来源ID
        this.a02();
    },
    a02: function () {
        let str = '\
        {\
            "count1":<.Db(sqlite.dhgate,select sum(@.upshelf+@.downshelf+@.Pending+@.NotThrough+@.Complaint) from @.seller where @.fromid='+ obj.arr[5] + ',count)/>,\
            <r:seller size=1 db="sqlite.dhgate" where=" where @.fromid='+ obj.arr[5] + '">\
              "UserName":"<:UserName/>",\
              "gathertime":<:gathertime/>,\
              "msgLastTime":<:msgLastTime/>,\
              "upshelf":"<:upshelf/>",\
              "downshelf":"<:downshelf/>",\
              "Pending":"<:Pending/>",\
              "NotThrough":"<:NotThrough/>",\
              "Complaint":"<:Complaint/>"\
            </r:seller>\
        }'
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function (oo) {
        let day20 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 20) / 1000)
        let str = '\
        {\
          "statusAll":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ',count)/>,\
          "status0":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.status=0 ,count)/>,\
          "status1":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.status=1,count)/>,\
          "status2":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.status=2,count)/>,\
          "status3":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.status=3,count)/>,\
          "status4":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.status=4,count)/>,\
          "status5":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.status=5,count)/>,\
          "status6":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.status=6,count)/>,\
          \
          \
          \
          "count10":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.status=1 and @.upuserid='+ obj.arr[5] + ',count)/>,\
          "count11":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.status=0 and @.upuserid='+ obj.arr[5] + ',count)/>,\
          "count12":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.status=2 and @.upuserid='+ obj.arr[5] + ',count)/>,\
          "count13":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.status=5 and @.upuserid='+ obj.arr[5] + ',count)/>,\
          "count14":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ',count)/>,\
          "count15":0,\
          "count16":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and not EXISTS(select 1 from @.pro where @.proupdhgate.@.proid=@.pro.@.proid and @.proupdhgate.@.upuserid=' + obj.arr[5] + '),count)/>,\
          "count17":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where @.upuserid='+ obj.arr[5] + ' and b.@.datetime>12,count)/>,\
          "count18":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upuserid='+ obj.arr[5] + ' and b.@.hide>2 and a.@.status=0,count)/>,\
          "count19":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upuserid='+ obj.arr[5] + ' and b.@.hide>2,count)/>,\
          "count20":<.Db("sqlite.dhgate","select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.datetime<'+ day20 + ' and b.@.hide<9 and a.@.upuserid=' + obj.arr[5] + '","count")/>,\
          "count21":0,\
          "count22":0,\
          "count23":0,\
          "count24":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.uptime>100 and @.status=0,count)/>,\
          "count25":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide=0 and a.@.upuserid='+ obj.arr[5] + ' and a.@.uptime>100,count)/>,\
          "count26":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate where @.upuserid='+ obj.arr[5] + ' and @.downtime<1,count)/>\
        }'
        // "count15":<.Db(sqlite.dhgate, select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid = b.@.proid where b.@.hide > 2 and a.@.upuserid = '+ obj.arr[5] + ', count) />, \
        //"count23":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate  a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide=0 and a.@.upuserid='+obj.arr[5]+' and a.@.examine=2,count)/>,\
        //"count22":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate  a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide=0 and a.@.upuserid='+obj.arr[5]+' and a.@.examine=2 and a.@.status=0,count)/>,\
        //"count9":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.status=1 and b.@.hide=0 and a.@.upuserid='+ obj.arr[5] +' and a.@.examine=1 and a.@.examine=1 and a.@.proStatus=1,count)/>,\
        Tool.ajax.a01(str, 1, this.a04, this, oo)
    },
    a04: function (o1, o2) {
        let html = '\
        <header class="panel-heading"><a href="javascript:;" onclick="Tool.main()" class="arrow_back"></a>更多操作</header>\
        <div class="p-2">\
        <table class="table table-hover align-middle">\
            <tr><td class="right w200">账号：</td><td colspan="8">'+ o2.UserName + '</td></tr>\
            <tr><td class="right">采集【订单】时间：</td><td colspan="8">'+ Tool.js_date_time2(o2.gathertime) + '</td></tr>\
            <tr><td class="right">采集【站内信】时间：</td><td colspan="8">'+ Tool.js_date_time2(o2.msgLastTime) + '</td></tr>\
            <tr>\
                <td class="right">敦煌网状态：</td>\
                <td>总数('+ o2.count1 + ')</td>\
                <td></td>\
                <td>上架('+ o2.upshelf + ')</td>\
                <td>待审核('+ o2.Pending + ')</td>\
                <td>审核未通过('+ o2.NotThrough + ')</td>\
                <td>下架('+ o2.downshelf + ')</td>\
                <td>品牌商投诉('+ o2.Complaint + ')</td>\
                <td></td>\
            </tr>\
            <tr>\
                <td class="right">本地状态：</td>\
                <td class="w120">总数('+ o1.statusAll + ')</td>\
                <td class="w120">未知('+ o1.status0 + ')</td>\
                <td class="w120">上架('+ o1.status1 + ')</td>\
                <td class="w120">待审核('+ o1.status2 + ')</td>\
                <td class="w150">审核未通过('+ o1.status3 + ')</td>\
                <td class="w120">下架('+ o1.status4 + ')</td>\
                <td class="w150">品牌商投诉('+ o1.status5 + ')</td>\
                <td class="p-0">其它('+ o1.status6 + ') <button type="button" class="btn btn-secondary" onclick="fun.c01()">全部归类到【其它】</button></td>\
            </tr>\
            <tr>\
              <td class="right">本地状态操作：</td>\
              <td colspan="8">\
                <div class="btn-group">\
			        <button type="button" class="btn btn-secondary" onclick="fun.d01()">把【其它('+ o1.status6 + ')】移动到【25.待认领商品】，并清除店铺ID</button>\
		        </div>\
              </td>\
            </tr>\
            <tr>\
              <td class="right">修复状态：</td>\
              <td colspan="8">'+ this.b01() + '</td>\
            </tr>\
            <tr>\
              <td class="right">上下架操作：</td>\
              <td colspan="8">'+ this.b02(o1) + '</td>\
            </tr>\
            <tr>\
              <td class="right">操作：</td>\
              <td colspan="8">\
				<div class="btn-group">\
					<button type="button" class="btn btn-secondary" onclick="Tool.main(\''+ obj.arr[5] + '/' + obj.arr[5] + '/1.html\')">上传商品</button>\
					<button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js11\','+ obj.arr[5] + ')">*将【20天外】没更新的【来源数据】进行更新(' + o1.count20 + ')</button>\
				</div>\
			</td>\
        </tr>\
        <tr>\
          <td class="right">问题数据：</td>\
          <td colspan="8">\
            <div class="btn-group">\
					    <button type="button" class="btn btn-secondary" onclick="fun.c06(1)">1.问题数据【下架】('+ o1.count18 + ')</button>\
					    <button type="button" class="btn btn-secondary" onclick="fun.c06(4)">2.问题数据【替换】('+ o1.count19 + ')</button>\
				    </div>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">未更新数据：</td>\
          <td colspan="8">\
            <div class="btn-group">\
            <button type="button" class="btn btn-secondary" onclick="fun.c06(7)">1.未更新数据【下架】('+ o1.count22 + ')</button>\
            <button type="button" class="btn btn-secondary" onclick="fun.c06(8)">2.未更新数据【更新】('+ o1.count23 + ')</button>\
				    </div>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">100天以上未更新数据：</td>\
          <td colspan="8">\
            <div class="btn-group">\
            <button type="button" class="btn btn-secondary" onclick="fun.c06(9)">1.【100天以上】未更新数据【下架】('+ o1.count24 + ')</button>\
            <button type="button" class="btn btn-secondary" onclick="fun.c06(10)">2.【100天以上】未更新数据【更新】('+ o1.count25 + ')</button>\
				    </div>\
          </td>\
        </tr>\
        </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '\
        <table>\
          <tr>\
            <td>修复敦煌网</td>\
            <td>\
              <select id="state01" class="form-select">\
              <option value="0">以下所有状态</option>\
              <option value="100100">上架</option>\
              <option value="100200">待审核</option>\
              <option value="100300">审核未通过</option>\
              <option value="100400">下架</option>\
              <option value="100500">品牌商投诉</option>\
              </select>\
            </td>\
            <td>对应已上传商品的</td>\
            <td>\
              <select id="state02" class="form-select">\
              <option value="0">*状态</option>\
              <option value="1">*丢失的编码进行删除</option>\
              <option value="2">状态、下架时间、分组ID、运费ID</option>\
              </select>\
            </td>\
            <td><button type="button" class="btn btn-secondary" onclick="fun.c03()">开始修复</button></td>\
          </tr>\
        </table>'
    },
    b02: function (oo) {
        return '\
        <table>\
          <tr>\
          <td>将所有</td>\
          <td>\
            <select id="UpDownPro" class="form-select">\
            <option value="1" title="手动审核状态:审核通过\n本地商品状态:更新成功\n敦煌状态:已下架">1. 下架的正常('+ oo.count9 + ') ➜ 上架</option>\
            <option value="2">2. 下架('+ oo.count10 + ') ➜ 上架</option>\
            <option value="3">3. 下架('+ oo.count10 + ') ➜ 删除</option>\
            <option value="4">4. 下架('+ oo.count10 + ') ➜ 上架(本地)</option>\
            <option value="5">5. 上架('+ oo.count11 + ') ➜ 下架</option>\
            <option value="6">6. 上架('+ oo.count11 + ') ➜ 删除</option>\
            <option value="7">7. 待审核('+ oo.count12 + ') ➜  删除</option>\
            <option value="8">8. 待审核('+ oo.count12 + ') ➜ 上架(本地)</option>\
            <option value="9">9. 审核未通过('+ oo.count13 + ') ➜ 删除</option>\
            <option value="10">10. 全部('+ oo.count14 + ') ➜ 删除</option>\
            <option value="11">11. 问题数据('+ oo.count15 + ') ➜ 删除</option>\
            <option value="12">12. 消失数据('+ oo.count16 + ') ➜ 删除</option>\
            <option value="13">13.非【审核通过】 ➜ 删除</option>\
            </select>\
          </td>\
          <td>操作。<button type="button" class="btn btn-secondary" onclick="fun.c04()">执行操作</button></td>\
          </tr>\
        </table>'
    },
    c01: function () {
        let str = '"ok"<r: db="sqlite.dhgate">update @.proupdhgate set @.status=6 where @.upuserid=' + obj.arr[5] + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c02: function (t) {
    },
    /////////////////////////////////////////////
    c03: function () {
        let userid = obj.arr[5]
        let state01 = $('#state01').val();
        let state02 = $('#state02').val();
        Tool.open7("js06", userid, state01, state02)
    },
    /////////////////////////////////////////////
    c04: function () {
        let UpDownPro = $('#UpDownPro').val();
        Tool.open6("js07", UpDownPro, obj.arr[5])
    },
    /////////////////////////////////////////////

    c06: function (val) {
        let r = Tool.escape("/" + obj.arr.join("/"));//返回URL
        Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/js10/" + obj.arr[5] + "/" + val + "/" + r);
    },
    d01: function () {
        if (confirm('确定要，把【其它】移动到【25.待认领商品】，并清除店铺ID？')) {
            let str = "\"\"<r: db=\"sqlite.dhgate\">update @.proupdhgate set @.proStatus=25,@.upuserid=0 where @.upuserid=" + obj.arr[5] + " and @.status=4</r:>"
            Tool.ajax.a01(str, 1, Tool.reload);
        }
    },

}
fun.a01();