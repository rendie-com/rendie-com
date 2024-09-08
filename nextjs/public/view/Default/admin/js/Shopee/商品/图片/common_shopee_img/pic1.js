'use strict';
Object.assign(Tool, {
    shopee_img_pic1:
    {
        a01: function (pic, proid, next, This, t) {
            if (pic) {
                let oo = {
                    pic: pic,
                    proid: proid,
                    next: next,
                    This: This,
                    t: t
                }
                this.a02(oo)
            }
            else {
                $("#state").html("没有首图，不处理，跳过。");
                Tool.pre(pic);
            }
        },
        a02: function (oo) {
            if (oo.pic.split("/")[0] == "f3") {
                let fileurl = "https://image.dhgate.com/" + oo.pic;
                $("#pic11").append(this.b02(oo.pic))
                $("#state").html("正在上传图片...");
                Tool.upPic.a01(fileurl, this.a03, this, oo);//上传图片
            }
            else if (oo.pic.split("-")[0] == "cn") {
                $("#pic11,#pic12").html("已前处理过了，跳过。");
                this.a08("ok", oo)
            }
            else {
                Tool.at("图片异常：" + oo.pic)
            }
        },
        //////////////////////////////////
        a03: function (src, oo) {
            $("#pic12").append(this.b01(src))
            oo.pic = src;
            $("#state").html("正在更新【GlobalPro表】首图...");
            let str = '<r: db="sqlite.shopee">update @.GlobalPro set @.pic=' + Tool.rpsql(src) + ' where @.proid=\'' + oo.proid + '\'</r:>'
            Tool.ajax.a01('"ok"' + str, 1, this.a04, this, oo);
        },
        a04: function (t, oo) {
            if (t == "ok") {
                $("#state").html("下一步...");
                this.a05(oo);
            }
            else {
                Tool.at("更新出错：" + t);
            }
        },
        ///////////////////////////
        a05: function (oo) {
            let url = "https://s-cf-sg.shopeesz.com/file/" + oo.pic;
            $("#state").html("正在新图Base64...");
            Tool.getImgBase64.a01(url, this.a06, this, oo)
        },
        a06: function (t, oo) {
            if (t) {
                oo.update = {
                    size: Tool.getBase64ImageSize(t.base64),
                    src: oo.pic,
                    width: t.width,
                    height: t.height
                }
                $("#state").html("正在获取【均值哈希】...");
                Tool.GetAvgHash.a01(t.base64, this.a07, this, oo)
            }
            else {
                $("#state").html("图片403错误。");
            }
        },
        a07: function (t, oo) {
            let str = '\
            <if Fun(Db(sqlite.shopee_img,select count(1) from @.pic1 where @.src=\'' + oo.update.src + '\',count))==0>\
                <r: db="sqlite.shopee_img">insert into @.pic1(@.proid,@.src,@.hash,@.addtime,@.width,@.height,@.size)values(\'' + oo.proid + '\',\'' + oo.update.src + '\',\'' + t + '\',' + Tool.gettime("") + ',' + oo.update.width + ',' + oo.update.height + ',' + oo.update.size + ')</r:>\
            </if>';
            Tool.ajax.a01('"ok"' + str, 1, this.a08, this, oo);
        },
        a08: function (t, oo) {
            if (t == "ok") {
                Tool.apply(t, oo.next, oo.This, oo.t);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        //////////////////////////////////////////////
        b01: function (src) {//上传后图片
            let str = '\
            <figure class="figure border ml-1 mb-1 mt-1 p-1">\
                <a href="https://s-cf-sg.shopeesz.com/file/' + src + '" target="_blank">\
                    <img src="https://s-cf-sg.shopeesz.com/file/' + src + '_tn" class="figure-img img-fluid rounded w100 mb-0">\
                </a>\
            </figure>'
            return str;
        },
        b02: function (fileurl) {//上传前图片
            let str = '\
            <figure class="figure border ml-1 mb-1 mt-1 p-1">\
                <a href="https://image.dhgate.com/'+ fileurl + '" target="_blank">\
                    <img src="https://image.dhgate.com/100x100/'+ fileurl + '" class="figure-img img-fluid rounded w100 mb-0">\
                </a>\
            </figure>'
            return str;
        },

    }
})