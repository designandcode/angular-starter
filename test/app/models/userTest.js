describe('userTest', function(){
  beforeEach(module('app'));
  var user;
  beforeEach(inject(
    function(userService, authService, _$localStorage_){
      auth = authService;
      localStorage = _$localStorage_;
      user = userService;
      auth.sessions = {
        'blah': '54fecda0555f2fbb78000001',
        'foo': '54fece8f555f2fbb78000002',
        'bar': '54fece9b555f2fbb78000003'
      };
      auth.users = user.users = [
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
  it('should get users', function(){
    expect(user.getUsers().length).toEqual(3);
    expect(user.getUsers()[0]._id).toEqual('54fecda0555f2fbb78000001');
    expect(user.getUsers()[1]._id).toEqual('54fece8f555f2fbb78000002');
    expect(user.getUsers()[2]._id).toEqual('54fece9b555f2fbb78000003');
  });
  it('should get user', function(){
    expect(user.getUser('54fecda0555f2fbb78000001')._id).toEqual('54fecda0555f2fbb78000001');
    expect(user.getUser('54fece8f555f2fbb78000002')._id).toEqual('54fece8f555f2fbb78000002');
    expect(user.getUser('54fece9b555f2fbb78000003')._id).toEqual('54fece9b555f2fbb78000003');
  });
  it('should get user by username/password', function(){
    expect(user.getUserByUsernamePassword({username:'kandmin1', password:'pas5w0rd'})._id).toEqual('54fecda0555f2fbb78000001');
  });
  /*it('should get current user', function(){ -- this test doesn't belong here? - belongs in authTest?
    auth.login({username: 'kandmin1', password: 'pas5w0rd'});
    expect(user.getUser()._id).toEqual('54fecda0555f2fbb78000001');
    expect(user.getCurrent()._id).toEqual('54fecda0555f2fbb78000001');
  });*/
  //it('should create a user', function(){
  //  var newUser = {firstName: 'New', lastName: 'User', permissions: {show: 2, view: 2, edit: 1, delete: 0}}
  //  auth.login({firstName: 'Foo', lastName: 'Bar'});
  //  var createUser = user.createUser(newUser);
  //  createUser.save();
  //  expect(createUser).toNotBe(false);
  //  expect(createUser).toNotBe(undefined);
  //  expect(createUser.$.id).toBe(4);
  //  expect(user.getUsers().length).toEqual(4);
  //  var createUser = user.createUser(newUser);
  //  createUser.save();
  //  expect(createUser).toNotBe(false);
  //  expect(createUser.$.id).toBe(5);
  //  expect(user.getUsers().length).toEqual(5);
  //});
  //it('should edit a user', function(){
  //  var editUser = user.editUser(1);
  //  editUser.$.firstName = "Bar";
  //  editUser.save();
  //  expect(user.getUser(1).firstName).toBe('Bar');
  //  editUser.$.firstName = "Foo";
  //  editUser.save();
  //  expect(user.getUser(1).firstName).toBe('Foo');
  //});
  //it('should delete a user', function(){
  //  var deleteUser = user.deleteUser(1);
  //  expect(deleteUser).toBe(true);
  //  expect(user.getUser(1)).toEqual({});
  //});
});
