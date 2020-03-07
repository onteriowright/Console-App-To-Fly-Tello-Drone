const dgram = require("dgram");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const drone = dgram.createSocket("udp4");

const HOST = "192.168.10.1";
const PORT = 8889;

drone.bind(PORT);

const handleError = err => {
  if (err) {
    Console.log(err);
  } else {
    console.log(
      "Drone successfully recieved command! Waiting for response....."
    );
  }
};

const sendCommand = command => {
  drone.send(command, 0, command.length, PORT, HOST, handleError);
};

drone.on("message", msg => {
  console.log(`Message recieved from drone: ${msg} 👌`);
});

(function userInput() {
  rl.question("Enter command: ", command => {
    if (command === "") {
      console.log("Closing App");
    } else {
      sendCommand(command);
      userInput();
    }
  });
})();
