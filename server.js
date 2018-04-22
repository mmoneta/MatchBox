var http = require("http");
var fs = require("fs");
var mime = require("mime-types");
var server = http.createServer(function (request, response) {
  switch (request.method) {
    case "GET":
      if (request.url === "/") {
        fs.readFile("static/index.html", function (error, data) {
          if (error) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.write("<h1>Error 404: file not found<h1>");
            response.end();
          }
          else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
          }
        })
      }
      else {
        request.url = request.url.replace(/%20/g, " ");
        var path = "static/" + request.url;
        var filestream = fs.createReadStream(path);
        filestream.on("open", function () {
          var stats = fs.statSync(path);
          response.writeHead(200, {
            'Content-Type': mime.lookup(path),
            'Content-Length': stats.size
          });
          filestream.pipe(response);
        });
        filestream.on('error', function (err) {
          filestream.end();
          console.log(err);
        });
      }
      break;
    case "POST":

      break;
  }
});

server.listen(3000);
console.log("Server starts on port 3000")
