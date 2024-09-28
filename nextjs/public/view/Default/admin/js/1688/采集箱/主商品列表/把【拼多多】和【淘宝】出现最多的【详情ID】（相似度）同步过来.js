'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("拼多多 &gt; 采集箱 &gt; 把【拼多多】和【淘宝】自动匹配的【详情ID】（相似度）同步过来。。。") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        //obj.arr[4]    返回URL
        let str = '\
        {\
            <r:product size=1 page=2 db="sqlite.1688">\
		        "proid":"<:proid/>",\
		        <r:pifa size=1 db="sqlite.pinduoduo" where=" where @.proid=\'<:proid/>\'">\
		            "goodsId_pinduoduo":<:goodsId/>,\
		            "goodsId_Similarity_pinduoduo":<:goodsId_Similarity/>,\
                </r:pifa>\
		        <r:product size=1 db="sqlite.taobao" where=" where @.proid=\'<:proid/>\'">\
		            "itemId_taobao":<:itemId tag=json/>,\
		            "itemId_Similarity_taobao":<:itemId_Similarity/>,\
                </r:product>\
            </r:product>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
    },
    a04: function (oo) {
        let str = '<r: db="sqlite.1688">update @.product set @.goodsId_pinduoduo=' + oo.goodsId_pinduoduo + ',@.goodsId_Similarity_pinduoduo=' + oo.goodsId_Similarity_pinduoduo + ',@.itemId_taobao=' + Tool.rpsql(oo.itemId_taobao) + ',@.itemId_Similarity_taobao=' + oo.itemId_Similarity_taobao + ' where @.proid=\'' + oo.proid + '\'</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a05, this)
    },
    a05: function (t) {
        if (t == "ok") {
            this.obj.A1++
            this.a02()
        }
        else {
            Tool.pre(["出错",t])
        }
    },
}
fun.a01()