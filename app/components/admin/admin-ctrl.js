angular
.module('AngularSandbox')
.controller('AdminCtrl', [
  '$scope',
  'AdminFactory',
  function($scope, AdminFactory) {
    /* scope variables */
    $scope.users = [];

    /* scope functions */
    $scope.deleteUser = deleteUser;
    
    init();
  

    function init() {
      AdminFactory
      .getAllUsers()
      .then(function(data) {
        $scope.users = data.data;
      });
    }

    function deleteUser() {
      AdminFactory
      .deleteUser('jnhustin')
      .then(function success(data) {
        console.log('data: ', data);
        AdminFactory
        .getAllUsers()
        .then(function(data) {
          $scope.users = data.data;
        });
      })
      .catch(function error(err) {
        console.log('error: ', err);
      })
    }

    function getAllUsers() {
      
    }
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

  function deleteUser(username) {
    var httpObj = {
      method  : 'DELETE',
      url     : baseUrl + '/delete/' + username
    };

    return $http(httpObj);
  }

  function getAllUsers() {
    var httpObj = {
      method  : 'GET',
      url     : baseUrl + '/allUsers'
    };

    return $http(httpObj)
  }

  function updateUser() {}
})