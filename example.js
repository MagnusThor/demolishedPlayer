document.addEventListener("DOMContentLoaded", function () {
    DP.I(document.querySelector("canvas"), "#version 300 es\n#ifdef GL_ES\nprecision highp float;\nprecision highp int;\nprecision mediump sampler3D;\n#endif\nlayout(location = 0) in vec2 pos; \nout vec4 fragColor;\nvoid main() { \n\tgl_Position = vec4(pos.xy,0.0,1.0);\n}", "#version 300 es\n#ifdef GL_ES\nprecision highp float;\nprecision highp int;\nprecision mediump sampler3D;\n#endif\n\nuniform float time;\nuniform vec2 resolution;\nuniform sampler2D iChannel0;\nuniform sampler2D iChannel1;\n\nconst float PI = 3.14159265359;\n\nvec3 raymarche( in vec3 ro, in vec3 rd, in vec2 nfplane );\nvec3 normal( in vec3 p );\n\nfloat sphere(in vec3 p,in float r){\n\treturn length(p) - r;\n}\nfloat box( in vec3 p, in vec3 data );\nfloat map( in vec3 p );\n\nmat3 lookat( in vec3 fw, in vec3 up );\nmat3 rotate( in vec3 v, in float angle);\n\nout vec4 fragColor;\n\n#define HASHSCALE1 .1031\n\nfloat hash(float p){\n\tvec3 p3  = fract(vec3(p) * HASHSCALE1);\n    p3 += dot(p3, p3.yzx + 19.19);\n    return fract((p3.x + p3.y) * p3.z);\n}\n\nvec3 randomSphereDir(vec2 rnd)\n{\n\tfloat s = rnd.x*PI*2.;\n\tfloat t = rnd.y*2.-1.;\n\treturn vec3(sin(s), cos(s), t) / sqrt(1.0 + t * t);\n}\nvec3 randomHemisphereDir(vec3 dir, float i){\n\tvec3 v = randomSphereDir( vec2(hash(i+1.), hash(i+2.)) );\n\treturn v * sign(dot(v, dir));\n}\n\nfloat ambientOcclusion( in vec3 p, in vec3 n, in float maxDist, in float falloff )\n{\n\tconst int nbIte = 32;\n    const float nbIteInv = 1./float(nbIte);\n    const float rad = 1.-1.*nbIteInv; //Hemispherical factor (self occlusion correction)\n    float ao = 0.0;    \n    for( int i=0; i<nbIte; i++ ){\n        float l = hash(float(i))*maxDist;\n        vec3 rd = normalize(n+randomHemisphereDir(n, l )*rad)*l; // mix direction with the normal\n\t        ao += (l - max(map( p + rd ),0.)) / maxDist * falloff;\n    }\t\n    return clamp( 1.-ao*nbIteInv, 0., 1.);\n}\n//Shading\nvec3 shade( in vec3 p, in vec3 n, in vec3 org, in vec3 dir, vec2 v ){\t\t\n    vec3 col = vec3(1.);\t\n    float a = ambientOcclusion(p,n, 4., 2.);\n    col *= a;\n    return col;\n}\nvoid main( void ) {\n\n    vec2 q = gl_FragCoord.xy/resolution.xy;\n    \n\tvec2 v = -1.0+2.0*q;\n\t\t v.x *= resolution.x/resolution.y;\n\t\n\t//camera ray\n\tfloat ctime = (time);\n\n\tvec3 ro = vec3( cos(ctime)*5.,10.+cos(ctime*.5)*3.,-13.+sin(ctime) );\n   \n       \n\tvec3 rd = normalize( vec3(v.x, v.y, 1.5) );\n\trd = lookat( -ro + vec3(0., 5., -1.), vec3(0., 1., 0.) ) * rd;   \n    vec3 p = raymarche(ro, rd, vec2(1., 30.) );\n\tvec3 n = normal(p.xyz);\n\tvec3 col = shade(p, n, ro, rd, q);\n\tcol = pow(col, vec3(1./2.2));\n    fragColor = vec4(col,1.0);\n}    \nfloat map( in vec3 p )\n{\n\tfloat d = -box(p-vec3(0.,10.,0.),vec3(10.));\n\td = min(d, box(rotate(vec3(0.,1.,0.), 1.)*(p-vec3(4.,5.,6.)), vec3(3.,5.,3.)) );\n\td = min(d, box(rotate(vec3(0.,1.,0.),-1.)*(p-vec3(-4.,2.,0.)), vec3(2.)) );\n\td = max(d, -p.z-9.1);\t\n\treturn d;\n}\nvec3 raymarche( in vec3 ro, in vec3 rd, in vec2 nfplane )\n{\n\tvec3 p = ro+rd*nfplane.x;\n\tfloat t = 0.;\n\tfor(int i=0; i<64; i++)\n\t{\n        float d = map(p);\n        t += d;\n        p += rd*d;\n\t\tif( d < 0.001 || t > nfplane.y )\n            break;\n            \n\t}\n\t\n\treturn p;\n}\nvec3 normal( in vec3 p )\n{\n\tvec3 eps = vec3(0.001, 0.0, 0.0);\n\treturn normalize( vec3(\n\t\tmap(p+eps.xyy)-map(p-eps.xyy),\n\t\tmap(p+eps.yxy)-map(p-eps.yxy),\n\t\tmap(p+eps.yyx)-map(p-eps.yyx)\n\t) );\n}\n\nfloat box( in vec3 p, in vec3 data )\n{\n    return max(max(abs(p.x)-data.x,abs(p.y)-data.y),abs(p.z)-data.z);\n}\n\n\nmat3 lookat( in vec3 fw, in vec3 up )\n{\n\tfw = normalize(fw);\n\tvec3 rt = normalize( cross(fw, normalize(up)) );\n\treturn mat3( rt, cross(rt, fw), fw );\n}\n\nmat3 rotate( in vec3 v, in float angle)\n{\n\tfloat c = cos(angle);\n\tfloat s = sin(angle);\n\t\n\treturn mat3(c + (1.0 - c) * v.x * v.x, (1.0 - c) * v.x * v.y - s * v.z, (1.0 - c) * v.x * v.z + s * v.y,\n\t\t(1.0 - c) * v.x * v.y + s * v.z, c + (1.0 - c) * v.y * v.y, (1.0 - c) * v.y * v.z - s * v.x,\n\t\t(1.0 - c) * v.x * v.z - s * v.y, (1.0 - c) * v.y * v.z + s * v.x, c + (1.0 - c) * v.z * v.z\n\t\t);\n}\n\n", innerWidth, innerHeight, {
        "iChannel0": {
            "d": "iChannel0.png"
        }
    }, document.querySelector("audio"));
});