// This file contains classes used to construct & update HTML elements used in the web app.

/**
 * Represents the city input at the top of the page.
 */
class CityInputElement {
  constructor() {
    // Create a div to center the actual input element & add margin.
    this.rootElement = document.createElement("div");
    this.rootElement.className = "center-text margin-bottom";

    // Create the actual input element.
    this.inputElement = document.createElement("input");
    this.inputElement.type = "text";
    this.inputElement.placeholder = "Type city name (ex: \"Seattle\") and press enter";
    this.inputElement.className = "city-input";
    
    // Call this.onKeyDown whenever a key is pressed in the input element.
    this.inputElement.addEventListener("keydown", event => this.onKeyDown(event));
    
    // Add the input element to the root div element.
    this.rootElement.appendChild(this.inputElement);

    // this.onEnter is set on each city input element, and is called when the user types something and presses enter.
    // In our app, we want to load weather data & update the UI when this happens.
    // We could hard-code this behavior here, but I'm keeping business logic in app.js to better separate concerns.
    this.onEnter = undefined;
  }
  
  /**
   * Called whenever a key is pressed in the input element.
   * @param {KeyboardEvent} event 
   */
  onKeyDown(event) {
    const isEmpty = event.target.value.length === 0;
    if (!isEmpty && (event.key === "Enter")) {
      // Call an on enter handler if one has been set.
      if (this.onEnter) {
        this.onEnter(event.target.value);
      }

      // Prevent the browser from further processing the key press event,
      // we have already handled it how we'd like.
      event.preventDefault();
    }
  }
}

/**
 * Represents the entire weather widget.
 */
class WeatherElement {
  constructor() {
    // Create the container div.
    this.rootElement = document.createElement("div");
    this.rootElement.className = "weather";

    // Create a bunch of blank child divs that we will initialize with methods & properties in this class.
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

    // Create a container for various additional points of data that we want to display at the bottom of the widget.
    this.additionalInfoElement = document.createElement("ul");
    this.additionalInfoElement.className = "additional-info";
    this.rootElement.appendChild(this.additionalInfoElement);

    // Add child elements to the container of additional points of data.
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

  // Methods & properties to update child elements with new weather data.
  setLocation(city, country) {
    this.locationElement.innerHTML = `${city}, ${country}`;
  }

  set date(value) {
    // Convert the date to a string & update the web page.
    const dayName = dateDayToName(value.getDay());
    const monthName = dateMonthToName(value.getMonth());
    const timeString = get12HourTimeStringFromDate(value);

    this.dateElement.innerHTML = `As of: ${timeString}, ${dayName}, ${monthName} ${value.getDate()}, ${value.getFullYear()}`;
  }

  set weatherConditions(value) {
    // Clear the weather conditions container before we add new child weather condition elements.
    this.weatherConditionsElement.innerHTML = "";

    // Add child weather condition elements.
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
    // Clearing the style has the effect of showing the element. We don't add any other style to the root element so this is OK.
    this.rootElement.style = "";
  }

  hide() {
    this.rootElement.style = "display: none";
  }
}

/**
 * An icon and text representing a weather condition (ex: partly cloudy, sunny).
 */
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
    // Update this element's icon & descriptive text.
    this.iconElement.src = `http://openweathermap.org/img/w/${value.icon}.png`;
    this.textElement.innerHTML = value.description;
  }
}

/**
 * Represents an error we'd like to display to the user.
 */
class ErrorElement {
  constructor() {
    this.rootElement = document.createElement("p");
    this.rootElement.className = "error";
  }
  
  set error(value) {
    this.rootElement.innerHTML = `ERROR: ${value}`;
  }

  show() {
    // Clearing the style has the effect of showing the element. We don't add any other style to the root element so this is OK.
    this.rootElement.style = "";
  }

  hide() {
    this.rootElement.style = "display: none";
  }
}