const express = require('express');
const cluster = require('cluster');

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // Event loop is completely blocked
  }
}

app.get('/', (req, res) => {
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}
  // [5,4,3,2,1].sort()
  res.send(`Performance Example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(9000);
  res.send(`Ding ding ding!: ${process.pid}`);
});

console.log('Running server.js....');
if (cluster.isMaster) {
  console.log('Master has been started...');
  cluster.fork();
  cluster.fork();
} else {
  console.log('Worker process started....');
  app.listen(3000);
}
