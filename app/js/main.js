(function() {
  'use strict';
  angular.module('mainApp', ['ui.router', 'ui.mask', 'uiGmapgoogle-maps'])
    .config(configuration);
    configuration.$inject = ['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider'];
    function configuration($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAsstmro1STOxZJbVjBWQ2e3JO6FktR9OQ'
      });
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/views/home.html',
        })
        .state('directions', {
          url: '/directions',
          templateUrl: '/views/directions.html',
          controller: 'directions as vm'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: '/views/contact.html',
          controller: 'contact as vm'
        });
    }
})();
