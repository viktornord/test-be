const mongoose = require('mongoose');
const {Types: mongooseTypes} = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: mongooseTypes.String,
  age: mongooseTypes.Number,
  phone: mongooseTypes.String,
  email: mongooseTypes.String,
  group: mongooseTypes.ObjectId
});

userSchema.pre('save', function (next) {
  try {
    this.createdAt = Date.now();
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.index({ name: 1, group: 1  }, {unique: true});

const User = mongoose.model('User', userSchema);

module.exports = User;

