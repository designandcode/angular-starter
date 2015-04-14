describe('angular-underscoreTest', function(){  
  beforeEach(module('app'));
  var _, window;
  beforeEach(inject(
    function(___, _$window_){
      _ = ___;
      window = _$window_;
    }
  ));
  it('window._ should not be defined', function(){
    expect(window._).toBe(undefined);
  });
  it('_ should be defined', function(){
    expect(_).toNotBe(undefined);
  });
});
