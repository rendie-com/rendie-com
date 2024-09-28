'use strict';
Object.assign(Tool, {
    shopee_img_pic_attrPic_desPic:
    {
        obj: {},
        a01: function (x, arr, proid, nameA, nameB, prodes_field, next, This, t) {
            this.obj = {
                x: x,
                x1: 1,
                x2: arr.length,
                xArr: arr,
                proid: proid,
                nameA: nameA,
                nameB: nameB,
                prodes_field: prodes_field,
                next: next,
                This: This,
                t: t,
                isUpdate: false//是否要更新【aliexpress_prodes】内的据库？
            };
            this.a02();
        },
        a02: function () {
            Tool.x1x2(this.obj.x, this.obj.x1, this.obj.x2, this.a03, this, this.d01)
        },
        a03: function () {
            let o1 = this.obj.xArr[this.obj.x1 - 1];
            if (o1) {
                if (o1.picB.shopee) {
                    $(this.obj.nameA + "," + this.obj.nameB).html("已前处理过了，跳过。");
                    this.a05(o1.picB.shopee);
                }
                else {
                    let fileurl = "https://image.dhgate.com/" + o1.picB.fileurl;
                    $(this.obj.nameA).append(this.b02(o1.picB.fileurl))
                    $("#state").html("正在上传图片...");
                    Tool.upPic.a01(fileurl, this.a04, this);//上传图片
                }
            }
            else {
                $("#state").html("空位置");
                this.a08("ok")
            }
        },
        a04: function (src) {
            this.obj.isUpdate = true;
            $(this.obj.nameB).append(this.b01(src))
            this.obj.xArr[this.obj.x1 - 1].picB.shopee = src;
            this.a05(src)
        },
        a05: function (src) {
            let url = "https://s-cf-sg.shopeesz.com/file/" + src;
            $("#state").html("正在新图Base64...");
            Tool.getImgBase64.a01(url, this.a06, this, src)
        },
        a06: function (t, src) {
            if (t) {
                let oo = {
                    size: Tool.getBase64ImageSize(t.base64),
                    src: src,
                    width: t.width,
                    height: t.height
                }
                $("#state").html("正在获取【均值哈希】...");
                Tool.GetAvgHash.a01(t.base64, this.a07, this, oo)
            }
            else {
                $("#state").html("图片403错误。");
                this.obj.xArr[this.obj.x1 - 1].picB.shopee = false;//清空重来
                this.a03();
            }
        },
        a07: function (t, oo) {
            let table = ""
            if (this.obj.prodes_field == "@.DHpic") {
                //放大镜图
                table = "@.pic";
            }
            else if (this.obj.prodes_field == "@.DHattrPic") {
                //属性图
                table = "@.attrPic_aliexpress";
            }
            else if (this.obj.prodes_field == "@.DHdesPic") {
                //属性图
                table = "@.desPic";
            }
            ///////////////////////////////
            if (table) {
                let str = '\
                <if Fun(Db(sqlite.shopee_img,select count(1) from '+ table + ' where @.src=\'' + oo.src + '\',count))==0>\
                    <r: db="sqlite.shopee_img">insert into '+ table + '(@.proid,@.src,@.hash,@.addtime,@.width,@.height,@.size)values(\'' + this.obj.proid + '\',\'' + oo.src + '\',\'' + t + '\',' + Tool.gettime("") + ',' + oo.width + ',' + oo.height + ',' + oo.size + ')</r:>\
                </if>';
                Tool.ajax.a01('"ok"' + str, 1, this.a08, this);
            }
            else {
                Tool.at("未知表。")
            }
        },
        a08: function (t) {
            if (t == "ok") {
                this.obj.x1++;
                this.a02();
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        //////////////////////
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
        ////////////////////////////////////
        d01: function () {
            if (this.obj.isUpdate) {
                $("#state").html("正在更新数据...");
                let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(this.obj.proid, 50) + '">update @.prodes set ' + this.obj.prodes_field + '=' + Tool.rpsql(JSON.stringify(this.obj.xArr)) + ' where @.proid=\'' + this.obj.proid + '\'</r:>'
                Tool.ajax.a01('"ok"' + str, 1, this.d02, this)
            }
            else {
                this.d02("ok")
            }
        },
        d02: function (t) {
            if (t == "ok") {
                $("#state").html("下一步...");
                Tool.apply(t, this.obj.next, this.obj.This, this.obj.t);
            }
            else {
                Tool.at("更新出错：" + t)
            }
        },
    }
})