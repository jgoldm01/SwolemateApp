var formApp = angular.module('formApp', [])

  .controller('formController', function($scope, $http) {

    // we will store our form data in this object
    $scope.formData = {};
    
    // this is our method for processing formData
    $scope.processForm = function() {
      var dataToSend = $scope.formData;
      dataToSend['lat'] = $('span#latholder').text()
      dataToSend['lng'] = $('span#longholder').text()
      $http({ 
        method  : 'POST',
        url     : 'api/user/matchingparams',
        data    : dataToSend, // pass in data 
      })
        .success(function(data) {
          if (!data.success) {
            console.log(data);
            $scope.errorName = data.errors.name;
            $scope.errorSuperhero = data.errors.superheroAlias;
          }
          else {
            $scope.message = data.message;
            window.location.href = "swolefinder";
          }

        });

    };
        
});


$(document).ready(function() {
    $('button#get-location').click(function() {
      if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(handleGeolocation, handleLocationError);
        }
    })
});

function handleGeolocation(location) {
  $('span#latholder').text(location.coords.latitude);
  $('span#longholder').text(location.coords.longitude);
}

function handleLocationError(error) {
    var fakeDavisSquarePosition = {coords: {latitude:42.3964, longitude:-71.1223} }; 
    switch(error.code) {
        case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation. Using Davis Square as default location.");
        handleGeolocation(fakeDavisSquarePosition);
        break;
        case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable. Using Davis Square as default location.");
        handleGeolocation(fakeDavisSquarePosition);
        break;
        case error.TIMEOUT:
        alert("The request to get user location timed out. Using Davis Square as default location.");
        handleGeolocation(fakeDavisSquarePosition);
        break;
        case error.UNKNOWN_ERROR:
        alert("An unknown error occurred. Using Davis Square as default location.");
        handleGeolocation(fakeDavisSquarePosition);
        break;
    }
}
