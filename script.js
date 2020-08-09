// API key for openweathermap.org's weather API. You cannot use the API without including the API key in requests.
const openWeatherMapApiKey = "b2e7fa5117000685ece320fc11924bcc";

async function loadCurrentWeatherAsync(cityName, apiKey) {
  // Load current weather data for the given location using openweathermap.org, and store the HTTP response.
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`);

  // Handle errors loading the current weather data.
  if (!response.ok) {
    // openweathermap.org will sometimes return a JSON body explaining the error. We detect this and return the JSON here.
    const errorJson = response.json();
    if (errorJson) {
      return errorJson;
    } else {
      throw new Error(`Failed loading current weather for city ${cityName}.`);
    }
  }

  // Extract current weather JSON out of the HTTP response.
  const currentWeather = await response.json();

  // Return the current weather JSON.
  return currentWeather
}

const exampleCurrentWeather = {
  "coord": {
    "lon": -122.33,
    "lat": 47.61
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 64.69,
    "feels_like": 64,
    "temp_min": 60.8,
    "temp_max": 68,
    "pressure": 1023,
    "humidity": 68
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.36,
    "deg": 0
  },
  "clouds": {
    "all": 90
  },
  "dt": 1596920362,
  "sys": {
    "type": 1,
    "id": 3417,
    "country": "US",
    "sunrise": 1596891402,
    "sunset": 1596943987
  },
  "timezone": -25200,
  "id": 5809844,
  "name": "Seattle",
  "cod": 200
};

async function mockLoadCurrentWeatherAsync(cityName, apiKey) {
  return exampleCurrentWeather;
}

async function mockFailLoadCurrentWeatherAsync(cityName, apiKey) {
  throw new Error("Failed loading weather.");
}

function updateDomWithCurrentWeather(currentWeather) {
  // Update the location element.
  findElementByIdAndSetContents("location", currentWeather.name);
  
  // Update the time element.
  findElementByIdAndSetContents("time", dateToTimeString(unixTimestampSToDate(currentWeather.dt)));
  
  // Update the summary element.
  findElementByIdAndSetContents("summary", currentWeather.weather.map(w => w.main).join(", "));

  // Update the temperature element.
  findElementByIdAndSetContents("temperature", temperatureToString(currentWeather.main.temp));
  
  // Update the "feels like" temperature element.
  findElementByIdAndSetContents("feels-like-temperature", `Feels Like: ${temperatureToString(currentWeather.main.feels_like)}`);

  // Update the low temperature element.
  findElementByIdAndSetContents("low-temperature", `Low: ${temperatureToString(currentWeather.main.temp_min)}`);

  // Update the high temperature element.
  findElementByIdAndSetContents("high-temperature", `High: ${temperatureToString(currentWeather.main.temp_max)}`);
  
  // Update the humidity element.
  findElementByIdAndSetContents("humidity", `Humidity: ${percentageToString(currentWeather.main.humidity)}`);
  
  // Update the wind element.
  findElementByIdAndSetContents("wind", `Wind: ${currentWeather.wind.speed} mph`);
  
  // Show the weather container.
  showWeatherContainer();
}

function updateDomWithError(error) {
  // Update the location element.
  findElementByIdAndSetContents("error", `ERROR: ${error}`);

  showError();
}

function showError(error) {
  const elementId = "error";

  // Try to find the element.
  const errorElement = document.getElementById(elementId);
  
  // // If we found the element, update it. Otherwise, log an error to the console.
  if (errorElement) {
    errorElement.style = "";
  } else {
    console.error(`Couldn't find element with ID \"${elementId}\".`);
  }
}

function temperatureToString(temperature) {
  return `${temperature}°F`;
}

function percentageToString(percentage) {
  return `${percentage}%`;
}

function unixTimestampSToDate(unixTimestampS) {
  return new Date(1000 * unixTimestampS);
}

const dateDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function dateToTimeString(date) {
  const dayName = dateDayNames[date.getDay()];
  const hourString = dateHoursTo12HourString(date.getHours());
  return `${dayName} ${hourString}`;
}

function dateHoursTo12HourString(hours) {
  if (hours === 0) {
    return "12 AM";
  } else if (hours < 12) {
    return `${hours} AM`;
  } else {
    return `${hours - 12} PM`;
  }
}

function findElementByIdAndSetContents(elementId, elementContents) {
  // Try to find the element.
  const summaryElement = document.getElementById(elementId);
  
  // // If we found the element, update it. Otherwise, log an error to the console.
  if (summaryElement) {
    summaryElement.innerHTML = elementContents;
  } else {
    console.error(`Couldn't find element with ID \"${elementId}\".`);
  }
}

function showWeatherContainer() {
  const elementId = "weather";

  // Try to find the element.
  const weatherContainerElement = document.getElementById(elementId);
  
  // // If we found the element, update it. Otherwise, log an error to the console.
  if (weatherContainerElement) {
    weatherContainerElement.style = "";
  } else {
    console.error(`Couldn't find element with ID \"${elementId}\".`);
  }
}

async function onLocationEntered(location) {
  // Load the current weather.
  const currentWeather = await loadCurrentWeatherAsync(location, openWeatherMapApiKey);

  // If loading succeeded, update the web page with current weather data.
  if (currentWeather && (currentWeather.cod === 200)) {
    // Update webpage with the current weather.
    updateDomWithCurrentWeather(currentWeather);
  } else {
    updateDomWithError(currentWeather.message);
  }
}

function onLocationKeyDown(event) {
  if (event.key === "Enter") {
    onLocationEntered(event.target.value);
    event.preventDefault();
  }
}