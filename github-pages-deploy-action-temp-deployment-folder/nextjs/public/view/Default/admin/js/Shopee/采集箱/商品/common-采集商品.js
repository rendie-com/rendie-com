'use strict';
Object.assign(Tool, {
    gatherPro: {
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
            y1: 1, y2: 8, yArr: [],
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
            this.a04("", oo)
            //Tool.loginShopeeBuyer.a01(t.username, t.password, t.cookies, oo.site, $("#state"), this.a04, this, oo);
        },
        a04: function (t, oo) {
            this.obj.x2 = this.obj.xArr[oo.site].length
            Tool.x1x2(oo.x, this.obj.x1, this.obj.x2, this.d01, this, this.e03, oo)
        },
        ////////////////////////////////////////
        d01: function (oo) {
            let url = this.obj.xArr[oo.site][this.obj.x1 - 1] + (this.obj.y1 - 1);
            gg.tabs_remove_create_getHeaders(3, url, ["/api/v4/search/search_items"], true, this.d02, this, oo)
        },
        d02: function (t,oo) {
            this.obj.headers = t;
            this.d03(oo)
        },
        d03: function (oo) {
            Tool.x1x2(oo.y, this.obj.y1, this.obj.y2, this.d04, this, this.e02, oo)
        },
        d04: function (oo) {
            let size = Tool.int(Tool.StrSlice(this.obj.headers.url, "&limit=","&"))
            let page = (this.obj.y1 - 1) * size
            let url = this.obj.headers.url.replace("&newest=0", "&newest="+page)
            gg.setHeaders_getHtml(url, this.obj.headers.requestHeaders, this.d05, this, oo)
        },
        d05: function (t, oo) {
            if (t.items) {
                let y2 = Math.ceil(t.total_count / t.batch_size)
                if (y2 < 9) this.obj.y2 = y2;//只能翻10页
                this.d06(t.items, oo)
            }
            else {
                //this.d01(oo);
                Tool.pre(["内容不对1111", t])
            }
        },
        d06: function (arr, oo) {
            let sqlArr = []
            for (let i = 0; i < arr.length; i++) {
                let arrL = [
                    "@.site",
                    "@.itemid",
                    "@.shopid",
                    "@.name",
                    "@.image",
                    "@.price",
                    "@.shop_location",
                    "@.addtime",
                ]
                let arrR = [
                    Tool.rpsql(oo.site),
                    arr[i].itemid,
                    arr[i].shopid,
                    Tool.rpsql(arr[i].item_basic.name),
                    Tool.rpsql(arr[i].item_basic.image),
                    arr[i].item_basic.price,
                    Tool.rpsql(arr[i].item_basic.shop_location),
                    arr[i].item_basic.ctime,
                ]
                let arrUp = []; for (let i = 0; i < arrL.length; i++) { arrUp.push(arrL[i] + "=" + arrR[i]); }
                let sel = "select count(1) from @.pro where @.itemid=" + arr[i].itemid + " and @.site='" + oo.site +"'"
                sqlArr.push('\
		        <if Fun(Db(sqlite.shopee,'+ sel + ',count))==0>\
			        <r: db="sqlite.shopee">insert into @.pro('+ arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>\
		        <else/>\
			        <r: db="sqlite.shopee">update @.pro set '+ arrUp.join(",") + ' where @.itemid=' + arr[i].itemid + ' and @.site=\'' + oo.site + '\'</r:>\
		        </if>')
            }
            Tool.ajax.a01('"ok"' + sqlArr.join(""), 1, this.d07, this, oo);
        },
        d07: function (t, oo) {
            if (t == "ok") {
                this.e01(oo)
            }
            else {
                Tool.pre(["出错", t])
            }
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
            oo.next.apply(oo.This, [oo.t]);
        },     
    },
})

/*for (let i = 0; i < arr.length; i++) {
    if (arr[i].item_basic.shop_location == "中国大陆" ||
        arr[i].item_basic.shop_location == "Mainland China" ||
        arr[i].item_basic.shop_location == "China Continental") {
        if (this.obj.yArr.indexOf(arr[i].item_basic.shopid) == -1) {//去重
            this.obj.yArr.push(arr[i].item_basic.shopid)
        }
    }
}*/