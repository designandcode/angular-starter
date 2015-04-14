// show
app.directive('userShow', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/user/show/partial.html',
    controller: 'userCtlr'
  }
});
// edit
app.directive('userEdit', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/user/edit/partial.html',
    controller: 'userCtlr'
  }
});
// view
app.directive('userIndex', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/user/index/partial.html',
    controller: 'userCtlr'
  }
});
// create
app.directive('userNew', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/user/new/partial.html',
    controller: 'userCtlr'
  }
});
// delete
app.directive('userDelete', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/user/delete/partial.html',
    controller: 'userCtlr'
  }
});
function userCtlr($scope, $routeParams, $location, permissionService, userService, urlService){
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
  userService.getUsers()
    .then(function(result){
      $scope.users = result;
    }, function(error){
      console.log(error);
    })
  //$scope.users = userService.getUsers();
  //$scope.permissions = {
  //  user: $scope.user && permissionService.set($scope.current.permissions, $scope.current.id, $scope.user.id)
  //}
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
