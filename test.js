var http = require('http');
http.createServer(function (req, res) {
   res.end('<h1>CLGT</h1> <button>add</button>',
   '<input type ="text">');

}).listen(4000,console.log('sv start is port:',4000));