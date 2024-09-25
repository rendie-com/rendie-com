'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0, Aarr: []
    },
    a01: function () {
        let html = Tool.header2(obj.arr[4], '正在【从商品表中获取折扣】。。。') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="right w100">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[\
		'+ (this.obj.A2 == 0 ? '<@page/>' : 0) + '\
		<r:pro db="sqlite.aliexpress" size=100 page=2>,<:discount/></r:pro>]'
        $("#state").html("正在获取商品折扣...");
        Tool.ajax.a01(str, this.obj.A1,this.a03,  this)
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo[0]; }
        oo.shift();
        this.obj.Aarr = oo;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this);
    },
    a04: function () {
        this.obj.Aarr = Tool.unique(this.obj.Aarr)//去数组中的重复
        if (this.obj.Aarr.length == 0) {
            this.a07("");
        }
        else {
            let str = '[0<r:discount db="sqlite.aliexpress" size=100 where=" where @.discount in(' + this.obj.Aarr.join(",") + ')">,<:discount/></r:discount>]'
            $("#state").html("正在查询商品折扣是否重复...");
            Tool.ajax.a01(str,1, this.a05, this)
        }
    },
    a05: function (arr) {
        arr.shift();
        if (arr.length == 0) {//表示没一个重复的            
            this.a06(this.obj.Aarr)
        }
        else {//有重复
            let Aarr = this.obj.Aarr, nArr = [];
            for (let i = 0; i < Aarr.length; i++) {
                if (arr.indexOf(Aarr[i]) == -1) {
                    nArr.push(Aarr[i])
                }
            }
            if (nArr.length == 0) {
                this.a07("");
            }
            else {
                this.a06(nArr)
            }
        }
    },
    a06: function (arr) {
        let insertArr = []
        for (let i = 0; i < arr.length; i++) {
            insertArr.push('<r:pro db="sqlite.aliexpress" where=" where @.discount=' + arr[i] + '" size=1><r: db="sqlite.aliexpress">insert into @.discount(@.discount,@.addtime,@.count)values(' + arr[i] + ',' + Tool.gettime("") + ',<1:count(1)/>)</r:></r:pro>')
        }
        Tool.ajax.a01( insertArr.join(""),1,this.a07, this)
    },
    a07: function (t) {
        if (t == "") {
            $("#state").html("添加成功...");
            this.obj.A1++;
            this.a02()
        }
        else {
            Tool.at("出错：" + t)
        }
    }
}
fun.a01();