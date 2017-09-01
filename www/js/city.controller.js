angular
  .module('city', [])
  .controller('CityController', CityController);

function CityController() {
  var vm = this;
  vm.message = 'This is the City page';
}