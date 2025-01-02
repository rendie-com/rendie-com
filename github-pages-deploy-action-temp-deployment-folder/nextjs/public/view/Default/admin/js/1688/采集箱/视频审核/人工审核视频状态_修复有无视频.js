var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: [],
    },
    a01: function () {
        let html = Tool.header(obj.params.return, '1688 &gt; 采集箱 &gt; 主商品列表 &gt; 人工审核视频状态_修复有无视频') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
		        <tr><td class="right">条件：</td><td id="where" colspan="2"></td></tr>\
		        <tr><td class="right w150">状态进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let where = " where @.ManualReview_video_status=0 and @.ManualReview_1688>0"
        $("#where").html(where);
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("id,ManualReview_1688_fromid") + " from @.product" + where + Tool.limit(10, this.obj.A1),
            list: [{
                action: "sqlite",
                database: "1688_prodes/${fromid99:ManualReview_1688_fromid}",
                sql: "select " + Tool.fieldAs("videoUrl") + " from @.prodes where @.fromid='${ManualReview_1688_fromid}' limit 1"
            }]
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "1688",
                sql: "select count(1) as total FROM @.product" + where,
            })
        }
        $("#state").html("正在获取商品...");
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        if (this.obj.A2 == 0) this.obj.A2 = t[1][0].total;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, t[0]);
    },
    a04: function (arr) {
        let arr1 = [], arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].list[0][0].videoUrl) {
                arr2.push(arr[i].id)
            }
            else {
                arr1.push(arr[i].id)
            }
        }
        this.a05(arr1, arr2)
    },
    a05: function (arr1, arr2) {
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "update @.product set @.ManualReview_video_status=1 where @.id in(" + arr1.join(",") + ")",
        }, {
            action: "sqlite",
            database: "1688",
            sql: "update @.product set @.ManualReview_video_status=2 where @.id in(" + arr2.join(",") + ")",
        }]
        $("#state").html("正在更新商品...");
        Tool.ajax.a01(data, this.a06, this)
    },
    a06: function (t) {
        if (t[0].length == 0 && t[1].length == 0) {
            this.obj.A1++;
            $("#state").html("下一条...");
            this.a02();
        }
        else {
            Tool.pre(["出错", t]);
        }
    }
}
fun.a01();