app.service('sneakerService', function(_, $fuse, $http, $q){
  var t = this;
  this.phrase = '';
  this.sneakers;
  this.searchResults = [];
  // sneakerpedia.com (Powered by Foot Locker)
  this.getSneakers = function(){
    if(!t.sneakers){
      var deferred = $q.defer();
      $http.get("./app/data/sneakers.json").success(function(data){
          deferred.resolve(data);
      });
      return deferred.promise;
    } else{
      return t.sneakers;
    }
  }
  this.findSneakers = function(phrase, cb){
    t.phrase = phrase;
    if(!t.sneakers){
      t.getSneakers().then(function(result){
        var sneakers = result;
        var sneakersCount = sneakers.length;
        var phrase = t.phrase.split(" ");
        var matchAgainstCount = phrase.length;
        for(var i=0; i<sneakersCount; i++){
          sneakers[i]['match'] = true;
          for(var j=0; j<matchAgainstCount; j++){
            if(!JSON.stringify(sneakers[i]).toLowerCase().match(phrase[j].toLowerCase().replace(/s$/,""))){
              sneakers[i]['match'] = false;
            }
          }
        }
        t.searchResults = _.where(sneakers, {'match': true});
        cb && cb(t);
      });
    } else{
      var sneakers = t.getSneakers();
      var sneakersCount = sneakers.length;
      var phrase = t.phrase.split(" ");
      var matchAgainstCount = phrase.length;
      for(var i=0; i<sneakersCount; i++){
        sneakers[i]['match'] = true;
        for(var j=0; j<matchAgainstCount; j++){
          if(!JSON.stringify(sneakers[i]).toLowerCase().match(phrase[j].toLowerCase().replace(/s$/,""))){
            sneakers[i]['match'] = false;
          }
        }
      }
      searchResults = _.where(sneakers, {'match': true});
      return searchResults;
    }
  }
});
