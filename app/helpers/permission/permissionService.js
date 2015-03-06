app.service('permissionService', [function(){
  this.set = function(permissions, currentID, userID){  // should be get?
    console.log('permissions loaded from service');
    if(permissions){
      for(var i in permissions){
        if(permissions[i] == 1 && currentID == userID){
          permissions[i] = true;
        } else if(permissions[i] == 2){
          permissions[i] = true;
        } else{
          permissions[i] = false;
        }
      }
    }
    return permissions;    
  }
  // persist then return permissions
  //this.permissions = ['show', 'view', 'edit'];
  //this.permissions = {show: true, view: true, edit: true, delete: false}
  //this.permissions = null;
}]);
