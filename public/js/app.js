angular
.module('AngularSandbox', ['ui.router'])
.config([
  '$stateProvider'
, '$urlRouterProvider'
, function($stateProvider, $urlRouterProvider, ) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('Home', {
      url: '/'
    , templateUrl: 'app/home-page/home.html'
    , controller: 'HomeCtrl'
    })

    // $locationProvider.html5Mode(true);
}]);
