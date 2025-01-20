const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { stdout } = require('process');

const fileStream = fs.createWriteStream(path.join(__dirname, 'output.txt'), {
  flags: 'a',
});

const rl = readline.createInterface(process.stdin, process.stdout);

console.log('Hi! Type something to save to file:');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Bye!');
    process.exit();
  }
  fileStream.write(input + '\n');
});

process.on('SIGINT', sayGoodbye);

rl.on('close', sayGoodbye);

function sayGoodbye() {
  stdout.write('Bye!\n');
  process.exit();
}
