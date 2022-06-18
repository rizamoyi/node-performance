const express = require('express');

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // Event loop is completely blocked
  }
}

app.get('/', (req, res) => {
  res.send(`Performance Example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(4000);
  res.send(`Beep beep beep!: ${process.pid}`);
});

console.log('Running server.js....');
console.log('Worker process started....');
app.listen(3000);
