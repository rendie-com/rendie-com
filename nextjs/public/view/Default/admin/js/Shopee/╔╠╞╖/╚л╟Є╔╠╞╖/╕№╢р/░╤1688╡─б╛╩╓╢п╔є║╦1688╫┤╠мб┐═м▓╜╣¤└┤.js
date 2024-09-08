'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 把1688的【手动审核1688状态】同步过来") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr>\
                <td class="right">说明：</td>\
                <td colspan="2">\
                    手动审核1688状态：1688 &gt; 采集箱 &gt; 【1688】主商品列表 &gt; 手动审核1688状态<br/>\
                    更新字段有：<br/>\
                    [@.ManualReview_1688]               表示手动审核1688状态。<br/>\
                    [@.ManualReview_1688_fromid]        表示手动审核1688后来源ID。<br/>\
                    [@.ManualReview_1688_categoryId]                 表示手动审核1688后分类ID，主要来来绑定shopee类目用的。<br/>\
                    [@.ManualReview_1688_state]         表示手动审核1688后商品状态，主要看是不是404用的。<br/>\
                    [@.ManualReview_1688_video_status]  人工审核视频状态（0：未审核；1：无视频；2：有视频；3：审核不通过；4：带中文审核通过；5：完全审核通过；）<hr/>\
                    注：[@.ManualReview_1688_subject]    标题字段<b>不要同步过来</b>，这个只在更新【全球商品】时只做首次添加。（就是无则添加，有则不更新，因为这个要人工修改用的。）<br/>\
                    注：[@.ManualReview_1688_unitWeight] 手动审核1688后单位重量，<b>不要同步过来</b>（原因：同上）。\
               </td></tr>\
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
            <r:product size=30 page=2 db="sqlite.1688" where=" where @.ManualReview_1688&gt;0">,\
            {\
                "ManualReview_1688":<:ManualReview_1688/>,\
                "ManualReview_1688_fromid":<:ManualReview_1688_fromid/>,\
                "ManualReview_video_status":<:ManualReview_video_status/>,\
                <r:proList  db="sqlite.1688" size=1 where=" where @.fromid=<:ManualReview_1688_fromid/>">\
                    "categoryId":<:categoryId/>,\
                    "state":<:state/>,\
                    <r:prodes db="sqlite.1688_prodes/<:fromid Fun=ProidNum(+$1,99)/>" size=1 where=" where @.fromid=<:fromid/>">\
                        "sku":<:sku tag=0/>,\
                    </r:prodes>\
                </r:proList>\
                "proid":"<:proid/>",\
            }\
            </r:product>\
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
            if (arr[i].sku) {
                let updateArr = [
                    "@.ManualReview_1688_video_status=" + arr[i].ManualReview_video_status,
                    "@.ManualReview_1688=" + arr[i].ManualReview_1688 ,
                    "@.ManualReview_1688_fromid=" + arr[i].ManualReview_1688_fromid ,
                    "@.ManualReview_1688_state=" + (arr[i].state ? arr[i].state : 0) ,
                    "@.ManualReview_1688_categoryId=" + (arr[i].categoryId ? arr[i].categoryId : 0),
                ]
                newArr.push("update @.GlobalPro set " + updateArr.join(",") +" where @.proid='" + arr[i].proid + "'")
            }
        }
        let str = '<r: db="sqlite.shopee">' + newArr.join("<1/>") + '</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a05, this)
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