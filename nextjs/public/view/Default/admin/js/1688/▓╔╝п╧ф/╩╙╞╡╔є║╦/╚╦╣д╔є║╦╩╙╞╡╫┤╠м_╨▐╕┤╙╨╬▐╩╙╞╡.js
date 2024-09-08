var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: [],
    },
    a01: function () {
        let html = Tool.header('1688 &gt; 采集箱 &gt; 主商品列表 &gt; 人工审核视频状态_修复有无视频') + '\
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
        let where = " where @.ManualReview_video_status=0 and @.ManualReview_1688&gt;0"
        $("#where").html(where);
        let str = '\
        [\
            {"A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '}\
            <r:product size=10 db="sqlite.1688" page=2 where="'+ where + '">,\
               {\
                "id":<:id/>,\
                <r:prodes db="sqlite.1688_prodes/<:ManualReview_1688_fromid Fun=ProidNum(+$1,99)/>" size=1 where=" where @.fromid=\'<:ManualReview_1688_fromid/>\'">\
                    "videoUrl":<:videoUrl tag=json/>\
                </r:prodes>\
                }\
            </r:product>\
        ]'
        $("#state").html("正在获取商品...");
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function (t) {
        if (this.obj.A2 == 0) this.obj.A2 = t[0].A2;
        t.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, t);
    },
    a04: function (arr) {
        let arr1 = [], arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].videoUrl) {
                arr2.push(arr[i].id)
            }
            else {
                arr1.push(arr[i].id)
            }
        }
        this.a05(arr1, arr2)
    },
    a05: function (arr1, arr2) {
        let sqlArr = [
            "update @.product set @.ManualReview_video_status=1 where @.id in(" + arr1.join(",") + ")",
            "update @.product set @.ManualReview_video_status=2 where @.id in(" + arr2.join(",") + ")"
        ]
        $("#state").html("正在更新商品...");
        Tool.ajax.a01('"ok"<r: db="sqlite.1688">' + sqlArr.join("<1/>") + '</r:>', 1, this.a06, this)
    },

    a06: function (t) {
        if (t == "ok") {
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