const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createWriteStream('output.txt', {
  flags: 'a',
});
// 'a' flag is for appending to the file
const rl = readline.createInterface(process.stdin, process.stdout);

console.log('Hi! Type something to save to file:');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Bye!');
    process.exit();
  }
  fileStream.write(input + '\n');
});
// Close the file stream when the process is interrupted
process.on('SIGINT', () => {
  console.log('\nBye!');
  process.exit();
});
