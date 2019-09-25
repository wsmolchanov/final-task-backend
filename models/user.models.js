let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
  },
  hash: { type: String, required: true },
	email: String,

});

User.pre('save', function(next) {
	let str = '';
  const fields = ['username'];
  fields.forEach(field => {
    if (this[field]) {
      str += this[field];
    }
  });
  this.searchField = str.replace(/\s+/g, ' ').trim();
  next();
});


module.exports = mongoose.model('User', User);