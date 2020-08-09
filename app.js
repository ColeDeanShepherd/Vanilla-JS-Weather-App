class App {
  run() {
    // Find the for the city input, the weather widget, and an error widget.
    // Throw an error if we can't find it.
    this.weatherContainerElement = document.getElementById("weatherContainer");
    if (!this.weatherContainerElement) {
      throw new Error("Couldn't find weather container.");
    }
    
    // Create the city input element.
    this.cityInputElement = new CityInputElement();

    // Call this.onCityEntered when the user enters a city.
    this.cityInputElement.onEnter = newCityName => this.onCityEntered(newCityName);
    this.weatherContainerElement.appendChild(this.cityInputElement.rootElement);
  
    // Create the weather widget & hide it.
    this.weatherElement = new WeatherElement();
    this.weatherContainerElement.appendChild(this.weatherElement.rootElement);
    this.weatherElement.hide();
    
    // Create the error widget & hide it.
    this.errorElement = new ErrorElement();
    this.weatherContainerElement.appendChild(this.errorElement.rootElement);
    this.errorElement.hide();
  }
  
  /**
   * When a city name is entered, try to load current weather data for the city.
   * If successful, update the UI with the weather data. Otherwise, display an error to the user.
   * @param {string} cityName 
   */
  async onCityEntered(cityName) {
    // Load the current weather.
    const currentWeather = await loadCurrentWeatherAsync(cityName, openWeatherMapApiKey);

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
  
  /**
   * Updates the weather widget with current weather data.
   * @param {JSON} currentWeather 
   */
  updateWeatherElement(currentWeather) {
    this.weatherElement.setLocation(currentWeather.name, currentWeather.sys.country);
    this.weatherElement.date = unixTimestampSecondsToDate(currentWeather.dt);
    this.weatherElement.weatherConditions = currentWeather.weather;
    this.weatherElement.temperature = currentWeather.main.temp;
    this.weatherElement.feelsLikeTemperature = currentWeather.main.feels_like;
    this.weatherElement.lowTemperature = currentWeather.main.temp_min;
    this.weatherElement.highTemperature = currentWeather.main.temp_max;
    this.weatherElement.humidity = currentWeather.main.humidity;
    this.weatherElement.windSpeed = currentWeather.wind.speed;
  }
}