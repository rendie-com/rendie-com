'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: [],
        B1: 1, B2: 0,
        C1: 1, C2: 0,
        D1: 1, D2: 0,
        sqlArr: [],
    },
    a01: function () {
        let html = Tool.header(obj.params.return, 'Shopee -&gt; 类目列表 -&gt; 采集类目') + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                <tr><td class="right w150">第一层类目进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">第二层类目进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">第三层类目进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
                <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_category_tree?SPC_CDS_VER=2&include_level=4"
        $("#state").html("正在获取网址中的【cnsc_shop_id】。。。");
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a04, this)
    },
    a04: function (arr) {
        this.obj.Aarr = arr.data.list;
        this.obj.A2 = this.obj.Aarr.length;
        this.a05()
    },
    a05: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, this.e07)
    },
    /////////////////////////////////////////
    d01: function () {
        this.obj.B2 = this.obj.Aarr[this.obj.A1 - 1].children.length
        this.d02()
    },
    d02: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d03, this, this.e05)
    },
    d03: function () {
        this.obj.C2 = this.obj.Aarr[this.obj.A1 - 1].children[this.obj.B1 - 1].children.length
        this.d04()
    },
    d04: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.e01, this, this.e03)
    },
    ///////////////////////////
    e01: function () {
        let arr = this.obj.Aarr[this.obj.A1 - 1].children[this.obj.B1 - 1].children[this.obj.C1 - 1].children
        if (arr.length == 0) {
            this.e02();
        }
        else {
            this.table.a01(arr, this.e02, this)
        }
    },
    e02: function () {
        this.obj.C1++;
        this.d04();
    },
    e03: function () {
        let arr = this.obj.Aarr[this.obj.A1 - 1].children[this.obj.B1 - 1].children;
        this.table.a01(arr, this.e04, this)
    },
    e04: function () {
        this.obj.B1++;
        this.obj.C1 = 1; this.obj.C2 = 0;
        $("#C1").css("width", "0%"); $("#C1,#C2").html("");
        this.d02();
    },
    e05: function () {
        let arr = this.obj.Aarr[this.obj.A1 - 1].children;
        this.table.a01(arr, this.e06, this)
    },
    e06: function () {
        this.obj.A1++;
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.a05();
    },
    e07: function () {
        let arr = this.obj.Aarr;
        this.table.a01(arr, this.e08, this)
    },
    e08: function () {
        $("#state").html("全部完成")
    },
    //////////////////////////////////////////////////////
    table: {
        a01: function (arr, next, This, t) {
            let oo = {
                idArr: [],
                insertArr: [],
                next: next,
                This: This,
                t: t
            }
            ////////////////////////////
            for (let i = 0; i < arr.length; i++) {
                oo.idArr.push(arr[i].id)
                oo.insertArr.push("insert into @.table(@.name,@.upid,@.enname,@.fromID,@.sort,@.isleaf)values(" + Tool.rpsql(arr[i].display_name) + "," + arr[i].parent_id + "," + Tool.rpsql(arr[i].name) + "," + arr[i].id + "," + (i + 1) + "," + (arr[i].has_children ? 0 : 1) + ")")
            }
            let data = [{
                action: "sqlite",
                database: "shopee/类目/类目",
                sql: "select @.fromid as fromid from @.table where @.fromid in('" + oo.idArr.join("','") + "')",
            }]
            Tool.ajax.a01(data, this.a02, this, oo);
        },
        a02: function (t, oo) {
            if (t[0].length == 0) {
                $("#state").html("正在插入。。。");
                this.a03(oo.insertArr, oo)
            }
            else {
                $("#state").html("正在插入2。。。");
                let fromidArr = [], sqlArr = [];
                for (let i = 0; i < t[0].length; i++) {
                    fromidArr.push(t[0][i].fromid)
                }
                for (let i = 0; i < oo.idArr.length; i++) {
                    if (fromidArr.indexOf(oo.idArr[i]) == -1) {
                        sqlArr.push(oo.insertArr[i])
                    }
                }
                if (sqlArr.length == 0) {
                    this.a05(oo)
                }
                else {
                    this.a03(sqlArr, oo)
                }
            }
        },
        a03: function (sqlArr, oo) {
            let data = []
            for (let i = 0; i < sqlArr.length; i++) {
                data.push({
                    action: "sqlite",
                    database: "shopee/类目/类目",
                    sql: sqlArr[i]
                })
            }
            Tool.ajax.a01(data, this.a04, this, oo)
        },
        a04: function (t, oo) {
            let isErr = false
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
                this.a05(oo)
            }
        },
        a05: function (oo) {
            oo.next.apply(oo.This, [oo.t])
        },
    },
}
fun.a01();