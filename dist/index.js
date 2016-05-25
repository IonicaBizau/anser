"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(e, n) {
  if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}var _createClass = function () {
  function e(e, n) {
    for (var r = 0; r < n.length; r++) {
      var t = n[r];t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
    }
  }return function (n, r, t) {
    return r && e(n.prototype, r), t && e(n, t), n;
  };
}(),
    _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof2(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
};!function (e) {
  if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
    var n;n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, n.Anser = e();
  }
}(function () {
  return function e(n, r, t) {
    function o(i, l) {
      if (!r[i]) {
        if (!n[i]) {
          var u = "function" == typeof require && require;if (!l && u) return u(i, !0);if (s) return s(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
        }var c = r[i] = { exports: {} };n[i][0].call(c.exports, function (e) {
          var r = n[i][1][e];return o(r ? r : e);
        }, c, c.exports, e, n, r, t);
      }return r[i].exports;
    }for (var s = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }return o;
  }({ 1: [function (e, n) {
      function r() {
        a = !1, i.length ? u = i.concat(u) : c = -1, u.length && t();
      }function t() {
        if (!a) {
          var e = setTimeout(r);a = !0;for (var n = u.length; n;) {
            for (i = u, u = []; ++c < n;) {
              i && i[c].run();
            }c = -1, n = u.length;
          }i = null, a = !1, clearTimeout(e);
        }
      }function o(e, n) {
        this.fun = e, this.array = n;
      }function s() {}var i,
          l = n.exports = {},
          u = [],
          a = !1,
          c = -1;l.nextTick = function (e) {
        var n = new Array(arguments.length - 1);if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) {
          n[r - 1] = arguments[r];
        }u.push(new o(e, n)), 1 !== u.length || a || setTimeout(t, 0);
      }, o.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = s, l.addListener = s, l.once = s, l.off = s, l.removeListener = s, l.removeAllListeners = s, l.emit = s, l.binding = function () {
        throw new Error("process.binding is not supported");
      }, l.cwd = function () {
        return "/";
      }, l.chdir = function () {
        throw new Error("process.chdir is not supported");
      }, l.umask = function () {
        return 0;
      };
    }, {}], 2: [function (e, n) {
      (function () {
        var e = [[{ color: "0, 0, 0", "class": "ansi-black" }, { color: "187, 0, 0", "class": "ansi-red" }, { color: "0, 187, 0", "class": "ansi-green" }, { color: "187, 187, 0", "class": "ansi-yellow" }, { color: "0, 0, 187", "class": "ansi-blue" }, { color: "187, 0, 187", "class": "ansi-magenta" }, { color: "0, 187, 187", "class": "ansi-cyan" }, { color: "255,255,255", "class": "ansi-white" }], [{ color: "85, 85, 85", "class": "ansi-bright-black" }, { color: "255, 85, 85", "class": "ansi-bright-red" }, { color: "0, 255, 0", "class": "ansi-bright-green" }, { color: "255, 255, 85", "class": "ansi-bright-yellow" }, { color: "85, 85, 255", "class": "ansi-bright-blue" }, { color: "255, 85, 255", "class": "ansi-bright-magenta" }, { color: "85, 255, 255", "class": "ansi-bright-cyan" }, { color: "255, 255, 255", "class": "ansi-bright-white" }]];n.exports = function () {
          function n() {
            _classCallCheck(this, n), this.fg = this.bg = this.fg_truecolor = this.bg_truecolor = null, this.bright = 0;
          }return _createClass(n, null, [{ key: "escapeForHtml", value: function value(e) {
              return new n().escapeForHtml(e);
            } }, { key: "linkify", value: function value(e) {
              return new n().linkify(e);
            } }, { key: "ansiToHtml", value: function value(e, r) {
              return new n().ansiToHtml(e, r);
            } }, { key: "ansiToJson", value: function value(e, r) {
              return new n().ansiToJson(e, r);
            } }, { key: "ansiToText", value: function value(e) {
              return new n().ansiToText(e);
            } }]), _createClass(n, [{ key: "setupPalette", value: function value() {
              this.PALETTE_COLORS = [];for (var n = 0; 2 > n; ++n) {
                for (var r = 0; 8 > r; ++r) {
                  this.PALETTE_COLORS.push(e[n][r].color);
                }
              }for (var t = [0, 95, 135, 175, 215, 255], o = function o(e, n, r) {
                return t[e] + ", " + t[n] + ", " + t[r];
              }, s = 0; 6 > s; ++s) {
                for (var i = 0; 6 > i; ++i) {
                  for (var l = 0; 6 > l; ++l) {
                    this.PALETTE_COLORS.push(o(s, i, l));
                  }
                }
              }for (var u = 8, a = 0; 24 > a; ++a, u += 10) {
                this.PALETTE_COLORS.push(o(u, u, u));
              }
            } }, { key: "escapeForHtml", value: function value(e) {
              return e.replace(/[&<>]/gm, function (e) {
                return "&" == e ? "&amp;" : "<" == e ? "&lt;" : ">" == e ? "&gt;" : "";
              });
            } }, { key: "linkify", value: function value(e) {
              return e.replace(/(https?:\/\/[^\s]+)/gm, function (e) {
                return '<a href="' + e + '">' + e + "</a>";
              });
            } }, { key: "ansiToHtml", value: function value(e, n) {
              return this.process(e, n, !0);
            } }, { key: "ansiToJson", value: function value(e, n) {
              return n = n || {}, n.json = !0, this.process(e, n, !0);
            } }, { key: "ansiToText", value: function value(e) {
              return this.process(e, {}, !1);
            } }, { key: "process", value: function value(e, n, r) {
              var t = this,
                  o = this,
                  s = e.split(/\033\[/),
                  i = s.shift(),
                  l = s.map(function (e) {
                return t.processChunk(e, n, r);
              });if (n && n.json) {
                var u = o.processChunkJson("");return u.content = i, l.unshift(u), n.remove_empty && (l = l.filter(function (e) {
                  return !e.isEmpty();
                })), l;
              }return l.unshift(i), l.join("");
            } }, { key: "processChunkJson", value: function value(n, r, t) {
              r = "undefined" == typeof r ? {} : r;var o = r.use_classes = "undefined" != typeof r.use_classes && r.use_classes,
                  s = r.key = o ? "class" : "color",
                  i = { content: n, fg: null, bg: null, fg_truecolor: null, bg_truecolor: null, was_processed: !1, isEmpty: function isEmpty() {
                  return !i.content;
                } },
                  l = n.match(/^([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])([\s\S]*)/m);if (!l) return i;var u = (i.content = l[4], l[2].split(";"));if ("" !== l[1] || "m" !== l[3]) return i;if (!t) return i;for (var a = this; u.length > 0;) {
                var c = u.shift(),
                    f = parseInt(c);if (isNaN(f) || 0 === f) a.fg = a.bg = null, a.bright = 0;else if (1 === f) a.bright = 1;else if (39 == f) a.fg = null;else if (49 == f) a.bg = null;else if (f >= 30 && 38 > f) a.fg = e[a.bright][f % 10][s];else if (f >= 90 && 98 > f) a.fg = e[1][f % 10][s];else if (f >= 40 && 48 > f) a.bg = e[0][f % 10][s];else if (f >= 100 && 108 > f) a.bg = e[1][f % 10][s];else if (38 === f || 48 === f) {
                  var g = 38 === f;if (u.length >= 1) {
                    var h = u.shift();if ("5" === h && u.length >= 1) {
                      var p = parseInt(u.shift());if (p >= 0 && 255 >= p) if (o) {
                        var b = p >= 16 ? "ansi-palette-" + p : e[p > 7 ? 1 : 0][p % 8]["class"];g ? a.fg = b : a.bg = b;
                      } else this.PALETTE_COLORS || a.setupPalette(), g ? a.fg = this.PALETTE_COLORS[p] : a.bg = this.PALETTE_COLORS[p];
                    } else if ("2" === h && u.length >= 3) {
                      var v = parseInt(u.shift()),
                          y = parseInt(u.shift()),
                          d = parseInt(u.shift());if (v >= 0 && 255 >= v && y >= 0 && 255 >= y && d >= 0 && 255 >= d) {
                        var m = v + ", " + y + ", " + d;o ? g ? (a.fg = "ansi-truecolor", a.fg_truecolor = m) : (a.bg = "ansi-truecolor", a.bg_truecolor = m) : g ? a.fg = m : a.bg = m;
                      }
                    }
                  }
                }
              }if (null === a.fg && null === a.bg) return i;return i.fg = a.fg, i.bg = a.bg, i.fg_truecolor = a.fg_truecolor, i.bg_truecolor = a.bg_truecolor, i.was_processed = !0, i;
            } }, { key: "processChunk", value: function value(e, n, r) {
              var t = this;n = n || {};var o = this.processChunkJson(e, n, r);if (n.json) return o;if (o.isEmpty()) return "";if (!o.was_processed) return o.content;var s = n.use_classes,
                  i = [],
                  l = [],
                  u = {},
                  a = function a(e) {
                var n = [],
                    r = void 0;for (r in e) {
                  e.hasOwnProperty(r) && n.push("data-" + r + '="' + t.escapeForHtml(e[r]) + '"');
                }return n.length > 0 ? " " + n.join(" ") : "";
              };return o.fg && (s ? (l.push(o.fg + "-fg"), null !== o.fg_truecolor && (u["ansi-truecolor-fg"] = o.fg_truecolor, o.fg_truecolor = null)) : i.push("color:rgb(" + o.fg + ")")), o.bg && (s ? (l.push(o.bg + "-bg"), null !== o.bg_truecolor && (u["ansi-truecolor-bg"] = o.bg_truecolor, o.bg_truecolor = null)) : i.push("background-color:rgb(" + o.bg + ")")), s ? '<span class="' + l.join(" ") + '"' + a(u) + ">" + o.content + "</span>" : '<span style="' + i.join(";") + '"' + a(u) + ">" + o.content + "</span>";
            } }]), n;
        }();
      }).call(this, e("_process"));
    }, { _process: 1 }] }, {}, [2])(2);
});