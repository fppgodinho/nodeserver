var http        = require('http');
var httpProxy   = require('http-proxy');

var node        = new httpProxy.createProxyServer({
    target: { host: 'localhost', port: 81 }
});
var apache      = new httpProxy.createProxyServer({
    target: { host: 'localhost', port: 8080 }
});

var proxyServer = http.createServer(function (req, res)                         {
    var host    = req.headers.host.split(':')[0];
    switch(host)                                                                {
        case 'trcraftingbuddyapi.darkhounds.net':   node.web(req, res);     break;
        default:                                    apache.web(req, res);   break;
    }
}).listen(80);


var nodeServer = http.createServer(function (req, res)                          {
    res.write('Hello world');
    res.end();
}).listen(81);