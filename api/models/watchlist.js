var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WatchlistSchema = new Schema({
  user_id: String,
  watchlist: [String]
});
module.exports = mongoose.model('Watchlist', WatchlistSchema);