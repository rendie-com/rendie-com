'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0, Aarr: []
    },
    a01: function () {
        let html = Tool.header("正在把速卖通的图片上传到敦煌网...") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
          <tbody>\
		        <tr><td class="right">卖家账号：</td><td id="upUser" colspan="2"></td></tr>\
		        <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
		        <tr><td class="right w150">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
		        <tr>\
                    <td class="right">放大镜图片：</td>\
                    <td colspan="2">\
                        <table class="table mb-0 border align-middle">\
		                <tr><td class="right w150">上传前：</td><td id="picBA" colspan="2"></td></tr>\
		                <tr><td class="right">上传后原图：</td><td id="picB" colspan="2"></td></tr>\
		                <tr><td class="right">上传后原图进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		                <tr><td class="right">上传后水印图：</td><td id="picC" colspan="2"></td></tr>\
		                <tr><td class="right">上传后水印图进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
                        </table>\
                    </td>\
                </tr>\
		        <tr>\
                    <td class="right">属性图片：</td>\
                    <td colspan="2">\
                        <table class="table mb-0 border align-middle">\
		                <tr><td class="right w150">上传前：</td><td id="picDA" colspan="2"></td></tr>\
		                <tr><td class="right">上传后原图：</td><td id="picD" colspan="2"></td></tr>\
		                <tr><td class="right">上传后原图进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
		                <tr><td class="right">上传后水印图：</td><td id="picE" colspan="2"></td></tr>\
		                <tr><td class="right">上传后水印图进度：</td>'+ Tool.htmlProgress('E') + '</tr>\
                        </table>\
                    </td>\
                </tr>\
		        <tr>\
                    <td class="right">详情图片：</td>\
                    <td colspan="2">\
                        <table class="table mb-0 border align-middle">\
		                <tr><td class="right w150">上传前：</td><td id="picFA" colspan="2"></td></tr>\
		                <tr><td class="right">上传后原图：</td><td id="picF" colspan="2"></td></tr>\
		                <tr><td class="right">上传后原图进度：</td>'+ Tool.htmlProgress('F') + '</tr>\
		                <tr><td class="right">上传后水印图：</td><td id="picG" colspan="2"></td></tr>\
		                <tr><td class="right">上传后水印图进度：</td>'+ Tool.htmlProgress('G') + '</tr>\
                        </table>\
                    </td>\
                </tr>\
				</tbody>\
          </table>\
        </div>';
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        // where=" where @.ManualReview=0"
        // where=" where @.proid=\'R999678\'"
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
		<r:proupdhgate db="sqlite.dhgate" size=1 page=2 where=" where @.proStatus=22">,\
		{\
			<r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
				"DHpic":<:DHpic tag=0/>,\
				"DHattrPic":<:DHattrPic tag=0/>,\
				"DHdesPic":<:DHdesPic tag=0/>,\
			</r:prodes>\
			"pic":<:pic tag=0/>,\
			"upUser":<:upUser tag=json/>,\
			"proid":"<:proid/>"\
		}\
		</r:proupdhgate>]'
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        $("#state").html("已获得参数。");
        this.obj.Aarr = arr[1];
        this.a04();
    },
    a04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null)
    },
    a05: function () {
        $("#proid").html(this.obj.Aarr.proid);
        this.obj.Aarr.upUser = this.obj.Aarr.upUser.toLowerCase()
        $("#upUser").html(this.obj.Aarr.upUser);
        if (this.obj.Aarr.DHpic == undefined) {
            $("#state").html("详情已不存在。");
            this.obj.Aarr = [];
            this.obj.A1++;
            this.a02();
        }
        else {
            $("#state").html("准备上传【放大镜图片】。。。");
            Tool.DHpicB1B2C1C2.a01(this.obj.Aarr.DHpic, this.obj.Aarr.upUser, this.a06, this)
        }
    },
    a06: function (newArr) {
        this.obj.Aarr.DHpic = newArr;
        $("#state").html("准备上传【属性图片】。。。");
        Tool.DHattrPicD1D2E1E2.a01(this.obj.Aarr.DHattrPic, this.obj.Aarr.upUser, this.a07, this)
    },
    a07: function (newArr) {
        this.obj.Aarr.DHattrPic = newArr;
        $("#state").html("准备上传【改详图片】。。。");
        Tool.DHdesPicF1F2G1G2.a01(this.obj.Aarr.DHdesPic, this.obj.Aarr.upUser, this.a08, this)
    },
    a08: function (newArr) {
        this.obj.Aarr.DHdesPic = newArr;
        this.a09()
    },
    a09: function () {
        let Aarr = this.obj.Aarr
        let pic = Aarr.pic;//推广图片
        if (pic === 0) {
            $("#state").html("推广图片。。。");
            this.a10("");
        }
        else {
            if (pic.picC) {//过-不用改                
                this.a10("")
            }
            else {
                //要改
                $("#state").html("要找推广图片。");
                let newPic = this.b01(pic, Aarr.DHpic[0], Aarr.DHattrPic[0], Aarr.DHdesPic[0])
                let str = '<r: db="sqlite.aliexpress">update @.proupdhgate set @.pic=' + Tool.rpsql(JSON.stringify(newPic)) + ' where @.proid=\'' + Aarr.proid + '\'</r:>';
                this.a10(str);
            }
        }
    },
    a10: function (str) {
        let newArr = [];
        if (this.obj.Aarr.DHpic[1]) {//放大镜图片
            newArr.push('@.DHpic=' + Tool.rpsql(JSON.stringify(this.obj.Aarr.DHpic[0])))
        }
        if (this.obj.Aarr.DHattrPic[1]) {//属性图片
            newArr.push('@.DHattrPic=' + Tool.rpsql(JSON.stringify(this.obj.Aarr.DHattrPic[0])))
        }
        if (this.obj.Aarr.DHdesPic[1]) {//详情图片
            newArr.push('@.DHdesPic=' + Tool.rpsql(JSON.stringify(this.obj.Aarr.DHdesPic[0])))
        }
        if (newArr.length != 0) {
            let proid = this.obj.Aarr.proid;
            str += '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes set ' + newArr.join(",") + ' where @.proid=\'' + proid + '\'</r:>';
            $("#state").html("正在保存图片。。。");
        }
        if (str == "") {
            this.a11("")
        } else {
            Tool.ajax.a01('""'+str, 1, this.a11, this);
        }
    },
    a11: function (t) {
        if (t == "") {
            $("#B1,#C1,#D1,#E1,#F1,#G1").css("width", "0%");
            $("#B1,#B2,#picBA,#picB,#C1,#C2,#picC").html('')
            $("#D1,#D2,#picDA,#picD,#E1,#E2,#picE").html('')
            $("#F1,#F2,#picFA,#picF,#G1,#G2,#picG").html('')
            this.obj.Aarr = [];
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.at(t);
        }
    },
    b01: function (pic, DHpic, DHattrPic, DHdesPic) {
        let newPic = {};
        let arr = DHpic.concat(DHattrPic).concat(DHdesPic);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                if (pic.picA.fileurl == arr[i].picA.fileurl) {
                    newPic = arr[i];
                    break;
                }
            }
        }
        return newPic;
    }
}
fun.a01();