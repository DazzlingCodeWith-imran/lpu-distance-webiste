// services/applicationService.js
const Application = require('../models/Application');

class ApplicationService {
    // Create new application
    static async createApplication(data) {
        try {
            // Check if mobile already exists
            const existing = await Application.findOne({ mobile: data.mobile });
            if (existing) {
                throw new Error('Mobile number already registered');
            }
            
            const application = new Application(data);
            await application.save();
            
            return {
                success: true,
                data: application,
                message: 'Application submitted successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    // Get all applications
    static async getAllApplications(filters = {}) {
        try {
            const applications = await Application.find(filters)
                .sort({ createdAt: -1 })
                .select('-__v'); // Exclude version field
            
            return {
                success: true,
                count: applications.length,
                data: applications
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    // Get single application
    static async getApplicationById(id) {
        try {
            const application = await Application.findById(id).select('-__v');
            if (!application) {
                return {
                    success: false,
                    message: 'Application not found'
                };
            }
            return {
                success: true,
                data: application
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    // Update application
    static async updateApplication(id, data) {
        try {
            const application = await Application.findByIdAndUpdate(
                id,
                data,
                { new: true, runValidators: true }
            ).select('-__v');
            
            if (!application) {
                return {
                    success: false,
                    message: 'Application not found'
                };
            }
            return {
                success: true,
                data: application,
                message: 'Application updated successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    // Delete application
    static async deleteApplication(id) {
        try {
            const application = await Application.findByIdAndDelete(id);
            if (!application) {
                return {
                    success: false,
                    message: 'Application not found'
                };
            }
            return {
                success: true,
                message: 'Application deleted successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = ApplicationService;