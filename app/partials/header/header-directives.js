// nav
app.directive('headerNav', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/partials/header/nav/partial.html',
    controller: headerNavCtrl
  }
});
function headerNavCtrl($scope, authService, $localStorage, $location, urlService, permissionService, userService, $routeParams){
  var t = this;
  // Below code is called also in userCtrl
  var id = $routeParams.id ? $routeParams.id : null;
  $scope.user = userService.getUser(id);
  $scope.current = function(){ return userService.getCurrent(); }
  $scope.permissions = {
    user: $scope.user && permissionService.set($scope.current.permissions, $scope.current.id, $scope.user.id)
  }
  // Above code is called also in userCtrl
  $scope.$storage = $localStorage;
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
  $scope.action = {
    logout: function(redirect){
      return authService.logout() && $location.path($scope.redirect.home);
    }
  }
}
