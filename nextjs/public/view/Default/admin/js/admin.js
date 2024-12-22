'use strict';
var Tool = {
    TimeNameArr: [],//定时器名称
    Time: function (name, time, next, This, t) {//延时执行
        if (this.TimeNameArr[name]) {
            window.clearTimeout(this.TimeNameArr[name]);
            delete this.TimeNameArr[name];
        };
        //setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
        this.TimeNameArr[name] = window.setTimeout(function () {
            if (t == undefined) {
                next.apply(This);
            }
            else { next.apply(This, [t]); }
        }, time);
    },
    //console.log(isDevToolsOpen()); // 如果开启了开发者审查，将返回true，否则返回false。
    isDevToolsOpen: function () {
        if (window.__defineGetter__) {
            try {
                window.__defineGetter__('_', () => { });
                window._ = null;
                return true;
            } catch (e) {
                return false;
            }
        } else {
            return false;
        }
    },
    //将不同的数据转换成同一数组
    getArr: function (arr, DEFAULT_DB) {
        let rArr = []
        if (DEFAULT_DB == "dynamodb") {
            let Items = arr.Items
            for (let i = 0; i < Items.length; i++) {
                for (let k in Items[i]) {
                    Items[i][k] = Items[i][k][Object.keys(Items[i][k])[0]];
                }
            }
            rArr = Items;
        }
        else {
            rArr = arr;
        }
        return rArr;
    },
    getObj: function (oo, DEFAULT_DB) {
        let rArr = {}
        if (DEFAULT_DB == "dynamodb") {
            let Item = oo.Item
            for (let k in Item) {
                Item[k] = Item[k][Object.keys(Item[k])[0]];
            }
            rArr = Item;
        }
        else {
            rArr = oo[0];
        }
        return rArr;
    },
    guid: function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    strip: function (s) { return s.replace(/[\t]/g, '').replace(/\s +/g, ' '); },
    Trim: function (s) { return s.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, ''); },
    LTrim: function (s) { return s.replace(/^[ \t\n\r]*/g, ''); },
    RTrim: function (s) { return s.replace(/[ \t\n\r]*$/g, ''); },
    int: function (s) { return parseInt(s); },
    rpsql: function (s) {
        //.replace(/\\/ig, "\\\\")      不能替换这个,sqlite是这样的
        if (typeof s != 'number') {
            if (s == "" || s == null || s == false) {
                s = "null";
            }
            else {
                s = "'" + s.replace(/\'/ig, "''") + "'";
            }
        }
        return s;
    },//sql 替换单引号
    sql01: function (s) {
        //.replace(/\\/ig, "\\\\")     不能替换这个,sqlite是这样的
        return s.replace(/\'/ig, "''");
    },//sql 替换单引号   
    randomRange: function (Min, Max)//设置随机数： Min最小值，Max最大值（不包括最大值）
    {
        //Math.floor   向下取整   
        return Math.floor(Math.random() * (Max - Min)) + Min;
    },
    titleCase: function (str)//首字母大写
    {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    },
    fomatFloat: function (src, pos)//保留两位小数 浮点数四舍五入 位数不够 不补0
    {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    },
    cleanString: function (input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
            if (input.charCodeAt(i) <= 127) {
                output += input.charAt(i);
            }
        }
        return output;
    },
    /*
     * 用于把用utf16编码的字符转换成实体字符，以供后台存储
     * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
     * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
    */
    utf16toEntities: function (str) {
        let patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
        str = str.replace(patt, function (char) {
            let H, L, code;
            if (char.length === 2) {
                H = char.charCodeAt(0); // 取出高位
                L = char.charCodeAt(1); // 取出低位
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
                return "&#" + code + ";";
            } else {
                return char;
            }
        });
        return str;
    },
    /// <summary>
    /// 格式化文件大小的JS方法
    /// </summary>
    /// <param name="filesize">文件的大小,传入的是一个bytes为单位的参数</param>
    /// <returns>格式化后的值</returns>
    renderSize: function (filesize, css) {
        if (!css) { css = "right"; }
        let color, unStr, size
        if (null == filesize || filesize == '' || filesize == "0") {
            unStr = "Bytes";
            size = 0;
        }
        else {
            let unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
            let index = 0;
            let srcsize = parseFloat(filesize);
            index = Math.floor(Math.log(srcsize) / Math.log(1024));
            size = srcsize / Math.pow(1024, index);
            unStr = unitArr[index]
        }
        size = size.toFixed(2);//保留的小数位数
        switch (unStr) {
            case "Bytes": color = "#fff9e4"; break;
            case "KB": color = "#fff4c4"; break;
            case "MB": color = "#f9eca8"; break;
            case "GB": color = "#ffd264"; break;
            default: color = "#fc682a"; break;
        }
        return '<td class="' + css + '" style="background-color:' + color + ';">' + size + " " + unStr + '<\/td>';
    },
    UrlDecode: function (zipStr) {
        var uzipStr = '';
        for (var i = 0; i < zipStr.length; i += 1) {
            var chr = zipStr.charAt(i);
            if (chr === '+') {
                uzipStr += ' ';
            } else if (chr === '%') {
                var asc = zipStr.substring(i + 1, i + 3);
                if (parseInt('0x' + asc) > 0x7f) {
                    uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
                    i += 8;
                } else {
                    uzipStr += this.AsciiToString(parseInt('0x' + asc));
                    i += 2;
                }
            } else {
                uzipStr += chr;
            }
        }
        return uzipStr;
    },
    //把字符串中的中文翻译成Ascii码
    getChinaAscii: function (str) {
        let arr = str.split(""), rArr = []
        for (let i = 0; i < arr.length; i++) {
            if (this.isChina(arr[i])) {
                rArr.push("0x" + this.StringToAscii(arr[i]));
            }
            else {
                rArr.push(arr[i]);
            }
        }
        return rArr.join("");
    },
    //Tool.StringToAscii("敦")   结果：6566
    StringToAscii: function (str) {
        return str.charCodeAt(0).toString(16);
    },
    //Tool.AsciiToString(parseInt('0x6566'))        结果：敦
    AsciiToString: function (asccode) {
        return String.fromCharCode(asccode);
    },
    urlencode: function (str) {
        str = (str + '').toString();
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28').
            replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+');
    },
    htmlProgress: function (name) {
        return '<td><div class="progress"><div class="progress-bar progress-bar-striped bg-success progress-bar-animated" style="width:0%;" id="' + name + '1">0%</div></div></td><td id="' + name + '2" class="w150"></td>'
    },
    doTime: function (time, A1, A2) {
        //A1条数据用时多少。
        let num = (new Date).getTime() - time
        let dateSpan = num / A1;
        let s = (dateSpan / 1000).toFixed(2);
        let dateSpan2 = (dateSpan * (A2 - A1)) + Date.now()
        return "已用时间：" + this.dateDHM(new Date(), time, "s") + "，平均每条用时：" + s + "秒，剩余时间：" + this.dateDHM(dateSpan2, new Date(), "s")
    },
    //把文件“xxx.har”的“params”数组，转成post提交
    postData: function (params) {
        let nArr = [];
        for (let i = 0; i < params.length; i++) {
            nArr[i] = params[i].name + "=" + encodeURIComponent(params[i].value)
        }
        return nArr.join("&")
    },
    urlToName: function (url) {
        url = this.StrSlice(decodeURIComponent(url), o.path, ".html")
        url = encodeURIComponent(url)
        return url.replace(/[^\w\s]/gi, '');//使用正则表达式匹配非字母、数字、下划线、空格的字符，并替换为空字符串
    },
    fieldAs: function (fields) {
        let arr = fields.split(","), nArr = []
        for (let i = 0; i < arr.length; i++) {
            nArr.push("@." + arr[i] + " as " + arr[i])
        }
        return nArr;
    },
    reload: function (t) {
        if (t[0].length == 0) { location.reload(); }
        else { Tool.at(t); }
    },
    save: function (txt) { let url = '/' + o.path + 'temp.html'; Tool.ajax.a01('""<r: file="' + url + '">' + txt + '</r:>', 1, this.save02, this, url); },
    save02: function (t, url) { if (t == "") { t = "保存成功！【" + url + "】"; } this.at(t); },
    fileImg: function (a, b) {
        if (a) { if (a.indexOf(".") != -1) { a = a.substr(1); } }
        let str = ""
        let arr = [
            "accdb.gif",
            "ace.gif",
            "app.gif",
            "arj.gif",
            "asax.gif",
            "asp.gif",
            "aspx.gif",
            "av.gif",
            "avi.gif",
            "bat.gif",
            "bmp.gif",
            "cab.gif",
            "cache.gif",
            "cad.GIF",
            "chm.gif",
            "com.gif",
            "config.gif",
            "cs.gif",
            "csproj.gif",
            "css.gif",
            "dll.gif",
            "dmv.gif",
            "doc.gif",
            "docx.gif",
            "eot.gif",
            "exe.gif",
            "file.gif",
            "flash.gif",
            "flv.gif",
            "folder.gif",
            "folderback.gif",
            "ftp.gif",
            "gif.gif",
            "hlp.gif",
            "htm.gif",
            "html.gif",
            "ico.gif",
            "jpeg.gif",
            "jpg.gif",
            "js.gif",
            "json.gif",
            "key.gif",
            "laccdb.gif",
            "ldb.gif",
            "ldf.gif",
            "less.gif",
            "m3u.gif",
            "mail.gif",
            "map.gif",
            "mdb.gif",
            "mdf.gif",
            "media.gif",
            "mid.gif",
            "mov.gif",
            "move.gif",
            "mp.gif",
            "mp3.gif",
            "mp4.gif",
            "mpeg.gif",
            "mpg.gif",
            "notype.gif",
            "otf.gif",
            "other.gif",
            "pdb.gif",
            "pdf.gif",
            "pem.gif",
            "perl.gif",
            "pic.gif",
            "png.gif",
            "ppt.gif",
            "props.gif",
            "ra.gif",
            "rar.gif",
            "real.gif",
            "rm.gif",
            "script.gif",
            "sentinel.gif",
            "sound.gif",
            "sql.gif",
            "svg.gif",
            "swf.gif",
            "tar.gif",
            "targets.gif",
            "tmp.gif",
            "torrent.gif",
            "ttf.gif",
            "txt.gif",
            "unknown.gif",
            "url.gif",
            "user.gif",
            "vbs.gif",
            "video.gif",
            "wav.gif",
            "wave.gif",
            "wmv.gif",
            "woff.gif",
            "xls.gif",
            "xlt.gif",
            "xml.gif",
            "zip.gif"
        ]
        if (a == "ico") {
            let path = b.substr(b.indexOf('/wwwroot/') + 8)
            str = '<img src="' + path + '" class="w16 mx-2"/>';
        }
        else if (arr.indexOf(a + ".gif") == -1) { str = '<img src="/' + o.path + 'admin/img/icon/other.gif' + '" class="w20 mx-1"/>'; }
        else { str = '<img src="/' + o.path + 'admin/img/icon/' + a + '.gif' + '" class="w20 mx-1"/>'; }
        return str;
    },
    //升序
    objsort: function (A, B) {
        let C = A.sort
            (
                function (object1, object2) {
                    let value1 = object1[B];
                    let value2 = object2[B];
                    if (value2 < value1) { return 1; }
                    else if (value2 > value1) { return -1; }
                    else { return 0; }
                }
            );
        return C;
    },
    //倒序
    objsortZ_A: function (A, B) {
        let C = A.sort
            (
                function (object1, object2) {
                    let value1 = object1[B];
                    let value2 = object2[B];
                    if (value2 > value1) { return 1; }
                    else if (value2 < value1) { return -1; }
                    else { return 0; }
                }
            );
        return C;
    },
    isChina: function (s)//判断是否为中文的方法
    {
        return /[\u4e00-\u9fff]/.test(s);
    },
    html: function (next, This, html, t) {
        $("#table").hide().html(html).fadeIn("slow");
        if (next) {
            if (t) { next.apply(This, [t]); } else { next.apply(This); }
        }
    },
    getDay: function (time) {
        let week;
        let myDate = new Date(time)
        switch (myDate.getDay()) {
            case 1: week = "星期一"; break;
            case 2: week = "星期二"; break;
            case 3: week = "星期三"; break;
            case 4: week = "星期四"; break;
            case 5: week = "星期五"; break;
            case 6: week = "星期六"; break;
            default: week = "星期天";
        }
        return week
    },
    apply: function (data, next, This, t) {
        if (t) { next.apply(This, [data, t]); }
        else { next.apply(This, [data]); }
    },
    scriptArr: function (arr) {
        let This = this;
        $.getScript({
            type: 'GET',
            url: "/" + o.path + arr[0],
            //cache: true,
            dataType: 'script'
        }, function () {
            arr.shift();
            if (arr.length != 0) {
                This.Time("name", 1, This.scriptArr, This, arr);
            }
        });
    },
    jsArr: function (arr, next, This, t) {
        let _This = this;
        $.getScript({
            type: 'GET',
            url: "/" + o.path + arr[0],
            //cache: true,
            dataType: 'script'
        }, function () {
            arr.shift();
            if (arr.length == 0) {
                next.apply(This, [t]);
            }
            else {
                _This.jsArr(arr, next, This, t);
            }
        });
    },
    //获取url参数(返回对象)
    getParams: function (url) {
        const regex = /[?&]([^=#]+)=([^&#]*)/g;
        const params = {};
        let match;
        while (match = regex.exec(url)) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    },
    //设置url参数
    setQueryParam: function (url, key, value) {
        const urlParams = new URLSearchParams(url);
        urlParams.set(key, value);
        return urlParams.toString();
    },
    //写cookies
    setCookie: function (name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + d.toGMTString();
    },
    //读取cookie
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    //删除cookie
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    //清除全部cookie值
    clearCookie: function () {
        var keys = document.cookie.match(/[^=;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i++;) {
                document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString()
            }
        }
    },
    getStorage: function (name) {
        return window.localStorage.getItem(name);
    },
    // 全部清除
    clearStorage: function () {
        return window.localStorage.clear();
    },
    StrSplits: function (Str, sStr, eStr) {
        if (eStr == "" || Str == "") return [];
        let ret = [], tStr = Str.toLowerCase(), str = Str;
        sStr = sStr.toLowerCase(), eStr = eStr.toLowerCase();
        let sLen = sStr.length, eLen = eStr.length, iPos, ePos;
        while (true) {
            iPos = tStr.indexOf(sStr);
            if (iPos == -1) break;
            iPos = sLen > 0 ? iPos + sLen : 0, tStr = tStr.slice(iPos), ePos = tStr.indexOf(eStr);
            if (ePos == -1) break;
            ret[ret.length] = str.substr(iPos, ePos), tStr = tStr.slice(ePos + eLen), str = str.slice(iPos + ePos + eLen)
        }
        return ret;
    },
    StrSlice: function (Str, sStr, eStr) {
        if (eStr == '') return false;
        let tStr = Str.toLowerCase(), iPos = tStr.indexOf(sStr.toLowerCase()), sLen = sStr.length;
        if (iPos == -1) return false;
        iPos = sLen > 0 ? iPos + sLen : 0;
        return Str.substr(iPos, tStr.slice(iPos).indexOf(eStr.toLowerCase()));
    },
    strRepArr: function (str, A, B) {
        let ret = [], result = null, patt1 = new RegExp(A, "ig");
        do {
            result = patt1.exec(str);
            if (result) ret[ret.length] = result[B]
        } while (result != null)
        return ret
    },
    regSlice: function (htmlcode, A, B) {
        let val
        if (A.indexOf("reg:") != -1) {
            A = A.substr(4)
            val = this.strRepArr(htmlcode, A, B)[0]
        }
        else {
            val = this.StrSlice(htmlcode, A, B);
        }
        return val
    },
    regSplits: function (htmlcode, A, B) {
        let val
        if (A.indexOf("reg:") != -1) { A = A.substr(4); val = this.strRepArr(htmlcode, A, B); }
        else { val = this.StrSplits(htmlcode, A, B); }
        return val
    },
    removeHTMLCode: function (Str, cHas) {
        if (cHas == "" || Str === false) return Str;
        cHas = cHas.toUpperCase().split("|"), Str = "" + Str;
        for (let i = 0; i < cHas.length; i++) {
            switch (cHas[i]) {
                case "TABLE": Str = Str.replace(/<\/?(table|thead|tbody|tr|th|td).*>/ig, "");
                    break;
                case "OBJECT": Str = Str.replace(/<\/?(object|param|embed).*>/ig, "");
                    break;
                case "SCRIPT": Str = Str.replace(new RegExp("<scr" + "ipt.*>[\\w\\W]+?<\\/scr" + "ipt>", "ig"), "").replace(new RegExp("\\son[\\w]+=[\\'\\\"].+?[\\'\\\"](\\s|>)(\\s|\\>)", "ig"), "$1");
                    break;
                case "STYLE":
                    Str = Str.replace(/<style.*>[\w\W]+?<\/style>/ig, "");
                    Str = Str.replace(/\sstyle=.+(\s|\>)/ig, "$1");
                    break;
                case "CLASS":
                    Str = Str.replace(/\sclass=.+(\s|\>)/ig, "$1");
                    break;
                default:
                    Str = this.removeHTMLCode(this.removeHTMLCode(Str, "SCRIPT"), "STYLE").replace(new RegExp("<.*?>", "ig"), "");
                    break;
            }
        }
        return Str
    },
    checkAll: function (tagname, name)//反选
    {
        let checkboxArray;
        checkboxArray = this.checkAll02(tagname, name);
        for (let i = 0; i < checkboxArray.length; i++) {
            if (checkboxArray[i].checked == false) {
                checkboxArray[i].checked = true
            }
            else if (checkboxArray[i].checked == true) { checkboxArray[i].checked = false; }
        }
    },
    checkAll02: function (tag, name) {
        let rtArr = new Array();
        let el = document.getElementsByTagName(tag);
        for (let i = 0; i < el.length; i++) {
            if (el[i].name == name) rtArr.push(el[i])
        }
        return rtArr
    },
    gettime: function (time)//获取时间戳
    {
        let num = 0
        if (time) { num = new Date(time).getTime(); }
        else { num = Date.now() };
        return parseInt(num / 1000);
    },
    js_date_time: function (unixtime, val) { return this.userDate13(unixtime, val) + " " + this.userTime13(unixtime); },//日期和时间戳互换  
    js_date_time2: function (unixtime, val) {
        let str = "&nbsp;";//给这个初值是为了，让表格td的高度统一
        if (unixtime != 0) str = this.js_date_time(unixtime * 1000, val);
        return str;
    },
    userTime13: function (unixtime)//时间戳转换成四位时间10:10:00
    {
        let myDate = new Date(unixtime);
        let hours = myDate.getHours(); if (hours < 10) { hours = "0" + hours }
        let minutes = myDate.getMinutes(); if (minutes < 10) { minutes = "0" + minutes }
        let second = myDate.getSeconds(); if (second < 10) { second = "0" + second }
        return hours + ':' + minutes + ':' + second;
    },
    userDate13: function (unixtime, val)//【时间戳】或【Apr 3,2022】转换成八位日期2014/05/05 
    {
        if (val == undefined) { val = "/" }
        let myDate = new Date(unixtime);
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1; if (month < 10) { month = "0" + month }
        let day = myDate.getDate(); if (day < 10) { day = "0" + day }
        return year + val + month + val + day;
    },
    datedifference: function (num1, num2)//两个时间相差天数
    {
        if (!num1) { num1 = Date.now(); }
        if (!num2) { num2 = Date.now(); }
        let dateSpan, iDays;
        dateSpan = num1 - num2;
        iDays = Math.ceil(dateSpan / (24 * 3600 * 1000));
        return iDays
    },
    dateDHM: function (sDate1, sDate2, mode)//两个时间相差天数小时数 兼容firefox chrome
    {
        if (!sDate1) { sDate1 = Date.now(); }
        if (!sDate2) { sDate2 = Date.now(); }
        let dateSpan = sDate1 - sDate2;
        //计算出相差天数
        let days = Math.floor(dateSpan / (24 * 60 * 60 * 1000));
        //计算小时数
        let hourLevel = dateSpan % (24 * 60 * 60 * 1000);
        let hours = Math.floor(hourLevel / (60 * 60 * 1000))
        //计算分钟数
        let minutesLevel = hourLevel % (60 * 60 * 1000);
        let minutes = Math.floor(minutesLevel / (60 * 1000));
        //计算秒钟数
        if (mode == "s") {
            let sLevel = hourLevel % (60 * 1000);
            let s = Math.floor(sLevel / 1000);
            return days + "天" + hours + "小时" + minutes + "分钟" + s + "秒";
        }
        else { return days + "天" + hours + "小时" + minutes + "分钟"; }
    },
    cSize: function (tSize)//转换字节数为简写形式
    {
        if (tSize >= 1073741824) {
            return parseInt((tSize / 1073741824) * 1000) / 1000 + " GB";
        }
        else if (tSize >= 1048576) {
            return parseInt((tSize / 1048576) * 1000) / 1000 + " MB";
        }
        else if (tSize >= 1024) {
            return parseInt((tSize / 1024) * 1000) / 1000 + " KB";
        }
        else {
            return tSize + " B";
        }
    },
    write: function (oo) { document.writeln(oo) },
    at: function (t) {
        let str = ""
        if (typeof t == "string") {
            str = t;
            if (str.indexOf("<\/textarea>") != -1) { str = str.replace(/<\/textarea>/ig, "</text-area>").replace(/<textarea/ig, "<text-area"); }
        }
        else { str = typeof t; }
        Tool.Modal('网页提示', '<textarea style="height: 500px;" class="form-control form-control-sm">' + str + '</textarea>', '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>', 'modal-xl');
    },
    checkbox: function (id) {
        return '<div class="custom-control custom-checkbox">\
    <input type="checkbox" class="custom-control-input" value="'+ id + '" name="pre_id" id="customCheck' + id + '">\
    <label class="custom-control-label" for="customCheck'+ id + '">' + id + '</label>\
    </div>'
    },
    radio: function (id) {
        return '<div class="custom-control custom-radio">\
    <input type="radio" id="customRadio'+ id + '" name="customRadio" class="custom-control-input">\
    <label class="custom-control-label" for="customRadio'+ id + '">' + id + '</label>\
    </div>'
    },
    switch: function (L, V, fun) {
        return '\
        <div class="form-check form-switch">\
	        <input type="checkbox" class="form-check-input" id="SwitchCheck'+ L + '" onclick="' + fun + '($(this),\'' + L + '\')" ' + (V == "true" ? 'checked="checked"' : '') + '>\
	        <label class="form-check-label" for="SwitchCheck'+ L + '"></label>\
        </div>'
    },
    Modal: function (title, body, footer, dx) {
        let str = '\
    <div class="modal fade" tabindex="-1">\
      <div class="modal-dialog modal-dialog-centered '+ dx + '" role="document">\
        <div class="modal-content">\
          <div class="modal-header">\
            <h5 class="modal-title" id="exampleModalCenterTitle">'+ title + '</h5>\
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">\
            </button>\
          </div>\
          <div class="modal-body">'+ body + '</div>\
          <div class="modal-footer">'+ footer + '</div>\
        </div>\
      </div>\
    </div>'
        $("body").append(str)
        $('.modal').on('hidden.bs.modal', function (e) { $(this).remove(); }).modal("toggle");
    },
    clearCache: function (This) {
        This.parent().html('<img src="/' + o.path + 'admin/img/loading.gif" height="30">');
        Tool.ajax.a01("<.clearCache/>", "/ajax/install", this.clearCache2, this)
    },
    clearCache2: function (t) {
        if (t == "") {
            location.reload();
        }
        else {
            alert("缓存更新失败" + t)
        }
    },
    returnID: function () { let id = []; $("input[type='checkbox'][name='pre_id']:checked").each(function () { id[id.length] = $(this).val(); }); return id.join(",") },
    //去数组中的重复
    unique: function (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) { if (arr.indexOf(data[i]) == -1) { arr.push(data[i]); } }
        return arr;
    },
    showMsgNotification: function (title, msg) {
        let Notification = window.Notification || window.mozNotification || window.webkitNotification;
        if (Notification) {
            //支持桌面通知
            if (Notification.permission == "granted") {
                //已经允许通知
                let instance = new Notification(title, { body: msg, icon: o.path + "/admin/img/%E9%A6%96%E9%A1%B5/logo.jpg" });
                instance.onclick = function () { instance.close(); };
                //instance.onerror = function(){console.log('onerror');};
                //instance.onshow  = function(){console.log('onshow');};
                //instance.onclose = function(){console.log('onclose');};
            }
            else {
                //第一次询问或已经禁止通知(如果用户之前已经禁止显示通知，那么浏览器不会再次询问用户的意见，Notification.requestPermission()方法无效)
                Notification.requestPermission(function (status) {
                    if (status === "granted")//第一次,用户允许
                    {
                        let instance = new Notification(title, { body: msg, icon: o.path + "/admin/img/%E9%A6%96%E9%A1%B5/logo.jpg" });
                        instance.onclick = function () { instance.close(); };
                    }
                    else { return false; }//用户禁止
                });
            }
        }
        else {
            //不支持(IE等)
            let index = 0;
            let timer = setInterval(function () {
                if (index % 2) { $('title').text('【　　　】' + title); }//这里是中文全角空格，其他不行
                else { $('title').text('【新消息】' + title); }
                index++;
                if (index > 20) { clearInterval(timer); }
            }, 500);
        }
    },
    log: function (val) {
        console.log(val);
    },
    pre: function (oo) {
        Tool.Modal('网页对象提示', '<textarea style="height: 500px;" class="form-control form-control-sm">' + JSON.stringify(oo, null, 2) + '</textarea>', '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>', 'modal-xl');
    },
    translate_name: {
        a01: function (q, sl, tl, next, This, t) {
            let oo = {
                next: next,
                This: This,
                t: t
            }
            let url = "https://translate-pa.googleapis.com/v1/translateHtml"
            let data = [
                [
                    [q],
                    sl,
                    tl
                ],
                "te_lib"
            ]
            gg.postFetch(url, JSON.stringify(data), this.a02, this, oo)
        },
        a02: function (t, oo) {
            if (t[0][0]) {
                Tool.apply(t[0][0], oo.next, oo.This, oo.t)
            }
            else {
                Tool.pre(["翻译出错", t])
            }
        },
    },
}
/*
 * var url = URL.createObjectURL(blob);
function productUnit(name){		
  let a = [100000000,100000001,100000002,100078580,100078581,100000003,100000004,100078584,100000005,100000006,100078587,100000007,100078589,100000008,100078559,100000009,100000010,100000011,100078560,100078596,100078597,100000012,100000014,100000013,100000015,100000016,100078603,100000017,100000018,100078606,100078607,100000019,100078609,100000020,100078558];
  let b = ["袋 (bag/bags)","桶 (barrel/barrels)","蒲式耳 (bushel/bushels)","箱 (carton)","厘米 (centimeter)","立方米 (cubic meter)","打 (dozen)","英尺 (feet)","加仑 (gallon)","克 (gram)","英寸 (inch)","千克 (kilogram)","千升 (kiloliter)","千米 (kilometer)","升 (liter/liters)","英吨 (long ton)","米 (meter)","公吨 (metric ton)","毫克 (milligram)","毫升 (milliliter)","毫米 (millimeter)","盎司 (ounce)","包 (pack/packs)","双 (pair)","件/个 (piece/pieces)","磅 (pound)","夸脱 (quart)","套 (set/sets)","美吨 (short ton)","平方英尺 (square feet)","平方英寸 (square inch)","平方米 (square meter)","平方码 (square yard)","吨 (ton)","码 (yard/yards)"];
  let str='<option value="0">请选择商品单位</option>'
  for(let i=0;i<a.length;i++)
  {
    if(a[i]==name)
    {str+='<option value="'+a[i]+'" selected="selected">'+b[i]+'</option>'}
    else
    {str+='<option value="'+a[i]+'">'+b[i]+'</option>'}
  }
  return str
}
//将date型转换为tring 
//传来的datetime是:Wed Mar 04 2009 11:05:05 GMT+0800格式  得到结果：2009-06-12 17:18:05
function dateToStr(datetime)
{ 
   let year = datetime.getFullYear();
   let month = datetime.getMonth()+1;//js从0开始取 
   let date = datetime.getDate(); 
   let hour = datetime.getHours(); 
   let minutes = datetime.getMinutes(); 
   let second = datetime.getSeconds();
   if(month<10){month = "0" + month;}
   if(date<10){date = "0" + date;}
   if(hour <10){hour="0"+hour;}
   if(minutes <10){minutes = "0" + minutes;}
   if(second <10){second="0"+second;}
   let time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second; //2009-06-12 17:18:05
   return time;
}
*/