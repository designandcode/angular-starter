app.service('watchlistService', function(_, $fuse, $http, $q, $localStorage){
  var t = this;
  this.$storage = $localStorage;
  this.$storage['v03_ED'] = this.$storage['v03_ED'] || {}
  this.$storage['v03_ED']['tempWatchlist'] = this.$storage['v03_ED']['tempWatchlist'] || []
  this.sneaker = '';
  this.watchlist; // id from localstorage
  this.watchlists;
  //this.searchResults = [];
  // sneakerpedia.com (Powered by Foot Locker)
  this.getWatchlists = function(){
    if(!t.watchlists){
      // api impementation
      var deferred = $q.defer();
      $http.get("http://localhost:3000/sneakerwatcher/api/watchlists").success(function(data){
          deferred.resolve(data);
      });
      return deferred.promise;
    } else{
      return t.watchlists;
    }
  }
  this.getWatchlistById = function(id){
    if(!t.watchlist){
      // api impementation
      //var deferred = $q.defer();
      //$http.get("./app/data/sneakers.json").success(function(data){
      //    deferred.resolve(data);
      //});
      //return deferred.promise;
    } else{
      return _.findWhere(t.getWatchlists(), {_id: id});
    }
  }
  this.getWatchlistByUserId = function(userId){
    if(!t.watchlist){
      // api impementation
      var deferred = $q.defer();
      if(userId){
        $http.get("http://localhost:3000/sneakerwatcher/api/watchlists/user/"+userId).success(function(data){
            deferred.resolve(data);
        });
      } else{
        var userId = t.$storage['v03_ED']['current'];
        if(userId){
          $http.get("http://localhost:3000/sneakerwatcher/api/watchlists/user/"+userId).success(function(data){
              deferred.resolve(data);
          });
        } else{
          deferred.reject('No watchlist found');
        }
      }
      return deferred.promise;
    } else{
      return _.findWhere(t.getWatchlists(), {user_id: userId});
    }    
  }
  this.addToWatchlist = function(userId, sneaker){
    if(!t.watchlist){
      // api implementation
      var deferred = $q.defer();
      if(userId && sneaker){
        $http.put("http://localhost:3000/sneakerwatcher/api/watchlists/user/"+userId+"/addItem", {watchlist: sneaker}).success(function(data){
          deferred.resolve(data);
        })
      } else{
        deferred.reject('No watchlist found');
      }
      return deferred.promise;
    } else{
      // this implementation should use userId
      t.watchlist = t.getWatchlistById(userId).watchlist;
      //console.log(t.watchlist);
      t.watchlist.push(sneaker);
      return t;
    }
  }
  this.removeFromWatchlist = function(userId, sneaker){
    t.sneaker = sneaker;
    if(!t.watchlist){
      // api impementation
      var deferred = $q.defer();
      if(userId && sneaker){
        $http.put("http://localhost:3000/sneakerwatcher/api/watchlists/user/"+userId+"/removeItem", {watchlist: sneaker}).success(function(data){
          deferred.resolve(data);
        })
      } else{
        deferred.reject('No watchlist found');
      }
      return deferred.promise;
    } else{
      // this implementation should use userId
      t.watchlist = _.reject(t.getWatchlistById(userId).watchlist, function(n){
        return n == t.sneaker;
      })
      return t;
    }
  }
  this.addToTempWatchlist = function(sneaker){
    //var notInTempWatchlist = true;
    var notInTempWatchlist = !_.find(t.$storage['v03_ED']['tempWatchlist'], function(n){ return n == sneaker })
    if(notInTempWatchlist){
      t.$storage['v03_ED']['tempWatchlist'].push(sneaker);
    }
    return t;
  }
  this.removeFromTempWatchlist = function(sneaker){
    var tempWatchlist = t.$storage['v03_ED']['tempWatchlist'];
    for(var i=0; i<tempWatchlist.length; i++){
      if(tempWatchlist[i] == sneaker){
        t.$storage['v03_ED']['tempWatchlist'].splice(i, 1);
      }
    }
    return t;
  }
  this.getTempWatchlist = function(){
    return t.$storage['v03_ED']['tempWatchlist'];
  }
  this.clearTempWatchlist = function(){
    t.$storage['v03_ED']['tempWatchlist'] = [];
    return t;
  }
  this.copyTempWatchlistToWatchlist = function(userId){
    if(!t.watchlist){
      // api implementation
      var tempWatchlist = t.$storage['v03_ED']['tempWatchlist'];
      var deferred = $q.defer();
      if(tempWatchlist && tempWatchlist.length && Array.isArray(tempWatchlist)){
        $http.put('http://localhost:3000/sneakerwatcher/api/watchlists/user/'+userId+'/addItems', {watchlist: tempWatchlist}).success(function(data){
          deferred.resolve(data);
        })
      } else{
        deferred.reject('No watchlist found to import');
      }
      return deferred.promise;
    } else{
      // check for previous existence
      console.log(t.watchlist)
      t.$storage['v03_ED']['tempWatchlist'] = _.difference(t.$storage['v03_ED']['tempWatchlist'], t.watchlist);
      t.watchlist = _.union(t.$storage['v03_ED']['tempWatchlist'], t.watchlist);
      //console.log(t.$storage['v03_ED']['tempWatchlist']);
      return t;
    }
  }
  //this.findSneakers = function(phrase, cb){
  //  t.phrase = phrase;
  //  if(!t.sneakers){
  //    t.getSneakers().then(function(result){
  //      var sneakers = result;
  //      var sneakersCount = sneakers.length;
  //      var phrase = t.phrase.split(" ");
  //      var matchAgainstCount = phrase.length;
  //      for(var i=0; i<sneakersCount; i++){
  //        sneakers[i]['match'] = true;
  //        for(var j=0; j<matchAgainstCount; j++){
  //          if(!JSON.stringify(sneakers[i]).toLowerCase().match(phrase[j].toLowerCase().replace(/s$/,""))){
  //            sneakers[i]['match'] = false;
  //          }
  //        }
  //      }
  //      t.searchResults = $_.where(sneakers, {'match': true});
  //      cb && cb(t);
  //    });
  //  } else{
  //    var sneakers = t.getSneakers();
  //    var sneakersCount = sneakers.length;
  //    var phrase = t.phrase.split(" ");
  //    var matchAgainstCount = phrase.length;
  //    for(var i=0; i<sneakersCount; i++){
  //      sneakers[i]['match'] = true;
  //      for(var j=0; j<matchAgainstCount; j++){
  //        if(!JSON.stringify(sneakers[i]).toLowerCase().match(phrase[j].toLowerCase().replace(/s$/,""))){
  //          sneakers[i]['match'] = false;
  //        }
  //      }
  //    }
  //    searchResults = $_.where(sneakers, {'match': true});
  //    return searchResults;
  //  }
  //}
});
