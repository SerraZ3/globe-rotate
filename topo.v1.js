topojson = (function () {
  function e(e, n) {
    function t(n) {
      var t = e.arcs[n],
        r = t[0],
        o = [0, 0];
      return (
        t.forEach(function (e) {
          (o[0] += e[0]), (o[1] += e[1]);
        }),
        [r, o]
      );
    }
    var r = {},
      o = {};
    n.forEach(function (e) {
      var n,
        a,
        i = t(e),
        u = i[0],
        c = i[1];
      if ((n = o[u]))
        if ((delete o[n.end], n.push(e), (n.end = c), (a = r[c]))) {
          delete r[a.start];
          var s = a === n ? n : n.concat(a);
          r[(s.start = n.start)] = o[(s.end = a.end)] = s;
        } else if ((a = o[c])) {
          delete r[a.start], delete o[a.end];
          var s = n.concat(
            a
              .map(function (e) {
                return ~e;
              })
              .reverse()
          );
          r[(s.start = n.start)] = o[(s.end = a.start)] = s;
        } else r[n.start] = o[n.end] = n;
      else if ((n = r[c]))
        if ((delete r[n.start], n.unshift(e), (n.start = u), (a = o[u]))) {
          delete o[a.end];
          var f = a === n ? n : a.concat(n);
          r[(f.start = a.start)] = o[(f.end = n.end)] = f;
        } else if ((a = r[u])) {
          delete r[a.start], delete o[a.end];
          var f = a
            .map(function (e) {
              return ~e;
            })
            .reverse()
            .concat(n);
          r[(f.start = a.end)] = o[(f.end = n.end)] = f;
        } else r[n.start] = o[n.end] = n;
      else if ((n = r[u]))
        if ((delete r[n.start], n.unshift(~e), (n.start = c), (a = o[c]))) {
          delete o[a.end];
          var f = a === n ? n : a.concat(n);
          r[(f.start = a.start)] = o[(f.end = n.end)] = f;
        } else if ((a = r[c])) {
          delete r[a.start], delete o[a.end];
          var f = a
            .map(function (e) {
              return ~e;
            })
            .reverse()
            .concat(n);
          r[(f.start = a.end)] = o[(f.end = n.end)] = f;
        } else r[n.start] = o[n.end] = n;
      else if ((n = o[c]))
        if ((delete o[n.end], n.push(~e), (n.end = u), (a = o[u]))) {
          delete r[a.start];
          var s = a === n ? n : n.concat(a);
          r[(s.start = n.start)] = o[(s.end = a.end)] = s;
        } else if ((a = r[u])) {
          delete r[a.start], delete o[a.end];
          var s = n.concat(
            a
              .map(function (e) {
                return ~e;
              })
              .reverse()
          );
          r[(s.start = n.start)] = o[(s.end = a.start)] = s;
        } else r[n.start] = o[n.end] = n;
      else (n = [e]), (r[(n.start = u)] = o[(n.end = c)] = n);
    });
    var a = [];
    for (var i in o) a.push(o[i]);
    return a;
  }
  function n(n, t, r) {
    function a(e) {
      0 > e && (e = ~e), (l[e] || (l[e] = [])).push(f);
    }
    function i(e) {
      e.forEach(a);
    }
    function u(e) {
      e.forEach(i);
    }
    function c(e) {
      "GeometryCollection" === e.type
        ? e.geometries.forEach(c)
        : e.type in d && ((f = e), d[e.type](e.arcs));
    }
    var s = [];
    if (arguments.length > 1) {
      var f,
        l = [],
        d = {
          LineString: i,
          MultiLineString: u,
          Polygon: u,
          MultiPolygon: function (e) {
            e.forEach(u);
          },
        };
      c(t),
        l.forEach(
          arguments.length < 3
            ? function (e, n) {
                s.push(n);
              }
            : function (e, n) {
                r(e[0], e[e.length - 1]) && s.push(n);
              }
        );
    } else for (var p = 0, v = n.arcs.length; v > p; ++p) s.push(p);
    return o(n, { type: "MultiLineString", arcs: e(n, s) });
  }
  function t(e, n) {
    return "GeometryCollection" === n.type
      ? {
          type: "FeatureCollection",
          features: n.geometries.map(function (n) {
            return r(e, n);
          }),
        }
      : r(e, n);
  }
  function r(e, n) {
    var t = {
      type: "Feature",
      id: n.id,
      properties: n.properties || {},
      geometry: o(e, n),
    };
    return null == n.id && delete t.id, t;
  }
  function o(e, n) {
    function t(e, n) {
      n.length && n.pop();
      for (var t, r = f[0 > e ? ~e : e], o = 0, i = r.length; i > o; ++o)
        n.push((t = r[o].slice())), s(t, o);
      0 > e && a(n, i);
    }
    function r(e) {
      return (e = e.slice()), s(e, 0), e;
    }
    function o(e) {
      for (var n = [], r = 0, o = e.length; o > r; ++r) t(e[r], n);
      return n.length < 2 && n.push(n[0].slice()), n;
    }
    function i(e) {
      for (var n = o(e); n.length < 4; ) n.push(n[0].slice());
      return n;
    }
    function u(e) {
      return e.map(i);
    }
    function c(e) {
      var n = e.type;
      return "GeometryCollection" === n
        ? { type: n, geometries: e.geometries.map(c) }
        : n in l
        ? { type: n, coordinates: l[n](e) }
        : null;
    }
    var s = d(e.transform),
      f = e.arcs,
      l = {
        Point: function (e) {
          return r(e.coordinates);
        },
        MultiPoint: function (e) {
          return e.coordinates.map(r);
        },
        LineString: function (e) {
          return o(e.arcs);
        },
        MultiLineString: function (e) {
          return e.arcs.map(o);
        },
        Polygon: function (e) {
          return u(e.arcs);
        },
        MultiPolygon: function (e) {
          return e.arcs.map(u);
        },
      };
    return c(n);
  }
  function a(e, n) {
    for (var t, r = e.length, o = r - n; o < --r; )
      (t = e[o]), (e[o++] = e[r]), (e[r] = t);
  }
  function i(e, n) {
    for (var t = 0, r = e.length; r > t; ) {
      var o = (t + r) >>> 1;
      e[o] < n ? (t = o + 1) : (r = o);
    }
    return t;
  }
  function u(e) {
    function n(e, n) {
      e.forEach(function (e) {
        0 > e && (e = ~e);
        var t = o[e];
        t ? t.push(n) : (o[e] = [n]);
      });
    }
    function t(e, t) {
      e.forEach(function (e) {
        n(e, t);
      });
    }
    function r(e, n) {
      "GeometryCollection" === e.type
        ? e.geometries.forEach(function (e) {
            r(e, n);
          })
        : e.type in u && u[e.type](e.arcs, n);
    }
    var o = {},
      a = e.map(function () {
        return [];
      }),
      u = {
        LineString: n,
        MultiLineString: t,
        Polygon: t,
        MultiPolygon: function (e, n) {
          e.forEach(function (e) {
            t(e, n);
          });
        },
      };
    e.forEach(r);
    for (var c in o)
      for (var s = o[c], f = s.length, l = 0; f > l; ++l)
        for (var d = l + 1; f > d; ++d) {
          var p,
            v = s[l],
            h = s[d];
          (p = a[v])[(c = i(p, h))] !== h && p.splice(c, 0, h),
            (p = a[h])[(c = i(p, v))] !== v && p.splice(c, 0, v);
        }
    return a;
  }
  function c(e, n) {
    function t(e) {
      i.remove(e), (e[1][2] = n(e)), i.push(e);
    }
    var r,
      o = d(e.transform),
      a = p(e.transform),
      i = l(f),
      u = 0;
    for (
      n || (n = s),
        e.arcs.forEach(function (e) {
          var t = [];
          e.forEach(o);
          for (var a = 1, u = e.length - 1; u > a; ++a)
            (r = e.slice(a - 1, a + 2)), (r[1][2] = n(r)), t.push(r), i.push(r);
          e[0][2] = e[u][2] = 1 / 0;
          for (var a = 0, u = t.length; u > a; ++a)
            (r = t[a]), (r.previous = t[a - 1]), (r.next = t[a + 1]);
        });
      (r = i.pop());

    ) {
      var c = r.previous,
        v = r.next;
      r[1][2] < u ? (r[1][2] = u) : (u = r[1][2]),
        c && ((c.next = v), (c[2] = r[2]), t(c)),
        v && ((v.previous = c), (v[0] = r[0]), t(v));
    }
    return (
      e.arcs.forEach(function (e) {
        e.forEach(a);
      }),
      e
    );
  }
  function s(e) {
    return Math.abs(
      (e[0][0] - e[2][0]) * (e[1][1] - e[0][1]) -
        (e[0][0] - e[1][0]) * (e[2][1] - e[0][1])
    );
  }
  function f(e, n) {
    return e[1][2] - n[1][2];
  }
  function l(e) {
    function n(n) {
      for (var t = o[n]; n > 0; ) {
        var r = ((n + 1) >> 1) - 1,
          a = o[r];
        if (e(t, a) >= 0) break;
        (o[(a.index = n)] = a), (o[(t.index = n = r)] = t);
      }
    }
    function t(n) {
      for (var t = o[n]; ; ) {
        var r = (n + 1) << 1,
          a = r - 1,
          i = n,
          u = o[i];
        if (
          (a < o.length && e(o[a], u) < 0 && (u = o[(i = a)]),
          r < o.length && e(o[r], u) < 0 && (u = o[(i = r)]),
          i === n)
        )
          break;
        (o[(u.index = n)] = u), (o[(t.index = n = i)] = t);
      }
    }
    var r = {},
      o = [];
    return (
      (r.push = function () {
        for (var e = 0, t = arguments.length; t > e; ++e) {
          var r = arguments[e];
          n((r.index = o.push(r) - 1));
        }
        return o.length;
      }),
      (r.pop = function () {
        var e = o[0],
          n = o.pop();
        return o.length && ((o[(n.index = 0)] = n), t(0)), e;
      }),
      (r.remove = function (r) {
        var a = r.index,
          i = o.pop();
        return (
          a !== o.length && ((o[(i.index = a)] = i), (e(i, r) < 0 ? n : t)(a)),
          a
        );
      }),
      r
    );
  }
  function d(e) {
    if (!e) return v;
    var n,
      t,
      r = e.scale[0],
      o = e.scale[1],
      a = e.translate[0],
      i = e.translate[1];
    return function (e, u) {
      u || (n = t = 0),
        (e[0] = (n += e[0]) * r + a),
        (e[1] = (t += e[1]) * o + i);
    };
  }
  function p(e) {
    if (!e) return v;
    var n,
      t,
      r = e.scale[0],
      o = e.scale[1],
      a = e.translate[0],
      i = e.translate[1];
    return function (e, u) {
      u || (n = t = 0);
      var c = 0 | ((e[0] - a) / r),
        s = 0 | ((e[1] - i) / o);
      (e[0] = c - n), (e[1] = s - t), (n = c), (t = s);
    };
  }
  function v() {}
  return {
    version: "1.4.5",
    mesh: n,
    feature: t,
    neighbors: u,
    presimplify: c,
  };
})();
