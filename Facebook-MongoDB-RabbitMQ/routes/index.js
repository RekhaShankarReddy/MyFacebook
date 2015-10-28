
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.signupsuccess = function(req, res){
	 res.render('signupsuccess', { title: 'Express' });
};
exports.useroview = function(req, res){
	 res.render('overviewTemplate', { title: 'Express' });
};
exports.overview = function(req, res){
	 res.render('overview', { title: 'Express' });
};
exports.friends = function(req, res){
	 res.render('friends', { title: 'Express' });
};