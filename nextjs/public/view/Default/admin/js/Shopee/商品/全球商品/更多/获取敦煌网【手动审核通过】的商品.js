'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 获取敦煌网【手动审核通过】的商品") + '\
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
                "pic1":<:pic tag=0/>,\
                "proid":"<:proid/>",\
                "type1":<:type1/>,\
                "ManualReview":<:ManualReview/>,\
                "DHAfterReview":<:AfterReview/>\
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
            let pic = arr[i].pic1.picB.fileurl
            newArr.push('\
            <if "Fun(Db(sqlite.shopee,select count(1) from @.GlobalPro where @.proid=\'' + arr[i].proid + '\',count))"=="0">\
                <r: db="sqlite.shopee">Insert into @.GlobalPro(@.proid,@.pic,@.ManualReview,@.DHAfterReview,@.addtime,@.type1) values(\''+ arr[i].proid + '\',' + Tool.rpsql(pic) + ',' + arr[i].ManualReview + ',' + arr[i].DHAfterReview + ',' + Tool.gettime("") + ',' + arr[i].type1 + ')</r:>\
            <else/>\
                <r: db="sqlite.shopee">update @.GlobalPro set @.ManualReview=' + arr[i].ManualReview + ',@.DHAfterReview=' + arr[i].DHAfterReview + ',@.type1=' + arr[i].type1 + ' where @.proid=\''+ arr[i].proid + '\'</r:>\
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