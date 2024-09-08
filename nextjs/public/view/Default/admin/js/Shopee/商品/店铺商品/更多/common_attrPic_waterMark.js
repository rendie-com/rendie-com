'use strict';
Object.assign(Tool, {
    common_attrPic_waterMark:
    {
        obj: {
            x1: 1, x2: 0, Xarr: [],
        },
        a01: function (proid, seller, site, progress, dom, next, This, t) {
            let oo = {
                seller: seller,
                site: site,
                progress: progress,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            this.a02(proid, oo)
        },
        a02: function (proid, oo) {
            // database: "shopee_img",
            // sql:"update @.attrpic_1688 set @." + oo.site + "_watermark=null"
            let data = [{
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "select " + Tool.fieldAs("manualreview_1688_fromid") + " FROM @.table where @.proid='" + proid + "'",
            }]
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            let fromid = t[0][0].manualreview_1688_fromid
            oo.dom.manualreview_1688_fromid.html('<a href="https://detail.1688.com/offer/' + fromid + '.html" target="_blank">' + fromid + '</a>')
            let data = [{
                action: "sqlite",
                database: "1688_prodes/" + Tool.remainder(fromid, 99),
                sql: "select " + Tool.fieldAs("attrpic_shopee") + " FROM @.prodes where @.fromid=" + fromid,
            }]
            Tool.ajax.a01(data, this.a04, this, oo);
        },
        a04: function (t, oo) {
            let attrpic_shopee = t[0][0].attrpic_shopee
            if (attrpic_shopee) {
                let arr = JSON.parse(attrpic_shopee)
                this.obj.x2 = arr.length;
                this.obj.Xarr = arr;
                this.a05(oo)
            }
            else {
                this.e01(oo)
            }
        },
        a05: function (oo) {
            Tool.x1x2(oo.progress, this.obj.x1, this.obj.x2, this.d01, this, this.e01, oo)
        },
        ////////////////////////////////////////////////
        b01: function (pic) {
            let html = "\
            <a href=\"https://s-cf-sg.shopeesz.com/file/" + pic + "\" target=\"_blank\">\
                <img src=\"https://s-cf-sg.shopeesz.com/file/"+ pic + "_tn\" class=\"img-fluid rounded w100\">\
            </a>"
            return html;
        },
        ////////////////////////////////////////////////////
        d01: function (oo) {
            if (this.obj.Xarr[this.obj.x1 - 1].shopee) {
                let data = [{
                    action: "sqlite",
                    database: "shopee_img",
                    sql: "select " + Tool.fieldAs("width,height," + oo.site + "_watermark") + " FROM @.attrpic_1688 where @.src='" + this.obj.Xarr[this.obj.x1 - 1].shopee + "'",
                }]
                Tool.ajax.a01(data, this.d02, this, oo);
            }
            else {
                oo.dom.attrpicA.append('<figure class="figure border mb-1 m-1 p-1 w100 center">空位置跳过</figure>');
                oo.dom.attrpicB.append('<figure class="figure border mb-1 m-1 p-1 w100 center">空位置跳过</figure>');
                this.d06([[]], oo)
            }
        },
        d02: function (t, oo) {
            if (t[0][0][oo.site + "_watermark"] == null) {
                oo.dom.attrpicA.append(this.b01(this.obj.Xarr[this.obj.x1 - 1].shopee));
                this.d03(t[0][0], oo);
            }
            else if (t[0][0][oo.site + "_watermark"]) {
                oo.dom.attrpicA.append('<figure class="figure border mb-1 m-1 p-1 w100 center">已上传跳过</figure>');
                oo.dom.attrpicB.append('<figure class="figure border mb-1 m-1 p-1 w100 center">已上传跳过</figure>');
                this.d06([[]], oo)
            }
            else {
                Tool.pre(["出错001", t]);
            }
        },
        d03: function (t, oo) {
            let url = "https://s-cf-sg.shopeesz.com/file/" + this.obj.Xarr[this.obj.x1 - 1].shopee;
            $("#state").html('正在生成水印图...');
            let objmsg = {
                width: t.width,
                height: t.height,
                rotate: 20,//旋转角度       int类型       默认20
                fontsize: 12,//字体大小                   默认20
                fontcolor: "255, 255, 255, 0.3",        //字体颜色  rgba类型  默认 255, 255, 255, 0.2
                density: 4,//稠密度                       数值越大，水印越多
                str: [] //水印文字           数组类型      最大三行（即lingth<=3）[必传]
            }
            if (oo.site == "my") {
                objmsg.str = ["https://shopee.com.my/choice.my"]
                Tool.drawWaterMark.a01(url, objmsg, this.d04, this, oo)
            }
            else if (oo.site == "br") {
                objmsg.str = ["https://shopee.com.br/cupons.br"]
                Tool.drawWaterMark.a01(url, objmsg, this.d04, this, oo)
            }
            else if (oo.site == "tw") {
                objmsg.str = ["https://shopee.tw/discount.tw"]
                Tool.drawWaterMark.a01(url, objmsg, this.d04, this, oo)
            }
            else {
                Tool.pre("还没开发。。。")
            }
        },
        d04: function (blob, oo) {
            oo.temp_pic = URL.createObjectURL(blob)
            $("#state").html("正在上传图片...");
            Tool.upPic.a01(oo.temp_pic, oo.seller, oo.site, this.d05, this, oo);//上传图片
        },
        d05: function (src, oo) {
            URL.revokeObjectURL(oo.temp_pic);//方法释放使用URL
            oo.temp_pic = null;
            oo.dom.attrpicB.append(this.b01(src))
            $("#state").html("正在更新数据...");
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "update @.attrpic_1688 set @." + oo.site + "_watermark='" + src + "' where @.src='" + this.obj.Xarr[this.obj.x1 - 1].shopee + "'",
            }]
            Tool.ajax.a01(data, this.d06, this, oo)
        },
        d06: function (t, oo) {
            if (t[0].length == 0) {
                $("#state").html("下一步...");
                this.obj.x1++;
                this.a05(oo)
            }
            else {
                Tool.at("更新出错：" + t)
            }
        },
        ////////////////////////////
        e01: function (oo) {
            this.obj = { x1: 1, x2: 0, Xarr: [] }
            oo.next.apply(oo.This, [oo.t]);
        },
    }
})