const mongoose = require('mongoose');
const Rep = require('./rep');
const Bill = require('./bill');

const UserSchema = new mongoose.Schema({
  username: { type:String , required: true , unique: true },
  password: { type:String , required: true },
  trackedBills: [Bill.schema],
  trackedReps: [Rep.schema]
});

module.exports = mongoose.model('User', UserSchema);
