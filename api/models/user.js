var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  permissions: {
    show: {type: Number, min: 0, max: 2},
    view: {type: Number, min: 0, max: 2},
    edit: {type: Number, min: 0, max: 2},
    delete: {type: Number, min: 0, max: 2},
    create: {type: Number, min: 0, max: 2}
  }
});
module.exports = mongoose.model('User', UserSchema);