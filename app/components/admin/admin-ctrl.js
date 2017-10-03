angular
.module('AngularSandbox')
.controller('AdminCtrl', [
  '$scope',
  'AdminFactory',
  function($scope, AdminFactory) {
    $scope.users = [];

    console.log('admin')
    AdminFactory
    .getAllUsers()
    .then(function success(data) {
      console.log(data.data);
      $scope.users = data.data;
    })
  }
])



.factory('AdminFactory', function($http) {
  var baseUrl = 'http://localhost:3000/api/users';

  return {
    createUser    : createUser,
    getAllUsers   : getAllUsers,
    deleteUser    : deleteUser,
    updateUser    : updateUser
  };

  function createUser() {}

  function deleteUser() {}

  function getAllUsers() {
    var httpObj = {
      method  : 'GET',
      url     : baseUrl + '/allUsers'
    }

    return $http(httpObj);
  }

  function updateUser() {}
})