function getWeather() {
    const city = document.getElementById("city-input").value;
    const div = document.getElementById("weather-info");

    if (!city) {
        div.innerHTML = "Please enter a city name";
        return;
    }

    // 1️⃣ Geocoding (City → Lat & Lon)
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        .then(res => res.json())
        .then(geoData => {
            if (!geoData.results) {
                div.innerHTML = "City not found";
                return;
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // 2️⃣ Weather data
            return fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            ).then(res => res.json())
             .then(weatherData => {
                const temp = weatherData.current_weather.temperature;
                const wind = weatherData.current_weather.windspeed;

                div.innerHTML = `
                    <h2>${name}, ${country}</h2>
                    <p>🌡 Temperature: ${temp} °C</p>
                    <p>💨 Wind Speed: ${wind} km/h</p>
                `;
             });
        })
        .catch(() => {
            div.innerHTML = "Error fetching weather data";
        });
}
