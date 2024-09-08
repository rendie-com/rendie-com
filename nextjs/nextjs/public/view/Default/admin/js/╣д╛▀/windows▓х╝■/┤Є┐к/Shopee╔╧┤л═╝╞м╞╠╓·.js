'use strict';
var fun =
{
    obj:
    {
        time: null,//记录运行时长
    },
    a01: function () {
        let html = Tool.header('已打开动作【' + Tool.action.name + '】') + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
            <tbody>\
                <tr>\
                    <td class="w150 right">操作：</td>\
                    <td><button class="btn btn-outline-secondary" type="button" id="RunningTheHelper" onclick="fun.c01();">运行铺助程序</button></td>\
                </tr>\
                <tr><td class="w150 right">下载地址：</td><td id="srcA"></td></tr>\
                <tr><td class="w150 right">上传地址：</td><td id="srcB"></td></tr>\
                <tr><td class="w150 right">提示：</td><td id="state"></td></tr>\
                <tr><td class="w150 right">说明：</td><td>当【code】字段，收到数据会自动执行。</td></tr>\
                <tr>\
                    <td class="w150 right">步骤：</td>\
                    <td>\
                    （1）定时检查是否接收到数据。<br/>\
                    （2）当接收到数据后，点击【添加图片】按扭<br/>\
                    （3）然后下载<br/>\
                    （4）然后复制下载好的【视频地址】<br/>\
                    （5）然后【Ctrl+V】+【回车】，<br/>\
                    （6）最后清空接收信息和剪贴板，回到第一步。\
                    </td>\
                </tr>\
            </tbody>\
        </table>\
        </div>'
        Tool.html(this.a03, this, html);
    },
    c01: function () {
        win.isRD(this.c02, this)
    },
    c02: function () {
        this.obj.time = new Date();
        $("#RunningTheHelper").attr("disabled", true);
        this.c03()
    },
    c03: function () {
        let str = '<r:action db="sqlite.tool" size=1 where=" where @.id=' + obj.arr[5] + '"><:code tag=0/></r:action>'
        $("#state").html('正在查询数数据，是否存在。。。');
        Tool.ajax.a01(str, 1, this.c04, this)
    },
    c04: function (pic) {
        if (pic == 0) {
            $("#RunningTheHelper").html("已运行：" + Tool.dateDHM(new Date(), this.obj.time, "s"))
            Tool.Time("name", 500, this.c03, this);
        }
        else if (pic.indexOf("Downloads") != -1) {
            this.c05(pic)
        }
        else {
            this.c03()
        }
    },
    c05: function (pic) {
        win.rightClick1(737, 266, window.screen.width, window.screen.height, this.c06, this, pic);//点【添加图片】
    },
    c06: function (pic) {
        $("#srcA").html(pic);
        $("#state").html('正在【复制】。。。');
        win.copy(pic)
        Tool.Time("name", 500, this.c08, this);
    },
    c08: function () {
        $("#state").html('正在【粘贴】。。。');
        let arr = ["162◣50", "86◣50", "86◤50", "162◤500", "13◣50", "13◤50"]//粘贴+回车
        win.keyArr(arr, 0, this.c09, this)//粘贴+回车
    },
    c09: function () {
        $("#state").html('正在清空【code】字段内容。。。');
        win.clipboardClear()//清空剪贴板
        let str = '"ok"<r: db="sqlite.tool">update @.action set @.code=null where @.id=' + obj.arr[5] + '</r:>'
        Tool.ajax.a01(str, 1, this.c10, this)
    },
    c10: function (t) {
        if (t == "ok") {
            $("#srcA,#srcB").html("");
            $("#state").html('正在等待上传结果。。。');
            this.c04(0)//延时
        }
        else {
            alert("出错" + t);
        }
    }
}
fun.a01();