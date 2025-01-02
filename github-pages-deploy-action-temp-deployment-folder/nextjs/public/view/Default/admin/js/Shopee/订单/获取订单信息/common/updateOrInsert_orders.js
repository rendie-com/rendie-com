Object.assign(Tool, {
    //更新或添加订单信息
    updateOrInsert_orders: {
        a01: function (order, next, This, t) {
            let arrL = [], arrR = [], updateArr = [];
            for (let k in order) {
                arrL.push(k);
                arrR.push(order[k]);
                updateArr.push(k + "=" + order[k]);
            }
            this.a02(arrL, arrR, updateArr, order["@.site"], order["@.order_id"], next, This, t)
        },
        a02: function (arrL, arrR, updateArr, site, order_id, next, This, t) {
            let update = "update @.table set " + updateArr.join(",") + "  where @.site=" + site + " and @.order_id=" + order_id
            let insert = "insert into @.table(" + arrL.join(",") + ")values(" + arrR.join(",") + ")";
            let data = [{
                action: "sqlite",
                database: "shopee/订单",
                sql: "select @.id from @.table where @.site=" + site + " and @.order_id=" + order_id,
                list: [{
                    action: "sqlite",
                    database: "shopee/订单",
                    sql: update,
                }],
                elselist: [{
                    action: "sqlite",
                    database: "shopee/订单",
                    sql: insert,
                }]
            }]
            //////////////////////////
            let oo = {
                next: next,
                This: This,
                t: t
            }           
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            if (t[0][0].list[0].length == 0) {               
                oo.next.apply(oo.This, [oo.t])
            }
            else {
                Tool.pre(["出错002", t]);
            }

        },
    },
})

