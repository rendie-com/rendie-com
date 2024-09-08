for (var m = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
		a != Array.prototype && a != Object.prototype && (a[b] = c.value)
	}, p = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this, t = ["Array", "prototype", "fill"], u = 0; u < t.length - 1; u++) {
	var v = t[u];
	v in p || (p[v] = {});
	p = p[v]
}

var w = t[t.length - 1],
	x = p[w],
	y = function(a) {
		return a ? a : function(a, c, g) {
			var b = this.length || 0;
			0 > c && (c = Math.max(0, b + c));
			if (null == g || g > b) g = b;
			g = Number(g);
			0 > g && (g = Math.max(0, b + g));
			for (c = Number(c || 0); c < g; c++) this[c] = a;
			return this
		}
	}(x);
y != x && null != y && m(p, w, {
	configurable: !0,
	writable: !0,
	value: y
});

function z() {
	var a = [
		["edge", /Edge\/([0-9\._]+)/],
		["chrome", /Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
		["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
		["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
		["ie", /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
		["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
		["ie", /MSIE\s(7\.0)/],
		["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
		["android", /Android\s([0-9\.]+)/],
		["ios", /iPad\;\sCPU\sOS\s([0-9\._]+)/],
		["ios", /iPhone\;\sCPU\siPhone\sOS\s([0-9\._]+)/],
		["safari", /Safari\/([0-9\._]+)/]
	],
		b, c = [];
	for (b = 0; b < a.length; b++) {
		var g = b;
		var l = a[b];
		l = l.concat(l[1].exec(navigator.userAgent));
		a[g] = l;
		a[b][2] && c.push(a[b])
	}
	for (b = (a = c[0]) && a[3].split(/[._]/).slice(0, 3); b && 3 > b.length;) b.push("0");
	c = {};
	c.name = a && a[0];
	c.version = b && b.join(".");
	c.versionInt = parseInt(c.version, 10);
	return c
};
var aa = {
	na: function(a) {
		return a + Math.random()
	},
	Ia: function(a) {
		for (var b = a.length, c, g; 0 !== b;) g = Math.floor(Math.random() * b), --b, c = a[b], a[b] = a[g], a[g] = c;
		return a
	},
	Ha: function(a, b) {
		return Math.floor(Math.random() * (b - a + 1) + a)
	}
}, A = {
		extend: function(a, b) {
			function c() {}
			c.prototype = b.prototype;
			a.prototype = new c;
			a.prototype.constructor = a;
			a.R = b.prototype
		}
	}, B = {
		s: function(a) {
			return chrome.i18n.getMessage(a)
		}
	};

function D(a) {
	D.R.constructor.apply(this, arguments);
	this.create()
}
A.extend(D, function(a) {
	this.b = a;
	this.u = null
});
D.prototype.create = function() {
	var a = this,
		b = {
			type: "progress",
			title: "Lightshot",
			message: B.s("screenshot_plugin_uploading_window_capt"),
			iconUrl: "img/icon256.png",
			buttons: [{
				title: B.s("screenshot_plugin_cancel")
			}],
			isClickable: !0,
			progress: 0
		};
	"chrome" == z().name && 50 <= z().versionInt && (b.requireInteraction = !0);
	delete b.buttons;
	//chrome.notifications.create(this.b, b, function() {
	//	a.u = "uploading"
	//})
};
D.prototype.update = function(a) {
	"progress" === a.type && a.progress || "success" === a.type && a.message && E.sendMessage({
		name: F,
		id: this.b
	})
};

function ba() {
	function a(a) {
		//chrome.notifications.clear(a, function() {});
		delete b[a]
	}
	var b = {};
	//chrome.notifications.onClicked.addListener(function(a){a=b[a];"success"===a.u&&E.sendMessage({name:F,id:a.b})});
	//chrome.notifications.onButtonClicked.addListener(function(a,g)
	//{
	//	a=b[a];
	//		"uploading"===a.u&&0===g?E.sendMessage({name:G,id:a.b}):"success"===a.u?0===g?E.sendMessage({name:H,id:a.b}):1===g&&E.sendMessage({name:F,id:a.b}):"failed"===a.u&&(0===g?E.sendMessage({name:I,id:a.b}):1===g&&E.sendMessage({name:G,
	//id:a.b}))
	//});
	return {
		ia: function(c) {
			a(c);
			b[c] = new D(c)
		},
		S: function(a, g) {
			b[a].update(g)
		},
		C: a
	}
};

var K = function() {
	function a() {
		return "https://api.prntscr.com/v1.1/"
	}
	return {
		save: function(b, c) {
			b && "undefined" != typeof b && "undefined" != typeof b.img_url && $.ajax({
				type: "POST",
				url: a(),
				data: JSON.stringify({
					jsonrpc: "2.0",
					id: 1,
					method: "save",
					params: b
				}),
				dataType: "json",
				beforeSend: function(a) {
					a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
				},
				complete: function(a) {
					a.responseJSON && "undefined" != typeof a.responseJSON && "undefined" != typeof a.responseJSON.result ? c(a.responseJSON.result) : c(null)
				}
			})
		},
		ha: function(b, c, g, l) {
			b && "undefined" != typeof b && $.ajax({
				type: "POST",
				url: a(),
				data: JSON.stringify({
					jsonrpc: "2.0",
					id: 1,
					method: "attach_extension",
					params: {
						auth: b,
						app_id: c,
						app_description: g
					}
				}),
				dataType: "json",
				beforeSend: function(a) {
					a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
				},
				complete: function(a) {
					a.responseJSON && "undefined" != typeof a.responseJSON && "undefined" != typeof a.responseJSON.result ? l(a.responseJSON.result) : l(null)
				}
			})
		},
		ja: function(b, c, g) {
			b && "undefined" != typeof b && c && "undefined" !=
				typeof c && $.ajax({
					type: "POST",
					url: a(),
					data: JSON.stringify({
						jsonrpc: "2.0",
						id: 1,
						method: "detach_application_ext",
						params: {
							app_id: b,
							app_token: c
						}
					}),
					dataType: "json",
					beforeSend: function(a) {
						a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
					},
					complete: function(a) {
						a.responseJSON && "undefined" != typeof a.responseJSON && "undefined" != typeof a.responseJSON.result ? g(a.responseJSON.result) : g(null)
					}
				})
		},
		qa: a
	}
}();
if ("function" !== typeof L) var L = function() {
	function a(a, k) {
		var h = a[0],
			e = a[1],
			d = a[2],
			f = a[3];
		h = c(h, e, d, f, k[0], 7, -680876936);
		f = c(f, h, e, d, k[1], 12, -389564586);
		d = c(d, f, h, e, k[2], 17, 606105819);
		e = c(e, d, f, h, k[3], 22, -1044525330);
		h = c(h, e, d, f, k[4], 7, -176418897);
		f = c(f, h, e, d, k[5], 12, 1200080426);
		d = c(d, f, h, e, k[6], 17, -1473231341);
		e = c(e, d, f, h, k[7], 22, -45705983);
		h = c(h, e, d, f, k[8], 7, 1770035416);
		f = c(f, h, e, d, k[9], 12, -1958414417);
		d = c(d, f, h, e, k[10], 17, -42063);
		e = c(e, d, f, h, k[11], 22, -1990404162);
		h = c(h, e, d, f, k[12], 7, 1804603682);
		f = c(f, h, e, d, k[13], 12, -40341101);
		d = c(d, f, h, e, k[14], 17, -1502002290);
		e = c(e, d, f, h, k[15], 22, 1236535329);
		h = g(h, e, d, f, k[1], 5, -165796510);
		f = g(f, h, e, d, k[6], 9, -1069501632);
		d = g(d, f, h, e, k[11], 14, 643717713);
		e = g(e, d, f, h, k[0], 20, -373897302);
		h = g(h, e, d, f, k[5], 5, -701558691);
		f = g(f, h, e, d, k[10], 9, 38016083);
		d = g(d, f, h, e, k[15], 14, -660478335);
		e = g(e, d, f, h, k[4], 20, -405537848);
		h = g(h, e, d, f, k[9], 5, 568446438);
		f = g(f, h, e, d, k[14], 9, -1019803690);
		d = g(d, f, h, e, k[3], 14, -187363961);
		e = g(e, d, f, h, k[8], 20, 1163531501);
		h = g(h, e, d, f, k[13], 5, -1444681467);
		f = g(f, h, e, d, k[2], 9, -51403784);
		d = g(d, f, h, e, k[7], 14, 1735328473);
		e = g(e, d, f, h, k[12], 20, -1926607734);
		h = b(e ^ d ^ f, h, e, k[5], 4, -378558);
		f = b(h ^ e ^ d, f, h, k[8], 11, -2022574463);
		d = b(f ^ h ^ e, d, f, k[11], 16, 1839030562);
		e = b(d ^ f ^ h, e, d, k[14], 23, -35309556);
		h = b(e ^ d ^ f, h, e, k[1], 4, -1530992060);
		f = b(h ^ e ^ d, f, h, k[4], 11, 1272893353);
		d = b(f ^ h ^ e, d, f, k[7], 16, -155497632);
		e = b(d ^ f ^ h, e, d, k[10], 23, -1094730640);
		h = b(e ^ d ^ f, h, e, k[13], 4, 681279174);
		f = b(h ^ e ^ d, f, h, k[0], 11, -358537222);
		d = b(f ^ h ^ e, d, f, k[3], 16, -722521979);
		e = b(d ^ f ^ h, e, d, k[6], 23, 76029189);
		h = b(e ^ d ^ f, h, e, k[9], 4, -640364487);
		f = b(h ^ e ^ d, f, h, k[12], 11, -421815835);
		d = b(f ^ h ^ e, d, f, k[15], 16, 530742520);
		e = b(d ^ f ^ h, e, d, k[2], 23, -995338651);
		h = l(h, e, d, f, k[0], 6, -198630844);
		f = l(f, h, e, d, k[7], 10, 1126891415);
		d = l(d, f, h, e, k[14], 15, -1416354905);
		e = l(e, d, f, h, k[5], 21, -57434055);
		h = l(h, e, d, f, k[12], 6, 1700485571);
		f = l(f, h, e, d, k[3], 10, -1894986606);
		d = l(d, f, h, e, k[10], 15, -1051523);
		e = l(e, d, f, h, k[1], 21, -2054922799);
		h = l(h, e, d, f, k[8], 6, 1873313359);
		f = l(f, h, e, d, k[15], 10, -30611744);
		d = l(d, f, h, e, k[6], 15, -1560198380);
		e = l(e, d, f, h,
			k[13], 21, 1309151649);
		h = l(h, e, d, f, k[4], 6, -145523070);
		f = l(f, h, e, d, k[11], 10, -1120210379);
		d = l(d, f, h, e, k[2], 15, 718787259);
		e = l(e, d, f, h, k[9], 21, -343485551);
		a[0] = h + a[0] & 4294967295;
		a[1] = e + a[1] & 4294967295;
		a[2] = d + a[2] & 4294967295;
		a[3] = f + a[3] & 4294967295
	}

	function b(a, b, g, e, d, c) {
		b = (b + a & 4294967295) + (e + c & 4294967295) & 4294967295;
		return (b << d | b >>> 32 - d) + g & 4294967295
	}

	function c(a, g, c, e, d, f, l) {
		return b(g & c | ~g & e, a, g, d, f, l)
	}

	function g(a, g, c, e, d, f, l) {
		return b(g & e | c & ~e, a, g, d, f, l)
	}

	function l(a, g, c, e, d, f, l) {
		return b(c ^ (g | ~e),
			a, g, d, f, l)
	}

	function q(b) {
		var g = b,
			c = g.length;
		b = [1732584193, -271733879, -1732584194, 271733878];
		var e;
		for (e = 64; e <= g.length; e += 64) {
			var d, f = g.substring(e - 64, e),
				l = [];
			for (d = 0; 64 > d; d += 4) l[d >> 2] = f.charCodeAt(d) + (f.charCodeAt(d + 1) << 8) + (f.charCodeAt(d + 2) << 16) + (f.charCodeAt(d + 3) << 24);
			a(b, l)
		}
		g = g.substring(e - 64);
		d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (e = 0; e < g.length; e++) d[e >> 2] |= g.charCodeAt(e) << (e % 4 << 3);
		d[e >> 2] |= 128 << (e % 4 << 3);
		if (55 < e)
			for (a(b, d), e = 0; 16 > e; e++) d[e] = 0;
		d[14] = 8 * c;
		a(b, d);
		for (g = 0; g < b.length; g++) {
			c = b[g];
			e = "";
			for (d = 0; 4 > d; d++) e += r[c >> 8 * d + 4 & 15] + r[c >> 8 * d & 15];
			b[g] = e
		}
		return b.join("")
	}
	var r = "0123456789abcdef".split("");
	q("hello");
	return q
}();
/*
 The MIT License: Copyright (c) 2010-2017 LiosK.
*/
var M;
M = function(a) {
	function b() {
		var a = c.g;
		this.timestamp = 0;
		this.o = a(14);
		this.node = 1099511627776 * (a(8) | 1) + a(40);
		this.v = a(4)
	}

	function c() {}
	c.X = function() {
		var a = c.g,
			b = c.V;
		return b(a(32), 8) + "-" + b(a(16), 4) + "-" + b(16384 | a(12), 4) + "-" + b(32768 | a(14), 4) + "-" + b(a(48), 12)
	};
	c.g = function(a) {
		if (0 > a || 53 < a) return NaN;
		var b = 0 | 1073741824 * Math.random();
		return 30 < a ? b + 1073741824 * (0 | Math.random() * (1 << a - 30)) : b >>> 30 - a
	};
	c.V = function(a, b) {
		a = a.toString(16);
		b -= a.length;
		for (var c = "0"; 0 < b; b >>>= 1, c += c) b & 1 && (a = c + a);
		return a
	};
	c.Ga = a;
	(function() {
		var a =
			c.g;
		c.Ka = function() {
			c.g = a
		};
		var b = null,
			q = a;
		"undefined" !== typeof window && (b = window.crypto || window.Fa) ? b.getRandomValues && "undefined" !== typeof Uint32Array && (q = function(a) {
			if (0 > a || 53 < a) return NaN;
			var c = b.getRandomValues(new Uint32Array(32 < a ? 2 : 1));
			return 32 < a ? c[0] + 4294967296 * (c[1] >>> 64 - a) : c[0] >>> 32 - a
		}) : "undefined" !== typeof require && (b = require("crypto")) && b.wa && (q = function(a) {
			if (0 > a || 53 < a) return NaN;
			var c = b.wa(32 < a ? 8 : 4),
				g = c.xa(0);
			return 32 < a ? g + 4294967296 * (c.xa(4) >>> 64 - a) : g >>> 32 - a
		});
		c.g = q
	})();
	c.ca = "timeLow timeMid timeHiAndVersion clockSeqHiAndReserved clockSeqLow node".split(" ");
	c.da = [32, 16, 16, 8, 8, 48];
	c.ma = function() {
		var a = c.g;
		return (new c).B(a(32), a(16), 16384 | a(12), 128 | a(6), a(8), a(48))
	};
	c.parse = function(a) {
		if (a = /^\s*(urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(\})?\s*$/i.exec(a)) {
			var b = a[1] || "",
				g = a[8] || "";
			if ("" === b + g || "{" === b && "}" === g || "urn:uuid:" === b.toLowerCase() && "" === g) return (new c).B(parseInt(a[2], 16), parseInt(a[3], 16), parseInt(a[4], 16), parseInt(a[5], 16), parseInt(a[6], 16), parseInt(a[7], 16))
		}
		return null
	};
	c.prototype.B =
		function() {
			var a = c.ca,
				b = c.da,
				q = c.ea,
				r = c.V;
			this.J = Array(6);
			this.W = Array(6);
			this.h = Array(6);
			for (var n = 0; 6 > n; n++) {
				var k = parseInt(arguments[n] || 0);
				this.J[n] = this.J[a[n]] = k;
				this.W[n] = this.W[a[n]] = q(k, b[n]);
				this.h[n] = this.h[a[n]] = r(k, b[n] / 4)
			}
			this.version = this.J.Ja >> 12 & 15;
			this.Y = this.h[0] + "-" + this.h[1] + "-" + this.h[2] + "-" + this.h[3] + this.h[4] + "-" + this.h[5];
			return this
	};
	c.ea = function(a, b) {
		a = a.toString(2);
		b -= a.length;
		for (var c = "0"; 0 < b; b >>>= 1, c += c) b & 1 && (a = c + a);
		return a
	};
	c.prototype.toString = function() {
		return this.Y
	};
	c.Ea = (new c).B(0, 0, 0, 0, 0, 0);
	c.la = function() {
		null == c.G && c.Aa();
		var a = (new Date).getTime(),
			b = c.G;
		a != b.timestamp ? (a < b.timestamp && b.o++, b.timestamp = a, b.v = c.g(4)) : Math.random() < c.ga && 9984 > b.v ? b.v += 1 + c.g(4) : b.o++;
		a = c.fa(b.timestamp);
		var q = a.low + b.v,
			r = a.ra & 4095 | 4096;
		b.o &= 16383;
		return (new c).B(q, a.va, r, b.o >>> 8 | 128, b.o & 255, b.node)
	};
	c.Aa = function() {
		c.G = new b
	};
	c.ga = .25;
	c.G = null;
	c.fa = function(a) {
		a -= Date.UTC(1582, 9, 15);
		var b = a / 4294967296 * 1E4 & 268435455;
		return {
			low: 1E4 * (a & 268435455) % 4294967296,
			va: b & 65535,
			ra: b >>>
				16,
			timestamp: a
		}
	};
	c.ua = function() {
		var a = c.X;
		c.X = function(b) {
			return b && 1 == b.version ? c.la().Y : a.call(c)
		};
		c.ua = function() {}
	};
	"undefined" !== typeof module && module && module.ka && (module.ka = c);
	return c
}(M);
var N;
N = {
	Ca: function(a, b) {
		b && chrome.storage.local.set({
			app_token: a
		}, function() {
			b()
		})
	},
	H: function(a) {
		a && chrome.storage.local.get("app_token", function(b) {
			a("app_token" in b ? b.app_token : null)
		})
	},
	ya: function(a) {
		a && chrome.storage.local.remove("app_token", function() {
			a()
		})
	},
	D: function(a) {
		a && chrome.storage.local.get("app_id", function(b) {
			if ("app_id" in b) a(b.app_id);
			else {
				var c = "{" + M.ma() + "}";
				chrome.storage.local.set({
					app_id: c
				}, function() {
					a(c)
				})
			}
		})
	},
	Da: function(a, b) {
		chrome.storage.local.set({
			last_used_cookie: a
		}, function() {
			b()
		})
	},
	pa: function(a) {
		chrome.storage.local.get("last_used_cookie", function(b) {
			"last_used_cookie" in b ? a(b.last_used_cookie) : a(null)
		})
	},
	za: function(a) {
		chrome.storage.local.remove("last_used_cookie", function() {
			a()
		})
	},
	oa: function(a) {
		chrome.cookies.get({
			url: K.qa(),
			name: "__auth"
		}, function(b) {
			b ? a(b.value) : a(null)
		})
	}
};

function O(a, b) {
	this.b = a;
	this.j = b;
	this.ba = this.F = this.a = this.L = null;
	this.i = {};
	this.i[this.f.w] = $.Callbacks();
	this.i[this.f.COMPLETE] = $.Callbacks()
}
O.prototype.f = {
	w: "progress_change",
	COMPLETE: "complete"
};
O.prototype.A = {
	U: "success",
	T: "failed"
};
O.prototype.getImageData = function() {
	return this.j
};
O.prototype.I = function() {
	var a = {
		Ba: this.F
	};
	this.a ? a.error = this.a : a.m = this.ba;
	return a
};
O.prototype.attachEvent = function(a, b) {
	"undefined" !== typeof this.i[a] && this.i[a].add(b)
};
O.prototype.detachEvent = function(a, b) {
	"undefined" !== typeof this.i[a] && this.i[a].remove(b)
};

function P(a, b) {
	P.R.constructor.call(this, a, b);
	this.M = "5CE3DF4D45AC";
	this.ta = "http://upload.prntscr.com/upload/{time}/{hash}/"
}
A.extend(P, O);
P.prototype.upload = function() {
	var a = this;
	this.F = this.A.T;
	var b = function(a) {
		var b = a.split(",");
		a = b[0].match(/:(.*?);/)[1];
		b = atob(b[1]);
		for (var c = b.length, g = new Uint8Array(c); c--;) g[c] = b.charCodeAt(c);
		return new Blob([g], {
			type: a
		})
	}(a.j.dataUrl),
		c = new FormData;
	c.append("image", b, "image.png");
	c.append("app_id", a.j.app_id);
	"app_token" in a.j && c.append("app_token", a.j.app_token);
	b = Math.floor(Date.now() / 1E3);
	var g = L("{key}*{time}".replace("{key}", this.M).replace("{time}", b));
	b = this.ta.replace("{time}", b).replace("{hash}",
		g);
	this.L = $.ajax({
		processData: !1,
		contentType: !1,
		url: b,
		type: "POST",
		timeout: 18E4,
		data: c,
		xhr: function() {
			var b = new XMLHttpRequest;
			b.upload.onprogress = function(b) {
				b.lengthComputable && a.i[a.f.w].fire({
					loaded: b.loaded,
					total: b.total
				})
			};
			return b
		},
		beforeSend: function() {},
		complete: function(b, c) {
			a.F = a.A.T;
			try {
				var g = $.parseXML(b.responseText);
				if (g && (g.getElementsByTagName("url").length || g.getElementsByTagName("share").length)) {
					a.F = a.A.U;
					var l = {};
					g && (g.getElementsByTagName("url").length && g.getElementsByTagName("url")[0].innerHTML &&
						(l.img_url = g.getElementsByTagName("url")[0].innerHTML), g.getElementsByTagName("thumb").length && g.getElementsByTagName("thumb")[0].innerHTML && (l.thumb_url = g.getElementsByTagName("thumb")[0].innerHTML), g.getElementsByTagName("share").length && g.getElementsByTagName("share")[0].innerHTML && (l.share_url = g.getElementsByTagName("share")[0].innerHTML), l.width = 0, l.height = 0, l.delete_hash = "");
					a.ba = l
				} else a.a = B.s("screenshot_plugin_image_hosting_incorrect_response")
			} catch (k) {
				a.a = B.s("screenshot_plugin_upload_error_capt") +
					"\n\n", a.a += B.s("screenshot_plugin_upload_error_detailed_info") + ":\n", a.a += "status = " + (b && b.status ? b.status : "") + "\n", a.a += "textStatus = " + c + "\n", a.a += "e = " + k + "\n", a.a += "responseText = " + (b && b.responseText ? b.responseText : "") + "\n"
			}
			a.i[a.f.COMPLETE].fire(a.I())
		}
	})
};
P.prototype.cancel = function() {
	this.L && this.L.abort()
};
P.prototype.I = function() {
	var a = P.R.I.apply(this, arguments);
	a.key = this.M.substr(this.M.length - 4);
	return a
};

function Q(a, b) {
	this.b = a;
	this.j = b;
	var c = this;
	this.K = [];
	this.K.push(function() {
		return new P(c.b, c.j)
	});
	this.N = 0;
	this.O = this.P = this.aa = this.Z = this.c = null
}

function ca(a) {
	a.P = function(b) {
		da(a, b)
	};
	a.c.attachEvent(a.c.f.COMPLETE, a.P);
	a.O = function(b) {
		E.sendMessage({
			name: S,
			id: a.b,
			progress: Math.round(b.loaded / b.total * 100)
		})
	};
	a.c.attachEvent(a.c.f.w, a.O)
}

function T(a) {
	a.c.detachEvent(a.c.f.COMPLETE, a.P);
	a.c.detachEvent(a.c.f.w, a.O)
}
Q.prototype.upload = function() {
	this.c = this.K[this.N]();
	ca(this);
	this.c.upload()
};

function da(a, b) {
	b.Ba === a.c.A.U ? "share_url" in b.m ? U(a, {
		url: b.m.share_url,
		success: !0
	}) : (a.Z = b.m.img_url, b.m.dpr = a.j.dpr, N.D(function(c) {
		N.H(function(g) {
			b.m.app_id = c;
			g && (b.m.app_token = g);
			K.save(b.m, function(b) {
				U(a, b)
			})
		})
	})) : ea(a)
}

function ea(a) {
	a.N++;
	a.N < a.K.length ? (T(a), a.c = null, a.upload()) : E.sendMessage({
		name: V,
		id: a.b
	})
}

function U(a, b) {
	b && b.success && b.url && (a.aa = b.url);
	E.sendMessage({
		name: W,
		id: a.b
	})
}
Q.prototype.cancel = function() {
	this.c.cancel();
	T(this)
};

function X() {
	this.l = {}
}
X.prototype.upload = function(a, b) {
	this.l[a] = new Q(a, b);
	this.l[a].upload();
	E.sendMessage({
		name: Y,
		id: a
	})
};

function Z(a, b) {
	a.l[b] ? (a = a.l[b], a = a.aa || a.Z) : a = null;
	return a
};
var I = "upload_screenshot",
	Y = "upload_started",
	S = "upload_progress",
	W = "upload_success",
	V = "upload_failed",
	F = "open_screenshot_link",
	H = "copy_screenshot_link",
	G = "cancel_upload";

var E = function() {
	function a(a) {
		a.clipboardData.setData("text/plain", R);
		a.preventDefault()
	}

	function b(a, b, c)
	{
		if (a && "undefined" !== typeof a && "undefined" !== typeof a.name)
			switch (a.name)
			{
				case "load_screenshot":
					a = a.id;
					b = J[a];
					delete J[a];
					c(b);
					break;
				case I:
					l(a.id);
					c();
					break;
				case "close_screenshot_window":
					chrome.tabs.remove(b.tab.id)
			}
	}

	function c(a) {
		g(a, function() {
			if (C[a] && C[a].cmdAfterUpload) {
				var b = Z(d, a);
				switch (C[a].cmdAfterUpload) {
					case "search_google":
						chrome.tabs.create({
							url: "http://www.google.com/searchbyimage?image_url=" +
								b + "/direct"
						});
						break;
					case "share_twitter":
						chrome.tabs.create({
							url: "http://twitter.com/home?source=Lightshot&status=" + b + "%20"
						});
						break;
					case "share_facebook":
						chrome.tabs.create({
							url: "https://www.facebook.com/dialog/share?app_id=585941498129307&display=page&href=" + b + "&redirect_uri=" + b
						});
						break;
					case "share_vk":
						chrome.tabs.create({
							url: "http://vk.com/share.php?url=" + b
						});
						break;
					case "share_pinterest":
						chrome.tabs.create({
							url: "http://pinterest.com/pin/create/button/?url=" + b + "&media=" + b + "/direct"
						})
				}
				f.C(a)
			} else f.S(a, {
				type: "success",
				message: Z(d, a)
			})
		})
	}

	function g(a, b) {
		chrome.storage.local.remove(a, function() {
			b && b()
		})
	}

	function l(a) {
		k(function() {
			chrome.storage.local.get(a, function(b) {
				var c = b[a];
				C[a] = c;
				N.D(function(b) {
					N.H(function(e) {
						c.app_id = b;
						e && ("cmdAfterUpload" in c && "search_google" === c.cmdAfterUpload || (c.app_token = e));
						d.upload(a, c)
					})
				})
			})
		})
	}

	function q(a) {
		r(a)
	}

	function r() {
		n(function(a) {
			var b = aa.na("screenshot_");
			J[b] = a;
			chrome.tabs.create({
				url: chrome.extension.getURL("screenshot.html?id=" + b)
			}, function() {})
		})
	}

	function n(a) {
		chrome.tabs.captureVisibleTab({
			format: "png"
		}, function(b) {
			a(b)
		})
	}

	function k(a) {
		N.oa(function(b) {
			b ? N.pa(function(c) {
				c && c === b ? a && a() : e(b, a)
			}) : h(a())
		})
	}

	function h(a) {
		N.H(function(b) {
			b ? N.D(function(c) {
				K.ja(c, b, function() {
					N.ya(function() {
						N.za(function() {
							a && a()
						})
					})
				})
			}) : a && a()
		})
	}

	function e(a, b) {
		N.D(function(c) {
			chrome.runtime.getPlatformInfo(function(d) {
				d = "{os} {arch}".replace("{os}", d.os).replace("{arch}", d.arch);
				K.ha(a, c, d, function(c) {
					!0 === c.success && "app_token" in c && "" !== c.app_token ? N.Da(a, function() {
						N.Ca(c.app_token, function() {
							b && b()
						})
					}) : b && b()
				})
			})
		})
	}
	var d = null,
		f = null,
		R = null,
		C = {}, J = {};
	return {
		sa: function() {
			d = new X;
			f = ba();
			chrome.browserAction.onClicked.addListener(q);
			chrome.runtime.onMessage.addListener(b);
			document.addEventListener("copy", a);
			var c = chrome.runtime.getManifest().version;
			"undefined" === typeof window.localStorage.lightshot_version ? window.localStorage.ever_updated = "no" : window.localStorage.lightshot_version != c && (window.localStorage.ever_updated = "yes");
			window.localStorage.lightshot_version = c
		},
		sendMessage: function(a) {
			if (a && "undefined" !==
				typeof a && "undefined" !== typeof a.name)
				switch (a.name) {
					case Y:
						f.ia(a.id);
						break;
					case S:
						f.S(a.id, {
							type: "progress",
							progress: a.progress
						});
						break;
					case W:
						c(a.id);
						break;
					case V:
						f.S(a.id, {
							type: "failed"
						});
						break;
					case F:
						chrome.tabs.create({
							url: Z(d, a.id)
						});
						f.C(a.id);
						break;
					case H:
						R = Z(d, a.id);
						document.execCommand("copy");
						f.C(a.id);
						break;
					case G:
						g(a.id, function() {
							var b = d,
								c = a.id;
							b.l[c] && (b.l[c].cancel(), delete b.l[c])
						}), f.C(a.id)
				}
		}
	}
}();
E.sa();