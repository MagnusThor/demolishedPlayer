var P = (function () {
    function P() {
    }
    P.I = function (c, v, f, x, y, b, u, k) {
        var g = c.getContext('webgl2');
        for (var i in g)
            g[i[0] + i[6]] = g[i];
        g.f1 = g.uniform1f;
        g.f2 = g.uniform2f;
        g.i1 = g.uniform1i;
        var a = Object.keys(b ? b : {});
        var p = g.cP();
        var s = g.cS(35633);
        g.sS(s, this.h + v);
        g.ce(s);
        g.aS(p, s);
        if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
            g.getShaderInfoLog(s).trim().split("\n").forEach(function (l) {
                return console.error("[shader] " + l);
            });
            throw new Error("Error while compiling vertex");
        }
        ;
        s = g.cS(35632);
        g.sS(s, this.h + f);
        g.ce(s);
        g.aS(p, s);
        if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
            g.getShaderInfoLog(s).trim().split("\n").forEach(function (l) {
                return console.error("[shader] " + l);
            });
            throw new Error("Error while compiling fragment");
        }
        ;
        g.lo(p);
        g.ug(p);
        g.bf(34962, g.cB());
        g.eV(0);
        g.vA(0, 2, 5120, 0, 0, 0);
        g.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);
        a.forEach(function (k) {
            var m = new Image();
            m.onload = function () {
            };
            m.src = b[k].d;
        });
        var dt = function () { return performance.now() / 1000; };
        var tm = dt();
        var L = function () {
            var t = tm - dt();
            g.f1(g.gf(p, 'time'), t);
            g.f2(g.gf(p, 'resolution'), x, y);
            k && Object.keys(k).forEach(function (v) {
                k[v](g.gf(p, v), g, p, t);
            });
            a.forEach(function (k, i) {
                g.aT(33984 + i);
                g.i1(g.gf(p, k), i);
            });
            g.dr(6, 0, 3);
            requestAnimationFrame(L);
        };
        L();
        u && u(g, p);
    };
    P.h = "#version 300 es\n    #ifdef GL_ES\n    precision highp float;\n    precision highp int;\n    precision mediump sampler3D;\n    #endif\n    ";
    return P;
}());
