'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0, Aarr: [],
        B1: 1, B2: 0, Barr: [],
        C1: 1, C2: 0, Carr: []
    },
    a01: function () {
        let html = Tool.header("正在把【属性图片未上传】上传到敦煌网...") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">属性原图图进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right w150">属性水印图进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
                <tr><td class="right w150">属性原图：</td><td id="picB" colspan="2"></td></tr>\
                <tr><td class="right w150">属性水印图：</td><td id="picC" colspan="2"></td></tr>\
                <tr><td class="right">卖家账号：</td><td id="upUser" colspan="2"></td></tr>\
                <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
                </tbody>\
            </table>\
        </div>';
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:proupdhgate db="sqlite.dhgate" size="1" page=2 where=" where @.ManualReview=17">,\
        {\
        	<r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
        		"DHattrPic":<:DHattrPic tag=0/>,\
        	</r:prodes>\
        	"upUser":<:upUser tag=json/>,\
        	"proid":"<:proid/>"\
        }\
        </r:proupdhgate>]'
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        this.obj.Aarr = arr[1];
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null)
    },
    a04: function () {
        $("#proid").html(this.obj.Aarr.proid);
        this.obj.Aarr.upUser = this.obj.Aarr.upUser.toLowerCase()
        $("#upUser").html(this.obj.Aarr.upUser);
        let DHattrPic = this.obj.Aarr.DHattrPic;
        $("#state").html("上传图片...");
        this.obj.Barr = DHattrPic;
        this.obj.B2 = this.obj.Barr.length;
        this.a05();
    },
    a05: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a06, this, this.d01)
    },
    a06: function () {
        $("#state").html("要上传了");
        let Barr=this.obj.Barr[this.obj.B1 - 1]
        if (Barr) {
            let urlA = "https://ae01.alicdn.com/kf/" + Barr.picA.aliexpressPic + ".jpg";
            $("#state").html('正在获取图片... <a href="' + urlA + '" target="_blank">' + urlA + '</a>');
            Tool.setImgMaxWidth.a01(urlA, 1000, this.a07, this)//限制图片最大度度（返回blob）
        }
        else {
            $("#state").html("有的时候，如：10个属性图片，可能只有8个是图片。,所以跳过。。");
            this.a13();
        }
    },
    a07: function (blob) {
        let url = URL.createObjectURL(blob)
        let maxSize = 1024 * 1024 * 5//5M
        $("#state").html('因为敦煌最大只能上传5M的图片。');
        if (blob.size > maxSize) {
            $("#state").html('大于5M，则修改质量,直到5M以内。');
            //Tool.compressedImage.a01(url, maxSize, this.a08, this);
        }
        else {
            $("#state").html('小于5M，可以上传，通过。');
            this.a09(url)
        }
    },
    a08: function (blob) {
        let url = URL.createObjectURL(blob)
        $("#state").html('压缩图片后... <a href="' + url + '" target="_blank">' + url + '</a>')
        this.a09(url)
    },
    a09: function (urlA) {
        $("#state").html('正在主图上传... <a href="' + urlA + '" target="_blank">' + urlA + '</a>')
        let urlB = "https://upload.dhgate.com/uploadfile?functionname=albu&supplierid=ff8080815fbe392b01608264ffbc779e&imagebannername=&token=-hwBEsUCl5XyIYsFzQ8sOUKOd4UeTq1PU03y3-Ryx369csJKcagjax3ITeT1bBPsm15SvLgyphrdlcDEEKsw6lhfnPsOSZOSY_8yF9PgrTU"
        let data = [
            {
                name: "target_img",
                value: "（二进制）" + urlA,
                fileName: this.obj.Barr[this.obj.B1 - 1] + ".jpg"
            }
        ]
        gg.uploadFile(urlB, null, data, this.a10, this, urlA)
    },
    a10: function (oo, urlA) {
        if (oo.l_imgurl) {
            URL.revokeObjectURL(urlA);//静态方法用来释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
            this.a11(oo);
        }
        else if (oo.status == 404) {
            Tool.pre(["eeeeee", oo])

        }
        else if (oo.result == 0) {

            Tool.pre(["sssssssssssssssss", oo])

        }
        else if (oo.status == 0 || oo.status == 403 || oo.code == 500) {
            Tool.pre(oo)
            //this.a10(6,"【把速卖通的属性图片上传到敦煌网】失败可能是图片太大了")

        }
        else if (oo.status == 429) {
            $("#state").html("“请求过多”。。。");
            //Tool.Time(Tool.reload, 1000, this, "1");
        }
        else {
            Tool.pre(["上传失败2222。。", oo])
        }
    },
    a11: function (oo) {
        $("#picB").append('<a href="https://image.dhgate.com/' + oo.l_imgurl + '" target="_blank"><img src="https://image.dhgate.com/' + oo.l_imgurl + '" height="100" class="border"/></a>')
        $("#state").html("上传成功。");
        this.a12(oo.width, oo.height, oo.l_imgsize, oo.l_imgurl, oo.l_imgmd5);
    },
    a12: function (width, height, size, fileurl, imgmd5) {
        this.obj.Carr[this.obj.B1 - 1] = {
            picA: {
                aliexpressPic: this.obj.Barr[this.obj.B1 - 1].picA.aliexpressPic
            },
            picB: {
                width: Tool.int(width),
                height: Tool.int(height),
                size: Tool.int(size),
                fileurl: fileurl,
                imgmd5: imgmd5
            }
        }
        this.obj.B1++;
        this.a05()
    },
    a13: function () {
        this.obj.Carr[this.obj.B1 - 1] = false;
        this.obj.B1++;
        this.a05()
    },
    ///////////////////////////////////////////////////////////////////////////////////////
    d01: function () {
        this.obj.C2 = this.obj.Carr.length;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        /////////////////////////////
        this.d02();
    },
    d02: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.d03, this, this.d09)
    },
    d03: function () {
        if (this.obj.Carr[this.obj.C1 - 1]) {
            let fileurl = "https://image.dhgate.com/" + this.obj.Carr[this.obj.C1 - 1].picB.fileurl;
            $("#state").html('正在加水印...<a href="' + fileurl + '" target="_blank">' + fileurl + '</a>');
            this.d04(fileurl)
        }
        else {
            $("#state").html('有的时候，如果：10个属性图片，可能只有8个是图片。');
            this.obj.Carr[this.obj.C1 - 1] = false;
            this.obj.C1++;
            this.d02();
        }
    },
    d04: function (urlA) {
        let objmsg = {
            width: this.obj.Carr[this.obj.C1 - 1].picB.width,
            height: this.obj.Carr[this.obj.C1 - 1].picB.height,
            rotate: 20,//旋转角度   int类型  默认20
            fontsize: 12,//字体大小   默认20
            fontcolor: "255, 255, 255, 0.3",//字体颜色  rgba类型  默认 255, 255, 255, 0.2
            density: 4,//稠密度    数值越大，水印越多
            str: ["DHgate store: " + this.obj.Aarr.upUser]    //水印文字 数组类型  最大三行（即lingth<=3）[必传]
        }
        Tool.drawWaterMark.a01(urlA, objmsg, this.d05, this)
    },
    d05: function (blob) {
        let urlA = URL.createObjectURL(blob)
        let maxSize = 1024 * 1024 * 5//5M
        $("#state").html('因为敦煌最大只能上传5M的图片。');
        if (blob.size > maxSize) {
            $("#state").html('大于5M，则修改质量,直到5M以内，没做，有了再说。');
        }
        else {
            $("#state").html('小于5M，可以上传，通过。');
            this.a11(urlA)
        }
    },
    a11: function (urlA) {
        $("#state").html('正在水印图上传... <a href="' + urlA + '" target="_blank">' + urlA + '</a>');
        let urlB = "https://upload.dhgate.com/uploadfile?functionname=albu&supplierid=ff8080815fbe392b01608264ffbc779e&imagebannername=&token=-hwBEsUCl5XyIYsFzQ8sOUKOd4UeTq1PU03y3-Ryx369csJKcagjax3ITeT1bBPsm15SvLgyphrdlcDEEKsw6lhfnPsOSZOSY_8yF9PgrTU"
        let data = [
            {
                name: "target_img",
                value: "（二进制）" + urlA,
                fileName: this.obj.Carr[this.obj.C1 - 1].picB.fileurl.split("/").pop()
            }
        ]
        gg.uploadFile(urlB, null, data, this.d07, this)
    },
    d07: function (oo) {
        if (oo.l_imgurl) {
            $("#picC").append('<a href="https://image.dhgate.com/' + oo.l_imgurl + '" target="_blank"><img src="https://image.dhgate.com/' + oo.l_imgurl + '" height="100" class="border"/></a>')
            $("#state").html("上传成功。")
            this.d08(oo.width, oo.height, oo.l_imgsize, oo.l_imgurl, oo.l_imgmd5)
        }
        else if (oo.status == 0) {
            $("#state").html("刷新可以解决。。。")
        }
        else {
            Tool.pre(["上传失败eererere", oo])
        }
    },
    d08: function (width, height, size, fileurl, imgmd5) {
        this.obj.Carr[this.obj.C1 - 1].picC =
        {
            height: Tool.int(height),
            width: Tool.int(width),
            size: Tool.int(size),
            fileurl: fileurl,
            imgmd5: imgmd5
        }
        this.obj.C1++;
        this.d02();
    },
    d09: function () {
        let proid = this.obj.Aarr.proid;
        let str = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes set @.DHattrPic=' + Tool.rpsql(JSON.stringify(this.obj.Carr)) + ' where @.proid=\'' + proid + '\'</r:>';
        $("#state").html("正在保存详情内容。。。");
        Tool.ajax.a01(str, 1, this.d10, this);
    },
    d10: function (t) {
        if (t == "") {
            this.obj.B1 = 1;
            this.obj.B2 = 0;
            this.obj.Barr = [];
            this.obj.C1 = 1;
            this.obj.C2 = 0;
            this.obj.Carr = [];
            $("#B1,#C1").css("width", "0%");
            $("#B1,#B2,#picB,#C1,#C2,#picC").html('')
            this.obj.Aarr = [];
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.at(t);
        }
    }
}
fun.a01();







	//出错说明
	//a10: function (ManualReview, err) {
	//	let str = '<r: db="sqlite.aliexpress">update @.proupdhgate set @.ManualReview=' + ManualReview + ',@.err=' + Tool.rpsql(err) + ' where @.proid=\'' + this.obj.Aarr.proid + '\'</r:>';
	//	Tool.ajax.a01( str,1,this.a09, this);
	//},

