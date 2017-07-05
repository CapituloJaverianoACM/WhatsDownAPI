const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
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

/**
 * @typedef User
 */

module.exports = mongoose.model('User', UserSchema);
