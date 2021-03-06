document.addEventListener("DOMContentLoaded", function () {
    var dsp = "#version 300 es\n#ifdef GL_ES\n  precision highp int;\n  precision highp float;\n#endif\nuniform float sampleRate;\nuniform vec2 resolution;\nuniform float channel;\nuniform float bufferTime;\nout vec4 fragColor;\n\nfloat PI = 3.14;\nfloat tau = 6.28;\n\nfloat sub(float wave, float mul, float t){\n  return sin(wave * mul + tau * t);\n}\n\nfloat sine(float x, float t){\n  return sin(tau * t * x);\n}\n\nfloat tri(float x, float t){\n  return abs(1.0 - mod((2.0 * t * x), 2.0)) * 2.0 - 1.0;\n}\n\n\nfloat dsp(float t){\n  float n = 44000.0 / 341.5;\n\n  float bass_osc =\n    0.8 * tri(n/3.0, t)\n  + 0.05 * sine(n*2.0, t)\n  ;\n\n  float lfo = sine(0.18, t);\n  float lfo_mul = sine(0.04, t);\n  float bass_sub =\n    0.8 * sub(bass_osc, 2.0 + ((1.0 + lfo) * (2.0 + (1.0 + lfo_mul) * 12.0) ), t)\n  + 0.7 * sine(n, t)\n  ;\n\n  return 0.4 * bass_sub;\n}\n\nvoid main(){\n \tfloat t = bufferTime + 4.*(gl_FragCoord.y * resolution.x + gl_FragCoord.x) / sampleRate;\n\tvec4 r = vec4(dsp(t),dsp(t+1.0/sampleRate), dsp(t+2.0/sampleRate), dsp(t+3.0/sampleRate)); \n\tfragColor = (r+1.0)/2.0;\n}";
    var generator = Synth.G(dsp, 44100, 128, 64);
    document.querySelector("button").addEventListener("click", function () {
        Synth.P(generator);
    });
});
