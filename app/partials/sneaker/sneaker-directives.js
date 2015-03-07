app.directive('sneakerSearch', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/partials/sneaker/search/partial.html',
    controller: 'sneakerCtrl',
    replace: true
  }
});
function sneakerCtrl($scope){
}
