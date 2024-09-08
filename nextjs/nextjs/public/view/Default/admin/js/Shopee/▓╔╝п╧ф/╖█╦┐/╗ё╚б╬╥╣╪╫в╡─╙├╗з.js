var fun =
{
    obj:
    {
        A1: 1, A2: 1, shopId: 0,
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件
        //obj.params.return         返回URL  
        //obj.params.site           站点 
        this.a02()
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 采集箱 &gt; 粉丝 &gt; 获取我关注的用户") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
		        <tr><td class="right w150">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		        <tr><td class="right">店铺ID：</td><td colspan="2" id="shopId"></td></tr>\
		        <tr><td class="right">粉丝页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
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
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/粉丝/"+ obj.params.site,
            sql: "update @.table set @.is_my_following=0 where @.is_my_following=1",
        }]
        Tool.ajax.a01(data, this.a05, this);
    },
    a05: function (t) {
        if (t[0].length == 0) {
            this.d01();
        }
        else {
            Tool.pre(["有错误", t])
        }
    },
    ////////////////////////////////
    d01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this, null)
    },
    d02: function () {
        //【我关注的】来源：https://my.xiapibuy.com/shop/896010703/following/?__classic__=1
        let url = "https://" + (obj.params.site == "tw" ? "xiapi" : obj.params.site) + ".xiapibuy.com/api/v4/pages/get_followee_list?limit=20&offset=" + ((this.obj.A1 - 1) * 20) + "&shopid=" + this.obj.shopId;
        $("#state").html("正在获取店铺的粉丝。。。")
        gg.getHtml(url, this.d03, this)
    },
    d03: function (t) {
        if (t.data) {
            if (!t.data.nomore) { this.obj.A2++; }
            if (t.data.accounts) {
                Tool.accounts.a01(t.data.accounts, "@.is_my_following", obj.params.site,this.d04, this)
            }
            else {
                $("#state").html("店铺的粉丝隐藏了，跳过。。。")
            }
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d04: function () {
        this.obj.A1++;
        this.d01()
    },
}
fun.a01();