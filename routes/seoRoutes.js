const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');

// CRUD routes for SEO Optimizer
router.get('/', seoController.getAllSEO);
router.get('/:page', seoController.getSEOByPage);
router.post('/', seoController.createSEO);
router.put('/:page', seoController.updateSEO);
router.delete('/:page', seoController.deleteSEO);

module.exports = router;
