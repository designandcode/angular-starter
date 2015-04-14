app.directive('sneakerSearch', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/sneaker/search/partial.html',
    controller: 'sneakerCtrl'
  }
});
// show
app.directive('sneakerShow', function(){
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'app/partials/sneaker/show/partial.html',
    controller: 'sneakerCtrl'
  }
});
function sneakerCtrl($scope, sneakerService, $routeParams, $location, urlService, watchlistService, $localStorage){
  var id = $routeParams.id ? $routeParams.id : null;
  $scope.$storage = $localStorage;
  $scope.$storage['v03_ED'] = $scope.$storage['v03_ED'] || {}
  $scope.current = $scope.$storage['v03_ED']['current'];
  $scope.query = {search: {}, results: {}};
  $scope.query.search.sneaker;
  $scope.query.results.sneaker = [];
  $scope.urls = urlService.getUrls();
  $scope.state = {
    loggedIn: function(){ return $scope.$storage['v03_ED']['persist'] || false },
    notInWatchlist: function(sneaker){
      if($scope.$storage['v03_ED']['watchlist'] && $scope.$storage['v03_ED']['watchlist'].indexOf(sneaker) < 0){
        return true;
      }
      return false;
    },
    inWatchlist: function(sneaker){
      if($scope.$storage['v03_ED']['watchlist'] && $scope.$storage['v03_ED']['watchlist'].indexOf(sneaker) >= 0){
        return true;
      }
      return false;
    },
    notInTempWatchlist: function(sneaker){
      if($scope.$storage['v03_ED']['tempWatchlist'] && $scope.$storage['v03_ED']['tempWatchlist'].indexOf(sneaker) < 0){
        return true;
      }
      return false;      
    },
    inTempWatchlist: function(sneaker){
      if($scope.$storage['v03_ED']['tempWatchlist'] && $scope.$storage['v03_ED']['tempWatchlist'].indexOf(sneaker) >= 0){
        return true;
      }
      return false;
    }
  }
  // Search
  if($location.path().match('/Home')){
    $scope.action = {
      search: function(){
        console.log($scope.query.search.sneaker);
        if($scope.query.search.sneaker){
          sneakerService.findSneakers($scope.query.search.sneaker, function(sneakerService){
            $scope.query.results.sneaker = sneakerService.searchResults;
          })
        } else{
          $scope.query.results.sneaker = [];
        }
      }
    }
  }
  $scope.action = $scope.action || {}
  $scope.action.addToTempWatchlist = function(sneaker){
    //$scope.$storage['v03_ED']['tempWatchlist'].push(sneaker);
    watchlistService.addToTempWatchlist(sneaker);
  }
  $scope.action.addToWatchlist = function(sneaker){
    console.log(sneaker);
    watchlistService.addToWatchlist($scope.current, sneaker)
      .then(function(result){
        console.log(result);
        if(result._id){
          $scope.$storage['v03_ED']['watchlist'] = result.watchlist;
          //$scope.$apply();
        }
      }, function(error){
        console.log(error);
      })
    //watchlistService.addToWatchlist()
  }
  $scope.action.removeFromWatchlist = function(sneaker){
    watchlistService.removeFromWatchlist($scope.$storage['v03_ED']['current'], sneaker)
      .then(function(result){
        if(result._id){
          $scope.$storage['v03_ED']['watchlist'] = result.watchlist;
        }
      }, function(error){
        console.log(error);
      })
  }
  $scope.action.removeFromTempWatchlist = function(sneaker){
    watchlistService.removeFromTempWatchlist(sneaker);
  }
}
