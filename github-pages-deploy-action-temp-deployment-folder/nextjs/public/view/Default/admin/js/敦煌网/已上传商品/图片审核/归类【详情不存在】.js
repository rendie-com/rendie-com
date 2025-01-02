'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: [],
    },
    a01: function () {
        let html = Tool.header("归类【详情不存在】") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
            <tbody>\
            <tr><td class="right w150">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        $("#state").html('正在把【详情不存在】设置成【未审核】。')
        let str = '""<r: db="sqlite.dhgate">update @.proupdhgate set @.ManualReview=0 where @.ManualReview=2</r:>'
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') +
        '<r:proupdhgate size=500 db="sqlite.dhgate" page=2>,\
        {\
            <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                "isProid":"<:proid/>",\
            </r:prodes>\
            "proid":"<:proid/>"\
        }\
        </r:proupdhgate>]'
        $("#state").html('正在获取详情...')
        Tool.ajax.a01(str, this.obj.A1, this.a04, this);
    },
    a04: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        arr.shift();
        this.obj.Aarr = arr;
        $("#proid").html(arr[1].proid)
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this)
    },
    a05: function () {
        let arr = this.obj.Aarr, arrUndefined = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isProid == undefined) {
                arrUndefined.push(arr[i].proid);
            }
        }
        this.a06(arrUndefined)
    },
    a06: function (arr) {
        let str = '""<r: db="sqlite.aliexpress">update @.proupdhgate set @.ManualReview=2 where @.proid in(\'' + arr.join("','") + '\')</r:>'
        Tool.ajax.a01(str, 1, this.a07, this)
    },
    a07: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.a03();
        }
        else {
            Tool.at("出错：" + t)
        }
    },
}
fun.a01();
