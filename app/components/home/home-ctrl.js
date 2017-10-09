angular
.module('AngularSandbox')
.controller('HomeCtrl', [
  '$scope',
  'HomeService',
  function($scope, HomeService) {
    console.log('vdl fark')
  }
])


.factory('HomeService', function() {
  return {

  };

  
});