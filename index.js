const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mysql = require('mysql');
//const path = require('path');
const appController = require('./appController.js')
var cors = require('cors');

const app = express();
app.use(cors());
//const routes =require('./routes/index.js');
//const usuarios = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
//app.use('/', usuarios);
//app.use(express.static(path.join(__dirname, 'public')));




const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'songohanT1',
	database: 'practica'

});

db.connect((error) => {
	if(error){
		throw error;
	}
	console.log('Connected to database.');
});

app.get('/api/usuario', function(req, res){
	var sql = "SELECT * FROM usuario LIMIT 10 OFFSET ?";
	let userNumber = req.body.userNumber;
	db.query(sql,[userNumber], function(_error, _rows, _cols){
		if(_error){
			res.write(JSON.stringify({
				error: true,
				error_object: _error
			}));
			res.end();
		}else{
			res.status(200).send(_rows)
			//res.write(JSON.stringify(_rows));
			res.end();
		}
	});
});

app.get('/api/usuario/:id', function(req, res){
	var sql = "SELECT * FROM usuario WHERE usuario_id = ?";
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

app.put('/api/usuario/:id', function(req, res){
	let usuario = req.body;
	var sql = "UPDATE usuario SET nombre = ?, apellido = ?, edad = ?, direccion = ? WHERE usuario_id = ?"
	db.query(sql,[usuario.nombre, usuario.apellido, usuario.edad, usuario.direccion, req.params.id], function(_error, _rows, _cols){
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

app.delete('/api/usuario/:id', function(req, res){
	var sql = "DELETE FROM usuario WHERE usuario_id = ?"
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


app.post('/api/usuario', function(req, res){
	let usuario = req.body;
	var sql = "INSERT INTO usuario(nombre, apellido, edad, direccion) values(?,?,?,?)"
	db.query(sql, [usuario.nombre, usuario.apellido, usuario.edad, usuario.direccion],function(_error, _rows, _cols){
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

/*

usuarios.route('/usuarios')
.get(userController.getAllUsers)
.post(userController.addUsers)

usuarios.route('/usuarios/:id')
.get(userController.getById)
.delete(userController.deleteUser)
.put(userController.updateUser)

*/

const server = app.listen(8080, function(){
	console.log('Success. Server listening in port: ' + server.address().port);
});