var fun =
{
    obj: { A1: 1, A2: 15, Aarr: [] },
    a01: function () {
        let html = Tool.header('1688 &gt; 采集箱 &gt; 次商品列表 &gt; 状态_更新数量') + '\
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
        let html = '<.Db(sqlite.1688,select count(1) as total from @.proList where @.state=' + (this.obj.A1 - 1) + ',count)/>'
        $("#state").html("正在统计数量");
        Tool.ajax.a01(html, 1, this.a04, this);
    },
    a04: function (t) {
        this.obj.Aarr.push(t);
        this.obj.A1++;
        this.a02();
    },
    a05: function () {
        config.proList_state_count = this.obj.Aarr;
        let str = '"ok"<r: file="/' + o.path + 'admin/js/1688/采集箱/次商品列表/config.js">let config=' + JSON.stringify(config, null, 2) + '</r:>';
        Tool.ajax.a01(str, 1, this.a06, this);
    },
    a06: function (t) {
        if (t == "ok") {
            $("#state").html("全部完成。");
        }
        else { Tool.pre(["出错", t]); }
    }
}
fun.a01();