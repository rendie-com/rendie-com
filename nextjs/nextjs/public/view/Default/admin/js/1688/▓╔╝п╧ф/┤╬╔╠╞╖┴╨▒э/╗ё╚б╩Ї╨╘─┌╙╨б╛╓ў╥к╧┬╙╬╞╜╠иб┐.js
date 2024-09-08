'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: {},
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 次商品列表 &gt; 获取属性内有【主要下游平台】") + '\
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
        gg.isRD(this.a03, this)
    },
    a03: function () {
        let str = '[{"A2":' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '}\
        <r:proList size=200 page=2 db="sqlite.1688">\
            <r:prodes size=1 db="sqlite.1688_prodes/<:fromid Fun=ProidNum(+$1,99)/>" where=" where @.fromid=<:fromid/>">,\
		        {"attr":<:attr tag=0/>}\
             </r:prodes>\
        </r:proList>]'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.A1, this.a04, this);
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo[0].A2; }
        oo.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, this.d01, oo);
    },
    a05: function (arr1) {
        for (let i = 0; i < arr1.length; i++) {
            let value = this.b01(arr1[i].attr)
            if (value) {
                this.b02(value.split(","))
            }
        }
        this.obj.A1++;
        this.a03();
    },

    /////////////////////////////////
    b01: function (arr) {
        let value = "";
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == "主要下游平台") {
                    value = arr[i].value;
                    break;
                }
            }
        }
        if (value) {
            if (value.indexOf(" ") != -1) { value = value.replace(/ /g, ","); }
            if (value.indexOf("、") != -1) { value = value.replace(/、/g, ","); }
            if (value.indexOf("，") != -1) { value = value.replace(/，/g, ","); }
            if (value.indexOf("。") != -1) { value = value.replace(/。/g, ","); }
            if (value.indexOf("|") != -1) { value = value.replace(/\|/g, ","); }
            if (value.indexOf("/") != -1) { value = value.replace(/\//g, ","); }
            if (value.indexOf("；") != -1) { value = value.replace(/；/g, ","); }
            if (value.indexOf(".") != -1) { value = value.replace(/\./g, ","); }
            if (value.indexOf("亚马ebay") != -1) { value = value.replace("亚马ebay", "亚马逊,ebay"); }
            if (value.indexOf("速卖通亚马逊WISH") != -1) { value = value.replace("速卖通亚马逊WISH", "速卖通,亚马逊,WISH"); }
            if (value.indexOf("亚马逊速卖通国际站") != -1) { value = value.replace("亚马逊,速卖通,国际站"); }
            if (value.indexOf("ebay亚马逊wish速卖通独立站LAZADA") != -1) { value = value.replace("ebay亚马逊wish速卖通独立站LAZADA", "ebay,亚马逊,wish,速卖通,独立站,LAZADA"); }
        }
        return value;
    },
    b02: function (arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == "PDD") {
                arr[i] = "拼多多";
            }
            else if (arr[i] == "Shopee虾皮" || arr[i] == "虾皮" || arr[i] == "Shopee" || arr[i] == "虾皮网" || arr[i] == "SHOPEE" || arr[i] == "shoppe" || arr[i] == "shopee等") {
                arr[i] = "shopee";
            }
            else if (arr[i] == "拼多多Temu" || arr[i] == "Temu" || arr[i] == "TEMU" || arr[i] == "tumu" || arr[i] == "TUME" || arr[i] == "Tume") {
                arr[i] = "temu";
            }
            else if (arr[i] == "AE速卖通" || arr[i] == "Aliexpress") {
                arr[i] = "速卖通";
            }
            else if (arr[i] == "Lazada" || arr[i] == "lazada" || arr[i] == "lazida" || arr[i] == "来赞达" || arr[i] == "LAZA" || arr[i] == "ladaza") {
                arr[i] = "LAZADA";
            }
            else if (arr[i] == "希音" || arr[i] == "shein" || arr[i] == "SHINE") {
                arr[i] = "SHEIN";
            }
            else if (arr[i] == "敦煌网") {
                arr[i] = "敦煌";
            }
            else if (arr[i] == "Amazon" || arr[i] == "亚马逊等" || arr[i] == "亚马孙") {
                arr[i] = "亚马逊";
            }
            else if (arr[i] == "淘宝等") {
                arr[i] = "淘宝";
            }
            else if (arr[i] == "eBay" || arr[i] == "EBAY" || arr[i] == "易贝" || arr[i] == "ebay等" || arr[i] == "Ebay" || arr[i] == "eaby" || arr[i] == "Ebay等" || arr[i] == "eday" || arr[i] == "abay") {
                arr[i] = "ebay";
            }
            else if (arr[i] == "alibaba" || arr[i] == "Alibaba" || arr[i] == "阿里巴巴国际站" || arr[i] == "国际站" || arr[i] == "阿里国际站") {
                arr[i] = "阿里巴巴";
            }
            else if (arr[i] == "WISH" || arr[i] == "Wish" || arr[i] == "wish爆款" || arr[i] == "wish等") {
                arr[i] = "wish";
            }
            else if (arr[i] == "JOOM" || arr[i] == "joom") {
                arr[i] = "Joom";
            }
            else if (arr[i] == "实力工厂") {
                arr[i] = "实体工厂";
            }
            else if (arr[i] == "抖音TikTok" || arr[i] == "TikTok" || arr[i] == "tiktok") {
                arr[i] = "Tiktok";
            }
            /////////////////////////////////////
            if (arr[i] != "-"
                && arr[i] != "null"
                && arr[i] != "-1"
                && arr[i] != "所有"
                && arr[i] != "##"
                && arr[i] != ""
                && arr[i] != "3283093"
                && arr[i] != "1326527568"
                && arr[i] != "1327355784"
                && arr[i] != "其它"
                && arr[i] != "其他") {
                if (this.obj.Aarr[arr[i]]) {
                    this.obj.Aarr[arr[i]]++
                }
                else {
                    this.obj.Aarr[arr[i]] = 1;
                }
            }

        }
    },
    ///////////////////////////////
    d01: function () {
        let Aarr = this.obj.Aarr, nArr = []
        for (let k in Aarr) {
            nArr.push({
                name: k,
                count: Aarr[k],
            })
        }
        nArr.sort(function (A, B) {
            return B.count - A.count;
        })
        let str = '"ok"<r: file="/' + o.path + 'admin/js/1688/采集箱/主要下游平台/config.js">let MainDownstreamPlatforms=' + JSON.stringify(nArr, null, 2) + '</r:>';
        Tool.ajax.a01(str, 1, this.d02, this);
    },
    d02: function (t) {
        if (t == "ok") {
            $("#state").html("全部完成。");
        }
        else {
            Tool.pre(["出错", t]);
        }
    },
}
fun.a01()