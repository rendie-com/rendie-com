var fun =
{
    obj:
    {
        A1: 1, A2: 100,
        B1: 1, B2: 1,
        shopId: 0,
        dbnameObj: {},
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件
        //obj.params.return         返回URL  
        //obj.params.site           站点        
        this.a02()
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 采集箱 &gt; 粉丝 &gt; 获取关注我的用户") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
		        <tr><td class="right w150">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		        <tr><td class="right">店铺ID：</td><td colspan="2" id="shopId"></td></tr>\
		        <tr><td class="right">数据库进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">粉丝页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        Tool.login.a01(this.a04, this);
    },
    a04: function (t) {
        this.obj.shopId = t[obj.params.site].shopId;
        $("#shopId").html(this.obj.shopId)
        this.a05();
    },
    a05: function (t) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, this.d01)
    },
    a06: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/粉丝/" + obj.params.site + "/" + (this.obj.A1.toString().padStart(3, '0')),
            sql: "update @.table set @.is_following=0 where @.is_following=1",
        }]
        //清空【我的粉丝】
        Tool.ajax.a01(data, this.a07, this);
    },
    a07: function (t) {
        this.obj.A1++;
        this.a05();
    },
    ////////////////////////////////////////////////////
    d01: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d02, this, this.e01)
    },
    d02: function () {
        //【关注我的】来源：https://my.xiapibuy.com/shop/896010703/followers/?__classic__=1
        let url = "https://" + (obj.params.site == "tw" ? "xiapi" : obj.params.site) + ".xiapibuy.com/api/v4/pages/get_follower_list?limit=20&offset=" + ((this.obj.B1 - 1) * 20) + "&shopid=" + this.obj.shopId
        $("#state").html("正在获取店铺的粉丝。。。")
        gg.getFetch(url, "json", this.d03, this)
    },
    d03: function (t) {
        if (t.data) {
            if (!t.data.nomore) { this.obj.B2++; }
            if (t.data.accounts) {
                //@.is_following        表示是否为我的粉丝
                Tool.accounts.a01(t.data.accounts, {}, "@.is_following", obj.params.site, this.d04, this)
            }
            else {
                $("#state").html("店铺的粉丝隐藏了，跳过。。。")
                //this.e01()
            }
        }
        else {
            Tool.pre(["出错11", t])
        }
    },
    d04: function (dbnameObj) {
        $("#state").html("计数。")
        for (let k in dbnameObj) {
            if (this.obj.dbnameObj[k]) {
                this.obj.dbnameObj[k] += dbnameObj[k];
            }
            else {
                this.obj.dbnameObj[k] = dbnameObj[k];
            }
        }
        this.obj.B1++;
        this.d01()
    },
    ////////////////////////////////////////////////////
    e01: function () {
        if (!config[obj.params.site]) { config[obj.params.site] = {}; }
        config[obj.params.site].is_following = this.obj.dbnameObj;
        let data = [{
            action: "fs",
            fun: "writeFile",
            path: "public/" + o.path + "admin/js/Shopee/采集箱/粉丝/config.js",
            data: "let config=" + JSON.stringify(config, null, 2),
        }]
        Tool.ajax.a01(data, this.e02, this);

    },
    e02: function (t) {
        if (t[0] == "写入成功") {
            $("#state").html("全部完成。");
        }
        else { Tool.pre(["出错", t]); }
    },
}
fun.a01();