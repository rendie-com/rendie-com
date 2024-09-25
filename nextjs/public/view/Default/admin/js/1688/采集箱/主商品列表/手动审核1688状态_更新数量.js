var fun =
{
    obj: {
        A1: 1, A2: 10, Aarr: [],
    },
    a01: function () {
        let html = Tool.header(obj.params.return, '1688 &gt; 采集箱 &gt; 主商品列表 &gt; 手动审核1688状态_更新数量') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
		        <tr><td class="right w150">状态进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr></tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a03, this, this.a05);
    },
    a03: function () {
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select count(1) as total from @.product where @.ManualReview_1688=" + (this.obj.A1 - 1)
        }]
        $("#state").html("正在统计数量");
        Tool.ajax.a01(data, this.a04, this);
    },
    a04: function (t) {
        this.obj.Aarr.push(t[0][0].total);
        this.obj.A1++;
        this.a02();
    },
    a05: function () {
        $("#state").html("统计完成。正在保存数据。。。");
        config.GlobalPro_ManualReview_1688_count = this.obj.Aarr;
        let data = [{
            action: "fs",
            fun: "writeFile",
            path: "public/" + o.path + "admin/js/1688/采集箱/主商品列表/config.js",
            data: "let config=" + JSON.stringify(config, null, 2),
        }]
        Tool.ajax.a01(data, this.a06, this);
    },
    a06: function (t) {
        if (t[0] == "写入成功") {
            this.obj.A2 = 0;
            this.obj.Aarr = []
            $("#state").html("全部完成。");
        }
        else { Tool.pre(["出错", t]); }
    }
}
fun.a01();