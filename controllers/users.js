var express   = require('express');
var database  = require('../models');

var router    = express.Router();





/* GET ALL USERS */
router.get('/allUsers', function(req, res) {

  database
  .user
  .findAll()
  .then(function(allUsers) {
    res.send(allUsers);
  })
  .catch(function(error) {
    console.log('error in /allUsers route:', error);
    res.send('error');
  });
});


/* GET SINGLE USER */
router.get('/:username', function(req, res) {
  console.log('******user: ', req.params.username)

  var sqlParams = {
    where: { username: req.params.username }
  };

  database
  .user
  .find(sqlParams)
  .then(function(user) {
    res.send(user);
  })
  .catch(function(error) {
    console.log('issue in the get/:username route: ', error);
    res.send('none found');
  });
});


/* CREATE NEW USER */
router.post('/signup', function(req, res) {

  var sqlParams = {
    where    : { username : req.body.username },
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

  database
  .user
  .findOrCreate(sqlParams)
  .then(function(userArr) {
    // returns [ { user }, bool ]
    res.send(userArr);
  })
  .catch(function(error) {
    console.log('error in /signup route: ', error);
    res.send(error)
  });

});


/* EDIT USER */
router.put('/edit/:username', function(req, res) {  
  var username   = req.params.username;
  var updateData = req.body;
  var forUser    = {
    where: { username: username }
  };
  var successObj = {
    status    : 200,
    message   : 'user, ' + username + ' has been deleted'
  };
  var errorObj   = {
    status    : 404,
    message   : 'user, '+ username + ' not found'
  }
  database
  .user
  .update(updateData, forUser)
  .then(function(success) {
    // success = [1]
    res.send(success ? successObj : errorObj);
  })
  .catch(function(error) {
    console.log('errrrror: ', error);
    res.send('error');
  })
});


/* DELETE USER */
router.delete('/delete/:username', function(req, res) {
  var username   = req.params.username;

  console.log('username: ', username)
  var sqlParams  = {
    where: { username: username }
  };
  var successObj = {
    status    : 200,
    message   : 'user, ' + username + ' has been deleted'
  };
  var errorObj   = {
    status    : 404,
    message   : 'user, '+ username + ' not found'
  }
  
  database
  .user
  .destroy(sqlParams)
  .then(function(success) {
    console.log(success);
    success ? res.send(successObj) : res.send('user not found');

  })
  .catch(function(error) {
    console.log('an error has occured in user /delete route', error);
    res.send(error);
  })
});

module.exports = router;