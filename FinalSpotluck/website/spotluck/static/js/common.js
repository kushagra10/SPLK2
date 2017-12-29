"use strict";

function bodyClickHandler() {
    event.target.classList.contains("navbar__icon") ? document.querySelector(".navbar__menu").classList.toggle("navbar__menu--is-shown") : (document.querySelector(".navbar__menu").classList.toggle("navbar__menu--is-shown"), document.body.removeEventListener("click", bodyClickHandler), document.body.style.cursor = "auto", document.body.style.overflowY = "auto", $("body").unbind("touchmove"))
}

function menuClick(e) {
    e.preventDefault();
    var t = document.querySelector(".navbar__menu");
    t.classList.contains("navbar__menu--is-shown") ? t.classList.toggle("navbar__menu--is-shown") : (document.body.addEventListener("click", bodyClickHandler), document.body.style.cursor = "pointer", document.body.style.overflowY = "hidden", $("body").bind("touchmove", function(e) {
        e.preventDefault()
    }))
}

function newCity(e, t) {
    if (!e.classList.contains("city-selector--active")) {
        document.querySelectorAll(".city-selector");
        window.location.href = "/restaurants?newcity=" + t
    }
}

function filterNeighborhood(e) {
    var t = JSON.parse(e.value);
    window.location.href = "/restaurants?newcity=" + t.city.name + "&hub=" + t.name
}

function filterCards(e) {
    var t = 6,
        n = JSON.parse(window.merchants),
        i = "",
        o = "",
        r = "",
        a = 0;
    for (a; a < n.length; a++) r = "undefined" != typeof n[a].total_user_rating && n[a].total_user_rating > t ? '<h4 class="u-pull-right"> ' + ((n[a].avg_food_rating + n[a].avg_service_rating + n[a].avg_atmosphere_rating) / 3).toFixed(1) + "</h4>" : '<div class="row"><h4>&nbsp;</h4></div>', "*" === e.value && a <= 11 ? i += '<div data-hub="' + n[a].hub.name + '" class="columns three search-card">\n              <a href="/merchants/' + n[a].seoFriendlyName + '">\n                <div class="card card--restaurant">\n                  <img class="card card__cover" src="' + n[a].featured_image + '" alt="' + n[a].name + '">\n                  <div class="card card__gradient"></div>\n                  <div class="card card__text">\n                  <div class="row">\n                    ' + r + '\n                  </div>\n                  <div class="row">\n                    <h5 class="u-pull-Left">' + n[a].name + '</h5>\n                  </div>\n                  <div class="row">\n                    <h6 class="u-pull-Left card__subheading">' + n[a].cuisine + '</h6>\n                  </div>\n                  <div class="row">\n                    <h6 class="u-pull-Left card__subheading--bold">' + n[a].hub.name + "</h6>\n                  </div>\n                  </div>\n                </div>\n              </a>\n            </div>" : n[a].hub.name === e.value && (i += '<div data-hub="' + n[a].hub.name + '" class="columns three search-card">\n                <a href="/merchants/' + n[a].seoFriendlyName + '">\n                  <div class="card card--restaurant">\n                    <img class="card card__cover" src="' + n[a].featured_image + '" alt="' + n[a].name + '">\n                    <div class="card card__gradient"></div>\n                    <div class="card card__text">\n                    <div class="row">\n                      ' + r + '\n                    </div>\n                    <div class="row">\n                      <h5 class="u-pull-Left">' + n[a].name + '</h5>\n                    </div>\n                    <div class="row">\n                      <h6 class="u-pull-Left card__subheading">' + n[a].cuisine + '</h6>\n                    </div>\n                    <div class="row">\n                      <h6 class="u-pull-Left card__subheading--bold">' + n[a].hub.name + "</h6>\n                    </div>\n                    </div>\n                  </div>\n                </a>\n              </div>");
    o = "*" === e.value ? '<div class="columns twelve"><div onClick="loadMore(12)" class="button">LOAD MORE</div></div>' : "", document.getElementById("search-button").innerHTML = o, document.getElementById("search-results").innerHTML = i
}

function load(e) {
    var t = 6,
        n = e,
        i = "",
        o = "",
        r = "",
        a = 0;
    window.merchants = JSON.stringify(n);
    var s = document.getElementById("hubSelected").value,
        l = getParameterByName("hub");
    if (null != l && "*" === s) {
        var c = document.getElementById("hubSelected");
        return c.value = l, void filterCards(c)
    }
    if ("*" != s) {
        var c = document.getElementById("hubSelected");
        return c.value = s, void filterCards(c)
    }
    var u = JSON.parse(window.merchants);
    for (a; a < 12 && !(a + 1 > u.length); a++) r = "undefined" != typeof u[a].total_user_rating && u[a].total_user_rating > t ? '<h4 class="u-pull-right"> ' + ((u[a].avg_food_rating + u[a].avg_service_rating + u[a].avg_atmosphere_rating) / 3).toFixed(1) + "</h4>" : '<div class="row"><h4>&nbsp;</h4></div>', i += '<div data-hub="' + u[a].hub.name + '" class="columns three search-card">\n              <a href="/merchants/' + u[a].seoFriendlyName + '">\n                <div class="card card--restaurant">\n                  <img class="card card__cover" src="' + u[a].featured_image + '" alt="' + u[a].name + '">\n                  <div class="card card__gradient"></div>\n                  <div class="card card__text">\n                  <div class="row">\n                    ' + r + '\n                  </div>\n                  <div class="row">\n                    <h5 class="u-pull-Left">' + u[a].name + '</h5>\n                  </div>\n                  <div class="row">\n                    <h6 class="u-pull-Left card__subheading">' + u[a].cuisine + '</h6>\n                  </div>\n                  <div class="row">\n                    <h6 class="u-pull-Left card__subheading--bold">' + u[a].hub.name + "</h6>\n                  </div>\n                  </div>\n                </div>\n              </a>\n            </div>\n            ";
    o = '<div class="columns twelve"><div onClick="loadMore(' + a + ')" class="button">LOAD MORE</div></div>', document.getElementById("search-results").innerHTML = i, document.getElementById("search-button").innerHTML = o
}

function loadMore(e) {
    var t = 6,
        n = document.getElementById("search-results").innerHTML,
        i = "",
        o = "",
        r = e,
        a = JSON.parse(window.merchants);
    for (r; r < e + 12; r++) {
        if (!a[r]) return i = '<div class="columns twelve"><div class="button">THATS ALL</div></div>', document.getElementById("search-results").innerHTML = n, void(document.getElementById("search-button").innerHTML = i);
        o = "undefined" != typeof a[r].total_user_rating && a[r].total_user_rating > t ? '<h4 class="u-pull-right"> ' + ((a[r].avg_food_rating + a[r].avg_service_rating + a[r].avg_atmosphere_rating) / 3).toFixed(1) + "</h4>" : '<div class="row"><h4>&nbsp;</h4></div>', n += '<div data-hub="' + a[r].hub.name + '" class="columns three search-card">\n              <a href="/merchants/' + a[r].seoFriendlyName + '">\n                <div class="card card--restaurant">\n                  <img class="card card__cover" src="' + a[r].featured_image + '" alt="' + a[r].name + '">\n                  <div class="card card__gradient"></div>\n                  <div class="card card__text">\n                  <div class="row">\n                    ' + o + '\n                  </div>\n                  <div class="row">\n                    <h5 class="u-pull-Left">' + a[r].name + '</h5>\n                  </div>\n                  <div class="row">\n                    <h6 class="u-pull-Left card__subheading">' + a[r].cuisine + '</h6>\n                  </div>\n                  <div class="row">\n                    <h6 class="u-pull-Left card__subheading--bold">' + a[r].hub.name + "</h6>\n                  </div>\n                  </div>\n                </div>\n              </a>\n            </div>\n            "
    }
    i = '<div class="columns twelve"><div onClick="loadMore(' + r + ')" class="button">LOAD MORE</div></div>', document.getElementById("search-results").innerHTML = n, document.getElementById("search-button").innerHTML = i
}

function loadVideo() {
    var e = lity();
    e("https://youtu.be/yklrZV1UR0Q")
}

function showDownloads() {
    var e = document.querySelector(".fixed-appbar__link-list");
    try {
        analytics.track("Clicked the app bar button", {})
    } catch (t) {
        console.log(t)
    }
    "50px" === e.style.bottom ? e.style.bottom = "-51px" : e.style.bottom = "50px"
}

function accordionControl() {
    if ($(window).width() <= 750) {
        var e, t = document.getElementsByClassName("accordion");
        for (e = 0; e < t.length; e++) t[e].onclick = function() {
            this.classList.toggle("active");
            var e = this.nextElementSibling;
            "block" === e.style.display ? (e.style.display = "none", $(".right-arrow").removeClass("rotated")) : (e.style.display = "block", $(".right-arrow").addClass("rotated"))
        }
    }
}

function getParameterByName(e) {
    var t = window.location.href;
    e = e.replace(/[\[\]]/g, "\\$&");
    var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
        i = n.exec(t);
    return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
}

function ReviewController(e, t) {
    function n() {
        var n = "https://api.spotluck.com/website/get_ratings",
            i = JSON.stringify({
                headers: {
                    "auth-user-id": "rxtHRaiIWS"
                },
                merchant_id: e.merchant,
                current_page: e.currentPage
            });
        $("#spinnerCtrl").show(), $("#noReviewsCtrl").hide(), $("#btnCtrl").hide(), t.post(n, i).success(function(t) {
            var n = t.data.reviews;
            e.loadmore = t.data.load_more, 0 == t.data.total_items && $("#noReviewsCtrl").show();
            for (var i = 0; i < n.length; i++) {
                var o = parseInt(n[i].rating);
                n[i].ratingCircles = [];
                for (var r = 0; r < 5; r++) r < o ? n[i].ratingCircles.push(1) : o < r ? n[i].ratingCircles.push(0) : n[i].ratingCircles.push(.5);
                e.users[n[i].sl_username] || (e.reviews.push(n[i]), e.users[n[i].sl_username] = !0)
            }
            e.currentPage++, $("#spinnerCtrl").hide(), $("#btnCtrl").show()
        })
    }
    e.currentPage = 1, e.merchant = "", e.reviews = [], e.loadmore = !0, e.users = {}, e.init = function(t) {
        e.merchant = t, n()
    }, e.loadMore = function() {
        e.loadmore && n()
    }, e.nextPageDisabledClass = function() {
        return e.loadmore === !1 ? "disabled" : ""
    }
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e, t) {
    "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" === _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : void 0, function(e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length,
            n = re.type(e);
        return "function" !== n && !re.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e, t, n) {
        if (re.isFunction(t)) return re.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType) return re.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (ge.test(t)) return re.filter(t, e, n);
            t = re.filter(t, e)
        }
        return re.grep(e, function(e) {
            return Z.call(t, e) > -1 !== n
        })
    }

    function o(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function r(e) {
        var t = {};
        return re.each(e.match(ke) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function a() {
        G.removeEventListener("DOMContentLoaded", a), e.removeEventListener("load", a), re.ready()
    }

    function s() {
        this.expando = re.expando + s.uid++
    }

    function l(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)
            if (i = "data-" + t.replace(Ee, "-$&").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : De.test(n) ? re.parseJSON(n) : n)
                } catch (o) {}
                Se.set(e, t, n)
            } else n = void 0;
        return n
    }

    function c(e, t, n, i) {
        var o, r = 1,
            a = 20,
            s = i ? function() {
                return i.cur()
            } : function() {
                return re.css(e, t, "")
            },
            l = s(),
            c = n && n[3] || (re.cssNumber[t] ? "" : "px"),
            u = (re.cssNumber[t] || "px" !== c && +l) && Oe.exec(re.css(e, t));
        if (u && u[3] !== c) {
            c = c || u[3], n = n || [], u = +l || 1;
            do r = r || ".5", u /= r, re.style(e, t, u + c); while (r !== (r = s() / l) && 1 !== r && --a)
        }
        return n && (u = +u || +l || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = o)), o
    }

    function u(e, t) {
        var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && re.nodeName(e, t) ? re.merge([e], n) : n
    }

    function d(e, t) {
        for (var n = 0, i = e.length; n < i; n++) Ce.set(e[n], "globalEval", !t || Ce.get(t[n], "globalEval"))
    }

    function p(e, t, n, i, o) {
        for (var r, a, s, l, c, p, f = t.createDocumentFragment(), h = [], g = 0, v = e.length; g < v; g++)
            if (r = e[g], r || 0 === r)
                if ("object" === re.type(r)) re.merge(h, r.nodeType ? [r] : r);
                else if (qe.test(r)) {
            for (a = a || f.appendChild(t.createElement("div")), s = (je.exec(r) || ["", ""])[1].toLowerCase(), l = Ne[s] || Ne._default, a.innerHTML = l[1] + re.htmlPrefilter(r) + l[2], p = l[0]; p--;) a = a.lastChild;
            re.merge(h, a.childNodes), a = f.firstChild, a.textContent = ""
        } else h.push(t.createTextNode(r));
        for (f.textContent = "", g = 0; r = h[g++];)
            if (i && re.inArray(r, i) > -1) o && o.push(r);
            else if (c = re.contains(r.ownerDocument, r), a = u(f.appendChild(r), "script"), c && d(a), n)
            for (p = 0; r = a[p++];) Le.test(r.type || "") && n.push(r);
        return f
    }

    function f() {
        return !0
    }

    function h() {
        return !1
    }

    function g() {
        try {
            return G.activeElement
        } catch (e) {}
    }

    function v(e, t, n, i, o, r) {
        var a, s;
        if ("object" === ("undefined" == typeof t ? "undefined" : _typeof(t))) {
            "string" != typeof n && (i = i || n, n = void 0);
            for (s in t) v(e, s, n, i, t[s], r);
            return e
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), o === !1) o = h;
        else if (!o) return e;
        return 1 === r && (a = o, o = function(e) {
            return re().off(e), a.apply(this, arguments)
        }, o.guid = a.guid || (a.guid = re.guid++)), e.each(function() {
            re.event.add(this, t, o, i, n)
        })
    }

    function m(e, t) {
        return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function y(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function b(e) {
        var t = We.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function w(e, t) {
        var n, i, o, r, a, s, l, c;
        if (1 === t.nodeType) {
            if (Ce.hasData(e) && (r = Ce.access(e), a = Ce.set(t, r), c = r.events)) {
                delete a.handle, a.events = {};
                for (o in c)
                    for (n = 0, i = c[o].length; n < i; n++) re.event.add(t, o, c[o][n])
            }
            Se.hasData(e) && (s = Se.access(e), l = re.extend({}, s), Se.set(t, l))
        }
    }

    function k(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Pe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function x(e, t, n, i) {
        t = Q.apply([], t);
        var o, r, a, s, l, c, d = 0,
            f = e.length,
            h = f - 1,
            g = t[0],
            v = re.isFunction(g);
        if (v || f > 1 && "string" == typeof g && !ie.checkClone && Be.test(g)) return e.each(function(o) {
            var r = e.eq(o);
            v && (t[0] = g.call(this, o, r.html())), x(r, t, n, i)
        });
        if (f && (o = p(t, e[0].ownerDocument, !1, e, i), r = o.firstChild, 1 === o.childNodes.length && (o = r), r || i)) {
            for (a = re.map(u(o, "script"), y), s = a.length; d < f; d++) l = o, d !== h && (l = re.clone(l, !0, !0), s && re.merge(a, u(l, "script"))), n.call(e[d], l, d);
            if (s)
                for (c = a[a.length - 1].ownerDocument, re.map(a, b), d = 0; d < s; d++) l = a[d], Le.test(l.type || "") && !Ce.access(l, "globalEval") && re.contains(c, l) && (l.src ? re._evalUrl && re._evalUrl(l.src) : re.globalEval(l.textContent.replace(Ue, "")))
        }
        return e
    }

    function $(e, t, n) {
        for (var i, o = t ? re.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || re.cleanData(u(i)), i.parentNode && (n && re.contains(i.ownerDocument, i) && d(u(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function T(e, t) {
        var n = re(t.createElement(e)).appendTo(t.body),
            i = re.css(n[0], "display");
        return n.detach(), i
    }

    function C(e) {
        var t = G,
            n = Ye[e];
        return n || (n = T(e, t), "none" !== n && n || (Ve = (Ve || re("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ve[0].contentDocument, t.write(), t.close(), n = T(e, t), Ve.detach()), Ye[e] = n), n
    }

    function S(e, t, n) {
        var i, o, r, a, s = e.style;
        return n = n || Ke(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== a && void 0 !== a || re.contains(e.ownerDocument, e) || (a = re.style(e, t)), n && !ie.pixelMarginRight() && Ge.test(a) && Xe.test(t) && (i = s.width, o = s.minWidth, r = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = o, s.maxWidth = r), void 0 !== a ? a + "" : a
    }

    function D(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function E(e) {
        if (e in it) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)
            if (e = nt[n] + t, e in it) return e
    }

    function A(e, t, n) {
        var i = Oe.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
    }

    function O(e, t, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; r < 4; r += 2) "margin" === n && (a += re.css(e, n + Me[r], !0, o)), i ? ("content" === n && (a -= re.css(e, "padding" + Me[r], !0, o)), "margin" !== n && (a -= re.css(e, "border" + Me[r] + "Width", !0, o))) : (a += re.css(e, "padding" + Me[r], !0, o), "padding" !== n && (a += re.css(e, "border" + Me[r] + "Width", !0, o)));
        return a
    }

    function M(t, n, i) {
        var o = !0,
            r = "width" === n ? t.offsetWidth : t.offsetHeight,
            a = Ke(t),
            s = "border-box" === re.css(t, "boxSizing", !1, a);
        if (G.msFullscreenElement && e.top !== e && t.getClientRects().length && (r = Math.round(100 * t.getBoundingClientRect()[n])), r <= 0 || null == r) {
            if (r = S(t, n, a), (r < 0 || null == r) && (r = t.style[n]), Ge.test(r)) return r;
            o = s && (ie.boxSizingReliable() || r === t.style[n]), r = parseFloat(r) || 0
        }
        return r + O(t, n, i || (s ? "border" : "content"), o, a) + "px"
    }

    function H(e, t) {
        for (var n, i, o, r = [], a = 0, s = e.length; a < s; a++) i = e[a], i.style && (r[a] = Ce.get(i, "olddisplay"), n = i.style.display, t ? (r[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && He(i) && (r[a] = Ce.access(i, "olddisplay", C(i.nodeName)))) : (o = He(i), "none" === n && o || Ce.set(i, "olddisplay", o ? n : re.css(i, "display"))));
        for (a = 0; a < s; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[a] || "" : "none"));
        return e
    }

    function P(e, t, n, i, o) {
        return new P.prototype.init(e, t, n, i, o)
    }

    function j() {
        return e.setTimeout(function() {
            ot = void 0
        }), ot = re.now()
    }

    function L(e, t) {
        var n, i = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; i < 4; i += 2 - t) n = Me[i], o["margin" + n] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function N(e, t, n) {
        for (var i, o = (I.tweeners[t] || []).concat(I.tweeners["*"]), r = 0, a = o.length; r < a; r++)
            if (i = o[r].call(n, t, e)) return i
    }

    function q(e, t, n) {
        var i, o, r, a, s, l, c, u, d = this,
            p = {},
            f = e.style,
            h = e.nodeType && He(e),
            g = Ce.get(e, "fxshow");
        n.queue || (s = re._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
            s.unqueued || l()
        }), s.unqueued++, d.always(function() {
            d.always(function() {
                s.unqueued--, re.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], c = re.css(e, "display"), u = "none" === c ? Ce.get(e, "olddisplay") || C(e.nodeName) : c, "inline" === u && "none" === re.css(e, "float") && (f.display = "inline-block")), n.overflow && (f.overflow = "hidden", d.always(function() {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (i in t)
            if (o = t[i], at.exec(o)) {
                if (delete t[i], r = r || "toggle" === o, o === (h ? "hide" : "show")) {
                    if ("show" !== o || !g || void 0 === g[i]) continue;
                    h = !0
                }
                p[i] = g && g[i] || re.style(e, i)
            } else c = void 0;
        if (re.isEmptyObject(p)) "inline" === ("none" === c ? C(e.nodeName) : c) && (f.display = c);
        else {
            g ? "hidden" in g && (h = g.hidden) : g = Ce.access(e, "fxshow", {}), r && (g.hidden = !h), h ? re(e).show() : d.done(function() {
                re(e).hide()
            }), d.done(function() {
                var t;
                Ce.remove(e, "fxshow");
                for (t in p) re.style(e, t, p[t])
            });
            for (i in p) a = N(h ? g[i] : 0, i, d), i in g || (g[i] = a.start, h && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function _(e, t) {
        var n, i, o, r, a;
        for (n in e)
            if (i = re.camelCase(n), o = t[i], r = e[n], re.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), a = re.cssHooks[i], a && "expand" in a) {
                r = a.expand(r), delete e[i];
                for (n in r) n in e || (e[n] = r[n], t[n] = o)
            } else t[i] = o
    }

    function I(e, t, n) {
        var i, o, r = 0,
            a = I.prefilters.length,
            s = re.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var t = ot || j(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, a = 0, l = c.tweens.length; a < l; a++) c.tweens[a].run(r);
                return s.notifyWith(e, [c, r, n]), r < 1 && l ? n : (s.resolveWith(e, [c]), !1)
            },
            c = s.promise({
                elem: e,
                props: re.extend({}, t),
                opts: re.extend(!0, {
                    specialEasing: {},
                    easing: re.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: ot || j(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = re.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < i; n++) c.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                }
            }),
            u = c.props;
        for (_(u, c.opts.specialEasing); r < a; r++)
            if (i = I.prefilters[r].call(c, e, u, c.opts)) return re.isFunction(i.stop) && (re._queueHooks(c.elem, c.opts.queue).stop = re.proxy(i.stop, i)), i;
        return re.map(u, N, c), re.isFunction(c.opts.start) && c.opts.start.call(e, c), re.fx.timer(re.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function F(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function R(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0,
                r = t.toLowerCase().match(ke) || [];
            if (re.isFunction(n))
                for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function z(e, t, n, i) {
        function o(s) {
            var l;
            return r[s] = !0, re.each(e[s] || [], function(e, s) {
                var c = s(t, n, i);
                return "string" != typeof c || a || r[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
            }), l
        }
        var r = {},
            a = e === St;
        return o(t.dataTypes[0]) || !r["*"] && o("*")
    }

    function B(e, t) {
        var n, i, o = re.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
        return i && re.extend(!0, e, i), e
    }

    function W(e, t, n) {
        for (var i, o, r, a, s = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (o in s)
                if (s[o] && s[o].test(i)) {
                    l.unshift(o);
                    break
                }
        if (l[0] in n) r = l[0];
        else {
            for (o in n) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    r = o;
                    break
                }
                a || (a = o)
            }
            r = r || a
        }
        if (r) return r !== l[0] && l.unshift(r), n[r]
    }

    function U(e, t, n, i) {
        var o, r, a, s, l, c = {},
            u = e.dataTypes.slice();
        if (u[1])
            for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
        for (r = u.shift(); r;)
            if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift())
                if ("*" === r) r = l;
                else if ("*" !== l && l !== r) {
            if (a = c[l + " " + r] || c["* " + r], !a)
                for (o in c)
                    if (s = o.split(" "), s[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                        a === !0 ? a = c[o] : c[o] !== !0 && (r = s[0], u.unshift(s[1]));
                        break
                    }
            if (a !== !0)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (d) {
                    return {
                        state: "parsererror",
                        error: a ? d : "No conversion from " + l + " to " + r
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function V(e, t, n, i) {
        var o;
        if (re.isArray(t)) re.each(t, function(t, o) {
            n || Ot.test(e) ? i(e, o) : V(e + "[" + ("object" === ("undefined" == typeof o ? "undefined" : _typeof(o)) && null != o ? t : "") + "]", o, n, i)
        });
        else if (n || "object" !== re.type(t)) i(e, t);
        else
            for (o in t) V(e + "[" + o + "]", t[o], n, i)
    }

    function Y(e) {
        return re.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var X = [],
        G = e.document,
        K = X.slice,
        Q = X.concat,
        J = X.push,
        Z = X.indexOf,
        ee = {},
        te = ee.toString,
        ne = ee.hasOwnProperty,
        ie = {},
        oe = "2.2.3",
        re = function Rt(e, t) {
            return new Rt.fn.init(e, t)
        },
        ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        se = /^-ms-/,
        le = /-([\da-z])/gi,
        ce = function(e, t) {
            return t.toUpperCase()
        };
    re.fn = re.prototype = {
        jquery: oe,
        constructor: re,
        selector: "",
        length: 0,
        toArray: function() {
            return K.call(this)
        },
        get: function(e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : K.call(this)
        },
        pushStack: function(e) {
            var t = re.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e) {
            return re.each(this, e)
        },
        map: function(e) {
            return this.pushStack(re.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(K.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: J,
        sort: X.sort,
        splice: X.splice
    }, re.extend = re.fn.extend = function() {
        var e, t, n, i, o, r, a = arguments[0] || {},
            s = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" === ("undefined" == typeof a ? "undefined" : _typeof(a)) || re.isFunction(a) || (a = {}), s === l && (a = this, s--); s < l; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], i = e[t], a !== i && (c && i && (re.isPlainObject(i) || (o = re.isArray(i))) ? (o ? (o = !1, r = n && re.isArray(n) ? n : []) : r = n && re.isPlainObject(n) ? n : {}, a[t] = re.extend(c, r, i)) : void 0 !== i && (a[t] = i));
        return a
    }, re.extend({
        expando: "jQuery" + (oe + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === re.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !re.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isPlainObject: function(e) {
            var t;
            if ("object" !== re.type(e) || e.nodeType || re.isWindow(e)) return !1;
            if (e.constructor && !ne.call(e, "constructor") && !ne.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
            for (t in e);
            return void 0 === t || ne.call(e, t)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) || "function" == typeof e ? ee[te.call(e)] || "object" : "undefined" == typeof e ? "undefined" : _typeof(e)
        },
        globalEval: function(e) {
            var t, n = eval;
            e = re.trim(e), e && (1 === e.indexOf("use strict") ? (t = G.createElement("script"), t.text = e, G.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(se, "ms-").replace(le, ce)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var i, o = 0;
            if (n(e))
                for (i = e.length; o < i && t.call(e[o], o, e[o]) !== !1; o++);
            else
                for (o in e)
                    if (t.call(e[o], o, e[o]) === !1) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(ae, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? re.merge(i, "string" == typeof e ? [e] : e) : J.call(i, e)), i
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : Z.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, o = e.length; i < n; i++) e[o++] = t[i];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            for (var i, o = [], r = 0, a = e.length, s = !n; r < a; r++) i = !t(e[r], r), i !== s && o.push(e[r]);
            return o
        },
        map: function(e, t, i) {
            var o, r, a = 0,
                s = [];
            if (n(e))
                for (o = e.length; a < o; a++) r = t(e[a], a, i), null != r && s.push(r);
            else
                for (a in e) r = t(e[a], a, i), null != r && s.push(r);
            return Q.apply([], s)
        },
        guid: 1,
        proxy: function zt(e, t) {
            var n, i, zt;
            if ("string" == typeof t && (n = e[t], t = e, e = n), re.isFunction(e)) return i = K.call(arguments, 2), zt = function() {
                return e.apply(t || this, i.concat(K.call(arguments)))
            }, zt.guid = e.guid = e.guid || re.guid++, zt
        },
        now: Date.now,
        support: ie
    }), "function" == typeof Symbol && (re.fn[Symbol.iterator] = X[Symbol.iterator]), re.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        ee["[object " + t + "]"] = t.toLowerCase()
    });
    var ue = function(e) {
        function t(e, t, n, i) {
            var o, r, a, s, l, c, d, f, h = t && t.ownerDocument,
                g = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g) return n;
            if (!i && ((t ? t.ownerDocument || t : F) !== H && M(t), t = t || H, j)) {
                if (11 !== g && (c = me.exec(e)))
                    if (o = c[1]) {
                        if (9 === g) {
                            if (!(a = t.getElementById(o))) return n;
                            if (a.id === o) return n.push(a), n
                        } else if (h && (a = h.getElementById(o)) && _(t, a) && a.id === o) return n.push(a), n
                    } else {
                        if (c[2]) return J.apply(n, t.getElementsByTagName(e)), n;
                        if ((o = c[3]) && k.getElementsByClassName && t.getElementsByClassName) return J.apply(n, t.getElementsByClassName(o)), n
                    }
                if (k.qsa && !U[e + " "] && (!L || !L.test(e))) {
                    if (1 !== g) h = t, f = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(be, "\\$&") : t.setAttribute("id", s = I), d = C(e), r = d.length, l = pe.test(s) ? "#" + s : "[id='" + s + "']"; r--;) d[r] = l + " " + p(d[r]);
                        f = d.join(","), h = ye.test(e) && u(t.parentNode) || t
                    }
                    if (f) try {
                        return J.apply(n, h.querySelectorAll(f)), n
                    } catch (v) {} finally {
                        s === I && t.removeAttribute("id")
                    }
                }
            }
            return D(e.replace(se, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = i
            }
            var t = [];
            return e
        }

        function i(e) {
            return e[I] = !0, e
        }

        function o(e) {
            var t = H.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function r(e, t) {
            for (var n = e.split("|"), i = n.length; i--;) x.attrHandle[n[i]] = t
        }

        function a(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function c(e) {
            return i(function(t) {
                return t = +t, i(function(n, i) {
                    for (var o, r = e([], n.length, t), a = r.length; a--;) n[o = r[a]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }

        function u(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function d() {}

        function p(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i
        }

        function f(e, t, n) {
            var i = t.dir,
                o = n && "parentNode" === i,
                r = z++;
            return t.first ? function(t, n, r) {
                for (; t = t[i];)
                    if (1 === t.nodeType || o) return e(t, n, r)
            } : function(t, n, a) {
                var s, l, c, u = [R, r];
                if (a) {
                    for (; t = t[i];)
                        if ((1 === t.nodeType || o) && e(t, n, a)) return !0
                } else
                    for (; t = t[i];)
                        if (1 === t.nodeType || o) {
                            if (c = t[I] || (t[I] = {}), l = c[t.uniqueID] || (c[t.uniqueID] = {}), (s = l[i]) && s[0] === R && s[1] === r) return u[2] = s[2];
                            if (l[i] = u, u[2] = e(t, n, a)) return !0
                        }
            }
        }

        function h(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function g(e, n, i) {
            for (var o = 0, r = n.length; o < r; o++) t(e, n[o], i);
            return i
        }

        function v(e, t, n, i, o) {
            for (var r, a = [], s = 0, l = e.length, c = null != t; s < l; s++)(r = e[s]) && (n && !n(r, i, o) || (a.push(r), c && t.push(s)));
            return a
        }

        function m(e, t, n, o, r, a) {
            return o && !o[I] && (o = m(o)), r && !r[I] && (r = m(r, a)), i(function(i, a, s, l) {
                var c, u, d, p = [],
                    f = [],
                    h = a.length,
                    m = i || g(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !i && t ? m : v(m, p, e, s, l),
                    b = n ? r || (i ? e : h || o) ? [] : a : y;
                if (n && n(y, b, s, l), o)
                    for (c = v(b, f), o(c, [], s, l), u = c.length; u--;)(d = c[u]) && (b[f[u]] = !(y[f[u]] = d));
                if (i) {
                    if (r || e) {
                        if (r) {
                            for (c = [], u = b.length; u--;)(d = b[u]) && c.push(y[u] = d);
                            r(null, b = [], c, l)
                        }
                        for (u = b.length; u--;)(d = b[u]) && (c = r ? ee(i, d) : p[u]) > -1 && (i[c] = !(a[c] = d))
                    }
                } else b = v(b === a ? b.splice(h, b.length) : b), r ? r(null, a, b, l) : J.apply(a, b)
            })
        }

        function y(e) {
            for (var t, n, i, o = e.length, r = x.relative[e[0].type], a = r || x.relative[" "], s = r ? 1 : 0, l = f(function(e) {
                    return e === t
                }, a, !0), c = f(function(e) {
                    return ee(t, e) > -1
                }, a, !0), u = [function(e, n, i) {
                    var o = !r && (i || n !== E) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                    return t = null, o
                }]; s < o; s++)
                if (n = x.relative[e[s].type]) u = [f(h(u), n)];
                else {
                    if (n = x.filter[e[s].type].apply(null, e[s].matches), n[I]) {
                        for (i = ++s; i < o && !x.relative[e[i].type]; i++);
                        return m(s > 1 && h(u), s > 1 && p(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, s < i && y(e.slice(s, i)), i < o && y(e = e.slice(i)), i < o && p(e))
                    }
                    u.push(n)
                }
            return h(u)
        }

        function b(e, n) {
            var o = n.length > 0,
                r = e.length > 0,
                a = function(i, a, s, l, c) {
                    var u, d, p, f = 0,
                        h = "0",
                        g = i && [],
                        m = [],
                        y = E,
                        b = i || r && x.find.TAG("*", c),
                        w = R += null == y ? 1 : Math.random() || .1,
                        k = b.length;
                    for (c && (E = a === H || a || c); h !== k && null != (u = b[h]); h++) {
                        if (r && u) {
                            for (d = 0, a || u.ownerDocument === H || (M(u), s = !j); p = e[d++];)
                                if (p(u, a || H, s)) {
                                    l.push(u);
                                    break
                                }
                            c && (R = w)
                        }
                        o && ((u = !p && u) && f--, i && g.push(u))
                    }
                    if (f += h, o && h !== f) {
                        for (d = 0; p = n[d++];) p(g, m, a, s);
                        if (i) {
                            if (f > 0)
                                for (; h--;) g[h] || m[h] || (m[h] = K.call(l));
                            m = v(m)
                        }
                        J.apply(l, m), c && !i && m.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                    }
                    return c && (R = w, E = y), g
                };
            return o ? i(a) : a
        }
        var w, k, x, $, T, C, S, D, E, A, O, M, H, P, j, L, N, q, _, I = "sizzle" + 1 * new Date,
            F = e.document,
            R = 0,
            z = 0,
            B = n(),
            W = n(),
            U = n(),
            V = function(e, t) {
                return e === t && (O = !0), 0
            },
            Y = 1 << 31,
            X = {}.hasOwnProperty,
            G = [],
            K = G.pop,
            Q = G.push,
            J = G.push,
            Z = G.slice,
            ee = function(e, t) {
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
            re = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
            ae = new RegExp(ne + "+", "g"),
            se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            le = new RegExp("^" + ne + "*," + ne + "*"),
            ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            de = new RegExp(re),
            pe = new RegExp("^" + ie + "$"),
            fe = {
                ID: new RegExp("^#(" + ie + ")"),
                CLASS: new RegExp("^\\.(" + ie + ")"),
                TAG: new RegExp("^(" + ie + "|[*])"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + re),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            he = /^(?:input|select|textarea|button)$/i,
            ge = /^h\d$/i,
            ve = /^[^{]+\{\s*\[native \w/,
            me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ye = /[+~]/,
            be = /'|\\/g,
            we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            ke = function(e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
            },
            xe = function() {
                M()
            };
        try {
            J.apply(G = Z.call(F.childNodes), F.childNodes), G[F.childNodes.length].nodeType
        } catch ($e) {
            J = {
                apply: G.length ? function(e, t) {
                    Q.apply(e, Z.call(t))
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        k = t.support = {}, T = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, M = t.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : F;
            return i !== H && 9 === i.nodeType && i.documentElement ? (H = i, P = H.documentElement, j = !T(H), (n = H.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), k.attributes = o(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), k.getElementsByTagName = o(function(e) {
                return e.appendChild(H.createComment("")), !e.getElementsByTagName("*").length
            }), k.getElementsByClassName = ve.test(H.getElementsByClassName), k.getById = o(function(e) {
                return P.appendChild(e).id = I, !H.getElementsByName || !H.getElementsByName(I).length
            }), k.getById ? (x.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && j) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }, x.filter.ID = function(e) {
                var t = e.replace(we, ke);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete x.find.ID, x.filter.ID = function(e) {
                var t = e.replace(we, ke);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), x.find.TAG = k.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : k.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, i = [],
                    o = 0,
                    r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return r
            }, x.find.CLASS = k.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && j) return t.getElementsByClassName(e)
            }, N = [], L = [], (k.qsa = ve.test(H.querySelectorAll)) && (o(function(e) {
                P.appendChild(e).innerHTML = "<a id='" + I + "'></a><select id='" + I + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || L.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + I + "-]").length || L.push("~="), e.querySelectorAll(":checked").length || L.push(":checked"), e.querySelectorAll("a#" + I + "+*").length || L.push(".#.+[+~]")
            }), o(function(e) {
                var t = H.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && L.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
            })), (k.matchesSelector = ve.test(q = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && o(function(e) {
                k.disconnectedMatch = q.call(e, "div"), q.call(e, "[s!='']:x"), N.push("!=", re)
            }), L = L.length && new RegExp(L.join("|")), N = N.length && new RegExp(N.join("|")), t = ve.test(P.compareDocumentPosition), _ = t || ve.test(P.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, V = t ? function(e, t) {
                if (e === t) return O = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !k.sortDetached && t.compareDocumentPosition(e) === n ? e === H || e.ownerDocument === F && _(F, e) ? -1 : t === H || t.ownerDocument === F && _(F, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return O = !0, 0;
                var n, i = 0,
                    o = e.parentNode,
                    r = t.parentNode,
                    s = [e],
                    l = [t];
                if (!o || !r) return e === H ? -1 : t === H ? 1 : o ? -1 : r ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                if (o === r) return a(e, t);
                for (n = e; n = n.parentNode;) s.unshift(n);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (; s[i] === l[i];) i++;
                return i ? a(s[i], l[i]) : s[i] === F ? -1 : l[i] === F ? 1 : 0
            }, H) : H
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== H && M(e), n = n.replace(ue, "='$1']"), k.matchesSelector && j && !U[n + " "] && (!N || !N.test(n)) && (!L || !L.test(n))) try {
                var i = q.call(e, n);
                if (i || k.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
            } catch (o) {}
            return t(n, H, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== H && M(e), _(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== H && M(e);
            var n = x.attrHandle[t.toLowerCase()],
                i = n && X.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !j) : void 0;
            return void 0 !== i ? i : k.attributes || !j ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                i = 0,
                o = 0;
            if (O = !k.detectDuplicates, A = !k.sortStable && e.slice(0), e.sort(V), O) {
                for (; t = e[o++];) t === e[o] && (i = n.push(o));
                for (; i--;) e.splice(n[i], 1)
            }
            return A = null, e
        }, $ = t.getText = function(e) {
            var t, n = "",
                i = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += $(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[i++];) n += $(t);
            return n
        }, x = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(we, ke), e[3] = (e[3] || e[4] || e[5] || "").replace(we, ke), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, ke).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = B[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && B(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(o) {
                        var r = t.attr(o, e);
                        return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(ae, " ") + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(e, t, n, i, o) {
                    var r = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === i && 0 === o ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, l) {
                        var c, u, d, p, f, h, g = r !== a ? "nextSibling" : "previousSibling",
                            v = t.parentNode,
                            m = s && t.nodeName.toLowerCase(),
                            y = !l && !s,
                            b = !1;
                        if (v) {
                            if (r) {
                                for (; g;) {
                                    for (p = t; p = p[g];)
                                        if (s ? p.nodeName.toLowerCase() === m : 1 === p.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? v.firstChild : v.lastChild], a && y) {
                                for (p = v, d = p[I] || (p[I] = {}), u = d[p.uniqueID] || (d[p.uniqueID] = {}), c = u[e] || [], f = c[0] === R && c[1], b = f && c[2], p = f && v.childNodes[f]; p = ++f && p && p[g] || (b = f = 0) || h.pop();)
                                    if (1 === p.nodeType && ++b && p === t) {
                                        u[e] = [R, f, b];
                                        break
                                    }
                            } else if (y && (p = t, d = p[I] || (p[I] = {}), u = d[p.uniqueID] || (d[p.uniqueID] = {}), c = u[e] || [], f = c[0] === R && c[1], b = f), b === !1)
                                for (;
                                    (p = ++f && p && p[g] || (b = f = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== m : 1 !== p.nodeType) || !++b || (y && (d = p[I] || (p[I] = {}), u = d[p.uniqueID] || (d[p.uniqueID] = {}), u[e] = [R, b]), p !== t)););
                            return b -= o, b === i || b % i === 0 && b / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var o, r = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return r[I] ? r(n) : r.length > 1 ? (o = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, o = r(e, n), a = o.length; a--;) i = ee(e, o[a]), e[i] = !(t[i] = o[a])
                    }) : function(e) {
                        return r(e, 0, o)
                    }) : r
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                        n = [],
                        o = S(e.replace(se, "$1"));
                    return o[I] ? i(function(e, t, n, i) {
                        for (var r, a = o(e, null, i, []), s = e.length; s--;)(r = a[s]) && (e[s] = !(t[s] = r))
                    }) : function(e, i, r) {
                        return t[0] = e, o(t, null, r, n), t[0] = null, !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return e = e.replace(we, ke),
                        function(t) {
                            return (t.textContent || t.innerText || $(t)).indexOf(e) > -1
                        }
                }),
                lang: i(function(e) {
                    return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, ke).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = j ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === P
                },
                focus: function(e) {
                    return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !x.pseudos.empty(e)
                },
                header: function(e) {
                    return ge.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                    return e
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[w] = s(w);
        for (w in {
                submit: !0,
                reset: !0
            }) x.pseudos[w] = l(w);
        return d.prototype = x.filters = x.pseudos, x.setFilters = new d, C = t.tokenize = function(e, n) {
            var i, o, r, a, s, l, c, u = W[e + " "];
            if (u) return n ? 0 : u.slice(0);
            for (s = e, l = [], c = x.preFilter; s;) {
                i && !(o = le.exec(s)) || (o && (s = s.slice(o[0].length) || s), l.push(r = [])), i = !1, (o = ce.exec(s)) && (i = o.shift(), r.push({
                    value: i,
                    type: o[0].replace(se, " ")
                }), s = s.slice(i.length));
                for (a in x.filter) !(o = fe[a].exec(s)) || c[a] && !(o = c[a](o)) || (i = o.shift(), r.push({
                    value: i,
                    type: a,
                    matches: o
                }), s = s.slice(i.length));
                if (!i) break
            }
            return n ? s.length : s ? t.error(e) : W(e, l).slice(0)
        }, S = t.compile = function(e, t) {
            var n, i = [],
                o = [],
                r = U[e + " "];
            if (!r) {
                for (t || (t = C(e)), n = t.length; n--;) r = y(t[n]), r[I] ? i.push(r) : o.push(r);
                r = U(e, b(o, i)), r.selector = e
            }
            return r
        }, D = t.select = function(e, t, n, i) {
            var o, r, a, s, l, c = "function" == typeof e && e,
                d = !i && C(e = c.selector || e);
            if (n = n || [], 1 === d.length) {
                if (r = d[0] = d[0].slice(0), r.length > 2 && "ID" === (a = r[0]).type && k.getById && 9 === t.nodeType && j && x.relative[r[1].type]) {
                    if (t = (x.find.ID(a.matches[0].replace(we, ke), t) || [])[0], !t) return n;
                    c && (t = t.parentNode), e = e.slice(r.shift().value.length)
                }
                for (o = fe.needsContext.test(e) ? 0 : r.length; o-- && (a = r[o], !x.relative[s = a.type]);)
                    if ((l = x.find[s]) && (i = l(a.matches[0].replace(we, ke), ye.test(r[0].type) && u(t.parentNode) || t))) {
                        if (r.splice(o, 1), e = i.length && p(r), !e) return J.apply(n, i), n;
                        break
                    }
            }
            return (c || S(e, d))(i, t, !j, n, !t || ye.test(e) && u(t.parentNode) || t), n
        }, k.sortStable = I.split("").sort(V).join("") === I, k.detectDuplicates = !!O, M(), k.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(H.createElement("div"))
        }), o(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), k.attributes && o(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || r("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), o(function(e) {
            return null == e.getAttribute("disabled")
        }) || r(te, function(e, t, n) {
            var i;
            if (!n) return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    re.find = ue, re.expr = ue.selectors, re.expr[":"] = re.expr.pseudos, re.uniqueSort = re.unique = ue.uniqueSort, re.text = ue.getText, re.isXMLDoc = ue.isXML, re.contains = ue.contains;
    var de = function(e, t, n) {
            for (var i = [], o = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (o && re(e).is(n)) break;
                    i.push(e)
                }
            return i
        },
        pe = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        fe = re.expr.match.needsContext,
        he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        ge = /^.[^:#\[\.,]*$/;
    re.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? re.find.matchesSelector(i, e) ? [i] : [] : re.find.matches(e, re.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, re.fn.extend({
        find: function(e) {
            var t, n = this.length,
                i = [],
                o = this;
            if ("string" != typeof e) return this.pushStack(re(e).filter(function() {
                for (t = 0; t < n; t++)
                    if (re.contains(o[t], this)) return !0
            }));
            for (t = 0; t < n; t++) re.find(e, o[t], i);
            return i = this.pushStack(n > 1 ? re.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && fe.test(e) ? re(e) : e || [], !1).length
        }
    });
    var ve, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ye = re.fn.init = function(e, t, n) {
            var i, o;
            if (!e) return this;
            if (n = n || ve, "string" == typeof e) {
                if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : me.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (i[1]) {
                    if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : G, !0)), he.test(i[1]) && re.isPlainObject(t))
                        for (i in t) re.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                    return this
                }
                return o = G.getElementById(i[2]), o && o.parentNode && (this.length = 1, this[0] = o), this.context = G, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : re.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(re) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), re.makeArray(e, this))
        };
    ye.prototype = re.fn, ve = re(G);
    var be = /^(?:parents|prev(?:Until|All))/,
        we = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    re.fn.extend({
        has: function(e) {
            var t = re(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (re.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, i = 0, o = this.length, r = [], a = fe.test(e) || "string" != typeof e ? re(e, t || this.context) : 0; i < o; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && re.find.matchesSelector(n, e))) {
                        r.push(n);
                        break
                    }
            return this.pushStack(r.length > 1 ? re.uniqueSort(r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? Z.call(re(e), this[0]) : Z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(re.uniqueSort(re.merge(this.get(), re(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), re.each({
        parent: function Bt(e) {
            var Bt = e.parentNode;
            return Bt && 11 !== Bt.nodeType ? Bt : null
        },
        parents: function(e) {
            return de(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return de(e, "parentNode", n)
        },
        next: function(e) {
            return o(e, "nextSibling")
        },
        prev: function(e) {
            return o(e, "previousSibling")
        },
        nextAll: function(e) {
            return de(e, "nextSibling")
        },
        prevAll: function(e) {
            return de(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return de(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return de(e, "previousSibling", n)
        },
        siblings: function(e) {
            return pe((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return pe(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || re.merge([], e.childNodes)
        }
    }, function(e, t) {
        re.fn[e] = function(n, i) {
            var o = re.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = re.filter(i, o)), this.length > 1 && (we[e] || re.uniqueSort(o), be.test(e) && o.reverse()), this.pushStack(o)
        }
    });
    var ke = /\S+/g;
    re.Callbacks = function(e) {
        e = "string" == typeof e ? r(e) : re.extend({}, e);
        var t, n, i, o, a = [],
            s = [],
            l = -1,
            c = function() {
                for (o = e.once, i = t = !0; s.length; l = -1)
                    for (n = s.shift(); ++l < a.length;) a[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = a.length, n = !1);
                e.memory || (n = !1), t = !1, o && (a = n ? [] : "")
            },
            u = {
                add: function() {
                    return a && (n && !t && (l = a.length - 1, s.push(n)), function i(t) {
                        re.each(t, function(t, n) {
                            re.isFunction(n) ? e.unique && u.has(n) || a.push(n) : n && n.length && "string" !== re.type(n) && i(n)
                        })
                    }(arguments), n && !t && c()), this
                },
                remove: function() {
                    return re.each(arguments, function(e, t) {
                        for (var n;
                            (n = re.inArray(t, a, n)) > -1;) a.splice(n, 1), n <= l && l--
                    }), this
                },
                has: function(e) {
                    return e ? re.inArray(e, a) > -1 : a.length > 0
                },
                empty: function() {
                    return a && (a = []), this
                },
                disable: function() {
                    return o = s = [], a = n = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return o = s = [], n || (a = n = ""), this
                },
                locked: function() {
                    return !!o
                },
                fireWith: function(e, n) {
                    return o || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || c()), this
                },
                fire: function() {
                    return u.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return u
    }, re.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", re.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", re.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", re.Callbacks("memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return re.Deferred(function(n) {
                            re.each(t, function(t, r) {
                                var a = re.isFunction(e[t]) && e[t];
                                o[r[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && re.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? re.extend(e, i) : i
                    }
                },
                o = {};
            return i.pipe = i.then, re.each(t, function(e, r) {
                var a = r[2],
                    s = r[3];
                i[r[1]] = a.add, s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
                    return o[r[0] + "With"](this === o ? i : this, arguments), this
                }, o[r[0] + "With"] = a.fireWith
            }), i.promise(o), e && e.call(o, o), o
        },
        when: function(e) {
            var t, n, i, o = 0,
                r = K.call(arguments),
                a = r.length,
                s = 1 !== a || e && re.isFunction(e.promise) ? a : 0,
                l = 1 === s ? e : re.Deferred(),
                c = function(e, n, i) {
                    return function(o) {
                        n[e] = this, i[e] = arguments.length > 1 ? K.call(arguments) : o, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                    }
                };
            if (a > 1)
                for (t = new Array(a), n = new Array(a), i = new Array(a); o < a; o++) r[o] && re.isFunction(r[o].promise) ? r[o].promise().progress(c(o, n, t)).done(c(o, i, r)).fail(l.reject) : --s;
            return s || l.resolveWith(i, r), l.promise()
        }
    });
    var xe;
    re.fn.ready = function(e) {
        return re.ready.promise().done(e), this
    }, re.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? re.readyWait++ : re.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --re.readyWait : re.isReady) || (re.isReady = !0, e !== !0 && --re.readyWait > 0 || (xe.resolveWith(G, [re]), re.fn.triggerHandler && (re(G).triggerHandler("ready"), re(G).off("ready"))))
        }
    }), re.ready.promise = function(t) {
        return xe || (xe = re.Deferred(), "complete" === G.readyState || "loading" !== G.readyState && !G.documentElement.doScroll ? e.setTimeout(re.ready) : (G.addEventListener("DOMContentLoaded", a), e.addEventListener("load", a))), xe.promise(t)
    }, re.ready.promise();
    var $e = function Wt(e, t, n, i, o, r, a) {
            var s = 0,
                l = e.length,
                c = null == n;
            if ("object" === re.type(n)) {
                o = !0;
                for (s in n) Wt(e, t, s, n[s], !0, r, a)
            } else if (void 0 !== i && (o = !0, re.isFunction(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(re(e), n)
                })), t))
                for (; s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
            return o ? e : c ? t.call(e) : l ? t(e[0], n) : r
        },
        Te = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    s.uid = 1, s.prototype = {
        register: function(e, t) {
            var n = t || {};
            return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                value: n,
                writable: !0,
                configurable: !0
            }), e[this.expando]
        },
        cache: function(e) {
            if (!Te(e)) return {};
            var t = e[this.expando];
            return t || (t = {}, Te(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var i, o = this.cache(e);
            if ("string" == typeof t) o[t] = n;
            else
                for (i in t) o[i] = t[i];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        },
        access: function(e, t, n) {
            var i;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, re.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, i, o, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 === t) this.register(e);
                else {
                    re.isArray(t) ? i = t.concat(t.map(re.camelCase)) : (o = re.camelCase(t), t in r ? i = [t, o] : (i = o, i = i in r ? [i] : i.match(ke) || [])), n = i.length;
                    for (; n--;) delete r[i[n]]
                }(void 0 === t || re.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !re.isEmptyObject(t)
        }
    };
    var Ce = new s,
        Se = new s,
        De = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Ee = /[A-Z]/g;
    re.extend({
        hasData: function(e) {
            return Se.hasData(e) || Ce.hasData(e)
        },
        data: function(e, t, n) {
            return Se.access(e, t, n)
        },
        removeData: function(e, t) {
            Se.remove(e, t)
        },
        _data: function(e, t, n) {
            return Ce.access(e, t, n)
        },
        _removeData: function(e, t) {
            Ce.remove(e, t)
        }
    }), re.fn.extend({
        data: function Ut(e, t) {
            var n, i, Ut, o = this[0],
                r = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (Ut = Se.get(o), 1 === o.nodeType && !Ce.get(o, "hasDataAttrs"))) {
                    for (n = r.length; n--;) r[n] && (i = r[n].name, 0 === i.indexOf("data-") && (i = re.camelCase(i.slice(5)), l(o, i, Ut[i])));
                    Ce.set(o, "hasDataAttrs", !0)
                }
                return Ut
            }
            return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) ? this.each(function() {
                Se.set(this, e)
            }) : $e(this, function(t) {
                var n, i;
                if (o && void 0 === t) {
                    if (n = Se.get(o, e) || Se.get(o, e.replace(Ee, "-$&").toLowerCase()), void 0 !== n) return n;
                    if (i = re.camelCase(e), n = Se.get(o, i), void 0 !== n) return n;
                    if (n = l(o, i, void 0), void 0 !== n) return n
                } else i = re.camelCase(e), this.each(function() {
                    var n = Se.get(this, i);
                    Se.set(this, i, t), e.indexOf("-") > -1 && void 0 !== n && Se.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Se.remove(this, e)
            })
        }
    }), re.extend({
        queue: function Vt(e, t, n) {
            var Vt;
            if (e) return t = (t || "fx") + "queue", Vt = Ce.get(e, t), n && (!Vt || re.isArray(n) ? Vt = Ce.access(e, t, re.makeArray(n)) : Vt.push(n)), Vt || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = re.queue(e, t),
                i = n.length,
                o = n.shift(),
                r = re._queueHooks(e, t),
                a = function() {
                    re.dequeue(e, t)
                };
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, a, r)), !i && r && r.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Ce.get(e, n) || Ce.access(e, n, {
                empty: re.Callbacks("once memory").add(function() {
                    Ce.remove(e, [t + "queue", n])
                })
            })
        }
    }), re.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? re.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = re.queue(this, e, t);
                re._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                re.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1,
                o = re.Deferred(),
                r = this,
                a = this.length,
                s = function() {
                    --i || o.resolveWith(r, [r])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = Ce.get(r[a], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
            return s(), o.promise(t)
        }
    });
    var Ae = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Oe = new RegExp("^(?:([+-])=|)(" + Ae + ")([a-z%]*)$", "i"),
        Me = ["Top", "Right", "Bottom", "Left"],
        He = function(e, t) {
            return e = t || e, "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e)
        },
        Pe = /^(?:checkbox|radio)$/i,
        je = /<([\w:-]+)/,
        Le = /^$|\/(?:java|ecma)script/i,
        Ne = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ne.optgroup = Ne.option, Ne.tbody = Ne.tfoot = Ne.colgroup = Ne.caption = Ne.thead, Ne.th = Ne.td;
    var qe = /<|&#?\w+;/;
    ! function() {
        var e = G.createDocumentFragment(),
            t = e.appendChild(G.createElement("div")),
            n = G.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var _e = /^key/,
        Ie = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Fe = /^([^.]*)(?:\.(.+)|)/;
    re.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var r, a, s, l, c, u, d, p, f, h, g, v = Ce.get(e);
            if (v)
                for (n.handler && (r = n, n = r.handler, o = r.selector), n.guid || (n.guid = re.guid++), (l = v.events) || (l = v.events = {}), (a = v.handle) || (a = v.handle = function(t) {
                        return "undefined" != typeof re && re.event.triggered !== t.type ? re.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(ke) || [""], c = t.length; c--;) s = Fe.exec(t[c]) || [], f = g = s[1], h = (s[2] || "").split(".").sort(), f && (d = re.event.special[f] || {}, f = (o ? d.delegateType : d.bindType) || f, d = re.event.special[f] || {}, u = re.extend({
                    type: f,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && re.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, r), (p = l[f]) || (p = l[f] = [], p.delegateCount = 0, d.setup && d.setup.call(e, i, h, a) !== !1 || e.addEventListener && e.addEventListener(f, a)), d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, u) : p.push(u), re.event.global[f] = !0)
        },
        remove: function(e, t, n, i, o) {
            var r, a, s, l, c, u, d, p, f, h, g, v = Ce.hasData(e) && Ce.get(e);
            if (v && (l = v.events)) {
                for (t = (t || "").match(ke) || [""], c = t.length; c--;)
                    if (s = Fe.exec(t[c]) || [], f = g = s[1], h = (s[2] || "").split(".").sort(), f) {
                        for (d = re.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, p = l[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = r = p.length; r--;) u = p[r], !o && g !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (p.splice(r, 1), u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
                        a && !p.length && (d.teardown && d.teardown.call(e, h, v.handle) !== !1 || re.removeEvent(e, f, v.handle), delete l[f])
                    } else
                        for (f in l) re.event.remove(e, f + t[c], n, i, !0);
                re.isEmptyObject(l) && Ce.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            e = re.event.fix(e);
            var t, n, i, o, r, a = [],
                s = K.call(arguments),
                l = (Ce.get(this, "events") || {})[e.type] || [],
                c = re.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (a = re.event.handlers.call(this, e, l), t = 0;
                    (o = a[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = o.elem, n = 0;
                        (r = o.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(r.namespace) || (e.handleObj = r, e.data = r.data, i = ((re.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, s), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, a = [],
                s = t.delegateCount,
                l = e.target;
            if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                        for (i = [], n = 0; n < s; n++) r = t[n], o = r.selector + " ", void 0 === i[o] && (i[o] = r.needsContext ? re(o, this).index(l) > -1 : re.find(o, this, null, [l]).length), i[o] && i.push(r);
                        i.length && a.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }), a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, o, r = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || G, i = n.documentElement, o = n.body, e.pageX = t.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[re.expando]) return e;
            var t, n, i, o = e.type,
                r = e,
                a = this.fixHooks[o];
            for (a || (this.fixHooks[o] = a = Ie.test(o) ? this.mouseHooks : _e.test(o) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new re.Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
            return e.target || (e.target = G), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, r) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== g() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === g() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && re.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return re.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, re.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, re.Event = function(e, t) {
        return this instanceof re.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? f : h) : this.type = e, t && re.extend(this, t), this.timeStamp = e && e.timeStamp || re.now(), void(this[re.expando] = !0)) : new re.Event(e, t)
    }, re.Event.prototype = {
        constructor: re.Event,
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = f, e && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = f, e && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = f, e && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, re.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        re.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this,
                    o = e.relatedTarget,
                    r = e.handleObj;
                return o && (o === i || re.contains(i, o)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), re.fn.extend({
        on: function(e, t, n, i) {
            return v(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return v(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, re(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" === ("undefined" == typeof e ? "undefined" : _typeof(e))) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = h), this.each(function() {
                re.event.remove(this, e, n, t)
            })
        }
    });
    var Re = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        ze = /<script|<style|<link/i,
        Be = /checked\s*(?:[^=]|=\s*.checked.)/i,
        We = /^true\/(.*)/,
        Ue = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    re.extend({
        htmlPrefilter: function(e) {
            return e.replace(Re, "<$1></$2>")
        },
        clone: function Yt(e, t, n) {
            var i, o, r, a, Yt = e.cloneNode(!0),
                s = re.contains(e.ownerDocument, e);
            if (!(ie.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e)))
                for (a = u(Yt), r = u(e), i = 0, o = r.length; i < o; i++) k(r[i], a[i]);
            if (t)
                if (n)
                    for (r = r || u(e), a = a || u(Yt), i = 0, o = r.length; i < o; i++) w(r[i], a[i]);
                else w(e, Yt);
            return a = u(Yt, "script"), a.length > 0 && d(a, !s && u(e, "script")), Yt
        },
        cleanData: function(e) {
            for (var t, n, i, o = re.event.special, r = 0; void 0 !== (n = e[r]); r++)
                if (Te(n)) {
                    if (t = n[Ce.expando]) {
                        if (t.events)
                            for (i in t.events) o[i] ? re.event.remove(n, i) : re.removeEvent(n, i, t.handle);
                        n[Ce.expando] = void 0
                    }
                    n[Se.expando] && (n[Se.expando] = void 0)
                }
        }
    }), re.fn.extend({
        domManip: x,
        detach: function(e) {
            return $(this, e, !0)
        },
        remove: function(e) {
            return $(this, e)
        },
        text: function(e) {
            return $e(this, function(e) {
                return void 0 === e ? re.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return x(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = m(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return x(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = m(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return x(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return x(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (re.cleanData(u(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return re.clone(this, e, t)
            })
        },
        html: function(e) {
            return $e(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !ze.test(e) && !Ne[(je.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = re.htmlPrefilter(e);
                    try {
                        for (; n < i; n++) t = this[n] || {}, 1 === t.nodeType && (re.cleanData(u(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (o) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return x(this, arguments, function(t) {
                var n = this.parentNode;
                re.inArray(this, e) < 0 && (re.cleanData(u(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), re.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        re.fn[e] = function(e) {
            for (var n, i = [], o = re(e), r = o.length - 1, a = 0; a <= r; a++) n = a === r ? this : this.clone(!0), re(o[a])[t](n), J.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Ve, Ye = {
            HTML: "block",
            BODY: "block"
        },
        Xe = /^margin/,
        Ge = new RegExp("^(" + Ae + ")(?!px)[a-z%]+$", "i"),
        Ke = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        Qe = function(e, t, n, i) {
            var o, r, a = {};
            for (r in t) a[r] = e.style[r], e.style[r] = t[r];
            o = n.apply(e, i || []);
            for (r in t) e.style[r] = a[r];
            return o
        },
        Je = G.documentElement;
    ! function() {
        function t() {
            s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Je.appendChild(a);
            var t = e.getComputedStyle(s);
            n = "1%" !== t.top, r = "2px" === t.marginLeft, i = "4px" === t.width, s.style.marginRight = "50%", o = "4px" === t.marginRight, Je.removeChild(a)
        }
        var n, i, o, r, a = G.createElement("div"),
            s = G.createElement("div");
        s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), re.extend(ie, {
            pixelPosition: function() {
                return t(), n
            },
            boxSizingReliable: function() {
                return null == i && t(), i
            },
            pixelMarginRight: function() {
                return null == i && t(), o
            },
            reliableMarginLeft: function() {
                return null == i && t(), r
            },
            reliableMarginRight: function() {
                var t, n = s.appendChild(G.createElement("div"));
                return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", Je.appendChild(a), t = !parseFloat(e.getComputedStyle(n).marginRight), Je.removeChild(a), s.removeChild(n), t
            }
        }))
    }();
    var Ze = /^(none|table(?!-c[ea]).+)/,
        et = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        tt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        nt = ["Webkit", "O", "Moz", "ms"],
        it = G.createElement("div").style;
    re.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = S(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function Xt(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, a, s = re.camelCase(t),
                    Xt = e.style;
                return t = re.cssProps[s] || (re.cssProps[s] = E(s) || s), a = re.cssHooks[t] || re.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (o = a.get(e, !1, i)) ? o : Xt[t] : (r = "undefined" == typeof n ? "undefined" : _typeof(n), "string" === r && (o = Oe.exec(n)) && o[1] && (n = c(e, t, o), r = "number"), null != n && n === n && ("number" === r && (n += o && o[3] || (re.cssNumber[s] ? "" : "px")), ie.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (Xt[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (Xt[t] = n)), void 0)
            }
        },
        css: function(e, t, n, i) {
            var o, r, a, s = re.camelCase(t);
            return t = re.cssProps[s] || (re.cssProps[s] = E(s) || s), a = re.cssHooks[t] || re.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = S(e, t, i)), "normal" === o && t in tt && (o = tt[t]), "" === n || n ? (r = parseFloat(o), n === !0 || isFinite(r) ? r || 0 : o) : o
        }
    }), re.each(["height", "width"], function(e, t) {
        re.cssHooks[t] = {
            get: function(e, n, i) {
                if (n) return Ze.test(re.css(e, "display")) && 0 === e.offsetWidth ? Qe(e, et, function() {
                    return M(e, t, i)
                }) : M(e, t, i)
            },
            set: function(e, n, i) {
                var o, r = i && Ke(e),
                    a = i && O(e, t, i, "border-box" === re.css(e, "boxSizing", !1, r), r);
                return a && (o = Oe.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = re.css(e, t)), A(e, n, a)
            }
        }
    }), re.cssHooks.marginLeft = D(ie.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(S(e, "marginLeft")) || e.getBoundingClientRect().left - Qe(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), re.cssHooks.marginRight = D(ie.reliableMarginRight, function(e, t) {
        if (t) return Qe(e, {
            display: "inline-block"
        }, S, [e, "marginRight"])
    }), re.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        re.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[e + Me[i] + t] = r[i] || r[i - 2] || r[0];
                return o
            }
        }, Xe.test(e) || (re.cssHooks[e + t].set = A)
    }), re.fn.extend({
        css: function(e, t) {
            return $e(this, function(e, t, n) {
                var i, o, r = {},
                    a = 0;
                if (re.isArray(t)) {
                    for (i = Ke(e), o = t.length; a < o; a++) r[t[a]] = re.css(e, t[a], !1, i);
                    return r
                }
                return void 0 !== n ? re.style(e, t, n) : re.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return H(this, !0)
        },
        hide: function() {
            return H(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                He(this) ? re(this).show() : re(this).hide()
            })
        }
    }), re.Tween = P, P.prototype = {
        constructor: P,
        init: function(e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || re.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (re.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = P.propHooks[this.prop];
            return e && e.get ? e.get(this) : P.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = P.propHooks[this.prop];
            return this.options.duration ? this.pos = t = re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : P.propHooks._default.set(this), this
        }
    }, P.prototype.init.prototype = P.prototype, P.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = re.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                re.fx.step[e.prop] ? re.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[re.cssProps[e.prop]] && !re.cssHooks[e.prop] ? e.elem[e.prop] = e.now : re.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, P.propHooks.scrollTop = P.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, re.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, re.fx = P.prototype.init, re.fx.step = {};
    var ot, rt, at = /^(?:toggle|show|hide)$/,
        st = /queueHooks$/;
    re.Animation = re.extend(I, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return c(n.elem, e, Oe.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                re.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(ke);
                for (var n, i = 0, o = e.length; i < o; i++) n = e[i], I.tweeners[n] = I.tweeners[n] || [], I.tweeners[n].unshift(t)
            },
            prefilters: [q],
            prefilter: function(e, t) {
                t ? I.prefilters.unshift(e) : I.prefilters.push(e)
            }
        }), re.speed = function(e, t, n) {
            var i = e && "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) ? re.extend({}, e) : {
                complete: n || !n && t || re.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !re.isFunction(t) && t
            };
            return i.duration = re.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in re.fx.speeds ? re.fx.speeds[i.duration] : re.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                re.isFunction(i.old) && i.old.call(this), i.queue && re.dequeue(this, i.queue)
            }, i
        }, re.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(He).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var o = re.isEmptyObject(e),
                    r = re.speed(t, n, i),
                    a = function() {
                        var t = I(this, re.extend({}, e), r);
                        (o || Ce.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, o || r.queue === !1 ? this.each(a) : this.queue(r.queue, a)
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        o = null != e && e + "queueHooks",
                        r = re.timers,
                        a = Ce.get(this);
                    if (o) a[o] && a[o].stop && i(a[o]);
                    else
                        for (o in a) a[o] && a[o].stop && st.test(o) && i(a[o]);
                    for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
                    !t && n || re.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = Ce.get(this),
                        i = n[e + "queue"],
                        o = n[e + "queueHooks"],
                        r = re.timers,
                        a = i ? i.length : 0;
                    for (n.finish = !0, re.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                    for (t = 0; t < a; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), re.each(["toggle", "show", "hide"], function(e, t) {
            var n = re.fn[t];
            re.fn[t] = function(e, i, o) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(L(t, !0), e, i, o)
            }
        }), re.each({
            slideDown: L("show"),
            slideUp: L("hide"),
            slideToggle: L("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            re.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), re.timers = [], re.fx.tick = function() {
            var e, t = 0,
                n = re.timers;
            for (ot = re.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
            n.length || re.fx.stop(), ot = void 0
        }, re.fx.timer = function(e) {
            re.timers.push(e), e() ? re.fx.start() : re.timers.pop()
        }, re.fx.interval = 13, re.fx.start = function() {
            rt || (rt = e.setInterval(re.fx.tick, re.fx.interval))
        }, re.fx.stop = function() {
            e.clearInterval(rt), rt = null
        }, re.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, re.fn.delay = function(t, n) {
            return t = re.fx ? re.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, i) {
                var o = e.setTimeout(n, t);
                i.stop = function() {
                    e.clearTimeout(o)
                }
            })
        },
        function() {
            var e = G.createElement("input"),
                t = G.createElement("select"),
                n = t.appendChild(G.createElement("option"));
            e.type = "checkbox", ie.checkOn = "" !== e.value, ie.optSelected = n.selected, t.disabled = !0, ie.optDisabled = !n.disabled, e = G.createElement("input"), e.value = "t", e.type = "radio", ie.radioValue = "t" === e.value
        }();
    var lt, ct = re.expr.attrHandle;
    re.fn.extend({
        attr: function(e, t) {
            return $e(this, re.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                re.removeAttr(this, e)
            })
        }
    }), re.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return "undefined" == typeof e.getAttribute ? re.prop(e, t, n) : (1 === r && re.isXMLDoc(e) || (t = t.toLowerCase(), o = re.attrHooks[t] || (re.expr.match.bool.test(t) ? lt : void 0)), void 0 !== n ? null === n ? void re.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : (i = re.find.attr(e, t), null == i ? void 0 : i))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ie.radioValue && "radio" === t && re.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i, o = 0,
                r = t && t.match(ke);
            if (r && 1 === e.nodeType)
                for (; n = r[o++];) i = re.propFix[n] || n, re.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
        }
    }), lt = {
        set: function(e, t, n) {
            return t === !1 ? re.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, re.each(re.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = ct[t] || re.find.attr;
        ct[t] = function(e, t, i) {
            var o, r;
            return i || (r = ct[t], ct[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, ct[t] = r), o
        }
    });
    var ut = /^(?:input|select|textarea|button)$/i,
        dt = /^(?:a|area)$/i;
    re.fn.extend({
        prop: function(e, t) {
            return $e(this, re.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[re.propFix[e] || e]
            })
        }
    }), re.extend({
        prop: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && re.isXMLDoc(e) || (t = re.propFix[t] || t, o = re.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = re.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ut.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), ie.optSelected || (re.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        re.propFix[this.toLowerCase()] = this
    });
    var pt = /[\t\r\n\f]/g;
    re.fn.extend({
        addClass: function(e) {
            var t, n, i, o, r, a, s, l = 0;
            if (re.isFunction(e)) return this.each(function(t) {
                re(this).addClass(e.call(this, t, F(this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match(ke) || []; n = this[l++];)
                    if (o = F(n), i = 1 === n.nodeType && (" " + o + " ").replace(pt, " ")) {
                        for (a = 0; r = t[a++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        s = re.trim(i), o !== s && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, a, s, l = 0;
            if (re.isFunction(e)) return this.each(function(t) {
                re(this).removeClass(e.call(this, t, F(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(ke) || []; n = this[l++];)
                    if (o = F(n), i = 1 === n.nodeType && (" " + o + " ").replace(pt, " ")) {
                        for (a = 0; r = t[a++];)
                            for (; i.indexOf(" " + r + " ") > -1;) i = i.replace(" " + r + " ", " ");
                        s = re.trim(i), o !== s && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = "undefined" == typeof e ? "undefined" : _typeof(e);
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : re.isFunction(e) ? this.each(function(n) {
                re(this).toggleClass(e.call(this, n, F(this), t), t)
            }) : this.each(function() {
                var t, i, o, r;
                if ("string" === n)
                    for (i = 0, o = re(this), r = e.match(ke) || []; t = r[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else void 0 !== e && "boolean" !== n || (t = F(this), t && Ce.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Ce.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)
                if (1 === n.nodeType && (" " + F(n) + " ").replace(pt, " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var ft = /\r/g,
        ht = /[\x20\t\r\n\f]+/g;
    re.fn.extend({
        val: function(e) {
            var t, n, i, o = this[0]; {
                if (arguments.length) return i = re.isFunction(e), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (o = i ? e.call(this, n, re(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : re.isArray(o) && (o = re.map(o, function(e) {
                        return null == e ? "" : e + ""
                    })), t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                });
                if (o) return t = re.valHooks[o.type] || re.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(ft, "") : null == n ? "" : n)
            }
        }
    }), re.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = re.find.attr(e, "value");
                    return null != t ? t : re.trim(re.text(e)).replace(ht, " ")
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || o < 0, a = r ? null : [], s = r ? o + 1 : i.length, l = o < 0 ? s : r ? o : 0; l < s; l++)
                        if (n = i[l], (n.selected || l === o) && (ie.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !re.nodeName(n.parentNode, "optgroup"))) {
                            if (t = re(n).val(), r) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = re.makeArray(t), a = o.length; a--;) i = o[a], (i.selected = re.inArray(re.valHooks.option.get(i), r) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), r
                }
            }
        }
    }), re.each(["radio", "checkbox"], function() {
        re.valHooks[this] = {
            set: function(e, t) {
                if (re.isArray(t)) return e.checked = re.inArray(re(e).val(), t) > -1
            }
        }, ie.checkOn || (re.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var gt = /^(?:focusinfocus|focusoutblur)$/;
    re.extend(re.event, {
        trigger: function(t, n, i, o) {
            var r, a, s, l, c, u, d, p = [i || G],
                f = ne.call(t, "type") ? t.type : t,
                h = ne.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = s = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !gt.test(f + re.event.triggered) && (f.indexOf(".") > -1 && (h = f.split("."), f = h.shift(), h.sort()), c = f.indexOf(":") < 0 && "on" + f, t = t[re.expando] ? t : new re.Event(f, "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && t), t.isTrigger = o ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : re.makeArray(n, [t]), d = re.event.special[f] || {}, o || !d.trigger || d.trigger.apply(i, n) !== !1)) {
                if (!o && !d.noBubble && !re.isWindow(i)) {
                    for (l = d.delegateType || f, gt.test(l + f) || (a = a.parentNode); a; a = a.parentNode) p.push(a), s = a;
                    s === (i.ownerDocument || G) && p.push(s.defaultView || s.parentWindow || e)
                }
                for (r = 0;
                    (a = p[r++]) && !t.isPropagationStopped();) t.type = r > 1 ? l : d.bindType || f, u = (Ce.get(a, "events") || {})[t.type] && Ce.get(a, "handle"), u && u.apply(a, n), u = c && a[c], u && u.apply && Te(a) && (t.result = u.apply(a, n), t.result === !1 && t.preventDefault());
                return t.type = f, o || t.isDefaultPrevented() || d._default && d._default.apply(p.pop(), n) !== !1 || !Te(i) || c && re.isFunction(i[f]) && !re.isWindow(i) && (s = i[c], s && (i[c] = null), re.event.triggered = f, i[f](), re.event.triggered = void 0, s && (i[c] = s)), t.result
            }
        },
        simulate: function(e, t, n) {
            var i = re.extend(new re.Event, n, {
                type: e,
                isSimulated: !0
            });
            re.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
        }
    }), re.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                re.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return re.event.trigger(e, t, n, !0)
        }
    }), re.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        re.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), re.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), ie.focusin = "onfocusin" in e, ie.focusin || re.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            re.event.simulate(t, e.target, re.event.fix(e))
        };
        re.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    o = Ce.access(i, t);
                o || i.addEventListener(e, n, !0), Ce.access(i, t, (o || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    o = Ce.access(i, t) - 1;
                o ? Ce.access(i, t, o) : (i.removeEventListener(e, n, !0), Ce.remove(i, t))
            }
        }
    });
    var vt = e.location,
        mt = re.now(),
        yt = /\?/;
    re.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, re.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (i) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t), n
    };
    var bt = /#.*$/,
        wt = /([?&])_=[^&]*/,
        kt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        xt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        $t = /^(?:GET|HEAD)$/,
        Tt = /^\/\//,
        Ct = {},
        St = {},
        Dt = "*/".concat("*"),
        Et = G.createElement("a");
    Et.href = vt.href, re.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: vt.href,
            type: "GET",
            isLocal: xt.test(vt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Dt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": re.parseJSON,
                "text xml": re.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? B(B(e, re.ajaxSettings), t) : B(re.ajaxSettings, e)
        },
        ajaxPrefilter: R(Ct),
        ajaxTransport: R(St),
        ajax: function(t, n) {
            function i(t, n, i, s) {
                var c, d, y, b, k, $ = n;
                2 !== w && (w = 2, l && e.clearTimeout(l), o = void 0, a = s || "", x.readyState = t > 0 ? 4 : 0, c = t >= 200 && t < 300 || 304 === t, i && (b = W(p, x, i)), b = U(p, b, x, c), c ? (p.ifModified && (k = x.getResponseHeader("Last-Modified"), k && (re.lastModified[r] = k), k = x.getResponseHeader("etag"), k && (re.etag[r] = k)), 204 === t || "HEAD" === p.type ? $ = "nocontent" : 304 === t ? $ = "notmodified" : ($ = b.state, d = b.data, y = b.error, c = !y)) : (y = $, !t && $ || ($ = "error", t < 0 && (t = 0))), x.status = t, x.statusText = (n || $) + "", c ? g.resolveWith(f, [d, $, x]) : g.rejectWith(f, [x, $, y]), x.statusCode(m), m = void 0, u && h.trigger(c ? "ajaxSuccess" : "ajaxError", [x, p, c ? d : y]), v.fireWith(f, [x, $]), u && (h.trigger("ajaxComplete", [x, p]), --re.active || re.event.trigger("ajaxStop")))
            }
            "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && (n = t, t = void 0), n = n || {};
            var o, r, a, s, l, c, u, d, p = re.ajaxSetup({}, n),
                f = p.context || p,
                h = p.context && (f.nodeType || f.jquery) ? re(f) : re.event,
                g = re.Deferred(),
                v = re.Callbacks("once memory"),
                m = p.statusCode || {},
                y = {},
                b = {},
                w = 0,
                k = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === w) {
                            if (!s)
                                for (s = {}; t = kt.exec(a);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return w || (e = b[n] = b[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return w || (p.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (w < 2)
                                for (t in e) m[t] = [m[t], e[t]];
                            else x.always(e[x.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || k;
                        return o && o.abort(t), i(0, t), this
                    }
                };
            if (g.promise(x).complete = v.add, x.success = x.done, x.error = x.fail, p.url = ((t || p.url || vt.href) + "").replace(bt, "").replace(Tt, vt.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = re.trim(p.dataType || "*").toLowerCase().match(ke) || [""], null == p.crossDomain) {
                c = G.createElement("a");
                try {
                    c.href = p.url, c.href = c.href, p.crossDomain = Et.protocol + "//" + Et.host != c.protocol + "//" + c.host
                } catch ($) {
                    p.crossDomain = !0
                }
            }
            if (p.data && p.processData && "string" != typeof p.data && (p.data = re.param(p.data, p.traditional)), z(Ct, p, n, x), 2 === w) return x;
            u = re.event && p.global, u && 0 === re.active++ && re.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !$t.test(p.type), r = p.url, p.hasContent || (p.data && (r = p.url += (yt.test(r) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wt.test(r) ? r.replace(wt, "$1_=" + mt++) : r + (yt.test(r) ? "&" : "?") + "_=" + mt++)), p.ifModified && (re.lastModified[r] && x.setRequestHeader("If-Modified-Since", re.lastModified[r]), re.etag[r] && x.setRequestHeader("If-None-Match", re.etag[r])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", p.contentType), x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dt + "; q=0.01" : "") : p.accepts["*"]);
            for (d in p.headers) x.setRequestHeader(d, p.headers[d]);
            if (p.beforeSend && (p.beforeSend.call(f, x, p) === !1 || 2 === w)) return x.abort();
            k = "abort";
            for (d in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) x[d](p[d]);
            if (o = z(St, p, n, x)) {
                if (x.readyState = 1, u && h.trigger("ajaxSend", [x, p]), 2 === w) return x;
                p.async && p.timeout > 0 && (l = e.setTimeout(function() {
                    x.abort("timeout")
                }, p.timeout));
                try {
                    w = 1, o.send(y, i)
                } catch ($) {
                    if (!(w < 2)) throw $;
                    i(-1, $)
                }
            } else i(-1, "No Transport");
            return x
        },
        getJSON: function(e, t, n) {
            return re.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return re.get(e, void 0, t, "script")
        }
    }), re.each(["get", "post"], function(e, t) {
        re[t] = function(e, n, i, o) {
            return re.isFunction(n) && (o = o || i, i = n, n = void 0), re.ajax(re.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            }, re.isPlainObject(e) && e))
        }
    }), re._evalUrl = function(e) {
        return re.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, re.fn.extend({
        wrapAll: function(e) {
            var t;
            return re.isFunction(e) ? this.each(function(t) {
                re(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = re(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return re.isFunction(e) ? this.each(function(t) {
                re(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = re(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = re.isFunction(e);
            return this.each(function(n) {
                re(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                re.nodeName(this, "body") || re(this).replaceWith(this.childNodes)
            }).end()
        }
    }), re.expr.filters.hidden = function(e) {
        return !re.expr.filters.visible(e)
    }, re.expr.filters.visible = function(e) {
        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
    };
    var At = /%20/g,
        Ot = /\[\]$/,
        Mt = /\r?\n/g,
        Ht = /^(?:submit|button|image|reset|file)$/i,
        Pt = /^(?:input|select|textarea|keygen)/i;
    re.param = function(e, t) {
        var n, i = [],
            o = function(e, t) {
                t = re.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional), re.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(e, function() {
            o(this.name, this.value)
        });
        else
            for (n in e) V(n, e[n], t, o);
        return i.join("&").replace(At, "+")
    }, re.fn.extend({
        serialize: function() {
            return re.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = re.prop(this, "elements");
                return e ? re.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !re(this).is(":disabled") && Pt.test(this.nodeName) && !Ht.test(e) && (this.checked || !Pe.test(e))
            }).map(function(e, t) {
                var n = re(this).val();
                return null == n ? null : re.isArray(n) ? re.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Mt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Mt, "\r\n")
                }
            }).get()
        }
    }), re.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    };
    var jt = {
            0: 200,
            1223: 204
        },
        Lt = re.ajaxSettings.xhr();
    ie.cors = !!Lt && "withCredentials" in Lt, ie.ajax = Lt = !!Lt, re.ajaxTransport(function(t) {
        var n, i;
        if (ie.cors || Lt && !t.crossDomain) return {
            send: function(o, r) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                for (a in o) s.setRequestHeader(a, o[a]);
                n = function(e) {
                    return function() {
                        n && (n = i = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? r(0, "error") : r(s.status, s.statusText) : r(jt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), i = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && i()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (l) {
                    if (n) throw l
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), re.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return re.globalEval(e), e
            }
        }
    }), re.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), re.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(i, o) {
                    t = re("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                    }), G.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Nt = [],
        qt = /(=)\?(?=&|$)|\?\?/;
    re.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Nt.pop() || re.expando + "_" + mt++;
            return this[e] = !0, e
        }
    }), re.ajaxPrefilter("json jsonp", function(t, n, i) {
        var o, r, a, s = t.jsonp !== !1 && (qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && qt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(qt, "$1" + o) : t.jsonp !== !1 && (t.url += (yt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
            return a || re.error(o + " was not called"), a[0]
        }, t.dataTypes[0] = "json", r = e[o], e[o] = function() {
            a = arguments
        }, i.always(function() {
            void 0 === r ? re(e).removeProp(o) : e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, Nt.push(o)), a && re.isFunction(r) && r(a[0]), a = r = void 0
        }), "script"
    }), re.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || G;
        var i = he.exec(e),
            o = !n && [];
        return i ? [t.createElement(i[1])] : (i = p([e], t, o), o && o.length && re(o).remove(), re.merge([], i.childNodes))
    };
    var _t = re.fn.load;
    re.fn.load = function(e, t, n) {
        if ("string" != typeof e && _t) return _t.apply(this, arguments);
        var i, o, r, a = this,
            s = e.indexOf(" ");
        return s > -1 && (i = re.trim(e.slice(s)), e = e.slice(0, s)), re.isFunction(t) ? (n = t, t = void 0) : t && "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && (o = "POST"), a.length > 0 && re.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            r = arguments, a.html(i ? re("<div>").append(re.parseHTML(e)).find(i) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, r || [e.responseText, t, e])
            })
        }), this
    }, re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        re.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), re.expr.filters.animated = function(e) {
        return re.grep(re.timers, function(t) {
            return e === t.elem
        }).length
    }, re.offset = {
        setOffset: function(e, t, n) {
            var i, o, r, a, s, l, c, u = re.css(e, "position"),
                d = re(e),
                p = {};
            "static" === u && (e.style.position = "relative"), s = d.offset(), r = re.css(e, "top"), l = re.css(e, "left"), c = ("absolute" === u || "fixed" === u) && (r + l).indexOf("auto") > -1, c ? (i = d.position(), a = i.top, o = i.left) : (a = parseFloat(r) || 0, o = parseFloat(l) || 0), re.isFunction(t) && (t = t.call(e, n, re.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + o), "using" in t ? t.using.call(e, p) : d.css(p)
        }
    }, re.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                re.offset.setOffset(this, e, t)
            });
            var t, n, i = this[0],
                o = {
                    top: 0,
                    left: 0
                },
                r = i && i.ownerDocument;
            if (r) return t = r.documentElement, re.contains(t, i) ? (o = i.getBoundingClientRect(), n = Y(r), {
                top: o.top + n.pageYOffset - t.clientTop,
                left: o.left + n.pageXOffset - t.clientLeft
            }) : o
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === re.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), re.nodeName(e[0], "html") || (i = e.offset()), i.top += re.css(e[0], "borderTopWidth", !0), i.left += re.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - i.top - re.css(n, "marginTop", !0),
                    left: t.left - i.left - re.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === re.css(e, "position");) e = e.offsetParent;
                return e || Je
            })
        }
    }), re.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        re.fn[e] = function(i) {
            return $e(this, function(e, i, o) {
                var r = Y(e);
                return void 0 === o ? r ? r[t] : e[i] : void(r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : e[i] = o)
            }, e, i, arguments.length)
        }
    }), re.each(["top", "left"], function(e, t) {
        re.cssHooks[t] = D(ie.pixelPosition, function(e, n) {
            if (n) return n = S(e, t), Ge.test(n) ? re(e).position()[t] + "px" : n
        })
    }), re.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        re.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            re.fn[i] = function(i, o) {
                var r = arguments.length && (n || "boolean" != typeof i),
                    a = n || (i === !0 || o === !0 ? "margin" : "border");
                return $e(this, function(t, n, i) {
                    var o;
                    return re.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? re.css(t, n, a) : re.style(t, n, i, a)
                }, t, r ? i : void 0, r, null)
            }
        })
    }), re.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        size: function() {
            return this.length
        }
    }), re.fn.andSelf = re.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return re
    });
    var It = e.jQuery,
        Ft = e.$;
    return re.noConflict = function(t) {
        return e.$ === re && (e.$ = Ft), t && e.jQuery === re && (e.jQuery = It), re
    }, t || (e.jQuery = e.$ = re), re
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], function(n) {
        return t(e, n)
    }) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" === _typeof(module.exports) ? module.exports = t(e, require("jquery")) : e.lity = t(e, e.jQuery || e.Zepto)
}("undefined" != typeof window ? window : void 0, function(e, t) {
    function n() {
        h[g > 0 ? "addClass" : "removeClass"]("lity-active")
    }

    function i(e) {
        var n = t.Deferred();
        return x ? (e.one(x, n.resolve), setTimeout(n.resolve, 500)) : n.resolve(), n.promise()
    }

    function o(e, n, i) {
        if (1 === arguments.length) return t.extend({}, e);
        if ("string" == typeof n) {
            if ("undefined" == typeof i) return "undefined" == typeof e[n] ? null : e[n];
            e[n] = i
        } else t.extend(e, n);
        return this
    }

    function r(e) {
        for (var t, n = decodeURI(e).split("&"), i = {}, o = 0, r = n.length; o < r; o++) n[o] && (t = n[o].split("="), i[t[0]] = t[1]);
        return i
    }

    function a(e, n) {
        return e + (e.indexOf("?") > -1 ? "&" : "?") + t.param(n)
    }

    function s(e) {
        return t('<span class="lity-error"/>').append(e)
    }

    function l(e) {
        if (!v.test(e)) return !1;
        var n = t('<img src="' + e + '">'),
            i = t.Deferred(),
            o = function() {
                i.reject(s("Failed loading image"))
            };
        return n.on("load", function() {
            return 0 === this.naturalWidth ? o() : void i.resolve(n)
        }).on("error", o), i.promise()
    }

    function c(e) {
        var n;
        try {
            n = t(e)
        } catch (i) {
            return !1
        }
        if (!n.length) return !1;
        var o = t('<span style="display:none !important" class="lity-inline-placeholder"/>');
        return n.after(o).on("lity:ready", function(e, t) {
            t.one("lity:remove", function() {
                o.before(n.addClass("lity-hide")).remove()
            })
        })
    }

    function u(e) {
        var n, i = e;
        return n = m.exec(e), n && (i = a("https://www.youtube" + (n[2] || "") + ".com/embed/" + n[4], t.extend({
            autoplay: 1
        }, r(n[5] || "")))), n = y.exec(e), n && (i = a("https://player.vimeo.com/video/" + n[3], t.extend({
            autoplay: 1
        }, r(n[4] || "")))), n = b.exec(e), n && (i = a("https://www.google." + n[3] + "/maps?" + n[6], {
            output: n[6].indexOf("layer=c") > 0 ? "svembed" : "embed"
        })), '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + i + '"></iframe></div>'
    }

    function d(e) {
        function r(e) {
            27 === e.keyCode && u()
        }

        function a() {
            var e = p.documentElement.clientHeight ? p.documentElement.clientHeight : Math.round(f.height());
            v.css("max-height", Math.floor(e) + "px").trigger("lity:resize", [h])
        }

        function s(e, n) {
            h && (v = t(n), f.on("resize", a), a(), h.find(".lity-loader").each(function() {
                var e = t(this);
                i(e).always(function() {
                    e.remove()
                })
            }), h.removeClass("lity-loading").find(".lity-content").empty().append(v), v.removeClass("lity-hide").trigger("lity:ready", [h, e]), b.resolve())
        }

        function l(e, i, o, a) {
            b = t.Deferred(), g++, n(), h = t(o.template).addClass("lity-loading").appendTo("body"), o.esc && f.on("keyup", r), setTimeout(function() {
                h.addClass("lity-opened lity-" + e).on("click", "[data-lity-close]", function(e) {
                    t(e.target).is("[data-lity-close]") && u()
                }).trigger("lity:open", [h, a]), t.when(i).always(t.proxy(s, null, a))
            }, 0)
        }

        function c(e, n, i) {
            var o, r, a = t.extend({}, w, y);
            if (n = t.extend({}, k, m, n), n.handler && a[n.handler]) r = a[n.handler](e, d), o = n.handler;
            else {
                var s = {};
                t.each(["inline", "iframe"], function(e, t) {
                    a[t] && (s[t] = a[t]), delete a[t]
                });
                var c = function(t, n) {
                    return !n || (r = n(e, d), r ? (o = t, !1) : void 0)
                };
                t.each(a, c), o || t.each(s, c)
            }
            return r && t.when(u()).done(t.proxy(l, null, o, r, n, i)), !!r
        }

        function u() {
            if (h) {
                var e = t.Deferred();
                return b.done(function() {
                    g--, n(), f.off("resize", a).off("keyup", r), v.trigger("lity:close", [h]), h.removeClass("lity-opened").addClass("lity-closed");
                    var t = h,
                        o = v;
                    h = null, v = null, i(o.add(t)).always(function() {
                        o.trigger("lity:remove", [t]), t.remove(), e.resolve()
                    })
                }), e.promise()
            }
        }

        function d(e) {
            if (!e.preventDefault) return d.open(e);
            var n = t(this),
                i = n.data("lity-target") || n.attr("href") || n.attr("src");
            if (i) {
                var o = n.data("lity-options") || n.data("lity");
                c(i, o, n) && (n.blur(), e.preventDefault())
            }
        }
        var h, v, m = {},
            y = {},
            b = t.Deferred().resolve();
        return d.handlers = t.proxy(o, d, y), d.options = t.proxy(o, d, m), d.open = function(e, t, n) {
            return c(e, t, n), d
        }, d.close = function() {
            return u(), d
        }, d.options(e)
    }
    var p = e.document,
        f = t(e),
        h = t("html"),
        g = 0,
        v = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
        m = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
        y = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
        b = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
        w = {
            image: l,
            inline: c,
            iframe: u
        },
        k = {
            esc: !0,
            handler: null,
            template: '<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>Ã—</button></div></div></div>'
        },
        x = function() {
            var e = p.createElement("div"),
                t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var n in t)
                if (void 0 !== e.style[n]) return t[n];
            return !1
        }();
    return d.version = "1.6.6", d.handlers = t.proxy(o, d, w), d.options = t.proxy(o, d, k), t(p).on("click", "[data-lity]", d()), d
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    var t = window.Slick || {};
    t = function() {
        function t(t, i) {
            var o, r = this;
            r.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(t),
                appendDots: e(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, n) {
                    return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(n + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, r.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(t), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = e(t).data("slick") || {}, r.options = e.extend({}, r.defaults, i, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, "undefined" != typeof document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.instanceUid = n++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
        }
        var n = 0;
        return t
    }(), t.prototype.activateADA = function() {
        var e = this;
        e.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
        var o = this;
        if ("boolean" == typeof n) i = n, n = null;
        else if (n < 0 || n >= o.slideCount) return !1;
        o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : i === !0 ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(t, n) {
            e(n).attr("data-slick-index", t)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, t.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, t.prototype.animateSlide = function(t, n) {
        var i = {},
            o = this;
        o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (t = -t), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
            left: t
        }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
            top: t
        }, o.options.speed, o.options.easing, n) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), e({
            animStart: o.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(e) {
                e = Math.ceil(e), o.options.vertical === !1 ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
            },
            complete: function() {
                n && n.call()
            }
        })) : (o.applyTransition(), t = Math.ceil(t), o.options.vertical === !1 ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(function() {
            o.disableTransition(), n.call()
        }, o.options.speed))
    }, t.prototype.getNavTarget = function() {
        var t = this,
            n = t.options.asNavFor;
        return n && null !== n && (n = e(n).not(t.$slider)), n
    }, t.prototype.asNavFor = function(t) {
        var n = this,
            i = n.getNavTarget();
        null !== i && "object" === ("undefined" == typeof i ? "undefined" : _typeof(i)) && i.each(function() {
            var n = e(this).slick("getSlick");
            n.unslicked || n.slideHandler(t, !0)
        })
    }, t.prototype.applyTransition = function(e) {
        var t = this,
            n = {};
        t.options.fade === !1 ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (e.options.infinite === !1 && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 === 0 && (e.direction = 1))), e.slideHandler(t))
    }, t.prototype.buildArrows = function() {
        var t = this;
        t.options.arrows === !0 && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, t.prototype.buildDots = function() {
        var t, n, i = this;
        if (i.options.dots === !0 && i.slideCount > i.options.slidesToShow) {
            for (i.$slider.addClass("slick-dotted"), n = e("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) n.append(e("<li />").append(i.options.customPaging.call(this, i, t)));
            i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
            e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), t.options.centerMode !== !0 && t.options.swipeToSlide !== !0 || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.options.draggable === !0 && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function() {
        var e, t, n, i, o, r, a, s = this;
        if (i = document.createDocumentFragment(), r = s.$slider.children(), s.options.rows > 1) {
            for (a = s.options.slidesPerRow * s.options.rows, o = Math.ceil(r.length / a), e = 0; e < o; e++) {
                var l = document.createElement("div");
                for (t = 0; t < s.options.rows; t++) {
                    var c = document.createElement("div");
                    for (n = 0; n < s.options.slidesPerRow; n++) {
                        var u = e * a + (t * s.options.slidesPerRow + n);
                        r.get(u) && c.appendChild(r.get(u))
                    }
                    l.appendChild(c)
                }
                i.appendChild(l)
            }
            s.$slider.empty().append(i), s.$slider.children().children().children().css({
                width: 100 / s.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, t.prototype.checkResponsive = function(t, n) {
        var i, o, r, a = this,
            s = !1,
            l = a.$slider.width(),
            c = window.innerWidth || e(window).width();
        if ("window" === a.respondTo ? r = c : "slider" === a.respondTo ? r = l : "min" === a.respondTo && (r = Math.min(c, l)), a.options.responsive && a.options.responsive.length && null !== a.options.responsive) {
            o = null;
            for (i in a.breakpoints) a.breakpoints.hasOwnProperty(i) && (a.originalSettings.mobileFirst === !1 ? r < a.breakpoints[i] && (o = a.breakpoints[i]) : r > a.breakpoints[i] && (o = a.breakpoints[i]));
            null !== o ? null !== a.activeBreakpoint ? (o !== a.activeBreakpoint || n) && (a.activeBreakpoint = o, "unslick" === a.breakpointSettings[o] ? a.unslick(o) : (a.options = e.extend({}, a.originalSettings, a.breakpointSettings[o]), t === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(t)), s = o) : (a.activeBreakpoint = o, "unslick" === a.breakpointSettings[o] ? a.unslick(o) : (a.options = e.extend({}, a.originalSettings, a.breakpointSettings[o]), t === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(t)), s = o) : null !== a.activeBreakpoint && (a.activeBreakpoint = null, a.options = a.originalSettings, t === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(t), s = o), t || s === !1 || a.$slider.trigger("breakpoint", [a, s])
        }
    }, t.prototype.changeSlide = function(t, n) {
        var i, o, r, a = this,
            s = e(t.currentTarget);
        switch (s.is("a") && t.preventDefault(), s.is("li") || (s = s.closest("li")), r = a.slideCount % a.options.slidesToScroll !== 0, i = r ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll, t.data.message) {
            case "previous":
                o = 0 === i ? a.options.slidesToScroll : a.options.slidesToShow - i, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - o, !1, n);
                break;
            case "next":
                o = 0 === i ? a.options.slidesToScroll : i, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + o, !1, n);
                break;
            case "index":
                var l = 0 === t.data.index ? 0 : t.data.index || s.index() * a.options.slidesToScroll;
                a.slideHandler(a.checkNavigable(l), !1, n), s.children().trigger("focus");
                break;
            default:
                return
        }
    }, t.prototype.checkNavigable = function(e) {
        var t, n, i = this;
        if (t = i.getNavigableIndexes(), n = 0, e > t[t.length - 1]) e = t[t.length - 1];
        else
            for (var o in t) {
                if (e < t[o]) {
                    e = n;
                    break
                }
                n = t[o]
            }
        return e
    }, t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), t.$slider.off("focus.slick blur.slick"), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && (e = t.$slides.children().children(), e.removeAttr("style"), t.$slider.empty().append(e))
    }, t.prototype.clickHandler = function(e) {
        var t = this;
        t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function(t) {
        var n = this;
        n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            e(this).attr("style", e(this).data("originalStyling"))
        }), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
    }, t.prototype.disableTransition = function(e) {
        var t = this,
            n = {};
        n[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.fadeSlide = function(e, t) {
        var n = this;
        n.cssTransitions === !1 ? (n.$slides.eq(e).css({
            zIndex: n.options.zIndex
        }), n.$slides.eq(e).animate({
            opacity: 1
        }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
            opacity: 1,
            zIndex: n.options.zIndex
        }), t && setTimeout(function() {
            n.disableTransition(e), t.call()
        }, n.options.speed))
    }, t.prototype.fadeSlideOut = function(e) {
        var t = this;
        t.cssTransitions === !1 ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(n) {
            n.stopImmediatePropagation();
            var i = e(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = i.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        var e = this;
        return e.currentSlide
    }, t.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            n = 0,
            i = 0;
        if (e.options.infinite === !0)
            for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (e.options.centerMode === !0) i = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return i - 1
    }, t.prototype.getLeft = function(e) {
        var t, n, i, o = this,
            r = 0;
        return o.slideOffset = 0, n = o.$slides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, r = n * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll !== 0 && e + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (e - o.slideCount)) * o.slideWidth * -1, r = (o.options.slidesToShow - (e - o.slideCount)) * n * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, r = o.slideCount % o.options.slidesToScroll * n * -1))) : e + o.options.slidesToShow > o.slideCount && (o.slideOffset = (e + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (e + o.options.slidesToShow - o.slideCount) * n), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, r = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), t = o.options.vertical === !1 ? e * o.slideWidth * -1 + o.slideOffset : e * n * -1 + r, o.options.variableWidth === !0 && (i = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow), t = o.options.rtl === !0 ? i[0] ? (o.$slideTrack.width() - i[0].offsetLeft - i.width()) * -1 : 0 : i[0] ? i[0].offsetLeft * -1 : 0, o.options.centerMode === !0 && (i = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow + 1), t = o.options.rtl === !0 ? i[0] ? (o.$slideTrack.width() - i[0].offsetLeft - i.width()) * -1 : 0 : i[0] ? i[0].offsetLeft * -1 : 0, t += (o.$list.width() - i.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        var t = this;
        return t.options[e]
    }, t.prototype.getNavigableIndexes = function() {
        var e, t = this,
            n = 0,
            i = 0,
            o = [];
        for (t.options.infinite === !1 ? e = t.slideCount : (n = t.options.slidesToScroll * -1, i = t.options.slidesToScroll * -1, e = 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return o
    }, t.prototype.getSlick = function() {
        return this
    }, t.prototype.getSlideCount = function() {
        var t, n, i, o = this;
        return i = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(t, r) {
            if (r.offsetLeft - i + e(r).outerWidth() / 2 > o.swipeLeft * -1) return n = r, !1
        }), t = Math.abs(e(n).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        var n = this;
        n.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, t.prototype.init = function(t) {
        var n = this;
        e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), t && n.$slider.trigger("init", [n]), n.options.accessibility === !0 && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay())
    }, t.prototype.initADA = function() {
        var t = this;
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(n) {
            e(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + t.instanceUid + n
            })
        }), null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(n) {
            e(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + t.instanceUid + n,
                id: "slick-slide" + t.instanceUid + n
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
    }, t.prototype.initArrowEvents = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide))
    }, t.prototype.initDotEvents = function() {
        var t = this;
        t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }, t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.initUI = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, t.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && t.options.accessibility === !0 ? t.changeSlide({
            data: {
                message: t.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === e.keyCode && t.options.accessibility === !0 && t.changeSlide({
            data: {
                message: t.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, t.prototype.lazyLoad = function() {
        function t(t) {
            e("img[data-lazy]", t).each(function() {
                var t = e(this),
                    n = e(this).attr("data-lazy"),
                    i = document.createElement("img");
                i.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        t.attr("src", n).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy").removeClass("slick-loading")
                        }), a.$slider.trigger("lazyLoaded", [a, t, n])
                    })
                }, i.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, t, n])
                }, i.src = n
            })
        }
        var n, i, o, r, a = this;
        a.options.centerMode === !0 ? a.options.infinite === !0 ? (o = a.currentSlide + (a.options.slidesToShow / 2 + 1), r = o + a.options.slidesToShow + 2) : (o = Math.max(0, a.currentSlide - (a.options.slidesToShow / 2 + 1)), r = 2 + (a.options.slidesToShow / 2 + 1) + a.currentSlide) : (o = a.options.infinite ? a.options.slidesToShow + a.currentSlide : a.currentSlide, r = Math.ceil(o + a.options.slidesToShow), a.options.fade === !0 && (o > 0 && o--, r <= a.slideCount && r++)), n = a.$slider.find(".slick-slide").slice(o, r), t(n), a.slideCount <= a.options.slidesToShow ? (i = a.$slider.find(".slick-slide"), t(i)) : a.currentSlide >= a.slideCount - a.options.slidesToShow ? (i = a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow), t(i)) : 0 === a.currentSlide && (i = a.$slider.find(".slick-cloned").slice(a.options.slidesToShow * -1), t(i))
    }, t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function() {
        var e = this;
        e.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive(), e.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear(), e.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, t.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && t.initADA())
    }, t.prototype.prev = t.prototype.slickPrev = function() {
        var e = this;
        e.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var n, i, o, r = this,
            a = e("img[data-lazy]", r.$slider);
        a.length ? (n = a.first(), i = n.attr("data-lazy"), o = document.createElement("img"), o.onload = function() {
            n.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"), r.options.adaptiveHeight === !0 && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, n, i]), r.progressiveLazyLoad()
        }, o.onerror = function() {
            t < 3 ? setTimeout(function() {
                r.progressiveLazyLoad(t + 1)
            }, 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, n, i]), r.progressiveLazyLoad())
        }, o.src = i) : r.$slider.trigger("allImagesLoaded", [r])
    }, t.prototype.refresh = function(t) {
        var n, i, o = this;
        i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {
            currentSlide: n
        }), o.init(), t || o.changeSlide({
            data: {
                message: "index",
                index: n
            }
        }, !1)
    }, t.prototype.registerBreakpoints = function() {
        var t, n, i, o = this,
            r = o.options.responsive || null;
        if ("array" === e.type(r) && r.length) {
            o.respondTo = o.options.respondTo || "window";
            for (t in r)
                if (i = o.breakpoints.length - 1, n = r[t].breakpoint, r.hasOwnProperty(t)) {
                    for (; i >= 0;) o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
                    o.breakpoints.push(n), o.breakpointSettings[n] = r[t].settings
                }
            o.breakpoints.sort(function(e, t) {
                return o.options.mobileFirst ? e - t : t - e
            })
        }
    }, t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t]);
    }, t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }, 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
        var i = this;
        return "boolean" == typeof e ? (t = e, e = t === !0 ? 0 : i.slideCount - 1) : e = t === !0 ? --e : e, !(i.slideCount < 1 || e < 0 || e > i.slideCount - 1) && (i.unload(), n === !0 ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, void i.reinit())
    }, t.prototype.setCSS = function(e) {
        var t, n, i = this,
            o = {};
        i.options.rtl === !0 && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, i.transformsEnabled === !1 ? i.$slideTrack.css(o) : (o = {}, i.cssTransitions === !1 ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
    }, t.prototype.setDimensions = function() {
        var e = this;
        e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : e.options.variableWidth === !0 ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function() {
        var t, n = this;
        n.$slides.each(function(i, o) {
            t = n.slideWidth * i * -1, n.options.rtl === !0 ? e(o).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            }) : e(o).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            })
        }), n.$slides.eq(n.currentSlide).css({
            zIndex: n.options.zIndex - 1,
            opacity: 1
        })
    }, t.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t, n, i, o, r, a = this,
            s = !1;
        if ("object" === e.type(arguments[0]) ? (i = arguments[0], s = arguments[1], r = "multiple") : "string" === e.type(arguments[0]) && (i = arguments[0], o = arguments[1], s = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? r = "responsive" : "undefined" != typeof arguments[1] && (r = "single")), "single" === r) a.options[i] = o;
        else if ("multiple" === r) e.each(i, function(e, t) {
            a.options[e] = t
        });
        else if ("responsive" === r)
            for (n in o)
                if ("array" !== e.type(a.options.responsive)) a.options.responsive = [o[n]];
                else {
                    for (t = a.options.responsive.length - 1; t >= 0;) a.options.responsive[t].breakpoint === o[n].breakpoint && a.options.responsive.splice(t, 1), t--;
                    a.options.responsive.push(o[n])
                }
        s && (a.unload(), a.reinit())
    }, t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = e.options.vertical === !0 ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || e.options.useCSS === !0 && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && e.animType !== !1
    }, t.prototype.setSlideClasses = function(e) {
        var t, n, i, o, r = this;
        n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), r.options.centerMode === !0 ? (t = Math.floor(r.options.slidesToShow / 2), r.options.infinite === !0 && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = r.options.infinite === !0 ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === r.options.lazyLoad && r.lazyLoad()
    }, t.prototype.setupInfinite = function() {
        var t, n, i, o = this;
        if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (n = null, o.slideCount > o.options.slidesToShow)) {
            for (i = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < i; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                e(this).attr("id", "")
            })
        }
    }, t.prototype.interrupt = function(e) {
        var t = this;
        e || t.autoPlay(), t.interrupted = e
    }, t.prototype.selectHandler = function(t) {
        var n = this,
            i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
            o = parseInt(i.attr("data-slick-index"));
        return o || (o = 0), n.slideCount <= n.options.slidesToShow ? (n.setSlideClasses(o), void n.asNavFor(o)) : void n.slideHandler(o)
    }, t.prototype.slideHandler = function(e, t, n) {
        var i, o, r, a, s, l = null,
            c = this;
        if (t = t || !1, (c.animating !== !0 || c.options.waitForAnimate !== !0) && !(c.options.fade === !0 && c.currentSlide === e || c.slideCount <= c.options.slidesToShow)) return t === !1 && c.asNavFor(e), i = e, l = c.getLeft(i), a = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? a : c.swipeLeft, c.options.infinite === !1 && c.options.centerMode === !1 && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll) ? void(c.options.fade === !1 && (i = c.currentSlide, n !== !0 ? c.animateSlide(a, function() {
            c.postSlide(i)
        }) : c.postSlide(i))) : c.options.infinite === !1 && c.options.centerMode === !0 && (e < 0 || e > c.slideCount - c.options.slidesToScroll) ? void(c.options.fade === !1 && (i = c.currentSlide, n !== !0 ? c.animateSlide(a, function() {
            c.postSlide(i)
        }) : c.postSlide(i))) : (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll !== 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll !== 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (s = c.getNavTarget(), s = s.slick("getSlick"), s.slideCount <= s.options.slidesToShow && s.setSlideClasses(c.currentSlide)), c.updateDots(), c.updateArrows(), c.options.fade === !0 ? (n !== !0 ? (c.fadeSlideOut(r), c.fadeSlide(o, function() {
            c.postSlide(o)
        })) : c.postSlide(o), void c.animateHeight()) : void(n !== !0 ? c.animateSlide(l, function() {
            c.postSlide(o)
        }) : c.postSlide(o)))
    }, t.prototype.startLoad = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
        var e, t, n, i, o = this;
        return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), i = Math.round(180 * n / Math.PI), i < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 ? o.options.rtl === !1 ? "left" : "right" : i <= 360 && i >= 315 ? o.options.rtl === !1 ? "left" : "right" : i >= 135 && i <= 225 ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? i >= 35 && i <= 135 ? "down" : "up" : "vertical"
    }, t.prototype.swipeEnd = function(e) {
        var t, n, i = this;
        if (i.dragging = !1, i.interrupted = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
        if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
            switch (n = i.swipeDirection()) {
                case "left":
                case "down":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
            }
            "vertical" != n && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [i, n]))
        } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1 || t.options.draggable === !1 && e.type.indexOf("mouse") !== -1)) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function(e) {
        var t, n, i, o, r, a = this;
        return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), a.options.verticalSwiping === !0 && (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))), n = a.swipeDirection(), "vertical" !== n ? (void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && e.preventDefault(), o = (a.options.rtl === !1 ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), a.options.verticalSwiping === !0 && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, a.options.infinite === !1 && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), a.options.vertical === !1 ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, a.options.verticalSwiping === !0 && (a.swipeLeft = t + i * o), a.options.fade !== !0 && a.options.touchMove !== !1 && (a.animating === !0 ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))) : void 0)
    }, t.prototype.swipeStart = function(e) {
        var t, n = this;
        return n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow ? (n.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(n.dragging = !0))
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, t.prototype.updateArrows = function() {
        var e, t = this;
        e = Math.floor(t.options.slidesToShow / 2), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0 && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, t.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, e.fn.slick = function() {
        var e, n, i = this,
            o = arguments[0],
            r = Array.prototype.slice.call(arguments, 1),
            a = i.length;
        for (e = 0; e < a; e++)
            if ("object" == ("undefined" == typeof o ? "undefined" : _typeof(o)) || "undefined" == typeof o ? i[e].slick = new t(i[e], o) : n = i[e].slick[o].apply(i[e].slick, r), "undefined" != typeof n) return n;
        return i
    }
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e) {
    function t(e, n) {
        if (!(this instanceof t)) {
            var i = new t(e, n);
            return i.open(), i
        }
        this.id = t.id++, this.setup(e, n), this.chainCallbacks(t._callbackChain)
    }
    if ("undefined" == typeof e) return void("console" in window && window.console.info("Too much lightness, Featherlight needs jQuery."));
    var n = [],
        i = function(t) {
            return n = e.grep(n, function(e) {
                return e !== t && e.$instance.closest("body").length > 0
            })
        },
        o = function l(e, t) {
            var n = {},
                i = new RegExp("^" + t + "([A-Z])(.*)");
            for (var l in e) {
                var o = l.match(i);
                if (o) {
                    var r = (o[1] + o[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
                    n[r] = e[l]
                }
            }
            return n
        },
        r = {
            keyup: "onKeyUp",
            resize: "onResize"
        },
        a = function(n) {
            e.each(t.opened().reverse(), function() {
                return n.isDefaultPrevented() || !1 !== this[r[n.type]](n) ? void 0 : (n.preventDefault(), n.stopPropagation(), !1)
            })
        },
        s = function(n) {
            if (n !== t._globalHandlerInstalled) {
                t._globalHandlerInstalled = n;
                var i = e.map(r, function(e, n) {
                    return n + "." + t.prototype.namespace
                }).join(" ");
                e(window)[n ? "on" : "off"](i, a)
            }
        };
    t.prototype = {
        constructor: t,
        namespace: "featherlight",
        targetAttr: "data-featherlight",
        variant: null,
        resetCss: !1,
        background: null,
        openTrigger: "click",
        closeTrigger: "click",
        filter: null,
        root: "body",
        openSpeed: 250,
        closeSpeed: 250,
        closeOnClick: "background",
        closeOnEsc: !0,
        closeIcon: "&#10005;",
        loading: "",
        persist: !1,
        otherClose: null,
        beforeOpen: e.noop,
        beforeContent: e.noop,
        beforeClose: e.noop,
        afterOpen: e.noop,
        afterContent: e.noop,
        afterClose: e.noop,
        onKeyUp: e.noop,
        onResize: e.noop,
        type: null,
        contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
        setup: function(t, n) {
            "object" != ("undefined" == typeof t ? "undefined" : _typeof(t)) || t instanceof e != 0 || n || (n = t, t = void 0);
            var i = e.extend(this, n, {
                    target: t
                }),
                o = i.resetCss ? i.namespace + "-reset" : i.namespace,
                r = e(i.background || ['<div class="' + o + "-loading " + o + '">', '<div class="' + o + '-content">', '<span class="' + o + "-close-icon " + i.namespace + '-close">', i.closeIcon, "</span>", '<div class="' + i.namespace + '-inner">' + i.loading + "</div>", "</div>", "</div>"].join("")),
                a = "." + i.namespace + "-close" + (i.otherClose ? "," + i.otherClose : "");
            return i.$instance = r.clone().addClass(i.variant), i.$instance.on(i.closeTrigger + "." + i.namespace, function(t) {
                var n = e(t.target);
                ("background" === i.closeOnClick && n.is("." + i.namespace) || "anywhere" === i.closeOnClick || n.closest(a).length) && (i.close(t), t.preventDefault())
            }), this
        },
        getContent: function() {
            if (this.persist !== !1 && this.$content) return this.$content;
            var t = this,
                n = this.constructor.contentFilters,
                i = function(e) {
                    return t.$currentTarget && t.$currentTarget.attr(e)
                },
                o = i(t.targetAttr),
                r = t.target || o || "",
                a = n[t.type];
            if (!a && r in n && (a = n[r], r = t.target && o), r = r || i("href") || "", !a)
                for (var s in n) t[s] && (a = n[s], r = t[s]);
            if (!a) {
                var l = r;
                if (r = null, e.each(t.contentFilters, function() {
                        return a = n[this], a.test && (r = a.test(l)), !r && a.regex && l.match && l.match(a.regex) && (r = l), !r
                    }), !r) return "console" in window && window.console.error("Featherlight: no content filter found " + (l ? ' for "' + l + '"' : " (no target specified)")), !1
            }
            return a.process.call(t, r)
        },
        setContent: function(t) {
            var n = this;
            return (t.is("iframe") || e("iframe", t).length > 0) && n.$instance.addClass(n.namespace + "-iframe"), n.$instance.removeClass(n.namespace + "-loading"), n.$instance.find("." + n.namespace + "-inner").not(t).slice(1).remove().end().replaceWith(e.contains(n.$instance[0], t[0]) ? "" : t), n.$content = t.addClass(n.namespace + "-inner"), n
        },
        open: function(t) {
            var i = this;
            if (i.$instance.hide().appendTo(i.root), !(t && t.isDefaultPrevented() || i.beforeOpen(t) === !1)) {
                t && t.preventDefault();
                var o = i.getContent();
                if (o) return n.push(i), s(!0), i.$instance.fadeIn(i.openSpeed), i.beforeContent(t), e.when(o).always(function(e) {
                    i.setContent(e), i.afterContent(t)
                }).then(i.$instance.promise()).done(function() {
                    i.afterOpen(t)
                })
            }
            return i.$instance.detach(), e.Deferred().reject().promise()
        },
        close: function(t) {
            var n = this,
                o = e.Deferred();
            return n.beforeClose(t) === !1 ? o.reject() : (0 === i(n).length && s(!1), n.$instance.fadeOut(n.closeSpeed, function() {
                n.$instance.detach(), n.afterClose(t), o.resolve()
            })), o.promise()
        },
        resize: function(e, t) {
            if (e && t) {
                this.$content.css("width", "").css("height", "");
                var n = Math.max(e / (parseInt(this.$content.parent().css("width"), 10) - 1), t / (parseInt(this.$content.parent().css("height"), 10) - 1));
                n > 1 && (n = t / Math.floor(t / n), this.$content.css("width", "" + e / n + "px").css("height", "" + t / n + "px"))
            }
        },
        chainCallbacks: function(t) {
            for (var n in t) this[n] = e.proxy(t[n], this, e.proxy(this[n], this))
        }
    }, e.extend(t, {
        id: 0,
        autoBind: "[data-featherlight]",
        defaults: t.prototype,
        contentFilters: {
            jquery: {
                regex: /^[#.]\w/,
                test: function(t) {
                    return t instanceof e && t
                },
                process: function(t) {
                    return this.persist !== !1 ? e(t) : e(t).clone(!0)
                }
            },
            image: {
                regex: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,
                process: function(t) {
                    var n = this,
                        i = e.Deferred(),
                        o = new Image,
                        r = e('<img src="' + t + '" alt="" class="' + n.namespace + '-image" />');
                    return o.onload = function() {
                        r.naturalWidth = o.width, r.naturalHeight = o.height, i.resolve(r)
                    }, o.onerror = function() {
                        i.reject(r)
                    }, o.src = t, i.promise()
                }
            },
            html: {
                regex: /^\s*<[\w!][^<]*>/,
                process: function(t) {
                    return e(t)
                }
            },
            ajax: {
                regex: /./,
                process: function(t) {
                    var n = e.Deferred(),
                        i = e("<div></div>").load(t, function(e, t) {
                            "error" !== t && n.resolve(i.contents()), n.fail()
                        });
                    return n.promise()
                }
            },
            iframe: {
                process: function(t) {
                    var n = new e.Deferred,
                        i = e("<iframe/>").hide().attr("src", t).css(o(this, "iframe")).on("load", function() {
                            n.resolve(i.show())
                        }).appendTo(this.$instance.find("." + this.namespace + "-content"));
                    return n.promise()
                }
            },
            text: {
                process: function(t) {
                    return e("<div>", {
                        text: t
                    })
                }
            }
        },
        functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"],
        readElementConfig: function(t, n) {
            var i = this,
                o = new RegExp("^data-" + n + "-(.*)"),
                r = {};
            return t && t.attributes && e.each(t.attributes, function() {
                var t = this.name.match(o);
                if (t) {
                    var n = this.value,
                        a = e.camelCase(t[1]);
                    if (e.inArray(a, i.functionAttributes) >= 0) n = new Function(n);
                    else try {
                        n = e.parseJSON(n)
                    } catch (s) {}
                    r[a] = n
                }
            }), r
        },
        extend: function(t, n) {
            var i = function() {
                this.constructor = t
            };
            return i.prototype = this.prototype, t.prototype = new i, t.__super__ = this.prototype, e.extend(t, this, n), t.defaults = t.prototype, t
        },
        attach: function(t, n, i) {
            var o = this;
            "object" != ("undefined" == typeof n ? "undefined" : _typeof(n)) || n instanceof e != 0 || i || (i = n, n = void 0), i = e.extend({}, i);
            var r, a = i.namespace || o.defaults.namespace,
                s = e.extend({}, o.defaults, o.readElementConfig(t[0], a), i);
            return t.on(s.openTrigger + "." + s.namespace, s.filter, function(a) {
                var l = e.extend({
                        $source: t,
                        $currentTarget: e(this)
                    }, o.readElementConfig(t[0], s.namespace), o.readElementConfig(this, s.namespace), i),
                    c = r || e(this).data("featherlight-persisted") || new o(n, l);
                "shared" === c.persist ? r = c : c.persist !== !1 && e(this).data("featherlight-persisted", c), l.$currentTarget.blur(), c.open(a)
            }), t
        },
        current: function() {
            var e = this.opened();
            return e[e.length - 1] || null
        },
        opened: function() {
            var t = this;
            return i(), e.grep(n, function(e) {
                return e instanceof t
            })
        },
        close: function(e) {
            var t = this.current();
            return t ? t.close(e) : void 0
        },
        _onReady: function() {
            var t = this;
            t.autoBind && (e(t.autoBind).each(function() {
                t.attach(e(this))
            }), e(document).on("click", t.autoBind, function(n) {
                n.isDefaultPrevented() || "featherlight" === n.namespace || (n.preventDefault(), t.attach(e(n.currentTarget)), e(n.target).trigger("click.featherlight"))
            }))
        },
        _callbackChain: {
            onKeyUp: function(t, n) {
                return 27 === n.keyCode ? (this.closeOnEsc && e.featherlight.close(n), !1) : t(n)
            },
            onResize: function(e, t) {
                return this.resize(this.$content.naturalWidth, this.$content.naturalHeight), e(t)
            },
            afterContent: function(e, t) {
                var n = e(t);
                return this.onResize(t), n
            }
        }
    }), e.featherlight = t, e.fn.featherlight = function(e, n) {
        return t.attach(this, e, n)
    }, e(document).ready(function() {
        t._onReady()
    })
}(jQuery), ! function(e) {
    function t(n, i) {
        if (!(this instanceof t)) {
            var o = new t(e.extend({
                $source: n,
                $currentTarget: n.first()
            }, i));
            return o.open(), o
        }
        e.featherlight.apply(this, arguments), this.chainCallbacks(s)
    }
    var n = function(e) {
        window.console && window.console.warn && window.console.warn("FeatherlightGallery: " + e)
    };
    if ("undefined" == typeof e) return n("Too much lightness, Featherlight needs jQuery.");
    if (!e.featherlight) return n("Load the featherlight plugin before the gallery plugin");
    var i = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        o = e.event && e.event.special.swipeleft && e,
        r = window.Hammer && function(e) {
            var t = new window.Hammer.Manager(e[0]);
            return t.add(new window.Hammer.Swipe), t
        },
        a = i && (o || r);
    i && !a && n("No compatible swipe library detected; one must be included before featherlightGallery for swipe motions to navigate the galleries.");
    var s = {
        afterClose: function(e, t) {
            var n = this;
            return n.$instance.off("next." + n.namespace + " previous." + n.namespace), n._swiper && (n._swiper.off("swipeleft", n._swipeleft).off("swiperight", n._swiperight), n._swiper = null), e(t)
        },
        beforeOpen: function(e, t) {
            var n = this;
            return n.$instance.on("next." + n.namespace + " previous." + n.namespace, function(e) {
                var t = "next" === e.type ? 1 : -1;
                n.navigateTo(n.currentNavigation() + t)
            }), a ? n._swiper = a(n.$instance).on("swipeleft", n._swipeleft = function() {
                n.$instance.trigger("next")
            }).on("swiperight", n._swiperight = function() {
                n.$instance.trigger("previous")
            }) : n.$instance.find("." + n.namespace + "-content").append(n.createNavigation("previous")).append(n.createNavigation("next")), e(t)
        },
        beforeContent: function(e, t) {
            var n = this.currentNavigation(),
                i = this.slides().length;
            return this.$instance.toggleClass(this.namespace + "-first-slide", 0 === n).toggleClass(this.namespace + "-last-slide", n === i - 1), e(t)
        },
        onKeyUp: function(e, t) {
            var n = {
                37: "previous",
                39: "next"
            }[t.keyCode];
            return n ? (this.$instance.trigger(n), !1) : e(t)
        }
    };
    e.featherlight.extend(t, {
        autoBind: "[data-featherlight-gallery]"
    }), e.extend(t.prototype, {
        previousIcon: "&#9664;",
        nextIcon: "&#9654;",
        galleryFadeIn: 100,
        galleryFadeOut: 300,
        slides: function() {
            return this.filter ? this.$source.find(this.filter) : this.$source
        },
        images: function() {
            return n("images is deprecated, please use slides instead"), this.slides()
        },
        currentNavigation: function() {
            return this.slides().index(this.$currentTarget)
        },
        navigateTo: function(t) {
            var n = this,
                i = n.slides(),
                o = i.length,
                r = n.$instance.find("." + n.namespace + "-inner");
            return t = (t % o + o) % o, n.$currentTarget = i.eq(t), n.beforeContent(), e.when(n.getContent(), r.fadeTo(n.galleryFadeOut, .2)).always(function(e) {
                n.setContent(e), n.afterContent(), e.fadeTo(n.galleryFadeIn, 1)
            })
        },
        createNavigation: function(t) {
            var n = this;
            return e('<span title="' + t + '" class="' + this.namespace + "-" + t + '"><span>' + this[t + "Icon"] + "</span></span>").click(function() {
                e(this).trigger(t + "." + n.namespace)
            })
        }
    }), e.featherlightGallery = t, e.fn.featherlightGallery = function(e) {
        return t.attach(this, e)
    }, e(document).ready(function() {
        t._onReady()
    })
}(jQuery), angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope", function(e, t, n) {
    function i(e) {
        for (var t in e)
            if (void 0 !== r.style[t]) return e[t]
    }
    var o = function l(i, o, r) {
            r = r || {};
            var a = e.defer(),
                s = l[r.animation ? "animationEndEventName" : "transitionEndEventName"],
                c = function u() {
                    n.$apply(function() {
                        i.unbind(s, u), a.resolve(i)
                    })
                };
            return s && i.bind(s, c), t(function() {
                angular.isString(o) ? i.addClass(o) : angular.isFunction(o) ? o(i) : angular.isObject(o) && i.css(o), s || a.resolve(i)
            }), a.promise.cancel = function() {
                s && i.unbind(s, c), a.reject("Transition cancelled")
            }, a.promise
        },
        r = document.createElement("trans"),
        a = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend"
        },
        s = {
            WebkitTransition: "webkitAnimationEnd",
            MozTransition: "animationend",
            OTransition: "oAnimationEnd",
            transition: "animationend"
        };
    return o.transitionEndEventName = i(a), o.animationEndEventName = i(s), o
}]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition", function(e) {
    return {
        link: function(t, n, i) {
            function o(t) {
                function i() {
                    c === o && (c = void 0)
                }
                var o = e(n, t);
                return c && c.cancel(), c = o, o.then(i, i), o
            }

            function r() {
                u ? (u = !1, a()) : (n.removeClass("collapse").addClass("collapsing"), o({
                    height: n[0].scrollHeight + "px"
                }).then(a))
            }

            function a() {
                n.removeClass("collapsing"), n.addClass("collapse in"), n.css({
                    height: "auto"
                })
            }

            function s() {
                u ? (u = !1, l(), n.css({
                    height: 0
                })) : (n.css({
                    height: n[0].scrollHeight + "px"
                }), n[0].offsetWidth, n.removeClass("collapse in").addClass("collapsing"), o({
                    height: 0
                }).then(l))
            }

            function l() {
                n.removeClass("collapsing"), n.addClass("collapse")
            }
            var c, u = !0;
            t.$watch(i.collapse, function(e) {
                e ? s() : r()
            })
        }
    }
}]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {
    closeOthers: !0
}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function(e, t, n) {
    this.groups = [], this.closeOthers = function(i) {
        var o = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
        o && angular.forEach(this.groups, function(e) {
            e !== i && (e.isOpen = !1)
        })
    }, this.addGroup = function(e) {
        var t = this;
        this.groups.push(e), e.$on("$destroy", function() {
            t.removeGroup(e)
        })
    }, this.removeGroup = function(e) {
        var t = this.groups.indexOf(e); - 1 !== t && this.groups.splice(t, 1)
    }
}]).directive("accordion", function() {
    return {
        restrict: "EA",
        controller: "AccordionController",
        transclude: !0,
        replace: !1,
        templateUrl: "template/accordion/accordion.html"
    }
}).directive("accordionGroup", function() {
    return {
        require: "^accordion",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: "template/accordion/accordion-group.html",
        scope: {
            heading: "@",
            isOpen: "=?",
            isDisabled: "=?"
        },
        controller: function() {
            this.setHeading = function(e) {
                this.heading = e
            }
        },
        link: function(e, t, n, i) {
            i.addGroup(e), e.$watch("isOpen", function(t) {
                t && i.closeOthers(e)
            }), e.toggleOpen = function() {
                e.isDisabled || (e.isOpen = !e.isOpen)
            }
        }
    }
}).directive("accordionHeading", function() {
    return {
        restrict: "EA",
        transclude: !0,
        template: "",
        replace: !0,
        require: "^accordionGroup",
        link: function(e, t, n, i, o) {
            i.setHeading(o(e, function() {}))
        }
    }
}).directive("accordionTransclude", function() {
    return {
        require: "^accordionGroup",
        link: function(e, t, n, i) {
            e.$watch(function() {
                return i[n.accordionTransclude]
            }, function(e) {
                e && (t.html(""), t.append(e))
            })
        }
    }
}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs", function(e, t) {
    e.closeable = "close" in t, this.close = e.close
}]).directive("alert", function() {
    return {
        restrict: "EA",
        controller: "AlertController",
        templateUrl: "template/alert/alert.html",
        transclude: !0,
        replace: !0,
        scope: {
            type: "@",
            close: "&"
        }
    }
}).directive("dismissOnTimeout", ["$timeout", function(e) {
    return {
        require: "alert",
        link: function(t, n, i, o) {
            e(function() {
                o.close()
            }, parseInt(i.dismissOnTimeout, 10))
        }
    }
}]), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function() {
    return function(e, t, n) {
        t.addClass("ng-binding").data("$binding", n.bindHtmlUnsafe), e.$watch(n.bindHtmlUnsafe, function(e) {
            t.html(e || "")
        })
    }
}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).controller("ButtonsController", ["buttonConfig", function(e) {
    this.activeClass = e.activeClass || "active", this.toggleEvent = e.toggleEvent || "click"
}]).directive("btnRadio", function() {
    return {
        require: ["btnRadio", "ngModel"],
        controller: "ButtonsController",
        link: function(e, t, n, i) {
            var o = i[0],
                r = i[1];
            r.$render = function() {
                t.toggleClass(o.activeClass, angular.equals(r.$modelValue, e.$eval(n.btnRadio)))
            }, t.bind(o.toggleEvent, function() {
                var i = t.hasClass(o.activeClass);
                (!i || angular.isDefined(n.uncheckable)) && e.$apply(function() {
                    r.$setViewValue(i ? null : e.$eval(n.btnRadio)), r.$render()
                })
            })
        }
    }
}).directive("btnCheckbox", function() {
    return {
        require: ["btnCheckbox", "ngModel"],
        controller: "ButtonsController",
        link: function(e, t, n, i) {
            function o() {
                return a(n.btnCheckboxTrue, !0)
            }

            function r() {
                return a(n.btnCheckboxFalse, !1)
            }

            function a(t, n) {
                var i = e.$eval(t);
                return angular.isDefined(i) ? i : n;
            }
            var s = i[0],
                l = i[1];
            l.$render = function() {
                t.toggleClass(s.activeClass, angular.equals(l.$modelValue, o()))
            }, t.bind(s.toggleEvent, function() {
                e.$apply(function() {
                    l.$setViewValue(t.hasClass(s.activeClass) ? r() : o()), l.$render()
                })
            })
        }
    }
}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$interval", "$transition", function(e, t, n, i) {
    function o() {
        r();
        var t = +e.interval;
        !isNaN(t) && t > 0 && (s = n(a, t))
    }

    function r() {
        s && (n.cancel(s), s = null)
    }

    function a() {
        var t = +e.interval;
        l && !isNaN(t) && t > 0 ? e.next() : e.pause()
    }
    var s, l, c = this,
        u = c.slides = e.slides = [],
        d = -1;
    c.currentSlide = null;
    var p = !1;
    c.select = e.select = function(n, r) {
        function a() {
            p || (c.currentSlide && angular.isString(r) && !e.noTransition && n.$element ? (n.$element.addClass(r), n.$element[0].offsetWidth, angular.forEach(u, function(e) {
                angular.extend(e, {
                    direction: "",
                    entering: !1,
                    leaving: !1,
                    active: !1
                })
            }), angular.extend(n, {
                direction: r,
                active: !0,
                entering: !0
            }), angular.extend(c.currentSlide || {}, {
                direction: r,
                leaving: !0
            }), e.$currentTransition = i(n.$element, {}), function(t, n) {
                e.$currentTransition.then(function() {
                    s(t, n)
                }, function() {
                    s(t, n)
                })
            }(n, c.currentSlide)) : s(n, c.currentSlide), c.currentSlide = n, d = l, o())
        }

        function s(t, n) {
            angular.extend(t, {
                direction: "",
                active: !0,
                leaving: !1,
                entering: !1
            }), angular.extend(n || {}, {
                direction: "",
                active: !1,
                leaving: !1,
                entering: !1
            }), e.$currentTransition = null
        }
        var l = u.indexOf(n);
        void 0 === r && (r = l > d ? "next" : "prev"), n && n !== c.currentSlide && (e.$currentTransition ? (e.$currentTransition.cancel(), t(a)) : a())
    }, e.$on("$destroy", function() {
        p = !0
    }), c.indexOfSlide = function(e) {
        return u.indexOf(e)
    }, e.next = function() {
        var t = (d + 1) % u.length;
        return e.$currentTransition ? void 0 : c.select(u[t], "next")
    }, e.prev = function() {
        var t = 0 > d - 1 ? u.length - 1 : d - 1;
        return e.$currentTransition ? void 0 : c.select(u[t], "prev")
    }, e.isActive = function(e) {
        return c.currentSlide === e
    }, e.$watch("interval", o), e.$on("$destroy", r), e.play = function() {
        l || (l = !0, o())
    }, e.pause = function() {
        e.noPause || (l = !1, r())
    }, c.addSlide = function(t, n) {
        t.$element = n, u.push(t), 1 === u.length || t.active ? (c.select(u[u.length - 1]), 1 == u.length && e.play()) : t.active = !1
    }, c.removeSlide = function(e) {
        var t = u.indexOf(e);
        u.splice(t, 1), u.length > 0 && e.active ? c.select(t >= u.length ? u[t - 1] : u[t]) : d > t && d--
    }
}]).directive("carousel", [function() {
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        controller: "CarouselController",
        require: "carousel",
        templateUrl: "template/carousel/carousel.html",
        scope: {
            interval: "=",
            noTransition: "=",
            noPause: "="
        }
    }
}]).directive("slide", function() {
    return {
        require: "^carousel",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: "template/carousel/slide.html",
        scope: {
            active: "=?"
        },
        link: function(e, t, n, i) {
            i.addSlide(e, t), e.$on("$destroy", function() {
                i.removeSlide(e)
            }), e.$watch("active", function(t) {
                t && i.select(e)
            })
        }
    }
}), angular.module("ui.bootstrap.dateparser", []).service("dateParser", ["$locale", "orderByFilter", function(e, t) {
    function n(e) {
        var n = [],
            i = e.split("");
        return angular.forEach(o, function(t, o) {
            var r = e.indexOf(o);
            if (r > -1) {
                e = e.split(""), i[r] = "(" + t.regex + ")", e[r] = "$";
                for (var a = r + 1, s = r + o.length; s > a; a++) i[a] = "", e[a] = "$";
                e = e.join(""), n.push({
                    index: r,
                    apply: t.apply
                })
            }
        }), {
            regex: new RegExp("^" + i.join("") + "$"),
            map: t(n, "index")
        }
    }

    function i(e, t, n) {
        return 1 === t && n > 28 ? 29 === n && (e % 4 === 0 && e % 100 !== 0 || e % 400 === 0) : 3 !== t && 5 !== t && 8 !== t && 10 !== t || 31 > n
    }
    this.parsers = {};
    var o = {
        yyyy: {
            regex: "\\d{4}",
            apply: function(e) {
                this.year = +e
            }
        },
        yy: {
            regex: "\\d{2}",
            apply: function(e) {
                this.year = +e + 2e3
            }
        },
        y: {
            regex: "\\d{1,4}",
            apply: function(e) {
                this.year = +e
            }
        },
        MMMM: {
            regex: e.DATETIME_FORMATS.MONTH.join("|"),
            apply: function(t) {
                this.month = e.DATETIME_FORMATS.MONTH.indexOf(t)
            }
        },
        MMM: {
            regex: e.DATETIME_FORMATS.SHORTMONTH.join("|"),
            apply: function(t) {
                this.month = e.DATETIME_FORMATS.SHORTMONTH.indexOf(t)
            }
        },
        MM: {
            regex: "0[1-9]|1[0-2]",
            apply: function(e) {
                this.month = e - 1
            }
        },
        M: {
            regex: "[1-9]|1[0-2]",
            apply: function(e) {
                this.month = e - 1
            }
        },
        dd: {
            regex: "[0-2][0-9]{1}|3[0-1]{1}",
            apply: function(e) {
                this.date = +e
            }
        },
        d: {
            regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
            apply: function(e) {
                this.date = +e
            }
        },
        EEEE: {
            regex: e.DATETIME_FORMATS.DAY.join("|")
        },
        EEE: {
            regex: e.DATETIME_FORMATS.SHORTDAY.join("|")
        }
    };
    this.parse = function(t, o) {
        if (!angular.isString(t) || !o) return t;
        o = e.DATETIME_FORMATS[o] || o, this.parsers[o] || (this.parsers[o] = n(o));
        var r = this.parsers[o],
            a = r.regex,
            s = r.map,
            l = t.match(a);
        if (l && l.length) {
            for (var c, u = {
                    year: 1900,
                    month: 0,
                    date: 1,
                    hours: 0
                }, d = 1, p = l.length; p > d; d++) {
                var f = s[d - 1];
                f.apply && f.apply.call(u, l[d])
            }
            return i(u.year, u.month, u.date) && (c = new Date(u.year, u.month, u.date, u.hours)), c
        }
    }
}]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function(e, t) {
    function n(e, n) {
        return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n]
    }

    function i(e) {
        return "static" === (n(e, "position") || "static")
    }
    var o = function r(t) {
        for (var n = e[0], r = t.offsetParent || n; r && r !== n && i(r);) r = r.offsetParent;
        return r || n
    };
    return {
        position: function(t) {
            var n = this.offset(t),
                i = {
                    top: 0,
                    left: 0
                },
                r = o(t[0]);
            r != e[0] && (i = this.offset(angular.element(r)), i.top += r.clientTop - r.scrollTop, i.left += r.clientLeft - r.scrollLeft);
            var a = t[0].getBoundingClientRect();
            return {
                width: a.width || t.prop("offsetWidth"),
                height: a.height || t.prop("offsetHeight"),
                top: n.top - i.top,
                left: n.left - i.left
            }
        },
        offset: function(n) {
            var i = n[0].getBoundingClientRect();
            return {
                width: i.width || n.prop("offsetWidth"),
                height: i.height || n.prop("offsetHeight"),
                top: i.top + (t.pageYOffset || e[0].documentElement.scrollTop),
                left: i.left + (t.pageXOffset || e[0].documentElement.scrollLeft)
            }
        },
        positionElements: function(e, t, n, i) {
            var o, r, a, s, l = n.split("-"),
                c = l[0],
                u = l[1] || "center";
            o = i ? this.offset(e) : this.position(e), r = t.prop("offsetWidth"), a = t.prop("offsetHeight");
            var d = {
                    center: function() {
                        return o.left + o.width / 2 - r / 2
                    },
                    left: function() {
                        return o.left
                    },
                    right: function() {
                        return o.left + o.width
                    }
                },
                p = {
                    center: function() {
                        return o.top + o.height / 2 - a / 2
                    },
                    top: function() {
                        return o.top
                    },
                    bottom: function() {
                        return o.top + o.height
                    }
                };
            switch (c) {
                case "right":
                    s = {
                        top: p[u](),
                        left: d[c]()
                    };
                    break;
                case "left":
                    s = {
                        top: p[u](),
                        left: o.left - r
                    };
                    break;
                case "bottom":
                    s = {
                        top: p[c](),
                        left: d[u]()
                    };
                    break;
                default:
                    s = {
                        top: o.top - a,
                        left: d[u]()
                    }
            }
            return s
        }
    }
}]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).constant("datepickerConfig", {
    formatDay: "dd",
    formatMonth: "MMMM",
    formatYear: "yyyy",
    formatDayHeader: "EEE",
    formatDayTitle: "MMMM yyyy",
    formatMonthTitle: "yyyy",
    datepickerMode: "day",
    minMode: "day",
    maxMode: "year",
    showWeeks: !0,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null
}).controller("DatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig", function(e, t, n, i, o, r, a, s) {
    var l = this,
        c = {
            $setViewValue: angular.noop
        };
    this.modes = ["day", "month", "year"], angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange"], function(n, o) {
        l[n] = angular.isDefined(t[n]) ? 8 > o ? i(t[n])(e.$parent) : e.$parent.$eval(t[n]) : s[n]
    }), angular.forEach(["minDate", "maxDate"], function(i) {
        t[i] ? e.$parent.$watch(n(t[i]), function(e) {
            l[i] = e ? new Date(e) : null, l.refreshView()
        }) : l[i] = s[i] ? new Date(s[i]) : null
    }), e.datepickerMode = e.datepickerMode || s.datepickerMode, e.uniqueId = "datepicker-" + e.$id + "-" + Math.floor(1e4 * Math.random()), this.activeDate = angular.isDefined(t.initDate) ? e.$parent.$eval(t.initDate) : new Date, e.isActive = function(t) {
        return 0 === l.compare(t.date, l.activeDate) && (e.activeDateId = t.uid, !0)
    }, this.init = function(e) {
        c = e, c.$render = function() {
            l.render()
        }
    }, this.render = function() {
        if (c.$modelValue) {
            var e = new Date(c.$modelValue),
                t = !isNaN(e);
            t ? this.activeDate = e : r.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), c.$setValidity("date", t)
        }
        this.refreshView()
    }, this.refreshView = function() {
        if (this.element) {
            this._refreshView();
            var e = c.$modelValue ? new Date(c.$modelValue) : null;
            c.$setValidity("date-disabled", !e || this.element && !this.isDisabled(e))
        }
    }, this.createDateObject = function(e, t) {
        var n = c.$modelValue ? new Date(c.$modelValue) : null;
        return {
            date: e,
            label: a(e, t),
            selected: n && 0 === this.compare(e, n),
            disabled: this.isDisabled(e),
            current: 0 === this.compare(e, new Date)
        }
    }, this.isDisabled = function(n) {
        return this.minDate && this.compare(n, this.minDate) < 0 || this.maxDate && this.compare(n, this.maxDate) > 0 || t.dateDisabled && e.dateDisabled({
            date: n,
            mode: e.datepickerMode
        })
    }, this.split = function(e, t) {
        for (var n = []; e.length > 0;) n.push(e.splice(0, t));
        return n
    }, e.select = function(t) {
        if (e.datepickerMode === l.minMode) {
            var n = c.$modelValue ? new Date(c.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
            n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), c.$setViewValue(n), c.$render()
        } else l.activeDate = t, e.datepickerMode = l.modes[l.modes.indexOf(e.datepickerMode) - 1]
    }, e.move = function(e) {
        var t = l.activeDate.getFullYear() + e * (l.step.years || 0),
            n = l.activeDate.getMonth() + e * (l.step.months || 0);
        l.activeDate.setFullYear(t, n, 1), l.refreshView()
    }, e.toggleMode = function(t) {
        t = t || 1, e.datepickerMode === l.maxMode && 1 === t || e.datepickerMode === l.minMode && -1 === t || (e.datepickerMode = l.modes[l.modes.indexOf(e.datepickerMode) + t])
    }, e.keys = {
        13: "enter",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var u = function() {
        o(function() {
            l.element[0].focus()
        }, 0, !1)
    };
    e.$on("datepicker.focus", u), e.keydown = function(t) {
        var n = e.keys[t.which];
        if (n && !t.shiftKey && !t.altKey)
            if (t.preventDefault(), t.stopPropagation(), "enter" === n || "space" === n) {
                if (l.isDisabled(l.activeDate)) return;
                e.select(l.activeDate), u()
            } else !t.ctrlKey || "up" !== n && "down" !== n ? (l.handleKeyDown(n, t), l.refreshView()) : (e.toggleMode("up" === n ? 1 : -1), u())
    }
}]).directive("datepicker", function() {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/datepicker.html",
        scope: {
            datepickerMode: "=?",
            dateDisabled: "&"
        },
        require: ["datepicker", "?^ngModel"],
        controller: "DatepickerController",
        link: function(e, t, n, i) {
            var o = i[0],
                r = i[1];
            r && o.init(r)
        }
    }
}).directive("daypicker", ["dateFilter", function(e) {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/day.html",
        require: "^datepicker",
        link: function(t, n, i, o) {
            function r(e, t) {
                return 1 !== t || e % 4 !== 0 || e % 100 === 0 && e % 400 !== 0 ? l[t] : 29
            }

            function a(e, t) {
                var n = new Array(t),
                    i = new Date(e),
                    o = 0;
                for (i.setHours(12); t > o;) n[o++] = new Date(i), i.setDate(i.getDate() + 1);
                return n
            }

            function s(e) {
                var t = new Date(e);
                t.setDate(t.getDate() + 4 - (t.getDay() || 7));
                var n = t.getTime();
                return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
            }
            t.showWeeks = o.showWeeks, o.step = {
                months: 1
            }, o.element = n;
            var l = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            o._refreshView = function() {
                var n = o.activeDate.getFullYear(),
                    i = o.activeDate.getMonth(),
                    r = new Date(n, i, 1),
                    l = o.startingDay - r.getDay(),
                    c = l > 0 ? 7 - l : -l,
                    u = new Date(r);
                c > 0 && u.setDate(-c + 1);
                for (var d = a(u, 42), p = 0; 42 > p; p++) d[p] = angular.extend(o.createDateObject(d[p], o.formatDay), {
                    secondary: d[p].getMonth() !== i,
                    uid: t.uniqueId + "-" + p
                });
                t.labels = new Array(7);
                for (var f = 0; 7 > f; f++) t.labels[f] = {
                    abbr: e(d[f].date, o.formatDayHeader),
                    full: e(d[f].date, "EEEE")
                };
                if (t.title = e(o.activeDate, o.formatDayTitle), t.rows = o.split(d, 7), t.showWeeks) {
                    t.weekNumbers = [];
                    for (var h = s(t.rows[0][0].date), g = t.rows.length; t.weekNumbers.push(h++) < g;);
                }
            }, o.compare = function(e, t) {
                return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate())
            }, o.handleKeyDown = function(e) {
                var t = o.activeDate.getDate();
                if ("left" === e) t -= 1;
                else if ("up" === e) t -= 7;
                else if ("right" === e) t += 1;
                else if ("down" === e) t += 7;
                else if ("pageup" === e || "pagedown" === e) {
                    var n = o.activeDate.getMonth() + ("pageup" === e ? -1 : 1);
                    o.activeDate.setMonth(n, 1), t = Math.min(r(o.activeDate.getFullYear(), o.activeDate.getMonth()), t)
                } else "home" === e ? t = 1 : "end" === e && (t = r(o.activeDate.getFullYear(), o.activeDate.getMonth()));
                o.activeDate.setDate(t)
            }, o.refreshView()
        }
    }
}]).directive("monthpicker", ["dateFilter", function(e) {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/month.html",
        require: "^datepicker",
        link: function(t, n, i, o) {
            o.step = {
                years: 1
            }, o.element = n, o._refreshView = function() {
                for (var n = new Array(12), i = o.activeDate.getFullYear(), r = 0; 12 > r; r++) n[r] = angular.extend(o.createDateObject(new Date(i, r, 1), o.formatMonth), {
                    uid: t.uniqueId + "-" + r
                });
                t.title = e(o.activeDate, o.formatMonthTitle), t.rows = o.split(n, 3)
            }, o.compare = function(e, t) {
                return new Date(e.getFullYear(), e.getMonth()) - new Date(t.getFullYear(), t.getMonth())
            }, o.handleKeyDown = function(e) {
                var t = o.activeDate.getMonth();
                if ("left" === e) t -= 1;
                else if ("up" === e) t -= 3;
                else if ("right" === e) t += 1;
                else if ("down" === e) t += 3;
                else if ("pageup" === e || "pagedown" === e) {
                    var n = o.activeDate.getFullYear() + ("pageup" === e ? -1 : 1);
                    o.activeDate.setFullYear(n)
                } else "home" === e ? t = 0 : "end" === e && (t = 11);
                o.activeDate.setMonth(t)
            }, o.refreshView()
        }
    }
}]).directive("yearpicker", ["dateFilter", function() {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/year.html",
        require: "^datepicker",
        link: function(e, t, n, i) {
            function o(e) {
                return parseInt((e - 1) / r, 10) * r + 1
            }
            var r = i.yearRange;
            i.step = {
                years: r
            }, i.element = t, i._refreshView = function() {
                for (var t = new Array(r), n = 0, a = o(i.activeDate.getFullYear()); r > n; n++) t[n] = angular.extend(i.createDateObject(new Date(a + n, 0, 1), i.formatYear), {
                    uid: e.uniqueId + "-" + n
                });
                e.title = [t[0].label, t[r - 1].label].join(" - "), e.rows = i.split(t, 5)
            }, i.compare = function(e, t) {
                return e.getFullYear() - t.getFullYear()
            }, i.handleKeyDown = function(e) {
                var t = i.activeDate.getFullYear();
                "left" === e ? t -= 1 : "up" === e ? t -= 5 : "right" === e ? t += 1 : "down" === e ? t += 5 : "pageup" === e || "pagedown" === e ? t += ("pageup" === e ? -1 : 1) * i.step.years : "home" === e ? t = o(i.activeDate.getFullYear()) : "end" === e && (t = o(i.activeDate.getFullYear()) + r - 1), i.activeDate.setFullYear(t)
            }, i.refreshView()
        }
    }
}]).constant("datepickerPopupConfig", {
    datepickerPopup: "yyyy-MM-dd",
    currentText: "Today",
    clearText: "Clear",
    closeText: "Done",
    closeOnDateSelection: !0,
    appendToBody: !1,
    showButtonBar: !0
}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig", function(e, t, n, i, o, r, a) {
    return {
        restrict: "EA",
        require: "ngModel",
        scope: {
            isOpen: "=?",
            currentText: "@",
            clearText: "@",
            closeText: "@",
            dateDisabled: "&"
        },
        link: function(s, l, c, u) {
            function d(e) {
                return e.replace(/([A-Z])/g, function(e) {
                    return "-" + e.toLowerCase()
                })
            }

            function p(e) {
                if (e) {
                    if (angular.isDate(e) && !isNaN(e)) return u.$setValidity("date", !0), e;
                    if (angular.isString(e)) {
                        var t = r.parse(e, f) || new Date(e);
                        return isNaN(t) ? void u.$setValidity("date", !1) : (u.$setValidity("date", !0), t)
                    }
                    return void u.$setValidity("date", !1)
                }
                return u.$setValidity("date", !0), null
            }
            var f, h = angular.isDefined(c.closeOnDateSelection) ? s.$parent.$eval(c.closeOnDateSelection) : a.closeOnDateSelection,
                g = angular.isDefined(c.datepickerAppendToBody) ? s.$parent.$eval(c.datepickerAppendToBody) : a.appendToBody;
            s.showButtonBar = angular.isDefined(c.showButtonBar) ? s.$parent.$eval(c.showButtonBar) : a.showButtonBar, s.getText = function(e) {
                return s[e + "Text"] || a[e + "Text"]
            }, c.$observe("datepickerPopup", function(e) {
                f = e || a.datepickerPopup, u.$render()
            });
            var v = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
            v.attr({
                "ng-model": "date",
                "ng-change": "dateSelection()"
            });
            var m = angular.element(v.children()[0]);
            c.datepickerOptions && angular.forEach(s.$parent.$eval(c.datepickerOptions), function(e, t) {
                m.attr(d(t), e)
            }), s.watchData = {}, angular.forEach(["minDate", "maxDate", "datepickerMode"], function(e) {
                if (c[e]) {
                    var n = t(c[e]);
                    if (s.$parent.$watch(n, function(t) {
                            s.watchData[e] = t
                        }), m.attr(d(e), "watchData." + e), "datepickerMode" === e) {
                        var i = n.assign;
                        s.$watch("watchData." + e, function(e, t) {
                            e !== t && i(s.$parent, e)
                        })
                    }
                }
            }), c.dateDisabled && m.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), u.$parsers.unshift(p), s.dateSelection = function(e) {
                angular.isDefined(e) && (s.date = e), u.$setViewValue(s.date), u.$render(), h && (s.isOpen = !1, l[0].focus())
            }, l.bind("input change keyup", function() {
                s.$apply(function() {
                    s.date = u.$modelValue
                })
            }), u.$render = function() {
                var e = u.$viewValue ? o(u.$viewValue, f) : "";
                l.val(e), s.date = p(u.$modelValue)
            };
            var y = function(e) {
                    s.isOpen && e.target !== l[0] && s.$apply(function() {
                        s.isOpen = !1
                    })
                },
                b = function(e) {
                    s.keydown(e)
                };
            l.bind("keydown", b), s.keydown = function(e) {
                27 === e.which ? (e.preventDefault(), e.stopPropagation(), s.close()) : 40 !== e.which || s.isOpen || (s.isOpen = !0)
            }, s.$watch("isOpen", function(e) {
                e ? (s.$broadcast("datepicker.focus"), s.position = g ? i.offset(l) : i.position(l), s.position.top = s.position.top + l.prop("offsetHeight"), n.bind("click", y)) : n.unbind("click", y)
            }), s.select = function(e) {
                if ("today" === e) {
                    var t = new Date;
                    angular.isDate(u.$modelValue) ? (e = new Date(u.$modelValue), e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate())) : e = new Date(t.setHours(0, 0, 0, 0))
                }
                s.dateSelection(e)
            }, s.close = function() {
                s.isOpen = !1, l[0].focus()
            };
            var w = e(v)(s);
            v.remove(), g ? n.find("body").append(w) : l.after(w), s.$on("$destroy", function() {
                w.remove(), l.unbind("keydown", b), n.unbind("click", y)
            })
        }
    }
}]).directive("datepickerPopupWrap", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        templateUrl: "template/datepicker/popup.html",
        link: function(e, t) {
            t.bind("click", function(e) {
                e.preventDefault(), e.stopPropagation()
            })
        }
    }
}), angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {
    openClass: "open"
}).service("dropdownService", ["$document", function(e) {
    var t = null;
    this.open = function(o) {
        t || (e.bind("click", n), e.bind("keydown", i)), t && t !== o && (t.isOpen = !1), t = o
    }, this.close = function(o) {
        t === o && (t = null, e.unbind("click", n), e.unbind("keydown", i))
    };
    var n = function o(e) {
            if (t) {
                var o = t.getToggleElement();
                e && o && o[0].contains(e.target) || t.$apply(function() {
                    t.isOpen = !1
                })
            }
        },
        i = function(e) {
            27 === e.which && (t.focusToggleElement(), n())
        }
}]).controller("DropdownController", ["$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate", function(e, t, n, i, o, r) {
    var a, s = this,
        l = e.$new(),
        c = i.openClass,
        u = angular.noop,
        d = t.onToggle ? n(t.onToggle) : angular.noop;
    this.init = function(i) {
        s.$element = i, t.isOpen && (a = n(t.isOpen), u = a.assign, e.$watch(a, function(e) {
            l.isOpen = !!e
        }))
    }, this.toggle = function(e) {
        return l.isOpen = arguments.length ? !!e : !l.isOpen
    }, this.isOpen = function() {
        return l.isOpen
    }, l.getToggleElement = function() {
        return s.toggleElement
    }, l.focusToggleElement = function() {
        s.toggleElement && s.toggleElement[0].focus()
    }, l.$watch("isOpen", function(t, n) {
        r[t ? "addClass" : "removeClass"](s.$element, c), t ? (l.focusToggleElement(), o.open(l)) : o.close(l), u(e, t), angular.isDefined(t) && t !== n && d(e, {
            open: !!t
        })
    }), e.$on("$locationChangeSuccess", function() {
        l.isOpen = !1
    }), e.$on("$destroy", function() {
        l.$destroy()
    })
}]).directive("dropdown", function() {
    return {
        controller: "DropdownController",
        link: function(e, t, n, i) {
            i.init(t)
        }
    }
}).directive("dropdownToggle", function() {
    return {
        require: "?^dropdown",
        link: function(e, t, n, i) {
            if (i) {
                i.toggleElement = t;
                var o = function(o) {
                    o.preventDefault(), t.hasClass("disabled") || n.disabled || e.$apply(function() {
                        i.toggle()
                    })
                };
                t.bind("click", o), t.attr({
                    "aria-haspopup": !0,
                    "aria-expanded": !1
                }), e.$watch(i.isOpen, function(e) {
                    t.attr("aria-expanded", !!e)
                }), e.$on("$destroy", function() {
                    t.unbind("click", o)
                })
            }
        }
    }
}), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function() {
    return {
        createNew: function() {
            var e = [];
            return {
                add: function(t, n) {
                    e.push({
                        key: t,
                        value: n
                    })
                },
                get: function(t) {
                    for (var n = 0; n < e.length; n++)
                        if (t == e[n].key) return e[n]
                },
                keys: function() {
                    for (var t = [], n = 0; n < e.length; n++) t.push(e[n].key);
                    return t
                },
                top: function() {
                    return e[e.length - 1]
                },
                remove: function(t) {
                    for (var n = -1, i = 0; i < e.length; i++)
                        if (t == e[i].key) {
                            n = i;
                            break
                        }
                    return e.splice(n, 1)[0]
                },
                removeTop: function() {
                    return e.splice(e.length - 1, 1)[0]
                },
                length: function() {
                    return e.length
                }
            }
        }
    }
}).directive("modalBackdrop", ["$timeout", function(e) {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/modal/backdrop.html",
        link: function(t, n, i) {
            t.backdropClass = i.backdropClass || "", t.animate = !1, e(function() {
                t.animate = !0
            })
        }
    }
}]).directive("modalWindow", ["$modalStack", "$timeout", function(e, t) {
    return {
        restrict: "EA",
        scope: {
            index: "@",
            animate: "="
        },
        replace: !0,
        transclude: !0,
        templateUrl: function(e, t) {
            return t.templateUrl || "template/modal/window.html"
        },
        link: function(n, i, o) {
            i.addClass(o.windowClass || ""), n.size = o.size, t(function() {
                n.animate = !0, i[0].querySelectorAll("[autofocus]").length || i[0].focus()
            }), n.close = function(t) {
                var n = e.getTop();
                n && n.value.backdrop && "static" != n.value.backdrop && t.target === t.currentTarget && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, "backdrop click"))
            }
        }
    }
}]).directive("modalTransclude", function() {
    return {
        link: function(e, t, n, i, o) {
            o(e.$parent, function(e) {
                t.empty(), t.append(e)
            })
        }
    }
}).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function(e, t, n, i, o, r) {
    function a() {
        for (var e = -1, t = f.keys(), n = 0; n < t.length; n++) f.get(t[n]).value.backdrop && (e = n);
        return e
    }

    function s(e) {
        var t = n.find("body").eq(0),
            i = f.get(e).value;
        f.remove(e), c(i.modalDomEl, i.modalScope, 300, function() {
            i.modalScope.$destroy(), t.toggleClass(p, f.length() > 0), l()
        })
    }

    function l() {
        if (u && -1 == a()) {
            var e = d;
            c(u, d, 150, function() {
                e.$destroy(), e = null
            }), u = void 0, d = void 0
        }
    }

    function c(n, i, o, r) {
        function a() {
            a.done || (a.done = !0, n.remove(), r && r())
        }
        i.animate = !1;
        var s = e.transitionEndEventName;
        if (s) {
            var l = t(a, o);
            n.bind(s, function() {
                t.cancel(l), a(), i.$apply()
            })
        } else t(a)
    }
    var u, d, p = "modal-open",
        f = r.createNew(),
        h = {};
    return o.$watch(a, function(e) {
        d && (d.index = e)
    }), n.bind("keydown", function(e) {
        var t;
        27 === e.which && (t = f.top(), t && t.value.keyboard && (e.preventDefault(), o.$apply(function() {
            h.dismiss(t.key, "escape key press")
        })))
    }), h.open = function(e, t) {
        f.add(e, {
            deferred: t.deferred,
            modalScope: t.scope,
            backdrop: t.backdrop,
            keyboard: t.keyboard
        });
        var r = n.find("body").eq(0),
            s = a();
        if (s >= 0 && !u) {
            d = o.$new(!0), d.index = s;
            var l = angular.element("<div modal-backdrop></div>");
            l.attr("backdrop-class", t.backdropClass), u = i(l)(d), r.append(u)
        }
        var c = angular.element("<div modal-window></div>");
        c.attr({
            "template-url": t.windowTemplateUrl,
            "window-class": t.windowClass,
            size: t.size,
            index: f.length() - 1,
            animate: "animate"
        }).html(t.content);
        var h = i(c)(t.scope);
        f.top().value.modalDomEl = h, r.append(h), r.addClass(p)
    }, h.close = function(e, t) {
        var n = f.get(e);
        n && (n.value.deferred.resolve(t), s(e))
    }, h.dismiss = function(e, t) {
        var n = f.get(e);
        n && (n.value.deferred.reject(t), s(e))
    }, h.dismissAll = function(e) {
        for (var t = this.getTop(); t;) this.dismiss(t.key, e), t = this.getTop()
    }, h.getTop = function() {
        return f.top()
    }, h
}]).provider("$modal", function() {
    var e = {
        options: {
            backdrop: !0,
            keyboard: !0
        },
        $get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function(t, n, i, o, r, a, s) {
            function l(e) {
                return e.template ? i.when(e.template) : o.get(angular.isFunction(e.templateUrl) ? e.templateUrl() : e.templateUrl, {
                    cache: r
                }).then(function(e) {
                    return e.data
                })
            }

            function c(e) {
                var n = [];
                return angular.forEach(e, function(e) {
                    (angular.isFunction(e) || angular.isArray(e)) && n.push(i.when(t.invoke(e)))
                }), n
            }
            var u = {};
            return u.open = function(t) {
                var o = i.defer(),
                    r = i.defer(),
                    u = {
                        result: o.promise,
                        opened: r.promise,
                        close: function(e) {
                            s.close(u, e)
                        },
                        dismiss: function(e) {
                            s.dismiss(u, e)
                        }
                    };
                if (t = angular.extend({}, e.options, t), t.resolve = t.resolve || {}, !t.template && !t.templateUrl) throw new Error("One of template or templateUrl options is required.");
                var d = i.all([l(t)].concat(c(t.resolve)));
                return d.then(function(e) {
                    var i = (t.scope || n).$new();
                    i.$close = u.close, i.$dismiss = u.dismiss;
                    var r, l = {},
                        c = 1;
                    t.controller && (l.$scope = i, l.$modalInstance = u, angular.forEach(t.resolve, function(t, n) {
                        l[n] = e[c++]
                    }), r = a(t.controller, l), t.controllerAs && (i[t.controllerAs] = r)), s.open(u, {
                        scope: i,
                        deferred: o,
                        content: e[0],
                        backdrop: t.backdrop,
                        keyboard: t.keyboard,
                        backdropClass: t.backdropClass,
                        windowClass: t.windowClass,
                        windowTemplateUrl: t.windowTemplateUrl,
                        size: t.size
                    })
                }, function(e) {
                    o.reject(e)
                }), d.then(function() {
                    r.resolve(!0)
                }, function() {
                    r.reject(!1)
                }), u
            }, u
        }]
    };
    return e
}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", function(e, t, n) {
    var i = this,
        o = {
            $setViewValue: angular.noop
        },
        r = t.numPages ? n(t.numPages).assign : angular.noop;
    this.init = function(r, a) {
        o = r, this.config = a, o.$render = function() {
            i.render()
        }, t.itemsPerPage ? e.$parent.$watch(n(t.itemsPerPage), function(t) {
            i.itemsPerPage = parseInt(t, 10), e.totalPages = i.calculateTotalPages()
        }) : this.itemsPerPage = a.itemsPerPage
    }, this.calculateTotalPages = function() {
        var t = this.itemsPerPage < 1 ? 1 : Math.ceil(e.totalItems / this.itemsPerPage);
        return Math.max(t || 0, 1)
    }, this.render = function() {
        e.page = parseInt(o.$viewValue, 10) || 1
    }, e.selectPage = function(t) {
        e.page !== t && t > 0 && t <= e.totalPages && (o.$setViewValue(t), o.$render())
    }, e.getText = function(t) {
        return e[t + "Text"] || i.config[t + "Text"]
    }, e.noPrevious = function() {
        return 1 === e.page
    }, e.noNext = function() {
        return e.page === e.totalPages
    }, e.$watch("totalItems", function() {
        e.totalPages = i.calculateTotalPages()
    }), e.$watch("totalPages", function(t) {
        r(e.$parent, t), e.page > t ? e.selectPage(t) : o.$render()
    })
}]).constant("paginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: !1,
    directionLinks: !0,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: !0
}).directive("pagination", ["$parse", "paginationConfig", function(e, t) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@"
        },
        require: ["pagination", "?ngModel"],
        controller: "PaginationController",
        templateUrl: "template/pagination/pagination.html",
        replace: !0,
        link: function(n, i, o, r) {
            function a(e, t, n) {
                return {
                    number: e,
                    text: t,
                    active: n
                }
            }

            function s(e, t) {
                var n = [],
                    i = 1,
                    o = t,
                    r = angular.isDefined(u) && t > u;
                r && (d ? (i = Math.max(e - Math.floor(u / 2), 1), o = i + u - 1, o > t && (o = t, i = o - u + 1)) : (i = (Math.ceil(e / u) - 1) * u + 1, o = Math.min(i + u - 1, t)));
                for (var s = i; o >= s; s++) {
                    var l = a(s, s, s === e);
                    n.push(l)
                }
                if (r && !d) {
                    if (i > 1) {
                        var c = a(i - 1, "...", !1);
                        n.unshift(c)
                    }
                    if (t > o) {
                        var p = a(o + 1, "...", !1);
                        n.push(p)
                    }
                }
                return n
            }
            var l = r[0],
                c = r[1];
            if (c) {
                var u = angular.isDefined(o.maxSize) ? n.$parent.$eval(o.maxSize) : t.maxSize,
                    d = angular.isDefined(o.rotate) ? n.$parent.$eval(o.rotate) : t.rotate;
                n.boundaryLinks = angular.isDefined(o.boundaryLinks) ? n.$parent.$eval(o.boundaryLinks) : t.boundaryLinks, n.directionLinks = angular.isDefined(o.directionLinks) ? n.$parent.$eval(o.directionLinks) : t.directionLinks, l.init(c, t), o.maxSize && n.$parent.$watch(e(o.maxSize), function(e) {
                    u = parseInt(e, 10), l.render()
                });
                var p = l.render;
                l.render = function() {
                    p(), n.page > 0 && n.page <= n.totalPages && (n.pages = s(n.page, n.totalPages))
                }
            }
        }
    }
}]).constant("pagerConfig", {
    itemsPerPage: 10,
    previousText: "Â« Previous",
    nextText: "Next Â»",
    align: !0
}).directive("pager", ["pagerConfig", function(e) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            previousText: "@",
            nextText: "@"
        },
        require: ["pager", "?ngModel"],
        controller: "PaginationController",
        templateUrl: "template/pagination/pager.html",
        replace: !0,
        link: function(t, n, i, o) {
            var r = o[0],
                a = o[1];
            a && (t.align = angular.isDefined(i.align) ? t.$parent.$eval(i.align) : e.align, r.init(a, e))
        }
    }
}]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function() {
    function e(e) {
        var t = /[A-Z]/g,
            n = "-";
        return e.replace(t, function(e, t) {
            return (t ? n : "") + e.toLowerCase()
        })
    }
    var t = {
            placement: "top",
            animation: !0,
            popupDelay: 0
        },
        n = {
            mouseenter: "mouseleave",
            click: "click",
            focus: "blur"
        },
        i = {};
    this.options = function(e) {
        angular.extend(i, e)
    }, this.setTriggers = function(e) {
        angular.extend(n, e)
    }, this.$get = ["$window", "$compile", "$timeout", "$document", "$position", "$interpolate", function(o, r, a, s, l, c) {
        return function(o, u, d) {
            function p(e) {
                var t = e || f.trigger || d,
                    i = n[t] || t;
                return {
                    show: t,
                    hide: i
                }
            }
            var f = angular.extend({}, t, i),
                h = e(o),
                g = c.startSymbol(),
                v = c.endSymbol(),
                m = "<div " + h + '-popup title="' + g + "title" + v + '" content="' + g + "content" + v + '" placement="' + g + "placement" + v + '" animation="animation" is-open="isOpen"></div>';
            return {
                restrict: "EA",
                compile: function() {
                    var e = r(m);
                    return function(t, n, i) {
                        function r() {
                            A.isOpen ? d() : c()
                        }

                        function c() {
                            (!E || t.$eval(i[u + "Enable"])) && (y(), A.popupDelay ? C || (C = a(h, A.popupDelay, !1), C.then(function(e) {
                                e()
                            })) : h()())
                        }

                        function d() {
                            t.$apply(function() {
                                g()
                            })
                        }

                        function h() {
                            return C = null, T && (a.cancel(T), T = null), A.content ? (v(), x.css({
                                top: 0,
                                left: 0,
                                display: "block"
                            }), A.$digest(), O(), A.isOpen = !0, A.$digest(), O) : angular.noop
                        }

                        function g() {
                            A.isOpen = !1, a.cancel(C), C = null, A.animation ? T || (T = a(m, 500)) : m()
                        }

                        function v() {
                            x && m(), $ = A.$new(), x = e($, function(e) {
                                S ? s.find("body").append(e) : n.after(e)
                            })
                        }

                        function m() {
                            T = null, x && (x.remove(), x = null), $ && ($.$destroy(), $ = null)
                        }

                        function y() {
                            b(), w()
                        }

                        function b() {
                            var e = i[u + "Placement"];
                            A.placement = angular.isDefined(e) ? e : f.placement
                        }

                        function w() {
                            var e = i[u + "PopupDelay"],
                                t = parseInt(e, 10);
                            A.popupDelay = isNaN(t) ? f.popupDelay : t
                        }

                        function k() {
                            var e = i[u + "Trigger"];
                            M(), D = p(e), D.show === D.hide ? n.bind(D.show, r) : (n.bind(D.show, c), n.bind(D.hide, d))
                        }
                        var x, $, T, C, S = !!angular.isDefined(f.appendToBody) && f.appendToBody,
                            D = p(void 0),
                            E = angular.isDefined(i[u + "Enable"]),
                            A = t.$new(!0),
                            O = function() {
                                var e = l.positionElements(n, x, A.placement, S);
                                e.top += "px", e.left += "px", x.css(e)
                            };
                        A.isOpen = !1, i.$observe(o, function(e) {
                            A.content = e, !e && A.isOpen && g()
                        }), i.$observe(u + "Title", function(e) {
                            A.title = e
                        });
                        var M = function() {
                            n.unbind(D.show, c), n.unbind(D.hide, d)
                        };
                        k();
                        var H = t.$eval(i[u + "Animation"]);
                        A.animation = angular.isDefined(H) ? !!H : f.animation;
                        var P = t.$eval(i[u + "AppendToBody"]);
                        S = angular.isDefined(P) ? P : S, S && t.$on("$locationChangeSuccess", function() {
                            A.isOpen && g()
                        }), t.$on("$destroy", function() {
                            a.cancel(T), a.cancel(C), M(), m(), A = null
                        })
                    }
                }
            }
        }
    }]
}).directive("tooltipPopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-popup.html"
    }
}).directive("tooltip", ["$tooltip", function(e) {
    return e("tooltip", "tooltip", "mouseenter")
}]).directive("tooltipHtmlUnsafePopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
    }
}).directive("tooltipHtmlUnsafe", ["$tooltip", function(e) {
    return e("tooltipHtmlUnsafe", "tooltip", "mouseenter")
}]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover.html"
    }
}).directive("popover", ["$tooltip", function(e) {
    return e("popover", "popover", "click")
}]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
    animate: !0,
    max: 100
}).controller("ProgressController", ["$scope", "$attrs", "progressConfig", function(e, t, n) {
    var i = this,
        o = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
    this.bars = [], e.max = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max, this.addBar = function(t, n) {
        o || n.css({
            transition: "none"
        }), this.bars.push(t), t.$watch("value", function(n) {
            t.percent = +(100 * n / e.max).toFixed(2)
        }), t.$on("$destroy", function() {
            n = null, i.removeBar(t)
        })
    }, this.removeBar = function(e) {
        this.bars.splice(this.bars.indexOf(e), 1)
    }
}]).directive("progress", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        require: "progress",
        scope: {},
        templateUrl: "template/progressbar/progress.html"
    }
}).directive("bar", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        require: "^progress",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/bar.html",
        link: function(e, t, n, i) {
            i.addBar(e, t)
        }
    }
}).directive("progressbar", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/progressbar.html",
        link: function(e, t, n, i) {
            i.addBar(e, angular.element(t.children()[0]))
        }
    }
}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
    max: 5,
    stateOn: null,
    stateOff: null
}).controller("RatingController", ["$scope", "$attrs", "ratingConfig", function(e, t, n) {
    var i = {
        $setViewValue: angular.noop
    };
    this.init = function(o) {
        i = o, i.$render = this.render, this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : n.stateOn, this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : n.stateOff;
        var r = angular.isDefined(t.ratingStates) ? e.$parent.$eval(t.ratingStates) : new Array(angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max);
        e.range = this.buildTemplateObjects(r)
    }, this.buildTemplateObjects = function(e) {
        for (var t = 0, n = e.length; n > t; t++) e[t] = angular.extend({
            index: t
        }, {
            stateOn: this.stateOn,
            stateOff: this.stateOff
        }, e[t]);
        return e
    }, e.rate = function(t) {
        !e.readonly && t >= 0 && t <= e.range.length && (i.$setViewValue(t), i.$render())
    }, e.enter = function(t) {
        e.readonly || (e.value = t), e.onHover({
            value: t
        })
    }, e.reset = function() {
        e.value = i.$viewValue, e.onLeave()
    }, e.onKeydown = function(t) {
        /(37|38|39|40)/.test(t.which) && (t.preventDefault(), t.stopPropagation(), e.rate(e.value + (38 === t.which || 39 === t.which ? 1 : -1)))
    }, this.render = function() {
        e.value = i.$viewValue
    }
}]).directive("rating", function() {
    return {
        restrict: "EA",
        require: ["rating", "ngModel"],
        scope: {
            readonly: "=?",
            onHover: "&",
            onLeave: "&"
        },
        controller: "RatingController",
        templateUrl: "template/rating/rating.html",
        replace: !0,
        link: function(e, t, n, i) {
            var o = i[0],
                r = i[1];
            r && o.init(r)
        }
    }
}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope", function(e) {
    var t = this,
        n = t.tabs = e.tabs = [];
    t.select = function(e) {
        angular.forEach(n, function(t) {
            t.active && t !== e && (t.active = !1, t.onDeselect())
        }), e.active = !0, e.onSelect()
    }, t.addTab = function(e) {
        n.push(e), 1 === n.length ? e.active = !0 : e.active && t.select(e)
    }, t.removeTab = function(e) {
        var o = n.indexOf(e);
        if (e.active && n.length > 1 && !i) {
            var r = o == n.length - 1 ? o - 1 : o + 1;
            t.select(n[r])
        }
        n.splice(o, 1)
    };
    var i;
    e.$on("$destroy", function() {
        i = !0
    })
}]).directive("tabset", function() {
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        scope: {
            type: "@"
        },
        controller: "TabsetController",
        templateUrl: "template/tabs/tabset.html",
        link: function(e, t, n) {
            e.vertical = !!angular.isDefined(n.vertical) && e.$parent.$eval(n.vertical), e.justified = !!angular.isDefined(n.justified) && e.$parent.$eval(n.justified)
        }
    }
}).directive("tab", ["$parse", function(e) {
    return {
        require: "^tabset",
        restrict: "EA",
        replace: !0,
        templateUrl: "template/tabs/tab.html",
        transclude: !0,
        scope: {
            active: "=?",
            heading: "@",
            onSelect: "&select",
            onDeselect: "&deselect"
        },
        controller: function() {},
        compile: function(t, n, i) {
            return function(t, n, o, r) {
                t.$watch("active", function(e) {
                    e && r.select(t)
                }), t.disabled = !1, o.disabled && t.$parent.$watch(e(o.disabled), function(e) {
                    t.disabled = !!e
                }), t.select = function() {
                    t.disabled || (t.active = !0)
                }, r.addTab(t), t.$on("$destroy", function() {
                    r.removeTab(t)
                }), t.$transcludeFn = i
            }
        }
    }
}]).directive("tabHeadingTransclude", [function() {
    return {
        restrict: "A",
        require: "^tab",
        link: function(e, t) {
            e.$watch("headingElement", function(e) {
                e && (t.html(""), t.append(e))
            })
        }
    }
}]).directive("tabContentTransclude", function() {
    function e(e) {
        return e.tagName && (e.hasAttribute("tab-heading") || e.hasAttribute("data-tab-heading") || "tab-heading" === e.tagName.toLowerCase() || "data-tab-heading" === e.tagName.toLowerCase())
    }
    return {
        restrict: "A",
        require: "^tabset",
        link: function(t, n, i) {
            var o = t.$eval(i.tabContentTransclude);
            o.$transcludeFn(o.$parent, function(t) {
                angular.forEach(t, function(t) {
                    e(t) ? o.headingElement = t : n.append(t)
                })
            })
        }
    }
}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: !0,
    meridians: null,
    readonlyInput: !1,
    mousewheel: !0
}).controller("TimepickerController", ["$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig", function(e, t, n, i, o, r) {
    function a() {
        var t = parseInt(e.hours, 10),
            n = e.showMeridian ? t > 0 && 13 > t : t >= 0 && 24 > t;
        return n ? (e.showMeridian && (12 === t && (t = 0), e.meridian === g[1] && (t += 12)), t) : void 0
    }

    function s() {
        var t = parseInt(e.minutes, 10);
        return t >= 0 && 60 > t ? t : void 0
    }

    function l(e) {
        return angular.isDefined(e) && e.toString().length < 2 ? "0" + e : e
    }

    function c(e) {
        u(), h.$setViewValue(new Date(f)), d(e)
    }

    function u() {
        h.$setValidity("time", !0), e.invalidHours = !1, e.invalidMinutes = !1
    }

    function d(t) {
        var n = f.getHours(),
            i = f.getMinutes();
        e.showMeridian && (n = 0 === n || 12 === n ? 12 : n % 12), e.hours = "h" === t ? n : l(n), e.minutes = "m" === t ? i : l(i), e.meridian = f.getHours() < 12 ? g[0] : g[1]
    }

    function p(e) {
        var t = new Date(f.getTime() + 6e4 * e);
        f.setHours(t.getHours(), t.getMinutes()), c()
    }
    var f = new Date,
        h = {
            $setViewValue: angular.noop
        },
        g = angular.isDefined(t.meridians) ? e.$parent.$eval(t.meridians) : r.meridians || o.DATETIME_FORMATS.AMPMS;
    this.init = function(n, i) {
        h = n, h.$render = this.render;
        var o = i.eq(0),
            a = i.eq(1),
            s = angular.isDefined(t.mousewheel) ? e.$parent.$eval(t.mousewheel) : r.mousewheel;
        s && this.setupMousewheelEvents(o, a), e.readonlyInput = angular.isDefined(t.readonlyInput) ? e.$parent.$eval(t.readonlyInput) : r.readonlyInput, this.setupInputEvents(o, a)
    };
    var v = r.hourStep;
    t.hourStep && e.$parent.$watch(n(t.hourStep), function(e) {
        v = parseInt(e, 10)
    });
    var m = r.minuteStep;
    t.minuteStep && e.$parent.$watch(n(t.minuteStep), function(e) {
        m = parseInt(e, 10)
    }), e.showMeridian = r.showMeridian, t.showMeridian && e.$parent.$watch(n(t.showMeridian), function(t) {
        if (e.showMeridian = !!t, h.$error.time) {
            var n = a(),
                i = s();
            angular.isDefined(n) && angular.isDefined(i) && (f.setHours(n), c())
        } else d()
    }), this.setupMousewheelEvents = function(t, n) {
        var i = function(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
            return e.detail || t > 0
        };
        t.bind("mousewheel wheel", function(t) {
            e.$apply(i(t) ? e.incrementHours() : e.decrementHours()), t.preventDefault()
        }), n.bind("mousewheel wheel", function(t) {
            e.$apply(i(t) ? e.incrementMinutes() : e.decrementMinutes()), t.preventDefault()
        })
    }, this.setupInputEvents = function(t, n) {
        if (e.readonlyInput) return e.updateHours = angular.noop, void(e.updateMinutes = angular.noop);
        var i = function(t, n) {
            h.$setViewValue(null), h.$setValidity("time", !1), angular.isDefined(t) && (e.invalidHours = t), angular.isDefined(n) && (e.invalidMinutes = n)
        };
        e.updateHours = function() {
            var e = a();
            angular.isDefined(e) ? (f.setHours(e), c("h")) : i(!0)
        }, t.bind("blur", function() {
            !e.invalidHours && e.hours < 10 && e.$apply(function() {
                e.hours = l(e.hours)
            })
        }), e.updateMinutes = function() {
            var e = s();
            angular.isDefined(e) ? (f.setMinutes(e), c("m")) : i(void 0, !0)
        }, n.bind("blur", function() {
            !e.invalidMinutes && e.minutes < 10 && e.$apply(function() {
                e.minutes = l(e.minutes)
            })
        })
    }, this.render = function() {
        var e = h.$modelValue ? new Date(h.$modelValue) : null;
        isNaN(e) ? (h.$setValidity("time", !1), i.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (e && (f = e), u(), d())
    }, e.incrementHours = function() {
        p(60 * v)
    }, e.decrementHours = function() {
        p(60 * -v)
    }, e.incrementMinutes = function() {
        p(m)
    }, e.decrementMinutes = function() {
        p(-m)
    }, e.toggleMeridian = function() {
        p(720 * (f.getHours() < 12 ? 1 : -1))
    }
}]).directive("timepicker", function() {
    return {
        restrict: "EA",
        require: ["timepicker", "?^ngModel"],
        controller: "TimepickerController",
        replace: !0,
        scope: {},
        templateUrl: "template/timepicker/timepicker.html",
        link: function(e, t, n, i) {
            var o = i[0],
                r = i[1];
            r && o.init(r, t.find("input"))
        }
    }
}), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse", function(e) {
    var t = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
        parse: function(n) {
            var i = n.match(t);
            if (!i) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + n + '".');
            return {
                itemName: i[3],
                source: e(i[4]),
                viewMapper: e(i[2] || i[1]),
                modelMapper: e(i[1])
            }
        }
    }
}]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function(e, t, n, i, o, r, a) {
    var s = [9, 13, 27, 38, 40];
    return {
        require: "ngModel",
        link: function(l, c, u, d) {
            var p, f = l.$eval(u.typeaheadMinLength) || 1,
                h = l.$eval(u.typeaheadWaitMs) || 0,
                g = l.$eval(u.typeaheadEditable) !== !1,
                v = t(u.typeaheadLoading).assign || angular.noop,
                m = t(u.typeaheadOnSelect),
                y = u.typeaheadInputFormatter ? t(u.typeaheadInputFormatter) : void 0,
                b = !!u.typeaheadAppendToBody && l.$eval(u.typeaheadAppendToBody),
                w = l.$eval(u.typeaheadFocusFirst) !== !1,
                k = t(u.ngModel).assign,
                x = a.parse(u.typeahead),
                $ = l.$new();
            l.$on("$destroy", function() {
                $.$destroy()
            });
            var T = "typeahead-" + $.$id + "-" + Math.floor(1e4 * Math.random());
            c.attr({
                "aria-autocomplete": "list",
                "aria-expanded": !1,
                "aria-owns": T
            });
            var C = angular.element("<div typeahead-popup></div>");
            C.attr({
                id: T,
                matches: "matches",
                active: "activeIdx",
                select: "select(activeIdx)",
                query: "query",
                position: "position"
            }), angular.isDefined(u.typeaheadTemplateUrl) && C.attr("template-url", u.typeaheadTemplateUrl);
            var S = function() {
                    $.matches = [], $.activeIdx = -1, c.attr("aria-expanded", !1)
                },
                D = function(e) {
                    return T + "-option-" + e
                };
            $.$watch("activeIdx", function(e) {
                0 > e ? c.removeAttr("aria-activedescendant") : c.attr("aria-activedescendant", D(e))
            });
            var E = function(e) {
                var t = {
                    $viewValue: e
                };
                v(l, !0), n.when(x.source(l, t)).then(function(n) {
                    var i = e === d.$viewValue;
                    if (i && p)
                        if (n.length > 0) {
                            $.activeIdx = w ? 0 : -1, $.matches.length = 0;
                            for (var o = 0; o < n.length; o++) t[x.itemName] = n[o], $.matches.push({
                                id: D(o),
                                label: x.viewMapper($, t),
                                model: n[o]
                            });
                            $.query = e, $.position = b ? r.offset(c) : r.position(c), $.position.top = $.position.top + c.prop("offsetHeight"), c.attr("aria-expanded", !0)
                        } else S();
                    i && v(l, !1)
                }, function() {
                    S(), v(l, !1)
                })
            };
            S(), $.query = void 0;
            var A, O = function(e) {
                    A = i(function() {
                        E(e)
                    }, h)
                },
                M = function() {
                    A && i.cancel(A)
                };
            d.$parsers.unshift(function(e) {
                return p = !0, e && e.length >= f ? h > 0 ? (M(), O(e)) : E(e) : (v(l, !1), M(), S()), g ? e : e ? void d.$setValidity("editable", !1) : (d.$setValidity("editable", !0), e)
            }), d.$formatters.push(function(e) {
                var t, n, i = {};
                return y ? (i.$model = e, y(l, i)) : (i[x.itemName] = e, t = x.viewMapper(l, i), i[x.itemName] = void 0, n = x.viewMapper(l, i), t !== n ? t : e)
            }), $.select = function(e) {
                var t, n, o = {};
                o[x.itemName] = n = $.matches[e].model, t = x.modelMapper(l, o), k(l, t), d.$setValidity("editable", !0), m(l, {
                    $item: n,
                    $model: t,
                    $label: x.viewMapper(l, o)
                }), S(), i(function() {
                    c[0].focus()
                }, 0, !1)
            }, c.bind("keydown", function(e) {
                0 !== $.matches.length && -1 !== s.indexOf(e.which) && (-1 != $.activeIdx || 13 !== e.which && 9 !== e.which) && (e.preventDefault(), 40 === e.which ? ($.activeIdx = ($.activeIdx + 1) % $.matches.length, $.$digest()) : 38 === e.which ? ($.activeIdx = ($.activeIdx > 0 ? $.activeIdx : $.matches.length) - 1, $.$digest()) : 13 === e.which || 9 === e.which ? $.$apply(function() {
                    $.select($.activeIdx)
                }) : 27 === e.which && (e.stopPropagation(), S(), $.$digest()))
            }), c.bind("blur", function() {
                p = !1
            });
            var H = function(e) {
                c[0] !== e.target && (S(), $.$digest())
            };
            o.bind("click", H), l.$on("$destroy", function() {
                o.unbind("click", H), b && P.remove()
            });
            var P = e(C)($);
            b ? o.find("body").append(P) : c.after(P)
        }
    }
}]).directive("typeaheadPopup", function() {
    return {
        restrict: "EA",
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "=",
            select: "&"
        },
        replace: !0,
        templateUrl: "template/typeahead/typeahead-popup.html",
        link: function(e, t, n) {
            e.templateUrl = n.templateUrl, e.isOpen = function() {
                return e.matches.length > 0
            }, e.isActive = function(t) {
                return e.active == t
            }, e.selectActive = function(t) {
                e.active = t
            }, e.selectMatch = function(t) {
                e.select({
                    activeIdx: t
                })
            }
        }
    }
}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse", function(e, t, n, i) {
    return {
        restrict: "EA",
        scope: {
            index: "=",
            match: "=",
            query: "="
        },
        link: function(o, r, a) {
            var s = i(a.templateUrl)(o.$parent) || "template/typeahead/typeahead-match.html";
            e.get(s, {
                cache: t
            }).success(function(e) {
                r.replaceWith(n(e.trim())(o))
            })
        }
    }
}]).filter("typeaheadHighlight", function() {
    function e(e) {
        return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }
    return function(t, n) {
        return n ? ("" + t).replace(new RegExp(e(n), "gi"), "<strong>$&</strong>") : t
    }
}), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function(e) {
    e.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n\t  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')
}]), angular.module("template/accordion/accordion.html", []).run(["$templateCache", function(e) {
    e.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
}]), angular.module("template/alert/alert.html", []).run(["$templateCache", function(e) {
    e.put("template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
}]), angular.module("template/carousel/carousel.html", []).run(["$templateCache", function(e) {
    e.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')
}]), angular.module("template/carousel/slide.html", []).run(["$templateCache", function(e) {
    e.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")
}]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function(e) {
    e.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')
}]), angular.module("template/datepicker/day.html", []).run(["$templateCache", function(e) {
    e.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/month.html", []).run(["$templateCache", function(e) {
    e.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/popup.html", []).run(["$templateCache", function(e) {
    e.put("template/datepicker/popup.html", '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n\t<li ng-transclude></li>\n\t<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n\t\t<span class="btn-group pull-left">\n\t\t\t<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n\t\t\t<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n\t\t</span>\n\t\t<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n\t</li>\n</ul>\n')
}]), angular.module("template/datepicker/year.html", []).run(["$templateCache", function(e) {
    e.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/modal/backdrop.html", []).run(["$templateCache", function(e) {
    e.put("template/modal/backdrop.html", '<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
}]), angular.module("template/modal/window.html", []).run(["$templateCache", function(e) {
    e.put("template/modal/window.html", '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>')
}]), angular.module("template/pagination/pager.html", []).run(["$templateCache", function(e) {
    e.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')
}]), angular.module("template/pagination/pagination.html", []).run(["$templateCache", function(e) {
    e.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')
}]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function(e) {
    e.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
}]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function(e) {
    e.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
}]), angular.module("template/popover/popover.html", []).run(["$templateCache", function(e) {
    e.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
}]), angular.module("template/progressbar/bar.html", []).run(["$templateCache", function(e) {
    e.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')
}]), angular.module("template/progressbar/progress.html", []).run(["$templateCache", function(e) {
    e.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
}]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function(e) {
    e.put("template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')
}]), angular.module("template/rating/rating.html", []).run(["$templateCache", function(e) {
    e.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')
}]), angular.module("template/tabs/tab.html", []).run(["$templateCache", function(e) {
    e.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
}]), angular.module("template/tabs/tabset.html", []).run(["$templateCache", function(e) {
    e.put("template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
}]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function(e) {
    e.put("template/timepicker/timepicker.html", '<table>\n\t<tbody>\n\t\t<tr class="text-center">\n\t\t\t<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n\t\t\t<td>&nbsp;</td>\n\t\t\t<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n\t\t\t<td ng-show="showMeridian"></td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n\t\t\t\t<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n\t\t\t</td>\n\t\t\t<td>:</td>\n\t\t\t<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n\t\t\t\t<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n\t\t\t</td>\n\t\t\t<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n\t\t</tr>\n\t\t<tr class="text-center">\n\t\t\t<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n\t\t\t<td>&nbsp;</td>\n\t\t\t<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n\t\t\t<td ng-show="showMeridian"></td>\n\t\t</tr>\n\t</tbody>\n</table>\n')
}]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function(e) {
    e.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
}]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function(e) {
    e.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
}]);
var spotluckApp = angular.module("spotluckApp", ["ui.bootstrap"]);
spotluckApp.controller("hubController", ["$scope", "$http", function(e, t) {
    t.get("/api/hubs").success(function(t) {
        e.states = t.states, e.hubs = t.hubs, e.cities = t.cities
    }).error(function(t) {
        e.merchants = []
    })
}]);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    enableInlineVideo = function() {
        function e(e, t, n, i) {
            function o(n) {
                r = t(o, i), e(n - (a || n)), a = n
            }
            var r, a;
            return {
                start: function() {
                    r || o(0)
                },
                stop: function() {
                    n(r), r = null, a = 0
                }
            }
        }

        function t(t) {
            return e(t, requestAnimationFrame, cancelAnimationFrame)
        }

        function n(e, t, n) {
            function i(i) {
                n && !n(e, t) || i.stopImmediatePropagation()
            }
            return e.addEventListener(t, i), i
        }

        function i(e, t, n, i) {
            function o() {
                return n[t]
            }

            function r(e) {
                n[t] = e
            }
            i && r(e[t]), Object.defineProperty(e, t, {
                get: o,
                set: r
            })
        }

        function o(e, t, n) {
            n.addEventListener(t, function() {
                return e.dispatchEvent(new Event(t))
            })
        }

        function r(e, t) {
            Promise.resolve().then(function() {
                e.dispatchEvent(new Event(t))
            })
        }

        function a(e) {
            var t = new Audio;
            return o(e, "play", t), o(e, "playing", t), o(e, "pause", t), t.crossOrigin = e.crossOrigin, t.src = e.src || e.currentSrc || "data:", t
        }

        function s(e, t, n) {
            (v || 0) + 200 < Date.now() && (e[b] = !0, v = Date.now()), n || (e.currentTime = t), x[++$ % 3] = 100 * t | 0
        }

        function l(e) {
            return e.driver.currentTime >= e.video.duration
        }

        function c(e) {
            var t = this;
            t.video.readyState >= t.video.HAVE_FUTURE_DATA ? (t.hasAudio || (t.driver.currentTime = t.video.currentTime + e * t.video.playbackRate / 1e3, t.video.loop && l(t) && (t.driver.currentTime = 0)), s(t.video, t.driver.currentTime)) : t.video.networkState === t.video.NETWORK_IDLE && 0 === t.video.buffered.length && t.video.load(), t.video.ended && (delete t.video[b], t.video.pause(!0))
        }

        function u() {
            var e = this,
                t = e[y];
            return e.webkitDisplayingFullscreen ? void e[w]() : ("data:" !== t.driver.src && t.driver.src !== e.src && (s(e, 0, !0), t.driver.src = e.src), void(e.paused && (t.paused = !1, 0 === e.buffered.length && e.load(), t.driver.play(), t.updater.start(), t.hasAudio || (r(e, "play"), t.video.readyState >= t.video.HAVE_ENOUGH_DATA && r(e, "playing")))))
        }

        function d(e) {
            var t = this,
                n = t[y];
            n.driver.pause(), n.updater.stop(), t.webkitDisplayingFullscreen && t[k](), n.paused && !e || (n.paused = !0, n.hasAudio || r(t, "pause"), t.ended && !t.webkitDisplayingFullscreen && (t[b] = !0, r(t, "ended")))
        }

        function p(e, n) {
            var i = {};
            e[y] = i, i.paused = !0, i.hasAudio = n, i.video = e, i.updater = t(c.bind(i)), n ? i.driver = a(e) : (e.addEventListener("canplay", function() {
                e.paused || r(e, "playing")
            }), i.driver = {
                src: e.src || e.currentSrc || "data:",
                muted: !0,
                paused: !0,
                pause: function() {
                    i.driver.paused = !0
                },
                play: function() {
                    i.driver.paused = !1, l(i) && s(e, 0)
                },
                get ended() {
                    return l(i)
                }
            }), e.addEventListener("emptied", function() {
                var t = !i.driver.src || "data:" === i.driver.src;
                i.driver.src && i.driver.src !== e.src && (s(e, 0, !0), i.driver.src = e.src, t || !n && e.autoplay ? i.driver.play() : i.updater.stop())
            }, !1), e.addEventListener("webkitbeginfullscreen", function() {
                e.paused ? n && 0 === i.driver.buffered.length && i.driver.load() : (e.pause(), e[w]())
            }), n && (e.addEventListener("webkitendfullscreen", function() {
                i.driver.currentTime = e.currentTime
            }), e.addEventListener("seeking", function() {
                x.indexOf(100 * e.currentTime | 0) < 0 && (i.driver.currentTime = e.currentTime)
            }))
        }

        function f(e) {
            var t = e[b];
            return delete e[b], !e.webkitDisplayingFullscreen && !t
        }

        function h(e) {
            var t = e[y];
            e[w] = e.play, e[k] = e.pause, e.play = u, e.pause = d, i(e, "paused", t.driver), i(e, "muted", t.driver, !0), i(e, "playbackRate", t.driver, !0), i(e, "ended", t.driver), i(e, "loop", t.driver, !0), n(e, "seeking", function(e) {
                return !e.webkitDisplayingFullscreen
            }), n(e, "seeked", function(e) {
                return !e.webkitDisplayingFullscreen
            }), n(e, "timeupdate", f), n(e, "ended", f)
        }

        function g(e, t) {
            if (void 0 === t && (t = {}), !e[y]) {
                if (!t.everywhere) {
                    if (!m) return;
                    if (!(t.iPad || t.ipad ? /iPhone|iPod|iPad/ : /iPhone|iPod/).test(navigator.userAgent)) return
                }
                e.pause();
                var n = e.autoplay;
                e.autoplay = !1, p(e, !e.muted), h(e), e.classList.add("IIV"), e.muted && n && (e.play(), e.addEventListener("playing", function i() {
                    e.autoplay = !0, e.removeEventListener("playing", i)
                })), /iPhone|iPod|iPad/.test(navigator.platform) || console.warn("iphone-inline-video is not guaranteed to work in emulated environments")
            }
        }
        var v, m = "object" == ("undefined" == typeof document ? "undefined" : _typeof(document)) && "object-fit" in document.head.style && !matchMedia("(-webkit-video-playable-inline)").matches,
            y = "bfred-it:iphone-inline-video",
            b = "bfred-it:iphone-inline-video:event",
            w = "bfred-it:iphone-inline-video:nativeplay",
            k = "bfred-it:iphone-inline-video:nativepause",
            x = [],
            $ = 0;
        return g
    }();
window.onload = function() {
    if ($(window).width() <= 750) {
        var e, t = document.getElementsByClassName("accordion");
        for (e = 0; e < t.length; e++) t[e].onclick = function() {
            this.classList.toggle("active");
            var e = this.nextElementSibling;
            "block" === e.style.display ? (e.style.display = "none", $(".right-arrow").removeClass("rotated")) : (e.style.display = "block", $(".right-arrow").addClass("rotated"))
        }
    }
    document.querySelector("#header") && (window.onscroll = function(e) {
        var t = 500,
            n = document.querySelector("#header"),
            i = (document.querySelector("#header-cover"), window.scrollY),
            o = n.offsetHeight,
            r = (n.clientHeight, .75 - (i - o + t) / t);
        n.style.opacity = r, r > "1" || 0 === i ? n.style.opacity = 1 : r < "0" && (n.style.opacity = 0)
    }), $("#smoothLink").on("click", function(e) {
        e.preventDefault();
        var t = this.hash;
        $("html, body").animate({
            scrollTop: $(t).offset().top - 70
        }, 400, function() {})
    }), $(".legal-link").on("click", function(e) {
        e.preventDefault();
        var t = this.hash;
        $("html, body").animate({
            scrollTop: $(t).offset().top - 100
        }, 400, function() {})
    });
    var n = [];
    $(".menu").each(function() {
        n.push($(this).attr("id"))
    });
    for (var i = 1; i < n.length; i++) $("#" + n[i]).hide();
    $("#" + n[0]).show(), $("#" + n[0] + "-button").addClass("nav"), $(".navigation a").click(function() {
        for (var e = $(this).attr("id"), t = e.indexOf("-"), i = e.substring(0, t), o = 0; o < n.length; o++) $("#" + n[o]).hide(), $("#" + n[o] + "-button").removeClass("nav");
        $("#" + i).show(), $("#" + i + "-button").addClass("nav")
    })
};
var spotluckApp = angular.module("spotluckApp").controller("ReviewController", ReviewController);
ReviewController.$inject = ["$scope", "$http"];
var spotluckApp = angular.module("spotluckApp");
spotluckApp.controller("teamController", ["$scope", "Team", function(e, t) {
    function n(e) {
        return function(t, n) {
            return t[e] > n[e] ? 1 : t[e] < n[e] ? -1 : 0
        }
    }
    e.isSelected = !1, e.isHover = !1, e.isGray = !1, e.obj = {
        name: "Executive Team",
        title: "Spotluck, Inc.",
        biography: ""
    }, e.teamMembers = [], e.imageBase = "https://spotluck.s3.amazonaws.com/media/", e.mouseIsOver = !1, e.mouseOverFunction = function() {
        e.mouseIsOver = !e.mouseIsOver
    }, e.selected = function() {
        console.log(e.teamMembers)
    }, t.getTeam().then(function(t) {
        t.data.sort(n("order")), e.teamMembers = t.data
    }, function(e) {
        console.log(e)
    })
}]), spotluckApp.directive("member", [function() {
    return {
        restrict: "E",
        transclude: !0,
        template: '<div class="clearfix" ng-if="$index % 4 == 0"></div><div class="columns three ct pictureHeight heightPicture"><a ng-href="{{teamMember.biography}}"><img class="img-size top" src="/images/linkedInLogo.png"><img class="img-size top" ng-mouseenter="updateBio()" ng-mouseleave="defaultBio()" ng-src="https://spotluck.s3.amazonaws.com/media/{{teamMember.image_link}}"></a></div>',
        link: function(e, t, n) {
            e.updateBio = function(t) {
                e.obj.name = e.teamMember.name, e.obj.title = e.teamMember.title, e.obj.biography = e.teamMember.biography
            }, e.defaultBio = function(t) {
                e.obj.name = "Executive Team", e.obj.title = "Spotluck, Inc.", e.obj.biography = ""
            }
        }
    }
}]), spotluckApp.factory("Team", ["$http", function(e) {
    return {
        getTeam: function() {
            return e.get("/api/team")
        }
    }
}]);