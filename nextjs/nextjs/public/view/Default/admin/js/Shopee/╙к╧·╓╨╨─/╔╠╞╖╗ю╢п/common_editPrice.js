Object.assign(Tool, {
    common_editPrice: {
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
            $("#state").html("正在获取【尚未提交】，用来修改折扣。。。");
            Tool.common_ProductActivities.g01(oo.seller, oo.site, oo.session_id, this.a03, this, oo)
        },
        a03: function (t, oo) {
            oo.preview_no = t.preview_no
            let idArr = [], newArr = [], arr = t.arr;
            for (let i = 0; i < arr.length; i++) {
                idArr.push(arr[i].product.item_id)
                ///////////////////////////////
                let nomination_ids = [], self_reference_price_by_shopee = [];
                for (let j = 0; j < arr[i].product.models.length; j++) {
                    self_reference_price_by_shopee.push(arr[i].product.models[j].pricing_application_info.reference_price_by_shopee)//shopee想要你设置的价格
                    nomination_ids.push(arr[i].product.models[j].nomination_id)//修改价时要用
                }
                newArr.push({
                    self_reference_price_by_shopee: self_reference_price_by_shopee,//shopee想要你设置的价格
                    nomination_ids: nomination_ids,//修改价时要用
                    original_price: Tool.int(arr[i].product.models[0].original_price),//我填写的价格---我是统一设置价格，所以用第一个。
                    item_id: arr[i].product.item_id,//商品ID
                })
            }
            this.a04(idArr, newArr, oo)
        },
        a04: function (idArr, newArr, oo) {
            //@.isSignUp=1          表示【能报名】
            //@.isTrueSignUp=0      表示【未报名】
            //@.status=1            表示【上架商品】
            let str = '{\
            <r:shopPro_'+ oo.site + ' db="sqlite.shopee" size=' + idArr.length + ' where=" where @.status=1 and @.isSignUp=1 and @.isTrueSignUp=1 and @.fromid in(' + idArr.join(",") + ')">\
                "<:fromid/>":<:newDiscount/>-1,\
                "MinimumOrder<:fromid/>":<:MinimumOrder/>,\
            </r:shopPro_' + oo.site + '>}'
            oo.temp_newArr = newArr
            Tool.ajax.a01(str, 1, this.a05, this, oo);
        },
        a05: function (t, oo) {
            let discountArr = [], self_del_ids = [], isErr = false, newArr = oo.temp_newArr;
            for (let i = 0; i < newArr.length; i++) {
                let newDiscount = t[newArr[i].item_id]
                if (newDiscount) {
                    let price = Math.round(newArr[i].original_price * (1 - newDiscount / 100) / 1000) * 1000//价格
                    let o1 = this.b01(newArr[i].nomination_ids, price, newArr[i].self_reference_price_by_shopee)
                    self_del_ids = [...self_del_ids, ...o1.self_del_ids]//删除时要用---提交不要这个
                    if (o1.nomination_ids.length) {
                        discountArr.push({
                            "nomination_ids": o1.nomination_ids,//活动ID
                            "campaign_stock": t["MinimumOrder" + newArr[i].item_id] * 50,//库存
                            "campaign_price": price
                        })
                    }
                }
                else {
                    Tool.at("找不到商品ID【" + newArr[i].item_id + "】对应的折扣，程序终止。");
                    isErr = true;
                }
            }
            if (!isErr) {
                oo.discountArr = discountArr;
                this.d01(self_del_ids, oo)
            }
        },
        ///////////////////////////////////////
        b01: function (idArr, price, arr) {
            let self_del_ids = [], nomination_ids = [];
            for (let i = 0; i < arr.length; i++) {
                if (price > arr[i]) {
                    self_del_ids.push(idArr[i])//要删除的
                }
                else {
                    nomination_ids.push(idArr[i])//要修改价格的
                }
            }
            return {
                self_del_ids: self_del_ids,
                nomination_ids: nomination_ids
            }
        },
        /////////////////////////////////////////////////////
        d01: function (self_del_ids, oo) {
            if (self_del_ids.length == 0) {
                this.d03(oo)
            }
            else {
                this.d02(self_del_ids, oo)
            }
        },
        d02: function (self_del_ids, oo) {
            let data = {
                "session_id": oo.session_id,
                "preview_no": oo.preview_no,
                "nomination_ids": self_del_ids
            }
            $("#state").html("正在删除【尚未提交】的商品。");
            Tool.common_ProductActivities.j01(oo.seller, oo.site, data, this.d03, this, oo)
        },
        d03: function (oo) {
            Tool.apply({
                discountArr: oo.discountArr,
                preview_no: oo.preview_no
            }, oo.next, oo.This, oo.t);

        },
    }
})