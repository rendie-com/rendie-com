'use strict';
Object.assign(Tool, {
    A001: {
        a01: function () {
            this.key.a01();
        }
    }
})
Object.assign(Tool.A001, {
    //按下【Q键】触发
    key: {
        key: { Q: 81 },
        a01: function () {
            Tool.Time("key", 30, this.a02, this);
        },
        a02: function () {
            $("#state").html("正在检测按键...")
            if (win.getAsyncKeyState(this.key.Q) != 0) { this.a03(); }//Q--AQQQ
            else { this.a01(); }
        },
        //////////////////////////////
        a03: function () {
            Tool.Time("key", 10, this.a04, this);
        },
        a04: function () {
            if (win.getAsyncKeyState(this.key.Q) == 0) {
                let time = (new Date).getTime();
                win.CaptureScreenDesktop(this.a05, this, time)//桌面截图
            }
            else { this.a03(); }
        },
        a05: function (img, time) {
            //$("#thisScreen").html('<img src="data:image/png;base64,' + img + '" width="800">');
            let t1 = Tool.randomRange(50, 100);
            let arr = ["65◣" + t1, "65◤" + 0];//【A】键
            win.keyArr(arr, 0, this.a06, this, [img, time]);
        },
        a06: function (arr) {
            Tool.getImageBase64("data:image/png;base64," + arr[0], 756, 972, 1, 1, this.a07, this, arr[1])//【Q】技能可以用吗？
        },
        a07: function (t, time1) {
            //是否可以按【Q】
            if (t == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjeJvz6T8AB+ADS2yeB68AAAAASUVORK5CYII=") {
                $("#state").html("【Q】技能可以用")
                let time2 = (new Date).getTime() - time1;
                if (time2 < 0) {
                    $("#state").append("用时太长了（1000-" + time1 + "=" + time2 + "）<br/>")
                    time2 = 0;
                }
                Tool.Time("key", 900 - time2, this.a08, this);//（1000ms后按下触发Q）
            } else { this.a01(); }
        },
        a08: function () {
            win.keyArr(this.b01(), 2580, this.a01, this);
        },
        ////////////////////////////////////
        //Q---AQQQ
        b01: function () {
            let t2 = Tool.randomRange(200, 300);
            let t3 = Tool.randomRange(200, 300);
            let t4 = Tool.randomRange(200, 300);
            let arr = [
                "81◣" + t2, "81◤" + (600 - t2),//【Q】键-----（600ms后按下触发Q）
                "81◣" + t3, "81◤" + (600 - t3),//【Q】键-----（600ms后按下触发Q）
                "81◣" + t4, "81◤" + (600 - t4)//【Q】键-----收尾
            ]
            return arr;
        },

    }
})

//$("#state").html("按下了【S键】")
//Tool.Time("keyQE", Tool.randomRange(50, 150), this.a06, this);//QAQQQ
//            }
//            else if (win.getAsyncKeyState(90) != 0) {
//    $("#state").html("按下了【Z键】")
//    Tool.Time("keyQE", Tool.randomRange(50, 150), this.a03, this);//QEQQQ
//}
//else if (win.getAsyncKeyState(88) != 0) {//【X】键是否按下
//    $("#state").html("按下了【X键】")
//    Tool.Time("keyQE", Tool.randomRange(50, 150), this.a04, this);//Q1EQQQ
//}
//else if (win.getAsyncKeyState(67) != 0) {//【C】键是否按下
//    $("#state").html("按下了【C键】")
        //a04: function (t) {
        //    $("#time").html((new Date).getTime() - this.time);

        //    this.a01()
        //    //win.rightClick1(500, 500, 1920, 1080, this.a01, this)

        //},
        //a04: function (t) {
//Tool.getImageBase64(this.img, 890, 975, 1, 1, this.a04, this)//【E】技能可以用吗？
        //    if (t == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+L/l/38ACRoDsnjpjbgAAAAASUVORK5CYII=") {
        //        $("#state").html("【E】键可以执行")
        //    }
        //    else {
        //        $("#state").html("【E】键不可执行")
        //        this.a05()
        //    }
        //},
        //a05: function () {
        //    if (win.getAsyncKeyState(32) != 0) {
        //        let arr = [
        //            "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(50, 60),//【Q】键
        //            "65◣" + Tool.randomRange(50, 60), "65◤" + Tool.randomRange(50, 50),//【A】键
        //            //"81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(550, 560),//【Q】键
        //            //"81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(550, 560),//【Q】键
        //            //"81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(50, 60),//【Q】键
        //        ]
        //        win.rightClick1(500, 500, 1920, 1080, this.a01, this)
        //        //win.keyArr(arr, 100, this.a01, this);
        //    }
        //    else { this.a01(); }
        //},
    //【QE】同时按下触发
    //keyQE: {
    //    img: null,
    //    a01: function () {
    //        Tool.Time("keyQE", 30, this.a02, this);
    //    },
    //    a02: function () {
    //        $("#state").html("正在检测组合按揵...")
    //        if (win.getAsyncKeyState2(81, 69)) {//【QE】键是否按下
    //            $("#state").html("按下了【QE】键")
    //            this.img = win.CaptureScreenDesktop()//桌面截图
    //            $("#thisScreen").html('<img src="' + this.img + '" width="800">');
    //            //Tool.at(this.img)
    //            Tool.getImageBase64(this.img, 756, 972, 1, 1, this.a03, this)
    //        }
    //        else { this.a01(); }
    //    },
    //    a03: function (t) {
    //        //是否可以按【Q】
    //        if (t == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjeJvz6T8AB+ADS2yeB68AAAAASUVORK5CYII=") {
    //            $("#state").html("【Q】技能可以用")
    //            Tool.getImageBase64(this.img, 890, 975, 1, 1, this.a04, this)
    //        } else { this.a01(); }
    //    },
    //    a04: function (t) {
    //        if (t == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+L/l/38ACRoDsnjpjbgAAAAASUVORK5CYII=") {
    //            $("#state").html("【E】键可以执行")
    //            Tool.getImageBase64(this.img, 823, 956, 1, 1, this.a05, this)//【W】键刚下
    //        }
    //        else {
    //            $("#state").html("【E】键不可执行");

    //            let arr = [
    //                "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(550, 560),//【Q】键
    //                "65◣" + Tool.randomRange(50, 60), "65◤" + Tool.randomRange(300, 310),//【A】键
    //                "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(550, 560),//【Q】键
    //                "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(300, 310),//【Q】键
    //            ]
    //            win.keyArr(arr, this.a05, this);
    //        }
    //    },
    //    a05: function (t) {
    //        if (t == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj4HAp+A8AAtABvFbVOhgAAAAASUVORK5CYII=") {
    //            alert("aaaaaaaaaaaaa")
    //        }
    //        else {
    //            alert("bbbbbbbbbbbbbbbbbbbbbbbb")
    //        }
    //        this.a01();
    //    },
    //a05: function () {
    //        Tool.Time("keyQE", 400, this.a05, this);
    //    ////W键刚下
    //    $("#state").html("正在按【QQQ】...")
    //    let arr = [
    //        "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(550, 560),//【Q】键
    //        "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(550, 560),//【Q】键
    //        "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(300, 310),//【Q】键
    //    ]
    //    win.keyArr(arr, this.a01, this);
    //},
    //a06: function (t) {
    //Tool.getImageBase64(img, 1142, 954, 1, 1, this.a06, this)
    //           let arr = [];
    //           if (t == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+LA84D8AB1kC57DVGYUAAAAASUVORK5CYII=") {
    //               //【1】键---可以执行。。。(推推捧)
    //               arr = [
    //                   "65◣" + Tool.randomRange(50, 60), "65◤" + Tool.randomRange(50, 60),//【A】键
    //                   "49◣" + Tool.randomRange(100, 130), "49◤" + Tool.randomRange(400, 410),//【1】键
    //                   "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(500, 510),//【Q】键
    //                   "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(500, 510),//【Q】键
    //                   "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(300, 310),//【Q】键
    //               ]
    //           }
    //           else {
    //               arr = [
    //                   "65◣" + Tool.randomRange(50, 60), "65◤" + Tool.randomRange(500, 510),//【A】键
    //                   "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(550, 560),//【Q】键
    //                   "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(550, 560),//【Q】键
    //                   "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(300, 310),//【Q】键
    //               ]
    //           }
    //           win.keyArr(arr, this.a01, this);
    //       },

    //},

    //        //WQEQQQ
//        b02: function () {
//            let t1 = Tool.randomRange(200, 500)
//            let t2 = Tool.randomRange(200, 300)
//            let t3 = Tool.randomRange(200, 400)
//            let t4 = Tool.randomRange(200, 300)
//            let t5 = Tool.randomRange(200, 300)
//            let t6 = Tool.randomRange(200, 300)
//            let t7 = Tool.randomRange(200, 300)
//            let arr = [
//                "83◣" + t1, "83◤" + (2500 - t1 - t2),//【S】键---停止后延时2.5秒后触发Q（松开触发Q）
//                "81◣" + t2, "81◤" + t3,//【Q】键
//                "69◣" + t4, "69◤" + (900 - t3 - t4) ,//【E】键----900ms触发下一个Q（按下触发Q）
//                "81◣" + t5, "81◤" + (600 - t5),//【Q】键
//                "81◣" + t6, "81◤" + (600 - t6),//【Q】键
//                "81◣" + t7, "81◤" + (600 - t7),//【Q】键
//            ]
//            return arr;
//        },
//a06: function () {
        //    Tool.Time("key", 10, this.a07, this);
        //},
        //a07: function () {
        //    if (win.getAsyncKeyState(this.key.W) == 0) {
        //        this.a05(this.b02());
        //    }
        //    else { this.a06(); }
        //},        ////Q1EQQQ
        ////////////////////////////////////
        //a08: function () {
        //    Tool.Time("key", 10, this.a09, this);
        //},
        //a09: function () {
        //    if (win.getAsyncKeyState(this.key.E) == 0) {
        //        Tool.Time("key", Tool.randomRange(100, 130), this.a05, this, this.b03());
        //    }
        //    else { this.a08(); }
        //},
        ////////////////////////////////////
        //a10: function () {
        //    Tool.Time("key", 10, this.a11, this);
        //},
        //a11: function () {
        //    if (win.getAsyncKeyState(this.key.C) == 0) {
        //        Tool.Time("key", Tool.randomRange(100, 130), this.a05, this, this.b04());
        //    }
        //    else { this.a10(); }
        //},
        //////////////////////////////////
        //b03: function () {
        //    let arr = [
        //        "81◣" + Tool.randomRange(50, 60),//【Q】键
        //        "49◣" + Tool.randomRange(50, 60),//【1】键--触发
        //        "81◤" + Tool.randomRange(100, 150),//【Q】键松开
        //        "49◤" + Tool.randomRange(550, 600),//【1】键松开
        //        ///////////////////////////////////////////////////
        //        "69◣" + Tool.randomRange(50, 60),"69◤" + Tool.randomRange(100, 150),//【E】键
        //        "81◣" + Tool.randomRange(50, 60),"81◤" + Tool.randomRange(500, 550),//【Q】键
        //        "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(500, 550),//【Q】键
        //        "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(50, 60)//【Q】键
        //    ]
        //    return arr;
        //},
        ////QEFQQQ
        //b04: function () {
        //    let arr = [
        //        "81◣" + Tool.randomRange(50, 60),//【Q】键
        //        "69◣" + Tool.randomRange(50, 60),//【E】键--触发
        //        "70◣" + Tool.randomRange(50, 60), "70◤" + Tool.randomRange(150, 160),//【F】键
        //        "81◤" + Tool.randomRange(50, 60),//【Q】键松开
        //        "69◤" + Tool.randomRange(500, 550),//【E】键松开
        //        ////////////////////////////////////////////////
        //        "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(500, 550),//【Q】键
        //        "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(500, 550),//【Q】键
        //        "81◣" + Tool.randomRange(50, 60), "81◤" + Tool.randomRange(50, 60)//【Q】键
        //    ]
        //    return arr;
        //}