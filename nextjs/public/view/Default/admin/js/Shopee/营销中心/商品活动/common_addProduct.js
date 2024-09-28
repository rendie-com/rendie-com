Object.assign(Tool, {
    common_addProduct: {
        //添加商品
        a01: function (seller, site, session_id, next, This, t) {
            let oo = {
                seller: seller,
                site: site,
                session_id: session_id,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            $("#state").html("正在获取【商品】信息。。。");
            //@.isSignUp=1          表示【能报名】
            //@.isTrueSignUp=0      表示【未报名】
            //@.status=1            表示【上架商品】
            let str = '[0\
            <r:shopPro_'+ oo.site + ' db="sqlite.shopee" size=200 where=" where @.status=1 and @.isSignUp=1 and @.isTrueSignUp=0 order by @._1688_saleNum desc">,\
            {\
                "MinimumOrder":<:MinimumOrder/>,\
                "fromid":<:fromid/>,\
                "model_list":<:model_list tag=0/>,\
            }\
            </r:shopPro_' + oo.site + '>]'
            Tool.ajax.a01(str, 1, this.a03, this, oo);
        },
        a03: function (t, oo) {
            t.shift();
            $("#state").html("去掉不能报名的商品。。。");
            let recruiting_entities = [], fromidArr = [];
            for (let i = 0; i < t.length; i++) {
                fromidArr.push(t[i].fromid)
                //////////////////////////////////////////////
                let models = this.b01(t[i].fromid, t[i].model_list, t[i].MinimumOrder)
                if (models.length) {
                    recruiting_entities.push({
                        "entity_type": 2,
                        "product": {
                            "item_id": "" + t[i].fromid,
                            "models": models
                        }
                    })
                }
            }
            this.a04(fromidArr, recruiting_entities, oo)
        },
        a04: function (fromidArr, recruiting_entities, oo) {
            //为什么还要更新一下？答：每次最多提交200个，而我需要更多，所以更新一下，下次提交就不会重复了
            oo.recruiting_entities = recruiting_entities;
            let update = "update @.shopPro_" + oo.site + " set @.isTrueSignUp=1 where @.fromid in(" + fromidArr.join(",") + ")"
            let str = '<r: db="sqlite.shopee">' + update + '</r:>'
            $("#state").html("正在更新本地报名状态。。。");
            Tool.ajax.a01('"ok"' + str, 1, this.a05, this, oo)
        },
        a05: function (t, oo) {
            if (t == "ok") {
                if (oo.recruiting_entities.length != 0) {
                    $("#state").html("正在添加商品。。。");
                    Tool.common_ProductActivities.f01(oo.seller, oo.site, oo.session_id, oo.recruiting_entities, this.a06, this, oo)
                }
                else {
                    Tool.at("没有可添加的商品，程序终止。")
                }
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        a06: function (preview_no, oo) {
            Tool.apply(preview_no, oo.next, oo.This, oo.t);
        },
        b01: function (fromid, arr, MinimumOrder) {
            let models = []
            for (let j = 0; j < arr.length; j++) {
                //库存要是【起订量】的50倍才能进来。因为这个要扣库存。
                if (arr[j].stock_detail.total_available_stock >= MinimumOrder * 50) {
                    models.push({
                        item_id: "" + fromid,
                        model_id: "" + arr[j].id,
                    })
                }
            }
            return models;
        },
    }
})