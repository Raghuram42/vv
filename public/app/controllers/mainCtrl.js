angular.module('mainCtrl',[])

.contoller('MainController',function($rootScope,$location,Auth){
	var vm=this;

	vm.loggedIn = Auth.isLogged();

	$rootScope.$on('$routeChangeStart',function(){
		vm.loggedIn =AUth.isLoggedIn();
		Auth.getUser()
		   .then(function(data){
		   	vm.user =data.data;
		   });
	});

vm.doLogin= function(){

	vm.processing = true;

	vm.error = '';

	Auth.login(vm.loginData.username, vm.loginData.password)
	.succes(function(data){
		vm.processing =false;

		Auth.getUser()
			.then(function(data){
				vm.user = data.data;
			});

			if(data.success)
				$location.path('/poll');
				else
					vm.error =data.message;
			
	});
}

  vm.doLogout =function(){
  	Auth.logout();
  	$location.path('/logout');
  }
});