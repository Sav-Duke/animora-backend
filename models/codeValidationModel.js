const mongoose = require('mongoose');

const codeValidationSchema = new mongoose.Schema({
  file: { type: String, required: true },
  result: { type: String, required: true },
  errors: { type: [String], default: [] },
  warnings: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodeValidation', codeValidationSchema);