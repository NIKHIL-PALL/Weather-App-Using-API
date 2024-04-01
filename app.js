const ApiKey = "0c1b04dad9814560601e89ff0a73f05e";

const getUserInput = document.getElementById("cityName");
const searchBtn = document.getElementById("search");
const userLocationBtn = document.getElementById("user-location");
const details = document.getElementById("text-details");
const city = details.querySelector("#city");
const image = document.querySelector("#condition-image");
const toggleBtn = document.querySelector('#toggleButton');
const dropdownMenu = document.querySelector('.dropdown');
const forecast = document.getElementsByClassName("next-days-details");

searchBtn.addEventListener("click", async () => {
  const locationName = getUserInput.value;
  const data = await fetchData(locationName);
  renderTodayData(data);
  renderNextThreeHours(data);
  // getLocation();
});
userLocationBtn.addEventListener('click', async() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position.coords.latitude+ " " + position.coords.longitude);
      const data = await getData(position.coords.latitude, position.coords.longitude);
      renderTodayData(data);
      renderNextThreeHours(data);
    }, positionError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
} else {
    //Geolocation is not supported by this browser
}
})

function renderTodayData(data) {
  city.innerText = ` ${data.city.name} - ${data.city.country}`;
  details.querySelector("#temp").innerText = `temperature : ${
    Math.round((data.list[0].main.temp - 273) * 100) / 100
  }°C`;
  details.querySelector(
    "#wind"
  ).innerText = `wind : ${data.list[0].wind.speed} km/h`;
  details.querySelector(
    "#humidity"
  ).innerText = `humidity : ${data.list[0].main.humidity}`;
  details.querySelector('#temp-max').innerText = `Max-temp : ${Math.round((data.list[0].main.temp_max - 273) * 100) / 100}°C`
  details.querySelector('#temp-min').innerText = `Min-temp : ${Math.round((data.list[0].main.temp_min - 273) * 100) / 100}°C`
  details.querySelector('#feels-like').innerText = `Feels-Like : ${Math.round((data.list[0].main.feels_like - 273) * 100) / 100}°C `
  details.querySelector(
    ".condition"
  ).innerText = `${data.list[0].weather[0].main} - ${data.list[0].weather[0].description}`;
  image.src = `images/animated/${data.list[0].weather[0].main}.svg`;
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition, positionError, {timeout:10000});
  } else {
      //Geolocation is not supported by this browser
  }
}


// handle the error here
function positionError(error) {
  var errorCode = error.code;
  var message = error.message;

  alert(message);
}

function renderNextThreeHours(data) {
  let forecastDetails = "";
  data.list.map((item) => {
    forecastDetails += ` <div class="day">
    <div>${item.dt_txt}</div>
    <h2 class="condition">${item.weather[0].main}</h2>
    <div class="image-container">
    <img src="images/animated/${item.weather[0].main}.svg" alt="">
    </div>
    <ul class="details">
      <li class="temp">temperature : ${
               Math.round((item.main.temp - 273) * 100) / 100
              }°C</li>
      <li class="humidity">Humidity : ${item.main.humidity} %</li>
      <li class="wind">Wind Speed : ${item.wind.speed} km/h</li>
    </ul>
  </div>`;
  
  });
  forecast[0].innerHTML = forecastDetails;
}
const fetchData = async (cityName) => {
  const coordData = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${ApiKey}`
  );
  const data = await coordData.json();
  const lat = data[0].lat;
  const lon = data[0].lon;
  console.log(lat + " " + lon);
  return getData(lat, lon);

  
};
const getData = async (lat, lon) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}&cnt=5`;
  const weatherData = await fetch(url);
  const wdata = await weatherData.json();
  return wdata;
}




toggleBtn.addEventListener('click', ()=> {
  dropdownMenu.classList.toggle('close')
  
})