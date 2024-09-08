var Tool_hash = function (e) {
    "use strict";
    var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function r(e, t) {
        var r = e[0]
            , n = e[1]
            , o = e[2]
            , i = e[3];
        n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & o | ~n & i) + t[0] - 680876936 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & o) + t[1] - 389564586 | 0) << 12 | i >>> 20) + r | 0) & r | ~i & n) + t[2] + 606105819 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & r) + t[3] - 1044525330 | 0) << 22 | n >>> 10) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & o | ~n & i) + t[4] - 176418897 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & o) + t[5] + 1200080426 | 0) << 12 | i >>> 20) + r | 0) & r | ~i & n) + t[6] - 1473231341 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & r) + t[7] - 45705983 | 0) << 22 | n >>> 10) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & o | ~n & i) + t[8] + 1770035416 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & o) + t[9] - 1958414417 | 0) << 12 | i >>> 20) + r | 0) & r | ~i & n) + t[10] - 42063 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & r) + t[11] - 1990404162 | 0) << 22 | n >>> 10) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & o | ~n & i) + t[12] + 1804603682 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & o) + t[13] - 40341101 | 0) << 12 | i >>> 20) + r | 0) & r | ~i & n) + t[14] - 1502002290 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & r) + t[15] + 1236535329 | 0) << 22 | n >>> 10) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & i | o & ~i) + t[1] - 165796510 | 0) << 5 | r >>> 27) + n | 0) & o | n & ~o) + t[6] - 1069501632 | 0) << 9 | i >>> 23) + r | 0) & n | r & ~n) + t[11] + 643717713 | 0) << 14 | o >>> 18) + i | 0) & r | i & ~r) + t[0] - 373897302 | 0) << 20 | n >>> 12) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & i | o & ~i) + t[5] - 701558691 | 0) << 5 | r >>> 27) + n | 0) & o | n & ~o) + t[10] + 38016083 | 0) << 9 | i >>> 23) + r | 0) & n | r & ~n) + t[15] - 660478335 | 0) << 14 | o >>> 18) + i | 0) & r | i & ~r) + t[4] - 405537848 | 0) << 20 | n >>> 12) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & i | o & ~i) + t[9] + 568446438 | 0) << 5 | r >>> 27) + n | 0) & o | n & ~o) + t[14] - 1019803690 | 0) << 9 | i >>> 23) + r | 0) & n | r & ~n) + t[3] - 187363961 | 0) << 14 | o >>> 18) + i | 0) & r | i & ~r) + t[8] + 1163531501 | 0) << 20 | n >>> 12) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & i | o & ~i) + t[13] - 1444681467 | 0) << 5 | r >>> 27) + n | 0) & o | n & ~o) + t[2] - 51403784 | 0) << 9 | i >>> 23) + r | 0) & n | r & ~n) + t[7] + 1735328473 | 0) << 14 | o >>> 18) + i | 0) & r | i & ~r) + t[12] - 1926607734 | 0) << 20 | n >>> 12) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n ^ o ^ i) + t[5] - 378558 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ o) + t[8] - 2022574463 | 0) << 11 | i >>> 21) + r | 0) ^ r ^ n) + t[11] + 1839030562 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ r) + t[14] - 35309556 | 0) << 23 | n >>> 9) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n ^ o ^ i) + t[1] - 1530992060 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ o) + t[4] + 1272893353 | 0) << 11 | i >>> 21) + r | 0) ^ r ^ n) + t[7] - 155497632 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ r) + t[10] - 1094730640 | 0) << 23 | n >>> 9) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n ^ o ^ i) + t[13] + 681279174 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ o) + t[0] - 358537222 | 0) << 11 | i >>> 21) + r | 0) ^ r ^ n) + t[3] - 722521979 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ r) + t[6] + 76029189 | 0) << 23 | n >>> 9) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n ^ o ^ i) + t[9] - 640364487 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ o) + t[12] - 421815835 | 0) << 11 | i >>> 21) + r | 0) ^ r ^ n) + t[15] + 530742520 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ r) + t[2] - 995338651 | 0) << 23 | n >>> 9) + o | 0,
            n = ((n += ((i = ((i += (n ^ ((r = ((r += (o ^ (n | ~i)) + t[0] - 198630844 | 0) << 6 | r >>> 26) + n | 0) | ~o)) + t[7] + 1126891415 | 0) << 10 | i >>> 22) + r | 0) ^ ((o = ((o += (r ^ (i | ~n)) + t[14] - 1416354905 | 0) << 15 | o >>> 17) + i | 0) | ~r)) + t[5] - 57434055 | 0) << 21 | n >>> 11) + o | 0,
            n = ((n += ((i = ((i += (n ^ ((r = ((r += (o ^ (n | ~i)) + t[12] + 1700485571 | 0) << 6 | r >>> 26) + n | 0) | ~o)) + t[3] - 1894986606 | 0) << 10 | i >>> 22) + r | 0) ^ ((o = ((o += (r ^ (i | ~n)) + t[10] - 1051523 | 0) << 15 | o >>> 17) + i | 0) | ~r)) + t[1] - 2054922799 | 0) << 21 | n >>> 11) + o | 0,
            n = ((n += ((i = ((i += (n ^ ((r = ((r += (o ^ (n | ~i)) + t[8] + 1873313359 | 0) << 6 | r >>> 26) + n | 0) | ~o)) + t[15] - 30611744 | 0) << 10 | i >>> 22) + r | 0) ^ ((o = ((o += (r ^ (i | ~n)) + t[6] - 1560198380 | 0) << 15 | o >>> 17) + i | 0) | ~r)) + t[13] + 1309151649 | 0) << 21 | n >>> 11) + o | 0,
            n = ((n += ((i = ((i += (n ^ ((r = ((r += (o ^ (n | ~i)) + t[4] - 145523070 | 0) << 6 | r >>> 26) + n | 0) | ~o)) + t[11] - 1120210379 | 0) << 10 | i >>> 22) + r | 0) ^ ((o = ((o += (r ^ (i | ~n)) + t[2] + 718787259 | 0) << 15 | o >>> 17) + i | 0) | ~r)) + t[9] - 343485551 | 0) << 21 | n >>> 11) + o | 0,
            e[0] = r + e[0] | 0,
            e[1] = n + e[1] | 0,
            e[2] = o + e[2] | 0,
            e[3] = i + e[3] | 0
    }
    function n(e) {
        var t, r = [];
        for (t = 0; t < 64; t += 4)
            r[t >> 2] = e.charCodeAt(t) + (e.charCodeAt(t + 1) << 8) + (e.charCodeAt(t + 2) << 16) + (e.charCodeAt(t + 3) << 24);
        return r
    }
    function o(e) {
        var t, r = [];
        for (t = 0; t < 64; t += 4)
            r[t >> 2] = e[t] + (e[t + 1] << 8) + (e[t + 2] << 16) + (e[t + 3] << 24);
        return r
    }
    function i(e) {
        var t, o, i, a, u, s, c = e.length, l = [1732584193, -271733879, -1732584194, 271733878];
        for (t = 64; t <= c; t += 64)
            r(l, n(e.substring(t - 64, t)));
        for (o = (e = e.substring(t - 64)).length,
            i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            t = 0; t < o; t += 1)
            i[t >> 2] |= e.charCodeAt(t) << (t % 4 << 3);
        if (i[t >> 2] |= 128 << (t % 4 << 3),
            t > 55)
            for (r(l, i),
                t = 0; t < 16; t += 1)
                i[t] = 0;
        return a = (a = 8 * c).toString(16).match(/(.*?)(.{0,8})$/),
            u = parseInt(a[2], 16),
            s = parseInt(a[1], 16) || 0,
            i[14] = u,
            i[15] = s,
            r(l, i),
            l
    }
    function a(e) {
        var r, n = "";
        for (r = 0; r < 4; r += 1)
            n += t[e >> 8 * r + 4 & 15] + t[e >> 8 * r & 15];
        return n
    }
    function u(e) {
        var t;
        for (t = 0; t < e.length; t += 1)
            e[t] = a(e[t]);
        return e.join("")
    }
    function s(e) {
        return /[\u0080-\uFFFF]/.test(e) && (e = unescape(encodeURIComponent(e))),
            e
    }
    function c(e) {
        var t, r = [], n = e.length;
        for (t = 0; t < n - 1; t += 2)
            r.push(parseInt(e.substr(t, 2), 16));
        return String.fromCharCode.apply(String, r)
    }
    function l() {
        this.reset()
    }
    return u(i("hello")),
        "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function () {
            function e(e, t) {
                return (e = 0 | e || 0) < 0 ? Math.max(e + t, 0) : Math.min(e, t)
            }
            ArrayBuffer.prototype.slice = function (t, r) {
                var n, o, i, a, u = this.byteLength, s = e(t, u), c = u;
                return undefined !== r && (c = e(r, u)),
                    s > c ? new ArrayBuffer(0) : (n = c - s,
                        o = new ArrayBuffer(n),
                        i = new Uint8Array(o),
                        a = new Uint8Array(this, s, n),
                        i.set(a),
                        o)
            }
        }(),
        l.prototype.append = function (e) {
            return this.appendBinary(s(e)),
                this
        }
        ,
        l.prototype.appendBinary = function (e) {
            this._buff += e,
                this._length += e.length;
            var t, o = this._buff.length;
            for (t = 64; t <= o; t += 64)
                r(this._hash, n(this._buff.substring(t - 64, t)));
            return this._buff = this._buff.substring(t - 64),
                this
        }
        ,
        l.prototype.end = function (e) {
            var t, r, n = this._buff, o = n.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (t = 0; t < o; t += 1)
                i[t >> 2] |= n.charCodeAt(t) << (t % 4 << 3);
            return this._finish(i, o),
                r = u(this._hash),
                e && (r = c(r)),
                this.reset(),
                r
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
            var n, o, i, a = t;
            if (e[a >> 2] |= 128 << (a % 4 << 3),
                a > 55)
                for (r(this._hash, e),
                    a = 0; a < 16; a += 1)
                    e[a] = 0;
            n = (n = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/),
                o = parseInt(n[2], 16),
                i = parseInt(n[1], 16) || 0,
                e[14] = o,
                e[15] = i,
                r(this._hash, e)
        }
        ,
        l.hash = function (e, t) {
            return l.hashBinary(s(e), t)
        }
        ,
        l.hashBinary = function (e, t) {
            var r = u(i(e));
            return t ? c(r) : r
        }
        ,
        l.ArrayBuffer = function () {
            this.reset()
        }
        ,
        l.ArrayBuffer.prototype.append = function (e) {
            var t, n, i, a, u, s = (n = this._buff.buffer,
                i = e,
                a = !0,
                (u = new Uint8Array(n.byteLength + i.byteLength)).set(new Uint8Array(n)),
                u.set(new Uint8Array(i), n.byteLength),
                a ? u : u.buffer), c = s.length;
            for (this._length += e.byteLength,
                t = 64; t <= c; t += 64)
                r(this._hash, o(s.subarray(t - 64, t)));
            return this._buff = t - 64 < c ? new Uint8Array(s.buffer.slice(t - 64)) : new Uint8Array(0),
                this
        }
        ,
        l.ArrayBuffer.prototype.end = function (e) {
            var t, r, n = this._buff, o = n.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (t = 0; t < o; t += 1)
                i[t >> 2] |= n[t] << (t % 4 << 3);
            return this._finish(i, o),
                r = u(this._hash),
                e && (r = c(r)),
                this.reset(),
                r
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
                var r, n = e.length, o = new ArrayBuffer(n), i = new Uint8Array(o);
                for (r = 0; r < n; r += 1)
                    i[r] = e.charCodeAt(r);
                return t ? i : o
            }(e.buff, !0),
                l.prototype.setState.call(this, e)
        }
        ,
        l.ArrayBuffer.prototype.destroy = l.prototype.destroy,
        l.ArrayBuffer.prototype._finish = l.prototype._finish,
        l.ArrayBuffer.hash = function (e, t) {
            var n = u(function (e) {
                var t, n, i, a, u, s, c = e.length, l = [1732584193, -271733879, -1732584194, 271733878];
                for (t = 64; t <= c; t += 64)
                    r(l, o(e.subarray(t - 64, t)));
                for (n = (e = t - 64 < c ? e.subarray(t - 64) : new Uint8Array(0)).length,
                    i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    t = 0; t < n; t += 1)
                    i[t >> 2] |= e[t] << (t % 4 << 3);
                if (i[t >> 2] |= 128 << (t % 4 << 3),
                    t > 55)
                    for (r(l, i),
                        t = 0; t < 16; t += 1)
                        i[t] = 0;
                return a = (a = 8 * c).toString(16).match(/(.*?)(.{0,8})$/),
                    u = parseInt(a[2], 16),
                    s = parseInt(a[1], 16) || 0,
                    i[14] = u,
                    i[15] = s,
                    r(l, i),
                    l
            }(new Uint8Array(e)));
            return t ? c(n) : n
        }
        ,
        l
}()