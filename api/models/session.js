var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SessionSchema = new Schema({
  user_id: String
});
module.exports = mongoose.model('Session', SessionSchema);