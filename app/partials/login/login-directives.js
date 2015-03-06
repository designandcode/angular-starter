app.directive('loginForm', function(){
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'app/partials/login/form/partial.html',
    controller: 'loginForm'
  }
}).controller('loginForm', ['$rootScope', '$scope', '$location', 'userService', 'authService', '$localStorage', function($rootScope, $scope, $location, userService, authService, $localStorage){
  $scope.state = {
    name: 'loginForm',
    prev: '',
    next: 'User/View',
    redirect: {persist: '/User/View', login: '/User/View'}
  }
  $scope.loginForm = {firstName: 'Foo', lastName: 'Bar'}
  authService.persist() && $location.path($scope.state.redirect.persist);
  $scope.loginForm.login = function(){
    authService.login({firstName: $scope.loginForm.firstName, lastName: $scope.loginForm.lastName}) && $location.path($scope.state.redirect.login);
  }
}])
