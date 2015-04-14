app.directive('registerForm', function(){
  return {
    scope: {},
    restrict: 'A',
    templateUrl: 'app/partials/register/form/partial.html',
    controller: 'registerForm'
  }
}).controller('registerForm', ['$rootScope', '$scope', '$location', 'userService', 'authService', '$localStorage', function($rootScope, $scope, $location, userService, authService, $localStorage){
  authService.persist()
    .then(function(result){
      $location.path('/Home');
    }, function(error){
      //$location.path('/Account/Login');
    })
  $scope.action = {
    register: function(){
      var credentials = {
        username: $scope.username || null, 
        password: $scope.password || null, 
        email: $scope.email || null
      }
      var credentialsString = JSON.stringify(credentials);
      if(!credentialsString.match(null)){
        console.log(JSON.stringify(credentials) + ' registered!');
        //userService.createUser(credentials)
        //  .then(function(result){
        //    //** Not going to work because session has not been implemented at the api level
        //    authService.login({username: result.username, password: result.password})
        //      .then(function(result){
        //        // logged in!
        //        console.log(result);
        //        $location.path('/Home');
        //      }, function(error){
        //        console.log(error);
        //        //$location.path('/Account/Login');
        //      })
        //  }, function(error){
        //    console.log(error);
        //  })
      }
    }
  }
}])
