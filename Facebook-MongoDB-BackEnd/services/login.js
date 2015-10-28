var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";

exports.checklogin = function(req,callback){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("inside checklogin");
	var userid = req.userid;
	var pwd = req.pwd;
	var res={};	
	
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userdetails');
		

		coll.findOne({userid:userid, pwd:pwd}, function(err, user){
			
			if (user) {
				// This way subsequent requests will know the user is logged in.
				/*console.log("req.session"+req.session);
				req.session.userid = user.userid;
				console.log("req.session.userid:"+req.session.userid);
				console.log(req.session.userid +" is the session");*/
				//json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				console.log("after db operation:"+user);
				res.code = "200";

			} else {
				console.log("err: "+err);
				console.log("user: "+user);
				console.log("returned false");
				//json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				res.code = "401";
			}
			callback(null, res);
		});
	});
};

exports.fetchuserinfo = function(req,callback){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("inside fetchuserinfo");
	var userid = req.userid;
	//var pwd = req.pwd;
	var res={};	
	
	var json_responses;
	console.log("userid: "+userid);

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userdetails');
		

		coll.findOne({userid:userid}, function(err, user){
			
			if (user) {
				// This way subsequent requests will know the user is logged in.
				/*console.log("req.session"+req.session);
				req.session.userid = user.userid;
				console.log("req.session.userid:"+req.session.userid);
				console.log(req.session.userid +" is the session");*/
				//json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				console.log("after db operation:"+user);
				res = {"userid":user.userid,"fname":user.fname,"lname":user.lname,"gender":user.gender,"dob":user.userid};
				console.log("res* :"+res.fname);

			} else {
				console.log("err: "+err);
				console.log("user: "+user);
				console.log("returned false");
				//json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				res.code = "401";
			}
			callback(null, res);
		});
	});
};

exports.signup = function(req,callback){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("inside signup");
	
	var userid = req.userid;
	var pwd = req.pwd;
	var fname = req.fname;
	var lname = req.lname;
	var dob = req.dob;
	var gender = req.gender;
	var res= {};
	
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userdetails');
		

		coll.insert({userid:userid, pwd:pwd, fname:fname, lname:lname, dob:dob, gender:gender}, function(err, user){
			
			//console.log("user :"+user.WriteResult);
			if(err){
				console.log("err: "+err);
				console.log("user: "+user);
				console.log("returned false");
				//json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				res.code = "401";
				
			} else {
				console.log("after db operation:");
				res.code = "200";
			}
			callback(null, res);
			
			/*if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log("req.session"+req.session);
				req.session.userid = user.userid;
				console.log("req.session.userid:"+req.session.userid);
				console.log(req.session.userid +" is the session");
				//json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				

			} else {
				
			}*/
			
		});
	});
};

exports.fetchfrnds = function(req,callback){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("inside fetchfrnds");
	
	var userid = req.userid;
	var res= {};
	
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userdetails');
		

		coll.find({userid:userid},{friend:1}, function(err, user){
			
			//console.log("user :"+user.WriteResult);
			if(err){
				console.log("err: "+err);
				console.log("user: "+user);
				console.log("returned false");
				//json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				res.code = "401";
				
			} else {
				console.log("after db operation:");
				console.log("user"+user);
				//res.json{user};
				res.code = "200";
			}
			callback(null, res);
			
			/*if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log("req.session"+req.session);
				req.session.userid = user.userid;
				console.log("req.session.userid:"+req.session.userid);
				console.log(req.session.userid +" is the session");
				//json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				

			} else {
				
			}*/
			
		});
	});
};

exports.fetchrequests = function(req,callback){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("inside fetchrequests");
	
	var userid = req.userid;
	var res= {};
	
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userdetails');
		

		coll.find({userid:userid},{friendreq:1}, function(err, user){
			
			//console.log("user :"+user.WriteResult);
			if(err){
				console.log("err: "+err);
				console.log("user: "+user);
				console.log("returned false");
				//json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				res.code = "401";
				
			} else {
				console.log("after db operation:");
				console.log("user"+user);
				//res.json{user};
				res.code = "200";
			}
			callback(null, res);
			
			/*if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log("req.session"+req.session);
				req.session.userid = user.userid;
				console.log("req.session.userid:"+req.session.userid);
				console.log(req.session.userid +" is the session");
				//json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				

			} else {
				
			}*/
			
		});
	});
};

