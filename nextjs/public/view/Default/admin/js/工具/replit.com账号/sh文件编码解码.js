//'use strict';注：这个不能取消注释，因为有个eval,要用上。
var fun =
{
    obj: {
        start: 'bash -c "$(base64 -d <<< "',
        end: '")" bash "$@";'
    },
    a01: function () {
        //obj.params.jsFile       选择JS文件
        this.a02();
    },
    a02: function () {
        let html = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
            <tr><td><textarea rows="25" class="form-control" id="tool-form"></textarea></td></tr>\
            <tr>\
                <td>\
                    <button type="button" class="btn btn-info" onclick="fun.c01();">删除注释</button>\
                    <button type="button" class="btn btn-success" onclick="fun.c02();">base64编码</button>\
                    <button type="button" class="btn btn-success" onclick="fun.c03();">base64解码</button>\
                    <button type="button" class="btn btn-warning" onclick="fun.c04();">base64+eval编码</button>\
                    <button type="button" class="btn btn-warning" onclick="fun.c05();">base64+eval解码</button>\
                    <button type="button" class="btn btn-secondary" onclick="fun.c08();">原base64编码</button>\
                    <button type="button" class="btn btn-secondary" onclick="fun.c09();">原base64解码</button>\
               </td>\
            </tr>\
          </table>\
        </div>'
        Tool.html(null, null, html)
    },
    //删除注释
    b01: function (str,len) {
        let tr
        if (len != -1) {
            let valR = str.substring(len + 1, len + 2);
            if (valR == "!") {//“#”的右边是“!”,则不是注释，不删除。
                tr = str;
            }
            else {
                if (len == 0) {//第一个是“#”，且不是“!”，则一定是注释
                    tr = "";
                }
                else {
                    let valL = str.substring(len - 1, len);//“#”左边一个,是空格,那一样是注释。
                    if (valL == " ") {
                        tr = str.substring(0, len)
                    }
                    else {
                        tr = str;
                    }
                }
            }
        }
        else {
            tr = str;
        }
        return tr;
    },
    c01: function () {
        let dom = $("#tool-form");
        let arr1 = dom.val().split("\n")
        let str = ""
        for (let i = 0; i < arr1.length; i++) {
            arr1[i] = arr1[i].replace(/^ +|^	+| +$/g, "")//去掉前后的空格
            if (arr1[i]) {//去掉空行
                let tr = this.b01(arr1[i], arr1[i].lastIndexOf("#"));//从右开始删除注释
                tr = this.b01(tr, tr.indexOf("#"));//从左开始删除注释
                if (str == "") {
                    str = tr;
                }
                else {
                    if (tr != "") {//去掉空行
                        str += "\n" + tr;
                    }
                }
            }
        }
        dom.val(str);
    },
    c02: function () {
        let dom = $("#tool-form");
        let str = this.obj.start + new Base64().encode(dom.val()) + this.obj.end;
        dom.val(str);
    },
    c03: function () {
        let dom = $("#tool-form");
        let des = dom.val()
        if (des.substring(0, this.obj.start.length) == this.obj.start) {
            des = des.substring(this.obj.start.length, des.length - this.obj.end.length)
            let str = new Base64().decode(des);
            dom.val(str);
        } else {
            Tool.at('不是以【' + this.obj.start + '】开头且以【' + this.obj.end + '】，不能解码。')
        }
    },
    c04: function () {
        let dom = $("#tool-form");
        let des = this.obj.start + new Base64().encode(dom.val()) + this.obj.end;
        let str = "", nameArr = [], seelp = Tool.randomRange(10,20);//每次点击都会变
        if (des.substring(0, this.obj.start.length) == this.obj.start) {
            for (let i = 0; i < des.length; i += seelp) {
                let name1 = "z" + i / seelp;
                nameArr.push(name1)
                let varue1 = des.substring(i, i + seelp).replace(/'/g, "\\'")
                str += name1 + "='" + varue1 + "';";
            }
            str += "eval \"$" + nameArr.join("$") + "\";";
            dom.val(str);
        }
        else {
            Tool.at('不是以【' + this.obj.start + '】开头且以【' + this.obj.end + '】，不能解码。')
        }
    },
    c05: function () {
        let dom = $("#tool-form");
        let des = dom.val()
        if (des.indexOf("eval \"$") != -1) {
            this.c06(des, dom);
        }
        else {
            Tool.at('没有【eval "$】，不能解码。')

        }
    },
    c06: function (des, dom) {
        let arr1 = des.split("eval \"$")
        let name = arr1[1].substring(0, arr1[1].indexOf("\""))
        name = name.replace(/\$/g, "+");
        arr1[0] = arr1[0].replace(/\\/g, "\\\\");
        arr1[0] = arr1[0].replace(/\n/g, " ");
        eval(arr1[0] + "\n var temp_str=" + name)
        this.c07(temp_str, dom)
    },
    c07: function (des, dom) {
        if (des.substring(0, this.obj.start.length) == this.obj.start) {
            des = des.substring(this.obj.start.length, des.length - this.obj.end.length)
            let str = new Base64().decode(des);
            dom.val(str);
        }
        else {
            dom.val(des);
        }
    },
    c08: function () {
        let dom = $("#tool-form");
        let str = new Base64().encode(dom.val());
        dom.val(str);
    },
    c09: function () {
        let dom = $("#tool-form");
        let str = new Base64().decode(dom.val());
        dom.val(str);
    }
}
fun.a01();