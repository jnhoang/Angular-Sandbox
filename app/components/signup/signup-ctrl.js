angular
.module('AngularSandbox')
.controller('SignupCtrl', [
  '$scope',
  function($scope) {
    console.log('signup ctrl')

    $scope.newUser;
    $scope.createUser = createUser;


    function init() {

    }

    function createUser() {
      console.log('this is working')
    }

  }
])