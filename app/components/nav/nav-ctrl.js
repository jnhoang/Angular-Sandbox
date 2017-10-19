angular
.module('AngularSandbox')
.controller('NavCtrl',[ 
  '$scope',
  '$window',
  '$location',
  'AuthService',
  // 'AlertService',
  'NavService',
  function($scope, $window, $location, AuthService/*, AlertService*/, NavService) {
    
    $scope.user;


    $scope.login  = login;
    $scope.logout = logout;
    init();

    //   $scope.displayMenuItems = true;

    //   $scope.currentUser.pwResetRequired = userData.pw_reset_required === 'Y' ? true : false;
    //   $scope.currentUser.resetRequired   = userData.reset_required    === 'Y' ? true : false;

    $scope.$watch(AuthService.getAuthStatus, function(authStatus) {
      if(authStatus !== undefined) {
        var user = AuthService.getAuthStatus();
        setCurrentUser(user);
        console.log('watching nav!')
      }
    });

    function init() {
      console.log('init called!')
      $scope.user = AuthService.getAuthStatus();
      if ($scope.user != null) {
        console.log('user: ', $scope.user.username)
      }
    }

    // function isActive(viewLocation) {
    //   return viewLocation === $location.path();
    // }
    function alertAdd(message, type) {

    }
    
    function alertDelete(index) {
      AlertService.deleteAlert(index);
      $scope.alerts = AlertService.getAlerts();
    }
    function alertClear() {
      AlertService.clearAlerts();
      $scope.alerts = AlertService.getAlerts();
    }
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
    function setCurrentUser(userData) {
      console.log('nav has user!')
      console.log('nav\'s user: ',$scope.user)
      }
   

 
}])


.factory('NavService', function($http) {
  return {
    test: function() {
      return $http.get('/api/users/allUsers');
    }
  };

  
});