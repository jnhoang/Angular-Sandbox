var express     = require('express');
var path        = require('path');
var db          = require('./models');
var bodyParser  = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



/* Controllers */
app.use('/api/users', require('./controllers/users'));


/* Angular Catch */
app.get('/*', function(req, res) {
 res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Host
app.listen(process.env.PORT || 3000); 