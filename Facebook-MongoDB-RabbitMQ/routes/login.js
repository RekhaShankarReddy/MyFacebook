var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.checklogin = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var userid = req.param("userid");
	var pwd = req.param("pwd");
	var msg_payload = { "userid": userid, "pwd": pwd };	
	
    mq_client.make_request('login_queue',msg_payload, function(err,results){
		
    	
		console.log(results);
		if(err){
			console.log("callig err callback");
			res.json({
				statusCode:500
			});
			//callback(err,null);
			//res.send({"statusCode":"500"});
			//callback(err,null);
		}
		else 
		{
			console.log("results:"+results);
			console.log("callig 200 callback");
			if(results.code == 200){
				console.log("valid Login");
				res.json({
					statusCode:200
				});
				
				//callback(null,res);
				//res.send({"statusCode":"200"});
			}
			else {    
				
				console.log("Invalid Login");
				console.log("callig 401 callback");
				res.json({
					statusCode:401
				});
				
				//callback(null,res);
				//res.send({"statusCode":"401"});
			}
		}  
	});
};

exports.homepage = function(req,res){
	//Checks before redirecting whether the session is valid
	/*if(req.session.userid)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('homepage',{userid:req.session.userid});
	}
	else
	{
		res.redirect('/');
	}*/
	
	res.render('homepage');
};

exports.logout = function(req,res){
	//req.session.destroy();
	//res.render('index', { title: 'Express' });
	res.redirect('/');
};

exports.signup = function(req,res){
	var userid = req.param("userid");
	var pwd = req.param("pwd");
	var fname = req.param("fname");
	var lname = req.param("lname");
	var dob = req.param("dob");
	var gender = req.param("gender");
	var msg_payload = {"userid":userid, "pwd":pwd, "fname":fname, "lname":lname, "dob":dob, "gender":gender};	
	
	var json_responses;
	
    mq_client.make_request('signup_queue',msg_payload, function(err,results){
		
    	
		console.log("results:"+results);
		if(err){
			//console.log("callig err callback");
			//callback(err,null);
			//res.send({"statusCode":"500"});
			res.json({
				statusCode:500
			});
			//callback(err,null);
		}
		else 
		{
			console.log("results:"+results);
			if(results.code == 401){
				//console.log("valid Login");
				
				console.log("callig 401 callback");
				res.json({
					statusCode:401
				});
				//callback(null,res);
				//res.send({"statusCode":"200"});
			}
			else {    
				
				//console.log("Invalid Login");
				
				console.log("callig 200 callback");
				res.json({
					statusCode:200
				});
				//callback(null,res);
				//res.send({"statusCode":"401"});
			}
		}
		
    });
	/*mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userdetails');
		

		coll.insert({userid:userid, pwd:pwd, fname:fname, lname:lname, dob:dob, gender:gender}, function(err, user){
			if (err) {
				// This way subsequent requests will know the user is logged in.
				json_responses = {"statusCode" : 401};
				res.send(json_responses);

			} else {
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
			}
		});
	});	*/
};

exports.fetchuserinfo = function(req,res){

	//var userid = req.session.userid;
	var userid = "rekha@gmail.com";
	var fname, lname, dob, gender;
	var json_responses;

    var msg_payload = { "userid": userid};	
	
    mq_client.make_request('fetchuser_queue',msg_payload, function(err,results){
		
    	
		console.log("results:"+results);
		if(err){
			//console.log("callig err callback");
			//callback(err,null);
			//res.send({"statusCode":"500"});
			//callback(err,null);
			res.json({
				statusCode:500
			});
		}
		else 
		{
			console.log("results:"+results);
			if(results.code == 401){
				//console.log("valid Login");
				
				console.log("callig 401 callback");
				//callback(null,res);
				res.json({
					statusCode:401
				});
				//res.send({"statusCode":"200"});
			}
			else {    
				
				//console.log("Invalid Login");
				console.log("callig 200 callback");
				
				res.json({
					fname:results.fname,
					lname:results.lname
				});
				
				//callback(null,res);
				//res.send({"statusCode":"401"});
			}
		}  
	});
	/*mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userdetails');
		
		coll.findOne({userid:userid}, function(err, user){
			if (user) {
				
				console.log("user.userid"+user.userid);
				// This way subsequent requests will know the user is logged in.
				json_responses = {"statusCode" : 200,"userid" : user.userid,"fname" : user.fname,"lname" : user.lname,"dob" : user.dob,"gender" : user.gender};
				res.send(json_responses);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});*/
};

exports.fetchfrnds = function(req,res){

	
	var userid = "rekha@gmail.com";
	//var fname, lname, dob, gender;
	var json_responses;

    var msg_payload = {"userid": userid};	
	
    mq_client.make_request('fetchfrnds_queue',msg_payload, function(err,results){
		
    	
		console.log("results:"+results);
		if(err){
			//console.log("callig err callback");
			//callback(err,null);
			//res.send({"statusCode":"500"});
			//callback(err,null);
			res.json({
				statusCode:500
			});
		}
		else 
		{
			console.log("results:"+results);
			if(results.code == 401){
				//console.log("valid Login");
				
				console.log("callig 401 callback");
				//callback(null,res);
				res.json({
					statusCode:401
				});
				//res.send({"statusCode":"200"});
			}
			else {    
				
				//console.log("Invalid Login");
				console.log("callig 200 callback");
				
				res.json({
					fname:results.fname,
					lname:results.lname,
					userid:results.userid
				});
			}
		}  
	});
	
};

exports.fetchrequests = function(req,res){

	
	var userid = "rekha@gmail.com";
	//var fname, lname, dob, gender;
	var json_responses;

    var msg_payload = {"userid": userid};	
	
    mq_client.make_request('fetchrequests_queue',msg_payload, function(err,results){
		
    	
		console.log("results:"+results);
		if(err){
			//console.log("callig err callback");
			//callback(err,null);
			//res.send({"statusCode":"500"});
			//callback(err,null);
			res.json({
				statusCode:500
			});
		}
		else 
		{
			console.log("results:"+results);
			if(results.code == 401){
				//console.log("valid Login");
				
				console.log("callig 401 callback");
				//callback(null,res);
				res.json({
					statusCode:401
				});
				//res.send({"statusCode":"200"});
			}
			else {    
				
				//console.log("Invalid Login");
				console.log("callig 200 callback");
				
				res.json({
					fname:results.fname,
					lname:results.lname,
					userid:results.userid
				});
			}
		}  
	});
};

