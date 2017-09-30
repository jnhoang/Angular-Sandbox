angular
.module('AngularSandbox')
.controller('AdminCtrl', [
  '$scope',
  function($scope) {


  }
])



.factory('AdminFactory', function($http) {
  return {
    createUser    : createUser,
    getAllUsers   : getAllUsers,
    deleteUser    : deleteUser,
    updateUser    : updateUser
  };

  function createUser() {}

  function deleteUser() {}

  function getAllUsers() {}

  function updateUser() {}
})