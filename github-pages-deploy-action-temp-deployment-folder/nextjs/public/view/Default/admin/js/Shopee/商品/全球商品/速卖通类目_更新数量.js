var fun =
{
    obj: { A1: 1, A2: 0, Aarr: { } },
    a01: function () {
        let html = Tool.header('Shopee &gt; 商品列表 &gt; 全球商品 &gt; 速卖通类目_更新数量') + '\
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
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:type size=1 page=2 db="sqlite.aliexpress" where=" where @.upid=0 and @.isleaf=0 order by @.sort desc,@.id asc">,\
            "<:fromid/>",\
            <:fromid Fun=Db(sqlite.shopee,select count(1) from @.GlobalPro where @.type1=$1,count)/>\
        </r:type>]'
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) this.obj.A2 = arr[0]
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, this.a05, arr);
    },
    a04: function (arr) {
        this.obj.Aarr[arr[1]] = arr[2];
        this.obj.A1++;
        this.a02();
    },
    a05: function () {
        config.proupdhgate_type_count = this.obj.Aarr;
        let str = '"ok"<r: file="/' + o.path + 'admin/js/Shopee/商品列表/全球商品/config.js">let config=' + JSON.stringify(config, null, 2) + '</r:>';
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