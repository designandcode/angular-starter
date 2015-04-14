describe('urlServiceTest', function(){
  beforeEach(module('app'));
  var url;
  beforeEach(inject(
    function(urlService){
      url = urlService;
      urlService.setUrl('home', '#/Home');
      urlService.setUrl('user', {});
      urlService.setUrl('sneaker', {});
      urlService.setUrl('404', '#/404');
      urlService.setUrl('register', '#/Account/Register');
    }
  ));
  it('should get url', function(){
    expect(url.getUrls().home).toEqual('#/Home');
    expect(url.getUrls()['404']).toEqual('#/404');
    expect(url.getUrls()['register']).toEqual('#/Account/Register');
  });
  it('should get user urls', function(){
    expect(url.getUrls().user.view()).toEqual('#/User/View');
    expect(url.getUrls().user.show(1)).toEqual('#/User/Show/1');
    expect(url.getUrls().user.edit(1)).toEqual('#/User/Edit/1');
    expect(url.getUrls().user.delete(1)).toEqual('#/User/Delete/1');
    expect(url.getUrls().user.new()).toEqual('#/User/New');
  });
  it('should get sneaker urls', function(){
    expect(url.getUrls().sneaker.view()).toEqual('#/Sneaker/View');
    expect(url.getUrls().sneaker.show(1)).toEqual('#/Sneaker/Show/1');
    expect(url.getUrls().sneaker.edit(1)).toEqual('#/Sneaker/Edit/1');
    expect(url.getUrls().sneaker.delete(1)).toEqual('#/Sneaker/Delete/1');
    expect(url.getUrls().sneaker.new()).toEqual('#/Sneaker/New');
  });
});
