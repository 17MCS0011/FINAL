const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

router.get('/', (req,res) => {
  res.render("./post/addPost", {
      viewTitle: "Enter New Post"
  });
});

router.post('/', (req,res) => {
  if(req.body._id == '')
          insertPost(req, res);
  else
          updatePost(req, res);
});

function insertPost(req,res){
  var post = new Post();
  post.title = req.body.title;
  post.description = req.body.description;
  post.save((err,doc) => {
      if (!err)
          res.redirect('./post/postList');
      else {
              if (err.name == 'ValidationError') {
                  handleValidationError(err, req.body);
                  res.render("./post/addPost", {
                      viewTitle: "Insert Employee",
                      employee: req.body
                  });
                 }
             else 
                    console.log('Error during record insertion : '+ err);
           }
     });
}

function updatePost(req, res) {
  Post.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
      if (!err) { res.redirect('./post/addPost'); }
      else {
        if (err.name == 'ValidationError') {
            handleValidationError(err, req.body);
            res.render("./post/addPost", {
                viewTitle: 'Update Post Details',
                post: req.body
            });
        }
        else
            console.log('Error during record update : ' + err);
    }
  });
}
//for project list
router.get('/postList', (req, res) => {
  Post.find((err, docs) => {
      if(!err){
          res.render("./post/postList", {
              post: docs
          });
      }
      else{
          console.log("Error in retrieving project list : " + err);
      }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
      switch (err.errors[field].path) {
          case 'title':
              body['titleError'] = err.errors[field].message;
              break;
          case 'description':
              body['decriptionError'] = err.errors[field].message;
              break;
          default:
              break;
      }
  }
}

router.get('/:id',(req,res) => {
  Post.findById(req.params.id, (err, doc) => {
      if (!err) {
          res.render("post/addPost", {
              viewTitle:"Update Post Details",
              post: doc
          });
      }
  });
});

router.get('/delete/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/post/postList');
      }
      else { console.log('Error in post delete :' + err); }
  });
});

module.exports = router;