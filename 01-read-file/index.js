const fs = require('fs');
fs.readFile('text.txt', 'utf8', (err, content) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(content);
});
