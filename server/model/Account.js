const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  fileType: { type: String },
});

const accountSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',       
    required: true 
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  files: [fileSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', accountSchema);
