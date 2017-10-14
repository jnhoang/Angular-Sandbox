/* requires and global variables */
require('dotenv').config();
var express     = require('express');
var path        = require('path');
var db          = require('./models');
var bodyParser  = require('body-parser');


/* JSON WebToken Depedencies */
var expressJWT  = require('express-jwt');
var jwt         = require('jsonwebtoken');
var secret      = process.env.JWT_SECRET;


/* App */
var app = express();

/* CONFIG */
var config = {
  bodyParserOption  : { extended : false  },
  expressJwtOption  : { secret   : secret },
  securityOption    : {
    path: [
      { 
        url       : '/api/users/signup',
        methods   : ['POST']
      },
      {
        url       : '/api/users/login',
        methods   : ['POST']
      }
    ]
  }
}

/* Set & Use Statements*/
app.use(bodyParser.urlencoded(config.bodyParserOption))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app')));



/* Controllers */
// User can only access signup or signin (will return a signed JWT) routes
app.use(
  '/api/users', 
  expressJWT(config.expressJwtOption)
  .unless(config.securityOption), 
  require('./controllers/users')
);


/* Unauthorized Access Catch */
app.use(function (err, req, res, next) {
  var statusMsg401 = {
    message: 'You need an authorization token to view this information.'
  };

  if (err.name === 'UnauthorizedError') {
    res
    .status(401)
    .send(statusMsg401);
    
    console.log('unauthorized access');
  }
  if (err) {
    console.log('error: ', err);
  }
});




/* Angular Catch */
app.get('/*', function(req, res) {
 res.sendFile(path.join(__dirname, 'app/index.html'));
});


/* Routes */

/* Host */
app.listen(process.env.PORT || 3000); 