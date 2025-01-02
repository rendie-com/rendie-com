'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: [],
        codeA: "", codeB: "",
        count: 0,//查找到了多少个。
        mode: ""//是“查找”还是“替换”。
    },
    a01: function () {
        //obj.arr[4]---返回url
        let str = '<r:gather db="sqlite.aliexpress" size=1 where=" order by @.sort desc,@.id desc"><:code tag=0/></r:gather>'
       Tool.ajax.a01( str,1,this.a02,this)
    },
    a02: function (oo) {
        let html = Tool.header('批量替换') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
            <tr>\
                <td class="right w170">查找：</td>\
                <td colspan="2">\
                    <div class="input-group">\
                    <input type="text" id="codeA" class="form-control"/>\
                    <button class="btn btn-outline-secondary" type="button" onclick="fun.c01(\'查找\');">批量查找</button>\
                    </div>\
                </td>\
            </tr>\
            <tr>\
                <td class="right">替换：</td>\
                <td colspan="2">\
                    <div class="input-group">\
                    <input type="text" id="codeB" class="form-control"/>\
                    <button class="btn btn-outline-secondary" type="button" onclick="fun.c01(\'替换\');">批量替换</button>\
                    </div>\
                </td>\
            </tr>\
            <tr><td class="right">【查找/替换】页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">【查找/替换】条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            <tr>\
                <td class="right">实例代码：</td>\
                <td colspan="2"><textarea rows="30" id="code" class="form-control" disabled="disabled">'+ JSON.stringify(oo, null, 2) + '</textarea></td>\
            </tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(null, this, html)
    },
    c01: function (mode) {
        this.obj.mode = mode;
        this.obj.codeA = $("#codeA").val();
        this.obj.codeB = $("#codeB").val();       
        if (this.obj.codeA != "") { this.c02(); }
        else {
            alert("查找内容不能为空")
        }        
    },
    c02: function () {
        let str = '[<@page/>\
        <r:gather db="sqlite.aliexpress" size=10 page=2 where=" order by @.sort desc,@.id desc">\
        ,{\
            "id":<:id/>,\
            "code":<:code tag=0/>\
        }\
        </r:gather>]'
        Tool.ajax.a01(str, this.obj.A1, this.c03, this)
    },
    c03: function (oo) {
        this.obj.A2 = oo[0]
        oo.shift();
        this.obj.B2 = oo.length;
        this.obj.Barr = oo;
        this.c04();
    },
    c04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.c05, this, this.c10)
    },
    c05: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.c06, this, this.c09)
    },
    c06: function () {
        let codestr = JSON.stringify(this.obj.Barr[this.obj.B1 - 1].code, null, 2)
        if (codestr.indexOf(this.obj.codeA) != -1) {
            this.obj.count++;
            if (this.obj.mode == "替换") {
                this.c07(codestr)
            }
            else {
                $("#state").html("查找通过");
                this.c08("")
            }
        }
        else {
            $("#state").html("找不到过。");
            this.c08("")
        }
    },
    c07: function (codestr) {
        let oo, code = codestr.replace(this.obj.codeA, this.obj.codeB);
        try {
            eval("oo=" + code)
            let sql = 'update @.gather set @.code=' + Tool.rpsql(JSON.stringify(oo)) + ' where @.id=' + this.obj.Barr[this.obj.B1 - 1].id
            let str = '<r: db="sqlite.aliexpress">' + sql + '</r:>'
           Tool.ajax.a01( str,1,this.c08,this)
        }
        catch (err) {
            Tool.at("JSON语法错误：" + err.message);
        }
    },
    c08: function (t) {
        if (t == "") {
            this.obj.B1++;
            this.c05();
        }
        else {
            Tool.at("更新错误：" + t);
        }
    },
    c09: function () {
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("")
        $("#state").html("正在准备下一页...");
        this.obj.A1++;
        this.c02()
    },
    c10: function () {
        if (this.obj.mode != "替换") {
            alert("找到" + this.obj.count + "个，可以替换。");
        }
        this.obj.A1 = 1;
        this.obj.A2 = 0;
        this.obj.count = 0;
        this.obj.mode = '';
        this.obj.codeA = '';
        this.obj.codeB = '';
        $("#A1").css("width", "0%");
        $("#A1,#A2").html("")
        $("#state").html("全部完成...");
    }
}
fun.a01();