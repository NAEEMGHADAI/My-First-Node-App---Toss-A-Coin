const http = require("http");
const fs = require("fs");
const url = require("url");
const figlet = require("figlet");

function fsReadFileRes(contentType, fileName, res) {
	fs.readFile(fileName, function (err, data) {
		res.writeHead(200, { "Content-Type": contentType });
		res.write(data);
		res.end();
	});
}

const server = http.createServer((req, res) => {
	let reqUrl = url.parse(req.url);
	const page = reqUrl.pathname;
	console.log(page);
	if (page === "/") {
		fsReadFileRes("text/html", "index.html", res);
	} else if (page === "/toss") {
		let flip = Math.ceil(Math.random() * 10) > 5 ? "head" : "tail";
		let objJson = {
			flip,
		};
		res.write(JSON.stringify(objJson));
		res.end();
	} else if (page == "/css/style.css") {
		fsReadFileRes("text/css", "css/style.css", res);
	} else if (page === "/js/main.js") {
		fsReadFileRes("text/javascript", "js/main.js", res);
	} else {
		figlet("404!!", function (err, data) {
			if (err) {
				console.log("Something went wrong...");
				console.dir(err);
				return;
			}
			res.write(data);
			res.end();
		});
	}
});

server.listen(8000, () => {
	console.log("Server Running on 8000");
});
