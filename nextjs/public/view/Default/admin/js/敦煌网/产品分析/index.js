'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        if (obj.arr[3] == "js01") { Tool.scriptArr(['admin/js/敦煌网/产品分析/商品访问日志.js']); }
        else if (obj.arr[3] == "js02") { Tool.scriptArr(['admin/js/敦煌网/产品分析/产品分析.js']); }
        else if (obj.arr[3] == "js03") {
            Tool.scriptArr(['../../plugins/ua-parser/ua-parser.min.js', 'admin/js/敦煌网/产品分析/图片访问日志/从【客户端信息】中获取【系统信息】.js']);
        }
        else if (obj.arr[3] == "js04") { Tool.scriptArr(['admin/js/系统/访问日志/从IP中获取【国家】【归属地】信息.js']); }
        else if (obj.arr[3] == "js05") { Tool.scriptArr(['../../plugins/flot-0.8.3/jquery.flot.js', '../../plugins/flot-0.8.3/jquery.flot.pie.js', '../../plugins/flot-0.8.3/demo/jquery.flot.tooltip.min.js', 'admin/js/敦煌网/产品分析/操作系统占比/index.js']); }
        else if (obj.arr[3] == "js06") { Tool.scriptArr(['admin/js/敦煌网/产品分析/操作系统占比/获取新的操作系统.js']); }
        else if (obj.arr[3] == "js07") { Tool.scriptArr(['admin/js/敦煌网/产品分析/操作系统占比/统计操作系统的访问次数.js']); }
        else {
            obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
            obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
            obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//
            obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//
            obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//
            this.a02();
        }
    },
    a02: function () {
        let str = '\
        [\
          {"count":<@count/>,"size":30}\
          <r:dhgatelogimg db="sqlite.main" size=30 page=2 where="'+ this.b03() + ' order by @.uptime desc">\
          ,{\
            "proid":"<:proid/>",\
            "url":"<:url/>",\
            "fromURL":"<:fromURL tag=js/>",\
            "IP":"<:IP/>",\
            "OS":"<:OS/>",\
            "Browser":"<:Browser/>",\
            "Lang":"<:Lang/>",\
            "asn":<:asn tag=json/>,\
            "ct":"<:ct/>",\
            "addtime":<:addtime/>,\
            "uptime":<:uptime/>,\
            "timeLen":<:timeLen/>,\
            "count":<:count/>,\
            "user32":"<:user32/>",\
            "UserAgent":<:UserAgent tag=json/>,\
            "id":"<:id/>"\
          }\
          </r:dhgatelogimg>\
        ]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td class="left p-0">\
          <table class="table mb-0 table-bordered table-hover">\
          <tbody>\
          <tr>\
            <td class="right w90">当前地址：</td><td><a href="'+ arr[i].url + '" target="_blank">' + arr[i].url + '</a></td>\
          </tr>\
          <tr>\
            <td class="right">来源地址：</td><td><a href="'+ arr[i].fromURL + '" target="_blank">' + arr[i].fromURL + '</a></td>\
          </tr>\
          <tr>\
            <td class="right" nowrap>客户端信息：</td><td>'+ arr[i].UserAgent + '</td>\
          </tr>\
          </tbody>\
          </table>\
        </td>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered table-hover">\
          <tbody>\
						<tr><td title="商品编码">'+ arr[i].proid + '</td></tr>\
            <tr><td title="该用户【'+ arr[i].user32 + '】，对该编码，的访问次数">' + arr[i].count + ' 次</td></tr>\
            <tr><td title="该用户【'+ arr[i].user32 + '】，对该编码，从打开到刷新，的间隔时长">' + arr[i].timeLen + ' 秒</td></tr>\
          </tbody>\
          </table>\
        </td>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered table-hover">\
          <tbody>\
            <tr><td title="添加时间">'+ Tool.js_date_time2(arr[i].addtime).replace(" ", "<br/>") + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(arr[i].uptime).replace(" ", "<br/>") + '</td></tr>\
          </tbody>\
          </table>\
        </td>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered table-hover">\
          <tbody>\
          <tr><td title="【国家】归属地">'+ (arr[i].ct ? '【' + arr[i].ct + '】' : '&nbsp;') + (arr[i].asn ? arr[i].asn : '&nbsp;') + '</td></tr>\
          <tr>\
            <td title="公网IP">\
            '+ arr[i].IP + Tool.IpQuery(arr[i].IP) + '\
						<a href="javascript:;" onclick="fun.c04(\''+ arr[i].IP + '\')" title="删除该IP">\
						<svg class="i-trash" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />\
        		</svg>\
						</a>\
            </td>\
          </tr>\
          </tbody>\
          </table>\
        </td>\
        <td class="p-0">\
          <table class="table mb-0 table-bordered table-hover">\
          <tbody>\
            <tr><td title="操作系统">'+ (arr[i].OS ? arr[i].OS : '&nbsp;') + '</td></tr>\
            <tr><td title="语言">'+ (arr[i].Lang ? arr[i].Lang : '&nbsp;') + '</td></tr>\
            <tr><td title="浏览器">'+ (arr[i].Browser ? arr[i].Browser : '&nbsp;') + '</td></tr>\
          </tbody>\
          </table>\
        </td>\
      </tr>'
        }
        html += '<tr><td colspan="5" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main()" class="active">图片访问日志</div>\
          <div onclick="Tool.main(\'js01\')">商品访问日志</div>\
          <div onclick="Tool.main(\'js02\')">商品分析</div>\
          <div onclick="Tool.main(\'js05\')">操作系统占比</div>\
        </header>\
        <div class="input-group w-50 m-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b02(obj.arr[5]) + '</button>\
          <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c03(1)" value="1">商品编码</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(2)" value="2">当前地址</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(3)" value="3">来源地址</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(4)" value="4">本地公网IP</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(5)" value="5">操作系统</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(6)" value="6">浏览器</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(7)" value="7">语言</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(8)" value="8">客户端信息</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(9)" value="9">归属地</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(10)" value="10">国家</li>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[6] == "-_-20" ? "" : Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>\
        <div class="p-2">\
          <table class="table align-top center">\
            <thead class="table-light">'+ this.b01() + '</thead>\
            <tbody>'+ html + '</tbody>\
          </table>\
        </div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        return '\
    <tr>\
      <th class="left" style="padding-left: 30px;position: relative;">\
		<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li onClick="Tool.open5(\'js04\',\'dhgatelogimg\')"><a class="dropdown-item pointer">*从IP中获取【国家】【归属地】信息</a></li>\
          <li onClick="Tool.open5(\'js03\',\'dhgatelogimg\')"><a class="dropdown-item pointer">从【客户端信息】中获取【系统信息】</a></li>\
          <li onClick="fun.c05()"><a class="dropdown-item pointer">删除【归属地】中包含【云】【数据中心】的条目</a></li>\
          <li onClick="fun.c06()"><a class="dropdown-item pointer">删除【语言】中包含【zh】的条目</a></li>\
          <li onClick="fun.c07()"><a class="dropdown-item pointer">删除【语言】中包含【】的条目</a></li>\
          <li onClick="fun.c08()"><a class="dropdown-item pointer">删除【国家】中包含【中国】的条目</a></li>\
        </ul>\
				客户端信息\
			</th>\
      <th class="w100">访问</th>\
      <th class="w100">时间</th>\
      <th class="w170">IP信息</th>\
      <th class="w200">系统信息</th>\
    </tr>'
    },
    b02: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "当前地址"; break;
            case "3": name = "来源地址"; break;
            case "4": name = "本地公网IP"; break;
            case "5": name = "操作系统"; break;
            case "6": name = "浏览器"; break;
            case "7": name = "语言"; break;
            case "8": name = "客户端信息"; break;
            case "9": name = "归属地"; break;
            case "10": name = "国家"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b03: function () {
        let str = ""
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": str = " where @.proid='" + Tool.unescape(obj.arr[6]) + "'"; break;//商品编码
                case "2": str = " where @.url like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//当前地址
                case "3": str = " where @.fromurl like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//来源地址
                case "4": str = " where @.ip like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//本地公网IP
                case "5": str = " where @.os like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//操作系统
                case "6": str = " where @.Browser like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//浏览器
                case "7": str = " where @.lang like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//浏览器
                case "8": str = " where @.UserAgent like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//客户端信息
                case "9": str = " where @.asn like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//客户端信息
                case "10": str = " where @.ct like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//客户端信息
            }
        }
        return str;
    },
    c01: function () { },
    c02: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = Tool.escape(searchword);
            Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + $("#Field").val() + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (val) {
        let name = this.b02("" + val)
        $("#Field").html(name).val(val)
    },
    c04: function (ip) {
        let html = "delete from @.dhgatelogimg where @.ip='" + ip + "'";
        html = '""<r: db="sqlite.main">' + html + '</r:>';
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c05: function () {
        let html = "delete from @.dhgatelogimg where @.asn like '%云%' or @.asn like '%数据中心%'";
        html = '""<r: db="sqlite.main">' + html + '</r:>';
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c06: function () {
        let html = "delete from @.dhgatelogimg where @.lang like'%zh%'";
        html = '<r: db="sqlite.main">' + html + '</r:>';
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c07: function () {
        let html = "delete from @.dhgatelogimg where @.lang=''";
        html = '""<r: db="sqlite.main">' + html + '</r:>';
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c08: function () {
        let html = "delete from @.dhgatelogimg where @.ct='中国'";
        html = '""<r: db="sqlite.main">' + html + '</r:>';
        Tool.ajax.a01(html, 1, Tool.reload)
    }
}
fun.a01();