angular
  .module('main')
  .controller("MainController", MainController);

function MainController($http) {
  var vm = this;
  var changeTimeoutId = 0;
  
  // Every controller should have this type of code. It connects
  // the view to the properties/methods of the controller.
  vm.city = 'Akron';
  vm.result = {};
  vm.convert = convert;
  vm.changeCity = changeCity;

  // This gets called by default to load the results for our default vm.city (Akron)
  getResults(vm.city);
  
  // Convert kelvin to fahrenheit
  // http://www.rapidtables.com/convert/temperature/how-kelvin-to-fahrenheit.htm
  function convert(temp) {
    return (temp * 9/5 - 459.67).toFixed(2);
  }
  
  // Use timeouts to prevent rapid fire requests to the Weather API.
  // Clear the timeout everytime a change is triggered. If a change 
  // isn't triggered after 1 second, send the request.
  function changeCity(city) {
    clearTimeout(changeTimeoutId);
    changeTimeoutId = setTimeout(function() {
      getResults();
    }, 1000);
  }
  
  // Make a call to the API using the $http Angular service. This service is included
  // via the MainController($http) line above.
  function getResults() {
    $http.get('//api.openweathermap.org/data/2.5/weather?q=' + vm.city + ',us&APPID=d1c49eebfc9bbde32c1a506c3f1817db').then(function(result) {
      vm.result = result;
    });
  }
}