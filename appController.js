 const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const userController = require('./controllers/userController.js')
var cors = require('cors');

const exphbs = require('express-handlebars');


const app = express();
app.use(cors());
const routes =require('./routes/index.js');
const usuarios = express.Router();

//view

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/', usuarios);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

usuarios.route('/usuario')
.post(userController.addUsers)
//.get(userController.getAllUsers)

usuarios.route('/usuarios/:num')
.get(userController.getAllUsers)

usuarios.route('/usuario/:id')
.get(userController.getById)
.delete(userController.deleteUser)
.put(userController.updateUser)


const server = app.listen(3000, function(){
	console.log('Success. Server listening in port: ' + server.address().port);
})