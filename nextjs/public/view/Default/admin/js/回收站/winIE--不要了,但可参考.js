let win =
{

    /////////////////////////////////////////////////
    setIsKeyBool: function (A) { window.external.isKeyBool = A; },
    getIsKeyBool: function () { return window.external.isKeyBool; },//是否录制键盘
    keyDownNum: function () { return window.external.keyDownNum; },//表示：有多少按键没松开；0：表是有0个按键没松开；1：表是有1个按键没松开；
    winX: function () { return window.external.winX; },
    winY: function () { return window.external.winY; },
    GetKeyStr: function () { return window.external.keystr; },
    SetKeyStr: function () { window.external.keystr = null; },
    getIO: function () { return window.external.IO; },
    setIO: function (A) { window.external.IO = A; },
    getisinit: function () {
        return (window.external.getisinit());
    },//是否挂起钩子  
    init: function () { window.external.init(); },
    stop: function () { window.external.stop(); },
    ImgChkTime: function (pic, num, t, next, This, txt, similar, winname)//先找，后延时。【多选：要找多个图时，每个图都找一下，并给出结果】
    {
        if (!txt) { txt = ""; }
        if (!similar) { similar = 0; }
        if (!winname) { winname = ""; }
        this.ImgChkTime2([pic, num, t, next, This, txt, similar, 0, winname]);
    },
    ImgChkTime2: function (arr) {
        window.external.ImgChkFind(arr[6] + "," + arr[8] + "|" + arr[0]);
        Tool.Time(this.ImgChkTime3, arr[2], this, "img", arr)
    },
    ImgChkTime3: function (arr) {
        let str = window.external.Img;
        let len = arr[0].split("|").length, arr2 = []
        $("#code").html($("#code").html() + "--" + str);
        for (let i = 0; i < len; i++) { arr2[i] = "[]" }
        if (str == "[" + arr2.join(",") + "]")//如果一个都找不到就是【超限】
        {
            arr[7]++;
            if (arr[7] < arr[1]) {
                Tool.Time(this.ImgChkTime2, arr[2], this, "img", arr);
            }
            else {
                arr[3].apply(arr[4], ["找图片次数超限:\n用时：" + arr[1] + " * " + (arr[2] / 1000) + " = " + (arr[1] * arr[2] / 1000) + "秒\n图片：" + arr[0], arr[5]]);
            }
        }
        else { arr[3].apply(arr[4], [str, arr[5]]); }
    },
    FindImg: function (pic, next, This, txt)//相似找图
    {
        //pic:图片地址，多个图时用“|”隔开
        //参数：pic(如:"英雄联盟/英雄/我.bmp|英雄联盟/英雄/他.bmp,0,0,0,0,0,0")
        //  图片：     多个图片用“|”隔开。
        //  x：       从X轴开始找
        //  y：       从Y轴开始找
        //  w:        宽（默认：0 最大）
        //  h：       高（默认：0 最大）
        //  相似找图： 容错值 取值0--255，数值越高效率越低，不建议超过50
        //  单选/多选: 0单选;1多选；（默认：0单选）,即找到跳出（单选）还是找完跳出（多选）。
        //next:返回函数
        //This:函数对象
        //txt:传递参数
        window.external.FindImg(pic);
        Tool.Time(this.FindImg2, 100, this, "3", [next, This, txt])
    },
    FindImg2: function (arr) {
        let str = window.external.Img;
        if (str)//如果一个都找不到就是【超限】
        {
            arr[0].apply(arr[1], [str, arr[2]]);
        }
        else {
            Tool.Time(this.FindImg2, 100, this, "3", arr);
        }
    },
    /////////////////////////////////////////////////
    //pic:图片位置，多个图时用“|”隔开
    //num:超限次数
    //time:延时多少毫秒
    //next:返回函数
    //This:函数对象
    //txt:传递参数
    //similar:匹配度，0为精确匹配 取值0--255，数值越高效率越低，不建议超过50
    ImgTime: function (pic, num, time, next, This, txt, similar)//先找，后延时。【单选：要找多个图时，找到就跳出】
    {
        if (!txt) { txt = ""; }
        if (!similar) { similar = 0; }
        this.num = 0;
        this.ImgTime02([pic, num, time, next, This, txt, similar]);
    },
    ImgTime02: function (arr) {
        window.external.ImgFind(arr[6] + "|" + arr[0]);
        Tool.Time(this.ImgTime03, arr[2], this, "3", arr)
    },
    ImgTime03: function (arr) {
        let str = window.external.Img;
        let len = arr[0].split("|").length, arr2 = []
        for (let i = 0; i < len; i++) { arr2[i] = "[]" }
        if (str == "[" + arr2.join(",") + "]")//如果一个都找不到就是【超限】
        {
            this.num++;
            if (this.num < arr[1]) {
                Tool.Time(this.ImgTime02, arr[2], this, "3", arr);
            }
            else {
                arr[3].apply(arr[4], ["找图片次数超限:\n用时：" + arr[1] + " * " + (arr[2] / 1000) + " = " + (arr[1] * arr[2] / 1000) + "秒\n图片：" + arr[0], arr[5]]); this.num = 0;
            }
        }
        else { arr[3].apply(arr[4], [str, arr[5]]); this.num = 0; }
    },
    ////////////////////////////////////////////////
    move: function (X, Y, next, This, t) { window.external.SetCursorPos(X, Y); Tool.Time(next, 500, This, "3", t); },
    clickL1: function (X, Y, next, This, t) { window.external.DownLeft(X, Y); Tool.Time(next, 500, This, "3", t); },//按下左键
    clickL2: function (X, Y, next, This, t) { window.external.UpLeft(X, Y); Tool.Time(next, 50, This, "3", t); },//松开左键
    clickLmDown: function (X, Y, next, This, t) {
        window.external.DownLeft(X, Y);
        Tool.Time(this.clickLmDown1, 100, this, "3", [X, Y, next, This, t]);
    },
    clickLmDown1: function (arr) {
        window.external.SetCursorPos(arr[0] - 10, arr[1] + 100);
        Tool.Time(this.clickLmDown2, 100, this, "3", arr);
    },
    clickLmDown2: function (arr) {
        window.external.SetCursorPos(arr[0] + 10, arr[1] + 150);
        Tool.Time(this.clickLmDown3, 100, this, "3", arr);
    },
    clickLmDown3: function (arr) {
        window.external.SetCursorPos(arr[0] + 10, arr[1] + 200);
        Tool.Time(this.clickLmDown4, 100, this, "3", arr);
    },
    clickLmDown4: function (arr) {
        window.external.UpLeft(arr[0], arr[1] + 200);
        Tool.Time(arr[2], 100, arr[3], "3", arr[4]);
    },
    clickLmUp: function (X, Y, next, This, t) { window.external.DownLeft(X, Y); Tool.Time(this.clickLmUp01, 100, this, "3", [X, Y, next, This, t]); },
    clickLmUp01: function (arr) { window.external.SetCursorPos(arr[0], arr[1] - 30); Tool.Time(this.clickLmUp02, 100, this, "3", arr); },
    clickLmUp02: function (arr) { window.external.UpLeft(arr[0], arr[1] - 200); Tool.Time(arr[2], 50, arr[3], "3", arr[4]); },
    click: function (X, Y, next, This, t) { window.external.ClickLeft(X, Y); Tool.Time(next, 50, This, "3", t); },
    Click2: function (X, Y, next, This) { window.external.ClickLeft2(X, Y); Tool.Time(next, 100, This, "1"); },
    click3: function (X, Y, next, This, arr) { window.external.ClickLeft3(X, Y); Tool.Time(next, 150, This, "3", arr); },
    towin: function (txt) { return window.external.SwitchToThisWindow(txt); },


    WebStart: function (url) { window.external.WebStart(url); },

    cmd: function (str, next, This, t)//执行cmd(无返回值)
    {
        window.external.RunCmd(str);
        Tool.Time(next, 2000, This, "3", t);
    },
    Rcmd: function (str, next, This, t)//执行cmd(有返回值)
    {
        this.num = 0;
        window.external.RunCmd(str);
        Tool.Time(this.Rcmd2, 100, this, "3", [str, next, This, t])
    },
    Rcmd2: function (arr) {
        this.num++;
        let str = window.external.Img;
        if (str) { arr[1].apply(arr[2], [str, arr[3]]); }
        else if (this.num > 50) {
            str = "执行CMD语句:\n-----------------------------------------\n" + arr[0] + "\n-----------------------------------------\n超时都还没有返回值。。。";
            arr[1].apply(arr[2], [str, arr[3]]);
        }
        else {
            Tool.Time(this.Rcmd2, 200, this, "img", arr);
        }
    },
    RunWin: function (A) { window.external.RunWin(A); },
    WebUrl: function (f, url, next, This, t) {
        window.external.WebBrowserUrl(f, url);
        Tool.Time(next, 300, This, "3", t);
    },
    ajax: function (f, url, next, This, t) {
        let str = '$.ajax({type:"get",dataType:"html",url:"' + url + '",success:function(r){$("html").html(r);}});';
        window.external.ieFun(f, str);
        Tool.Time(next, 100, This, "3", t);
    },
    ajax2: function (f, url, next, This, t) {
        let str = 'let _ajax = new XMLHttpRequest();_ajax.open("get","' + url + '");_ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");_ajax.send();_ajax.onreadystatechange=function(){if (_ajax.readyState==4 &&_ajax.status==200){document.write(_ajax.responseText);}}';
        window.external.ieFun(f, str);
        Tool.Time(next, 300, This, "3", t);
    },
    //////////////////////////////////////////////////////////////
    newScreenImg: function (name, next, This, t)//窗口截图
    {
        window.external.newScreenImg(name);
        this.num = 0;
        Tool.Time(this.newScreenImg2, 100, this, "3", [name, next, This, t]);
    },
    newScreenImg2: function (arr) {
        this.num++;
        if (win.isScreenImg() == true) {
            Tool.Time(arr[1], 0, arr[2], "3", arr[3]);
        }
        else if (this.num > 20) {
            this.num = 0;
            alert("找不到程序名为：" + arr[0]);
        }
        else {
            Tool.Time(this.newScreenImg2, 100, this, "3", arr);
        }
    },
    newDraw: function (w, h)//按大小创建【画板】
    {
        window.external.newDraw(w, h);
    },
    DrawLine: function (x1, y1, x2, y2)//画线
    {
        window.external.DrawLine(x1, y1, x2, y2);
    },
    DrawString: function (str, x, y)//写字
    {
        window.external.DrawString(str, x, y)
    },
    DrawEllipse: function (x, y, w, h)//画圆
    {
        window.external.DrawEllipse(x, y, w, h);
    },
    isScreenImg: function (path) {
        return window.external.isScreenImg()
    },
    SaveScreenImg: function (path)//存图
    {
        window.external.SaveScreenImg(path);
    }
}