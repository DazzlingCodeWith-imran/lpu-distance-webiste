// models/Application.js

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({

    // User Fields
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please enter a valid email'
        ]
    },

    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        trim: true,
        match: [
            /^[0-9]{10}$/,
            'Mobile number must be exactly 10 digits'
        ]
    },

    course: {
        type: String,
        required: [true, 'Course is required'],
        trim: true
    },

    city: {
        type: String,
        trim: true,
        default: ''
    },

    qualification: {
        type: String,
        trim: true,
        default: ''
    },


    // System Fields
    status: {
        type: String,
        enum: [
            'New',
            'Contacted',
            'In Progress',
            'Converted',
            'Not Interested'
        ],
        default: 'New'
    },

    sourcePage: {
        type: String,
        default: 'Unknown'
    }

}, {
    timestamps: true
});


// Database Indexes
applicationSchema.index(
    { mobile: 1 },
    { unique: true }
);

applicationSchema.index({ email: 1 });
applicationSchema.index({ status: 1 });


// Virtual Field
applicationSchema.virtual('fullDetails').get(function () {
    return `${this.fullName} - ${this.course} - ${this.mobile}`;
});


// Pre Save Middleware
applicationSchema.pre('save', async function () {

    // Capitalize Name
    if (this.fullName) {
        this.fullName = this.fullName
            .split(' ')
            .map(word =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
            )
            .join(' ');
    }


    // Clean Mobile Number
    if (this.mobile) {
        this.mobile = this.mobile.replace(/\D/g, '');
    }

});


// Model Export
const Application = mongoose.model(
    'Application',
    applicationSchema
);

module.exports = Application;