'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("淘宝 &gt; 采集箱 &gt; 次商品列表 &gt; 采集商品详情。。。") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">店铺名称：</td><td id="shopTitle" colspan="2"></td></tr>\
                <tr><td class="right">访问地址1：</td><td id="url1" colspan="2"></td></tr>\
                <tr><td class="right">访问地址2：</td><td id="url2" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02A, this, html);
    },
    a02A: function () {
        gg.isRD(this.a02, this)
    },
    a02: function () {
        let day20 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 20) / 1000)
        let str = '\
        {\
            <r:proList size=1 page=2 db="sqlite.taobao" where=" where @.uptime<'+ day20 + ' and @.fromid&gt;0">\
		        "id":<:id/>,\
		        "fromid":<:fromid/>,\
		        "shopTitle":<:shopTitle tag=json/>,\
            </r:proList>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, 2, this.a03, this);
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
    },
    a04: function (oo) {
        $("#shopTitle").html(oo.shopTitle);
        let url = "https://item.taobao.com/item.htm?id=" + oo.fromid;
        $("#url1").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在打开详情页...");
        Tool.getDesUrl.a01(url, this.a05, this, oo)
    },
    a05: function (o1, o2) {
        let url = o1.dataUrl
        $("#url2").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取详情页数据...");
        let headers = [
            {
                "name": "Origin",
                "value": "https://item.taobao.com" 
            },
            {
                "name": "Referer",
                "value": "https://item.taobao.com/"
            },
            {
                "name": "Content-Type",
                "value": 'application/x-www-form-urlencoded'
            },
            {
                "name": "Sec-Fetch-Site",
                "value": 'same-site'
            },
            {
                "name": "Cookie",
                "value": o1.Cookie
            }           
        ]
        gg.setHeaders_getHtml(url, headers, this.a06, this, o2)
    },
    a06: function (data, oo) {
        $("#state").html("已得到数据...");
        if (data.ret[0] == "RGV587_ERROR::SM::哎哟喂,被挤爆啦,请稍后重试!" || data.ret[0] == "FAIL_SYS_USER_VALIDATE") {
            $("#state").html("要验证...");
            gg.tabs_remove_create_indexOf(2, data.data.url, "亲，请按照说明进行验证哦",true, this.d01, this)
        }
        else if (data.ret[0] == "FAIL_SYS_ILLEGAL_ACCESS::非法请求") {

            Tool.pre(["出错01",data])
        }
        else {
            if (data.data.componentsVO) {
                let newData = {
                    item: data.data.item,//放大镜图，视频，详情url,详情ID
                    sku2info: data.data.sku2info,//库存
                    skuBase: data.data.skuBase,//购物车属性和图片
                    infos: data.data.componentsVO.extensionInfoVO.infos//属性
                }
                let SaleNum = data.data.componentsVO.titleVO.salesDesc.split("已售 ")[1]
                if (SaleNum.indexOf("万") != -1) {
                    SaleNum = SaleNum.split("万")[0] + "0000";
                }
                else {
                    SaleNum = SaleNum.split("+")[0];
                }
                let fromid = Tool.int(data.data.item.itemId)
                this.a07(oo.id, fromid, SaleNum, newData)
            }
            else {
                Tool.pre(["要重新登录.....",data])
            }           
        }
    },
    a07: function (id, fromid, SaleNum, data) {
        $("#state").html("正在更新数据...");
        let str2 = '<r: db="sqlite.taobao">update @.proList set @.uptime=' + Tool.gettime("") + ',@.fromid=' + fromid + ',@.SaleNum=' + SaleNum + ' where @.id=' + id + '</r:>'
        let str = '\
        <if "Fun(Db(sqlite.taobao_prodes/'+ Tool.remainder(fromid, 99) + ',select count(1) from @.prodes where @.fromid=' + fromid + ',count))"=="0">\
            <r: db="sqlite.taobao_prodes/'+ Tool.remainder(fromid, 99) + '">insert into @.prodes(@.fromid,@.data)values(' + fromid + ',' + Tool.rpsql(JSON.stringify(data)) + ')</r:>\
        </if>';
        Tool.ajax.a01('"ok"' + str2 + str, 1, this.a08, this)
    },
    a08: function (t, oo) {
        if (t == "ok") {
            this.obj.A1++;
            this.a09(1)
        }
        else {
            $("#state").html("更新出错,延时1秒后再来。")
            Tool.pre(["更新出错01：", t]);
        }
    },
    a09: function (num) {
        $("#state").html("延时" + num + "秒后，下一条...");
        if (num == 0) {
            this.a02()
        }
        else {
            num--
            Tool.Time("name", 1000, this.a09, this, num)
        }
    },
    d01: function (t) {

    },

}
fun.a01(); 