var fs = require('fs');
const { currentDate } = require('./date');


function log(filePath) {
    var newLineChar = require('os').EOL;

    // remember the old log method
    var oldLog = console.log; // remove this line if you only want to log into the file
  
    // create a write stream for the given file path
    var fsLog = fs.createWriteStream(filePath, {
      flags: 'a', // 'a' means appending
      autoClose: true
    })
  
    // override console.log
    console.log = (...messages) => {
  
      // log the console message immediately as usual
      oldLog.apply(console, messages); // remove this line if you only want to log into the file

      // stream message to the file log

      fsLog.write(newLineChar);
      fsLog.write(`${currentDate(6)} - ${messages.join('\n')}`);
      
    }
}


module.exports = {log}