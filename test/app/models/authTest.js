describe("permissionTest", function(){
  beforeEach(module('app'));
  var auth;
  beforeEach(inject(
    function(authService){
      auth = authService;
      auth.sessions = {
        'blah': '54fecda0555f2fbb78000001',
        'foo': '54fece8f555f2fbb78000002',
        'bar': '54fece9b555f2fbb78000003'
      };
      auth.users = [
        {
          "email": "kalim.fleet@gmail.com",
          "password": "pas5w0rd",
          "username": "kandmin1",
          "_id": "54fecda0555f2fbb78000001",
          "__v": 0,
          "permissions": {
            "show": 2,
            "view": 2,
            "edit": 2,
            "delete": 2,
            "create": 2
          }
        },
        {
          "email": "testuser1@example.com",
          "password": "pas5w0rd",
          "username": "testuser1",
          "_id": "54fece8f555f2fbb78000002",
          "__v": 0,
          "permissions": {
            "show": 2,
            "view": 2,
            "edit": 1,
            "delete": 0,
            "create": 1
          }
        },
        {
          "email": "testuser2@example.com",
          "password": "pas5w0rd",
          "username": "testuser2",
          "_id": "54fece9b555f2fbb78000003",
          "__v": 0,
          "permissions": {
            "show": 2,
            "view": 2,
            "edit": 1,
            "delete": 0,
            "create": 1
          }
        }
      ];
    }
  ));
  it('should not persist', function(){
    expect(auth.persist()).toBe(false);
  });
  it('should log in', function(){
    expect(auth.login({username: 'testuser1', password: 'pas5w0rd'})).toBe(true);
  });
  it('should persist user 2', function(){
    auth.login({username: 'testuser1', password: 'pas5w0rd'});
    expect(auth.persist()).toBe('54fece8f555f2fbb78000002');
  });
  it('should persist user 3', function(){
    auth.login({username: 'testuser2', password: 'pas5w0rd'});
    expect(auth.persist()).toBe('54fece9b555f2fbb78000003');
  });
  it('should not persist non-existent user', function(){    
    auth.login({firstName: 'thisuser', lastName: 'doesnotexist'});
    expect(auth.persist()).toBe(false);
  })
});
