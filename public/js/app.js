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
      url: '/'
    , templateUrl: 'app/home/home.html'
    , controller: 'HomeCtrl'
    })

    $locationProvider.html5Mode(true);

}]);
