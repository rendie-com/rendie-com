Object.assign(Tool, {
    searchImg: {
        obj: {
            _m_h5_tk: "",
            Cookie: ""//为什么要写到这里，不写到searchImg.a01里面？答：因为第二次可以用现成的。
        },
        a01: function (picObj, dom1, dom2, next, This, t) {
            let oo = {
                picObj: picObj,
                dom1: dom1,
                dom2: dom2,
                next: next,
                This: This,
                t: t,
                num: 0//计数。如果有多次同时报这个错误，就一定是有验证码的。
            }
            this.a02(oo)
        },
        a02: function (oo) {
            if (this.obj._m_h5_tk) {
                this.a05("", oo)
            }
            else {
                $("#state").html("正在打开1688网站......")
                gg.tabs_remove_create_getHeaders(2, "https://www.1688.com/", ["https://search.1688.com/service/IWapHotKeyWordService?pageName=commonService&rescnt=14&source=pc_shade_hotword&subScene=index"],true, this.a03, this, oo)
            }
        },
        a03: function (arr, oo) {
            arr = arr.requestHeaders
            $("#state").html("正在获取Cookie......")
            let Cookie = ""
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == "Cookie") {
                    Cookie = arr[i].value;
                    break;
                }
            }
            this.a04(Cookie, oo)
        },
        a04: function (Cookie, oo) {
            this.obj._m_h5_tk = Tool.StrSlice(Cookie, "_m_h5_tk=", "_")
            this.obj.Cookie = Cookie
            this.a05("",oo)
        },
        a05: function (t, oo) {
            let fileurl = "https://image.dhgate.com/" + oo.picObj.picB.fileurl;
            oo.dom1.append('<a href="' + fileurl + '" target="_blank"><img src="' + fileurl + '" class="img-fluid rounded m-1" style="height: 100px;"></a>')
            $("#state").html("正在获取图片Base64...");
            Tool.setImageWH.a01(fileurl,true, 360, 360, "jpeg", this.a06, this, oo);
        },
        a06: function (imageBase64, oo) {
            let l = JSON.stringify({
                imageBase64: imageBase64.split(";base64,")[1],
                appName: "searchImageUpload",
                appKey: "pvvljh1grxcmaay2vgpe9nb68gg9ueg2"
            }), i = this.obj._m_h5_tk,
                p = Date.now(),
                f = "12574478",
                h = {
                    jsv: "2.7.2",
                    appKey: f,
                    t: p,
                    sign: this.b01([i, p, f, l].join("&")),
                    api: "mtop.1688.imageService.putImage",
                    ecode: "0",
                    v: "1.0",
                    type: "originaljson",
                    dataType: "jsonp",
                }, url = "https://h5api.m.1688.com/h5/mtop.1688.imageservice.putimage/1.0/", params = [];
            ////////////////////////////////////////////
            //h = {
            //    jsv: "2.4.11",
            //    appKey: f,
            //    t: p,
            //    sign: this.b01([i, p, f, l].join("&")),
            //    api: "mtop.1688.imageService.putImage",
            //    ecode: "0",
            //    v: "1.0",
            //    type: "originaljson",
            //    dataType: "jsonp",
            //    "_bx-v": "1.1.20"
            //}
            /////////////////////////////////////////
            for (let k in h) {
                params.push(k + "=" + h[k]);
            }
            $("#state").html("正在上传图片...");
            //////////////////////////////////////////////////////////////////////
            let arr1 = [
                {
                    "name": "Origin",
                    "value": "https://s.1688.com"
                },
                {
                    "name": "Referer",
                    "value": "https://s.1688.com/"
                },
                {
                    "name": "Sec-Fetch-Site",
                    "value": 'same-site'
                },
                {
                    "name": "Cookie",
                    "value": this.obj.Cookie
                }
            ]
            gg.setHeaders_postHtml(url + "?" + params.join("&"), arr1, { data: l }, this.a07, this, oo)
            //gg.postFetch(url + "?" + params.join("&"), { data: l }, this.a07, this, oo)//感觉速度差不多
        },
        a07: function (t, oo) {
            if (t.ret[0] == "SUCCESS::调用成功") {
                let url = "https://search.1688.com/service/getSearchImageUpload?imageId=" + t.data.imageId + "&pageName=image&sessionId=" + t.data.sessionId;
                oo.picObj.picA._1688 = {
                    imageBase64: url,
                    data: t.data
                }//更新时要用
                $("#state").html("上传后图片...");
                oo.dom2.append('<a href="' + url + '" target="_blank">' + url + '</a><br/>')
                this.d01(oo);
            }
            else if (t[0] == "FAIL_SYS_TOKEN_EMPTY::令牌为空") {
                this.a05("", oo)
            }
            else {
                Tool.pre(["上传图片出错01：", t])
            }
        },
        ////////////////////////////////       
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
        ///////////////////////////////////////////////////////////
        d01: function (oo) {
            let data = oo.picObj.picA._1688.data
            let arr = [
                "tab=imageSearch",
                "imageAddress=",
                "imageId=" + data.imageId,
                "spm=a260k.dacugeneral.search.0",
                "imageIdList=" + data.imageId,
                "sortField=normal",
                "sortType=desc#sm-filtbar"
            ]
            let url = "https://s.1688.com/youyuan/index.htm" + "?" + arr.join("&")
            $("#state").html('<a href="' + url + '" target="_blank">' + url + '</a>')
            gg.getFetch(url,"json", this.d02, this, oo)
        },
        d02: function (t, oo) {
            if (typeof (t) == "string") {
                if (t.indexOf('window.data.offerresultData = successDataCheck(') != -1) {
                    let str = Tool.StrSlice(t, 'window.data.offerresultData = successDataCheck(', ');\n')
                    let o1 = {}
                    eval("o1=" + str)
                    this.e01(o1.data.offerList, oo);
                }
                else {
                    Tool.at("搜图已改版:\n\n" + t)
                }
            }
            else if (t.data.url) {
                this.obj._m_h5_tk = "";//清空，好去用新的。
                Tool.captcha.a01(t.data.url, this.d03, this, oo)
            }
            else {
                Tool.pre(["搜图出错", t])
            }
        },
        d03: function (oo) {
            this.a02(oo)
        },
        ////////////////////////////////////
        e01: function (arr, oo) {
            let len = arr.length < 5 ? arr.length : 5;
            let newArr = [], idArr = [];
            for (let i = 0; i < len; i++) {
                ////////////////////////////////////
                let valL = [
                    "@.addtime",//添加时间
                    "@.companyName",//公司（如：义乌市彤鑫贸易有限公司）
                    "@.province",//发货地（如：浙江）
                    "@.city",//发货地（如：浙江）
                    "@.imgUrl",//图片
                    "@.subject",//标题（如：跨境欧美创意眼睛烫钻钥匙扣时尚包包恶魔之眼流苏挂件）
                    "@.fromid",//ID
                    "@.categoryId",//类目ID
                    "@.brand",//品牌
                    "@.companyUrl",//店铺URL
                ]
                /////////////////////////////////////
                let valR = [
                    Tool.gettime(""),//添加时间
                    Tool.rpsql(arr[i].company.name),
                    Tool.rpsql(arr[i].company.province),
                    Tool.rpsql(arr[i].company.city),
                    Tool.rpsql(arr[i].image.imgUrl),//图片
                    Tool.rpsql(arr[i].information.subject),//标题
                    arr[i].id,
                    arr[i].information.categoryId,//类目ID
                    Tool.rpsql(arr[i].brand.name),//品牌
                    Tool.rpsql(arr[i].company.url),//店铺URL
                ]
                ////////////////////////////////////
                newArr.push('\
                <if "Fun(Db(sqlite.1688,select count(1) from @.proList where @.fromId=' + arr[i].id + ',count))"=="0">\
                    <r: db="sqlite.1688">insert into @.proList('+ valL.join(",") + ')values(' + valR.join(",") + ')</r:>\
                </if>')
                ////////////////////////////////////
                idArr.push(arr[i].id)
            }
            oo.picObj.picA._1688.idArr = idArr;//更新时要用
            this.e02(newArr, oo);
        },
        e02: function (newArr, oo) {
            $("#state").html("正在更新数据...");
            Tool.ajax.a01('"ok"' + newArr.join(""), 1, this.e03, this, oo)
        },
        e03: function (t, oo) {
            if (t == "ok") {
                $("#state").html("完");
                Tool.apply(oo.picObj, oo.next, oo.This, oo.t);
            }
            else {
                $("#state").html("如果有俩个SQL语句同时运行，就出这个错。");
                this.a02(oo)
                //Tool.pre(["更新出错001：", t])
            }
        },
    },
})