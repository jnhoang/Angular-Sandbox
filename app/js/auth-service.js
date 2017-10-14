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
    // var user = {
    //   email            : null
    //   fname            : null
    //   lname            : null
    //   sqlKey           : null
    //   pwResetRequired  : null
    //   resetRequired    : null
    //   userRole         : null
    // }

    init();

    return {
      authorize       : authorize,
      getAuthStatus   : getAuthStatus,
      getBaseStr      : getBaseStr,
      getToken        : getToken,
      getUserRole     : getUserRole,
      login           : login,
      logout          : logout,
      saveJWTToken    : saveJWTToken,
      saveUser        : saveUser
    }
    function init() {
      if ($window.localStorage['user']) {
        user = JSON.parse($window.localStorage['user']);
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
    function getAuthStatus() {
      return user.info;
    }
    function getBaseStr() {
      return baseStrName;
    }
    function getToken() {
      return $window.localStorage['secretToken'];
    }
    function getUserRole() {
      return user.info.userRole;
    }
    function login(loginObj) {
      return $http.post('/api/users/login', loginObj);
    }
    function saveJWTToken(token) {
      $window.localStorage['AngularSandbox.secretToken'] = token;
    }
    function saveUser(userObj) {
      $window.localStorage['AngularSandbox.user'] = JSON.stringify(userObj);
    }
    function logout() {
      user.info = null;
      $window.localStorage['AngularSandbox.user'] = null;
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