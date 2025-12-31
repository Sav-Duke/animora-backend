
import express from 'express';
import * as codeValidatorController from '../controllers/codeValidatorController.js';

const router = express.Router();
// CRUD routes for Code Validator
router.get('/', codeValidatorController.getAllValidations);
router.get('/:id', codeValidatorController.getValidationById);
router.post('/', codeValidatorController.createValidation);
router.put('/:id', codeValidatorController.updateValidation);
router.delete('/:id', codeValidatorController.deleteValidation);

export default router;
