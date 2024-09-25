var fun =
{
    obj: {
        A1: 1, A2: 0,
        Aarr: [
            [1, "最近一天内"],
            [2, "最近二天内"],
            [3, "最近三天内"],
        ],
        A2arr: []
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        this.obj.A2 = this.obj.Aarr.length;
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 搜索广告_修改 &gt; 新增关键词时间_更新数量') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
		        <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr></tbody>\
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
        let time = Tool.gettime("") - 60 * 60 * 24 * this.obj.Aarr[this.obj.A1 - 1][0]
        let html = '<.Db(sqlite.shopee,select count(1) as total from @.ads where @.site=\'' + obj.arr[5] + '\' and @.product_placement=\'search_product\' and @.key_uptime>' + time + ',count)/>'
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
        config[obj.arr[5]].ads_keyword_key_uptime_count = this.obj.A2arr;
        let str = '"ok"<r: file="/' + o.path + 'admin/js/Shopee/Shopee广告/config.js">let config=' + JSON.stringify(config, null, 2) + '</r:>';
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