class P {
  
    // header for vertex and shader
    static h:string = `#version 300 es
    #ifdef GL_ES
    precision highp float;
    precision highp int;
    precision mediump sampler3D;
    #endif
    `;
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
        // due to duplicates, ensure we have this methods available until we have a better hash..        
        g.f1 = g.uniform1f;
        g.f2 = g.uniform2f;
       // g.mm = g.generateMipmap;
        g.i1 = g.uniform1i;
        
        let a = Object.keys(b ? b : {});
        const p = g.cP();
        let s = g.cS(35633);
        // setup vertex
        g.sS(s, this.h + v);
        g.ce(s);
        g.aS(p, s);
        // DEBUG if fails. 
        if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
            g.getShaderInfoLog(s).trim().split("\n").forEach((l: string) =>
                console.error("[shader] " + l))
            throw new Error("Error while compiling vertex")
        };
        // setup fragment
        s = g.cS(35632);
        g.sS(s, this.h + f);
        g.ce(s);
        g.aS(p, s);
        // DEBUG if fails.    
        if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
            g.getShaderInfoLog(s).trim().split("\n").forEach((l: string) =>
                console.error("[shader] " + l))
                throw new Error("Error while compiling fragment")
        };
        g.lo(p);
        g.ug(p);
        g.bf(34962, g.cB());
        g.eV(0);
        g.vA(0, 2, 5120, 0, 0, 0);
        g.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);        
        // setup and load textures if provided
        a.forEach((k) => {
            const m = new Image();
            m.onload = () => {            
                           }
            m.src = b[k].d;
        });
        const dt = () => performance.now() / 1000
        let tm = dt();
        let L = () => {
            const t =  tm - dt();
            g.f1(g.gf(p, 'time'), t);
            g.f2(g.gf(p, 'resolution'), x, y);
            k && Object.keys(k).forEach( (v:any)  => {
                k[v](g.gf(p, v),g,p,t);
            });
            a.forEach((k, i) => {
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