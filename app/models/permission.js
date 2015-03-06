app.service('permissionService', [function(){
  var t = this;
  this.currentID = null;
  this.userID = null;
  this.permissions = {}
  this.set = function(permissions, currentID){
    t.currentID = currentID;
    t.permissions = permissions;
    return t;
  }
  this.show = function(id){
    if(t.permissions){
      if(id){
        if(t.permissions.show == 2 || (t.permissions.show == 1 && t.currentID == id)){
          return true;
        }
      }
    }
    return false;
  }
  this.edit = function(id){
    if(t.permissions){
      if(id && t.permissions){
        if(t.permissions.edit == 2 || (t.permissions.edit == 1 && t.currentID == id)){
          return true;
        }
      }
    }
    return false;
  }
  this.delete = function(id){
    // not sure if want to allow delete self
    if(t.permissions){
      if(id && t.permissions){
        if(t.permissions.delete == 2 && t.currentID != id){
          return true;
        }
      }
    }
    return false;
  }
  this.view = function(){
    if(t.permissions){
      if(t.permissions.view && t.permissions.view != 0){
        return true;
      }
    }
    return false;
  }
  this.create = function(){
    if(t.permissions){
      if(t.permissions.create == 2){
        return true;
      }
    }
    return false;
  }
}]);
