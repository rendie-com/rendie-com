'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("淘宝 &gt; 采集箱 &gt; 正在计算自动匹配的【详情ID】【相似度】。。。") + '\
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
            <r:product size=1 page=2 db="sqlite.taobao">,\
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
        let idArr = this.b01(oo.DHpic, oo.DHattrPic, oo.DHdesPic);
        if (idArr.length != 0) {
            this.a05(idArr, oo.proid)
        }
        else {
            Tool.at("必须搜货源后，才能执行该操作。")
        }
    },
    a05: function (idArr, proid) {
        let o1 = this.b02(idArr)
        $("#state").html("正在取最大...");
        let max = 0, maxitemId = 0;
        for (let k in o1) {
            if (o1[k] > max) {//取第一个最大
                max = o1[k];
                maxitemId = k;
            }
        }
        let itemId_Similarity = 0
        if (max > 0) { itemId_Similarity = (max * 100 / idArr.length).toFixed(3); }
        this.a06(itemId_Similarity, maxitemId, proid)
    },
    a06: function (itemId_Similarity, maxitemId, proid) {
        let str = '{"fromid":<r:proList size=1 db="sqlite.taobao" where=" where @.itemId=\'' + maxitemId + '\'"><:fromid/></r:proList>}'
        let oo = {
            itemId_Similarity: itemId_Similarity,
            maxitemId: maxitemId,
            proid: proid
        }
        Tool.ajax.a01(str, 1, this.a07, this, oo)
    },
    a07: function (o1, o2) {
        $("#state").html("正在更新数据...");
        let str = '<r: db="sqlite.taobao">update @.product set @.itemId_Similarity=' + o2.itemId_Similarity + ',@.itemId=\'' + o1.fromid + '\' where @.proid=\'' + o2.proid + '\'</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a08, this)
    },
    a08: function (t) {
        if (t == "ok") {
            $("#state").html("下一步...");
            this.obj.A1++;
            this.a02()
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
    //获取所有淘宝ID。
    b01: function (DHpic, DHattrPic, DHdesPic) {
        $("#state").html("正在拼成一个数组...");
        let idArr = [];
        ////////////放在前面，当数量相同，则先出来。////////////////////////////
        for (let i = 0; i < DHattrPic.length; i++) {
            if (DHattrPic[i]) {//有些是空位置，所以有这个判断
                idArr = idArr.concat(DHattrPic[i].picA.taobao.idArr);
            }
        }
        for (let i = 0; i < DHpic.length; i++) {
            idArr = idArr.concat(DHpic[i].picA.taobao.idArr);
        }
        /////////////////////////////////////////
        if (DHdesPic.length != 0) {
            for (let i = 0; i < DHdesPic.length; i++) {
                if (DHdesPic[i].picA) {
                    idArr = idArr.concat(DHdesPic[i].picA.taobao.idArr);
                }
            }
        }
        return idArr;
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
        return o1;
    },
}
fun.a01();