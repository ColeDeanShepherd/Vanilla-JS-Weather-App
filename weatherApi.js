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