app.directive('loginForm', function(){
  return {
    scope: {},
    restrict: 'A',
    templateUrl: 'app/partials/login/form/partial.html',
    controller: 'loginForm'
  }
}).directive('loginFormHeader', function(){
  return {
    scope: {},
    restrict: 'A',
    templateUrl: 'app/partials/login/formHeader/partial.html',
    controller: 'loginForm'
  }
}).controller('loginForm', ['$rootScope', '$scope', '$location', 'userService', 'authService', '$localStorage', '$route', 'urlService', 'watchlistService', function($rootScope, $scope, $location, userService, authService, $localStorage, $route, urlService, watchlistService){
  $scope.$storage = $localStorage;
  $scope.state = {
    name: 'loginForm',
    prev: '',
    next: 'User/View',
    redirect: {persist: '/User/View', login: '/User/View'},
    loginForms: false,
    showLoginForm: false,
    showRegisterForm: false,
    forgotForm: false,
    loggedIn: function(){ return $scope.$storage['v03_ED']['persist'] || false }
  }
  $scope.toggle = function(state){
    if(state == 'loginForm'){
      $scope.state.showLoginForm = true;
      $scope.state.showRegisterForm = false;
      $scope.state.forgotForm = false;
    }
    if(state == 'registerForm'){
      $scope.state.showLoginForm = false;
      $scope.state.forgotForm = false;
      $scope.state.showRegisterForm = true;
    }
    if(state == 'forgotForm'){
      $scope.state.showLoginForm = false;
      $scope.state.forgotForm = true;
      $scope.state.showRegisterForm = false;
    }
    if(state == 'loginForms'){
      //$scope.state.loginForms = true;
      $scope.state.loginForms = !$scope.state.loginForms;
      $scope.state.showLoginForm = true;
    }
  }
  $scope.tempWatchlist = function(){ return $scope.$storage['v03_ED']['tempWatchlist'] || [] };
  $scope.urls = urlService.getUrls();
  $scope.loginForm = {
    username: 'testuser1', 
    password: 'pas5w0rd',
    action: {
      login : function(){
      //authService.login({firstName: $scope.loginForm.firstName, lastName: $scope.loginForm.lastName}) && $location.path($scope.state.redirect.login);
      var credentials = {
        username: $scope.loginForm.username || null,
        password: $scope.loginForm.password || null
      }
      var credentialsString = JSON.stringify(credentials);
      if(!credentialsString.match(null)){
        authService.login(credentials)
          .then(function(result){
            // logged in!
            console.log(result);
            watchlistService.copyTempWatchlistToWatchlist(result.user_id)
              .then(function(result){
                console.log(result);
                $scope.$storage['v03_ED']['tempWatchlist'] = [];
              }, function (error){
                console.log(error);
              })
            $location.path('/Home'); // refresh
            $route.reload();
          }, function(error){
            console.log(error);
            //$location.path('/Account/Login');
          })
        }
      }
    }
  }
  //authService.persist() && $location.path($scope.state.redirect.persist);
  //authService.persist()
  //  .then(function(result){
  //    $location.path('/Home');
  //  }, function(error){
  //    $location.path('/Account/Login');
  //  })
  $scope.registerForm = {
    action : {
      register: function(){
        var credentials = {
          username: $scope.registerForm.username || null, 
          password: $scope.registerForm.password || null, 
          email: $scope.registerForm.email || null
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
  }
  $scope.forgotForm = {
    action: {
      forgot: function(){
        var email = $scope.forgotForm.email || null;
        if(email != null){
          console.log(email + ' sent!');
        }
      }
    }
  }
}])
