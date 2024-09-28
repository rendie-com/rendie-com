'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.params.return    返回URL
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 把1688的【手动审核1688状态】同步过来") + '\
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
                    [@.manualreview_1688_fromid]        表示手动审核1688后来源ID。<br/>\
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
        let where = " where @.ManualReview_1688>0"
        //let where=" where @.proid='R605907'"
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("ManualReview_1688,manualreview_1688_fromid,ManualReview_video_status,proid") + " FROM @.product" + where + Tool.limit(30, this.obj.A1),
            list: [{
                action: "sqlite",
                database: "1688",
                sql: "select " + Tool.fieldAs("categoryId,state") + " FROM @.proList where @.fromid=${manualreview_1688_fromid} limit 1"
            }]

        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "1688",
                sql: "select count(1) as total FROM @.product" + where,
            })
        }
        $("#state").html("正在获取敦煌商品...");
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, t[0]);
    },
    a04: function (arr) {
        let data = [];
        for (let i = 0; i < arr.length; i++) {
                let updateArr = [
                    "@.ManualReview_1688_video_status=" + arr[i].ManualReview_video_status,
                    "@.ManualReview_1688=" + arr[i].ManualReview_1688,
                    "@.manualreview_1688_fromid=" + arr[i].manualreview_1688_fromid,
                    "@.ManualReview_1688_state=" + (arr[i].list[0][0].state ? arr[i].list[0][0].state : 0),
                    "@.ManualReview_1688_categoryId=" + (arr[i].list[0][0].categoryId ? arr[i].list[0][0].categoryId : 0),
                ]
                data.push({
                    action: "sqlite",
                    database: "shopee/商品/全球商品",
                    sql: "update @.table set " + updateArr.join(",") + " where @.proid='" + arr[i].proid + "'",
                })
        }
        Tool.ajax.a01(data, this.a05, this)
    },
    a05: function (t) {
        this.obj.A1++;
        this.a02();
    },
}
fun.a01();