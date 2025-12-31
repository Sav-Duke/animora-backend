const CodeValidation = require('../models/codeValidationModel');

// Get all validation results
exports.getAllValidations = async (req, res) => {
  try {
    const results = await CodeValidation.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get validation by ID
exports.getValidationById = async (req, res) => {
  try {
    const result = await CodeValidation.findById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new validation result
exports.createValidation = async (req, res) => {
  try {
    const validation = new CodeValidation(req.body);
    await validation.save();
    res.status(201).json(validation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update validation result
exports.updateValidation = async (req, res) => {
  try {
    const validation = await CodeValidation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!validation) return res.status(404).json({ error: 'Not found' });
    res.json(validation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete validation result
exports.deleteValidation = async (req, res) => {
  try {
    const validation = await CodeValidation.findByIdAndDelete(req.params.id);
    if (!validation) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
