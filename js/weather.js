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
    const weatherIcon = document.querySelector("#weather .weather-icon")
    console.log(data)
    city.innerHTML = data.name;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weather.innerHTML = `${data.weather[0].main} ${Math.floor(data.main.temp)}도`
    console.log(weatherIcon)
  })
}

function onGeoError() {
  alert("Can't find you... No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoSucess, onGeoError);


