const weatherIconElement = document.querySelector('[data-weather-icon]');
const weatherStatus = document.querySelector('[data-weather-status]');
const locationElement = document.querySelector('[data-location]');
const weatherTemp = document.querySelector('[data-temperature]');
const weatherLoading = document.querySelector('[data-loading]');
let locationData;

const success = (location)=> {
   const lat = location.coords.latitude;
   const long = location.coords.longitude;
   console.log(lat,long);

   fetch(`https://open4tech.herokuapp.com/weather/getweather/${lat}/${long}`)
   .then(response => response.json())
   .then(response => {
        locationData = response;
        weatherLoading.textContent = "";
        locationElement.textContent = locationData.name + ", " + locationData.sys.country; 
        weatherIconElement.src = "http://openweathermap.org/img/w/" + locationData.weather[0].icon + ".png";
        weatherStatus.textContent = locationData.weather[0].main;
        weatherTemp.textContent = locationData.main.temp + ' °C';
   })
    .catch(err => console.log(err))
}


window.navigator.geolocation
  .getCurrentPosition(success, console.log);