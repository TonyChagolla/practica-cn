const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mysql = require('mysql');
//const path = require('path');

const app = express();
app.use(bodyParser.json());
//app.use(methodOverride());
//app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'songohanT1',
	database: 'prueba'

});

db.connect((error) => {
	if(error){
		throw error;
	}
	console.log('Connected to database.');
});

app.get('/', function(req, res){
	var sql = "SELECT * FROM clientes";
	db.query(sql, function(_error, _rows, _cols){
		if(_error){
			res.write(JSON.stringify({
				error: true,
				error_object: _error
			}));
			res.end();
		}else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	});
});

app.put('/', function(req, res){

	var sql = "UPDATE clientes SET nombre = 'Tony' WHERE clientes_id = '60'";
	db.query(sql, function(_error, _rows, _cols){
		if(_error){
			res.write(JSON.stringify({
				error: true,
				error_object: _error
			}));
			res.end();
		}else{
			res.end();
		}
	});
});

app.delete('/:id', function(req, res){
	var sql = "SELECT * FROM clientes WHERE clientes_id = ?"
	db.query(sql, [req.params.id],function(_error, _rows, _cols){
		if(_error){
			res.write(JSON.stringify({
				error: true,
				error_object: _error
			}));
			res.end();
		}else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	});
});


app.post('/', function(req, res){
	let name = req.body;
	var sql = "INSERT INTO clientes(nombre) values(?)"
	db.query(sql, [name.nombre],function(_error, _rows, _cols){
		if(_error){
			res.write(JSON.stringify({
				error: true,
				error_object: _error
			}));
			res.end();
		}else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	});
});

const server = app.listen(8080, function(){
	console.log('Success. Server listening in port: ' + server.address().port);
});