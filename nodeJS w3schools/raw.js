let http = require('http');
let url = require('url');
let date = require('./date');
let PORT = 3000;
http.createServer(function(req, res)
{
    res.writeHead(200, {'content-type' : 'text/javascript'});
    var q  = url.parse(req.url, true).query;
    let curr = q.date + " " + q.month;
    res.end(curr);
}).listen(PORT);
console.log(`port is listening at http://localhost:${PORT}`);

console.log("the date and time are : " + date.myDateTime());
