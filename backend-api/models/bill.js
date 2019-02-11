const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  title: { type:String , required: true }
});

module.exports = mongoose.model('Bill', BillSchema);