
//global variables
var shellWorker


var shell = require('shelljs');



var fs = require('fs');
 
if (process.platform == 'win32'||process.platform == 'linux') {

var homePath = "."

    
}

if (process.platform == 'darwin'){

    var homePath = home

}

process.on('message', (infoArray) => {

console.log("shellThread")


if(infoArray[0]=="processFile"){


var workerCommand = infoArray[1];


shellWorker = shell.exec(workerCommand, function(code, stdout, stderr,stdin) {
 //console.log('Exit code:', code);

process.send("Exit,"+code);


  //console.log('Program output:', stdout+"    PID:"+shellWorker.pid);


 //console.log('stderr:', stderr);


 //fs.appendFileSync(homePath+"/HBBatchBeast/Config/Processes/WorkerStatus/Console/ShellLog.txt", "exit", 'utf8');

process.exit()
});
}


if(infoArray[0]=="exitThread"){

    


try{


if(process.platform=='win32'){
var killCommand = 'taskkill /PID '+shellWorker.pid+' /T /F'
}
if(process.platform=='linux'){
//var killCommand = 'vps -o pid --no-headers --ppid ' + shellWorker.pid
var killCommand = 'pkill ' + shellWorker.pid
}
if(process.platform=='darwin'){
var killCommand = 'pgrep -P ' + shellWorker.pid
}


 if (shell.exec(killCommand).code !== 0) {
  shell.exit(1);
}




     
    }catch(err){

    }


process.send("Exit,"+"Cancelled");
    

process.exit();

}



});