// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/applicationController');
const { validateApplication, validate } = require('../validators/applicationValidator');

// Create application
router.post('/', validateApplication, validate, ApplicationController.createApplication);

// Get all applications
router.get('/', ApplicationController.getAllApplications);

// Get single application
router.get('/:id', ApplicationController.getApplicationById);

// Update application
router.patch('/:id', ApplicationController.updateApplication);

// Delete application
router.delete('/:id', ApplicationController.deleteApplication);

module.exports = router;