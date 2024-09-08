var fun = {
    //js 移动滑块
    a01: function (left) {
        left = Math.ceil(left + 2)
        $("title").html("移动：" + left + " px")
        this.Time("name", 100, this.a02, this, left);
    },
    a02: function (left) {
        let x = this.randomRange(1, 20)
        let oo = {
            x: x,
            y: this.randomRange(1, 10),
            left: left + x,
            dom: $("#slide-button")
        }
        this.c01(oo.dom, 'mousedown', oo.x, oo.y)// 触发
        this.a03(oo);
    },
    a03: function (oo) {
        let sign
        if (oo.x == oo.left) {
            this.Time("name", this.randomRange(1000, 2000), this.a05, this, oo);
        }
        else if (oo.x > oo.left) {
            oo.x--
            oo.y = this.randomRange(1, 3)
            this.Time("name", this.randomRange(100, 500), this.a04, this, oo);
        }
        else {
            //快到的时后慢点
            if (oo.x > oo.left - 5) {
                sign = this.randomRange(1, 2) == 1 ? -1 : 1;//左右斗一下
                oo.x += Math.ceil(Math.random() * 3 * sign);
                oo.y = this.randomRange(1, 3)
                this.Time("name", 10, this.a04, this, oo);

            } else {
                oo.x += this.randomRange(1, 10);
                oo.y = this.randomRange(1, 10)
                this.Time("name", 10, this.a04, this, oo);
            }
        }
    },
    a04: function (oo) {
        this.c01(oo.dom, 'mousemove', oo.x, oo.y)// 触发
        this.a03(oo)
    },
    a05: function (oo) {
        this.c01(oo.dom, 'mouseup', oo.x, oo.y)// 触发
        let img = $(".slider-item").attr("src");
        this.d01({ num: 10, img: img })
    },
    /////////////////////////
    c01: function (dom, name, x, y) {
        var rect = dom.get(0).getBoundingClientRect();//按扭
        //鼠标指针在屏幕上的坐标；
        var screenX = rect.x;
        var screenY = rect.y;
        //鼠标指针在浏览器窗口内的坐标；
        var clientX = rect.width / 2 - 2;
        var clientY = rect.height / 2 - 2;
        // 初始化 MouseEvent 对象
        const mouseEvent = new MouseEvent(name, {
            bubbles: true,
            cancelable: true,
            view: document.defaultView,
            detail: 0,
            screenX: screenX + x,//数值，鼠标相对于屏幕的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
            screenY: screenY + y,//数值，鼠标相对于屏幕的垂直位置（单位像素），其他与screenX相同。
            clientX: clientX + x,//数值，鼠标相对于程序窗口的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
            clientY: clientY + y,//数值，鼠标相对于程序窗口的垂直位置（单位像素），其他与clientX相同。
            //ctrlKey: false,//布尔值，是否同时按下了 Ctrl 键，默认值为false。
            //altKey: false,//布尔值，是否同时按下 Alt 键，默认值为false。
            //shiftKey: false,//布尔值，是否同时按下了 Shift 键，默认值为false。
            //metaKey: false,//布尔值，是否同时按下 Meta 键，默认值为false。
            //button: 0,//数值，表示按下了哪一个鼠标按键，默认值为0，表示按下主键（通常是鼠标的左键）或者当前事件没有定义这个属性；1表示按下辅助键（通常是鼠标的中间键），2表示按下次要键（通常是鼠标的右键）。
            //buttons: 0,//数值，表示按下了鼠标的哪些键，是一个三个比特位的二进制值，默认为0（没有按下任何键）。1（二进制001）表示按下主键（通常是左键），2（二进制010）表示按下次要键（通常是右键），4（二进制100）表示按下辅助键（通常是中间键）。因此，如果返回3（二进制011）就表示同时按下了左键和右键。
            //relatedTarget: null,//节点对象，表示事件的相关节点，默认为null。mouseenter和mouseover事件时，表示鼠标刚刚离开的那个元素节点；mouseout和mouseleave事件时，表示鼠标正在进入的那个元素节点。
        });
        dom.get(0).dispatchEvent(mouseEvent);
    },
    ////////////通过或重来///////////////////////////
    d01: function (oo) {
        this.Time("name", 500, this.d02, this, oo);
    },
    d02: function (oo) {
        oo.num--;
        if (oo.num == 0) {
            $("title").html("超时，超时，超时。")
        }
        else if ($("#slide-button").length == 0) {
            $("title").html("没有出现验证码，验证通过。")
        }
        else if ($(".slider-item").attr("src") != oo.img) {
            $("title").html("验证失败，要重新来。")
        }
        else {
            $("title").html("【" + oo.num + "】等待验证结果。。。")
            this.d01(oo)
        }
    },
    /////////有验证码，才通过/////////////////////
    e01: function () {
        this.e02(50);
    },
    e02: function (num) {
        this.Time("name", 200, this.e03, this, num);
    },
    e03: function (num) {
        num--;
        if (num == 0) {
            $("title").html("已超时，程序终止。")
            this.f01();
        }
        else if ($(".slider-item").length != 0) {
            $("title").html("有验证码，通过。")
        }
        else if ($(".itzwni").length != 0) {
            $("title").html("有搜索结果了，还没有验证码。");
            this.f01();
        }
        else {
            $("title").html("【" + num + "】等待验证出现。。。")
            this.e02(num)
        }
    },
    f01: function () {
        $('#root > div > div.container > div:nth-child(1) > div > div > div > div.sc-eDPEul.esJogb > div > div > div.sc-hzhJZQ.jiKJkl > span > span.beast-icon.img-icon').click();
        this.f02(10)
    },
    f02: function (num) {
        this.Time("name", 500, this.f03, this, num);
    },
    f03: function (num) {
        num--;
        let dom = $('body > div.PT_outerWrapper_5-88-0.PP_outerWrapper_5-88-0.PT_dropdown_5-88-0.PT_portalBottomLeft_5-88-0.PT_inCustom_5-88-0.PP_dropdown_5-88-0 > div > div')
        if (num == 0) {
            $("title").html("超时。。。")
        }
        else if (dom.length != 0) {
            $("title").html("等待RenDie软件来操作出现验证码。")
            //dom.click();//注：点了也没用
        }
        else {
            $("title").html("【" + num + "】等待选择文件出现。。。")
            this.f02(num)
        }
    },
    ////////////////////////////////////////////////////
    g01: function (left) {
        let oo=$("#slide-button").get(0).getBoundingClientRect()
        $("title").html("位置为：{screenX:" + oo.left + ",screenY:" + oo.top + ",left:" + left + "}")
    },
    /////////////////////////////////////////////
    h01: function () {
        this.h02(10);
    },
    h02: function (num) {
        this.Time("name", 200, this.h03, this, num);
    },
    h03: function (num) {
        num--;
        if (num == 0) {
            $("title").html("验证失败，要重新来。")
        }
        else if ($("#slide-button").length == 0) {
            $("title").html("没有出现验证码，验证通过。")
        }
        else {
            $("title").html("【" + num + "】等待验证结果。。。")
            this.h02(num)
        }
    },
    //////////////////////////////////////////////
    /////////////////////////////////////////////
    i01: function () {
        this.i02(10);
    },
    i02: function (num) {
        this.Time("name", 200, this.i03, this, num);
    },
    i03: function (num) {
        num--;
        if (num == 0) {
            $("title").html("还有有验证码，验证失败。")
        }
        else if ($(".slider-item").length == 0) {
            $("title").html("没有有验证码，验证成功。")
        }
        else {
            $("title").html("【" + num + "】等待验证出现。。。")
            this.i02(num)
        }
    },
    randomRange: function (Min, Max)//设置随机数： Min最小值，Max最大值（不包括最大值）
    {
        //Math.floor   向下取整   
        return Math.floor(Math.random() * (Max - Min)) + Min;
    },
    TimeNameArr: [],//定时器名称
    Time: function (name, time, next, This, t) {
        if (this.TimeNameArr[name]) {
            window.clearTimeout(this.TimeNameArr[name]);
            delete this.TimeNameArr[name];
        };
        //setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
        this.TimeNameArr[name] = window.setTimeout(function () {
            if (t == undefined) {
                next.apply(This);
            }
            else { next.apply(This, [t]); }
        }, time);
    }
}
