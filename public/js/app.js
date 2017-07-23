<<<<<<< HEAD
console.log('test');
=======
>>>>>>> c4e9a0bab0d13d1553a4b2928d1f05255b5db293
angular
.module('AngularSandbox', ['ui.router'])
.config([
  '$stateProvider'
, '$urlRouterProvider'
<<<<<<< HEAD
, '$locationProvider'
, function($stateProvider, $urlRouterProvider, $locationProvider) {
=======
, function($stateProvider, $urlRouterProvider, ) {
>>>>>>> c4e9a0bab0d13d1553a4b2928d1f05255b5db293
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('Home', {
      url: '/'
<<<<<<< HEAD
    , templateUrl: 'app/home/home.html'
    , controller: 'HomeCtrl'
    })

    $locationProvider.html5Mode(true);
=======
    , templateUrl: 'app/home-page/home.html'
    , controller: 'HomeCtrl'
    })

    // $locationProvider.html5Mode(true);
>>>>>>> c4e9a0bab0d13d1553a4b2928d1f05255b5db293
}]);
