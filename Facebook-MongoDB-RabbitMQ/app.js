
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var index = require('./routes/index');
var login = require('./routes/login');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require("./routes/mongo");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
//app.use(express.cookieParser());
app.use(express.methodOverride());

var mongoSessionConnectURL = "mongodb://localhost:27017/myfacebook";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);

app.use(expressSession({
	secret: 'cmpe273_MyFacebook',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);
app.post('/checklogin',login.checklogin);
app.get('/homepage',login.homepage);
app.get('/logout',login.logout);
app.get('/signupsuccess',index.signupsuccess);
app.post('/signup',login.signup);
app.get('/fetchuserinfo',login.fetchuserinfo);
app.get('/useroverview',index.useroview);
app.get('/overview',index.overview);
app.get('/friends',index.friends);
app.get('/fetchfrnds',login.fetchfrnds);
app.get('/fetchrequests',login.fetchrequests);


mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});
