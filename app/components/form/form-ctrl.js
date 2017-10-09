angular
.module('AngularSandbox')
.controller('FormCtrl', [
  '$scope',
  'FormService',
  function($scope, FormService) {
    
    FormService
    .getAllUsers()
    .then(function(result) {
      $scope.test = result.data;
      console.log($scope.test)
    })
    .catch(function(err) {
      console.log(err);
    });


  }
])
  
.factory('FormService', function($http) {
  return {
    getAllUsers: getAllUsers
  };

  function getAllUsers() {
    var httpObj = {
      method  : 'GET',
      url     : 'api/users/allUsers',
    };

    return  $http(httpObj);
  }

});