'use strict';
var fun =
{
    a01: function () {
        //obj.arr[3]            选择JS文件
        this.a02();
    },
    a02: function () {
        let html = Tool.header('已打开动作【' + Tool.action.name + '】') + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
			<tr>\
				<td class="right w150">提示：</td>\
				<td id="state" ></td>\
			</tr>\
		</table>\
		</div>'
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        win.isRD(this.a04, this)
    },
    a04: function () {
        let str = '\
		{\
            <r:action db="sqlite.tool" size=1 where=" where @.id='+ obj.arr[5] + '">\
	            "code":<:code tag=0/>\
            </r:action>\
        }'
        Tool.ajax.a01(str, 1, this.a05, this)
    },
    a05: function (oo) {
        if (oo.code == "等待RenDie软件来滑动滑块。") {
            this.d01();
        }
        else {
            $("#state").html('延时中。。。' + Tool.gettime(""));
            Tool.Time("name", 1000, this.a04, this);
        }
    },
    ///////////////////////////////////////////////
    d01: function () {
        let oo = {
            clientX: Tool.randomRange(832, 842), screenY: Tool.randomRange(692, 700),//鼠标初始位置
            left: 255,//移动距离
            x: 0, y: 0//移动位置
        }
        Tool.Time("name", 1000, this.d01A, this,oo);
    },
    d01A: function (oo) {
        win.rightClick1(Tool.randomRange(100, 800), Tool.randomRange(100, 800), window.screen.width, window.screen.height, this.d01B, this,oo)
    },
    d01B: function (oo) {
        Tool.Time("name", 1000, this.d01C, this, oo);
    },
    d01C: function (oo) {
        win.rightDown(oo.clientX, oo.screenY, window.screen.width, window.screen.height);
        this.d02(oo);
    },
    d02: function (oo) {
        let sign
        if (oo.x > oo.left) {
            Tool.Time("name", Tool.randomRange(3000, 5000), this.d04, this, oo);
        }
        else {
            //快到的时后慢点
            if (oo.x > oo.left - 5) {
                sign = Tool.randomRange(1, 2) == 1 ? -1 : 1;//左右斗一下
                oo.x += Math.ceil(Math.random() * 3 * sign);
                oo.y = Tool.randomRange(1, 3)
                Tool.Time("name", 10, this.d03, this, oo);
            } else {
                oo.x += Tool.randomRange(10, 15);
                oo.y = Tool.randomRange(1, 3)
                Tool.Time("name", 10, this.d03, this, oo);
            }
        }
    },
    d03: function (oo) {
        win.setCursorPos(oo.clientX + oo.x, oo.screenY + oo.y)
        this.d02(oo)
    },
    d04: function (oo) {
        win.mRightUp(oo.clientX + oo.x, oo.screenY + oo.y, window.screen.width, window.screen.height)
        Tool.Time("name", 2000, this.d05, this, oo);
    },
    d05: function (oo) {
        win.rightClick1(oo.clientX, oo.screenY, window.screen.width, window.screen.height, this.d06, this)
    },
    d06: function () {
        let txt = '"ok"<r: db="sqlite.tool">update @.action set @.code=null where @.js=\'1688滑块验证.js\'</r:>'
        Tool.ajax.a01(txt, 1, this.d07, this);
    },
    d07: function (t) {
        if (t == "ok") {
            Tool.Time("name", 1000, this.a04, this);
        }
        else if (typeof (t) == "object") {
            Tool.Time("name", 100, this.d06, this);
        }
        else {
            Tool.pre(["1688滑块验证出错", t])
        }
    },
}
fun.a01();