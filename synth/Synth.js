var Synth = (function () {
    function Synth() {
    }
    Synth.generate = function (dsp, sr, w, h) {
        var canvas = document.createElement("canvas");
        var g = canvas.getContext("webgl2");
        for (var i in g)
            g[i[0] + i[6]] = g[i];
        g.f1 = g.uniform1f;
        g.f2 = g.uniform2f;
        var p = g.cP();
        var v = g.cS(35633);
        g.sS(v, this.vs);
        g.ce(v);
        g.aS(p, v);
        var f = g.cS(35632);
        g.sS(f, dsp);
        g.ce(f);
        g.aS(p, f);
        g.vr(0, 0, w, h);
        g.lo(p);
        g.ug(p);
        g.bf(34962, g.createBuffer());
        g.eV(0);
        g.vA(0, 2, 5120, 0, 0, 0);
        g.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);
        g.f1(g.getUniformLocation(p, 'sampleRate'), sr);
        g.f2(g.getUniformLocation(p, 'resolution'), w, h);
        return function (t, c, _b) {
            var b = _b || new Uint8Array(w * h * 4);
            g.f1(g.gf(p, "bufferTime"), t / sr);
            g.f1(g.gf(p, "channel"), c);
            g.dr(6, 0, 3);
            g.rx(0, 0, w, h, 6408, 5121, b);
            return b;
        };
    };
    Synth.play = function (gen) {
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
        var w = 128;
        var h = 64;
        var schedule = function (bufferTime, audioTime) {
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
        };
        var next = function () {
            var res = schedule(absoluteBufferTime, absoluteAudioTime);
            absoluteBufferTime = res.nextBuffer;
            absoluteAudioTime = res.nextAudioTime;
        };
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
    };
    Synth.vs = "#version 300 es\n  #ifdef GL_ES\n  precision highp float;\n  precision highp int;\n  precision mediump sampler3D;\n  #endif\n  layout(location = 0) in vec2 pos; \n  out vec4 fragColor;\n  void main() { gl_Position = vec4(2.0*pos-1.0, 0.0, 1.0);\n  }";
    return Synth;
}());
var dsp = "#version 300 es\n#ifdef GL_ES\n  precision highp int;\n  precision highp float;\n#endif\n\nuniform float sampleRate;\nuniform vec2 resolution;\nuniform float channel;\nuniform float bufferTime;\n\n\nout vec4 fragColor;\n\nfloat PI = acos(-1.);\n\nfloat dsp (float t) {\n  return sin(t + 0.2 * PI * channel) * (\n    mix(0.3, 0.8, channel) * abs(sin(2.0 * PI * t * 55.0))+\n    mix(0.3, 0.2, channel) * sin(2.0 * PI * t * 440.0)\n  );\n}\n\nvoid main(){\n  float sampleRate = 44100.;\n\tfloat t = bufferTime + 4.*(gl_FragCoord.y * resolution.x + gl_FragCoord.x) / sampleRate;\n\tvec4 r = vec4(dsp(t),dsp(t+1.0/sampleRate), dsp(t+2.0/sampleRate), dsp(t+3.0/sampleRate));\n  \n  //fragColor = vec4(vec3(0.),1.0);\n  \n\tfragColor = (r+1.0)/2.0;\n}\n";
var generator = Synth.generate(dsp, 44100, 128, 64);
Synth.play(generator);
