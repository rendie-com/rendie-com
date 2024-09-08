'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("获取敦煌网【手动审核通过】的商品...") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        //ManualReview=9    手动审核状态：图片且详情审核通过
        let str = '[\
            {"A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '}\
            <r:proupdhgate size=30 page=2 db="sqlite.dhgate" where=" where @.ManualReview=9">,\
            {\
                "pic":<:pic tag=json/>,\
                "proid":"<:proid/>",\
                "ManualReview":<:ManualReview/>,\
                "AfterReview":<:AfterReview/>,\
                "addtime":"<:addtime/>"\
            }\
            </r:proupdhgate>\
        ]'
        $("#state").html("正在获取敦煌商品...");
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0].A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
    },
    a04: function (arr) {
        let newArr = [];
        for (let i = 1; i < arr.length; i++) {
            newArr.push('\
            <if "Fun(Db(sqlite.pinduoduo,select count(1) from @.pifa where @.proid=\'' + arr[i].proid + '\',count))"=="0">\
                <r: db="sqlite.pinduoduo">Insert into @.pifa(@.proid,@.pic,@.ManualReview,@.AfterReview,@.addtime) values(\''+ arr[i].proid + '\',' + Tool.rpsql(arr[i].pic) + ',' + arr[i].ManualReview + ',' + arr[i].AfterReview + ',' + Tool.gettime("") + ')</r:>\
            </if>')
        }
        Tool.ajax.a01('"ok"' + newArr.join(""), 1, this.a05, this)
    },
    a05: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
}
fun.a01();