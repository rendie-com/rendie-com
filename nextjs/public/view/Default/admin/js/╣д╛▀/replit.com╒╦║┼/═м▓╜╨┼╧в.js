'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: {}
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        let html = Tool.header("正在同步信息...") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">用户名进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">用户名：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        //where @.outboundSize=0
        $("#state").html("正在获取账号信息...")
        let str = '{\
        <r:replit db="sqlite.tool" page=2 size=1 where=" where @.outboundSize<&gt;0 order by @.sort asc,@.id asc">\
            "username":"<:username tag=js/>",\
            "password":"<:password tag=js/>",\
            "loginmode":"<:loginmode tag=js/>",\
            "cookies":<:cookies tag=0/>,\
            "xray":<:xray tag=json/>,\
        </r:replit>\
        A2:' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '}'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        this.obj.Aarr = oo;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        let oo = this.obj.Aarr
        $("#username").html(oo.username)
        Tool.loginReplit.a01(oo.username, oo.password, oo.cookies, oo.loginmode, $("#state"), this.a06, this)
    },
    a06: function (t) {
        let itemCount = 0;
        if (t[0].indexOf('>You don\'t have any  Repls</span') == -1) {
            itemCount = t[0].split('class="css-wtm5vu"').length - 1
        }
        /////////////////////////////////////
        let url = "https://replit.com/account"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在进入设置页面...");
        gg.tabs_remove_create_indexOf(2, url, '/ 10.0 GiB',true, this.a07, this, itemCount)
    },
    a07: function (t, itemCount) {
        let serverLocation = Tool.StrSlice(t[0], '<path d="M13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg></span></div><span class="css-scxoy8" style="--fontSize: var(--font-size-default); --lineHeight: var(--line-height-default);">', '</span>')
        let name = Tool.StrSlice(t[0], '"username":"', '"')
        let outboundSize = Tool.StrSlice(t[0], '<span class="css-vkcinh"', "/ 10.0 GiB").split(">")[1]
        /////////////////////////////////////////
        this.a08(itemCount, serverLocation, name, outboundSize)
        //gg.tabs_remove_create_indexOf(2, url, 'class="css-wtm5vu"<1/>>You don\'t have any  Repls</span',true, this.a08, this, [])
    },
    a08: function (itemCount, serverLocation, name, outboundSize) {
        let sql = 'update @.replit set @.serverLocation=' + Tool.rpsql(serverLocation) + ',@.name=' + Tool.rpsql(name) + ',@.outboundSize=' + outboundSize + ',@.itemCount=' + itemCount + ' where @.username=' + Tool.rpsql(this.obj.Aarr.username)
        let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
        Tool.ajax.a01(str, 1, this.a09, this)
    },
    a09: function (t) {
        if (t == "") {
            $("#state").html("准备下一条。");
            this.obj.A1++;
            this.obj.Aarr = {}
            this.a03();
        }
        else {
            alert("出错")
        }
    }
}
fun.a01();
//d01: function () {
//        let oo = this.obj.Aarr;
//        oo.cookies = [{
//            url: "https://replit.com/~",
//            cookies: oo.cookies
//        }]
//        oo.xray = oo.xray.replace("//Asia.", "//Asia--")
//        oo.xray = oo.xray.replace("//NorthAmerica.", "//NorthAmerica--")
//        let sql = 'update @.replit set @.xray=' + Tool.rpsql(oo.xray) + ',@.cookies=' + Tool.rpsql(JSON.stringify(oo.cookies)) + ' where @.username=' + Tool.rpsql(this.obj.Aarr.username)
//        let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
//        Tool.ajax.a01(str, 1, this.a09, this)
//    },