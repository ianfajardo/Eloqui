var express = require('express'),
    exphbs  = require('express-handlebars'),
    helpers = require('../lib/helpers'),
    path = require('path'),
    passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;;

var app = express();

var hbs = exphbs.create({
	defaultLayout	: 'main',
	helpers			: helpers
});

//app.use("/public", express.static(path.resolve(__dirname + '/../app/public')));
app.use("/public", express.static((__dirname + '/../public')));


app.set('port', (process.env.PORT || 3000));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function(request, response) {
  response.render('home', {
  	title: 'Ian Fajardo - Homepage' 
  });
});

/*app.get('*', function(request, response){
  response.render('home', {
  	title: 'Ian Fajardo - Homepage' 
  });
});*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  console.log(__dirname + '/../public');
});