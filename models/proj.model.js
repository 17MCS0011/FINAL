const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    projectManager: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Project', projectSchema );