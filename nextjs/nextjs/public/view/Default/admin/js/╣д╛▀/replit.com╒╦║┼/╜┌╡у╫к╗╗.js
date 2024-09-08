var fun =
{
    a01: function () {
        //obj.params.jsFile       选择JS文件
        this.a02();
    },
    a02: function () {
        let html = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
            <tr><td><textarea rows="25" class="form-control" id="tool-form" wrap="off">https://v2rayse.com/node-convert\nhttps://www.bulianglin.com/archives/tosocks.html</textarea></td></tr>\
            <tr>\
                <td>\
                    <button type="button" class="btn btn-secondary" onclick="fun.c01(1)">从replit.com账号获取10个美国节点</button>\
                    <button type="button" class="btn btn-secondary" onclick="fun.c01(2)">从replit.com账号获取10个印度节点</button>\
                </td>\
            </tr>\
        </table>\
        </div>'
        Tool.html(null, null, html)
    },
    b01: function (val) {
        let arr = []
        if (val == 1) {
            arr = ["'North America'", "美国"]
        }
        else {
            arr = ["'Asia'", "印度"]
        }
        return arr;
    },
    c01: function (val) {
        let arr = this.b01(val)
        let str = '[0<r:replit db="sqlite.tool" size=10 where=" where @.serverLocation=' + arr[0] + ' order by @.outboundSize asc,@.sort asc,@.id asc">,\
        {\
            "url":"<:serverLocation tag=js/>--<:name tag=js/>.repl.co",\
            "username":"<:username tag=js/>",\
            "xray":<:xray tag=0/>\
        }\
        </r:replit>]'
        Tool.pre(str)
        //Tool.ajax.a01(str, 1, this.c02, this, arr[1])
    },
    c02: function (arr, name) {
        let nArr = [], url, uuid
        for (let i = 1; i < arr.length; i++) {
            url = arr[i].url.replace(" ", "");
            uuid = arr[i].xray.secrets_guid
            username = arr[i].username.split("@")[0];
            nArr.push("vless://" + uuid + "@" + url + ":443?encryption=none&security=tls&type=ws&host=&path=/" + uuid + "-vl#" + encodeURIComponent(i + "." + name + "-" + username))
        }
        $("#tool-form").val(nArr.join("\n"))
    },

}
fun.a01();