'use strict';
Object.assign(Tool, {
    common_pic1_waterMark:
    {
        a01: function (proid, pic1, key, seller, site, dom, next, This, t) {
            let oo = {
                proid: proid,
                pic1: pic1,//这个是“全球商品”中的图片，所以一定是没有水印的。
                key: key,
                seller: seller,
                site: site,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            //为什么要用“or”?答：因为这个店铺图片，有可能是有没水印的，也有可能是有水印的。
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "select " + Tool.fieldAs("width,height,src," + oo.site + "_watermark") + " FROM @.pic1 where @.src='" + oo.pic1 + "' limit 1",
            }]
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            if (t[0].length != 0) {
                //说明是有数据没水印。
                oo.dom.pic1A.html(this.b01(t[0][0].src));
                this.a04(t[0][0], oo);
            }
            else {
                //修复首图
                //首图表内没有，该图片。可能在详情或属性图里面。
                this.d01(oo)
            }
        },
        a04: function (t, oo) {
            oo.src = t.src;//保存还要用到这个。
            let url = "https://s-cf-sg.shopeesz.com/file/" + oo.src;
            $("#state").html('正在生成水印图...');
            if (oo.site == "my") {
                Tool.drawPic1WaterMark.a01(url, t.width, t.height, "https://shopee.com.my/choice.my", oo.key, this.a05, this, oo)
            }
            else if (oo.site == "br") {
                Tool.drawPic1WaterMark.a01(url, t.width, t.height, "https://shopee.com.br/cupons.br", oo.key, this.a05, this, oo)
            }
            else if (oo.site == "tw") {
                Tool.drawPic1WaterMark.a01(url, t.width, t.height, "https://shopee.tw/discount.tw", oo.key, this.a05, this, oo)
            }
            else {
                Tool.pre("还没开发。。。")
            }
        },
        a05: function (blob, oo) {
            oo.temp_pic = URL.createObjectURL(blob)
            oo.dom.pic1B.html('<img src="' + oo.temp_pic + '">')
            $("#state").html("正在上传图片...");
            Tool.upPic.a01(oo.temp_pic, oo.seller, oo.site, this.a06, this, oo);//上传图片
        },
        a06: function (src, oo) {
            URL.revokeObjectURL(oo.temp_pic);//方法释放使用URL
            oo.temp_pic = null;
            oo.dom.pic1B.html(this.b01(src))
            $("#state").html("正在更新数据...");
            if (oo.site) {
                //说明：这里要用“@.src”，不能用“@.pic1”。因为“@.pic1”有可能是水印图。
                //@.isPic1WaterMark=1      表示【已生成首图水印】
                let data = [{
                    action: "sqlite",
                    database: "shopee_img",
                    sql: "update @.pic1 set @." + oo.site + "_watermark='" + src + "' where @.src='" + oo.src + "'",
                }, {
                    action: "sqlite",
                    database: "shopee/商品/店铺商品/" + oo.site,
                    sql: "update @.table set @.isPic1WaterMark=1 where @.proid='" + oo.proid + "'",
                }]
                Tool.ajax.a01(data, this.a07, this, oo)
            }
            else {
                Tool.pre(["出错", oo])
            }
        },
        a07: function (t, oo) {
            $("#state").html("下一步...");
            oo.next.apply(oo.This, [oo.t]);
        },
        ////////////////////////////////////////////////
        b01: function (pic) {
            let html = "\
             <a href=\"https://s-cf-sg.shopeesz.com/file/" + pic + "\" target=\"_blank\">\
                 <img src=\"https://s-cf-sg.shopeesz.com/file/"+ pic + "_tn\" class=\"img-fluid rounded w100\">\
             </a>"
            return html;
        },
        ////////////////////////////////////////////////////////////////////////////
        d01: function (oo) {
            //修复首图
            //注：这里不用填写"or",因为在重新设置首图的时后，不可能把水印图传过来。
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "select " + Tool.fieldAs("width,height,hash,size,addtime") + " FROM @.pic where @.src='" + oo.pic1 + "' limit 1",
            }, {
                action: "sqlite",
                database: "shopee_img",
                sql: "select " + Tool.fieldAs("width,height,hash,size,addtime") + " FROM @.attrpic_1688 where @.src='" + oo.pic1 + "' limit 1",
            }, {
                action: "sqlite",
                database: "shopee_img",
                sql: "select " + Tool.fieldAs("width,height,hash,size,addtime") + " FROM @.attrpic_aliexpress where @.src='" + oo.pic1 + "' limit 1",
            }, {
                action: "sqlite",
                database: "shopee_img",
                sql: "select " + Tool.fieldAs("width,height,hash,size,addtime") + " FROM @.desPic where @.src='" + oo.pic1 + "' limit 1",
            }]
            Tool.ajax.a01(data, this.d02, this, oo);
        },
        d02: function (t, oo) {
            if (t[0].length != 0) {
                alert("aaaaaaaaaaaaa")
                //this.d03(t.pic, oo)
            }
            else if (t[1].length != 0) {
                alert("bbbbbbbbbbbbb")
                //this.d03(t.attrpic_1688, oo)
            }
            else if (t[2].length != 0) {
                alert("dcccccccccccccccc")
                //this.d03(t.attrpic_aliexpress, oo)
            }
            else if (t[3].length != 0) {
                alert("ddddddddddddddddddd")
                //this.d03(t.desPic, oo)
            }
            else {
                $("#state").html("都没没有，那就添加一个...");
                this.d03(oo)
            }
        },
        d03: function (oo) {
            let pic = "https://s-cf-sg.shopeesz.com/file/" + oo.pic1
            Tool.getImgBase64.a01(pic, this.d04, this, oo)
        },
        d04: function (t, oo) {
            oo.pic = {
                addtime: Tool.gettime(""),
                size: Tool.getBase64ImageSize(t.base64),
                src: oo.pic1,
                width: t.width,
                height: t.height
            }
            Tool.GetAvgHash.a01(t.base64, this.d05, this, oo)
        },
        d05: function (t, oo) {
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "insert into @.pic1(@.proid,@.src,@.hash,@.addtime,@.width,@.height,@.size)values('" + oo.proid + "','" + oo.pic.src + "','" + t + "'," + oo.pic.addtime + "," + oo.pic.width + "," + oo.pic.height + "," + oo.pic.size + ")",
            }]
            Tool.ajax.a01(data, this.d06, this);
        },
        d06: function (t, oo) {
            if (t[0].length == 0) {
                $("#state").html("修复好了...");
                //this.a02(oo)
            }
            else {
                Tool.at("更新出错：" + t)
            }
        },

        // d03: function (pic, oo) {
        //     $("#state").html("正在更新数据...");
        //     let updateArr = [
        //         '@.my_watermark=null',
        //         '@.br_watermark=null',
        //         '@.width=' + pic.width,
        //         '@.height=' + pic.height,
        //         '@.size=' + pic.size,
        //         '@.addtime=' + pic.addtime,
        //         "@.hash='" + pic.hash + "'",
        //         "@.src='" + oo.pic1 + "'",
        //     ]
        //     let str = '<r: db="sqlite.shopee_img">update @.pic1 set ' + updateArr.join(",") + ' where @.proid=\'' + oo.proid + '\'</r:>'
        //     Tool.at(str)
        //     //Tool.ajax.a01('"ok"' + str, 1, this.d04, this, oo)
        // },
        // d04: function (t, oo) {

        // },
    }
})