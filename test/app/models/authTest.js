describe("permissionTest", function(){
  beforeEach(module('app'));
  var auth;
  beforeEach(inject(
    function(authService, _$localStorage_){
      auth = authService;
      localStoarge = _$localStorage_;
    }
  ));
  it('should not persist', function(){
    expect(auth.persist()).toBe(false);
  });
  it('should log in', function(){
    expect(auth.login({firstName: 'Foo', lastName: 'Bar'})).toBe(true);
  });
  it('should persist user 1', function(){
    auth.login({firstName: 'Foo', lastName: 'Bar'});
    expect(auth.persist()).toBe(1);
  });
  it('should persist user 2', function(){
    auth.login({firstName: 'Sue', lastName: 'Baz'});
    expect(auth.persist()).toBe(2);
  });
  it('should persist user 3', function(){
    auth.login({firstName: 'Blah', lastName: 'Foo'});
    expect(auth.persist()).toBe(3);
  });
  it('should not persist non-existent user', function(){    
    auth.login({firstName: 'thisuser', lastName: 'doesnotexist'});
    expect(auth.persist()).toBe(false);
  })
});
