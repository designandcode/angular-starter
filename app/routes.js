app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('', {
      redirectTo: '/Home'
    })
    .when('/', {
      redirectTo: '/Home'
    })
    .when('/Home', {
       templateUrl: './app/views/home/index.html'
    })
    .when('/User/Show/:id', {
       templateUrl: './app/views/user/show.html'
    })
    .when('/User/Edit/:id', {
      templateUrl: './app/views/user/edit.html'
    })
    .when('/User/View', {
      templateUrl: './app/views/user/index.html'
    })
    .when('/User/New', {
      templateUrl: './app/views/user/new.html'
    })
    .when('/User/Delete/:id', {
      templateUrl: './app/views/user/delete.html'
    })
    .when('/Sneaker/Show/:id', {
       templateUrl: './app/views/sneaker/show.html'
    })
    .when('/Watchlist/View', {
      templateUrl: './app/views/watchlist/index.html'
    })
    .when('/404', {
      templateUrl: './app/views/404/index.html'
    })
    .when('/Account/Login', {
      templateUrl: './app/views/account/login.html'
    })
    .when('/Account/Register', {
      templateUrl: './app/views/account/register.html'
    })
    .otherwise({redirectTo: '/404'})
})
.run(['$rootScope', '$location', 'authService', '$timeout', 'urlService', function($rootScope, $location, authService, $timeout, urlService){
  //!authService.persist() && $location.path('/Home');
  console.log($location.path());
  // doesn't work
  var unprotectedPages = {'/Account/Register': true, '/Account/Login': true};
  if(!unprotectedPages[$location.path()]){
    authService.persist()
      .then(function(result){
        //$location.path('/Home');
      }, function(error){
        //$location.path('/Home');
      })
  }
  urlService.setUrl('home', '#/Home');
  urlService.setUrl('user', {});
  urlService.setUrl('sneaker', {});
  urlService.setUrl('404', '#/404');
  urlService.setUrl('register', '#/Account/Register');
  //stateService.setState();
  // use like $scope.state = stateService.getState(); [In Controller] state.loggedIn() {true | false} [In View]
  $rootScope.$on('$routeChangeSuccess', function(event, next, current){
    if(!unprotectedPages[$location.path()]){
      authService.persist()
        .then(function(result){
          //$location.path('/Home');
        }, function(error){
          //$location.path('/Home');
        })
    }
  //stateService.setState();
  // use like $scope.state = stateService.getState(); [In Controller] state.loggedIn() {true | false} [In View]
  //authService.persist()
  //  .then(function(result){
  //    //$location.path('/Home');
  //  }, function(error){
  //    //$location.path('/Account/Login');
  //  })
  //  //!authService.persist() && $location.path('/Home');
  //  //urlService.setUrls({
  //  //  home: '#/Home'
  //  //})
  })
}]); 
