describe('watchlistTest', function(){
  beforeEach(module('app'));
  var watchlist;
  beforeEach(inject(
    function(watchlistService){
      watchlist = watchlistService;
      watchlist.watchlist = [];
      watchlist.watchlists = [
        {
          __v: 6,
          _id: 1,
          user_id: 1,
          watchlist: [
            "Nike Kyrie 1 All-Star"
          ]
        },
        {
          user_id: 2,
          _id: 2,
          __v: 0,
          watchlist: [
            "Nike Kyrie 1 All-Star"
          ]
        }
      ]
    }
  ));
  it('get watchlists', function(){
    expect(watchlist.getWatchlists().length).toEqual(2);
  });
  it('gets watchlist by Id', function(){
    expect(watchlist.getWatchlistById(1)).toBeDefined();
    expect(watchlist.getWatchlistById(1)._id).toEqual(1);
  });
  it('gets watchlist by User Id', function(){
    expect(watchlist.getWatchlistByUserId(1)).toBeDefined();
    expect(watchlist.getWatchlistByUserId(1)._id).toEqual(1);
    expect(watchlist.getWatchlistByUserId(2)).toBeDefined();
    expect(watchlist.getWatchlistByUserId(2)._id).toEqual(2);
  });
  it('should add a phrase to watchlist', function(){
    watchlist.addToWatchlist(1, 'Air Jordan 4 Infrared');
    expect(watchlist.watchlist.length).toEqual(2);
    expect(watchlist.watchlist).toContain('Air Jordan 4 Infrared');
    expect(watchlist.watchlist).toContain('Nike Kyrie 1 All-Star');
  });
  it('should remove a phrase from watchlist', function(){
    watchlist.addToWatchlist(1, 'Yeezy 750 x Kanye West');
    expect(watchlist.watchlist.length).toEqual(2);
    expect(watchlist.watchlist).toContain('Yeezy 750 x Kanye West');
    expect(watchlist.watchlist).toContain('Nike Kyrie 1 All-Star');
    watchlist.removeFromWatchlist(1, 'Yeezy 750 x Kanye West');
    expect(watchlist.watchlist).toNotContain('Yeezy 750 x Kanye West');
    expect(watchlist.watchlist.length).toEqual(1);
  });
  it('should add to tempWatchlist', function(){
    watchlist.addToTempWatchlist('Puma Suede');
    watchlist.addToTempWatchlist('Puma Suede');
    expect(watchlist.getTempWatchlist().length).toEqual(1);
    expect(watchlist.getTempWatchlist()).toContain('Puma Suede');
  });
  it('should remove from tempWatchlist', function(){
    watchlist.addToTempWatchlist('Puma Suede');
    expect(watchlist.getTempWatchlist().length).toEqual(1);
    expect(watchlist.getTempWatchlist()).toContain('Puma Suede');
    watchlist.removeFromTempWatchlist('Puma Suede');
    expect(watchlist.getTempWatchlist().length).toEqual(0);
    expect(watchlist.getTempWatchlist()).toNotContain('Puma Suede');    
  });
  it('should clear tempWatchlist', function(){
    watchlist.addToTempWatchlist('Puma Suede');
    expect(watchlist.getTempWatchlist()).toContain('Puma Suede');
    watchlist.clearTempWatchlist();
    expect(watchlist.getTempWatchlist()).toEqual([]);
  });
  it('should copy tempWatchlist to watchlist', function(){
    watchlist.addToWatchlist(1, 'Yeezy 750 x Kanye West');
    watchlist.addToTempWatchlist('Puma Suede');
    watchlist.addToTempWatchlist('Nike Kyrie 1 All-Star');
    watchlist.copyTempWatchlistToWatchlist();
    expect(watchlist.getTempWatchlist()).toContain('Puma Suede');
    expect(watchlist.getTempWatchlist()).toNotContain('Nike Kyrie 1 All-Star');
    expect(watchlist.watchlist).toContain('Puma Suede');
  });
});
