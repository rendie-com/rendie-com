'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 把1688【叶子类目ID】同步过来') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let html = '[\
		    {"A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '}\
		    <r:GlobalPro db="sqlite.shopee" page=2 size=50>,\
		    {\
                <r:pro db="sqlite.aliexpress" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "type":"<:type/>",\
			    </r:pro>\
		    }\
		    </r:GlobalPro>\
		]';
        //type      在绑定类目的时候能用上。
        Tool.ajax.a01(html, this.obj.A1, this.a03, this)
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo[0].A2; }
        oo.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo)
    },
    a04: function (arr) {
        let sqlArr = []
        for (let i = 0; i < arr.length; i++) {
            sqlArr.push("update @.GlobalPro set @.type=" + arr[i].type + " where @.proid='" + arr[i].proid + "'")
        }
        let txt = '"ok"<r: db="sqlite.shopee">' + sqlArr.join("<1/>") + '</r:>'
        $("#state").html("正在更新折扣。。。");
        Tool.ajax.a01(txt, 1, this.a05, this)
    },
    a05: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();