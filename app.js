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
    const currentWeather = await mockLoadCurrentWeatherAsync(location, openWeatherMapApiKey);

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
    this.weatherElement.setLocation(currentWeather.name, currentWeather.sys.country);
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