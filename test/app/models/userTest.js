describe('userTest', function(){
  beforeEach(module('app'));
  var user;
  beforeEach(inject(
    function(userService, authService, _$localStorage_){
      user = userService;
      auth = authService;
      localStorage = _$localStorage_;
    }
  ));
  it('should get users', function(){
    expect(user.getUsers().length).toEqual(3);
    expect(user.getUsers()[0].id).toEqual(1);
    expect(user.getUsers()[1].id).toEqual(2);
    expect(user.getUsers()[2].id).toEqual(3);
  });
  it('should get user', function(){
    expect(user.getUser(1).id).toEqual(1);
    expect(user.getUser(2).id).toEqual(2);
    expect(user.getUser(3).id).toEqual(3);
  });
  it('should get current user', function(){
    auth.login({firstName: 'Foo', lastName: 'Bar'});
    expect(user.getUser().id).toEqual(1);
    expect(user.getCurrent().id).toEqual(1);
  });
  it('should create a user', function(){
    var newUser = {firstName: 'New', lastName: 'User', permissions: {show: 2, view: 2, edit: 1, delete: 0}}
    auth.login({firstName: 'Foo', lastName: 'Bar'});
    var createUser = user.createUser(newUser);
    createUser.save();
    expect(createUser).toNotBe(false);
    expect(createUser).toNotBe(undefined);
    expect(createUser.$.id).toBe(4);
    expect(user.getUsers().length).toEqual(4);
    var createUser = user.createUser(newUser);
    createUser.save();
    expect(createUser).toNotBe(false);
    expect(createUser.$.id).toBe(5);
    expect(user.getUsers().length).toEqual(5);
  });
  it('should edit a user', function(){
    var editUser = user.editUser(1);
    editUser.$.firstName = "Bar";
    editUser.save();
    expect(user.getUser(1).firstName).toBe('Bar');
    editUser.$.firstName = "Foo";
    editUser.save();
    expect(user.getUser(1).firstName).toBe('Foo');
  });
  it('should delete a user', function(){
    var deleteUser = user.deleteUser(1);
    expect(deleteUser).toBe(true);
    expect(user.getUser(1)).toEqual({});
  });
});
