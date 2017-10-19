angular
.module('AngularSandbox')
.controller('NavCtrl',[ 
  '$scope',
  '$window',
  '$location',
  '$state',
  'AuthService',
  // 'AlertService',
  'NavService',
  function($scope, $window, $location, $state, AuthService/*, AlertService*/, NavService) {
    
    $scope.user;


    $scope.login  = login;
    $scope.logout = logout;
    

    init();


    // $scope.displayMenuItems = true;

    // $scope.currentUser.pwResetRequired = userData.pw_reset_required === 'Y' ? true : false;
    // $scope.currentUser.resetRequired   = userData.reset_required    === 'Y' ? true : false;


    function init() {
      $scope.user = AuthService.getAuthStatus();

      if ($scope.user) {
        if ($scope.user.password_reset_required || $scope.user.security_reset_required) {
          $state.go('Reset')
        }
      }
    }

    // function isActive(viewLocation) {
    //   return viewLocation === $location.path();
    // }
    // function alertAdd(message, type) {

    // }
    
    // function alertDelete(index) {
    //   AlertService.deleteAlert(index);
    //   $scope.alerts = AlertService.getAlerts();
    // }
    // function alertClear() {
    //   AlertService.clearAlerts();
    //   $scope.alerts = AlertService.getAlerts();
    // }
    function login() {
      var loginData = {
      username: 'tulp',
      password: 'test123'
      };

      AuthService.login(loginData)
      .then(function success(data) {
        console.log('success in login: ', data);
        AuthService.saveJWTToken(data.data.token);
        AuthService.saveUser(data.data.user);
        init();
      })
      .catch(function error(err) {
        console.log('error in login:', err);
      })
    }
    function logout() {
      // AlertService.clearAlerts();
      AuthService.logout();
      init();
    }
   

 
}])


.factory('NavService', function($http) {
  return {
    test: function() {
      return $http.get('/api/users/allUsers');
    }
  };

  
});