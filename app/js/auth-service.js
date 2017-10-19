angular
.module('AngularSandbox')
.factory('AuthService', [
  '$http',
  '$q',
  '$window',
  '$location',
  function($http, $q, $window, $location) {
    var baseUrl;
    var baseStrName   = 'AngularSandbox';
    var user;
    // user = {
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
      // getBaseStr      : getBaseStr,
      getToken        : getToken,
      login           : login,
      logout          : logout,
      saveJWTToken    : saveJWTToken,
      saveUser        : saveUser
    }
    
    function init() {
      if ($window.localStorage['AngularSandbox.user']) {
        user = JSON.parse($window.localStorage['AngularSandbox.user']);
      }
      console.log('user in auth service: ', user);
    }

    function authorize(requiredRole) {
      if (user !== undefined) {
        if (requiredRole === 'Admin' && user.userRole === 'Admin') {
          return true;
        } 
        
        else if (requiredRole === 'User' && (user.userRole === 'Admin' || user.userRole === 'User')) {
          return true;
        }
      }

      return false;
    }
    function getAuthStatus() {
      return user;
    }
    // function getBaseStr() {
    //   return baseStrName;
    // }
    function getToken() {
      return $window.localStorage['secretToken'];
    }
    function login(loginObj) {
      return $http.post('/api/users/login', loginObj);
    }
    function logout() {
      user = null;
      $window.localStorage.removeItem('AngularSandbox.user');
      return user;
    }
    function saveJWTToken(token) {
      $window.localStorage['AngularSandbox.secretToken'] = token;
    }
    function saveUser(userObj) {
      user = userObj;
      $window.localStorage['AngularSandbox.user'] = JSON.stringify(userObj);
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