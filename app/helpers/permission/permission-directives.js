app.directive('permission', function(){
  return {
    restrict: 'A',
    //scope: false,
    controller: 'permission'
  }
}).controller('permission', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location){
  console.log($scope.permission);
  //$location.path('/Home');
}]);
