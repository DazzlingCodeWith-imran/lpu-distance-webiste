// controllers/applicationController.js
const ApplicationService = require('../services/applicationService');

class ApplicationController {
    // Create new application
    static async createApplication(req, res) {
        const result = await ApplicationService.createApplication(req.body);
        
        if (!result.success) {
            return res.status(400).json(result);
        }
        
        return res.status(201).json(result);
    }
    
    // Get all applications
    static async getAllApplications(req, res) {
        const result = await ApplicationService.getAllApplications();
        
        if (!result.success) {
            return res.status(500).json(result);
        }
        
        return res.status(200).json(result);
    }
    
    // Get single application
    static async getApplicationById(req, res) {
        const { id } = req.params;
        const result = await ApplicationService.getApplicationById(id);
        
        if (!result.success) {
            return res.status(404).json(result);
        }
        
        return res.status(200).json(result);
    }
    
    // Update application
    static async updateApplication(req, res) {
        const { id } = req.params;
        const result = await ApplicationService.updateApplication(id, req.body);
        
        if (!result.success) {
            return res.status(404).json(result);
        }
        
        return res.status(200).json(result);
    }
    
    // Delete application
    static async deleteApplication(req, res) {
        const { id } = req.params;
        const result = await ApplicationService.deleteApplication(id);
        
        if (!result.success) {
            return res.status(404).json(result);
        }
        
        return res.status(200).json(result);
    }
}

module.exports = ApplicationController;