class Synth {
  static vs = `#version 300 es
  #ifdef GL_ES
    precision highp float;
    precision highp int;
    precision mediump sampler3D;
  #endif
  layout(location = 0) in vec2 pos; 
  out vec4 fragColor;
      void main() { gl_Position = vec4(2.0*pos-1.0, 0.0, 1.0);
  }`
  /**
   * Create a generator
   * @static
   * @param {string} dsp
   * @param {number} sr
   * @param {number} w
   * @param {number} h
   * @returns generator function
   * @memberof Synth
   */
  static G(dsp: string, sr: number, w: number, h: number) {
    let canvas = document.createElement("canvas");
    let g = canvas.getContext("webgl2") as any;
    for (var i in g)  g[i[0] + i[6]] = g[i];
    g.f1 = g.uniform1f;
    g.f2 = g.uniform2f;
    let p = g.cP();
    let v = g.cS(35633);
    g.sS(v, this.vs);
    g.ce(v);
    g.aS(p, v);
    // if (!g.getShaderParameter(v, g.COMPILE_STATUS)) {
    //   g.getShaderInfoLog(v).trim().split("\n").forEach((l: string) =>
    //     console.warn("[shader] " + l))
    //   throw new Error("Error while compiling vertex")
    // };
    let f = g.cS(35632);
    g.sS(f, dsp);
    g.ce(f);
    g.aS(p, f);
    // if (!g.getShaderParameter(f, g.COMPILE_STATUS)) {
    //   g.getShaderInfoLog(f).trim().split("\n").forEach((l: string) =>
    //     console.warn("[shader] " + l))
    //   throw new Error("Error while compiling fragment")
    // };
    g.vr(0, 0, w, h);
    g.lo(p);
    //g.validateProgram(p);
    // if (!g.getProgramParameter(p, g.LINK_STATUS)) {
    //   var info = g.getProgramInfoLog(p);
    //   throw 'Could not compile WebGL program. \n\n' + info;    }
    g.ug(p);
    g.bf(34962, g.createBuffer());
    g.eV(0);
    g.vA(0, 2, 5120, 0, 0, 0);
    g.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);
    
    g.f1(g.gf(p, 'sampleRate'), sr);
    g.f2(g.gf(p, 'resolution'), w, h);

    return (t: number, c: number, _b?: any) => {
      var b = _b || new Uint8Array(w * h * 4);
      g.f1(g.gf(p, "bufferTime"), t / sr);
      g.f1(g.gf(p, "channel"), c);
      g.dr(6, 0, 3);
      g.rx(0, 0, w, h, 6408, 5121, b);
      return b;
    };
  }
  /**
   * Playback for the generated sound
   *
   * @static
   * @param {Function} gen
   * @memberof Synth
   */
  static P(gen: Function) {

    var bffs = [];
    var abt = 0;
    var aat = 0; 
    
    var c = new AudioContext();
    var d = c.createGain(); 
    var dc = c.createDynamicsCompressor(); 
    var g = c.createGain(); 
    
    g.gain.value = 0.6;
    d.connect(dc);
    dc.connect(g);
    g.connect(c.destination);
    
    const w = 128;
    const h = 64;    
    
    const S = (bt: number, at: number) => {
      var bufferSource = c.createBufferSource();
      bufferSource.connect(d);
      var buff = gen(bt, 0);
      var ab = c.createBuffer(2, buff.length, c.sampleRate);
      ab.getChannelData(0).set(buff);
      gen(bt, 1, buff); 
      ab.getChannelData(1).set(buff);
      bufferSource.buffer = ab;
      bufferSource.start(at);    
      bffs.push( {
        data: buff,
        width: w,
        height: h,
        bufferTime: bt,
        destroy: function () {
          bufferSource.disconnect(d);
        }
      });
      return {
        b: bt + buff.length,
        t: at + ab.duration
      };
    }    
    const N = () => {
      var res = S(abt, aat);
      abt = res.b;
      aat = res.t;
    }   
  
    (function L() {
      bffs = bffs.filter(function (b) {
        if (b.bufferTime + b.data.length < Math.floor(c.currentTime * c.sampleRate)) {
          b.destroy();
          return false;
        }
        return true;
      });
      if (gen && c.currentTime + 8 > aat) {
        N();
      }
      setTimeout(L, 100);
    }());
    
  }
}


