let map;
let marker;

function initialize() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.75, lng: -97.13 },
    zoom: 8,
  });

  map.addListener("click", function (event) {
    clearMarker();
    placeMarker(event.latLng.lat(), event.latLng.lng());
    getWeatherByCoords(event.latLng.lat(), event.latLng.lng());
  });
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    fetchWeatherData(`q=${city}`);
  }
}

function getWeatherByCoords(lat, lon) {
  fetchWeatherData(`lat=${lat}&lon=${lon}`);
}

function fetchWeatherData(params) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `proxy.php?${params}`);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      const json = JSON.parse(this.responseText);
      displayWeather(json);
    }
  };
  xhr.send(null);
}

function clearMarker() {
  if (marker) {
    marker.setMap(null);
  }
}

function displayWeather(data) {
  if (data.main && data.weather && data.name) {
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const cityName = data.name;
    const latitude = data.coord.lat;
    const longitude = data.coord.lon;
    const visibility = data.visibility;
    const windSpeed = data.wind.speed;
    const cloudiness = data.clouds.all;
    const rainVolume1h = data.rain && data.rain["1h"] ? data.rain["1h"] : "N/A";
    const rainVolume3h = data.rain && data.rain["3h"] ? data.rain["3h"] : "N/A";
    const snowVolume1h = data.snow && data.snow["1h"] ? data.snow["1h"] : "N/A";
    const snowVolume3h = data.snow && data.snow["3h"] ? data.snow["3h"] : "N/A";

    const weatherOutput = `Location : ${cityName}<br>
      Weather: ${weatherDescription}<br>
      Latitude: ${latitude}<br>
      Longitude: ${longitude}<br>
      Visibility: ${visibility} meters<br>
      Wind Speed: ${windSpeed} m/s<br>
      Cloudiness: ${cloudiness}%<br>
      Rain (1h): ${rainVolume1h} mm<br>
      Rain (3h): ${rainVolume3h} mm<br>
      Snow (1h): ${snowVolume1h} mm<br>
      Snow (3h): ${snowVolume3h} mm<br>
      Temperature: ${temperature}°C<br>
      Feels Like: ${feelsLike}°C`;

    document.getElementById("output").innerHTML = weatherOutput;

    // Add the marker
    placeMarker(latitude, longitude);
  }
}

function placeMarker(lat, lon) {
  if (marker) {
    marker.setMap(null);
  }

  marker = new google.maps.Marker({
    position: { lat: lat, lng: lon },
    map: map,
    title: "Weather Location",
  });

  map.panTo(marker.getPosition());
  map.setZoom(10);
}

window.initMap = initialize;
