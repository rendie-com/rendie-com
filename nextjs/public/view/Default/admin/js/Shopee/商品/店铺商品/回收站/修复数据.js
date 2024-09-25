//'use strict';
//var fun =
//{
//    obj: {
//        A1: 1, A2: 0
//    },
//    a01: function () {
//        //obj.arr[4]    返回URL
//        let html = Tool.header("Shopee &gt; 商品列表 &gt; 全球商品 &gt; 修复数据") + '\
//        <div class="p-2">\
//          <table class="table  align-middle table-hover">\
//          <tbody>\
//		    <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
//		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
//          </tbody>\
//          </table>\
//        </div>'
//        Tool.html(this.a02, this, html);
//    },
//    a02: function () {
//        //ManualReview=9    手动审核状态：图片且详情审核通过
//        let str = '[\
//        {"A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '}\
//        <r:GlobalPro size=30 page=2 db="sqlite.shopee" where=" where @.isup=1">,\
//        {\
//            "pic":<:pic tag=json/>,\
//            "attrpic":<:pic tag=json/>,\
//            "proid":"<:proid/>",\
//        }\
//        </r:GlobalPro>]'
//        $("#state").html("正在获取敦煌商品...");
//        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
//    },
//    a03: function (arr) {
//        if (this.obj.A2 == 0) { this.obj.A2 = arr[0].A2; }
//        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
//    },
//    a04: function (arr) {
//        let newArr = [];
//        for (let i = 1; i < arr.length; i++) {
//            newArr.push('update @.GlobalPro set @.pic=' + Tool.rpsql(this.b01(arr[i].pic)) + ',@.attrpic=' + Tool.rpsql(this.b01(arr[i].attrpic)) + ' where @.proid=' + Tool.rpsql(arr[i].proid))
//        }
//        let str = '<r: db="sqlite.shopee">' + newArr.join("<1/>") + '</r:>'
//        alert("aaaaaaaaaaaaaa")
//        //Tool.ajax.a01('"ok"' + str, 1, this.a05, this)
//    },
//    a05: function (t) {
//        if (t == "ok") {
//            this.obj.A1++;
//            this.a02();
//        }
//        else {
//            Tool.at("更新出错：" + t)
//        }
//    },
//    b01: function (pic) {
//        let arr = pic.split(";"), nArr = []
//        for (let i = 0; i < arr.length; i++) {
//            nArr.push({
//                picA: {},
//                picB: {
//                    fileurl: arr[i]
//                },
//                picC: {}
//            })
//        }
//        return JSON.stringify(nArr)
//    },
//}
//fun.a01();