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
    const isEmpty = event.target.value.length === 0;
    if (!isEmpty && (event.key === "Enter")) {
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
    this.locationElement.className = "location"
    this.rootElement.appendChild(this.locationElement);

    this.dateElement = document.createElement("div");
    this.dateElement.className = "date";
    this.rootElement.appendChild(this.dateElement);
    
    this.temperatureElement = document.createElement("div");
    this.temperatureElement.className = "temperature";
    this.rootElement.appendChild(this.temperatureElement);

    this.weatherConditionsElement = document.createElement("div");
    this.weatherConditionsElement.className = "weather-conditions";
    this.rootElement.appendChild(this.weatherConditionsElement);

    this.additionalInfoElement = document.createElement("ul");
    this.additionalInfoElement.className = "additional-info";
    this.rootElement.appendChild(this.additionalInfoElement);

    this.feelsLikeTemperatureElement = document.createElement("li");
    this.additionalInfoElement.appendChild(this.feelsLikeTemperatureElement);

    this.lowTemperatureElement = document.createElement("li");
    this.additionalInfoElement.appendChild(this.lowTemperatureElement);

    this.highTemperatureElement = document.createElement("li");
    this.additionalInfoElement.appendChild(this.highTemperatureElement);

    this.humidityElement = document.createElement("li");
    this.additionalInfoElement.appendChild(this.humidityElement);

    this.windSpeedElement = document.createElement("li");
    this.additionalInfoElement.appendChild(this.windSpeedElement);
  }

  setLocation(city, country) {
    this.locationElement.innerHTML = `${city}, ${country}`;
  }

  set date(value) {
    const dayName = dateDayToName(value.getDay());
    const monthName = dateMonthToName(value.getMonth());
    const timeString = dateTo12HourTimeString(value);

    this.dateElement.innerHTML = `As of: ${timeString}, ${dayName}, ${monthName} ${value.getDate()}, ${value.getFullYear()}`;
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
    this.rootElement = document.createElement("div");
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