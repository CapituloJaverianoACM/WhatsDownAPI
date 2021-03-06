const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passport: String,
  name: {
    type: String,
    required: true
  },
  statusMessage: {
    type: String,
    required: false,
    default: 'ACM of PUJ is awesome!'
  },
  image: {
    type: String,
    required: false,
    default: ''
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  contacts: {
    type: [this],
    required: false,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/*
{
	"username": "juanpa097",
	"name": "Juan Pablo Peñaloza",
	"mobileNumber": 3103179283
}
*/

// Use passport with mongoose for authentication
UserSchema.plugin(passportLocalMongoose);

/**
 * @typedef User
 */

module.exports = mongoose.model('User', UserSchema);
