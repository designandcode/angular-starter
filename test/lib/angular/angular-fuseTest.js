describe('angular-fuseTest', function(){  
  beforeEach(module('app'));
  var fuse, window;
  beforeEach(inject(
    function(_$fuse_, _$window_){
      fuse = _$fuse_;
      window = _$window_;
    }
  ));
  it('window.Fuse should not be defined', function(){
    expect(window.Fuse).toBe(undefined);
  });
  it('fuse should be defined', function(){
    expect(fuse).toNotBe(undefined);
  });
});
