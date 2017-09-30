angular
.module('AngularSandbox', ['ui.router', 'ui.bootstrap'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('Home', {
      url          : '/',
      templateUrl  : 'components/home/home.html',
      controller   : 'HomeCtrl'
    })
    .state('Form', {
      url          : '/form',
      templateUrl  : 'components/form/form.html',
      controller   : 'FormCtrl'
    })
    .state('Signup', {
      url          : '/signup',
      templateUrl  : 'components/signup/signup.html',
      controller   : 'SignupCtrl'
    })
    .state('Admin', {
      url          : '/admin',
      templateURL  : 'components/admin/admin.html',
      controller   : 'AdminCtrl'
    })

    $locationProvider.html5Mode(true);

}]);
