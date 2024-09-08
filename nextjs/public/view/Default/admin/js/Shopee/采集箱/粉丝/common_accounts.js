Object.assign(Tool, {
    accounts: {
        a01: function (arr, editField, site, next, This, t) {
            let oo = { 
                site: site, 
                next: next, 
                This: This, 
                t: t 
            }
            this.a02(arr, editField, oo)
        },
        a02: function (arr, editField, oo) {
            let useridArr = [], insertObj = {}, updateObj = {};
            for (let i = 0; i < arr.length; i++) {
                let arrL = [
                    "@.userid",
                    "@.shopid",
                    "@.status",
                    "@.last_active_time",
                    "@.shopname",
                    "@.username",
                    "@.portrait",
                    "@.is_preferred_plus",
                    "@.is_official_shop",
                    "@.is_shopee_verified",
                    "@.is_seller",
                ]
                if (editField) arrL.push(editField)
                let arrR = [
                    arr[i].userid,
                    arr[i].shopid,
                    arr[i].status,
                    arr[i].last_active_time,
                    Tool.rpsql(arr[i].shopname),
                    Tool.rpsql(arr[i].username),
                    Tool.rpsql(arr[i].portrait),
                    arr[i].is_preferred_plus ? 1 : 0,
                    arr[i].is_official_shop ? 1 : 0,
                    arr[i].is_shopee_verified ? 1 : 0,
                    arr[i].is_seller ? 1 : 0,
                ]
                if (editField) arrR.push(1)
                /////////////////////////////////////////////////
                let arrUp = []; for (let i = 0; i < arrL.length; i++) { arrUp.push(arrL[i] + "=" + arrR[i]); }
                useridArr.push(arr[i].userid)
                insertObj[arr[i].userid] = 'insert into @.table(' + arrL.join(",") + ')values(' + arrR.join(",") + ')'
                updateObj[arr[i].userid] = 'update @.table set ' + arrUp.join(",") + ' where @.userid=' + arr[i].userid
            }
            let data = [{
                action: "sqlite",
                database: "shopee/采集箱/粉丝/" + oo.site,
                sql: "select @.userid as userid from @.table where @.userid in(" + useridArr.join(",") + ")"
            }]
            $("#state").html("正在查询数据。。。")
            oo.insertObj = insertObj;
            oo.updateObj = updateObj;
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            let arr = t[0], nArr = []
            for (let i = 0; i < arr.length; i++) {
                nArr.push(arr[i].userid);
            }
            this.a04(nArr, oo)
        },
        a04: function (useridArr, oo) {
            let data = []
            for (let k in oo.insertObj) {
                if (useridArr.indexOf(Tool.int(k)) == -1) {
                    data.push({
                        action: "sqlite",
                        database: "shopee/采集箱/粉丝/" + oo.site,
                        sql: oo.insertObj[k],
                    })
                }
                else {
                    data.push({
                        action: "sqlite",
                        database: "shopee/采集箱/粉丝/" + oo.site,
                        sql: oo.updateObj[k],
                    })
                }
            }
            Tool.ajax.a01(data, this.a05, this, oo);
        },
        a05: function (t, oo) {
            let iserr = false;
            for (let i = 0; i < t.length; i++) {
                if (t[i].length != 0) { iserr = true; break; }
            }
            if (iserr) {
                Tool.pre(["有出错", t]);
            }
            else {
                oo.next.apply(oo.This, [oo.t])
            }
        },
    }
})