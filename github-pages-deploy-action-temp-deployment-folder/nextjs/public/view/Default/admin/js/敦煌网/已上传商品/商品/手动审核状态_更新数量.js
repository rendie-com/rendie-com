var fun =
{
    obj: { A1: 1, A2: 20, Aarr: [] },
    a01: function () {
        let html = Tool.header('正在【手动审核状态_更新数量】任务...') + '\
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
        if (this.obj.A1 <= this.obj.A2) {
            let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100)
            $("#A1").html(p1 + "%").css("width", p1 + "%");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（条）');
            this.a03()
        }
        else {
            $("#state").html("统计完成。正在保存数据。。。");
            this.a05();
        }
    },
    a03: function () {
        let html = '<.Db(sqlite.aliexpress,select count(1) as total from @.proupdhgate where @.ManualReview=' + (this.obj.A1 - 1) + ',count)/>'
        $("#state").html("正在统计数量");
        Tool.ajax.a01(html, 1, this.a04, this);
    },
    a04: function (t) {
        this.obj.Aarr.push(t);
        $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
        this.obj.A1++;
        this.a02();
    },
    a05: function () {
        config.proupdhgate_ManualReview_count = this.obj.Aarr;
        let str = '""<r: file="/' + o.path + 'admin/js/敦煌网/已上传商品/商品/config.js">let config=' + JSON.stringify(config, null, 2) + '</r:>';
        Tool.ajax.a01(str, 1, this.a06, this);
    },
    a06: function (t) {
        if (t == "") {
            $("#state").html("全部完成。");
        }
        else { Tool.pre(["出错", t]); }
    }
}
fun.a01();