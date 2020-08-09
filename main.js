class LocationInputElement {
  constructor() {
    this.rootElement = document.createElement("div");
    this.rootElement.className = "center-text margin-bottom";

    this.inputElement = document.createElement("input");
    this.inputElement.type = "text";
    this.inputElement.placeholder = "Type location (ex: \"Seattle\") and press enter";
    this.inputElement.addEventListener("keydown", event => this.onLocationKeyDown(event));
    this.inputElement.className = "location-input";
    this.rootElement.appendChild(this.inputElement);

    this.onEnter = undefined;
  }
  
  onLocationKeyDown(event) {
    if (event.key === "Enter") {
      if (this.onEnter) {
        this.onEnter(event.target.value);
      }

      event.preventDefault();
    }
  }
}

class WeatherElement {
  constructor() {
    this.rootElement = document.createElement("div");
    this.rootElement.className = "weather";

    this.locationElement = document.createElement("div");
    this.rootElement.appendChild(this.locationElement);

    this.dateElement = document.createElement("div");
    this.rootElement.appendChild(this.dateElement);

    this.weatherConditionsElement = document.createElement("div");
    this.rootElement.appendChild(this.weatherConditionsElement);

    this.temperatureElement = document.createElement("div");
    this.rootElement.appendChild(this.temperatureElement);

    this.feelsLikeTemperatureElement = document.createElement("div");
    this.rootElement.appendChild(this.feelsLikeTemperatureElement);

    this.lowTemperatureElement = document.createElement("div");
    this.rootElement.appendChild(this.lowTemperatureElement);

    this.highTemperatureElement = document.createElement("div");
    this.rootElement.appendChild(this.highTemperatureElement);

    this.humidityElement = document.createElement("div");
    this.rootElement.appendChild(this.humidityElement);

    this.windSpeedElement = document.createElement("div");
    this.rootElement.appendChild(this.windSpeedElement);
  }

  set location(value) {
    this.locationElement.innerHTML = value;
  }

  set date(value) {
    this.dateElement.innerHTML = dateToTimeString(value);
  }

  set weatherConditions(value) {
    this.weatherConditionsElement.innerHTML = "";

    for (const weatherCondition of value) {
      const weatherConditionElement = new WeatherConditionElement();
      weatherConditionElement.condition = weatherCondition;

      this.weatherConditionsElement.appendChild(weatherConditionElement.rootElement);
    }
  }

  set temperature(value) {
    this.temperatureElement.innerHTML = temperatureToString(value);
  }

  set feelsLikeTemperature(value) {
    this.feelsLikeTemperatureElement.innerHTML = `Feels Like: ${temperatureToString(value)}`;
  }

  set lowTemperature(value) {
    this.lowTemperatureElement.innerHTML = `Low: ${temperatureToString(value)}`;
  }

  set highTemperature(value) {
    this.highTemperatureElement.innerHTML = `High: ${temperatureToString(value)}`;
  }

  set humidity(value) {
    this.humidityElement.innerHTML = `Humidity: ${percentageToString(value)}`;
  }

  set windSpeed(value) {
    this.windSpeedElement.innerHTML = `Wind: ${value} mph`;
  }

  show() {
    this.rootElement.style = "";
  }

  hide() {
    this.rootElement.style = "display: none";
  }
}

class WeatherConditionElement {
  constructor() {
    this.rootElement = document.createElement("span");
    this.rootElement.className = "weather-condition";

    this.iconElement = document.createElement("img");
    this.rootElement.appendChild(this.iconElement);

    this.textElement = document.createElement("p");
    this.rootElement.appendChild(this.textElement);
  }

  set condition(value) {
    this.iconElement.src = `http://openweathermap.org/img/w/${value.icon}.png`;
    this.textElement.innerHTML = value.description;
  }
}

class ErrorElement {
  constructor() {
    this.rootElement = document.createElement("p");
    this.rootElement.className = "error";
  }
  
  set error(value) {
    this.rootElement.innerHTML = `ERROR: ${value}`;
  }

  show() {
    this.rootElement.style = "";
  }

  hide() {
    this.rootElement.style = "display: none";
  }
}

class App {
  run() {
    this.weatherContainerElement = document.getElementById("weatherContainer");
    if (!this.weatherContainerElement) {
      throw new Error("Couldn't find weather container.");
    }
    
    this.locationInputElement = new LocationInputElement();
    
    this.locationInputElement.onEnter = newLocation => this.onLocationEntered(newLocation);
  
    this.weatherContainerElement.appendChild(this.locationInputElement.rootElement);
  
    this.weatherElement = new WeatherElement();
    
    this.weatherContainerElement.appendChild(this.weatherElement.rootElement);
  
    this.weatherElement.hide();
    
    this.errorElement = new ErrorElement();
    
    this.weatherContainerElement.appendChild(this.errorElement.rootElement);
  
    this.errorElement.hide();
  }
  
  async onLocationEntered(location) {
    // Load the current weather.
    const currentWeather = await loadCurrentWeatherAsync(location, openWeatherMapApiKey);

    // If loading succeeded, update the web page with current weather data.
    if (currentWeather && (currentWeather.cod === 200)) {
      this.updateWeatherElement(currentWeather);
      this.weatherElement.show();
      this.errorElement.hide();
    } else {
      this.errorElement.error = currentWeather.message;
      this.errorElement.show();
      this.weatherElement.hide();
    }
  }
  
  updateWeatherElement(currentWeather) {
    this.weatherElement.location = currentWeather.name;
    this.weatherElement.date = unixTimestampSToDate(currentWeather.dt);
    this.weatherElement.weatherConditions = currentWeather.weather;
    this.weatherElement.temperature = currentWeather.main.temp;
    this.weatherElement.feelsLikeTemperature = currentWeather.main.feels_like;
    this.weatherElement.lowTemperature = currentWeather.main.temp_min;
    this.weatherElement.highTemperature = currentWeather.main.temp_max;
    this.weatherElement.humidity = currentWeather.main.humidity;
    this.weatherElement.windSpeed = currentWeather.wind.speed;
  }
}

const app = new App();
app.run();