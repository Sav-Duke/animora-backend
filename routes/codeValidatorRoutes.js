const express = require('express');
const router = express.Router();
const codeValidatorController = require('../controllers/codeValidatorController');

// CRUD routes for Code Validator
router.get('/', codeValidatorController.getAllValidations);
router.get('/:id', codeValidatorController.getValidationById);
router.post('/', codeValidatorController.createValidation);
router.put('/:id', codeValidatorController.updateValidation);
router.delete('/:id', codeValidatorController.deleteValidation);

module.exports = router;
