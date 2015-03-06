app.filter('show', ['$location', 'urlService', function($location, urlService){
  return function(input){
    console.log(urlService.getUrls(), input);
    //if($location.path().match(/^\/+[^\/]+\//)){
    //  var baseUrl = $location.path().match(/^\/+[^\/]+\//)[0];
    //  return '#'+baseUrl+'Show/'+input;
    //}
  }
}])
.filter('edit', ['$location', function($location){
  //return function(input){
  //  if($location.path().match(/^\/+[^\/]+\//)){
  //    var baseUrl = $location.path().match(/^\/+[^\/]+\//)[0];
  //    return '#'+baseUrl+'Edit/'+input;
  //  }
  //}
}])
.filter('delete', ['$location', function($location){
  //return function(input){
  //  if($location.path().match(/^\/+[^\/]+\//)){
  //    var baseUrl = $location.path().match(/^\/+[^\/]+\//)[0];
  //    return '#'+baseUrl+'Delete/'+input;
  //  }
  //}
}])
.filter('create', ['$location', function($location){
  //return function(input){
  //  if($location.path().match(/^\/+[^\/]+\//)){
  //    var baseUrl = $location.path().match(/^\/+[^\/]+\//)[0];
  //    return '#'+baseUrl+'New';
  //  }
  //}
}])
.filter('view', ['$location', function($location){
  //return function(input){
  //  if($location.path().match(/^\/+[^\/]+\//)){
  //    var baseUrl = $location.path().match(/^\/+[^\/]+\//)[0];
  //    return '#'+baseUrl+'View';
  //  }
  //}
}])
.filter('id', ['$location', function($location){
  return function(input, id){
    return input.replace(/:id$/, id);
  }
  //return function(input){
  //  if($location.path().match(/^\/+[^\/]+\//)){
  //    var baseUrl = $location.path().match(/^\/+[^\/]+\//)[0];
  //    return '#'+baseUrl+'View';
  //  }
  //}
}]);
