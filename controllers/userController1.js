const http =  require('http');
const JSONC = require('circular-json');
const bodyParser = require('body-parser');
const request = require('request');


var metodo = {
	hostname: 'localhost',
	port: 8080,
	path: '/api/usuario',
	method: ''
}

var idGET = {
	hostname: 'localhost',
	port: 8080,
	path: '/api/usuario/',
	method: 'GET'
}

var DELETE = {
	hostname: 'localhost',
	port: 8080,
	path: '/api/usuario/',
	method: 'DELETE'
}



exports.getAllUsers = function(req, res) {
	var success = ''
	request('http://localhost:8080/api/usuario', function(error, response, body){
		console.log(response.headers)
		success = body
		res.status(200).send(bodyParser.json(success));
	})
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
	request.post('http://localhost:8080/api/usuario', {
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
	});
	resp.status(200).send('Success');

}

exports.updateUser = function(req, resp){
	var dir =  'http://localhost:8080/api/usuario/' + req.params.id;
	console.log(dir)
	request.put(dir, {
		json: {
	    nombre: req.body.firstName,
		apellido: req.body.lastName,
		edad: req.body.age,
		direccion: req.body.address
	  }
	}, (error, res, body) => {
	  if (error) {
	    console.error(error)
	    console.log(res)
	    return
	  }
	  console.log(`statusCode: ${res.statusCode}`)
	  console.log(body)
	});
	resp.status(200).send('Success');

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
