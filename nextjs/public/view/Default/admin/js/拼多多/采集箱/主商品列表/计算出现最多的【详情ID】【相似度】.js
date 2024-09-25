'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("拼多多 &gt; 采集箱 &gt; 正在计算自动匹配的【详情ID】【相似度】。。。") + '\
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
            <r:pifa size=1 page=2 db="sqlite.pinduoduo">,\
                <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "DHpic":<:DHpic tag=0/>,\
                    "DHattrPic":<:DHattrPic tag=0/>,\
                    "DHdesPic":<:DHdesPic tag=0/>,\
                </r:prodes>\
                "proid":"<:proid/>"\
            </r:pifa>\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.A1, this.a03, this)
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
    },
    a04: function (oo) {
        let goodsIdArr = [];
        $("#proid").html(oo.proid);
        $("#state").html("正在拼成一个数组...");
        ////////////////////////////////////////
        for (let i = 0; i < oo.DHattrPic.length; i++) {
            if (oo.DHattrPic[i]) {//有些是空位置，所以有这个判断
                goodsIdArr = goodsIdArr.concat(oo.DHattrPic[i].picA.pinduoduo.goodsIdArr);
            }
        }
        ///////////////////////////////////////////////////
        for (let i = 0; i < oo.DHpic.length; i++) {
            goodsIdArr = goodsIdArr.concat(oo.DHpic[i].picA.pinduoduo.goodsIdArr);
        }
        ///////////////////////////////////////
        if (oo.DHdesPic.length == 0) {
            this.a05(goodsIdArr, oo)
        }
        else {
            if (oo.DHdesPic[0].picA.pinduoduo) {
                for (let i = 0; i < oo.DHdesPic.length; i++) {
                    if (oo.DHdesPic[i].picA) {
                        goodsIdArr = goodsIdArr.concat(oo.DHdesPic[i].picA.pinduoduo.goodsIdArr);
                    }
                }
                this.a05(goodsIdArr, oo)
            }
            else {
                Tool.pre(["必须搜货源后，才能执行该操作。", oo.DHdesPic])
            }
        }
        
        
    },
    a05: function (goodsIdArr, oo) {
        $("#state").html("正在计算重复...");
        let o1 = {}
        for (let i = 0; i < goodsIdArr.length; i++) {
            if (o1[goodsIdArr[i]]) {
                o1[goodsIdArr[i]]++;
            }
            else {
                o1[goodsIdArr[i]] = 1;
            }
        }
        this.a06(o1, goodsIdArr.length, oo)
    },
    a06: function (o1, len, oo) {
        $("#state").html("正在取最大...");
        let max = 0, maxGoodsId = 0;
        for (let k in o1) {
            if (o1[k] > max) {
                max = o1[k]
                maxGoodsId = k;
            }
        }
        let goodsId_Similarity = 0
        if (max > 0) { goodsId_Similarity = (max * 100 / len).toFixed(3) }
        this.a07(goodsId_Similarity, maxGoodsId, oo)
    },
    a07: function (goodsId_Similarity, GoodsId, oo) {
        $("#state").html("正在更新数据...");
        let str = '<r: db="sqlite.pinduoduo">update @.pifa set @.goodsId_Similarity=' + goodsId_Similarity + ',@.goodsId=' + GoodsId + ' where @.proid=\'' + oo.proid + '\'</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a08, this)
    },
    a08: function (t) {
        if (t == "ok") {
            $("#state").html("下一步...");
            this.obj.A1++
            this.a02()
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
}
fun.a01();