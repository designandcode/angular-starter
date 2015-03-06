app.service('urlService', [function(){
  var t = this;
  this.urls = {}
  this.setUrls = function(obj){
    for(i in obj){
      t.urls[i] = {}
      if(obj[i] !== null && typeof obj[i] === 'object'){
        index = i;
        t.urls[i]['view'] = function(){ return '#/'+ index.charAt(0).toUpperCase() + index.slice(1) + '/View' }
        t.urls[i]['show'] = function(id){ return '#/'+ index.charAt(0).toUpperCase() + index.slice(1) + '/Show/' + id; }
        t.urls[i]['edit'] = function(id){ return '#/'+ index.charAt(0).toUpperCase() + index.slice(1) + '/Edit/' + id; }
        t.urls[i]['delete'] = function(id){ return '#/'+ index.charAt(0).toUpperCase() + index.slice(1) + '/Delete/' + id; }
        t.urls[i]['new'] = function(){ return  '#/'+ index.charAt(0).toUpperCase() + index.slice(1) + '/New'; }
      } else{
        t.urls[i] = obj[i];
      }
    }
    return t;
  }
  this.getUrls = function(){
    return t.urls;
  }
}]);
