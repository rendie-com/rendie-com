'use strict';
var fun =
{
    obj: {},
    a01: function () {
        this.a02();
    },
    a02: function () {
        let day300 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 300) / 1000)
        let hour48 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 48) / 1000)
        let day20 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 20) / 1000)
        let str = '\
        {\
            "statusAll":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate,count)/>,\
            "status0":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=0,count)/>,\
            "status1":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=1,count)/>,\
            "status2":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=2,count)/>,\
            "status3":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=3,count)/>,\
            "status4":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=4,count)/>,\
            "status5":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=5,count)/>,\
            "status6":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=6,count)/>,\
            "count9":<.Db(sqlite.dhgate, select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.status=1 and b.@.hide=0 and a.@.ManualReview=9,count)/>,\
            "count10":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=1,count)/>,\
            "count11":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=0,count)/>,\
            "count12":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=2,count)/>,\
            "count13":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=5,count)/>,\
            "count14":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate,count)/>,\
            "count15":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide>2,count)/>,\
            "count16":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate where not EXISTS(select 1 FROM @.pro WHERE @.proupdhgate.@.proid=@.pro.@.proid),count)/>,\
            "count18":0,\
            "count27":<.Db("sqlite.dhgate","select count(1) as total from @.proupdhgate WHERE @.uptime>'+ day300 + ' and @.status=0","count")/>,\
            "count29":<.Db("sqlite.dhgate","select count(1) as total from @.proupdhgate WHERE @.downtime>'+ hour48 + '","count")/>,\
            "count23":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate WHERE @.status=0 and not EXISTS(select 1 FROM @.pro WHERE @.proupdhgate.@.proid=@.pro.@.proid),count)/>,\
            "count24":<.Db(sqlite.dhgate,select count(1) as total from @.proupdhgate where not EXISTS(select 1 FROM @.pro WHERE @.proupdhgate.@.proid=@.pro.@.proid),count)/>,\
            "count21":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.status=0 and b.@.hide>0,count)/>,\
            "count22":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide<>0,count)/>,\
            "count20":<.Db("sqlite.dhgate","select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.datetime<'+ day20 + ' and b.@.hide<9","count")/>,\
            "count25":0,\
            "count26":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide=0,count)/>\
        }'
        Tool.ajax.a01(str, 1, this.a03, this);
        //"count17":<.Db(sqlite.dhgate,select count(1) as total from @.pro WHERE @.isUpDHgate=1,count)/>,\
        //"count25":<.Db(sqlite.dhgate,select count(1) from @.proupdhgate a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide=0 and a.@.examine=2 and a.@.status=0,count)/>,\
        //"count18":<.Db(sqlite.dhgate, select count(1) as total from @.proupdhgate WHERE @.status=0 and @.examine<>1 and @.proStatus<>1,count)/>,\
        //"count9":,\
        //"count28":<.Db("sqlite.dhgate","select count(1) from @.proupdhgate  a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide=0 and DateDiff('+Tool.yymm('DAY','access')+',a.@.uptime,GETDATE())>300","count")/>,\
    },
    a03: function (oo) {
        let str = '\
        {\
            "count1":<.Db("sqlite.dhgate","select sum(@.upshelf+@.downshelf+@.Pending+@.NotThrough+@.Complaint) as total from @.seller","count")/>,\
            <r:seller db="sqlite.dhgate" size=1>\
            "upshelf":<:sum(@.upshelf)/>,\
            "downshelf":<:sum(@.downshelf)/>,\
            "Pending":<:sum(@.Pending)/>,\
            "NotThrough":<:sum(@.NotThrough)/>,\
            "Complaint":<:sum(@.Complaint)/>,\
            </r:seller>\
        }'
        Tool.ajax.a01(str, 1, this.a04, this, oo);
    },
    a04: function (o1, oo) {
        let html = '<header class="panel-heading"><a href="javascript:" onClick="Tool.main()" class="arrow_back"></a>【全部】更多操作</header>\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
          <tbody>\
        <tr>\
          <td class="right w200">[敦煌网]状态：</td>\
          <td class="w120">总数('+ o1.count1 + ')</td>\
          <td class="w120"></td>\
          <td class="w120">已上架('+ o1.upshelf + ')</td>\
          <td class="w120">待审核('+ o1.Pending + ')</td>\
          <td class="w120">审核未通过('+ o1.NotThrough + ')</td>\
          <td class="w120">	已下架('+ o1.downshelf + ')</td>\
          <td class="w150">品牌商投诉('+ o1.Complaint + ')</td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">[本地敦煌网]状态：</td>\
          <td>总数('+ oo.statusAll + ')</td>\
          <td>未知('+ oo.status0 + ')</td>\
          <td>已上架('+ oo.status1 + ')</td>\
          <td>待审核('+ oo.status2 + ')</td>\
          <td>审核未通过('+ oo.status3 + ')</td>\
          <td>已下架('+ oo.status4 + ')</td>\
          <td>品牌商投诉('+ oo.status5 + ')</td>\
          <td class="p-0">其它('+ oo.status6 + ')<button type="button" class="btn btn-secondary" onclick="fun.c01()">归类到其它</button></td>\
        </tr>\
        <tr>\
        <td class="right">修复状态：</td>\
          <td colspan="8">\
          <table>\
            <tr>\
            <td>修复敦煌网</td>\
            <td>\
              <select id="state01" class="form-select">\
                <option value="0">以下所有状态</option>\
                <option value="1">1.已上架</option>\
                <option value="2">2.待审核</option>\
                <option value="3">3.审核未通过</option>\
                <option value="4">4.已下架</option>\
              </select>\
           </td>\
           <td>对应已上传商品的</td>\
           <td>\
              <select id="state02" class="form-select">\
                <option value="0">状态</option>\
                <option value="1">丢失的编码进行删除</option>\
                <option value="2">丢失的编码进行修复</option>\
              </select>\
            </td>\
            <td>进行修复。<button type="button" class="btn btn-secondary" onclick="fun.c04()">开始修复</button></td>\
            </tr>\
          </table>\
        </td>\
        </tr>\
        <tr>\
          <td class="right">上下架操作：</td>\
          <td colspan="8">\
          <table>\
            <tr>\
            <td>将所有</td>\
            <td>\
            <select id="UpDownPro" class="form-select">\
              <option value="1">1. 全部 ➜ 下架</option>\
              <option value="2">2. (手动审核状态:图片且详情审核通过)且(本地商品状态:更新成功) ➜ 上架</option>\
              <option value="3">3. 非((手动审核状态:图片且详情审核通过)且(本地商品状态:更新成功)) ➜ 下架</option>\
            </select>\
            </td>\
            <td>操作。<button type="button" class="btn btn-secondary" onclick="fun.c05()">*执行操作</button></td>\
            </tr>\
          </table>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">数据修复：</td>\
          <td colspan="8">\
            <div class="btn-group">\
                <button type="button" class="btn btn-secondary" onclick="fun.d01()">在【商品表】计录是否被上传('+ oo.count17 + ')</button>\
                <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js41\')">*侵权产品申诉</button>\
            </div>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">操作：</td>\
          <td colspan="8">\
            <div class="btn-group">\
				    <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js11\')">*将【20天外】没更新的【来源数据】进行更新('+ oo.count20 + ')</button>\
				    </div>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">问题数据：</td>\
          <td colspan="8">\
            <div class="btn-group">\
              <button type="button" class="btn btn-secondary" onclick="Tool.open6(\'js33\',2,\'all\')">2.问题数据【替换】(' + oo.count22 + ')</button>\
            </div>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">消失数据：</td>\
          <td colspan="8">\
            <div class="btn-group">\
              <button type="button" class="btn btn-secondary" onclick="Tool.open6(\'js33\',6,\'all\')">2.消失数据【替换】(' + oo.count24 + ')</button>\
            </div>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">未更新数据：</td>\
          <td colspan="8"><div class="btn-group"><button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js33\',3)">1.未更新数据【下架】('+ oo.count25 + ')</button><button type="button" class="btn btn-secondary" onclick="Tool.open6(\'js33\',\'4\',\'all\')">2.未更新数据【更新】(' + oo.count26 + ')</button></div></td>\
        </tr>\
        <tr>\
          <td class="right">300天以上未更新数据：</td>\
          <td colspan="8">\
				    <div class="btn-group">\
					    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js33\',7)">1.【300天以上】未更新数据【下架】('+ oo.count27 + ')</button>\
					    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js33\',8)">2.【300天以上】未更新数据【更新】('+ oo.count28 + ')</button>\
				    </div>\
			    </td>\
        </tr>\
        <tr>\
          <td class="right">运费模板：</td>\
          <td colspan="8">\
		    <div class="btn-group">\
			    <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js08\')">*创建运费模板</button>\
			    <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js39\')">*删除旧运费模板</button>\
			    <button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js34\')">获取【运费模板】</button>\
		    </div>\
	    </td>\
        </tr>\
          </tbody>\
          </table>\
        </div>';
        Tool.html(null, null, html);
    },
    c01: function () {
        let str = '"ok"<r: db="sqlite.dhgate">update @.proupdhgate set @.status=6</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c02: function (t) {
    },
    c03: function () {

    },
    c04: function () {
        let userid = "all"
        let state01 = $('#state01').val();
        let state02 = $('#state02').val();
        Tool.open7("js06", userid, state01, state02);
    },
    c05: function () {
        let arr5 = $('#UpDownPro').val();
        Tool.open6("js07", arr5, "all");
    },
    c06: function () {

    },
    d01: function () {
        Tool.ajax.a01('""<r: db="sqlite.dhgate">update @.pro set @.isUpDHgate=0</r:>', 1, this.d02, this);
    },
    d02: function (t) {
        if (t == "") {
            let str = '""<r: db="sqlite.dhgate">UPDATE @.pro SET @.isUpDHgate=1 WHERE EXISTS(SELECT * FROM @.proupdhgate WHERE @.proupdhgate.@.proid = @.pro.@.proid)</r:>'
            Tool.ajax.a01(str, 1, this.d03, this)
        } else { Tool.at("出错：" + t); }
    },
    d03: function (t) {
        if (t == "") {
            alert("同步成功");
            location.reload();
        }
        else { Tool.at("出错：" + t); }
    }
}
fun.a01();