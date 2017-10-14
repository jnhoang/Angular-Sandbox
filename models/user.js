'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  

  var user = sequelize.define('user', {
    fname                     : DataTypes.STRING,
    lname                     : DataTypes.STRING,
    email                     : DataTypes.STRING,
    username                  : DataTypes.STRING,
    password                  : DataTypes.STRING,
    password_reset_required   : DataTypes.BOOLEAN,
    security_question         : DataTypes.STRING,
    securit_answer            : DataTypes.STRING,
    security_reset_required   : DataTypes.BOOLEAN,
    user_role                 : DataTypes.STRING
  }, 
  /* MODEL METHODS */
  { 
    classMethods    : {
      associate       : function(models) {
        // associations can be defined here
      }
    },
    hooks           : {
      beforeCreate    : function(createdUser) {
        var hash              = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password  = hash;
        return createdUser;
      } 
    },
    instanceMethods : {
      authenticated : function(typedPassword) {
        return bcrypt.compareSync(typedPassword, this.password);
      }, 
      toJSON: function() {
        var data = this.get();
        delete data.password;

        return data;
      }
    }
  });

  return user;
};