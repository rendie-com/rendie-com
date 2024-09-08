'use strict';
let win = {
    num: 0,//计数
    //桌面截图，返回base64（注：显示需要手动加“data:image/png;base64,”）
    CaptureScreenDesktop: function (next, This, t) {
        window.rendie.captureScreenDesktop();
        Tool.Time("getTemp", 30, this.getTemp, this, [100, 10, next, This, t])//超时为：100次 * 10 = 1秒
    },
    //截软件图，返回base64
    CaptureScreen: function (winname) {
        //如：
        //let img = win.CaptureScreen("League of Legends (TM) Client")//注这个截的是【全黑色的】
        //let img = win.CaptureScreen("League of Legends")
        return 'data:image/png;base64,' + window.rendie.captureScreen(winname);
    },
    //全局键盘检测（检测单个按揵）
    getAsyncKeyState: function (vkey) { return window.rendie.getAsyncKeyState(vkey); },
    //全局键盘检测（检测2个组合按揵）
    getAsyncKeyState2: function (A, B) { return window.rendie.getAsyncKeyState2(A, B); },
    getXY: function () { return window.rendie.getXY(); },//获取x轴y轴坐标
    runCmd: function (str, next, This, t)//执行cmd(有返回值)
    {
        this.num = 0;
        window.rendie.runCmd(str);
        Tool.Time(this.getTemp, 200, this, "getTemp", [50, 200, next, This, t])
    },
    getTemp: function (arr) {
        this.num++;
        let temp = window.rendie.getTemp();
        if (temp) {
            this.num = 0; arr[2].apply(arr[3], [temp, arr[4]]);
        }
        else if (this.num > arr[0]) {
            this.num = 0;
            let oo =
            {
                status: "timeout",
                statusText: "超时:累计用时" + arr[0] + " * " + arr[1] + " = " + (arr[0] * arr[1] / 1000) + "秒。"
            };
            arr[2].apply(arr[3], [oo, arr[4]]);
        }
        else {
            Tool.Time("getTemp", arr[1], this.getTemp, this, arr);
        }
    },
    runWin: function (A) { window.rendie.runWin(A); },
    /////////////////////////////////////////////////
    //pic:图片位置，多个图时用“|”隔开
    //similar:匹配度，0为精确匹配 取值0--255，数值越高效率越低，不建议超过50
    //num:超限次数
    //time:延时多少毫秒
    //next:返回函数
    //This:函数对象
    //t:传递参数
    findPic: function (pic, similar, next, This, t)//先找，后延时。【单选：要找多个图时，找到就跳出】
    {
        this.num = 0;
        window.rendie.findPic(pic, similar);
        Tool.Time("getTemp", 200, this.getTemp, this, [50, 200, next, This, t])//10秒
    },
    downLoad: function (path, next, This, t)//下载文件并返回下载后文件路径
    {
        window.rendie.downLoad(path);
        Tool.Time("getTemp", 300, this.getTemp, this, [100, 300, next, This, t])//超时为：100次 * 300 = 30秒
    },
    copy: function (txt) { window.rendie.copy(txt); },//复制字符串
    currentPath: function () { return window.rendie.currentPath(); },//当前路径
    setCursorPos: function (X, Y) { window.rendie.setCursorPos(X, Y); },//移动鼠标
    leftDown: function (X, Y, width, height) { window.rendie.leftDown(X, Y, width, height); },//左键按下
    mLeftUp: function (X, Y, width, height) { window.rendie.mLeftUp(X, Y, width, height); },//左键松开
    rightDown: function (X, Y, width, height) { window.rendie.rightDown(X, Y, width, height); },//右键按下
    mRightUp: function (X, Y, width, height) { window.rendie.mRightUp(X, Y, width, height); },//右键松开
    clipboardClear: function (txt) { window.rendie.clipboardClear(); },//清空剪贴板
    leftClick1: function (X, Y, width, height, next, This, t) { window.rendie.leftClick1(X, Y, width, height); Tool.Time("1", 100, next, This, t); },//单击
    leftClick2: function (X, Y, width, height, next, This, t) { window.rendie.leftClick2(X, Y, width, height); Tool.Time("1", 400, next, This, t); },//双击
    leftClick3: function (X, Y, width, height, next, This, t) { window.rendie.leftClick3(X, Y, width, height); Tool.Time("1", 700, next, This, t); },//3击
    rightClick1: function (X, Y, width, height, next, This, t) { window.rendie.rightClick1(X, Y, width, height); Tool.Time("1", 100, next, This, t); },//单击
    rightClick2: function (X, Y, width, height, next, This, t) { window.rendie.rightClick2(X, Y, width, height); Tool.Time("1", 400, next, This, t); },//双击
    rightClick3: function (X, Y, width, height, next, This, t) { window.rendie.rightClick3(X, Y, width, height); Tool.Time("1", 700, next, This, t); },//3击
    keyArr: function (arr, timeA, next, This, t) {
        //arr=["162◣50","86◣50","86◤50","162◤50"]//粘贴
        //timeA = 50;//延时多久。
        window.rendie.keyArr(arr);
        let timeB = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].indexOf("◣") != -1) { timeB += parseInt(arr[i].split("◣")[1]); }
            else if (arr[i].indexOf("◤") != -1) { timeB += parseInt(arr[i].split("◤")[1]); }
            else { alert("未知按键状态。"); }
        }
        Tool.Time("1", (timeA > timeB ? timeA : timeB), next, This, t);
    },
    isRD: function (next, This, t) {
        if (window.rendie) {
            if (t) { next.apply(This, [t]); }
            else { next.apply(This); }
        }
        else {
            Tool.Modal("提示", "<p>请使用【RenDie】软件。<p>", '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '')
        }
    }
}