class DP {
    static I(c: HTMLCanvasElement, vs: string, fs: string, x: number, y: number,
        b?: any, w?: any
    ) {
        let g =
            c.getContext('webgl2') as any;
        for (var i in g) // Hash WebGL method names into shorter once, will cause trouble i know
            g[i[0] + i[6]] = g[i];

        // TODO: Map uniformN to g.N ? 
        g.f1 = g.uniform1f;
        g.f2 = g.uniform2f;
        g.mm = g.generateMipmap;
        g.i1 = g.uniform1i;

        let it = Object.keys(b ? b : {});
        const p = g.cP();
        let s = g.cS(35633);
        // setup vertex
        g.sS(s, vs);
        g.ce(s);
        g.aS(p, s);
        // setup fragment
        s = g.cS(35632);
        g.sS(s, fs);
        g.ce(s);
        g.aS(p, s);
        // // DEBUG if fails.    
        // if (!g.getShaderParameter(f, g.COMPILE_STATUS)) {
        //     g.getShaderInfoLog(f).trim().split("\n").forEach((l: string) =>
        //         console.warn("[shader] " + l))
        //     throw new Error("Error while compiling shader")
        // };
        g.lo(p);
        g.ug(p);
        g.bf(34962, g.cB());
        g.eV(0);
        g.vA(0, 2, 5120, 0, 0, 0);
        g.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);

        // setup and load textures if provided
        it.forEach((k, i) => {
            const t = g.cT();
            const m = new Image();
            m.onload = () => {
                g.bx(3553, t);
                g.tg(3553, 0, 6408, 512, 512, 0, 6408, 5121, m)
                g.mm(3553);
            }
            m.src = b[k].d;
        });
        const dt = () => {
            return performance.now() / 1000;
        }
        let tm = dt();
        let L = () => {
            g.f1(g.gf(p, 'time'), dt() - tm);
            g.f2(g.gf(p, 'resolution'), x, y);
            it.forEach((k, i) => {
                g.aT(33984 + i);
                g.i1(g.gf(p, k), i);
            });
            g.dr(6, 0, 3);
            requestAnimationFrame(L);
        };
        L();              
    }
}
