const mongoose = require('mongoose');
const {Types: mongooseTypes} = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  name: {
    type: mongooseTypes.String,
    unique: true
  },
  createdAt: mongooseTypes.Date
});

groupSchema.pre('save', function (next) {
  try {
    this.createdAt = Date.now();
    next();
  } catch (err) {
    next(err);
  }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

