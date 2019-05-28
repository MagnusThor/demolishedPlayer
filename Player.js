var DP = (function () {
    function DP() {
    }
    DP.I = function (c, vs, fs, x, y, b, w) {
        var g = c.getContext('webgl2');
        for (var i in g)
            g[i[0] + i[6]] = g[i];
        g.f1 = g.uniform1f;
        g.f2 = g.uniform2f;
        g.mm = g.generateMipmap;
        g.i1 = g.uniform1i;
        var it = Object.keys(b ? b : {});
        var p = g.cP();
        var s = g.cS(35633);
        g.sS(s, vs);
        g.ce(s);
        g.aS(p, s);
        if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
            g.getShaderInfoLog(s).trim().split("\n").forEach(function (l) {
                return console.warn("[shader] " + l);
            });
            throw new Error("Error while compiling vertex");
        }
        ;
        s = g.cS(35632);
        g.sS(s, fs);
        g.ce(s);
        g.aS(p, s);
        if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
            g.getShaderInfoLog(s).trim().split("\n").forEach(function (l) {
                return console.warn("[shader] " + l);
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
        it.forEach(function (k, i) {
            var t = g.cT();
            var m = new Image();
            m.onload = function () {
                g.bx(3553, t);
                g.tg(3553, 0, 6408, 512, 512, 0, 6408, 5121, m);
                g.mm(3553);
            };
            m.src = b[k].d;
        });
        var dt = function () {
            return performance.now() / 1000;
        };
        var tm = dt();
        var L = function () {
            g.f1(g.gf(p, 'time'), tm - dt());
            g.f2(g.gf(p, 'resolution'), x, y);
            it.forEach(function (k, i) {
                g.aT(33984 + i);
                g.i1(g.gf(p, k), i);
            });
            g.dr(6, 0, 3);
            requestAnimationFrame(L);
        };
        L();
    };
    return DP;
}());
