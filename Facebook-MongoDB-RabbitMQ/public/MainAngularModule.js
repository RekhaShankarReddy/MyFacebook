var MainAngularModule = angular.module('MainAngularModule', ['ngRoute','ui.bootstrap']);

MainAngularModule.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    };
    
});

MainAngularModule.config(['$locationProvider', '$routeProvider', function($locationProvider,$routeProvider) {
	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
$routeProvider
.when('/useroverview', {
  templateUrl: 'overview',
  controller: 'logincontroller'
})
.when('/friends', {
  templateUrl: 'friends',
  controller: 'logincontroller'
})
.otherwise({
  redirectTo: '/'
});
}]);
