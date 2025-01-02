var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        Aobj: {
            shopid: 0,//店铺ID
            get_follower_time: 0,//上次的获取粉丝时间
            new_get_follower_time: 0,//这次的获取粉丝时间
        },
        B1: 1, B2: 1,
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件
        //obj.params.site           站点
        //obj.params.return         返回URL
        this.a02()
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 采集箱 &gt; 粉丝 &gt; 从店铺中获取粉丝") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
		        <tr><td class="right w170">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		        <tr><td class="right">店铺ID：</td><td id="shopid" colspan="2"></td></tr>\
		        <tr><td class="right">店铺ID进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">粉丝页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		        <tr><td class="right">上次的获取粉丝时间：</td><td id="get_follower_time" colspan="2"></td></tr>\
		        <tr><td class="right">这次的获取粉丝时间：</td><td id="new_get_follower_time" colspan="2"></td></tr>\
		        <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        gg.isRD(this.a04, this);
    },
    a04: function () {
        let where = this.b01(obj.params.site)
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/店铺/" + obj.params.site,
            sql: "select " + Tool.fieldAs("shopid,get_follower_time") + " from @.table" + where + " order by @.get_follower_time asc limit 1",
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/采集箱/店铺/" + obj.params.site,
                sql: "select count(1) as total FROM @.table" + where,
            })
        }
        Tool.ajax.a01(data, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
        this.obj.Aobj = t[0][0];
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, null)
    },
    a06: function () {
        this.obj.Aobj.new_get_follower_time = Tool.gettime("")
        $("#shopid").html(this.obj.Aobj.shopid)
        $("#get_follower_time").html(Tool.js_date_time2(this.obj.Aobj.get_follower_time))
        $("#new_get_follower_time").html(Tool.js_date_time2(this.obj.Aobj.new_get_follower_time))
        this.d01();
    },
    ////////////////////////////////
    b01: function (site) {
        let time24H = Tool.gettime("") - 60 * 60 * 24
        let arr = []
        if (site == "tw") {
            arr = ["'中国大陆'", "'中國大陸'", "'Mainland China'"]
        }
        else if (site = "my") {
            arr = ["'中国大陆'", "'Mainland China'"]
        }
        else if (site = "br") {
            arr = ["'Mainland China'", "'China Continental'"]
        }
        //@.get_follower_time           获取粉丝时间
        return " where @.shop_location in(" + arr.join(",") + ") and @.get_follower_time<" + time24H
    },
    //////////////////////////////////////////////
    d01: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d02, this, this.e01)
    },
    d02: function () {
        let url = "https://" + (obj.params.site == "tw" ? "xiapi" : obj.params.site) + ".xiapibuy.com/api/v4/pages/get_follower_list?limit=20&offset=" + ((this.obj.B1 - 1) * 20) + "&shopid=" + this.obj.Aobj.shopid
        $("#url").html(url);
        $("#state").html("正在获取店铺的粉丝。。。")
        gg.getFetch(url,"json", this.d03, this)
    },
    d03: function (t) {
        if (t.data) {
            if (t.data.accounts) {
                //- 60 * 60     表示减1小时，shopee可能有延时，才减1小时的。
                if (t.data.accounts[0].last_active_time <= this.obj.Aobj.get_follower_time - 60 * 60) {
                    //表示活跃时间小于我的采集时间，就不用采集了。
                    this.e01();
                }
                else {
                    if (!t.data.nomore) { this.obj.B2++; }
                    Tool.accounts.a01(t.data.accounts,{}, false, obj.params.site, this.d04, this);
                }
            }
            else {
                $("#state").html("店铺的粉丝隐藏了，跳过。。。")
                this.e01()
            }
        }
        else {
            Tool.pre(["出错222", t])
        }
    },
    d04: function () {
        this.obj.B1++;
        this.d01()
    },
    //////////////////////
    e01: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/店铺/" + obj.params.site,
            sql: "update @.table set @.get_follower_time=" + this.obj.Aobj.new_get_follower_time + " where @.shopid=" + this.obj.Aobj.shopid,
        }]
        $("#state").html("正在更新数据。。。")
        Tool.ajax.a01(data, this.e02, this);
    },
    e02: function (t) {
        if (t[0].length == 0) {
            this.obj.A1++
            this.obj.B1 = 1; this.obj.B2 = 1;
            this.obj.Aobj = {};
            this.a04();
        }
        else {
            Tool.pre(["出错11", t])
        }
    },
}
fun.a01();