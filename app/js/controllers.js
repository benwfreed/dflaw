(function() {
  'use strict';
  angular.module('mainApp')
  .controller('home', homeController)
  .controller('contact', contactController)
  .controller('directions', directionsController)
  .service('contactForm', contactFormService);
  function homeController() {
    var vm = this;
  }
  contactController.$inject = ['contactForm'];
  function contactController(contactFormService) {
    var vm = this;
    vm.goodSubmit = '';
    vm.badSubmit = '';
    vm.register = {};
    vm.register.firstName = '';
    vm.register.lastName = '';
    vm.register.phone = '';
    vm.register.email = '';
    vm.loading = false;

    vm.submit = function() {
      vm.loading = true;
      contactFormService.sendContactDetails(vm.register)
        .then(function(response) {
          console.log(response);
          vm.loading = false;
          vm.badSubmit = '';
          vm.goodSubmit = 'Thank you for submitting your contact details!';
        })
        .catch(function(error) {
          console.log(error);
          vm.loading = false;
          vm.goodSubmit = '';
          vm.badSubmit = 'Sorry, that didn\'t work!';
        });
    }
  }
  directionsController.$inject = ['uiGmapGoogleMapApi'];
  function directionsController(uiGmapGoogleMapApi) {
    var vm = this;
    vm.map = {center: {latitude: 40.693567, longitude: -73.990847 }, zoom: 14 };
    vm.options = {scrollwheel: false};
    vm.marker = {
      id: 0,
      coords: {latitude: 40.693567, longitude: -73.990847 },
      options: {title: "16 Court Street"}
    };
  }
  contactFormService.$inject = ['$http'];
  function contactFormService($http) {
    var service = this;
    service.sendContactDetails = function(details) {
      return $http.post('/', details);
    };
  }
})();
