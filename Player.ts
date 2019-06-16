class P {
    static I(c: HTMLCanvasElement, v: string, f: string, x: number, y: number,
        b?: any, u?:Function,k?:any
    ) {
        let g =
            c.getContext('webgl2') as any;
         // Hash WebGL method names into shorter once, will cause trouble i know
        for (var i in g)  g[i[0] + i[6]] = g[i];
            // {
            //     console.log(i[0] + i[6], g[i].toString());
            //     g[i[0] + i[6]] = g[i];
            // }    
        // due to duplicates, ensure we have this methds available until we have a better hash version.        
        g.f1 = g.uniform1f;
        g.f2 = g.uniform2f;
       // g.mm = g.generateMipmap;
        g.i1 = g.uniform1i;
        
        let it = Object.keys(b ? b : {});
        const p = g.cP();
        let s = g.cS(35633);
        // setup vertex
        g.sS(s, v);
        g.ce(s);
        g.aS(p, s);
        // DEBUG if fails. 
        // if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
        //     g.getShaderInfoLog(s).trim().split("\n").forEach((l: string) =>
        //         console.warn("[shader] " + l))
        //     throw new Error("Error while compiling vertex")
        // };
        // setup fragment
        s = g.cS(35632);
        g.sS(s, f);
        g.ce(s);
        g.aS(p, s);
        // DEBUG if fails.    
        // if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
        //     g.getShaderInfoLog(s).trim().split("\n").forEach((l: string) =>
        //         console.warn("[shader] " + l))
        //     throw new Error("Error while compiling fragment")
        // };
        g.lo(p);
        g.ug(p);
        g.bf(34962, g.cB());
        g.eV(0);
        g.vA(0, 2, 5120, 0, 0, 0);
        g.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);        
        // setup and load textures if provided
        it.forEach((k) => {
            const m = new Image();
            m.onload = () => {
                g.bx(3553,  g.cT());
                g.tg(3553, 0, 6408, 512, 512, 0, 6408, 5121, m)
                g.generateMipmap(3553);
            }
            m.src = b[k].d;
        });
        const dt = () => {
            return performance.now() / 1000;
        }
        let tm = dt();
        let L = () => {
            const t =  tm - dt();
            g.f1(g.gf(p, 'time'), t);
            g.f2(g.gf(p, 'resolution'), x, y);
            k && Object.keys(k).forEach( (v:any)  => {
                k[v](g.gf(p, v),g,p,t);
            });

            it.forEach((k, i) => {
                g.aT(33984 + i);
                g.i1(g.gf(p, k), i);
            });

          
            g.dr(6, 0, 3);
            requestAnimationFrame(L);
        };
        L(); 
        u && u(g,p);
    }
}
