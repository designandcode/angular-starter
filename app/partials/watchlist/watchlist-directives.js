// view
app.directive('watchlistIndex', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/watchlist/index/partial.html',
    controller: 'watchlistCtrl'
  }
});
// current
app.directive('watchlistCurrent', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/watchlist/current/partial.html',
    controller: 'watchlistCtrl'
  }
});
// show
app.directive('watchlistShow', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/watchlist/show/partial.html',
    controller: 'watchlistCtrl'
  }
});
function watchlistCtrl($scope, $routeParams, $location, watchlistService, $localStorage){
  var id = $routeParams.id ? $routeParams.id : null;
  $scope.$storage = $localStorage;
  $scope.$storage['v03_ED'] = $scope.$storage['v03_ED'] || {}
  watchlistService.getWatchlists()
    .then(function(data){
      $scope.watchlists = data;
    })
  watchlistService.getWatchlistByUserId()
    .then(function(data){
      $scope.$storage['v03_ED']['watchlist'] = $scope.current = data.watchlist;
      console.log($scope.current);
    })
  watchlistService.getWatchlistByUserId(id)
    .then(function(data){
      $scope.watchlist = data;
    })
  $scope.state = {
    loggedIn: function(){ return $scope.$storage['v03_ED']['persist'] || false }
  }
  $scope.localWatchlist = function(){ return $scope.$storage['v03_ED']['watchlist'] || [] };
  $scope.tempWatchlist = function(){ return $scope.$storage['v03_ED']['tempWatchlist'] || [] };
  $scope.action = {
    removeFromWatchlist: function(sneaker){
      console.log($scope.$storage['v03_ED']['current'], sneaker);
      watchlistService.removeFromWatchlist($scope.$storage['v03_ED']['current'], sneaker)
        .then(function(result){
          if(result._id){
            $scope.$storage['v03_ED']['watchlist'] = result.watchlist;
          }
        }, function(error){
          console.log(error);
        })
    },
    removeFromTempWatchlist: function(sneaker){
      watchlistService.removeFromTempWatchlist(sneaker);
    }
  }
}
