
import express from 'express';
import * as seoController from '../controllers/seoController.js';

const router = express.Router();
// CRUD routes for SEO Optimizer
router.get('/', seoController.getAllSEO);
router.get('/:page', seoController.getSEOByPage);
router.post('/', seoController.createSEO);
router.put('/:page', seoController.updateSEO);
router.delete('/:page', seoController.deleteSEO);

export default router;
