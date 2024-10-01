var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        //obj.params.return     返回URL
        //obj.params.table      表名
        //obj.params.database   数据库名
        gg.isRD(this.a02, this)
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 采集箱 &gt; 粉丝 &gt; 把一个db文件拆分成多个db文件") + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
 		        <tr><td class="right w170">旧数据库名：</td><td colspan="2">'+ obj.params.database + '</td></tr>\
 		        <tr><td class="right">旧表名：</td><td colspan="2">'+ obj.params.table + '</td></tr>\
 		        <tr><td class="right">拆分个数：</td><td colspan="2">'+ obj.params.count + '</td></tr>\
 		        <tr><td class="right">按照哪个字段值拆分：</td><td colspan="2">'+ obj.params.field + '</td></tr>\
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
            sql: "select * FROM @." + obj.params.table + " order by @.id asc" + Tool.limit(100, this.obj.A1, "sqlite"),
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
        if (this.obj.A2 == 0) { this.obj.A2 = Math.ceil(t[1][0].total / 100) }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t[0]);
    },
    /////////////////////////////////////////
    b01: function (oo) {
        let arr = []
        for (let k in oo) {
            if (k != "rd_id") arr.push(k);
        }
        return arr;
    },
    b02: function (oo) {
        let arr = []
        for (let k in oo) {
            if (k != "rd_id") {
                if (arr.length == 0) {
                    arr.push(oo[k]);
                }
                else {
                    arr.push(Tool.rpsql(oo[k]));
                }
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
        let data = [], arrL = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == 0) { arrL = this.b01(arr[0]); }
            let arrR = this.b02(arr[i]);
            let database = obj.params.database + "/" + Tool.remainder3(arr[i][obj.params.field], 100)
            data.push({
                action: "sqlite",
                database: database,
                sql: "select @.id FROM @.table where " + obj.params.field + "=" + arr[i][obj.params.field],
                list: [{
                    action: "sqlite",
                    database: database,
                    sql: "update @.table set " + this.b03(arrL, arrR).join(",") + " where " + obj.params.field + "=" + arr[i][obj.params.field]
                }],
                elselist: [{
                    action: "sqlite",
                    database: database,
                    sql: "insert into @.table(" + arrL.join(",") + ")values(" + arrR.join(",") + ")"
                }]
            })
        }
        Tool.ajax.a01(data, this.d02, this);
    },

    d02: function (t) {
        let isErr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i][0].list[0].length != 0) {
                isErr = true;
                break;
            }
        }
        if (isErr) {
            Tool.pre(["有错误", t])
        }
        else {
            this.d03()
        }
    },
    d03: function () {
        this.obj.A1++
        this.a03()
    },
}
fun.a01();