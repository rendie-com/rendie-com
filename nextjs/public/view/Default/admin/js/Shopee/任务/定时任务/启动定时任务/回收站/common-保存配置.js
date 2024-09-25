'use strict';
Object.assign(Tool, {
    save_config: {
        obj: {
            x1: 1, x2: 0, xArr: {
                my: [
                    "https://my.xiapibuy.com/search?keyword=necklace&sortBy=ctime&page=",//搜索项链
                    "https://my.xiapibuy.com/Rings-cat.11000690.11000700.11001715?sortBy=ctime&page=",//戒指类目
                    "https://my.xiapibuy.com/Earrings-cat.11000690.11000700.11001716?sortBy=ctime&page="//耳环类目
                ],
                br: [
                    "https://shopee.com.br/An%C3%A9is-cat.11059978.11060073?sortBy=ctime&page=",//戒指类目
                    "https://shopee.com.br/Brincos-cat.11059978.11060064?sortBy=ctime&page="//耳环类目
                ],
            },
            y1: 1, y2: 5, yArr: [],
        },
        a01: function (x, y, site, next, This, t) {
            let oo = {
                x: x,
                y: y,
                site: site,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo);
        },
        a02: function (oo) {
            let str = '\
            {<r:buyer db="sqlite.shopee" size=1 where=" where @.site=\''+ oo.site + '\'">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:buyer>}';
            Tool.ajax.a01(str, 1, this.a03, this, oo);
        },
        a03: function (t, oo) {
            Tool.loginShopeeBuyer.a01(t.username, t.password, t.cookies, oo.site, $("#state"), this.a04, this, oo);
        },
        a04: function (t, oo) {
            this.obj.x2 = this.obj.xArr[oo.site].length
            Tool.x1x2(oo.x, this.obj.x1, this.obj.x2, this.d01, this, this.e03, oo)
        },
        ////////////////////////////////////////
        d01: function (oo) {
            Tool.x1x2(oo.y, this.obj.y1, this.obj.y2, this.d02, this, this.e02, oo)
        },
        d02: function (oo) {
            let url = this.obj.xArr[oo.site][this.obj.x1 - 1] + (this.obj.y1 - 1);
            gg.tabs_remove_create_getHeaders(3, url, ["/api/v4/search/search_items"], true, this.d03, this, oo)
        },
        d03: function (t, oo) {
            gg.setHeaders_getHtml(t.url, t.requestHeaders, this.d04, this, oo)
        },
        d04: function (t, oo) {
            if (t.items) {
                this.d05(t.items, oo)
            }
            else {
                Tool.pre(["内容不对", t])
            }
        },
        d05: function (arr, oo) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].item_basic.shop_location == "中国大陆" ||
                    arr[i].item_basic.shop_location == "Mainland China" ||
                    arr[i].item_basic.shop_location == "China Continental") {
                    if (this.obj.yArr.indexOf(arr[i].item_basic.shopid) == -1) {//去重
                        this.obj.yArr.push(arr[i].item_basic.shopid)
                    }
                }
            }
            this.e01(oo)
        },
        e01: function (oo) {
            this.obj.y1++;
            this.d01(oo)
        },
        e02: function (oo) {
            this.obj.y1 = 1;
            $("#" + oo.y + "1").css("width", "0%"); $("#" + oo.y + "1,#" + oo.y + "2").html("");
            this.obj.x1++;
            this.a04("", oo)
        },
        e03: function (oo) {
            this.obj.x1 = 1;
            $("#" + oo.x + "1").css("width", "0%"); $("#" + oo.x + "1,#" + oo.x + "2").html("");
            this.e04(oo)
        },
        e04: function (oo) {



            config[oo.site].shopId_arr = this.obj.yArr;
            let str = '"ok"<r: file="/' + o.path + 'admin/js/Shopee/定时任务/开始启动/config.js">let config=' + JSON.stringify(config, null, 2) + '</r:>';
            Tool.ajax.a01(str, 1, this.e04, this, oo);
        },
        //e04: function (t, oo) {
        //    if (t == "ok") {
        //        $("#state").html("已保存配置。");
        //        this.obj.yArr = [];
        //        oo.next.apply(oo.This, [oo.t]);
        //    }
        //    else {
        //        Tool.pre(["出错", t]);
        //    }
        //},

    },
})