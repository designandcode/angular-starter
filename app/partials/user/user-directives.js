// show
app.directive('userShow', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/partials/user/show/partial.html',
    controller: 'userCtlr',
    replace: true
  }
});
// edit
app.directive('userEdit', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/partials/user/edit/partial.html',
    controller: 'userCtlr',
    replace: true
  }
});
// view
app.directive('userIndex', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/partials/user/index/partial.html',
    controller: 'userCtlr',
    replace: true
  }
});
// create
app.directive('userNew', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/partials/user/new/partial.html',
    controller: 'userCtlr',
    replace: true
  }
});
// delete
app.directive('userDelete', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/partials/user/delete/partial.html',
    controller: 'userCtlr',
    replace: true
  }
});
function userCtlr($scope, $routeParams, $location, permissionService, userService, urlService){
  var id = $routeParams.id ? $routeParams.id : null;
  $scope.user = userService.getUser(id);
  $scope.current = userService.getCurrent();
  $scope.users = userService.getUsers();
  $scope.permissions = {
    user: $scope.user && permissionService.set($scope.current.permissions, $scope.current.id, $scope.user.id)
  }
  $scope.urls = urlService.getUrls();
  /**
   *  View
   */
  if($location.path().match('/View')){
  }
  /**
   *  Show
   */
  if($location.path().match('/Show')){
  }
  // Edit
  if($location.path().match('/Edit')){
    $scope.action = {
      save: function(){
        var editUser = userService.editUser(id);
        editUser.$ = $scope.user;
        editUser.save() && console.log('user '+id+' saved');
      }
    }
  }
  // New
  if($location.path().match('/New')){
    $scope.action = {
      create: function(){
        var createUser = userService.createUser($scope.newUser);
        createUser.save() && $location.path('/User/View');
      }
    }
  }
  // Delete
  if($location.path().match('/Delete')){
    $scope.action = {
      delete: function(){
        // another chance to back out?
        var deleteUser = userService.deleteUser(id);
        deleteUser && $location.path('/User/View');
      }
    }
  }
}
