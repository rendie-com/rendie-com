'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : 0;//ID
        this.a02(obj.arr[4])
    },
    a02: function (id) {
        let str = '{\
        <r:replit db="sqlite.tool" size=1 where=" where @.id='+ id + '">\
          "name":<:name tag=json/>,\
          "username":<:username tag=json/>,\
          "serverLocation":<:serverLocation tag=json/>,\
          "xray":<:xray tag=0/>,\
          "id":<:id/>\
        </r:replit>}'
        Tool.ajax.a01(str, 1, this.a03, this)
    },
    a03: function (oo) {
        oo.serverLocation = oo.serverLocation.replace(/ +/g, "");
        let serverLocation
        if (oo.serverLocation == "Asia") {
            serverLocation = "印度"
        }
        else if (oo.serverLocation == "NorthAmerica") {
            serverLocation = "美国"
        }
        else {
            serverLocation = "未知"
        }
        serverLocation += "-" + oo.username.split("@")[0];
        let url = oo.xray.secrets_url.substr(8)
        let uuid = oo.xray.secrets_guid
        ///////////////////////////////////////////////////////////////////
        let o1 = {
            v: 2,
            ps: serverLocation +"-vmess",
            add: url,
            port: 443,
            id: uuid,
            aid: 0,
            net: "ws",
            type: "none",
            host: url,
            path: "/" + uuid + "-vm",
            tls: "tls"
        }
        let vmess = "vmess://" + new Base64().encode(JSON.stringify(o1));
        ////////////////////////////////////////////////////////////////
        let vless = "vless://" + uuid + "@" + url + ":443?encryption=none&security=tls&type=ws&host=" + url + "&path=/" + uuid + "-vl#" + encodeURIComponent(serverLocation +"-vless")
        //////////////////////////////////////////////////////////////////
        let trojan = "trojan://" + uuid + "@" + url + ":443?security=tls&type=ws&host="+url+"&path=/" + uuid + "-tr#" + encodeURIComponent(serverLocation + "-trojan")
        /////////////////////////////////////////////////////////////////
        let html = '\
        <header class="panel-heading"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>replit.com账号 -&gt; 查看Xray配置</header>\
        <div class="p-2">\
        '+ this.b01("1：vmess+ws+tls 配置明文如下", url, uuid, "vm", vmess) + '\
        '+ this.b01("2：vless+ws+tls 配置明文如下", url, uuid, "vl", vless) + '\
        '+ this.b01("3：trjan+ws+tls 配置明文如下", url, uuid, "tr", trojan) + '\
        '+ this.b02(url, uuid, "ss") + '\
        '+ this.b03(url, uuid, "so") + '\
        </div>'
        let arr = [vmess, vless, trojan]
        Tool.html(this.a04, this, html, arr);
    },
    a04: function (arr) {
        new ClipboardJS('.btn-clipboard');
        new QRCode(document.getElementById("qrcode_vm"), {
            text: arr[0],
            width: 300,
            height: 300,
            correctLevel: 0 // 二维码结构复杂性 0~3
        });
        new QRCode(document.getElementById("qrcode_vl"), {
            text: arr[1],
            width: 300,
            height: 300,
            correctLevel: 0 // 二维码结构复杂性 0~3
        });
        new QRCode(document.getElementById("qrcode_tr"), {
            text: arr[2],
            width: 300,
            height: 300,
            correctLevel: 0 // 二维码结构复杂性 0~3
        });
    },
    b01: function (name, url, uuid, path, str) {
        return '\
        <table class="table table-hover align-middle">\
            <thead class="table-light"><tr><th colspan="2">'+ name + '</th></tr></thead>\
            <tbody>\
            <tr>\
              <td class="right w150">三维码：</td>\
              <td id="qrcode_'+ path + '"></td>\
            </tr>\
            <tr>\
            <td class="right">链接：</td>\
            <td>\
                <div class="bd-clipboard w-100">\
                <textarea id="str_'+ path + '" rows="5" class="form-control form-control">' + str + '</textarea>\
                <button class="btn-clipboard" data-clipboard-target="#str_'+ path + '">复制</button>\
                </div>\
            </td>\
            </tr>\
            <tr>\
              <td class="right">服务器地址：</td>\
              <td>'+ url + '</td>\
            </tr>\
            <tr>\
              <td class="right">端口：</td>\
              <td>443</td>\
            </tr>\
            <tr>\
              <td class="right">'+ (path == "tr" ? "密码" : "uuid") + '：</td>\
              <td>'+ uuid + '</td>\
            </tr>\
            <tr>\
              <td class="right">传输协议：</td>\
              <td>ws</td>\
            </tr>\
            <tr>\
              <td class="right">host/sni：</td>\
              <td>'+ url + '</td>\
            </tr>\
            <tr>\
              <td class="right">path路径：</td>\
              <td>/'+ uuid + '-' + path + '</td>\
            </tr>\
            <tr>\
              <td class="right">tls：</td>\
              <td>开启</td>\
            </tr>\
          </tbody>\
        </table>'
    },
    b02: function (url, uuid, path, str) {
        return '\
        <table class="table table-hover align-middle">\
            <thead class="table-light"><tr><th colspan="3">4：shadowsocks+ws+tls 配置明文如下</th></tr></thead>\
            <tbody>\
            <tr>\
              <td class="right w150">服务器地址：</td>\
              <td>'+ url + '</td>\
            </tr>\
            <tr>\
              <td class="right">端口：</td>\
              <td>443</td>\
            </tr>\
            <tr>\
              <td class="right">密码：</td>\
              <td>'+ uuid + '</td>\
            </tr>\
            <tr>\
              <td class="right">加密方式：</td>\
              <td>chacha20-ietf-poly1305</td>\
            </tr>\
            <tr>\
              <td class="right">传输协议：</td>\
              <td>ws</td>\
            </tr>\
            <tr>\
              <td class="right">host/sni：</td>\
              <td>'+ url + '</td>\
            </tr>\
            <tr>\
              <td class="right">path路径：</td>\
              <td>/'+ uuid + '-' + path + '</td>\
            </tr>\
            <tr>\
              <td class="right">tls：</td>\
              <td>开启</td>\
            </tr>\
          </tbody>\
        </table>'
    },
    b03: function (url, uuid, path, str) {
        return '\
        <table class="table table-hover align-middle">\
           <thead class="table-light"><tr><th colspan="3">5：socks+ws+tls 配置明文如下</th></tr></thead>\
           <tbody>\
            <tr>\
              <td class="right w150">服务器地址：</td>\
              <td>'+ url + '</td>\
            </tr>\
            <tr>\
              <td class="right">端口：</td>\
              <td>443</td>\
            </tr>\
            <tr>\
              <td class="right">用户名：</td>\
              <td>'+ uuid + '</td>\
            </tr>\
            <tr>\
              <td class="right">密码：</td>\
              <td>'+ uuid + '</td>\
            </tr>\
            <tr>\
              <td class="right">传输协议：</td>\
              <td>ws</td>\
            </tr>\
            <tr>\
              <td class="right">host/sni：</td>\
              <td>'+ url + '</td>\
            </tr>\
            <tr>\
              <td class="right">path路径：</td>\
              <td>/'+ uuid + '-' + path + '</td>\
            </tr>\
            <tr>\
              <td class="right">tls：</td>\
              <td>开启</td>\
            </tr>\
          </tbody>\
        </table>'
    }
}
fun.a01();