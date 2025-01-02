var fun =
{
    obj: { A1: 1, A2: 0, Aarr: {} },
    a01: function () {
        let html = Tool.header(obj.params.return, '1688 &gt; 采集箱 &gt; 主商品列表 &gt; 速卖通类目_更新数量') + '\
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
        $("#state").html("正在统计数量");
        let data = [{
            action: "sqlite",
            database: "aliexpress",
            sql: "select @.fromid as fromid FROM @.type where @.upid=0 and @.isleaf=0 order by @.sort desc,@.id asc" + Tool.limit(1, this.obj.A1),
            list: [{
                action: "sqlite",
                database: "1688",
                sql: "select count(1) as count from @.product where @.type1=${fromid}"
            }]
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "aliexpress",
                sql: "select count(1) as total from @.type where @.upid=0 and @.isleaf=0 "
            })
        }
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        if (this.obj.A2 == 0) {this.obj.A2 = t[1][0].total}
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, this.a05, t[0][0]);
    },
    a04: function (oo) {
        this.obj.Aarr[oo.fromid] = oo.list[0][0].count;
        this.obj.A1++;
        this.a02();
    },
    a05: function () {
        config.proupdhgate_type_count = this.obj.Aarr;
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
            $("#state").html("全部完成。");
        }
        else { Tool.pre(["出错", t]); }
    }
}
fun.a01();