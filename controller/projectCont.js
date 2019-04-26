const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');


router.get('/', (req, res) => {
    res.render("projects/addOrEdit", {
        viewTitle: "Insert New Project"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertProject(req, res);
        else
        updateProject(req, res);
});


function insertProject(req, res) {
    var project = new Project();
    project.title = req.body.title;
    project.projectManager = req.body.projectManager;
    project.description = req.body.description;
    project.save((err, doc) => {
        if (!err){
            res.redirect('projects/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("projects/addOrEdit", {
                    viewTitle: "Insert New Project",
                    project: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateProject(req, res) {
    Project.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('projects/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("projects/addOrEdit", {
                    viewTitle: 'Update Project Details',
                    project: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Project.find((err, docs) => {
        if (!err) {
            res.render("projects/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving project list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'title':
                body['title'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/viewproject/:id', (req, res) => {
    Project.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("projects/vlist", {
                project: doc
            });
        }
    });
});

router.get('/:id', (req, res) => {
    Project.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("projects/addOrEdit", {
                viewTitle: "Update Project Details",
                project: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/projects/list');
        }
        else { console.log('Error in project deletion :' + err); }
    });
});

module.exports = router;