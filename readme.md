 # demolishedPlayer 1.0.1

## Abstract

### Shaders 

At a total weight excluding your custom vertex, and fragment shader code demolishedPlayer has a minified weight of less than 500 bytes.

You are able to attach your own shader as well as provide 1-n textures, or you can use demolishedTextures to render procedual textures. 
It let's provide audio in any format you prefer or use the demolished synth to generate audio /music on the GPU. 

Navigate to https://magnusthor.github.io/demolishedPlayer/ to see an example, or an example published under the demolishedCompressor repo found here https://github.com/MagnusThor/demolishedcompressor  ( see readme for link)

### Audio & GPU Sound 

demolishedPlayer also contains a tiny function that alows you to generate audio using the GPU (mono, stereo in any samplerate) and stream it to the audio card using WebAudio. see /synth/ folder for the first version, or browse a running sample here 


  *Enjoy*

## Install

Just clone repo, copy files  or what ever you want, it is quite simple.

## How to set up at "shader" player

Just include demolishedPlayer (Player.jss), create a canvas element, add a shader and execute.

    DP.I(canvas,w,h,vs,fs,textures,callBack);


Or just have a look at the example.ts ( .js ) file in the repo.

Where *canvas* is the target element. w & h is the resolution passed to the shader ( uniform ), *vs* is the vertexShader and *fs* is your fragmentShader. *textures* is an object of containg name and data for textures to be used, see ( textures below). *callback* is called when 
player is setup and started.

## Textures

Pass *textures * by providing av object such as this

     {
        "iChannel0": {
            "d": "iChannel0.png"
        },
          "iChannel1": {
            "d": "iChannel1.png"
        }
    },

the key myst have an corrisponding sampler2D uniform such as


    uniform sampler2D iChannel0

## Custom uniforms

Provide uniforms to the shader rendering as follows 

    const uniforms = {
      
    "foo": (k,g,p,t) => {
      // do stuff related to unifom foo 
    },
    "bar": (k,g,p,t) => {
      // do stuff
    }            
}

in this case the anonomys function with the signature will be called.  (k,g,p,t) => { } , arguments is as follows 'k' is Uniform Location of the "key", 'g' is GL Context , 'p' is the WebGL program , 't' is the shader playback time in seconds.



## Plans,todo's and thoughts..

1. Automate shader minificaion, possible on the ctrt-alt-test stuff. (https://github.com/laurentlb/Shader_Minifier)
2. ~~Include PNGHTML packers such as JsExe or pnginator.~~  Will use demolishedCompressor
3. Minify and slim (if possible) the SonantLive player (Synth).. yes, its old but still rocks the JS scene ?
4. ~~Implement possibillity to use custom uniforms~~. 
5. Keep this as tiny and simple as possible, there is lots of stuff doing crazy stuff out there already so no reason try beat that.   
  

You wart to particpate in making this better, just let me know. here or just shot an email.

## Using the demolishedPlayer Synth

TBD

## Greetings,Salutes

Grettings to the http://shadertoy.com team, Mr Doob and the team of old golden http.//glslsandbox.com and my "local office brought to you by Mr  Merdahad Fatahzadeh" for providing me an office and friendship while coding. Major greets ofcoz goes to Hanna E for all love.

Textutes as stolen from Shadertoy so greets to who ever made it, as well as the example tune is composed by Björn Lynne (Lynne Publishing) has it origin from  https://www.youtube.com/watch?v=ILP5SSPhJqs ,as masterpice!


*Kind reagds, Magnus 'Bagzy' Thor*

