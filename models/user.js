'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    password_reset_required: DataTypes.BOOLEAN,
    security_question: DataTypes.STRING,
    securit_answer: DataTypes.STRING,
    security_reset_required: DataTypes.BOOLEAN,
    user_role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};