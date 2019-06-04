document.addEventListener("DOMContentLoaded", () => {


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

float PI = 3.14;
float tau = 6.28;

float sub(float wave, float mul, float t){
  return sin(wave * mul + tau * t);
}

float sine(float x, float t){
  return sin(tau * t * x);
}

float tri(float x, float t){
  return abs(1.0 - mod((2.0 * t * x), 2.0)) * 2.0 - 1.0;
}


float dsp(float t){
  float n = 44000.0 / 341.5;

  float bass_osc =
    0.8 * tri(n/3.0, t)
  + 0.05 * sine(n*2.0, t)
  ;

  float lfo = sine(0.18, t);
  float lfo_mul = sine(0.04, t);
  float bass_sub =
    0.8 * sub(bass_osc, 2.0 + ((1.0 + lfo) * (2.0 + (1.0 + lfo_mul) * 12.0) ), t)
  + 0.7 * sine(n, t)
  ;

  return 0.4 * bass_sub;
}

void main(){
 	float t = bufferTime + 4.*(gl_FragCoord.y * resolution.x + gl_FragCoord.x) / sampleRate;
	vec4 r = vec4(dsp(t),dsp(t+1.0/sampleRate), dsp(t+2.0/sampleRate), dsp(t+3.0/sampleRate)); 
	fragColor = (r+1.0)/2.0;
}`;

let generator = Synth.G(dsp, 44100, 128, 64);
Synth.P(generator);

});