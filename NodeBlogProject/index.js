var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/profile"] = requestHandlers.profile;
handle["/profile/"] = requestHandlers.profile;
handle["/portfolio"] = requestHandlers.portfolio;
handle["/portfolio/"] = requestHandlers.portfolio;

server.start(router.route, handle);