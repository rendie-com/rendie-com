'use strict';
var fun =
{
    //265  出错
    //884
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('TikTok &gt; 商品类目 &gt; 采集类目属性') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
                <tr><td class="right w150">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr><tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this);
    },
    a03: function () {
        $("#state").html("正在获取叶子类目。。。");
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '<r:categories db="sqlite.tiktok" size=1 page=2 where=" where @.is_leaf=1">,<:fromid/></r:categories>]'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo[0]; }
        this.a05(oo[1]);
    },
    a05: function (t) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, null, t)
    },
    a06: function (t) {
        //let url = "https://api16-normal-useast1a.tiktokglobalshop.com/api/v1/product/global/category/bind_info/get?locale=zh-CN&language=zh-CN&oec_seller_id=8647736472429429812&category_id=" + t
        let url ="https://api16-normal-useast1a.tiktokglobalshop.com/api/v1/product/global/category/bind_info/get?locale=zh-CN&language=zh-CN&oec_seller_id=8647736472429429812&aid=6556&app_name=i18n_ecom_shop&fp=verify_lyn3s0w1_0DTs7op0_wm8y_4nta_9XoI_4jVty8moi7dg&device_platform=web&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F126.0.0.0%20Safari%2F537.36&browser_online=true&timezone_name=Asia%2FShanghai&category_id="+t+"&msToken=nE-CCKn1RQi6OK0owQ1MIFwhNWokc0ex5nIH5iVCQrkgTaDuKD0ZurOgBZGulj-qGuBiTifE8sb48I4Pc_Jcez_1v2h7DEwP4T-EkgnuUDrWjhr2Ye07a8ux9r7u&X-Bogus=DFSzswVuQmUANG4FtwJLtGRt4e-y&_signature=_02B4Z6wo00001iSNTsgAAIDDCgqD4Y1TA84kjUpAAO.K2f"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a07, this, t)
    },
    a07: function (t1, t2) {
        let json=[]
        if (t1.code == 12052900) {
            //系统错误，稍后再试
            json = t1;
        }
        if (t1.code == 0) {
            json = t1.data.product_properties;
        }
        let selectType = "select count(1) from @.attr where @.fromid=" + t2
        let html = '"ok"<if Fun(Db(sqlite.tiktok,' + selectType + ',count))==0><r: db="sqlite.tiktok">insert into @.attr(@.fromid,@.json)values(' + t2 + ',' + Tool.rpsql(JSON.stringify(json)) + ')</r:></if>'
        Tool.ajax.a01(html, 1, this.a08, this)
    },
    a08: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a03();
        }
        else {
            Tool.pre(["出错01：", t])
        }
    }
}
fun.a01();