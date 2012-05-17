var http = require("http");
var url = require("url");
var formidable = require("formidable");
var querystring = require("querystring");

function start(route, handle) {
  function onRequest(request, response) {
	try{
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		
		
		if(request.method.toLowerCase() == 'post'){
			var form = new formidable.IncomingForm();
			form.parse(request, function(err, fields, files) {
				if(!err){
					route(handle, pathname, response, fields, files);
				}else{
					console.log(err);
					response.writeHead(500, {"Content-Type": "text/plain"});
					response.write("Internal Server Error\n");
					response.end();
				}
			});
		}else{
			route(handle, pathname, response,  querystring.parse(url.parse(request.url).query), null);
		}
	}catch(e){
		response.writeHead(500, {"Content-Type": "text/plain"});
	    response.write("Internal Server Error\n");
	    response.end();
		console.log(e);
		console.log(e.stack);
	}
   
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;