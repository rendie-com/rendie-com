var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        //obj.params.return     返回URL
        //obj.params.table      表名
        //obj.params.database   数据库名
        //obj.params.toaction   同步到哪个数据库（如：pg01）
        gg.isRD(this.a02,this)
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 定时任务 &gt; 更多 &gt; 把【sqlite】数据库该表同步到【PostgreSQL】数据库") + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
 		        <tr><td class="right w150">数据库名：</td><td colspan="2">'+ obj.params.database + '</td></tr>\
 		        <tr><td class="right">同步表名：</td><td colspan="2">'+ obj.params.table + '</td></tr>\
                <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        $("#state").html("正在获取商品信息。。。");
        let data = [{
            action: "sqlite",
            database: obj.params.database,
            sql: "select * FROM @." + obj.params.table +" order by @.id asc"+ Tool.limit(10, this.obj.A1, "sqlite"),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: obj.params.database,
                sql: "select count(1) as total FROM @." + obj.params.table,
            })
        }
        Tool.ajax.a01(data, this.a04, this);
    },
    a04: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = Math.ceil(t[1][0].total / 10) }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t[0]);
    },
    /////////////////////////////////////////
    b01: function (oo) {
        let arr = []
        for (let k in oo) {
            arr.push(k);
        }
        return arr;
    },
    b02: function (oo) {
        let arr = []
        for (let k in oo) {
            if (arr.length == 0) {
                arr.push(oo[k]);
            }
            else {
                arr.push(Tool.rpsql(oo[k]));
            }
        }
        return arr;
    },
    b03: function (arrL, arrR) {
        let arr = []
        for (let i = 0; i < arrL.length; i++) {
            arr.push(arrL[i] + "=" + arrR[i]);
        };
        return arr;
    },
    //////////////////////////////////////////////
    d01: function (arr) {
        let idArr = [], insertArr = [], updateArr = [], arrL = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == 0) { arrL = this.b01(arr[0]); }
            let arrR = this.b02(arr[i]);
            idArr.push(arrR[0])
            insertArr.push('insert into @.' + obj.params.table + '(' + arrL.join(",") + ')values(' + arrR.join(",") + ')')
            updateArr.push("update @." + obj.params.table + " set " + this.b03(arrL, arrR).join(",") + " where @.id=" + arrR[0])
        }
        this.d02(idArr, insertArr, updateArr)
    },
    d02: function (idArr, insertArr, updateArr) {
        let data = [{
            action: obj.params.toaction,
            database: obj.params.database,
            sql: "select @.id as id FROM @." + obj.params.table + " where @.id in(" + idArr.join(",") + ")",
        }]
        let oo = { idArr: idArr, insertArr: insertArr, updateArr: updateArr }
        Tool.ajax.a01(data, this.d03, this, oo);
    },
    d03: function (t, oo) {
        let arr = []
        for (let i = 0; i < t[0].length; i++) {
            arr.push(t[0][i].id)
        }
        this.d04(arr, oo)
    },
    d04: function (arr, oo) {
        let data = []
        for (let i = 0; i < oo.idArr.length; i++) {
            if (arr.indexOf(oo.idArr[i]) == -1) {
                data.push({
                    action: obj.params.toaction,
                    database: obj.params.database,
                    sql: oo.insertArr[i],
                })
            }
            else {
                data.push({
                    action: obj.params.toaction,
                    database: obj.params.database,
                    sql: oo.updateArr[i],
                })
            }
        }     
        Tool.ajax.a01(data, this.d05, this);
        // let headers = [
        //     {
        //         "name": "token",
        //         "value":"2ff68998b46cded1119bb2fa1406b7f84fdc988bd8bdef2374a379490eefc717"
        //     }
        // ]        
        // gg.setHeaders_postHtml("https://www.rendie.com/api/json", headers, {list:JSON.stringify(data)}, this.d05, this)    
        //d1f38g19pe1vn4.cloudfront.net    
    },
    d05: function (t) {
        let isErr = false;       
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) {
                isErr = true;
                break;
            }
        }
        if (isErr) {
            Tool.pre(["有错误", t])
        }
        else {
            this.d06()
        }
    },
    d06: function () {
        this.obj.A1++
        this.a03()
    },
}
fun.a01();