

const ClosureCompiler = require('google-closure-compiler').jsCompiler;




const closureCompiler = new ClosureCompiler({
    js: ['/build/Player/Player.js'],
    compilation_level: 'SIMPLE',
    js_output_file: 'out.js',
    debug: true
  });
  
  const compilerProcess = closureCompiler.run((exitCode, stdOut, stdErr) => {
    //compilation complete
    console.log("foo");
    
  });

