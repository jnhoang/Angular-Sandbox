angular
.module('AngularSandbox')
.controller('NavCtrl',[ 
  '$scope',
  '$window',
  '$location',
  'AuthService',
  'AlertService',
  function($scope, $window, $location, AuthService, AlertService) {

  function init() {

  }

  function isActive(viewLocation) {
    return viewLocation === $location.path();
  }
  function deleteAlert(index) {
    AlertService.deleteAlert(index);
    $scope.alerts = AlertService.getAlerts();
  }
  function clearAlerts() {
    AlertService.clearAlerts();
    $scope.alerts = AlertService.getAlerts();
  }
  function setCurrentUser(userData) {
    $scope.currentUser = {
      fname: userData.fname,
      lname: null,
      lastInitial: null,
      email: null,
      userRole: null
    }
    $scope.displayMenuItems = true;

    $scope.currentUser.pwResetRequired = userData.pw_reset_required === 'Y' ? true : false;
    $scope.currentUser.resetRequired   = userData.reset_required    === 'Y' ? true : false;
  }
  function logout() {
    AlertService.clearAlerts();
    AuthService.logout();
  }

  $scope.$watch(AuthService.getAuthStatus, function(authStatus) {
    if(authStatus !== undefined) {
      $scope.setCurrentUser(AuthService.getAuthStatus());
    }
  })

  $scope.init();

  if($window.sessionStorage['userInfo']) {
    var sessionUserInfo = JSON.parse($window.sessionStorage['userInfo']);
    $scope.setCurrentUser(sessionUserInfo);
  }
}])