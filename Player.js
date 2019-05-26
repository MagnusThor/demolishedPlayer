var DP = (function () {
    function DP() {
    }
    DP.I = function (c, vs, fs) {
        var ca = {
            preserveDrawingBuffer: true
        };
        var gl = c.getContext('webgl2', ca) ||
            c.getContext('webgl', ca) ||
            c.getContext('experimental-webgl', ca);
        for (var i in gl)
            gl[i[0] + i[6]] = gl[i];
        gl.f1 = gl.uniform1f;
        gl.f2 = gl.uniform2f;
        var program = gl.cP();
        var frag = gl.cS(35633);
        gl.sS(frag, vs);
        gl.ce(frag);
        gl.aS(program, frag);
        var vert = gl.cS(35632);
        gl.sS(vert, fs);
        gl.ce(vert);
        gl.aS(program, vert);
        gl.lo(program);
        gl.ug(program);
        gl.bf(34962, gl.cB());
        gl.eV(0);
        gl.vA(0, 2, 5120, 0, 0, 0);
        gl.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);
        var dt = function () {
            return performance.now() / 1000;
        };
        var ts = dt();
        var L = function () {
            gl.f1(gl.gf(program, 'time'), dt() - ts);
            gl.f2(gl.gf(program, 'resolution'), innerHeight, innerWidth);
            gl.dr(6, 0, 3);
            requestAnimationFrame(L);
        };
        L();
    };
    return DP;
}());
DP.I(document.querySelector("canvas"), "#version 300 es\n#ifdef GL_ES\nprecision highp float;\nprecision highp int;\nprecision mediump sampler3D;\n#endif\nlayout(location = 0) in vec2 pos; \nout vec4 fragColor;\nvoid main() { \n\tgl_Position = vec4(pos.xy,0.0,1.0);\n}", "#version 300 es\n#ifdef GL_ES\nprecision highp float;\nprecision highp int;\nprecision mediump sampler3D;\n#endif\nuniform float time;\nuniform vec2 resolution;\n\nout vec4 fragColor;\nvoid main( void ) {\n\n    vec2 position = ( gl_FragCoord.xy / resolution.xy ) / 4.0;\n\n    float color = 0.0;\n\tcolor += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );\n\tcolor += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );\n\tcolor += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );\n\tcolor *= sin( time / 10.0 ) * 0.5;\n\n    fragColor =  vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );\n}\n");
