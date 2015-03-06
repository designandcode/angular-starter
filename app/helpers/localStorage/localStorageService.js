app.service('localStorageService', ['$localStorage', function($localStorage){
  //var ngStorageObject = {
  //  v03_current: null,
  //  v03_session: null
  //}
  var t = this;
  this.localStorage = $localStorage;
  this.setItem = function(prop, val){
    t.localStorage[prop] = val;
  }
  this.getItem = function(prop){
    return t.localStorage[prop];
  }
}]);
