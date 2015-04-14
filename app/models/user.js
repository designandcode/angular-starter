app.service('userService', ['$localStorage', '$http', '$q', function($localStorage, $http, $q){
  var t = this;
  this.$storage = $localStorage;
  this.$storage['v03_ED'] = this.$storage['v03_ED'] || {}
  this.user = {};
  this.current = {};
  this.users;
  this.newUser = {};
  this.tempUser = {};
  this.getUsers = function(){
    if(!t.users){
      // api impementation
      var deferred = $q.defer();
      $http.get("http://localhost:3000/sneakerwatcher/api/users").success(function(data){
          deferred.resolve(data);
      });
      return deferred.promise;
    } else{
      return t.users;
    }
  }
  this.getUserByUsernamePassword = function(credentials){
    if(!t.users){
    } else{
      var users = t.getUsers();
      for(var i=0; i<users.length; i++){
        if(users[i].username == credentials.username && users[i].password == credentials.password){
          t.user = users[i];
          return t.user;
        }
      }
    }
  }
  this.getUser = function(id){
    if(!t.users){
      if(id){
        // api impementation
        var deferred = $q.defer();
        $http.get("http://localhost:3000/sneakerwatcher/api/users/"+id).success(function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
      } else{
        return t.getCurrent();
      }
    } else{
      if(id){
        var users = t.getUsers();
        for(var i=0; i<users.length; i++){
          if(users[i]._id == id){
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
  }
  this.getCurrent = function(){
    if(!t.users){
      var userID = t.$storage['v03_ED']['current'];
      // api impementation
      var deferred = $q.defer();
      if(userID){
        $http.get("http://localhost:3000/sneakerwatcher/api/users/"+userID).success(function(data){
            deferred.resolve(data);
        });
        //return deferred.promise;
      } else{
        console.log('no user');
        deferred.reject('No current user');
        //return deferred.promise;
      }
      return deferred.promise;
    } else{
      var userID = t.$storage['v03_ED']['current'];
      if(userID){
        var users = t.getUsers();
        for(var i=0; i<users.length; i++){
          if(users[i]._id == userID){
            t.current = users[i];
          }
        }
        return t.current;
      } else{
        t.current = {}
        return t.current;
      }
    }
  }
  this.createUser = function(user){
    if(!t.users){
      // api implementation
      var deferred = $q.defer();
      if(user){
        $http.post("http://localhost:3000/sneakerwatcher/api/users", user).success(function(data){
          deferred.resolve(data);
        })
      } else{
        deferred.reject('No user created');
      }
      return deferred.promise;
    } else{
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
  }
  this.editUser = function(id){
    if(!t.users){
    } else{
      return {
        $: t.getUser(id),
        save: function(){
          t.user[id-1] = this.$
          return true;
        } 
      }
    }
  }
  this.deleteUser = function(id){
    if(!t.users){
    } else{
      if(id){
        t.users.splice(id-1, 1);
        return true;
      }
      return false;
    }
  }
}]);
