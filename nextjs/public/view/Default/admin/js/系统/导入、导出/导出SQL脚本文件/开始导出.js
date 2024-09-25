'use strict';
var fun =
{
    obj: {
        db: {},
        A1: 1, A2: 0, Aarr: [],
        B1: 1, B2: 0, Barr: [],
        C1: 1, C2: 0,
        pcount: 100//每个文件100条
    },
    a01: function () {
        let html = Tool.header('正在导出数据库到文件中...') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		        <tr><td class="right">数据库：</td><td colspan="2" id="db"></td></tr>\
		        <tr><td class="right w150">数据库进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">表名：</td><td colspan="2" id="tabeName"></td></tr>\
		        <tr><td class="right w150">表进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		        <tr><td class="right">表页进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
			    </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        if (obj.arr[5] == "all") {
            this.a03();
        }
        else {
            let thisDB = obj.arr[5]
            this.obj.Aarr = [thisDB];
            this.obj.A2 = 1;
            let arr = obj.arr[6].split(",")
            for (let i = 0; i < arr.length; i++) {
                arr[i] = [arr[i], arr[i]+"表"]
            }
            let oo = {};
            oo[thisDB] = arr;
            this.obj.db = oo;
            this.a04();
        }
    },
    a03: function () {
        let Aarr = [], db = this.b01();
        for (let k in db) {
            Aarr.push(k);
        }
        this.obj.Aarr = Aarr;
        this.obj.A2 = Aarr.length;
        this.obj.db = db;
        this.a04();
    },
    a04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        let thisDB = this.obj.Aarr[this.obj.A1 - 1]
        this.obj.Barr = this.obj.db[thisDB]
        $("#db").html(thisDB);
        this.obj.B2 = this.obj.Barr.length;
        this.a06();
    },
    a06: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a07, this, this.a13);
    },
    a07: function () {
        let db = this.obj.Aarr[this.obj.A1 - 1]
        let tabeName = this.obj.Barr[this.obj.B1 - 1][0]
        $("#tabeName").html(tabeName);      
        $("#state").html("正在查询数据库【" + db + "】表【" + tabeName + "】总条数。。。");
        let str = '<.Db(' + db + ',select count(1) as Total FROM @.' + tabeName + ',count)/>'
        Tool.ajax.a01(str, 1, this.a08, this);
    },
    a08: function (t) {
        $("#state").html("已获得总条数，每个文件" + this.obj.pcount + "条，正在计算文件数量。。。");
        this.obj.C2 = Math.ceil(parseInt(t) / this.obj.pcount);
        this.a09()
    },
    a09: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a10, this, this.a12);
    },
    a10: function () {
        let db = this.obj.Aarr[this.obj.A1 - 1]
        let table = this.obj.Barr[this.obj.B1 - 1][0], pcount = this.obj.pcount
        let sql = escape("select * FROM @." + table + " limit " + ((this.obj.C1 - 1) * pcount) + "," + pcount)
        let vpath = table + "/" + this.obj.C1 + ".sql"
        let str = '""<.GeneralSqlScript(' + db + ',' + table + ',' + sql + ',' + vpath + ')/>'
        Tool.ajax.a01(str, 1, this.a11, this)
    },
    a11: function (t) {
        if (t == "") {
            $("#C2").html(this.obj.C1 + '/' + this.obj.C2 + '（完）');
            this.obj.C1++;
            this.a09();
        }
        else { Tool.pre(["出错：", t]); }
    },
    a12: function () {
        $("#state").html(this.obj.Barr[this.obj.B1 - 1] + "表完，正准备下一个表...");
        $("#C1").css("width", "0%");
        $("#C1,#C2").html("");
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        this.obj.B1++;
        this.a06();
    },
    a13: function () {
        $("#state").html(this.obj.Barr[this.obj.B1 - 1] + "数数库完，正准备下一个数数库...");
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("");
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        this.obj.A1++;
        this.a04();
    },
    b01: function () {
        let dbName = "", dbArr = {};
        for (let i = 0; i < mssql.length; i++) {
            if (mssql[i].db) {
                if (mssql[i].db.indexOf("|") == -1) {
                    dbName = mssql[i].dbType + "." + mssql[i].db
                    if (!dbArr[dbName]) { dbArr[dbName] = []; }
                    dbArr[dbName].push([mssql[i].name, mssql[i].des]);
                }
                else {
                    let arr = mssql[i].db.split("|"), num = parseInt(arr[1]);
                    for (let j = 1; j <= num; j++) {
                        dbName = mssql[i].dbType + "." + arr[0] + j
                        if (!dbArr[dbName]) { dbArr[dbName] = []; }
                        dbArr[dbName].push([mssql[i].name, mssql[i].des]);
                    }
                }
            }
            else {
                if (!dbArr["default"]) { dbArr["default"] = []; }
                dbArr["default"].push([mssql[i].name, mssql[i].des]);
            }
        }
        return dbArr;
    },
}
fun.a01();