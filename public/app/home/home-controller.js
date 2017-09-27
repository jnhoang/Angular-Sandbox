angular
.module('AngularSandbox')
.controller('HomeCtrl', [
  '$scope',
  'HomeService',
  function($scope, HomeService) {
    
    HomeService
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
  
.factory('HomeService', function($http) {
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