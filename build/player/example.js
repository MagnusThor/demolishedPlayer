document.addEventListener("DOMContentLoaded", function () {
    var uniforms = {
        "fx": function (k, g, p, t) {
            g.f1(k, t / 126.0);
        },
    };
    P.I(document.querySelector("canvas"), "layout(location = 0) in vec2 pos; \n    out vec4 fragColor;\n    void main() { \n        gl_Position = vec4(pos.xy,0.0,1.0);\n    }", "uniform float fx;uniform float time;uniform vec2 resolution;uniform sampler2D iChannelA,iChannelB;out vec4 fragColor;const int f=3;const float g=.4,m=100.,v=.15;float t=21.;mat2 r=mat2(1.6,1.2,-1.2,1.6);float s(vec2 v){float f=dot(v,vec2(127.1,311.7));return fract(sin(f)*43758.5);}float n(in vec2 v){vec2 f=floor(v),r=fract(v),d=r*r*(3.-2.*r);return-1.+2.*mix(mix(s(f+vec2(0.,0.)),s(f+vec2(1.,0.)),d.r),mix(s(f+vec2(0.,1.)),s(f+vec2(1.,1.)),d.r),d.g);}float n(vec2 v,float f){v+=n(v);vec2 r=1.-abs(sin(v)),d=abs(cos(v));r=mix(r,d,r);return pow(1.-pow(r.r*r.g,.65),f);}float x(vec3 d){float s=v,e=g,i=m;vec2 c=d.rb;c.r*=.75;float p,a=0.;for(int u=0;u<f;u++)p=n((c+t)*s,i),p+=n((c-t)*s,i),a+=p*e,c*=r,s*=1.9,e*=.22,i=mix(i,1.,.2);return d.g-a;}void main(){float dd = fx;vec2 f=gl_FragCoord.rg/resolution.rg/4.;float v=1.-gl_FragCoord.g/resolution.g,r=gl_FragCoord.r/12.-time+sin(gl_FragCoord.r*.01+time*.1),d=pow(v+n(vec2(1.,0.)+gl_FragCoord.rg/resolution)*v+sin(gl_FragCoord.g*.0001),.6),i=gl_FragCoord.g/10.-time+cos(gl_FragCoord.r*.01+time*.1);fragColor=vec4(vec3(x(vec3(r,d,i))),1.);}\n    ", innerWidth, innerHeight, {}, function (c, p) {
        console.log("Rendering is started", c, p);
    }, uniforms);
});