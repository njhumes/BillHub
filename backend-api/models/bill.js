const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  title: { type:String , required: true , unique: true },
  summary: String,
  state: {type:String, required: true},
  proposed: Date,
  lastAction: Date,
  trackingCount: Number
});

module.exports = mongoose.model('Bill', BillSchema);