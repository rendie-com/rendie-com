'use strict';
var fun =
{
    obj: {
        screen: {
            w: 1920, h: 1080,//屏幕的宽高
            map: {
                w: 260, h: 260,
                border: { w: 68, h: 38 }//小地图中的白框大小
            }
        },
        img: null,//当前的截图
    },
    a01: function () {
        let html = Tool.header('已打开动作【' + Tool.action.name + '】') + '\
		<div class="p-2">\
		<table class="table table-hover align-middle">\
			<tbody>\
			<tr>\
				<td class="w150 right">操作说明：</td>\
				<td>\
                    （1）请以【管理员身份】运行该软件。<br/>\
                    （2）【辅助设置】为【纯净模式】。<br/>\
                </td>\
			</tr>\
			<tr><td class="right">小地图：</td><td id="minimap" class="p-0"style="position: relative;"></td></tr>\
			<tr><td class="right">我的等级：</td><td id="Level"></td></tr>\
			<tr><td class="right">我方英雄：</td><td id="OurHero"></td></tr>\
			<tr><td class="right">敌方英雄：</td><td id="EnemyHero"></td></tr>\
			<tr><td class="right">记分板：</td><td id="scoreboard"></td></tr>\
			<tr><td class="right">运行状态：</td><td id="runningState"></td></tr>\
			<tr><td class="right">当前屏幕：</td><td id="thisScreen"></td></tr>\
			<tr><td class="right">用时：</td><td id="time"></td></tr>\
			<tr><td class="right">状态：</td><td id="state"></td></tr>\
			</tbody>\
		</table>\
		</div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        win.isRD(this.a03, this)
    },
    a03: function () {
        Tool.Time("minimap", 1000, this.a04, this);
    },
    a04: function () {
        win.CaptureScreenDesktop(this.a05, this)//桌面截图
    },
    a05: function (img) {
        $("#thisScreen").html('<img src="data:image/png;base64,' + img + '" width="800">');
        Tool.at(img)
        //let arr = ["13◣100", "13◤100"];//【回车】键
        //win.keyArr(arr, 0, this.a03, this);
        //Tool.A001.a01();
    },
}
fun.a01();

    //d01: function () {
    //    Tool.Time("minimap", 3000, this.d02, this);
    //},
    //d02: function () {
    //    let img = win.CaptureScreenDesktop()//桌面截图
    //    $("#thisScreen").html('<img src="' + img + '" width="500">');
    //    this.obj.img = img;
    //    let screen = this.obj.screen;
    //    Tool.getImageBase64(img, screen.w - screen.map.w - 10, screen.h - screen.map.h - 10, screen.map.w, screen.map.h, this.d03, this)
    //},
    //d03: function (img) {
    //    $("#runningState").html('<img src="' + img + '">');
    //    Tool.at(img);
    //},
    ///////////////////////////////////////////////////////////////
    //e01: function () {
    //    let img = Tool.minimap.my_bottom3
    //    $("#minimap").append('<img src="' + img + '">');
    //    Tool.FindImgLocation.a01(img, Tool.minimapHero.A000.red, 20, this.e02, this,img);//在大图中，找小图的位置
    //},
    //e02: function (xy,img) {
    //    if (xy[2] > 20) {//相似度到超过50%
    //        Tool.FindImgLocation.a01(img, Tool.minimapHero.A003.blue, 20, this.e03, this, xy);//在大图中，找小图的位置
    //    }
    //    else {
    //        alert("没找到")
    //    }
    //},
    //e03: function (xyA, xyB) {
    //    //xyA       我自己
    //    //xyB       敌方
    //    if (xyA[2] > 20) {//相似度到超过20%
    //        //直角三角形斜边  a²+b²=c²
    //        //Math.pow(x,y)      指定次方的根号
    //        //Math.sqrt(x)       方法可返回一个数的平方根。
    //        //Math.abs(x)        求绝对值
    //        let a = Math.abs(xyA[0] - xyB[0])
    //        let b = Math.abs(xyA[1] - xyB[1])
    //        let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    //        this.e04(c)
    //    }
    //    else {
    //        alert("没找到")
    //    }
    //},
    //e04: function (c) {
    //    $("#thisScreen").html(Tool.js_date_time2(Tool.gettime(""), "-"));
    //       Tool.pre(c)

    //}
    /////////////////////////////////////////////
//a04: function () {
    //    let img = win.CaptureScreenDesktop()//桌面截图
    //    $("#thisScreen").html('<img src="' + img + '" width="500">');
    //    this.obj.img = img;
    //    let screen = this.obj.screen;
    //    Tool.getImageBase64(img, screen.w - screen.map.w - 10, screen.h - screen.map.h - 10, screen.map.w, screen.map.h, this.a05, this)
    //},
    //a05: function (img) {
    //    $("#minimap").html('<img src="' + img + '">');
    //    Tool.FindImgLocation.a01(img, Tool.minimapHero.A000.red, 10, this.a06, this);//在大图中，找小图的位置
    //},
    //a06: function (xy) {
    //    if (xy[2] > 50) {//相似度到超过50%
    //        let screen = this.obj.screen;
    //        let x = screen.w - screen.map.w + xy[0] - 10 + 13
    //        let y = screen.h - screen.map.h + xy[1] - 10 + 13
    //        win.leftClick1(x, y, screen.w, screen.h, this.a07, this)
    //    }
    //    else {
    //        this.a03();
    //    }
    //},
    //a07: function () {
    //    let screen = this.obj.screen;
    //    let x = screen.w / 2-20
    //    let y = screen.h / 2-20
    //    win.leftClick1(x, y, screen.w, screen.h, this.a08, this)
    //},
    //a08: function () {
    //    this.a03();
    //    //Tool.pre([xyA, xyB])
    //    //Tool.FindImgLocation.a01(Tool.minimap.my_bottom3, Tool.minimapHero.A003.blue, 0, this.a04, this);//在大图中，找小图的位置
    //    //Tool.getImageBase64(Tool.minimap.my_bottom2, 99, 202, 145 + 1 - 99, 224 + 1 - 202, this.d03, this)
    //    //Tool.ImgCompare.a01(Tool.minimap.my_bottom2, Tool.minimap.my_bottom1, 30, this.a04, this)//俩图比较取不同
    //    //let img = Tool.ImgArrToBase64(imgArr)
    //    //$("#runningState").html('<img src="' + img + '">');
    //    //Tool.at(img)
    //},
        //$("#runningState").html(Tool.js_date_time2(Tool.gettime(""),"-"));
        //this.e01();
//a05: function (img) {
//    $("#minimap").html('<img src="' + img + '">')
//    Tool.getImgSimilarity.a01(img, Tool.creeps.rightBottom.B, this.a06, this);///比较图片获取相似度，返回值【0-100】。
//},
//a06: function (num) {
//    if (num == 100) {
//        alert("qqqqqqqqqqqqq")
//    }
//    else {
//        this.a03();
//    }
//},
//a04: function (imgArr) {
//    //let img = Tool.ImgArrToBase64(imgArr)
//    //$("#EnemyHero").html('<img src="' + img + '">')
//    //Tool.at(img)
//    //$("#minimapHero_A001").css({
//    //    "position": "absolute",
//    //    "left":  xy[0]+"px",
//    //    "top": xy[1] + "px"
//    //});
//    //Tool.Time("minimap", 3000, this.a04, this);
//},
 //Tool.Time("minimap", 4000, this.a04, this);
