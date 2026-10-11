const citySelect = document.getElementById("city-select");
const getWeatherBtn = document.getElementById("get-weather-btn");

const weatherIcon = document.getElementById("weather-icon");
const mainTemperature = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationElement = document.getElementById("location");

// Get weather data from API
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
        );

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

// Display weather data
async function showWeather(city) {
    const data = await getWeather(city);

    // If API request failed
    if (data === undefined) {
        alert("Something went wrong, please try again later");
        return;
    }

    weatherIcon.src = data.weather?.[0]?.icon || "";
    mainTemperature.textContent = data.main?.temp ?? "N/A";
    feelsLike.textContent = data.main?.feels_like ?? "N/A";
    humidity.textContent = data.main?.humidity ?? "N/A";
    wind.textContent = data.wind?.speed ?? "N/A";
    windGust.textContent = data.wind?.gust ?? "N/A";
    weatherMain.textContent = data.weather?.[0]?.main ?? "N/A";
    locationElement.textContent = data.name ?? "N/A";
}

// Button click
getWeatherBtn.addEventListener("click", () => {
    const city = citySelect.value;

    // Do nothing if no city is selected
    if (city === "") {
        return;
    }

    showWeather(city);
});