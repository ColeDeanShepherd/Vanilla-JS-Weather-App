// This file contains functions enabling testing of the web page with hard-coded, mock data
// instead of using openweathermap.org's APIs. 

const mockCurrentWeather = {
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
    },
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    },
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    },
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
  return mockCurrentWeather;
}

async function mockFailLoadCurrentWeatherAsync(cityName, apiKey) {
  throw new Error("Failed loading weather.");
}