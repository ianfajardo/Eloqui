var express = require('express'), 
    exphbs  = require('express-handlebars'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    bodyparser = require('body-parser')
    helpers = require('../lib/helpers'),
    path = require('path'),
    passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;

var app = express();

//config
var configDB = require('../config/db.js');

//mongoose connect
mongoose.Promise = global.Promise;
mongoose.connect(configDB.database);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("open");
});

require('../config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyparser());

//set handlebars view
var hbs = exphbs.create({
  defaultLayout : 'main',
  helpers     : helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/*if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}*/

app.use(session({ secret: configDB.secret }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use("/public", express.static((__dirname + '/public')));

require('../routes/routes.js')(app, passport);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  console.log(__dirname + '/public');
});