describe('angular-lodashTest', function(){  
  beforeEach(module('app'));
  var _, window;
  beforeEach(inject(
    function(_$__, _$window_){
      _ = _$__;
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
