# demolishedPlayer 1.0.0

## Abstract

At a total weight excluding your custom vertex, and fragment shader code demploshedPlayer has a minified weight of less than 500 bytes .
You are able to attach your own shader as well as provide 1-n textures and provide audio in any format you prefer.  In
this case it will of coz exceed that size :-)

  *Enjoy*

## How to set up at player

Just include demolishedPlayer (Player.jss), create a canvas element, add a shader and execute.

    DP.I(canvas,w,h,vs,fs,textures,audio);


Or just have a look at the example.ts ( .js ) file in the repo.

Where *canvas* is the target element. w & h is the resolution passed to the shader ( uniform ), *vs* is the vertexShader and *fs* is your fragmentShader. *textures* is an object of containg name and data for textures to be used, see ( textures below). *audio* is your prefered audio playback/format, where audio.play() is called upon start automaticly depending of used format.

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


## Audio (music)

Provide any audio that implements a method for playback called  .play() or just and HTML Audio element that autoplays...

## Plans,todo's and thoughts..

1. Include shader minificaion, possible on the ctrt-alt-delete stuff.
2. Include PNGHTML packers..
3. Minify and slim (if possible) the SonantLive player (Synth).. yes, its old but stil rocks the JS Scene!
4. Implement possibillity to use custom uniforms.
5. Keep this as tiny and simple as possible, there is lots of stuff doing crazy stuff out there already so no reason try beat that.   

You wart to particpate in making this better, just let me know.

## Greetings,Salutes

Grettings to the Shadertoy team, Mr Doob and the team of old golden glslsandbox.com and my "local office brought to you by Mr  Merdahad Fatahzadeh" for providing me an office and friendship while coding. Major greets ofcoz goes to Hanna E for all love.

Textutes as stolen from Shadertoy so greets to who ever mate it, as well as the example tune is composed by Björn Lynne (Lynne Publishing) has it origin from  https://www.youtube.com/watch?v=ILP5SSPhJqs ,as master pice!


*Kind reagds, Magnus 'Bagzy' Thor*

