'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: ["my", "br"],
        B1: 1, B2: 0
    },
    a01: function () {
        this.obj.A2 = this.obj.Aarr.length;
        //obj.arr[4]    返回URL
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 把【Shopee广告】中的关键词同步过来") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="right w150">站点进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr>\
                <td class="right">说明：</td><td colspan="2">字段有：主推关键词、启用的关键词\n为什么要同步？答：方便删除后，再发布商品。</td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a03, this);
    },
    a03: function () {
        let site = this.obj.Aarr[this.obj.A1 - 1]
        let str = '[\
        {"B2":<@page/>}\
		<r:ads size=10 db="sqlite.shopee" page=2 where=" where @.site=\''+ site + '\'">,\
		{\
			"keywords":<:keywords tag=0/>,\
			<r:shopPro_'+ site + ' size=1 db="sqlite.shopee" where=" where @.fromid=<:productID/>">\
			   "proid":<:proid tag=json/>,\
			</r:shopPro_'+ site + '>\
			"key":<:key tag=json/>,\
		}\
		</r:ads>]'
        $("#state").html("正在获取广告...");
        Tool.ajax.a01(str, this.obj.B1, this.a04, this);
    },
    a04: function (arr) {
        if (this.obj.B2 == 0) { this.obj.B2 = arr[0].B2; }
        arr.shift();
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d01, this, this.e01, arr);
    },
    /////////////////////////////////////////////////////////////
    b01: function (keywords, site) {
        let newArr = [];
        if (site == "my") {
            for (let i = 0; i < keywords.length; i++) {
                if (keywords[i].keyword.state == "active") {
                    newArr.push(keywords[i].keyword)
                }
            }
            return newArr;
        }
        else if (site == "br") {
            for (let i = 0; i < keywords.length; i++) {
                if (keywords[i].status == 1) {
                    newArr.push(keywords[i])
                }
            }
            return newArr;
        }
        else {
            Tool.pre(["还没开发", keywords])
        }
    },
    /////////////////////////////////////////////////////////////
    d01: function (arr) {
        let newArr = [], isErr = false, site = this.obj.Aarr[this.obj.A1 - 1];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].proid) {
                let keywords = this.b01(arr[i].keywords, site)
                if (keywords) {
                    newArr.push("update @.GlobalPro set @." + site + "_ads_key=" + Tool.rpsql(arr[i].key) + ",@." + site + "_ads_keywords=" + Tool.rpsql(JSON.stringify(keywords)) + " where @.proid='" + arr[i].proid + "'")
                }
                else {
                    isErr = true;
                    break;
                }
            }
        }
        if (!isErr) {
            if (newArr.length == 0) {
                this.d02("ok")
            }
            else {
                let str = '<r: db="sqlite.shopee">' + newArr.join("<1/>") + '</r:>'
                Tool.ajax.a01('"ok"' + str, 1, this.d02, this)
            }
        }
    },
    d02: function (t) {
        if (t == "ok") {
            this.obj.B1++;
            this.a03();
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
    e01: function () {
        this.obj.B1 = 1; this.obj.B2 = 0;
        this.obj.A1++;
        this.a02();
    },
}
fun.a01();