'use strict';
Object.assign(Tool, {
    common_desPic_waterMark:
    {
        obj: {},
        a01: function (proid, seller, site, progress1, progress2, dom, next, This, t) {
            let oo = {
                seller: seller,
                site: site,
                progress1: progress1,
                progress2: progress2,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            this.a02(proid, oo)
        },
        a02: function (proid, oo) {                
            //database: "shopee_img",
            //sql:"update @.pic set @." + oo.site + "_watermark=null"
            //sql:"update @.desPic set @." + oo.site + "_watermark=null"
            let data = [{
                action: "sqlite",
                database: "aliexpress_prodes/" + Tool.pronum(proid, 50),
                sql: "select " + Tool.fieldAs("dhpic,dhdespic") + " FROM @.prodes where @.proid='" + proid + "'",
            }]
            $("#state").html("正在获取商品...");
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            let dhpic = JSON.parse(t[0][0].dhpic)
            let dhdespic = JSON.parse(t[0][0].dhdespic)
            this.obj = {
                Xarr: dhpic,
                x1: 1,
                x2: dhpic.length,
                Yarr: dhdespic,
                y1: 1,
                y2: dhdespic.length
            }
            this.a04(oo)
        },
        a04: function (oo) {
            Tool.x1x2(oo.progress1, this.obj.x1, this.obj.x2, this.d01, this, this.e01, oo)
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
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "select " + Tool.fieldAs("width,height," + oo.site + "_watermark") + " FROM @.pic where @.src='" + this.obj.Xarr[this.obj.x1 - 1].picB.shopee + "'",
            }]
            Tool.ajax.a01(data, this.d02, this, oo);
        },
        d02: function (t, oo) {
            if (t[0][0][oo.site + "_watermark"]==null) {
                oo.dom.picA.append(this.b01(this.obj.Xarr[this.obj.x1 - 1].picB.shopee));
                this.d03(t[0][0], oo);
            }
            else if (t[0][0][oo.site + "_watermark"]) {
                oo.dom.picA.append('<figure class="figure border mb-1 m-1 p-1 w100">已上传跳过</figure>');
                oo.dom.picB.append('<figure class="figure border mb-1 m-1 p-1 w100">已上传跳过</figure>');
                this.d06([[]], oo)
            }
            else {
                Tool.pre(["出错002", oo]);
            }
        },
        d03: function (t, oo) {
            let url = "https://s-cf-sg.shopeesz.com/file/" + this.obj.Xarr[this.obj.x1 - 1].picB.shopee;
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
                Tool.pre("还没开发111。。。")
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
            oo.dom.picB.append(this.b01(src))
            $("#state").html("正在更新数据...");
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "update @.pic set @." + oo.site + "_watermark='" + src + "' where @.src='" + this.obj.Xarr[this.obj.x1 - 1].picB.shopee + "'",
            }]
            Tool.ajax.a01(data, this.d06, this, oo)
        },
        d06: function (t, oo) {
            if (t[0].length==0) {
                $("#state").html("下一步...");
                this.obj.x1++;
                this.a04(oo)
            }
            else {
                Tool.at("更新出错11：" + t)
            }
        },
        ////////////////////////////////
        e01: function (oo) {
            Tool.x1x2(oo.progress2, this.obj.y1, this.obj.y2, this.e02, this, this.f01, oo)
        },
        e02: function (oo) {           
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "select " + Tool.fieldAs("width,height," + oo.site + "_watermark") + " FROM @.desPic where @.src='" + this.obj.Yarr[this.obj.y1 - 1].picB.shopee + "'",
            }]
            Tool.ajax.a01(data, this.e03, this, oo);
        },
        e03: function (t, oo) {
            if (t[0][0][oo.site + "_watermark"] == null) {
                let shopee_pic = this.obj.Yarr[this.obj.y1 - 1].picB.shopee
                oo.dom.desPicA.append(this.b01(shopee_pic));
                let url = "https://s-cf-sg.shopeesz.com/file/" + shopee_pic;
                oo.width = t[0][0].width;
                oo.height = t[0][0].height;
                this.e04(url, oo);
            }
            else if (t[0][0][oo.site + "_watermark"]) {
                oo.dom.desPicA.append('<figure class="figure border mb-1 m-1 p-1 w100">已上传跳过</figure>');
                oo.dom.desPicB.append('<figure class="figure border mb-1 m-1 p-1 w100">已上传跳过</figure>');
                this.e07([[]], oo)
            }
            else {
                Tool.pre(["出错", oo]);
            }
        },
        e04: function (url, oo) {
            $("#state").html('正在生成水印图...');
            let objmsg = {
                width: oo.width,
                height: oo.height,
                rotate: 20,//旋转角度       int类型       默认20
                fontsize: 12,//字体大小                   默认20
                fontcolor: "255, 255, 255, 0.3",        //字体颜色  rgba类型  默认 255, 255, 255, 0.2
                density: 4,//稠密度                       数值越大，水印越多
                str: [] //水印文字           数组类型      最大三行（即lingth<=3）[必传]
            }
            if (oo.site == "my") {
                objmsg.str = ["https://shopee.com.my/choice.my"]
                Tool.drawWaterMark.a01(url, objmsg, this.e05, this, oo)
            }
            else if (oo.site == "br") {
                objmsg.str = ["https://shopee.com.br/cupons.br"]
                Tool.drawWaterMark.a01(url, objmsg, this.e05, this, oo)
            }
            else if (oo.site == "tw") {
                objmsg.str = ["https://shopee.tw/discount.tw"]
                Tool.drawWaterMark.a01(url, objmsg, this.e05, this, oo)
            }
            else {
                Tool.pre("还没开发。。。")
            }
        },
        e05: function (blob, oo) {
            if (blob == "err") {
                let url = "https://ae01.alicdn.com/kf/" + this.obj.Yarr[this.obj.y1 - 1].picA.fileurl
                this.e04(url, oo);
            }
            else {
                oo.temp_pic = URL.createObjectURL(blob)
                $("#state").html("正在上传图片...");
                Tool.upPic.a01(oo.temp_pic, oo.seller, oo.site, this.e06, this, oo);//上传图片
            }
        },
        e06: function (src, oo) {
            URL.revokeObjectURL(oo.temp_pic);//方法释放使用URL
            oo.temp_pic = null;
            oo.dom.desPicB.append(this.b01(src))
            $("#state").html("正在更新数据...");
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "update @.desPic set @." + oo.site + "_watermark='" + src + "' where @.src='" + this.obj.Yarr[this.obj.y1 - 1].picB.shopee + "'",
            }]
            Tool.ajax.a01(data, this.e07, this, oo)
        },
        e07: function (t, oo) {
            if (t[0].length == 0) {
                $("#state").html("下一步...");
                this.obj.y1++;
                this.e01(oo)
            }
            else {
                Tool.at("更新出错：" + t)
            }
        },
        ////////////////////////////
        f01: function (oo) {
            oo.next.apply(oo.This, [oo.t]);
        },
    }
})