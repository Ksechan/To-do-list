const API_KEY = "93ec1691abb0d3ccb46606f4f8810592";

function onGeoSucess(position) {
  console.log(position)
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("you live it!", lat, lon);
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url).then(response => response.json()).then(data => {
    const city = document.querySelector("#weather .city")
    const weather = document.querySelector("#weather .weather")
    city.innerHTML = data.name;
    weather.innerHTML = `&sol; ${data.weather[0].main} ${data.main.temp}`
  })
}

function onGeoError() {
  alert("Can't find you... No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoSucess, onGeoError);