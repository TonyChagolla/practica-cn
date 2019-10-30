const http =  require('http');
const JSONC = require('circular-json');
const bodyParser = require('body-parser');
const request = require('request');
var hostName = 'localhost'
var Url = 'http://localhost:8080/api/usuario/'

var metodo = {
	hostname: hostName,
	port: 8080,
	path: '/api/usuario',
	method: ''
}

var metodo2 = {
	hostname: hostName,
	port: 8080,
	path: '/api/usuario',
	method: ''
}

var idGET = {
	hostname: hostName,
	port: 8080,
	path: '/api/usuario/',
	method: 'GET'
}

var DELETE = {
	hostname: hostName,
	port: 8080,
	path: '/api/usuario/',
	method: 'DELETE',
}



exports.getAllUserss = function(req, res) {
	var str = '';
	metodo.path = '/api/usuario/'
	metodo.method = 'GET';
	callback = function(response){
		response.setEncoding('utf8');
		response.on('data', function(chunk){
			//console.log(d)
			str += chunk;
			//console.log(str)
		});
		response.on('error', function(){
			console.log(str);
			res.send(500);
		});
		response.on('end', function(){
			bodyParser.json(str)
			res.status(200).send(str);
		});
	}
	console.log(metodo)
	var request = http.request(metodo, callback).end()
}

exports.getAllUsers = function(req, resp){
	var success = ''
	console.log(req.body)
	request.get('http://localhost:8080/api/usuario', {
		json: {
	    userNumber: parseInt(req.params.num)
	  }
	}, (error, res, body) => {
	  if (error) {
	    console.error(error)
	    console.log(res)
	    return
	  }
	  console.log(`statusCode: ${res.statusCode}`)
	  //console.log(body)
	  resp.status(200).send(body);

	});
}



exports.getById = function(req, res) {
	var str;
	metodo.metodo = 'GET';
	metodo.path = '/api/usuario/' + req.params.id;
	callback = function(response){
		response.setEncoding('utf8');
		response.on('data', function(chunk){
			str = chunk;
		});
		response.on('error', function(){
			console.log(str);
			res.send(500);
		});
		response.on('end', function(){
			bodyParser.json(str);
			res.status(200).send(str);
		});
	}
	var request = http.request(metodo, callback).end()
}




exports.addUsers = function(req, resp){
	var success = ''
	console.log(req.body)
	request.post(Url, {
		json: {
	    nombre: req.body.nombre,
		apellido: req.body.apellido,
		edad: req.body.edad,
		direccion: req.body.direccion
	  }
	}, (error, res, body) => {
	  if (error) {
	    console.error(error)
	    console.log(res)
	    return
	  }
	  console.log(`statusCode: ${res.statusCode}`)
	  console.log(body)
	  resp.status(200).send(body);

	});
	//resp.status(200).send();

}

exports.updateUser = function(req, resp){
	var dir =  Url + req.params.id;
	console.log(dir)
	request.put(dir, {
		json: {
	    nombre: req.body.nombre,
		apellido: req.body.apellido,
		edad: req.body.edad,
		direccion: req.body.direccion
	  }
	}, (error, res, body) => {
	  if (error) {
	    console.error(error)
	    console.log(res)
	    resp.status(200).send(error);
	    return
	  }
	  console.log(`statusCode: ${res.statusCode}`)
	  console.log(body)
	  resp.status(200).send(body);
	});

}


exports.deleteUser = function(req, res) {
	var str;
	metodo.path = '/api/usuario/' + req.params.id;
	metodo.method = 'DELETE'
	callback = function(response){
		response.setEncoding('utf8');
		response.on('data', function(chunk){
			str = chunk;
		});
		response.on('error', function(){
			console.log(str);
			res.send(500);
		});
		response.on('end', function(){
			bodyParser.json(str);
			res.status(200).send(str);
		});
	}
	var request = http.request(metodo, callback).end()
}
