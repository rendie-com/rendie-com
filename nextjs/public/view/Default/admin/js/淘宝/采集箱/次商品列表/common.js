Object.assign(Tool, {
    //返回详情URL
    getDesUrl: {
        obj: {
            _m_h5_tk: ""
        },
        a01: function (url, next, This, t) {
            let oo = {
                url: url,
                next: next,
                This: This,
                t: t
            }

            $("#state").html("正在获取Cookies...");
            //笔记：用gg.getAllCookies获取不到“_m_h5_tk”            gg.getAllCookies(["https://taobao.com"], this.a02, this, oo)
            let arr = ["https://taobao.com"]
            gg.tabs_remove_create_getHeaders(2, arr[0], arr,true, this.a02, this, oo)

        },
        a02: function (t, oo) {
            let Cookie = "";
            for (let i = 0; i < t.requestHeaders.length; i++) {
                if (t.requestHeaders[i].name == "Cookie") {
                    Cookie = t.requestHeaders[i].value;
                    break;
                }
            }
            if (Cookie) {
                let _m_h5_tk = Cookie.split("_m_h5_tk=")[1];
                _m_h5_tk = _m_h5_tk.split("_")[0];
                this.obj._m_h5_tk = _m_h5_tk;//下次要用 
                this.a03(Cookie, _m_h5_tk, oo)
            }
            else {
                Tool.at("没有得到Cookies")
            }
        },
        a03: function (Cookie, _m_h5_tk, oo) {
            let urlObj = this.b01(oo.url)
            let d = urlObj.id, h = urlObj.spm || ""
            //////////////////////////////////////////////////
            let paramData = JSON.stringify({
                id: d,
                detail_v: "3.3.2",
                exParams: JSON.stringify({
                    domain: "https://item.taobao.com",
                    id: d,
                    path_name: "/item.htm",
                    queryParams: "id=" + d + "&spm=" + h,
                    spm: h
                })
            })
            ///////////////////////////////////////
            let paramDetail = JSON.stringify({
                id: d,
                spm: h,
                detail_v: "3.3.0",
                preferWireless: "true"
            })
            /////////////////////////////////////////////////////
            this.a04(Cookie, _m_h5_tk, paramData, paramDetail, oo)
        },
        a04: function (Cookie, _m_h5_tk, paramData, paramDetail, oo) {
            let timestamp = (new Date).getTime();
            let signData = this.b02(_m_h5_tk, timestamp, paramData)
            let signDetail = this.b03(_m_h5_tk, timestamp, paramDetail)
            let returnObj = {
                dataUrl: "https://h5api.m.taobao.com/h5/mtop.taobao.pcdetail.data.get/1.0/?jsv=2.6.1&appKey=12574478&t=" + timestamp + "&sign=" + signData + "&api=mtop.taobao.pcdetail.data.get&v=1.0&isSec=0&ecode=0&timeout=10000&ttid=2022%40taobao_litepc_9.17.0&AntiFlood=true&AntiCreep=true&dataType=json&valueType=string&preventFallback=true&type=json&data=" + encodeURIComponent(paramData),
                productDetailUrl: "https://h5api.m.".concat("taobao", ".com/h5/mtop.taobao.detail.getdesc/7.0/?jsv=2.7.0") + "&appKey=12574478&t=" + timestamp + "&sign=" + signDetail + "&api=mtop.taobao.detail.getdesc&v=7.0&isSec=0&ecode=0&AntiFlood=true&AntiCreep=true&H5Request=true&timeout=3000&ttid=2022%40tmall_litepc_9.17.0&type=jsonp&dataType=jsonp&smToken=token&queryToken=sm&sm=sm&callback=mtopjsonp3&data=" + encodeURIComponent(paramDetail),
                Cookie: Cookie
            }
            Tool.apply(returnObj, oo.next, oo.This, oo.t);
        },
        b01: function (e) {
            var t = new URLSearchParams(e.split("?")[1]);
            return Object.fromEntries(t.entries())
        },
        b02: function (e, t, n) {
            return function (e) {
                function t(e, t) {
                    return e << t | e >>> 32 - t
                }
                function n(e, t) {
                    var n, r, i, a, o;
                    return i = 2147483648 & e,
                        a = 2147483648 & t,
                        n = 1073741824 & e,
                        r = 1073741824 & t,
                        o = (1073741823 & e) + (1073741823 & t),
                        n & r ? 2147483648 ^ o ^ i ^ a : n | r ? 1073741824 & o ? 3221225472 ^ o ^ i ^ a : 1073741824 ^ o ^ i ^ a : o ^ i ^ a
                }
                function r(e, t, n) {
                    return e & t | ~e & n
                }
                function i(e, t, n) {
                    return e & n | t & ~n
                }
                function a(e, t, n) {
                    return e ^ t ^ n
                }
                function o(e, t, n) {
                    return t ^ (e | ~n)
                }
                function s(e, i, a, o, s, c, l) {
                    return e = n(e, n(n(r(i, a, o), s), l)),
                        n(t(e, c), i)
                }
                function c(e, r, a, o, s, c, l) {
                    return e = n(e, n(n(i(r, a, o), s), l)),
                        n(t(e, c), r)
                }
                function l(e, r, i, o, s, c, l) {
                    return e = n(e, n(n(a(r, i, o), s), l)),
                        n(t(e, c), r)
                }
                function u(e, r, i, a, s, c, l) {
                    return e = n(e, n(n(o(r, i, a), s), l)),
                        n(t(e, c), r)
                }
                function d(e) {
                    for (var t, n = e.length, r = n + 8, i = (r - r % 64) / 64, a = 16 * (i + 1), o = new Array(a - 1), s = 0, c = 0; n > c;)
                        t = (c - c % 4) / 4,
                            s = c % 4 * 8,
                            o[t] = o[t] | e.charCodeAt(c) << s,
                            c++;
                    return t = (c - c % 4) / 4,
                        s = c % 4 * 8,
                        o[t] = o[t] | 128 << s,
                        o[a - 2] = n << 3,
                        o[a - 1] = n >>> 29,
                        o
                }
                function h(e) {
                    var t, n, r = "", i = "";
                    for (n = 0; 3 >= n; n++)
                        t = e >>> 8 * n & 255,
                            i = "0" + t.toString(16),
                            r += i.substr(i.length - 2, 2);
                    return r
                }
                function f(e) {
                    e = e.replace(/\r\n/g, "\n");
                    for (var t = "", n = 0; n < e.length; n++) {
                        var r = e.charCodeAt(n);
                        128 > r ? t += String.fromCharCode(r) : r > 127 && 2048 > r ? (t += String.fromCharCode(r >> 6 | 192),
                            t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
                                t += String.fromCharCode(r >> 6 & 63 | 128),
                                t += String.fromCharCode(63 & r | 128))
                    }
                    return t
                }
                var p, m, g, v, b, y, _, x, w, k = [], S = 7, C = 12, O = 17, T = 22, A = 5, E = 9, P = 14, j = 20, D = 4, I = 11, M = 16, R = 23, L = 6, N = 10, B = 15, F = 21;
                for (e = f(e),
                    k = d(e),
                    y = 1732584193,
                    _ = 4023233417,
                    x = 2562383102,
                    w = 271733878,
                    p = 0; p < k.length; p += 16)
                    m = y,
                        g = _,
                        v = x,
                        b = w,
                        y = s(y, _, x, w, k[p + 0], S, 3614090360),
                        w = s(w, y, _, x, k[p + 1], C, 3905402710),
                        x = s(x, w, y, _, k[p + 2], O, 606105819),
                        _ = s(_, x, w, y, k[p + 3], T, 3250441966),
                        y = s(y, _, x, w, k[p + 4], S, 4118548399),
                        w = s(w, y, _, x, k[p + 5], C, 1200080426),
                        x = s(x, w, y, _, k[p + 6], O, 2821735955),
                        _ = s(_, x, w, y, k[p + 7], T, 4249261313),
                        y = s(y, _, x, w, k[p + 8], S, 1770035416),
                        w = s(w, y, _, x, k[p + 9], C, 2336552879),
                        x = s(x, w, y, _, k[p + 10], O, 4294925233),
                        _ = s(_, x, w, y, k[p + 11], T, 2304563134),
                        y = s(y, _, x, w, k[p + 12], S, 1804603682),
                        w = s(w, y, _, x, k[p + 13], C, 4254626195),
                        x = s(x, w, y, _, k[p + 14], O, 2792965006),
                        _ = s(_, x, w, y, k[p + 15], T, 1236535329),
                        y = c(y, _, x, w, k[p + 1], A, 4129170786),
                        w = c(w, y, _, x, k[p + 6], E, 3225465664),
                        x = c(x, w, y, _, k[p + 11], P, 643717713),
                        _ = c(_, x, w, y, k[p + 0], j, 3921069994),
                        y = c(y, _, x, w, k[p + 5], A, 3593408605),
                        w = c(w, y, _, x, k[p + 10], E, 38016083),
                        x = c(x, w, y, _, k[p + 15], P, 3634488961),
                        _ = c(_, x, w, y, k[p + 4], j, 3889429448),
                        y = c(y, _, x, w, k[p + 9], A, 568446438),
                        w = c(w, y, _, x, k[p + 14], E, 3275163606),
                        x = c(x, w, y, _, k[p + 3], P, 4107603335),
                        _ = c(_, x, w, y, k[p + 8], j, 1163531501),
                        y = c(y, _, x, w, k[p + 13], A, 2850285829),
                        w = c(w, y, _, x, k[p + 2], E, 4243563512),
                        x = c(x, w, y, _, k[p + 7], P, 1735328473),
                        _ = c(_, x, w, y, k[p + 12], j, 2368359562),
                        y = l(y, _, x, w, k[p + 5], D, 4294588738),
                        w = l(w, y, _, x, k[p + 8], I, 2272392833),
                        x = l(x, w, y, _, k[p + 11], M, 1839030562),
                        _ = l(_, x, w, y, k[p + 14], R, 4259657740),
                        y = l(y, _, x, w, k[p + 1], D, 2763975236),
                        w = l(w, y, _, x, k[p + 4], I, 1272893353),
                        x = l(x, w, y, _, k[p + 7], M, 4139469664),
                        _ = l(_, x, w, y, k[p + 10], R, 3200236656),
                        y = l(y, _, x, w, k[p + 13], D, 681279174),
                        w = l(w, y, _, x, k[p + 0], I, 3936430074),
                        x = l(x, w, y, _, k[p + 3], M, 3572445317),
                        _ = l(_, x, w, y, k[p + 6], R, 76029189),
                        y = l(y, _, x, w, k[p + 9], D, 3654602809),
                        w = l(w, y, _, x, k[p + 12], I, 3873151461),
                        x = l(x, w, y, _, k[p + 15], M, 530742520),
                        _ = l(_, x, w, y, k[p + 2], R, 3299628645),
                        y = u(y, _, x, w, k[p + 0], L, 4096336452),
                        w = u(w, y, _, x, k[p + 7], N, 1126891415),
                        x = u(x, w, y, _, k[p + 14], B, 2878612391),
                        _ = u(_, x, w, y, k[p + 5], F, 4237533241),
                        y = u(y, _, x, w, k[p + 12], L, 1700485571),
                        w = u(w, y, _, x, k[p + 3], N, 2399980690),
                        x = u(x, w, y, _, k[p + 10], B, 4293915773),
                        _ = u(_, x, w, y, k[p + 1], F, 2240044497),
                        y = u(y, _, x, w, k[p + 8], L, 1873313359),
                        w = u(w, y, _, x, k[p + 15], N, 4264355552),
                        x = u(x, w, y, _, k[p + 6], B, 2734768916),
                        _ = u(_, x, w, y, k[p + 13], F, 1309151649),
                        y = u(y, _, x, w, k[p + 4], L, 4149444226),
                        w = u(w, y, _, x, k[p + 11], N, 3174756917),
                        x = u(x, w, y, _, k[p + 2], B, 718787259),
                        _ = u(_, x, w, y, k[p + 9], F, 3951481745),
                        y = n(y, m),
                        _ = n(_, g),
                        x = n(x, v),
                        w = n(w, b);
                var V = h(y) + h(_) + h(x) + h(w);
                return V.toLowerCase()
            }(e + "&" + t + "&12574478&" + n)
        },
        b03: function (e, t, n) {
            return function (e) {
                function t(e, t) {
                    return e << t | e >>> 32 - t
                }
                function n(e, t) {
                    var n, r, i, a, o;
                    return i = 2147483648 & e,
                        a = 2147483648 & t,
                        o = (1073741823 & e) + (1073741823 & t),
                        (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ o ^ i ^ a : n | r ? 1073741824 & o ? 3221225472 ^ o ^ i ^ a : 1073741824 ^ o ^ i ^ a : o ^ i ^ a
                }
                function r(e, r, i, a, o, s, c) {
                    return e = n(e, n(n(function (e, t, n) {
                        return e & t | ~e & n
                    }(r, i, a), o), c)),
                        n(t(e, s), r)
                }
                function i(e, r, i, a, o, s, c) {
                    return e = n(e, n(n(function (e, t, n) {
                        return e & n | t & ~n
                    }(r, i, a), o), c)),
                        n(t(e, s), r)
                }
                function a(e, r, i, a, o, s, c) {
                    return e = n(e, n(n(function (e, t, n) {
                        return e ^ t ^ n
                    }(r, i, a), o), c)),
                        n(t(e, s), r)
                }
                function o(e, r, i, a, o, s, c) {
                    return e = n(e, n(n(function (e, t, n) {
                        return t ^ (e | ~n)
                    }(r, i, a), o), c)),
                        n(t(e, s), r)
                }
                function s(e) {
                    var t, n = "", r = "";
                    for (t = 0; 3 >= t; t++)
                        n += (r = "0" + (e >>> 8 * t & 255).toString(16)).substr(r.length - 2, 2);
                    return n
                }
                var c, l, u, d, h, f, p, m, g, v;
                for (v = function (e) {
                    for (var t, n = e.length, r = n + 8, i = 16 * ((r - r % 64) / 64 + 1), a = new Array(i - 1), o = 0, s = 0; n > s;)
                        o = s % 4 * 8,
                            a[t = (s - s % 4) / 4] = a[t] | e.charCodeAt(s) << o,
                            s++;
                    return o = s % 4 * 8,
                        a[t = (s - s % 4) / 4] = a[t] | 128 << o,
                        a[i - 2] = n << 3,
                        a[i - 1] = n >>> 29,
                        a
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
                    p = 4023233417,
                    m = 2562383102,
                    g = 271733878,
                    c = 0; c < v.length; c += 16)
                    l = f,
                        u = p,
                        d = m,
                        h = g,
                        f = r(f, p, m, g, v[c + 0], 7, 3614090360),
                        g = r(g, f, p, m, v[c + 1], 12, 3905402710),
                        m = r(m, g, f, p, v[c + 2], 17, 606105819),
                        p = r(p, m, g, f, v[c + 3], 22, 3250441966),
                        f = r(f, p, m, g, v[c + 4], 7, 4118548399),
                        g = r(g, f, p, m, v[c + 5], 12, 1200080426),
                        m = r(m, g, f, p, v[c + 6], 17, 2821735955),
                        p = r(p, m, g, f, v[c + 7], 22, 4249261313),
                        f = r(f, p, m, g, v[c + 8], 7, 1770035416),
                        g = r(g, f, p, m, v[c + 9], 12, 2336552879),
                        m = r(m, g, f, p, v[c + 10], 17, 4294925233),
                        p = r(p, m, g, f, v[c + 11], 22, 2304563134),
                        f = r(f, p, m, g, v[c + 12], 7, 1804603682),
                        g = r(g, f, p, m, v[c + 13], 12, 4254626195),
                        m = r(m, g, f, p, v[c + 14], 17, 2792965006),
                        f = i(f, p = r(p, m, g, f, v[c + 15], 22, 1236535329), m, g, v[c + 1], 5, 4129170786),
                        g = i(g, f, p, m, v[c + 6], 9, 3225465664),
                        m = i(m, g, f, p, v[c + 11], 14, 643717713),
                        p = i(p, m, g, f, v[c + 0], 20, 3921069994),
                        f = i(f, p, m, g, v[c + 5], 5, 3593408605),
                        g = i(g, f, p, m, v[c + 10], 9, 38016083),
                        m = i(m, g, f, p, v[c + 15], 14, 3634488961),
                        p = i(p, m, g, f, v[c + 4], 20, 3889429448),
                        f = i(f, p, m, g, v[c + 9], 5, 568446438),
                        g = i(g, f, p, m, v[c + 14], 9, 3275163606),
                        m = i(m, g, f, p, v[c + 3], 14, 4107603335),
                        p = i(p, m, g, f, v[c + 8], 20, 1163531501),
                        f = i(f, p, m, g, v[c + 13], 5, 2850285829),
                        g = i(g, f, p, m, v[c + 2], 9, 4243563512),
                        m = i(m, g, f, p, v[c + 7], 14, 1735328473),
                        f = a(f, p = i(p, m, g, f, v[c + 12], 20, 2368359562), m, g, v[c + 5], 4, 4294588738),
                        g = a(g, f, p, m, v[c + 8], 11, 2272392833),
                        m = a(m, g, f, p, v[c + 11], 16, 1839030562),
                        p = a(p, m, g, f, v[c + 14], 23, 4259657740),
                        f = a(f, p, m, g, v[c + 1], 4, 2763975236),
                        g = a(g, f, p, m, v[c + 4], 11, 1272893353),
                        m = a(m, g, f, p, v[c + 7], 16, 4139469664),
                        p = a(p, m, g, f, v[c + 10], 23, 3200236656),
                        f = a(f, p, m, g, v[c + 13], 4, 681279174),
                        g = a(g, f, p, m, v[c + 0], 11, 3936430074),
                        m = a(m, g, f, p, v[c + 3], 16, 3572445317),
                        p = a(p, m, g, f, v[c + 6], 23, 76029189),
                        f = a(f, p, m, g, v[c + 9], 4, 3654602809),
                        g = a(g, f, p, m, v[c + 12], 11, 3873151461),
                        m = a(m, g, f, p, v[c + 15], 16, 530742520),
                        f = o(f, p = a(p, m, g, f, v[c + 2], 23, 3299628645), m, g, v[c + 0], 6, 4096336452),
                        g = o(g, f, p, m, v[c + 7], 10, 1126891415),
                        m = o(m, g, f, p, v[c + 14], 15, 2878612391),
                        p = o(p, m, g, f, v[c + 5], 21, 4237533241),
                        f = o(f, p, m, g, v[c + 12], 6, 1700485571),
                        g = o(g, f, p, m, v[c + 3], 10, 2399980690),
                        m = o(m, g, f, p, v[c + 10], 15, 4293915773),
                        p = o(p, m, g, f, v[c + 1], 21, 2240044497),
                        f = o(f, p, m, g, v[c + 8], 6, 1873313359),
                        g = o(g, f, p, m, v[c + 15], 10, 4264355552),
                        m = o(m, g, f, p, v[c + 6], 15, 2734768916),
                        p = o(p, m, g, f, v[c + 13], 21, 1309151649),
                        f = o(f, p, m, g, v[c + 4], 6, 4149444226),
                        g = o(g, f, p, m, v[c + 11], 10, 3174756917),
                        m = o(m, g, f, p, v[c + 2], 15, 718787259),
                        p = o(p, m, g, f, v[c + 9], 21, 3951481745),
                        f = n(f, l),
                        p = n(p, u),
                        m = n(m, d),
                        g = n(g, h);
                return (s(f) + s(p) + s(m) + s(g)).toLowerCase()
            }(e + "&" + t + "&12574478&" + n)
        },
    }
})