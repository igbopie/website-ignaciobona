var fs = require('fs');
	
function start(response,fields, files) {
 	staticPage("index",response);
}

function profile(response,  fields, files) {
 	staticPage("profile",response);
}

function portfolio(response,  fields, files) {
 	staticPage("portfolio",response);
}



function staticPage(name,response){
	var input = fs.createReadStream("theme/"+name+".html");
	input.on('data', function(data) {
		response.write(data);
	})
}

exports.start = start;

exports.profile = profile;

exports.portfolio = portfolio;