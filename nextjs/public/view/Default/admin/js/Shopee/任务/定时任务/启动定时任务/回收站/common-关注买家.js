'use strict';
Object.assign(Tool, {
    follow_user: {
        obj: {
            x1: 1, x2: 10, xArr: {
                my: [
                    "https://my.xiapibuy.com/Rings-cat.11000690.11000700.11001715?sortBy=ctime&page=",//戒指类目
                    "https://my.xiapibuy.com/Earrings-cat.11000690.11000700.11001716?sortBy=ctime&page="//耳环类目
                ],
                br: [
                    "https://shopee.com.br/An%C3%A9is-cat.11059978.11060073?sortBy=ctime&page=",//戒指类目
                    "https://shopee.com.br/Brincos-cat.11059978.11060064?sortBy=ctime&page="//耳环类目
                ],
            },
            y1: 1, y2: 0, yArr: [],
            z1: 1, z2: 0, zArr: [],
        },
        a01: function (x, y, z, seller, site, next, This, t) {
            let oo = {
                x: x,
                y: y,
                z: z,
                seller: seller,
                site: site,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo);
        },
        a02: function (oo) {
            Tool.x1x2(oo.x, this.obj.x1, this.obj.x2, this.a03, this, this.f03, oo)
        },
        a03: function (oo) {
            let str = '\
            {<r:buyer db="sqlite.shopee" size=1 where=" where @.site=\''+ oo.site + '\'">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:buyer>}';
            Tool.ajax.a01(str, 1, this.a04, this, oo);
        },
        a04: function (t, oo) {
            Tool.loginShopeeBuyer.a01(t.username, t.password, t.cookies, oo.site, $("#state"), this.a05, this, oo);
        },
        a05: function (t, oo) {
            let ran = Tool.randomRange(0, 2);
            let url = this.obj.xArr[oo.site][ran] + (this.obj.x1 - 1);
            gg.tabs_remove_create_getHeaders(3, url, ["/api/v4/search/search_items"], true, this.a06, this, oo)
        },
        a06: function (t, oo) {
            gg.setHeaders_getHtml(t.url, t.requestHeaders, this.a07, this, oo)
        },
        a07: function (t, oo) {
            if (t.items) {
                this.a08(t.items, oo)
            }
            else {
                Tool.pre(["内容不对", t])
            }
        },
        a08: function (arr, oo) {
            let shopidArr = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].item_basic.shop_location == "中国大陆" ||
                    arr[i].item_basic.shop_location == "Mainland China" ||
                    arr[i].item_basic.shop_location == "China Continental") {
                    if (shopidArr.indexOf(arr[i].item_basic.shopid) == -1) {//去重
                        shopidArr.push(arr[i].item_basic.shopid)
                    }
                }
            }
            this.obj.yArr = shopidArr
            //this.obj.y2 = shopidArr.length;
            //this.d01(oo)
        },
        ///////////////////////////////////////////////////////////
        d01: function (oo) {
            Tool.x1x2(oo.y, this.obj.y1, this.obj.y2, this.d02, this, this.f02, oo)
        },
        d02: function (oo) {
            let url = "https://" + oo.site + ".xiapibuy.com/api/v4/pages/get_follower_list?limit=20&offset=0&shopid=" + this.obj.yArr[this.obj.y1 - 1]
            $("#state").html("正在获取店铺的粉丝。。。")
            gg.getFetch(url,"json", this.d03, this, oo)
        },
        d03: function (t, oo) {
            if (t.data) {
                if (t.data.accounts) {
                    this.d04(t.data.accounts, oo)
                }
                else {
                    $("#state").html("店铺的粉丝隐藏了，跳过。。。")
                    this.f01(oo)
                }
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        d04: function (arr, oo) {
            let useridArr = []
            for (let i = 0; i < arr.length; i++) {
                useridArr.push(arr[i].userid)
            }
            this.obj.z2 = useridArr.length;
            this.obj.zArr = useridArr;
            this.e01(oo);
        },
        ///////////////////////////////////////////////////
        e01: function (oo) {
            Tool.x1x2(oo.z, this.obj.z1, this.obj.z2, this.e02, this, this.f01, oo)
        },
        e02: function (oo) {
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site
            ]
            let url = "https://seller.shopee.cn/api/v3/order/follow_user?" + pArr.join("&")
            let data = {
                "target_user_id": this.obj.zArr[this.obj.z1 - 1],
                "is_follow": true
            }
            $("#state").html("正在关注粉丝。。。")
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.e03, this, oo)
        },
        e03: function (t, oo) {
            if (t.message == "success") {
                this.obj.z1++
                this.e01(oo)
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        //////////////////////////////////////////////
        f01: function (oo) {
            this.obj.z1 = 1; this.obj.z2 = 0; this.obj.zArr = [];
            $("#" + oo.z + "1").css("width", "0%"); $("#" + oo.z + "1,#" + oo.z + "2").html("");
            this.obj.y1++;
            this.d01(oo)
        },
        f02: function (oo) {
            this.obj.y1 = 1; this.obj.y2 = 0; this.obj.yArr = [];
            $("#" + oo.y + "1").css("width", "0%"); $("#" + oo.y + "1,#" + oo.y + "2").html("");
            this.obj.x1++;
            this.a02(oo)
        },
        f03: function (oo) {
            this.obj.x1 = 1;
            $("#" + oo.x + "1").css("width", "0%"); $("#" + oo.x + "1,#" + oo.x + "2").html("");
            oo.next.apply(oo.This, [oo.t]);
        },
    },
})
//Tool.last_active.a01(this.obj.seller, site, this.e01, this)
//<tr><td class="right">涨粉保存店铺ID页进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
//<tr><td class="right">置顶推广进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
//<tr><td class="right">涨粉店铺ID进度：</td>'+ Tool.htmlProgress('E') + '</tr>\
//<tr><td class="right">涨粉关注进度：</td>'+ Tool.htmlProgress('F') + '</tr>\