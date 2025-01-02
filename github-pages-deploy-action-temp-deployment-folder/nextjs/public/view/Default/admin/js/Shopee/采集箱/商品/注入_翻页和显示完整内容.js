'use strict';
var fun01 =
{
    a01: function () {
        let oo = {
            num: 0,//计数
            Height: 0,
            count: 15
        }
        this.a02(oo)
    },
    a02: function (oo) {
        let len = $('[class="ml-[3px] align-middle"]').length, len2 = $('[data-sqe="item"]').length
        $("title").html("【" + oo.num + "】商品个数：" + len + "=" + oo.count + "=" + len2);
        if (len != 60) {
            if (len >= oo.count) {
                oo.count += 15
                oo.Height += 1200
                window.scrollTo(0, oo.Height);
                this.Time("time", 100, this.a02, this, oo)
            }
            else if (len2 == len && len != 0) {
                //表示一页商品不到60个的时后起做用。
                $("title").html("【" + oo.num + "】商品个数：60=60=60");
            }
            else {
                oo.num++;
                this.Time("time", 100, this.a02, this, oo)
            }
        }
    },
    ///////////////////////////////////////////////
    c01: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
    },
    c02: function (oo) {
        let elem = oo.get(0);
        // 创建事件.
        var event = document.createEvent('Event');
        // 初始化一个点击事件，可以冒泡，无法被取消
        event.initEvent('click', true, false);
        // 触发事件监听
        elem.dispatchEvent(event);
    },
    ///////////////////////////////////////////////////////////
    d01: function (page) {
        let dom = $("#main > div > div.t5pFIU > div > div > div > div > div > div.u37U8O > section > fieldset > div.shopee-mini-page-controller > a.shopee-button-outline.shopee-mini-page-controller__next-btn")
        if (dom.length == 0) {
            $("title").html("到不了这里");
        }
        else {
            $("title").html("已点下一页。");
            this.c02(dom);
            this.d02(page);
        }
    },
    d02: function (page) {
        this.Time("time", 100, this.d03, this, page)
    },
    d03: function (page) {
        let curren = $('.shopee-mini-page-controller__current').text()
        if (curren == "" + page) {
            $("title").html("已打开下一页。");
        }
        else {
            $("title").html("【" + curren + "=" + page + "】查看是否打开下一页...");
            this.d02(page);
        }
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
    },

}

// window.onscroll = function() {
//     var body = document.body;
//     var html = document.documentElement;
//     var scrollHeight = Math.max(body.scrollHeight, html.scrollHeight);
//     var clientHeight = html.clientHeight;
//     var scrollTop = window.pageYOffset || html.scrollTop || body.scrollTop;
//     // 检测是否滚动到底部
//     if ((scrollHeight - clientHeight - scrollTop) < 1) {
//         // 已经滚动到底部
//         console.log("已经滚动到底部");
//     }
// };
