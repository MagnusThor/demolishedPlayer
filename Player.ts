class DP {

    static I(c: HTMLCanvasElement, vs: string, fs: string) {
        let ca = {
            preserveDrawingBuffer: true
        };

        let gl =
            c.getContext('webgl2', ca) ||
            c.getContext('webgl', ca) ||
            c.getContext('experimental-webgl', ca) as any;
        // hash WebGL Methods
        for (var i in gl)
            gl[i[0] + i[6]] = gl[i];

        gl.f1 = gl.uniform1f;
        gl.f2 = gl.uniform2f;

        const program = gl.cP();
        let frag = gl.cS(35633);

        // setup vertex
        gl.sS(frag, vs);
        gl.ce(frag);
        gl.aS(program, frag);
        // setup fragment

        let vert = gl.cS(35632);

        gl.sS(
            vert, fs);

        gl.ce(vert);

        gl.aS(program, vert);


        // if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
        //     gl.getShaderInfoLog(frag).trim().split("\n").forEach((l: string) =>
        //         console.warn("[shader] " + l))
        //     throw new Error("Error while compiling shader")
        // };

        gl.lo(program);
        gl.ug(program);

        gl.bf(34962, gl.cB());

        //let vp = gl.gr(program,"pos");

        gl.eV(0);
        gl.vA(0, 2, 5120, 0, 0, 0);

        gl.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);

        const dt = () => {
            return  (new Date / 1e5);
        }
        let ts = dt();
        let L = () => {
            gl.f1(gl.gf(program, 'time'), dt() - ts);

            gl.f2(gl.gf(program, 'resolution'), innerHeight, innerWidth);
            gl.dr(6, 0, 3);

            requestAnimationFrame(L);
        };
        L();

    }
}

DP.I(document.querySelector("canvas"),
    `#version 300 es
#ifdef GL_ES
precision highp float;
precision highp int;
precision mediump sampler3D;
#endif
layout(location = 0) in vec2 pos; 
out vec4 fragColor;
void main() { 
	gl_Position = vec4(pos.xy,0.0,1.0);
}`,

    `#version 300 es
#ifdef GL_ES
precision highp float;
precision highp int;
precision mediump sampler3D;
#endif
uniform float time;
uniform vec2 resolution;

out vec4 fragColor;
void main( void ) {
    fragColor = vec4(1.,0.2,0.2,1.0);
}
`
);

