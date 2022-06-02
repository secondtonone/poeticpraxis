const path = require('path');
const express = require('express');
const compress = require('compression');

const app = express();
const port = 9090;
const host = '0.0.0.0';

app.use(compress());

app.use(express.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Start at http://localhost:9090');
});
