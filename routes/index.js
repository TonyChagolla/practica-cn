var express = require('express');
var router = express.Router();

router.get('http://10.42.0.1:8080/', function(req, res, next){
	res.render('index', {title: 'Usuarios' });
});

module.exports = router;