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
        if (oo.code == "等待RenDie软件来操作出现验证码。") {
            this.d01()
        }
        else if (oo.code) {
            if (oo.code.left) {
                Tool.Time("name", 0, this.e01, this, oo.code);
            }
            else {
                $("#state").html('延时中。。。' + Tool.gettime(""));
                Tool.Time("name", 1000, this.a04, this);
            }
        }
        else {
            $("#state").html('延时中。。。' + Tool.gettime(""));
            Tool.Time("name", 1000, this.a04, this);
        }
    },
    ////////////////////////////
    d01: function () {
        win.rightClick1(781, 252, window.screen.width, window.screen.height, this.d03, this)
    },
    d03: function () {
        let path = win.currentPath() + "\\拼多多滑块验证\\4be627dd-64b1-4f06-8dea-0376de6e6617.png";
        win.copy(path)
        Tool.Time("name", 100, this.d04, this);
    },
    d04: function () {
        let arr = ["162◣50", "86◣50", "86◤50", "162◤500", "13◣50", "13◤50"]//粘贴+回车
        win.keyArr(arr, 0, this.d05, this)
    },
    d05: function () {
        let txt = '"ok"<r: db="sqlite.tool">update @.action set @.code=null where @.js=\'拼多多滑块验证.js\'</r:>'
        Tool.ajax.a01(txt, 1, this.d06, this);
    },
    d06: function (t) {
        if (t == "ok") {
            Tool.Time("name", 1000, this.a04, this);
        }
        else {
            //出错就重来
            this.d05();
            //Tool.pre(["出错", t])
        }
    },
    ///////////////////////////////////////////////
    e01: function (oo) {
        oo.screenX = Math.ceil(oo.screenX)
        oo.screenY = Math.ceil(oo.screenY)
        oo.left = Math.ceil(oo.left)
        oo.x = 0
        oo.y = 0;
        win.rightDown(oo.screenX + 20, oo.screenY + 100, window.screen.width, window.screen.height)
        this.e02(oo);
    },
    e02: function (oo) {
        let sign
        if (oo.x == oo.left) {
            Tool.Time("name", 100, this.e04, this, oo);
        }
        else if (oo.x > oo.left) {
            oo.x--
            oo.y = Tool.randomRange(1, 3)
            Tool.Time("name", Tool.randomRange(50, 100), this.e03, this, oo);
        }
        else {
            //快到的时后慢点
            if (oo.x > oo.left - 5) {
                sign = Tool.randomRange(1, 2) == 1 ? -1 : 1;//左右斗一下
                oo.x += Math.ceil(Math.random() * 3 * sign);
                oo.y = Tool.randomRange(1, 3)
                Tool.Time("name", 10, this.e03, this, oo);

            } else {
                oo.x += Tool.randomRange(1, 10);
                oo.y = Tool.randomRange(1, 5)
                Tool.Time("name", 10, this.e03, this, oo);
            }
        }

    },
    e03: function (oo) {
        win.setCursorPos(oo.screenX + 20 + oo.x, oo.screenY + 100 + oo.y)
        this.e02(oo)
    },
    e04: function (oo) {
        win.mRightUp(oo.screenX + 20 + oo.x, oo.screenY + 100 + oo.y, window.screen.width, window.screen.height)
        this.d05()
    },
}
fun.a01();