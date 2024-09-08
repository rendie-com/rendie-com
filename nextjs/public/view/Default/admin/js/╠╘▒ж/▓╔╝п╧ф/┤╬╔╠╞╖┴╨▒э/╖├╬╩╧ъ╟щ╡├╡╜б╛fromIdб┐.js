'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("淘宝 &gt; 采集箱 &gt; 次商品列表 &gt; 访问详情得到【fromId】。。。") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">访问地址：</td><td id="url1" colspan="2"></td></tr>\
                <tr><td class="right">得到地址：</td><td id="url2" colspan="2"></td></tr>\
                <tr><td class="right">得到【fromId】：</td><td id="fromId" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02A, this, html);
    },
    a02A: function () {
        gg.isRD(this.a02, this)
    },
   a02: function () {
        let str = '\
        {\
            <r:proList size=1 page=2 db="sqlite.taobao" where=" where @.fromId=-3">\
		        "id":<:id/>,\
		        "url":<:url tag=json/>,\
            </r:proList>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
    },
    a04: function (oo) {
        if(oo.url){
             $("#url1").html('<a href="https:' + oo.url + '" target="_blank">https:' + oo.url + '</a>');
            $("#state").html("正在打开详情页...");
            //心得：用gg.getHtml不行。
            let arr = [
                "https://ai.taobao.com/",
                "https://img.alicdn.com/imgextra/i4/O1CN01jNKpmR1ODMZOUKGaE_!!6000000001671-2-tps-223-222.png",
                "_____tmd_____/punish",
                "https://gw.alicdn.com/tfs/TB17DIYybrpK1RjSZTEXXcWAVXa-220-221.png",
                "item.htm?id=",
                "main/index.html?id=",
                "https://h5api.m.taobao.com/h5/mtop.taobao.union.play.weak/1.0/"
            ]
            //if (oo.url.indexOf("uland.taobao.com") != -1) {
            ////说明：这个以后来处理
            ////this.a06(-3, oo.id)
            //}
            //else {
            //}
            gg.tabs_remove_create_getHeaders(2, "https:" + oo.url, arr, false, this.a05, this, oo)
        }
        else{
            Tool.Time("name",500,this.a02,this)
        }
         
    },
    a05: function (t, oo) {
        $("#state").html("正在获取详情内容02...");
        $("#url2").html('<a href="' + t.url + '" target="_blank">' + t.url + '</a>');
        let fromid = 0
        if (t.url.indexOf("item.htm?id=") != -1) {
            fromid = Tool.StrSlice(t.url, 'item.htm?id=', '&')
            this.a06(fromid, oo.id)
        }
        else if (t.url.indexOf("https://h5api.m.taobao.com/h5/mtop.taobao.union.play.weak/1.0/") != -1) {
            fromid = Tool.StrSlice(decodeURIComponent(t.url), '\\"itemId\\":\\"', '\\"')
            this.a06(fromid, oo.id)
        }
        else if (t.url.indexOf("main/index.html?id=") != -1) {
            fromid = Tool.StrSlice(t.url, 'main/index.html?id=', '&')
            this.a06(fromid, oo.id)
        }
        else if (t.url.indexOf("https://gw.alicdn.com/tfs/TB17DIYybrpK1RjSZTEXXcWAVXa-220-221.png") != -1) {
            fromid = -2//404错误
            this.a06(fromid, oo.id)
        }
        else if (t.url.indexOf("_____tmd_____/punish") != -1) {
            $("#state").html("common_滑块验证码.js【要验证】");
            if (oo.url.indexOf("//uland.taobao.com") != -1) {
                Tool.captcha.a01("【2】等待RenDie软件来滑动滑块。", this.a02, this)
            }
            else {
                Tool.captcha.a01("【1】等待RenDie软件来滑动滑块。", this.a02, this)
            }
        }
        else if (t.url.indexOf("https://img.alicdn.com/imgextra/i4/O1CN01jNKpmR1ODMZOUKGaE_!!6000000001671-2-tps-223-222.png") != -1) {
            this.d01()
        }
        else if (t.url.indexOf("https://ai.taobao.com/") != -1) {
            fromid = -1//打不开
            this.a06(fromid, oo.id)
        }
        else {
            Tool.at("出错" + t.url)
        }
    },
    a06: function (fromid, id) {
        $("#fromId").html(fromid);
        let str = '<r: db="sqlite.taobao">update @.proList set @.fromid=' + fromid + ' where @.id=' + id + '</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a07, this)
    },
    a07: function (t) {
        if (t == "ok") {
            $("#state").html("下一条...");
            this.obj.A1++;
            $("#url1,#url2,#fromId").html('');
            this.a02();
        }
        else {
            $("#state").html("更新出错。")
            Tool.pre(["更新出错01：", t]);
        }
    },
    /////////////////////////////////////////////
    d01: function () {
        let str = '\
            {<r:buyer db="sqlite.taobao" size=1 where=" order by @.sort asc">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:buyer>}'
        Tool.ajax.a01(str, 1, this.d02, this)
    },
    d02: function (oo) {
        Tool.loginTaobao.a01(oo.username, oo.password, oo.cookies, $("#state"), this.a02, this)
    },   
}
fun.a01();