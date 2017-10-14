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
    path: [{ 
      url       : '/api/users/signup',
      methods   : ['POST']
    }]
  }
}

/* Set & Use Statements*/
app.use(bodyParser.urlencoded(config.bodyParserOption))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app')));



/* Controllers */
app.use(
  '/api/users', 
  expressJWT(config.expressJwtOption)
  .unless(config.securityOption), 
  require('./controllers/users')
);



/* Angular Catch */
app.get('/*', function(req, res) {
 res.sendFile(path.join(__dirname, 'app/index.html'));
});


/* Host */
app.listen(process.env.PORT || 3000); 