app.service('authService', ['$localStorage', 'userService', '$http', '$q', function($localStorage, userService, $http, $q){
  var t = this;
  this.$storage = $localStorage;
  this.$storage['v03_ED'] = this.$storage['v03_ED'] || {}
  this.session = this.$storage['v03_ED']['session'];
  this.$storage['v03_ED']['loginForms'] = false;
  this.sessions;
  this.users;
  this.login = function(credentials){
    console.log(credentials);
    if(!t.users && !t.sessions){
      // need to set up sessions api
      //var sessions = {
      //  'blah': '54fecda0555f2fbb78000001',
      //  'foo': '54fece8f555f2fbb78000002',
      //  'bar': '54fece9b555f2fbb78000003'
      //};
      var deferred = $q.defer();
      $http.get('http://localhost:3000/sneakerwatcher/api/users/username/'+credentials.username+'/password/'+credentials.password)
        .success(function(result){
          console.log(result);
          t.$storage['v03_ED']['current'] = result.user_id;
          t.$storage['v03_ED']['session'] = result.session_id;
          t.$storage['v03_ED']['persist'] = true;
          deferred.resolve(result);
          ////var sessionFound = false;
          //for(i in sessions){
          //  if(sessions[i] == result._id){
          //    t.$storage['v03_ED']['current'] = result._id;
          //    t.$storage['v03_ED']['session'] = i;
          //    t.$storage['v03_ED']['persist'] = true;
          //    deferred.resolve(result);
          //    sessionFound = true;
          //    return;
          //    //return deferred.promise;
          //  }
          //}
          //deferred.reject('No such user');
        })
        return deferred.promise;
    } else{
      var users = t.users;
      var sessions = t.sessions;
      var user = null;
      var session = null;
      for(i in users){
        if(users[i]['username'] == credentials.username && users[i]['password'] == credentials.password){
          for(j in sessions){
            if(sessions[j] == users[i]['_id']){
              t.$storage['v03_ED']['current'] = users[i]['_id'];
              t.$storage['v03_ED']['session'] = j;
              t.$storage['v03_ED']['persist'] = true;
              return true;
            }
          }
        }
      }
      return false;
    }
  }
  this.persist = function(){
    if(!t.users && !t.sessions){
      // api impementation
      //var sessions = {
      //  'blah': '54fecda0555f2fbb78000001',
      //  'foo': '54fece8f555f2fbb78000002',
      //  'bar': '54fece9b555f2fbb78000003'
      //};
      var deferred = $q.defer();
      var session = t.$storage['v03_ED']['session'];
      var current = t.$storage['v03_ED']['current'];
      $http.get('http://localhost:3000/sneakerwatcher/api/users/user/'+current+'/session/'+session)
        .success(function(result){
          if(result.session_id){
            t.$storage['v03_ED']['current'] = result.user_id;
            t.$storage['v03_ED']['session'] = result.session_id;
            t.$storage['v03_ED']['persist'] = true;
            deferred.resolve(result);
          } else{
            deferred.reject('No such session');
          }
        })
      return deferred.promise;
      //if(sessions[session]){
      //  $http.get('http://localhost:3000/sneakerwatcher/api/users/'+current)
      //    .success(function(result){
      //      if(result._id == current && result._id == sessions[session]){
      //        t.$storage['v03_ED']['current'] = result._id;
      //        t.$storage['v03_ED']['session'] = session;
      //        t.$storage['v03_ED']['persist'] = true;
      //        deferred.resolve(result);
      //      }
      //      deferred.reject('No such user');
      //    })
      //} else{
      //  deferred.reject('No such user');
      //}
      //return deferred.promise;
    } else{
      var session = t.$storage['v03_ED']['session'];
      var current = t.$storage['v03_ED']['current'];
      if(t.sessions[session]){
        var users = t.users;
        for(i in users){
          if(users[i]['_id'] == current && users[i]['_id'] == t.sessions[session]){
            t.$storage['v03_ED']['current'] = users[i]['_id'];
            t.$storage['v03_ED']['session'] = session;
            t.$storage['v03_ED']['persist'] = true;
            return users[i]['_id'];
          } else{
            t.$storage['v03_ED'] = {}
          }
        }
      }
      return false;
    }
  }
  this.logout = function(){
    // clear whatever was set in login
    var deferred = $q.defer();
    var session = t.$storage['v03_ED']['session'];
    var current = t.$storage['v03_ED']['current'];
    $http.delete('http://localhost:3000/sneakerwatcher/api/users/user/'+current+'/session/'+session)
      .success(function(result){
        t.$storage['v03_ED'] = {tempWatchlist: []}
        deferred.resolve(result);
      })
    return deferred.promise;
  }
}]);
