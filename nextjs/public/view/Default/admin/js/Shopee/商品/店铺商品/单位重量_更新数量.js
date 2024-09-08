var fun =
{
    obj: {
        A1: 1, A2: 0,
        Aarr: Tool.shopPro_unitWeight,
        A2arr: []
    },
    a01: function () {
        this.obj.A2 = this.obj.Aarr.length;
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header('Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 单位重量_更新数量') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
		        <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr></tbody>\
		        <tr><td class="right w150">状态进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a03, this, this.a05);
    },
    a03: function () {
        let where = ""
        if (this.obj.A1 != this.obj.A2) { where = ' and @.unitWeight<=' + (this.obj.Aarr[this.obj.A1 - 1][3]) / 1000; }
        let html = '<.Db(sqlite.shopee,select count(1) as total from @.shopPro_' + obj.arr[5] + ' where @.unitWeight>' + (this.obj.Aarr[this.obj.A1 - 1][2] / 1000) + where + ',count)/>'
        $("#state").html("正在统计数量");
        Tool.ajax.a01(html, 1, this.a04, this);
    },
    a04: function (t) {
        this.obj.A2arr.push(t);
        $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
        this.obj.A1++;
        this.a02();
    },
    a05: function () {
        config[obj.arr[5]].shopPro_unitWeight_count = this.obj.A2arr;
        let str = '"ok"<r: file="/' + o.path + 'admin/js/Shopee/商品列表/店铺商品/config.js">let config=' + JSON.stringify(config, null, 2) + '</r:>';
        Tool.ajax.a01(str, 1, this.a06, this);
    },
    a06: function (t) {
        if (t == "ok") {
            $("#state").html("全部完成。");
        }
        else {
            Tool.pre(["出错", t]);
        }
    },

}
fun.a01();