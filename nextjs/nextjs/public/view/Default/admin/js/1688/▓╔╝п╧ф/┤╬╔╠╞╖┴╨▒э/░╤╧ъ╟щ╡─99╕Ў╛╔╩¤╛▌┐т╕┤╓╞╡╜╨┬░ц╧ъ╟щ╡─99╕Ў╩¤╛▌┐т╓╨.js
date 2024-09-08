/// <reference path="../index.js" />
'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 99,//旧数据库进度
        B1: 1, B2: 0,//页进度
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 次商品列表 &gt; 把详情的99个旧数据库复制到新版详情的99个数据库中") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">数据库：</td><td>'+ this.b01() + '</td><td></td></tr>\
                <tr><td class="right">旧数据库进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(null, null, html);
    },
    a02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a03, this, null);
    },
    a03: function () {
        alert("工能已失效，需要自己工发。")
       // let str = '[{"B2":' + (this.obj.B2 == 0 ? '<@page/>' : '0') + '}\
       // <r:prodes size=1 page=2 db="sqlite.1688_prodes_bak/'+ this.obj.A1.toString().padStart(2, '0') + '">,\
       // {\
       //     "fromid":<:fromid/>,\
       //     "data":<:data tag=json/>,\
       //     <r:prodes size=1 page=2 db="sqlite.1688_prodes/'+ this.obj.A1.toString().padStart(2, '0') + '">\
       //         "sku":<:sku tag=0/>,\
       //     </r:prodes>\
       //}\
       // </r:prodes>]'
       // $("#state").html("正在获取商品信息...");
       // Tool.ajax.a01(str, this.obj.B1, this.a04, this);
    },
    a04: function (arr) {
        if (this.obj.B2 == 0) { this.obj.B2 = arr[0].B2; }
        arr.shift();
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d01, this, this.e01, arr);
    },
    b01: function () {
        let nArr = [];
        for (let i = 1; i <= this.obj.A2; i++) {
            nArr.push('<option value="' + i + '">从第' + i + '个数据库开始执行</option>');
        }
        return '\
        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择从第几个数据库开始执行</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    /////////////////////////
    c01: function (This, val) {
        This.attr("disabled", "disabled")
        this.obj.A1 = val;
        this.a02();
    },
    d01: function (arr) {
        $("#state").html("正在更新数据...");
        let sqlArr = [], arr3 = []
        for (let i = 0; i < arr.length; i++) {
            if (arr3.indexOf(arr[i].fromid) == -1) {//去重
                arr3.push(arr[i].fromid)
                /////////////////////////////
                if (arr[i].sku && arr[i].data!="false}") {
                    let dataArr = JSON.parse(arr[i].data)
                    if (dataArr.globalData) {
                        arr[i].sku.orderParam = dataArr.globalData.orderParamModel.orderParam;
                        sqlArr.push('update @.prodes set @.sku=' + Tool.rpsql(JSON.stringify(arr[i].sku)) + ' where @.fromid=' + arr[i].fromid)
                    }
                }
            }
        }
        if (sqlArr.length == 0) {
            this.d03()
        }
        else {
            let str = '<r: db="sqlite.1688_prodes/' + this.obj.A1.toString().padStart(2, '0') + '">' + sqlArr.join("<1/>") + '</r:>'
            Tool.ajax.a01('"ok"' + str, 1, this.d02, this)
        }
    },
    d02: function (t) {
        if (t == "ok") {
            $("#state").html("等0秒后，再下一条...");
            Tool.Time("name", 0, this.d03, this)
        }
        else {
            $("#state").html("更新出错,延时1秒后再来。")
            Tool.pre(["更新出错01：", t]);
        }
    },
    d03: function () {
        this.obj.B1++;
        this.a03()
    },
    /////////////////////////////////////////////////
    e01: function (t) {
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.obj.A1++;
        this.a02()
    },
}
fun.a01();

