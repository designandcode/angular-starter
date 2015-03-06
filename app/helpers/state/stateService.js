app.service('stateService', [function(){
  var t = this;
  this.states = {}
  this.setState = function(obj){
    //t.states[obj.name] = {active: obj.active, prev: obj.prev, next: obj.next}
    //tempObj = {}
    //for(i in obj){
    //  if(i != 'name'){
    //    tempObj[i] = obj[i];
    //  }
    //}
    //t.states[obj.name] = tempObj;
    t.states = obj;
    return t;
  }
  this.getState = function(name){
    return t.states[name];
  }
  this.getStates = function(arr){
    //var states = {}
    //if(arr){
    //  console.log(arr, t.states);
    //  for(i in arr){
    //    //console.log(arr[i]);
    //    states[arr[i]] = t.states[arr[i]];
    //  }
    //  console.log(states);
    //  t.states = states;
    //}
    return t.states;
    //var states = {};
    //if(arr){
    //  for(i=0; i<arr.length; i++){
    //    if(t.states[arr[i]]){
    //      states[arr[i]] = t.states[arr[i]];
    //      //states.push(t.states[arr[i]]);
    //      console.log(states);
    //    }
    //    return states;
    //  }
    //}
    //return t.states;
  }
  this.updateState = function(name, prop, val){
    if(t.states[name]){
      t.states[name][prop] = val;
    } else{
      console.log('not defined');
      t.states[name] = {}
      console.log(t.states[name]);
      t.states[name][prop] = val;
      console.log(t.states);
    }
    return t.states;
  }
  //return t;
  //this.states = {
  //  home: {
  //    loggedIn: function(){
  //      
  //    }
  //  },
  //  user: {
  //    
  //  }
  //}
}]);
