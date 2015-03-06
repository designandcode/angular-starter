app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/Home', {
       templateUrl: './app/views/home/index.html',
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
    .when('/404', {
      templateUrl: './app/views/404/index.html'
    })
    .otherwise({redirectTo: '/404'})
})
.run(['$rootScope', '$location', 'authService', '$timeout', 'urlService', function($rootScope, $location, authService, $timeout, urlService){
  !authService.persist() && $location.path('/Home');
  urlService.setUrls({
    home: '#/Home',
    user: {},
    '404': '#/404'
  })
  $rootScope.$on('$routeChangeSuccess', function(event, next, current){
    !authService.persist() && $location.path('/Home');
    urlService.setUrls({
      home: '#/Home'
    })
  })
}]); 
