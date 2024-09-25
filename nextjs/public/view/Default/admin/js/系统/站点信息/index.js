'use strict';
var fun =
{
    a01: function () {
        let str = '\
        {\
          "OSDes":"<.OSDes/>",\
          "ServerName":"<.ServerName/>",\
          "TickCount":<.TickCount/>,\
          "GetIp":"<.GetIp/>",\
          "GetLocalIp":"<.GetLocalIp/>",\
          "SessionCount":"<.SessionCount/>",\
          "CookiesCount":"<.CookiesCount/>",\
          "ConfigCount":"<.ConfigCount/>",\
          "now":"<.Now/>",\
          "HeadersCount":"<.HeadersCount/>",\
          "EnvironmentCount":"<.EnvironmentCount/>",\
          "V":"<.V/>",\
          "CacheTime":"<.CacheTime/>",\
          "ClientInfo":"<.ClientInfo/>",\
          <r:manager where=" where @.name='+ Tool.rpsql(Tool.getStorage("name")) + '" size=1>\
		    "LoginTime":"<:LoginTime/>",\
		    "LoginIP":"<:LoginIP/>",\
		    "LoginTimes":"<:LoginTimes/>",\
		    "LastLoginTime":"<:LastLoginTime/>",\
		    "LastLoginIP":"<:LastLoginIP/>"\
          </r:manager>\
        }'
        Tool.ajax.a01(str, 1, this.a02, this);
    },
    a02: function (oo) {
        let str = '\
        <header class="panel-heading">站点信息</header>\
        <div class="p-2">\
        <table class="table table-hover align-middle">\
            <tbody>\
            <tr>\
                <td class="right">服务器操作系统：</td><td>'+ oo.OSDes + '</td>\
                <td class="right">服务器地址：</td><td>'+ oo.ServerName + '</td>\
            </tr>\
            <tr>\
                <td class="right">服务器已启动：</td><td id="TickCountTime"></td>\
                <td class="right">服务器时间：</td><td>'+ Tool.js_date_time2(oo.now) + '</td>\
            </tr>\
            <tr>\
                <td class="right">服务器Ipv4和ipv6：</td><td colspan="3">'+ this.b01(oo.GetLocalIp) + '</td>\
            </tr>\
            <tr>\
                <td class="right">当前公网IP：</td><td>'+ oo.GetIp + Tool.IpQuery(oo.GetIp) + '</td>\
                <td class="right">临时保存：</td>\
	            <td>\
		            Session（<a href="javascript:" onclick="Tool.Session.a01();">'+ oo.SessionCount + ' 个</a>）\
		            cookies（<a href="javascript:" onclick="Tool.cookies.a01();">'+ oo.CookiesCount + ' 个</a>）\
	            </td>\
            </tr>\
            <tr>\
                <td class="right">上次登陆时间：</td>\
                <td>'+ Tool.js_date_time2(oo.LastLoginTime) + '（IP:' + oo.LastLoginIP + Tool.IpQuery(oo.LastLoginIP) + '）</td>\
                <td class="right">坏境变量：</td>\
	            <td>\
		            Headers\
		            （<a href="javascript:" onclick="Tool.Headers.a01();">'+ oo.HeadersCount + ' 个</a>）\
		            GetEnvironmentVariables\
		            （<a href="javascript:" onclick="Tool.GetEnvironmentVariables.a01();">'+ oo.EnvironmentCount + ' 个</a>）\
	            </td>\
            </tr>\
            <tr>\
                <td class="right">登陆时间：</td><td>\
                '+ Tool.js_date_time2(oo.LoginTime) + '（IP:' + oo.LoginIP + Tool.IpQuery(oo.LoginIP) + '）,已登录 <strong>' + oo.LoginTimes + '</strong> 次。\
                </td>\
                <td class="right">缓存：</td>\
                <td>\
                配置 （<a href="javascript:" onclick="Tool.ArrConfig.a01();">'+ oo.ConfigCount + ' 个</a>）\
                视图\
                （<a href="javascript:" onclick="fun.xxx();">x 个</a>）\
                </td>\
            </tr>\
            <tr>\
            <td class="right">功能直达：</td>\
	            <td>\
		            <a href="javascript:" onclick="Tool.EnvironmentInfo.a01();">运行信息</a> &nbsp;|&nbsp;\
		            <a href="javascript:" onclick="Tool.EnvironmentInfo.a03();">系统运行平台</a> &nbsp;|&nbsp;\
		            <a href="javascript:" onclick="Tool.EnvironmentInfo.a04();">运行环境</a> &nbsp;|&nbsp;\
		            <a href="javascript:" onclick="Tool.AllDrives.a01();">磁盘</a> &nbsp;|&nbsp;\
		            <a href="javascript:" onclick="Tool.EnvironmentInfo.a05();">网卡</a> &nbsp;|&nbsp;\
		            <a href="javascript:" onclick="Tool.AreaProcesses.a01();">进程</a> &nbsp;|&nbsp;\
		            <a href="javascript:" onclick="fun.c26();">反射【web.dll】</a>\
                </td>\
                <td class="right">【web.dll】版本号：</td><td>'+ Tool.js_date_time2(oo.V) + '（未注册）</td>\
            </tr>\
            <tr>\
                <td class="right">客户端信息：</td><td colspan="3">'+ oo.ClientInfo + '</td>\
            </tr>\
            <tr>\
                <td class="right">服务器操作：</td><td colspan="3">\
		            <a href="javascript:;" onclick="fun.c30(\'shutdown,-r now\')">重启服务器</a> &nbsp;|&nbsp;\
		            <a href="javascript:" onclick="fun.c30(\'nginx,-s reload \');">重启【nginx】</a>\
	            </td>\
            </tr>\
            <tr>\
                <td class="right">项目已启动：</td><td title="也是缓存时间" id="CacheTime" colspan="3"></td>\
            </tr>\
        </tbody>\
        </table>\
        </div>'
        Tool.html(this.a03, this, str, [Tool.int(oo.TickCount / 1000), ((new Date()).getTime() - oo.CacheTime * 1000) / 1000]);
    },
    a03: function (arr) {
        this.a04(["#TickCountTime", arr[0], "1"]);
        this.a04(["#CacheTime", arr[1], "2"]);
    },
    a04: function (arr) {
        let day1 = Math.floor(arr[1] / (60 * 60 * 24))
        let hour = Math.floor((arr[1] - day1 * 24 * 60 * 60) / 3600);
        let minute = Math.floor((arr[1] - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        let second = Math.floor(arr[1] - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        $(arr[0]).html("" + day1 + "天" + hour + "小时" + minute + "分" + second + "秒")
        arr[1]++
        Tool.Time(arr[2], 1000, this.a04, this, arr);
    },
    b01: function (ip) {
        let arr1 = ip.split(","), arr2 = []
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(arr1[i] + Tool.IpQuery(arr1[i]))
        }
        return arr2.join(" ");
    },
}
fun.a01();

//c07: function () {
//    Tool.ajax.a01('<.areaCache()/>', 1, this.c08, this);
//},
//c08: function (oo) {
//    Tool.pre(oo)
//    let str = '';
//    let arr = t.split("<2/>"), arr2 = []
//    for (let i = 0; i < arr.length - 1; i++) {
//        arr2 = arr[i].split("<1/>")
//        str += '<tr>\
//        <td>'+ arr2[0] + '</td>\
//        <td class="left">'+ arr2[1] + '</td>\
//        <td class="left">'+ arr2[2] + '</td>\
//      </tr>'
//    }
//    let html = '\
//      <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>Cache 变量列表</header>\
//      <div class="p-2">\
//        <table class="table table-hover align-middle center">\
//          <thead class="table-light">\
//            <tr><th class="w50">编号</th><th class="left">变量名称</th><th class="left">值</th></tr>\
//          </thead>\
//          <tbody>'+ str + '</tbody>\
//        </table>\
//      </div>'
//    Tool.html(null, null, html);
//},

///////////////////////////////////////////////////////////////////////////////////////
//c01: function () { Tool.ajax.a01( "<.areaApplication()/>",1,this.c02, this); },//Application
//c02: function (arr) {
//    let html = '';
//    for (let i = 0; i < arr.length; i++) {
//        html += '\
//			<tr>\
//        <td>'+ (i + 1) + '</td>\
//        <td>'+ arr[i].time + '</td>\
//        <td>'+ arr[i].timeNum + ' 分钟</td>\
//        <td class="left"><a href="javascript:;" onclick="fun.c03($(this))" title="点击查看内容">'+ arr[i].name + '</a></td>\
//      </tr>'
//    }
//    html = '\
//      <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>Application 变量列表</header>\
//      <div class="p-2">\
//        <table class="table table-hover align-middle center">\
//          <thead class="table-light">\
//            <tr>\
//							<th class="w50">编号</th>\
//							<th class="w250">创建时间</th>\
//							<th class="w100">创建多久</th>\
//							<th class="left">变量名称</th>\
//						</tr>\
//          </thead>\
//          <tbody>'+ html + '</tbody>\
//        </table>\
//      </div>'
//    Tool.html(null, null, html);
//},
//c03: function (This) {
//    let name = This.html()
//    Tool.ajax.a01( '""<.getApplication("+name+")/>',1,this.c04, this,  name);
//},
//c04: function (t, name) {
//    let html = '\
//    <header class="panel-heading"><a class="arrow_back" onclick="fun.c01();"></a>Application 变量内容</header>\
//		<div class="p-2">\
//      <table class="table table-hover align-middle center">\
//        <tbody>\
//        <tr><td class="right w100">变量名称：</td><td>'+ name + '</td></tr>\
//        <tr>\
//          <td class="right">变量内容：</td>\
//          <td><textarea style="width:100%;height:400px;" wrap="off">'+ t + '</textarea></td>\
//        </tr>\
//        </tbody>\
//      </table>\
//    </div>'
//    Tool.html(null, null, html);
//},

//gg.proxy("","fun.c31")
//gg.resetProxy("fun.c31")