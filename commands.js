const fs = require("fs");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      done("Not a valid command");
  }
}

  const commandLibrary = {

    "echo": function(userInput) {
      done(userInput);
    },
    "cat": function(fullPath) {
         const fileName = fullPath[0];
         fs.readFile(fileName, (err, data) => {
             if (err) throw err;
             done(data);
         });
     },
     "head": function(fullPath) {
          const fileName = fullPath[0];
          fs.readFile(fileName, (err, data) => {
              let dataString = String(data);
              let header = dataString.split('\n', 2);
              let result = header.join('\n');
              if (err) throw err;
              done(result);
          });
      },
      "tail": function(fullPath) {
           const fileName = fullPath[0];
           fs.readFile(fileName, (err, data) => {
               let dataString = String(data);
               let dataSplit = dataString.split('\n');
               let arrayLength = dataSplit.length - 5;
               dataSplit.splice(0, arrayLength);
               let result = dataSplit.join('\n');
               if (err) throw err;
               done(result);
           });
      }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
