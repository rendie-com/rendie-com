'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 正在计算自动匹配的【详情ID】【相似度】。。。") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '\
        {\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
            <r:product size=1 page=2 db="sqlite.1688">,\
                <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "DHpic":<:DHpic tag=0/>,\
                    "DHattrPic":<:DHattrPic tag=0/>,\
                    "DHdesPic":<:DHdesPic tag=0/>,\
                </r:prodes>\
                "proid":"<:proid/>"\
            </r:product>\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.A1, this.a03, this)
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
    },
    a04: function (oo) {
        $("#proid").html(oo.proid);
        let idArr = this.b01(oo.DHattrPic, oo.DHpic, oo.DHdesPic);
        $("#state").html("正在更新数据...");
        let str = '<r: db="sqlite.1688">update @.product set @.fromid_Similarity=' + (idArr[0][0] * 100 / idArr.length).toFixed(3) + ',@.fromid=' + idArr[0][1] + ' where @.proid=\'' + oo.proid + '\'</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a05, this)
    },
    a05: function (t) {
        if (t == "ok") {
            $("#state").html("下一步...");
            this.obj.A1++
            this.a02()
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
    //////////////////////////////////////////
    b01: function (arr1, arr2, arr3) {
        $("#state").html("正在拼成一个数组...");
        if (arr1 == 0) arr1 = [];
        let DHpic = arr1.concat(arr2).concat(arr3)
        let idArr = [];
        for (let i = 0; i < DHpic.length; i++) {
            if (DHpic[i]) {
                idArr = idArr.concat(DHpic[i].picA._1688.idArr);
            }
        }
        return this.b02(idArr);
    },
    b02: function (idArr) {
        $("#state").html("正在计算重复...");
        let o1 = {}
        for (let i = 0; i < idArr.length; i++) {
            if (o1[idArr[i]]) {
                o1[idArr[i]]++;
            }
            else {
                o1[idArr[i]] = 1;
            }
        }
        return this.b03(o1)
    },
    b03: function (o1) {
        $("#state").html("正在排序...");
        let arr = []
        for (let k in o1) {
            arr.push([o1[k], k]);
        }
        return arr.sort(function (a, b) { return b[0] - a[0] })
    },
}
fun.a01();