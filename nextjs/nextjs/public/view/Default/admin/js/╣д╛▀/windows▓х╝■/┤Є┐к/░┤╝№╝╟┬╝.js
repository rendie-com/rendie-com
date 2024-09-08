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
				<td class="right w150">X轴：</td>\
				<td><input type="text" id="X" class="form-control center w150" disabled/></td>\
			</tr>\
			<tr>\
				<td class="right">Y轴：</td>\
				<td><input type="text" id="Y" class="form-control center w150" disabled/></td>\
			</tr>\
			<tr>\
				<td class="right">键值：</td>\
				<td><input type="text" id="KEY1" class="form-control center w150" disabled/></td>\
			</tr>\
			<tr>\
				<td class="right">键值码：</td>\
				<td><input type="text" id="KEY2" class="form-control center w150" disabled/></td>\
			</tr>\
			<tr>\
				<td class="right">当前时间：</td>\
				<td id="time"></td>\
			</tr>\
			<tr>\
				<td class="right">按键状态：</td>\
				<td id="KEY"></td>\
			</tr>\
		</table>\
		</div>'

        Tool.html(this.a03, this, html);
    },
    a03: function () {
        $(document).keydown(function (event) {
            let keyName
            switch (event.which) {
                case 8: keyName = "[退格]"; break;
                case 9: keyName = "[制表]"; break;
                case 13: keyName = "[回车]"; break;
                case 32: keyName = "[空格]"; break;
                case 33: keyName = "[PageUp]"; break;
                case 34: keyName = "[PageDown]"; break;
                case 35: keyName = "[End]"; break;
                case 36: keyName = "[Home]"; break;
                case 37: keyName = "[方向键左]"; break;
                case 38: keyName = "[方向键上]"; break;
                case 39: keyName = "[方向键右]"; break;
                case 40: keyName = "[方向键下]"; break;
                case 46: keyName = "[删除]"; break;
                default: keyName = String.fromCharCode(event.which); break;
            }
            $("#KEY1").val(keyName);
            $("#KEY2").val(event.which);
        });
        this.a04()
    },
    a04: function () {
        Tool.Time("time", 1000, this.b02, this);
        win.isRD(this.a05, this)
    },
    a05: function () {
        Tool.Time("getXY", 50, this.b01, this);//反复获取XY座标
    },
    b01: function () {
        let Arr = win.getXY()
        $("#X").val(Arr[0]);
        $("#Y").val(Arr[1]);
        let key13 = win.getAsyncKeyState(13)
        if (key13 != 0) {
            if (key13 & 0x8000) {
                $("#KEY").append(" 按下：" + key13 + " ")
            }
            else {
                $("#KEY").append(" 松开：" + key13 + " <br/>")
            }
        }
        Tool.Time("getXY", 50, this.b01, this);
    },
    b02: function () {
        $("#time").html(Tool.js_date_time(Date.now(), "-"));
        Tool.Time("time", 1000, this.b02, this);
    },
}
fun.a01();

//    b03: function (keycode) {
//        let str = ""
//        switch (keycode) {
//            case 8: str = "退格"; break;
//            case 9: str = "Tab"; break;
//            case 19: str = "Pausc"; break;
//            case 13: str = "回车"; break;
//            case 20: str = "大写锁定"; break;
//            case 27: str = "Esc"; break;
//            case 32: str = "空格键"; break;
//            case 33: str = "PgUp"; break;
//            case 34: str = "PgDn"; break;
//            case 35: str = "End"; break;
//            case 36: str = "Home"; break;
//            case 37: str = "左箭头"; break;
//            case 38: str = "上箭头"; break;
//            case 39: str = "右箭头"; break;
//            case 40: str = "下箭头"; break;
//            case 44: str = "PrtSc"; break;
//            case 45: str = "Ins"; break;
//            case 46: str = "Del"; break;
//            case 93: str = "菜单键"; break;
//            case 112: str = "F1"; break;
//            case 113: str = "F2"; break;
//            case 114: str = "F3"; break;
//            case 115: str = "F4"; break;
//            case 116: str = "F5"; break;
//            case 117: str = "F6"; break;
//            case 118: str = "F7"; break;
//            case 119: str = "F8"; break;
//            case 120: str = "F9"; break;
//            case 121: str = "F10"; break;
//            case 122: str = "F11"; break;
//            case 123: str = "F12"; break;
//            case 145: str = "ScrLk"; break;
//            case 160: str = "左Shift"; break;
//            case 161: str = "右Shift"; break;
//            case 162: str = "左Ctrl"; break;
//            case 163: str = "右Ctrl"; break;
//            case 164: str = "左Alt"; break;
//            case 165: str = "右Alt"; break;
//            case 186: str = ";"; break;
//            case 187: str = "="; break;
//            case 189: str = "-"; break;
//            case 192: str = "`"; break;
//            case 219: str = "["; break;
//            case 220: str = "\\"; break;
//            case 221: str = "]"; break;
//            case 222: str = "'"; break;
//            case 1048576: str = "鼠标右键"; break;
//            case 2097152: str = "鼠标左键"; break;
//            case 8388608: str = "鼠标向后"; break;
//            case 16777216: str = "鼠标向前"; break;
//            default: str = String.fromCharCode(keycode);
//        }
//        return str;
//    },
//    c01: function (This, L) {
//        if (!This.prop("disabled")) {
//            This.attr("disabled", true);
//            if (This.prop('checked')) {
//                win.init();
//                Tool.Time("getXY", 50, this.b01, this);//反复获取XY座标
//                Tool.Time("KEY", 1000, this.b02, this);//反复获取按键值
//            }
//            else {
//                win.stop();
//            }
//            This.attr("disabled", false);
//        }
//        else {
//            alert("正在修改设置，请稍等。");
//        }
//    },
//    c02: function (This, L) {
//        if (This.prop('checked')) {
//            win.setIsKey(true);
//        }
//        else {
//            win.setIsKey(false);
//        }
//    }