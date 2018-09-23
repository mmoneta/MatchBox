const express = require('express'),
app = express(),
http = require('http'),
server = http.createServer(app);

app.use(express.static('static'));
server.listen(3000);
console.log('Server started on port: ', server.address().port);
