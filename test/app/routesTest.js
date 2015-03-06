describe("routesTest", function(){
  beforeEach(module('app'));
  var route, location, rootScope, httpBackend, scope;
  beforeEach(inject(
    function(_$route_, _$location_, _$rootScope_, _$httpBackend_){
      route = _$route_;
      location = _$location_;
      rootScope = _$rootScope_;
      scope = _$rootScope_.$new();
      httpBackend = _$httpBackend_;
    }
  ));
  it('should test routes', function(){
    expect(route.routes['/Home'].templateUrl).toEqual('./app/views/home/index.html');
    expect(route.routes['/User/Show/:id'].templateUrl).toEqual('./app/views/user/show.html');
    expect(route.routes['/User/Edit/:id'].templateUrl).toEqual('./app/views/user/edit.html');
    expect(route.routes['/User/View'].templateUrl).toEqual('./app/views/user/index.html');
    expect(route.routes['/User/New'].templateUrl).toEqual('./app/views/user/new.html');
    expect(route.routes['/User/Delete/:id'].templateUrl).toEqual('./app/views/user/delete.html');
    expect(route.routes['/404'].templateUrl).toEqual('./app/views/404/index.html');
    expect(route.routes[null].redirectTo).toEqual('/404');
  });
});
