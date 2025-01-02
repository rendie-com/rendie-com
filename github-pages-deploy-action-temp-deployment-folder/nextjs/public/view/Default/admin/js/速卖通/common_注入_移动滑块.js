var fun_rendie =
{
    T: [], distance: 275,
    domObj: null,
    a01: function () {
        this.Time("name", 200, this.a02, this);
    },
    a02: function () {
        this.domObj = $(".nc_wrapper .nc_scale span");
        //this.domObj.mousemove(function (event) {
        //    console.log(event);
        //})
        if (this.domObj.get(0)) {
            this.domObj.get(0).dispatchEvent(this.b01('mousedown', 0, 0))// 触发
            this.a03([0, 0]);
        }
        else {
            //console.log(this.domObj.get(0));
            this.a01();
        }
    },
    a03: function (ArrXY) {
        $("title").html("移动：" + ArrXY[0])
        if (ArrXY[0] > this.distance) {
            //不松开，也能过
            this.domObj.get(0).dispatchEvent(this.b01('mouseup', ArrXY))// 触发
            this.a05(50)
        }
        else {
            //快到的时后慢点
            if (ArrXY[0] >= this.distance - 100) {
                ArrXY[0] += Math.ceil(Math.random() * 2);
            } else {
                ArrXY[0] += Math.ceil(Math.random() * 10);
            }
            let sign = Math.random() > 0.5 ? -1 : 1;//左右斗一下
            ArrXY[0] += Math.ceil(Math.random() * 3 * sign);
            this.Time("name", 10, this.a04, this, ArrXY);
        }
    },
    a04: function (ArrXY) {
        this.domObj.get(0).dispatchEvent(this.b01('mousemove', ArrXY))// 触发
        this.a03(ArrXY)
    },
    a05: function (num) {
        $("title").html("超时：" + num)
        this.Time("name", 200, this.a06, this, num);

    },
    a06: function (num) {
        num--
        if (num == 0) {
            $("title").html("已超时。。。")
        }
        else {
            let oo = $(".errloading")
            if (oo.length == 1) {
                $("title").html("正在点击【重试】。。。")
                $(".errloading").click();
                this.Time("name", 1000, this.a01, this, num);
            }
            else {
                this.a05(num)
            }
        }

    },
    b01: function (name, ArrXY) {
        return event = new MouseEvent(name,
            {
                bubbles: true,
                cancelable: true,
                view: window,
                detail: 0,
                screenX: 0,
                screenY: 0,
                clientX: ArrXY[0],
                clientY: ArrXY[1],
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                metaKey: false,
                button: 0,
                relatedTarget: null,
            });
    },
    b02: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
    },
    ///////////////////////////////////////////////////////////////////////////////
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
    }//延时执行
}
