'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 10,//旧数据库进度
        B1: 1, B2: 0,//页进度
    },
    a01: function () {
        //obj.arr[4]    返回URL
        this.obj.A1 = obj.arr[5] ? parseInt(obj.arr[5]) : this.obj.A1;//翻页
        let html = Tool.header("速卖通 &gt; 采集箱 &gt; 商品 &gt; 把详情的10个数据库内容复制到新版详情的50个数据库中") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">旧数据库进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a03, this, null);
    },
    a03: function () {
        let str = '[\
        {"B2":'+ (this.obj.B2 == 0 ? '<@page/>' : '0') + '}\
            <r:prodes size=3 page=2 db="sqlite.aliexpress/aliexpressprodes'+ this.obj.A1 + '">,\
		        {"proid":<:proid tag=json/>,\
                "HistoryInfo":<:HistoryInfo tag=json/>,\
                "freight":<:freight tag=json/>,\
                "fromUrl":<:fromUrl tag=json/>,\
                "videoUrl":<:videoUrl tag=json/>,\
                "aeopAeProductPropertys":<:aeopAeProductPropertys tag=json/>,\
                "aeopAeProductSKUs":<:aeopAeProductSKUs tag=json/>,\
                "pic":<:pic tag=json/>,\
                "des":<:des tag=json/>,\
                "note":<:note tag=json/>,\
                "DHpic":<:DHpic tag=json/>,\
                "DHattrPic":<:DHattrPic tag=json/>,\
                "DHdes":<:DHdes tag=json/>,\
                "DHdesPic":<:DHdesPic tag=json/>}\
            </r:prodes>]'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.B1, this.a04, this);
    },
    a04: function (arr) {
        if (this.obj.B2 == 0) { this.obj.B2 = arr[0].B2; }
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a05, this, this.a08, arr);
    },
    a05: function (arr) {
        $("#state").html("正在更新数据...");
        let str = ""
        for (let i = 1; i < arr.length; i++) {
            let num = Tool.remainder(Tool.int(arr[i].proid.substring(1)), 50);
            let arrLR = this.b01(arr[i]);
            str += '\
            <if "Fun(Db(sqlite.aliexpress_prodes/'+ num + ',select count(1) from @.prodes where @.proid=\'' + arr[i].proid + '\',count))"=="0">\
                <r: db="sqlite.aliexpress_prodes/'+ num + '">insert into @.prodes(' + arrLR[0].join(",") + ')values(' + arrLR[1].join(",") + ')</r:>\
            </if>';
        }
        Tool.ajax.a01('"ok"' + str, 1, this.a06, this)
    },
    a06: function (t) {
        if (t == "ok") {
            $("#state").html("等0秒后，再下一条...");
            Tool.Time("name", 0, this.a07, this)
        }
        else {
            $("#state").html("更新出错,延时1秒后再来。")
            //Tool.Time("name", 1000, this.a02, this, oo)
            Tool.pre(["更新出错01：", t]);
        }
    },
    a07: function () {
        this.obj.B1++;
        this.a03();
    },
    a08: function (t) {
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.obj.A1++;
        Tool.open(5, this.obj.A1);
    },
    b01: function (oo) {
        let left = [], right = []
        for (let k in oo) {
            left.push("@."+k);
            right.push(Tool.rpsql(oo[k]));
        }
        return [left, right];
    },
}
fun.a01();