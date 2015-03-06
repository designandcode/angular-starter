app.service('userService', ['$localStorage', function($localStorage){
  var t = this;
  this.$storage = $localStorage;
  this.user = {};
  this.current = {};
  this.users = [
    {id: 1, firstName: 'Foo', lastName: 'Bar', email: 'fakeuser@example.com', permissions: {show: 2, view: 2, edit: 2, delete: 2, create: 2}}, // permission - 0, 1, 2 - 0 nope, 1 self, 2 all
    {id: 2, firstName: 'Sue', lastName: 'Baz', email: 'suezer@example.com', permissions: {show: 2, view: 2, edit: 1, delete: 0}},
    {id: 3, firstName: 'Blah', lastName: 'Foo', email: 'blahblah@example.com', permissions: null}
  ];
  this.newUser = {};
  this.tempUser = {};
  this.getUsers = function(){
    return t.users;
  }
  this.getUser = function(id){
    if(id){
      var users = t.getUsers();
      for(var i=0; i<users.length; i++){
        if(users[i].id == id){
          t.user = users[i];
          return t.user;
        }
      }
    } else{
      t.user = t.getCurrent();
      return t.user;
    }
    return {};
  }
  this.getCurrent = function(){
    var userID = t.$storage['v03_ED']['current'];
    if(userID){
      var users = t.getUsers();
      for(var i=0; i<users.length; i++){
        if(users[i].id == userID){
          t.current = users[i];
        }
      }
      return t.current;
    } else{
      t.current = {}
      return t.current;
    }
  }
  this.createUser = function(user){
    if(user){
      var usersCount = t.getUsers().length + 1;
      user['id'] = usersCount++;
      return {
        $: user,
        save: function(){
          t.users.push(this.$);
          return true;
        }
      }
    }
    return false;
  }
  this.editUser = function(id){
    return {
      $: t.getUser(id),
      save: function(){
        t.user[id-1] = this.$
        return true;
      } 
    }
  }
  this.deleteUser = function(id){
    if(id){
      t.users.splice(id-1, 1);
      return true;
    }
    return false;
  }
}]);
