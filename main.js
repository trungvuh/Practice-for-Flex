var totalTime = 0;
var totalDistance = 0;
var totalOriginal, timeOriginal;
var kmToMile = 0.621371/1000;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 37.166344, lng: -121.296944 }
  });

  //DirectionsService will take care of setting up the route
  var directionsService = new google.maps.DirectionsService;
  //DirectionsRenderer will take care of displaying the route onto the map
  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map,
    panel: document.getElementById('right-panel'),
  });

  var driverStart = 'San Francisco, CA';
  var driverEnd = 'Shafter, CA';


  calculateOriginal(driverStart, driverEnd, directionsService, directionsDisplay);

  //onClick submit will set the customer location, calculating and display new adjusted Route
  document.getElementById('submit').addEventListener('click', function() {
    var customerStart = document.getElementById('cust-start').value;
    var customerEnd = document.getElementById('cust-end').value;
    checkDistance(driverStart, customerStart);
    checkDistance(driverEnd, customerEnd);
    displayRoute(driverStart, driverEnd, customerStart, customerEnd, directionsService, directionsDisplay);
  });

  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });
}

function checkDistance(origin, checkpoint) {
  var geocoder = new google.maps.Geocoder;
  //DistanceMatrixService will check the distance between
  //array of origins and array of destinations (cross-check)
  var service = new google.maps.DistanceMatrixService;

  service.getDistanceMatrix({
    origins: [origin],
    destinations: [checkpoint],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: true
  }, function(response, status) {
    if (status !== 'OK') {
      alert('Error was: ' + status);
    } else {
      var check = response.rows[0].elements[0].distance.value;
      check = Math.ceil(check * kmToMile);
      console.log(check);
    }
  });
}

function calculateOriginal(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING',
    avoidTolls: true
  }, function (response, status) {
    if (status === 'OK') {
      display.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('original-panel');
      totalOriginal = Math.ceil((route.legs[0].distance.value * kmToMile));
      timeOriginal = route.legs[0].duration.text;
      summaryPanel.innerHTML = '';
      summaryPanel.innerHTML += '<b>Original Distance: ' + totalOriginal + ' miles <br>';
      summaryPanel.innerHTML += '<b>Original Time: ' + timeOriginal + '<br>';
    }
  });
}

function displayRoute(origin, destination, customerStart, customerEnd, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    waypoints: [{location: customerStart}, {location: customerEnd}],
    travelMode: 'DRIVING',
    avoidTolls: true
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
      // calculateOriginal(origin, destination, service);
      var summaryPanel = document.getElementById('original-panel');

      summaryPanel.innerHTML += '<b>New Distance: ' + totalDistance + ' miles <br>';
      summaryPanel.innerHTML += '<b>New Time: ' +
        Math.floor(totalTime/3600) + ' hours ' +
        Math.floor((totalTime/60)%60) + ' minutes <br>';

      var diff = (totalDistance - totalOriginal);
      summaryPanel.innerHTML += '<b>Differences: ' + Math.ceil(diff) + ' miles <br>';
      summaryPanel.innerHTML += '<b>Est. Price ($.25/mile): $' + (diff * 0.25).toFixed(2) + '<br>';
      // var route = response.routes[0];
      // var summaryPanel = document.getElementById('directions-panel');
      // summaryPanel.innerHTML = '';
      // // For each route, display summary information.
      //
      // for (var i = 0; i < route.legs.length; i++) {
      //   var routeSegment = i + 1;
      //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
      //       '</b><br>';
      //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
      //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
      //   summaryPanel.innerHTML += route.legs[i].distance.text + ', ';
      //   summaryPanel.innerHTML += route.legs[i].duration.text + '<br>';
      // }
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

function computeTotalDistance(result) {
  var myroute = result.routes[0];
  totalTime = 0;
  totalDistance = 0;
  for (var i = 0; i < myroute.legs.length; i++) {
    totalDistance += Math.ceil(myroute.legs[i].distance.value * kmToMile);
    totalTime += myroute.legs[i].duration.value;
  }
  document.getElementById('total').innerHTML = totalDistance + ' miles';
}
