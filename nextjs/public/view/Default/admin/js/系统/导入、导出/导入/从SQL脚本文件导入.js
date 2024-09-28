'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: [],
        B1: 1, B2: 0, Barr: [],
        C1: 1, C2: 0, Carr: [],
        bakPath:""//备份的绝对路径
    },
    a01: function () {
        let html = Tool.header('正在【从SQL脚本文件导入】任务...') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		        <tr><td class="right w150">文件夹数据库进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">数据库：</td><td colspan="2" id="dbName"></td></tr>\
		        <tr><td class="right">文件夹数据表进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		        <tr><td class="right">数据表：</td><td colspan="2" id="tbName"></td></tr>\
		        <tr><td class="right">文件进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
		        <tr><td class="right">文件名：</td><td colspan="2" id="fileName"></td></tr>\
		        <tr><td class="right">当前位置：</td><td colspan="2" id="path"></td></tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
			    </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        $("#state").html("正在获取数据库文件夹。。。");
        let str = '"<.Wwwroot(' + o.path + 'bak/)/>"'
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function (t) {
        this.obj.bakPath = Tool.unescape(t)
        let str = '<.AreaViewFolder(' + this.obj.bakPath + ')/>'
        Tool.ajax.a01(str, 1, this.a03A, this);
    },
    a03A: function (arr1) {
        let arr2 = []
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(arr1[i].split(",")[0])
        }
        this.obj.A2 = arr2.length;
        this.obj.Aarr = arr2;
        this.a04()
    },
    a04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this)
    },
    a05: function () {
        let dbName = this.obj.Aarr[this.obj.A1 - 1]
        $("#state").html("正在获取数据表文件夹。。。");
        $("#dbName").html(dbName);
        let str = '<.AreaViewFolder(' + this.obj.bakPath + dbName + '/)/>'
        Tool.ajax.a01(str, 1, this.a06, this);
    },
    a06: function (arr1) {
        let arr2 = []
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(arr1[i].split(",")[0])
        }
        this.obj.B2 = arr2.length;
        this.obj.Barr = arr2;
        this.a07();
    },
    a07: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this, this.a14)
    },
    a08: function () {
        let dbName = this.obj.Aarr[this.obj.A1 - 1];
        let tbName = this.obj.Barr[this.obj.B1 - 1];
        $("#tbName").html(tbName);
        $("#state").html("正在获取数据表文件。。。");
        let str = '<.AreaViewFile(' + this.obj.bakPath + dbName + '/' + tbName + '/)/>'
        Tool.ajax.a01(str, 1, this.a09, this);
    },
    a09: function (arr1) {
        let arr2 = []
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(arr1[i].split(",")[0])
        }
        this.obj.C2 = arr2.length;
        this.obj.Carr = arr2;
        this.a10()
    },
    a10: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a11, this, this.a13)
    },
    a11: function () {
        let dbName = this.obj.Aarr[this.obj.A1 - 1];
        let tbName = this.obj.Barr[this.obj.B1 - 1];
        let fileName = this.obj.Carr[this.obj.C1 - 1];
        $("#fileName").html(fileName);
        let path = "/" + o.path + 'bak/' + dbName + '/' + tbName + "/" + fileName
        $("#path").html(path);
        $("#state").html("正在导入。。。");
        let str = '""<.ExecuteSqlFile(' + path + ',' + dbName + ')/>'
        Tool.ajax.a01(str, 1, this.a12, this);
    },
    a12: function (t) {
        if (t == "") {
            $("#C2").html(this.obj.C1 + '/' + this.obj.C2 + '（完）');
            $("#state").html("导入成功。。。");
            this.obj.C1++;
            this.a10();
        }
        else {
            Tool.pre(["出错：\n", t]);
        }
    },
    a13: function () {
        $("#state").html("文件【" + this.obj.Carr[this.obj.C1 - 1] + "】完...");
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        this.obj.Carr = [];
        $("#C1").css("width", "0%")
        $("#C1,#C2,#path,#fileName").html("");
        this.obj.B1++;
        this.a07();
    },
    a14: function () {
        $("#state").html("数据表【" + this.obj.Barr[this.obj.B1 - 1] + "】完...");
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").css("width", "0%")
        $("#B1,#B2,#tbName").html("");
        this.obj.A1++;
        this.a04(); 
   }
}
fun.a01();
