MainAngularModule.controller('logincontroller',function($scope,$http,$location){
	 
	 $scope.loginFunction= function(){	
		 
		 $http({
				method : "POST",
				url : '/checklogin',
				data : {
					"userid" : $scope.userid,
					"pwd" : $scope.pwd
				}
			}).success(function(res) {
				//console.log("data:"+res.statusCode);
				
				if (res.statusCode == 401) {
					console.log("401");
					window.location.assign("/")
				}
				else{
					console.log("201");
					window.location.assign("/homepage")
				}
			}).error(function(error) {
				console.log("Error");
				window.location.assign("/")
			});
	 };
	 
	 $scope.loadPageData = function(){
		 
		 var response = "";
		 
		 $http({
				method : "GET",
				url : '/fetchuserinfo',
			}).success(function(res) {
				
				if (res.statusCode == 401) {
					console.log("401");
					window.location.assign("/")
				}
				else{
					console.log("201");
					response = res;
					//console.log("res: "+res.fname);
					$scope.displayname = response.fname+" "+response.lname;
				}
			}).error(function(error) {
				console.log("Error");
				window.location.assign("/")
			});
		 
		 
		};
		
		$scope.logout = function(){
			console.log("inside login logout");
			window.location.assign("/logout"); 
		};
		
		$scope.signupFunction = function(){
			
			$scope.birthday = $scope.birthday_day+"-"+$scope.birthday_month+"-"+$scope.birthday_year;

			
			if($scope.userid1 !== $scope.userid2){
				$scope.invalidtext2 = !$scope.invalidtext2;
				$scope.invalidemail = "Email id's do not match";
			}
		    else {
			
			$http({
				method : "POST",
				url : '/signup',
				data : {
					"userid" : $scope.userid1,
					"pwd" : $scope.password,
					"fname" : $scope.fname,
					"lname" : $scope.lname,
					"dob" : $scope.birthday,
					"gender": $scope.sex
				}
			}).success(function(data) {
				
				if (data.statusCode == 401) {
					console.log("401");
					$scope.invalidtext2 = !$scope.invalidtext2;
					$scope.invalidemail = "SignUp failed";
				}
				else{
					console.log("201");
					window.location.assign("/signupsuccess");
				}
			}).error(function(error) {
				console.log("Error");
			});
			}
		};
		
		$scope.loadAboutPage = function(){
			window.location.assign("/useroverview");
		};
		
		$scope.loadFriends = function(){
			$location.path("/friends");
		};
		
		$scope.friendsPageInit = function(){
			$scope.addfrndfailed = "";
			$scope.frnd1 = {
					memList: []
			};
			$scope.frnd2 = {
					memList: []
			};
			$scope.frnd3 = {
					memList: []
			};
			
			
			$http({
				method : "GET",
				url : '/fetchfrnds'
			}).success(function(res) {
				
				if (res.statusCode == 401) {
					console.log("401");
					$scope.frndconfirmed = false;
					$scope.frnd3.memList.push("No Friends Yet");
				}
				else{
					console.log("201");
					for(var i=0;i<res.length;i++){
						var username = res[i].fname+" "+res[i].lname+":"+res[i].userid;
						$scope.frnd3.memList.push(username);	
						username = "";
						$scope.frndconfirmed = false;
					}
					
				}
			}).error(function(error) {
				console.log("Error");
			});
			
			
			
			$http({
				method : "GET",
				url : '/fetchrequests'
			}).success(function(res) {
				
				if (res.statusCode == 401) {
					console.log("401");
					$scope.frndrequest = true;
					
				}
				else{
					console.log("201");
					for(var i=0;i<res.length;i++){
						var username = res[i].fname+" "+res[i].lname+":"+res[i].userid;
						$scope.frnd2.memList.push(username);	
						username = "";
						$scope.frndrequest = false;
					}
					
				}
			}).error(function(error) {
				console.log("Error");
			});
			
		};
		
		$scope.friendsSearch = function(srchname){
			
			var name = srchname.split(":",0);
			var userid = srchname.split(":",1);
			var fname = name.split(" ",0);
			var lname = name.split(" ",1);
			
			
			$http({
				method : "POST",
				url : '/searchfriend',
				data: {
					"fname" : fname,
					"lname" : lname,
					"userid" :userid
				}
			}).success(function(res) {
				
				if (res.statusCode == 401) {
					console.log("401");
					$scope.frndrequest = true;
					
				}
				else{
					console.log("201");
					for(var i=0;i<res.length;i++){
						var username = res[i].fname+" "+res[i].lname+":"+res[i].userid;
						$scope.frnd2.memList.push(username);	
						username = "";
						$scope.frndrequest = false;
					}
					
				}
			}).error(function(error) {
				console.log("Error");
			});
			
		};
		
		$scope.addfriend = function(mem1){
			
			var name = srchname.split(":",0);
			var userid = srchname.split(":",1);
			var fname = name.split(" ",0);
			var lname = name.split(" ",1);
			
			
			$http({
				method : "POST",
				url : '/addfriend',
				data: {
					"fname" : fname,
					"lname" : lname,
					"userid" :userid
				}
			}).success(function(res) {
				
				if (res.statusCode == 401) {
					console.log("401");
					$scope.addfrndfailed = "Couldn't add friend";
					
				}
				else{
					console.log("201");
					friendsPageInit();
				}
			}).error(function(error) {
				console.log("Error");
			});
			
			
		};
		
        $scope.acceptfriend = function(mem2){
			
			var name = srchname.split(":",0);
			var userid = srchname.split(":",1);
			var fname = name.split(" ",0);
			var lname = name.split(" ",1);
			
			
			$http({
				method : "POST",
				url : '/acceptfriend',
				data: {
					"fname" : fname,
					"lname" : lname,
					"userid" :userid
				}
			}).success(function(res) {
				
				if (res.statusCode == 401) {
					console.log("401");
					$scope.addfrndfailed = "Couldn't confirm friend";
					
				}
				else{
					console.log("201");
					friendsPageInit();
				}
			}).error(function(error) {
				console.log("Error");
			});
		};
		
		
		
		
		
});
