let self_ArrayBuffer = function (e) {
    "use strict";
    var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function n(e, t) {
        var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3];
        r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + t[0] - 680876936 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + t[1] - 389564586 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + t[2] + 606105819 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + t[3] - 1044525330 | 0) << 22 | r >>> 10) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + t[4] - 176418897 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + t[5] + 1200080426 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + t[6] - 1473231341 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + t[7] - 45705983 | 0) << 22 | r >>> 10) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + t[8] + 1770035416 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + t[9] - 1958414417 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + t[10] - 42063 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + t[11] - 1990404162 | 0) << 22 | r >>> 10) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + t[12] + 1804603682 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + t[13] - 40341101 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + t[14] - 1502002290 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + t[15] + 1236535329 | 0) << 22 | r >>> 10) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + t[1] - 165796510 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + t[6] - 1069501632 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + t[11] + 643717713 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + t[0] - 373897302 | 0) << 20 | r >>> 12) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + t[5] - 701558691 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + t[10] + 38016083 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + t[15] - 660478335 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + t[4] - 405537848 | 0) << 20 | r >>> 12) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + t[9] + 568446438 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + t[14] - 1019803690 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + t[3] - 187363961 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + t[8] + 1163531501 | 0) << 20 | r >>> 12) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + t[13] - 1444681467 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + t[2] - 51403784 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + t[7] + 1735328473 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + t[12] - 1926607734 | 0) << 20 | r >>> 12) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + t[5] - 378558 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + t[8] - 2022574463 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + t[11] + 1839030562 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + t[14] - 35309556 | 0) << 23 | r >>> 9) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + t[1] - 1530992060 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + t[4] + 1272893353 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + t[7] - 155497632 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + t[10] - 1094730640 | 0) << 23 | r >>> 9) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + t[13] + 681279174 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + t[0] - 358537222 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + t[3] - 722521979 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + t[6] + 76029189 | 0) << 23 | r >>> 9) + i | 0,
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + t[9] - 640364487 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + t[12] - 421815835 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + t[15] + 530742520 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + t[2] - 995338651 | 0) << 23 | r >>> 9) + i | 0,
            r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + t[0] - 198630844 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + t[7] + 1126891415 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + t[14] - 1416354905 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + t[5] - 57434055 | 0) << 21 | r >>> 11) + i | 0,
            r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + t[12] + 1700485571 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + t[3] - 1894986606 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + t[10] - 1051523 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + t[1] - 2054922799 | 0) << 21 | r >>> 11) + i | 0,
            r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + t[8] + 1873313359 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + t[15] - 30611744 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + t[6] - 1560198380 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + t[13] + 1309151649 | 0) << 21 | r >>> 11) + i | 0,
            r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + t[4] - 145523070 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + t[11] - 1120210379 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + t[2] + 718787259 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + t[9] - 343485551 | 0) << 21 | r >>> 11) + i | 0,
            e[0] = n + e[0] | 0,
            e[1] = r + e[1] | 0,
            e[2] = i + e[2] | 0,
            e[3] = o + e[3] | 0
    }
    function r(e) {
        var t, n = [];
        for (t = 0; t < 64; t += 4)
            n[t >> 2] = e.charCodeAt(t) + (e.charCodeAt(t + 1) << 8) + (e.charCodeAt(t + 2) << 16) + (e.charCodeAt(t + 3) << 24);
        return n
    }
    function i(e) {
        var t, n = [];
        for (t = 0; t < 64; t += 4)
            n[t >> 2] = e[t] + (e[t + 1] << 8) + (e[t + 2] << 16) + (e[t + 3] << 24);
        return n
    }
    function o(e) {
        var t, i, o, a, s, u, c = e.length, l = [1732584193, -271733879, -1732584194, 271733878];
        for (t = 64; t <= c; t += 64)
            n(l, r(e.substring(t - 64, t)));
        for (i = (e = e.substring(t - 64)).length,
            o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            t = 0; t < i; t += 1)
            o[t >> 2] |= e.charCodeAt(t) << (t % 4 << 3);
        if (o[t >> 2] |= 128 << (t % 4 << 3),
            t > 55)
            for (n(l, o),
                t = 0; t < 16; t += 1)
                o[t] = 0;
        return a = (a = 8 * c).toString(16).match(/(.*?)(.{0,8})$/),
            s = parseInt(a[2], 16),
            u = parseInt(a[1], 16) || 0,
            o[14] = s,
            o[15] = u,
            n(l, o),
            l
    }
    function a(e) {
        var n, r = "";
        for (n = 0; n < 4; n += 1)
            r += t[e >> 8 * n + 4 & 15] + t[e >> 8 * n & 15];
        return r
    }
    function s(e) {
        var t;
        for (t = 0; t < e.length; t += 1)
            e[t] = a(e[t]);
        return e.join("")
    }
    function u(e) {
        return /[\u0080-\uFFFF]/.test(e) && (e = unescape(encodeURIComponent(e))),
            e
    }
    function c(e) {
        var t, n = [], r = e.length;
        for (t = 0; t < r - 1; t += 2)
            n.push(parseInt(e.substr(t, 2), 16));
        return String.fromCharCode.apply(String, n)
    }
    function l() {
        this.reset()
    }
    return s(o("hello")),
        "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function () {
            function e(e, t) {
                return (e = 0 | e || 0) < 0 ? Math.max(e + t, 0) : Math.min(e, t)
            }
            ArrayBuffer.prototype.slice = function (t, n) {
                var r, i, o, a, s = this.byteLength, u = e(t, s), c = s;
                return undefined !== n && (c = e(n, s)),
                    u > c ? new ArrayBuffer(0) : (r = c - u,
                        i = new ArrayBuffer(r),
                        o = new Uint8Array(i),
                        a = new Uint8Array(this, u, r),
                        o.set(a),
                        i)
            }
        }(),
        l.prototype.append = function (e) {
            return this.appendBinary(u(e)),
                this
        }
        ,
        l.prototype.appendBinary = function (e) {
            this._buff += e,
                this._length += e.length;
            var t, i = this._buff.length;
            for (t = 64; t <= i; t += 64)
                n(this._hash, r(this._buff.substring(t - 64, t)));
            return this._buff = this._buff.substring(t - 64),
                this
        }
        ,
        l.prototype.end = function (e) {
            var t, n, r = this._buff, i = r.length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (t = 0; t < i; t += 1)
                o[t >> 2] |= r.charCodeAt(t) << (t % 4 << 3);
            return this._finish(o, i),
                n = s(this._hash),
                e && (n = c(n)),
                this.reset(),
                n
        }
        ,
        l.prototype.reset = function () {
            return this._buff = "",
                this._length = 0,
                this._hash = [1732584193, -271733879, -1732584194, 271733878],
                this
        }
        ,
        l.prototype.getState = function () {
            return {
                buff: this._buff,
                length: this._length,
                hash: this._hash.slice()
            }
        }
        ,
        l.prototype.setState = function (e) {
            return this._buff = e.buff,
                this._length = e.length,
                this._hash = e.hash,
                this
        }
        ,
        l.prototype.destroy = function () {
            delete this._hash,
                delete this._buff,
                delete this._length
        }
        ,
        l.prototype._finish = function (e, t) {
            var r, i, o, a = t;
            if (e[a >> 2] |= 128 << (a % 4 << 3),
                a > 55)
                for (n(this._hash, e),
                    a = 0; a < 16; a += 1)
                    e[a] = 0;
            r = (r = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/),
                i = parseInt(r[2], 16),
                o = parseInt(r[1], 16) || 0,
                e[14] = i,
                e[15] = o,
                n(this._hash, e)
        }
        ,
        l.hash = function (e, t) {
            return l.hashBinary(u(e), t)
        }
        ,
        l.hashBinary = function (e, t) {
            var n = s(o(e));
            return t ? c(n) : n
        }
        ,
        l.ArrayBuffer = function () {
            this.reset()
        }
        ,
        l.ArrayBuffer.prototype.append = function (e) {
            var t, r, o, a, s, u = (r = this._buff.buffer,
                o = e,
                a = !0,
                (s = new Uint8Array(r.byteLength + o.byteLength)).set(new Uint8Array(r)),
                s.set(new Uint8Array(o), r.byteLength),
                a ? s : s.buffer), c = u.length;
            for (this._length += e.byteLength,
                t = 64; t <= c; t += 64)
                n(this._hash, i(u.subarray(t - 64, t)));
            return this._buff = t - 64 < c ? new Uint8Array(u.buffer.slice(t - 64)) : new Uint8Array(0),
                this
        }
        ,
        l.ArrayBuffer.prototype.end = function (e) {
            var t, n, r = this._buff, i = r.length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (t = 0; t < i; t += 1)
                o[t >> 2] |= r[t] << (t % 4 << 3);
            return this._finish(o, i),
                n = s(this._hash),
                e && (n = c(n)),
                this.reset(),
                n
        }
        ,
        l.ArrayBuffer.prototype.reset = function () {
            return this._buff = new Uint8Array(0),
                this._length = 0,
                this._hash = [1732584193, -271733879, -1732584194, 271733878],
                this
        }
        ,
        l.ArrayBuffer.prototype.getState = function () {
            var e, t = l.prototype.getState.call(this);
            return t.buff = (e = t.buff,
                String.fromCharCode.apply(null, new Uint8Array(e))),
                t
        }
        ,
        l.ArrayBuffer.prototype.setState = function (e) {
            return e.buff = function (e, t) {
                var n, r = e.length, i = new ArrayBuffer(r), o = new Uint8Array(i);
                for (n = 0; n < r; n += 1)
                    o[n] = e.charCodeAt(n);
                return t ? o : i
            }(e.buff, !0),
                l.prototype.setState.call(this, e)
        }
        ,
        l.ArrayBuffer.prototype.destroy = l.prototype.destroy,
        l.ArrayBuffer.prototype._finish = l.prototype._finish,
        l.ArrayBuffer.hash = function (e, t) {
            var r = s(function (e) {
                var t, r, o, a, s, u, c = e.length, l = [1732584193, -271733879, -1732584194, 271733878];
                for (t = 64; t <= c; t += 64)
                    n(l, i(e.subarray(t - 64, t)));
                for (r = (e = t - 64 < c ? e.subarray(t - 64) : new Uint8Array(0)).length,
                    o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    t = 0; t < r; t += 1)
                    o[t >> 2] |= e[t] << (t % 4 << 3);
                if (o[t >> 2] |= 128 << (t % 4 << 3),
                    t > 55)
                    for (n(l, o),
                        t = 0; t < 16; t += 1)
                        o[t] = 0;
                return a = (a = 8 * c).toString(16).match(/(.*?)(.{0,8})$/),
                    s = parseInt(a[2], 16),
                    u = parseInt(a[1], 16) || 0,
                    o[14] = s,
                    o[15] = u,
                    n(l, o),
                    l
            }(new Uint8Array(e)));
            return t ? c(r) : r
        }
        ,
        l
}()