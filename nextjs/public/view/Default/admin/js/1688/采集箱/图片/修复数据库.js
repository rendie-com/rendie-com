'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,//数据库进度
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 图片 &gt; 为图片生成hash值便于【以图搜图】") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[\
        '+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:attrpic size=100 page=2 db="sqlite.1688_img">,\
        {\
            "fromid":<:fromid/>,\
            "hash":<:hash tag=json/>,\
            "src":<:src tag=json/>,\
            "width":<:width/>,\
            "height":<:height/>,\
            "size":<:size/>,\
            "addtime":<:addtime/>\
        }\
        </r:attrpic>]'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
    },
    a04: function (arr) {
        let sqlArr = []
        for (let i = 1; i < arr.length; i++) {
            sqlArr.push('\
            <if "Fun(Db(sqlite.1688_img/'+ Tool.remainder(arr[i].fromid, 99) + ',select count(1) from @.attrpic where @.src=\'' + arr[i].src + '\',count))"=="0">\
                <r: db="sqlite.1688_img/'+ Tool.remainder(arr[i].fromid, 99) + '">insert into @.attrpic(@.fromid,@.src,@.hash,@.addtime,@.width,@.height,@.size)values(' + arr[i].fromid + ',\'' + arr[i].src + '\',\'' + arr[i].hash + '\',' + arr[i].addtime + ',' + arr[i].width + ',' + arr[i].height + ',' + arr[i].size + ')</r:>\
            </if>');
        }
        Tool.ajax.a01('"ok"' + sqlArr.join(""), 1, this.a05, this);
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