var fun =
{
    T: [], distance: 375,
    domObj: null,
    a01: function () {
        this.Time(this.a02, 300, this, "1");
    },
    a02: function () {
        var iframe = $('#baxia-dialog-content');
        var iframeDoc = iframe[0].contentDocument || iframe[0].contentWindow.document;
        this.domObj = $(iframeDoc).find('.nc_wrapper .nc_scale span');
        ///////////////////////////////////////////////////
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
        if (ArrXY[0] > this.distance) {
            //不松开，也能过
            //this.domObj.get(0).dispatchEvent(this.b01('mouseup', ArrXY))// 触发
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
            this.Time(this.a04, 10, this, "1", ArrXY);
        }
    },
    a04: function (ArrXY) {
        this.domObj.get(0).dispatchEvent(this.b01('mousemove', ArrXY))// 触发
        this.a03(ArrXY)
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
    Time: function (A, B, C, D, E) {
        let This = this;
        if (This.T[D]) {
            window.clearTimeout(This.T[D]);
            delete This.T[D];
        };
        This.T[D] = window.setTimeout(function () {
            if (E) { A.apply(C, [E]); } else { A.apply(C); }
        }, B);
    }//延时执行
}
