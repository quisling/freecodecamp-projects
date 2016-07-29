const http = require('http'); // required for all steps.
const fs = require('fs');

const server = http.createServer();
server.on('request', (req, res) => {
	// If it's a GET request:
	if ( req.method === 'GET' ){
		// and if the GET request is the homepage:
		if ( req.url.match(/.js$|.html$|.css$/) ){
			return res.end(fs.readFileSync(__dirname + req.url));
		}
	}
}).listen(8080);