// we need the http and fs modules to make the app work ( 10 lines to make a webserver)
var http = require("http");
var fs = require("fs")

// Include socket.io which was installed by npm. It is NOT part of core.
var socketio = require("socket.io");

var server = http.createServer((req, res)=>{
	console.log("someone connected via HTTP!");
	fs.readFile('index.html','utf-8',(error,data)=>{
		//console.log(error);
		//console.log(data);
		if(error){
			res.writeHead(500,{'content-type': 'text/html'});
			res.end('Internal Server Error');
		}else{
			res.writeHead(200,{'content-type':'text/html'});
			res.end(data);
		}
	});
});

var io = socketio.listen(server);
//handle socket connections..
io.sockets.on('connect',(socket)=>{;
	console.log("someone connected via socket!");
	//console.log(socket);

	socket.on('nameToServer',(name)=>{ // notice singular socket
		console.log(name + "just joined.");
		io.sockets.emit('newUser',name); // notice the info is being sent to multiple sockets.(plural)
	});
	socket.on('sendMessage',()=>{
		console.log('Someone clicked on the big blue button.');
	});
});

// console.log("the node file is working");
server.listen(8080); //someone listening on the line on your call
console.log("listening on port 8080");
// ******************************************************