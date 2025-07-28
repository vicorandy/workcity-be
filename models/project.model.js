const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
});

module.exports = mongoose.model('Project', projectSchema);
