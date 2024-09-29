Object.assign(Tool, {
    login: {
        a01: function (next, This, t) {
            let oo = {
                next: next,
                This: This,
                t: t
            }
            gg.isRD(this.a02, this, oo);
        },
        a02: function (t, oo) {
            $("#state").html("正在获得配置参数");
            let data = [{
                action: "${default_db}",
                database: "shopee/卖家账户",
                sql: "select " + Tool.fieldAs("username,password,cookies,config,localstorage") + " FROM @.table limit 1",
            }]
            Tool.ajax.a01(data, this.a03, this, oo)
        },
        a03: function (t, o2) {
            let o1 = t[0][0];
            $("#username").html(o1.username);
            let arr = [], cookies = JSON.parse(o1.cookies);
            for (let i = 0; i < cookies.length; i++) {
                arr = arr.concat(cookies[i].cookies);//为什么不用break?答：因为“SPC_CDS”值异常时就会在“https://shopee.cn/”网址里面，正常时就在“https://seller.shopee.cn/”网址里面。
            }
            this.a04(arr, o1, o2)
        },
        a04: function (arr, o1, o2) {
            let SPC_CDS = ""
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == "SPC_CDS") {
                    SPC_CDS = arr[i].value;
                    break;
                }
            }
            if (SPC_CDS) {
                this.a05(SPC_CDS, o1, o2)
            }
            else {
                Tool.at("在cookies中没有名称为“SPC_CDS”。")
            }
        },
        a05: function (SPC_CDS, o1, o2) {
            o1.config = JSON.parse(o1.config)
            o1.config.SPC_CDS = SPC_CDS
            o2.seller = o1.config
            Tool.loginShopee.a01(o1.username, o1.password, JSON.parse(o1.cookies), JSON.parse(o1.localstorage), $("#state"), this.a06, this, o2)
        },
        a06: function (t, oo) {
            Tool.apply(oo.seller, oo.next, oo.This, oo.t);
        },
    },
})