app.service('authService', ['$localStorage', function($localStorage){
  var t = this;
  this.$storage = $localStorage;
  this.$storage['v03_ED'] = this.$storage['v03_ED'] || {}
  this.session = this.$storage['v03_ED']['session'];
  this.sessions = {
    'blah': 1,
    'foo': 2,
    'bar': 3
  };
  this.users = [
    {id: 1, firstName: 'Foo', lastName: 'Bar', email: 'fakeuser@example.com', permissions: {show: 2, view: 2, edit: 2, delete: 2, create: 2}}, // permission - 0, 1, 2 - 0 nope, 1 self, 2 all
    {id: 2, firstName: 'Sue', lastName: 'Baz', email: 'suezer@example.com', permissions: {show: 2, view: 2, edit: 1, delete: 0}},
    {id: 3, firstName: 'Blah', lastName: 'Foo', email: 'blahblah@example.com', permissions: null}
  ];
  this.login = function(credentials){
    var users = t.users;
    var sessions = t.sessions;
    var user = null;
    var session = null;
    for(i in users){
      if(users[i]['firstName'] == credentials.firstName && users[i]['lastName'] == credentials.lastName){
        for(j in sessions){
          if(sessions[j] == users[i]['id']){
            t.$storage['v03_ED']['current'] = users[i]['id'];
            t.$storage['v03_ED']['session'] = j;
            t.$storage['v03_ED']['persist'] = true;
            return true;
          }
        }
      }
    }
    return false;
  }
  this.persist = function(){
    var session = t.$storage['v03_ED']['session'];
    var current = t.$storage['v03_ED']['current'];
    if(t.sessions[session]){
      var users = t.users;
      for(i in users){
        if(users[i]['id'] == current && users[i]['id'] == t.sessions[session]){
          t.$storage['v03_ED']['current'] = users[i]['id'];
          t.$storage['v03_ED']['session'] = session;
          t.$storage['v03_ED']['persist'] = true;
          return users[i]['id'];
        } else{
          t.$storage['v03_ED'] = {}
        }
      }
    }
    return false;
  }
  this.logout = function(){
    // clear whatever was set in login
    t.$storage['v03_ED'] = {}
    return true;
  }
}]);
