// nav
app.directive('headerNav', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/header/nav/partial.html',
    controller: headerNavCtrl
  }
});
function headerNavCtrl($scope, authService, $localStorage, $location, urlService, permissionService, userService, $routeParams, $route){
  var t = this;
  $scope.$storage = $localStorage;
  // Below code is called also in userCtrl
  var id = $routeParams.id ? $routeParams.id : null;
  userService.getUser()
    .then(function(result){
      $scope.current = result;
      $scope.permissions = {
        user: permissionService.set($scope.current.permissions, $scope.current._id)
      }
    }, function(error){
      console.log(error);
    })
  userService.getUser(id)
    .then(function(result){
      $scope.user = result;
    }, function(error){
      console.log(error);
    })
  //console.log($scope.$storage['v03_ED']);
  $scope.loggedIn = function(){ return $scope.$storage['v03_ED']['persist'] || false };
  //$scope.user = userService.getUser(id);
  // Above code is called also in userCtrl
  $scope.state = {
    name: 'headerNav',
    active: true,
    loggedIn: function(){ return $scope.$storage['v03_ED']['persist'] || false },
    prev: '',
    next: '/Home',
    redirect: {logout: '/Home'}
  }
  $scope.redirect = {
    home: '/Home'
  }
  $scope.urls = urlService.getUrls();
  console.log($scope.urls);
  $scope.action = {
    logout: function(redirect){
      //return authService.logout() && $location.path('/Account/Login');
      authService.logout()
        .then(function(result){
          console.log('logged out');
          $location.path('/Home');
        })
    }
  }
}
