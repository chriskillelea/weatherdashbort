/*API*/

const apiKey = "d69f53dc2cbddb46a0edad84ff704325";
    const searchForm = document.getElementById("search-form");
    const cityInput = document.getElementById("city-input");
    const currentWeather = document.getElementById("current-weather");
    const forecast = document.getElementById("forecast");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
    cityInput.value = "";
  }
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  /* Weather data */
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const current = data.list[0];
      const cityName = data.city.name;
      const date = new Date(current.dt * 1000);
      const iconUrl = `http://openweathermap.org/img/w/${current.weather[0].icon}.png`;
      const temperature = Math.round(current.main.temp - 273.15); // Convert to Celsius
      const humidity = current.main.humidity;
      const windSpeed = current.wind.speed;

      
      const currentWeatherHTML = `
        <div class="weather-card">
          <h2>${cityName}</h2>
          <p>Date: ${date.toLocaleDateString()}</p>
          <img src="${iconUrl}" alt="Weather Icon">
          <p>Temperature: ${temperature}°C</p>
          <p>Humidity: ${humidity}%</p>
        </div>
      `;
      currentWeather.innerHTML = currentWeatherHTML;
    })
    .catch(error => {
      console.log("Error fetching weather data:", error);
    });

     function getWeather(city) {
        
        const currentWeatherHTML = `
          <div class="weather-card">
            <h2>${cityName}</h2>
            <p>Date: ${date.toLocaleDateString()}</p>
            <img src="${iconUrl}" alt="Weather Icon">
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
          </div>
        `;
        currentWeather.innerHTML = currentWeatherHTML;
      
        /* local storage */
        
        saveCityToLocalStorage(city);
      }
      
      function saveCityToLocalStorage(city) {
        let cities = localStorage.getItem("cities");
        if (cities) {
          cities = JSON.parse(cities);
          cities.push(city);
        } else {
          cities = [city];
        }
        localStorage.setItem("cities", JSON.stringify(cities));
      }
      
    }
