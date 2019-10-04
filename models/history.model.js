let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let History = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: { type: String, required: true },
  username: String
});

module.exports = mongoose.model('User', User);