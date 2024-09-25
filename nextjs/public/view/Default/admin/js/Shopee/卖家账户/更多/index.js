'use strict';
var fun =
{
    obj: {},
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//订单【来源/国家/编号】
        this.a02();
    },
    a02: function () {
        let str = '\
        {\
            "count1":"<.Db(sqlite.shopee,select sum(@.upshelf+@.downshelf+@.Pending+@.NotThrough+@.Complaint) from @.seller where @.fromid='+ obj.arr[5] + ',count)/>",\
            "count2":<.Db(sqlite.aliexpress,select count(1) from @.proupshopee where @.upuserid='+ obj.arr[5] + ',count)/>,\
            "count3":<.Db(sqlite.aliexpress,select count(1) from @.proupshopee where @.upuserid='+ obj.arr[5] + ' and @.status=0,count)/>,\
            "count4":<.Db(sqlite.aliexpress,select count(1) from @.proupshopee where @.upuserid='+ obj.arr[5] + ' and @.status=1,count)/>,\
            "count5":<.Db(sqlite.aliexpress,select count(1) from @.proupshopee where @.upuserid='+ obj.arr[5] + ' and @.status=2,count)/>,\
            "count6":<.Db(sqlite.aliexpress,select count(1) from @.proupshopee where @.upuserid='+ obj.arr[5] + ' and @.status=5,count)/>,\
            "count7":<.Db(sqlite.aliexpress,select count(1) from @.proupshopee where @.upuserid='+ obj.arr[5] + ' and @.status=3,count)/>,\
            "count8":<.Db(sqlite.aliexpress,select count(1) from @.proupshopee where @.upuserid='+ obj.arr[5] + ' and @.status=4,count)/>,\
            <r:seller size=1 db="sqlite.shopee" where=" where @.fromid='+ obj.arr[5] + '">\
                "UserName":"<:UserName/>",\
                "upshelf":"<:upshelf/>",\
                "downshelf":"<:downshelf/>",\
                "Pending":"<:Pending/>",\
                "NotThrough":"<:NotThrough/>",\
                "Complaint":"<:Complaint/>"\
            </r:seller>\
        }'
        Tool.ajax.a01("{}", 1, this.a03, this)
    },
    a03: function (oo) {
        let str = '{}'
        Tool.ajax.a01(str, 1, this.a04, this, oo)
    },
    a04: function (o1, o2) {
        let html = '\
        <header class="panel-heading"><a href="javascript:;" onclick="Tool.main()" class="arrow_back"></a>Shopee -&gt; 卖家账户 -&gt; 更多</header>\
        <div class="p-2">\
        <table class="table table-hover align-middle">\
        <tr><td class="right w200">账号：</td><td colspan="7">'+ o2.UserName + '</td></tr>\
        <tr>\
          <td class="right">修复商品数量：</td>\
          <td colspan="7">'+ this.b01() + '</td>\
        </tr>\
        <tr>\
          <td class="right">设置【需要更新】：</td>\
          <td colspan="7">\
				    <div class="btn-group">\
            <button type="button" class="btn btn-secondary" onclick="fun.c12()">今天上传的数据</button>\
            <button type="button" class="btn btn-secondary" onclick="fun.c11()">全部数据</button>\
				    </div>\
			    </td>\
        </tr>\
        <tr>\
          <td class="right">删除商品：</td>\
          <td colspan="7">\
				    <div class="btn-group">\
        	    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js08\','+ obj.arr[5] + ')" title="在【全球商品】中删除">删除【有品牌】的商品</button>\
        	    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js12\','+ obj.arr[5] + ')" title="【全球商品】的商品还在。为什么要删除？因为不能随便调价格。">删除【马来西亚】店铺中的商品</button>\
        	    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js20\','+ obj.arr[5] + ')" title="删除条件：【浏览量=1】【速卖通销量升序】。注：记得先同步一次【浏览量】">删除10个【马来西亚】店铺中【不活跃】的商品</button>\
				    </div>\
			    </td>\
        </tr>\
        <tr>\
          <td class="right">上传/更新：</td>\
          <td colspan="7">\
				    <div class="btn-group">\
				    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js03\','+ obj.arr[5] + ')">*上传商品-用软件上传图片</button>\
				    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js06\','+ obj.arr[5] + ')">*更新商品-用软件上传视频</button>\
				    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js07\','+ obj.arr[5] + ')">*更新商品-不修改图片和视频</button>\
				    </div>\
			    </td>\
        </tr>\
        <tr>\
          <td class="right">非正常的商品：</td>\
          <td colspan="7">\
				    <div class="btn-group">\
				    <button type="button" class="btn btn-secondary" onclick="Tool.open5(\'js18\','+ obj.arr[5] + ')" title="不会删除【速卖通】的商品，【全球商品】的商品也会删除">*【删除】非正常的商品</button>\
				    </div>\
			    </td>\
        </tr>\
        </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '<button type="button" class="btn btn-secondary" onclick="Tool.open4(\'js04\')">开始修复</button>（查找远程数据，本地没有，就删远程商品，并把本地商品状态改为：【上架】）'
    },
    c01: function () {
        let str = "\"\"<r: db=\"sqlite.aliexpress\">update @.proupshopee set @.status=4 where @.upuserid=" + obj.arr[5] + "</r:>"
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c02: function (t) {

    },
    c05: function () {
        if (confirm('确定要删除吗？')) {
            let str = "\"\"<r: db=\"sqlite.aliexpress\">delete from @.proupshopee where @.status=4 and @.upuserid=" + obj.arr[5] + "</r:>"
            Tool.ajax.a01(str, 1, Tool.reload);
        }
    },
    c11: function () {
        let str = '""<r: db="sqlite.aliexpress">update @.proupshopee set @.examine=2 where @.upuserid=' + obj.arr[5] + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c12: function () {
        let str = '""<r: db="sqlite.aliexpress">update @.proupshopee set @.examine=2 where @.addtime>' + Tool.gettime(Tool.userDate13(Date.now())) + ' and @.upuserid=' + obj.arr[5] + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    }
}
fun.a01();