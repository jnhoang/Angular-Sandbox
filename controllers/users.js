var express   = require('express');
var db        = require('../models');

var router    = express.Router();


router.get('/allUsers', function(req, res) {

  db
  .user
  .findAll()
  .then(function(result) {
    res.send(result);
  });

});


/* CREATE NEW USER */
router.post('/signup', function(req, res) {

  var sqlParams = {
    where    : {
      username : req.body.username
    },
    defaults : {
      fname                     : req.body.fname,
      lname                     : req.body.lname,
      email                     : req.body.email,
      username                  : req.body.username,
      password                  : req.body.password,
      password_reset_required   : req.body.password_reset_required,
      security_question         : req.body.security_question,
      securit_answer            : req.body.security_answer,
      security_reset_required   : req.body.security_reset_required,
      user_role                 : req.body.user_role
    }
  };

  db
  .user
  .findOrCreate(sqlParams)
  .then(function(userArr) {
    res.send(userArr);
  })
  .catch(function(error) {
    console.log('error: ', error);
    res.send(error)
  });

});

module.exports = router;