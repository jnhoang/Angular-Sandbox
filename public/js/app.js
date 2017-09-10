angular
.module('AngularSandbox', ['ui.router', 'ui.bootstrap'])
.config([
  '$stateProvider'
, '$urlRouterProvider'
, '$locationProvider'
, function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('Home', {
      url          : '/'
    , templateUrl  : 'app/components/home/home.html'
    , controller   : 'HomeCtrl'
    })
    .state('Form', {
      url          : '/form'
    , templateUrl  : 'app/components/form/form.html'
    , controller   : 'FormCtrl'
    })

    $locationProvider.html5Mode(true);

}]);
