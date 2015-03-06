describe('urlServiceTest', function(){
  beforeEach(module('app'));
  var url;
  beforeEach(inject(
    function(urlService){
      url = urlService;
      url.setUrls({
        home: '#/Home',
        user: {},
        '404': '#/404'
      })
    }
  ));
  it('should get urls', function(){
    expect(url.getUrls().home).toEqual('#/Home');
    expect(url.getUrls()['404']).toEqual('#/404');
  });
  it('should get rest urls', function(){
    expect(url.getUrls().user.view()).toEqual('#/User/View');
    expect(url.getUrls().user.show(1)).toEqual('#/User/Show/1');
    expect(url.getUrls().user.edit(1)).toEqual('#/User/Edit/1');
    expect(url.getUrls().user.delete(1)).toEqual('#/User/Delete/1');
    expect(url.getUrls().user.new()).toEqual('#/User/New');
  })
});
