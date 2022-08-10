let map, infoWindow;

// example map and markers
export function initMap() {
  // make center fort myers or whatever city lat,lng
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 26.62048650684646, lng: -81.88478884429739 },
    zoom: 11.5
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");

  // set pins to specific locations
  // lets say its a wawa
  var wawa1 = { id: 456, lat: 26.59646415344287, lng: -81.86426708969424, locTitle: "Finally some good fucking food" };
  var wawa2 = { id: "192", lat: 26.557695079789426, lng: -81.87102246854727, locTitle: "More food" };
  var locationsArray = [wawa1, wawa2];
  for ( var i = 0 ; i < locationsArray.length ; i++ ){
    let latlng = { lat: locationsArray[i].lat, lng: locationsArray[i].lng };
    let locID = locationsArray[i].id;
    let mapMarker = new google.maps.Marker({
      position: { lat: latlng.lat, lng: latlng.lng },
      map,
      title: locationsArray[i].locTitle,
      animation:google.maps.Animation.DROP
    });
    
    mapMarker;
    window.google.maps.event.addListener(mapMarker, "click", () => {
      infoWindow.close();
      // this works, but now instead of displaying a window, we send json back to the server or 
      // submit via form to specific action path
      infoWindow = new google.maps.InfoWindow({
        position: { lat: latlng.lat, lng: latlng.lng }
      });

      document.querySelector("input[name='store_loc_id'").value = locID;
      infoWindow.setContent(JSON.stringify({ storeID: locID }));
      infoWindow.open(map);
    });
  }

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  // event listener for each location
  
}

export function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}