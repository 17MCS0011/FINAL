const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/NodeProj',{ useNewUrlParser: true}, (err) => {
    if(!err) { console.log('MongoDB Connection Succeeded') }
    else { console.log('Error in DB Connection : ' +err)}
});

mongoose.Promise = global.Promise;

require('./proj.model');
require('./employee.model');
require('./post.model');

//module.exports = require('./employee.model');
