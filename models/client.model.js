const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Client', clientSchema);
