describe("permissionTest", function(){
  beforeEach(module('app'));
  var permission;
  beforeEach(inject(
    function(permissionService){
      permission = permissionService;
    }
  ));
  it('should test no permissions - user 3', function(){
    var permissions = permission.set(null, 3);
    expect(permissions.show(3)).toBe(false);
    expect(permissions.show(2)).toBe(false);
    expect(permissions.show(1)).toBe(false);
    expect(permissions.edit(3)).toBe(false);
    expect(permissions.edit(2)).toBe(false);
    expect(permissions.edit(1)).toBe(false);
    expect(permissions.delete(3)).toBe(false);
    expect(permissions.delete(2)).toBe(false);
    expect(permissions.delete(1)).toBe(false);
    expect(permissions.view()).toBe(false);
    expect(permissions.create()).toBe(false);
  });
  it('should test permissions - user 2', function(){
    var permissions = permission.set({show: 2, view: 2, edit: 1, delete: 0}, 2);
    expect(permissions.show(2)).toBe(true);
    expect(permissions.show(1)).toBe(true);
    expect(permissions.show(3)).toBe(true);
    expect(permissions.edit(2)).toBe(true);
    expect(permissions.edit(1)).toBe(false);
    expect(permissions.edit(3)).toBe(false);
    expect(permissions.delete(2)).toBe(false);
    expect(permissions.delete(1)).toBe(false);
    expect(permissions.delete(3)).toBe(false);
    expect(permissions.view()).toBe(true);
    expect(permissions.view()).toBe(true);
    expect(permissions.view()).toBe(true);
    expect(permissions.create()).toBe(false);
  });
  it('should test permissions - user 1', function(){
    var permissions = permission.set({show: 2, view: 2, edit: 2, delete: 2, create: 2}, 1);
    expect(permissions.show(1)).toBe(true);
    expect(permissions.show(2)).toBe(true);
    expect(permissions.show(3)).toBe(true);
    expect(permissions.edit(1)).toBe(true);
    expect(permissions.edit(2)).toBe(true);
    expect(permissions.edit(3)).toBe(true);
    expect(permissions.delete(1)).toBe(false);
    expect(permissions.delete(2)).toBe(true);
    expect(permissions.delete(3)).toBe(true);
    expect(permissions.view()).toBe(true);
    expect(permissions.create()).toBe(true);
  })
});
