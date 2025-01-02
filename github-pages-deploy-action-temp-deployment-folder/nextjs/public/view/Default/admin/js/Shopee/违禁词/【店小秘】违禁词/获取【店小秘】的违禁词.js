'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header(obj.params.return, 'Shopee &gt; 违禁词 &gt; 【店小秘】违禁词 &gt; 获取【店小秘】的违禁词') + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                <tr><td class="right w150">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function (t) {
        let url = "https://www.dianxiaomi.com/bannedWord/cloudBannedWordPageList.htm?pageNo=" + this.obj.A1 + "&pageSize=100&bannedWord="
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a04, this)
    },
    a04: function (t) {
        if (this.obj.A2 == 0) {
            this.obj.A2 = Tool.int(Tool.StrSlice(t, 'name="totalPage" value="', '"'));
        }
        let arr1 = Tool.strRepArr(t, "type=\"checkbox\" value=\"([\\s\\S]*?)\">", 1)
        let arr2 = Tool.strRepArr(t, "<td class=\"f-right w200 p-right20\">([\\s\\S]*?)</td>", 1)
        if (arr1.length == arr2.length) {
            Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, [arr1, arr2]);
        }
        else {
            Tool.at("出错，【店小秘】已改版。")
        }
    },
    ////////////////////////////////////////////////////////////
    d01: function (arr) {
        let selArr = [], oo = { nameArr: [], insertArr: [] }
        for (let i = 0; i < arr[0].length; i++) {
            if (arr[0][i].indexOf("&lt;") != -1) {
                arr[0][i] = arr[0][i].split("&lt;")[0]
            }
            arr[0][i] = arr[0][i].replace(/\n|\t|\r/g, " ");
            arr[0][i] = Tool.Trim(arr[0][i].replace(/ +/g, " "));
            if (oo.nameArr.indexOf(arr[0][i]) == -1) {//去重复
                oo.nameArr.push(arr[0][i])
                selArr.push(Tool.rpsql(arr[0][i]))
                oo.insertArr.push("insert into @.table(@.name,@.count,@.addtime)values(" + Tool.rpsql(arr[0][i]) + "," + arr[1][i] + "," + Tool.gettime("") + ")")
            }
        }
        let data = [{
            action: "sqlite",
            database: "shopee/违禁词/店小秘",
            sql: "select @.name as name FROM @.table where @.name in(" + selArr.join(",") + ")",
        }]
        Tool.ajax.a01(data, this.d02, this, oo)
    },
    d02: function (t, oo) {
        if (t[0].length == 0) {
            $("#state").html("正在插入。。。");
            this.d03(oo.insertArr)
        }
        else {
            $("#state").html("正在插入2。。。");
            let nameArr = [], sqlArr = [];
            for (let i = 0; i < t[0].length; i++) {
                nameArr.push(t[0][i].name)
            }
            for (let i = 0; i < oo.nameArr.length; i++) {
                if (nameArr.indexOf(oo.nameArr[i]) == -1) {
                    sqlArr.push(oo.insertArr[i])
                }
            }
            this.d03(sqlArr)
        }
    },
    d03: function (sqlArr) {
        let data = []
        for (let i = 0; i < sqlArr.length; i++) {
            data.push({
                action: "sqlite",
                database: "shopee/违禁词/店小秘",
                sql: sqlArr[i]
            })
        }
        Tool.ajax.a01(data, this.d04, this)
    },
    d04: function (t) {
        let isErr = false
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) {
                isErr = true;
                break;
            }
        }
        if (isErr) {
            Tool.pre(["有错误", t])
        }
        else {
            this.obj.A1++;
            this.a03();
        }
    },
}
fun.a01();