var path = require('path');
var express = require('express');

var app = express();

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(9090, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Start at http://localhost:9090');
});