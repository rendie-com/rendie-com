var p = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
}
  , q = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function r() {
    r = function() {}
    ;
    q.Symbol || (q.Symbol = aa)
}
var aa = function() {
    var a = 0;
    return function(b) {
        return "jscomp_symbol_" + (b || "") + a++
    }
}();
function u() {
    r();
    var a = q.Symbol.iterator;
    a || (a = q.Symbol.iterator = q.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && p(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return v(this)
        }
    });
    u = function() {}
}
function v(a) {
    var b = 0;
    return ba(function() {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    })
}
function ba(a) {
    u();
    a = {
        next: a
    };
    a[q.Symbol.iterator] = function() {
        return this
    }
    ;
    return a
}
function x(a) {
    u();
    r();
    u();
    var b = a[Symbol.iterator];
    return b ? b.call(a) : v(a)
}
function y(a, b) {
    if (b) {
        var c = q;
        a = a.split(".");
        for (var g = 0; g < a.length - 1; g++) {
            var l = a[g];
            l in c || (c[l] = {});
            c = c[l]
        }
        a = a[a.length - 1];
        g = c[a];
        b = b(g);
        b != g && null != b && p(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
y("Promise", function(a) {
    function b(a) {
        this.A = 0;
        this.Y = void 0;
        this.w = [];
        var b = this.L();
        try {
            a(b.resolve, b.reject)
        } catch (k) {
            b.reject(k)
        }
    }
    function c() {
        this.g = null
    }
    function g(a) {
        return a instanceof b ? a : new b(function(b) {
            b(a)
        }
        )
    }
    if (a)
        return a;
    c.prototype.ca = function(a) {
        null == this.g && (this.g = [],
        this.sa());
        this.g.push(a)
    }
    ;
    c.prototype.sa = function() {
        var a = this;
        this.da(function() {
            a.xa()
        })
    }
    ;
    var l = q.setTimeout;
    c.prototype.da = function(a) {
        l(a, 0)
    }
    ;
    c.prototype.xa = function() {
        for (; this.g && this.g.length; ) {
            var a = this.g;
            this.g = [];
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                delete a[b];
                try {
                    c()
                } catch (f) {
                    this.ta(f)
                }
            }
        }
        this.g = null
    }
    ;
    c.prototype.ta = function(a) {
        this.da(function() {
            throw a;
        })
    }
    ;
    b.prototype.L = function() {
        function a(a) {
            return function(d) {
                c || (c = !0,
                a.call(b, d))
            }
        }
        var b = this
          , c = !1;
        return {
            resolve: a(this.Ra),
            reject: a(this.X)
        }
    }
    ;
    b.prototype.Ra = function(a) {
        if (a === this)
            this.X(new TypeError("A Promise cannot resolve to itself"));
        else if (a instanceof b)
            this.Va(a);
        else {
            a: switch (typeof a) {
            case "object":
                var c = null != a;
                break a;
            case "function":
                c = !0;
                break a;
            default:
                c = !1
            }
            c ? this.Qa(a) : this.fa(a)
        }
    }
    ;
    b.prototype.Qa = function(a) {
        var b = void 0;
        try {
            b = a.then
        } catch (k) {
            this.X(k);
            return
        }
        "function" == typeof b ? this.Wa(b, a) : this.fa(a)
    }
    ;
    b.prototype.X = function(a) {
        this.ka(2, a)
    }
    ;
    b.prototype.fa = function(a) {
        this.ka(1, a)
    }
    ;
    b.prototype.ka = function(a, b) {
        if (0 != this.A)
            throw Error("Cannot settle(" + a + ", " + b | "): Promise already settled in state" + this.A);
        this.A = a;
        this.Y = b;
        this.ya()
    }
    ;
    b.prototype.ya = function() {
        if (null != this.w) {
            for (var a = this.w, b = 0; b < a.length; ++b)
                a[b].call(),
                a[b] = null;
            this.w = null
        }
    }
    ;
    var m = new c;
    b.prototype.Va = function(a) {
        var b = this.L();
        a.F(b.resolve, b.reject)
    }
    ;
    b.prototype.Wa = function(a, b) {
        var c = this.L();
        try {
            a.call(b, c.resolve, c.reject)
        } catch (f) {
            c.reject(f)
        }
    }
    ;
    b.prototype.then = function(a, c) {
        function g(a, b) {
            return "function" == typeof a ? function(b) {
                try {
                    f(a(b))
                } catch (w) {
                    d(w)
                }
            }
            : b
        }
        var f, d, e = new b(function(a, b) {
            f = a;
            d = b
        }
        );
        this.F(g(a, f), g(c, d));
        return e
    }
    ;
    b.prototype.catch = function(a) {
        return this.then(void 0, a)
    }
    ;
    b.prototype.F = function(a, b) {
        function c() {
            switch (g.A) {
            case 1:
                a(g.Y);
                break;
            case 2:
                b(g.Y);
                break;
            default:
                throw Error("Unexpected state: " + g.A);
            }
        }
        var g = this;
        null == this.w ? m.ca(c) : this.w.push(function() {
            m.ca(c)
        })
    }
    ;
    b.resolve = g;
    b.reject = function(a) {
        return new b(function(b, c) {
            c(a)
        }
        )
    }
    ;
    b.race = function(a) {
        return new b(function(b, c) {
            for (var f = x(a), d = f.next(); !d.done; d = f.next())
                g(d.value).F(b, c)
        }
        )
    }
    ;
    b.all = function(a) {
        var c = x(a)
          , k = c.next();
        return k.done ? g([]) : new b(function(a, b) {
            function d(b) {
                return function(c) {
                    f[b] = c;
                    l--;
                    0 == l && a(f)
                }
            }
            var f = []
              , l = 0;
            do
                f.push(void 0),
                l++,
                g(k.value).F(d(f.length - 1), b),
                k = c.next();
            while (!k.done)
        }
        )
    }
    ;
    return b
});
function ca(a) {
    function b(b) {
        return a.next(b)
    }
    function c(b) {
        return a.throw(b)
    }
    new Promise(function(g, l) {
        function m(a) {
            a.done ? g(a.value) : Promise.resolve(a.value).then(b, c).then(m, l)
        }
        m(a.next())
    }
    )
}
var da = "function" == typeof Object.create ? Object.create : function(a) {
    function b() {}
    b.prototype = a;
    return new b
}
, z;
if ("function" == typeof Object.setPrototypeOf)
    z = Object.setPrototypeOf;
else {
    var A;
    a: {
        var ea = {
            ra: !0
        }
          , B = {};
        try {
            B.__proto__ = ea;
            A = B.ra;
            break a
        } catch (a) {}
        A = !1
    }
    z = A ? function(a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b)
            throw new TypeError(a + " is not extensible");
        return a
    }
    : null
}
var C = z;
y("Array.prototype.fill", function(a) {
    return a ? a : function(a, c, g) {
        var b = this.length || 0;
        0 > c && (c = Math.max(0, b + c));
        if (null == g || g > b)
            g = b;
        g = Number(g);
        0 > g && (g = Math.max(0, b + g));
        for (c = Number(c || 0); c < g; c++)
            this[c] = a;
        return this
    }
});
function D() {
    this.callbacks = []
}
D.prototype.add = function(a) {
    this.callbacks.push(a)
}
;
D.prototype.remove = function(a) {
    for (; ; ) {
        var b = this.callbacks.indexOf(a);
        if (-1 == b)
            break;
        this.callbacks.splice(b, 1)
    }
}
;
D.prototype.fire = function(a) {
    this.callbacks.forEach(function(b) {
        b.call("stub callback this", a)
    })
}
;
function E() {
    var a = [["edge", /Edge\/([0-9\._]+)/], ["chrome", /Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/], ["opera", /Opera\/([0-9\.]+)(?:\s|$)/], ["ie", /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/], ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ["ie", /MSIE\s(7\.0)/], ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/], ["android", /Android\s([0-9\.]+)/], ["ios", /iPad\;\sCPU\sOS\s([0-9\._]+)/], ["ios", /iPhone\;\sCPU\siPhone\sOS\s([0-9\._]+)/], ["safari", /Safari\/([0-9\._]+)/]], b, c = [];
    for (b = 0; b < a.length; b++) {
        var g = b;
        var l = a[b];
        l = l.concat(l[1].exec(navigator.userAgent));
        a[g] = l;
        a[b][2] && c.push(a[b])
    }
    for (b = (a = c[0]) && a[3].split(/[._]/).slice(0, 3); b && 3 > b.length; )
        b.push("0");
    c = {};
    c.name = a && a[0];
    c.version = b && b.join(".");
    c.versionInt = parseInt(c.version, 10);
    return c
}
;var fa = {
    Ca: function(a) {
        return a + Math.random()
    },
    cb: function(a) {
        for (var b = a.length, c, g; 0 !== b; )
            g = Math.floor(Math.random() * b),
            --b,
            c = a[b],
            a[b] = a[g],
            a[g] = c;
        return a
    },
    bb: function(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a)
    }
}
  , G = {
    u: function(a) {
        return chrome.i18n.getMessage(a)
    }
};
function H(a) {
    H.Ya.constructor.apply(this, arguments);
    this.create()
}
(function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.Ya = b.prototype
}
)(H, function(a) {
    this.a = a;
    this.v = null
});
H.prototype.create = function() {
    var a = this
      , b = {
        type: "progress",
        title: "Lightshot",
        message: G.u("screenshot_plugin_uploading_window_capt"),
        iconUrl: "img/icon256.png",
        buttons: [{
            title: G.u("screenshot_plugin_cancel")
        }],
        isClickable: !0,
        progress: 0
    };
    "chrome" == E().name && 50 <= E().versionInt && (b.requireInteraction = !0);
    delete b.buttons;
    chrome.notifications.create(this.a, b, function() {
        a.v = "uploading"
    })
}
;
H.prototype.update = function() {}
;
function ia() {
    function a(a) {
        chrome.notifications.clear(a, function() {});
        delete b[a]
    }
    var b = {};
    chrome.notifications.onClicked.addListener(function(a) {
        a = b[a];
        "success" === a.v && I.sendMessage({
            name: J,
            id: a.a
        })
    });
    chrome.notifications.onButtonClicked.addListener(function(a, g) {
        a = b[a];
        "uploading" === a.v && 0 === g ? I.sendMessage({
            name: K,
            id: a.a
        }) : "success" === a.v ? 0 === g ? I.sendMessage({
            name: L,
            id: a.a
        }) : 1 === g && I.sendMessage({
            name: J,
            id: a.a
        }) : "failed" === a.v && (0 === g ? I.sendMessage({
            name: M,
            id: a.a
        }) : 1 === g && I.sendMessage({
            name: K,
            id: a.a
        }))
    });
    return {
        va: function(c) {
            a(c);
            b[c] = new H(c)
        },
        la: function(a, g) {
            b[a].update(g)
        },
        G: a
    }
}
;var N = function() {
    function a() {
        return "https://api.prntscr.com/v1.1/"
    }
    return {
        save: function(b, c) {
            b && "undefined" != typeof b && "undefined" != typeof b.img_url && (b = new Request(a(),{
                method: "POST",
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "save",
                    params: b
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }),
            fetch(b).then(function(a) {
                return a.json()
            }).then(function(a) {
                console.log("attach_extension fetch: " + a);
                "undefined" != typeof a.result ? c(a.result) : c(null)
            }))
        },
        ua: function(b, c, g, l) {
            b && "undefined" != typeof b && (b = new Request(a(),{
                method: "POST",
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "attach_extension",
                    params: {
                        auth: b,
                        app_id: c,
                        app_description: g
                    }
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }),
            fetch(b).then(function(a) {
                return a.json()
            }).then(function(a) {
                console.log("attach_extension fetch: " + a);
                "undefined" != typeof a.result ? l(a.result) : l(null)
            }))
        },
        wa: function(b, c, g) {
            console.log("detach_application_ext");
            b && "undefined" != typeof b && c && "undefined" != typeof c && (b = new Request(a(),{
                method: "POST",
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "detach_application_ext",
                    params: {
                        app_id: b,
                        app_token: c
                    }
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }),
            fetch(b).then(function(a) {
                return a.json()
            }).then(function(a) {
                console.log("detach_application_ext fetch: " + a);
                "undefined" != typeof a.result ? g(a.result) : g(null)
            }))
        },
        Fa: a
    }
}();
if ("function" !== typeof O)
    var O = function() {
        function a(a, k) {
            var f = a[0]
              , d = a[1]
              , e = a[2]
              , h = a[3];
            f = c(f, d, e, h, k[0], 7, -680876936);
            h = c(h, f, d, e, k[1], 12, -389564586);
            e = c(e, h, f, d, k[2], 17, 606105819);
            d = c(d, e, h, f, k[3], 22, -1044525330);
            f = c(f, d, e, h, k[4], 7, -176418897);
            h = c(h, f, d, e, k[5], 12, 1200080426);
            e = c(e, h, f, d, k[6], 17, -1473231341);
            d = c(d, e, h, f, k[7], 22, -45705983);
            f = c(f, d, e, h, k[8], 7, 1770035416);
            h = c(h, f, d, e, k[9], 12, -1958414417);
            e = c(e, h, f, d, k[10], 17, -42063);
            d = c(d, e, h, f, k[11], 22, -1990404162);
            f = c(f, d, e, h, k[12], 7, 1804603682);
            h = c(h, f, d, e, k[13], 12, -40341101);
            e = c(e, h, f, d, k[14], 17, -1502002290);
            d = c(d, e, h, f, k[15], 22, 1236535329);
            f = g(f, d, e, h, k[1], 5, -165796510);
            h = g(h, f, d, e, k[6], 9, -1069501632);
            e = g(e, h, f, d, k[11], 14, 643717713);
            d = g(d, e, h, f, k[0], 20, -373897302);
            f = g(f, d, e, h, k[5], 5, -701558691);
            h = g(h, f, d, e, k[10], 9, 38016083);
            e = g(e, h, f, d, k[15], 14, -660478335);
            d = g(d, e, h, f, k[4], 20, -405537848);
            f = g(f, d, e, h, k[9], 5, 568446438);
            h = g(h, f, d, e, k[14], 9, -1019803690);
            e = g(e, h, f, d, k[3], 14, -187363961);
            d = g(d, e, h, f, k[8], 20, 1163531501);
            f = g(f, d, e, h, k[13], 5, -1444681467);
            h = g(h, f, d, e, k[2], 9, -51403784);
            e = g(e, h, f, d, k[7], 14, 1735328473);
            d = g(d, e, h, f, k[12], 20, -1926607734);
            f = b(d ^ e ^ h, f, d, k[5], 4, -378558);
            h = b(f ^ d ^ e, h, f, k[8], 11, -2022574463);
            e = b(h ^ f ^ d, e, h, k[11], 16, 1839030562);
            d = b(e ^ h ^ f, d, e, k[14], 23, -35309556);
            f = b(d ^ e ^ h, f, d, k[1], 4, -1530992060);
            h = b(f ^ d ^ e, h, f, k[4], 11, 1272893353);
            e = b(h ^ f ^ d, e, h, k[7], 16, -155497632);
            d = b(e ^ h ^ f, d, e, k[10], 23, -1094730640);
            f = b(d ^ e ^ h, f, d, k[13], 4, 681279174);
            h = b(f ^ d ^ e, h, f, k[0], 11, -358537222);
            e = b(h ^ f ^ d, e, h, k[3], 16, -722521979);
            d = b(e ^ h ^ f, d, e, k[6], 23, 76029189);
            f = b(d ^ e ^ h, f, d, k[9], 4, -640364487);
            h = b(f ^ d ^ e, h, f, k[12], 11, -421815835);
            e = b(h ^ f ^ d, e, h, k[15], 16, 530742520);
            d = b(e ^ h ^ f, d, e, k[2], 23, -995338651);
            f = l(f, d, e, h, k[0], 6, -198630844);
            h = l(h, f, d, e, k[7], 10, 1126891415);
            e = l(e, h, f, d, k[14], 15, -1416354905);
            d = l(d, e, h, f, k[5], 21, -57434055);
            f = l(f, d, e, h, k[12], 6, 1700485571);
            h = l(h, f, d, e, k[3], 10, -1894986606);
            e = l(e, h, f, d, k[10], 15, -1051523);
            d = l(d, e, h, f, k[1], 21, -2054922799);
            f = l(f, d, e, h, k[8], 6, 1873313359);
            h = l(h, f, d, e, k[15], 10, -30611744);
            e = l(e, h, f, d, k[6], 15, -1560198380);
            d = l(d, e, h, f, k[13], 21, 1309151649);
            f = l(f, d, e, h, k[4], 6, -145523070);
            h = l(h, f, d, e, k[11], 10, -1120210379);
            e = l(e, h, f, d, k[2], 15, 718787259);
            d = l(d, e, h, f, k[9], 21, -343485551);
            a[0] = f + a[0] & 4294967295;
            a[1] = d + a[1] & 4294967295;
            a[2] = e + a[2] & 4294967295;
            a[3] = h + a[3] & 4294967295
        }
        function b(a, b, c, d, g, h) {
            b = (b + a & 4294967295) + (d + h & 4294967295) & 4294967295;
            return (b << g | b >>> 32 - g) + c & 4294967295
        }
        function c(a, c, g, d, e, h, l) {
            return b(c & g | ~c & d, a, c, e, h, l)
        }
        function g(a, c, g, d, e, h, l) {
            return b(c & d | g & ~d, a, c, e, h, l)
        }
        function l(a, c, g, d, e, h, l) {
            return b(g ^ (c | ~d), a, c, e, h, l)
        }
        function m(b) {
            var c = b
              , g = c.length;
            b = [1732584193, -271733879, -1732584194, 271733878];
            var d;
            for (d = 64; d <= c.length; d += 64) {
                var e, h = c.substring(d - 64, d), l = [];
                for (e = 0; 64 > e; e += 4)
                    l[e >> 2] = h.charCodeAt(e) + (h.charCodeAt(e + 1) << 8) + (h.charCodeAt(e + 2) << 16) + (h.charCodeAt(e + 3) << 24);
                a(b, l)
            }
            c = c.substring(d - 64);
            e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (d = 0; d < c.length; d++)
                e[d >> 2] |= c.charCodeAt(d) << (d % 4 << 3);
            e[d >> 2] |= 128 << (d % 4 << 3);
            if (55 < d)
                for (a(b, e),
                d = 0; 16 > d; d++)
                    e[d] = 0;
            e[14] = 8 * g;
            a(b, e);
            for (c = 0; c < b.length; c++) {
                g = b[c];
                d = "";
                for (e = 0; 4 > e; e++)
                    d += t[g >> 8 * e + 4 & 15] + t[g >> 8 * e & 15];
                b[c] = d
            }
            return b.join("")
        }
        var t = "0123456789abcdef".split("");
        m("hello");
        return m
    }();
/*
 The MIT License: Copyright (c) 2010-2017 LiosK.
*/
var P;
P = function(a) {
    function b() {
        var a = c.f;
        this.timestamp = 0;
        this.s = a(14);
        this.node = 1099511627776 * (a(8) | 1) + a(40);
        this.B = a(4)
    }
    function c() {}
    c.ga = function() {
        var a = c.f
          , b = c.ba;
        return b(a(32), 8) + "-" + b(a(16), 4) + "-" + b(16384 | a(12), 4) + "-" + b(32768 | a(14), 4) + "-" + b(a(48), 12)
    }
    ;
    c.f = function(a) {
        if (0 > a || 53 < a)
            return NaN;
        var b = 0 | 1073741824 * Math.random();
        return 30 < a ? b + 1073741824 * (0 | Math.random() * (1 << a - 30)) : b >>> 30 - a
    }
    ;
    c.ba = function(a, b) {
        a = a.toString(16);
        b -= a.length;
        for (var c = "0"; 0 < b; b >>>= 1,
        c += c)
            b & 1 && (a = c + a);
        return a
    }
    ;
    c.ab = a;
    (function() {
        var a = c.f;
        c.gb = function() {
            c.f = a
        }
        ;
        var b = null
          , m = a;
        "undefined" !== typeof window && (b = window.crypto || window.$a) ? b.getRandomValues && "undefined" !== typeof Uint32Array && (m = function(a) {
            if (0 > a || 53 < a)
                return NaN;
            var c = b.getRandomValues(new Uint32Array(32 < a ? 2 : 1));
            return 32 < a ? c[0] + 4294967296 * (c[1] >>> 64 - a) : c[0] >>> 32 - a
        }
        ) : "undefined" !== typeof require && (b = require("crypto")) && b.La && (m = function(a) {
            if (0 > a || 53 < a)
                return NaN;
            var c = b.La(32 < a ? 8 : 4)
              , g = c.Ma(0);
            return 32 < a ? g + 4294967296 * (c.Ma(4) >>> 64 - a) : g >>> 32 - a
        }
        );
        c.f = m
    }
    )();
    c.ma = "timeLow timeMid timeHiAndVersion clockSeqHiAndReserved clockSeqLow node".split(" ");
    c.na = [32, 16, 16, 8, 8, 48];
    c.Ba = function() {
        var a = c.f;
        return (new c).D(a(32), a(16), 16384 | a(12), 128 | a(6), a(8), a(48))
    }
    ;
    c.parse = function(a) {
        if (a = /^\s*(urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(\})?\s*$/i.exec(a)) {
            var b = a[1] || ""
              , g = a[8] || "";
            if ("" === b + g || "{" === b && "}" === g || "urn:uuid:" === b.toLowerCase() && "" === g)
                return (new c).D(parseInt(a[2], 16), parseInt(a[3], 16), parseInt(a[4], 16), parseInt(a[5], 16), parseInt(a[6], 16), parseInt(a[7], 16))
        }
        return null
    }
    ;
    c.prototype.D = function() {
        var a = c.ma
          , b = c.na
          , m = c.oa
          , t = c.ba;
        this.O = Array(6);
        this.ea = Array(6);
        this.h = Array(6);
        for (var n = 0; 6 > n; n++) {
            var k = parseInt(arguments[n] || 0);
            this.O[n] = this.O[a[n]] = k;
            this.ea[n] = this.ea[a[n]] = m(k, b[n]);
            this.h[n] = this.h[a[n]] = t(k, b[n] / 4)
        }
        this.version = this.O.fb >> 12 & 15;
        this.ha = this.h[0] + "-" + this.h[1] + "-" + this.h[2] + "-" + this.h[3] + this.h[4] + "-" + this.h[5];
        return this
    }
    ;
    c.oa = function(a, b) {
        a = a.toString(2);
        b -= a.length;
        for (var c = "0"; 0 < b; b >>>= 1,
        c += c)
            b & 1 && (a = c + a);
        return a
    }
    ;
    c.prototype.toString = function() {
        return this.ha
    }
    ;
    c.Za = (new c).D(0, 0, 0, 0, 0, 0);
    c.Aa = function() {
        null == c.K && c.Pa();
        var a = (new Date).getTime()
          , b = c.K;
        a != b.timestamp ? (a < b.timestamp && b.s++,
        b.timestamp = a,
        b.B = c.f(4)) : Math.random() < c.qa && 9984 > b.B ? b.B += 1 + c.f(4) : b.s++;
        a = c.pa(b.timestamp);
        var m = a.low + b.B
          , t = a.Ga & 4095 | 4096;
        b.s &= 16383;
        return (new c).D(m, a.Ka, t, b.s >>> 8 | 128, b.s & 255, b.node)
    }
    ;
    c.Pa = function() {
        c.K = new b
    }
    ;
    c.qa = .25;
    c.K = null;
    c.pa = function(a) {
        a -= Date.UTC(1582, 9, 15);
        var b = a / 4294967296 * 1E4 & 268435455;
        return {
            low: 1E4 * (a & 268435455) % 4294967296,
            Ka: b & 65535,
            Ga: b >>> 16,
            timestamp: a
        }
    }
    ;
    c.Ja = function() {
        var a = c.ga;
        c.ga = function(b) {
            return b && 1 == b.version ? c.Aa().ha : a.call(c)
        }
        ;
        c.Ja = function() {}
    }
    ;
    "undefined" !== typeof module && module && module.za && (module.za = c);
    return c
}(P);
var Q;
Q = {
    Ta: function(a, b) {
        b && chrome.storage.local.set({
            app_token: a
        }, function() {
            b()
        })
    },
    M: function(a) {
        a && chrome.storage.local.get("app_token", function(b) {
            a("app_token"in b ? b.app_token : null)
        })
    },
    Na: function(a) {
        a && chrome.storage.local.remove("app_token", function() {
            a()
        })
    },
    H: function(a) {
        a && chrome.storage.local.get("app_id", function(b) {
            if ("app_id"in b)
                a(b.app_id);
            else {
                var c = "{" + P.Ba() + "}";
                chrome.storage.local.set({
                    app_id: c
                }, function() {
                    a(c)
                })
            }
        })
    },
    Ua: function(a, b) {
        chrome.storage.local.set({
            last_used_cookie: a
        }, function() {
            b()
        })
    },
    Ea: function(a) {
        chrome.storage.local.get("last_used_cookie", function(b) {
            "last_used_cookie"in b ? a(b.last_used_cookie) : a(null)
        })
    },
    Oa: function(a) {
        chrome.storage.local.remove("last_used_cookie", function() {
            a()
        })
    },
    Da: function(a) {
        chrome.cookies.get({
            url: N.Fa(),
            name: "__auth"
        }, function(b) {
            b ? a(b.value) : a(null)
        })
    }
};
function R(a, b) {
    this.a = a;
    this.i = b;
    this.ja = this.I = this.c = this.ia = null;
    this.l = {};
    this.l[this.j.J] = new D;
    this.l[this.j.COMPLETE] = new D
}
R.prototype.getImageData = function() {
    return this.i
}
;
R.prototype.N = function() {
    var a = {
        Sa: this.I
    };
    this.c ? a.error = this.c : a.o = this.ja;
    return a
}
;
R.prototype.attachEvent = function(a, b) {
    "undefined" !== typeof this.l[a] && this.l[a].add(b)
}
;
R.prototype.detachEvent = function(a, b) {
    "undefined" !== typeof this.l[a] && this.l[a].remove(b)
}
;
R.prototype.j = {
    J: "progress_change",
    COMPLETE: "complete"
};
R.prototype.C = {
    aa: "success",
    Z: "failed"
};
function S(a, b) {
    R.call(this, a, b);
    this.R = "5CE3DF4D45AC";
    this.Ia = "http://upload.prntscr.com/upload/{time}/{hash}/"
}
S.prototype = da(R.prototype);
S.prototype.constructor = S;
if (C)
    C(S, R);
else
    for (var T in R)
        if ("prototype" != T)
            if (Object.defineProperties) {
                var U = Object.getOwnPropertyDescriptor(R, T);
                U && Object.defineProperty(S, T, U)
            } else
                S[T] = R[T];
S.eb = R.prototype;
S.prototype.upload = function() {
    var a = this;
    this.I = this.C.Z;
    var b = function(a) {
        var b = a.split(",");
        a = b[0].match(/:(.*?);/)[1];
        b = atob(b[1]);
        for (var c = b.length, f = new Uint8Array(c); c--; )
            f[c] = b.charCodeAt(c);
        return new Blob([f],{
            type: a
        })
    }(a.i.dataUrl)
      , c = new FormData;
    c.append("image", b, "image.png");
    c.append("app_id", a.i.app_id);
    "app_token"in a.i && c.append("app_token", a.i.app_token);
    b = Math.floor(Date.now() / 1E3);
    var g = O("{key}*{time}".replace("{key}", this.R).replace("{time}", b));
    b = this.Ia.replace("{time}", b).replace("{hash}", g);
    var l = new AbortController
      , m = setTimeout(function() {
        return l.abort()
    }, 18E4);
    c = new Request(b,{
        method: "POST",
        body: c,
        Xa: l.Xa
    });
    fetch(c).then(function(b) {
        clearTimeout(m);
        ja(a, b)
    })
}
;
function ja(a, b) {
    ca(function() {
        function c(c, e, ha) {
            for (; ; )
                switch (g) {
                case 0:
                    d = a;
                    d.I = d.C.Z;
                    try {
                        return g = 3,
                        {
                            value: b.text(),
                            done: !1
                        }
                    } catch (w) {
                        f = w;
                        g = 1;
                        break
                    }
                case 3:
                    try {
                        if (1 != c) {
                            g = 4;
                            break
                        }
                        g = -1;
                        throw ha;
                    } catch (w) {
                        f = w;
                        g = 1;
                        break
                    }
                case 4:
                    try {
                        n = k = e;
                        console.log("response.text()=" + n);
                        t = /<(share|url)>\s*(https:\/\/[^\s]+)\s*<\/(share|url)>/g;
                        m = t.exec(n);
                        null != m && 2 < m.length ? (console.log("xml dom elements found!"),
                        d.I = d.C.aa,
                        d.ja = {
                            share_url: m[2]
                        }) : (console.log("xml dom elements NOT found!"),
                        d.c = G.u("screenshot_plugin_image_hosting_incorrect_response"));
                        g = 2;
                        break
                    } catch (w) {
                        f = w;
                        g = 1;
                        break
                    }
                case 1:
                    l = f,
                    console.log("error"),
                    d.c = G.u("screenshot_plugin_upload_error_capt") + "\n\n",
                    d.c += G.u("screenshot_plugin_upload_error_detailed_info") + ":\n",
                    d.c += "status = " + (b && b.status ? b.status : "") + "\n",
                    d.c += "statusText = " + b.statusText + "\n",
                    d.c += "e = " + l + "\n";
                case 2:
                    d.l[d.j.COMPLETE].fire(d.N()),
                    g = -1;
                default:
                    return {
                        value: void 0,
                        done: !0
                    }
                }
        }
        var g = 0, l, m, t, n, k, f, d, e = {
            next: function(a) {
                return c(0, a, void 0)
            },
            throw: function(a) {
                return c(1, void 0, a)
            },
            return: function() {
                throw Error("Not yet implemented");
            }
        };
        u();
        e[Symbol.iterator] = function() {
            return this
        }
        ;
        return e
    }())
}
S.prototype.cancel = function() {
    this.ia && this.ia.abort()
}
;
S.prototype.N = function() {
    var a = R.prototype.N.call(this);
    a.key = this.R.substr(this.R.length - 4);
    return a
}
;
function V(a, b) {
    this.a = a;
    this.i = b;
    var c = this;
    this.P = [];
    this.P.push(function() {
        return new S(c.a,c.i)
    });
    this.S = 0;
    this.V = this.W = this.U = this.T = this.b = null
}
function ka(a) {
    a.W = function(b) {
        la(a, b)
    }
    ;
    a.b.attachEvent(a.b.j.COMPLETE, a.W);
    a.V = function(b) {
        I.sendMessage({
            name: W,
            id: a.a,
            progress: Math.round(b.loaded / b.total * 100)
        })
    }
    ;
    a.b.attachEvent(a.b.j.J, a.V)
}
function X(a) {
    a.b.detachEvent(a.b.j.COMPLETE, a.W);
    a.b.detachEvent(a.b.j.J, a.V)
}
V.prototype.upload = function() {
    this.b = this.P[this.S]();
    ka(this);
    this.b.upload()
}
;
function la(a, b) {
    console.log("onUploadFinished");
    console.log(b);
    b.Sa === a.b.C.aa ? "share_url"in b.o ? Y(a, {
        url: b.o.share_url,
        success: !0
    }) : (a.T = b.o.img_url,
    b.o.dpr = a.i.dpr,
    Q.H(function(c) {
        Q.M(function(g) {
            b.o.app_id = c;
            g && (b.o.app_token = g);
            N.save(b.o, function(b) {
                Y(a, b)
            })
        })
    })) : (ma(a),
    console.log(b))
}
function ma(a) {
    a.S++;
    a.S < a.P.length ? (X(a),
    a.b = null,
    a.upload()) : I.sendMessage({
        name: na,
        id: a.a
    })
}
function Y(a, b) {
    console.log("onPrntScrRequestComplete");
    b && b.success && b.url && (a.U = b.url);
    I.sendMessage({
        name: oa,
        id: a.a
    })
}
V.prototype.cancel = function() {
    this.b.cancel();
    X(this)
}
;
function pa() {
    this.m = {}
}
pa.prototype.upload = function(a, b) {
    this.m[a] = new V(a,b);
    this.m[a].upload();
    I.sendMessage({
        name: qa,
        id: a
    })
}
;
function Z(a, b) {
    console.log("getScreenshotLink id=" + b);
    a.m[b] ? (a = a.m[b],
    console.log("getLink this.m_prntscrUrl=" + a.U + " this.m_imgUrl=" + a.T),
    a = a.U || a.T) : a = null;
    return a
}
;var M = "upload_screenshot"
  , qa = "upload_started"
  , W = "upload_progress"
  , oa = "upload_success"
  , na = "upload_failed"
  , J = "open_screenshot_link"
  , L = "copy_screenshot_link"
  , K = "cancel_upload";
var I = function() {
    function a(a, b, c) {
        if (a && "undefined" !== typeof a && "undefined" !== typeof a.name)
            switch (a.name) {
            case "load_screenshot":
                a = a.id;
                b = F[a];
                delete F[a];
                c(b);
                break;
            case M:
                g(a.id);
                c();
                break;
            case "close_screenshot_window":
                chrome.tabs.remove(b.tab.id)
            }
    }
    function b(a) {
        console.log("uploadSuccess");
        c(a, function() {
            if (h[a] && h[a].cmdAfterUpload) {
                var b = h[a].cmdAfterUpload;
                console.log("execCommandAfterUpload");
                var c = Z(d, a);
                switch (b) {
                case "search_google":
                    chrome.tabs.create({
                        url: "http://www.google.com/searchbyimage?image_url=" + c + "/direct"
                    });
                    break;
                case "share_twitter":
                    chrome.tabs.create({
                        url: "http://twitter.com/home?source=Lightshot&status=" + c + "%20"
                    });
                    break;
                case "share_facebook":
                    chrome.tabs.create({
                        url: "https://www.facebook.com/dialog/share?app_id=585941498129307&display=page&href=" + c + "&redirect_uri=" + c
                    });
                    break;
                case "share_vk":
                    chrome.tabs.create({
                        url: "http://vk.com/share.php?url=" + c
                    });
                    break;
                case "share_pinterest":
                    chrome.tabs.create({
                        url: "http://pinterest.com/pin/create/button/?url=" + c + "&media=" + c + "/direct"
                    })
                }
                e.G(a)
            } else
                I.sendMessage({
                    name: J,
                    id: a
                })
        })
    }
    function c(a, b) {
        chrome.storage.local.remove(a, function() {
            b && b()
        })
    }
    function g(a) {
        n(function() {
            chrome.storage.local.get(a, function(b) {
                var c = b[a];
                h[a] = c;
                Q.H(function(b) {
                    Q.M(function(e) {
                        c.app_id = b;
                        e && ("cmdAfterUpload"in c && "search_google" === c.cmdAfterUpload || (c.app_token = e));
                        d.upload(a, c)
                    })
                })
            })
        })
    }
    function l() {
        m()
    }
    function m() {
        t(function(a) {
            var b = fa.Ca("screenshot_");
            F[b] = a;
            chrome.tabs.create({
                url: chrome.runtime.getURL("screenshot.html?id=" + b)
            }, function() {})
        })
    }
    function t(a) {
        chrome.tabs.captureVisibleTab({
            format: "png"
        }, function(b) {
            a(b)
        })
    }
    function n(a) {
        Q.Da(function(b) {
            b ? Q.Ea(function(c) {
                c && c === b ? a && a() : f(b, a)
            }) : k(a())
        })
    }
    function k(a) {
        Q.M(function(b) {
            b ? Q.H(function(c) {
                N.wa(c, b, function() {
                    Q.Na(function() {
                        Q.Oa(function() {
                            a && a()
                        })
                    })
                })
            }) : a && a()
        })
    }
    function f(a, b) {
        Q.H(function(c) {
            chrome.runtime.getPlatformInfo(function(d) {
                d = "{os} {arch}".replace("{os}", d.os).replace("{arch}", d.arch);
                N.ua(a, c, d, function(c) {
                    !0 === c.success && "app_token"in c && "" !== c.app_token ? Q.Ua(a, function() {
                        Q.Ta(c.app_token, function() {
                            b && b()
                        })
                    }) : b && b()
                })
            })
        })
    }
    var d = null
      , e = null
      , h = {}
      , F = {};
    return {
        Ha: function() {
            d = new pa;
            e = ia();
            chrome.action.onClicked.addListener(l);
            chrome.runtime.onMessage.addListener(a)
        },
        sendMessage: function(a) {
            if (a && "undefined" !== typeof a && "undefined" !== typeof a.name)
                switch (console.log("onBackgroundMessage: " + a.name),
                a.name) {
                case qa:
                    e.va(a.id);
                    break;
                case W:
                    e.la(a.id, {
                        type: "progress",
                        progress: a.progress
                    });
                    break;
                case oa:
                    b(a.id);
                    break;
                case na:
                    e.la(a.id, {
                        type: "failed"
                    });
                    break;
                case J:
                    chrome.tabs.create({
                        url: Z(d, a.id)
                    });
                    e.G(a.id);
                    break;
                case L:
                    Z(d, a.id);
                    document.execCommand("copy");
                    e.G(a.id);
                    break;
                case K:
                    c(a.id, function() {
                        var b = d
                          , c = a.id;
                        b.m[c] && (b.m[c].cancel(),
                        delete b.m[c])
                    }),
                    e.G(a.id)
                }
        }
    }
}();
I.Ha();