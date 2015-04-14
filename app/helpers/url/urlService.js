app.service('urlService', [function(){
  var t = this;
  this.urls = {}
  this.setUrl = function(name, url){
    t.urls[name] = url;
    if(url !== null && typeof url === 'object'){
      t.urls[name]['view'] = function(){ return '#/'+ name.charAt(0).toUpperCase() + name.slice(1) + '/View' }
      t.urls[name]['show'] = function(id){ return '#/'+ name.charAt(0).toUpperCase() + name.slice(1) + '/Show/' + id; }
      t.urls[name]['edit'] = function(id){ return '#/'+ name.charAt(0).toUpperCase() + name.slice(1) + '/Edit/' + id; }
      t.urls[name]['delete'] = function(id){ return '#/'+ name.charAt(0).toUpperCase() + name.slice(1) + '/Delete/' + id; }
      t.urls[name]['new'] = function(){ return  '#/'+ name.charAt(0).toUpperCase() + name.slice(1) + '/New'; }
    } else{
      t.urls[name] = url;
    }
  }
  this.getUrls = function(){
    return t.urls;
  }
}]);
