const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'Please enter the description'
    },
});

module.exports = mongoose.model('Post', postSchema);