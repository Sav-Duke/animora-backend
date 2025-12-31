const SEO = require('../models/seoModel');

// Get all SEO entries
exports.getAllSEO = async (req, res) => {
  try {
    const seo = await SEO.find();
    res.json(seo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get SEO by page
exports.getSEOByPage = async (req, res) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page });
    if (!seo) return res.status(404).json({ error: 'Not found' });
    res.json(seo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new SEO entry
exports.createSEO = async (req, res) => {
  try {
    const seo = new SEO(req.body);
    await seo.save();
    res.status(201).json(seo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update SEO entry
exports.updateSEO = async (req, res) => {
  try {
    const seo = await SEO.findOneAndUpdate(
      { page: req.params.page },
      req.body,
      { new: true, runValidators: true }
    );
    if (!seo) return res.status(404).json({ error: 'Not found' });
    res.json(seo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete SEO entry
exports.deleteSEO = async (req, res) => {
  try {
    const seo = await SEO.findOneAndDelete({ page: req.params.page });
    if (!seo) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
