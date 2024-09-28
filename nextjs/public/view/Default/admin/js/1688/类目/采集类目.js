'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: [],
        _m_h5_tk: "",
        Cookie: "",//为什么要写到这里？答：因为第二次可以用现成的。
    },
    a01: function () {
        //obj.params.type       
        let html = Tool.header(obj.params.return,'1688 &gt; 类目 &gt; 采集类目') + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        if (obj.params.type == "现货类目") {
            this.obj.Aarr = tmp_category0
        }
        else if (obj.params.type == "加工定制类目") {
            this.obj.Aarr = tmp_category1
        }
        this.obj.A2 = this.obj.Aarr.idArr.length;
        gg.isRD(this.a03, this);

    },
    a03: function () {       
        let data=[{
            action: "sqlite",
            database: "1688",
            sql: "select "+Tool.fieldAs("username,password,cookies")+" FROM @.buyer where @.username='huangxingjl02' limit 1",
        }]
        Tool.ajax.a01(data, this.a04, this)
    },
    a04: function (t) {
        let oo=t[0][0]
        $("#username").html(oo.username);
        Tool.login1688.a01(oo.username, oo.password, JSON.parse(oo.cookies), $("#state"), this.a05, this)
    },
    a05: function (t) {
        $("#state").html("正在打开1688网站......")
        gg.tabs_remove_create_getHeaders(2, "https://www.1688.com/", ["https://search.1688.com/service/IWapHotKeyWordService?pageName=commonService&rescnt=14&source=pc_shade_hotword&subScene=index"], true, this.a06, this)
    },
    a06: function (oo) {
        let arr = oo.requestHeaders
        $("#state").html("正在获取Cookie......")
        let Cookie = ""
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name == "Cookie") {
                Cookie = arr[i].value;
                break;
            }
        }
        this.obj._m_h5_tk = Tool.StrSlice(Cookie, "_m_h5_tk=", "_")
        this.obj.Cookie = Cookie
        this.d01()
    },

    /////////////////////////////////////////////////////
    b01: function (e) {
        //从客优云插件中扣下来的          
        function t(e, t) {
            return e << t | e >>> 32 - t
        }
        function n(e, t) {
            var n, r, a, o, i;
            return a = 2147483648 & e,
                o = 2147483648 & t,
                i = (1073741823 & e) + (1073741823 & t),
                (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ i ^ a ^ o : n | r ? 1073741824 & i ? 3221225472 ^ i ^ a ^ o : 1073741824 ^ i ^ a ^ o : i ^ a ^ o
        }
        function r(e, r, a, o, i, s, u) {
            return e = n(e, n(n(function (e, t, n) {
                return e & t | ~e & n
            }(r, a, o), i), u)),
                n(t(e, s), r)
        }
        function a(e, r, a, o, i, s, u) {
            return e = n(e, n(n(function (e, t, n) {
                return e & n | t & ~n
            }(r, a, o), i), u)),
                n(t(e, s), r)
        }
        function o(e, r, a, o, i, s, u) {
            return e = n(e, n(n(function (e, t, n) {
                return e ^ t ^ n
            }(r, a, o), i), u)),
                n(t(e, s), r)
        }
        function i(e, r, a, o, i, s, u) {
            return e = n(e, n(n(function (e, t, n) {
                return t ^ (e | ~n)
            }(r, a, o), i), u)),
                n(t(e, s), r)
        }
        function s(e) {
            var t, n = "", r = "";
            for (t = 0; 3 >= t; t++)
                n += (r = "0" + (e >>> 8 * t & 255).toString(16)).substr(r.length - 2, 2);
            return n
        }
        var u, c, l, d, p, f, h, m, g, y;
        for (y = function (e) {
            for (var t, n = e.length, r = n + 8, a = 16 * ((r - r % 64) / 64 + 1), o = new Array(a - 1), i = 0, s = 0; n > s;)
                i = s % 4 * 8,
                    o[t = (s - s % 4) / 4] = o[t] | e.charCodeAt(s) << i,
                    s++;
            return i = s % 4 * 8,
                o[t = (s - s % 4) / 4] = o[t] | 128 << i,
                o[a - 2] = n << 3,
                o[a - 1] = n >>> 29,
                o
        }(e = function (e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                128 > r ? t += String.fromCharCode(r) : r > 127 && 2048 > r ? (t += String.fromCharCode(r >> 6 | 192),
                    t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
                        t += String.fromCharCode(r >> 6 & 63 | 128),
                        t += String.fromCharCode(63 & r | 128))
            }
            return t
        }(e)),
            f = 1732584193,
            h = 4023233417,
            m = 2562383102,
            g = 271733878,
            u = 0; u < y.length; u += 16)
            c = f,
                l = h,
                d = m,
                p = g,
                f = r(f, h, m, g, y[u + 0], 7, 3614090360),
                g = r(g, f, h, m, y[u + 1], 12, 3905402710),
                m = r(m, g, f, h, y[u + 2], 17, 606105819),
                h = r(h, m, g, f, y[u + 3], 22, 3250441966),
                f = r(f, h, m, g, y[u + 4], 7, 4118548399),
                g = r(g, f, h, m, y[u + 5], 12, 1200080426),
                m = r(m, g, f, h, y[u + 6], 17, 2821735955),
                h = r(h, m, g, f, y[u + 7], 22, 4249261313),
                f = r(f, h, m, g, y[u + 8], 7, 1770035416),
                g = r(g, f, h, m, y[u + 9], 12, 2336552879),
                m = r(m, g, f, h, y[u + 10], 17, 4294925233),
                h = r(h, m, g, f, y[u + 11], 22, 2304563134),
                f = r(f, h, m, g, y[u + 12], 7, 1804603682),
                g = r(g, f, h, m, y[u + 13], 12, 4254626195),
                m = r(m, g, f, h, y[u + 14], 17, 2792965006),
                f = a(f, h = r(h, m, g, f, y[u + 15], 22, 1236535329), m, g, y[u + 1], 5, 4129170786),
                g = a(g, f, h, m, y[u + 6], 9, 3225465664),
                m = a(m, g, f, h, y[u + 11], 14, 643717713),
                h = a(h, m, g, f, y[u + 0], 20, 3921069994),
                f = a(f, h, m, g, y[u + 5], 5, 3593408605),
                g = a(g, f, h, m, y[u + 10], 9, 38016083),
                m = a(m, g, f, h, y[u + 15], 14, 3634488961),
                h = a(h, m, g, f, y[u + 4], 20, 3889429448),
                f = a(f, h, m, g, y[u + 9], 5, 568446438),
                g = a(g, f, h, m, y[u + 14], 9, 3275163606),
                m = a(m, g, f, h, y[u + 3], 14, 4107603335),
                h = a(h, m, g, f, y[u + 8], 20, 1163531501),
                f = a(f, h, m, g, y[u + 13], 5, 2850285829),
                g = a(g, f, h, m, y[u + 2], 9, 4243563512),
                m = a(m, g, f, h, y[u + 7], 14, 1735328473),
                f = o(f, h = a(h, m, g, f, y[u + 12], 20, 2368359562), m, g, y[u + 5], 4, 4294588738),
                g = o(g, f, h, m, y[u + 8], 11, 2272392833),
                m = o(m, g, f, h, y[u + 11], 16, 1839030562),
                h = o(h, m, g, f, y[u + 14], 23, 4259657740),
                f = o(f, h, m, g, y[u + 1], 4, 2763975236),
                g = o(g, f, h, m, y[u + 4], 11, 1272893353),
                m = o(m, g, f, h, y[u + 7], 16, 4139469664),
                h = o(h, m, g, f, y[u + 10], 23, 3200236656),
                f = o(f, h, m, g, y[u + 13], 4, 681279174),
                g = o(g, f, h, m, y[u + 0], 11, 3936430074),
                m = o(m, g, f, h, y[u + 3], 16, 3572445317),
                h = o(h, m, g, f, y[u + 6], 23, 76029189),
                f = o(f, h, m, g, y[u + 9], 4, 3654602809),
                g = o(g, f, h, m, y[u + 12], 11, 3873151461),
                m = o(m, g, f, h, y[u + 15], 16, 530742520),
                f = i(f, h = o(h, m, g, f, y[u + 2], 23, 3299628645), m, g, y[u + 0], 6, 4096336452),
                g = i(g, f, h, m, y[u + 7], 10, 1126891415),
                m = i(m, g, f, h, y[u + 14], 15, 2878612391),
                h = i(h, m, g, f, y[u + 5], 21, 4237533241),
                f = i(f, h, m, g, y[u + 12], 6, 1700485571),
                g = i(g, f, h, m, y[u + 3], 10, 2399980690),
                m = i(m, g, f, h, y[u + 10], 15, 4293915773),
                h = i(h, m, g, f, y[u + 1], 21, 2240044497),
                f = i(f, h, m, g, y[u + 8], 6, 1873313359),
                g = i(g, f, h, m, y[u + 15], 10, 4264355552),
                m = i(m, g, f, h, y[u + 6], 15, 2734768916),
                h = i(h, m, g, f, y[u + 13], 21, 1309151649),
                f = i(f, h, m, g, y[u + 4], 6, 4149444226),
                g = i(g, f, h, m, y[u + 11], 10, 3174756917),
                m = i(m, g, f, h, y[u + 2], 15, 718787259),
                h = i(h, m, g, f, y[u + 9], 21, 3951481745),
                f = n(f, c),
                h = n(h, l),
                m = n(m, d),
                g = n(g, p);
        return (s(f) + s(h) + s(m) + s(g)).toLowerCase()

    },
    b02: function (name, upid, fromID, i, leaf, catIdPath, catNamePath) {
        let select = "select count(1) from @.category" + obj.arr[5] + " where @.fromID=" + fromID + " and @.upid=" + upid
        let insert = "insert into @.category" + obj.arr[5] + "(@.name,@.upid,@.fromID,@.sort,@.isleaf,@.catIdPath,@.catNamePath)values(" + Tool.rpsql(name) + "," + upid + "," + fromID + "," + (i + 1) + "," + (leaf == "false" ? 0 : 1) + "," + Tool.rpsql(catIdPath) + "," + Tool.rpsql(catNamePath) + ")"
        return '<if Fun(Db(sqlite.1688,' + select + ',count))==0><r: db="sqlite.1688">' + insert + '</r:></if>'
    },
    //////////////////////////////////////////////////////
    d01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this)
    },
    d02: function () {
        let data = {
            dealType: "getSubCatInfo",
            sceneType: "offer",
            isPrivateCategory: false,
            loadIndustryCat: 1,
            catType: "1",
            categoryId: this.obj.Aarr.idArr[0]
        },
            l = JSON.stringify(data),
            i = this.obj._m_h5_tk,
            p = Date.now(),
            f = "12574478",
            h = {
                jsv: "2.7.2",
                appKey: f,
                t: p,
                sign: this.b01([i, p, f, l].join("&")),
                api: "mtop.1688.CategorySelectorService.getCatInfo",
                v: "1.0",
                type: "json",
                dataType: "json",
                timeout: 20000,
                data: encodeURIComponent(l)
            }
        this.d03(h)
    },
    d03: function (h) {
        let params = [];
        for (let k in h) {
            params.push(k + "=" + h[k]);
        }
        let url = "https://h5api.m.1688.com/h5/mtop.1688.categoryselectorservice.getcatinfo/1.0/?" + params.join("&")
        $("#state").html("正在获取网址中的【类目】。。。");
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        let headers = [
            {
                "name": "Cookie",
                "value": this.obj.Cookie
            }
        ]
        gg.setHeaders_getHtml(url, headers, this.d04, this)
        //注：用gg.getHtml不行
    },
    d04: function (oo) {
        if (oo.ret[0] == "SUCCESS::调用成功") {
            this.e01(oo.data.data)
        }
        else if (oo.ret[0] == "UNKNOWN_FAIL_CODE::系统开小差了，请稍候重试") {
            $("#state").html("系统开小差了，请稍候重试")
            this.obj.Aarr.errIdArr.push(this.obj.Aarr.idArr[0])
            this.e02("ok")
        }
        else if (oo.ret[0] == "FAIL_SYS_TOKEN_EMPTY::令牌为空") {
            $("#state").html("令牌为空，重来。")
            this.a05("")
        }
        else if (oo.ret[0] == "FAIL_SYS_ILLEGAL_ACCESS::非法请求") {
            $("#state").html("非法请求，重来。")
            this.a05("")
        }
        else {
            Tool.pre(["出错：", oo])
        }
    },
    ////////////////////////////
    e01: function (arr) {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].leaf == "false") {
                this.obj.Aarr.idArr.push(arr[i].categoryId);
            }
            newArr.push(this.b02(arr[i].name, this.obj.Aarr.idArr[0], arr[i].categoryId, i, arr[i].leaf, arr[i].catIdPath, arr[i].catNamePath))
        }
        $("#state").html("正在添加" + newArr.length + "条数据......")
        Tool.ajax.a01('"ok"' + newArr.join(""), 1, this.e02, this)
    },
    e02: function (t) {
        if (t == "ok") {
            this.obj.Aarr.idArr.shift();
            this.obj.A2 = this.obj.Aarr.idArr.length;
            this.e03();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    e03: function (t) {
        $("#state").html("统计完成。正在保存数据。。。");
        let str = '"ok"<r: file="/' + o.path + 'admin/js/1688/类目/tmp_category' + obj.arr[5] + '.js">var tmp_category' + obj.arr[5] + '=' + JSON.stringify(this.obj.Aarr) + '</r:>';
        Tool.at(str)
        //Tool.ajax.a01(str, 1, this.e04, this);
    },
    e04: function (t) {
        if (t == "ok") {
            $("#state").html("下一步")
            this.d01();
        }
        else {
            Tool.pre(["出错", t]);
        }
    }

}
fun.a01();