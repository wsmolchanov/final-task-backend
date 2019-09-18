let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
	username : {
		type     : String,
		unique   : true,
		required : true
	},
	email					: String,
  password      : { type: String, select: false },
  confirmPassword      : { type: String, select: false },

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


User.set('toJSON', {
	transform: function (doc, ret, opt) {
			delete ret['password'];
			delete ret['confirmPassword'];
			return ret;
	}
})

module.exports = mongoose.model('User', User);