angular
.module('AngularSandbox')
.factory('AuthService', [
  '$http',
  '$q',
  '$window',
  '$location',
  function($http, $q, $window, $location) {
    var baseUrl       = '';
    var baseStrName   = 'AngularSandbox';
    var user;
    // var userInfo = {
    //   email            : null
    //   fname            : null
    //   lname            : null
    //   sqlKey           : null
    //   pwResetRequired  : null
    //   resetRequired    : null
    //   userRole         : null
    // }

    return {
      authorize       : authorize,
      getAuthStatus   : getAuthStatus,
      getBaseStr      : getBaseStr,
      getToken        : getToken,
      getUserRole     : getUserRole,
      login           : login,
      logout          : logout
    }

    function init() {
      if ($window.sessionStorage['userInfo']) {
        user.info = JSON.parse($window.sessionStorage['userInfo']);
      }
    }

    function authorize(requiredRole) {
      if (user.info !== undefined) {
        if (requiredRole === 'Admin' && user.info.userRole === 'Admin') {
          return true;
        } 
        else if (requiredRole === 'User' && (user.info.userRole === 'Admin' || user.info.userRole === 'User')) {
          return true;
        }
      }

      return false;
    }
    function getToken() {
      return $window.localStorage['secretToken'];
    }
    function getAuthStatus() {
      return user.info;
    }
    function getBaseStr() {
      return baseStrName;
    }
    function getUserRole() {
      return user.info.userRole;
    }
    function login(userObj) {
      return $http.post('/api/users/login', userObj);
      
    }
    // function login(username, password) {
    //   var deferred = $q.defer();

    //   var endpoint = '';
    //   var url = baseUrl + endpoint;
    //   var hash = btoa(username + ':' + password);
    //   var credentials = {
    //     email   : username,
    //     pw      : hash
    //   }

    //   $http
    //   .post(url, credentials)
    //   .then(function success(data) {
    //     if (result.data.statusCode === 200) {
    //       userInfo = result.data.data[0];
    //       $window.sessionStorage['userInfo'] = JSON.stringify(user.info);

    //       deferred.resolve(user.info);
    //     } else {
    //       deffered.reject(data);
    //     }
    //   })
    //   .catch(function error(err) {
    //     console.log('error in AuthService.login() :', err);
    //     deffered.reject(err);
    //   })
    // }
    function logout() {
      user.info = null;
      $window.sessionStorage['angularSandboxUserInfo'] = null;
      return user.info;
    }
  }
])




.factory('AuthInterceptor', [
  '$window',
  function($window) {
    return {
      request: function(config) {
        var token = $window.localStorage['AngularSandbox.secretToken'];

        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      }
    }
  }
])
.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }
])