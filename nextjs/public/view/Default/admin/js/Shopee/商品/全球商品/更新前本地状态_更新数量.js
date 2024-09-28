var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: Tool.BeforeReview,A2arr:[],
    },
    a01: function () {
        this.obj.A2=this.obj.Aarr.length;
        let html = Tool.header(obj.params.return, 'Shopee &gt; 商品 &gt; 全球商品 &gt; 更新前本地状态_更新数量') + '\
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
            database: "shopee/商品/全球商品",
            sql: "select count(1) as total from @.table where @.BeforeReview=" + this.obj.Aarr[this.obj.A1 - 1][0],
        }]
        $("#state").html("正在统计数量");
        Tool.ajax.a01(data, this.a04, this);
    },
    a04: function (t) {
        this.obj.A2arr.push(t[0][0].total);
        this.obj.A1++;
        this.a02();
    },
    a05: function () {
        $("#state").html("统计完成。正在保存数据。。。");
        config.GlobalPro_BeforeReview_count = this.obj.A2arr;
        let data = [{
            action: "fs",
            fun: "writeFile",
            path: "public/" + o.path + "admin/js/Shopee/商品/全球商品/config.js",
            data: "let config=" + JSON.stringify(config, null, 2),
        }]
        Tool.ajax.a01(data, this.a06, this);
    },
    a06: function (t) {
        if (t[0] == "写入成功") {
            this.obj.A2 = 0;
            this.obj.A2arr = []
            $("#state").html("全部完成。");
        }
        else { Tool.pre(["出错", t]); }
    }
}
fun.a01();
