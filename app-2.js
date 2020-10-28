var express = require('express');
var app = express();
app.get('/url', (req, res, next) => {
  console.log('/url called');
  res.json(['Tony', 'Lisa', 'Michael', 'Ginger', 'Food']);
});

app.get('/', (req, res, next) => {
  console.log('/ called');
  res.end('ok');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
