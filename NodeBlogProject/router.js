
var fs = require('fs');
var stream=require('stream');
var path = require('path');
var Blog = require("./blog");


var mimeTypes = {
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};



function route(handle, pathname, response, fields, files){
	
  	console.log("About to route a request for " + pathname);
	var file;
	var contentType;
	
	if(strEndsWithMime(pathname)){
		var filename = path.join(process.cwd(), "theme/"+pathname);
		path.exists(filename, function(exists) {
			if(!exists) {
				console.log("not exists: " + filename);
				response.writeHead(404, {'Content-Type': 'text/plain'});
				response.write('404 Not Found\n');
				response.end();
			}
			
			response.writeHead(200, {'Content-Type':getMime(pathname)});
	
			var input = fs.createReadStream(filename);
			input.on('data', function(data) {
					response.write(data);
			});
			input.on('end', function(close) {	
				 response.end();
			});
		
	
		}); //end path.exists
	}else if ( pathname.indexOf("/blog") == 0){
		
		
		response.writeHead(200, {"Content-Type": "text/html"});
		
		var headerFileStream = fs.createReadStream('theme/header.html');
		
		headerFileStream.on('data', function(data) {
				response.write(data);
		});
		
		headerFileStream.on('end', function(close) {	
			
			var blog = new Blog();
			//BLOG!
			if(pathname.length>6){
				//
				var url=pathname.substring(6, pathname.length);
				console.log("Searchin for "+url);
				blog.getEntry(url,response);
			}else{
				//index blogs
				blog.readBlogs(response);
			}
			blog.on('end', function(message){
			
				var footerFileStream = fs.createReadStream('theme/footer.html');
			
				footerFileStream.on('data', function(data) {
						response.write(data);
				});
				
				footerFileStream.on('end', function(close) {	
					response.end();
				});
			});
		});
		
		
		
	}else if (typeof handle[pathname] === 'function') {
		//THEME
		
		response.writeHead(200, {"Content-Type": "text/html"});
		
		var headerFileStream = fs.createReadStream('theme/header.html');
		
		headerFileStream.on('data', function(data) {
				response.write(data);
		});
		
		headerFileStream.on('end', function(close) {	
			handle[pathname](response,  fields, files);
			
			var footerFileStream = fs.createReadStream('theme/footer.html');
		
			footerFileStream.on('data', function(data) {
					response.write(data);
			});
			
			footerFileStream.on('end', function(close) {	
				response.end();
			});
		});
			
		//END THEME
		
	  } else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	  }
	  
	  return;
}


function strEndsWithMime(str){
	for (var i in mimeTypes) {
		if(strEndsWith(str,"."+i)){
			return true;
		}
	}
	return false;
}

function getMime(str){
	for (var i in mimeTypes) {
		if(strEndsWith(str,"."+i)){
			return mimeTypes[i];
		}
	}
	return null;
}

function strEndsWith(str, suffix) {
    return str.match(suffix+"$")==suffix;
}

exports.route = route;