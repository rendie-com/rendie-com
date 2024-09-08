'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
    },
    a01: function () {
        let html = Tool.header("Ozon &gt; 商品列表 &gt; 将【已上传】的商品进行【归档】") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
                <tbody>\
                    <tr><td class="w150 right">账号：</td><td id="email" colspan="2"></td></tr>\
                    <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
                    <tr><td class="right">状态：</td><td id="state" colspan="2">...</td></tr>\
                </tbody>\
            </table>\
            <table class="table table-hover"><tbody id="body"></tbody></table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        $("#state").html("正在获得配置参数");
        let str = '\
        {<r:seller db="sqlite.ozon" size=1>\
            "sellerId":"<:sellerId/>",\
            "email":"<:email tag=js/>",\
            "cookies":<:cookies tag=0/>\
         </r:seller>}'
        Tool.ajax.a01(str, 1, this.a04, this)
    },
    a04: function (oo) {
        $("#email").html(oo.email);
        Tool.loginOzon.a01(oo.email, oo.sellerId, oo.cookies, $("#state"), this.a05, this)
    },
    a05: function (t) {
        //let str = '\
        //{\
        //    <r:product size=1 page=2 db="sqlite.ozon" where=" where @.isup=0">\
        //        "proid":"<:proid/>",\
        //    </r:product>\
        //    "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        //}'
        //$("#state").html("正在获取敦煌商品...");
        //Tool.ajax.a01(str, 1, this.a06, this);
    },
   
}
fun.a01()