// validators/applicationValidator.js
const { body, validationResult } = require('express-validator');

// Validation rules
const validateApplication = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name should only contain letters and spaces'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    body('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 digits')
        .matches(/^[0-9]+$/).withMessage('Mobile number should only contain digits'),
    
    body('course')
        .trim()
        .notEmpty().withMessage('Course selection is required'),
    
    body('city')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('City name is too long'),
    
    body('qualification')
        .optional()
        .trim(),
    
    body('sourcePage')
        .optional()
        .trim()
];

// Check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    const extractedErrors = errors.array().map(err => ({
        field: err.path,
        message: err.msg
    }));
    
    return res.status(400).json({
        success: false,
        errors: extractedErrors,
        message: 'Validation failed'
    });
};

module.exports = { validateApplication, validate };