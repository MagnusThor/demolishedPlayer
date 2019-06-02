

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
  static generate(dsp: string, sr: number, w: number, h: number) {
    let canvas = document.createElement("canvas");
    let g = canvas.getContext("webgl2") as any;
    for (var i in g)  g[i[0] + i[6]] = g[i];
    g.f1 = g.uniform1f;
    g.f2 = g.uniform2f;
    // canvas.setAttribute("width", w.toString());
    // canvas.setAttribute("height", h.toString());
    // document.querySelector("#debug").append(canvas);
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
    
    g.f1(g.getUniformLocation(p, 'sampleRate'), sr);
    g.f2(g.getUniformLocation(p, 'resolution'), w, h);

    return (t: number, c: number, _b?: any) => {
      var b = _b || new Uint8Array(w * h * 4);
      g.f1(g.gf(p, "bufferTime"), t / sr);
      g.f1(g.gf(p, "channel"), c);
      g.dr(6, 0, 3);
      g.rx(0, 0, w, h, 6408, 5121, b);
      return b;
    };
  }
  static play(gen: Function) {

    var buffers = [];
    var absoluteBufferTime = 0;
    var absoluteAudioTime = 0; 
    
    var audioContext = new AudioContext();
    var destination = audioContext.createGain(); 
    var compressor = audioContext.createDynamicsCompressor(); 
    var finalGain = audioContext.createGain(); 
    
    finalGain.gain.value = 0.6;
    destination.connect(compressor);
    compressor.connect(finalGain);
    finalGain.connect(audioContext.destination);
    
    const w = 128;
    const h = 64;    
    
    const schedule = (bufferTime: number, audioTime: number) => {
      var bufferSource = audioContext.createBufferSource();
      bufferSource.connect(destination);
      var pixelBuffer = gen(bufferTime, 0);
      var audioBuffer = audioContext.createBuffer(2, pixelBuffer.length, audioContext.sampleRate);
      audioBuffer.getChannelData(0).set(pixelBuffer);
      gen(bufferTime, 1, pixelBuffer); 
      audioBuffer.getChannelData(1).set(pixelBuffer);
      bufferSource.buffer = audioBuffer;
      bufferSource.start(audioTime);    
      var item = {
        data: pixelBuffer,
        width: w,
        height: h,
        bufferTime: bufferTime,
        destroy: function () {
          bufferSource.disconnect(destination);
        }
      };
      buffers.push(item);
      return {
        nextBuffer: bufferTime + pixelBuffer.length,
        nextAudioTime: audioTime + audioBuffer.duration
      };
    }    
    const next = () => {
      var res = schedule(absoluteBufferTime, absoluteAudioTime);
      absoluteBufferTime = res.nextBuffer;
      absoluteAudioTime = res.nextAudioTime;
    }   
  
    (function L() {
      buffers = buffers.filter(function (buffer) {
        if (buffer.bufferTime + buffer.data.length < Math.floor(audioContext.currentTime * audioContext.sampleRate)) {
          buffer.destroy();
          return false;
        }
        return true;
      });
      if (generator && audioContext.currentTime + 8 > absoluteAudioTime) {
        next();
      }
      setTimeout(L, 1000 * 0.1);
    }());
    
  }
}

/* Example usage */

let dsp = `#version 300 es
#ifdef GL_ES
  precision highp int;
  precision highp float;
#endif

uniform float sampleRate;
uniform vec2 resolution;
uniform float channel;
uniform float bufferTime;


out vec4 fragColor;

float PI = acos(-1.);

float dsp (float t) {
  return sin(t + 0.2 * PI * channel) * (
    mix(0.3, 0.8, channel) * abs(sin(2.0 * PI * t * 55.0))+
    mix(0.3, 0.2, channel) * sin(2.0 * PI * t * 440.0)
  );
}

void main(){
  float sampleRate = 44100.;
	float t = bufferTime + 4.*(gl_FragCoord.y * resolution.x + gl_FragCoord.x) / sampleRate;
	vec4 r = vec4(dsp(t),dsp(t+1.0/sampleRate), dsp(t+2.0/sampleRate), dsp(t+3.0/sampleRate));
  
  //fragColor = vec4(vec3(0.),1.0);
  
	fragColor = (r+1.0)/2.0;
}
`;

let generator = Synth.generate(dsp, 44100, 128, 64);
Synth.play(generator);
